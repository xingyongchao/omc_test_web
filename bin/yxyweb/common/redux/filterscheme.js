'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = undefined;
exports.doProxy = doProxy;
exports.IsEnterSchemeitem = IsEnterSchemeitem;
exports.AddScheme = AddScheme;
exports.IsDefault = IsDefault;
exports.Isedit = Isedit;
exports.openQuerylist = openQuerylist;
exports.chooseScheme = chooseScheme;
exports.getQueryItem = getQueryItem;
exports.getSchemeListData = getSchemeListData;
exports.refreshConditionListValue = refreshConditionListValue;
exports.getCompareLogic = getCompareLogic;
exports.ToSolution = ToSolution;
exports.setDefaultScheme = setDefaultScheme;
exports.editSchemeInfo = editSchemeInfo;
exports.deleteScheme = deleteScheme;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idObj = {
  isdefault: false,
  queryVisible: false,
  schemeList: [],
  queryList: [],
  compareLogicList: [],
  ToSolution: [],
  textMouseEnterId: -1,
  bAddscheme: false,
  bqueryItem: false,
  currentName: "",
  currentId: -1,
  filterId: "",
  checked: false,
  deleteId: "",
  editSchemeitem: [],
  bEdit: false
};
var $$initialState = _immutable2.default.fromJS({});
var url = exports.url = {
  ReSchemeList: 'filterDesign/getSolutionList',
  ToSolution: 'filterDesign/saveSolution'
};
function doProxy(url, method, params, callback, noUniform) {
  var config = { url: url, method: method, params: params };
  if (noUniform) {
    config.options = { uniform: false };
  }
  (0, _util.proxy)(config).then(function (json) {
    callback(json);
  });
}

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  if (!action || !action.payload || !action.payload.modelId) return $$state;
  switch (action.type) {
    case 'PLATFORM_UI_FilterScheme_Isedit':
      {
        if (action.payload.IsEdit === true) {
          var bEdit = action.payload.IsEdit;
          var modelId = action.payload.modelId;
          $$state = $$state.mergeIn([modelId], {}, { bEdit: bEdit });
          return $$state;
        } else {
          var _bEdit = action.payload.IsEdit;
          var _modelId = action.payload.modelId;
          $$state = $$state.mergeIn([_modelId], {}, { bEdit: _bEdit });
          return $$state;
        }
      }
    case 'PLATFORM_UI_FilterScheme_queryVisible':
      {
        if (action.payload.queryVisible === true) {
          var queryVisible = action.payload.queryVisible;
          var _modelId2 = action.payload.modelId;
          $$state = $$state.mergeIn([_modelId2], {}, { queryVisible: queryVisible });
        } else {
          var _queryVisible = action.payload.queryVisible;
          var _modelId3 = action.payload.modelId;
          $$state = $$state.mergeIn([_modelId3], {}, { queryVisible: _queryVisible });
        }
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_AddScheme':
      {
        if (action.payload.bAddscheme === true) {
          var bAddscheme = action.payload.bAddscheme;
          var _modelId4 = action.payload.modelId;
          $$state = $$state.mergeIn([_modelId4], {}, { bAddscheme: bAddscheme });
        } else {
          var _bAddscheme = action.payload.bAddscheme;
          var _modelId5 = action.payload.modelId;
          $$state = $$state.mergeIn([_modelId5], {}, { bAddscheme: _bAddscheme });
        }
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_IsDefault':
      {
        if (action.payload.isdefault === true) {
          var isdefault = action.payload.isdefault;
          var _modelId6 = action.payload.modelId;
          $$state = $$state.mergeIn([_modelId6], {}, { isdefault: isdefault });
          return $$state;
        } else {
          var _isdefault = action.payload.isdefault;
          var _modelId7 = action.payload.modelId;
          $$state = $$state.mergeIn([_modelId7], {}, { isdefault: _isdefault });
          return $$state;
        }
      }
    case 'PLATFORM_UI_FilterScheme_IsEnterSchemeitem':
      {
        var _modelId8 = action.payload.modelId;
        var schemeList = $$state.toJS()[_modelId8].schemeList;
        if (schemeList && schemeList.length > 0) {
          schemeList.forEach(function (ele, index) {
            if (ele.id == action.payload.id) ele.isMouseEnter = action.payload.bEnter;
            $$state = $$state.mergeIn([_modelId8], {}, { schemeList: schemeList });
          });
        }
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_chooseCondition':
      {
        var _modelId9 = action.payload.modelId;
        var _schemeList = $$state.toJS()[_modelId9].schemeList;
        if (_schemeList && _schemeList.length > 0) {
          _schemeList.forEach(function (element, index) {
            if (element.id == action.payload.id) {
              $$state = $$state.mergeIn([_modelId9], {}, { 'currentId': element.id });
              $$state = $$state.mergeIn([_modelId9], {}, { 'currentName': element.solutionName });
            }
          });
        }
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_schemeData':
      {
        var _modelId10 = action.payload.modelId;
        var _schemeList2 = action.payload.schemeList;
        $$state = $$state.set(_modelId10, _immutable2.default.fromJS(idObj));
        var currentId = -1;
        var currentName = "";
        if (_schemeList2 && _schemeList2.length > 0) {
          _schemeList2.forEach(function (ele, index) {
            if (currentId == -1 || ele.isDefault) {
              currentId = ele.id;
              currentName = ele.solutionName;
              if (!ele.solutionName) {
                currentName = ele.id;
              }
            }
            ele.isMouseEnter = false;
          });
        }
        currentName = currentName ? currentName : undefined;
        $$state = $$state.mergeIn([_modelId10], {}, { currentId: currentId, currentName: currentName, schemeList: _schemeList2 });
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_reSetValue':
      {
        var _modelId11 = action.payload.modelId;
        $$state = $$state.mergeIn([_modelId11], {}, { 'schemeList': action.payload.params.schemeList });
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_queryData':
      {
        var _modelId12 = action.payload.modelId;
        $$state = $$state.mergeIn([_modelId12], {}, { 'queryList': action.payload.queryList });
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_compareLogicData':
      {
        var _modelId13 = action.payload.modelId;
        $$state = $$state.mergeIn([_modelId13], {}, { 'compareLogicList': action.payload.compareLogicList });
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_toSolutionresult':
      {
        var _bAddscheme2 = false;
        var _modelId14 = action.payload.modelId;
        $$state = $$state.mergeIn([_modelId14], {}, { bAddscheme: _bAddscheme2 });
        return $$state;
      }
    case 'PLATFORM_UI_FilterScheme_editschemeInfo':
      {
        var editSchemeitem = action.payload.editSchemeitem;
        var _modelId15 = action.payload.modelId;
        // let compareLogicList = action.payload.reCompareLogic
        $$state = $$state.mergeIn([_modelId15], {}, { editSchemeitem: editSchemeitem });
        return $$state;
      }
    default:
      return $$state;
  }
};

function IsEnterSchemeitem(bEnter, id, modelId) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_IsEnterSchemeitem', { bEnter: bEnter, id: id, modelId: modelId }));
  };
}
function AddScheme(bAddscheme, modelId) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_AddScheme', { bAddscheme: bAddscheme, modelId: modelId }));
  };
}
function IsDefault(isdefault, modelId) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_IsDefault', { isdefault: isdefault, modelId: modelId }));
  };
}
function Isedit(IsEdit, modelId) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_Isedit', { IsEdit: IsEdit, modelId: modelId }));
  };
}
function openQuerylist(queryVisible, modelId) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_queryVisible', { queryVisible: queryVisible, modelId: modelId }));
  };
}
function chooseScheme(id, modelId) {
  return function (dispatch, getState) {
    dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_chooseCondition', { id: id, modelId: modelId }));
  };
}
function getQueryItem(modelId, filterId) {
  return function (dispatch) {
    var config = {
      url: 'filterDesign/getFiltersInfo',
      method: 'GET',
      params: {
        filtersId: filterId
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      var queryList = json.data;
      dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_queryData', { modelId: modelId, queryList: queryList }));
    });
  };
}
function getSchemeListData(modelId, filterId) {
  return function (dispatch, getState) {
    var config = {
      url: 'filterDesign/getSolutionList',
      method: 'POST',
      params: {
        filterId: filterId
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      var schemeList = json.data;
      dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_schemeData', { modelId: modelId, schemeList: schemeList }));
    });
  };
}
function refreshConditionListValue(filterId, schemeListChange, modelId) {
  return function (dispatch, getState) {
    var params = { filterId: filterId };
    var callback = function callback(json) {
      if (json.code === 200) {
        var _params = {};
        var schemeList = json.data;
        _params.schemeList = schemeList;
        dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_reSetValue', { params: _params, modelId: modelId }));
        schemeListChange(schemeList);
      }
      if (json.code !== 200) {
        cb.utils.alert('刷新失败');
      }
    };
    doProxy(url.ReSchemeList, 'POST', params, callback);
  };
}
function getCompareLogic(modelId) {
  return function (dispatch, getState) {
    var config = {
      url: 'enum/getEnumMap',
      method: 'GET',
      params: {
        enumtype: 'compareLogic'
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      var compareLogicList = json.data;
      dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_compareLogicData', { modelId: modelId, compareLogicList: compareLogicList }));
    });
  };
}
function ToSolution(Solutionitem, filtersId, schemeListChange, modelId) {
  return function (dispatch, getState) {
    var params = {};
    params = Solutionitem;
    var callback = function callback(json) {
      if (json.code === 200) {
        dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_toSolutionresult', { modelId: modelId }));
        dispatch(refreshConditionListValue(filtersId, schemeListChange, modelId));
        cb.utils.alert('操作成功', 'success');
      }
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
    };
    doProxy(url.ToSolution, 'POST', params, callback);
  };
}
function setDefaultScheme(id, filtersId, modelId, schemeListChange) {
  return function (dispatch, getState) {
    var config = {
      url: 'filterDesign/setDefaultFilter',
      method: 'GET',
      params: {
        solutionId: id
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      dispatch(refreshConditionListValue(filtersId, schemeListChange, modelId));
    });
  };
}
function editSchemeInfo(id, callback, modelId, reCompareLogic) {
  return function (dispatch, getState) {
    var config = {
      url: 'filter/' + id + '/solutionFilters',
      method: 'GET',
      params: {
        solutionid: id
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      var editSchemeitem = json.data;
      callback(editSchemeitem);
      dispatch((0, _util.genAction)('PLATFORM_UI_FilterScheme_editschemeInfo', { editSchemeitem: editSchemeitem, modelId: modelId }));
    });
  };
}
function deleteScheme(id, filtersId, schemeListChange, modelId) {
  return function (dispatch, getState) {
    var config = {
      url: 'filterDesign/delSolution',
      method: 'GET',
      params: {
        solutionId: id
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      dispatch(refreshConditionListValue(filtersId, schemeListChange, modelId));
    });
  };
}