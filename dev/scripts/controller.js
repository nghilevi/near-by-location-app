var app = angular.module('appController', ['locationService']);

app.controller('listViewCtrl',
 ['$scope','locationService','$timeout','$q','$http',
 function($scope, locationService,$timeout,$q,$http) {
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

	$scope.getReport = function() {
	  report = $q.defer()

	  $timeout(function() {
	    $http({method: 'GET', url: 'https://www.googleapis.com/analytics/v3/data/ga'})
	      .success(function(body) {
	        report.resolve(body)
	      })
	  }, 300)

	  return report.promise
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