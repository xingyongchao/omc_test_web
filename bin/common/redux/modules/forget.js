'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSmsCodeStatus = setSmsCodeStatus;
exports.setPhoneNumber = setPhoneNumber;
exports.setSmsCodeValue = setSmsCodeValue;
exports.getSmsCode = getSmsCode;
exports.checkSmsCode = checkSmsCode;
exports.saveCorp = saveCorp;
exports.setPsdIsOpen = setPsdIsOpen;
exports.setValidPsd = setValidPsd;
exports.setPsdErrorMsg = setPsdErrorMsg;
exports.setConfirmPd = setConfirmPd;
exports.setConfirmPsdMsg = setConfirmPsdMsg;
exports.setMsg = setMsg;
exports.unMount = unMount;
exports.getResetPhoneSmsCode = getResetPhoneSmsCode;
exports.checkResetPhoneSmsCode = checkResetPhoneSmsCode;
exports.save = save;

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ** 2016-11-24 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * 建立文件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var $$initialState = _immutable2.default.fromJS({
  current: 0,
  smsCodeStatus: _ActionStatus2.default.READY,
  //   getSmsCodeButtonEnabled: false,
  //   firstStepButtonEnabled: false,
  //   validCodeMsg: '',
  smsCodeValue: '',
  smsCodeMsg: '',
  //   agreeMsg: '',
  psdIsOpen: false,
  validPsd: '',
  psdErrorMsg: '',
  confirmPsdMsg: '',
  confirmPsd: '',
  phoneNumber: '',
  phoneMsg: false
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS':
      return state.set('smsCodeStatus', action.payload);
    case 'PLATFORM_DATA_CORP_FORGET_SET_SMS_CODE_VALUE':
      return state.set('smsCodeValue', action.payload);
    // case 'PLATFORM_DATA_CORP_REG_SET_BUTTON_ENABLED':
    case 'PLATFORM_DATA_CORP_FORGET_SET_MSG':
      return state.merge(action.payload);
    case 'PLATFORM_DATA_CORP_FORGET_SET_PHONE_NUMBER':
      return state.set('phoneNumber', action.payload);
    case 'PLATFORM_DATA_CORP_FORGET_NEXT':
      return state.set('current', state.get('current') + 1);
    // case 'PLATFORM_DATA_USER_REG_SUCCEED':
    //   return state
    //     .merge({
    //       errorMsg: '注册完成，请开通企业账户',
    //       registered: true
    //     })
    // case 'PLATFORM_DATA_CORP_REG_FAILED':
    //   return state.merge({ errorMsg: action.payload });
    case 'PLATFORM_DATA_CORP_FORGET_PSD_ISOPEN':
      return state.set('psdIsOpen', action.payload);
    case 'PLATFORM_DATA_CORP_FORGET_VALID_PSD':
      return state.merge({ validPsd: action.payload, psdErrorMsg: '' });
    case 'PLATFORM_DATA_CORP_FORGET_PSD_ERROR_MSG':
      return state.merge({ psdErrorMsg: 1, validPsd: '' });
    case 'PLATFORM_DATA_CORP_FORGET_CONFIRM_PSD':
      return state.set('confirmPsd', action.payload);
    case 'PLATFORM_DATA_CORP_FORGET_CONFIRM_PSD_MSG':
      return state.set('confirmPsdMsg', action.payload);
    case 'PLATFORM_DATA_CORP_FORGET_RESET_PHONE':
      return state.set('resetPhone', action.payload);
    case 'PLATFORM_DATA_CORP_FORGET_UNMOUNT':
      return $$initialState;
    case 'PLATFORM_DATA_CORP_FORGET_SET_OPTIONS':
      return state.merge(action.payload);
    default:
      return state;
  }
};

function setSmsCodeStatus(status) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS', status));
  };
}

// export function setButtonEnabled(value) {
//   return function (dispatch) {
//     dispatch(genAction('PLATFORM_DATA_CORP_REG_SET_BUTTON_ENABLED', value));
//   }
// }

// export function setOptionChecked(checked) {
//   return function (dispatch) {
//     if (checked)
//       dispatch(genAction('PLATFORM_DATA_CORP_REG_SET_MSG', { agreeMsg: '' }));
//   }
// }

function setPhoneNumber(number) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_PHONE_NUMBER', number));
  };
}

function setSmsCodeValue(number) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_SMS_CODE_VALUE', number));
  };
}

function getSmsCode(data) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS', _ActionStatus2.default.ING));
    var options = (0, _util.genFetchOptions)('post', data);
    (0, _isomorphicFetch2.default)('/uniform/user/smscode', options).then(function (response) {
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
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS', _ActionStatus2.default.FAILURE));
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_MSG', { smsCodeMsg: json.message }));
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS', _ActionStatus2.default.SUCCESS));
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function checkSmsCode(data) {
  return function (dispatch) {
    // if (!data.agreement) {
    //   dispatch(genAction('PLATFORM_DATA_CORP_REG_SET_MSG', { agreeMsg: '请勾选' }));
    //   return;
    // }
    var options = (0, _util.genFetchOptions)('post', data);
    (0, _isomorphicFetch2.default)('/uniform/user/checksmscode', options).then(function (response) {
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
        // dispatch(genAction('PLATFORM_DATA_CORP_FORGET_SET_MSG', { agreeMsg: json.message }));
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_NEXT', json.message));
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function saveCorp(data) {
  return function (dispatch) {
    var options = (0, _util.genFetchOptions)('post', data);
    (0, _isomorphicFetch2.default)('/uniform/user/resetpwd', options).then(function (response) {
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
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_NEXT', json.message));
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_NEXT', json.message));
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function setPsdIsOpen(flag) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_PSD_ISOPEN', flag));
  };
}

function setValidPsd(val) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_VALID_PSD', val));
  };
}

function setPsdErrorMsg(val) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_PSD_ERROR_MSG', val));
  };
}

function setConfirmPd(val) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_CONFIRM_PSD', val));
  };
}

function setConfirmPsdMsg(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_CONFIRM_PSD_MSG', value));
  };
}

function setMsg(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_MSG', value));
  };
}

//修改手机号 accountModal
function unMount() {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_UNMOUNT'));
  };
}

function getResetPhoneSmsCode(data) {
  return function (dispatch) {
    // dispatch(genAction('PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS', ActionStatus.ING));
    var options = (0, _util.genFetchOptions)('get');
    var context = cb.rest.AppContext;
    (0, _isomorphicFetch2.default)('/uniform/user/sendsms/' + data.phone + '?token=' + context.token, options).then(function (response) {
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
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS', _ActionStatus2.default.FAILURE));
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_MSG', { smsCodeMsg: json.message }));
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SMS_CODE_STATUS', _ActionStatus2.default.SUCCESS));
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function checkResetPhoneSmsCode(data) {
  return function (dispatch) {
    var options = (0, _util.genFetchOptions)('post', data);
    var context = cb.rest.AppContext;
    // dispatch(genAction('PLATFORM_DATA_CORP_FORGET_SET_MSG', { agreeErrorMsg: '' }));
    (0, _isomorphicFetch2.default)('/uniform/user/resetphone?token=' + context.token, options).then(function (response) {
      // dispatch(genAction('PLATFORM_DATA_CORP_FORGET_SET_MSG', { agreeErrorMsg: response.message }));
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
        // dispatch(genAction('PLATFORM_DATA_CORP_FORGET_SET_MSG', { agreeErrorMsg: json.message }));
        cb.utils.alert('' + json.message, 'error');
      } else {
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_RESET_PHONE', data.phone));
        dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_MSG', { visible: false, phoneNumber: '', phoneMsg: false, smsCodeMsg: '', smsCodeStatus: _ActionStatus2.default.READY }));
        cb.utils.alert('修改成功!', 'success');
        console.log(json, json.message);
      }
    }).catch(function (ex) {
      return { code: 404, message: ex };
    });
  };
}

function save(obj, form) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var config, josn;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = {
                url: '/user/changepwd',
                method: 'POST',
                params: {
                  password: obj.old_password,
                  newPassword: obj.password
                }
              };
              _context.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              josn = _context.sent;

              if (josn.code !== 200) {
                dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_OPTIONS', { saveErrMsg: josn.message }));
                console.error(josn.message);
              } else {
                dispatch((0, _util.genAction)('PLATFORM_DATA_CORP_FORGET_SET_OPTIONS', { saveErrMsg: null, validPsd: '', confirmPsd: '' }));
                // form.setFieldsValue({old_password: '', password: '', password_confirm: ''})
                form.resetFields();
                cb.utils.alert('修改密码成功！', 'success');
              }

            case 5:
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