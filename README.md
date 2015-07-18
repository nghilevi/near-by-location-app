## About
NearByLocation Web app using Foursquare API v2. 
Here is the [Demo](http://www.codingisloving.com/WEBAPPS/nearbylocationwebapp/index.html#/) version

## Usage
Below are some of the instructions on runing the web app locally (recommended as it always has the latest updates and the user can run tests)

* Run `bower install` and `npm install` to install bower and node dependencies 
* Remember to enter your `secretID` inside `src/scripts/constants.js`
* Open the `index.html` on a web (local) server to run the app. It's important to note that it has to be run on a web server. 
* Optionally, remember to click on "Share location" so that the browser can detect your location.
* Run `karma start` to run the tests. 

## Description
As can be seen in package.json and bower.json, the develop stacks includes: 
Dependencies for frontend development:
`
    "angular": "~1.4.3",
    "angularjs-geolocation": "~0.1.1",
    "jquery": "~2.1.4",
    "angular-route": "~1.4.3",
    "angular-animate": "~1.4.3",
    "bootstrap": "~3.3.5"
`
Dependencies for unit & E2E testing:
`
    "angular-mocks": "~1.4.3"
`
The project is also employed Travis for Continous Intergration and Grunt for automated buid tool system.

More detail explanations are provided in the screencast.