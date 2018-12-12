'use strict';
// Модуль открытие/закрытие и перетаскивания окна настройки персонажа:
(function () {

  var blockSetup = document.querySelector('.setup');
  var setupUserHandle = blockSetup.querySelector('.upload');
  var buttonSetupOpen = document.querySelector('.setup-open');
  var buttonSetupClose = blockSetup.querySelector('.setup-close');
  var setupUserName = blockSetup.querySelector('.setup-user-name');
  var defaultPosition = {left: 0, top: 0};

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, modalClose);
  };

  var modalOpen = function () {
    blockSetup.classList.remove('hidden');
    document.addEventListener('keydown', onModalEscPress);
    defaultPosition = {left: blockSetup.offsetLeft, top: blockSetup.offsetTop};
  };

  var modalClose = function () {
    blockSetup.classList.add('hidden');
    document.removeEventListener('keydown', onModalEscPress);

    blockSetup.style.top = defaultPosition.top + 'px';
    blockSetup.style.left = defaultPosition.left + 'px';
  };

  buttonSetupOpen.addEventListener('click', function () {
    modalOpen();
  });

  buttonSetupClose.addEventListener('click', function () {
    modalClose();
  });

  buttonSetupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, modalOpen);
  });

  buttonSetupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, modalClose);
  });

  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onModalEscPress);
  });

  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onModalEscPress);
  });

  // Перетаскивание диалога редактирования персонажа (draggable)

  setupUserHandle.addEventListener('mousedown', function (evt) {

    var startPosition = {x: evt.clientX, y: evt.clientY};

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      dragged = true;

      var shift = {x: startPosition.x - moveEvt.clientX, y: startPosition.y - moveEvt.clientY};

      startPosition = {x: moveEvt.clientX, y: moveEvt.clientY};

      blockSetup.style.top = (blockSetup.offsetTop - shift.y) + 'px';
      blockSetup.style.left = (blockSetup.offsetLeft - shift.x) + 'px';
    };

    var mouseUpHandler = function () {

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (defEvt) {
          defEvt.preventDefault();
          setupUserHandle.removeEventListener('click', clickPreventDefaultHandler);
        };
        setupUserHandle.addEventListener('click', clickPreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();

