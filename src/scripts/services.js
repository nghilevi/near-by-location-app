angular.module("appServices",  ['appConstants','geolocation'])

.factory('fSBaseURL',function(geolocation,clientConst){
    var baseUrl;

    function initBaseUrl() {

      geolocation.getLocation().then(function(data) {
        if(clientConst.CLIENT_VERSION){
          baseUrl = "https://api.foursquare.com/v2/venues/search" +
            "?client_id=" + clientConst.CLIENT_ID +
            "&client_secret=" + clientConst.CLIENT_SECRET +
            "&v=" + clientConst.CLIENT_VERSION +
            "&ll=" + data.coords.latitude +
            "," + data.coords.longitude +
            "&query=";
        }
      });
      return baseUrl;
    }

    initBaseUrl();

    return{
      getBaseURL: function () {
        return baseUrl ? baseUrl : initBaseUrl()}
    }
})
.factory('searchService',function($http,$q,fSBaseURL,clientConst){
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
    var baseUrl = fSBaseURL.getBaseURL();
    if(baseUrl){
      return $http.get(baseUrl+query,{transformResponse: transformLocationData}).then(successRes)
    }else{
      return $q.resolve([clientConst["ERROR"]]);
    }
  }

  return  {search: search};
})
