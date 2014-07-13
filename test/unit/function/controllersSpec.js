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
        $controller('FunctionCtrl', { $scope: $scope });
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
        $controller('FunctionCtrl', { $scope: $scope });
        $scope.removeInput(0);
        var inputs = $scope.df.getInputs();
        expect(inputs.length).toEqual(1);
        expect(inputs[0].id).toEqual('x');
    }));
    
    it('should remove input at beginning', inject(function($controller) {
        var $scope = {};
        $controller('FunctionCtrl', { $scope: $scope });
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
        $controller('FunctionCtrl', { $scope: $scope });
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
        $controller('FunctionCtrl', { $scope: $scope });
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
        $controller('FunctionCtrl', { $scope: $scope });
        $scope.addInput();
        $scope.addInput();
        var df = $scope.df;
        var inputs = df.getInputs();
        $scope.removeInput(-1);
        expect(df.getInputs()).toEqual(inputs);
        $scope.removeInput(100);
        expect(df.getInputs()).toEqual(inputs);
    }));
    
    describe('function table (x)', function() {
        var $scope;
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('FunctionCtrl', { $scope: $scope });
        }));
        
        it('should return horizontal label', inject(function($controller) {
            expect($scope.getHorizontalLabel()).toEqual('x');
        }));
        
        it('should return horizontal input labels', inject(function($controller) {
            expect($scope.getHorizontalInputLabels()).toEqual(['0','1']);
        }));
        
        it('should return horizontal input states', inject(function($controller) {
            expect($scope.getHorizontalInputStates()).toEqual(['x:0','x:1']);
        }));
        
        it('should return vertical label', inject(function($controller) {
            expect($scope.getVerticalLabel()).toEqual('');
        }));
        
        it('should return vertical input labels', inject(function($controller) {
            expect($scope.getVerticalInputLabels()).toEqual(['']);
        }));
        
        it('should return vertical input states', inject(function($controller) {
            expect($scope.getVerticalInputStates()).toEqual(['']);
        }));
    });
        
    describe('function table (x,y)', function() {
        var $scope;
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('FunctionCtrl', { $scope: $scope });
            $scope.addInput(new Input('y', ''));
        }));
        
        it('should return horizontal label', inject(function($controller) {
            expect($scope.getHorizontalLabel()).toEqual('x');
        }));
        
        it('should return horizontal input labels', inject(function($controller) {
            expect($scope.getHorizontalInputLabels()).toEqual(['0','1']);
        }));
        
        it('should return horizontal input states', inject(function($controller) {
            expect($scope.getHorizontalInputStates()).toEqual(['x:0','x:1']);
        }));
        
        it('should return vertical label', inject(function($controller) {
            expect($scope.getVerticalLabel()).toEqual('y');
        }));
        
        it('should return vertical input labels', inject(function($controller) {
            expect($scope.getVerticalInputLabels()).toEqual(['0','1']);
        }));
        
        it('should return vertical input states', inject(function($controller) {
            expect($scope.getVerticalInputStates()).toEqual(['y:0','y:1']);
        }));
    });

    describe('function table (x,y,z)', function() {
        var $scope;
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('FunctionCtrl', { $scope: $scope });
            $scope.addInput(new Input('y', ''));
            $scope.addInput(new Input('z', ''));
        }));
        
        it('should return horizontal label', inject(function($controller) {
            expect($scope.getHorizontalLabel()).toEqual('x,y');
        }));
        
        it('should return horizontal input labels', inject(function($controller) {
            expect($scope.getHorizontalInputLabels()).toEqual(['00','01','10','11']);
        }));
        
        it('should return horizontal input states', inject(function($controller) {
            expect($scope.getHorizontalInputStates()).toEqual(['x:0,y:0','x:0,y:1','x:1,y:0','x:1,y:1']);
        }));
        
        it('should return vertical label', inject(function($controller) {
            expect($scope.getVerticalLabel()).toEqual('z');
        }));
        
        it('should return vertical input labels', inject(function($controller) {
            expect($scope.getVerticalInputLabels()).toEqual(['0','1']);
        }));
        
        it('should return for vertical input states', inject(function($controller) {
            expect($scope.getVerticalInputStates()).toEqual(['z:0','z:1']);
        }));
    });

    describe('function table (x,y,z,a)', function() {
        var $scope;
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('FunctionCtrl', { $scope: $scope });
            $scope.addInput(new Input('y', ''));
            $scope.addInput(new Input('z', ''));
            $scope.addInput(new Input('a', ''));
        }));
        
        it('should return horizontal label', inject(function($controller) {
            expect($scope.getHorizontalLabel()).toEqual('x,y');
        }));
        
        it('should return horizontal input labels', inject(function($controller) {
            expect($scope.getHorizontalInputLabels()).toEqual(['00','01','10','11']);
        }));
        
        it('should return horizontal input states', inject(function($controller) {
            expect($scope.getHorizontalInputStates()).toEqual(['x:0,y:0','x:0,y:1','x:1,y:0','x:1,y:1']);
        }));
        
        it('should return vertical label', inject(function($controller) {
            expect($scope.getVerticalLabel()).toEqual('z,a');
        }));
        
        it('should return vertical input labels', inject(function($controller) {
            expect($scope.getVerticalInputLabels()).toEqual(['00','01','10','11']);
        }));
        
        it('should return vertical input states', inject(function($controller) {
            expect($scope.getVerticalInputStates()).toEqual(['z:0,a:0','z:0,a:1','z:1,a:0','z:1,a:1']);
        }));
    });

    describe('function table (x,y,z,a,b)', function() {
        var $scope;
        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('FunctionCtrl', { $scope: $scope });
            $scope.addInput(new Input('y', ''));
            $scope.addInput(new Input('z', ''));
            $scope.addInput(new Input('a', ''));
            $scope.addInput(new Input('b', ''));
        }));
        
        it('should return horizontal label', inject(function($controller) {
            expect($scope.getHorizontalLabel()).toEqual('x,y,z');
        }));
        
        it('should return horizontal input labels', inject(function($controller) {
            expect($scope.getHorizontalInputLabels()).toEqual(['000','001','010','011','100','101','110','111']);
        }));
        
        it('should return horizontal input states', inject(function($controller) {
            expect($scope.getHorizontalInputStates()).toEqual(
                ['x:0,y:0,z:0','x:0,y:0,z:1','x:0,y:1,z:0','x:0,y:1,z:1','x:1,y:0,z:0','x:1,y:0,z:1','x:1,y:1,z:0','x:1,y:1,z:1']);
        }));
        
        it('should return vertical label', inject(function($controller) {
            expect($scope.getVerticalLabel()).toEqual('a,b');
        }));
        
        it('should return vertical input labels', inject(function($controller) {
            expect($scope.getVerticalInputLabels()).toEqual(['00','01','10','11']);
        }));
        
        it('should return vertical input states', inject(function($controller) {
            expect($scope.getVerticalInputStates()).toEqual(['a:0,b:0','a:0,b:1','a:1,b:0','a:1,b:1']);
        }));
    });

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
