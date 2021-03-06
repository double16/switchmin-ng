'use strict';

describe('Input object', function() {
    it('should set initialization fields', function() {
        var input = new Input('id1', 'desc1');
        expect(input.id).toEqual('id1');
        expect(input.desc).toEqual('desc1');
    });
    
    it('should only allow alphanumerics for the id', function() {
       expect(function() { new Input('id1', 'desc;[]-=+') }).not.toThrow();
       expect(function() { new Input('id1:', 'desc;[]-=+') }).toThrow();
       expect(function() { new Input('id1,', 'desc;[]-=+') }).toThrow();
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
        expect(state.count()).toEqual(1);
        expect(state.value(input1)).toEqual(Value.ONE);
        expect(state.value(input2)).toBeUndefined();
        expect(state.value(input3)).toBeUndefined();
        expect(state.add(input2, Value.ZERO).add(input3, Value.ONE)).toBe(state);
        expect(state.count()).toEqual(3);
        expect(state.value(input1)).toEqual(Value.ONE);
        expect(state.value(input2)).toEqual(Value.ZERO);
        expect(state.value(input3)).toEqual(Value.ONE);
    });
    
    it('should add new input values by string', function() {
        expect(state.add(input1.id, Value.ONE)).toBe(state);
        expect(state.count()).toEqual(1);
        expect(state.value(input1.id)).toEqual(Value.ONE);
        expect(state.value(input2.id)).toBeUndefined();
        expect(state.value(input3.id)).toBeUndefined();
        expect(state.add(input2.id, Value.ZERO).add(input3.id, Value.ONE)).toBe(state);
        expect(state.count()).toEqual(3);
        expect(state.value(input1.id)).toEqual(Value.ONE);
        expect(state.value(input2.id)).toEqual(Value.ZERO);
        expect(state.value(input3.id)).toEqual(Value.ONE);
    });
    
    it('should stringify zero inputs', function() {
        expect(state.stringify()).toEqual('');
    });
    
    it('should stringify one input', function() {
        state.add(input1, Value.ZERO);
        expect(state.stringify()).toEqual('1:0');
    });
    
    it('should stringify two inputs in sorted order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE);
        expect(state.stringify()).toEqual('1:0,B:1');
    });
    
    it('should stringify three inputs in sorted order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE).add(input3, Value.ONE);
        expect(state.stringify()).toEqual('1:0,B:1,XYZ:1');
    });
    
    it('should stringify two inputs in specified order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE);
        expect(state.stringify([input2, input1])).toEqual('B:1,1:0');
    });
    
    it('should stringify three inputs in specified order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE).add(input3, Value.ONE);
        expect(state.stringify([input2, input1, input3])).toEqual('B:1,1:0,XYZ:1');
    });
    
    it('should stringify zero values', function() {
        expect(state.stringifyValues()).toEqual('');
    });
    
    it('should stringify one value', function() {
        state.add(input1, Value.ZERO);
        expect(state.stringifyValues()).toEqual('0');
    });
    
    it('should stringify two values in sorted input order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE);
        expect(state.stringifyValues()).toEqual('01');
    });
    
    it('should stringify three values in sorted input order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE).add(input3, Value.ONE);
        expect(state.stringifyValues()).toEqual('011');
    });

    it('should stringify two values in specified input order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE);
        expect(state.stringifyValues([input2, input1])).toEqual('10');
    });
    
    it('should stringify three values in specified input order', function() {
        state.add(input1, Value.ZERO).add(input2, Value.ONE).add(input3, Value.ONE);
        expect(state.stringifyValues([input2, input1, input3])).toEqual('101');
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
    
    it('should addAll from an empty argument', function() {
        var state1 = new InputState().add(input1, Value.ZERO);
        expect(state1.addAll(new InputState())).toBe(state1);
        expect(state1.stringify()).toEqual('1:0');
    });
    
    it('should addAll from another InputState', function() {
        var state1 = new InputState().add(input1, Value.ZERO);
        var state2 = new InputState().add(input2, Value.ONE).add(input3, Value.ZERO);
        expect(state1.addAll(state2)).toBe(state1);
        expect(state1.stringify()).toEqual('1:0,B:1,XYZ:0');
    });
    
    it('should removeAll inputs', function() {
        state = new InputState().add(input1, Value.ZERO).add(input2, Value.ONE).add(input3, Value.ZERO);
        expect(state.stringify()).toEqual('1:0,B:1,XYZ:0');
        expect(state.removeAll([ input1, input2 ])).toBe(state);
        expect(state.stringify()).toEqual('XYZ:0');
    });
    
    it('should removeAll input states', function() {
        state = new InputState().add(input1, Value.ZERO).add(input2, Value.ONE).add(input3, Value.ZERO);
        expect(state.stringify()).toEqual('1:0,B:1,XYZ:0');
        expect(state.removeAll([ new InputState().add(input1, Value.ZERO), new InputState().add(input2, Value.ONE) ])).toBe(state);
        expect(state.stringify()).toEqual('XYZ:0');
    });
    
    it('should clone', function() {
        state.add(input1, Value.ZERO);
        var state2 = state.clone().add(input2, Value.ONE);
        expect(state.stringify()).toEqual('1:0');
        expect(state2.stringify()).toEqual('1:0,B:1');
    });
});

describe('InputState permutation', function() {
    var input1, input2, input3;
    
    beforeEach(function() {
        input1 = new Input('x');
        input2 = new Input('y');
        input3 = new Input('z');
    });
    
    it('should handle a null permutation', function() {
        expect(InputState.permutateStates(null)).toEqual([]);
    });  

    it('should handle an empty permutation', function() {
        expect(InputState.permutateStates([])).toEqual([]);
    });  

    it('should handle a single input', function() {
        expect(InputState.permutateStates([input1]).map(function(state) { return state.stringify() }))
            .toEqual(['x:0','x:1']);
    });  

    it('should handle two inputs', function() {
        expect(InputState.permutateStates([input1, input2]).map(function(state) { return state.stringify() }))
            .toEqual(['x:0,y:0','x:0,y:1','x:1,y:0','x:1,y:1']);
    });  

    it('should handle three inputs', function() {
        expect(InputState.permutateStates([input1, input2, input3]).map(function(state) { return state.stringify() }))
            .toEqual(['x:0,y:0,z:0','x:0,y:0,z:1','x:0,y:1,z:0','x:0,y:1,z:1','x:1,y:0,z:0','x:1,y:0,z:1','x:1,y:1,z:0','x:1,y:1,z:1']);
    });  
});
