(function() {
  'use strict';

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(str2) {
      return this.indexOf(str2) === 0;
    };
  }
})();