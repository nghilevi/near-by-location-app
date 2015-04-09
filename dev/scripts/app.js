var app = angular.module('nordeaLocationApp', ['ngAnimate']);

app.constant('config', {
   CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
   CLIENT_SECRET:'Enter your secret here',
   CLIENT_VERSION:"20130815"
});

app.service('locationService',  ['$http','config', function($http,config){
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
              baseURL=buildBaseURL(config.CLIENT_ID,config.CLIENT_SECRET,config.CLIENT_VERSION,currentLat,currentLon);
              console.log(baseURL); 
          });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        console.log(baseURL);
    };
    getLocation();
    return  {
        search: function(query){
            return  $http.get(baseURL+query);
        }
    };
}]);

app.controller('listViewCtrl', ['$scope','locationService',function($scope, locationService) {
  var currentLat,currentLon,baseURL;

  $scope.test=false;
  $scope.search = function(){
    locationService.search($scope.searchWords).success(function(data) {
        $scope.responseData=data.response.venues;
    }).error(function(data){
        $scope.error  = data;
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
