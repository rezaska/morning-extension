const iconHandler = function () {

  const buttonTitle = document.querySelector('.button-title');
  const timer = document.querySelector('#timer');
  const time = document.querySelector('#time');
  const select = document.querySelector('select');

  function selectIcon(activeIconName, inactiveIcon1Name, inactiveIcon2Name) {
    const activeIcon = document.querySelector(`#${activeIconName}`);
    const inactiveIcon1 = document.querySelector(`#${inactiveIcon1Name}`);
    const inactiveIcon2 = document.querySelector(`#${inactiveIcon2Name}`);
    activeIcon.setAttribute('src', sourceFiles[`${activeIconName}IconActive`]);
    inactiveIcon1.setAttribute('src', sourceFiles[`${inactiveIcon1Name}IconInactive`]);
    inactiveIcon2.setAttribute('src', sourceFiles[`${inactiveIcon2Name}IconInactive`]);
    buttonTitle.innerHTML = `<p>${activeIconName}</p>`;
    resetInputField();
    return;
  };

  function resetInputField() {
    select.value = 'walk';
    timer.value = null;
    time.value = null;
  }

  const sourceFiles = {
    morningIconActive: '../assets/morning.png',
    morningIconInactive: '../assets/morning-off.png',
    afternoonIconActive: '../assets/afternoon.png',
    afternoonIconInactive: '../assets/afternoon-off.png',
    eveningIconActive: '../assets/evening.png',
    eveningIconInactive: '../assets/evening-off.png'
  };

  function init() {
    const button1 = document.querySelector('#button1');
    if (button1) button1.onclick = () => selectIcon('morning', 'afternoon', 'evening');

    const button2 = document.querySelector('#button2');
    if (button2) button2.onclick = () => selectIcon('afternoon', 'evening', 'morning');

    const button3 = document.querySelector('#button3');
    if (button3) button3.onclick = () => selectIcon('evening', 'morning', 'afternoon');

    return;
  };

  return {
    init
  };
}();

export default iconHandler;