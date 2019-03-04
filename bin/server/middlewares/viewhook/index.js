'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = viewhook;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _jsBeautify = require('js-beautify');

var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

var _html = require('./html');

var _html2 = _interopRequireDefault(_html);

var _Isomorph = require('../../../common/helpers/Isomorph');

var _Isomorph2 = _interopRequireDefault(_Isomorph);

var _routes = require('../../../common/redux/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var routesMap = {
  index: _routes.Router
};

var rebuildPaths = ['/', '/portal', '/register', '/wechat', '/forget', '/expire'];

var directNext = function directNext(ctx) {
  if (rebuildPaths.indexOf(ctx.path) > -1 || ctx.path.startsWith('/login') || ctx.path.startsWith('/billing') || ctx.path.startsWith('/meta') || ctx.path.startsWith('/platform') || ctx.path.startsWith('/echartcarousel')) return false;
  return true;
};

function viewhook() {
  var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { beautify: true, internals: true };

  var options = Object.assign({}, _options);

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var isTouch, interMode;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!directNext(ctx)) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return next();

            case 3:
              return _context.abrupt('return');

            case 4:
              debugger;
              isTouch = ctx.header['user-agent'].match(/(Android);?[\s\/]+([\d.]+)?/) || ctx.header['user-agent'].match(/(Electron);?[\s\/]+([\d.]+)?/) || ctx.path === '/billing/touch' || ctx.path === '/login/touch' || ctx.path === '/billing/second';
              interMode = ctx.cookies.get('interMode');

              if (interMode) {
                if (isTouch && ctx.path === '/login') {
                  isTouch = true;
                  ctx.cookies.set('interMode', '', {
                    path: '/',
                    expires: new Date(Date.now() - 1),
                    httpOnly: true
                  });
                } else {
                  isTouch = interMode === 'pc' ? false : true;
                }
              }
              if (ctx.path === '/billing/self' || ctx.path === '/login/self') ctx.entryPoint = 'self';else if (isTouch) ctx.entryPoint = 'touch';else if (ctx.path === '/billing') ctx.entryPoint = 'billing';else ctx.entryPoint = 'index';
              ctx.store = _Isomorph2.default.createStore(ctx.entryPoint);
              ctx.history = _Isomorph2.default.createHistory(ctx.store, ctx.path);
              ctx.render = function (pageInfo) {
                var internals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.internals || true;

                var render = internals ? _server2.default.renderToString : _server2.default.renderToStaticMarkup;

                var RouterCom = routesMap[ctx.entryPoint];
                var markup = render(_react2.default.createElement(
                  _Isomorph2.default,
                  { store: ctx.store },
                  _react2.default.createElement(RouterCom, { history: ctx.history })
                ));

                if (options.beautify) {
                  markup = _jsBeautify2.default.html(markup);
                }

                ctx.type = 'html';
                ctx.body = (0, _html2.default)(Object.assign({ entryPoint: ctx.entryPoint }, pageInfo), markup, ctx.store.getState());
              };

              _context.next = 14;
              return next();

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}