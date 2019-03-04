'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabs = tabs;
exports.deleteItem = deleteItem;
exports.clear = clear;
exports.addItem = addItem;
exports.activateItem = activateItem;
exports.refreshWidth = refreshWidth;
exports.refreshHeight = refreshHeight;
exports.closeOther = closeOther;
exports.closeAll = closeAll;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodash = require('lodash');

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { getMyToDo } from './home';


var $$initialState = _immutable2.default.fromJS({
  panes: [],
  needUpdate: false
});

function tabs() {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_TAB_ADD':
      var tabItem = action.payload.value;
      var key = tabItem && tabItem.key;
      if (!key) return $$state;
      if (!tabItem.params && tabItem.content) tabItem.params = { key: key, title: tabItem.title, content: tabItem.content };
      return $$state.update('panes', function (panes) {
        var _panes = _immutable2.default.Iterable.prototype.isPrototypeOf(panes) ? panes.toJS() : panes;
        var idx = (0, _lodash.findIndex)(_panes, ['key', key]);
        if (idx === -1) {
          _panes.push(tabItem);
        } else {
          _panes[idx] = tabItem;
        }
        return _panes;
      }).merge({ activeKey: key, needUpdate: true });
    case 'PLATFORM_UI_TAB_CHANGE':
      return $$state.merge({ activeKey: action.payload.key, needUpdate: false });
    case 'PLATFORM_UI_TAB_DEL':
      var closeKey = action.payload.key;
      var activeKey = $$state.getIn(['activeKey']);
      var lastIdx = void 0;
      return $$state.update('panes', function (panes) {
        var list = panes.filter(function (pane, i) {
          if (pane.key === closeKey) {
            lastIdx = i - 1;
            if (lastIdx >= 0 && activeKey === pane.key) activeKey = panes[lastIdx].key;
            return false;
          }
          return true;
        });
        return list;
      }).merge({ closeKey: closeKey, activeKey: activeKey, needUpdate: true });
    case 'PLATFORM_UI_TAB_CLEAR':
      return $$state.update('panes', function (panes) {
        return [];
      }).merge({ needUpdate: true });
    // case 'PLATFORM_UI_TAB_RENDER_DISABLE':
    //   return $$state.merge({ needUpdate: false });
    case 'PLATFORM_UI_TAB_WIDTH':
      return $$state.merge({ width: action.width, needUpdate: true });
    case 'PLATFORM_UI_TAB_HEIGHT':
      return $$state.merge({ height: action.height, needUpdate: true });
    case 'PLATFORM_UI_TAB_CLOSE_OTHER':
      return $$state.update('panes', function (panes) {
        var activeKey = $$state.get('activeKey');
        return panes.filter(function (item) {
          return item.closable === false || item.key === activeKey;
        });
      });
    case 'PLATFORM_UI_TAB_CLOSE_ALL':
      {
        var _activeKey = $$state.get('activeKey');
        return $$state.update('panes', function (panes) {
          var list = panes.filter(function (item) {
            return item.closable === false;
          });
          _activeKey = list.length && list[0].key;
          return list;
        }).set('activeKey', _activeKey);
      }
    case 'PLATFORM_UI_TAB_UPDATE_ONE':

      return $$state.update('panes', function (panes) {
        _.merge((0, _lodash.find)(panes, function (p) {
          return p.key === action.payload.key;
        }), action.payload.pane);
        return panes;
      }).set('needUpdate', true);

    default:
      return $$state;
  }
}

function deleteItem(key) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_TAB_DEL', { key: key }));
  };
}

function clear() {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_TAB_CLEAR'));
  };
}

function addItem(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_TAB_ADD', { value: value }));
  };
}

function activateItem(key) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_TAB_CHANGE', { key: key }));
    if (key === 'PORTAL') dispatch(getMyToDo());
  };
}

function refreshWidth(width) {
  return function (dispatch) {
    dispatch({ type: 'PLATFORM_UI_TAB_WIDTH', width: width });
  };
}

function refreshHeight(height) {
  return function (dispatch) {
    dispatch({ type: 'PLATFORM_UI_TAB_HEIGHT', height: height });
  };
}

// export function disableUpdate() {
//   return ((dispatch) => {
//     dispatch({ type: 'PLATFORM_UI_TAB_RENDER_DISABLE' })
//   })
// }

function closeOther() {
  return (0, _util.genAction)('PLATFORM_UI_TAB_CLOSE_OTHER');
}

function closeAll() {
  return (0, _util.genAction)('PLATFORM_UI_TAB_CLOSE_ALL');
}