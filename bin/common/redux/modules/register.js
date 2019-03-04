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

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _env = require('../../../yxyweb/common/helpers/env');

var _env2 = _interopRequireDefault(_env);

var _util = require('../../../yxyweb/common/helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}); /**
     ** 2016-11-24 zhangmyh
     * 建立文件
     */

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
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS', _ActionStatus2.default.ING));
    var options = (0, _util.genFetchOptions)('post', data);
    (0, _isomorphicFetch2.default)('/uniform/register/smscode', options).then(function (response) {
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
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS', _ActionStatus2.default.FAILURE));
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_MSG', { smsCodeMsg: json.message }));
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SMS_CODE_STATUS', _ActionStatus2.default.SUCCESS));
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function checkSmsCode(data) {
  return function (dispatch) {
    if (!data.agreement) {
      dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_MSG', { agreeMsg: '请勾选' }));
      return;
    }
    var options = (0, _util.genFetchOptions)('post', data);
    (0, _isomorphicFetch2.default)('/uniform/register/checksmscode', options).then(function (response) {
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
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_SET_MSG', { agreeMsg: json.message }));
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_REG_NEXT', json.message));
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function saveCorp(data) {
  return function (dispatch) {
    var options = (0, _util.genFetchOptions)('post', data);
    (0, _isomorphicFetch2.default)('/uniform/register/save', options).then(function (response) {
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
        dispatch((0, _util.genAction)('PLATFORM_DATA_REGISTER_SET_OPTIONS', { buttonLoading: false }));
        alert(json.message);
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_REGISTER_SET_OPTIONS', { buttonLoading: false }));
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