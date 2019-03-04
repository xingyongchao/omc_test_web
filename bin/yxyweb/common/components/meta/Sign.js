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

var Sign = function (_Component) {
  _inherits(Sign, _Component);

  function Sign(props) {
    _classCallCheck(this, Sign);

    var _this = _possibleConstructorReturn(this, (Sign.__proto__ || Object.getPrototypeOf(Sign)).call(this, props));

    if (!props.controls || props.controls.length !== 1) return _possibleConstructorReturn(_this);
    _this.state = {};
    _this.model = props.viewModel.get(props.controls[0].cItemName);
    return _this;
  }

  _createClass(Sign, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.model.addListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      this.setValue(params.value);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (value && value.icon) this.setState({ image: value.icon });
    }
  }, {
    key: 'render',
    value: function render() {
      var controls = this.props.controls;

      if (!controls || controls.length !== 1) return null;
      var image = this.state.image;

      if (!image) return null;
      return _react2.default.createElement('span', { className: 'sign-status-' + image });
    }
  }]);

  return Sign;
}(_react.Component);

exports.default = Sign;