'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LabelSwitchControl = function (_React$Component) {
  _inherits(LabelSwitchControl, _React$Component);

  function LabelSwitchControl(props) {
    _classCallCheck(this, LabelSwitchControl);

    var _this = _possibleConstructorReturn(this, (LabelSwitchControl.__proto__ || Object.getPrototypeOf(LabelSwitchControl)).call(this, props));

    _this.state = {
      value: props.value || {
        showname: '',
        name: '',
        enabled: false
      },
      checkedChildren: props.checkedChildren || '开',
      unCheckedChildren: props.unCheckedChildren || '关',
      defaultChecked: false,
      size: 'default',
      disabled: props.disabled || false,
      visible: !props.bHidden,
      readOnly: props.readOnly,
      style: {}
    };

    _this.getControl = _this.getControl.bind(_this);
    return _this;
  }

  _createClass(LabelSwitchControl, [{
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model) {
        if (!this.props.model) {
          nextProps.model.addListener(this);
        }
      } else {
        if (this.props.model) {
          this.props.model.removeListener(this);
          this.setState({
            value: nextProps.value
          });
        }
      }
      if (nextProps.value != 'undefined' & nextProps.value != undefined) {
        this.setState({
          readOnly: nextProps.readOnly,
          value: nextProps.value
        });
      } else {
        this.setState({
          readOnly: nextProps.readOnly
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      var val = this.state.value;
      val.enabled = value;
      if (this.state.readOnly) return;
      if (this.props.model) {
        this.props.model.setValue(val, true);
      } else {
        if (this.props.onChange) this.props.onChange(val);
      }
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _this2 = this;

      return _react2.default.createElement(_antd.Switch, { checked: this.state.value.enabled, size: this.state.size, style: this.state.style,
        disabled: this.state.disabled, onChange: function onChange(e) {
          return _this2.onChange(e);
        }, checkedChildren: this.state.checkedChildren,
        unCheckedChildren: this.state.unCheckedChildren });
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };

      return _react2.default.createElement(
        _row2.default,
        { style: style, colCount: 2 },
        _react2.default.createElement(
          _col2.default,
          { span: 1 },
          this.state.value.showname
        ),
        _react2.default.createElement(
          _col2.default,
          { span: 1 },
          control
        )
      );
    }
  }]);

  return LabelSwitchControl;
}(_react2.default.Component);

exports.default = LabelSwitchControl;