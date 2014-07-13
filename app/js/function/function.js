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
    };
    
    function _renameInputs(inputs) {
        for(var state in _values) {
            var value = _values[state];
            delete _values[state];
            var oldState = new InputState(state);
            var newState = new InputState();
            for(var i=0; i<_inputs.length; i++) {
                newState.add(inputs[i], oldState.value(_inputs[i]));
            }
            _values[newState.stringify()] = value;
        }
    }
    
    function _addInputs(adds) {
        var newStates = InputState.permutateStates(adds);

        for(var state in _values) {
            var value = _values[state];
            delete _values[state];
            var stateObj = new InputState(state);
            newStates.forEach(function(newState) {
                _values[stateObj.clone().addAll(newState).stringify()] = value;
            });
        }        
    }
    
    function _removeInputs(removes) {
        var removedStates = InputState.permutateStates(removes);

        var newValues = {};
        for(var state in _values) {
            var value = _values[state];
            var newState = new InputState(state).removeAll(removes).stringify();
            var existingValue = newValues[newState];
            if (existingValue !== undefined && existingValue != value) {
                newValues[newState] = Value.DC;
            } else {
                newValues[newState] = value;
            }
        }        
        _values = newValues;
    }
    
    this.setInputs = function(inputs) {
        var adds = inputs.filter(function(el) { return !_inputs.some(function(el2) { return el.id === el2.id } ) } );
        var removes = _inputs.filter(function(el) { return !inputs.some(function(el2) { return el.id === el2.id } ) } );
        if (inputs.length === _inputs.length) {
            _renameInputs(inputs);
        } else if (removes.length > 0 && adds.length === 0) {
            _removeInputs(removes);
        } else if (adds.length > 0 && removes.length === 0) {
            _addInputs(adds);
        } else {
            // too complicated, clear all values
            _values = {};
        }
        
        _inputs = inputs.concat([]);
        _version++;
    };
    
    /**
     * Validates the given state and returns a normalized string value.
     * @param state InputState or stringified InputState
     * @return stringified InputState
     * @throws if state doesn't match with configured inputs
     */
    function _validateState(state) {
        if (!(state instanceof InputState)) {
            state = new InputState(state);
        }
        if (state.count() !== _inputs.length) {
            throw "input mismatched";
        }
        for(var i=0; i<_inputs.length; i++) {
            var input = _inputs[i];
            if (state.value(input) === undefined) {
                throw "input mismatched";
            }
        }
        return state.stringify();
    }
    
    /**
     * Set the value for an input state.
     * @param state InputState or stringified version
     * @param value Value
     * @return this for chaining
     */
    this.setInputState = function(state, value) {
        state = _validateState(state);
        switch (value) {
            case Value.ZERO: case Value.ONE: case Value.DC: break;
            default: throw "Invalid Value, got "+value;
        }
        _values[state] = value;
        _version++;
        return this;
    };
    
    /**
     * Get the value for an input state.
     * @param state InputState or stringified version
     * @return value Value
     */
    this.getInputState = function(state) {
        state = _validateState(state);
        var value = _values[state];
        if (value === undefined) {
            value = Value.DC;
        }
        return value;
    };
};
