describe('Controller: listViewCtrl', function() {

  var scope={},venueItem,validSearchWord="sushi",searchService;
  var venueItem={name:'sushi',location:"1,1",distance:"0",address:"Finland"};
  var $timeout;

  beforeEach(function () {
    module('nearByLocationApp');
    inject(function($rootScope,$controller,$q,_$timeout_){
      $timeout = _$timeout_;
      searchService={
        search: function () {
          return $q.resolve([venueItem])
        }
      };
      spyOn(searchService,"search").and.callThrough();
      $controller('listViewCtrl',{
        $scope: scope,
        searchService:searchService
      });
    });
  });

  it('The venueList should be empty by default', function () {
    expect(scope.venueList.length).toBe(0);
  });

  it('The loading should be true then changes to false after searching', function () {
    scope.search(validSearchWord);
    expect(scope.loading).toBeTruthy();
    $timeout.flush();
    $timeout.verifyNoPendingTasks();
    expect(scope.loading).toBeFalsy;
  });

  describe('The search function', function () {
    beforeEach(function () {
      scope.search(validSearchWord);
      $timeout.flush();
      $timeout.verifyNoPendingTasks();
    })

    it('should call searchService.search with the right parameter',function() {
      expect(searchService.search).toHaveBeenCalledWith(validSearchWord);
    })

    it('should populate the list after searching', function() {
      expect(scope.venueList.length).toBeGreaterThan(0);
    })

    it('should return venue item in the right format after searching', function() {
      var venue = scope.venueList[0]
      for(key in venue){
        if(venue.hasOwnProperty(key)){
          expect(key).toBeDefined();
        }
      }
    });

  });

});

