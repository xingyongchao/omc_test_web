'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _formatDate = require('../../helpers/formatDate');

var formatDate = _interopRequireWildcard(_formatDate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimePickerControl = function (_React$Component) {
  _inherits(TimePickerControl, _React$Component);

  function TimePickerControl(props) {
    _classCallCheck(this, TimePickerControl);

    var _this = _possibleConstructorReturn(this, (TimePickerControl.__proto__ || Object.getPrototypeOf(TimePickerControl)).call(this, props));

    _this.handleBodyClick = function (e) {
      document.body.removeEventListener('click', _this.handleBodyClick);
      if (_this.contains(_this.refs.div, e.target)) return;

      if (e.target && cb.dom((0, _reactDom.findDOMNode)(e.target)).parents('div.ant-time-picker-panel').length) return; //好变态啊！！！
      if (_this.props.model) _this.props.model.execute('blur');
    };

    _this.onChange = function (time, timeString) {
      _this.timeString = timeString;
    };

    _this.validate = function (val) {
      _this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    };

    _this.baseControl = function () {
      var baseControl = void 0;
      var _this$state = _this.state,
          readOnly = _this$state.readOnly,
          value = _this$state.value,
          format = _this$state.format,
          disabled = _this$state.disabled;

      if (readOnly) {
        baseControl = (0, _text2.default)(value);
      } else {
        var pickerProps = { disabled: disabled, format: format };
        if (value) {
          pickerProps.value = (0, _moment2.default)(value, format);
        } else {
          // pickerProps.value = moment(formatDate.dateFormat(new Date(), format), format);
        }
        var addon = function addon(panel) {
          return _react2.default.createElement(
            _antd.Button,
            { size: 'small', type: 'primary', onClick: function onClick() {
                return _this.handleButtonClick(panel);
              } },
            '\u786E\u5B9A'
          );
        };
        baseControl = _react2.default.createElement(_antd.TimePicker, _extends({}, pickerProps, { onChange: _this.onChange, addon: addon }));
      }
      return baseControl;
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

    _this.state = {
      bIsNull: props.bIsNull,
      format: props.cFormatData || 'HH:mm:ss',
      visible: !props.bHidden
    };
    return _this;
  }

  _createClass(TimePickerControl, [{
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
    key: 'contains',
    value: function contains(elem, target) {
      if (elem === target) return true;
      if (!elem.children || !elem.children.length) return false;
      for (var i = 0, len = elem.children.length; i < len; i++) {
        if (this.contains(elem.children[i], target)) return true;
      }
      return false;
    }
  }, {
    key: 'handleButtonClick',
    value: function handleButtonClick(panel) {
      if (this.props.model) {
        this.props.model.setValue(this.timeString, true);
        this.props.model.execute('blur');
      }
      panel.close();
    }
  }, {
    key: 'render',
    value: function render() {
      document.body.addEventListener('click', this.handleBodyClick);
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

  return TimePickerControl;
}(_react2.default.Component);

exports.default = TimePickerControl;