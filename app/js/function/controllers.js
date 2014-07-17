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
  
  .directive('smTristate', function() {
	return {
	  restrict: 'A',
		scope: {
			state: '=smModel'
		},
		link: function(scope, element, attrs) {
		  scope.$watch(attrs.smModel, function(value) {
				switch (scope.state) {
					case Value.DC: case Value.ZERO: case Value.ONE: break;
					default: scope.state = Value.DC; break;
				}
				element.text(scope.state);
		  });

			element.on('click', function(event) {
				event.preventDefault();
				var newValue = Value.DC;
				switch (scope.state) {
					case Value.DC: newValue = Value.ZERO; break;
					case Value.ZERO: newValue = Value.ONE; break;
				}
				element.text(newValue);
				scope.$apply(function() {
					scope.state = newValue;
				});
			});
		}
	}
  })
  
  .controller('FunctionCtrl', function($scope) {
      $scope.df = new DigitalFunction('func', 'New function', [ new Input('x', '') ]);
      
      $scope.addInput = function() {
          var inputs = $scope.df.getInputs();
          var inputIdx = 0;
          while (inputIdx < INPUT_IDS.length 
            && inputs.some(function(el) { return el.id === INPUT_IDS[inputIdx] })) {
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
      
      function calcInputDivider() {
          var inputs = $scope.df.getInputs();
          return Math.floor(inputs.length / 2) + inputs.length % 2;
      };

      function getHorizontalInputs() {
          var inputs = $scope.df.getInputs();
          if (inputs.length === 0) return [];
          return inputs.slice(0, calcInputDivider());
      }
      
      function getVerticalInputs() {
          var inputs = $scope.df.getInputs();
          if (inputs.length === 0) return [];
          return inputs.slice(calcInputDivider());
      }
      
      $scope.getHorizontalLabel = function() {
          return getHorizontalInputs().map(function(el) { return el.id }).join(',');
      };
      
      $scope.getHorizontalInputLabels = function() {
          var inputs = getHorizontalInputs();
          return InputState.permutateStates(inputs).map(function(state) { return state.stringifyValues(inputs) });
      };
      
      $scope.getHorizontalInputStates = function() {
          var inputs = getHorizontalInputs();
          return InputState.permutateStates(inputs).map(function(state) { return state.stringify(inputs) });
      };
      
      $scope.getVerticalLabel = function() {
          return getVerticalInputs().map(function(el) { return el.id }).join(',');
      };
      
      $scope.getVerticalInputLabels = function() {
          if ($scope.df.getInputs().length < 2 ) return [ '' ];
          var inputs = getVerticalInputs();
          return InputState.permutateStates(inputs).map(function(state) { return state.stringifyValues(inputs) });
      };
      
      $scope.getVerticalInputStates = function() {
          if ($scope.df.getInputs().length < 2) return [ '' ];
          var inputs = getVerticalInputs();
          return InputState.permutateStates(inputs).map(function(state) { return state.stringify(inputs) });
      };
      
  })
  
  .controller('InputStateMatrixCtrl', function($scope) {
	$scope.state = $scope.df.inputStateHolder(new InputState($scope.horizontalInputState).addAll($scope.verticalInputState));
  })
;
