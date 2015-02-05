'use strict';

describe('DigitalFunction object', function() {
    var inputX, inputY, inputZ, inputX2, inputY2, inputZ2, df;
    
    beforeEach(function() {
        inputX = new Input('x', 'x desc');
        inputY = new Input('y', 'y desc');
        inputZ = new Input('z', 'z desc');
        inputX2 = new Input('x2', 'x2 desc');
        inputY2 = new Input('y2', 'y2 desc');
        inputZ2 = new Input('z2', 'z2 desc');
    });

    it('should set initialization fields', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY, inputZ ]);
        expect(df.id).toEqual('df');
        expect(df.desc).toEqual('df desc');
        expect(df.getInputs()).toEqual([ inputX, inputY, inputZ ]);
        expect(df.getVersion()).toEqual(0);
    });
    
    it('should validate input state Value', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX ]);
        var inputState = new InputState('x:0');
        expect(function() { df.setInputState(inputState, Value.ZERO) }).not.toThrow();
        expect(function() { df.setInputState(inputState, Value.ONE) }).not.toThrow();
        expect(function() { df.setInputState(inputState, Value.DC) }).not.toThrow();
        expect(function() { df.setInputState(inputState, '2') }).toThrow();
        expect(function() { df.setInputState(inputState, 2) }).toThrow();
        expect(function() { df.setInputState(inputState, null) }).toThrow();
    });

    it('should handle zero inputs', function() {
        df = new DigitalFunction('df', 'df desc', [ ]);
        expect(df.getInputState('')).toEqual(Value.DC);
    });
    
    it('should accept one input definition', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX ]);
        expect(df.getVersion()).toEqual(0);
        expect(df.setInputState('x:0', Value.ZERO)).toBe(df);
        expect(df.setInputState(new InputState('x:1'), Value.ONE)).toBe(df);
        expect(df.getInputState('x:0')).toEqual(Value.ZERO);
        expect(df.getInputState(new InputState('x:1'))).toEqual(Value.ONE);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
    
    it('should allow changes to values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX ]);
        expect(df.getVersion()).toEqual(0);
        expect(df.getInputState('x:0')).toEqual(Value.DC);
        
        df.setInputState('x:0', Value.ZERO);
        expect(df.getInputState('x:0')).toEqual(Value.ZERO);
        var version1 = df.getVersion();
        expect(version1).toBeGreaterThan(0);
        
        df.setInputState('x:0', Value.ONE);
        expect(df.getInputState('x:0')).toEqual(Value.ONE);
        var version2 = df.getVersion();
        expect(version2).toBeGreaterThan(version1);
        
        df.setInputState('x:0', Value.DC);
        expect(df.getInputState('x:0')).toEqual(Value.DC);
        var version3 = df.getVersion();
        expect(version3).toBeGreaterThan(version2);
    });
    
    it('should accept two input definition', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0,y:0', Value.ZERO);
        df.setInputState('x:1,y:0', Value.ONE);
        df.setInputState(new InputState('x:0,y:1'), Value.ONE);
        df.setInputState(new InputState('x:1,y:1'), Value.DC);
        expect(df.getInputState('x:0,y:0')).toEqual(Value.ZERO);
        expect(df.getInputState('x:1,y:0')).toEqual(Value.ONE);
        expect(df.getInputState(new InputState('x:0,y:1'))).toEqual(Value.ONE);
        expect(df.getInputState(new InputState('x:1,y:1'))).toEqual(Value.DC);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
    
    it('should accept three input definition', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY, inputZ ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0,y:0,z:0', Value.ZERO);
        df.setInputState('x:1,y:0,z:0', Value.ONE);
        df.setInputState(new InputState('x:0,y:1,z:1'), Value.ONE);
        df.setInputState(new InputState('x:1,y:1,z:1'), Value.DC);
        expect(df.getInputState('x:0,y:0,z:0')).toEqual(Value.ZERO);
        expect(df.getInputState('x:1,y:0,z:0')).toEqual(Value.ONE);
        expect(df.getInputState(new InputState('x:0,y:1,z:1'))).toEqual(Value.ONE);
        expect(df.getInputState(new InputState('x:1,y:1,z:1'))).toEqual(Value.DC);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
    
    it('should return don\'t care for unspecified values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY, inputZ ]);
        df.setInputState('x:0,y:0,z:0', Value.ZERO);
        df.setInputState('x:1,y:0,z:0', Value.ONE);
        expect(df.getInputState('x:0,y:1,z:0')).toEqual(Value.DC);
        expect(df.getInputState('x:1,y:1,z:0')).toEqual(Value.DC);
        expect(df.getInputState('x:0,y:1,z:1')).toEqual(Value.DC);
        expect(df.getInputState('x:1,y:1,z:1')).toEqual(Value.DC);
    });

    it('should reject mismatched inputs', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY ]);
        expect(function() { df.setInputState('x:0', Value.ONE) }).toThrow();
        expect(function() { df.getInputState('x:0') }).toThrow();
        expect(function() { df.setInputState('x:0,y:0', Value.ONE) }).not.toThrow();
        expect(function() { df.getInputState('x:0,y:0') }).not.toThrow();
        expect(function() { df.setInputState('x:0,y:0,z:0', Value.ONE) }).toThrow();
        expect(function() { df.getInputState('x:0,y:0,z:0') }).toThrow();
    });
    
    it('changes inputs from one to two and updates input state values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0', Value.ZERO);
        df.setInputState('x:1', Value.ONE);
        var version1 = df.getVersion();
        expect(version1).toBeGreaterThan(0);
        
        df.setInputs([ inputX, inputY ]);
        expect(df.getInputState('x:0,y:0')).toEqual(Value.ZERO);
        expect(df.getInputState('x:0,y:1')).toEqual(Value.ZERO);
        expect(df.getInputState('x:1,y:0')).toEqual(Value.ONE);
        expect(df.getInputState('x:1,y:1')).toEqual(Value.ONE);
        var version2 = df.getVersion();
        expect(version2).toBeGreaterThan(version1);
    });
    
    it('changes inputs from two to three and updates input state values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0,y:0', Value.ZERO);
        df.setInputState('x:1,y:0', Value.ONE);
        df.setInputState('x:0,y:1', Value.ONE);
        df.setInputState('x:1,y:1', Value.DC);
        var version1 = df.getVersion();
        expect(version1).toBeGreaterThan(0);
        
        df.setInputs([ inputX, inputY, inputZ ]);
        expect(df.getInputState('x:0,y:0,z:0')).toEqual(Value.ZERO);
        expect(df.getInputState('x:0,y:0,z:1')).toEqual(Value.ZERO);
        expect(df.getInputState('x:1,y:0,z:0')).toEqual(Value.ONE);
        expect(df.getInputState('x:1,y:0,z:1')).toEqual(Value.ONE);
        expect(df.getInputState('x:0,y:1,z:0')).toEqual(Value.ONE);
        expect(df.getInputState('x:0,y:1,z:1')).toEqual(Value.ONE);
        expect(df.getInputState('x:1,y:1,z:0')).toEqual(Value.DC);
        expect(df.getInputState('x:1,y:1,z:1')).toEqual(Value.DC);
    });
    
    it('changes inputs from one to zero and removes input state values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0', Value.ZERO);
        df.setInputState('x:1', Value.ONE);
        expect(df.getInputState('x:0')).toEqual(Value.ZERO);
        expect(df.getInputState('x:1')).toEqual(Value.ONE);
        var version1 = df.getVersion();
        expect(version1).toBeGreaterThan(0);
        
        df.setInputs([]);
        expect(df.getInputState('')).toEqual(Value.DC);
        expect(function() { df.getInputState('x:0') }).toThrow();
    });
    
    it('changes inputs from two to one and updates input state values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0,y:0', Value.ONE);
        df.setInputState('x:1,y:0', Value.ONE);
        df.setInputState('x:0,y:1', Value.ONE);
        df.setInputState('x:1,y:1', Value.ZERO);
        var version1 = df.getVersion();
        expect(version1).toBeGreaterThan(0);
        
        df.setInputs([ inputY ]);
        expect(df.getInputState('y:0')).toEqual(Value.ONE);
        expect(df.getInputState('y:1')).toEqual(Value.DC);
        var version2 = df.getVersion();
        expect(version2).toBeGreaterThan(version1);
    });
    
    it('changes inputs from three to two and updates input state values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY, inputZ ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0,y:0,z:0', Value.ZERO);
        df.setInputState('x:0,y:0,z:1', Value.ZERO);
        df.setInputState('x:1,y:0,z:0', Value.ONE);
        df.setInputState('x:1,y:0,z:1', Value.ONE);
        df.setInputState('x:0,y:1,z:0', Value.ZERO);
        df.setInputState('x:0,y:1,z:1', Value.ONE);
        df.setInputState('x:1,y:1,z:0', Value.DC);
        df.setInputState('x:1,y:1,z:1', Value.ONE);
        
        df.setInputs([ inputX, inputY ]);
        expect(df.getVersion()).toBeGreaterThan(0);
        expect(df.getInputState('x:0,y:0')).toEqual(Value.ZERO);
        expect(df.getInputState('x:1,y:0')).toEqual(Value.ONE);
        expect(df.getInputState('x:0,y:1')).toEqual(Value.DC);
        expect(df.getInputState('x:1,y:1')).toEqual(Value.DC);
    });
    
    it('changes input defintions and preserves values', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY, inputZ ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0,y:0,z:0', Value.ZERO);
        df.setInputState('x:1,y:0,z:1', Value.ONE);
        df.setInputState('x:0,y:1,z:0', Value.DC);
        df.setInputState('x:1,y:1,z:1', Value.ZERO);
        var version1 = df.getVersion();
        expect(version1).toBeGreaterThan(0);
        
        df.setInputs([ inputX2, inputY2, inputZ ]);
        var version2 = df.getVersion();
        expect(version2).toBeGreaterThan(version1);
        expect(df.getInputState('x2:0,y2:0,z:0')).toEqual(Value.ZERO);
        expect(df.getInputState('x2:1,y2:0,z:1')).toEqual(Value.ONE);
        expect(df.getInputState('x2:0,y2:1,z:0')).toEqual(Value.DC);
        expect(df.getInputState('x2:1,y2:1,z:1')).toEqual(Value.ZERO);
    });
    
    it('clears values for complex input state changes', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY, inputZ ]);
        expect(df.getVersion()).toEqual(0);
        df.setInputState('x:0,y:0,z:0', Value.ZERO);
        df.setInputState('x:1,y:0,z:1', Value.ONE);
        df.setInputState('x:0,y:1,z:0', Value.DC);
        df.setInputState('x:1,y:1,z:1', Value.ZERO);
        var version1 = df.getVersion();
        expect(version1).toBeGreaterThan(0);
        
        df.setInputs([ inputX2, inputZ ]);
        var version2 = df.getVersion();
        expect(version2).toBeGreaterThan(version1);
        expect(df.getInputState('x2:0,z:0')).toEqual(Value.DC);
        expect(df.getInputState('x2:1,z:1')).toEqual(Value.DC);
        expect(df.getInputState('x2:0,z:0')).toEqual(Value.DC);
        expect(df.getInputState('x2:1,z:1')).toEqual(Value.DC);
    });
    
    it('should expose input state as property', function() {
        df = new DigitalFunction('df', 'df desc', [ inputX ]);
        var prop = df.inputStateHolder(new InputState('x:0'));
        expect(prop.value).toEqual(Value.DC);
        expect(df.getInputState('x:0')).toEqual(Value.DC);
        prop.value = Value.ZERO;
        expect(prop.value).toEqual(Value.ZERO);
        expect(df.getInputState('x:0')).toEqual(Value.ZERO);
        prop.value = Value.ONE;
        expect(prop.value).toEqual(Value.ONE);
        expect(df.getInputState('x:0')).toEqual(Value.ONE);
    });
});
