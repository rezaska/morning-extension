import getMillisecondsToStartTime from './utils.js';
import iconHandler from './iconHandler.js';
iconHandler.init();

const scheduledTask = document.querySelector('.scheduled-task');
const startButton = document.querySelector('.my-btn');

// ---- Task: pick one pill ----
const taskGroup = document.querySelector('#task-group');
let chosenTask = 'walk';
taskGroup.addEventListener('click', (event) => {
  const chip = event.target.closest('.task-chip');
  if (!chip) return;
  setActiveChip(taskGroup, '.task-chip', chip);
  chosenTask = chip.dataset.task;
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
const hourSelect = document.querySelector('#hour');
const minuteSelect = document.querySelector('#minute');
const ampmSelect = document.querySelector('#ampm');
let startMode = 'relative'; // 'relative' | 'exact'
let relativeMinutes = 15;
relativeGroup.addEventListener('click', (event) => {
  const chip = event.target.closest('.chip');
  if (!chip) return;
  setActiveChip(relativeGroup, '.chip', chip);

  if (chip === timeChip) {
    startMode = 'exact';
    timePicker.classList.remove('hidden');
  } else {
    startMode = 'relative';
    relativeMinutes = Number(chip.dataset.min);
    timePicker.classList.add('hidden');
  }
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
  setActiveChip(relativeGroup, '.chip', timeChip);
  startMode = 'exact';
  timePicker.classList.remove('hidden');
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
  if (!lengthMinutes || lengthMinutes < 1) {
    notify('Please choose how long your break should be.');
    return;
  }

  let when;
  let startLabel;
  if (startMode === 'exact') {
    when = Date.now() + getMillisecondsToStartTime(exactTimeString());
    startLabel = `at ${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`;
  } else {
    when = Date.now() + relativeMinutes * 60 * 1000;
    startLabel = `in ${relativeMinutes} min`;
  }

  // Persist the task so the background service worker can read it when the
  // alarm fires — the popup is gone by then.
  const alarmName = `morning-${when}`;
  const { tasks = {} } = await chrome.storage.local.get('tasks');
  tasks[alarmName] = { task: chosenTask, duration: lengthMinutes * 60 };
  await chrome.storage.local.set({ tasks });
  chrome.alarms.create(alarmName, { when });

  notify(`You'll ${chosenTask} for ${lengthMinutes} min, starting ${startLabel}.`);
});
