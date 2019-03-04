'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _InputButtonPanel = require('./InputButtonPanel');

var _InputButtonPanel2 = _interopRequireDefault(_InputButtonPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keyboardInputNumber = function (_Component) {
  _inherits(keyboardInputNumber, _Component);

  function keyboardInputNumber(props) {
    _classCallCheck(this, keyboardInputNumber);

    var _this = _possibleConstructorReturn(this, (keyboardInputNumber.__proto__ || Object.getPrototypeOf(keyboardInputNumber)).call(this, props));

    _this.handleVisibleChange = function (visible) {
      _this.setState({ visible: visible });
    };

    _this.onOk = function () {
      if (_this.props.onPressEnter) _this.props.onPressEnter();
      _this.setState({ visible: false });
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(keyboardInputNumber, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          onChange = _props.onChange;

      return _react2.default.createElement(
        'div',
        { className: 'billing-inputpanel' },
        _react2.default.createElement(
          _antd.Popover,
          { trigger: 'click', onVisibleChange: this.handleVisibleChange, visible: this.state.visible, placement: 'bottom', content: _react2.default.createElement(_InputButtonPanel2.default, { showOk: true, mode: 'text', value: value, onChange: onChange, onOk: this.onOk }), overlayClassName: 'inputpanel-pop touch-single-payment' },
          this.props.noInputNum ? _react2.default.createElement(_antd.Input, this.props) : _react2.default.createElement(_antd.InputNumber, this.props)
        )
      );
    }
  }]);

  return keyboardInputNumber;
}(_react.Component);

exports.default = keyboardInputNumber;