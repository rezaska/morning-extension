const iconHandler = function () {
  function selectIcon(icon, sourceFile, altSourceFile) {
    if (icon.getAttribute('src') === sourceFile) {
      icon.setAttribute('src', altSourceFile);
    } else {
      icon.setAttribute('src', sourceFile);
    };
    return;
  };

  const sourceFiles = {
    defaultMorningIcon: '../assets/icon.png',
    altMorningIcon: '../assets/icon-off.png',
    defaultNoonIcon: '../assets/noon.png',
    altNoonIcon: '../assets/noon-off.png',
    defaultEveningIcon: '../assets/evening.png',
    altEveningIcon: '../assets/evening-off.png'
  };

  function init() {
    const button1 = document.querySelector('#button1');
    if (button1) button1.onclick = () => selectIcon(document.querySelector('#morning'), sourceFiles.defaultMorningIcon, sourceFiles.altMorningIcon);

    const button2 = document.querySelector('#button2');
    if (button2) button2.onclick = () => selectIcon(document.querySelector('#noon'), sourceFiles.defaultNoonIcon, sourceFiles.altNoonIcon);

    const button3 = document.querySelector('#button3');
    if (button3) button3.onclick = () => selectIcon(document.querySelector('#evening'), sourceFiles.defaultEveningIcon, sourceFiles.altEveningIcon);

    return;
  };

  return {
    init
  };
}();

export default iconHandler;