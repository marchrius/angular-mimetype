describe('utils service', function() {
  beforeEach(function() {
    module('mg.mimetype');
    module('mg.mimetype.constants');
    module('mg.mimetype.directives');
    module('mg.mimetype.factories');
    module('mg.mimetype.filters');
    module('mg.mimetype.utils');
  });

  var $util;

  beforeEach(function() {
    inject(function(_$util_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $util = _$util_;
    });
  });

  describe('hexToBase64', function() {
    it('correctly handles hex to base64 conversion', function(done) {
      expect($util.hexToBase64("68656c6c6f")).toEqual('aGVsbG8='); // hello
      done();
    });
  });

  describe('base64ToHex', function() {
    it('correctly handles base64 to hex conversion', function(done) {
      expect($util.base64ToHex("aGVsbG8=")).toEqual('68656c6c6f'); // hello
      done();
    });
  });

  describe('escapeRegExp', function() {
    it('correctly handles escape reg expressions', function(done) {
      console.log("escapeRegExp: []");
      expect($util.escapeRegExp("[]")).toEqual('\\[\\]');
      console.log("escapeRegExp: {}");
      expect($util.escapeRegExp("{}")).toEqual('\\{\\}');
      console.log("escapeRegExp: [.*+?^${}()|[\]\\]");
      expect($util.escapeRegExp("[.*+?^${}()|[\]\\]")).toEqual('\\[\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\\]\\\\\\]');
      done();
    });
  });
});
