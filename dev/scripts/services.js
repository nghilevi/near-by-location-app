var locationService = angular.module('locationService',[]);

locationService.constant('clientConstants', {
   CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
   //CLIENT_SECRET:'Enter your secret here',
   
   CLIENT_VERSION:"20150408"
});

locationService.factory('baseURLService',['clientConstants',function(clientConstants){
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

locationService.factory('getCurrentLocation',['baseURLService','$window',function(baseURLService,$window){
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

locationService.factory('locationService',  ['$http','baseURLService','getCurrentLocation','$q',function($http,baseURLService,getCurrentLocation,$q){
    var unit ='m',
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
      var report = $q.defer()
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
        report.resolve(data);
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

      return report.promise;
    }

    return  {
      search: function(query){

        return returnData(query);
      }
    };
}]);