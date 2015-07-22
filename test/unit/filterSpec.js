/**
 * Created by nghi on 22.7.2015.
 */
describe('Filters', function () {
  beforeEach(module('appFilters')) //TODO what if there are appFilters dependecy

  var $filter,clientConst,distance =1000;
  var venueDistance,googleMapLink
  beforeEach(inject(function (_venueDistanceFilter_,_clientConst_) {
    clientConst=_clientConst_
    venueDistance=_venueDistanceFilter_
  }))

  describe('venueDistance', function () {
    it('should return valid string if input text is not empty', function () {
      expect(venueDistance(distance)).toEqual(' - 1000m away')
    });
    it('should return empty string if input text is empty', function () {
      distance=""
      expect(venueDistance(distance)).toEqual('')
    });
  })


})