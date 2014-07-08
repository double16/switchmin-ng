'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('switchminapp.controllers'));

  it('should ....', inject(function($controller) {
    var costsCtrl = $controller('CostsCtrl', { $scope: {} });
    expect(costsCtrl).toBeDefined();
  }));

});
