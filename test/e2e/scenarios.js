'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('SwitchMin app', function() {

  browser.get('index.html');

  it('should automatically redirect to /about when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/about");
  });

  describe('about', function() {

    beforeEach(function() {
      browser.get('index.html#/about');
    });

    it('should render about when user navigates to /about', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/describe what this application does for you/);
    });
  });


  describe('function', function() {

    beforeEach(function() {
      browser.get('index.html#/function');
    });


    it('should render function when user navigates to /function', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/describe a function and how to define it here/);
    });

  });


  describe('costs', function() {

    beforeEach(function() {
      browser.get('index.html#/costs');
    });


    it('should render costs when user navigates to /costs', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/describe what costs are and why they are important/);
    });

  });


  describe('realization', function() {

    beforeEach(function() {
      browser.get('index.html#/realization');
    });


    it('should render realization when user navigates to /realization', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/describe what you can do here/);
    });

  });
});
