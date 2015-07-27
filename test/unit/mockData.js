/**
 * Created by nghi on 27.7.2015.
 */
jasmine.mockData = (typeof jasmine.mockData === 'undefined') ? {} : jasmine.mockData;

jasmine.mockData.mockResponseData = function() {
  return {
    response:{
      venues:[
        {
          location:{lat:1,lng:1,distance:100,address:"finland",city:"oulu"},
          name:"a",
          someOtherProp:"someOtherProp"
        },
        {
          location:{lat:1,lng:3,distance:300,address:"finland",city:"oulu"},
          name:"b",
          someOtherProp:"someOtherProp2"
        }
      ]
    }
  };
};

jasmine.mockData.emptyDataResponse = function() {
  return {
    response:{
      venues:[]
    }
  }
}

jasmine.mockData.userCoords = function() {
  return {
    coords:{
      latitude:'1',
      longitude:'2'
    }
  }
}
