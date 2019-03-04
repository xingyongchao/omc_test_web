'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _util = require('../../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               参数              说明                                          类型                  可选值                         默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               type            【必须】声明 input 类型                     string                                              'text'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               id              id                                          number 或 string
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value           value 值                                     any
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               defaultValue    设置初始默认值                             any
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               size            控件大小                                        string              {'large','default','small'}     'default'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               disabled        是否禁用状态，默认为 false                    bool                                                false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               addonBefore     带标签的 input，设置前置标签                   node
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               addonAfter      带标签的 input，设置后置标签                   node
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               onPressEnter    按下回车的回调 function(e)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               autosize        自适应内容高度，只对 type="textarea" 有效       bool or object  true or { minRows: 2, maxRows: 6 }  false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Input = null;

var InputControl = function (_React$Component) {
  _inherits(InputControl, _React$Component);

  function InputControl(props) {
    _classCallCheck(this, InputControl);

    var _this = _possibleConstructorReturn(this, (InputControl.__proto__ || Object.getPrototypeOf(InputControl)).call(this, props));

    Input = cb.electron.getSharedObject() ? require('../common/KeyboardInput').default : _antd.Input;
    var cStyle = props.cStyle,
        cFormatData = props.cFormatData;

    var config = null,
        format = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    if (cFormatData) {
      try {
        format = JSON.parse(cFormatData);
      } catch (e) {}
    }
    _this.state = Object.assign({
      bIsNull: props.bIsNull,
      value: props.defaultValue,
      type: props.type || 'text',
      size: props.size || 'default',
      disabled: props.disabled || false,
      visible: !props.bHidden,
      addonBefore: props.addonBefore || '',
      readOnly: props.readOnly,
      addonAfter: props.addonAfter || '',
      placeholder: props.placeholder || '',
      autosize: props.autosize || false,
      err: props.err || '',
      msg: props.msg || '',
      format: format
    }, config);
    _this.onPressEnter = _this.onPressEnter.bind(_this);
    return _this;
  }

  _createClass(InputControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.focus) {
        if (this.refs.input.refs) {
          this.refs.input.refs.input.focus();
        } else {
          var input = cb.dom((0, _reactDom.findDOMNode)(this.refs.input)).find('input');
          input.length && input[0].focus();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
    //render前

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}
    //render后

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
    // 监听外部props的变化, 如果变化了需要更新组件的state

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.model) return;
      if (nextProps.defaultValue != this.state.value) this.setState({ value: nextProps.defaultValue });
      if (nextProps.err != this.state.err) this.setState({ err: nextProps.err });
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      // if (this.props.model) {
      // 		this.props.model.setData('value', e.target.value);
      // } else {
      // const value = e.target.value;
      // const { iMaxLength } = this.state;
      // if (iMaxLength && value.length > iMaxLength) return;
      var value = e && e.target ? e.target.value : e;
      if (this.props.onChange) this.props.onChange(value);
      this.setState({
        value: value
      });
      // }
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(e) {
      var value = e && e.target ? e.target.value : e;
      value = value === '' ? null : value;
      if (this.props.model) {
        this.props.model.setValue(value, true);
        this.props.model.execute('blur');
      }
      if (this.props.onBlur) {
        this.props.onBlur(value);
      }
    }
  }, {
    key: 'handleInputFocus',
    value: function handleInputFocus(e) {
      if (e && e.target) e.target.setSelectionRange(0, e.target.value.length);
    }
  }, {
    key: 'onPressEnter',
    value: function onPressEnter(e) {
      if (this.props.model) {
        var value = e && e.target ? e.target.value : e;
        value = value === '' ? null : value;
        this.props.model.setValue(value, true);
        this.props.model.execute('enter');
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
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var _state = this.state,
          readOnly = _state.readOnly,
          value = _state.value,
          type = _state.type,
          placeholder = _state.placeholder,
          size = _state.size,
          disabled = _state.disabled,
          addonBefore = _state.addonBefore,
          addonAfter = _state.addonAfter,
          format = _state.format,
          iMaxLength = _state.iMaxLength,
          icon = _state.icon,
          after = _state.after,
          bottom = _state.bottom;

      var showValue = value,
          prefix = null,
          suffix = null;
      if (format) {
        var formatValue = (0, _util.getFormatValue)(value, format);
        showValue = formatValue.showValue;
        prefix = formatValue.prefix;
        suffix = formatValue.suffix;
      }
      if (readOnly) return (0, _text2.default)(showValue);
      if (icon) suffix = _react2.default.createElement(_SvgIcon2.default, { type: icon });
      var props = {
        autoComplete: 'new-password',
        ref: 'input',
        type: type,
        placeholder: placeholder,
        size: size,
        disabled: disabled,
        addonBefore: addonBefore,
        addonAfter: addonAfter,
        onPressEnter: this.onPressEnter,
        value: cb.utils.isEmpty(value) ? '' : value,
        prefix: prefix,
        suffix: suffix,
        onBlur: function onBlur(e) {
          return _this2.handleInputBlur(e);
        },
        onChange: function onChange(e) {
          return _this2.handleInputChange(e);
        },
        onFocus: function onFocus(e) {
          return _this2.handleInputFocus(e);
        }
      };
      if (iMaxLength) props.maxLength = iMaxLength;
      var com = _react2.default.createElement(Input, props);
      if (!after && !bottom) return com;
      return _react2.default.createElement(
        'div',
        { className: 'input-bottom' },
        _react2.default.createElement(
          'div',
          null,
          com,
          after && _react2.default.createElement(
            'span',
            null,
            after
          )
        ),
        bottom && _react2.default.createElement(
          'div',
          { className: 'input-bottom-text' },
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
      var errClass = 'basic-input-' + this.state.type + ' has-feedback ' + (this.state.classname || '') + ' ' + this.state.err;
      return _react2.default.createElement(
        'div',
        { style: style, className: errClass },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return InputControl;
}(_react2.default.Component);

exports.default = InputControl;