angular.module('nearByLocationApp',
  ['ngAnimate','ngRoute','appControllers','appServices','appDirectives','appInterceptors'])

.config(function ($routeProvider,$httpProvider,$provide) {
    $httpProvider.interceptors.push('fSClientParamsInjector','timeStampMarker')
    $provide.decorator('geolocation', function ($delegate,$q) {
      var _getLocation=$delegate.getLocation;
      $delegate.getLocation = function () {
        var defer=$q.defer()
        _getLocation().then(function (data) {
          defer.resolve(data.coords.latitude +"," + data.coords.longitude)
        })
        return defer.promise;
      }
      return $delegate;
    });
    $routeProvider
    .when('/', {
      templateUrl: 'src/views/listView.html',
      controller: 'listViewCtrl'
    })
    .otherwise({
      templateUrl: 'src/views/404.html'
    });
})


