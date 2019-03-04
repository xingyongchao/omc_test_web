'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _systemSetting = require('../../redux/modules/systemSetting');

var systemSettingactions = _interopRequireWildcard(_systemSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var imgCom = process.env.__CLIENT__ ? _react2.default.createElement('img', { src: this.state.url }) : null;
      var _props = this.props,
          visible = _props.visible,
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
            getFieldDecorator('activeCode')(_react2.default.createElement(_antd.Input, { placeholder: '\u8BF7\u8F93\u5165\u6FC0\u6D3B\u7801' })),
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

var OrderInfo = function (_Component) {
  _inherits(OrderInfo, _Component);

  function OrderInfo(props) {
    _classCallCheck(this, OrderInfo);

    var _this4 = _possibleConstructorReturn(this, (OrderInfo.__proto__ || Object.getPrototypeOf(OrderInfo)).call(this, props));

    _this4.showModal = function () {
      _this4.setState({
        visible: true
      });
    };

    _this4.handleCancel = function (obj) {
      _this4.setState({ visible: obj.visible });
    };

    _this4.state = {

      visible: false
    };
    return _this4;
  }

  _createClass(OrderInfo, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // todo
      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // cookie未过期但是租约已到期, 跳转页面
      if (this.props.leftTime == -1) {
        // 跳转过期页面
        this.context.router.history.push('/expire');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'open_order_service' },
        _react2.default.createElement(
          'div',
          { className: 'u_service_icon' },
          _react2.default.createElement('div', { className: 'uretail-logo' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'u_service_right' },
          _react2.default.createElement(
            'div',
            { className: 'u_service_h1' },
            '\u53CB\u96F6\u552E',
            this.props.startTime ? _react2.default.createElement(
              'span',
              { className: 'official' },
              '\u6B63\u5F0F\u7248'
            ) : _react2.default.createElement(
              'span',
              { className: 'try' },
              '\u8BD5\u7528\u7248'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'u_service_p1' },
            '\u5F00\u901A\u65F6\u95F4',
            _react2.default.createElement(
              'strong',
              null,
              this.props.startTime && (0, _moment2.default)(this.props.startTime).format('YYYY-MM-DD')
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'u_service_p1' },
            '\u5230\u671F\u65F6\u95F4',
            _react2.default.createElement(
              'strong',
              null,
              this.props.overTime && (0, _moment2.default)(this.props.overTime).format('YYYY-MM-DD')
            ),
            this.props.leftTime < 30 ? _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'em',
                null,
                '(\u8FD8\u6709',
                this.props.leftTime,
                '\u5929\u5230\u671F)'
              )
            ) : null,
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', onClick: this.showModal },
              '\u7ACB\u5373\u6FC0\u6D3B'
            ),
            _react2.default.createElement(CollectionActCodeForm, {
              visible: this.state.visible,
              callBackCancel: this.handleCancel
            })
          )
        )
      );
    }
  }]);

  return OrderInfo;
}(_react.Component);

OrderInfo.contextTypes = {
  router: _propTypes2.default.object.isRequired
};
exports.default = OrderInfo;