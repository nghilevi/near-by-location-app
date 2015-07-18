angular.module('appControllers', ['appServices'])

.controller('listViewCtrl',function($scope, searchService) {
  $scope.resultsList = [];
  $scope.search = function(){
    searchService.search($scope)
  }

});