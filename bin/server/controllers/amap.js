'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get('/geocoder', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var req, res, path, address, url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = ctx.req, res = ctx.res, path = ctx.path;
              address = ctx.request.query.address;
              url = 'http://restapi.amap.com/v3/geocode/geo?key=ede8f8d4850bea0a28322f5537730107&s=rsv3&address=' + encodeURIComponent(address);
              // url += '?billno='+ctx.params.billno+'&groupcode='+ctx.params.groupcode+'&tplid='+ctx.params.tplid+'&token='+ctx.request.query.token;
              //console.log('url', url);
              // ctx.body = await req.pipe(request(url))

              _context.next = 5;
              return doFetch(url);

            case 5:
              ctx.body = _context.sent;

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()

  // let titleData = await common.doFetch(url);
  // debugger
  // ctx.body = titleData;
  //console.log("titledata", titleData);
  );
  router.get('/geoaddress', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
      var req, res, path, location, url;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = ctx.req, res = ctx.res, path = ctx.path;
              location = ctx.request.query.location;
              url = 'http://restapi.amap.com/v3/geocode/regeo?key=ede8f8d4850bea0a28322f5537730107&s=rsv3&location=' + encodeURIComponent(location);
              // url += '?billno='+ctx.params.billno+'&groupcode='+ctx.params.groupcode+'&tplid='+ctx.params.tplid+'&token='+ctx.request.query.token;
              //console.log('url', url);
              // ctx.body = await req.pipe(request(url))

              _context2.next = 5;
              return doFetch(url);

            case 5:
              ctx.body = _context2.sent;

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()

  // let titleData = await common.doFetch(url);
  // debugger
  // ctx.body = titleData;
  //console.log("titledata", titleData);
  );
  router.get('/uniform/getWeather', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
      var serviceUrl;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              //http://api.map.baidu.com/telematics/v3/weather?location=北京市&output=json&ak=Xc0b88CMj1YgLa1rTLvLungBPKmIaoMo
              serviceUrl = 'http://api.map.baidu.com/telematics/v3/weather' + ctx.req.url.substr(19);
              _context3.next = 3;
              return doFetch(serviceUrl);

            case 3:
              ctx.body = _context3.sent;

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  router.get('/uniform/getMap', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
      var str, serviceUrl;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:

              console.log(" ctx.req.url =" + ctx.req.url);
              str = ctx.req.url;

              str = str.substr(str.indexOf("subUrl=") + 7);
              serviceUrl = 'http://yxy-lsy.oss-cn-beijing.aliyuncs.com/echartmap/json/' + str;

              console.log("  serviceUrl = " + serviceUrl);

              _context4.next = 7;
              return doFetch(serviceUrl);

            case 7:
              ctx.body = _context4.sent;

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());

  router.get('/uniform/getLocalCity', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
      var serviceUrl;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // const serviceUrl = 'http://api.map.baidu.com/location/ip?output=json&ak=Da2GUB3raZGa2XnLnmYT1KUwvaT9FYPw&coor=bd09ll';
              serviceUrl = 'http://api.map.baidu.com/location/ip' + ctx.req.url.substr(21);
              _context5.next = 3;
              return doFetch(serviceUrl);

            case 3:
              ctx.body = _context5.sent;

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  router.get('/uniform/getLogistics', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
      var serviceUrl;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              serviceUrl = 'http://express.yonyouup.com/api/trace' + ctx.req.url.substr(21);
              _context6.next = 3;
              return doFetch(serviceUrl);

            case 3:
              ctx.body = _context6.sent;

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());
};

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _common = require('./common');

var common = _interopRequireWildcard(_common);

var _util = require('../../yxyweb/common/helpers/util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import request from 'request'


var doFetch = function doFetch(url) {
  var options = (0, _util.genFetchOptions)('get');
  return fetch(url, options).then(_util.toJSON, _util.catchException).then(function (json) {
    return {
      code: 200,
      data: json
    };
  });
};