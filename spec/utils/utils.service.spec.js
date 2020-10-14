
/**
 *
 * utils.service.spec.js
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

  var $util;

  beforeEach(function() {
    inject(function(_$util_) {
      $util = _$util_;
    });
  });

  describe("hexToBase64", function() {
    it("correctly handles hex to base64 conversion", function(done) {
      expect($util.hexToBase64("68656c6c6f")).toEqual("aGVsbG8="); // hello
      done();
    });
  });

  describe("base64ToHex", function() {
    it("correctly handles base64 to hex conversion", function(done) {
      expect($util.base64ToHex("aGVsbG8=")).toEqual("68656c6c6f"); // hello
      done();
    });
  });
});
