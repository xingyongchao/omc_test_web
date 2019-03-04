'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _antd = require('antd');

var _basic = require('../../../yxyweb/common/components/basic');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

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

var FormItem = _antd.Form.Item;

var AccountModalControl = function (_Component2) {
  _inherits(AccountModalControl, _Component2);

  function AccountModalControl(props) {
    _classCallCheck(this, AccountModalControl);

    var _this3 = _possibleConstructorReturn(this, (AccountModalControl.__proto__ || Object.getPrototypeOf(AccountModalControl)).call(this, props));

    _initialiseProps.call(_this3);

    var forget = _this3.props.forget;
    return _this3;
  }

  _createClass(AccountModalControl, [{
    key: 'isValidPhone',
    value: function isValidPhone(str) {
      var pattern = /^1[3|4|5|7|8][0-9]{9}$/;
      return pattern.test(str) ? true : false;
    }
  }, {
    key: 'handlePhoneChangeMsg',
    value: function handlePhoneChangeMsg(e) {
      var forgetactions = this.props.forgetactions;

      if (this.isValidPhone(e.target.value)) {
        forgetactions.setPhoneNumber(e.target.value);
        forgetactions.setMsg({ phoneMsg: false });
      } else {
        forgetactions.setPhoneNumber('');
        forgetactions.setMsg({ phoneMsg: true });
      }
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
      forgetactions.getResetPhoneSmsCode(formValue);
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

      var _props2 = this.props,
          forget = _props2.forget,
          form = _props2.form,
          account = _props2.account;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: {
          xs: { span: 5 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 }
        }
      };

      var smsCodeValidation = {
        validateStatus: forget.smsCodeMsg ? 'error' : null,
        help: forget.smsCodeMsg ? forget.smsCodeMsg : null
      };
      var phoneValidation = {
        validateStatus: forget.phoneMsg ? 'error' : null,
        help: forget.phoneMsg ? '手机号码格式不对' : null
      };
      var disabled = forget.phoneNumber === '' || forget.smsCodeStatus === _ActionStatus2.default.ING || forget.smsCodeStatus === _ActionStatus2.default.SUCCESS;
      var tickCom = forget.smsCodeStatus === _ActionStatus2.default.SUCCESS ? _react2.default.createElement(Tick, { clear: function clear() {
          return _this4.handleTickClear();
        } }) : '获取验证码';
      return _react2.default.createElement(
        _antd.Modal,
        {
          title: '\u4FEE\u6539\u624B\u673A',
          visible: forget.visible,
          onOk: this.hideModalAndPost,
          onCancel: this.hideModal,
          okText: '\u786E\u8BA4',
          cancelText: '\u53D6\u6D88',
          style: { top: '30%' },
          width: '420'
        },
        _react2.default.createElement(
          _antd.Form,
          { className: 'phone-modify' },
          _react2.default.createElement(
            'p',
            { className: 'phone-txt' },
            '\u624B\u673A\u53F7\u6BCF\u5929\u53EA\u80FD\u4FEE\u6539\u4E00\u6B21\u54E6\uFF01'
          ),
          _react2.default.createElement(
            FormItem,
            _extends({ label: '\u65B0\u624B\u673A' }, formItemLayout, phoneValidation),
            getFieldDecorator('phone', {
              rules: [{ message: '' }]
            })(_react2.default.createElement(_antd.Input, { size: 'small', onChange: function onChange(e) {
                return _this4.handlePhoneChangeMsg(e);
              }, placeholder: '\u8BF7\u8F93\u5165\u65B0\u624B\u673A\u53F7' }))
          ),
          _react2.default.createElement(
            FormItem,
            _extends({}, formItemLayout, smsCodeValidation, {
              label: '\u9A8C\u8BC1\u7801'
            }),
            _react2.default.createElement(
              _basic.Row,
              { style: { marginRight: '20' } },
              _react2.default.createElement(
                _basic.Col,
                { span: 16 },
                getFieldDecorator('smsCode', {
                  rules: [{ message: '' }]
                })(_react2.default.createElement(_antd.Input, { size: 'small', onChange: function onChange(e) {
                    return _this4.handleSmsCodeChange(e);
                  } }))
              ),
              _react2.default.createElement(
                _basic.Col,
                { span: 8 },
                _react2.default.createElement(
                  _antd.Button,
                  { style: { marginLeft: '10' }, type: 'primary', size: 'small', disabled: disabled, onClick: function onClick() {
                      return _this4.handleSmsCode();
                    } },
                  tickCom
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AccountModalControl;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.hideModal = function () {
    var forgetactions = _this5.props.forgetactions;

    _this5.setState({
      visible: false
    });
    forgetactions.setMsg({
      visible: false,
      phoneNumber: '',
      phoneMsg: false,
      smsCodeMsg: '',
      smsCodeStatus: _ActionStatus2.default.READY
    });
  };

  this.hideModalAndPost = function () {
    var _props3 = _this5.props,
        form = _props3.form,
        forgetactions = _props3.forgetactions,
        forget = _props3.forget;

    var formValue = {},
        isError = false;
    form.validateFieldsAndScroll(function (err, values) {
      if (err) isError = true;
      formValue = values;
    });
    if (forget.phoneMsg) isError = true;
    if (isError) return;
    forgetactions.checkResetPhoneSmsCode(formValue);
  };
};

var AccountModal = _antd.Form.create({})(AccountModalControl);

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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AccountModal);