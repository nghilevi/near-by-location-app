angular.module('nearByLocationApp', ['ngAnimate','ngRoute','appControllers','appServices'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'dev/views/listView.html',
      controller: 'listViewCtrl'
    })
    .otherwise({
      templateUrl: 'dev/views/404.html'
    });
});



