(function () {
  var Dialog = {};

  (function(factory) {
      'use strict';
      if (typeof define === 'function' && define.amd) {
          define(['jquery', 'wolfy87-eventemitter'], factory);
      } else if (typeof exports !== 'undefined') {
          module.exports = factory(require('jquery'), require('wolfy87-eventemitter'));
      } else {
          factory(jQuery, EventEmitter);
      }

  }(function($, Emitter) {
    //= include flex.dialog.js
    //= include flex.dialog.overlay.js

    return Dialog;
  }));

  window.Flex = window.Flex || {};
  window.Flex.Dialog = Dialog;

}());
