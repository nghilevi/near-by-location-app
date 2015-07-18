angular.module("appServices",  ['geolocation'])

.constant('clientConst', {
   CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
   CLIENT_SECRET:'GYNP4URASNYRNRGXR5UEN2TGTKJHXY5FGSAXTIHXEUG1GYM2',
   CLIENT_VERSION:"20150408"
})

.factory('resItem', function () {
  var messageConst ={
   ZERO_RESULT:["No results found","","Please type in another search terms"],
   CALM:["Enhance your calm!!!","","We are trying to figure out where are you. Please type in the search box again after a few seconds!"],
   ERROR:["Something's wrong !!!","","Please wait or refresh the page, and remember to choose 'Share Location'"]
  }

  var ResItem = function (name,distance,address) {
    this.name= name;
    this.distance= distance;
    this.address= address;     
  };

  var resItemFactory= function (messType) {
    var args=messageConst[messType]
    return new ResItem(args[0],args[1],args[2]);
  };

  return {
    getInstance: function (name,distance,address,messType) {
      return messType == undefined ? new ResItem(name,distance,address) : resItemFactory(messType);
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
    console.log('headerGetter',headerGetter);
    var unit = 'm';
    data = angular.fromJson(data);
    var transformed, venuesArray = data.response.venues;
    console.log('venuesArray',venuesArray)
    if(venuesArray.length != 0){
      console.log('start loop by forEach');
      transformed=venuesArray.map(function(current){
        return resItem.getInstance(
          current.name,
          current.location.distance+unit+' away',
          current.location.address + ' '+current.location.city
        );
      });
    }else{
      transformed=[resItem.getInstance(null,null,null,"ZERO_RESULT")];
    }
    console.log('transformed',transformed)
    return transformed;}

  return  {search: search};

})
  .factory("searchService", function (locationService,$timeout,resItem) {
    var timeoutPromise;
    var search = function (scope) {
      var searchWords=scope.searchWords;
      $timeout.cancel(timeoutPromise);
      timeoutPromise = $timeout(function() {
        locationService.search(searchWords).then(function (res) {
          scope.responseDataArr= res;
        }, function (res) {
          scope.responseDataArr= res==404 ? [resItem.getInstance(null,null,null,"CALM")] : [resItem.getInstance(null,null,null,"ERROR")];
        });
      }, 500);
    }

    return {
      search:search
    }
  })