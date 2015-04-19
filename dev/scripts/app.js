var app = angular.module('nearByLocationApp', ['ngAnimate','ngRoute','appController']);

app.config(['$routeProvider',function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'dev/views/listView.html',
      controller: 'listViewCtrl'
    })
    .otherwise({
      templateUrl: 'dev/views/404.html'
    });
}]);



