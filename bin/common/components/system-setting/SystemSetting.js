'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _CompanyInfo = require('./CompanyInfo');

var _CompanyInfo2 = _interopRequireDefault(_CompanyInfo);

var _ApiInfo = require('./ApiInfo');

var _ApiInfo2 = _interopRequireDefault(_ApiInfo);

var _UdhInfo = require('./UdhInfo');

var _UdhInfo2 = _interopRequireDefault(_UdhInfo);

var _OrderInfo = require('./OrderInfo');

var _OrderInfo2 = _interopRequireDefault(_OrderInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;

var SystemSetting = function (_Component) {
  _inherits(SystemSetting, _Component);

  function SystemSetting(props) {
    _classCallCheck(this, SystemSetting);

    var _this = _possibleConstructorReturn(this, (SystemSetting.__proto__ || Object.getPrototypeOf(SystemSetting)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(SystemSetting, [{
    key: 'render',
    value: function render() {
      var account = this.props.account;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Tabs,
          { className: 'tab-list', type: 'card', animated: false },
          _react2.default.createElement(
            TabPane,
            { tab: '\u4F01\u4E1A\u4FE1\u606F', key: 'companyInfo' },
            _react2.default.createElement(_CompanyInfo2.default, null)
          ),
          _react2.default.createElement(
            TabPane,
            { tab: 'API\u6388\u6743', key: 'apiInfo' },
            _react2.default.createElement(_ApiInfo2.default, null)
          ),
          account.userType === 0 ? _react2.default.createElement(
            TabPane,
            { tab: '\u5F00\u901AU\u8BA2\u8D27', key: 'udhInfo' },
            _react2.default.createElement(_UdhInfo2.default, null)
          ) : null,
          account.userType === 0 ? _react2.default.createElement(
            TabPane,
            { tab: '\u8BA2\u8D2D\u4FE1\u606F', key: 'orderInfo' },
            _react2.default.createElement(_OrderInfo2.default, { overTime: account.tenant.overTime, startTime: account.tenant.startTime, leftTime: account.tenant.leftTime })
          ) : null
        )
      );
    }
  }]);

  return SystemSetting;
}(_react.Component);

function mapStateToProps(state) {
  return {
    account: state.user.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // accountactions: bindActionCreators(accountactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SystemSetting);