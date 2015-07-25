/**
 * Created by nghi on 18.7.2015.
 */
angular.module("appConstants",[])

.constant('clientConst', {
  CLIENT_ID:'GHRRJV4NQKK32TRCJ4Y4E01M3U3KFTCAE0ONRQMXH4LK1OFW',
  CLIENT_SECRET:'3ONADSWS2JOBXDD2XX2YCAZJQ3UUAI5YRMIETNT1WOOT04T0',
  CLIENT_VERSION:"20150408",
  ZERO_RESULT:{
    name:"No results found",
    distance:"",
    address:"Please type in another search terms"
  },
  ERROR:{
    name:"Something's wrong !!!",
    distance:"",
    address:"Please wait/refresh the page, make sure you've provided secret ID and select 'Share Location'"
  },
  UNIT:"m"
})