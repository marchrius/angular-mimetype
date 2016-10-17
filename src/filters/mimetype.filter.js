 (function () {
  'use strict';

  angular.module('mg.mimetype.filters')
    .filter('mimetype', function ($log, $util, fileType) {

      var MAX_LEN = 255;
      var EMPTY_STRING = "".toString();
      
      return function mimeTypeFilter() {
        var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        var input = args[0];

        if (input instanceof ArrayBuffer) {
          return fromArrayBuffer(input);
        } else if (input instanceof Blob) {
          return fromBlob(input);
        } else if (input instanceof String) {
          return fromString(input);
        } else {
          return fromString(input);
        }
      };

      function fromString(input) {
        if (typeof input === 'undefined')
          return EMPTY_STRING;
        var found = null, obj = null, part, hex, res;
        for(var prop in fileType) {
          if ($util.hop(fileType, prop) && input.startsWith(prop)) {
            obj = fileType[prop];
            if (angular.isArray(obj)) {
              for(var i = 0; i < obj.length; i++) {
                part = input.substr(0, MAX_LEN);
                hex = $util.base64ToHex(part, false).toUpperCase();
                res = test(obj[i].regex, hex);
                if (res) {
                  return obj[i].type;
                }
              }
            } else {
              part = input.substr(0, MAX_LEN);
              hex = $util.base64ToHex(part, false).toUpperCase();
              res = test(obj.regex, hex);
              if (res) {
                return obj.type;
              }
            }
          }
        }
        return EMPTY_STRING;
      }

      function test(regStr, compStr) {
        return (new RegExp(regStr)).test(compStr);
      }
  });
})();