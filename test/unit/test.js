xdescribe('Controller: listViewCtrl', function() {
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

  it('should return some data', function() {
    expect(_scope.getData).toBeDefined(); //true
    var getData=_scope.getData;
    
    getData('sushi').then(function(body) {
      console.log('body',body);
      //expect(body.response).toBe('analytics#gaData')
    })
    //_httpBackend.expectGET(url).respond({});
    //_timeout.flush()
    //_httpBackend.flush()
  })
});