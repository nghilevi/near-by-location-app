/**
 * Created by nghi on 21.7.2015.
 */
describe('fSBaseUrl Service', function () {
  var fSBaseUrl; // the setvice on test

  var clientConst,$rootScope; //dependencies w/o being mocked

  // other variables/mock data/services
  var baseUrlBuilder,deferred,$scope;
  var user_coords={
    coords:{
      latitude:'1',
      longitude:'2'
    }
  }
  // way 1
  //var mockGeolocation = { getLocation: function () { // create the mock service
  //  return {
  //    then: function(callback){callback(user_coords)} //TODO how to inject data
  //  }
  //}}
  var geolocation;

  beforeEach(module('appServices')); //invoke the module

  beforeEach(function () {
    // way 1
    //module(function ($provide) {
    //  $provide.value('geolocation', mockGeolocation) // REGISTER the mock service
    //});

    inject(function(_fSBaseUrl_,_$q_,_clientConst_,_$rootScope_,_baseUrlBuilder_,_geolocation_) {

      $scope=_$rootScope_.$new(); //undefined()
      clientConst = _clientConst_;
      baseUrlBuilder=_baseUrlBuilder_;

      geolocation=_geolocation_;

      // Use a Jasmine Spy to return the deferred promise
      spyOn(geolocation, 'getLocation').and.returnValue({
        then:function(callback){callback(user_coords)} //quick & dirty way
      });
      //spyOn(geolocation, 'getLocation').and.returnValue(_$q_.defer().promise);

      fSBaseUrl=_fSBaseUrl_;
    });
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

  xit('should return undefined if client secret is missing', function () {
    //TODO mock clientConst at this stage
    var expectedBaseUrl = fSBaseUrl.getBaseURL();
    expect(expectedBaseUrl).toBeUndefined()
  });

});