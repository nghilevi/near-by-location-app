angular.module("appServices",  ['appConstants','geolocation'])

.factory('searchService',function($http,$q,geolocation,clientConst){
  var baseURL;

  geolocation.getLocation().then(function(data){
    baseURL= "https://api.foursquare.com/v2/venues/search"+
        "?client_id="+clientConst.CLIENT_ID+
        "&client_secret="+clientConst.CLIENT_SECRET+
        "&v="+clientConst.CLIENT_VERSION+
        "&ll="+data.coords.latitude+
        ","+data.coords.longitude+
        "&query="; 
    console.log('baseURL',baseURL);
  });

  function successRes(res) {return res.data}
  function errorRes(res) {return res}
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
    if(baseURL==undefined || clientConst.CLIENT_SECRET==""){
      return $q.resolve([clientConst["ERROR"]]);
    }else{
      return $http.get(baseURL+query,{transformResponse: transformLocationData}).then(successRes,errorRes)
    }
  }

  return  {search: search};
})
