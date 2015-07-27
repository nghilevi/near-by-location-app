angular.module('nearByLocationApp',
  ['ngAnimate','ngRoute','appControllers','appServices','appDirectives','appInterceptors'])

.config(function ($routeProvider,$httpProvider) {
    $httpProvider.interceptors.push('fSClientParamsInjector','timeStampMarker')
    $routeProvider
    .when('/', {
      templateUrl: 'src/views/listView.html',
      controller: 'listViewCtrl'
    })
    .otherwise({
      templateUrl: 'src/views/404.html'
    });
})


