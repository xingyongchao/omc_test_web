'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _contentDisposition = require('content-disposition');

var _contentDisposition2 = _interopRequireDefault(_contentDisposition);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../yxyweb/common/helpers/util');

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var doFetch = function doFetch(url) {
  var options = (0, _util.genFetchOptions)('get');
  return fetch(url, options).then(_util.toJSON, _util.catchException).then(function (json) {
    return {
      code: 200,
      data: json
    };
  });
};

var router = (0, _koaRouter2.default)();

require('./user').default(router);
require('./meta').default(router);
require('./option').default(router);
require('./titleSetting').default(router);
require('./processGroup').default(router);
require('./tpllist').default(router);
require('./fileupload').default(router);
require('./ueditor').default(router);
require('./amap').default(router);
require('./sourceMap').default(router);
require('../../yxyweb/server/controllers/filter').default(router);

function renderPageContent(ctx, internals) {
  var pageInfo = {
    title: '友零售'
  };
  try {
    ctx.render(pageInfo, internals);
  } catch (e) {
    ctx.logger.error(e);
  }
}

router.get('/test/fetch', function (ctx) {
  var interMode = ctx.cookies.get('interMode');
  var mode = ctx.query.mode;

  var redirectUrl = null;
  if (!interMode && mode) {
    ctx.cookies.set('interMode', mode, {
      path: '/',
      expires: new Date(Date.now() + 24 * 3600 * 1000),
      httpOnly: true
    });
    redirectUrl = mode === 'pc' ? '/portal' : '/billing';
  }
  ctx.body = {
    code: 200,
    data: { redirectUrl: redirectUrl },
    message: '测试成功'
  };
});

router.get('/package/checkUpdate', function (ctx) {
  var version = ctx.query.version;

  var isUpdate = version === _env2.default.PACKAGE_VERSION ? false : true;
  ctx.body = {
    code: 200,
    data: {
      isUpdate: isUpdate,
      url: 'http://uretailtest.yonyoucloud.com/packages/uretail.apk'
    }
  };
});

router.get('/test', function (ctx) {
  ctx.render({
    title: '测试'
  });
});

router.get('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var redirectUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            redirectUrl = ctx.host.indexOf('yonyoucloud') === -1 && ctx.host.indexOf('yonyouup') === -1 ? '/portal' : '/index.html';

            ctx.redirect(ctx.entryPoint === 'touch' ? '/billing' : redirectUrl);

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

router.get('/portal', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
    var user, url, config, json, orgMenus, storeMenus, device;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(ctx.entryPoint === 'touch')) {
              _context2.next = 3;
              break;
            }

            ctx.redirect('/billing');
            return _context2.abrupt('return');

          case 3:
            _context2.next = 5;
            return (0, _common.getLoginUser)(ctx);

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 9;
              break;
            }

            ctx.redirect('/login');
            return _context2.abrupt('return');

          case 9:
            url = _env2.default.HTTP_USER_FETCH_TREE.format(ctx.token, 1);
            config = {
              url: url,
              method: 'POST'
            };
            _context2.next = 13;
            return (0, _util.uniformProxy)(config);

          case 13:
            json = _context2.sent;

            if (!(json.code !== 200)) {
              _context2.next = 18;
              break;
            }

            ctx.logger.error('\u83B7\u53D6\u6811\u7ED3\u6784\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
            ctx.body = json;
            return _context2.abrupt('return');

          case 18:
            json.data = json.data || [];
            orgMenus = [], storeMenus = [];

            ctx.logger.error(ctx.entryPoint);
            (0, _util.rebuildTreeData)(json.data, orgMenus, storeMenus);
            user.showOrg = orgMenus.length ? true : false;
            user.showStore = storeMenus.length ? true : false;
            device = ctx.request.query.device;

            if (device) user.device = device;
            ctx.store.dispatch({
              type: 'PLATFORM_UI_USER_INIT',
              payload: user
            });
            ctx.store.dispatch({
              type: 'PLATFORM_UI_TREE_LOAD',
              TreeData: json.data
            });
            renderPageContent(ctx);

          case 29:
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

// 取文件
var FILE_ROUTE = '/files/*';

var parse = require('co-body');
router.post(FILE_ROUTE, function (ctx, next) {
  return parse.form(ctx).then(function (body) {
    ctx.request.body = body;
    return next();
  });
});

router.post(FILE_ROUTE, function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
    var req, res, request, path, serviceUrl, headers, data, options;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            req = ctx.req, res = ctx.res, request = ctx.request, path = ctx.path;
            serviceUrl = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, req.url.substr(FILE_ROUTE.length - 1));
            headers = {
              'content-type': _env2.default.HTTP_CONTENT_TYPE.JSON,
              // guard: 'response',
              // origin: 'koa2 server',
              cookie: req.headers.cookie
            };
            data = typeof request.body.json == 'string' ? JSON.parse(request.body.json) : request.body.json;
            options = (0, _util.genFetchOptions)(req.method, headers, data);


            ctx.logger.info('\u53C2\u6570\uFF1A' + request.body.json);

            _context3.next = 8;
            return fetch(serviceUrl, options).then(function (response) {
              if (response.status === 200) {
                var contentType = response.headers.get('Content-Type');
                var contentDisposition = response.headers.get('Content-Disposition');

                // if (contentType.indexOf('application/octet-stream') !== -1 &&
                if (contentDisposition != null) {
                  ctx.type = contentType;
                  ctx.body = response.body;
                  ctx.attachment(_contentDisposition2.default.parse(contentDisposition).parameters.filename);
                } else {
                  return response.json();
                }
              } else {
                return {
                  code: 500,
                  message: response.body.text()
                };
              }
            }, function (e) {
              ctx.body = '文件打开出错';
            }).then(function (json) {
              if (!json) return;
              if (json.data) json.data = _env2.default.HTTP_SERVICE_BASEURL + json.data;
              ctx.body = json;
            });

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function getFile(_x3) {
    return _ref3.apply(this, arguments);
  }

  return getFile;
}());

// router.post('/client/batchSubmit', async function (ctx) {
//   const { req, request } = ctx;
//   const mergeParams = request.body;
//   const results = [];
//   for (let i = 0, len = mergeParams.length; i < len; i++) {
//     const { requestUrl, requestMethod, requestData } = mergeParams[i];
//     const config = {
//       url: combine(env.HTTP_SERVICE_BASEURL, requestUrl),
//       method: requestMethod,
//       params: requestData
//     };
//     results.push(await uniformProxy(config));
//   }
//   ctx.body = { code: 200, data: results };
// });

router.post('/client/batchSubmit', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
    var req, request, mergeParams, promises, i, len, _mergeParams$i, requestUrl, requestMethod, requestData, config, results, _i, _len;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            req = ctx.req, request = ctx.request;
            mergeParams = request.body;
            promises = [];

            for (i = 0, len = mergeParams.length; i < len; i++) {
              _mergeParams$i = mergeParams[i], requestUrl = _mergeParams$i.requestUrl, requestMethod = _mergeParams$i.requestMethod, requestData = _mergeParams$i.requestData;
              config = {
                url: (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, requestUrl),
                method: requestMethod,
                params: requestData
              };

              promises.push((0, _util.uniformProxy)(config));
            }
            results = [];
            _i = 0, _len = promises.length;

          case 6:
            if (!(_i < _len)) {
              _context4.next = 15;
              break;
            }

            _context4.t0 = results;
            _context4.next = 10;
            return promises[_i];

          case 10:
            _context4.t1 = _context4.sent;

            _context4.t0.push.call(_context4.t0, _context4.t1);

          case 12:
            _i++;
            _context4.next = 6;
            break;

          case 15:
            ctx.body = { code: 200, data: results };

          case 16:
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

var UNIFORM_ROUTE = '/uniform/*';

router.get('/*bill/getPrintData', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
    var req, token, requestUrl, config;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            req = ctx.req, token = ctx.token;
            requestUrl = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, req.url) + ('&token=' + token);
            config = {
              url: requestUrl,
              method: req.method,
              headers: {
                'content-type': _env2.default.HTTP_CONTENT_TYPE.JSON,
                origin: 'koa2 server',
                cookie: req.headers.cookie
              }
            };
            _context5.next = 5;
            return (0, _util.uniformProxy)(config).then(function (json) {
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

router.get('/uniform/iterativeUpdate/*', function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
    var _ctx$req, url, method, headers, requestUrl, config;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ctx$req = ctx.req, url = _ctx$req.url, method = _ctx$req.method, headers = _ctx$req.headers;
            requestUrl = (0, _util.combine)(_env2.default.HTTP_UPDATELOG_SERVER, url.substr(UNIFORM_ROUTE.length - 1));
            config = {
              url: requestUrl,
              method: method,
              headers: {
                'content-type': _env2.default.HTTP_CONTENT_TYPE.JSON,
                origin: 'koa2 server',
                cookie: headers.cookie
              }
            };
            _context6.next = 5;
            return (0, _util.uniformProxy)(config).then(function (json) {
              ctx.body = json;
            });

          case 5:
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

var batchLogisticsRoute = '/uniform/batchLogistics';
router.post(batchLogisticsRoute, function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
    var req, request, requestUrl, config, json, data, i, len, item, com, nu, returnItem, serviceUrl, progressJson;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            req = ctx.req, request = ctx.request;
            requestUrl = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, 'bill/getLogisticsInfo' + req.url.substr(batchLogisticsRoute.length));
            config = {
              url: requestUrl,
              method: req.method,
              params: request.body
            };
            _context7.next = 5;
            return (0, _util.uniformProxy)(config);

          case 5:
            json = _context7.sent;
            data = [];

            if (!(json.data && json.data.length)) {
              _context7.next = 23;
              break;
            }

            i = 0, len = json.data.length;

          case 9:
            if (!(i < len)) {
              _context7.next = 23;
              break;
            }

            item = json.data[i];
            com = item.com, nu = item.nu;
            returnItem = item;
            serviceUrl = 'http://express.yonyouup.com/api/trace?com=' + com + '&nu=' + nu;
            _context7.next = 16;
            return doFetch(serviceUrl);

          case 16:
            progressJson = _context7.sent;

            returnItem.progress = progressJson.data && progressJson.data.data || [];
            returnItem.progress.sort(function (a, b) {
              return (0, _moment2.default)(a.time).isBefore(b.time) ? 1 : -1;
            });
            data.push(returnItem);

          case 20:
            i++;
            _context7.next = 9;
            break;

          case 23:
            ctx.body = { code: 200, data: data };

          case 24:
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

router.all(UNIFORM_ROUTE, function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx) {
    var req, request, requestUrl, config, requestData, headers, options;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            req = ctx.req, request = ctx.request;
            requestUrl = (0, _util.combine)(_env2.default.HTTP_SERVICE_BASEURL, req.url.substr(UNIFORM_ROUTE.length - 1));
            config = {
              url: requestUrl,
              method: req.method,
              params: request.body,
              headers: {
                'content-type': _env2.default.HTTP_CONTENT_TYPE.JSON,
                origin: 'koa2 server',
                cookie: req.headers.cookie
              }
            };
            _context8.next = 5;
            return (0, _util.uniformProxy)(config).then(function (json) {
              ctx.body = json;
            });

          case 5:
            return _context8.abrupt('return');

          case 12:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  function doUniformHttpRequest(_x8) {
    return _ref8.apply(this, arguments);
  }

  return doUniformHttpRequest;
}());

router.post('/getMenuTree', function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx) {
    var _ctx$query, token, terminalType, url, options;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _ctx$query = ctx.query, token = _ctx$query.token, terminalType = _ctx$query.terminalType;
            url = _env2.default.HTTP_USER_FETCH_TREE.format(token, terminalType);
            options = (0, _util.genFetchOptions)('post');
            _context9.next = 5;
            return fetch(url, options).then(_util.toJSON, _util.catchException).then(function (json) {
              if (json.code === 500) {
                ctx.logger.error('\u3010\u63A5\u53E3\u3011' + url + ' \u3010\u5F02\u5E38\u3011' + json.message);
              }
              ctx.type = _env2.default.HTTP_CONTENT_TYPE.JSON;
              ctx.body = json;
            });

          case 5:
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

router.get('/login', function (ctx) {
  renderPageContent(ctx);
});
router.get('/register', function (ctx) {
  renderPageContent(ctx, false);
});
router.get('/wechat', function (ctx) {
  renderPageContent(ctx);
});
router.get('/forget', function (ctx) {
  renderPageContent(ctx, false);
});
router.get('/expire', function (ctx) {
  renderPageContent(ctx);
});
exports.default = router;