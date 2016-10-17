(function() {
  'use strict';

  angular
    .module('mg.mimetype.utils')
    .service('$util', UtilService);

  function UtilService() {
    var service = {};

    service.hexToBase64 = hexToBase64;
    service.base64ToHex = base64ToHex;
    service.hop = hop;
    service.escapeRegExp = escapeRegExp;
    
    function hexToBase64(str) {
      return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
      );
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

    function escapeRegExp(string){
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    return service;
  }
})();