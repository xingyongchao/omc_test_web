import Immutable from 'immutable'
import warning from 'warning'
import fetch from 'isomorphic-fetch'
import { isFunction, isString, findIndex } from 'lodash'
import { message } from 'antd'

import ActionStatus from '../constants/ActionStatus'
import env from '../helpers/env'
import { toJSON, auth, catchException, genAction, genFetchOptions } from '../helpers/util'
//获取自定义项列表
export const PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST'
export const PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED'
export const PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE'
export const PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS'

//通过ID获取自定项信息
export const PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID = 'PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID'
export const PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED = 'PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED'
export const PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE = 'PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE'

//自定项值修改
export const PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF = 'PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF'
export const PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED = 'PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED'
export const PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE = 'PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE'

const $$initialState = Immutable.fromJS({
  // getRefFields_Status: ActionStatus.READY,
  userDefList_GetUserDefStatus: ActionStatus.READY,
  userDefList_All: [],
  userDefList_DisplayData: [],
  userDefList_DisplayRecordCount: null,
  userDefList_DisplayPageCount: null,
  userDefList_DisplayPageIndex: 1,
  userDefList_Class: {},
  userDefList_CurrentClassId: null,

  userDefSetting_DefineId: null,
  userDefSetting_ArchiveValue: [],
  userDefSetting_UpdateStatus: ActionStatus.READY,
  userDefSetting_GetArchiveStatus: ActionStatus.READY,
}
)

export default (state = $$initialState, action) => {
  let pageSize = 0;
  let pageIndex = 1;
  let classId = "";
  let className = "";
  let beginNum = 1;
  let recordCount = 0;
  switch (action.type) {
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST:
      return state.set('userDefList_GetUserDefStatus', ActionStatus.ING)
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED:
      // const _userDefList_Class = { 'all': '全部' }  pageSize, pageIndex
      let data = action.payload.data;
      pageSize = action.payload.pageSize;
      pageIndex = action.payload.pageIndex;
      className = "";
      classId = "";
      const _userDefList_Class = {}
      for (let i in data) {
        classId = data[i].classId
        if (!_userDefList_Class.hasOwnProperty(classId)) {
          _userDefList_Class[classId] = data[i].className;
        }
      }
      beginNum = pageSize * (pageIndex - 1) + 1;
      recordCount = 0;
      const _userDefList_All = data;
      classId = action.payload.classId ? action.payload.classId : _userDefList_All[0].classId;
      const _userDefList_DisplayData = _userDefList_All.filter(function (item) {
        if (_userDefList_Class) {
          if (item.classId == classId) {
            recordCount = recordCount + 1;
            if (recordCount >= beginNum && recordCount < beginNum + pageSize) {
              return true
            }
            else {
              return false;
            }
          }
        }
        else {
          return true;
        }
      });
      return state.set('userDefList_GetUserDefStatus', ActionStatus.SUCCEED)
        .set('userDefList_All', _userDefList_All)
        .set('userDefList_DisplayData', _userDefList_DisplayData)
        .set('userDefList_DisplayRecordCount', recordCount)
        .set('userDefList_DisplayPageIndex', 1)
        .set('userDefList_DisplayPageCount', Math.ceil(recordCount / pageSize))
        .set('userDefList_Class', _userDefList_Class)
        .set('userDefList_CurrentClassId', classId);
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE:
      return state.set('userDefList_GetUserDefStatus', ActionStatus.FAILURE)
    case PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID:
      return state.set('userDefSetting_GetArchiveStatus', ActionStatus.ING)
    case PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED:
      return state
        .set('userDefSetting_GetArchiveStatus', ActionStatus.SUCCEED)
        .set('userDefSetting_ArchiveValue', action.payload)
    case PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE:
      return state.set('userDefSetting_GetArchiveStatus', ActionStatus.FAILURE)
    case PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF:
      return state.set('userDefSetting_UpdateStatus', ActionStatus.ING)
    case PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED:
      let $userDefList_All = state.get('userDefList_All')
      let $userDefList_DisplayData = state.get('userDefList_DisplayData')
      $userDefList_All = _updataList($userDefList_All, action.payload)
      $userDefList_DisplayData = _updataList($userDefList_DisplayData, action.payload)
      return state.set('userDefSetting_UpdateStatus', ActionStatus.SUCCEED, 'userDefList_All', $userDefList_All, 'userDefList_DisplayData', $userDefList_DisplayData)
    case PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE:
      return state.set('userDefSetting_UpdateStatus', ActionStatus.FAILURE)
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS:
      pageSize = action.payload.pageSize;
      pageIndex = action.payload.pageIndex;
      classId = action.payload.classId;
      const _userDefList_All2 = state.get('userDefList_All')
      beginNum = pageSize * (pageIndex - 1) + 1;
      recordCount = 0;
      const _userDefList_DisplayData2 = _userDefList_All2.filter(function (item) {
        if (item.classId == classId) {
          recordCount = recordCount + 1;
          if (recordCount >= beginNum && recordCount < beginNum + pageSize) {
            return true;
          }
          else {
            return false;
          }
        }
      })
      return state.set('userDefList_DisplayData', _userDefList_DisplayData2)
        .set('userDefList_DisplayRecordCount', recordCount)
        .set('userDefList_DisplayPageCount', Math.ceil(recordCount / pageSize))
        .set('userDefList_DisplayPageIndex', pageIndex)
        .set('userDefList_CurrentClassId', classId);
    case 'PLATFORM_DATA_USERDEFINE_SHOW_SETTING':
      return state.set('userDefSetting_DefineId', action.payload);
    case 'PLATFORM_DATA_USERDEFINE_HIDE_SETTING':
      return state.set('userDefSetting_DefineId', null)
        .set('userDefSetting_ArchiveValue', null);


    default:
      return state
  }
}

function _updataList(list, userDefBase) {
  for (let i in list) {
    if (list[i].defineId === userDefBase.defineId) {
      for (let prop in list[i]) {
        if (userDefBase.hasOwnProperty(prop)) {
          list[i][prop] = userDefBase[prop]
        }
      }
      for (let prop in userDefBase) {
        if ((!list[i].hasOwnProperty(prop)) && prop != 'iDeleted' && prop != 'pubts') {
          list[i][prop] = userDefBase[prop]
        }
      }
      break;
    }
  }
  return list;
}

function _fetchUserDefineList(dispatch, token, classId, pageSize, pageIndex) {
  dispatch(genAction(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST))
  const url = env.HTTP_FETCH_USERDEF_USERDEFLIST.format(token)
  const options = genFetchOptions('post', {
    classId: classId
  })
  fetch(url, options)
    .then(toJSON, catchException)
    .then(json => auth(json, dispatch))
    .then(function (json) {
      if (json.code === 200) {
        dispatch(genAction(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED, { data: json.data, classId, pageSize, pageIndex }))
      } else {
        dispatch(genAction(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE))
        message.error(json.message, 2)
      }
    })
}

function _getUserDefineArchiveByDefineId(dispatch, token, defineId) {

  dispatch(genAction(PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID))
  const url = env.HTTP_FETCH_USERDEF_USERDEFARCHIVEBYDEFINEID.format(token)
  const options = genFetchOptions('post', {
    defineId
  })
  fetch(url, options)
    .then(toJSON, catchException)
    .then(json => auth(json, dispatch))
    .then(function (json) {
      if (json.code === 200) {
        dispatch(genAction(PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED, json.data))
      } else {
        dispatch(genAction(PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE))
        message.error(json.message, 2)
      }
    })
}

function _updateUserDef(dispatch, token, params) {
  dispatch(genAction(PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF))
  const url = env.HTTP_USERDEF_UPDATEUSERDEF.format(token)
  const options = genFetchOptions('post', params)
  fetch(url, options)
    .then(toJSON, catchException)
    .then(json => auth(json, dispatch))
    .then(function (json) {
      if (json.code === 200) {
        dispatch(genAction(PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED, params.userDefBase))
        cb.utils.alert(json.message,'success')
      } else {
        dispatch(genAction(PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE))
        cb.utils.alert(json.message,'error')
      }
    })
}
function _fetchUserDefineListPageByClass(dispatch, classId, pageSize, pageIndex) {
  dispatch(genAction(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS, { classId, pageSize, pageIndex }));
}

export const fetchUserDefineList = (classId, pageSize, pageIndex) => {
  return (dispatch, getState) => {
    const token = getState().user.get('token')
    _fetchUserDefineList(dispatch, token, classId, pageSize, pageIndex)
  }
};
export const getUserDefineArchiveByDefineId = (defineId) => {
  return (dispatch, getState) => {

    const token = getState().user.get('token')
    _getUserDefineArchiveByDefineId(dispatch, token, defineId)
  }
};

export const updateUserDef = (params) => {
  return (dispatch, getState) => {
    const token = getState().user.get('token')
    _updateUserDef(dispatch, token, params)
  }
};

export const fetchUserDefineListPageByClass = (classId, pageSize, pageIndex) => {
  return (dispatch) => {
    _fetchUserDefineListPageByClass(dispatch, classId, pageSize, pageIndex)
  }
};

export function showSetting(defineId) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_DATA_USERDEFINE_SHOW_SETTING', defineId));
  }
}

export function hideSetting() {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_DATA_USERDEFINE_HIDE_SETTING'));
  }
}



