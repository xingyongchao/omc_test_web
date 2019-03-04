import Immutable from 'immutable';
import {assignIn, findIndex, isFunction, find} from 'lodash';
import {genAction} from '../helpers/util';
// import { getMyToDo } from './home';


const $$initialState = Immutable.fromJS({
  panes: [],
  needUpdate: false
});

export function tabs($$state = $$initialState, action) {
  switch (action.type) {
    case 'PLATFORM_UI_TAB_ADD':
      const tabItem = action.payload.value;
      const key = tabItem && tabItem.key;
      if (!key)
        return $$state;
      if (!tabItem.params && tabItem.content)
        tabItem.params = {key, title: tabItem.title, content: tabItem.content};
      return $$state
        .update('panes', panes => {
          const _panes = Immutable.Iterable.prototype.isPrototypeOf(panes) ? panes.toJS() : panes;
          const idx = findIndex(_panes, ['key', key]);
          if (idx === -1) {
            _panes.push(tabItem);
          } else {
            _panes[idx] = tabItem;
          }
          return _panes;
        })
        .merge({activeKey: key, needUpdate: true});
    case 'PLATFORM_UI_TAB_CHANGE':
      return $$state.merge({activeKey: action.payload.key, needUpdate: false});
    case 'PLATFORM_UI_TAB_DEL':
      const closeKey = action.payload.key;
      let activeKey = $$state.getIn(['activeKey']);
      let lastIdx;
      return $$state
        .update('panes', (panes) => {
          const list = panes.filter((pane, i) => {
            if (pane.key === closeKey) {
              lastIdx = i - 1;
              if (lastIdx >= 0 && activeKey === pane.key)
                activeKey = panes[lastIdx].key;
              return false;
            }
            return true;
          });
          return list;
        })
        .merge({closeKey: closeKey, activeKey: activeKey, needUpdate: true});
    case 'PLATFORM_UI_TAB_CLEAR':
      return $$state
        .update('panes', (panes) => {
          return [];
        })
        .merge({needUpdate: true});
    // case 'PLATFORM_UI_TAB_RENDER_DISABLE':
    //   return $$state.merge({ needUpdate: false });
    case 'PLATFORM_UI_TAB_WIDTH':
      return $$state.merge({width: action.width, needUpdate: true});
    case 'PLATFORM_UI_TAB_HEIGHT':
      return $$state.merge({height: action.height, needUpdate: true});
    case 'PLATFORM_UI_TAB_CLOSE_OTHER':
      return $$state.update('panes', panes => {
        const activeKey = $$state.get('activeKey');
        return panes.filter(item => {
          return item.closable === false || item.key === activeKey;
        });
      });
    case 'PLATFORM_UI_TAB_CLOSE_ALL': {
      let activeKey = $$state.get('activeKey');
      return $$state.update('panes', panes => {
        const list = panes.filter(item => {
          return item.closable === false;
        });
        activeKey = list.length && list[0].key;
        return list;
      }).set('activeKey', activeKey);
    }
    case 'PLATFORM_UI_TAB_UPDATE_ONE':

      return $$state.update('panes', panes => {
        _.merge(find(panes, p => p.key === action.payload.key), action.payload.pane)
        return panes
      }).set('needUpdate', true)


    default:
      return $$state;
  }
}

export function deleteItem(key) {
  return ((dispatch) => {
    dispatch(genAction('PLATFORM_UI_TAB_DEL', {key}));
  })
}

export function clear() {
  return ((dispatch) => {
    dispatch(genAction('PLATFORM_UI_TAB_CLEAR'));
  })
}

export function addItem(value) {
  return ((dispatch) => {
    dispatch(genAction('PLATFORM_UI_TAB_ADD', {value}));
  })
}

export function activateItem(key) {
  return ((dispatch) => {
    dispatch(genAction('PLATFORM_UI_TAB_CHANGE', {key}));
    if (key === 'PORTAL')
      dispatch(getMyToDo());
  })
}

export function refreshWidth(width) {
  return ((dispatch) => {
    dispatch({type: 'PLATFORM_UI_TAB_WIDTH', width: width})
  })
}

export function refreshHeight(height) {
  return ((dispatch) => {
    dispatch({type: 'PLATFORM_UI_TAB_HEIGHT', height: height})
  })
}

// export function disableUpdate() {
//   return ((dispatch) => {
//     dispatch({ type: 'PLATFORM_UI_TAB_RENDER_DISABLE' })
//   })
// }

export function closeOther() {
  return genAction('PLATFORM_UI_TAB_CLOSE_OTHER');
}

export function closeAll() {
  return genAction('PLATFORM_UI_TAB_CLOSE_ALL');
}
