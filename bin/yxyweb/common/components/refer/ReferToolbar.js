'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBox = _antd.Input.Search;

var ReferToolbar = function (_React$Component) {
  _inherits(ReferToolbar, _React$Component);

  function ReferToolbar(props) {
    _classCallCheck(this, ReferToolbar);

    var _this = _possibleConstructorReturn(this, (ReferToolbar.__proto__ || Object.getPrototypeOf(ReferToolbar)).call(this, props));

    _this.handleInputChange = function (e) {
      _this.setState({
        value: e.target.value
      });
    };

    _this.handleInputBlur = function (e) {
      var value = e.target.value === '' ? null : e.target.value;
      if (_this.props.model) _this.searchBoxModel.setValue(value, true);
    };

    _this.state = {};
    return _this;
  }

  _createClass(ReferToolbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) {
        this.props.model.addListener(this);
        this.searchBoxModel = this.props.model.get('searchBox');
        this.searchBoxModel.addListener(this);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) {
        this.props.model.removeListener(this);
        this.searchBoxModel = this.props.model.get('searchBox');
        this.searchBoxModel.removeListener(this);
      }
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange(args) {
      console.log(args);
      if (this.props.model) this.props.model.get('switch').execute('change', args);
    }
  }, {
    key: 'handleOnSearch',
    value: function handleOnSearch(value) {
      if (this.props.model) this.searchBoxModel.execute('search', value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _basic.Row,
        { className: 'refer-toolbar' },
        _react2.default.createElement(
          'div',
          { style: { float: 'left', display: this.props.filterId ? 'none' : '' } },
          _react2.default.createElement(SearchBox, { value: this.state.value, onChange: this.handleInputChange, onBlur: this.handleInputBlur, placeholder: this.state.placeholder || '请输入', onSearch: function onSearch(e) {
              return _this2.handleOnSearch(e);
            } })
        ),
        _react2.default.createElement(
          'div',
          { style: { float: 'right' } },
          _react2.default.createElement(_basic.Button, { model: this.props.model.get('reload'), value: '\u663E\u793A\u5168\u90E8' })
        )
      );
      return _react2.default.createElement(
        _basic.Row,
        { colCount: 24, className: 'refer-toolbar' },
        _react2.default.createElement(
          _basic.Col,
          { span: 8 },
          _react2.default.createElement(SearchBox, { value: this.state.value, onChange: this.handleInputChange, onBlur: this.handleInputBlur, placeholder: '\u8BF7\u8F93\u5165', onSearch: function onSearch(e) {
              return _this2.handleOnSearch(e);
            } })
        ),
        _react2.default.createElement(
          _basic.Col,
          { span: 5, offset: 11, style: { textAlign: 'right' } },
          _react2.default.createElement(_basic.Button, { type: 'ghost', icon: 'reload', shape: 'circle-outline', model: this.props.model.get('reload'), className: 'm-l-10 no-border' })
        )
      );
    }
  }]);

  return ReferToolbar;
}(_react2.default.Component);

exports.default = ReferToolbar;
;