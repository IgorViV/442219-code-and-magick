'use strict';

(function () {
  // Функция генерации имени персонажа:
  var personalName = function (arrNames, arrSurnames) {
    while (arrNames.length !== arrSurnames.length) {
      if (arrNames.length > arrSurnames.length) {
        arrSurnames.push('Иванов');
      } else if (arrNames.length < arrSurnames.length) {
        arrNames.push('Иван');
      }
    }

    var indexName = window.util.randomNumber(arrNames.length);
    var indexSurname = window.util.randomNumber(arrSurnames.length);
    var name = arrNames[indexName] + ' ' + arrSurnames[indexSurname];

    return name;
  };

  // Функция создания персонажа:
  var createPersonal = function (names, surnames, coats, eyes) {
    var personal = {};
    personal.name = personalName(names, surnames);
    personal.coatColor = coats[window.util.randomNumber(coats.length)];
    personal.eyesColor = eyes[window.util.randomNumber(eyes.length)];

    return personal;
  };

  // Функция создания листа с персонажами:
  var createArrPersonals = function (arrLength, arrNames, arrSurnames, arrCoats, arrEyes) {
    var arrPersonals = [];
    for (var i = 0; i < arrLength; i++) {
      arrPersonals[i] = createPersonal(arrNames, arrSurnames, arrCoats, arrEyes);
    }

    return arrPersonals;
  };

  // Лист, состоящий из 4 сгенерированных персонажей:
  var personals = createArrPersonals(4, window.data.namesPersonal, window.data.surnamesPersonal, window.data.coatsColorPersonal, window.data.eyesColorPersonal);

  // Создаем персонажей на основе шаблона и присваиваем им случайные свойства:
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  for (var i = 0; i < 4; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = personals[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = personals[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = personals[i].eyesColor;
    similarListElement.appendChild(wizardElement);
  }
})();
