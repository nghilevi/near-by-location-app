angular.module("appServices",  ['appConstants','geolocation'])
.value('baseUrlBuilder',{
    baseUrl:"",
    id: function (id) {
      this.baseUrl+="?client_id=" + id
      return this;
    },
    secret: function (secret) {
      this.baseUrl+="&client_secret=" + secret
      return this;
    },
    version: function (v) {
      this.baseUrl+="&v=" + v;
      return this;
    },
    geoData: function (data) {
      this.baseUrl+="&ll=" + data.coords.latitude +"," + data.coords.longitude +"&query="
      return this;
    },
    get: function () {
      return this.baseUrl
    },
    init: function () {
      this.baseUrl= "https://api.foursquare.com/v2/venues/search"
      return this
    }
  })
.factory('fSBaseUrl',function(geolocation,clientConst,baseUrlBuilder){
    var baseUrl;

    function initBaseUrl() {
      geolocation.getLocation().then(function(data) { // how to test these chunk of code to make sure codecoverage

        if(clientConst.CLIENT_SECRET){
          baseUrl=baseUrlBuilder
            .init()
            .id(clientConst.CLIENT_ID)
            .secret(clientConst.CLIENT_SECRET)
            .version(clientConst.CLIENT_VERSION)
            .geoData(data)
            .get()
        }
      });
      return baseUrl;
    }

    initBaseUrl();

    return{
      getBaseURL: function () {
        return baseUrl ? baseUrl : initBaseUrl()
      }
    }
})
.factory('searchService',function($http,$q,fSBaseUrl,clientConst){
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
    var baseUrl = fSBaseUrl.getBaseURL();
    if(baseUrl){
      return $http.get(baseUrl+query,{transformResponse: transformLocationData}).then(successRes)
    }else{
      return $q.resolve([clientConst["ERROR"]]);
    }
  }

  return  {search: search};
})
