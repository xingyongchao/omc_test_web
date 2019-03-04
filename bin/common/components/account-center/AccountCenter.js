'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _PersonalInfo = require('./PersonalInfo');

var _PersonalInfo2 = _interopRequireDefault(_PersonalInfo);

var _ChangePassWord = require('./ChangePassWord');

var _ChangePassWord2 = _interopRequireDefault(_ChangePassWord);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _user = require('../../redux/modules/user');

var accountactions = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;

var AccountCenter = function (_Component) {
  _inherits(AccountCenter, _Component);

  function AccountCenter() {
    _classCallCheck(this, AccountCenter);

    return _possibleConstructorReturn(this, (AccountCenter.__proto__ || Object.getPrototypeOf(AccountCenter)).apply(this, arguments));
  }

  _createClass(AccountCenter, [{
    key: 'handleChange',
    value: function handleChange(key) {
      var accountactions = this.props.accountactions;

      accountactions.setAccountActiveKey(key);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var account = this.props.account;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Tabs,
          { className: 'tab-list', activeKey: account.accountCurrentKey, type: 'card', animated: false, onChange: function onChange(key) {
              return _this2.handleChange(key);
            } },
          _react2.default.createElement(
            TabPane,
            { tab: '\u4E2A\u4EBA\u4FE1\u606F', key: 'personalInfo' },
            _react2.default.createElement(_PersonalInfo2.default, null)
          ),
          _react2.default.createElement(
            TabPane,
            { tab: '\u4FEE\u6539\u5BC6\u7801', key: 'changePsd' },
            _react2.default.createElement(_ChangePassWord2.default, null)
          )
        )
      );
    }
  }]);

  return AccountCenter;
}(_react.Component);

function mapStateToProps(state) {
  return {
    account: state.user.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accountactions: (0, _redux.bindActionCreators)(accountactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AccountCenter);