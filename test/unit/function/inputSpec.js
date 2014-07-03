'use strict';

describe('Input object', function() {
    it('should set initialization fields', function() {
        var input = new Input('id1', 'desc1');
        expect(input.id).toEqual('id1');
        expect(input.desc).toEqual('desc1');
    });
});

describe('InputState object', function() {
    var input1, input2, input3, state;
    
    beforeEach(function() {
        input1 = new Input('1');
        input2 = new Input('B');
        input3 = new Input('XYZ');
        state = new InputState();
    });
    
    it('should add new input values by Input', function() {
        expect(state.add(input1, Value.ONE)).toBe(state);
        expect(state.add(input2, Value.ZERO).add(input3, Value.ONE)).toBe(state);
    });
    
    it('should add new input values by string', function() {
        expect(state.add(input1.id, Value.ONE)).toBe(state);
        expect(state.add(input2.id, Value.ZERO).add(input3.id, Value.ONE)).toBe(state);
    });
    
    it('should stringify zero inputs', function() {
        expect(state.stringify()).toEqual('');
    });
    
    it('should stringify one input', function() {
        state.add(input1, Value.ZERO);
        expect(state.stringify()).toEqual('1:0');
    });
    
    it('should stringify two inputs', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE);
        expect(state.stringify()).toEqual('1:0,B:1');
    });
    
    it('should stringify three inputs', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE).add(input3, Value.ONE);
        expect(state.stringify()).toEqual('1:0,B:1,XYZ:1');
    });
    
    it('constructor should objectify', function() {
        var state2 = new InputState('1:0,B:1,XYZ:1');
        expect(state2.stringify()).toEqual('1:0,B:1,XYZ:1');
    });
    
    it('should reject values other than Value.ZERO or Value.ONE', function() {
        var addONE = function() {
            state.add(input1, Value.ONE);
        };
        var addZERO = function() {
            state.add(input2, Value.ZERO);
        };
        var addDC = function() {
            state.add(input3, Value.DC);
        };
        var addNull = function() {
            state.add(input3, null);
        };
        var addRandom = function() {
            state.add(input3, '12345');
        };
        expect(addONE).not.toThrow();
        expect(addZERO).not.toThrow();
        expect(addDC).toThrow();
        expect(addNull).toThrow();
        expect(addRandom).toThrow();
    });
    
    it('should objectify zero inputs', function() {
        state.objectify('');
        expect(state.stringify()).toEqual('');
    });
    
    it('should objectify one input', function() {
        state.objectify('1:0');
        expect(state.stringify()).toEqual('1:0');
    });
    
    it('should objectify two inputs', function() {
        state.objectify('1:0,B:1');
        expect(state.stringify()).toEqual('1:0,B:1');
    });
    
    it('should objectify three inputs', function() {
        state.objectify('1:0,B:1,XYZ:1');
        expect(state.stringify()).toEqual('1:0,B:1,XYZ:1');
    });
    
    it('should overwrite when calling objectify', function() {
        state.objectify('1:0,B:1,XYZ:1');
        expect(state.stringify()).toEqual('1:0,B:1,XYZ:1');
        state.objectify('B:1');
        expect(state.stringify()).toEqual('B:1');
    });
});
