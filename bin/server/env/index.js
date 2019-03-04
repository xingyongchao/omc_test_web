'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('../../yxyweb/common/helpers/util');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localPath = 'localhost';
if (process.env.IP === 'true') {
  (function () {
    //获取本机ip
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var ips = [];

    var _loop = function _loop(dev) {
      var alias = 0;
      ifaces[dev].forEach(function (details) {
        if (details.family == 'IPv4') {
          //console.log(dev+(alias?':'+alias:''),details.address);
          ips.push(details.address);
          ++alias;
        }
      });
    };

    for (var dev in ifaces) {
      _loop(dev);
    }

    localPath = ips[1];
  })();
}

var parseUrl = function parseUrl(url) {
  if (!url) return url;
  if (url.substr(url.length - 1, 1) === '/') url = url.substr(0, url.length - 1);
  return url;
};

var HTTP_SERVICE_BASEURL = parseUrl(process.env.SRV_URL) || 'http://localhost:8080/uretail';
var HTTP_PRINT_SERVER = parseUrl(process.env.PRINT_SERVER) || 'http://localhost:8080/print_service';
var HTTP_UPDATELOG_SERVER = parseUrl(process.env.UPDATELOG_SERVER) || 'https://uretailserver.yonyoucloud.com/uretail';

var env = {
  PORTAL_LOG_DIR: _path2.default.join(process.cwd(), 'logs'),
  PORTAL_LOG_LEVEL: 'info',
  HTTP_SCRIPT_BASEURL: 'http://' + localPath + ':' + (process.env.SCRIPT_PORT || 3004) + '/static',
  HTTP_SCRIPT_SUFFIX: '',
  HTTP_SERVER_PORT: process.env.SERVER_PORT || 3003,
  HTTP_SERVICE_BASEURL: HTTP_SERVICE_BASEURL,
  HTTP_PRINT_SERVER: HTTP_PRINT_SERVER,
  HTTP_UPDATELOG_SERVER: HTTP_UPDATELOG_SERVER,
  HTTP_CONTENT_TYPE: {
    JSON: 'application/json',
    PDF: 'application/pdf',
    XLS: 'application/vnd.ms-excel',
    FORM: 'multipart/form-data'
  },
  // 关于用户的ajax接口
  HTTP_USER_AUTHENTICATION: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/user/login?terminaltype=PC'),
  HTTP_USER_REG_CORP: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/register/registerCorp'),
  HTTP_USER_CREATE_ACC: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/register/addCorpAccount'),
  HTTP_USER_VERIFYTOKEN: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/login/token?terminaltype=PC&token={0}'),
  HTTP_USER_FETCH_METABYMENU: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/billmeta/getbill'),
  HTTP_USER_FETCH_METABYBILLMAKER: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/makebillmeta/getBill'),
  HTTP_USER_FETCH_METABYBILLNO: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/menu/getMetaByMenu'),
  HTTP_USER_FETCH_TREE: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/menu/getMenuTree?token={0}&terminalType={1}'),
  HTTP_USER_FETCH_TREE_NODE: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/menu/getMetaByMenu'),
  HTTP_USER_FETCH_OPTIONMETA: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/option/getOptionMeta'),
  HTTP_USER_FETCH_OPTIONDATA: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/option/getOptionData'),
  HTTP_USER_FETCH_PROCESSMETA: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/billproc/vm'),
  HTTP_USER_FETCH_TPLLIST: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/billmeta/tpllist'),
  HTTP_USER_FETCH_BILLMETA: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/billmeta/group'),
  HTTP_USER_POST_BILLMETA: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/billmeta/groupset'),
  HTTP_USER_COR_ACC: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/login/getCorpAccounts'), //gen()
  HTTP_USER_ORG: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/login/getUserOrgs'),
  HTTP_USER_UPLOAD: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/pub/fileupload/upload'),
  HTTP_USER_UPLOAD2LOCAL: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/pub/fileupload/upload2Local'),
  HTTP_USER_VALIDCODE: (0, _util.combine)(HTTP_SERVICE_BASEURL, '/register/validcode'),
  AUTH_WHITELIST: ['/', '/register', '/wechat', '/login', '/login/touch', '/login/self', '/logout', '/forget', '/expire', '/uniform/user/smscode', '/uniform/user/checksmscode', '/uniform/user/resetpwd', '/user/login', '/user/authorize', '/user/registercorp', '/user/getCorpAccounts', '/user/getUserOrgs', '/register/validcode', '/uniform/register/smscode', '/uniform/register/checksmscode', '/uniform/register/save', '/uniform/register/checkRegInfoExsit', '/uniform/enum/getIndustryEnumMap', '/uniform/tenant/getTaxNo', '/uniform/weChat/getWechatQrCode', '/weChat/callback', '/weChat/callbacktest', '/uniform/weChat/smsCodeExsitMobile', '/weChat/bindExistUser', '/meta/voucherlist/aa_productlist', '/test/fetch', '/package/checkUpdate', '/thirdparty/check', '/discount', '/billing/second', new RegExp('/sourcemap/*'), new RegExp('/demo/*'), /\.(html|js|css|png|gif|jpg|ico|map|apk|crt)$/]
};

if (process.env.NODE_ENV === 'production') {
  var version = void 0,
      packageVersion = void 0;
  try {
    version = require('../../version.json').version;
  } catch (e) {
    version = '';
  }
  try {
    packageVersion = require('../../package.version.json').version;
  } catch (e) {
    packageVersion = '';
  }
  Object.assign(env, {
    PORTAL_LOG_LEVEL: 'error',
    HTTP_SCRIPT_BASEURL: '',
    HTTP_SCRIPT_SUFFIX: '.min',
    STATIC_RANDOM_SUFFIX: version,
    PACKAGE_VERSION: packageVersion
  });
}
console.log(_chalk2.default.red.bold('局域网可访问地址 >>>>>>>>>>> http://' + localPath + ':' + env.HTTP_SERVER_PORT));
console.log(_chalk2.default.blue.bold('服务器接口地址 >>>>>>>>>>> ' + env.HTTP_SERVICE_BASEURL));

exports.default = env;