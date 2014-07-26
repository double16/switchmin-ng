exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',
	'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',
	'phantomjs.cli.args': ['--debug=true', '--webdriver', '--webdriver-logfile=webdriver.log', '--webdriver-loglevel=DEBUG']
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    onComplete: function(){
      browser.driver.executeScript("return __coverage__;").then(function(val) {
        fs.writeFileSync("./coverage/e2e/coverage.json", JSON.stringify(val));
      });
    }
  }
};
