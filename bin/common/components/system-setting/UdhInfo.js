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

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _systemSetting = require('../../redux/modules/systemSetting');

var systemSettingactions = _interopRequireWildcard(_systemSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UdhInfo = function (_Component) {
  _inherits(UdhInfo, _Component);

  function UdhInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UdhInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UdhInfo.__proto__ || Object.getPrototypeOf(UdhInfo)).call.apply(_ref, [this].concat(args))), _this), _this.openUdh = function () {
      var systemSettingactions = _this.props.systemSettingactions;

      systemSettingactions.openUdh();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UdhInfo, [{
    key: 'render',
    value: function render() {
      var systemSetting = this.props.systemSetting;

      var element = systemSetting.hasOpenUdh ? _react2.default.createElement(
        'div',
        { className: 'already_service_btn' },
        '\u5DF2\u5F00\u901A'
      ) : _react2.default.createElement(
        _antd.Button,
        { className: 'open_service_btn', onClick: this.openUdh },
        '\u7ACB\u5373\u5F00\u901A'
      );
      return _react2.default.createElement(
        'div',
        { className: 'open_order_service' },
        _react2.default.createElement(
          'div',
          { className: 'u_service_icon' },
          _react2.default.createElement('div', { className: 'u_logo' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'u_service_right' },
          _react2.default.createElement(
            'div',
            { className: 'u_service_h1' },
            'U\u8BA2\u8D27'
          ),
          _react2.default.createElement(
            'div',
            { className: 'u_service_p' },
            'U\u8BA2\u8D27\u662F\u4E00\u6B3E\u4F01\u4E1A\u7EA7B2B\u8BA2\u8D27\u5E73\u53F0\uFF0C\u53EF\u5B9E\u73B0\u4F01\u4E1A\u7684\u7ECF\u9500\u5546\u5728\u7EBF\u4E0B\u5355\u3001\u652F\u4ED8\u3001\u6536\u8D27\u3001\u5BF9\u8D26\uFF0C\u4E0EERP\u5B9E\u73B0\u65E0\u7F1D\u5BF9\u63A5\uFF0C\u8BA9\u4F01\u4E1A\u751F\u610F\u66F4\u5FEB\u66F4\u7B80\u5355\uFF01'
          ),
          element
        )
      );
    }
  }]);

  return UdhInfo;
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UdhInfo);