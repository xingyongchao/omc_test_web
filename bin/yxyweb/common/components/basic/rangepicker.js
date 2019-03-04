'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RangePicker = _antd.DatePicker.RangePicker;

var RangePickerControl = function (_React$Component) {
  _inherits(RangePickerControl, _React$Component);

  function RangePickerControl(props) {
    _classCallCheck(this, RangePickerControl);

    var _this = _possibleConstructorReturn(this, (RangePickerControl.__proto__ || Object.getPrototypeOf(RangePickerControl)).call(this, props));

    _this.onChange = function (value, dataString) {
      console.log('From :' + dataString[0] + ' to ：' + dataString[1]);
      if (_this.props.model) _this.props.model.setValue(dataString, true);
    };

    _this.state = {
      format: props.format || 'YYYY-MM-DD',
      visible: !props.bHidden,
      readOnly: props.readOnly,
      disabled: props.disabled || false,
      err: '',
      msg: ''
    };
    return _this;
  }

  _createClass(RangePickerControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _state = this.state,
          readOnly = _state.readOnly,
          value = _state.value,
          format = _state.format,
          disabled = _state.disabled;

      var newValue = void 0,
          textValue = void 0;
      if (cb.utils.isArray(value)) {
        newValue = [];
        textValue = [];
        value.forEach(function (item) {
          newValue.push(item && (0, _moment2.default)(item, format));
          if (!item) return;
          textValue.push(item);
        });
      }
      if (readOnly) return (0, _text2.default)(textValue && textValue.join('~'));
      var control = _react2.default.createElement(RangePicker, { value: newValue, format: format, disabled: disabled, onChange: this.onChange });
      return control;
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var cShowCaption = this.props.cShowCaption;

      var title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(Icon, { type: 'star' }),
        cShowCaption
      ) : _react2.default.createElement(
        'label',
        null,
        cShowCaption
      );
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: title }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var className = this.state.err + ' ' + this.state.className;
      return _react2.default.createElement(
        'div',
        { ref: 'div', style: style, className: className },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return RangePickerControl;
}(_react2.default.Component);

exports.default = RangePickerControl;