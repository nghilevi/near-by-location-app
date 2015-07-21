/**
 * Created by nghi on 21.7.2015.
 */
describe('searchService', function () {
  var searchService;

  var $http,$q,fSBaseUrl,clientConst,$httpBackend,scope;

  var searchWords = "sushi", notFoundSearchWords="!@#$%^&",standardRes;

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
    })
  })

  it('should return results when get success', function () {
    spyOn(fSBaseUrl,"getBaseURL").and.returnValue(true);
    searchService.search(searchWords)
    expect($http.get).toHaveBeenCalled()
    expect($q.resolve).not.toHaveBeenCalled()
  });

  it('should return error message if baseUrl is unavailable', function () {
    spyOn(fSBaseUrl,"getBaseURL").and.returnValue(undefined);
    searchService.search(searchWords)
    expect($q.resolve).toHaveBeenCalledWith([clientConst["ERROR"]])
    expect($http.get).not.toHaveBeenCalled()
  });

})