/**
 * Created by nghi on 27.7.2015.
 */
describe('Interceptors', function () {
  var clientConst,fSClientParamsInjector,query="sushi",config;

  beforeEach(function () {

    module('nearByLocationApp')

    inject(function (_clientConst_,_fSClientParamsInjector_) {
      clientConst=_clientConst_,
      config = {
        url: clientConst.API_URL,
        method: "GET",
        params: {
          query:query,
          ll:"1,1"
        }
      },
      fSClientParamsInjector=_fSClientParamsInjector_;

    })
  })

  describe('fSClientParamsInjector', function () {
    it('should return a config obj with client id', function () {
      var returnedConfig=fSClientParamsInjector.request(config)
      expect(returnedConfig.params.client_id).toEqual(clientConst.CLIENT_ID)
    });
    it('should return a original request config obj if url, client id or client secret is missing', function () {
      var originalConfig = config;
      config.url=""
      var returnedConfig=fSClientParamsInjector.request(config)
      expect(returnedConfig).toEqual(config)

      config=originalConfig;
      clientConst.CLIENT_ID = ""
      var returnedConfig=fSClientParamsInjector.request(config)
      expect(returnedConfig).toEqual(config)
    });
  });


});