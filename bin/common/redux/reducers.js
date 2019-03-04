'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _portal = require('../../yxyweb/common/redux/portal');

var _portal2 = _interopRequireDefault(_portal);

var _user = require('./modules/user');

var _user2 = _interopRequireDefault(_user);

var _register = require('./modules/register');

var _register2 = _interopRequireDefault(_register);

var _wechat = require('./modules/wechat');

var _wechat2 = _interopRequireDefault(_wechat);

var _tree = require('../../yxyweb/common/redux/tree');

var _tabs = require('../../yxyweb/common/redux/tabs');

var _userDefineArchives = require('../../yxyweb/common/redux/userDefineArchives');

var _userDefineArchives2 = _interopRequireDefault(_userDefineArchives);

var _dynamicModal = require('../../yxyweb/common/redux/dynamicModal');

var _dynamicModal2 = _interopRequireDefault(_dynamicModal);

var _forget = require('./modules/forget');

var _forget2 = _interopRequireDefault(_forget);

var _print = require('../../yxyweb/common/redux/print');

var _print2 = _interopRequireDefault(_print);

var _billDesign = require('../../yxyweb/common/redux/billDesign');

var _billDesign2 = _interopRequireDefault(_billDesign);

var _home = require('./modules/home');

var _home2 = _interopRequireDefault(_home);

var _systemSetting = require('../../yxyweb/common/redux/systemSetting');

var _systemSetting2 = _interopRequireDefault(_systemSetting);

var _loading = require('../../yxyweb/common/redux/loading');

var _loading2 = _interopRequireDefault(_loading);

var _groupCondition = require('../../yxyweb/common/redux/groupCondition');

var _groupCondition2 = _interopRequireDefault(_groupCondition);

var _formula = require('../../yxyweb/common/redux/formula');

var _formula2 = _interopRequireDefault(_formula);

var _addMessage = require('../../yxyweb/common/redux/addMessage');

var _addMessage2 = _interopRequireDefault(_addMessage);

var _filterscheme = require('../../yxyweb/common/redux/filterscheme');

var _filterscheme2 = _interopRequireDefault(_filterscheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  portal: _portal2.default,
  user: _user2.default,
  register: _register2.default,
  wechat: _wechat2.default,
  forget: _forget2.default,
  tree: _tree.tree,
  tabs: _tabs.tabs,
  userDefineArchives: _userDefineArchives2.default,
  dynamicModal: _dynamicModal2.default,
  print: _print2.default,
  billDesign: _billDesign2.default,
  home: _home2.default,
  systemSetting: _systemSetting2.default,
  routing: _reactRouterRedux.routerReducer,
  loading: _loading2.default,
  groupCondition: _groupCondition2.default,
  formula: _formula2.default,
  addMessage: _addMessage2.default,
  filterscheme: _filterscheme2.default
});