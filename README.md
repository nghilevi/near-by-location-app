## About
NearByLocation Web app using Foursquare API v2. 
Here is the [Online Demo](http://www.codingisloving.com/WEBAPPS/nearbylocationwebapp/index.html#/) version

## Usage
Below are some of the instructions on runing the web app locally (recommended as it always has the latest updates and the user can run tests)

* Run `bower install` and `npm install` to install bower and node dependencies 
* Remember to enter your `secretID` inside `src/scripts/constants.js`
* Open the `index.html` on a web (local) server to run the app. It's important to note that it has to be run on a web server. 
* Optionally, remember to click on "Share location" so that the browser can detect your location.
* Run `karma start` or `grunt test` to run the tests.
* karma.conf.js stores the karma config. Currently it uses PhantomJS, a headless browser, to run unit test. You can configure it to be `Firefox` or `Chrome` to your preference in the `browsers` property. If you choose `Chrome`, you have also install chrome launcher for karma by issuing `npm install karma-chrome-launcher`

## Description
This is a simple web application but contains a lot of interesting things to learn. If you compare the current version with the [first implementation](https://github.com/vinhnghi223/nLocationApp/tree/828b168154d3e21b8385b74471b95ae79a4a8055) that I developed back on mid May 2015, you will see a lot of differences. The first version is functional but very simple and contains bad practices. The current version however is developed with scalibility and testing in mind.

As can be seen in package.json and bower.json, the develop stacks includes: 

Dependencies for frontend development:
`angularjs, angular-route, angularjs-geolocation, angular-animate, jquery, bootstrap`

Dependencies for unit & E2E testing:
`angular-mocks, protractor, karma, jasmine, phantomjs, karma-coverage (istanbul)`

The project also employes `Travis` for CI and `Grunt` for automated buid tool system.

More information is provided in the screencast.