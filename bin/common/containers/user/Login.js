'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _antd = require('antd');

var _user = require('../../redux/modules/user');

var logactions = _interopRequireWildcard(_user);

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginComponent = function (_Component) {
  _inherits(LoginComponent, _Component);

  function LoginComponent(props) {
    _classCallCheck(this, LoginComponent);

    var _this = _possibleConstructorReturn(this, (LoginComponent.__proto__ || Object.getPrototypeOf(LoginComponent)).call(this, props));

    _this.handleForget = function () {
      _this.context.router.history.push('/forget');
    };

    _this.state = {
      password: true,
      username: null
    };
    _this.onDocumentClick = _this.onDocumentClick.bind(_this);
    _this.rememberUser = process.env.__CLIENT__ ? localStorage.getItem('rememberAccount') ? true : false : false;
    return _this;
  }

  _createClass(LoginComponent, [{
    key: 'onDocumentClick',
    value: function onDocumentClick(e) {
      if (e.keyCode == 13) {
        this.handleLogin();
      }
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener() {
      if (this.handleEnterKeydown) {
        this.handleEnterKeydown.remove();
        this.handleEnterKeydown = null;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.handleEnterKeydown) {
        this.handleEnterKeydown = (0, _addEventListener2.default)(document, 'keydown', this.onDocumentClick);
      }
      if (localStorage.getItem('rememberAccount')) {
        var account = JSON.parse(localStorage.getItem('rememberAccount'));
        this.setState({ username: account.username });
        //this.props.form.setFieldsValue({username:account.username, password:account.password});
        // this.props.form.setFieldsValue({password:account.password});
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeEventListener();
    }
  }, {
    key: 'handleUsernameChange',
    value: function handleUsernameChange(e) {
      var _props = this.props,
          logactions = _props.logactions,
          user = _props.user;

      logactions.usernameChange(e.target.value, user.usernameMsg);
    }
  }, {
    key: 'handlePasswordChange',
    value: function handlePasswordChange(e) {
      var _props2 = this.props,
          logactions = _props2.logactions,
          user = _props2.user;

      logactions.passwordChange(e.target.value, user.passwordMsg);
    }
  }, {
    key: 'handleLock',
    value: function handleLock() {
      var password = !this.state.password;
      this.setState({ password: password });
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin() {
      var _props3 = this.props,
          form = _props3.form,
          logactions = _props3.logactions;

      var formValue = {},
          isError = false;
      form.validateFieldsAndScroll(function (err, values) {
        if (err) isError = true;
        formValue = values;
      });
      if (isError) return;
      formValue.loginTime = (0, _moment2.default)().format('YYYY-MM-DD');
      formValue.rememberUser = this.rememberUser;
      logactions.login(formValue);
    }
  }, {
    key: 'handleRemember',
    value: function handleRemember(e) {
      if (e.target.checked === true) {
        this.rememberUser = true;
      } else {
        this.rememberUser = false;
      }
    }
  }, {
    key: 'wechatLogin',
    value: function wechatLogin() {
      this.props.logactions.weChatLogin();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var FormItem = _antd.Form.Item;
      var _props4 = this.props,
          form = _props4.form,
          user = _props4.user;
      var getFieldDecorator = form.getFieldDecorator;

      var pwdType = this.state.password ? 'password' : 'text';
      var pwdIcon = 'password-' + (this.state.password ? 'hide' : 'show');
      var usernameValidation = {
        validateStatus: user.usernameMsg ? 'error' : null,
        help: user.usernameMsg ? user.usernameMsg : null
      };
      var passwordValidation = {
        validateStatus: user.passwordMsg ? 'error' : null,
        help: user.passwordMsg ? user.passwordMsg : null
      };
      var validation = {
        validateStatus: user.errorMsg ? 'error' : null,
        help: user.errorMsg ? user.errorMsg : null
      };
      return _react2.default.createElement(
        _antd.Form,
        null,
        _react2.default.createElement(
          _antd.Card,
          { className: 'login-m-right', style: { marginTop: '100px' } },
          _react2.default.createElement(
            'div',
            { className: 'weChat_erweima' },
            _react2.default.createElement(
              _antd.Popover,
              { overlayClassName: 'login_wechat_popover', placement: 'leftTop', content: _react2.default.createElement(
                  'p',
                  { className: 'weChat_erweima_tip' },
                  _react2.default.createElement(_antd.Icon, { type: 'kuaisu' }),
                  '\u5FAE\u4FE1\u626B\u7801\u767B\u5F55\u66F4\u5FEB\u6377'
                ), trigger: 'hover' },
              _react2.default.createElement(_antd.Icon, { type: 'erweima', onClick: function onClick() {
                  return _this2.wechatLogin();
                } })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'login-title' },
            '\u5BC6\u7801\u767B\u5F55'
          ),
          _react2.default.createElement(
            FormItem,
            usernameValidation,
            getFieldDecorator('username', { initialValue: this.state.username })(_react2.default.createElement(_antd.Input, { placeholder: '\u8D26\u53F7/\u624B\u673A/\u90AE\u7BB1',
              onChange: function onChange(e) {
                return _this2.handleUsernameChange(e);
              },
              prefix: _react2.default.createElement(_antd.Icon, { type: 'user' })
            }))
          ),
          _react2.default.createElement(
            FormItem,
            passwordValidation,
            getFieldDecorator('password')(_react2.default.createElement(
              'div',
              { className: 'login-password' },
              _react2.default.createElement(_antd.Input, { type: pwdType, size: 'large', placeholder: '\u5BC6\u7801', onChange: function onChange(e) {
                  return _this2.handlePasswordChange(e);
                },
                prefix: _react2.default.createElement(_antd.Icon, { type: 'lock' })
              }),
              _react2.default.createElement(
                'span',
                { className: 'login-pas-icon' },
                _react2.default.createElement(_antd.Icon, { onClick: function onClick() {
                    return _this2.handleLock();
                  }, type: pwdIcon })
              )
            ))
          ),
          user.errorMsg ? _react2.default.createElement(
            'div',
            { className: 'login_service_error' },
            user.errorMsg
          ) : null,
          _react2.default.createElement(
            FormItem,
            { style: { marginTop: -10, marginBottom: 15 } },
            _react2.default.createElement(
              'span',
              { className: 'forget' },
              _react2.default.createElement(
                'a',
                { onClick: this.handleForget },
                '\u5FD8\u8BB0\u5BC6\u7801\uFF1F'
              )
            ),
            _react2.default.createElement(
              _antd.Checkbox,
              { defaultChecked: this.rememberUser, onChange: function onChange(e) {
                  return _this2.handleRemember(e);
                } },
              '\u8BB0\u4F4F\u7528\u6237\u540D'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'btn-block' },
            _react2.default.createElement(
              _antd.Button,
              { className: 'login-btn-lfrt', onClick: function onClick() {
                  return _this2.handleLogin();
                } },
              '\u767B\u5F55'
            )
          )
        )
      );
    }
  }]);

  return LoginComponent;
}(_react.Component);

LoginComponent.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var LoginForm = _antd.Form.create({})(LoginComponent);

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

var Login = function (_Component2) {
  _inherits(Login, _Component2);

  function Login() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this3), _this3.handleRegister = function () {
      _this3.context.router.history.push('/register');
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(Login, [{
    key: 'render',
    value: function render() {
      var Option = _antd.Select.Option;
      var FormItem = _antd.Form.Item;
      var _props5 = this.props,
          user = _props5.user,
          logactions = _props5.logactions;

      var formItemStyle = { width: '99%' };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'login-nav header-bg' },
          _react2.default.createElement(
            'div',
            { className: 'login-main' },
            _react2.default.createElement(
              'div',
              { className: 'login-left' },
              _react2.default.createElement('span', { className: 'logo-img' }),
              _react2.default.createElement(
                'em',
                { className: 'header-left-color' },
                '\u6B22\u8FCE\u767B\u5F55'
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'login-right' },
              _react2.default.createElement('li', null),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'em',
                  { className: 'header-color' },
                  '\u8FD8\u6CA1\u6709\u8D26\u53F7\uFF1F'
                ),
                ' ',
                _react2.default.createElement(
                  'a',
                  { onClick: this.handleRegister, className: 'btn-red-wei' },
                  '\u7ACB\u5373\u6CE8\u518C'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'login-bg' },
          _react2.default.createElement('div', { className: 'login-bg-banner-top' }),
          _react2.default.createElement(
            'div',
            { className: 'login-main' },
            _react2.default.createElement(
              _antd.Row,
              null,
              _react2.default.createElement(
                _antd.Col,
                { span: 12 },
                _react2.default.createElement('div', { className: 'login-m-left' })
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 12 },
                _react2.default.createElement(LoginForm, { user: user, logactions: logactions })
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

  return Login;
}(_react.Component);

Login.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    user: state.user.toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logactions: (0, _redux.bindActionCreators)(logactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);