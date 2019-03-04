'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardInput1 = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keyboard = require('../keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

require('../keyboard/Keyboard.css');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keyboardInput = function (_Component) {
  _inherits(keyboardInput, _Component);

  function keyboardInput() {
    _classCallCheck(this, keyboardInput);

    return _possibleConstructorReturn(this, (keyboardInput.__proto__ || Object.getPrototypeOf(keyboardInput)).apply(this, arguments));
  }

  _createClass(keyboardInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'keyboard-box' },
        this.props.prefix,
        _react2.default.createElement(_keyboard2.default, {
          enabled: true,
          required: true,
          type: this.props.type,
          onChange: this.props.onChange,
          onBlur: this.props.onBlur,
          onFocus: this.props.onFocus,
          value: this.props.value,
          min: this.props.min,
          max: this.props.max,
          step: this.props.step,
          name: this.props.name,
          id: this.props.id,
          disabled: this.props.disabled,
          inputClassName: this.props.inputClassName,
          keyboardClassName: this.props.keyboardClassName,
          placeholder: this.props.placeholder,
          defaultKeyboard: 'us',
          isFirstLetterUppercase: false,
          isDraggable: false // optional, default is `true`
          , readOnly: this.props.readOnly // optional
          , opacity: 1 // optional
        })
      );
    }
  }]);

  return keyboardInput;
}(_react.Component);

exports.default = keyboardInput;

var KeyboardInput1 = exports.KeyboardInput1 = function (_Component2) {
  _inherits(KeyboardInput1, _Component2);

  function KeyboardInput1() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, KeyboardInput1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = KeyboardInput1.__proto__ || Object.getPrototypeOf(KeyboardInput1)).call.apply(_ref, [this].concat(args))), _this2), _this2.handleFocus = function (e) {
      if (_this2.props.onFocus) _this2.props.onFocus(e);
      if (_this2.oskOpen) return;
      _this2.oskOpen = true;
      cb.electron.sendOrder('oskOpen');
    }, _this2.handleBlur = function (e) {
      if (_this2.props.onBlur) _this2.props.onBlur(e);
      _this2.oskOpen = false;
      cb.electron.sendOrder('oskClose');
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(KeyboardInput1, [{
    key: 'render',
    value: function render() {
      var props = _extends({}, this.props);
      props.onFocus = this.handleFocus;
      props.onBlur = this.handleBlur;
      return _react2.default.createElement(_antd.Input, props);
    }
  }]);

  return KeyboardInput1;
}(_react.Component);