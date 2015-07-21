/**
 * Created by nghi on 21.7.2015.
 */
/**
 * Created by nghi on 21.7.2015.
 */
xdescribe('Services', function () {
  describe('fSBaseURL', function () {
    var geolocation,$rootScope;
    var user_coords={
      coords:{
        latitude:'1',
        longitude:'2'
      }
    };

    beforeEach(function () {
      module('appServices');

      inject(function(_fSBaseURL_,$q,_geolocation_,_$rootScope_) {
        $rootScope=_$rootScope_;
        geolocation = { //have to definde it, otherwise it wont find the getLocation fn
          getLocation:function(){
            return $q.resolve(user_coords);
          }
        }

        var deferred = $q.defer();
        deferred.resolve(user_coords);
        spyOn(geolocation,"getLocation").and.returnValue(deferred.promise);

      });

    });


    it('', function () {
      var data;
      geolocation.getLocation().then(function(d) {
        data = d;
      })
      $rootScope.$apply();
      console.log("data",data)
    });

  });
});