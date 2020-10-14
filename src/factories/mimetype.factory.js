
/**
 *
 * mimetype.factory.js
 * 
 * Copyright (c) 2016 - 2020, Matteo Gaggiano and the angular-mimetype contributors
 * SPDX-License-Identifier: MIT
 * 
 * 
 * MIT License
 * 
 * Copyright (c) 2016 Matteo Gaggiano
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice (including the next paragraph) shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


(function() {
  "use strict";

  angular.module("mg.mimetype.factories")
    .factory("mimeType", MimeTypeFactory);

  function MimeTypeFactory($util, fileType, $q) {
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
        return MimeTypeFactory.fromArrayBuffer(unknown);
      } else if (unknown instanceof Blob) {
        return MimeTypeFactory.fromBlob(unknown);
      } else if (unknown instanceof String) {
        return MimeTypeFactory.fromString(unknown);
      } else {
        return MimeTypeFactory.fromString(unknown);
      }
    };

    function fromBlob(blob) {
      var promise = $q(function(resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener("error", function() {
          reject(reader.error);
        });
        reader.addEventListener("loadend", function() {
          resolve(reader.result);
        });
        reader.readAsDataURL(blob);
      });
      return promise;
    }

    function fromArrayBuffer(arrayBuffer) {
      var asString = window.btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
      return fromString(asString);
    }

    function fromString(input) {
      if (angular.isUndefined(input))
        return EMPTY_STRING;
      var obj = null,
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