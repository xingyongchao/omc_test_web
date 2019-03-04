'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _richtext = require('../basic/richtext');

var _richtext2 = _interopRequireDefault(_richtext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicComponents = { RichText: _richtext2.default };

var BasicTest = function (_Component) {
  _inherits(BasicTest, _Component);

  function BasicTest(props) {
    _classCallCheck(this, BasicTest);

    var _this = _possibleConstructorReturn(this, (BasicTest.__proto__ || Object.getPrototypeOf(BasicTest)).call(this, props));

    _this.state = {
      checked: true
    };
    return _this;
  }

  _createClass(BasicTest, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ viewModel: cb.loader.initMetaCommonViewModel('TestViewModel', 'testViewModel') });
    }
  }, {
    key: 'onChange',
    value: function onChange(checked) {
      this.setState({ checked: checked });
      this.state.viewModel.setReadOnly(!checked);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.state.viewModel) return null;
      var children = [],
          BasicComponent = void 0,
          model = void 0;
      children.push(_react2.default.createElement(_antd.Switch, { defaultChecked: this.state.checked, onChange: function onChange(checked) {
          return _this2.onChange(checked);
        } }));
      for (var attr in BasicComponents) {
        BasicComponent = BasicComponents[attr];
        model = this.state.viewModel.get(attr.trim().toLocaleLowerCase());
        children.push(_react2.default.createElement(BasicComponent, { model: model }));
      }
      return _react2.default.createElement(
        'div',
        null,
        children
      );
    }
  }]);

  return BasicTest;
}(_react.Component);

exports.default = BasicTest;