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
