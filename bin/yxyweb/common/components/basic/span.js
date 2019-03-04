'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var SpanControl = function (_React$Component) {
  _inherits(SpanControl, _React$Component);

  function SpanControl(props) {
    _classCallCheck(this, SpanControl);

    var _this = _possibleConstructorReturn(this, (SpanControl.__proto__ || Object.getPrototypeOf(SpanControl)).call(this, props));

    _this.state = {
      value: _this.props.value,
      style: _this.props.style
    };
    return _this;
  }

  _createClass(SpanControl, [{
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
    key: 'setListenerState',
    value: function setListenerState(params) {
      this.setValue(params.value);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        value = value['text'];
      }
      this.setState({
        value: value
      });
    }
    // componentWillReceiveProps(nextProps) {
    //   this.setState({
    //     value: nextProps.value,
    //     style: nextProps.style
    //   });
    // }

  }, {
    key: 'render',
    value: function render() {
      var cShowCaption = this.props.cShowCaption;

      if (cShowCaption) {
        var control = (0, _text2.default)(this.state.value);
        var title = _react2.default.createElement(
          'label',
          null,
          cShowCaption
        );
        return _react2.default.createElement(_label2.default, { control: control, title: title });
      }
      return _react2.default.createElement(
        'span',
        { style: this.state.style },
        this.state.value || '未知'
      );
    }
  }]);

  return SpanControl;
}(_react2.default.Component);

exports.default = SpanControl;