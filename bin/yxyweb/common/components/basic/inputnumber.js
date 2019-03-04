'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _util = require('../../helpers/util');

var _KeyboardInputNumber = require('../common/KeyboardInputNumber');

var _KeyboardInputNumber2 = _interopRequireDefault(_KeyboardInputNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               成员				说明						类型				默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               min				最小值					Number			-Infinity
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               max				最大值					Number			Infinity
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value			当前值					Number
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               step			每次改变步数，可以为小数	Number or String	1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               defaultValue	初始值					Number
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               disabled		禁用						Boolean			false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               size			输入框大小				String			无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var InputNumber = null;

var InputNumberControl = function (_React$Component) {
  _inherits(InputNumberControl, _React$Component);

  function InputNumberControl(props) {
    _classCallCheck(this, InputNumberControl);

    var _this = _possibleConstructorReturn(this, (InputNumberControl.__proto__ || Object.getPrototypeOf(InputNumberControl)).call(this, props));

    _this.onKeyDown = function (e) {
      if (e.keyCode !== 13) return;
      _this.onPressEnter();
    };

    InputNumber = cb.electron.getSharedObject() ? _KeyboardInputNumber2.default : _antd.InputNumber;
    var iNumPoint = props.iNumPoint,
        cFormatData = props.cFormatData,
        cStyle = props.cStyle,
        bIsNull = props.bIsNull,
        bHidden = props.bHidden;

    if (cb.utils.isEmpty(iNumPoint)) iNumPoint = 2;
    var format = null,
        config = null;
    if (cFormatData) {
      try {
        format = JSON.parse(cFormatData);
      } catch (e) {}
    }
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {}
    }
    _this.state = Object.assign({
      bIsNull: bIsNull,
      value: _this.props.defaultValue,
      // min: -999999999,
      // max: 999999999,
      iNumPoint: iNumPoint,
      disabled: false,
      visible: !bHidden,
      size: 'default',
      err: '',
      msg: '',
      className: props.className || '',
      format: format
    }, config);
    return _this;
  }

  _createClass(InputNumberControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.focus) {
        var input = cb.dom((0, _reactDom.findDOMNode)(this.refs.input)).find('input');
        input.length && input[0].focus();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
      // if (this.props.focus) {
      //   let input = cb.dom(findDOMNode(this.refs.input)).find('input');
      //   // input.length && input[0].focus();
      // }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var controlType = this.props.cControlType && this.props.cControlType.trim().toLocaleLowerCase();
      var format = this.state.format;
      var iNumPoint = params.iNumPoint;

      switch (controlType) {
        case 'money':
          iNumPoint = cb.rest.AppContext.option ? cb.rest.AppContext.option.amountofdecimal : 0;
          break;
        case 'price':
          iNumPoint = cb.rest.AppContext.option ? cb.rest.AppContext.option.monovalentdecimal : 0;
          break;
      }
      if (format && format.decimal) iNumPoint = (0, _util.getPredicateValue)(format.decimal);
      if (!cb.utils.isEmpty(iNumPoint)) params.iNumPoint = iNumPoint;
      this.setState(params);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.model) return;
      if (nextProps.defaultValue != this.state.value) this.setState({ value: nextProps.defaultValue });
      if (nextProps.err != this.state.err) this.setState({ err: nextProps.err });
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(e) {
      // if (this.props.model)
      //   this.props.model.execute('blur');
      var value = this.state.value;

      value = cb.utils.isEmpty(value) ? null : value;
      if (this.props.model) {
        this.props.model.setValue(value, true);
        this.props.model.execute('blur');
      }
    }
  }, {
    key: 'handleInputFocus',
    value: function handleInputFocus(e) {
      var target = e.target;
      setTimeout(function () {
        target.setSelectionRange(0, target.value.length);
      }, 0);
    }
  }, {
    key: 'isNotCompleteNumber',
    value: function isNotCompleteNumber(num) {
      return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
    }
  }, {
    key: 'onPressEnter',
    value: function onPressEnter() {
      var value = this.state.value;

      value = this.isNotCompleteNumber(parseFloat(value, 10)) ? null : parseFloat(value, 10);
      if (this.props.model) {
        this.props.model.setValue(value, true);
        this.props.model.execute('enter');
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      // value = cb.utils.isEmpty(value) ? null : value;
      // if (this.props.model)
      //   this.props.model.setValue(value, true);
      if (value === -0) value = 1 / value < 0 ? '-0' : '0';
      this.setState({ value: value });
    }
  }, {
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-feedback has-' + val.type,
        msg: val.message
      });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var _state = this.state,
          format = _state.format,
          iNumPoint = _state.iNumPoint,
          style = _state.style,
          placeholder = _state.placeholder,
          after = _state.after,
          bottom = _state.bottom;

      var showValue = this.state.value,
          formatter = null;
      if (!cb.utils.isEmpty(showValue) && !isNaN(showValue) && iNumPoint != null) showValue = (0, _util.getRoundValue)(Number(showValue), iNumPoint);
      if (format) {
        if (cb.utils.isEmpty(showValue)) showValue = '';
        if (format.before) showValue = format.before + showValue;
        if (format.after) showValue += format.after;
        formatter = function formatter(value) {
          return '' + (format.before || '') + value + (format.after || '');
        };
      }
      var textCom = (0, _text2.default)(showValue);
      var extraProps = {};
      if (style) {
        textCom = _react2.default.createElement(
          'div',
          { className: 'input-number-has-config-style', style: style },
          textCom
        );
        extraProps.style = style;
      }
      var com = this.state.readOnly ? textCom : _react2.default.createElement(InputNumber, _extends({}, extraProps, { placeholder: placeholder, formatter: formatter, ref: 'input', min: this.state.min, max: this.state.max, precision: iNumPoint, disabled: this.state.disabled, size: this.state.size, value: this.state.value, onFocus: function onFocus(e) {
          return _this2.handleInputFocus(e);
        }, onBlur: function onBlur(e) {
          return _this2.handleInputBlur(e);
        }, onChange: function onChange(e) {
          return _this2.onChange(e);
        }, onKeyDown: this.onKeyDown, onPressEnter: function onPressEnter() {
          return _this2.onPressEnter();
        } }));
      if (!after && !bottom) return com;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'control-flex' },
          com,
          after && _react2.default.createElement(
            'span',
            null,
            after
          )
        ),
        bottom && _react2.default.createElement(
          'div',
          null,
          bottom
        )
      );
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
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var className = this.state.err + ' ' + this.state.className;
      return _react2.default.createElement(
        'div',
        { style: style, className: className },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return InputNumberControl;
}(_react2.default.Component);

exports.default = InputNumberControl;