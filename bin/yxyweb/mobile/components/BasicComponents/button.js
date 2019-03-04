'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonControl = function (_React$Component) {
  _inherits(ButtonControl, _React$Component);

  function ButtonControl(props) {
    _classCallCheck(this, ButtonControl);

    var _this = _possibleConstructorReturn(this, (ButtonControl.__proto__ || Object.getPrototypeOf(ButtonControl)).call(this, props));

    _this.onClick = function () {
      if (_this.props.model) _this.props.model.fireEvent('click');
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
    key: 'setVisible',
    value: function setVisible(visible) {
      this.setState({ visible: visible });
      if (this.props.onVisibleChange) this.props.onVisibleChange(visible);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.state.visible ? {} : { display: "none" };
      var onClick = this.props.delay ? (0, _lodash.debounce)(this.onClick, 300) : this.onClick;
      var className = "button-mobile  " + (0, _classnames2.default)(this.state.className, this.state.classname);
      if (this.state.cControlType == 'primarybutton') className = className + ' ' + 'primary-button';
      if (this.state.disabled) className = className + ' ' + 'disabled-button';
      return _react2.default.createElement(
        'div',
        { style: style, className: className, onClick: onClick },
        this.state.cShowCaption
      );
    }
  }]);

  return ButtonControl;
}(_react2.default.Component);

exports.default = ButtonControl;