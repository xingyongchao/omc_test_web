'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSmsCodeStatus = setSmsCodeStatus;
exports.setButtonEnabled = setButtonEnabled;
exports.setOptionChecked = setOptionChecked;
exports.setPhoneNumber = setPhoneNumber;
exports.getSmsCode = getSmsCode;
exports.checkSmsCode = checkSmsCode;
exports.saveCorp = saveCorp;
exports.setPsdIsOpen = setPsdIsOpen;
exports.setValidPsd = setValidPsd;
exports.setPsdErrorMsg = setPsdErrorMsg;
exports.setConfirmPd = setConfirmPd;
exports.setConfirmPsdMsg = setConfirmPsdMsg;
exports.setSecondStepButtonEnabled = setSecondStepButtonEnabled;
exports.setErrorMsg = setErrorMsg;
exports.getIndustry = getIndustry;
exports.checkRepeat = checkRepeat;
exports.setOptions = setOptions;
exports.clear = clear;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _util = require('../../../yxyweb/common/helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var $$initialState = _immutable2.default.fromJS({
  current: 0,
  smsCodeStatus: _ActionStatus2.default.READY,
  getSmsCodeButtonEnabled: false,
  firstStepButtonEnabled: false,
  validCodeMsg: '',
  smsCodeMsg: '',
  agreeMsg: '',
  psdIsOpen: false,
  validPsd: '',
  psdErrorMsg: '',
  confirmPsdMsg: '',
  confirmPsd: '',
  phoneNumber: '',
  secondStepButtonAnabled: false
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS':
      return state.set('smsCodeStatus', action.payload);
    case 'PLATFORM_DATA_CORP_REG_SET_BUTTON_ENABLED':
    case 'PLATFORM_DATA_CORP_REG_SET_MSG':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_CORP_REG_SET_PHONE_NUMBER':
      return state.set('phoneNumber', action.payload);
    case 'PLATFORM_DATA_CORP_REG_NEXT':
      return state.set('current', state.get('current') + 1);
    case 'PLATFORM_DATA_USER_REG_SUCCEED':
      return state.merge({
        errorMsg: '注册完成，请开通企业账户',
        registered: true
      });
    case 'PLATFORM_DATA_CORP_REG_FAILED':
      return state.merge({ errorMsg: action.payload });
    case 'PLATFORM_DATA_CORP_REG_PSD_ISOPEN':
      return state.set('psdIsOpen', action.payload);
    case 'PLATFORM_DATA_CORP_REG_VALID_PSD':
      return state.merge({ validPsd: action.payload, psdErrorMsg: '' });
    case 'PLATFORM_DATA_CORP_REG_PSD_ERROR_MSG':
      return state.merge({ psdErrorMsg: 1, validPsd: '' });
    case 'PLATFORM_DATA_CORP_REG_CONFIRM_PSD':
      return state.set('confirmPsd', action.payload);
    case 'PLATFORM_DATA_CORP_REG_CONFIRM_PSD_MSG':
      return state.set('confirmPsdMsg', action.payload);
    case 'PLATFORM_DATA_CORP_REG_SECOND_STEP_BUTTON_ENABLED':
      return state.set('secondStepButtonAnabled', action.payload);
    case 'PLATFORM_DATA_CORP_REG_SET_ERROR_MSG':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_REGISTER_SET_OPTIONS':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_REGISTER_CLEAR':
      return $$initialState;
    default:
      return state;
  }
};

function setSmsCodeStatus(status) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS', status));
  };
}

function setButtonEnabled(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_BUTTON_ENABLED', value));
  };
}

function setOptionChecked(checked) {
  return function (dispatch) {
    if (checked) dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_MSG', { agreeMsg: '' }));
  };
}

function setPhoneNumber(number) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_PHONE_NUMBER', number));
  };
}

function getSmsCode(data) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS', _ActionStatus2.default.ING));
              config = {
                url: 'weChat/smsCodeExsitMobile',
                method: 'POST',
                params: data
              };
              _context.next = 4;
              return (0, _util.proxy)(config);

            case 4:
              json = _context.sent;

              if (json.code != 200) {
                dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS', _ActionStatus2.default.FAILURE));
                dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_MSG', { smsCodeMsg: json.message }));
              } else {
                dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS', _ActionStatus2.default.SUCCESS));
              }

            case 6:
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

function checkSmsCode(data) {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (data.agreement) {
                _context2.next = 3;
                break;
              }

              dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_MSG', { agreeMsg: '请勾选' }));
              return _context2.abrupt('return');

            case 3:
              config = {
                url: 'weChat/bindExistUser',
                method: 'POST',
                params: data,
                options: { uniform: false }
              };
              _context2.next = 6;
              return (0, _util.proxy)(config);

            case 6:
              json = _context2.sent;

              if (json.code != 200) {
                dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_MSG', { agreeMsg: json.message }));
              } else {
                location.href = '/portal';
              }

            case 8:
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

function saveCorp(data) {
  return function (dispatch) {
    var options = genFetchOptions('post', data);
    fetch('/uniform/register/save', options).then(function (response) {
      debugger;
      if (response.status >= 400) {
        return {
          code: response.status,
          message: response.url + response.statusText,
          response: response
        };
      }
      return response.json();
    }).then(function (json) {
      if (json.code != 200) {
        // dispatch(genAction('PLATFORM_DATA_CORP_REG_NEXT', json.message));
        alert(json.message);
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_NEXT', json.message));
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function setPsdIsOpen(flag) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_PSD_ISOPEN', flag));
  };
}

function setValidPsd(val) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_VALID_PSD', val));
  };
}

function setPsdErrorMsg(val) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_PSD_ERROR_MSG', val));
  };
}

function setConfirmPd(val) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_CONFIRM_PSD', val));
  };
}

function setConfirmPsdMsg(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_CONFIRM_PSD_MSG', value));
  };
}

function setSecondStepButtonEnabled(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SECOND_STEP_BUTTON_ENABLED', value));
  };
}

function setErrorMsg(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_ERROR_MSG', value));
  };
}

function getIndustry() {
  return function (dispatch) {
    var config = {
      url: 'enum/getIndustryEnumMap',
      method: 'GET',
      options: { token: false }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code === 200) {
        dispatch((0, _util.genAction)('PLATFORM_DATA_REGISTER_SET_OPTIONS', { industryDataSource: json.data }));
      } else if (json.code !== 200) {
        alert(json.message, 'error');
      }
    });
  };
}

function checkRepeat(type, value) {
  return function (dispatch) {
    var config = {
      url: 'register/checkRegInfoExsit',
      method: 'GET',
      options: { token: false },
      params: {
        name: type,
        value: value
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code === 200) {
        var dataSource = {};
        dataSource['checkRepeat_' + type] = '';
        dispatch((0, _util.genAction)('PLATFORM_DATA_REGISTER_SET_OPTIONS', dataSource));
      } else if (json.code !== 200) {
        var data = {};
        data['checkRepeat_' + type] = json.message;
        dispatch((0, _util.genAction)('PLATFORM_DATA_REGISTER_SET_OPTIONS', data));
      }
    });
  };
}

function setOptions(obj) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_REGISTER_SET_OPTIONS', obj));
  };
}

function clear() {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_REGISTER_CLEAR'));
  };
}