
/**
 *
 * mimetype.filter.spec.js
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


describe("utils service", function() {
  beforeEach(function() {
    module("mg.mimetype");
    module("mg.mimetype.constants");
    module("mg.mimetype.directives");
    module("mg.mimetype.factories");
    module("mg.mimetype.filters");
    module("mg.mimetype.utils");
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
      $mimetype = $filter("mimetype");
    });
  });

  describe("fromString", function() {
    it("correctly detect mimetype from strings", function(done) {
      base64Strings.forEach(function (value) {
        expect($mimetype(value.base64)).toEqual(value.expected);
      });
      done();
    });
  });
});
