/**
 * Created by nghi on 18.7.2015.
 */
angular.module("appConstants",[])

.constant('clientConst', {
  CLIENT_ID:'CYEMKOM4OLTP5PHMOFVUJJAMWT5CH5G1JBCYREATW21XLLSZ',
  CLIENT_SECRET:'GYNP4URASNYRNRGXR5UEN2TGTKJHXY5FGSAXTIHXEUG1GYM2',
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