describe('Controller: listViewCtrl', function() {
  beforeEach(module('appController'));

  var listViewCtrl,
      scope,
      $timeout,
      locationService;

  beforeEach(inject(function($controller,$rootScope,locationService,$timeout){
    scope=$rootScope.$new();
    listViewCtrl = $controller('listViewCtrl',{
      $scope: scope,
      locationService: locationService,
      $timeout:$timeout
    });
  }));

  it('returns unfound item when typing an undefined name', function() {


  });
});