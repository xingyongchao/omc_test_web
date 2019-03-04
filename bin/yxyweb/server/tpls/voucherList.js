'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = html;

var _common = require('./common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function html() {
  return '\n      //voucherlist\n      ' + common.header() + '\n\n          var biz = cb.biz.common.voucherlist;\n          var billType = "<%=cBillType%>";\n\n          ' + common.eventsListener() + '\n\n\n          _this.on(\'toggle\',function(params){\n            biz.do(\'toggle\',_this,params);\n          });\n          //\u6CE8\u518C\n          _this.on(\'filterClick\',function(params){\n            biz.do(\'search\',_this,params);\n          });\n\n       ' + common.footer() + '\n    ';
}