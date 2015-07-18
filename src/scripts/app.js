angular.module('nearByLocationApp',
  ['ngAnimate','ngRoute','appControllers','appServices'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/views/listView.html',
      controller: 'listViewCtrl'
    })
    .otherwise({
      templateUrl: 'src/views/404.html'
    });
});



