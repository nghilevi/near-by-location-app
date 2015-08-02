/**
 * Created by nghi on 18.7.2015.
 */
describe('Given the user opens the index page', function () {
  var searchInput,nameElem,validSearchWords="sushi",invalidSearchWords="!@#$%^&*()";
  // TODO do research about http-backend-proxy

  beforeEach(function () {
    browser.get('/index-main.html');
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
      //browser.executeScript("navigator.geolocation.getCurrentPosition = function(success) { success({coords: {latitude: 50.455755, longitude: 30.511565}}); }");
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