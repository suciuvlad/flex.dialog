/*jslint nomen: true, unparam: true, regexp: true, indent: 2 */
/*global define, describe, it, $, expect, beforeEach, afterEach, Flex */

describe('Overlay', function () {
  'use strict';
  var options,
    overlay;

  beforeEach(function () {
    options = { overlayClass: 'js-overlay' };
    overlay = Flex.Dialog.Overlay(options);
  });

  describe("#show", function () {
    it('appends the html markup to body', function () {
      overlay.show();
      expect($('body').find('.' +
          options.overlayClass).length).toBeGreaterThan(0);
    });
  });

  describe("#close", function () {
    it('removes the html markup from body', function () {
      var optionsoverlay = Flex.Dialog.Overlay(options);

      overlay.show();
      overlay.close();
      expect($('body').find('.' +
          options.overlayClass).length).toBeLessThan(1);
    });
  });
});
