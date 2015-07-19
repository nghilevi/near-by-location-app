describe('Controller: listViewCtrl', function() {

  var scope={},venueItem,searchService={search: function () {
    scope.venueList=[venueItem]
  }};
  beforeEach(function () {
    module('nearByLocationApp');
    inject(function($rootScope,$controller){
      venueItem={name:'sushi',location:"1,1",distance:"0",address:"Finland"}
      spyOn(searchService,"search").and.callThrough();
      $controller('listViewCtrl',{
        $scope: scope,
        searchService:searchService
      });
    });
  });
  describe('The venueList', function () {

    it('should be empty by default', function () {
      expect(scope.venueList.length).toBe(0);
    });

    it('should contain venue item in the right format after searching', function() {
      scope.search('sushi');
      venue = scope.venueList[0]
      for(key in venue){
        if(venue.hasOwnProperty(key)){
          expect(key).toBeDefined();
        }
      }
    });
  });
  describe('The search function', function () {

    it('should call searchService.search with the right parameter', function() {
      scope.search('sushi');
      expect(searchService.search).toHaveBeenCalledWith(scope);
    })

    it('should populate the list after searching', function() {
      scope.search('sushi');
      expect(scope.venueList.length).toBeGreaterThan(0);
    })

  });

});

