'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = _antd.Menu.Item;

var DropdownControl = function (_Component) {
  _inherits(DropdownControl, _Component);

  function DropdownControl(props) {
    _classCallCheck(this, DropdownControl);

    var _this = _possibleConstructorReturn(this, (DropdownControl.__proto__ || Object.getPrototypeOf(DropdownControl)).call(this, props));

    _this.valueField = props.valueField || '';
    _this.textField = props.textField || '';
    _this.state = {
      visible: !props.bHidden
    };
    return _this;
  }

  _createClass(DropdownControl, [{
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
      var valueField = params.valueField,
          textField = params.textField;

      this.valueField = valueField;
      this.textField = textField;
      delete params.valueField;
      delete params.textField;
      this.setState(params);
      if (this.props.onVisibleChange) {
        var visible = params.visible;
        if (visible == null) visible = true;
        this.props.onVisibleChange(visible);
      }
    }
  }, {
    key: 'handleMenuClick',
    value: function handleMenuClick(e) {
      if (this.props.model) {
        this.props.model.select(e.key);
        this.props.model.fireEvent('click', e.key);
      }
    }
  }, {
    key: 'setVisible',
    value: function setVisible(visible) {
      this.setState({ visible: visible });
      if (this.props.onVisibleChange) this.props.onVisibleChange(visible);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.state.visible) return null;
      var valueField = this.valueField;
      var textField = this.textField;
      var loop = function loop(data) {
        return data.map(function (item) {
          return _react2.default.createElement(
            MenuItem,
            { key: item[valueField] },
            item[textField]
          );
        });
      };
      var menu = _react2.default.createElement(
        _antd.Menu,
        { onClick: function onClick(e) {
            return _this2.handleMenuClick(e);
          } },
        loop(this.state.dataSource || [])
      );
      var icon = this.props.iStyle === 1 ? null : this.props.icon;
      var text = this.props.iStyle === 2 ? null : this.props.value;
      var iconCom = icon ? _react2.default.createElement(_SvgIcon2.default, { className: "icon-" + icon, type: icon + (this.state.disabled ? "-disabled" : "") }) : null;
      var control = _react2.default.createElement(
        _antd.Dropdown,
        { overlay: menu },
        _react2.default.createElement(
          _antd.Button,
          { className: this.props.className, disabled: this.state.disabled },
          iconCom,
          text,
          _react2.default.createElement(_antd.Icon, { type: 'down' })
        )
      );
      return control;
    }
  }]);

  return DropdownControl;
}(_react.Component);

exports.default = DropdownControl;