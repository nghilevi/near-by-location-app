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

      $scope.getReport();

    }, 500);
  
  }

	$scope.getReport = function() {
	  report = $q.defer()

	  $timeout(function() {
      var url = 'https://api.foursquare.com/v2/venues/search?client_id=CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ&client_secret=GYNP4URASNYRNRGXR5UEN2TGTKJHXY5FGSAXTIHXEUG1GYM2&v=20150408&ll=60.221715200000006,24.77866&query=sushi'
	    $http({method: 'GET', url: url})
	      .success(function(body) {
          console.log('body from controller.response',body.response);
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