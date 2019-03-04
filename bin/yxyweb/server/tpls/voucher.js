'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = html;

var _common = require('./common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function html() {
  return '\n      //<%=cBillType%>\n      ' + common.header() + '\n\n            var billType = "<%=cBillType%>";\n            var biz ;\n            if(billType == \'option\' || billType == \'freeview\'){\n              biz= cb.biz.common.<%=cBillType%>\n            }else{\n              biz= cb.biz.common.voucher\n            }\n\n            ' + common.eventsListener() + '\n\n            var girdModelKeys = <%=helper_filterModelKeys(\'GridModel\',fields);%>\n            if(girdModelKeys){\n              girdModelKeys.forEach(function(key){\n                var gridModel = _this.get(key);\n                if(gridModel){\n                  gridModel.on(\'afterCellValueChange\',function(params){\n                    if(params) params.childrenField = key;\n                    biz.do(\'cellCheck\',_this, params);\n                  })\n                }\n              })\n            }\n\n      ' + common.footer() + '\n    ';
}