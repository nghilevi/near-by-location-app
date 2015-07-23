angular.module('nearByLocationApp',
  ['ngAnimate','ngRoute','appControllers','appServices','appDirectives'])

.config(["$routeProvider", function ($routeProvider) {
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
  CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
  CLIENT_SECRET:'GYNP4URASNYRNRGXR5UEN2TGTKJHXY5FGSAXTIHXEUG1GYM2',
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
