'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoginUser = undefined;

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../yxyweb/common/helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getLoginUser = exports.getLoginUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var url, config, json, loginUser, option;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'user/getOrgsAndStores?token=' + ctx.token);
            config = {
              url: url,
              method: 'GET'
            };
            _context.next = 4;
            return (0, _util.uniformProxy)(config);

          case 4:
            json = _context.sent;

            if (!(json.code !== 200)) {
              _context.next = 8;
              break;
            }

            ctx.logger.error('\u83B7\u53D6\u767B\u5F55\u7528\u6237\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
            return _context.abrupt('return');

          case 8:
            loginUser = json.data;

            url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'tenant/find?token=' + ctx.token);
            config = {
              url: url,
              method: 'GET'
            };
            _context.next = 13;
            return (0, _util.uniformProxy)(config);

          case 13:
            json = _context.sent;

            if (!(json.code !== 200)) {
              _context.next = 17;
              break;
            }

            ctx.logger.error('\u83B7\u53D6\u79DF\u6237\u4FE1\u606F\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
            return _context.abrupt('return');

          case 17:
            loginUser.logo = json.data.logo;
            loginUser.tenant = json.data;
            // url = combine(env.HTTP_SERVICE_BASEURL, `option/getOptionData?token=${ctx.token}`);
            // config = {
            //   url,
            //   method: 'POST',
            //   params: {
            //     optionId: 'sys_option'
            //   }
            // };
            // json = await uniformProxy(config);
            // const option = {};
            // if (json.code !== 200) {
            //   ctx.logger.error(`获取系统参数失败：【接口】${url} 【异常】${json.message}`);
            // } else {
            //   Object.assign(option, json.data);
            // }
            // url = combine(env.HTTP_SERVICE_BASEURL, `option/getOptionData?token=${ctx.token}`);
            // config = {
            //   url,
            //   method: 'POST',
            //   params: {
            //     optionId: 'business_option'
            //   }
            // };
            // json = await uniformProxy(config);
            // if (json.code !== 200) {
            //   ctx.logger.error(`获取业务参数失败：【接口】${url} 【异常】${json.message}`);
            // } else {
            //   Object.assign(option, json.data);
            // }
            // loginUser.option = option;
            url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'option/getOptionsByParams?token=' + ctx.token);
            config = {
              url: url,
              method: 'POST',
              params: {}
            };
            _context.next = 23;
            return (0, _util.uniformProxy)(config);

          case 23:
            json = _context.sent;
            option = {};

            if (json.code !== 200) {
              ctx.logger.error('\u83B7\u53D6\u53C2\u6570\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
            } else {
              json.data && json.data.forEach(function (item) {
                var name = item.name,
                    value = item.value;

                option[name] = value;
              });
            }
            loginUser.option = option;
            return _context.abrupt('return', loginUser);

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getLoginUser(_x) {
    return _ref.apply(this, arguments);
  };
}();