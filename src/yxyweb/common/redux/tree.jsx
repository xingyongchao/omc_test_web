/**
 * Created by wxk on 2016/7/19.
 */
import Immutable from 'immutable'

import env from '../helpers/env'
import { genFetchOptions, auth, genAction, proxy, rebuildTreeData } from '../helpers/util'

let id = 1;
const $$initialState = Immutable.fromJS({
  id,
  TreeData: []
});

export function tree($$state = $$initialState, action) {
  let status,
    account;
  switch (action.type) {

    case 'PLATFORM_UI_TREE_LOAD':
      //console.log(action.TreeData);
      return $$state.merge({
        id: id++,
        TreeData: action.TreeData
      });
      break;
    case 'PLATFORM_UI_TREE_NODE_LOAD':
      //console.log('action.TreeNode');
      //console.log(action.TreeNode);
      return $$state.merge({
        TreeNode: action.TreeNode
      });
      break;

    default:
      return $$state;
  }
}

export async function getMenuTree(dispatch, { cacheData = null, cacheDBData = null } = {}) {
  const config = {
    url: `getMenuTree`,
    method: 'POST',
    options: { uniform: false }
  };
  const json = cacheData ? cacheData : await proxy(config);
  cacheDBData ? cacheDBData.MenuTreeData = json : ''
  if (json.code !== 200) {
    cb.utils.alert(json.message, 'error');
    return;
  }
  json.data = json.data || [];
  const orgMenus = [], storeMenus = [];
  console.error(env.INTERACTIVE_MODE);
  rebuildTreeData(json.data, orgMenus, storeMenus);
  dispatch({
    type: 'PLATFORM_UI_TREE_LOAD',
    TreeData: json.data
  });
  const showOptions = {
    showOrg: orgMenus.length ? true : false,
    showStore: storeMenus.length ? true : false
  };
  if (showOptions.showStore) {
    showOptions.canBilling = storeMenus.find(item => {
      return item.code.indexOf('RM0101') > -1;
    }) ? true : false;
  }
  dispatch(genAction('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', showOptions));
  return showOptions;
}

export function clearMenu() {
  return { type: 'PLATFORM_UI_TREE_LOAD', TreeData: [] };
}

export function treeload(callback) {
  /*return function(dispatch){
    /!*let proxy = cb.rest.DynamicProxy.create({ getTree: { url: 'menu/getMenuTree.do', method: 'POST' } });
    proxy.getTree(function (err, rs) {
      if (err) {
        alert("后台获取元数据服务出错");
        console.log(err);
        return;
      }
      dispatch({
        type : 'TREE_LOAD',
        TreeData : rs
      });
    });*!/

  }*/
  //console.log('treeload')
  return function (dispatch, getState) {
    //let proxy = cb.rest.DynamicProxy.create({ getTree: { url: 'menu/getMetaByMenu.do', method: 'POST' } });

    const options = genFetchOptions('post')
    fetch('/getMenuTree?token=' + getState().user.get('token'), options)
      .then(function (response) {
        //console.log(response);
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(json => auth(json, dispatch))
      .then(function (json) {
        //console.log(json);
        if (!json) return;
        callback();
        const orgMenus = [], storeMenus = [];
        rebuildTreeData(json.data, orgMenus, storeMenus);
        dispatch({
          type: 'PLATFORM_UI_TREE_LOAD',
          TreeData: json.data
        });
        dispatch(genAction('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', {
          showOrg: orgMenus.length ? true : false,
          showStore: storeMenus.length ? true : false
        }));
      });
  }
}

export function TreeNodeLoad(value, CallBack) {
  let options = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'bill',
      billNo: value
    })
  }
  return function (dispatch) {
    fetch('/meta', options)
      .then(function (response) {
        //console.log(response);
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(function (json) {
        //console.log('TREE_NODE_LOAD');
        //console.log(json);
        dispatch({
          type: 'PLATFORM_UI_TREE_NODE_LOAD',
          //TreeNode : json
        })
        CallBack();
      });
  };


  /*Voucher.getMetaByMenu(value,function (err, rs) {
    if (err) {
      alert("后台获取元数据服务出错");
      console.log(err);
      return;
    }
    dispatch({
      type : 'TREE_NODE_LOAD',
      TreeNode : rs
    });
    CallBack();
  });*/
  /*proxy.getTree({menu_code:value},function (err, rs) {
   if (err) {
   alert("后台获取元数据服务出错");
   console.log(err);
   return;
   }
   dispatch({
   type : 'TREE_NODE_LOAD',
   TreeNode : rs
   });
   CallBack();
   });*/
}

let handler = null;

export function setHandler(data) {
  return function (dispatch) {
    handler = data;
  }
}

const recursiveFind = (list, code, data) => {
  if (!list.length) return;
  list.forEach(item => {
    if (item.children) {
      recursiveFind(item.children, code, data);
    } else {
      if (item.code !== code) return;
      data.push(item);
    }
  })
}

const doCommonVisit = function (menuCode) {
  const config = {
    url: 'commonfuctions/visits',
    method: 'GET',
    params: { menuCode }
  };
  proxy(config);
}

export function execHandler(menuCode, carryData, callback) {
  return function (dispatch, getState) {
    const portalTreeData = getState().tree.toJS().TreeData;
    if (!portalTreeData) return;
    try {
      menuCode = JSON.parse(menuCode);
    } catch (e) {

    }
    const returnData = [];
    if (typeof menuCode === 'object') {
      returnData.push(menuCode);
      menuCode = menuCode.code;
    } else {
      recursiveFind(portalTreeData, menuCode, returnData);
      if (returnData.length !== 1) {
        cb.utils.alert(`没有找着编码为${menuCode}的菜单`, 'error');
        return;
      }
      doCommonVisit(menuCode);
    }
    const menuData = returnData[0];
    let filterCondition = null;
    if (carryData) {
      const { query, title, condition } = carryData;
      if (condition) {
        filterCondition = condition;
        if (query) {
          menuCode += '_' + query;
          menuData.key = menuCode;
        }
        if (title)
          menuData.name = title;
      } else {
        const { key, value } = query;
        menuCode += '_' + value;
        const menuUrl = `?${key}=${value}`;
        menuData.key = menuCode;
        if (title)
          menuData.name = title;
        menuData.menuUrl = menuUrl;
      }
    }
    handler(menuCode, menuData, filterCondition, callback);
  }
}

export function moreButtonHandler(menuCode, menuData, filterCondition) {
  return function (dispatch) {
    handler(menuCode, menuData, filterCondition)
  }
}
