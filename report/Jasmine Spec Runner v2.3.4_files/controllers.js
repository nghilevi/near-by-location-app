angular.module('appControllers', ['appServices'])

.controller('listViewCtrl',function($scope, searchService,$timeout) {
  $scope.venueList = [];
  var timeoutPromise;
  $scope.search = function(searchWords){
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function() {
      searchService.search(searchWords).then(function(res) {
        $scope.venueList= res;
      }).finally(function () {
        $scope.loading = false;
      });
    }, 500);
  }

});