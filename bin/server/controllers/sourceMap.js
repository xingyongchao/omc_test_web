'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get('/sourcemap/:name/:pwd', function (ctx) {
    var _ctx$params = ctx.params,
        name = _ctx$params.name,
        pwd = _ctx$params.pwd;

    if (user[name] !== pwd) {
      ctx.cookies.set('sourceMapToken', '', {
        path: '/',
        expires: new Date(Date.now() - 1),
        httpOnly: true
      });
      ctx.body = { code: 999, message: '调试用户校验失败' };
    } else {
      var token = (0, _uuid2.default)();
      tokens.push(token);
      ctx.cookies.set('sourceMapToken', token, {
        path: '/',
        expires: new Date(Date.now() + 24 * 3600 * 1000),
        httpOnly: true
      });
      ctx.body = { code: 200, message: '调试用户校验成功' };
    }
  });

  router.get('/scripts/*.min.js.map', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = ctx.cookies.get('sourceMapToken');

              if (!(tokens.indexOf(token) === -1)) {
                _context.next = 4;
                break;
              }

              ctx.throw(400, '调试用户校验失败');
              return _context.abrupt('return');

            case 4:
              _context.next = 6;
              return next();

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var user = { fangqg: '123456' };
var tokens = [];