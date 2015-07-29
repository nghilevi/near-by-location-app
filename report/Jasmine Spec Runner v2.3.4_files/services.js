/**
 * Created by nghi on 25.7.2015.
 */
angular.module("appServices",  ['appConstants','geolocation','appInterceptors'])
  .factory('searchService',function($http,$q,clientConst,geolocation){
    var llData;
    geolocation.getLocation().then(function(data) {
      //llData=data.coords.latitude +"," + data.coords.longitude
      llData=data
    });
    function successRes(res) {
      var time = res.config.respondTimeStamp - res.config.requestTimeStamp;
      console.log('The request took ' + (time / 1000) + ' seconds.');
      return res.data
    }
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
        var config = {
          url: clientConst.API_URL,
          method: "GET",
          params: {
            query:query,
            ll:llData
          },
          transformResponse: transformLocationData
        }
        return $http(config).then(successRes)
      }else{
        return $q.resolve([clientConst["ERROR"]]);
      }
    }

    return  {search: search};
  })
