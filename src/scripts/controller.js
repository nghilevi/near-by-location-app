angular.module('appControllers', ['appServices'])

.controller('listViewCtrl',function($scope, searchService) {

  $scope.search = function(){
    searchService.search($scope)
  }

});