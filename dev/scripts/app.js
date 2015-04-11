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

app.factory('locationService',  ['$http','clientConstants', function($http,clientConstants){
    var baseURL;
    var buildBaseURL=function(client_id,client_secret,client_version,currentLat,currentLon){
        return "https://api.foursquare.com/v2/venues/search"+
          "?client_id="+client_id+
          "&client_secret="+client_secret+
          "&v="+client_version+
          "&ll="+currentLat+
          ","+currentLon+
          "&query=";    
    }
    var getLocation=function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              currentLat=position.coords.latitude;
              currentLon=position.coords.longitude;
              baseURL=buildBaseURL(clientConstants.CLIENT_ID,clientConstants.CLIENT_SECRET,clientConstants.CLIENT_VERSION,currentLat,currentLon); 
          });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    getLocation();
    return  {
      search: function(query){
          return  $http.get(baseURL+query);
      }
    };
}]);

app.controller('listViewCtrl', ['$scope','locationService',function($scope, locationService) {
  var currentLat,currentLon,baseURL,unit ='m';
  var responseDataObj={
    name: "No results found",
    location: {
      distance: "no value",
      address: "Please type in another search terms"
    }
  }
  $scope.test=false;
  $scope.search = function(){
    locationService.search($scope.searchWords).success(function(data) {
        if(data.response.venues.length == 0){
          $scope.responseData= [responseDataObj];
          $scope.distanceText ="";
        }else{
          $scope.responseData=data.response.venues;
          $scope.distanceText = unit+" away";
        }
    }).error(function(data){
        responseDataObj.name ="Something's wrong !!!";
        responseDataObj.location.address="Please refresh the page, and remember to choose 'Share Location'";
        $scope.responseData= [responseDataObj];
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
    console.log('click to top');
      $('html,body').scrollTop(0);
  });
}]);
