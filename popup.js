const buttonElement = document.querySelector('.my-btn');
const message = document.querySelector('.message');

// function for start button
// buttonElement.addEventListener('click', openNewTab);

function openNewTab() {
  window.open('./message.html', '_blank');
}

// the overlay function (in case we want to use it)
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}

// Select icons function 1
let defaultMorningIcon = document.getElementById('morning');
let button1 = document.getElementById('button1');

function selectIconMorning() {
  if (defaultMorningIcon.getAttribute('src') === "./assets/icon.png") {
    defaultMorningIcon.setAttribute('src', "./assets/icon-off.png");
  } else {
    defaultMorningIcon.setAttribute('src', "./assets/icon.png");
  }
}

button1.addEventListener('click', selectIconMorning);

// Select icons function 2
let defaultNoonIcon = document.getElementById('noon');
let button2 = document.getElementById('button2');

function selectIconNoon() {
  if (defaultNoonIcon.getAttribute('src') === "./assets/noon.png") {
    defaultNoonIcon.setAttribute('src', "./assets/noon-off.png");
  } else {
    defaultNoonIcon.setAttribute('src', "./assets/noon.png");
  }
}

button2.addEventListener('click', selectIconNoon);

// Select icons function 3
let defaultEveningIcon = document.getElementById('evening');
let button3 = document.getElementById('button3');

function selectIconEvevning() {
  if (defaultEveningIcon.getAttribute('src') === "./assets/evening.png") {
    defaultEveningIcon.setAttribute('src', "./assets/evening-off.png");
  } else {
    defaultEveningIcon.setAttribute('src', "./assets/evening.png");
  }
}

button3.addEventListener('click', selectIconEvevning);

// Timer function
