'use strict';

var Value = {};
Value.ONE = '1';
Value.ZERO = '0';
/** Don't care */
Value.DC = '?';

var Input = function(id, desc) {
    if (!id || /[^A-Za-z0-9]/.test(id)) {
        throw "id must only have alphanumerics";
    }
    this.id = id;
    this.desc = desc;
    
    this.toString = function() {
        return id+': '+desc;
    };
};

var InputState = function(stringified) {
    var _inputIdToValue = {};
    var _inputMatcher = /^_i_/;
    var _count = 0;

    this.toString = function() {
        return this.stringify();
    };
    
    function _inputId(input) {
        if (input instanceof Input) {
            input = input.id;
        }
        return input;
    }
    
    /**
     * Add an (input,value) pair to the state. Any existing state will be replaced.
     * @param input Input or string that is Input.id
     * @param value Value
     * @return this for chaining
     */
    this.add = function(input, value) {
        switch (value) {
            case Value.ZERO: case Value.ONE: break;
            default: throw "Expecting Value.ZERO or Value.ONE, got "+value;
        }
        input = _inputId(input);
        _inputIdToValue['_i_'+input] = value;
        _count++;
        return this;
    };

    /**
     * Add all states from the argumen to this object.
     * @param state InputState or stringified version
     * @return this for chaining
     */
    this.addAll = function(state) {
        if (state instanceof InputState) {
            state = state.stringify();
        }
        this.objectify(this.stringify()+','+state);
        return this;
    };
    
    this.removeAll = function(c) {
        (c || []).forEach(function(el) {
            var ids = [];
            if (el instanceof InputState) {
                var split = el.stringify().split(/[:,]/);
                while (split.length > 1) {
                    ids.push(split.shift());
                    split.shift();
                }
            } else {
                ids.push(_inputId(el));
            }
            ids.forEach(function(id) {
                if (_inputIdToValue['_i_'+id] !== undefined) {
                    _count--;
                }
                delete _inputIdToValue['_i_'+id];
            });
        });
        return this;
    };
    
    this.clone = function() {
        return new InputState(this.stringify());
    };
    
    /**
     * Get the value for the input.
     * @param input Input or string that is Input.id
     * @return Value or undefined
     */
    this.value = function(input) {
        input = _inputId(input);
        return _inputIdToValue['_i_'+input];
    };
    
    this.count = function() {
        return _count;
    };
    
    /**
     * Create a string version of this object.
     * @param inputOrder an array of Input or string values forcing a particular order.
     */
    this.stringify = function(inputOrder) {
        var a = [];
        if (inputOrder) {
            inputOrder.forEach(function(input) {
                var id = _inputId(input);
                a.push(id+':'+_inputIdToValue['_i_'+id]);
            });
        } else {
            for(var input in _inputIdToValue) {
                if (_inputMatcher.test(input)) {
                    a.push(input.substr(3)+':'+_inputIdToValue[input]);
                }
            }
            a.sort();
        }
        return a.join(',');
    };

    /**
     * Create a string version of the values.
     * @param inputOrder an array of Input or string values forcing a particular order.
     */
    this.stringifyValues = function(inputOrder) {
        var a = [];
        if (inputOrder) {
            inputOrder.forEach(function(input) {
                var id = _inputId(input);
                a.push(_inputIdToValue['_i_'+id]);
            });
        } else {
            for(var input in _inputIdToValue) {
                if (_inputMatcher.test(input)) {
                    a.push(_inputIdToValue[input]);
                }
            }
            a.sort();
        }
        return a.join('');
    };   
    
    this.objectify = function(str) {
        _inputIdToValue = {};
        _count = 0;
        var a = (str || '').split(/[:,]/);
        while (a.length > 1) {
            this.add(a.shift(), a.shift());
        }
    };
    
    this.objectify(stringified);
};

InputState.permutateStates = function(states) {
    var perm = [ ];
    (states || []).forEach(function(state) {
        var a = [];
        if (perm.length === 0) {
            a.push(new InputState().add(state, Value.ZERO));
            a.push(new InputState().add(state, Value.ONE));
        } else perm.forEach(function(el) {
            a.push(el.clone().add(state, Value.ZERO));
            a.push(el.clone().add(state, Value.ONE));
        });
        perm = a;
    });
    return perm;
}
    


