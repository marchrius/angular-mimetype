'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the demoApp
 */
angular.module('angularMimetypeDemoApp')
  .controller('AboutCtrl', function () {
    var self = this;

    self.author = "Matteo Gaggiano";
    self.appName = "Angular Mimetype";
    self.appDescription = "An utility to check the magic numbers of the file.";
  });
