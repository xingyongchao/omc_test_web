'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Common = function (_Component) {
  _inherits(Common, _Component);

  function Common(props) {
    _classCallCheck(this, Common);

    var _this = _possibleConstructorReturn(this, (Common.__proto__ || Object.getPrototypeOf(Common)).call(this, props));

    _this.handleVisibleChange = function (visible) {
      _this.setState({ hide: !visible });
    };

    _this.getHeaderTool = function (controls) {
      var buttons = [],
          models = [];
      if (_this.headerToolbar) {
        _this.headerToolbar.map(function (control) {
          var model = _this.props.viewModel.get(control.cItemName);
          var visible = model.get('visible');
          models.push(model);
          if (visible) {
            buttons.push({
              icon: _react2.default.createElement(_SvgIcon2.default, { type: control.icon }),
              title: control.cShowCaption
            });
          }
        });
      }
      _antdMobile.ActionSheet.showShareActionSheetWithOptions({
        options: buttons
      }, function (buttonIndex) {
        if (models[buttonIndex]) models[buttonIndex].fireEvent('click');
      });
    };

    _this.state = {
      hide: false
    };
    _this.initMeta(props.meta);
    return _this;
  }

  _createClass(Common, [{
    key: 'initMeta',
    value: function initMeta(container) {
      var _this2 = this;

      if (!container.containers) {
        this.bodyMeta = container;
        return;
      }
      var cTemplateTitle = container.cTemplateTitle;

      this.bodyMeta = { cTemplateTitle: cTemplateTitle, containers: [] };
      container.containers.forEach(function (item) {
        var containerType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        if (containerType === 'toolbar') {
          var align = item.cAlign && item.cAlign.trim().toLocaleLowerCase();
          if (item.cGroupCode == 'footertoolbar_m' || align === 'bottom') {
            _this2.footerToolbar = item.controls;
          } else {
            _this2.headerToolbar = item.controls;
          }
        } else {
          _this2.bodyMeta.containers.push(item);
        }
      });
    }
  }, {
    key: 'getHeader',
    value: function getHeader() {
      var _props = this.props,
          returnCallback = _props.returnCallback,
          homeCallback = _props.homeCallback;

      return _react2.default.createElement(
        'div',
        { className: 'listCard-btn' },
        _react2.default.createElement(
          _antdMobile.Button,
          { onClick: returnCallback },
          _react2.default.createElement(_SvgIcon2.default, { type: 'left' }),
          this.props.meta.cTemplateTitle
        )
      );
    }
  }, {
    key: 'getFooter',
    value: function getFooter() {
      var mode = this.props.viewModel.getParams().mode;
      if (!this.footerToolbar || mode === 'browse') return null;
      return _react2.default.createElement(
        'div',
        { className: 'right-footer-button' },
        _react2.default.createElement(_Footer2.default, { controls: this.footerToolbar, model: this.props.viewModel, onVisibleChange: this.handleVisibleChange })
      );
    }
  }, {
    key: 'getNavBarRight',
    value: function getNavBarRight() {
      var _this3 = this;

      if (this.headerToolbar && this.props.viewModel.getParams().mode === 'browse') {
        this.visibleMap = {};
        this.headerToolbar && this.headerToolbar.map(function (item) {
          _this3.visibleMap[item.cItemName] = true;
        });
        return _react2.default.createElement(
          _antdMobile.Button,
          { onClick: function onClick() {
              return _this3.getHeaderTool();
            } },
          _react2.default.createElement(_antdMobile.Icon, { type: 'icon-gengduo' })
        );
      } else {
        return '';
      }
    }
  }, {
    key: 'handleHeaderVisibleChange',
    value: function handleHeaderVisibleChange(controlKey, visible) {
      var _this4 = this;

      this.visibleMap[controlKey] = visible;
      var hideCount = 0;
      this.headerToolbar && this.headerToolbar.forEach(function (item) {
        var cItemName = item.cItemName;

        if (_this4.visibleMap[cItemName]) return;
        hideCount++;
      });
      var hide = !this.headerToolbar || hideCount === this.headerToolbar.length;
      this.handleVisibleChange(!hide);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          meta = _props2.meta,
          viewModel = _props2.viewModel,
          width = _props2.width,
          height = _props2.height,
          index = _props2.index,
          returnCallback = _props2.returnCallback;
      // const header = this.getHeader();

      var body = _react2.default.createElement(_Container2.default, { className: 'height-100', meta: this.bodyMeta, viewModel: viewModel, width: width, height: height, index: index });
      var footer = this.getFooter();
      var pathList = window.location.pathname.split('/');
      var pathname = pathList[pathList.length - 1];
      return _react2.default.createElement(
        'div',
        { className: "voucher-touch " + pathname, style: { height: '100%' } },
        _react2.default.createElement(_NavBar2.default, { onLeftClick: returnCallback, title: meta.cTemplateTitle, rightContent: this.getNavBarRight() }),
        body,
        footer
      );
    }
  }]);

  return Common;
}(_react.Component);

exports.default = Common;