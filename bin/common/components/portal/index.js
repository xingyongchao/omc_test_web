'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _systemSetting = require('../system-setting');

var SystemSetting = _interopRequireWildcard(_systemSetting);

var _accountCenter = require('../account-center');

var AccountCenter = _interopRequireWildcard(_accountCenter);

var _home = require('../home');

var Home = _interopRequireWildcard(_home);

var _authority = require('../../../yxyweb/common/components/authority');

var Authority = _interopRequireWildcard(_authority);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// export LeftMenu from './LeftMenu';
// export TopMenu from './TopMenu';
// export Tabs from './Tabs';
// export PortalTabItem from './PortalTabItem';
var PortalComponents = {
  'system-setting': SystemSetting,
  'account-center': AccountCenter,
  'home': Home,
  'authority': Authority
};

exports.default = PortalComponents;