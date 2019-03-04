'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _basic = require('../basic');

var _util = require('./util');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Group = function (_Component) {
  _inherits(Group, _Component);

  function Group(props) {
    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, props));

    _this.handleExpand = function () {
      var collapsed = _this.state.collapsed;

      _this.setState({ collapsed: !collapsed });
    };

    var cStyle = props.meta.cStyle;

    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {}
    }
    _this.state = Object.assign({
      underline: false,
      collapse: false,
      collapsed: true,
      visible: true
    }, config);
    return _this;
  }

  _createClass(Group, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          viewModel = _props.viewModel,
          meta = _props.meta;

      viewModel.on('updateViewMeta', function (args) {
        var code = args.code,
            visible = args.visible;

        if (code !== meta.cGroupCode) return;
        _this2.setState({ visible: visible });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          meta = _props2.meta,
          viewModel = _props2.viewModel,
          width = _props2.width,
          height = _props2.height,
          index = _props2.index;

      var control = (0, _util.parseContainer)(meta, viewModel, width, height, index);
      if (!control) return null;
      var _state = this.state,
          underline = _state.underline,
          collapse = _state.collapse,
          collapsed = _state.collapsed,
          config = _state.config;

      var titleControl = _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          null,
          _react2.default.createElement(
            'p',
            { className: (0, _classnames2.default)('group-title', { underline: underline }) },
            meta.cName,
            config && config.length ? _react2.default.createElement(_index.TitleTips, { config: config }) : null,
            _react2.default.createElement(
              'span',
              { className: 'group-collapse', onClick: this.handleExpand },
              collapse && _react2.default.createElement(_SvgIcon2.default, { type: collapsed ? 'zhankai' : 'shouqi' }),
              collapse && (collapsed ? '展开' : '折叠')
            )
          )
        )
      );
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)({ hide: !this.state.visible }) },
        titleControl,
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)({ hide: collapse && collapsed }) },
          control
        )
      );
    }
  }]);

  return Group;
}(_react.Component);

exports.default = Group;