export default function countdown(timeValue, chosenTask, DOMElem) {
  setTimeout(() => {
    timeValue--;
    DOMElem.innerHTML = `<p>You have ${timeValue} to do your ${chosenTask}</p>`;
    timeValue > 0 ? countdown(timeValue, chosenTask, DOMElem) : window.close();
  }, 1000); 
  return;
};