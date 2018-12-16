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

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = selectColor(window.data.coatsColorPersonal);
    document.querySelector('.setup-wizard-appearance input[name=coat-color]').value = wizardCoat.style.fill;
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = selectColor(window.data.eyesColorPersonal);
    document.querySelector('.setup-wizard-appearance input[name=eyes-color]').value = wizardEyes.style.fill;
  });

  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.background = selectColor(window.data.fireballColorPersonal);
    wizardFireball.querySelector('input').value = wizardFireball.style.background;
  });
})();


