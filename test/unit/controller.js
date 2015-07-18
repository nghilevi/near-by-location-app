describe('Controller: listViewCtrl', function() {

  var scope={},searchService={search:angular.noop};
  beforeEach(function () {
    module('nearByLocationApp');
    inject(function($rootScope,$controller){
      spyOn(searchService,"search").and.returnValue("Foo");
      $controller('listViewCtrl',{
        $scope: scope,
        searchService:searchService
      });
    });
  });
  it('the list should be empty at first', function () {
    expect(scope.resultsList.length).toBe(0);
  });
  it('should call searchService.search', function() {
    scope.search('sushi');
    expect(searchService.search).toHaveBeenCalledWith(scope);
  })
});

