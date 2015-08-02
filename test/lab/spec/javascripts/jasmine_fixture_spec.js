describe ("JavaScript Application:", function(){ 
	describe ("When Jasmine Specs designed with ", function(){ 
		describe("HTML Fixture: ", function(){ 
			beforeEach(function() { 
				//jasmine.getFixtures().fixturesPath = '/';
			}); 

			describe("'loadFixtures' Method, ", function(){
				beforeEach(function(){
					loadFixtures('HTML_Fixture.html')
				})
				it("Load fixture from a file", function(){
          //expect($('<input type="checkbox" checked="checked"/>')).toBeChecked()
          //expect($('.myULClass')).toExist();
          //expect($('#my-fixture')).toExist();
				}); 
			});

			describe("'setFixtures' Method,", function(){
				beforeEach(function(){
					setFixtures('<div class="FixtureClass">Jasmine Cookbook</div>');
				});
				it("Receive	fixture	as a parameter",function(){
					expect($('.FixtureClass')).toExist();
				});
			});

		}); 
	}); 
});

