'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuTree = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getMenuTree = exports.getMenuTree = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$cacheData = _ref2.cacheData,
        cacheData = _ref2$cacheData === undefined ? null : _ref2$cacheData,
        _ref2$cacheDBData = _ref2.cacheDBData,
        cacheDBData = _ref2$cacheDBData === undefined ? null : _ref2$cacheDBData;

    var config, json, orgMenus, storeMenus, showOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = {
              url: 'getMenuTree',
              method: 'POST',
              options: { uniform: false }
            };

            if (!cacheData) {
              _context.next = 5;
              break;
            }

            _context.t0 = cacheData;
            _context.next = 8;
            break;

          case 5:
            _context.next = 7;
            return (0, _util.proxy)(config);

          case 7:
            _context.t0 = _context.sent;

          case 8:
            json = _context.t0;

            cacheDBData ? cacheDBData.MenuTreeData = json : '';

            if (!(json.code !== 200)) {
              _context.next = 13;
              break;
            }

            cb.utils.alert(json.message, 'error');
            return _context.abrupt('return');

          case 13:
            json.data = json.data || [];
            orgMenus = [], storeMenus = [];

            console.error(_env2.default.INTERACTIVE_MODE);
            (0, _util.rebuildTreeData)(json.data, orgMenus, storeMenus);
            dispatch({
              type: 'PLATFORM_UI_TREE_LOAD',
              TreeData: json.data
            });
            showOptions = {
              showOrg: orgMenus.length ? true : false,
              showStore: storeMenus.length ? true : false
            };

            if (showOptions.showStore) {
              showOptions.canBilling = storeMenus.find(function (item) {
                return item.code.indexOf('RM0101') > -1;
              }) ? true : false;
            }
            dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', showOptions));
            return _context.abrupt('return', showOptions);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMenuTree(_x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.tree = tree;
exports.clearMenu = clearMenu;
exports.treeload = treeload;
exports.TreeNodeLoad = TreeNodeLoad;
exports.setHandler = setHandler;
exports.execHandler = execHandler;
exports.moreButtonHandler = moreButtonHandler;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _env = require('../helpers/env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by wxk on 2016/7/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var id = 1;
var $$initialState = _immutable2.default.fromJS({
  id: id,
  TreeData: []
});

function tree() {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  var status = void 0,
      account = void 0;
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

function clearMenu() {
  return { type: 'PLATFORM_UI_TREE_LOAD', TreeData: [] };
}

function treeload(callback) {
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

    var options = (0, _util.genFetchOptions)('post');
    fetch('/getMenuTree?token=' + getState().user.get('token'), options).then(function (response) {
      //console.log(response);
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (json) {
      return (0, _util.auth)(json, dispatch);
    }).then(function (json) {
      //console.log(json);
      if (!json) return;
      callback();
      var orgMenus = [],
          storeMenus = [];
      (0, _util.rebuildTreeData)(json.data, orgMenus, storeMenus);
      dispatch({
        type: 'PLATFORM_UI_TREE_LOAD',
        TreeData: json.data
      });
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', {
        showOrg: orgMenus.length ? true : false,
        showStore: storeMenus.length ? true : false
      }));
    });
  };
}

function TreeNodeLoad(value, CallBack) {
  var options = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'bill',
      billNo: value
    })
  };
  return function (dispatch) {
    fetch('/meta', options).then(function (response) {
      //console.log(response);
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (json) {
      //console.log('TREE_NODE_LOAD');
      //console.log(json);
      dispatch({
        type: 'PLATFORM_UI_TREE_NODE_LOAD'
        //TreeNode : json
      });
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

var handler = null;

function setHandler(data) {
  return function (dispatch) {
    handler = data;
  };
}

var recursiveFind = function recursiveFind(list, code, data) {
  if (!list.length) return;
  list.forEach(function (item) {
    if (item.children) {
      recursiveFind(item.children, code, data);
    } else {
      if (item.code !== code) return;
      data.push(item);
    }
  });
};

var doCommonVisit = function doCommonVisit(menuCode) {
  var config = {
    url: 'commonfuctions/visits',
    method: 'GET',
    params: { menuCode: menuCode }
  };
  (0, _util.proxy)(config);
};

function execHandler(menuCode, carryData, callback) {
  return function (dispatch, getState) {
    var portalTreeData = getState().tree.toJS().TreeData;
    if (!portalTreeData) return;
    try {
      menuCode = JSON.parse(menuCode);
    } catch (e) {}
    var returnData = [];
    if ((typeof menuCode === 'undefined' ? 'undefined' : _typeof(menuCode)) === 'object') {
      returnData.push(menuCode);
      menuCode = menuCode.code;
    } else {
      recursiveFind(portalTreeData, menuCode, returnData);
      if (returnData.length !== 1) {
        cb.utils.alert('\u6CA1\u6709\u627E\u7740\u7F16\u7801\u4E3A' + menuCode + '\u7684\u83DC\u5355', 'error');
        return;
      }
      doCommonVisit(menuCode);
    }
    var menuData = returnData[0];
    var filterCondition = null;
    if (carryData) {
      var query = carryData.query,
          title = carryData.title,
          condition = carryData.condition;

      if (condition) {
        filterCondition = condition;
        if (query) {
          menuCode += '_' + query;
          menuData.key = menuCode;
        }
        if (title) menuData.name = title;
      } else {
        var key = query.key,
            value = query.value;

        menuCode += '_' + value;
        var menuUrl = '?' + key + '=' + value;
        menuData.key = menuCode;
        if (title) menuData.name = title;
        menuData.menuUrl = menuUrl;
      }
    }
    handler(menuCode, menuData, filterCondition, callback);
  };
}

function moreButtonHandler(menuCode, menuData, filterCondition) {
  return function (dispatch) {
    handler(menuCode, menuData, filterCondition);
  };
}