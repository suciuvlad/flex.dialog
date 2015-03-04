/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global define, describe, it, $, expect, beforeEach, afterEach, spyOn */

describe('jQuery Plugin', function () {
  'use strict';
  var anchorHtml = '<a class="anchor" data-dialog-target=".js-dialog" data-toggle="dialog"></a>',
    elemHtml = '<div class="js-dialog"></div>',
    $elem,
    dialog;

  beforeEach(function () {
    $('body').append(anchorHtml);
    $('body').append(elemHtml);
    $elem = $('.js-dialog');
  });

  afterEach(function () {
    $('.js-dialog').remove();
    $('.anchor').remove();
  });

  describe('Helper Methods', function () {
    it('activate dialogs without writing javascript', function () {
      $('.anchor').trigger('click');
      expect($elem.hasClass('is-shown')).toBeTruthy();
    });
  });
});

describe('Dialog', function () {
  'use strict';

  var elemHtml,
    $elem,
    dialog;

  it('.dialog exists on the jQuery Object', function () {
    expect($('body').dialog()).toBeDefined();
  });

  beforeEach(function () {
    elemHtml = '<div class="js-dialog"><a data-dialog="dismiss" class="mdl--close">Close</a></div>';
    $('body').append(elemHtml);
    $elem = $('.js-dialog');
  });

  afterEach(function () {
    $('.js-dialog').remove();
  });

  it('data attributes take precedence', function () {
    var dataAttribute = "js-dialog--hide",
      options = {closeClassName: 'noop'},
      dialog;

    $elem.data('closeClassName', dataAttribute).dialog(options);
    dialog = $elem.data('plugin_dialog');
    expect(dialog.options.closeClassName).toMatch(dataAttribute);
  });

  it('options passed to constructor override defaults', function () {
    var attribute = "js-dialog--hide",
      dialog;

    $elem.dialog({ closeClassName: attribute });
    dialog = $elem.data('plugin_dialog');
    expect(dialog.options.closeClassName).toMatch(attribute);
  });

  describe('#show', function () {
    it('should make the dialog visible by adding the class name `is-shown`', function () {
      $elem.dialog();
      expect($elem.hasClass('is-shown')).toBeTruthy();
    });

    it('appends the overlay markup to the body', function () {
      var dialog = $elem.dialog().data('plugin_dialog');
      expect($('body').find('.' + dialog.options.overlayClass).length)
        .toBeTruthy();
    });

    it('should call overlay`s show method', function () {
      var dialog;

      dialog = $elem.dialog({autoOpen: false}).data('plugin_dialog');
      spyOn(dialog.config.overlay, 'show');

      $elem.dialog('show');
      expect(dialog.config.overlay.show).toHaveBeenCalled();
    });

    it('calls the #onShow callback', function () {
      /** We need to spy the method before we use it.
       * Thus, we set `autoOpen:true` first
      */
      var dialog = $elem.dialog({autoOpen: false}).data('plugin_dialog');
      spyOn(dialog.options, 'onShow');

      $elem.dialog('show');
      expect(dialog.options.onShow).toHaveBeenCalled();
    });

    describe('already shown', function () {
      it('returns undefined', function () {
        var dialog;
        $elem.dialog();
        $elem.dialog().data('plugin_dialog');
        expect(dialog).toBeUndefined();
      });
    });
  });

  describe('#close', function () {
    it('should make the dialog hidden by removing the class name `is-shown`', function () {
      $elem.dialog();
      $elem.dialog('close');
      expect($elem.hasClass('is-shown')).toBeFalsy();
    });

    it('should call Overlay`s close method', function () {
      var dialog;
      $elem.dialog();

      dialog = $elem.data('plugin_dialog');
      spyOn(dialog.config.overlay, 'close');

      $elem.dialog('close');
      expect(dialog.config.overlay.close).toHaveBeenCalled();
    });

    it('calls the #onClose callback', function () {
      var dialog;
      $elem.dialog();
      dialog = $elem.data('plugin_dialog');
      spyOn(dialog.options, 'onClose');
      $elem.dialog('close');
      expect(dialog.options.onClose).toHaveBeenCalled();
    });
  });

  describe('events', function () {
    describe('clicking the close button', function () {
      it('closes an open dialog', function () {
        var dialog,
          className;

        $elem.dialog();
        dialog = $elem.data('plugin_dialog');
        className = '.' + dialog.options.closeClassName;
        $('[data-dialog="dismiss"]').trigger('click');
        expect($elem.hasClass('is-shown')).toBeFalsy();
      });
    });

    describe('clicking the overlay', function () {
      it('closes an open dialog', function () {
        var dialog,
          className;
        $elem.dialog();

        dialog = $elem.data('plugin_dialog');
        className = '.dlg--overlay';

        $(className).trigger('click');

        expect($elem.hasClass('is-shown')).toBeFalsy();
      });
    });
  });

});
