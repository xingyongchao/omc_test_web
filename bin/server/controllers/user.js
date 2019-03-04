'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.post('/user/registercorp', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var inform, options, userInform, accInform;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              inform = ctx.request.body;
              options = void 0;

              if (!(ctx.request.query.type != "enable")) {
                _context.next = 16;
                break;
              }

              userInform = { user: {}, corp: {}, mobileFlag: true };


              userInform.user.username = inform.user;
              userInform.user.password = inform.pwd;
              userInform.user.email = inform.email;
              userInform.user.mobile = inform.mobile;
              userInform.user.fullname = inform.fullname ? inform.fullname : inform.user;

              userInform.corp.name = inform.corpname;
              userInform.corp.alias = inform.corpalias;

              options = (0, _util.genFetchOptions)('post', userInform);

              _context.next = 14;
              return fetch(_env2.default.HTTP_USER_REG_CORP, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }
                return { code: 500 };
              }, _util.catchException).then(function (json) {
                ctx.body = json;
              });

            case 14:
              _context.next = 20;
              break;

            case 16:
              accInform = { alias: inform.corpalias };

              options = (0, _util.genFetchOptions)('post', accInform);
              _context.next = 20;
              return fetch(_env2.default.HTTP_USER_CREATE_ACC, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }
                return { code: 500 };
              }, _util.catchException).then(function (json) {
                ctx.body = json;
              });

            case 20:
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

  router.post('/user/login', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
      var requestUrl, requestData, options, now;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              requestUrl = _env2.default.HTTP_USER_AUTHENTICATION;
              requestData = ctx.request.body;

              ctx.logger.info('\u8BF7\u6C42\u5730\u5740\uFF1A' + requestUrl);
              ctx.logger.info('\u8BF7\u6C42\u53C2\u6570\uFF1A' + JSON.stringify(requestData));
              options = (0, _util.genFetchOptions)('post', requestData);
              now = Date.now();
              _context2.next = 8;
              return fetch(requestUrl, options).then(_util.toJSON, _util.catchException).then(function (json) {
                ctx.logger.info('\u8FD4\u56DE\u6570\u636E\uFF1A' + JSON.stringify(json));
                if (json.code === 200) {
                  var host = ctx.host.split(':')[0];
                  var expires = new Date(now + 24 * 3600 * 1000);

                  // ctx.cookies.set('user', encodeURIComponent(JSON.stringify(json.data)), {
                  ctx.cookies.set('token', json.data.token, {
                    // domain: host,
                    path: '/',
                    expires: expires,
                    httpOnly: false
                  });
                }
                ctx.body = json;
              });

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

  router.post('/user/authorize', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
      var requestUrl, requestData, options, now;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              requestUrl = _env2.default.HTTP_USER_AUTHENTICATION;
              requestData = ctx.request.body;

              ctx.logger.info('\u8BF7\u6C42\u5730\u5740\uFF1A' + requestUrl);
              ctx.logger.info('\u8BF7\u6C42\u53C2\u6570\uFF1A' + JSON.stringify(requestData));
              options = (0, _util.genFetchOptions)('post', requestData);
              now = Date.now();
              _context3.next = 8;
              return fetch(requestUrl, options).then(_util.toJSON, _util.catchException).then(function (json) {
                ctx.logger.info('\u8FD4\u56DE\u6570\u636E\uFF1A' + JSON.stringify(json));
                if (json.code === 200) {
                  var host = ctx.host.split(':')[0];
                  var expires = new Date(now + 24 * 3600 * 1000);

                  // ctx.cookies.set('user', encodeURIComponent(JSON.stringify(json.data)), {
                  // 过期商户不写入cookie
                  if (json.data.leftTime != -1) {
                    ctx.cookies.set('token', json.data.token, {
                      // domain: host,
                      path: '/',
                      expires: expires,
                      httpOnly: false
                    });
                  }
                }
                ctx.body = json;
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

  router.post('/user/getCorpAccounts', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
      var options;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log(ctx.request.body);
              console.log(_env2.default.HTTP_USER_COR_ACC);
              options = (0, _util.genFetchOptions)('post', ctx.request.body);
              _context4.next = 5;
              return fetch(_env2.default.HTTP_USER_COR_ACC, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }
                return {
                  code: 500
                };
              }, _util.catchException).then(function (json) {
                if (json.code === 200) {
                  /*const host = ctx.host.split(':')[0]
                   const expires = new Date(now + 24 * 3600 * 1000)
                    ctx.cookies.set('user', encodeURIComponent(JSON.stringify(json.data)), {
                   // domain: host,
                   path: '/',
                   expires,
                   httpOnly: false,
                   })*/
                }
                ctx.body = json;
              });

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());

  router.post('/user/getUserOrgs', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
      var options;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log(ctx.request.body);
              console.log(_env2.default.HTTP_USER_ORG);
              options = (0, _util.genFetchOptions)('post', ctx.request.body);
              _context5.next = 5;
              return fetch(_env2.default.HTTP_USER_ORG, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }
                return {
                  code: 500
                };
              }, _util.catchException).then(function (json) {
                if (json.code === 200) {}
                ctx.body = json;
              });

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  router.get('/weChat/callback', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
      var _ctx$request, query, querystring;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ctx$request = ctx.request, query = _ctx$request.query, querystring = _ctx$request.querystring;

              if (!query.debug) {
                _context6.next = 4;
                break;
              }

              ctx.redirect('http://fangqg.yonyouup.com/weChat/callbacktest?' + querystring);
              return _context6.abrupt('return');

            case 4:
              _context6.next = 6;
              return doWeChatCallback(ctx);

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());

  router.get('/weChat/callbacktest', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return doWeChatCallback(ctx);

            case 2:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());

  var doWeChatCallback = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx) {
      var url, config, json;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'weChat/callback?' + ctx.request.querystring);
              config = {
                url: url,
                method: 'GET'
              };
              _context8.next = 4;
              return (0, _util.uniformProxy)(config);

            case 4:
              json = _context8.sent;

              if (!(json.code === 200)) {
                _context8.next = 9;
                break;
              }

              setCookie(ctx, json.data.token);
              ctx.redirect('/portal');
              return _context8.abrupt('return');

            case 9:
              if (!(json.code === 902)) {
                _context8.next = 13;
                break;
              }

              ctx.cookies.set('weChatRandom', json.data, {
                path: '/',
                expires: new Date(Date.now() + 24 * 3600 * 1000),
                httpOnly: true
              });
              ctx.redirect('/wechat');
              return _context8.abrupt('return');

            case 13:
              ctx.logger.error('\u5FAE\u4FE1\u56DE\u8C03\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
              ctx.body = json;

            case 15:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function doWeChatCallback(_x8) {
      return _ref8.apply(this, arguments);
    };
  }();

  var setCookie = function setCookie(ctx, token) {
    ctx.cookies.set('token', token, {
      path: '/',
      expires: new Date(Date.now() + 24 * 3600 * 1000),
      httpOnly: false
    });
  };

  router.post('/weChat/bindExistUser', function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx) {
      var cookies, request, req, params, url, config, json;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              cookies = ctx.cookies, request = ctx.request, req = ctx.req;
              params = request.body;

              params.weChatRandom = cookies.get('weChatRandom');
              url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'weChat/bindExistUser');
              config = {
                url: url,
                method: 'POST',
                params: params,
                headers: {
                  'content-type': _env2.default.HTTP_CONTENT_TYPE.JSON,
                  origin: 'koa2 server',
                  cookie: req.headers.cookie
                }
              };
              _context9.next = 7;
              return (0, _util.uniformProxy)(config);

            case 7:
              json = _context9.sent;

              if (!(json.code === 200)) {
                _context9.next = 12;
                break;
              }

              setCookie(ctx, json.data.token);
              ctx.body = json;
              return _context9.abrupt('return');

            case 12:
              ctx.logger.error('\u5FAE\u4FE1\u56DE\u8C03\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
              ctx.body = json;

            case 14:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function (_x9) {
      return _ref9.apply(this, arguments);
    };
  }());

  router.get('/meta/voucherlist/aa_productlist', function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(ctx) {
      var query, url, config, json;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              query = ctx.request.query;
              url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'user/loginByYxyToken?yxyToken=' + query.yxyToken);
              config = {
                url: url,
                method: 'GET'
              };
              _context10.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context10.sent;

              if (json.code === 200) {
                setCookie(ctx, json.data.token);
                ctx.render({
                  title: '货品档案'
                });
              } else {
                ctx.logger.error('\u6839\u636EyxyToken\u83B7\u53D6token\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
                ctx.body = json;
              }

            case 7:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function (_x10) {
      return _ref10.apply(this, arguments);
    };
  }());

  router.get('/demoAccount/login', function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ctx) {
      var url, config, json;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, ctx.url);
              config = { url: url, method: 'GET' };
              _context11.next = 4;
              return (0, _util.uniformProxy)(config);

            case 4:
              json = _context11.sent;

              if (json.code === 200) setCookie(ctx, json.data.token);
              ctx.body = json;

            case 7:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function (_x11) {
      return _ref11.apply(this, arguments);
    };
  }());

  router.get('/demo/:account', function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(ctx) {
      var account, url, config, json;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              account = ctx.params.account;
              url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'demoAccount/login?loginAccount=' + account);
              config = { url: url, method: 'GET' };
              _context12.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context12.sent;

              if (json.code === 200) {
                setCookie(ctx, json.data.token);
                ctx.redirect('/portal');
              } else {
                ctx.logger.error('\u6F14\u793A\u884C\u4E1A\u8D26\u53F7\u767B\u5F55\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
                ctx.body = json;
              }

            case 7:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    return function (_x12) {
      return _ref12.apply(this, arguments);
    };
  }());

  router.get('/demo/:username/:password', function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(ctx) {
      var _ctx$params, username, password, url, config, json;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _ctx$params = ctx.params, username = _ctx$params.username, password = _ctx$params.password;
              url = _env2.default.HTTP_USER_AUTHENTICATION;
              config = { url: url, method: 'POST', params: { username: username, password: password } };
              _context13.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context13.sent;

              if (json.code === 200) {
                setCookie(ctx, json.data.token);
                ctx.redirect('/portal');
              } else {
                ctx.logger.error('\u6F14\u793A\u7528\u6237\u5BC6\u7801\u767B\u5F55\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
                ctx.body = json;
              }

            case 7:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    return function (_x13) {
      return _ref13.apply(this, arguments);
    };
  }());

  router.get('/thirdparty/check', function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(ctx) {
      var yxyToken, url, config, json;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              yxyToken = ctx.query.yxyToken;
              url = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'user/loginByYxyToken?yxyToken=' + yxyToken);
              config = {
                url: url,
                method: 'GET'
              };
              _context14.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context14.sent;

              if (json.code === 200) {
                if (json.data) {
                  setCookie(ctx, json.data.token);
                  ctx.redirect('/portal');
                } else {
                  json.message = '登录失败，用户不存在';
                  ctx.logger.error('\u6839\u636EyxyToken\u83B7\u53D6token\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
                  ctx.body = json;
                }
              } else {
                ctx.logger.error('\u6839\u636EyxyToken\u83B7\u53D6token\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
                ctx.body = json;
              }

            case 7:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    return function (_x14) {
      return _ref14.apply(this, arguments);
    };
  }());

  router.get('/user/switchInterMode', function (ctx) {
    var mode = ctx.query.mode;

    ctx.cookies.set('interMode', mode, {
      path: '/',
      expires: new Date(Date.now() + 24 * 3600 * 1000),
      httpOnly: true
    });
    ctx.body = {
      code: 200,
      data: {
        redirectUrl: mode === 'pc' ? '/portal' : '/billing'
      }
    };
  });

  return router;
};

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../yxyweb/common/helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import React from 'react';

// import * as actions from '../../common/redux/modules/user';