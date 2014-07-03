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
        df = new DigitalFunction('df', 'df desc', [ inputX, inputY, inputZ ]);
    });

    it('should set initialization fields', function() {
        expect(df.id).toEqual('df');
        expect(df.desc).toEqual('df desc');
        expect(df.getInputs()).toEqual([ inputX, inputY, inputZ ]);
        expect(df.getVersion()).toEqual(0);
    });
    
    it('should validate input state Value', function() {
        expect(false).toBe(true);
    });
    
    it('should accept one input definition', function() {
        expect(false).toBe(true);
    });
    
    it('should accept two input definition', function() {
        expect(false).toBe(true);
    });
    
    it('should accept three input definition', function() {
        expect(false).toBe(true);
    });
    
    it('changes inputs from one to two and updates input state values', function() {
        expect(df.getVersion()).toEqual(0);
        expect(false).toBe(true);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
    
    it('changes inputs from two to three and updates input state values', function() {
        expect(df.getVersion()).toEqual(0);
        expect(false).toBe(true);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
    
    it('changes inputs from one to zero and removes input state values', function() {
        expect(df.getVersion()).toEqual(0);
        expect(false).toBe(true);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
    
    it('changes inputs from two to one and updates input state values', function() {
        expect(df.getVersion()).toEqual(0);
        expect(false).toBe(true);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
    
    it('changes inputs from three to two and updates input state values', function() {
        expect(df.getVersion()).toEqual(0);
        expect(false).toBe(true);
        expect(df.getVersion()).toBeGreaterThan(0);
    });
});
