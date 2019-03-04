'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuControl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _antd.Menu.SubMenu;
var MenuItem = _antd.Menu.Item;
var MenuItemGroup = _antd.Menu.ItemGroup;

var MenuControl = exports.MenuControl = function (_React$Component) {
  _inherits(MenuControl, _React$Component);

  function MenuControl(props) {
    _classCallCheck(this, MenuControl);

    var _this = _possibleConstructorReturn(this, (MenuControl.__proto__ || Object.getPrototypeOf(MenuControl)).call(this, props));

    _this.onDocumentClick = function (event) {
      var parent = cb.dom(event.target).parents('.ant-menu');
      if (parent.length) return;
      _this.setState({ openKeys: [] });
    };

    _this.onTitleClick = function (subMenuNode) {
      _this.setState({ openKeys: [subMenuNode.key] });
    };

    _this.onOpenChange = function (openKeys) {
      if (_this.state.trigger !== 'hover') _this.setState({ openKeys: openKeys });
      if (!openKeys.length) return;
      setTimeout(function () {
        var current = cb.dom('.left-menu .ant-menu-submenu-open');
        if (!current.length) return;
        var scrollElement = current.children('ul').children('li').children('ul')[0];
        scrollElement.style.maxHeight = (window && document.documentElement.clientHeight - 80) + 'px';
        scrollElement.style.overflowY = 'auto';
        var subMenu = current.children('ul')[0];
        var offset = window.innerHeight - current[0].getBoundingClientRect().top - subMenu.offsetHeight - 10;
        var styleObj = document.styleSheets[document.styleSheets.length - 1].rules[0].style;
        if (offset > 0) {
          if (styleObj[0] === 'top') styleObj.top = '15px';
          return;
        }
        subMenu.style.marginTop = offset + 'px';
        var top = 15 + Math.abs(offset) + 'px';
        if (styleObj[0] === 'top') {
          styleObj.top = top;
        } else {
          var style = document.createElement('style');
          style.innerText = '.left-menu .ant-menu-submenu-vertical > .ant-menu:after{top:' + top + '}';
          document.body.appendChild(style);
        }
      }, 100);
    };

    _this.state = {
      trigger: props.trigger || 'hover',
      mode: props.mode || "vertical",
      theme: props.theme || "light",
      selectedKeys: props.selectedKeys || '',
      dataSource: props.dataSource || [],
      id: props.id,
      keyField: props.keyField,
      titleField: props.titleField
    };
    _this.subData = [];
    return _this;
  }

  _createClass(MenuControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.state.trigger !== 'hover') this.clickOutsideHandler = (0, _addEventListener2.default)(document, 'mousedown', this.onDocumentClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
      if (this.state.trigger !== 'hover') {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.dataSource || this.props.id === nextProps.id) return;
      var states = {
        dataSource: nextProps.dataSource
      };
      this.setState(states);
    }
  }, {
    key: 'onMenuClick',
    value: function onMenuClick(item) {
      var selectedKeys = [];
      selectedKeys.push(item.key);
      if (this.props.onSelect) this.props.onSelect(selectedKeys, item);
      if (this.props.model) this.props.model.select(selectedKeys);
    }
  }, {
    key: 'loopMenu',
    value: function loopMenu(dataSource) {
      var keyField = this.state.keyField;
      var titleField = this.state.titleField;
      var menuData = [];
      var subMenuProps = {};
      if (this.state.trigger !== 'hover') subMenuProps.onTitleClick = this.onTitleClick;
      if (dataSource.length > 0) {
        dataSource.forEach(function (element) {
          var icon = element.icon;

          var iconElement = icon && icon.indexOf('.') > -1 ? _react2.default.createElement('img', { style: { float: 'left', width: 16, height: 16, marginTop: 14, marginBottom: 14, marginLeft: 2, marginRight: 9 }, src: icon }) : _react2.default.createElement('i', { className: "iconfont icon-" + element.icon });
          var title = _react2.default.createElement(
            'span',
            null,
            iconElement,
            _react2.default.createElement(
              'span',
              null,
              element[titleField]
            )
          );
          var ele = void 0;
          if (element.children) {
            var subMenuData = this.loopSubMenu(element.children);
            ele = _react2.default.createElement(
              SubMenu,
              _extends({}, subMenuProps, { data: element, key: element[keyField], title: title }),
              _react2.default.createElement(
                MenuItemGroup,
                { className: '_warpSubMenu', data: element, key: element[keyField], title: '\u5197\u4F59' },
                subMenuData
              )
            );
          } else {
            ele = _react2.default.createElement(
              MenuItem,
              { data: element, key: element[keyField], disabled: element.disabled },
              title
            );
          }
          menuData.push(ele);
        }, this);
        return menuData;
      } else {
        return "";
      }
    }
  }, {
    key: 'loopSubMenu',
    value: function loopSubMenu(dataSource) {
      var keyField = this.state.keyField;
      var titleField = this.state.titleField;
      var menuData = [];

      if (dataSource.length > 0) {
        dataSource.forEach(function (element) {
          var ele = void 0;
          if (element.children) {
            var subMenuData = this.loopSubMenu(element.children);
            var className = 'menu-group-cols-' + (element.cols || 3);
            ele = _react2.default.createElement(
              MenuItemGroup,
              { className: className, data: element, key: element[keyField], title: element[titleField] },
              subMenuData
            );
          } else {
            ele = _react2.default.createElement(
              MenuItem,
              { data: element, key: element[keyField], disabled: element.disabled, title: element[titleField] },
              element[titleField]
            );
          }
          menuData.push(ele);
        }, this);
        return menuData;
      } else {
        return "";
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var subMenuNodes = this.loopMenu(this.state.dataSource);
      var menuProps = {};
      if (this.state.trigger !== 'hover') {
        menuProps.openKeys = this.state.openKeys;
        menuProps.openSubMenuOnMouseEnter = false;
        menuProps.closeSubMenuOnMouseLeave = false;
      }
      return _react2.default.createElement(
        _antd.Menu,
        _extends({}, menuProps, { onOpenChange: this.onOpenChange, defaultSelectedKeys: this.props.defaultSelectedKeys, theme: this.state.theme, onClick: function onClick(item, key, keyPath) {
            return _this2.onMenuClick(item, key, keyPath);
          }, mode: this.state.mode }),
        subMenuNodes
      );
    }
  }]);

  return MenuControl;
}(_react2.default.Component);

;
exports.default = MenuControl;