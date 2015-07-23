angular.module("appServices",  ['appConstants','geolocation'])

.factory('searchService',function($http,$q,clientConst,geolocation){
  var llData;
  geolocation.getLocation().then(function(data) { // how to test these chunk of code to make sure codecoverage
    llData=data.coords.latitude +"," + data.coords.longitude
  });
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
    if(llData){
      var resObj = {
        url: 'https://api.foursquare.com/v2/venues/search',
        method: "GET",
        params: {
          client_id:clientConst.CLIENT_ID,
          client_secret:clientConst.CLIENT_SECRET,
          v:clientConst.CLIENT_VERSION,
          ll:llData,
          query:query
        },
        transformResponse: transformLocationData
      }
      return $http(resObj).then(successRes)
    }else{
      return $q.resolve([clientConst["ERROR"]]);
    }
  }

  return  {search: search};
})
