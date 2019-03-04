'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../basic');

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

    _this.state = {
      show: true
    };
    _this.keys = {};
    _this.init();
    return _this;
  }

  _createClass(Footer, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var controls = this.props.meta.controls;

      if (!controls || !controls.length) return;
      controls.forEach(function (control) {
        _this2.keys[control.cItemName] = true;
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.props.viewModel.on('modeChange', function (mode) {
        _this3.setState({ show: mode === _env2.default.VOUCHER_STATE_BROWSE });
      });
      this.props.viewModel.on('afterLoadData', function (data) {
        for (var key in _this3.keys) {
          _this3.keys[key] = data[key] ? true : false;
        }_this3.setState({ show: _this3.state.show });
      });
    }
  }, {
    key: 'parseControls',
    value: function parseControls(container) {
      var _this4 = this;

      var controls = container.controls;

      if (!controls || !controls.length) return null;
      var components = [];
      var containerCols = container.iCols || 4;
      controls.forEach(function (control) {
        components.push(_this4.parseControl(control, containerCols));
      });
      var className = this.state.show ? 'tab-bottom-txt' : 'hide';
      return _react2.default.createElement(
        _basic.Row,
        { key: container.groupId, className: className },
        _react2.default.createElement(
          _basic.Col,
          { span: 24 },
          components
        )
      );
    }
  }, {
    key: 'parseControl',
    value: function parseControl(control, containerCols) {
      var viewModel = this.props.viewModel;

      var controlWidth = 100 / containerCols;
      var controlType = control.cControlType.trim().toLocaleLowerCase();
      var modelKey = control.cItemName;
      var controlModel = viewModel.get(modelKey);
      var component = _react2.default.createElement(_basic.Input, _extends({ model: controlModel }, control));
      var className = this.keys[modelKey] ? 'viewSetting viewCell width-percent-' + controlWidth.toFixed(0) : 'hide';
      return _react2.default.createElement(
        'div',
        { key: modelKey, className: className, id: viewModel.getParams().billNo + '|' + modelKey },
        component
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.parseControls(this.props.meta);
    }
  }]);

  return Footer;
}(_react.Component);

exports.default = Footer;