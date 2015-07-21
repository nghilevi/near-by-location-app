/**
 * Created by nghi on 21.7.2015.
 */
describe('Services', function () {
  beforeEach(module('appServices'));
  describe('fSBaseURL', function () {
    var fSBaseURL,geolocation,clientConst,$rootScope;
    var user_coords={
      coords:{
        latitude:'1',
        longitude:'2'
      }
    }
    var baseUrlBuilder = {
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
    }

    beforeEach(function () {
      inject(function(_fSBaseURL_,$q,_clientConst_, _geolocation_,_$rootScope_) {
        $rootScope=_$rootScope_;
        clientConst = _clientConst_;
        fSBaseURL=_fSBaseURL_;

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

    it('should return a proper url', function () {
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

  });

});