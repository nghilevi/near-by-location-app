/**
 * Created by nghi on 25.7.2015.
 */
angular.module("appServices",  ['appConstants','geolocation'])
  .factory('fSClientParamsInjector', function (clientConst) {
    return{
      request: function (config) {
        if(config.url == clientConst.API_URL){
          if(clientConst.CLIENT_ID && clientConst.CLIENT_SECRET){
            config.params['client_id']=clientConst.CLIENT_ID;
            config.params['client_secret']=clientConst.CLIENT_SECRET
            config.params['v']=clientConst.CLIENT_VERSION
          }
        }
        return config;
      }
    }
  })
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
