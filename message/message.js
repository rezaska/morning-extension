import countdown from './utils.js';

const params = new URLSearchParams(location.search);
const durationParam = params.get('duration');
const duration = durationParam === null ? 60 : Number(durationParam);
const task = params.get('task') || 'take a break';
const countdownElem = document.querySelector('.countdown');

function closeTab() {
  chrome.tabs.getCurrent((tab) => {
    if (tab) chrome.tabs.remove(tab.id);
    else window.close();
  });
}

if (duration > 0) {
  countdown(duration, task, countdownElem, () => {
    countdownElem.innerHTML = `<p>Time's up — nice work! 🎉</p>`;
    setTimeout(closeTab, 3000);
  });
} else {
  // Reminder-only task (e.g. hydrate): no countdown, just a nudge.
  countdownElem.innerHTML = `<p>Time to ${task}! 💧</p>`;
  setTimeout(closeTab, 8000);
}
