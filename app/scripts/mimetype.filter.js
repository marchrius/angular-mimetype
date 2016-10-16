 (function () {
  'use strict';

  /**
   * @ngdoc function
   * @name mg.mimetype.filters.filter:mimeType
   * @description
   * # mimeTypeFilter
   * Filter of the mg.mimetype
   */
  angular.module('mg.mimetype.filters')
    .filter('mimetype', MimeTypeFilter);

  function MimeTypeFilter($log, fileTypeConstants) {

    return mimeTypeFilter() {
      var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));


    }
  };
})();