angular.module('nearByLocationApp',
  ['ngAnimate','ngRoute','appControllers','appServices','appDirectives','appInterceptors'])

.config(function ($routeProvider,$httpProvider,$provide) {
    $httpProvider.interceptors.push('fSClientParamsInjector','timeStampMarker')

    $provide.decorator('geolocation', function ($delegate,$q) {
      console.log("decorator is instantiated")
      var _getLocation=$delegate.getLocation;
      var defer=$q.defer()
      $delegate.getLocation = function () {
        console.log("$delegate.getLocation is called")
        _getLocation().then(function (data) {
          defer.resolve(data.coords.latitude +"," + data.coords.longitude)
        })
        return defer.promise;
      }

      $delegate.getUserLocation = function () {
        console.log("$delegate.getUserLocation is called")
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


