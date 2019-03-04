'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (winstonInstance) {
  if (!winstonInstance) {
    winstonInstance = new _winston2.default.Logger({
      transports: [new _winston2.default.transports.Console({
        level: _env2.default.PORTAL_LOG_LEVEL
      }), new _winston2.default.transports.File({
        name: 'info-file',
        filename: _path2.default.join(_env2.default.PORTAL_LOG_DIR, _env2.default.PORTAL_LOG_LEVEL + '.log'),
        level: _env2.default.PORTAL_LOG_LEVEL
      })]
    });
  }
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx.logger = winstonInstance;
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

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (!_fs2.default.existsSync(_env2.default.PORTAL_LOG_DIR)) {
  _fs2.default.mkdir(_env2.default.PORTAL_LOG_DIR);
}