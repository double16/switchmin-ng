'use strict';


// Declare app level module which depends on filters, and services
angular.module('switchminapp', [
  'ngRoute',
  'switchminapp.filters',
  'switchminapp.services',
  'switchminapp.directives',
  'switchminapp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'MyCtrl1'});
  $routeProvider.when('/function', {templateUrl: 'partials/function/function.html', controller: 'MyCtrl2'});
  $routeProvider.when('/costs', {templateUrl: 'partials/optimizer/costs.html', controller: 'MyCtrl2'});
  $routeProvider.when('/realization', {templateUrl: 'partials/realizer/realization.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/about'});
}]);
