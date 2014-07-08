'use strict';

var INPUT_IDS = ['x', 'y', 'z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];

angular.module('switchminapp.function.controllers', [])
  .directive('inputIdValid', function() {
      return {
          require: 'ngModel',
          link: function(scope, elm, attrs, ctrl) {
              ctrl.$parsers.unshift(function(viewValue) {
                  try {
                      new Input(viewValue, '');
                      ctrl.$setValidity('inputIdValid', true);
                      return viewValue;
                  } catch (e) {
                      ctrl.$setValidity('inputIdValid', false);
                      return undefined;
                  }
              });
          }
      };
  })
  
  .controller('FunctionCtrl', function($scope) {
      $scope.df = new DigitalFunction('func', 'New function', [ new Input('x', '') ]);
      
      $scope.addInput = function() {
          var inputs = $scope.df.getInputs();
          var inputIdx = 0;
          while (inputIdx < INPUT_IDS.length 
            && inputs.some(function(el) { return el.id == INPUT_IDS[inputIdx] })) {
                inputIdx++;
          }
          var input = new Input(inputIdx < INPUT_IDS.length ? INPUT_IDS[inputIdx] : 'input', '');
          inputs.push(input);
          $scope.df.setInputs(inputs);
      };
      
      $scope.removeInput = function(index) {
          var inputs = $scope.df.getInputs();
          if (inputs.length > 1 && index >= 0 && index < inputs.length) {
              inputs.splice(index, 1);
              $scope.df.setInputs(inputs);
          }
      };
  })
;
