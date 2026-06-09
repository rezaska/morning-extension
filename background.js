// Service worker: fires when a scheduled task's alarm goes off and opens the
// countdown page. Scheduling itself is done from the popup (popup/popup.js).

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const { tasks = {} } = await chrome.storage.local.get('tasks');
  const data = tasks[alarm.name];
  if (!data) return;

  const url = chrome.runtime.getURL(
    `message/message.html?duration=${data.duration}&task=${encodeURIComponent(data.task)}`
  );
  await chrome.tabs.create({ url });

  // Keep recurring tasks for the next firing; clean up one-shot tasks so
  // storage doesn't grow unbounded.
  if (!data.repeat) {
    delete tasks[alarm.name];
    await chrome.storage.local.set({ tasks });
  }
});
