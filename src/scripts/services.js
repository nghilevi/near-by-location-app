angular.module("appServices",  ['appConstants','geolocation'])

.factory('resItem', function (clientConst) {
  return {
    create: function (param) {
      var resItem = {}
      if(param.type){
        param= clientConst[param.type]
      }
      angular.extend(resItem, {
        location:param.location,
        name:param.name,
        distance: param.distance,
        address: param.address
      })
      return resItem
    }
  };
})
.factory('locationService',function($http,$q,geolocation,clientConst,resItem){
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
      
  var search = function(query){     
    if(baseURL==undefined){
      return $q.reject(404);
    }else{
      return $http.get(baseURL+query,{transformResponse: transformLocationData}).then(successRes,errorRes) 
    }
  } 

  function successRes(res) {return res.data}
  function errorRes(res) {return res}
  function transformLocationData(data,headerGetter){
    //console.log('headerGetter',headerGetter);
    data = angular.fromJson(data);
    console.log("raw data",data)
    var transformed, venuesArray = data.response.venues;
    console.log('venuesArray',venuesArray)
    if(venuesArray.length != 0){
      //console.log('start loop by forEach');
      transformed=venuesArray.map(function(current){
        console.log("current.location.lat",current.location.lat)
        return resItem.create({
          location: current.location.lat+","+current.location.lng,
          name:current.name,
          distance:current.location.distance,
          address:(current.location.address || "")+ ' '+ (current.location.city || "")
        });
      });
    }else{
      transformed=[resItem.create({type:"ZERO_RESULT"})];
    }
    console.log('transformed',transformed)
    return transformed;
  }
  return  {search: search};
})
.factory("searchService", function (locationService,$timeout,resItem) {
  var timeoutPromise;
  var search = function (scope) {
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function() {
      locationService.search(scope.searchWords).then(function (res) {
        console.log("success res",res)
        scope.venueList= res;
      }, function (res) {
        console.log("fail res",res)
        scope.venueList= res==404 ? [resItem.create({type:"ERROR"})] : [resItem.create({type:"CALM"})];
      });
    }, 500);
  }

  return {
    search:search
  }
})