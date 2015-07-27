/**
 * Created by nghi on 23.7.2015.
 */
describe('Directives', function () {
  var venueItem = {
    location: "oulu",
    name:"oulu",
    distance:"1000",
    address:"nordea, oulu city"
  };
  var element, scope,venueList=[venueItem,venueItem,venueItem];
  beforeEach(module('appDirectives')) //TODO what if there are appFilters dependecy

  beforeEach(inject(function ($rootScope,$compile) {
    scope = $rootScope.$new();
    scope.venue = venueList;
    element="<venue-item venue='venue'></venue-item>"
    element = $compile(element)(scope);
    scope.$digest();
  }))

  describe('venue-item', function () {
    it('should display venues item', function () {
      var isolatedScope = element.isolateScope();
      expect(isolatedScope.venue.length).toBe(venueList.length)
    });

    it('should display nothing', function () {
      var isolatedScope = element.isolateScope();
      scope.venue =[]
      scope.$digest();
      expect(isolatedScope.venue.length).toBe(scope.venue.length)
    });

  });

})