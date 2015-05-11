angular.module('appControllers', ['appServices'])

.controller('listViewCtrl',function($scope, locationService,$timeout,resItem) {

  var timeoutPromise;
  $scope.search = function(){
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function() {
      locationService.search($scope.searchWords).then(successResponse,errorResponse);
    }, 500);
  }

	function successResponse(res) {$scope.responseDataArr= res;}
  function errorResponse(res) {
    console.log('res',res)
    $scope.responseDataArr= res==404 ? [resItem.getInstance(null,null,null,"CALM")] : [resItem.getInstance(null,null,null,"ERROR")];
  }
});