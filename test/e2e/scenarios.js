/**
 * Created by nghi on 18.7.2015.
 */
describe('Given the user opens the index page', function () {
  var searchInput,nameElem,validSearchWords="sushi",invalidSearchWords="!@#$%^&*()";
  beforeEach(function () {
    browser.get('');
    searchInput = element(by.model('searchWords'));
    nameElem=element.all(by.css('.name')).first();
  })
  afterEach(function () {
    searchInput.clear();
  })
  xdescribe("When the user don't share location", function () {
    it('Then there will be an error message no matter what the user types', function () {
      searchInput.sendKeys(validSearchWords);
      expect(nameElem.getText()).toContain("wrong");
    });
  })
  describe("When the user shares location", function () {
    beforeEach(function () {
      //element(by.buttonText("Share Location")).click();
    })
    describe("And the user types in a valid search words", function () {
      it('Then there will be results', function () {
        searchInput.sendKeys(validSearchWords);
        expect(nameElem.getText()).toContain(validSearchWords);
      });
    })
    describe("And the user type in an invalid search words", function () {
      it('Then there will be no result', function () {
        searchInput.sendKeys(invalidSearchWords);
        expect(nameElem.getText()).toContain("No");
      });
    })
  })
});