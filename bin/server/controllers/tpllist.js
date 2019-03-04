'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.post('/tpllist', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var postData, billno, mode, url, results, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postData = ctx.request.body;
              billno = postData.billNo;
              mode = postData.mode || 0;
              url = _env2.default.HTTP_USER_FETCH_TPLLIST + '?billno=' + billno + '&mode=' + mode + '&token=' + ctx.request.query.token;
              _context.next = 6;
              return common.doFetch(url);

            case 6:
              results = _context.sent;

              // console.log(results)
              json = {};

              if (!results || results.length == 0) {
                results = {
                  code: 500,
                  message: '没有查询到数据'
                };
              } else {
                if (results.code != 200) {
                  json = results;
                } else {
                  json = results.data;
                }
              }
              ctx.body = results;

            case 10:
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
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _common = require('../../yxyweb/server/controllers/common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }