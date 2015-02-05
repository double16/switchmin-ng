'use strict';

/* Controllers */

angular.module('switchminapp.controllers', [])
  .controller('NavCtrl', function($scope, $route) {
      $scope.$route = $route;
  })
  .controller('CostsCtrl', function($scope) {
  })
  .controller('RealizationCtrl', function($scope) {
  })
;
