describe('',function(){
	var CLIENT_ID='CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
   	CLIENT_SECRET='Enter your secret here',
   	CLIENT_VERSION="20150408",
   	currentLat=60,
   	currentLon=25,
   	baseURL ="https://api.foursquare.com/v2/venues/search"+
          "?client_id="+CLIENT_ID+
          "&client_secret="+CLIENT_SECRET+
          "&v="+CLIENT_VERSION+
          "&ll="+currentLat+
          ","+currentLon+
          "&query="; 

	beforeEach(function(){
		inject(function(_$http_){
			$http=_$http_;
		});
	});

	var test = function(done,searchWord,assertFunction){
	    $http({
	        method: 'get',
	        url: baseURL + searchWord
	    }).then(function (success) {
	    	assertFunction(success);
	        done(); // stop test from waiting
	    }, function (fail) {
	        console.log('Something wrong: ',fail);
	        done(); // stop test from waiting
	    });
	}


	it('should return results',function(done){
		var assertFunction = function(success){
			assert(success.data.response.venues.length > 0, 'receive more than 0 result');
		}
		test(done,'oulu',assertFunction);
	});


	it('should return 0 result',function(done){
		var assertFunction = function(success){
			assert.equal(0, success.data.response.venues.length);
		}		
		test(done,'!@#$%^&*',assertFunction);
		test(done,'',assertFunction);
		test(done,null,assertFunction);
	});

});


