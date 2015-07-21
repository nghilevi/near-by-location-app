/**
 * Created by nghi on 21.7.2015.
 */
describe('Services', function () {
  var fSBaseURL,geolocation,clientConst,$rootScope;
  var user_coords={
    coords:{
      latitude:'1',
      longitude:'2'
    }
  }
  var baseUrlBuilder;

  beforeEach(module('appServices'));
  describe('fSBaseURL', function () {

    beforeEach(function () {
      inject(function(_fSBaseURL_,$q,_clientConst_,_$rootScope_,_baseUrlBuilder_) {
        $rootScope=_$rootScope_;
        clientConst = _clientConst_;
        fSBaseURL=_fSBaseURL_;
        baseUrlBuilder=_baseUrlBuilder_;

        geolocation = { //have to defind it, otherwise it wont find the getLocation fn
          getLocation:function(){
            return $q.resolve(user_coords);
          }
        }

        var deferred = $q.defer();
        deferred.resolve(user_coords);

        spyOn(geolocation,"getLocation").and.returnValue(deferred.promise);
        spyOn(fSBaseURL,"getBaseURL").and.callFake(function () {
          var baseUrl;
          geolocation.getLocation().then(function (data) {
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
          $rootScope.$apply()
          return baseUrl;
        })
      });

    });

    it('should contain correct client id & secret', function () {
      var clientIDLength = 48;
      expect(clientConst.CLIENT_ID.length).toBe(clientIDLength)
      expect(clientConst.CLIENT_SECRET.length).toBe(clientIDLength)
    });

    it('should return a proper url if client secret is available', function () {
      var baseUrl = baseUrlBuilder
        .init()
        .id(clientConst.CLIENT_ID)
        .secret(clientConst.CLIENT_SECRET)
        .version(clientConst.CLIENT_VERSION)
        .geoData(user_coords)
        .get();
      var expectedBaseUrl = fSBaseURL.getBaseURL();
      expect(geolocation.getLocation).toHaveBeenCalled()
      expect(expectedBaseUrl).toBe(baseUrl)
    });
    it('should returnu ndefined if client secret is undefined', function () {
      clientConst.CLIENT_SECRET = undefined;
      var expectedBaseUrl = fSBaseURL.getBaseURL();
      expect(expectedBaseUrl).toBeUndefined()
    });

  });
  describe('searchService', function () {
    it('should return error message if baseUrl is unavailable', function () {

    });
    it('should return zero result message if there is no result', function () {

    });
    it('should results when get success', function () {

    });
  })
});