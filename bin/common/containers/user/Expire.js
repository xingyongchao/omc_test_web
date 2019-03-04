'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpireInfo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _antd = require('antd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('../../../yxyweb/common/helpers/util');

var _env = require('../../../yxyweb/common/helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;
var CollectionActCodeForm = _antd.Form.create()(function (_React$Component) {
  _inherits(_class2, _React$Component);

  function _class2(props) {
    _classCallCheck(this, _class2);

    var _this = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, props));

    _this.innerModalCancel = function () {
      _this.props.form.setFieldsValue({ activeCode: '', validCode: '' });
      _this.setState({
        activateInfo: null,
        activeErrMsg: null, validErrMsg: null, url: _this.getValidCodeUrl()
      });
      if (_this.props.callBackCancel) {
        _this.props.callBackCancel({ visible: false });
      }
    };

    if (process.env.__CLIENT__) {
      _this.validCodeUrl = '/register/validcode';
      _this.state = {
        url: _this.getValidCodeUrl(),
        activateInfo: null,
        activeErrMsg: null,
        validErrMsg: null
      };
    } else {
      _this.state = {};
    }
    _this.validCode = null;
    return _this;
  }

  _createClass(_class2, [{
    key: 'getValidCodeUrl',
    value: function getValidCodeUrl() {
      return this.validCodeUrl + '?_=' + new Date().valueOf() + '&token=' + cb.rest.AppContext.token;
    }
  }, {
    key: 'handleRefresh',
    value: function handleRefresh() {
      this.setState({ url: this.getValidCodeUrl() });
    }
  }, {
    key: 'getActivationInfo',
    value: function getActivationInfo() {
      var _this2 = this;

      var activeErrMsg = void 0,
          validErrMsg = void 0;
      var formData = this.props.form.getFieldsValue();
      if (!formData.activeCode) {
        activeErrMsg = "请输入激活码";
      }
      if (!formData.validCode) {
        validErrMsg = "请输入验证码";
      }
      if (activeErrMsg || validErrMsg) {
        this.setState({
          activateInfo: null,
          activeErrMsg: activeErrMsg,
          validErrMsg: validErrMsg
        });
        return;
      }
      this.setState({ activeErrMsg: null, validErrMsg: null });
      var proxy = cb.rest.DynamicProxy.create({ activate: { url: '/register/openApp', method: 'POST' } });
      proxy.activate(formData, function (err, result) {
        if (err) {
          _this2.setState({ activateInfo: err.message, url: _this2.getValidCodeUrl() });
        } else {
          cb.utils.alert('恭喜，激活成功啦！'), setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      });
    }
    // componentWillReceiveProps(nextProps){
    //   if(nextProps.visible != this.props.visible && !nextProps.visible){
    //     this.setState({
    //       inputActCode: '',
    //       inputValidCode: ''
    //     })
    //   }
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var imgCom = process.env.__CLIENT__ ? _react2.default.createElement('img', { src: this.state.url }) : null;
      var _props = this.props,
          visible = _props.visible,
          onCancel = _props.onCancel,
          form = _props.form,
          user = _props.user;
      var getFieldDecorator = form.getFieldDecorator,
          resetFields = form.resetFields;

      var formItemLayout = {

        wrapperCol: { span: 12, offset: 6 }
      };
      var buttonLayout = {
        wrapperCol: { span: 4, offset: 10 }
      };

      return _react2.default.createElement(
        _antd.Modal,
        {
          visible: visible,
          footer: null,
          onCancel: this.innerModalCancel,
          wrapClassName: 'activeModalInner',
          className: 'activeModalInner_common'
        },
        _react2.default.createElement(
          _antd.Form,
          { className: 'activation-list', layout: 'vertical' },
          _react2.default.createElement(
            FormItem,
            null,
            getFieldDecorator('activeCode', {
              rules: [{
                validator: this.validFunction
              }]
            })(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u6FC0\u6D3B\u7801' })),
            this.state.activeErrMsg ? _react2.default.createElement(
              'div',
              { className: 'expire_Err_Msg' },
              this.state.activeErrMsg
            ) : null
          ),
          _react2.default.createElement(
            FormItem,
            null,
            _react2.default.createElement(
              _antd.Row,
              { className: 'valid-code' },
              getFieldDecorator('validCode')(_react2.default.createElement(_antd.Input, { size: 'large', placeholder: '\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801' })),
              _react2.default.createElement(
                'a',
                { className: 'verify-img', size: 'large', onClick: function onClick() {
                    return _this3.handleRefresh();
                  } },
                imgCom
              )
            ),
            this.state.activateInfo ? _react2.default.createElement(
              'div',
              { className: 'expire_Err_Msg' },
              this.state.activateInfo
            ) : null,
            this.state.validErrMsg ? _react2.default.createElement(
              'div',
              { className: 'expire_Err_Msg' },
              this.state.validErrMsg
            ) : null
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: 'primary', onClick: function onClick() {
                return _this3.getActivationInfo();
              } },
            '\u7ACB\u5373\u6FC0\u6D3B'
          )
        )
      );
    }
  }]);

  return _class2;
}(_react2.default.Component));

var ExpireInfo = exports.ExpireInfo = function (_Component) {
  _inherits(ExpireInfo, _Component);

  function ExpireInfo(props) {
    _classCallCheck(this, ExpireInfo);

    var _this4 = _possibleConstructorReturn(this, (ExpireInfo.__proto__ || Object.getPrototypeOf(ExpireInfo)).call(this, props));

    _this4.showModal = function () {
      _this4.setState({
        normalVisible: true
      });
    };

    _this4.showErrorModal = function () {
      _this4.setState({
        errorVisible: true
      });
    };

    _this4.handleCancel = function (obj) {
      _this4.setState({ normalVisible: obj.visible });
    };

    _this4.handleErrorCancel = function () {
      _this4.setState({ errorVisible: false });
    };

    _this4.state = {
      normalVisible: false,
      errorVisible: false
    };
    return _this4;
  }

  _createClass(ExpireInfo, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // todo
      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // cookie未过期但是租约已到期, 跳转页面
      var tenant = this.props.user.tenant;
      var leftTime = tenant.leftTime;

      if (leftTime == -1) {
        // 跳转过期页面
        this.context.router.history.push('/expire');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$user = this.props.user,
          tenant = _props$user.tenant,
          userType = _props$user.userType;
      var leftTime = tenant.leftTime;

      var isTouchMode = _env2.default.INTERACTIVE_MODE;
      return leftTime < 30 && leftTime != -1 && _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('billing-expireInfoWrap', this.props.className) },
        _react2.default.createElement(
          'div',
          { className: 'billing-expireInfo' },
          _react2.default.createElement(
            'span',
            null,
            '  ',
            _react2.default.createElement(_SvgIcon2.default, { type: 'wenxintishi' })
          ),
          _react2.default.createElement(
            'span',
            null,
            '\u8D35\u516C\u53F8\u7684\u79DF\u7EA6\u5C06\u4E8E',
            _react2.default.createElement(
              'strong',
              null,
              (0, _moment2.default)().add(leftTime, 'days').format('YYYY-MM-DD')
            ),
            '\u8FC7\u671F\uFF0C\u8FD8\u6709',
            _react2.default.createElement(
              'strong',
              null,
              leftTime
            ),
            '\u5929\u5230\u671F\uFF0C\u5982\u9700\u7EE7\u7EED\u4F7F\u7528\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D\u7EED\u7EA6\uFF01\u8054\u7CFB\u7535\u8BDD\uFF1A ',
            _react2.default.createElement(
              'strong',
              null,
              '010-86393388 / \u8F6C5'
            ),
            '\xA0\xA0\xA0\xA0',
            isTouchMode == 'pc' ? _react2.default.createElement(
              _antd.Button,
              { type: 'primary', onClick: userType === 0 ? this.showModal : this.showErrorModal },
              '\u7ACB\u5373\u6FC0\u6D3B'
            ) : null
          )
        ),
        _react2.default.createElement(CollectionActCodeForm, {
          visible: this.state.normalVisible,
          onCancel: this.handleCancel,
          callBackCancel: this.handleCancel
        }),
        _react2.default.createElement(
          _antd.Modal,
          {
            wrapClassName: 'activeErrModal',
            className: 'activeErrModal_common',
            visible: this.state.errorVisible,
            onCancel: this.handleErrorCancel,
            footer: null
          },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement('i', { className: 'anticon anticon-error' }),
            '\u53EA\u6709\u8D85\u7EA7\u7BA1\u7406\u5458\u624D\u53EF\u4EE5\u6FC0\u6D3B\u54E6\uFF01'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: 'primary', onClick: this.handleErrorCancel },
            '\u6211\u77E5\u9053\u4E86'
          )
        )
      );
    }
  }]);

  return ExpireInfo;
}(_react.Component);

ExpireInfo.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var CollectionActCodeForm_login = _antd.Form.create()(function (_React$Component2) {
  _inherits(_class4, _React$Component2);

  function _class4(props) {
    _classCallCheck(this, _class4);

    var _this5 = _possibleConstructorReturn(this, (_class4.__proto__ || Object.getPrototypeOf(_class4)).call(this, props));

    _this5.innerModalCancel = function () {
      _this5.props.form.setFieldsValue({ password: '', activeCode: '', validCode: '' });
      _this5.setState({
        activateInfo: null,
        userNameErrMsg: null,
        activeErrMsg: null, validErrMsg: null, psdErrMsg: null, url: _this5.getValidCodeUrl()
      });
      if (_this5.props.callBackCancel) {
        _this5.props.callBackCancel({ visible: false });
      }
    };

    if (process.env.__CLIENT__) {
      _this5.validCodeUrl = '/register/validcode';
      _this5.state = {
        url: _this5.getValidCodeUrl(),
        activateInfo: null,
        userNameErrMsg: null,
        activeErrMsg: null,
        validErrMsg: null,
        psdErrMsg: null,
        disabled: false
      };
    } else {
      _this5.state = {};
    }
    _this5.validCode = null;
    return _this5;
  }

  _createClass(_class4, [{
    key: 'getValidCodeUrl',
    value: function getValidCodeUrl() {
      return this.validCodeUrl + '?_=' + new Date().valueOf() + '&token=' + cb.rest.AppContext.token;
    }
  }, {
    key: 'handleRefresh',
    value: function handleRefresh() {
      this.setState({ url: this.getValidCodeUrl() });
    }
  }, {
    key: 'getActivationInfo',
    value: function getActivationInfo() {
      var _this6 = this;

      var userNameErrMsg = void 0,
          psdErrMsg = void 0,
          activeErrMsg = void 0,
          validErrMsg = void 0;
      var formData = this.props.form.getFieldsValue();
      if (!formData.username) {
        userNameErrMsg = '请输入用户名';
      }
      if (!formData.password) {
        psdErrMsg = "请输入密码";
      }
      if (!formData.activeCode) {
        activeErrMsg = "请输入激活码";
      }
      if (!formData.validCode) {
        validErrMsg = "请输入验证码";
      }
      if (userNameErrMsg || psdErrMsg || activeErrMsg || validErrMsg) {
        this.setState({
          activateInfo: null,
          userNameErrMsg: userNameErrMsg,
          psdErrMsg: psdErrMsg,
          activeErrMsg: activeErrMsg,
          validErrMsg: validErrMsg
        });
        return;
      }
      this.setState({ userNameErrMsg: null, psdErrMsg: null, activeErrMsg: null, validErrMsg: null });
      var proxy = cb.rest.DynamicProxy.create({ activate: { url: '/register/openAppNoLogin', method: 'POST' } });
      proxy.activate(formData, function (err, result) {
        if (err) {
          _this6.setState({ activateInfo: err.message, url: _this6.getValidCodeUrl() });
        } else {
          cb.utils.alert('恭喜，激活成功啦！'), _this6.setState({ disabled: true });
          setTimeout(function () {
            // window.location.reload()
            window.location.href = '/portal';
          }, 2000);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var imgCom = process.env.__CLIENT__ ? _react2.default.createElement('img', { src: this.state.url }) : null;
      var _props2 = this.props,
          visible = _props2.visible,
          onCancel = _props2.onCancel,
          form = _props2.form;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {

        wrapperCol: { span: 12, offset: 6 }
      };
      var buttonLayout = {
        wrapperCol: { span: 4, offset: 10 }
      };

      return _react2.default.createElement(
        _antd.Modal,
        {
          visible: visible,
          footer: null,
          wrapClassName: 'activeModal_NoLogin',
          className: 'activeModal_NoLogincommon',
          onCancel: this.innerModalCancel },
        _react2.default.createElement(
          _antd.Form,
          { className: 'activation-list', layout: 'vertical' },
          _react2.default.createElement(
            FormItem,
            null,
            getFieldDecorator('username', { initialValue: this.props.userName })(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u7528\u6237\u540D' })),
            this.state.userNameErrMsg ? _react2.default.createElement(
              'div',
              { className: 'noLogin_expire_ErrMsg' },
              this.state.userNameErrMsg
            ) : null
          ),
          _react2.default.createElement(
            FormItem,
            null,
            getFieldDecorator('password')(_react2.default.createElement(_antd.Input, { type: 'password', placeholder: '\u8BF7\u8F93\u5165\u5BC6\u7801' })),
            this.state.psdErrMsg ? _react2.default.createElement(
              'div',
              { className: 'noLogin_expire_ErrMsg' },
              this.state.psdErrMsg
            ) : null
          ),
          _react2.default.createElement(
            FormItem,
            null,
            getFieldDecorator('activeCode')(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u6FC0\u6D3B\u7801' })),
            this.state.activeErrMsg ? _react2.default.createElement(
              'div',
              { className: 'noLogin_expire_ErrMsg' },
              this.state.activeErrMsg
            ) : null
          ),
          _react2.default.createElement(
            FormItem,
            null,
            _react2.default.createElement(
              _antd.Row,
              { className: 'valid-code' },
              getFieldDecorator('validCode')(_react2.default.createElement(_antd.Input, { size: 'large', placeholder: '\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801' })),
              _react2.default.createElement(
                'a',
                { className: 'verify-img', size: 'large', onClick: function onClick() {
                    return _this7.handleRefresh();
                  } },
                imgCom
              )
            ),
            this.state.validErrMsg ? _react2.default.createElement(
              'div',
              { className: 'noLogin_expire_ErrMsg' },
              this.state.validErrMsg
            ) : null,
            this.state.activateInfo ? _react2.default.createElement(
              'div',
              { className: 'noLogin_expire_ErrMsg' },
              this.state.activateInfo
            ) : null
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: 'primary', disabled: this.state.disabled, onClick: function onClick() {
                return _this7.getActivationInfo();
              } },
            '\u7ACB\u5373\u6FC0\u6D3B'
          )
        )
      );
    }
  }]);

  return _class4;
}(_react2.default.Component));

var ExpirePage = function (_Component2) {
  _inherits(ExpirePage, _Component2);

  function ExpirePage(props) {
    _classCallCheck(this, ExpirePage);

    var _this8 = _possibleConstructorReturn(this, (ExpirePage.__proto__ || Object.getPrototypeOf(ExpirePage)).call(this, props));

    _this8.state = {
      visible: false
    };

    _this8.showModal = function () {
      _this8.setState({
        visible: true
      });
    };

    _this8.handleCancel = function (obj) {
      _this8.setState({ visible: obj.visible });
    };

    _this8.renderTouch = function () {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("billing-expire-overdue", _this8.props.className) },
        _react2.default.createElement(
          'dl',
          { className: 'clearfix' },
          _react2.default.createElement(
            'dd',
            { className: 'title' },
            '\u8D35\u516C\u53F8\u7684\u79DF\u7EA6\u8FC7\u671F\u5566\uFF5E'
          ),
          _react2.default.createElement('dt', null),
          _react2.default.createElement(
            'dd',
            null,
            '\u5982\u9700\u7EE7\u7EED\u4F7F\u7528\uFF0C\u8BF7\u4E0E\u60A8\u7684\u5BA2\u6237\u7ECF\u7406\u8054\u7CFB\u7EED\u7EA6\u4E8B\u9879'
          ),
          _react2.default.createElement(
            'dd',
            null,
            '\u6216\u81F4\u7535\u514D\u8D39\u5BA2\u670D\u5BA2\u670D\u70ED\u7EBF\uFF1A',
            _react2.default.createElement(
              'span',
              null,
              '010-86393388 / \u8F6C5'
            )
          )
        )
      );
    };

    _this8.renderPC = function () {
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("billing-expire-overdue") },
        _react2.default.createElement(
          'dl',
          { className: 'clearfix' },
          _react2.default.createElement('dt', null),
          _react2.default.createElement(
            'dd',
            { className: 'title' },
            '\u54CE\u5440\uFF0C\u8D35\u516C\u53F8\u7684\u79DF\u7EA6\u8FC7\u671F\u5566\uFF5E'
          ),
          _react2.default.createElement(
            'dd',
            null,
            '\u5982\u9700\u7EE7\u7EED\u4F7F\u7528\uFF0C\u8BF7\u4E0E\u60A8\u7684\u5BA2\u6237\u7ECF\u7406\u8054\u7CFB\u7EED\u7EA6\u4E8B\u9879'
          ),
          _react2.default.createElement(
            'dd',
            null,
            '\u6216\u81F4\u7535\u514D\u8D39\u5BA2\u670D\u5BA2\u670D\u70ED\u7EBF\uFF1A 010-86393388 / \u8F6C5'
          ),
          _react2.default.createElement(
            'dd',
            { className: 'btn' },
            _react2.default.createElement(
              'button',
              { className: 'primary', onClick: _this8.showModal },
              '\u7ACB\u5373\u6FC0\u6D3B'
            ),
            '\xA0\xA0\xA0\xA0\xA0',
            _react2.default.createElement(
              'button',
              { onClick: function onClick() {
                  _this8.context.router.history.push('/login');
                } },
              '\u8FD4\u56DE'
            )
          )
        ),
        _react2.default.createElement(CollectionActCodeForm_login, {
          userName: _this8.props.user.username,
          visible: _this8.state.visible,
          callBackCancel: _this8.handleCancel
        })
      );
    };

    return _this8;
  }

  _createClass(ExpirePage, [{
    key: 'render',
    value: function render() {

      return this.props.mode === 'touch' && this.renderTouch() || this.renderPC();
    }
  }]);

  return ExpirePage;
}(_react.Component);

ExpirePage.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    user: state.user.toJS()
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ExpirePage);