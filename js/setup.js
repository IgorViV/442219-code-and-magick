'use strict';

(function () {
  // Изменяем цвет мантии, глаз и фаирбола персонажа по нажатию:

  var selectColor = function (arrColor) { // Функция выбора произвольного цвета
    var currentColor = arrColor[window.util.randomNumber(arrColor.length)];

    return currentColor;
  };

  var wizardSetup = document.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  // Начальный цвет глаз и мантии
  var newCoatColor = document.querySelector('.setup-wizard-appearance input[name=coat-color]').value;
  var newEyesColor = document.querySelector('.setup-wizard-appearance input[name=eyes-color]').value;

  // Изменение цвета мантии
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = selectColor(window.data.coatsColorPersonal);
    document.querySelector('.setup-wizard-appearance input[name=coat-color]').value = wizardCoat.style.fill
    newCoatColor = document.querySelector('.setup-wizard-appearance input[name=coat-color]').value;
    console.log('---COAT---');
    console.log(newCoatColor);
  });

  // Изменение цвета глаз
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = selectColor(window.data.eyesColorPersonal);
    document.querySelector('.setup-wizard-appearance input[name=eyes-color]').value = wizardEyes.style.fill;
    newEyesColor = document.querySelector('.setup-wizard-appearance input[name=eyes-color]').value;
    console.log('---EYES---');
    console.log(newEyesColor);
  });

  // Изменение цвета фаирбола
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.background = selectColor(window.data.fireballColorPersonal);
    wizardFireball.querySelector('input').value = wizardFireball.style.background;
  });
})();


