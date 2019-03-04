'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var start, req, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              start = new Date();
              req = ctx.req, res = ctx.res;

              res.on('finish', function () {
                res.responseTime = new Date() - start;
                connectLogger(logger, req, res);
              });
              ctx.logger = logger;
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
  }();
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var defaultConfig = require('./defaultConfig');
var connectLogger = require('./connect-logger');

_fs2.default.existsSync(_env2.default.PORTAL_LOG_DIR) || _fs2.default.mkdirSync(_env2.default.PORTAL_LOG_DIR);

_log4js2.default.configure(defaultConfig);

var logger = _log4js2.default.getLogger('uretail');
logger.setLevel('INFO');