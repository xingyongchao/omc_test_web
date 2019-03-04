'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _popover = require('../../../../common/components/popover');

var PopoverMap = _interopRequireWildcard(_popover);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               属性			说明													类型		默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               type		设置按钮类型，可选值为 primary ghost 或者不设			string	-
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               htmlType	设置 button 原生的 type 值							string	button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               icon		设置按钮的图标类型									string	-
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               shape		设置按钮形状，可选值为 circle circle-outline 或者不设	string	-
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               size		设置按钮大小，可选值为 small large 或者不设			string	default
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               loading		设置按钮载入状态	boolean	false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               onClick		click 事件的 handler	function	-
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var ButtonControl = function (_React$Component) {
  _inherits(ButtonControl, _React$Component);

  function ButtonControl(props) {
    _classCallCheck(this, ButtonControl);

    var _this = _possibleConstructorReturn(this, (ButtonControl.__proto__ || Object.getPrototypeOf(ButtonControl)).call(this, props));

    _this.onClick = function () {
      if (_this.state.onClick) {
        _this.state.onClick(_this);
      } else {
        if (_this.props.model) _this.props.model.fireEvent('click');
      }
    };

    var cStyle = props.cStyle,
        cParameter = props.cParameter;

    var config = null;
    if (cStyle || cParameter) {
      try {
        config = JSON.parse(cStyle || cParameter);
      } catch (e) {
        config = {};
      }
    }
    _this.state = Object.assign({
      disabled: _this.props.disabled,
      visible: true,
      value: _this.props.value,
      type: _this.props.type,
      size: 'default',
      icon: _this.props.icon,
      shape: _this.props.shape,
      className: _this.props.className,
      onClick: _this.props.onClick
    }, config);
    return _this;
  }

  _createClass(ButtonControl, [{
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
    key: 'setListenerState',
    value: function setListenerState(params) {
      this.setState(params);
      if (this.props.onVisibleChange) {
        var visible = params.visible;
        if (visible == null) visible = true;
        this.props.onVisibleChange(visible);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'setVisible',
    value: function setVisible(visible) {
      this.setState({ visible: visible });
      if (this.props.onVisibleChange) this.props.onVisibleChange(visible);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.state.visible ? {} : { display: "none" };
      if (this.props.model) {
        var icon = this.props.iStyle === 1 ? null : this.props.icon;
        var text = this.props.iStyle === 2 ? null : this.state.value;
        var iconCom = icon ? _react2.default.createElement(_SvgIcon2.default, { className: "icon-" + icon, type: icon + (this.state.disabled ? "-disabled" : "") }) : null;
        if (this.state.popoverKey) {
          var ComName = PopoverMap[this.state.popoverKey];
          if (!ComName) return null;
          return _react2.default.createElement(
            ComName,
            { model: this.props.model },
            _react2.default.createElement(
              _antd.Button,
              { className: 'no-border-radius m-l-10' },
              iconCom,
              text
            )
          );
        }
        var onClick = this.props.delay ? (0, _lodash.debounce)(this.onClick, 300) : this.onClick;
        return _react2.default.createElement(
          _antd.Button,
          { style: style, disabled: this.state.disabled, type: this.state.type, shape: this.state.shape,
            size: this.state.size,
            className: (0, _classnames2.default)(this.state.className, this.state.classname), onClick: onClick, id: this.props.id },
          iconCom,
          text
        );
      } else {
        var _onClick = this.props.delay && this.props.onClick ? (0, _lodash.debounce)(this.props.onClick, 300) : this.props.onClick;
        return _react2.default.createElement(_antd.Button, _extends({}, this.props, { disabled: this.state.disabled, onClick: _onClick }));
      }
    }
  }]);

  return ButtonControl;
}(_react2.default.Component);

exports.default = ButtonControl;