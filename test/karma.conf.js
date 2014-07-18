module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],
    
    preprocessors : {
      'app/js/**/*.js': 'coverage'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],
    hostname: process.env.IP || 'localhost',
    port: process.env.PORT || '9876',
    
    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-phantomjs-launcher',
            'karma-coverage'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    reporters : ['coverage', 'progress', 'junit'],
    coverageReporter : {
        type : 'html',
        dir : 'coverage/'
    }

  });
};
