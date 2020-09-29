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
      },
      // .ELF
      "f0VMRg": {
        "regex": "^7F454C46",
        "name": "elf",
        "type": "application/x-elf",
        "offset": "0"
      },
      "UmFyIRoHAA": {// Rar!... //RAR archive version 1.50 onwards
        "regex": "^526172211A0700",
        "name": "rar",
        "type": "application/x-rar-compressed",
        "offset": "0"
      },
      "UmFyIRoHAQA": {// Rar!.... //RAR archive version 5.0 onwards
        "regex": "^526172211A070100",
        "name": "rar",
        "type": "application/x-rar-compressed",
        "offset": "0"
      }
    });
})();