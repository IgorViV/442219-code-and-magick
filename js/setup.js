'use strict';

var NAMES_PERSONAL = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_PERSONAL = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_PERSONAL = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_PERSONAL = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_CODE = 27;
var ENTER_CODE = 13;

// Открытие/закрытие окна настройки персонажа:
var buttonSetupOpen = document.querySelector('.setup-open');
var blockSetup = document.querySelector('.setup');
var buttonSetupClose = blockSetup.querySelector('.setup-close');
var setupUserName = blockSetup.querySelector('.setup-user-name');

var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    modalClose();
  }
};

var modalOpen = function () {
  blockSetup.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscPress);
};

var modalClose = function () {
  blockSetup.classList.add('hidden');
  document.removeEventListener('keydown', onModalEscPress);
};

buttonSetupOpen.addEventListener('click', function () {
  modalOpen();
});

buttonSetupClose.addEventListener('click', function () {
  modalClose();
});

buttonSetupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    modalOpen();
  }
});

buttonSetupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    modalClose();
  }
});

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onModalEscPress);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onModalEscPress);
});

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

// Изменяем цвет мантии, глаз и фаирбола персонажа по нажатию:

var selectColor = function (arrColor) { // Функция выбора произвольного цвета
  var currentColor = arrColor[randomNumber(arrColor.length)];

  return currentColor;
};

var wizardSetup = document.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = selectColor(COATS_PERSONAL);
  document.querySelector('.setup-wizard-appearance input[name=coat-color]').value = wizardCoat.style.fill;
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = selectColor(EYES_PERSONAL);
  document.querySelector('.setup-wizard-appearance input[name=eyes-color]').value = wizardEyes.style.fill;
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = selectColor(FIREBALL_COLOR);
  wizardFireball.querySelector('input').value = wizardFireball.style.background;
});
