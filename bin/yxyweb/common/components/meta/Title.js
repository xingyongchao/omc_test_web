'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Title = function (_Component) {
  _inherits(Title, _Component);

  function Title(props) {
    _classCallCheck(this, Title);

    var _this = _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).call(this, props));

    _this.state = {
      text: props.meta.cName
    };
    return _this;
  }

  _createClass(Title, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.viewModel.on('modeChange', function (mode) {
        var prefix = '';
        switch (mode) {
          case _env2.default.VOUCHER_STATE_ADD:
            prefix = '新增';
            break;
          case _env2.default.VOUCHER_STATE_EDIT:
            prefix = '编辑';
            break;
        }
        _this2.setState({ text: prefix + _this2.props.meta.cName });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.props.meta.cStyle;
      if (!style) style = '{}';
      return _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          null,
          _react2.default.createElement(
            'div',
            { className: 'viewSetting viewCell', style: JSON.parse(style) },
            _react2.default.createElement(
              'h1',
              null,
              this.state.text
            )
          )
        )
      );
    }
  }]);

  return Title;
}(_react.Component);

exports.default = Title;