'use strict';

// -------------------------------- angular.js --------------------------------

var app = angular.module('nordeaLocationApp', [
    'ngAnimate'
    // 'ngResource',
    // 'ngRoute'
]);

app.constant('config', {
    CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
  	CLIENT_SECRET:'Enter your secret key here!',
  	CLIENT_VERSION:"20130815"
});

// app.config(['$routeProvider',function ($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'dev/views/list-view.html',
//       controller: 'list-view'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
// }]);
