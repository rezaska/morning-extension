import getMillisecondsToStartTime from './utils.js';
import iconHandler from './iconHandler.js';
iconHandler.init();

const buttonElement = document.querySelector('.my-btn');
const timer = document.querySelector('#timer');
const time = document.querySelector('#time');
const task = document.querySelector('select');
const scheduledTask = document.querySelector('.scheduled-task');
let chosenTask = task.value;

if (task) {
  task.onchange = () => chosenTask = task.value;
}

if (buttonElement) {
  buttonElement.onclick = async () => {
    if (!time.value) {
      scheduledTask.classList.remove('hidden');
      scheduledTask.innerHTML = `<p>Please pick a start time first.</p>`;
      return;
    }

    const durationSeconds = (Number(timer.value) || 1) * 60;
    const when = Date.now() + getMillisecondsToStartTime(time.value);
    const alarmName = `morning-${when}`;

    // Persist the task so the background service worker can read it when the
    // alarm fires — the popup is gone by then.
    const { tasks = {} } = await chrome.storage.local.get('tasks');
    tasks[alarmName] = { task: chosenTask, duration: durationSeconds };
    await chrome.storage.local.set({ tasks });

    chrome.alarms.create(alarmName, { when });

    scheduledTask.classList.remove('hidden');
    scheduledTask.innerHTML = `<p>You have selected to do ${chosenTask} at ${time.value}.</p>`;
  };
}
