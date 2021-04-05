import getMillisecondsToStartTime from './utils.js';
import iconHandler from './iconHandler.js';
iconHandler.init();

const buttonElement = document.querySelector('.my-btn');
const timer = document.querySelector('#timer');
const time = document.querySelector('#time');
const task = document.querySelector('select');
const scheduledTask = document.querySelector('.scheduled-task');
let chosenTask = task.value;

if(task) {
  task.onchange = () => chosenTask = task.value;
}

// Open new tab function for start button
function openNewTab() {
  const message = window.open('../message/message.html', '_blank');
  message.timerDuration = timer.value * 60;
  message.startTime = time.value;
  message.chosenTask = chosenTask;
  return;
}

if (buttonElement) {
  buttonElement.onclick = () => {
    const remainingTimeTillBreak = getMillisecondsToStartTime(time.value);
    setTimeout(openNewTab, remainingTimeTillBreak);
    scheduledTask.innerHTML = `<p>You have selected to do ${chosenTask} at ${time.value}.</p>`;
  };
};

// Overlay feature using Chrome API (to be added in later version)
chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {action:'getDOM'}, (response) => {
    console.log(response)
  })
});