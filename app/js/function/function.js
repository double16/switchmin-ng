'use strict';

var DigitalFunctionMode = {};
DigitalFunctionMode.DNF = 'DNF';
DigitalFunctionMode.CNF = 'CNF';

var DigitalFunction = function(id, desc, inputs) {
    this.id = id;
    this.desc = desc;
    
    var _inputs = inputs.concat([]);
    var _values = {};
    var _version = 0;
    
    /**
     * Get the version number for this function. The version is incremented for every change.
     */
    this.getVersion = function() {
        return _version;
    };
    
    this.getInputs = function() {
        return _inputs.concat([]);
    }
    
    this.setInputs = function(inputs) {
        _inputs = inputs.concat([]);
        // TODO: update/clear states
    }
    
    /**
     * Set the value for an input state.
     * @param state InputState or stringified version
     * @param value Value
     * @return this for chaining
     */
    this.setInputState = function(state, value) {
        
    };
    
    /**
     * Get the value for an input state.
     * @param state InputState or stringified version
     * @return value Value
     */
    this.getInputState = function(state) {
        
    };
};
