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

  it('returns items when typing a search word', function() {

    expect(_scope.search).toBeDefined();
    expect(_scope.responseDataArr).toBe(undefined);
    expect(_scope.distanceText).toBe(undefined);
    
    _scope.searchWords='sushi';

    _locationService.search(_scope.searchWords).then(function(res){
      console.log(res) //never reach this
    });

  });

  it('should return report data from Google Analytics', function() {
    _scope.getReport().then(function(body) {
      expect(body.kind).toBe('analytics#gaData')
    })
    _httpBackend.expectGET('https://www.googleapis.com/analytics/v3/data/ga').respond({});
    _timeout.flush()
    _httpBackend.flush()
  })
});