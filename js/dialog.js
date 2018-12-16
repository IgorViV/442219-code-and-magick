'use strict';

(function () {

  var blockSetup = document.querySelector('.setup');
  var setupUserHandle = blockSetup.querySelector('.upload');
  var buttonSetupOpen = document.querySelector('.setup-open');
  var buttonSetupClose = blockSetup.querySelector('.setup-close');
  var setupUserName = blockSetup.querySelector('.setup-user-name');
  var form = blockSetup.querySelector('.setup-wizard-form');
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

  form.addEventListener('submit', function (evt) {
    var onLoad = function (response) {
      blockSetup.classList.add('hidden');
      var message = document.querySelector('.setup-message');
      if (response && message) {
        message.style.display = 'none';
      }
    };

    var onError = function (errorMessage) {
      var dialogFooter = document.querySelector('.setup-footer');
      var tagError = document.createElement('div');
      dialogFooter.style.position = 'relative';
      tagError.className = 'setup-message';
      tagError.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      tagError.style.position = 'absolute';
      tagError.style.top = 0;
      tagError.style.left = 0;
      tagError.style.right = 0;
      tagError.style.fontSize = '30px';
      tagError.textContent = errorMessage;
      dialogFooter.appendChild(tagError);
    };

    window.backend.save(new FormData(form), onLoad, onError);
    evt.preventDefault();
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

