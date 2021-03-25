export default function countdown(timeValue, chosenTask, DOMElem) {
  setTimeout(() => {
    timeValue--;
    DOMElem.innerHTML = `<p>You have ${formatTime(timeValue)} seconds to ${chosenTask}.</p>`;
    timeValue > 0 ? countdown(timeValue, chosenTask, DOMElem) : window.close();
  }, 1000); 
  return;
};

export function formatTime(numberOfSeconds) {
  const seconds = convertToDoubleDigit(numberOfSeconds % 60);
  const minutes = convertToDoubleDigit(((numberOfSeconds - seconds) / 60) % 60);
  const hours = convertToDoubleDigit((numberOfSeconds - seconds - minutes * 60) / 3600);

  return hours + ':' + minutes + ':' + seconds;
}

function convertToDoubleDigit(number) {
  return number < 10 ? '0' + number : '' + number
}