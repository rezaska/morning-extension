import getMillisecondsToStartTime from './utils.js';
import iconHandler from './iconHandler.js';
iconHandler.init();

const scheduledTask = document.querySelector('.scheduled-task');
const startButton = document.querySelector('.my-btn');

// ---- Task: pick one pill ----
const taskGroup = document.querySelector('#task-group');
const lengthField = document.querySelector('#length-field');
let chosenTask = 'walk';
taskGroup.addEventListener('click', (event) => {
  const chip = event.target.closest('.task-chip');
  if (!chip) return;
  setActiveChip(taskGroup, '.task-chip', chip);
  chosenTask = chip.dataset.task;
  // Hydrate is a quick reminder, not a timed activity — no length needed.
  lengthField.classList.toggle('hidden', chosenTask === 'hydrate');
});

// ---- Length: preset chips OR a custom number ----
const lengthGroup = document.querySelector('#length-group');
const lengthCustom = document.querySelector('#length-custom');
let lengthMinutes = 10;
lengthGroup.addEventListener('click', (event) => {
  const chip = event.target.closest('.length-chip');
  if (!chip) return;
  setActiveChip(lengthGroup, '.length-chip', chip);
  lengthCustom.value = '';
  lengthMinutes = Number(chip.dataset.min);
});
lengthCustom.addEventListener('input', () => {
  clearActive(lengthGroup, '.length-chip');
  lengthMinutes = Number(lengthCustom.value) || 0;
});

// ---- Start: relative preset chips XOR a "pick a time" chip ----
const relativeGroup = document.querySelector('#relative-group');
const timeChip = document.querySelector('#time-chip');
const timePicker = document.querySelector('#time-picker');
const startLabel = document.querySelector('#start-label');
const hourSelect = document.querySelector('#hour');
const minuteSelect = document.querySelector('#minute');
const ampmSelect = document.querySelector('#ampm');
let startMode = 'relative'; // 'relative' | 'exact'
let relativeMinutes = 15;
relativeGroup.addEventListener('click', (event) => {
  const chip = event.target.closest('.chip');
  if (!chip) return;

  if (chip === timeChip) {
    // Toggle the time picker: open it, or close it if it's already open.
    if (startMode === 'exact') {
      selectRelative(relativeMinutes);
    } else {
      setExactMode();
    }
    return;
  }

  selectRelative(Number(chip.dataset.min));
});

function selectRelative(minutes) {
  startMode = 'relative';
  startLabel.textContent = 'Start in';
  relativeMinutes = minutes;
  timePicker.classList.add('hidden');
  const chip = relativeGroup.querySelector(`.start-chip[data-min="${minutes}"]`)
    || relativeGroup.querySelector('.start-chip');
  setActiveChip(relativeGroup, '.chip', chip);
}

function setExactMode() {
  startMode = 'exact';
  startLabel.textContent = 'Start at';
  setActiveChip(relativeGroup, '.chip', timeChip);
  timePicker.classList.remove('hidden');
}

// ---- Repeat: once or every day ----
const repeatGroup = document.querySelector('#repeat-group');
let repeat = 'once';
repeatGroup.addEventListener('click', (event) => {
  const chip = event.target.closest('.repeat-chip');
  if (!chip) return;
  setActiveChip(repeatGroup, '.repeat-chip', chip);
  repeat = chip.dataset.repeat;
});

// Build a 24-hour "HH:MM" string from the dropdowns (for the schedule math).
function exactTimeString() {
  const hour12 = Number(hourSelect.value);
  const ampm = ampmSelect.value;
  const hour24 = (hour12 % 12) + (ampm === 'PM' ? 12 : 0);
  return `${String(hour24).padStart(2, '0')}:${minuteSelect.value}`;
}

// Time-of-day buttons quick-set the start time (then it stays editable).
const periodPresets = {
  button1: { hour: '8', minute: '00', ampm: 'AM' },  // Morning
  button2: { hour: '1', minute: '00', ampm: 'PM' },  // Afternoon
  button3: { hour: '6', minute: '00', ampm: 'PM' },  // Evening
};
Object.entries(periodPresets).forEach(([id, preset]) => {
  const button = document.querySelector(`#${id}`);
  if (button) button.addEventListener('click', () => applyPeriodPreset(preset));
});

function applyPeriodPreset({ hour, minute, ampm }) {
  hourSelect.value = hour;
  minuteSelect.value = minute;
  ampmSelect.value = ampm;
  setExactMode();
}

function setActiveChip(group, selector, chip) {
  clearActive(group, selector);
  chip.classList.add('active');
}

function clearActive(group, selector) {
  group.querySelectorAll(selector).forEach((chip) => chip.classList.remove('active'));
}

function notify(message) {
  scheduledTask.classList.remove('hidden');
  scheduledTask.innerHTML = `<p>${message}</p>`;
}

startButton.addEventListener('click', async () => {
  const isReminder = chosenTask === 'hydrate';
  if (!isReminder && (!lengthMinutes || lengthMinutes < 1)) {
    notify('Please choose how long your break should be.');
    return;
  }

  let when;
  let startText;
  if (startMode === 'exact') {
    when = Date.now() + getMillisecondsToStartTime(exactTimeString());
    startText = `at ${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`;
  } else {
    when = Date.now() + relativeMinutes * 60 * 1000;
    startText = `in ${relativeMinutes} min`;
  }

  // Persist the task so the background service worker can read it when the
  // alarm fires — the popup is gone by then.
  const alarmName = `morning-${when}`;
  const isDaily = repeat === 'daily';
  const duration = isReminder ? 0 : lengthMinutes * 60;
  const { tasks = {} } = await chrome.storage.local.get('tasks');
  tasks[alarmName] = { task: chosenTask, duration, repeat: isDaily };
  await chrome.storage.local.set({ tasks });

  const alarmOptions = { when };
  if (isDaily) alarmOptions.periodInMinutes = 24 * 60;
  chrome.alarms.create(alarmName, alarmOptions);

  const forText = isReminder ? '' : ` for ${lengthMinutes} min`;
  const repeatText = isDaily ? ', every day' : '';
  notify(`You'll ${chosenTask}${forText}, starting ${startText}${repeatText}.`);
});
