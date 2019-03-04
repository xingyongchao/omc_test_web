'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _basic = require('../basic');

var _Group = require('./Group');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupContainer = function (_Component) {
  _inherits(GroupContainer, _Component);

  function GroupContainer(props) {
    _classCallCheck(this, GroupContainer);

    var _this = _possibleConstructorReturn(this, (GroupContainer.__proto__ || Object.getPrototypeOf(GroupContainer)).call(this, props));

    var cStyle = props.meta.cStyle;

    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {}
    }
    _this.state = Object.assign({
      collapse: true,
      visible: true
    }, config);
    return _this;
  }

  _createClass(GroupContainer, [{
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
    key: 'handleClick',
    value: function handleClick() {
      this.setState({
        collapse: !this.state.collapse
      });
    }
  }, {
    key: 'renderButton',
    value: function renderButton() {
      var _this3 = this;

      return this.state.collapse ? _react2.default.createElement(
        _antd.Button,
        { type: 'ghost', onClick: function onClick() {
            return _this3.handleClick();
          }, className: 'putAway no-border' },
        '\u5C55\u5F00\u66F4\u591A',
        _react2.default.createElement(_antd.Icon, { type: 'down-circle' })
      ) : _react2.default.createElement(
        _antd.Button,
        { type: 'ghost', onClick: function onClick() {
            return _this3.handleClick();
          }, className: 'putAway no-border' },
        '\u6536\u8D77',
        _react2.default.createElement(_antd.Icon, { type: 'up-circle' })
      );
    }
  }, {
    key: 'renderControl',
    value: function renderControl(containers) {
      var _props2 = this.props,
          viewModel = _props2.viewModel,
          width = _props2.width,
          index = _props2.index;

      var items = [];
      containers.forEach(function (container) {
        items.push(_react2.default.createElement(_Group2.default, { key: container.groupId, meta: container, viewModel: viewModel, width: width, index: index }));
      });
      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          config = _props3.config,
          meta = _props3.meta;

      var hasButton = false;
      if (config) {
        try {
          config = JSON.parse(config);
        } catch (e) {
          config = {};
        }
        if (config.button) hasButton = true;
      }
      var controlClassName = null;
      var button = null;
      if (hasButton) {
        if (this.state.collapse) controlClassName = 'group-container-collapse';
        var buttonClassName = 'group-container-button';
        button = _react2.default.createElement(
          _basic.Row,
          { className: buttonClassName },
          this.renderButton()
        );
      }
      var control = _react2.default.createElement(
        _basic.Row,
        { className: controlClassName },
        this.renderControl(meta.containers)
      );
      return _react2.default.createElement(
        _basic.Row,
        { className: (0, _classnames2.default)('group-container', { hide: !this.state.visible }, this.state.classname) },
        control,
        button
      );
    }
  }]);

  return GroupContainer;
}(_react.Component);

exports.default = GroupContainer;