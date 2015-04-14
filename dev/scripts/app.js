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
   CLIENT_SECRET:'Enter your secret here',
   CLIENT_VERSION:"20150408"
});

app.factory('baseURLService',['clientConstants',function(clientConstants){
  var currentLat,currentLon,baseURL,
  buildBaseURL=function(currentLat,currentLon){
      return "https://api.foursquare.com/v2/venues/search"+
        "?client_id="+clientConstants.CLIENT_ID+
        "&client_secret="+clientConstants.CLIENT_SECRET+
        "&v="+clientConstants.CLIENT_VERSION+
        "&ll="+currentLat+
        ","+currentLon+
        "&query=";    
  },
  getCurrentLocation=function () {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            currentLat=position.coords.latitude;
            currentLon=position.coords.longitude;
            baseURL= buildBaseURL(currentLat,currentLon);              
        });
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  };

  return {
    getCurrentLocation: getCurrentLocation,
    getBaseURL: function(){
      return baseURL;     
    }
  }

}]);

app.factory('locationService',  ['$http','baseURLService', function($http,baseURLService){
    var baseURL,unit ='m',distanceText= unit+' away',
    responseDataObj={
      name: "No results found",
      location: {
        distance: "",
        address: "Please type in another search terms"
      }
    };
    
    baseURLService.getCurrentLocation();

    var returnData = function(query){
      var baseURL = baseURLService.getBaseURL();
      return $http.get(baseURL+query)
      .then(function(data) {
        if(data.data.response.venues.length == 0){
          return [responseDataObj];
        }else{
          return data.data.response.venues;
        }
      })
      .catch(function(data){
        console.log("error");
        distanceText="";
        responseDataObj.name ="Something's wrong !!!";
        responseDataObj.location.address="Please refresh the page, and remember to choose 'Share Location'";  
        return [responseDataObj];
      });   
    }

    return  {
      distanceText: distanceText,
      search: function(query){
        return returnData(query);
      }
    };
}]);

app.controller('listViewCtrl', ['$scope','locationService',function($scope, locationService) {
  
  $scope.search = function(){
    var query = $scope.searchWords;
    locationService.search(query).then(function(responseDataArr){
      $scope.responseDataArr= responseDataArr;
      if (responseDataArr[0].location.distance == ""){
        $scope.distanceText ="";
      }else{
        $scope.distanceText =locationService.distanceText;
      }
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
