'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwitchLabelControl = function (_React$Component) {
  _inherits(SwitchLabelControl, _React$Component);

  function SwitchLabelControl(props) {
    _classCallCheck(this, SwitchLabelControl);

    var _this = _possibleConstructorReturn(this, (SwitchLabelControl.__proto__ || Object.getPrototypeOf(SwitchLabelControl)).call(this, props));

    _this.state = {
      value: props.value || false
    };

    return _this;
  }

  _createClass(SwitchLabelControl, [{
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
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      if (this.props.model) this.props.model.setValue(!this.state.value, true);
      if (this.props.onChange) this.props.onChange(!this.state.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return this.state.value ? _react2.default.createElement(
        'span',
        { style: { height: '30px' }, className: 'red-circle', onClick: function onClick() {
            return _this2.onClick();
          } },
        '\u8D1F\u8D23\u4EBA'
      ) : _react2.default.createElement('div', { style: { height: '30px' }, onClick: function onClick() {
          return _this2.onClick();
        } });
    }
  }]);

  return SwitchLabelControl;
}(_react2.default.Component);

exports.default = SwitchLabelControl;