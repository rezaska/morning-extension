import countdown from './utils.js';

const params = new URLSearchParams(location.search);
const duration = Number(params.get('duration')) || 60;
const task = params.get('task') || 'take a break';
const countdownElem = document.querySelector('.countdown');

countdown(duration, task, countdownElem, () => {
  countdownElem.innerHTML = `<p>Time's up — nice work! 🎉</p>`;
  setTimeout(() => {
    chrome.tabs.getCurrent((tab) => {
      if (tab) chrome.tabs.remove(tab.id);
      else window.close();
    });
  }, 3000);
});
