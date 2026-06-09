export default function countdown(timeValue, chosenTask, DOMElem, onDone) {
  DOMElem.innerHTML = `<p>You have ${formatTime(timeValue)} to ${chosenTask}.</p>`;

  if (timeValue <= 0) {
    if (onDone) onDone();
    return;
  }

  setTimeout(() => countdown(timeValue - 1, chosenTask, DOMElem, onDone), 1000);
}

export function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map(pad).join(':');
}

function pad(number) {
  return number < 10 ? '0' + number : '' + number;
}
