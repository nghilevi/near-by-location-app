var app = angular.module('appController', ['locationService']);

app.controller('listViewCtrl',
 ['$scope','locationService','$timeout',
 function($scope, locationService,$timeout) {
  var timeoutPromise;

  $scope.search = function(){
    $timeout.cancel(timeoutPromise);
    var query = $scope.searchWords;      
    timeoutPromise = $timeout(function() {
      locationService.search(query).then(function(res){
        $scope.responseDataArr= res.responseDataArr;
        $scope.distanceText =res.distanceText;
      });
    }, 500);
  
  }

  //Back to top button, should be written in Angular-ish way still, but this is just a quick snippet
  // $('#back-to-top').hide();
  // //Animation while scrolling
  // $(window).scroll(function() {
  //   if ($(this).scrollTop()>800){
  //       $('#back-to-top').fadeIn();
  //   }else{     
  //      $('#back-to-top').fadeOut();
  //   }
  // });
  // $("#back-to-top").click(function() {
  //     $('html,body').scrollTop(0);
  // });
}]);