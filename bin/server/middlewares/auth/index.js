'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (routes) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var path, cookies, request, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, yxyToken, url, config, json, _token, token, redirectLogin;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              path = ctx.path, cookies = ctx.cookies, request = ctx.request;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 4;
              _iterator = _env2.default.AUTH_WHITELIST[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 22;
                break;
              }

              item = _step.value;

              if (!(item instanceof RegExp)) {
                _context.next = 15;
                break;
              }

              if (!item.test(path)) {
                _context.next = 13;
                break;
              }

              _context.next = 12;
              return next();

            case 12:
              return _context.abrupt('return', _context.sent);

            case 13:
              _context.next = 19;
              break;

            case 15:
              if (!(item === path)) {
                _context.next = 19;
                break;
              }

              _context.next = 18;
              return next();

            case 18:
              return _context.abrupt('return', _context.sent);

            case 19:
              _iteratorNormalCompletion = true;
              _context.next = 6;
              break;

            case 22:
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 31:
              _context.prev = 31;

              if (!_didIteratorError) {
                _context.next = 34;
                break;
              }

              throw _iteratorError;

            case 34:
              return _context.finish(31);

            case 35:
              return _context.finish(28);

            case 36:
              yxyToken = request.query.yxyToken;

              if (!yxyToken) {
                _context.next = 55;
                break;
              }

              url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'user/loginByYxyToken?yxyToken=' + yxyToken);
              config = {
                url: url,
                method: 'GET'
              };
              _context.next = 42;
              return (0, _util.uniformProxy)(config);

            case 42:
              json = _context.sent;

              if (!(json.code === 200)) {
                _context.next = 52;
                break;
              }

              _token = json.data.token;

              cookies.set('token', _token, {
                path: '/',
                expires: new Date(Date.now() + 24 * 3600 * 1000),
                httpOnly: false
              });
              ctx.token = _token;
              _context.next = 49;
              return next();

            case 49:
              return _context.abrupt('return', _context.sent);

            case 52:
              ctx.logger.error('\u6839\u636EyxyToken\u83B7\u53D6token\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
              ctx.body = json;
              return _context.abrupt('return');

            case 55:
              token = cookies.get('token');

              redirectLogin = function redirectLogin(ctx) {
                if (ctx.is(_env2.default.HTTP_CONTENT_TYPE.JSON)) {
                  ctx.body = {
                    code: 900
                  };
                } else {
                  ctx.redirect('/login');
                }
              };

              if (!token) {
                _context.next = 70;
                break;
              }

              // token的有效性在页面controller校验
              ctx.token = token;
              _context.prev = 59;
              _context.next = 62;
              return next();

            case 62:
              return _context.abrupt('return', _context.sent);

            case 65:
              _context.prev = 65;
              _context.t1 = _context['catch'](59);

              ctx.logger.error('KOA2\uFF1Acontroller\u7A0B\u5E8F\u5185\u90E8\u9519\u8BEF\uFF08' + _context.t1 + '\uFF09');

            case 68:
              _context.next = 77;
              break;

            case 70:
              if (!request.query.token) {
                _context.next = 76;
                break;
              }

              _context.next = 73;
              return next();

            case 73:
              return _context.abrupt('return', _context.sent);

            case 76:
              redirectLogin(ctx);

            case 77:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 24, 28, 36], [29,, 31, 35], [59, 65]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../../yxyweb/common/helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

;