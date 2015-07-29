angular.module('nearByLocationApp',
  ['ngAnimate','ngRoute','appControllers','appServices','appDirectives','appInterceptors'])

.config(["$routeProvider", "$httpProvider", "$provide", function ($routeProvider,$httpProvider,$provide) {
    $httpProvider.interceptors.push('fSClientParamsInjector','timeStampMarker')

    $provide.decorator('geolocation', ["$delegate", "$q", function ($delegate,$q) {
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
    }]);
    $routeProvider
    .when('/', {
      templateUrl: 'src/views/listView.html',
      controller: 'listViewCtrl'
    })
    .otherwise({
      templateUrl: 'src/views/404.html'
    });
}])



/**
 * Created by nghi on 18.7.2015.
 */
angular.module("appConstants",[])

.constant('clientConst', {
  API_URL:"https://api.foursquare.com/v2/venues/search",
  CLIENT_ID:'GHRRJV4NQKK32TRCJ4Y4E01M3U3KFTCAE0ONRQMXH4LK1OFW',
  CLIENT_SECRET:'3ONADSWS2JOBXDD2XX2YCAZJQ3UUAI5YRMIETNT1WOOT04T0',
  CLIENT_VERSION:"20150408",
  ZERO_RESULT:{
    name:"No results found",
    distance:"",
    address:"Please type in another search terms"
  },
  ERROR:{
    name:"Something's wrong !!!",
    distance:"",
    address:"Please wait/refresh the page, make sure you've provided secret ID and select 'Share Location'"
  },
  UNIT:"m"
})
angular.module('appControllers', ['appServices'])

.controller('listViewCtrl',["$scope", "searchService", "$timeout", function($scope, searchService,$timeout) {
  $scope.venueList = [];
  var timeoutPromise;
  $scope.search = function(searchWords){
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function() {
      searchService.search(searchWords).then(function(res) {
        $scope.venueList= res;
      }).finally(function () {
        $scope.loading = false;
      });
    }, 500);
  }

}]);
/**
 * Created by nghi on 19.7.2015.
 */
angular.module('appDirectives', ['appFilters']) //appFilters as dependency is important for unit test 2 work
  .directive('venueItem', function () {
  return{
    restrict:'E',
    scope:{
      venue:'='
    },
    link: function (scope) {
      //console.log("scope.venue",scope.venue)
    },
    template:"<a ng-href=\"{{venue.location | googleMapLink}}\" target=\"_blank\">\n  <li class=\"info\">\n    <h3 class=\"name\">{{venue.name}}{{venue.distance | venueDistance}}</h3>\n    <p class=\"address\">{{venue.address}}</p>\n  </li>\n</a>"
  }
})
/**
 * Created by nghi on 19.7.2015.
 */
angular.module('appFilters', ['appConstants']) //TODO 'appConstants' here is very important for unittest to work

.filter('venueDistance', ["clientConst", function (clientConst) {
  return function(text) {
    return text ? " - "+text+clientConst.UNIT +" away" : "";
  }
}])
.filter('googleMapLink', ["clientConst", function (clientConst) {
  return function(text) {
    return text ? "http://maps.google.com/?q="+text : "";
  }
}])


/**
 * Created by nghi on 25.7.2015.
 */
/*
 http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
 */

angular.module("appInterceptors",['appConstants'])
  .factory('fSClientParamsInjector', ["clientConst", function (clientConst) {
    return{
      request: function (config) {
        if(config.url == clientConst.API_URL){
          if(clientConst.CLIENT_ID && clientConst.CLIENT_SECRET){
            config.params['client_id']=clientConst.CLIENT_ID;
            config.params['client_secret']=clientConst.CLIENT_SECRET
            config.params['v']=clientConst.CLIENT_VERSION
          }
        }
        return config;
      }
    }
  }])
  .factory("timeStampMarker",function () {
    return {
      request: function (config) {
        config.requestTimeStamp = new Date().getTime();
        return config;
      },
      response: function (response) { //response NOT respond
        response.config.respondTimeStamp = new Date().getTime();
        return response;
      }
    }
  })
angular.module("appServices",  ['appConstants','geolocation'])
.value('baseUrlBuilder',{
    baseUrl:"",
    id: function (id) {
      this.baseUrl+="?client_id=" + id
      return this;
    },
    secret: function (secret) {
      this.baseUrl+="&client_secret=" + secret
      return this;
    },
    version: function (v) {
      this.baseUrl+="&v=" + v;
      return this;
    },
    geoData: function (data) {
      this.baseUrl+="&ll=" + data.coords.latitude +"," + data.coords.longitude +"&query="
      return this;
    },
    get: function () {
      return this.baseUrl
    },
    init: function () {
      this.baseUrl= "https://api.foursquare.com/v2/venues/search"
      return this
    }
  })
.factory('fSBaseUrl',["geolocation", "clientConst", "baseUrlBuilder", function(geolocation,clientConst,baseUrlBuilder){
    var baseUrl;

    function initBaseUrl() {
      geolocation.getLocation().then(function(data) { // how to test these chunk of code to make sure codecoverage

        if(clientConst.CLIENT_SECRET){
          baseUrl=baseUrlBuilder
            .init()
            .id(clientConst.CLIENT_ID)
            .secret(clientConst.CLIENT_SECRET)
            .version(clientConst.CLIENT_VERSION)
            .geoData(data)
            .get()
        }
      });
      return baseUrl;
    }

    initBaseUrl();

    return{
      getBaseURL: function () {
        return baseUrl ? baseUrl : initBaseUrl()
      }
    }
}])
.factory('searchService',["$http", "$q", "fSBaseUrl", "clientConst", function($http,$q,fSBaseUrl,clientConst){
  function successRes(res) {return res.data}
  function transformLocationData(data,headerGetter){
    data = angular.fromJson(data);
    //console.log("raw data",data)
    var transformed, venuesArray = data.response.venues;
    //console.log('venuesArray',venuesArray)
    if(venuesArray.length != 0){
      transformed=venuesArray.map(function(current){
        //console.log("current.location.lat",current.location.lat)
        return {
          location: current.location.lat+","+current.location.lng,
          name:current.name,
          distance:current.location.distance,
          address:(current.location.address || "")+ ' '+ (current.location.city || "")
        };
      });
    }else{
      transformed=[clientConst["ZERO_RESULT"]];
    }
    //console.log('transformed',transformed)
    return transformed;
  }

  var search = function(query){
    var baseUrl = fSBaseUrl.getBaseURL();
    if(baseUrl){
      return $http.get(baseUrl+query,{transformResponse: transformLocationData}).then(successRes)
    }else{
      return $q.resolve([clientConst["ERROR"]]);
    }
  }

  return  {search: search};
}])

/**
 * Created by nghi on 25.7.2015.
 */
angular.module("appServices",  ['appConstants','geolocation','appInterceptors'])
  .factory('searchService',["$http", "$q", "clientConst", "geolocation", function($http,$q,clientConst,geolocation){
    var llData;
    geolocation.getLocation().then(function(data) {
      //llData=data.coords.latitude +"," + data.coords.longitude
      llData=data
    });
    function successRes(res) {
      var time = res.config.respondTimeStamp - res.config.requestTimeStamp;
      console.log('The request took ' + (time / 1000) + ' seconds.');
      return res.data
    }
    function transformLocationData(data,headerGetter){
      data = angular.fromJson(data);
      //console.log("raw data",data)
      var transformed, venuesArray = data.response.venues;
      //console.log('venuesArray',venuesArray)
      if(venuesArray.length != 0){
        transformed=venuesArray.map(function(current){
          //console.log("current.location.lat",current.location.lat)
          return {
            location: current.location.lat+","+current.location.lng,
            name:current.name,
            distance:current.location.distance,
            address:(current.location.address || "")+ ' '+ (current.location.city || "")
          };
        });
      }else{
        transformed=[clientConst["ZERO_RESULT"]];
      }
      //console.log('transformed',transformed)
      return transformed;
    }

    var search = function(query){
      if(llData){
        var config = {
          url: clientConst.API_URL,
          method: "GET",
          params: {
            query:query,
            ll:llData
          },
          transformResponse: transformLocationData
        }
        return $http(config).then(successRes)
      }else{
        return $q.resolve([clientConst["ERROR"]]);
      }
    }

    return  {search: search};
  }])
