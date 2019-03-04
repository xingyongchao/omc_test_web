'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultTemplate = setDefaultTemplate;
exports.loadTemplate = loadTemplate;
exports.addTemplate = addTemplate;
exports.modifyTemplate = modifyTemplate;
exports.copyTemplate = copyTemplate;
exports.deleteTemplate = deleteTemplate;
exports.setData = setData;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var treeData = [];

var $$initialState = _immutable2.default.fromJS({
  selectType: '',
  templateData: [],
  url: null,
  showModal: false,
  showCopyModal: false,
  isDefault: false,
  templatecode: '',
  templatename: '',
  openNewWindow: false
});

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_PRINT_SET_COMMON_DATA':
      return $$state.merge(action.payload);
    default:
      return $$state;
  }
};

// /*获取单据类型*/
// export function loadBoList() {
//   return function (dispatch) {
//     const config = {
//       url: 'print/queryBoByTenant.do',
//       method: 'GET'
//     }
//     proxy(config)
//       .then(json => {
//         if (json.code !== 200) return;
//         let orderType = json.data;
//         let selectType = orderType[0].bo_code;
//         dispatch(genAction('PLATFORM_UI_PRINT_SET_COMMON_DATA', { orderType, selectType }));
//       });
//   }
// }

/*设为默认模板*/


function setDefaultTemplate(params, pk_print_template) {
  return function (dispatch, getState) {
    var config = {
      url: 'print/setDefaultTemp',
      method: 'GET',
      params: params
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      dispatch(loadTemplate());
    });
  };
}

// /*根据单据类型获取模板*/
// export function loadTemplateByBo(billNo) {
//   return function (dispatch) {
//     const config = {
//       url: 'print/getTemplateByBo.do',
//       method: 'GET',
//       params: {
//         billno: billNo
//       }
//     }
//     proxy(config)
//       .then(json => {
//         if (json.code !== 200) return;
//         const node = treeData.find(item => {
//           return item.code === billNo;
//         });
//         if (node) {
//           node.children = [];
//           json.data.forEach(item => {
//             node.children.push({ code: item.pk_print_template, name: item.templatename, templateCode: item.templatecode, parentKey: billNo });
//           });
//         }
//         dispatch(genAction('PLATFORM_UI_PRINT_LOAD_DATA', { treeData: [].concat(treeData) }));
//       });
//   }
// }
/*获取租户下所有模板*/
function loadTemplate() {
  return function (dispatch) {
    var config = {
      url: 'print/queryTemplatesByTenant.do',
      method: 'GET'
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      var selectType = json.data[0].bo_code;
      dispatch((0, _util.genAction)('PLATFORM_UI_PRINT_SET_COMMON_DATA', { templateData: json.data, selectType: selectType }));
    });
  };
}

function addTemplate(val) {
  return function (dispatch) {
    var config = {
      url: 'print/printDesign.do',
      method: 'GET',
      params: val
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      // window.open(json.data);
      dispatch((0, _util.genAction)('PLATFORM_UI_PRINT_SET_COMMON_DATA', { url: json.data, openNewWindow: true }));
    });
  };
}

/*修改模板*/
function modifyTemplate(templateCode) {
  return function (dispatch) {
    var config = {
      url: 'print/updatePrintDesign.do',
      method: 'GET',
      params: {
        templateCode: templateCode
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      // window.open(json.data);
      dispatch((0, _util.genAction)('PLATFORM_UI_PRINT_SET_COMMON_DATA', { url: json.data, openNewWindow: true }));
    });
  };
}

/*复制模板*/
function copyTemplate(val) {
  return function (dispatch) {
    var config = {
      url: 'print/copyTempByPk.do',
      method: 'POST',
      params: val
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      dispatch(loadTemplate());
    });
  };
}

/*删除模板*/
function deleteTemplate(templatePk, billNo) {
  return function (dispatch) {
    var config = {
      url: 'print/deleteTemp.do',
      method: 'GET',
      params: {
        pk_template: templatePk
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      dispatch(loadTemplate());
    });
  };
}

function setData(data) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_PRINT_SET_COMMON_DATA', data));
  };
}