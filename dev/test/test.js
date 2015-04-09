describe('',function(){
	var baseURL ="https://api.foursquare.com/v2/venues/search?client_id=CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ&client_secret=GYNP4URASNYRNRGXR5UEN2TGTKJHXY5FGSAXTIHXEUG1GYM2&v=20130815&ll=60.2217828,24.7787542&query=";
	
	beforeEach(function(){
		inject(function(_$http_){
			$http=_$http_;
		});
	});

	it('should return results',function(done){
	    $http({
	        method: 'get',
	        url: baseURL + 'oulu'
	    }).then(function (success) {
	    	assert(success.data.response.venues.length > 0, 'receive more than 0 result');
	        done(); // stop test from waiting
	    }, function (fail) {
	        console.log('Something wrong: ' + fail);
	        done(); // stop test from waiting
	    });
	});

	it('should return 0 result',function(done){
	    $http({
	        method: 'get',
	        url: baseURL + '!@#$%^&*'
	    }).then(function (success) {
	        assert.equal(0, success.data.response.venues.length);
	        done();
	    }, function (fail) {
	        console.log('Something wrong: ' + fail);
	        done();
	    });
	});

	it('should return 0 result',function(done){
	    $http({
	        method: 'get',
	        url: baseURL + ''
	    }).then(function (success) {
	    	assert.equal(30, success.data.response.venues.length);
	        done();
	    }, function (fail) {
	        console.log('Something wrong: ' + fail);
	        done();
	    });
	});

});


