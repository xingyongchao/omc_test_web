'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get('/getTitleData/:billno/:tplid/:groupcode', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var _ctx$params, billno, tplid, groupcode, url, titleData;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //console.log('ctx------------------', ctx.request.body, '------------------ctx');
              _ctx$params = ctx.params, billno = _ctx$params.billno, tplid = _ctx$params.tplid, groupcode = _ctx$params.groupcode;

              if (tplid === '0') tplid = '';
              url = _env2.default.HTTP_USER_FETCH_BILLMETA;

              url += '?billno=' + billno + '&groupcode=' + groupcode + '&tplid=' + tplid + '&token=' + ctx.request.query.token;
              //console.log('url', url);
              _context.next = 6;
              return common.doFetch(url);

            case 6:
              titleData = _context.sent;

              ctx.body = titleData;
              //console.log("titledata", titleData);

            case 8:
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

  //http://localhost:8080/billmeta/updateBillitems.do?token=48c817c48cc9414f9142fc36679f64d3
  router.post('/setTitleData', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
      var url, postheaders, postOption, titleData;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = _env2.default.HTTP_USER_POST_BILLMETA;

              url += '?token=' + ctx.request.query.token;
              //console.log('ctx------------------', url, ctx.request.body, '------------------ctx');
              postheaders = new Headers();

              postheaders.append("Accept", "application/json");
              postheaders.append("Content-Type", "application/json");
              postOption = {
                method: 'POST',
                headers: postheaders,
                body: JSON.stringify(ctx.request.body)
              };
              _context2.next = 8;
              return common.doFetch(url, postOption);

            case 8:
              titleData = _context2.sent;

              ctx.body = titleData;

            case 10:
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

  return router;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _common = require('../../yxyweb/server/controllers/common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ** 2016-11-15 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 修改getTitleData参数和url
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ** 2016-11-10 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 修改setTitleData，添加POST请求
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ** Created by wxk on 2016/8/22.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */