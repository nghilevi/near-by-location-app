/**
 * Created by nghi on 27.7.2015.
 */
describe('Services', function () {
  var http,q,clientConst,geolocation,searchService,defer,scope;
  var userCoords,mockResponseData,emptyDataResponse;
  var query='sushi';
  var result;

  beforeEach(module('appServices'))

  beforeEach(inject(function (_$q_,_clientConst_,_geolocation_,_$rootScope_) {
      userCoords = jasmine.mockData.userCoords(),
      mockResponseData = jasmine.mockData.mockResponseData(),
      emptyDataResponse=jasmine.mockData.emptyDataResponse();
      //http = _$http_,
      q = _$q_,
      clientConst=_clientConst_,
      geolocation=_geolocation_;
      scope = _$rootScope_.$new()
      defer = q.defer()
      spyOn(geolocation,"getLocation").and.returnValue(defer.promise);
      //defer.resolve(userCoords)
      result = null;

  }))

  describe('searchService', function () {

    it('should return error when lat long data is undefined', inject(function (_searchService_) {
      defer.reject()
      searchService=_searchService_;

      searchService.search(query).then(function (data) {
        result = data
      });
      scope.$apply() //important

      expect(result).toEqual([clientConst["ERROR"]])
    }));

    it('should return data when lat long data is defined', inject(function (_searchService_,$httpBackend) {
      $httpBackend.when('GET',new RegExp("^(http|https)://", "i")).respond(mockResponseData)
      defer.resolve(userCoords)
      searchService=_searchService_;
      scope.$apply()

      searchService.search(query).then(function (data) {
        result = data
      });
      $httpBackend.flush();
      //scope.$apply() //important
      expect(result.length).toBe(mockResponseData.response.venues.length)
    }));

    it('should return zero data when lat long data is defined and respond venues is empty', inject(function (_searchService_,$httpBackend) {
      $httpBackend.when('GET',new RegExp("^(http|https)://", "i")).respond(emptyDataResponse)
      defer.resolve(userCoords)
      searchService=_searchService_;
      scope.$apply()

      searchService.search(query).then(function (data) {
        result = data
      });
      $httpBackend.flush();
      //scope.$apply() //important
      expect(result).toEqual([clientConst["ZERO_RESULT"]])
    }));

  });
});