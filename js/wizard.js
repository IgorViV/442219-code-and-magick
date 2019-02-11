'use strict';

(function () {
  // Модуль отрисовки персонажей на основе шаблона и полученных от сервера данных:
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    var setupSimilar = document.querySelector('.setup-similar');
    var index = window.util.randomNumber(wizards.length - 4); // выбор произвольной четвертки волшебников

    for (var i = index; i < index + 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    // Показываем блок выбора персонажа:
    setupSimilar.classList.remove('hidden');
  };

  var onError = function (errorMessage) { // выводим сообщение об ошибки передачи данных
    var tagError = document.createElement('div');
    tagError.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    tagError.style.position = 'absolute';
    tagError.style.left = 0;
    tagError.style.right = 0;
    tagError.style.fontSize = '30px';
    tagError.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', tagError);
    setTimeout(function () {
      tagError.parentNode.removeChild(tagError);
    }, 5000);
  };

  window.backend.load(onLoad, onError);
})();
