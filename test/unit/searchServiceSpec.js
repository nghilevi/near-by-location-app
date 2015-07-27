/**
 * Created by nghi on 21.7.2015.
 */
describe('searchService', function () {
  var searchService;

  var $http,$q,fSBaseUrl,clientConst,$httpBackend,scope;

  var mockBaseUrl="/4square?q=",searchWords = "sushi", notFoundSearchWords="!@#$%^&",standardRes;
  var mockResponseData = jasmine.mockData.mockResponseData();
  var emptyDataResponse=jasmine.mockData.emptyDataResponse();
  beforeEach(module("appServices"));
  beforeEach(function () {
    inject(function (_$http_,_$q_,_fSBaseUrl_,_clientConst_,_searchService_,_$httpBackend_,$rootScope) {
      fSBaseUrl=_fSBaseUrl_;
      clientConst=_clientConst_;
      $httpBackend=_$httpBackend_;
      $http=_$http_;
      $q=_$q_;
      scope=$rootScope.$new()
      searchService=_searchService_;

      spyOn($q,"resolve")
      spyOn($http,"get").and.returnValue($q.when())

      spyOn(fSBaseUrl,"getBaseURL").and.returnValue(mockBaseUrl);
    })
  })

  it('should return results when get success', function () {
    searchService.search(searchWords)
    expect($http.get).toHaveBeenCalled()
    expect($q.resolve).not.toHaveBeenCalled()
  });

  it('should return error message if baseUrl is unavailable', function () {
    fSBaseUrl.getBaseURL.and.returnValue(undefined);
    searchService.search(searchWords)
    expect($q.resolve).toHaveBeenCalledWith([clientConst["ERROR"]])
    expect($http.get).not.toHaveBeenCalled()
  });

  describe('transform response', function () {
    var result,requestHandler;
    beforeEach(function () {
      $http.get.and.callThrough();
      $httpBackend.when('GET',mockBaseUrl+searchWords).respond(mockResponseData)
      $httpBackend.when('GET',mockBaseUrl+notFoundSearchWords).respond(emptyDataResponse)
    })
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
    it('should return a proper format data response obj if respond data is available', function () {
      searchService.search(searchWords).then(function (data) {
        result=data
      })
      $httpBackend.flush();
      var expectedResult=[];
      mockResponseData.response.venues.forEach(function (current) {
        var transformObj={
          location: current.location.lat+","+current.location.lng,
          name:current.name,
          distance:current.location.distance,
          address:(current.location.address || "")+ ' '+ (current.location.city || "")
        }
        expectedResult.push(transformObj)
      })
      expect(result).toEqual(expectedResult)
    });
    it('should return a zero result data response if respond data is unavailable', function () {
      searchService.search(notFoundSearchWords).then(function (data) {
        result=data
      })
      $httpBackend.flush();
      expect(result).toEqual([clientConst["ZERO_RESULT"]])
    });
  });


})