'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

var _Util = require('../common/Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotKeyInput = function (_React$Component) {
  _inherits(HotKeyInput, _React$Component);

  function HotKeyInput(props) {
    _classCallCheck(this, HotKeyInput);

    var _this = _possibleConstructorReturn(this, (HotKeyInput.__proto__ || Object.getPrototypeOf(HotKeyInput)).call(this, props));

    _this.onKeyDown = function (e) {
      var nativeEvent = e.nativeEvent;

      var activeKeys = (0, _Util.getEventModifiers)(nativeEvent);
      var currentKey = (0, _Util.getEventKey)(nativeEvent);
      if (currentKey !== '' && _.indexOf(activeKeys, currentKey) < 0) {
        activeKeys.push(currentKey);
      }

      // preventDefault(nativeEvent)
      // stopPropagation(nativeEvent)
      var value = activeKeys.join('+');
      // if (this.props.model) {
      //   this.props.model.setValue(value, true);
      // }
      _this.setState({ value: value });
      _this.props.onChange(value);
    };

    _this.onBlur = function (e) {
      var value = e.target.value === '' ? null : e.target.value;
      if (_this.props.model) {
        _this.props.model.setValue(value, true);
        _this.props.model.execute('blur');
      }
    };

    _this.onPressEnter = function (e) {
      var value = e.target.value === '' ? null : e.target.value;
      if (_this.props.model) {
        _this.props.model.setValue(value, true);
        _this.props.model.execute('enter');
      }
    };

    _this.onChange = function (e) {
      _this.props.onChange(_this.state.value);
    };

    _this.onClear = function (e) {
      e.preventDefault();
      //this.hotkeyRef.focus();
      _this.setState({ value: '' });
      _this.props.onChange('');
    };

    _this.state = {
      value: props.value || ''
    };
    return _this;
  }

  _createClass(HotKeyInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.focus) this.hotkeyRef.refs.input.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var value = this.state.value;
      var suffix = value ? _react2.default.createElement(_antd.Icon, { type: 'cross', onMouseDown: this.onClear }) : null;

      return _react2.default.createElement(
        'span',
        { onBlur: this.onBlur },
        _react2.default.createElement(_antd.Input, { ref: function ref(node) {
            return _this2.hotkeyRef = node;
          },
          value: this.state.value,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown,
          onPressEnter: this.onPressEnter,
          suffix: suffix

        })
      );
    }
  }]);

  return HotKeyInput;
}(_react2.default.Component);

HotKeyInput.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};
HotKeyInput.defaultProps = {
  onChange: function onChange(value) {}
};
exports.default = HotKeyInput;