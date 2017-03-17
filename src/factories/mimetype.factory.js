(function() {
  'use strict';

  angular.module('mg.mimetype.factories')
    .factory('mimeType', MimeTypeFactory);

  function MimeTypeFactory($util, fileType) {
    var MimeTypeFactory = {};

    var MAX_LEN = 255;
    var EMPTY_STRING = "".toString();

    MimeTypeFactory.fromString = function(str) {
      return fromString(str);
    };

    MimeTypeFactory.fromArrayBuffer = function(arrayBuffer) {
      return fromArrayBuffer(arrayBuffer);
    };

    MimeTypeFactory.fromBlob = function(blob) {
      return fromBlob(blob);
    };

    MimeTypeFactory.fromAuto = function(unknown) {
      if (unknown instanceof ArrayBuffer) {
        return fromArrayBuffer(unknown);
      } else if (unknown instanceof Blob) {
        return fromBlob(unknown);
      } else if (unknown instanceof String) {
        return fromString(unknown);
      } else {
        return fromString(unknown);
      }
    };

    function fromString(input) {
      if (angular.isUndefined(input))
        return EMPTY_STRING;
      var found = null,
        obj = null,
        part, hex, res;
      for (var prop in fileType) {
        if ($util.hop(fileType, prop) && input.startsWith(prop)) {
          obj = fileType[prop];
          if (angular.isArray(obj)) {
            for (var i = 0, len = obj.length; i < len; i++) {
              part = input.substr(0, MAX_LEN);
              hex = $util.base64ToHex(part, false).toUpperCase();
              res = test(obj[i].regex, hex);
              if (res)
                return obj[i].type;
            }
          } else {
            part = input.substr(0, MAX_LEN);
            hex = $util.base64ToHex(part, false).toUpperCase();
            res = test(obj.regex, hex);
            if (res)
              return obj.type;
          }
        }
      }
      return EMPTY_STRING;
    }

    function test(regStr, compStr) {
      return (new RegExp(regStr)).test(compStr);
    }

    return MimeTypeFactory;
  }

})();