/**
 * Created by nghi on 23.7.2015.
 */
describe('nearByLocationApp', function() {
  beforeEach(module('nearByLocationApp'));

  it('should test routes', inject(function($route) {
    expect($route.routes['/'].controller).toBe('listViewCtrl');
    expect($route.routes['/'].templateUrl).toBe('src/views/listView.html');
    expect($route.routes[null].templateUrl).toBe('src/views/404.html');
  }));
});