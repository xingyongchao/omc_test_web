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

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _wechat = require('../../redux/modules/wechat');

var regactions = _interopRequireWildcard(_wechat);

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
        // regactions.checkRepeat('mobile', e.target.value)
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
        _react2.default.createElement(
          FormItem,
          _extends({}, tailFormItemLayout, { className: 'checkbox-txt' }, agreeValidation),
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

var WeChat = function (_Component3) {
  _inherits(WeChat, _Component3);

  function WeChat() {
    _classCallCheck(this, WeChat);

    return _possibleConstructorReturn(this, (WeChat.__proto__ || Object.getPrototypeOf(WeChat)).apply(this, arguments));
  }

  _createClass(WeChat, [{
    key: 'next',
    value: function next() {
      var _props4 = this.props,
          reg = _props4.reg,
          regactions = _props4.regactions;

      var formValue = null,
          isError = false;
      this.refs.first.validateFieldsAndScroll(function (err, values) {
        if (err) isError = true;
        formValue = values;
      });
      if (isError) return;
      regactions.checkSmsCode(formValue);
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin() {
      this.context.router.history.push('/login');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props5 = this.props,
          reg = _props5.reg,
          regactions = _props5.regactions;

      var stepContent = _react2.default.createElement(FirstStep, { ref: 'first', reg: reg, regactions: regactions });
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
                '\u5FAE\u4FE1\u7ED1\u5B9A'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'login-right' },
              _react2.default.createElement(
                'li',
                null,
                '\u5DF2\u6709\u8D26\u53F7\uFF1F ',
                _react2.default.createElement(
                  'a',
                  { onClick: function onClick() {
                      return _this6.handleLogin();
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
                'div',
                { className: 'steps-content' },
                _react2.default.createElement(
                  'div',
                  { className: 'wechat_register_tip' },
                  ' ',
                  _react2.default.createElement(
                    'p',
                    null,
                    ' Hi\uFF0C\u8981\u5148\u7ED1\u5B9A\u624B\u673A\u53F7\u624D\u80FD\u767B\u5F55\u54E6~'
                  )
                ),
                stepContent
              ),
              _react2.default.createElement(
                'div',
                { className: 'steps-action' },
                _react2.default.createElement(
                  'div',
                  { className: 'btn-block' },
                  _react2.default.createElement(
                    _antd.Button,
                    { type: 'primary', disabled: !reg.firstStepButtonEnabled, onClick: function onClick() {
                        return _this6.next();
                      } },
                    '\u7ED1\u5B9A'
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

  return WeChat;
}(_react.Component);

WeChat.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    reg: state.wechat.toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    regactions: (0, _redux.bindActionCreators)(regactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WeChat);