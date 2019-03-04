'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../basic');

var _index = require('./index');

var MetaComponents = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardHeaderControl = function (_Component) {
  _inherits(CardHeaderControl, _Component);

  function CardHeaderControl(props) {
    _classCallCheck(this, CardHeaderControl);

    var _this = _possibleConstructorReturn(this, (CardHeaderControl.__proto__ || Object.getPrototypeOf(CardHeaderControl)).call(this, props));

    _this.state = {
      hide: false
    };
    _this.leftToolbar = null;
    _this.rightToolbar = null;
    _this.mainTitle = null;
    _this.statusBar = null;
    _this.processGroup = null;
    _this.visibleMap = { left: true, right: true };
    return _this;
  }

  _createClass(CardHeaderControl, [{
    key: 'handleVisibleChange',
    value: function handleVisibleChange(align, visible) {
      this.visibleMap[align] = visible;
      var hide = false;
      if (this.leftToolbar && this.rightToolbar) {
        if (!this.visibleMap.left && !this.visibleMap.right) hide = true;
      } else {
        if (this.leftToolbar) {
          if (!this.visibleMap.left) hide = true;
        }
        if (this.rightToolbar) {
          if (!this.visibleMap.right) hide = true;
        }
      }
      if (hide) {
        if (this.mainTitle || this.statusBar || this.processGroup) hide = false;
      }
      this.setState({ hide: hide });
    }
  }, {
    key: 'getMetaContainer',
    value: function getMetaContainer(container) {
      var _this2 = this;

      var model = this.props.model;

      var containerType = container.cControlType && container.cControlType.trim().toLocaleLowerCase();
      switch (containerType) {
        case 'toolbar':
          var align = container.cAlign === 'right' ? 'right' : 'left';
          var toolbar = _react2.default.createElement(MetaComponents.Toolbar, { align: container.cAlign, controls: container.controls, model: model, onVisibleChange: function onVisibleChange(visible) {
              return _this2.handleVisibleChange(align, visible);
            }, delay: true });
          align === 'right' ? this.rightToolbar = toolbar : this.leftToolbar = toolbar;
          break;
        case 'maintitle':
          break;
          this.mainTitle = _react2.default.createElement(MetaComponents.MainTitle, { key: containerType, controls: container.controls, viewModel: model });
          break;
        case 'statusbar':
          this.statusBar = _react2.default.createElement(MetaComponents.StatusBar, { key: containerType, viewModel: model });
          break;
        case 'processgroup':
          this.processGroup = _react2.default.createElement(MetaComponents.ProcessGroup, { key: containerType, viewModel: model });
          break;
      }
    }
  }, {
    key: 'getHeader',
    value: function getHeader() {
      var _this3 = this;

      this.props.meta.containers.forEach(function (container) {
        _this3.getMetaContainer(container);
      });
      var toolbar = null;
      if (this.leftToolbar && this.rightToolbar) {
        toolbar = _react2.default.createElement(
          _basic.Row,
          { key: 'toolbar' },
          _react2.default.createElement(
            'div',
            { style: { float: 'left' } },
            this.leftToolbar
          ),
          _react2.default.createElement(
            'div',
            { style: { float: 'right' } },
            this.rightToolbar
          )
        );
      } else {
        if (this.leftToolbar) toolbar = this.leftToolbar;
        if (this.rightToolbar) toolbar = _react2.default.createElement(
          'div',
          null,
          this.rightToolbar
        );
      }
      return [toolbar, this.mainTitle, this.statusBar, this.processGroup];
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.meta.containers) return null;
      var controls = this.getHeader();
      var className = this.state.hide ? 'hide' : 'list-top-toolbar';
      return _react2.default.createElement(
        'div',
        { className: className },
        controls
      );
    }
  }]);

  return CardHeaderControl;
}(_react.Component);

exports.default = CardHeaderControl;