describe('Controller: listViewCtrl', function() {
  beforeEach(module('appController'));

  var listViewCtrl,
      _scope,
      _timeout,
      _locationService,
      _httpBackend;

  beforeEach(inject(function($controller,$rootScope,locationService,$timeout,$httpBackend){
    _scope=$rootScope.$new();
    _locationService = locationService;
    _timeout=$timeout,
    _httpBackend=$httpBackend;

    listViewCtrl = $controller('listViewCtrl',{
      $scope: _scope,
      locationService: _locationService,
      $timeout:_timeout
    });
  }));

  // it('returns items when typing a search word', function() {

  //   expect(_scope.search).toBeDefined();
  //   expect(_scope.responseDataArr).toBe(undefined);
  //   expect(_scope.distanceText).toBe(undefined);
    
  //   _scope.searchWords='sushi';

  //   _locationService.search(_scope.searchWords).then(function(res){
  //     console.log(res) //never reach this
  //   });

  // });

  it('should return report data from Google Analytics', function() {
    var url = 'https://api.foursquare.com/v2/venues/search?client_id=CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ&client_secret=GYNP4URASNYRNRGXR5UEN2TGTKJHXY5FGSAXTIHXEUG1GYM2&v=20150408&ll=60.221715200000006,24.77866&query=sushi'
      
    _scope.getReport().then(function(body) {
      console.log('body',body);
      console.log('body.response',body.response);
      console.log('body.response.venues',body.response.venues);
      console.log('body.response.venues[0]',body.response.venues[0]);
      expect(body.kind).toBe('analytics#gaData')
    })
    _httpBackend.expectGET(url).respond({});
    _timeout.flush()
    _httpBackend.flush()
  })
});