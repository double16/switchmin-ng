'use strict';

var Value = {};
Value.ONE = '1';
Value.ZERO = '0';
/** Don't care */
Value.DC = '?';

var Input = function(id, desc) {
    this.id = id;
    this.desc = desc;
};

var InputState = function(stringified) {
    var _inputIdToValue = {};
    var _inputMatcher = /^_i_/;

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
        if (!(typeof input == 'string' || input instanceof String)) {
            input = input.id;
        }
        _inputIdToValue['_i_'+input] = value;
        return this;
    };
    
    this.stringify = function() {
        var a = [];
        for(var input in _inputIdToValue) {
            if (_inputMatcher.test(input)) {
                a.push(input.substr(3)+':'+_inputIdToValue[input]);
            }
        }
        a.sort();
        return a.join(',');
    };
    
    this.objectify = function(str) {
        _inputIdToValue = {};
        var a = (str || '').split(/[:,]/);
        while (a.length > 1) {
            this.add(a.shift(), a.shift());
        }
    };
    
    this.objectify(stringified);
};
