'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = html;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _env = require('../../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = process.env.NODE_ENV === 'development';
var baseUrl = _env2.default.HTTP_SCRIPT_BASEURL;
var suffix = _env2.default.HTTP_SCRIPT_SUFFIX;
var random = isDev ? '' : '?_=' + _env2.default.STATIC_RANDOM_SUFFIX;

function html(pageInfo, content, state) {
  // 开发环境使用样式热更新, 不再用打包后的独立css文件
  var loadCss = isDev ? '' : '<link href="' + baseUrl + '/styles/default/' + pageInfo.entryPoint + suffix + '.css' + random + '" rel="stylesheet" type="text/css" />';
  var yyyScript = isDev ? '' : '<script src="' + baseUrl + '/scripts/yonyou-yyy.js' + random + '"></script>';

  (0, _invariant2.default)((typeof pageInfo === 'undefined' ? 'undefined' : _typeof(pageInfo)) === 'object', 'ctx.render\u51FD\u6570\u7684\u53C2\u6570\u683C\u5F0F\u4E3A\uFF1A' + JSON.stringify({
    title: 'html>head>title的值',
    keyword: 'html>head>keyword的值',
    description: 'html>head>description的值',
    baseUrl: '静态资源的根路径，如：http://localhost:3004/static/',
    content: 'ReactDOMServer.renderToString|renderToStaticMarkup输出的字符串',
    state: 'ctx.store.getState()'
  }) + '\uFF0C\u53EF\u4F20\u5165\u7A7A\u5BF9\u8C61\u3002');

  return '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8"/>\n    <title>' + pageInfo.title + '</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">\n    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>\n    <link rel="shortcut icon" href="' + baseUrl + '/styles/default/images/bee.ico" type="images/x-icon">\n      ' + loadCss + '\n  </head>\n  <body>\n    <div id="container">' + content + '</div>\n    <div id="popup-container"></div>\n\n\n    <script>\n      window.__INITIAL_STATE__ = ' + JSON.stringify(state) + '\n    </script>\n    ' + yyyScript + '\n    <script src="' + baseUrl + '/scripts/vendor' + suffix + '.js' + random + '"></script>\n    <script src="' + baseUrl + '/javascripts/' + pageInfo.entryPoint + suffix + '.js' + random + '"></script>\n    <script src="' + baseUrl + '/scripts/font.js' + random + '"></script>\n    <script>\n    (function(doc, win) {\n      window.__fontUnit = 0\n      var docEl = doc.documentElement,\n        // resizeEvt = \'orientationchange\' in window ? \'orientationchange\' : \'resize\',\n          recalc = function() {\n            var clientWidth = docEl.clientWidth;\n            var clientHeight = docEl.clientHeight;\n              if (!clientWidth) return;\n              if (clientWidth <= 1024 && clientHeight <= 600){\n                window.__isElectronic = true;\n                doc.body.className="electronic";\n              } else {\n                window.__isElectronic = false;\n              }\n              window.__isElectronicWidth = clientWidth\n          };\n          if (cb.rest.interMode === \'touch\'){\n            doc.body.className="touchDevice";\n          }\n      if (!doc.addEventListener) return;\n      //   win.addEventListener(resizeEvt, recalc, false);\n          doc.addEventListener(\'DOMContentLoaded\', recalc, false);\n      })(document, window);\n    </script>\n     <script>\n      try {\n        var Electron = require(\'electron\')\n         /*\n        * return {Object}\n        * */\n        cb.electron.getSharedObject = function(key) {\n          const sharedObj = Electron.remote.getGlobal(\'sharedObj\');\n          return key ? sharedObj[key] : sharedObj;\n        }\n\n        //Electron.remote.getGlobal(\'sendOrder\')(order, data)\n\n\n        cb.electron.sendOrder = function(order, data) {\n          //Electron.ipcRenderer.send(\'electronicBalance-order\', order, data)\n\n          return new Promise(function(resolve) {\n            // \u4E3A\u4E8B\u4EF6\u751F\u6210\u552F\u4E00ID\n            const orderID = new Date().getTime()\n            Electron.ipcRenderer.send(\'electronic-order\', orderID, order, data)\n            var callback = function(event, executedOrderID, result) {\n               console.log(result)\n               if (orderID === executedOrderID) {\n                   Electron.ipcRenderer.removeListener(\'electronic-order-reply\', callback)\n                   resolve(result)\n               }\n            }\n            Electron.ipcRenderer.addListener(\'electronic-order-reply\', callback)\n          })\n        }\n      } catch (e) {\n      }\n    </script>\n    <script>\n      cb.events.on(\'communication\', function (args) {\n        setTimeout(function() {\n          if (cb.electron.getSharedObject()) {\n            cb.electron.sendOrder(\'refreshSecondaryScreen\', { type: \'billing\', message: JSON.stringify(args) });\n          }\n        }, 1000);\n      });\n      function refreshSecondaryScreen(type,message) {\n        if (type === \'login\'){\n          if(typeof message===\'string\' && message.constructor===String)\n            message = JSON.parse(message);\n          if(!message.token)\n            message = {token:message,data:\'\'};\n          window.localStorage.setItem(\'token\', message.token);\n          cb.route.login(message.data);\n        } else {\n          try {\n            message = JSON.parse(message);\n            cb.route.dispatch(message);\n          } catch (e) {\n            cb.utils.alert(e.message);\n          }\n        }\n      }\n    </script>\n  </body>\n</html>';
}