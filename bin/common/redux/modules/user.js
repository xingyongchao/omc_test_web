'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.usernameChange = usernameChange;
exports.passwordChange = passwordChange;
exports.login = login;
exports.afterLogin = afterLogin;
exports.init = init;
exports.billingInit = billingInit;
exports.logout = logout;
exports.setAccountMsg = setAccountMsg;
exports.setAccountActiveKey = setAccountActiveKey;
exports.getLoginUser = getLoginUser;
exports.changeOrg = changeOrg;
exports.changeStore = changeStore;
exports.changeGrade = changeGrade;
exports.weChatLogin = weChatLogin;
exports.switchInterMode = switchInterMode;
exports.touchLogout = touchLogout;
exports.touchExit = touchExit;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _cookiesJs = require('cookies-js');

var _cookiesJs2 = _interopRequireDefault(_cookiesJs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _env = require('../../../yxyweb/common/helpers/env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../../yxyweb/common/helpers/util');

var _tree = require('../../../yxyweb/common/redux/tree');

var _tabs = require('../../../yxyweb/common/redux/tabs');

var _home = require('./home');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var user = {
  usernameMsg: '',
  passwordMsg: '',
  errorMsg: '',
  id: null,
  username: '',
  password: '',
  corp_id: null,
  pubuts: null,
  bActivate: null,
  bEmailValid: null,
  bMobileValid: null,
  mobile: null,
  salt: null,
  iDeleted: null,
  bCorpRegister: false,
  dataSourceName: null,
  alias: null,
  token: null,
  accountCurrentKey: 'personalInfo',
  enableLogin: process.env.NODE_ENV === 'development' ? true : false
};

var $$initialState = _immutable2.default.fromJS(_extends({}, user, {
  // 登陆状态
  loginStatus: _ActionStatus2.default.READY
}));

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_USER_INIT':
      if (process.env.__CLIENT__) {
        var loginUserBackup = state.get('loginUserBackup');
        if (!loginUserBackup) return state;
        var loginUser = loginUserBackup.toJS();
        cb.rest.AppContext.tenant = loginUser.tenant;
        delete loginUser.tenant;
        cb.rest.AppContext.option = loginUser.option;
        delete loginUser.option;
        cb.rest.AppContext.user = loginUser;
        return state;
      }
      buildUser(action.payload);
      return state.merge(action.payload);
    case 'PLATFORM_DATA_USER_LOGIN':
      return state.set('loginStatus', _ActionStatus2.default.ING);
    case 'PLATFORM_DATA_USER_LOGIN_SUCCEED':
      buildUser(action.payload);
      return state.set('loginStatus', _ActionStatus2.default.SUCCEED).set('errorMsg', '').merge(action.payload);
    case 'PLATFORM_DATA_USER_LOGIN_FAILURE':
      return state.set('loginStatus', _ActionStatus2.default.FAILURE).merge(action.payload);
    case 'PLATFORM_DATA_LOGIN_OUT':
      _cookiesJs2.default.expire('user');
      var nullData = {
        id: null,
        username: '',
        password: '',
        corp_id: null,
        pubuts: null,
        bActivate: null,
        bEmailValid: null,
        bMobileValid: null,
        mobile: null,
        salt: null,
        iDeleted: null,
        bCorpRegister: null,
        dataSourceName: null,
        alias: null,
        token: null
      };
      return state.merge(_extends({}, nullData, { loginStatus: _ActionStatus2.default.READY }));
    case 'PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_MSG':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_ACTIVE_KEY':
      return state.set('accountCurrentKey', action.payload);
    case 'PLATFORM_DATA_USER_ACCOUNT_CHANGE_ORG':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_USER_ACCOUNT_CHANGE_STORE':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_USER_ACCOUNT_CHANGE_GRADE':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_CORP_SYSTEMSET_PASS_LOGO':
      return state.merge({ logo: action.payload });
    default:
      return state;
  }
};

var buildUser = function buildUser(user) {
  var userOrgs = user.userOrgs,
      userStores = user.userStores,
      orgId = user.orgId,
      storeId = user.storeId;

  var defaultOrgName = void 0,
      defaultStoreName = void 0;
  userOrgs && userOrgs.forEach(function (item) {
    if (item.org == orgId) defaultOrgName = item.org_name;
  });
  userStores && userStores.forEach(function (item) {
    if (item.store == storeId) defaultStoreName = item.store_name;
  });
  Object.assign(user, {
    defaultOrgName: defaultOrgName,
    defaultStoreName: defaultStoreName
  });
  user.loginUserBackup = JSON.parse(JSON.stringify(user));
};

function usernameChange(value, usernameMsg) {
  return function (dispatch) {
    var obj = { username: value };
    if (value && usernameMsg) obj.usernameMsg = '';
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', obj));
  };
}

function passwordChange(value, passwordMsg) {
  return function (dispatch) {
    var obj = { password: value };
    if (value && passwordMsg) obj.passwordMsg = '';
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', obj));
  };
}

var clearCache = function clearCache() {
  localStorage.removeItem('defaultGrade');
  localStorage.removeItem('billing_lastBill');
  localStorage.removeItem('billing_lastStatus');
  localStorage.removeItem('billing_lastBillId');
  localStorage.removeItem('billing_printTemplate');
};

//登录
function login(data) {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var usernameMsg, passwordMsg, config, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN'));

              if (!(process.env.NODE_ENV !== 'development' || data.username)) {
                _context.next = 11;
                break;
              }

              usernameMsg = null, passwordMsg = null;

              if (!data.username) usernameMsg = '登录账号不能为空';
              if (!data.password) passwordMsg = '密码不能为空';

              if (!(usernameMsg || passwordMsg)) {
                _context.next = 9;
                break;
              }

              dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', {
                usernameMsg: usernameMsg,
                passwordMsg: passwordMsg
              }));
              closeAwaitModal();
              return _context.abrupt('return');

            case 9:
              _context.next = 13;
              break;

            case 11:
              data.username = 'xmcs001';
              data.password = '123456';

            case 13:
              config = {
                url: _env2.default.HTTP_USER_LOGIN,
                method: 'POST',
                options: { uniform: false, token: false },
                params: data
              };

              if (_env2.default.INTERACTIVE_MODE === 'touch') config.options.timeout = 3000;
              _context.next = 17;
              return (0, _util.proxy)(config);

            case 17:
              json = _context.sent;

              if (!(json.code === 200)) {
                _context.next = 27;
                break;
              }

              localStorage.setItem('token', json.data.token);
              cb.rest.ContextBuilder.construct();

              if (!(json.data.leftTime == -1)) {
                _context.next = 24;
                break;
              }

              cb.route.pushPage('/expire');
              return _context.abrupt('return');

            case 24:

              // localStorage.setItem('token', json.data.token);
              // cb.rest.ContextBuilder.construct();
              dispatch(afterLogin(data));
              _context.next = 29;
              break;

            case 27:
              dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', { errorMsg: json.message }));
              console.error("错误代码：" + json.code + "错误信息：" + json.message);

            case 29:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function afterLogin(data) {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      var callback, config, json, showOptions, rememberAccount;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              callback = typeof data === 'function' ? data : null;
              config = {
                url: 'user/getOrgsAndStores',
                method: 'GET'
              };
              _context2.next = 4;
              return (0, _util.proxy)(config);

            case 4:
              json = _context2.sent;

              if (!(json.code !== 200)) {
                _context2.next = 8;
                break;
              }

              if (callback) callback();else dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', { errorMsg: json.message }));
              return _context2.abrupt('return');

            case 8:

              cb.rest.AppContext.user = json.data;
              config = {
                url: 'tenant/find',
                method: 'GET'
              };
              _context2.next = 12;
              return (0, _util.proxy)(config);

            case 12:
              json = _context2.sent;


              if (json.code === 200) {
                cb.rest.AppContext.user.logo = json.data.logo;
                cb.rest.AppContext.user.tenant = json.data;
              }
              if (_env2.default.INTERACTIVE_MODE !== 'touch' && _env2.default.INTERACTIVE_MODE !== 'self') {
                dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user));
                if (cb.rest.terminalType === 3) {
                  cb.route.replacePage('/');
                } else {
                  cb.route.pushPage('/portal');
                }
              }
              if (json.code === 200) cb.rest.AppContext.tenant = json.data;
              // config = {
              //   url: 'option/getOptionData',
              //   method: 'POST',
              //   params: {
              //     optionId: 'sys_option'
              //   }
              // };
              // json = await proxy(config);
              // const option = {};
              // if (json.code === 200)
              //   Object.assign(option, json.data);
              // config = {
              //   url: 'option/getOptionData',
              //   method: 'POST',
              //   params: {
              //     optionId: 'business_option'
              //   }
              // };
              // json = await proxy(config);
              // if (json.code === 200)
              //   Object.assign(option, json.data);
              // cb.rest.AppContext.option = option;
              _context2.next = 18;
              return (0, _tree.getMenuTree)(dispatch);

            case 18:
              showOptions = _context2.sent;

              showOptions.showStore = false;
              Object.assign(cb.rest.AppContext.user, showOptions);
              dispatch(init(cb.rest.AppContext.user));
              if (!callback) {
                if (data) {
                  if (data.rememberUser) {
                    rememberAccount = { username: data.username };

                    localStorage.setItem('rememberAccount', JSON.stringify(rememberAccount));
                  } else {
                    if (localStorage.getItem('rememberAccount')) localStorage.removeItem('rememberAccount');
                  }
                  clearCache();
                }
              }

            case 23:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
}

var loadOption = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var config, json, option;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            config = {
              url: 'option/getOptionsByParams',
              method: 'POST'
            };
            _context3.next = 3;
            return (0, _util.proxy)(config);

          case 3:
            json = _context3.sent;
            option = {};

            if (json.code === 200) {
              json.data && json.data.forEach(function (item) {
                var name = item.name,
                    value = item.value;

                option[name] = value;
              });
            }
            cb.rest.AppContext.option = option;

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function loadOption() {
    return _ref3.apply(this, arguments);
  };
}();

var afterStoreLoaded = function afterStoreLoaded(showStore) {
  return function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              //await loadOption();
              if (showStore !== false) dispatch(getGrades());

              if (!(cb.rest.terminalType !== 1)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt('return');

            case 3:
              dispatch((0, _tabs.addItem)({
                key: 'PORTAL',
                title: '首页',
                closable: false,
                content: {
                  type: 'platform',
                  url: 'home'
                }
              }));
              dispatch((0, _home.getLayOut)());

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var getGrades = function getGrades() {
  return function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch) {
      var config, json, userGrades, defaultGrade;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              config = {
                url: 'billTemplateSet/getGradeAndEmployee',
                method: 'GET'
              };
              _context5.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context5.sent;

              if (!(json.code !== 200)) {
                _context5.next = 7;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context5.abrupt('return');

            case 7:
              userGrades = json.data.gradeInfo;
              // if (!userGrades.length) return;

              dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', { userGrades: userGrades }));
              defaultGrade = userGrades.find(function (item) {
                var startTime = item.startTime,
                    endTime = item.endTime;

                if (startTime && endTime) return (0, _moment2.default)().isBetween((0, _moment2.default)(startTime, 'HH:mm:ss'), (0, _moment2.default)(endTime, 'HH:mm:ss'));
                return false;
              });

              if (defaultGrade) {
                _context5.next = 13;
                break;
              }

              cb.utils.alert('没有可用的班次', 'error');
              return _context5.abrupt('return');

            case 13:
              dispatch(changeGrade(defaultGrade.id, defaultGrade.name));

            case 14:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
};

function init(loginUser) {
  return function (dispatch, getState) {
    var _ref6 = loginUser || getState().user.toJS(),
        userOrgs = _ref6.userOrgs,
        userStores = _ref6.userStores,
        orgId = _ref6.orgId,
        storeId = _ref6.storeId,
        showOrg = _ref6.showOrg,
        showStore = _ref6.showStore;

    if (!userOrgs && !userStores && !orgId && !storeId && !showOrg && !showStore) return;
    var defaultOrg = void 0,
        defaultStore = void 0;
    if (showStore) {
      var cacheStore = localStorage.getItem('defaultStore');
      if (cacheStore && cacheStore != storeId) {
        if (cacheStore === 'null') {
          defaultStore = { store: null };
        } else {
          defaultStore = userStores.find(function (item) {
            return item.store == cacheStore;
          });
          if (defaultStore) {
            var relatedOrgId = defaultStore.org_id;
            if (!relatedOrgId) localStorage.setItem('defaultOrg', null);else if (relatedOrgId != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', relatedOrgId);
          } else {
            var stores = userStores.filter(function (item) {
              return item.store === storeId;
            });
            if (stores && stores.length) {
              var _relatedOrgId = stores[0].org_id;
              if (!_relatedOrgId) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId);
            } else if (userStores.length) {
              defaultStore = userStores[0];
              localStorage.setItem('defaultStore', defaultStore.store);
              var _relatedOrgId2 = defaultStore.org_id;
              if (!_relatedOrgId2) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId2 != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId2);
            }
          }
        }
      } else {
        var _stores = userStores.filter(function (item) {
          return item.store === storeId;
        });
        if (_stores && _stores.length) {
          var _relatedOrgId3 = _stores[0].org_id;
          if (!_relatedOrgId3) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId3 != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId3);
        } else if (userStores.length) {
          defaultStore = userStores[0];
          localStorage.setItem('defaultStore', defaultStore.store);
          var _relatedOrgId4 = defaultStore.org_id;
          if (!_relatedOrgId4) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId4 != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId4);
        }
      }
    }
    if (showOrg || showStore) {
      var cacheOrg = localStorage.getItem('defaultOrg');
      if (cacheOrg && cacheOrg != orgId) {
        if (cacheOrg === 'null') {
          defaultOrg = { org: null };
        } else {
          defaultOrg = userOrgs.find(function (item) {
            return item.org == cacheOrg;
          });
          if (defaultOrg && showStore && !defaultStore) {
            var _stores2 = userStores.filter(function (item) {
              return item.store === storeId;
            });
            if (_stores2 && _stores2.length) {
              defaultStore = _stores2[0];
            } else if (userStores.length) {
              defaultStore = userStores[0];
              localStorage.setItem('defaultStore', defaultStore.store);
            }
          }
        }
      }
    }
    if (defaultOrg && defaultStore) return dispatch(_changeOrgAndStore(defaultOrg.org, defaultOrg.org_name, defaultStore.store, defaultStore.store_name));
    if (defaultOrg) return dispatch(changeOrg(defaultOrg.org, defaultOrg.org_name, true, showStore));
    if (defaultStore) return dispatch(changeStore(defaultStore.store, defaultStore.store_name, true));
    dispatch(afterStoreLoaded(showStore));
  };
}

function billingInit() {
  return function (dispatch, getState) {
    dispatch(getGrades());
    return;
    var cacheGrade = localStorage.getItem('defaultGrade');
    if (!cacheGrade) return;
    var defaultGrade = JSON.parse(cacheGrade);
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', defaultGrade));
  };
}

//登出
function logout(router) {
  return function (dispatch) {
    // dispatch({
    //   type: 'PLATFORM_DATA_LOGIN_OUT',
    // })
    if (cb.rest.interMode !== 'touch') {
      _cookiesJs2.default.expire('token');
      localStorage.removeItem('token');
    }
    router.push('/login');
    dispatch((0, _tree.clearMenu)());
    dispatch((0, _tabs.clear)());
    dispatch((0, _home.clearLayOut)());
  };
}

// 账户中心
function setAccountMsg(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_MSG', value));
  };
}

function setAccountActiveKey(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_ACTIVE_KEY', value));
  };
}

function getLoginUser() {
  return function (dispatch) {
    var config = {
      url: 'user/getLoginUserByToken',
      method: 'GET'
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_SET_INFO', json.data));
    });
  };
}

function changeOrg(value, name, inner, showStore) {
  return function (dispatch, getState) {
    if (inner) {
      dispatch(_changeOrg(value, name, function () {
        dispatch(afterStoreLoaded(showStore));
      }));
    } else {
      cb.utils.confirm('确定要切换组织吗？该操作将重新刷新页面！', function () {
        dispatch(_changeOrg(value, name, function () {
          clearCache();

          var _getState$user$toJS = getState().user.toJS(),
              userStores = _getState$user$toJS.userStores;

          var stores = userStores.filter(function (item) {
            return item.org_id === value;
          });
          if (stores && stores.length) localStorage.setItem('defaultStore', stores[0].store);else localStorage.setItem('defaultStore', null);
          location.reload();
        }));
      });
    }
  };
}

var _changeOrg = function _changeOrg(value, name, callback) {
  return function (dispatch) {
    var config = {
      url: 'user/changeOrgOrShop',
      method: 'POST',
      params: {
        orgId: value
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }
      var info = { defaultOrgName: name, orgId: value };
      Object.assign(cb.rest.AppContext.user, info);
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_CHANGE_ORG', info));
      localStorage.setItem('defaultOrg', value);
      callback();
    });
  };
};

function changeStore(value, name, inner) {
  return function (dispatch, getState) {
    if (inner) {
      dispatch(_changeStore(value, name, function () {
        dispatch(afterStoreLoaded());
      }));
    } else {
      if (cb.rest.terminalType == 3) {
        dispatch(_changeStore(value, name, function () {
          // dispatch(getGrades());
          // dispatch(genAction('PLATFORM_DATA_USER_ACCOUNT_STORE_CHANGED'));
          clearCache();

          var _getState$user$toJS2 = getState().user.toJS(),
              userStores = _getState$user$toJS2.userStores;

          var stores = userStores.filter(function (item) {
            return item.store === value;
          });
          if (stores && stores.length) localStorage.setItem('defaultOrg', stores[0].org_id);
          dispatch(afterLogin());
        }));
      } else {
        cb.utils.confirm('确定要切换门店吗？该操作将重新刷新页面！', function () {
          dispatch(_changeStore(value, name, function () {
            // dispatch(getGrades());
            // dispatch(genAction('PLATFORM_DATA_USER_ACCOUNT_STORE_CHANGED'));
            clearCache();

            var _getState$user$toJS3 = getState().user.toJS(),
                userStores = _getState$user$toJS3.userStores;

            var stores = userStores.filter(function (item) {
              return item.store === value;
            });
            if (stores && stores.length) localStorage.setItem('defaultOrg', stores[0].org_id);
            location.reload();
          }));
        });
      }
    }
  };
}

var _changeStore = function _changeStore(value, name, callback) {
  return function (dispatch) {
    var config = {
      url: 'user/changeOrgOrShop',
      method: 'POST',
      params: {
        storeId: value
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }
      var info = { defaultStoreName: name, storeId: value };
      Object.assign(cb.rest.AppContext.user, info);
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_CHANGE_STORE', info));
      localStorage.setItem('defaultStore', value);
      callback();
    });
  };
};

var _changeOrgAndStore = function _changeOrgAndStore(orgId, orgName, storeId, storeName) {
  return function (dispatch) {
    var config = {
      url: 'user/changeOrgOrShop',
      method: 'POST',
      params: {
        orgId: orgId,
        storeId: storeId
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }
      var info = { defaultOrgName: orgName, orgId: orgId, defaultStoreName: storeName, storeId: storeId };
      Object.assign(cb.rest.AppContext.user, info);
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', info));
      dispatch(afterStoreLoaded());
    });
  };
};

function changeGrade(value, name) {
  return function (dispatch) {
    var gradeInfo = { defaultGradeName: name, gradeId: value };
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_CHANGE_GRADE', gradeInfo));
    localStorage.setItem('defaultGrade', JSON.stringify(gradeInfo));
  };
}

function weChatLogin() {
  return function (dispatch) {
    var config = {
      url: '/weChat/getWechatQrCode',
      method: 'GET'
    };
    if (process.env.NODE_ENV === 'development') config.params = { debug: true };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        console.error(json.message);
        return;
      }
      window.open(json.data, '_self');
    });
  };
}

function switchInterMode(mode) {
  return function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              config = {
                url: 'user/switchInterMode',
                method: 'GET',
                options: { uniform: false },
                params: { mode: mode }
              };
              _context6.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context6.sent;

              if (!(json.code !== 200)) {
                _context6.next = 7;
                break;
              }

              cb.utils.alert(json.message);
              return _context6.abrupt('return');

            case 7:
              location.href = json.data.redirectUrl;

            case 8:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x6) {
      return _ref7.apply(this, arguments);
    };
  }();
}

function touchLogout() {
  return function (dispatch) {
    debugger;
    cb.route.redirectLoginPage(false);
    dispatch({ type: 'PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_MSG', payload: { password: '' } });
    cb.events.execute('communication', { type: 'DUAL_SCREEN_CLEAR_SETTING' });
    dispatch({ type: 'PLATFORM_UI_BILLING_CLEAR' });
    dispatch({ type: 'PLATFORM_UI_BILLING_TOUCH_LOGOUT' });
  };
}

function touchExit() {
  return function (dispatch) {
    if (typeof Electron === 'undefined') {
      dispatch(touchLogout());
    } else {
      _cookiesJs2.default.expire('token');
      // dispatch(clearMenu());
      // dispatch(clear());
      // dispatch(clearLayOut());
      // cb.events.execute('communication', {type: 'DUAL_SCREEN_CLEAR_SETTING'});
      // dispatch({type: 'PLATFORM_UI_BILLING_CLEAR'});
      // dispatch({type: 'PLATFORM_UI_BILLING_TOUCH_LOGOUT'});
      closeWindow();
    }
  };
}

function closeWindow() {
  setTimeout(function () {
    if (cb.utils.getCookie('token')) {
      closeWindow();
      return;
    }
    Electron.remote.getCurrentWindow().close();
  }, 1000);
}