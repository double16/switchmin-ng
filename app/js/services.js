'use strict';

angular.module('switchminapp.services', []).
  value('version', '0.1').
  factory('dataService', function() {
      var functions = [ new DigitalFunction('func', 'New function', [ new Input('x', '') ]) ];
      console.log('creating dataService')
      return {
          functions: functions
      };
  })
;
