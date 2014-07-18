'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('switchminapp.controllers'));

  it('should create NavCtrl', inject(function($controller) {
    var $scope ={};
    var ctrl = $controller('NavCtrl', { $scope: $scope, $route: { } });
    expect(ctrl).toBeDefined();
    expect($scope.$route).toBeDefined();
  }));

  it('should create CostsCtrl', inject(function($controller) {
    var costsCtrl = $controller('CostsCtrl', { $scope: {} });
    expect(costsCtrl).toBeDefined();
  }));

});
