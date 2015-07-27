/**
 * Created by nghi on 21.7.2015.
 */
xdescribe('fSBaseUrl Service', function () {
  var fSBaseUrl; // the setvice on test

  var clientConst,$rootScope; //dependencies w/o being mocked

  // other variables/mock data/services
  var baseUrlBuilder,deferred,$scope;
  var userCoords,geolocation;

  beforeEach(module('appServices')); //invoke the module

  beforeEach(function () {

    module(function ($provide) {
      $provide.constant('clientConst', { // must be constant to take effect, if use value or service ... no effect
          CLIENT_ID:1,
          CLIENT_SECRET:1,
          CLIENT_VERSION:1
      })
      $provide.factory('geolocation', function ($q) {
        return {
          getLocation: function () {
            return $q.resolve(userCoords)
          }
        }
      })
    });

    inject(function(_$q_,_clientConst_,_$rootScope_,_baseUrlBuilder_,_geolocation_) {
      userCoords=jasmine.mockData.userCoords()
      $scope=_$rootScope_.$new(); //undefined()
      clientConst = _clientConst_;
      baseUrlBuilder=_baseUrlBuilder_;
      geolocation=_geolocation_;
    });
  });

  it('should return a correct url if client secret is available', inject(function (_fSBaseUrl_) {
    fSBaseUrl=_fSBaseUrl_; //the geolocation.getLocation().then() is called here
    $scope.$digest() //important
    var baseUrl = baseUrlBuilder
      .init()
      .id(clientConst.CLIENT_ID)
      .secret(clientConst.CLIENT_SECRET)
      .version(clientConst.CLIENT_VERSION)
      .geoData(userCoords)
      .get();
    var expectedBaseUrl = fSBaseUrl.getBaseURL(); //did not call geolocation.getLocation so we have to make it call & resolve before injecting it!!!
    expect(expectedBaseUrl).toBe(baseUrl)
  }));

  it('should return undefined if client secret is missing', inject(function (_fSBaseUrl_) {
    clientConst.CLIENT_SECRET=""
    fSBaseUrl=_fSBaseUrl_; //the geolocation.getLocation().then() is called here
    $scope.$digest() //important
    var expectedBaseUrl = fSBaseUrl.getBaseURL();
    expect(expectedBaseUrl).toBeUndefined()
  }));

});