/**
 * angular-mimetype - An angular plugin to check the mimetype of a given String/Base64/ArrayBuffer
 * @version v0.0.4
 * @author Matteo Gaggiano <m.gaggiano@marchrius.org> (https://marchrius.org/blog)
 * @link https://marchrius.org/blog
 * @maintainers
 * 
 * @license MIT
 */
(function() {
  'use strict';

  angular.module('mg.mimetype', ['mg.mimetype.factories', 'mg.mimetype.filters', 'mg.mimetype.directives', 'mg.mimetype.constants']);

})();
(function() {
  'use strict';

  angular.module('mg.mimetype.constants', []);

})();
(function() {
  'use strict';

  angular.module('mg.mimetype.directives', []);

})();
(function() {
  'use strict';

  angular.module('mg.mimetype.factories', ['mg.mimetype.utils', 'mg.mimetype.constants']);

})();
(function() {
  'use strict';

  angular.module('mg.mimetype.filters', ['mg.mimetype.factories']);

})();
(function() {
  'use strict';

  angular.module('mg.mimetype.utils', []);

})();
(function() {
  'use strict';

  angular.module('mg.mimetype.constants')
    .constant('fileType', {
      // .PNG....
      "iVBORw0KGgo": {
        "regex": "^89504E470D0A1A0A",
        "name": "png",
        "type": "image/png",
        "offset": "0"
      },
      "/9j/": [
        // ÿØÿÛ
        {
          "regex": "^FFD8FFDB",
          "name": "jpeg",
          "type": "image/jpeg",
          "offset": "0"
        },
        // ÿØÿà ..JF IF..
        {
          "regex": "^FFD8FFE0[0-9a-fA-F]{4}4A4649460001",
          "name": "jfif",
          "type": "image/jpeg",
          "offset": "0"
        },
        // ÿØÿá ..Ex if..
        {
          "regex": "^FFD8FFE1[0-9a-fA-F]{4}457869660000",
          "name": "exif",
          "type": "image/jpeg",
          "offset": "0"
        },
      ],
      // %PDF
      "JVBERg": {
        "regex": "^25504446",
        "name": "pdf",
        "type": "application/pdf",
        "offset": "0"
      },
      "R0lGOD": [
        // GIF87a
        {
          "regex": "^474946383761",
          "name": "gif",
          "type": "image/gif",
          "offset": "0"
        },
        // GIF89a
        {
          "regex": "^474946383961",
          "name": "gif",
          "type": "image/gif",
          "offset": "0"
        }
      ],
      // II*.
      "SUkqAA": {
        "regex": "^49492A00",
        "name": "",
        "type": "image/tiff",
        "offset": "0"
      },
      // MM.*
      "TU0AKg": {
        "regex": "^4D4D002A",
        "name": "",
        "type": "image/tiff",
        "offset": "0"
      },
      "AAABAA": {
        "regex": "^00000100",
        "name": "ico",
        "type": "image/ico",
        "offset": "0"
      },
      // 8BPS
      "OEJQUw": {
        "regex": "",
        "name": "psd",
        "type": "",
        "offset": ""
      }
    });
})();
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
(function() {
  'use strict';

  angular.module('mg.mimetype.utils')
    .service('$util', UtilService);

  function UtilService() {
    var service = {};

    service.hexToBase64 = hexToBase64;
    service.base64ToHex = base64ToHex;
    service.hop = hop;
    service.escapeRegExp = escapeRegExp;

    function hexToBase64(str) {
      return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    }

    function base64ToHex(str, flag) {
      flag = !!flag;
      for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
      }
      return hex.join(flag ? " " : "");
    }

    function hop(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    return service;
  }
})();
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
if (!window.atob) {
  var tableStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var table = tableStr.split("");

  window.atob = function(base64) {
    if (/(=[^=]+|={3,})$/.test(base64)) throw new Error("String contains an invalid character");
    base64 = base64.replace(/=/g, "");
    var n = base64.length & 3;
    if (n === 1) throw new Error("String contains an invalid character");
    for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
      var a = tableStr.indexOf(base64[j++] || "A"),
        b = tableStr.indexOf(base64[j++] || "A");
      var c = tableStr.indexOf(base64[j++] || "A"),
        d = tableStr.indexOf(base64[j++] || "A");
      if ((a | b | c | d) < 0) throw new Error("String contains an invalid character");
      bin[bin.length] = ((a << 2) | (b >> 4)) & 255;
      bin[bin.length] = ((b << 4) | (c >> 2)) & 255;
      bin[bin.length] = ((c << 6) | d) & 255;
    }
    return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4);
  };

  window.btoa = function(bin) {
    for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
      var a = bin.charCodeAt(j++),
        b = bin.charCodeAt(j++),
        c = bin.charCodeAt(j++);
      if ((a | b | c) > 255) throw new Error("String contains an invalid character");
      base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
        (isNaN(b) ? "=" : table[((b << 2) & 63) | (c >> 6)]) +
        (isNaN(b + c) ? "=" : table[c & 63]);
    }
    return base64.join("");
  };

}
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(str2) {
    return this.indexOf(str2) === 0;
  };
}