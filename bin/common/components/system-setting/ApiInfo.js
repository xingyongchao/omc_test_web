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

var _systemSetting = require('../../redux/modules/systemSetting');

var systemSettingactions = _interopRequireWildcard(_systemSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiInfo = function (_Component) {
  _inherits(ApiInfo, _Component);

  function ApiInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ApiInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ApiInfo.__proto__ || Object.getPrototypeOf(ApiInfo)).call.apply(_ref, [this].concat(args))), _this), _this.getApi = function () {
      var systemSettingactions = _this.props.systemSettingactions;

      systemSettingactions.getApi();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ApiInfo, [{
    key: 'render',
    value: function render() {
      var systemSetting = this.props.systemSetting;

      var apiInfo = null;
      if (systemSetting.apiInfo) {
        var _systemSetting$apiInf = systemSetting.apiInfo,
            secret = _systemSetting$apiInf.secret,
            accessToken = _systemSetting$apiInf.accessToken,
            appId = _systemSetting$apiInf.appId;

        apiInfo = _react2.default.createElement(
          'div',
          { className: 'gettingParameters' },
          _react2.default.createElement(
            'h3',
            null,
            'Secret: ',
            secret
          ),
          _react2.default.createElement(
            'h3',
            null,
            'Token: ',
            accessToken
          ),
          _react2.default.createElement(
            'h3',
            null,
            'AppKey: ',
            appId
          )
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'p-l-20' },
        _react2.default.createElement(
          _antd.Button,
          { onClick: this.getApi },
          '\u83B7\u53D6API\u6388\u6743\u53C2\u6570'
        ),
        apiInfo
      );
    }
  }]);

  return ApiInfo;
}(_react.Component);

function mapStateToProps(state) {
  return {
    systemSetting: state.systemSetting.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    systemSettingactions: (0, _redux.bindActionCreators)(systemSettingactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ApiInfo);