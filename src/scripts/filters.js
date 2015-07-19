/**
 * Created by nghi on 19.7.2015.
 */
angular.module('appFilters', [])

.filter('venueDistance', function (clientConst) {
  return function(text) {
    return text ? " - "+text+clientConst.UNIT +" away" : "";
  }
})
.filter('googleMapLink', function (clientConst) {
  return function(text) {
    return text ? "http://maps.google.com/?q="+text : "";
  }
})