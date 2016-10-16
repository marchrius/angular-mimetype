 (function () {
  'use strict';

  angular.module('mg.mimetype.filters')
    .filter('mimetype', function ($log, fileType) {

      return function mimeTypeFilter() {
        var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        $log.debug(args, fileType);
        
      };
  });
})();