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

var SwitchControl = function (_React$Component) {
  _inherits(SwitchControl, _React$Component);

  function SwitchControl(props) {
    _classCallCheck(this, SwitchControl);

    var _this = _possibleConstructorReturn(this, (SwitchControl.__proto__ || Object.getPrototypeOf(SwitchControl)).call(this, props));

    _this.state = {
      bIsNull: props.bIsNull,
      focus: props.focus,
      value: props.checked || false,
      checkedChildren: props.checkedChildren || '是',
      unCheckedChildren: props.unCheckedChildren || '否',
      defaultChecked: false,
      size: 'default',
      disabled: props.disabled || false,
      visible: !props.bHidden,
      readOnly: props.readOnly,
      style: {},
      className: props.className || ''
    };
    _this.handleBodyClick = _this.handleBodyClick.bind(_this);
    _this.getControl = _this.getControl.bind(_this);
    _this.baseControl = _this.baseControl.bind(_this);
    return _this;
  }

  _createClass(SwitchControl, [{
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model) {
        if (!this.props.model) {
          nextProps.model.addListener(this);
        } else {
          return;
        }
      } else {
        var checked = false;
        if (this.props.model) {
          this.props.model.removeListener(this);
          if (this.props.checked) this.setState({
            value: this.props.checked
          });
        } else {
          this.setState({
            value: nextProps.checked
          });
        }
      }
      this.setState({
        readOnly: nextProps.readOnly,
        focus: nextProps.focus,
        className: nextProps.className
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      if (this.state.readOnly) return;
      if (this.props.model) {
        this.props.model.setValue(value, true);
        // this.props.model.execute('onChange');
      } else {
        if (this.props.onChange) this.props.onChange(value);
      }
    }
  }, {
    key: 'handleBodyClick',
    value: function handleBodyClick(e) {
      if (this.contains(this.refs.div, e.target)) return;
      document.body.removeEventListener('click', this.handleBodyClick);
      this.setState({
        focus: false
      });
      if (this.props.model) this.props.model.execute('blur');
    }
  }, {
    key: 'contains',
    value: function contains(elem, target) {
      if (elem === target) return true;
      if (!elem.children.length) return false;
      for (var i = 0, len = elem.children.length; i < len; i++) {
        if (this.contains(elem.children[i], target)) return true;
      }
      return false;
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(value) {
      // if (value) {
      //   if (value != this.state.disabled) {
      this.setState({
        disabled: value
      });
      //   }
      // }
    }
  }, {
    key: 'setVisible',
    value: function setVisible(value) {
      // if (value) {
      //   if (value != this.state.visible) {
      this.setState({
        visible: value
      });
      //   }
      // }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (value === 'false') {
        this.props.model.setValue(false);
        return;
      }
      this.setState({ value: value });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var _state = this.state,
          value = _state.value,
          checkedChildren = _state.checkedChildren,
          unCheckedChildren = _state.unCheckedChildren;

      return this.state.readOnly ? value ? checkedChildren : unCheckedChildren : _react2.default.createElement(
        'div',
        { ref: 'div' },
        _react2.default.createElement(_antd.Switch, { checked: value, size: this.state.size, style: this.state.style,
          disabled: this.state.disabled, onChange: function onChange(e) {
            return _this2.onChange(e);
          } })
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
      var classname = this.state.className;
      if (!this.state.readOnly) classname = classname + ' contorl-switch';

      if (this.state.focus) document.body.addEventListener('click', this.handleBodyClick);
      return _react2.default.createElement(
        'div',
        { className: classname, style: style },
        control
      );
    }
  }]);

  return SwitchControl;
}(_react2.default.Component);

exports.default = SwitchControl;