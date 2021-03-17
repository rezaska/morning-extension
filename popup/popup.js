import getMillisecondsToStartTime from './utils.js';
import iconHandler from './iconHandler.js';
iconHandler.init();

const buttonElement = document.querySelector('.my-btn');
const timer = document.querySelector('#timer');
const time = document.querySelector('#time');

// Open new tab function for start button
function openNewTab() {
  const message = window.open('../message/message.html', '_blank');
  message.timerDuration = timer.value * 60;
  message.startTime = time.value;
  return;
}

// buttonElement.addEventListener('click', openNewTab);
if (buttonElement) {
  buttonElement.addEventListener('click', () => {
    const remainingTimeTillBreak = getMillisecondsToStartTime(time.value);
    setTimeout(openNewTab, remainingTimeTillBreak)
  });
};