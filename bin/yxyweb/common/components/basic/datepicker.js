'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactDom = require('react-dom');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               参数        	       		说明					类型				默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value	              	日期					string or Date	无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               defaultValue			默认日期				string or Date	无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               format					展示的日期格式		string			"yyyy-MM-dd"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               disabledDate			不可选择的日期		function	无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               disabled				禁用	bool			false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               style					自定义输入框样式		object	{}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               popupStyle				格外的弹出日历样式	object	{}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               size					输入框大小，large 高度为 32px，small 为 22px，默认是 28px	string	无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               locale					国际化配置								object	默认配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               onOk					点击确定按钮的回调						function(Date value)	无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               toggleOpen				弹出日历和关闭日历的回调					function(status)	无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               getCalendarContainer	定义浮层的容器，默认为 body 上新建 div		function(trigger)	无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               showTime				增加时间选择功能							Object or Boolean	TimePicker Options
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var DatePickerControl = function (_React$Component) {
  _inherits(DatePickerControl, _React$Component);

  function DatePickerControl(props) {
    _classCallCheck(this, DatePickerControl);

    var _this = _possibleConstructorReturn(this, (DatePickerControl.__proto__ || Object.getPrototypeOf(DatePickerControl)).call(this, props));

    _this.onOk = function () {
      _this.props.model.execute('blur');
    };

    _this.handleBodyClick = _this.handleBodyClick.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.state = {
      bIsNull: props.bIsNull,
      focus: props.focus,
      value: null,
      format: props.cFormatData || 'YYYY-MM-DD',
      disabled: false,
      visible: !props.bHidden,
      style: {},
      size: 'default',
      locale: '',
      err: '',
      msg: '',
      className: props.className || '',
      isInFilterJSX: props.isInFilterJSX
    };
    return _this;
  }

  _createClass(DatePickerControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) {
        this.props.model.addListener(this);
      }
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
    key: 'handleBodyClick',
    value: function handleBodyClick(e) {
      document.body.removeEventListener('click', this.handleBodyClick);
      if (this.contains(this.refs.div, e.target)) return;

      if (e.target && cb.dom((0, _reactDom.findDOMNode)(e.target)).parents('div.ant-calendar').length) return; //好变态啊！！！
      if (this.props.model) this.props.model.execute('blur');
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      if (this.props.model) {
        var dateString = value ? value.format(this.state.format) : null;
        this.props.model.setValue(dateString, true);
        if (this.state.format && this.state.format.indexOf('mm') > -1) return;
        this.props.model.execute('blur');
      }
    }
  }, {
    key: 'toggleOpen',
    value: function toggleOpen(status) {
      if (this.props.model) {
        this.props.model.fireEvent('toggleOpen');
      }
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
    key: 'contains',
    value: function contains(elem, target) {
      if (elem === target) return true;
      if (!elem || !elem.children || !elem.children.length) return false;
      for (var i = 0, len = elem.children.length; i < len; i++) {
        if (this.contains(elem.children[i], target)) return true;
      }
      return false;
    }
  }, {
    key: 'getCalendarContainer',
    value: function getCalendarContainer() {
      return document.getElementById('popup-container');
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var _state = this.state,
          value = _state.value,
          format = _state.format;

      var showValue = value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' ? (0, _moment2.default)(value, format) : '';
      var baseControl = void 0;
      if (this.state.readOnly) {
        baseControl = (0, _text2.default)(showValue ? showValue.format(format) : showValue);
      } else {
        var showTime = this.state.format && this.state.format.indexOf('mm') > -1;
        var pickerProps = { value: showValue || null };
        if (cb.rest.interMode === 'touch') pickerProps.getCalendarContainer = this.getCalendarContainer;
        baseControl = _react2.default.createElement(_antd.DatePicker, _extends({ placeholder: null, onOpenChange: function onOpenChange(e) {
            return _this2.toggleOpen(e);
          }, showTime: showTime, onOk: this.onOk, locale: this.state.locale, size: this.state.size, style: this.state.style, disabled: this.state.disabled, format: this.state.format }, pickerProps, { onChange: this.onChange }));
      }

      return baseControl;
    }
  }, {
    key: 'relatedControl',
    value: function relatedControl() {
      var control = this.baseControl();
      var relatedControl = this.props.relatedControl;

      if (!relatedControl) return control;
      return _react2.default.createElement(
        'div',
        { className: 'has-related' },
        _react2.default.createElement(
          'div',
          { className: 'viewCell' },
          control
        ),
        relatedControl
      );
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var cShowCaption = this.props.cShowCaption;

      var title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'star' }),
        cShowCaption
      ) : _react2.default.createElement(
        'label',
        null,
        cShowCaption
      );
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.relatedControl(), title: title }) : this.relatedControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      document.body.addEventListener('click', this.handleBodyClick);
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var className = this.state.err + ' ' + this.state.className;
      if (this.state.isInFilterJSX) className = className + " isInFilterJSX isInFilterJSX-DatePicker";
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

  return DatePickerControl;
}(_react2.default.Component);

exports.default = DatePickerControl;