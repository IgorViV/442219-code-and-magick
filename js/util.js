'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    randomNumber: function (maxNumber) {
      return Math.floor(Math.random() * maxNumber);
    },
    getMaxElement: function (arr) {
      return Math.max.apply(null, arr);
    }
  };
})();
