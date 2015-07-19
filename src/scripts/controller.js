angular.module('appControllers', ['appServices'])

.controller('listViewCtrl',function($scope, searchService) {
  $scope.venueList = [];
  $scope.search = function(){
    searchService.search($scope)
  }

});