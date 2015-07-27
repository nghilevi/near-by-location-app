/**
 * Created by nghi on 23.7.2015.
 */
describe('App', function() {
  describe('routes', function () {
    beforeEach(module('nearByLocationApp'));

    it('should test routes', inject(function($route) {
      expect($route.routes['/'].controller).toBe('listViewCtrl');
      expect($route.routes['/'].templateUrl).toBe('src/views/listView.html');
      expect($route.routes[null].templateUrl).toBe('src/views/404.html');
    }));
  });

  describe('module', function () {
    var module;
    beforeEach(function() {
      module = angular.module("nearByLocationApp");
    });

    it("should be registered", function() {
      expect(module).not.toBeNull();
    });

    describe('dependencies', function () {
      var deps;
      var hasModule = function (m) {
        return deps.indexOf(m) >=0;
      }
      beforeEach(function () {
        deps = module.value().requires;
        //console.log("deps",deps)
      })
      it("should have some other modules as dependencies", function() {
        expect(hasModule('ngAnimate')).toBeTruthy();
        //so on
      });
    });
  });

});