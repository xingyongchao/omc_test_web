import Immutable from 'immutable';
import { proxy, genAction } from '../helpers/util';

let expression = '', expressionCode = '', billNo = null, entityName = null, treeData = null, key2Data = null, selectedKey2Title = null, title2ResultKey = null, selectionStart = 0;

const $$initialState = Immutable.fromJS({
  visible: false,
  caption: '',
  expression,
  expressionCode,
  errorInfo: '',
  checkPass: false,
  cControlType: 'Input',
  cFormatData: null,
  iNumPoint: 0,
});

export default ($$state = $$initialState, action) => {
  switch (action.type) {
    case 'PLATFORM_UI_FORMULA_INIT_DATA':
      return $$state.merge(action.payload);
    case 'PLATFORM_UI_FORMULA_UPDATE_EXPRESSION':
      return $$state.set('expression', expression);
    default:
      return $$state;
  }
}

export function setCommonData(data) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_FORMULA_INIT_DATA', data));
  }
}

export function select(key) {
  return function (dispatch) {
    const leftExp = expression.substr(0, selectionStart);
    const rightExp = expression.substr(selectionStart);
    expression = leftExp + selectedKey2Title[key] + rightExp;
    selectionStart = expression.length;
    dispatch(genAction('PLATFORM_UI_FORMULA_UPDATE_EXPRESSION'));
  }
}

export function selectOperator(key) {
  return function (dispatch) {
    const leftExp = expression.substr(0, selectionStart);
    const rightExp = expression.substr(selectionStart);
    expression = leftExp + key + rightExp;
    selectionStart = expression.length;
    dispatch(genAction('PLATFORM_UI_FORMULA_UPDATE_EXPRESSION'));
  }
}

export function changeCaption(value) {
  return genAction('PLATFORM_UI_FORMULA_INIT_DATA', { caption: value });
}

export function change(value, start) {
  expression = value;
  selectionStart = start;
  return genAction('PLATFORM_UI_FORMULA_INIT_DATA', { expression: expression, checkPass: false });
}

export function focus(value) {
  return function (dispatch) {
    selectionStart = value;
  }
}

export function check() {
  return async function (dispatch) {
    // let result = null;
    // var exp = /{.*?}/g;
    // var items = expression.match(exp);
    // if (items) {
    //   result = expression.replace(exp, title => {
    //     return title2ResultKey[title] || title;
    //   });
    // } else {
    //   result = expression;
    // }
    const config = {
      url: 'billdesign/checkExpression',
      method: 'POST',
      params: {
        billno: billNo,
        iBillEntityId: entityName,
        expression
      }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      dispatch(genAction('PLATFORM_UI_FORMULA_INIT_DATA', { errorInfo: json.message, checkPass: false }));
      return;
    }
    cb.utils.alert('校验成功', 'success');
    dispatch(genAction('PLATFORM_UI_FORMULA_INIT_DATA', { expressionCode: json.data, errorInfo: '', checkPass: true }));
  }
}

export function initOperator() {
  return async function (dispatch) {
    const config = {
      url: 'enum/getEnumStrFetch',
      method: 'GET',
      params: {
        enumtype: 'expressionType'
      }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      return;
    }
    const operatorData = JSON.parse(json.data);
    dispatch(genAction('PLATFORM_UI_FORMULA_INIT_DATA', { operatorData }));
  }
}

export function initData(billno, data, entityname) {
  return async function (dispatch) {
    if (billno !== billNo || entityname !== entityName) {
      billNo = billno;
      entityName = entityname;
      const config = {
        url: 'billdesign/getBillDataSource',
        method: 'GET',
        params: {
          billno: billNo,
          iBillEntityId: entityName
        }
      };
      const json = await proxy(config);
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'error');
        return;
      }
      treeData = json.data;
      key2Data = {};
      selectedKey2Title = {};
      title2ResultKey = {};
      rebuildTreeData(treeData);
    }
    if (data) {
      expression = data.expression || '';
      selectionStart = expression && expression.length || 0;
    }
    dispatch(genAction('PLATFORM_UI_FORMULA_INIT_DATA', Object.assign({ billNo, treeData, visible: true }, data)));
  }
}

export function close() {
  return genAction('PLATFORM_UI_FORMULA_INIT_DATA', {
    visible: false,
    caption: '',
    expression,
    expressionCode,
    errorInfo: '',
    checkPass: false,
    cControlType: 'Input',
    cFormatData: null,
    iNumPoint: 0,
  });
}

export function getEntityInfo(key) {
  return async function (dispatch) {
    const expandData = key2Data[key];
    const { entityName } = expandData;
    const config = {
      url: 'billdesign/getEntityInfoByName',
      method: 'GET',
      params: { entityName }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      return;
    }
    expandData.children = json.data;
    key2Data = {};
    selectedKey2Title = {};
    title2ResultKey = {};
    rebuildTreeData(treeData);
    dispatch(genAction('PLATFORM_UI_FORMULA_INIT_DATA', { treeData }));
  }
}

function rebuildTreeData(data, mergeCode, mergeName) {
  data.forEach(item => {
    const codes = [], names = [];
    if (mergeCode)
      codes.push(mergeCode);
    codes.push(item.name);
    if (mergeName)
      names.push(mergeName);
    names.push(item.title);
    item.mergeCode = codes.join('.');
    key2Data[item.mergeCode] = item;
    item.mergeName = names.join('.');
    const mergeTitle = `[${item.mergeName}]`;
    selectedKey2Title[item.mergeCode] = mergeTitle;
    title2ResultKey[mergeTitle] = item.mergeCode;
    if (!item.children) return;
    rebuildTreeData(item.children, item.mergeCode, item.mergeName);
  });
}
