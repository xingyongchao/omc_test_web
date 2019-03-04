import Immutable from 'immutable';
import { genAction, proxy } from '../helpers/util';

const activeKeyObj = {};

const $$initialState = Immutable.fromJS({
  tabs: {}
})

export default ($$state = $$initialState, action) => {
  switch (action.type) {
    case 'PLATFORM_UI_META_WRAPPER_TAB_INIT':
      activeKeyObj[action.payload.key] = 0;
      const items1 = $$state.get('tabs').toJS();
      items1[action.payload.key] = {
        panes: [],
        activeKey: action.payload.key + '0'
      };
      return $$state.set('tabs', Immutable.fromJS(items1));
    case 'PLATFORM_UI_META_WRAPPER_TAB_ADD':
      const items2 = $$state.get('tabs').toJS();
      // let key = items2[action.payload.key].panes.length + 1;
      const key = activeKeyObj[action.payload.key] + 1;
      activeKeyObj[action.payload.key] = key;
      items2[action.payload.key].activeKey = action.payload.key + key.toString();
      items2[action.payload.key].activeTitle = action.payload.data.title;
      action.payload.data.key = action.payload.key + key.toString();
      items2[action.payload.key].panes.push(action.payload.data);
      return $$state.set('tabs', Immutable.fromJS(items2));
    case 'PLATFORM_UI_META_WRAPPER_TAB_DEL':
      const items3 = $$state.get('tabs').toJS();
      const panes = items3[action.payload.key].panes;
      panes.splice(panes.length - 1, 1);
      // if (!panes.length)
      //   return $$state;
      if (panes.length) {
        items3[action.payload.key].activeKey = panes[panes.length - 1].key;
        items3[action.payload.key].activeTitle = panes[panes.length - 1].title;
      }
      // items3[action.payload.key].panes = panes;
      return $$state.set('tabs', Immutable.fromJS(items3));
    case 'PLATFORM_UI_META_WRAPPER_TAB_DESTROY':
      const items4 = $$state.get('tabs').toJS();
      delete items4[action.payload.key];
      return $$state.set('tabs', Immutable.fromJS(items4));
    case 'PLATFORM_UI_META_WRAPPER_TAB_FIRST':
      const items5 = $$state.get('tabs').toJS();
      const panes1 = items5[action.payload.key].panes;
      panes1.splice(1, panes1.length - 1);
      if (!panes1.length)
        return $$state;
      items5[action.payload.key].activeKey = panes1[0].key;
      items5[action.payload.key].activeTitle = panes1[0].title;
      return $$state.set('tabs', Immutable.fromJS(items5));
    case 'PLATFORM_UI_META_WRAPPER_TAB_REFRESH':
      const items6 = $$state.get('tabs').toJS();
      const panes2 = items6[action.payload.key].panes;
      panes2[panes2.length - 1].caption = action.payload.caption;
      panes2[panes2.length - 1].callback = action.payload.callback;
      return $$state.set('tabs', Immutable.fromJS(items6));
    default:
      return $$state;
  }
}

export function metaInit(key, data) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_WRAPPER_TAB_INIT', { key }));
    dispatch(addItem(key, data));
  }
}

export function addItem(key, data) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_WRAPPER_TAB_ADD', { key, data }));
  }
}

export function delItem(key) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_WRAPPER_TAB_DEL', { key }));
  }
}

export function destroy(key) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_WRAPPER_TAB_DESTROY', { key }));
  }
}

export function firstItem(key) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_WRAPPER_TAB_FIRST', { key }));
  }
}

export function refreshItem(key, caption, callback) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_WRAPPER_TAB_REFRESH', { key, caption, callback }));
  }
}

export function getWebUrl(domain, path){
  return new Promise((resolve, reject)=>{
    let config = {
      url:'menu/geturl.do',
      method: 'GET',
      params: {
        srv: domain || 'upcUrl',
        url: path
      }
    }
    proxy(config).then(json=>{
      if(json.code!==200){
        cb.utils.alert(json.message, 'error');
        reject(json.message)
        return
      }
      resolve(json.data)
    })
  })
}
