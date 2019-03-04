import Immutable from 'immutable';
import { genAction, proxy } from '../helpers/util';

let treeData = [];

const $$initialState = Immutable.fromJS({
  selectType: '',
  templateData: [],
  url: null,
  showModal: false,
  showCopyModal: false,
  isDefault: false,
  templatecode: '',
  templatename: '',
  openNewWindow: false,
})

export default ($$state = $$initialState, action) => {
  switch (action.type) {
    case 'PLATFORM_UI_PRINT_SET_COMMON_DATA':
      return $$state.merge(action.payload);
    default:
      return $$state;
  }
}

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
export function setDefaultTemplate(params, pk_print_template) {
  return function (dispatch, getState) {
    const config = {
      url: 'print/setDefaultTemp',
      method: 'GET',
      params: params
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) return;
        dispatch(loadTemplate());
      });
  }
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
export function loadTemplate() {
  return function (dispatch) {
    const config = {
      url: 'print/queryTemplatesByTenant.do',
      method: 'GET'
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) return;
        let selectType = json.data[0].bo_code;
        dispatch(genAction('PLATFORM_UI_PRINT_SET_COMMON_DATA', { templateData: json.data, selectType }));
      });
  }
}

export function addTemplate(val) {
  return function (dispatch) {
    const config = {
      url: 'print/printDesign.do',
      method: 'GET',
      params: val
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) return;
        // window.open(json.data);
        dispatch(genAction('PLATFORM_UI_PRINT_SET_COMMON_DATA', { url: json.data, openNewWindow: true }));
      });
  }
}

/*修改模板*/
export function modifyTemplate(templateCode) {
  return function (dispatch) {
    const config = {
      url: 'print/updatePrintDesign.do',
      method: 'GET',
      params: {
        templateCode: templateCode
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) return;
        // window.open(json.data);
        dispatch(genAction('PLATFORM_UI_PRINT_SET_COMMON_DATA', { url: json.data, openNewWindow: true }));
      });
  }
}

/*复制模板*/
export function copyTemplate(val) {
  return function (dispatch) {
    const config = {
      url: 'print/copyTempByPk.do',
      method: 'POST',
      params: val
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) return;
        dispatch(loadTemplate());
      });
  }
}

/*删除模板*/
export function deleteTemplate(templatePk, billNo) {
  return function (dispatch) {
    const config = {
      url: 'print/deleteTemp.do',
      method: 'GET',
      params: {
        pk_template: templatePk
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) return;
        dispatch(loadTemplate());
      });
  }
}

export function setData(data) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_PRINT_SET_COMMON_DATA', data));
  }
}
