'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.companyInfoMerge = companyInfoMerge;
exports.passLogo = passLogo;
exports.unMount = unMount;
exports.getApi = getApi;
exports.openUdh = openUdh;
exports.getTaxNo = getTaxNo;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _env = require('../../../yxyweb/common/helpers/env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../../yxyweb/common/helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var $$initialState = _immutable2.default.fromJS({
  logo: null
  // companyInfo_errMsg: {nameErrMsg:null,aliasErrMsg:null,industryErrMsg:null,regionErrMsg:null,addressErrMsg:null,contactErrMsg:null,phoneErrMsg:null}
});

var clearState = _immutable2.default.fromJS({});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_DATA_CORP_SYSTEMSET_COMPANY_INFO_MERGE':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_CORP_SYSTEMSET_UNMOUNT':
      return clearState;
    case 'PLATFORM_DATA_CORP_SYSTEMSET_GET_API':
      return state.set('apiInfo', action.payload);
    case 'PLATFORM_DATA_CORP_SYSTEMSET_COMPANY_INFO_SET_TAXID':
      return state.mergeDeepIn(['dataSource'], action.payload);
    default:
      return state;
  }
};

function companyInfoMerge(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_SYSTEMSET_COMPANY_INFO_MERGE', value));
  };
}
function passLogo(url) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_SYSTEMSET_PASS_LOGO', url));
  };
}
function unMount() {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_SYSTEMSET_UNMOUNT'));
  };
}

function getApi() {
  return function (dispatch) {
    var config = {
      url: 'apiUser/add',
      method: 'GET'
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }
      dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_SYSTEMSET_GET_API', json.data));
    });
  };
}

function openUdh() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = {
                url: 'register/openUdh',
                method: 'GET'
              };
              _context.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context.sent;

              if (!(json.code !== 200)) {
                _context.next = 7;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context.abrupt('return');

            case 7:
              dispatch(companyInfoMerge({ hasOpenUdh: true }));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function getTaxNo(name, callback) {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              config = {
                url: 'tenant/getTaxNo',
                method: 'GET',
                params: {
                  companyName: name
                }
              };
              _context2.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context2.sent;

              if (!(json.code !== 200)) {
                _context2.next = 7;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context2.abrupt('return');

            case 7:
              if (!callback) {
                _context2.next = 10;
                break;
              }

              callback(json.data);
              return _context2.abrupt('return');

            case 10:
              dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_SYSTEMSET_COMPANY_INFO_MERGE', { taxId: json.data }));

            case 11:
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