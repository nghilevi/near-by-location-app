/**
 * Created by nghi on 18.7.2015.
 */
describe('favourite rapper', function () {
  var searchInput,nameElem;
  beforeEach(function () {
    browser.get('');
    searchInput = element(by.model('searchWords'));
    nameElem=element.all(by.css('.name')).first();
    searchInput.clear();
  })
  it('should bind to input', function () {
    searchInput.sendKeys('sushi');
    expect(nameElem.getText()).toContain("Something's wrong");
  });
});