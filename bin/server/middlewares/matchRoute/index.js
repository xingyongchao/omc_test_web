'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _reactRouter.match)({
                routes: routesMap[ctx.entryPoint],
                location: ctx.req.url
              }, function (error, redirectLocation, renderProps) {
                if (redirectLocation) {
                  ctx.res.redirect(redirectLocation.pathname + redirectLocation.search);
                } else if (error) {
                  console.error('ROUTER ERROR:', error);
                  ctx.res.status(500);
                  ctx.body = '500';
                } else if (renderProps) {
                  // 交给后端 controller 处理

                } else {
                  ctx.body = "404";
                }
              });

              _context.next = 3;
              return next();

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

var _reactRouter = require('react-router');

var _routes = require('../../../common/redux/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var routesMap = {
  index: _routes2.default
};

;