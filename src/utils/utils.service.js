
/**
 *
 * utils.service.js
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
      str = str.replace(/\r|\n/g, "");
      str = str.replace(/([\da-fA-F]{2}) ?/g, "0x$1 ");
      str = str.replace(/ +$/, "");
      str = str.split(" ");
      str = String.fromCharCode.apply(null, str);
      return btoa(str);
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