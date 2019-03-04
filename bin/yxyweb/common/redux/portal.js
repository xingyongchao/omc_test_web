'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metaInit = metaInit;
exports.addItem = addItem;
exports.delItem = delItem;
exports.destroy = destroy;
exports.firstItem = firstItem;
exports.refreshItem = refreshItem;
exports.getWebUrl = getWebUrl;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var activeKeyObj = {};

var $$initialState = _immutable2.default.fromJS({
  tabs: {}
});

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_META_WRAPPER_TAB_INIT':
      activeKeyObj[action.payload.key] = 0;
      var items1 = $$state.get('tabs').toJS();
      items1[action.payload.key] = {
        panes: [],
        activeKey: action.payload.key + '0'
      };
      return $$state.set('tabs', _immutable2.default.fromJS(items1));
    case 'PLATFORM_UI_META_WRAPPER_TAB_ADD':
      var items2 = $$state.get('tabs').toJS();
      // let key = items2[action.payload.key].panes.length + 1;
      var key = activeKeyObj[action.payload.key] + 1;
      activeKeyObj[action.payload.key] = key;
      items2[action.payload.key].activeKey = action.payload.key + key.toString();
      items2[action.payload.key].activeTitle = action.payload.data.title;
      action.payload.data.key = action.payload.key + key.toString();
      items2[action.payload.key].panes.push(action.payload.data);
      return $$state.set('tabs', _immutable2.default.fromJS(items2));
    case 'PLATFORM_UI_META_WRAPPER_TAB_DEL':
      var items3 = $$state.get('tabs').toJS();
      var panes = items3[action.payload.key].panes;
      panes.splice(panes.length - 1, 1);
      // if (!panes.length)
      //   return $$state;
      if (panes.length) {
        items3[action.payload.key].activeKey = panes[panes.length - 1].key;
        items3[action.payload.key].activeTitle = panes[panes.length - 1].title;
      }
      // items3[action.payload.key].panes = panes;
      return $$state.set('tabs', _immutable2.default.fromJS(items3));
    case 'PLATFORM_UI_META_WRAPPER_TAB_DESTROY':
      var items4 = $$state.get('tabs').toJS();
      delete items4[action.payload.key];
      return $$state.set('tabs', _immutable2.default.fromJS(items4));
    case 'PLATFORM_UI_META_WRAPPER_TAB_FIRST':
      var items5 = $$state.get('tabs').toJS();
      var panes1 = items5[action.payload.key].panes;
      panes1.splice(1, panes1.length - 1);
      if (!panes1.length) return $$state;
      items5[action.payload.key].activeKey = panes1[0].key;
      items5[action.payload.key].activeTitle = panes1[0].title;
      return $$state.set('tabs', _immutable2.default.fromJS(items5));
    case 'PLATFORM_UI_META_WRAPPER_TAB_REFRESH':
      var items6 = $$state.get('tabs').toJS();
      var panes2 = items6[action.payload.key].panes;
      panes2[panes2.length - 1].caption = action.payload.caption;
      panes2[panes2.length - 1].callback = action.payload.callback;
      return $$state.set('tabs', _immutable2.default.fromJS(items6));
    default:
      return $$state;
  }
};

function metaInit(key, data) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_WRAPPER_TAB_INIT', { key: key }));
    dispatch(addItem(key, data));
  };
}

function addItem(key, data) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_WRAPPER_TAB_ADD', { key: key, data: data }));
  };
}

function delItem(key) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_WRAPPER_TAB_DEL', { key: key }));
  };
}

function destroy(key) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_WRAPPER_TAB_DESTROY', { key: key }));
  };
}

function firstItem(key) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_WRAPPER_TAB_FIRST', { key: key }));
  };
}

function refreshItem(key, caption, callback) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_WRAPPER_TAB_REFRESH', { key: key, caption: caption, callback: callback }));
  };
}

function getWebUrl(domain, path) {
  return new Promise(function (resolve, reject) {
    var config = {
      url: 'menu/geturl.do',
      method: 'GET',
      params: {
        srv: domain || 'upcUrl',
        url: path
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'error');
        reject(json.message);
        return;
      }
      resolve(json.data);
    });
  });
}