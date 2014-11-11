'use strict';

describe('function definition', function() {

	browser.get('index.html#/function');

	it('should show function definition view', function() {
		expect(element.all(by.css('[ng-view] h1')).first().getText()).
				toMatch(/Define Your Function/);
	});
	
	it('should add an input preserving values', function() {
		// set all values to '0'
		element.all(by.css('button.input-state')).click();
		
		// add an input
		element.all(by.css('.add-input')).click();
		
		var buttons = element.all(by.css('button.input-state'));
		expect(buttons.length).toEqual(4);
		expect(buttons.map(function(el) { return el.getText(); })).toEqual(['0','0','0','0']);
	});
});


