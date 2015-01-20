var q = require("q");

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  sauceConnectProcess: null,
  
  allScriptsTimeout: 31000,
  getPageTimeout: 30000,
  
  specs: [
    'e2e/*.js'
  ],

  getMultiCapabilities: function() {
    console.log("getMultiCapabilities called");
    var deferred = q.defer();
    
    var multiCapabilities = [/*{
        'browserName': 'firefox',
        'job_name': 'switchmin_ng'
      }, {
        'browserName': 'chrome',
        'job_name': 'switchmin_ng'
      },*/ {
        'browserName': 'phantomjs',
        'job_name': 'switchmin_ng',
        'phantomjs.binary.path': require('phantomjs').path,
        'phantomjs.cli.args': ['--debug=true', '--webdriver', '--webdriver-logfile=webdriver.log', '--webdriver-loglevel=DEBUG']
      }];
    
    if (process.env.SAUCE_ACCESS_KEY) {
      console.log("Starting Sauce Connect");
      require('sauce-connect-launcher')({
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        verbose: true
      }, function (err, sauceConnectProcess) {
        if (err) {
          deferred.reject(new Error(err.message));
        } else {
          exports.config.sauceConnectProcess = sauceConnectProcess;
          deferred.resolve(multiCapabilities);
        }
      })
    } else {
      deferred.resolve(multiCapabilities);
    }

    return deferred.promise;
  },
  
  afterLaunch: function() {
    if (exports.config.sauceConnectProcess) {
      exports.config.sauceConnectProcess.close(function() {});
    }
  },

  baseUrl: 'http://localhost:8080/app/',

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
