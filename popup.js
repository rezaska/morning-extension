const buttonElement = document.querySelector('.my-btn');
const message = document.querySelector('.message');

buttonElement.addEventListener('click', function (event) {
  // message.classList.remove('hidden');
  on()
});

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}