/**
 * Created by nghi on 25.7.2015.
 */
/*
 http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
 */

angular.module("appInterceptors",['appConstants'])
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
  .factory("timeStampMarker",function () {
    return {
      request: function (config) {
        config.requestTimeStamp = new Date().getTime();
        return config;
      },
      response: function (response) { //response NOT respond
        response.config.respondTimeStamp = new Date().getTime();
        return response;
      }
    }
  })