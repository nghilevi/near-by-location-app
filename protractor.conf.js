/**
 * Created by nghi on 19.7.2015.
 */
// 1 http-server -p 3000
// 2 webdriver-manager start
// 3 protractor protractor.conf.js

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/e2e/**/*.js'],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  capabilities:{
    browserName: 'firefox'
  },
  baseUrl:	'http://localhost:3000/'
};
