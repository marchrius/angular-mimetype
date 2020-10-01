describe('utils service', function() {
  beforeEach(function() {
    module('mg.mimetype');
    module('mg.mimetype.constants');
    module('mg.mimetype.directives');
    module('mg.mimetype.factories');
    module('mg.mimetype.filters');
    module('mg.mimetype.utils');
  });

  var $mimetype;

  var $filter;

  var base64Strings =
  [
    {
      "expected": "image/gif",
      "base64": "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    },
    {
      "expected": "image/png",
      "base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    },
    {
      "expected": "image/gif",
      "base64": "R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    }
  ];

  beforeEach(function() {
    inject(function(_$filter_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $filter = _$filter_;
      $mimetype = $filter('mimetype');
    });
  });

  describe('fromString', function() {
    it('correctly detect mimetype from strings', function(done) {
      base64Strings.forEach(function (value) {
        console.info("Checking " + value.base64 + " to be as " + value.expected);
        expect($mimetype(value.base64)).toEqual(value.expected);
      });
      done();
    });
  });
});
