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

var CheckGroup = _antd.Checkbox.Group;

var CheckboxEnum = function (_Component) {
  _inherits(CheckboxEnum, _Component);

  function CheckboxEnum(props) {
    _classCallCheck(this, CheckboxEnum);

    var _this = _possibleConstructorReturn(this, (CheckboxEnum.__proto__ || Object.getPrototypeOf(CheckboxEnum)).call(this, props));

    _this.onCheckAllChange = function (e) {
      if (_this.props.model) _this.props.model.select(e.target.checked ? _this.plainOptions : []);
      _this.setState({
        indeterminate: false,
        checkAll: e.target.checked
      });
    };

    _this.handleChange = function (checkedValues) {
      if (_this.props.model) _this.props.model.select(checkedValues);
      _this.setState({
        indeterminate: !!checkedValues.length && checkedValues.length < _this.plainOptions.length,
        checkAll: checkedValues.length === _this.plainOptions.length
      });
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
      indeterminate: false,
      checkAll: false,
      visible: true
    }, config);
    return _this;
  }

  _createClass(CheckboxEnum, [{
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
    key: 'setListenerState',
    value: function setListenerState(params) {
      var _this2 = this;

      var valueField = params.valueField,
          textField = params.textField,
          value = params.value,
          dataSource = params.dataSource;

      this.valueField = valueField;
      this.textField = textField;
      this.plainOptions = [];
      if (dataSource && dataSource.length) {
        dataSource.forEach(function (item) {
          _this2.plainOptions.push(item[valueField]);
        });
      }
      delete params.valueField;
      delete params.textField;
      delete params.value;
      this.setState(params);
      this.setValue(value);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var _this3 = this;

      var keys = [];
      if (cb.utils.isArray(value)) {
        value.forEach(function (item) {
          if (!item) return;
          keys.push(item[_this3.valueField]);
        });
      } else {
        if (value && !cb.utils.isEmpty(value[this.valueField])) keys.push(value[this.valueField]);
      }
      this.setState({ value: keys });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this4 = this;

      var _state = this.state,
          dataSource = _state.dataSource,
          value = _state.value,
          readOnly = _state.readOnly,
          disabled = _state.disabled,
          indeterminate = _state.indeterminate,
          checkAll = _state.checkAll,
          after = _state.after,
          bottom = _state.bottom;

      var options = [];
      var labels = [];
      dataSource && dataSource.forEach(function (item, index) {
        var label = item[_this4.textField];
        var itemValue = item[_this4.valueField];
        options.push({ label: label, value: itemValue });
        if (value && value.indexOf(itemValue) > -1) labels.push(label);
      });
      if (readOnly) return (0, _text2.default)(labels.join('; '));
      var com = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { float: 'left' } },
          _react2.default.createElement(CheckGroup, { value: value, options: options, disabled: disabled, onChange: this.handleChange })
        )
      );
      if (!after && !bottom) return com;
      return _react2.default.createElement(
        'div',
        { className: 'checkboxenum-placeholder' },
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
          { className: 'checkboxenum-bottom' },
          bottom
        )
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
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: title }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      return _react2.default.createElement(
        'div',
        { style: style },
        control
      );
    }
  }]);

  return CheckboxEnum;
}(_react.Component);

exports.default = CheckboxEnum;