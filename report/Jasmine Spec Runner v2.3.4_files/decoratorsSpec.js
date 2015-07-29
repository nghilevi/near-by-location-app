/**
 * Created by nghi on 29.7.2015.
 */
describe('Decorator', function () {
  var geolocation,scope,userCoords,defer, q,window;

  // module plays a role as a config
  // to overide what has been registered in nearByLocationApp, u have to declare the module first, $provide later
  /*
  can not mock geolocation in this case because it will never call the decorator that we want to test
   */
  beforeEach(module('nearByLocationApp')) //module is always before inject, each time it run, config is created again
    // does not work!
  //beforeEach(module(function ($provide) {
  //  $provide.factory('geolocation', function ($q) {
  //    userCoords=jasmine.mockData.userCoords();
  //    console.log("userCoords",userCoords)
  //
  //    return {
  //      getLocation: function() {
  //        return $q.when(userCoords)
  //      },
  //      foo: function() {
  //        return $q.when(userCoords)
  //      }
  //    };
  //  });
  //
  //}));



  beforeEach(inject(function (_geolocation_,$rootScope,$q) {
    userCoords=jasmine.mockData.userCoords();

    geolocation = _geolocation_;
    scope = $rootScope.$new();
    q=$q
    //spyOn(geolocation,"getLocation").and.callFake(function () {
    //  return $q.when(userCoords)
    //})
  }));


  it('$q.defer has been call', function () {
    spyOn(q,"defer").and.callThrough()
    geolocation.getLocation()
    geolocation.getUserLocation()
    expect(q.defer.calls.any()).toEqual(true);
    expect(q.defer.calls.count()).toEqual(2);
  });

});