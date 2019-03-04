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

var MainTitle = function (_Component) {
  _inherits(MainTitle, _Component);

  function MainTitle(props) {
    _classCallCheck(this, MainTitle);

    var _this = _possibleConstructorReturn(this, (MainTitle.__proto__ || Object.getPrototypeOf(MainTitle)).call(this, props));

    _this.state = {
      finished: false
    };
    return _this;
  }

  _createClass(MainTitle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.viewModel.on('afterLoadData', function (data) {
        var bizstatus = parseInt(data.bizstatus);
        var finished = !isNaN(bizstatus) && bizstatus >= 1 ? true : false;
        _this2.setState({ finished: finished });
      });
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon(control) {
      var icon = null;
      if (control.cStyle) {
        var config = null;
        try {
          config = JSON.parse(control.cStyle);
        } catch (e) {
          config = {};
        }
        if (config.icon) icon = '#icon-' + config.icon;
      }
      return _react2.default.createElement(
        'svg',
        { key: 'icon', className: 'icon', 'aria-hidden': 'true' },
        _react2.default.createElement('use', { href: icon })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          controls = _props.controls,
          viewModel = _props.viewModel;

      if (!controls || !controls.length) return null;
      var IconControl = void 0,
          TitleControl = void 0,
          TagControl = void 0;
      controls.forEach(function (control) {
        var controlType = control.cControlType && control.cControlType.trim().toLocaleLowerCase();
        var key = control.cItemName;
        var model = viewModel.get(key);
        if (controlType == 'icon') IconControl = _this3.renderIcon(control);
        if (controlType == 'title') TitleControl = _react2.default.createElement(_basic.Span, { key: 'title', model: model });
        if (controlType == 'tag') TagControl = _react2.default.createElement(
          _antd.Tag,
          { key: 'tag', color: 'blue' },
          _react2.default.createElement(_basic.Span, { model: model })
        );
      });
      var items = [IconControl, TitleControl, TagControl];
      if (this.state.finished) items.push(_react2.default.createElement('div', { className: 'timestamp' }));
      return _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          'div',
          { className: 'pull-left main-title' },
          _react2.default.createElement(
            'div',
            { className: 'title' },
            items
          )
        )
      );
    }
  }]);

  return MainTitle;
}(_react.Component);

exports.default = MainTitle;