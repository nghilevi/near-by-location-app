app.controller('list-view', ['$scope', '$http','config',function($scope, $http,config) {
  var currentLat,currentLon,queryRoot;
  var buildRootQuery=function(client_id,client_secret,client_version,currentLat,currentLon){
    return queryRoot = "https://api.foursquare.com/v2/venues/search"+
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
            console.log(currentLat);
            console.log(currentLon);
            queryRoot=buildRootQuery(config.CLIENT_ID,config.CLIENT_SECRET,config.CLIENT_VERSION,currentLat,currentLon);
        });
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  };

  getLocation();

  $scope.search = function(){
    var query=queryRoot+$scope.searchWords;
    $http.get(query).success(function(data) {
        $scope.responseData=data.response.venues;
        console.log($scope.responseData);
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