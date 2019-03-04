'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlatformManagement = function (_Component) {
  _inherits(PlatformManagement, _Component);

  function PlatformManagement(props) {
    _classCallCheck(this, PlatformManagement);

    var _this = _possibleConstructorReturn(this, (PlatformManagement.__proto__ || Object.getPrototypeOf(PlatformManagement)).call(this, props));

    _this.viewModel = cb.loader.initMetaCommonViewModel('PlatformManagementViewModel', 'platformManagementViewModel');
    return _this;
  }

  _createClass(PlatformManagement, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _antd.Row,
        { className: 'Platform_management' },
        _react2.default.createElement(
          _antd.Row,
          null,
          _react2.default.createElement(
            'div',
            { className: 'viewCell', style: { width: 'auto' } },
            _react2.default.createElement(
              _antd.Row,
              { style: { height: 32 } },
              _react2.default.createElement(
                'div',
                { className: 'label-control' },
                '\u81EA\u5B9A\u4E49\u9879'
              )
            )
          ),
          _react2.default.createElement(_basic.Button, { model: this.viewModel.get('upgradeUserDef'), value: '\u66F4\u65B0' })
        ),
        _react2.default.createElement(
          _antd.Row,
          null,
          _react2.default.createElement(
            'div',
            { className: 'viewCell', style: { width: 'auto' } },
            _react2.default.createElement(_basic.CheckboxEnum, { model: this.viewModel.get('cacheType'), cShowCaption: '\u7F13\u5B58\u7C7B\u578B' })
          ),
          _react2.default.createElement(_basic.Button, { className: 'Platform_management_btn', model: this.viewModel.get('refreshCache'), value: '\u5237\u65B0' })
        )
      );
    }
  }]);

  return PlatformManagement;
}(_react.Component);

exports.default = PlatformManagement;