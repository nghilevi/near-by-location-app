/**
 * Created by nghi on 19.7.2015.
 */
angular.module('appDirectives', []).directive('venueItem', function () {
  return{
    restrict:'E',
    scope:{
      venue:'='
    },
    link: function (scope) {
      //console.log("scope.venue",scope.venue)
    },
    template:"<a ng-href=\"{{venue.location | googleMapLink}}\" target=\"_blank\">\n  <li class=\"info\">\n    <h3 class=\"name\">{{venue.name}}{{venue.distance | venueDistance}}</h3>\n    <p class=\"address\">{{venue.address}}</p>\n  </li>\n</a>"
  }
})