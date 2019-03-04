'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  var FILE_ROUTE = '/upload';
  var FILE_ROUTE1 = '/upload2Local';
  router.post(FILE_ROUTE, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var req, res, path, serviceUrl;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = ctx.req, res = ctx.res, path = ctx.path;
              serviceUrl = _env2.default.HTTP_USER_UPLOAD + ctx.req.url.substr(FILE_ROUTE.length);
              _context.next = 4;
              return req.pipe((0, _request2.default)(serviceUrl));

            case 4:
              ctx.body = _context.sent;
              return _context.abrupt('return');

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
  }());
  router.post('/upload2Local', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
      var req, res, path, serviceUrl;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = ctx.req, res = ctx.res, path = ctx.path;
              serviceUrl = _env2.default.HTTP_USER_UPLOAD2LOCAL + ctx.req.url.substr(FILE_ROUTE1.length);
              _context2.next = 4;
              return req.pipe((0, _request2.default)(serviceUrl));

            case 4:
              ctx.body = _context2.sent;
              return _context2.abrupt('return');

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
  }());

  router.get('/register/validcode', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              ctx.logger.info('\u53C2\u6570\uFF1A' + _env2.default.HTTP_USER_VALIDCODE);
              _context3.next = 3;
              return ctx.req.pipe((0, _request2.default)((0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, ctx.url)));

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

  router.post('/*bill/billImport', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
      var req, serviceUrl;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = ctx.req;
              serviceUrl = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, req.url);

              ctx.type = _env2.default.HTTP_CONTENT_TYPE.JSON;
              _context4.next = 5;
              return req.pipe((0, _request2.default)(serviceUrl));

            case 5:
              ctx.body = _context4.sent;

            case 6:
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

  router.all('/print/*', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
      var req, serviceUrl;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = ctx.req;
              serviceUrl = (0, _util.combine)(_env2.default.HTTP_PRINT_SERVER, req.url);

              ctx.type = 'html';
              _context5.next = 5;
              return req.pipe((0, _request2.default)(serviceUrl));

            case 5:
              ctx.body = _context5.sent;

            case 6:
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

  var UNIFORM_ROUTE = '/uniformdata/*';

  router.all(UNIFORM_ROUTE, function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
      var req, serviceUrl;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = ctx.req;
              serviceUrl = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, req.url.substr(UNIFORM_ROUTE.length - 1));

              ctx.type = _env2.default.HTTP_CONTENT_TYPE.JSON;
              _context6.next = 5;
              return req.pipe((0, _request2.default)(serviceUrl));

            case 5:
              ctx.body = _context6.sent;

            case 6:
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../yxyweb/common/helpers/util');

var _common = require('./common');

var common = _interopRequireWildcard(_common);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }