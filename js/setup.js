'use strict';

var blockSetup = document.querySelector('.setup');
blockSetup.classList.remove('hidden');

// Исходные данные:
var NAMES_PERSONAL = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_PERSONAL = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_PERSONAL = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_PERSONAL = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция генерации случайного числа от нуля до указанного значения:
var randomNumber = function (maxNumber) {
  var currentNumber = Math.floor(Math.random() * maxNumber);

  return currentNumber;
};

// Функция генерации имени персонажа:
var personalName = function (arrNames, arrSurnames) {
  while (arrNames.length !== arrSurnames.length) {
    if (arrNames.length > arrSurnames.length) {
      arrSurnames.push('Иванов');
    } else if (arrNames.length < arrSurnames.length) {
      arrNames.push('Иван');
    }
  }

  var indexName = randomNumber(arrNames.length);
  var indexSurname = randomNumber(arrSurnames.length);
  var name = arrNames[indexName] + ' ' + arrSurnames[indexSurname];

  return name;
};

// Функция создания персонажа:
var createPersonal = function (names, surnames, coats, eyes) {
  var personal = {};
  personal.name = personalName(names, surnames);
  personal.coatColor = coats[randomNumber(coats.length)];
  personal.eyesColor = eyes[randomNumber(eyes.length)];

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
var personals = createArrPersonals(4, NAMES_PERSONAL, SURNAMES_PERSONAL, COATS_PERSONAL, EYES_PERSONAL);

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

// Показываем блок выбора персонажа:
var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
