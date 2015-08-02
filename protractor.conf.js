/**
 * Created by nghi on 19.7.2015.
 */
// 1 http-server -p 3000
// 2 webdriver-manager start
// 3 protractor protractor.conf.js

//var q = require("q");
//var FirefoxProfile = require("firefox-profile");
//
//var makeFirefoxProfile = function(preferenceMap, specs) {
//  var deferred = q.defer();
//  var firefoxProfile = new FirefoxProfile();
//
//  for (var key in preferenceMap) {
//    firefoxProfile.setPreference(key, preferenceMap[key]);
//  }
//
//  firefoxProfile.encoded(function (encodedProfile) {
//    var capabilities = {
//      firefox_profile: encodedProfile,
//      specs: specs
//    };
//
//    deferred.resolve(capabilities);
//  });
//  return deferred.promise;
//};


exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub', //this is selenium server, not the one running the web app
  specs: ['test/e2e/**/*.js'],
  //jasmineNodeOpts: {
  //  showColors: true,
  //  defaultTimeoutInterval: 30000
  //},
  capabilities:{
    browserName: 'firefox'
  },
  //getMultiCapabilities: function() {
  //  return q.all([
  //    makeFirefoxProfile(
  //      {"geo.prompt.testing": true, "geo.prompt.testing.allow": true},
  //      ['test/e2e/**/*.js']
  //    )
  //  ]);
  //},
  baseUrl:	'http://localhost:8081/' //this one serve the web app
};
