var app = angular.module('nearByLocationApp', ['ngAnimate','ngRoute',]);
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


app.constant('clientConstants', {
   CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
   //CLIENT_SECRET:'Enter your secret here',
   CLIENT_VERSION:"20150408"
});

app.factory('baseURLService',['clientConstants',function(clientConstants){
  var baseURL,
  setBaseURL=function(currentLat,currentLon){
      baseURL= "https://api.foursquare.com/v2/venues/search"+
        "?client_id="+clientConstants.CLIENT_ID+
        "&client_secret="+clientConstants.CLIENT_SECRET+
        "&v="+clientConstants.CLIENT_VERSION+
        "&ll="+currentLat+
        ","+currentLon+
        "&query=";    
  },
  getBaseURL=function(){
    return baseURL;
  };

  return {
    setBaseURL: setBaseURL,
    getBaseURL: getBaseURL
  }

}]);

app.factory('getCurrentLocation',['baseURLService','$window',function(baseURLService,$window){
  return function () {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            currentLat=position.coords.latitude;
            currentLon=position.coords.longitude;
            baseURLService.setBaseURL(currentLat,currentLon);              
        });
      } else {
          $window.alert("Geolocation is not supported by this browser.");
      }
  };
}]);

app.factory('locationService',  ['$http','baseURLService','getCurrentLocation',function($http,baseURLService,getCurrentLocation){
    var baseURL,unit ='m',
    defaultResponseDataObj={
      name: "No results found",
      location: {
        distance: "",
        address: "Please type in another search terms"
      }
    };

    getCurrentLocation();

    var returnData = function(query){
      var baseURL = baseURLService.getBaseURL();
      return $http.get(baseURL+query)
      .then(function(data) {
        if(data.data.response.venues.length == 0){
          return {
            distanceText:"",
            responseDataArr:[defaultResponseDataObj]
          };
        }else{
          return {
            distanceText: unit+' away',
            responseDataArr:data.data.response.venues
          };
        }
      })
      .catch(function(data){
        console.log("error");
        defaultResponseDataObj.name ="Something's wrong !!!";
        defaultResponseDataObj.location.address="Please refresh the page, and remember to choose 'Share Location'";  
        return {
            distanceText:"",
            responseDataArr:[defaultResponseDataObj]
        };
      });   
    }

    return  {
      search: function(query){
        return returnData(query);
      }
    };
}]);

app.controller('listViewCtrl', ['$scope','locationService',function($scope, locationService) {
  
  $scope.search = function(){
    var query = $scope.searchWords;
    locationService.search(query).then(function(res){
      $scope.responseDataArr= res.responseDataArr;
      $scope.distanceText =res.distanceText;
    });  
  }

  //Normal JS
  $('#back-to-top').hide();
  //Animation while scrolling
  $(window).scroll(function() {
    if ($(this).scrollTop()>800){
        $('#back-to-top').fadeIn();
    }else{     
       $('#back-to-top').fadeOut();
    }
  });
  $("#back-to-top").click(function() {
      $('html,body').scrollTop(0);
  });
}]);
