(function() {
  'use strict';

  angular.module('mg.mimetype.filters')
    .filter('mimetype', mimetypeFilter);

  function mimetypeFilter(mimeType) {
    return function() {
      return mimeType.fromAuto.apply(mimeType, arguments);
    };
  }
})();