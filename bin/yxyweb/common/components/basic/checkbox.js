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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxGroup = _antd.Checkbox.CheckboxGroup;

var CheckBox = function (_React$Component) {
  _inherits(CheckBox, _React$Component);

  function CheckBox(props) {
    _classCallCheck(this, CheckBox);

    var _this = _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this, props));

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
      type: props.type,
      bIsNull: props.bIsNull,
      value: props.value,
      visible: !props.bHideen,
      disabled: props.disabled
    }, config);
    return _this;
  }

  _createClass(CheckBox, [{
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model) {
        if (!this.props.model) {
          nextProps.model.addListener(this);
        }
      } else {
        if (this.props.model) this.props.model.removeListener(this);
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var value = e.target.checked;
      if (this.props.model) {
        this.props.model.setValue(value, true);
        this.props.model.fireEvent('check', value);
      } else {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(value) {
      // if(value){
      //   if(this.state.disabled != value){
      this.setState({
        disabled: value
      });
      //   }
      // }
    }
  }, {
    key: 'setVisible',
    value: function setVisible(value) {
      // if(value){
      //   if(this.state.visible != value){
      this.setState({
        visible: value
      });
      //   }
      // }
    }
  }, {
    key: 'baseControl',
    value: function baseControl(caption) {
      var _this2 = this;

      var control = void 0;
      if (this.props.dataSource) {
        if (Array.isArray(this.props.dataSource)) {
          control = _react2.default.createElement(CheckboxGroup, { options: this.props.dataSource, disabled: this.state.disabled, defaultValue: this.props.value || this.props.defaultValue, onChange: function onChange(e) {
              return _this2.onChange(e);
            } });
        } else {
          control = _react2.default.createElement(
            _antd.Checkbox,
            { onChange: function onChange(e) {
                return _this2.onChange(e);
              }, disabled: this.state.disabled || this.state.readOnly, checked: this.state.value || this.props.value },
            this.props.dataSource.text
          );
        }
      } else {
        var checked = this.state.value;
        if (checked === '0' || checked === 'false') checked = false;
        control = _react2.default.createElement(
          _antd.Checkbox,
          { onChange: function onChange(e) {
              return _this2.onChange(e);
            }, disabled: this.state.disabled || this.state.readOnly, checked: checked },
          caption
        );
        if (caption && !this.state.readOnly && this.state.bIsNull === false) control = _react2.default.createElement(
          'span',
          null,
          control,
          _react2.default.createElement(_antd.Icon, { type: 'star' })
        );
      }
      return control;
    }
  }, {
    key: 'relatedControl',
    value: function relatedControl(caption) {
      var control = this.baseControl(caption);
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
      var type = this.state.type;

      if (type === 'simple') return this.relatedControl(cShowCaption);
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
      var style = this.state.visible ? {} : { display: 'none' };
      return _react2.default.createElement(
        'div',
        { style: style, className: this.state.classname || '' },
        control
      );
    }
  }]);

  return CheckBox;
}(_react2.default.Component);

exports.default = CheckBox;