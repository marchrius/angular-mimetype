(function() {
  'use strict';

  angular
    .module('mg.mimetype.providers')
    .provider('$mimeType', fileTypeProvider);

  function mimeTypeProvider($log) {
    $log.debug("mimeTypeProvider initialized.");
  }
})();