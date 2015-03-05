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

  'use strict';

  window.Flex = window.Flex || {};

  var Dialog = window.Flex.Dialog = {};

  Dialog.Overlay = (function (options) {
    var emitter = new Emitter();

    return {
      show: function () {
        var elem =
          $('<div class="' + options.overlayClass + '"></div>').appendTo('body');

        if (options.evtCloseOnOverlay) {
          elem.on('click', function (e) {
            emitter.emit('event:overlay:clicked');
          });
        }
      },

      close: function () {
        var className = '.' + options.overlayClass,
          elem = $(className);

        elem.remove();
        if (options.evtCloseOnOverlay) {
          elem.off('click');
        }
      },

      on: function (event, callback) {
        emitter.on(event, callback);
      }
    };
  });
  
  return Dialog.Overlay;
}));
