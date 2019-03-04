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

var _forget = require('../../redux/modules/forget');

var forgetactions = _interopRequireWildcard(_forget);

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

    _this3.handlePhoneChangeMsg = function (rule, value, callback) {
      var forgetactions = _this3.props.forgetactions;

      if (_this3.isValidPhone(value)) {
        callback();
        forgetactions.setPhoneNumber(value);
      } else {
        callback('手机号码格式不对');
        forgetactions.setPhoneNumber('');
      }
    };

    _this3.handleSmsCodeChangeMsg = function (rule, value, callback) {
      var forgetactions = _this3.props.forgetactions;

      if (!value) {
        callback('验证码不能为空');
      } else {
        callback();
      }
    };

    if (process.env.__CLIENT__) {
      _cookiesJs2.default.set('uretailsessionid', (0, _uuid2.default)());
    }
    _this3.validPhone = false;
    _this3.smsCode = false;
    return _this3;
  }

  _createClass(FirstComponent, [{
    key: 'isValidPhone',
    value: function isValidPhone(str) {
      var pattern = /^1[3|4|5|7|8][0-9]{9}$/;
      return pattern.test(str) ? true : false;
    }
  }, {
    key: 'handleSmsCodeChange',
    value: function handleSmsCodeChange(e) {
      var forgetactions = this.props.forgetactions;

      if (e.target.value) {
        forgetactions.setSmsCodeValue(e.target.value);
      } else {
        forgetactions.setSmsCodeValue('');
      }
    }
  }, {
    key: 'handleSmsCode',
    value: function handleSmsCode() {
      var _props = this.props,
          form = _props.form,
          forgetactions = _props.forgetactions;

      var formValue = {},
          isError = false;
      form.validateFieldsAndScroll(['phone'], function (err, values) {
        if (err) isError = true;
        formValue = values;
      });
      if (isError) return;
      forgetactions.getSmsCode(formValue);
    }
  }, {
    key: 'handleTickClear',
    value: function handleTickClear() {
      var forgetactions = this.props.forgetactions;

      forgetactions.setSmsCodeStatus(_ActionStatus2.default.READY);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var FormItem = _antd.Form.Item;
      var _props2 = this.props,
          forget = _props2.forget,
          form = _props2.form;
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
      var disabled = forget.phoneNumber === '' || forget.smsCodeStatus === _ActionStatus2.default.ING || forget.smsCodeStatus === _ActionStatus2.default.SUCCESS;
      var tickCom = forget.smsCodeStatus === _ActionStatus2.default.SUCCESS ? _react2.default.createElement(Tick, { clear: function clear() {
          return _this4.handleTickClear();
        } }) : '获取验证码';
      var validCodeValidation = {
        validateStatus: forget.validCodeMsg ? 'error' : null,
        help: forget.validCodeMsg ? forget.validCodeMsg : null
      };
      var smsCodeValidation = {
        validateStatus: forget.smsCodeMsg ? 'error' : null,
        help: forget.smsCodeMsg ? forget.smsCodeMsg : null
      };
      return _react2.default.createElement(
        _antd.Form,
        { className: 'register-list' },
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u624B\u673A\u53F7' }, formItemLayout),
          getFieldDecorator('phone', {
            rules: [{ message: '' }, { validator: this.handlePhoneChangeMsg }]
          })(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7' }))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({}, formItemLayout, smsCodeValidation, {
            label: '\u9A8C\u8BC1\u7801'
          }),
          _react2.default.createElement(
            _antd.Row,
            { gutter: 12 },
            _react2.default.createElement(
              _antd.Col,
              { span: 16 },
              getFieldDecorator('smsCode', {
                rules: [{ message: '' }, { validator: this.handleSmsCodeChangeMsg }]
              })(_react2.default.createElement(_antd.Input, { size: 'large', onChange: function onChange(e) {
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
    _this5.validAntdFields = false; //antd的验证
    return _this5;
  }

  _createClass(SecondComponent, [{
    key: 'handlePsdIsOpen',
    value: function handlePsdIsOpen() {
      var forgetactions = this.props.forgetactions;
      var forget = this.props.forget;

      var flag;
      if (!forget.psdIsOpen) flag = true;
      if (forget.psdIsOpen) flag = false;
      forgetactions.setPsdIsOpen(flag);
    }
  }, {
    key: 'psdIconType',
    value: function psdIconType() {
      var forget = this.props.forget;

      if (forget.psdIsOpen) {
        return 'password-show';
      } else {
        return 'password-hide';
      }
    }
  }, {
    key: 'inputType',
    value: function inputType() {
      var forget = this.props.forget;

      if (forget.psdIsOpen) {
        return 'text';
      } else {
        return 'password';
      }
    }
  }, {
    key: 'isValidPsd',
    value: function isValidPsd(val) {
      // const forgets = /^[\w]{6,20}$/;
      var forgets = /^[!@#$%\^&*\(\)\{\}\[\];.,\/\|+\-=:"'<>?\w]{6,20}$/;
      return forgets.test(val) ? true : false;
    }
  }, {
    key: 'handlePsdChange',
    value: function handlePsdChange(e) {
      var _props3 = this.props,
          form = _props3.form,
          forget = _props3.forget,
          forgetactions = _props3.forgetactions;

      if (this.isValidPsd(e.target.value)) {
        var middle = e.target.value;
        if (forget.confirmPsd == middle) {
          this.confirmPsdMsg = true;
          forgetactions.setConfirmPsdMsg('');
        } else {
          if (forget.confirmPsd !== '') {
            this.confirmPsdMsg = false;
            forgetactions.setConfirmPsdMsg(1);
          }
        }
        this.validPsd = true;
        forgetactions.setValidPsd(e.target.value);
      } else {
        this.validPsd = false;
        forgetactions.setValidPsd('');
        forgetactions.setPsdErrorMsg(e.target.value); //发送密码不合格时的错误信息
      }
    }
  }, {
    key: 'handleConfirmPsdChange',
    value: function handleConfirmPsdChange(e) {
      var _props4 = this.props,
          forget = _props4.forget,
          forgetactions = _props4.forgetactions;

      if (e.target.value == forget.validPsd) {
        this.validConfirmPsd = true;
        forgetactions.setConfirmPsdMsg('');
      } else {
        this.validConfirmPsd = false;
        forgetactions.setConfirmPsdMsg(1);
      }
      forgetactions.setConfirmPd(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var FormItem = _antd.Form.Item;
      var _props5 = this.props,
          forget = _props5.forget,
          form = _props5.form;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 }
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
      var passwordValidation = {
        validateStatus: forget.psdErrorMsg ? 'error' : null,
        help: forget.psdErrorMsg ? '密码不符合格式要求(6-20位数字或字母,不允许有空格)' : null
      };
      var confirmPsdValidation = {
        validateStatus: forget.confirmPsdMsg ? 'error' : null,
        help: forget.confirmPsdMsg ? '两次密码输入不一致' : null
      };
      return _react2.default.createElement(
        _antd.Form,
        { className: 'forgetister-list' },
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u65B0\u5BC6\u7801' }, formItemLayout, passwordValidation),
          getFieldDecorator('password', {
            rules: [{
              message: ''
            }]
          })(_react2.default.createElement(
            'div',
            { className: 'register-password' },
            _react2.default.createElement(_antd.Input, { size: 'large', onChange: function onChange(e) {
                return _this6.handlePsdChange(e);
              }, type: this.inputType(), placeholder: '\u8BF7\u8F93\u51656~20\u4F4D\u6570\u5B57\u548C\u5B57\u6BCD\u7EC4\u5408' }),
            _react2.default.createElement(_antd.Icon, { onClick: function onClick() {
                return _this6.handlePsdIsOpen();
              }, type: this.psdIconType() })
          ))
        ),
        _react2.default.createElement(
          FormItem,
          _extends({ label: '\u786E\u8BA4\u5BC6\u7801' }, formItemLayout, confirmPsdValidation),
          getFieldDecorator('password_confirm', {
            rules: [{
              message: ''
            }]
          })(_react2.default.createElement(_antd.Input, { type: 'password', onChange: function onChange(e) {
              return _this6.handleConfirmPsdChange(e);
            }, placeholder: '\u8BF7\u786E\u8BA4\u5BC6\u7801' }))
        )
      );
    }
  }]);

  return SecondComponent;
}(_react.Component);

var SecondStep = _antd.Form.create({})(SecondComponent);

var ThirdStep = function (_Component4) {
  _inherits(ThirdStep, _Component4);

  function ThirdStep() {
    _classCallCheck(this, ThirdStep);

    return _possibleConstructorReturn(this, (ThirdStep.__proto__ || Object.getPrototypeOf(ThirdStep)).apply(this, arguments));
  }

  _createClass(ThirdStep, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'register-list register-list-03' },
        _react2.default.createElement(
          'h3',
          null,
          '\u606D\u559C ',
          _react2.default.createElement('span', null),
          '\u91CD\u7F6E\u6210\u529F\u5566!'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u8BF7\u7262\u8BB0\u65B0\u7684\u767B\u5F55\u5BC6\u7801!'
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
var icons = ['#icon-yanzhengshenfen', '#icon-zhongzhimima', '#icon-chenggong'];
var steps = [{
  title: '身份验证'
}, {
  title: '重置密码'
}, {
  title: '找回成功'
}];

var forget = function (_React$Component) {
  _inherits(forget, _React$Component);

  function forget() {
    var _ref;

    var _temp, _this8, _ret;

    _classCallCheck(this, forget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this8 = _possibleConstructorReturn(this, (_ref = forget.__proto__ || Object.getPrototypeOf(forget)).call.apply(_ref, [this].concat(args))), _this8), _this8.handleDisabled = function () {
      var _this8$props = _this8.props,
          forget = _this8$props.forget,
          forgetactions = _this8$props.forgetactions;

      if (forget.psdErrorMsg === '' && forget.confirmPsdMsg === '') {
        if (forget.validPsd && forget.confirmPsd !== '') return false;
        return true;
      }{
        return true;
      }
    }, _temp), _possibleConstructorReturn(_this8, _ret);
  }

  _createClass(forget, [{
    key: 'next',
    value: function next() {
      var _props6 = this.props,
          forget = _props6.forget,
          forgetactions = _props6.forgetactions;

      var formValue = null,
          isError = false;
      if (forget.current === 0) {
        this.refs.first.validateFieldsAndScroll(function (err, values) {
          if (err) isError = true;
          formValue = values;
        });
        if (isError) return;
        forgetactions.checkSmsCode(formValue);
      } else if (forget.current === 1) {
        this.refs.second.validateFieldsAndScroll(['password'], function (err, values) {
          if (err) isError = true;
          formValue = values;
          formValue.phone = forget.phoneNumber;
        });
        if (isError) return;
        forgetactions.saveCorp(formValue);
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
    key: 'render',
    value: function render() {
      var _this9 = this;

      var _props7 = this.props,
          forget = _props7.forget,
          forgetactions = _props7.forgetactions;

      this.fillIcon(forget.current);
      var stepContent = null;
      switch (forget.current) {
        case 0:
          stepContent = _react2.default.createElement(FirstStep, { ref: 'first', forget: forget, forgetactions: forgetactions });
          break;
        case 1:
          stepContent = _react2.default.createElement(SecondStep, { ref: 'second', forget: forget, forgetactions: forgetactions });
          break;
        case 2:
          stepContent = _react2.default.createElement(ThirdStep, null);
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
                '\u6B22\u8FCE\u767B\u5F55'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'login-right' },
              _react2.default.createElement(
                'li',
                null,
                '\u8BB0\u4F4F\u5BC6\u7801\uFF1F ',
                _react2.default.createElement(
                  'a',
                  { onClick: function onClick() {
                      return _this9.handleLogin();
                    }, className: 'btn-reg' },
                  '\u76F4\u63A5\u767B\u5F55'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'register-bg forget-bg' },
          _react2.default.createElement('div', { className: 'img' }),
          _react2.default.createElement(
            'div',
            { className: 'register-title' },
            _react2.default.createElement('span', { className: 'forget-pic' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'register-main' },
            _react2.default.createElement(
              'div',
              { className: 'register-box' },
              _react2.default.createElement(
                _antd.Steps,
                { current: forget.current },
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
                  forget.current === 0 && _react2.default.createElement(
                    _antd.Button,
                    { type: 'primary', disabled: forget.phoneNumber === '' || forget.smsCodeValue === '', onClick: function onClick() {
                        return _this9.next();
                      } },
                    '\u4E0B\u4E00\u6B65'
                  )
                ),
                forget.current === steps.length - 1 && _react2.default.createElement(
                  'div',
                  { className: 'btn-inline' },
                  _react2.default.createElement(
                    _antd.Button,
                    { type: 'primary', onClick: function onClick() {
                        return _this9.handleLogin();
                      } },
                    '\u91CD\u65B0\u767B\u5F55'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'btn-block', style: { marginTop: '30px' } },
                  forget.current === 1 && _react2.default.createElement(
                    _antd.Button,
                    { type: 'primary', disabled: this.handleDisabled(), onClick: function onClick() {
                        return _this9.next();
                      } },
                    '\u63D0\u4EA4'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'footer-new' },
          '\u7248\u6743\u6240\u6709\u4FE1\u606F'
        )
      );
    }
  }]);

  return forget;
}(_react2.default.Component);

forget.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    forget: state.forget.toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    forgetactions: (0, _redux.bindActionCreators)(forgetactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(forget);