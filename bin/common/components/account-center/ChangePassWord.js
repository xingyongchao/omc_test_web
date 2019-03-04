'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _antd = require('antd');

var _forget = require('../../redux/modules/forget');

var forgetactions = _interopRequireWildcard(_forget);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChangePassWordControl = function (_Component) {
  _inherits(ChangePassWordControl, _Component);

  function ChangePassWordControl(props) {
    _classCallCheck(this, ChangePassWordControl);

    var _this = _possibleConstructorReturn(this, (ChangePassWordControl.__proto__ || Object.getPrototypeOf(ChangePassWordControl)).call(this, props));

    _this.validPsd = false; //有效密码
    _this.validConfirmPsd = false; //有效确认密码
    _this.validAntdFields = false; //antd的验证
    return _this;
  }

  _createClass(ChangePassWordControl, [{
    key: 'handlePsdIsOpen',
    value: function handlePsdIsOpen() {
      /*<Icon onClick={() => this.handlePsdIsOpen()} type={this.psdIconType()} />*/
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
      var _props = this.props,
          form = _props.form,
          forget = _props.forget,
          forgetactions = _props.forgetactions;

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
      var _props2 = this.props,
          forget = _props2.forget,
          forgetactions = _props2.forgetactions;

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
    key: 'handleOkClick',
    value: function handleOkClick() {
      var _this2 = this;

      var form = this.props.form;

      form.validateFieldsAndScroll(function (err, values) {
        if (err) return;
        if (values.password !== values.password_confirm) return;
        // cb.utils.alert(JSON.stringify(values));
        _this2.props.forgetactions.save(values, form);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var FormItem = _antd.Form.Item;
      var _props3 = this.props,
          forget = _props3.forget,
          form = _props3.form;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: {
          xs: { span: 3 },
          sm: { span: 3 }
        },
        wrapperCol: {
          xs: { span: 8 },
          sm: { span: 8 }
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
        'div',
        { className: 'password-modify' },
        _react2.default.createElement(
          _antd.Form,
          { className: '' },
          _react2.default.createElement(
            FormItem,
            _extends({ label: '\u65E7\u5BC6\u7801' }, formItemLayout),
            getFieldDecorator('old_password', {
              rules: [{
                message: '密码不能为空',
                required: true
              }]
            })(_react2.default.createElement(_antd.Input, { size: 'small', type: 'password', placeholder: '\u8BF7\u8F93\u5165\u65E7\u5BC6\u7801' }))
          ),
          _react2.default.createElement(
            FormItem,
            _extends({ label: '\u65B0\u5BC6\u7801' }, formItemLayout, passwordValidation),
            getFieldDecorator('password', {
              rules: [{
                message: '',
                required: true
              }]
            })(_react2.default.createElement(_antd.Input, { size: 'small', onChange: function onChange(e) {
                return _this3.handlePsdChange(e);
              }, type: this.inputType(), placeholder: '6-20\u4F4D\u6570\u5B57\u6216\u5B57\u6BCD,\u4E0D\u5141\u8BB8\u6709\u7A7A\u683C' }))
          ),
          _react2.default.createElement(
            FormItem,
            _extends({ label: '\u786E\u8BA4\u5BC6\u7801' }, formItemLayout, confirmPsdValidation),
            getFieldDecorator('password_confirm', {
              rules: [{
                message: '',
                required: true
              }]
            })(_react2.default.createElement(_antd.Input, { size: 'small', type: 'password', onChange: function onChange(e) {
                return _this3.handleConfirmPsdChange(e);
              }, placeholder: '\u518D\u6B21\u786E\u8BA4\u5BC6\u7801' }))
          ),
          forget.saveErrMsg ? _react2.default.createElement(
            'div',
            { className: 'change_psd_error' },
            forget.saveErrMsg
          ) : null
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'btn-group-bottom', style: { marginLeft: '0' } },
          _react2.default.createElement(
            _antd.Col,
            { offset: 3 },
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', onClick: function onClick() {
                  return _this3.handleOkClick();
                } },
              '\u4FDD\u5B58'
            )
          )
        )
      );
    }
  }]);

  return ChangePassWordControl;
}(_react.Component);

var ChangePassWord = _antd.Form.create({})(ChangePassWordControl);

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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ChangePassWord);