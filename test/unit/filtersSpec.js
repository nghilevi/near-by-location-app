/**
 * Created by nghi on 22.7.2015.
 */
describe('Filters', function () {
  beforeEach(module('appFilters')) //TODO what if there are appFilters dependecy

  var clientConst,distance =1000,sampleText="oulu",baseGGMapLink="http://maps.google.com/?q=";
  var venueDistance,googleMapLink
  beforeEach(inject(function (_clientConst_) {
    clientConst=_clientConst_
  }))

  describe('venueDistance', function () {
    beforeEach(inject(function (_venueDistanceFilter_) {
      venueDistance=_venueDistanceFilter_
    }))
    it('should return valid string if input text is not empty', function () {
      expect(venueDistance(distance)).toEqual(' - 1000m away')
    });
    it('should return empty string if input text is empty', function () {
      distance=""
      expect(venueDistance(distance)).toEqual('')
    });
  })

  describe('googleMapLink', function () {
    beforeEach(inject(function (_googleMapLinkFilter_) {
      googleMapLink=_googleMapLinkFilter_
    }))
    it('should return valid string if input text is not empty', function () {
      expect(googleMapLink(sampleText)).toEqual(baseGGMapLink+sampleText)
    });
    it('should return empty string if input text is empty', function () {
      sampleText=""
      expect(googleMapLink(sampleText)).toEqual('')
    });
  })
})