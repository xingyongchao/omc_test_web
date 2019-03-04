'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _popover = require('../../../../common/components/popover');

var PopoverMap = _interopRequireWildcard(_popover);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               按钮单选框
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               参数				说明						类型					可选值				默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               onChange		选项变化时的回调函数		Function(e:Event)	无					无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value			用于设置当前选中的值		String				无					无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               defaultValue	默认选中的值				String				无					无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               size			大小，只对按钮样式生效	String				large default small	default
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RadioGroup = _antd.Radio.Group;
var RadioButton = _antd.Radio.Button;

var RadioGroupControl = function (_React$Component) {
  _inherits(RadioGroupControl, _React$Component);

  function RadioGroupControl(props) {
    _classCallCheck(this, RadioGroupControl);

    var _this = _possibleConstructorReturn(this, (RadioGroupControl.__proto__ || Object.getPrototypeOf(RadioGroupControl)).call(this, props));

    _this.handleBodyClick = function (e) {
      document.body.removeEventListener('click', _this.handleBodyClick);
      _this.setState({
        focus: false
      });
      if (_this.contains(_this.refs.div, e.target)) return;
      if (_this.props.model) _this.props.model.execute('blur');
    };

    _this.validate = function (val) {
      _this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    };

    _this.onChange = function (e) {
      if (_this.props.model) {
        _this.props.model.select(e.target.value);
        // this.props.model.execute('enter');
      }
    };

    _this.setValue = function (value) {
      var valueField = _this.state.valueField;
      var textField = _this.state.textField;
      var states = {};
      var key = void 0,
          text = void 0;
      if (value) {
        key = value[valueField];
        text = value[textField];
      }
      states['value'] = key;
      states['text'] = text;
      _this.setState(states);
    };

    _this.setListenerState = function (data) {
      var value = data.value;
      if (value) {
        _this.setValue(value);
        delete data.value;
      }
      var states = {};
      for (var attr in data) {
        if (attr === 'dataSource') {
          states['options'] = data[attr];
        } else {
          states[attr] = data[attr];
        }
      }
      _this.setState(states);
    };

    _this.getOptions = function () {
      var _this$state = _this.state,
          valueField = _this$state.valueField,
          textField = _this$state.textField,
          type = _this$state.type,
          value = _this$state.value;

      return _this.state.options.map(function (item, index) {
        if (type == 'button') {
          return _react2.default.createElement(
            RadioButton,
            { key: item[valueField], disabled: item.disabled, value: item.value },
            item.text
          );
        } else {
          var radioCom = _react2.default.createElement(
            _antd.Radio,
            { key: item[valueField], disabled: item.disabled, value: item.value },
            item.text
          );
          if (item.nameType === 'icontext') {
            var className = item.value === value ? ' selected' : '';
            return _react2.default.createElement(
              'span',
              { className: 'radio-svg-btn' },
              _react2.default.createElement(
                'div',
                { className: 'radio-icon' + className },
                _react2.default.createElement(_SvgIcon2.default, { type: item.icon, onClick: function onClick() {
                    return _this.handleIconClick(item.value);
                  } })
              ),
              radioCom
            );
          }
          if (item.nameType === 'svgtext') {
            var icon = item.icon;

            if (item.value === value) icon += '-active';
            return _react2.default.createElement(
              'span',
              { className: 'radio-svg-btn' },
              _react2.default.createElement(
                'div',
                { className: 'radio-svg' },
                _react2.default.createElement(_SvgIcon2.default, { type: icon, onClick: function onClick() {
                    return _this.handleIconClick(item.value);
                  } })
              ),
              radioCom
            );
          }
          return radioCom;
        }
      });
    };

    _this.baseControl = function () {
      var _this$state2 = _this.state,
          readOnly = _this$state2.readOnly,
          options = _this$state2.options,
          value = _this$state2.value,
          afterPopoverKey = _this$state2.afterPopoverKey;

      var _baseControl = null;
      if (readOnly) {
        var textCom = (0, _text2.default)(_this.state.text);
        var option = options.find(function (item) {
          return item.value === value;
        });
        if (option && option.nameType === 'icontext') {
          _baseControl = _react2.default.createElement(
            'span',
            { style: { float: 'left' } },
            _react2.default.createElement(
              'div',
              { className: 'radio-icon' },
              _react2.default.createElement(_SvgIcon2.default, { type: option.icon, style: { display: 'block' } })
            ),
            textCom
          );
        } else {
          _baseControl = textCom;
        }
      } else {
        var cProps = {
          value: value,
          size: _this.state.size,
          onChange: _this.onChange,
          disabled: _this.state.disabled
        };
        _baseControl = _react2.default.createElement(
          RadioGroup,
          _extends({}, cProps, { onBlur: function onBlur(e) {
              return _this.handleBlur(e);
            } }),
          _this.getOptions()
        );
      }
      var AfterComName = null;
      if (!afterPopoverKey) {
        return _baseControl;
      } else {
        AfterComName = PopoverMap[afterPopoverKey];
        return _react2.default.createElement(
          'div',
          { className: 'input-bottom' },
          _react2.default.createElement(
            'div',
            { className: 'control-flex' },
            _baseControl,
            _react2.default.createElement(AfterComName, null)
          )
        );
      }
    };

    _this.getControl = function () {
      var cShowCaption = _this.props.cShowCaption;

      var title = !_this.state.readOnly && _this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'star' }),
        cShowCaption
      ) : _react2.default.createElement(
        'label',
        null,
        cShowCaption
      );
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: _this.baseControl(), title: title }) : _this.baseControl();
      return control;
    };

    var cStyle = props.cStyle;

    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    _this.state = Object.assign({
      bIsNull: props.bIsNull,
      valueField: 'value',
      textField: 'text',
      options: [],
      value: undefined,
      disabled: false,
      visible: !props.bHidden,
      size: 'default'
    }, config);
    return _this;
  }

  _createClass(RadioGroupControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'handleIconClick',
    value: function handleIconClick(value) {
      if (this.props.model) this.props.model.select(value);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.focus) document.body.addEventListener('click', this.handleBodyClick);
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var className = "";
      if (!this.state.readOnly && !this.state.afterPopoverKey) {
        className = 'control-radio ticket-opening';
      }
      var err = this.state.err ? this.state.err : '';
      className = className + ' ' + (this.state.classname ? this.state.classname + ' ' : '') + err;
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

  return RadioGroupControl;
}(_react2.default.Component);

exports.default = RadioGroupControl;