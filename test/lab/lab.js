/**
 * Created by nghi on 30.7.2015.
 */
  //Custom matcher: equality check for complex objects
var Person = function(name, surname) {
  this.name = name;
  this.surname = surname;
};

Person.prototype.render = function() {
  if (!this._cached) {
    this._cached = this.name + " " + this.surname;
  };
};

beforeEach(function () {
  jasmine.addCustomEqualityTester(function (actual,expected) {
    var toPrimitive = function (o) {
      if(o == null){return o;}
      if(o instanceof Array){
        var result = []
        o.forEach(function (i) {
          result.push(toPrimitive(i));
        });
        return result;
      }
      return o.toPrimitive ? o.toPrimitive() : o;
    }

    var actualPrimitive = toPrimitive(actual),
        expectedPrimitive = toPrimitive(expected);
    return jasmine.matchersUtil.equals(actualPrimitive, expectedPrimitive);
  })
})

Person.prototype.toPrimitive = function() {
  return { name: this.name, surname: this.surname };
};

xdescribe('Person', function() {
  var p1, p2;
  beforeEach(function() {
    p1 = new Person('Indiana', 'Jones');
    p2 = new Person('Indiana', 'Jones');
  });

  it('they are equal', function() {
    p1.render(); //that's why its different
    expect(p1).toEqual(p2);
  });
});

// ---------------------------------------------------------- //
var	Person	=	function	(age,	firstName,	lastName)	{
  this.age=age;
  this.firstName	=	firstName;
  this.lastName	=	lastName;
};
xdescribe("<XYZ>	Company:	Online	Order	Module",	function()	{
  describe("When	to	place	the	online	order:	",	function(){
    beforeEach(function()	{
      jasmine.addMatchers(personAgeValidationMatcher);
    });
    it("Age	should	be	greater	than or	equal	to	21	years",	function()	{
      var	myPerson	=	new	Person(25,	"James",	"Smith");
      //expect(myPerson.age).toBeOlderThan(20);
    });
  });
});