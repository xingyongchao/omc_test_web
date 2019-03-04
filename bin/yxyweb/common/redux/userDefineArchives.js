'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserDefineListPageByClass = exports.updateUserDef = exports.getUserDefineArchiveByDefineId = exports.fetchUserDefineList = exports.PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE = exports.PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED = exports.PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF = exports.PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE = exports.PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED = exports.PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST = undefined;
exports.showSetting = showSetting;
exports.hideSetting = hideSetting;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _lodash = require('lodash');

var _antd = require('antd');

var _ActionStatus = require('../constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _env = require('../helpers/env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//获取自定义项列表
var PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST';
var PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED';
var PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE';
var PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS = exports.PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS = 'PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS';

//通过ID获取自定项信息
var PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID = exports.PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID = 'PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID';
var PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED = exports.PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED = 'PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED';
var PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE = exports.PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE = 'PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE';

//自定项值修改
var PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF = exports.PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF = 'PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF';
var PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED = exports.PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED = 'PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED';
var PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE = exports.PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE = 'PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE';

var $$initialState = _immutable2.default.fromJS({
  // getRefFields_Status: ActionStatus.READY,
  userDefList_GetUserDefStatus: _ActionStatus2.default.READY,
  userDefList_All: [],
  userDefList_DisplayData: [],
  userDefList_DisplayRecordCount: null,
  userDefList_DisplayPageCount: null,
  userDefList_DisplayPageIndex: 1,
  userDefList_Class: {},
  userDefList_CurrentClassId: null,

  userDefSetting_DefineId: null,
  userDefSetting_ArchiveValue: [],
  userDefSetting_UpdateStatus: _ActionStatus2.default.READY,
  userDefSetting_GetArchiveStatus: _ActionStatus2.default.READY
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  var pageSize = 0;
  var pageIndex = 1;
  var classId = "";
  var className = "";
  var beginNum = 1;
  var recordCount = 0;
  switch (action.type) {
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST:
      return state.set('userDefList_GetUserDefStatus', _ActionStatus2.default.ING);
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED:
      // const _userDefList_Class = { 'all': '全部' }  pageSize, pageIndex
      var data = action.payload.data;
      pageSize = action.payload.pageSize;
      pageIndex = action.payload.pageIndex;
      className = "";
      classId = "";
      var _userDefList_Class = {};
      for (var i in data) {
        classId = data[i].classId;
        if (!_userDefList_Class.hasOwnProperty(classId)) {
          _userDefList_Class[classId] = data[i].className;
        }
      }
      beginNum = pageSize * (pageIndex - 1) + 1;
      recordCount = 0;
      var _userDefList_All = data;
      classId = action.payload.classId ? action.payload.classId : _userDefList_All[0].classId;
      var _userDefList_DisplayData = _userDefList_All.filter(function (item) {
        if (_userDefList_Class) {
          if (item.classId == classId) {
            recordCount = recordCount + 1;
            if (recordCount >= beginNum && recordCount < beginNum + pageSize) {
              return true;
            } else {
              return false;
            }
          }
        } else {
          return true;
        }
      });
      return state.set('userDefList_GetUserDefStatus', _ActionStatus2.default.SUCCEED).set('userDefList_All', _userDefList_All).set('userDefList_DisplayData', _userDefList_DisplayData).set('userDefList_DisplayRecordCount', recordCount).set('userDefList_DisplayPageIndex', 1).set('userDefList_DisplayPageCount', Math.ceil(recordCount / pageSize)).set('userDefList_Class', _userDefList_Class).set('userDefList_CurrentClassId', classId);
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE:
      return state.set('userDefList_GetUserDefStatus', _ActionStatus2.default.FAILURE);
    case PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID:
      return state.set('userDefSetting_GetArchiveStatus', _ActionStatus2.default.ING);
    case PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED:
      return state.set('userDefSetting_GetArchiveStatus', _ActionStatus2.default.SUCCEED).set('userDefSetting_ArchiveValue', action.payload);
    case PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE:
      return state.set('userDefSetting_GetArchiveStatus', _ActionStatus2.default.FAILURE);
    case PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF:
      return state.set('userDefSetting_UpdateStatus', _ActionStatus2.default.ING);
    case PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED:
      var $userDefList_All = state.get('userDefList_All');
      var $userDefList_DisplayData = state.get('userDefList_DisplayData');
      $userDefList_All = _updataList($userDefList_All, action.payload);
      $userDefList_DisplayData = _updataList($userDefList_DisplayData, action.payload);
      return state.set('userDefSetting_UpdateStatus', _ActionStatus2.default.SUCCEED, 'userDefList_All', $userDefList_All, 'userDefList_DisplayData', $userDefList_DisplayData);
    case PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE:
      return state.set('userDefSetting_UpdateStatus', _ActionStatus2.default.FAILURE);
    case PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS:
      pageSize = action.payload.pageSize;
      pageIndex = action.payload.pageIndex;
      classId = action.payload.classId;
      var _userDefList_All2 = state.get('userDefList_All');
      beginNum = pageSize * (pageIndex - 1) + 1;
      recordCount = 0;
      var _userDefList_DisplayData2 = _userDefList_All2.filter(function (item) {
        if (item.classId == classId) {
          recordCount = recordCount + 1;
          if (recordCount >= beginNum && recordCount < beginNum + pageSize) {
            return true;
          } else {
            return false;
          }
        }
      });
      return state.set('userDefList_DisplayData', _userDefList_DisplayData2).set('userDefList_DisplayRecordCount', recordCount).set('userDefList_DisplayPageCount', Math.ceil(recordCount / pageSize)).set('userDefList_DisplayPageIndex', pageIndex).set('userDefList_CurrentClassId', classId);
    case 'PLATFORM_DATA_USERDEFINE_SHOW_SETTING':
      return state.set('userDefSetting_DefineId', action.payload);
    case 'PLATFORM_DATA_USERDEFINE_HIDE_SETTING':
      return state.set('userDefSetting_DefineId', null).set('userDefSetting_ArchiveValue', null);

    default:
      return state;
  }
};

function _updataList(list, userDefBase) {
  for (var i in list) {
    if (list[i].defineId === userDefBase.defineId) {
      for (var prop in list[i]) {
        if (userDefBase.hasOwnProperty(prop)) {
          list[i][prop] = userDefBase[prop];
        }
      }
      for (var _prop in userDefBase) {
        if (!list[i].hasOwnProperty(_prop) && _prop != 'iDeleted' && _prop != 'pubts') {
          list[i][_prop] = userDefBase[_prop];
        }
      }
      break;
    }
  }
  return list;
}

function _fetchUserDefineList(dispatch, token, classId, pageSize, pageIndex) {
  dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST));
  var url = _env2.default.HTTP_FETCH_USERDEF_USERDEFLIST.format(token);
  var options = (0, _util.genFetchOptions)('post', {
    classId: classId
  });
  (0, _isomorphicFetch2.default)(url, options).then(_util.toJSON, _util.catchException).then(function (json) {
    return (0, _util.auth)(json, dispatch);
  }).then(function (json) {
    if (json.code === 200) {
      dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_SUCCEED, { data: json.data, classId: classId, pageSize: pageSize, pageIndex: pageIndex }));
    } else {
      dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLIST_FAILURE));
      _antd.message.error(json.message, 2);
    }
  });
}

function _getUserDefineArchiveByDefineId(dispatch, token, defineId) {

  dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID));
  var url = _env2.default.HTTP_FETCH_USERDEF_USERDEFARCHIVEBYDEFINEID.format(token);
  var options = (0, _util.genFetchOptions)('post', {
    defineId: defineId
  });
  (0, _isomorphicFetch2.default)(url, options).then(_util.toJSON, _util.catchException).then(function (json) {
    return (0, _util.auth)(json, dispatch);
  }).then(function (json) {
    if (json.code === 200) {
      dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_SUCCEED, json.data));
    } else {
      dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINESETTING_GETUSERDEFARCHIVEBYDEFINEID_FAILURE));
      _antd.message.error(json.message, 2);
    }
  });
}

function _updateUserDef(dispatch, token, params) {
  dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF));
  var url = _env2.default.HTTP_USERDEF_UPDATEUSERDEF.format(token);
  var options = (0, _util.genFetchOptions)('post', params);
  (0, _isomorphicFetch2.default)(url, options).then(_util.toJSON, _util.catchException).then(function (json) {
    return (0, _util.auth)(json, dispatch);
  }).then(function (json) {
    if (json.code === 200) {
      dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_SUCCEED, params.userDefBase));
      cb.utils.alert(json.message, 'success');
    } else {
      dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINESETTING_UPDATEUSERDEF_FAILURE));
      cb.utils.alert(json.message, 'error');
    }
  });
}
function _fetchUserDefineListPageByClass(dispatch, classId, pageSize, pageIndex) {
  dispatch((0, _util.genAction)(PLATFORM_DATA_USERDEFINE_FETCHUSERDEFLISTBYCLASS, { classId: classId, pageSize: pageSize, pageIndex: pageIndex }));
}

var fetchUserDefineList = exports.fetchUserDefineList = function fetchUserDefineList(classId, pageSize, pageIndex) {
  return function (dispatch, getState) {
    var token = getState().user.get('token');
    _fetchUserDefineList(dispatch, token, classId, pageSize, pageIndex);
  };
};
var getUserDefineArchiveByDefineId = exports.getUserDefineArchiveByDefineId = function getUserDefineArchiveByDefineId(defineId) {
  return function (dispatch, getState) {

    var token = getState().user.get('token');
    _getUserDefineArchiveByDefineId(dispatch, token, defineId);
  };
};

var updateUserDef = exports.updateUserDef = function updateUserDef(params) {
  return function (dispatch, getState) {
    var token = getState().user.get('token');
    _updateUserDef(dispatch, token, params);
  };
};

var fetchUserDefineListPageByClass = exports.fetchUserDefineListPageByClass = function fetchUserDefineListPageByClass(classId, pageSize, pageIndex) {
  return function (dispatch) {
    _fetchUserDefineListPageByClass(dispatch, classId, pageSize, pageIndex);
  };
};

function showSetting(defineId) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_USERDEFINE_SHOW_SETTING', defineId));
  };
}

function hideSetting() {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_USERDEFINE_HIDE_SETTING'));
  };
}