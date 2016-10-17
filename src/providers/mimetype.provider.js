(function() {
  'use strict';

  angular
    .module('mg.mimetype.providers')
    .provider('$mimeType', mimeTypeProvider);

  function mimeTypeProvider($log) {
    $log.debug("mimeTypeProvider initialized.");
  }
})();