'use strict';

// Перетаскивание диалога редактирования персонажа (draggable)
var setup = document.querySelector('.setup');
var setupUserHandle = setup.querySelector('.upload');

setupUserHandle.addEventListener('mousedown', function (evt) {

  var startPosition = {x: evt.clientX, y: evt.clientY};

  var dragged = false;

  var mouseMoveHandler = function (moveEvt) {
    dragged = true;

    var shift = {x: startPosition.x - moveEvt.clientX, y: startPosition.y - moveEvt.clientY};

    startPosition = {x: moveEvt.clientX, y: moveEvt.clientY};

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
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
