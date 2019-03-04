'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputButtonPanelExample = exports.InnerInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SvgIcon = require('./SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by janeluck on 17/9/14.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import addEventListener from 'add-dom-event-listener'


function isEmpty(v) {
  return v === '0' || !v;
}

// 内部input组件用于外部渲染占位

var InnerInput = exports.InnerInput = function (_React$Component) {
  _inherits(InnerInput, _React$Component);

  function InnerInput() {
    _classCallCheck(this, InnerInput);

    return _possibleConstructorReturn(this, (InnerInput.__proto__ || Object.getPrototypeOf(InnerInput)).apply(this, arguments));
  }

  return InnerInput;
}(_react2.default.Component);

var InnerButton = function (_React$Component2) {
  _inherits(InnerButton, _React$Component2);

  function InnerButton() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, InnerButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = InnerButton.__proto__ || Object.getPrototypeOf(InnerButton)).call.apply(_ref, [this].concat(args))), _this2), _this2.onMouseDown = function (event) {
      var type = _this2.props.type;
      // 阻止虚拟键盘获得焦点, 保留原输入框的focus状态
      event.preventDefault();
      _this2.props.onMouseDown(type);
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(InnerButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        _extends({}, _lodash2.default.omit(this.props, ['children', 'onMouseDown', 'type']), { onMouseDown: this.onMouseDown,
          tabIndex: '-1' }),
        this.props.children
      );
    }
  }]);

  return InnerButton;
}(_react2.default.Component);

// todo: 1.  点击按钮的交互样式


InnerButton.propTypes = {
  type: _propTypes2.default.string,
  onMouseDown: _propTypes2.default.func,
  className: _propTypes2.default.string
};
InnerButton.defaultProps = {
  onMouseDown: function onMouseDown(value) {}
};

var InputButtonPanel = function (_Component) {
  _inherits(InputButtonPanel, _Component);

  function InputButtonPanel() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, InputButtonPanel);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = InputButtonPanel.__proto__ || Object.getPrototypeOf(InputButtonPanel)).call.apply(_ref2, [this].concat(args))), _this3), _this3.getResultString = function () {
      var originStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var str = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';


      // 回退键特殊处理
      if (str === 'back') {
        str = '';
        if (start === end) start -= 1;
      }
      //return originStr.slice(0, start) + (str === 'back' ? '' : str) + originStr.slice(end)
      //return originStr.replace(new RegExp('(^[\\d\\.]{' + start + '})[\\d\\.]{' + (end - start) + '}'), '$1' + str)
      // 根据光标的位置, 处理输入结果
      return originStr.replace(new RegExp('(.{' + start + '}).{' + (end - start) + '}'), '$1' + str);
    }, _this3.handleOkDown = function () {
      var _this3$props = _this3.props,
          onOk = _this3$props.onOk,
          value = _this3$props.value;

      onOk(value);
    }, _this3.handleMouseDown = function (type) {
      // 获取当前焦点的input或者textarea
      var activeEl = document.activeElement;
      if (['INPUT', 'TEXTAREA'].indexOf(activeEl.tagName) < 0) return;

      var value = activeEl.value || '';
      var selectionStart = activeEl.selectionStart,
          selectionEnd = activeEl.selectionEnd;


      var result = _this3.getResultString(value, selectionStart, selectionEnd, type);

      // 计算光标所在的位置
      var caretPosition = result.length - (value.length - selectionEnd);
      var _this3$props2 = _this3.props,
          onChange = _this3$props2.onChange,
          onOk = _this3$props2.onOk,
          mode = _this3$props2.mode;

      switch (type) {
        case 'clear':
          onChange('');
          break;
        case 'back':
          onChange(result);
          break;
        case '.':
          if (value.indexOf('.') < 0) onChange(result);
          break;
        case '00':
          onChange(mode !== 'text' && isEmpty(value) ? 0 : result);
          break;
        case 'sure':
          onOk(value);
          break;
        default:
          onChange(mode !== 'text' && isEmpty(value) ? type : result);
          break;
      }

      // 设置元素的光标位置
      setTimeout(function () {
        var currentV = activeEl.value;
        // 如果结果被再处理，光标定位到末尾
        if (typeof currentV !== 'undefined' && currentV != result) {
          activeEl.setSelectionRange(99999, 99999);
        } else {
          activeEl.setSelectionRange(caretPosition, caretPosition);
        }
      }, 0);
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(InputButtonPanel, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      var showOk = this.props.showOk;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { ref: function ref(wrap) {
              return _this4.wrap = wrap;
            }, className: 'InputButtonPanelWrap clearfix', onMouseDown: function onMouseDown(event) {
              event.preventDefault();
            } },
          _react2.default.createElement(
            'div',
            { className: 'num' },
            _react2.default.createElement(
              'div',
              { className: 'InputButtonPanel-row' },
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '1' },
                  '1'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '2' },
                  '2'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '3' },
                  '3'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'InputButtonPanel-row' },
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '4' },
                  '4'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '5' },
                  '5'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '6' },
                  '6'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'InputButtonPanel-row' },
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '7' },
                  '7'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '8' },
                  '8'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '9' },
                  '9'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'InputButtonPanel-row' },
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '0' },
                  '0'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '00' },
                  '00'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'InputButtonPanel-cell' },
                _react2.default.createElement(
                  InnerButton,
                  { onMouseDown: this.handleMouseDown, type: '.' },
                  '.'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)('del', { 'InputButtonPanel-hasSure': showOk }) },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                InnerButton,
                { className: 'InputButtonPanel-button-back', onMouseDown: this.handleMouseDown,
                  type: 'back' },
                _react2.default.createElement(_SvgIcon2.default, { type: 'shanchu1' })
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                InnerButton,
                { className: 'InputButtonPanel-button-clear', onMouseDown: this.handleMouseDown,
                  type: 'clear' },
                _react2.default.createElement(_SvgIcon2.default, { type: 'quanbushanchu' })
              )
            ),
            showOk && _react2.default.createElement(
              'div',
              { className: 'InputButtonPanel-button-sure' },
              _react2.default.createElement(
                InnerButton,
                { onMouseDown: this.handleOkDown, type: 'sure' },
                '\u786E\u5B9A'
              )
            )
          )
        )
      );
    }
  }]);

  return InputButtonPanel;
}(_react.Component);

InputButtonPanel.propTypes = {
  onChange: _propTypes2.default.func,
  // 是否展示确定按钮
  showOk: _propTypes2.default.bool,
  // 点击确定的交互事件
  onOk: _propTypes2.default.func
};
InputButtonPanel.defaultProps = {
  onChange: function onChange(value) {
    console.log(value);
  },
  showOk: false,
  onOk: function onOk(value) {
    console.log(value);
  }
};
exports.default = InputButtonPanel;

InputButtonPanel.InnerInput = InnerInput;

// 使用实例

var InputButtonPanelExample = exports.InputButtonPanelExample = function (_Component2) {
  _inherits(InputButtonPanelExample, _Component2);

  function InputButtonPanelExample(props) {
    _classCallCheck(this, InputButtonPanelExample);

    var _this5 = _possibleConstructorReturn(this, (InputButtonPanelExample.__proto__ || Object.getPrototypeOf(InputButtonPanelExample)).call(this, props));

    _this5.onChange = function (v) {
      _this5.setState({ value: v });
    };

    _this5.handleChange = function (e) {
      var value = e.target.value;
      _this5.setState({
        value: value
      });
    };

    _this5.onOk = function (v) {
      console.log(v);
    };

    _this5.state = {
      value: 0
    };

    return _this5;
  }

  _createClass(InputButtonPanelExample, [{
    key: 'render',
    value: function render() {

      var value = this.state.value;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          InputButtonPanel,
          { value: this.props.value, onChange: this.onChange, showOk: true, onOk: this.onOk },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              '\u4F7F\u7528'
            ),
            ' ',
            _react2.default.createElement(InnerInput, null),
            _react2.default.createElement(
              'span',
              null,
              '\u79EF\u5206'
            ),
            ' ',
            _react2.default.createElement(
              'span',
              null,
              '\u62B5\u6263'
            ),
            _react2.default.createElement(
              'span',
              null,
              value * 10
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              null,
              '\u5F53\u524D\u79EF\u5206\uFF1A'
            ),
            _react2.default.createElement(
              'span',
              null,
              value
            )
          )
        )
      );
    }
  }]);

  return InputButtonPanelExample;
}(_react.Component);