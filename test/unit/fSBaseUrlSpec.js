/**
 * Created by nghi on 21.7.2015.
 */
describe('fSBaseUrl Service', function () {
  var fSBaseUrl; // the setvice on test

  var clientConst,$rootScope; //dependencies w/o being mocked

  // other variables/mock data/services
  var baseUrlBuilder,clientConstMock;
  var user_coords={
    coords:{
      latitude:'1',
      longitude:'2'
    }
  }
  var mockGeolocation = { getLocation: function () { // create the mock service

    return {
      then: function(callback){callback(user_coords)} //TODO how to inject data
    }
  }}
  var geolocation;

  beforeEach(module('appServices')); //invoke the module

  beforeEach(function () {
    module(function ($provide) {
      $provide.value('geolocation', mockGeolocation) // REGISTER the mock service
    });

    inject(function(_fSBaseUrl_,$q,_clientConst_,_$rootScope_,_baseUrlBuilder_,_geolocation_) {

      $rootScope=_$rootScope_; //undefined()
      clientConst = _clientConst_;
      baseUrlBuilder=_baseUrlBuilder_;
      fSBaseUrl=_fSBaseUrl_;

      // add mock behavior
      geolocation = _geolocation_
      var deferred = $q.defer();
      deferred.resolve(user_coords);
      spyOn(geolocation,"getLocation").and.returnValue(deferred.promise);
    });
  });

  it('should call geolocation.getLocation when getBaseUrl', function () {
    fSBaseUrl.getBaseURL();
    expect(geolocation.getLocation).toHaveBeenCalled()
  });



  it('should return a correct url if client secret is available', function () {
    var baseUrl = baseUrlBuilder
      .init()
      .id(clientConst.CLIENT_ID)
      .secret(clientConst.CLIENT_SECRET)
      .version(clientConst.CLIENT_VERSION)
      .geoData(user_coords)
      .get();
    var expectedBaseUrl = fSBaseUrl.getBaseURL();
    expect(expectedBaseUrl).toBe(baseUrl)
  });

  it('should return undefined if client secret is undefined', function () {
    //TODO mock clientConst at this stage
    clientConst.CLIENT_SECRET = "";
    spyOn(clientConst,"CLIENT_SECRET")
    var expectedBaseUrl = fSBaseUrl.getBaseURL();
    expect(expectedBaseUrl).toBeUndefined()
  });

});