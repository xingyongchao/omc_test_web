'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.post('/meta', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _meta.getMeta)(ctx);

            case 2:
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
  router.get('/meta/:menuId', function (ctx) {
    if (ctx.entryPoint === 'touch') {
      ctx.redirect('/billing');
      return;
    }
    ctx.render({
      title: ctx.params.menuId
    });
  });
  router.get('/platform/:menuurl', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _common.getLoginUser)(ctx);

            case 2:
              user = _context2.sent;

              if (user) {
                _context2.next = 6;
                break;
              }

              ctx.redirect('/login');
              return _context2.abrupt('return');

            case 6:
              ctx.store.dispatch({
                type: 'PLATFORM_UI_USER_INIT',
                payload: user
              });
              ctx.render({ title: ctx.params.menuurl });

            case 8:
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
  router.get('/meta/:billtype/:billno', function (ctx) {
    if (ctx.entryPoint === 'touch') {
      ctx.redirect('/billing');
      return;
    }
    ctx.render({
      title: ctx.params.billno
    });
  });
  router.get('/meta/:billtype/:billno/:billid', function (ctx) {
    if (ctx.entryPoint === 'touch') {
      ctx.redirect('/billing');
      return;
    }
    ctx.render({
      title: ctx.params.billno
    });
  });

  router.get('/echartcarousel', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
      var user;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _common.getLoginUser)(ctx);

            case 2:
              user = _context3.sent;

              if (user) {
                _context3.next = 6;
                break;
              }

              ctx.redirect('/login');
              return _context3.abrupt('return');

            case 6:
              ctx.store.dispatch({
                type: 'PLATFORM_UI_USER_INIT',
                payload: user
              });
              ctx.render({
                title: "大屏看板"
              });

            case 8:
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
};

var _common = require('./common');

var _meta = require('../../yxyweb/server/controllers/meta');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 入口
 */