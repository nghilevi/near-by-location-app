/**
 * Created by nghi on 21.7.2015.
 */
describe('searchService', function () {
  var searchService;

  var $http,$q,fSBaseUrl,clientConst;

  var searchWords = "sushi", notFoundSearchWords="!@#$%^&"

  beforeEach(module("appServices"));
  beforeEach(inject(function (_$http_,_$q_,_fSBaseUrl_,_clientConst_,_searchService_) {
    searchService=_searchService_;
    fSBaseUrl=_fSBaseUrl_;
    clientConst=_clientConst_;
  }))

  it('should return error message if baseUrl is unavailable', function () {
    var venueList
    spyOn(fSBaseUrl,"getBaseURL").and.returnValue(undefined)
    searchService.search(searchWords).then(function (data) {
      venueList=data;
    });
    console.log(venueList)
    expect(venueList).toEqual([clientConst["ERROR"]])
  });
  it('should return zero result message if there is no result', function () {

  });
  it('should results when get success', function () {

  });
})