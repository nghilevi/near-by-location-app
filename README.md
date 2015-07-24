## About
NearByLocation Web app using Foursquare API v2.
This is a small sized web application which can be fit inside a larger app. The app is developed with scalibility and testability in mind.

* [Online Demo](http://vinhnghi223.github.io/nLocationApp/dist/index.html#/)

* [Test coverage](http://vinhnghi223.github.io/nLocationApp/coverage/PhantomJS%201.9.8%20\(Linux%200.0.0\)/index.html)

## Usage
Below are some of the instructions on runing the web app locally (recommended as it always has the latest updates and the user can run tests)

* Run `bower install` and `npm install` to install bower and node dependencies 
* Remember to enter your `secretID` inside `src/scripts/constants.js`
* Open the `index-main.html` on a web (local) server to run the app.
* Optionally, remember to click on "Share location" so that the browser can detect your location.
* Run `karma start` or `grunt test` to run the tests.
* karma.conf.js stores the karma config. Currently it uses PhantomJS, a headless browser, to run unit test. You can configure it to be `Firefox` or `Chrome` to your preference in the `browsers` property. If you choose `Chrome`, you have to also install chrome launcher for karma by issuing `npm install karma-chrome-launcher`

## Main Dependencies

As can be seen in package.json and bower.json, the develop stacks includes: 

* Dependencies for frontend development:
`angularjs, angular-route, angularjs-geolocation, angular-animate, jquery, bootstrap`
* Dependencies for unit & E2E testing:
`angular-mocks, protractor, karma, jasmine, phantomjs, karma-coverage (istanbul)`
* The project also employes `Travis` for CI and `Grunt` for automated buid tool system.
