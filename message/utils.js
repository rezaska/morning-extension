export default function countdown(timeValue, DOMElem) {
  setTimeout(() => {
    timeValue--;
    DOMElem.innerHTML = `<p>${timeValue}</p>`;
    if (timeValue > 0) countdown(timeValue, DOMElem);
  }, 1000);
  return;
};

function getElapsedTimeInMilliseconds() {
  const currentTime = new Date();
  const elapsedTime__MILLISECONDS = currentTime.getMilliseconds();
  console.log(elapsedTime__MILLISECONDS);
  return elapsedTime__MILLISECONDS;
};

export function countdown__test(startTime, timeValue, DOMELem) {
  if (getElapsedTimeInMilliseconds() === 0) {
    timeValue--;
    DOMELem.innerHTML = `<p>${timeValue}</p>`;
  };
  if (timeValue > 0) countdown__test(startTime, timeValue, DOMELem);
  return;
};