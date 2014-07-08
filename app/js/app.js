'use strict';


// Declare app level module which depends on filters, and services
angular.module('switchminapp', [
  'ngRoute',
  'switchminapp.filters',
  'switchminapp.services',
  'switchminapp.directives',
  'switchminapp.controllers',
  'switchminapp.function.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {templateUrl: 'partials/about.html', activeNav: 'about', controller: 'NavCtrl'});
  $routeProvider.when('/function', {templateUrl: 'partials/function/function.html', activeNav: 'function', controller: 'FunctionCtrl'});
  $routeProvider.when('/costs', {templateUrl: 'partials/optimizer/costs.html', activeNav: 'costs', controller: 'CostCtrl'});
  $routeProvider.when('/realization', {templateUrl: 'partials/realizer/realization.html', activeNav: 'realization', controller: 'RealizationCtrl'});
  $routeProvider.otherwise({redirectTo: '/about'});
}]);
