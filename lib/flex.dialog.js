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

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'wolfy87-eventemitter', './dialog.overlay'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'), require('wolfy87-eventemitter'), require('./dialog.overlay'));
    } else {
        factory(jQuery, EventEmitter, window.Flex.Dialog.Overlay);
    }

}(function($, Emitter, Overlay) {

  'use strict';

  var Dialog = window.Flex.Dialog || {},
    buildConfig,
    defaults;

  defaults = {
    autoOpen: true,
    evtCloseOnESC: true,
    evtCloseOnOverlay: true,
    overlayClass: 'dlg--overlay',
    onShow: function () {},
    onClose: function () {}
  };

  /**
  * Dialog
  */
  Dialog = function (elem, options) {
    this.version = '0.0.1';
    this.options = options;
    this.$elem = $(elem);
    this.isShown = false;

    this.config = buildConfig(this.options);
    this._setupBindings();

    return this;
  };

  Dialog.prototype.show = function () {
    if (this.isShown) { return; }
    this.isShown = true;

    this.$elem.addClass('is-shown');
    this.config.overlay.show();

    this.options.onShow.call(this);
    return this;
  };

  Dialog.prototype.close = function () {
    if (!this.isShown) { return; }
    this.isShown = false;

    this.$elem.removeClass('is-shown');
    this.config.overlay.close();

    this.options.onClose.call(this);
    return this;
  };

  Dialog.prototype._setupBindings = function () {
    var self = this;

    if (this.options.evtCloseOnESC) {
      $('body').keyup(function (e) {
        if (e.which === 27) {
          self.close();
        }
      });
    }

    this.$elem.on('click', '[data-dialog="dismiss"]', $.proxy(this.close, this));
    this.config.overlay.on('event:overlay:clicked', $.proxy(this.close, this));
  };

  Dialog.prototype.defaults = defaults;
  Emitter(Dialog.prototype);

  buildConfig = function (options) {
    var config = {};
    config.overlay = new Overlay(options);

    return config;
  };

  $.plugin = function (name, Klass) {
    $.fn[name] = function (options) {
      return this.each(function () {
        var data = $.data(this, 'plugin_' + name),
          initOptions = $.extend({}, typeof options === 'object' && options),
          dataOptions = $(this).data(),
          extOptions = $.extend({}, Dialog.prototype.defaults, initOptions, dataOptions);
        if (!data) {
          $.data(this, 'plugin_' + name, (data = new Klass(this, extOptions)));
        }

        // It's an action such as `show`
        if (typeof options === 'string') {
          data[options]();
        } else if (extOptions.autoOpen) {
          data.show();
        }
      });
    };
  };

  $.plugin('dialog', Dialog);

  $(document).on('click', '[data-toggle="dialog"]', function (e) {
    e.preventDefault();

    var selector = $(this).attr('data-dialog-target'),
      dialog = $(selector).dialog();
  });

  return Dialog;
}));
