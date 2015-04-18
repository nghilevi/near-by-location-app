var app = angular.module('nearByLocationApp', ['ngAnimate','ngRoute','locationService']);

app.config(['$routeProvider',function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'dev/views/listView.html',
      controller: 'listViewCtrl'
    })
    .otherwise({
      templateUrl: 'dev/views/404.html'
    });
}]);


app.constant('clientConstants', {
   CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
   //CLIENT_SECRET:'Enter your secret here',

   CLIENT_VERSION:"20150408"
});



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

  //Normal JS
  $('#back-to-top').hide();
  //Animation while scrolling
  $(window).scroll(function() {
    if ($(this).scrollTop()>800){
        $('#back-to-top').fadeIn();
    }else{     
       $('#back-to-top').fadeOut();
    }
  });
  $("#back-to-top").click(function() {
      $('html,body').scrollTop(0);
  });
}]);
