/**
 * Created by nghi on 23.7.2015.
 */
describe('Constants', function () {
  var clientConst;
  beforeEach(module('appConstants'));
  beforeEach(inject(function (_clientConst_) {
    clientConst = _clientConst_;
  }))
  it('all value should be non empty string', function () {
    for(key in clientConst){
      if(clientConst.hasOwnProperty(key)){
        expect(clientConst[key]).toBeTruthy();
      }
    }
  });
});