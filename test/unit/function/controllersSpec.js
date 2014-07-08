'use strict';

describe('function controllers', function() {
    beforeEach(module('switchminapp.function.controllers'));

    it('should create a new digitial function', inject(function($controller) {
        var $scope = {};
        var funcCtrl = $controller('FunctionCtrl', { $scope: $scope });
        expect(funcCtrl).toBeDefined();
        expect($scope.df).toBeDefined();
    }));

    it('should add inputs x,y,z,a,b,c', inject(function($controller) {
        var $scope = {};
        var funcCtrl = $controller('FunctionCtrl', { $scope: $scope });
        expect($scope.addInput).toBeDefined();
        $scope.addInput(); // y
        $scope.addInput(); // z
        $scope.addInput(); // a
        $scope.addInput(); // b
        $scope.addInput(); // c
        var inputs = $scope.df.getInputs();
        expect(inputs.length).toEqual(6);
        expect(inputs[0].id).toEqual('x');
        expect(inputs[1].id).toEqual('y');
        expect(inputs[2].id).toEqual('z');
        expect(inputs[3].id).toEqual('a');
        expect(inputs[4].id).toEqual('b');
        expect(inputs[5].id).toEqual('c');
    }));
    
    it('should not remove the only input', inject(function($controller) {
        var $scope = {};
        var funcCtrl = $controller('FunctionCtrl', { $scope: $scope });
        var df = $scope.df;
        $scope.removeInput(0);
        var inputs = $scope.df.getInputs();
        expect(inputs.length).toEqual(1);
        expect(inputs[0].id).toEqual('x');
    }));
    
    it('should remove input at beginning', inject(function($controller) {
        var $scope = {};
        var funcCtrl = $controller('FunctionCtrl', { $scope: $scope });
        expect($scope.addInput).toBeDefined();
        $scope.addInput(); // y
        $scope.addInput(); // z
        $scope.addInput(); // a
        $scope.addInput(); // b
        $scope.addInput(); // c
        $scope.removeInput(0);
        var inputs = $scope.df.getInputs();
        expect(inputs.length).toEqual(5);
        expect(inputs[0].id).toEqual('y');
        expect(inputs[1].id).toEqual('z');
        expect(inputs[2].id).toEqual('a');
        expect(inputs[3].id).toEqual('b');
        expect(inputs[4].id).toEqual('c');
    }));
    
    it('should remove input at the end', inject(function($controller) {
        var $scope = {};
        var funcCtrl = $controller('FunctionCtrl', { $scope: $scope });
        expect($scope.addInput).toBeDefined();
        $scope.addInput(); // y
        $scope.addInput(); // z
        $scope.addInput(); // a
        $scope.addInput(); // b
        $scope.addInput(); // c
        $scope.removeInput(5);
        var inputs = $scope.df.getInputs();
        expect(inputs.length).toEqual(5);
        expect(inputs[0].id).toEqual('x');
        expect(inputs[1].id).toEqual('y');
        expect(inputs[2].id).toEqual('z');
        expect(inputs[3].id).toEqual('a');
        expect(inputs[4].id).toEqual('b');
    }));
    
    it('should remove input in the middle', inject(function($controller) {
        var $scope = {};
        var funcCtrl = $controller('FunctionCtrl', { $scope: $scope });
        expect($scope.addInput).toBeDefined();
        $scope.addInput(); // y
        $scope.addInput(); // z
        $scope.addInput(); // a
        $scope.addInput(); // b
        $scope.addInput(); // c
        $scope.removeInput(2);
        var inputs = $scope.df.getInputs();
        expect(inputs.length).toEqual(5);
        expect(inputs[0].id).toEqual('x');
        expect(inputs[1].id).toEqual('y');
        expect(inputs[2].id).toEqual('a');
        expect(inputs[3].id).toEqual('b');
        expect(inputs[4].id).toEqual('c');
    }));
    
    it('should not remove input outside the boundary', inject(function($controller) {
        var $scope = {};
        var funcCtrl = $controller('FunctionCtrl', { $scope: $scope });
        $scope.addInput();
        $scope.addInput();
        var df = $scope.df;
        var inputs = df.getInputs();
        $scope.removeInput(-1);
        expect(df.getInputs()).toEqual(inputs);
        $scope.removeInput(100);
        expect(df.getInputs()).toEqual(inputs);
    }));
    
    describe('input ID validator', function() {
        var scope, form;
        
        beforeEach(inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            scope.testid=null;
            var html='<form name="form"><input type="text" name="testid" input-id-valid ng-model="testid" /></form>';
            var elem = angular.element(html);
            $compile(elem)(scope);
            form = scope.form;
        }));
        
        it('should pass alphanumeric input id', function() {
            form.testid.$setViewValue('x');
            scope.$digest();
            expect(scope.testid).toEqual('x');
            
            form.testid.$setViewValue('Ay2');
            scope.$digest();
            expect(scope.testid).toEqual('Ay2');
        });
        
        it('should fail non-alphanumeric input id', function() {
            form.testid.$setViewValue('!');
            scope.$digest();
            expect(scope.testid).toBeUndefined();
            expect(form.testid.$valid).toBe(false);
        });
        
        it('should fail empty input id', function() {
            form.testid.$setViewValue('');
            scope.$digest();
            expect(scope.testid).toBeUndefined();
            expect(form.testid.$valid).toBe(false);
        });
    });
});
