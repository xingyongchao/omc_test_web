'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _antd = require('antd');

var _cookiesJs = require('cookies-js');

var _cookiesJs2 = _interopRequireDefault(_cookiesJs);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _register = require('../../redux/modules/register');

var regactions = _interopRequireWildcard(_register);

var _user = require('../../redux/modules/user');

var useractions = _interopRequireWildcard(_user);

var _systemSetting = require('../../redux/modules/systemSetting');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tick = function (_Component) {
  _inherits(Tick, _Component);

  function Tick(props) {
    _classCallCheck(this, Tick);

    var _this = _possibleConstructorReturn(this, (Tick.__proto__ || Object.getPrototypeOf(Tick)).call(this, props));

    _this.state = {
      seconds: 60
    };
    return _this;
  }

  _createClass(Tick, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setInterval(function () {
        return _this2.tick();
      }, 1000);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.intervals = [];
    }
  }, {
    key: 'setInterval',
    value: function (_setInterval) {
      function setInterval() {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function () {
      this.intervals.push(setInterval.apply(null, arguments));
    })
  }, {
    key: 'clearInterval',
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      this.intervals.forEach(clearInterval);
    })
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearInterval();
    }
  }, {
    key: 'tick',
    value: function tick() {
      var seconds = this.state.seconds - 1;
      if (seconds === 0) {
        this.clearInterval();
        if (this.props.clear) this.props.clear();
      }
      this.setState({ seconds: seconds });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'p',
        null,
        this.state.seconds,
        's'
      );
    }
  }]);

  return Tick;
}(_react.Component);

var FirstComponent = function (_Component2) {
  _inherits(FirstComponent, _Component2);

  function FirstComponent(props) {
    _classCallCheck(this, FirstComponent);

    var _this3 = _possibleConstructorReturn(this, (FirstComponent.__proto__ || Object.getPrototypeOf(FirstComponent)).call(this, props));

    if (process.env.__CLIENT__) {
      _cookiesJs2.default.set('uretailsessionid', (0, _uuid2.default)());
      _this3.validCodeUrl = '/register/validcode';
      _this3.state = {
        url: _this3.getValidCodeUrl()
      };
    }
    _this3.validPhone = false;
    _this3.validCode = null;
    _this3.smsCode = null;
    _this3.phoneFisrtOnBlur = false; // phone触发onblur
    return _this3;
  }

  _createClass(FirstComponent, [{
    key: 'isValidPhone',
    value: function isValidPhone(str) {
      var pattern = /^1[3|4|5|7|8][0-9]{9}$/;
      return pattern.test(str) ? true : false;
    }
  }, {
    key: 'getValidCodeUrl',
    value: function getValidCodeUrl() {
      return this.validCodeUrl + '?_=' + new Date().valueOf();
    }
  }, {
    key: 'setButtonEnabled',
    value: function setButtonEnabled() {
      var _props = this.props,
          regactions = _props.regactions,
          reg = _props.reg;

      var getSmsCodeButtonEnabled = this.validPhone && this.validCode && !reg.checkRepeat_mobile;
      var firstStepButtonEnabled = getSmsCodeButtonEnabled && this.smsCode;
      regactions.setButtonEnabled({
        getSmsCodeButtonEnabled: getSmsCodeButtonEnabled,
        firstStepButtonEnabled: firstStepButtonEnabled
      });
    }
  }, {
    key: 'handlePhoneChange',
    value: function handlePhoneChange(e) {
      this.phoneFisrtOnBlur = true;
      var regactions = this.props.regactions;

      this.validPhone = this.isValidPhone(e.target.value);
      if (this.validPhone) {
        regactions.setPhoneNumber(e.target.value);
        regactions.checkRepeat('mobile', e.target.value);
      } else {
        regactions.setPhoneNumber('');
      }
      this.setButtonEnabled();
    }
  }, {
    key: 'handlePhoneChangeMsg',
    value: function handlePhoneChangeMsg() {
      var status = null,
          text = null;
      if (!this.phoneFisrtOnBlur) return { status: status, text: text };
      var _props$reg = this.props.reg,
          checkRepeat_mobile = _props$reg.checkRepeat_mobile,
          phoneNumber = _props$reg.phoneNumber;

      if (phoneNumber) {
        if (checkRepeat_mobile) {
          status = 'error';
          text = checkRepeat_mobile;
        }
      } else {
        status = 'error';
        text = '手机号码格式不对';
      }
      return { status: status, text: text };
    }
  }, {
    key: 'handleValidCodeChange',
    value: function handleValidCodeChange(e) {
      this.validCode = e.target.value;
      this.setButtonEnabled();
    }
  }, {
    key: 'handleSmsCodeChange',
    value: function handleSmsCodeChange(e) {
      this.smsCode = e.target.value;
      this.setButtonEnabled();
    }
  }, {
    key: 'handleRefresh',
    value: function handleRefresh() {
      this.setState({ url: this.getValidCodeUrl() });
    }
  }, {
    key: 'handleSmsCode',
    value: function handleSmsCode() {
      var _props2 = this.props,
          form = _props2.form,
          regactions = _props2.regactions;

      var formValue = {},
          isError = false;
      form.validateFieldsAndScroll(function (err, values) {
        if (err) isError = true;
        formValue = values;
      });
      if (isError) return;
      regactions.getSmsCode(formValue);
    }
  }, {
    key: 'handleTickClear',
    value: function handleTickClear() {
      var regactions = this.props.regactions;

      regactions.setSmsCodeStatus(_ActionStatus2.default.READY);
    }
  }, {
    key: 'handleChecked',
    value: function handleChecked(e) {
      var regactions = this.props.regactions;

      regactions.setOptionChecked(e.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var FormItem = _antd.Form.Item;
      var _props3 = this.props,
          reg = _props3.reg,
          form = _props3.form;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 18 },
          sm: { span: 18 }
        }
      };
      var tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 11,
            offset: 6
          }
        }
      };
      var imgCom = process.env.__CLIENT__ ? _react2.default.createElement('img', { src: this.state.url }) : null;
      var disabled = !reg.getSmsCodeButtonEnabled || reg.smsCodeStatus === _ActionStatus2.default.ING || reg.smsCodeStatus === _ActionStatus2.default.SUCCESS;
      var tickCom = reg.smsCodeStatus === _ActionStatus2.default.SUCCESS ? _react2.default.createElement(Tick, { clear: function clear() {
          return _this4.handleTickClear();
        } }) : '获取验证码';
      var validCodeValidation = {
        validateStatus: reg.validCodeMsg ? 'error' : null,
        help: reg.validCodeMsg ? reg.validCodeMsg : null
      };
      var smsCodeValidation = {
        validateStatus: reg.smsCodeMsg ? 'error' : null,
        help: reg.smsCodeMsg ? reg.smsCodeMsg : null
      };
      var agreeValidation = {
        validateStatus: reg.agreeMsg ? 'error' : null,
        help: reg.agreeMsg ? reg.agreeMsg : null
      };
      var phoneValidation = {
        validateStatus: this.handlePhoneChangeMsg().status,
        help: this.handlePhoneChangeMsg().text
      };
      return _react2.default.createElement(
        _antd.Form,
        { className: 'register-list' },
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u624B\u673A\u53F7' }, formItemLayout, phoneValidation),
          getFieldDecorator('phone', {
            rules: [{ message: '' }, {/*{ validator: this.handlePhoneChangeMsg }*/}],
            validateTrigger: 'onBlur'
          })(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', onBlur: function onBlur(e) {
              return _this4.handlePhoneChange(e);
            } }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({}, formItemLayout, validCodeValidation, {
            label: '\u56FE\u7247\u9A8C\u8BC1\u7801'
          }),
          _react2.default.createElement(
            _antd.Row,
            { gutter: 12 },
            _react2.default.createElement(
              _antd.Col,
              { span: 16 },
              getFieldDecorator('validCode')(_react2.default.createElement(_antd.Input, { size: 'large', onChange: function onChange(e) {
                  return _this4.handleValidCodeChange(e);
                } }))
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 8 },
              _react2.default.createElement(
                'a',
                { className: 'verify-img', size: 'large', onClick: function onClick() {
                    return _this4.handleRefresh();
                  } },
                imgCom
              )
            )
          )
        ),
        _react2.default.createElement(
          FormItem,
          _extends({}, formItemLayout, smsCodeValidation, {
            label: '\u624B\u673A\u9A8C\u8BC1\u7801'
          }),
          _react2.default.createElement(
            _antd.Row,
            { gutter: 12 },
            _react2.default.createElement(
              _antd.Col,
              { span: 16 },
              getFieldDecorator('smsCode')(_react2.default.createElement(_antd.Input, { size: 'large', onChange: function onChange(e) {
                  return _this4.handleSmsCodeChange(e);
                } }))
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 8 },
              _react2.default.createElement(
                _antd.Button,
                { type: 'primary', size: 'large', disabled: disabled, onClick: function onClick() {
                    return _this4.handleSmsCode();
                  } },
                tickCom
              )
            )
          )
        ),
        reg.agreeMsg ? _react2.default.createElement(
          'div',
          { className: 'register_agreeMsg' },
          reg.agreeMsg
        ) : null,
        _react2.default.createElement(
          FormItem,
          _extends({}, tailFormItemLayout, { className: 'checkbox-txt' }),
          getFieldDecorator('agreement', {
            valuePropName: 'checked',
            initialValue: true
          })(_react2.default.createElement(
            _antd.Checkbox,
            { onChange: function onChange(e) {
                return _this4.handleChecked(e);
              } },
            '\u5DF2\u9605\u8BFB\u5E76\u540C\u610F',
            _react2.default.createElement(
              'a',
              { className: 'active', href: 'http://www.yyuap.com/page/service/book/yonyou_cloud/index.html#/yonyou_cloud/articles/yycloud/4-/fuwuxieyi.html ' },
              '\u7528\u53CB\u4E91\u5E73\u53F0\u670D\u52A1\u534F\u8BAE'
            )
          ))
        )
      );
    }
  }]);

  return FirstComponent;
}(_react.Component);

var FirstStep = _antd.Form.create({})(FirstComponent);

var SecondComponent = function (_Component3) {
  _inherits(SecondComponent, _Component3);

  function SecondComponent(props) {
    _classCallCheck(this, SecondComponent);

    var _this5 = _possibleConstructorReturn(this, (SecondComponent.__proto__ || Object.getPrototypeOf(SecondComponent)).call(this, props));

    _this5.validPsd = false; //有效密码
    _this5.validConfirmPsd = false; //有效确认密码
    _this5.validCorpName = false; //有效公司名称
    _this5.validAntdFields = false; //antd的验证
    _this5.codeFisrtOnBlur = false;
    _this5.emailFisrtOnBlur = false;
    _this5.aliasFisrtOnBlur = false;
    return _this5;
  }

  _createClass(SecondComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var err = nextProps.form.getFieldsError();
      var values = nextProps.form.getFieldsValue();
      this.validAntdFields = true;
      for (var item in err) {
        if (err[item]) this.validAntdFields = false;
      }
      for (var key in values) {
        if (key == 'contact') continue;
        if (values[key] === undefined) this.validAntdFields = false;
      }
      this.setSecondStepButton();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.regactions.getIndustry();
    }
  }, {
    key: 'handlePsdIsOpen',
    value: function handlePsdIsOpen() {
      var regactions = this.props.regactions;
      var reg = this.props.reg;

      var flag;
      if (!reg.psdIsOpen) flag = true;
      if (reg.psdIsOpen) flag = false;
      regactions.setPsdIsOpen(flag);
    }
  }, {
    key: 'psdIconType',
    value: function psdIconType() {
      var reg = this.props.reg;

      if (reg.psdIsOpen) {
        return 'password-show';
      } else {
        return 'password-hide';
      }
    }
  }, {
    key: 'inputType',
    value: function inputType() {
      var reg = this.props.reg;

      if (reg.psdIsOpen) {
        return 'text';
      } else {
        return 'password';
      }
    }
  }, {
    key: 'isValidPsd',
    value: function isValidPsd(val) {
      // const regs = /^[\w]{6,20}$/;
      var regs = /^[!@#$%\^&*\(\)\{\}\[\];.,\/\|+\-=:"'<>?\w]{6,20}$/;
      return regs.test(val) ? true : false;
    }
  }, {
    key: 'handleCorpNameChange',
    value: function handleCorpNameChange(e) {
      var _this6 = this;

      var regactions = this.props.regactions;

      var pattern = /[\u4e00-\u9fa5a-zA-Z]{4,20}/;
      var isValidCorpName = true;
      if (isValidCorpName) {
        regactions.setErrorMsg({ corpNameMsg: '' });
        this.validCorpName = true;
        this.props.getTaxNo(e.target.value, function (data) {
          _this6.props.form.setFieldsValue({ taxId: data });
        });
      } else {
        regactions.setErrorMsg({ corpNameMsg: '1' });
        this.validCorpName = false;
      }
    }
  }, {
    key: 'corpNameChange',
    value: function corpNameChange(value) {
      this.props.form.setFieldsValue({ taxId: '' });
    }
  }, {
    key: 'handlePsdChange',
    value: function handlePsdChange(e) {
      var _props4 = this.props,
          form = _props4.form,
          reg = _props4.reg,
          regactions = _props4.regactions;

      if (this.isValidPsd(e.target.value)) {
        var middle = e.target.value;
        if (reg.confirmPsd == middle) {
          this.confirmPsdMsg = true;
          regactions.setConfirmPsdMsg('');
        } else {
          if (reg.confirmPsd !== '') {
            this.confirmPsdMsg = false;
            regactions.setConfirmPsdMsg(1);
          }
        }
        this.validPsd = true;
        regactions.setValidPsd(e.target.value);
      } else {
        this.validPsd = false;
        regactions.setPsdErrorMsg(e.target.value); //发送密码不合格时的错误信息
      }
    }
  }, {
    key: 'handleConfirmPsdChange',
    value: function handleConfirmPsdChange(e) {
      var _props5 = this.props,
          reg = _props5.reg,
          regactions = _props5.regactions;

      if (e.target.value == reg.validPsd) {
        this.validConfirmPsd = true;
        regactions.setConfirmPsdMsg('');
      } else {
        this.validConfirmPsd = false;
        regactions.setConfirmPsdMsg(1);
      }
      regactions.setConfirmPd(e.target.value);
    }
  }, {
    key: 'setSecondStepButton',
    value: function setSecondStepButton() {
      var _props6 = this.props,
          reg = _props6.reg,
          regactions = _props6.regactions;

      var flags = this.validCorpName && this.validPsd && this.validConfirmPsd && this.validAntdFields; //随时可加更多验证条目
      regactions.setSecondStepButtonEnabled(flags);
    }
  }, {
    key: 'userNameBlur',
    value: function userNameBlur(e) {
      var _props7 = this.props,
          regactions = _props7.regactions,
          reg = _props7.reg;

      this.codeFisrtOnBlur = true;
      regactions.setOptions({ userName: e.target.value });
      if (e.target.value) {
        regactions.checkRepeat('code', e.target.value);
      }
    }
  }, {
    key: 'handleUserNameMsg',
    value: function handleUserNameMsg() {
      var status = null,
          text = null;
      if (!this.codeFisrtOnBlur) return { status: status, text: text };
      var _props$reg2 = this.props.reg,
          checkRepeat_code = _props$reg2.checkRepeat_code,
          userName = _props$reg2.userName;

      if (userName) {
        if (checkRepeat_code) {
          status = 'error';
          text = checkRepeat_code;
        }
      } else {
        status = 'error';
        text = '登录账号不能为空';
      }
      return { status: status, text: text };
    }
  }, {
    key: 'emailBlur',
    value: function emailBlur(e) {
      var value = e.target.value;
      var _props8 = this.props,
          regactions = _props8.regactions,
          reg = _props8.reg;

      this.emailFisrtOnBlur = true;
      var pattern = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      var isEmail = pattern.test(reg.contact_email) ? true : false;
      regactions.setOptions({ contact_email: value });
      if (isEmail) {
        regactions.checkRepeat('email', value);
      }
    }
  }, {
    key: 'handleEmailMsg',
    value: function handleEmailMsg() {
      var _props9 = this.props,
          reg = _props9.reg,
          regactions = _props9.regactions;

      var pattern = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
      var isEmail = pattern.test(reg.contact_email) ? true : false;
      var text = null,
          status = null;
      if (!this.emailFisrtOnBlur) return { status: status, text: text };
      if (isEmail) {
        if (reg.checkRepeat_email) {
          status = 'error';
          text = reg.checkRepeat_email;
        }
      } else {
        if (reg.contact_email) {
          status = 'error';
          text = '邮箱格式不合法';
        } else {
          status = 'error';
          text = '邮箱不能为空';
        }
      }
      return { status: status, text: text };
    }
  }, {
    key: 'aliasBlur',
    value: function aliasBlur(e) {
      var regactions = this.props.regactions;

      this.aliasFisrtOnBlur = true;
      var pattern = /^[\w]{4,18}$/;
      var isAlias = pattern.test(e.target.value) ? true : false;
      if (isAlias) {
        regactions.checkRepeat('alias', e.target.value);
      }
      regactions.setOptions({ corp_alias: e.target.value });
    }
  }, {
    key: 'handleAliasMsg',
    value: function handleAliasMsg() {
      var _props10 = this.props,
          reg = _props10.reg,
          regactions = _props10.regactions;

      var pattern = /^[\w]{4,18}$/;
      var isAlias = pattern.test(reg.corp_alias) ? true : false;
      var text = null,
          status = null;
      if (!this.aliasFisrtOnBlur) return { status: status, text: text };
      if (isAlias) {
        if (reg.checkRepeat_alias) {
          status = 'error';
          text = reg.checkRepeat_alias;
        }
      } else {
        if (reg.corp_alias) {
          status = 'error';
          text = '公司别名代码不合法';
        } else {
          status = 'error';
          text = '公司别名代码不能为空';
        }
      }
      return { status: status, text: text };
    }
  }, {
    key: 'handleIndustryChange',
    value: function handleIndustryChange(key) {
      this.props.regactions.setOptions({ industry: key });
    }
  }, {
    key: 'getIndustryOptions',
    value: function getIndustryOptions() {
      var data = this.props.reg.industryDataSource;
      var arr = [];
      for (var attr in data) {
        arr.push(_react2.default.createElement(
          _antd.Select.Option,
          { key: attr },
          data[attr]
        ));
      }
      return arr;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var FormItem = _antd.Form.Item;
      var _props11 = this.props,
          reg = _props11.reg,
          form = _props11.form;
      var getFieldDecorator = form.getFieldDecorator;
      var industryDataSource = reg.industryDataSource,
          industry = reg.industry;

      var industry_data = industryDataSource ? this.getIndustryOptions() : null;
      var formItemLayout = {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 18 },
          sm: { span: 18 }
        }
      };
      var tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 11,
            offset: 6
          }
        }
      };
      var CorpNameValidation = {
        validateStatus: reg.corpNameMsg ? 'error' : null,
        help: reg.corpNameMsg ? '公司名称不合法' : null
      };
      var passwordValidation = {
        validateStatus: reg.psdErrorMsg ? 'error' : null,
        help: reg.psdErrorMsg ? '密码不符合格式要求(6-20位数字或字母,不允许有空格)' : null
      };
      var confirmPsdValidation = {
        validateStatus: reg.confirmPsdMsg ? 'error' : null,
        help: reg.confirmPsdMsg ? '两次密码输入不一致' : null
      };
      var userNameValidation = {
        validateStatus: this.handleUserNameMsg().status,
        help: this.handleUserNameMsg().text
      };
      var emailValidation = {
        validateStatus: this.handleEmailMsg().status,
        help: this.handleEmailMsg().text
      };
      var aliasValidation = {
        validateStatus: this.handleAliasMsg().status,
        help: this.handleAliasMsg().text
      };
      return _react2.default.createElement(
        _antd.Form,
        { className: 'register-list' },
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u767B\u5F55\u8D26\u53F7' }, formItemLayout, userNameValidation),
          getFieldDecorator('username', {
            rules: [{
              message: '', required: true
            }]
          })(_react2.default.createElement(_antd.Input, { onBlur: function onBlur(e) {
              return _this7.userNameBlur(e);
            }, placeholder: '\u8BF7\u8F93\u5165\u8D26\u53F7' }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u767B\u5F55\u5BC6\u7801' }, formItemLayout, passwordValidation),
          getFieldDecorator('password', {
            rules: [{
              message: '登录密码必输', required: true
            }]
          })(_react2.default.createElement(
            'div',
            { className: 'register-password' },
            _react2.default.createElement(_antd.Input, { size: 'large', onBlur: function onBlur(e) {
                return _this7.handlePsdChange(e);
              }, type: this.inputType(), placeholder: '\u8BF7\u8F93\u51656~20\u4F4D\u6570\u5B57\u548C\u5B57\u6BCD\u7EC4\u5408' }),
            _react2.default.createElement(_antd.Icon, { onClick: function onClick() {
                return _this7.handlePsdIsOpen();
              }, type: this.psdIconType() })
          ))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u786E\u8BA4\u5BC6\u7801' }, formItemLayout, confirmPsdValidation),
          getFieldDecorator('password_confirm', {
            rules: [{
              message: '确认密码必输', required: true
            }]
          })(_react2.default.createElement(_antd.Input, { type: 'password', onBlur: function onBlur(e) {
              return _this7.handleConfirmPsdChange(e);
            }, placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801' }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u90AE\u7BB1' }, formItemLayout, emailValidation),
          getFieldDecorator('contact_email', {
            rules: [{
              message: '', required: true
            }]
          })(_react2.default.createElement(_antd.Input, { onBlur: function onBlur(e) {
              return _this7.emailBlur(e);
            }, placeholder: '\u8BF7\u8F93\u5165\u90AE\u7BB1' }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u516C\u53F8\u540D\u79F0' }, CorpNameValidation, formItemLayout),
          getFieldDecorator('corp_name', {
            rules: [{ message: '公司名称必输', required: true }]
          })(_react2.default.createElement(_antd.Input, { onChange: function onChange(value) {
              return _this7.corpNameChange(value);
            }, onBlur: function onBlur(e) {
              return _this7.handleCorpNameChange(e);
            }, placeholder: '\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0 ' }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u516C\u53F8\u7A0E\u53F7' }, formItemLayout),
          getFieldDecorator('taxId', {
            rules: [{ message: '' }]
          })(_react2.default.createElement(_antd.Input, { placeholder: '\u516C\u53F8\u7A0E\u53F7' }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u522B\u540D\u4EE3\u7801' }, formItemLayout, aliasValidation),
          getFieldDecorator('corp_alias', {
            rules: [{
              message: '', required: true
            }]
          })(_react2.default.createElement(_antd.Input, { onBlur: function onBlur(e) {
              return _this7.aliasBlur(e);
            }, placeholder: '\u8BF7\u8F93\u51654~18\u4F4D\u6570\u5B57\u548C\u5B57\u6BCD\u7EC4\u5408' }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u6240\u5C5E\u884C\u4E1A' }, formItemLayout),
          getFieldDecorator('industry', {
            rules: [{
              message: '所属行业必输', required: true
            }]
          })(_react2.default.createElement(
            _antd.Select,
            { setFieldsValue: industry ? industry : '', onChange: function onChange(key) {
                return _this7.handleIndustryChange(key);
              }, placeholder: '\u8BF7\u9009\u62E9\u884C\u4E1A' },
            industry_data
          ))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u8054\u7CFB\u4EBA\u59D3\u540D' }, formItemLayout),
          getFieldDecorator('contact', {
            rules: [{
              message: ''
            }]
          })(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u8054\u7CFB\u4EBA\u59D3\u540D' }))
        )
      );
    }
  }]);

  return SecondComponent;
}(_react.Component);

var SecondStep = _antd.Form.create({})(SecondComponent);

var ThirdStep = function (_Component4) {
  _inherits(ThirdStep, _Component4);

  function ThirdStep(props) {
    _classCallCheck(this, ThirdStep);

    return _possibleConstructorReturn(this, (ThirdStep.__proto__ || Object.getPrototypeOf(ThirdStep)).call(this, props));
  }

  _createClass(ThirdStep, [{
    key: 'render',
    value: function render() {
      var reg = this.props.reg;

      return _react2.default.createElement(
        'div',
        { className: 'register-list register-list-03' },
        _react2.default.createElement(
          'h3',
          null,
          '\u606D\u559C ',
          reg.userName
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u6CE8\u518C\u6210\u529F\u5566!'
        )
      );
    }
  }]);

  return ThirdStep;
}(_react.Component);

var content = _react2.default.createElement(
  'div',
  { className: 'tootip-txt' },
  _react2.default.createElement('span', null),
  _react2.default.createElement(
    'p',
    null,
    '\u626B\u7801\u4E0B\u8F7D\u624B\u673AAPP'
  )
);
var Step = _antd.Steps.Step;
var icons = ['#icon-gerenxinxi', '#icon-zuzhi', '#icon-chenggong'];
var steps = [{
  title: '个人信息'
}, {
  title: '企业信息'
}, {
  title: '注册成功'
}];

var Register = function (_React$Component) {
  _inherits(Register, _React$Component);

  function Register() {
    _classCallCheck(this, Register);

    return _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).apply(this, arguments));
  }

  _createClass(Register, [{
    key: 'next',
    value: function next() {
      var _props12 = this.props,
          reg = _props12.reg,
          regactions = _props12.regactions;

      var formValue = null,
          isError = false;
      if (reg.current === 0) {
        this.refs.first.validateFieldsAndScroll(function (err, values) {
          if (err) isError = true;
          formValue = values;
        });
        if (isError) return;
        regactions.checkSmsCode(formValue);
      } else if (reg.current === 1) {
        this.refs.second.validateFieldsAndScroll(function (err, values) {
          if (err) isError = true;
          formValue = values;
          formValue.phoneNumber = reg.phoneNumber;
        });
        if (isError) return;
        regactions.setErrorMsg({ userName: formValue.username });
        regactions.setOptions({ buttonLoading: true });
        regactions.saveCorp(formValue);
      }
    }
  }, {
    key: 'checkPassowrd',
    value: function checkPassowrd(rule, value, callback) {
      var form = this.props.form;
      if (value && value !== form.getFieldValue('pwd')) {
        callback('两次密码输入不一致');
      } else {
        callback();
      }
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin() {
      this.context.router.history.push('/login');
    }
  }, {
    key: 'fillIcon',
    value: function fillIcon(index) {
      for (var i = 0, len = steps.length; i < len; i++) {
        steps[i].icon = icons[i];
        if (i <= index) steps[i].icon += '_hover';
      }
    }
  }, {
    key: 'immediateExperience',
    value: function immediateExperience() {
      var _props13 = this.props,
          reg = _props13.reg,
          useractions = _props13.useractions,
          regactions = _props13.regactions;

      regactions.clear();
      this.context.router.history.push('/login');
      var loginData = {};
      loginData.username = reg.userName;
      loginData.password = reg.validPsd;
      loginData.loginTime = (0, _moment2.default)().format('YYYY-MM-DD');
      useractions.login(loginData);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

      var _props14 = this.props,
          reg = _props14.reg,
          regactions = _props14.regactions,
          getTaxNo = _props14.getTaxNo;

      this.fillIcon(reg.current);
      var stepContent = null;
      switch (reg.current) {
        case 0:
          stepContent = _react2.default.createElement(FirstStep, { ref: 'first', reg: reg, regactions: regactions });
          break;
        case 1:
          stepContent = _react2.default.createElement(SecondStep, { ref: 'second', reg: reg, getTaxNo: getTaxNo, regactions: regactions });
          break;
        case 2:
          stepContent = _react2.default.createElement(ThirdStep, { reg: reg, regactions: regactions });
          break;
      }
      return _react2.default.createElement(
        'div',
        { className: 'bg-gray' },
        _react2.default.createElement(
          'div',
          { className: 'login-nav' },
          _react2.default.createElement(
            'div',
            { className: 'login-main' },
            _react2.default.createElement(
              'div',
              { className: 'login-left' },
              _react2.default.createElement('span', { className: 'logo-img' }),
              _react2.default.createElement(
                'em',
                null,
                '\u4F01\u4E1A\u6CE8\u518C'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'login-right' },
              _react2.default.createElement(
                'li',
                null,
                '\u6211\u5DF2\u6CE8\u518C\uFF1F ',
                _react2.default.createElement(
                  'a',
                  { onClick: function onClick() {
                      return _this10.handleLogin();
                    }, className: 'btn-reg' },
                  '\u7ACB\u5373\u767B\u5F55'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'register-bg' },
          _react2.default.createElement('div', { className: 'img' }),
          _react2.default.createElement(
            'div',
            { className: 'register-title' },
            _react2.default.createElement('span', { className: 'reg-pic' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'register-main' },
            _react2.default.createElement(
              'div',
              { className: 'register-box' },
              _react2.default.createElement(
                _antd.Steps,
                { current: reg.current },
                steps.map(function (item) {
                  return _react2.default.createElement(Step, { key: item.title, title: item.title, icon: _react2.default.createElement(
                      'svg',
                      { className: 'icon', 'aria-hidden': 'true' },
                      _react2.default.createElement('use', { href: item.icon })
                    ) });
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'steps-content' },
                stepContent
              ),
              _react2.default.createElement(
                'div',
                { className: 'steps-action' },
                _react2.default.createElement(
                  'div',
                  { className: 'btn-block' },
                  reg.current === 0 && _react2.default.createElement(
                    _antd.Button,
                    { type: 'primary', disabled: !reg.firstStepButtonEnabled, onClick: function onClick() {
                        return _this10.next();
                      } },
                    '\u4E0B\u4E00\u6B65'
                  )
                ),
                reg.current === steps.length - 1 && _react2.default.createElement(
                  'div',
                  { className: 'btn-inline' },
                  _react2.default.createElement(
                    _antd.Button,
                    { type: 'primary', onClick: function onClick() {
                        return _this10.immediateExperience();
                      } },
                    '\u7ACB\u5373\u767B\u5F55'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'btn-block', style: { marginTop: '40px' } },
                  reg.current === 1 && _react2.default.createElement(
                    _antd.Button,
                    { type: 'primary', loading: reg.buttonLoading ? true : false, disabled: !reg.secondStepButtonAnabled, onClick: function onClick() {
                        return _this10.next();
                      } },
                    reg.buttonLoading ? '注册中...' : '下一步'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'footer-new' },
          '\xA92018 \u7528\u53CB\u7F51\u7EDC\u79D1\u6280\u80A1\u4EFD\u6709\u9650\u516C\u53F8.All rights reserved.'
        )
      );
    }
  }]);

  return Register;
}(_react2.default.Component);

Register.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    reg: state.register.toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    regactions: (0, _redux.bindActionCreators)(regactions, dispatch),
    useractions: (0, _redux.bindActionCreators)(useractions, dispatch),
    getTaxNo: (0, _redux.bindActionCreators)(_systemSetting.getTaxNo, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Register);