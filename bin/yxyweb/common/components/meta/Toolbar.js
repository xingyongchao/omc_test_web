'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

var _sumareasetting = require('../basic/sumareasetting');

var _sumareasetting2 = _interopRequireDefault(_sumareasetting);

var _publishmenu = require('../basic/publishmenu');

var _publishmenu2 = _interopRequireDefault(_publishmenu);

var _Print = require('./Print');

var _Print2 = _interopRequireDefault(_Print);

var _Draftbutton = require('./Draftbutton');

var _Draftbutton2 = _interopRequireDefault(_Draftbutton);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

var _toolbar = require('../../../../common/components/toolbar');

var ToolbarIndex = _interopRequireWildcard(_toolbar);

var _summarySetting = require('../summary-setting');

var _summarySetting2 = _interopRequireDefault(_summarySetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolbarMap = {};
for (var attr in ToolbarIndex) {
  ToolbarMap[attr.trim().toLocaleLowerCase()] = ToolbarIndex[attr];
}var SubMenu = _antd.Menu.SubMenu;
var MenuItem = _antd.Menu.Item;

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    var controls = props.controls,
        showCount = props.showCount;

    _this.state = Object.assign({
      flex: props.align === 'right' ? 'end' : 'start',
      hide: false
    }, _this.buildState(controls, showCount));
    var keyMap = {};
    _this.recursive(_this.state.controls, function (key, value) {
      keyMap[key] = value;
    });
    _this.keyMap = keyMap;
    var visibleMap = {};
    _this.state.controls.forEach(function (item) {
      visibleMap[item.cItemName] = true;
    });
    _this.visibleMap = visibleMap;
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'buildState',
    value: function buildState(controls, showCount) {
      controls = controls || [];
      showCount = showCount != null ? showCount : controls.length;
      return { controls: controls, showCount: showCount };
    }
  }, {
    key: 'recursive',
    value: function recursive(data, callback) {
      var _this2 = this;

      data.forEach(function (item) {
        callback.call(_this2, item.cItemName, item);
        if (item.children) _this2.recursive(item.children, callback);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.menuControls.map(function (control) {
        var controlModel = _this3.props.model.get(control.cItemName);
        if (controlModel) controlModel.addListener(_this3);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var controls = nextProps.controls,
          showCount = nextProps.showCount;

      this.setState(this.buildState(controls, showCount));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this4 = this;

      this.menuControls.map(function (control) {
        var controlModel = _this4.props.model.get(control.cItemName);
        if (controlModel) controlModel.removeListener(_this4);
      });
    }
  }, {
    key: 'handleVisibleChange',
    value: function handleVisibleChange(controlKey, visible) {
      var _this5 = this;

      this.visibleMap[controlKey] = visible;
      var hideCount = 0;
      var controls = this.state.controls;

      controls.forEach(function (item) {
        var cItemName = item.cItemName;

        if (_this5.visibleMap[cItemName]) return;
        hideCount++;
      });
      var hide = hideCount === controls.length;
      this.setState({ hide: hide });
      if (this.props.onVisibleChange) this.props.onVisibleChange(!hide);
    }
  }, {
    key: 'parseShowButtons',
    value: function parseShowButtons() {
      var _this6 = this;

      var delay = this.props.delay;

      var showCount = this.state.showCount,
          showButtons = [];
      var realButtonCount = 0;
      this.state.controls.map(function (control, index) {
        if (realButtonCount === showCount) return;
        var ctrlType = control.cControlType.trim().toLocaleLowerCase();
        var caption = control.cShowCaption;
        var controlKey = control.cItemName;
        //  ctrlType = 'draftbutton';
        if (controlKey === 'btnPreview' && _env2.default.INTERACTIVE_MODE !== 'touch') ctrlType = 'printbutton';
        if (controlKey.toLocaleLowerCase() === 'btnsumSetting'.toLocaleLowerCase()) ctrlType = 'sumsettingbutton';
        if (controlKey.toLocaleLowerCase() === 'btnMenupublish'.toLocaleLowerCase()) ctrlType = 'menupublishbutton';

        var controlModel = _this6.props.model.get(controlKey);
        var button = void 0;
        var id = _this6.props.model.getParams().billNo + '|' + controlKey;
        switch (ctrlType) {
          case 'dropdownbutton':
            var className = showCount === 1 ? undefined : 'm-r-10';
            button = _react2.default.createElement(_basic.DropdownButton, _extends({ value: caption, model: controlModel }, control, { className: className }));
            realButtonCount++;
            break;
          case 'dropdown':
            button = _react2.default.createElement(_basic.Dropdown, _extends({ onVisibleChange: function onVisibleChange(visible) {
                return _this6.handleVisibleChange(controlKey, visible);
              }, value: caption, model: controlModel }, control, { className: 'no-border-radius m-l-10' }));
            realButtonCount++;
            break;
          case 'printbutton':
            button = _react2.default.createElement(_Print2.default, _extends({ onVisibleChange: function onVisibleChange(visible) {
                return _this6.handleVisibleChange(controlKey, visible);
              }, value: caption, model: controlModel }, control));
            realButtonCount++;
            break;
          case 'sumsettingbutton':
            button = _react2.default.createElement(_sumareasetting2.default, { viewModel: _this6.props.model, name: control.cShowCaption, className: 'm-l-10' });
            realButtonCount++;
            break;
          case 'menupublishbutton':
            button = _react2.default.createElement(_publishmenu2.default, { viewModel: _this6.props.model, name: control.cShowCaption, className: 'm-l-10' });
            realButtonCount++;
            break;
          case 'summarysetting':
            button = _react2.default.createElement(_summarySetting2.default, { viewModel: _this6.props.model, meta: control });
            realButtonCount++;
            break;
          case 'button':
            button = _react2.default.createElement(_basic.Button, _extends({ onVisibleChange: function onVisibleChange(visible) {
                return _this6.handleVisibleChange(controlKey, visible);
              }, value: caption, model: controlModel, delay: delay }, control, { className: 'no-border-radius m-l-10', id: id }));
            realButtonCount++;
            break;
          case 'draftbutton':
            button = _react2.default.createElement(_Draftbutton2.default, _extends({ onVisibleChange: function onVisibleChange(visible) {
                return _this6.handleVisibleChange(controlKey, visible);
              }, value: caption, model: controlModel }, control, { controls: _this6.state.controls }));
            realButtonCount++;
            break;
          case 'primarybutton':
            button = _react2.default.createElement(_basic.Button, _extends({ onVisibleChange: function onVisibleChange(visible) {
                return _this6.handleVisibleChange(controlKey, visible);
              }, value: caption, model: controlModel, delay: delay }, control, { className: 'no-border-radius m-l-10', type: 'primary', id: id }));
            realButtonCount++;
            break;
          case 'input':
            button = _react2.default.createElement(_basic.Input, _extends({ model: controlModel }, control));
            realButtonCount++;
            break;
          case 'checkbox':
            button = _react2.default.createElement(_basic.CheckBox, _extends({ model: controlModel }, control));
            realButtonCount++;
            break;
          case 'spliter':
            button = _react2.default.createElement('span', { style: {
                padding: 10
              } });
            break;
          default:
            var ComName = ToolbarMap[ctrlType];
            if (ComName) {
              button = _react2.default.createElement(ComName, _extends({ model: controlModel }, control));
              realButtonCount++;
            }
            break;
        }
        if (button) {
          showButtons.push(button);
          _this6.breakIndex = index;
        }
      });
      return showButtons;
    }
  }, {
    key: 'parseMenuButtons',
    value: function parseMenuButtons() {
      var _this7 = this;

      var breakIndex = this.breakIndex,
          menuButtons = [];
      this.menuControls = [];
      this.state.controls.map(function (control, index) {
        if (index <= breakIndex) return;
        var caption = control.cShowCaption;
        var key = control.cItemName;
        var disabled = control.disabled;
        var menuItemCom = control.icon ? _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_antd.Icon, { type: control.icon }),
          _react2.default.createElement(
            'span',
            null,
            caption
          )
        ) : caption;
        var menuButton = _react2.default.createElement(
          MenuItem,
          { key: key, disabled: disabled },
          menuItemCom
        );
        menuButtons.push(menuButton);
        _this7.menuControls.push(control);
      });
      return menuButtons;
    }
  }, {
    key: 'handleMenuClick',
    value: function handleMenuClick(e) {
      var controlModel = this.props.model.get(e.key);
      if (controlModel) controlModel.fireEvent('click');
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(value, key) {
      var item = this.keyMap[key];
      if (item) item.disabled = value;
      this.setState({
        controls: this.state.controls
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var control = [];
      var showButtons = this.parseShowButtons();
      control.push(_react2.default.createElement(
        _basic.Col,
        { key: 'show', span: 'auto' },
        showButtons
      ));
      var menuButtons = this.parseMenuButtons();
      if (menuButtons.length) {
        var menu = _react2.default.createElement(
          _antd.Menu,
          { onClick: function onClick(e) {
              return _this8.handleMenuClick(e);
            }, mode: 'horizontal', className: 'no-border moreButton' },
          _react2.default.createElement(
            SubMenu,
            { title: _react2.default.createElement(
                'span',
                null,
                '\u6279\u91CF\u64CD\u4F5C',
                _react2.default.createElement(_antd.Icon, { type: 'tagall' })
              ) },
            menuButtons
          )
        );
        control.push(_react2.default.createElement(
          _basic.Col,
          { key: 'menu', span: 'auto', className: 'btn-submenu' },
          menu
        ));
      }
      var className = 'btn-toolbar-bottom';
      if (this.props.config) {
        var config = null;
        try {
          config = JSON.parse(this.props.config);
        } catch (e) {
          config = {};
        }
        if (config.classname) className += ' ' + config.classname;
      }
      if (this.state.hide) className = 'hide';
      return _react2.default.createElement(
        _basic.Row,
        { className: className, flex: this.state.flex },
        control
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

exports.default = Toolbar;