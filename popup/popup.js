const buttonElement = document.querySelector('.my-btn');

const timer = document.querySelector('#timer');
let timerDuration = 0;

export function getTimerValue() {
  console.log(timerDuration);
  return timerDuration;
}

if(timer) {
  timer.addEventListener('change', () => {
    timerDuration = timer.value;
    console.log(timerDuration);
  })
};

// Open new tab function for start button
function openNewTab() {
  // timer.removeEventListener('change', getTimerValue);
  window.open('../message/message.html', '_blank');
}

// buttonElement.addEventListener('click', openNewTab);
if (buttonElement) {
  buttonElement.addEventListener('click', () => {
    setTimeout(openNewTab, )
  });
}

// Select icons function 1
// let defaultMorningIcon = document.getElementById('morning');
// let button1 = document.getElementById('button1');

// function selectIconMorning() {
//   if (defaultMorningIcon.getAttribute('src') === "../assets/icon.png") {
//     defaultMorningIcon.setAttribute('src', "../assets/icon-off.png");
//   } else {
//     defaultMorningIcon.setAttribute('src', "../assets/icon.png");
//   }
// }

// button1.addEventListener('click', selectIconMorning);

// Select icons function 2
// let defaultNoonIcon = document.getElementById('noon');
// let button2 = document.getElementById('button2');

// function selectIconNoon() {
//   console.log(defaultNoonIcon.getAttribute('src'));
//   if (defaultNoonIcon.getAttribute('src') === "../assets/noon.png") {
//     defaultNoonIcon.setAttribute('src', "../assets/noon-off.png");
//   } else {
//     defaultNoonIcon.setAttribute('src', "../assets/noon.png");
//   }
// }

// button2.addEventListener('click', selectIconNoon);

// Select icons function 3
// let defaultEveningIcon = document.getElementById('evening');
// let button3 = document.getElementById('button3');

// function selectIconEvevning() {
//   if (defaultEveningIcon.getAttribute('src') === "../assets/evening.png") {
//     defaultEveningIcon.setAttribute('src', "../assets/evening-off.png");
//   } else {
//     defaultEveningIcon.setAttribute('src', "../assets/evening.png");
//   }
// }

// button3.addEventListener('click', selectIconEvevning);


export default timerDuration;