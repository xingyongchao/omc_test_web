'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownButton = _antd.Dropdown.Button;
var SubMenu = _antd.Menu.SubMenu;
var MenuItem = _antd.Menu.Item;

var DropdownButtonControl = function (_React$Component) {
  _inherits(DropdownButtonControl, _React$Component);

  function DropdownButtonControl(props) {
    _classCallCheck(this, DropdownButtonControl);

    var _this = _possibleConstructorReturn(this, (DropdownButtonControl.__proto__ || Object.getPrototypeOf(DropdownButtonControl)).call(this, props));

    var cStyle = props.cStyle,
        cParameter = props.cParameter;

    var config = null;
    if (cStyle || cParameter) {
      try {
        config = JSON.parse(cStyle || cParameter);
      } catch (e) {
        config = {};
      }
    }
    _this.state = Object.assign({
      data: props.controls || [],
      visible: !props.bHidden
    }, config);
    var keyMap = {};
    _this.recursive(_this.state.data, function (key, value) {
      keyMap[key] = value;
    });
    _this.keyMap = keyMap;
    return _this;
  }

  _createClass(DropdownButtonControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) {
        this.props.model.addListener(this);
        this.recursive(this.state.data, function (key) {
          var model = this.props.model.getParent().get(key);
          if (model) model.addListener(this);
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) {
        this.props.model.addListener(this);
        this.recursive(this.state.data, function (key) {
          var model = this.props.model.getParent().get(key);
          if (model) model.addListener(this);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) {
        this.props.model.removeListener(this);
        this.recursive(this.state.data, function (key) {
          var model = this.props.model.getParent().get(key);
          if (model) model.removeListener(this);
        });
      }
    }
  }, {
    key: 'recursive',
    value: function recursive(data, callback) {
      data.forEach(function (item) {
        callback.call(this, item.cItemName, item);
        if (item.children) this.recursive(item.children, callback);
      }, this);
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(value, propertyName) {
      if (propertyName === this.props.cItemName) {
        var button = cb.dom((0, _reactDom.findDOMNode)(this.refs.button)).find('button:first-child');
        button.length && (button[0].disabled = value);
      } else {
        var item = this.keyMap[propertyName];
        if (item) item.disabled = value;
        this.setState({
          data: this.state.data
        });
      }
    }
  }, {
    key: 'setVisible',
    value: function setVisible(value, propertyName) {
      if (propertyName === this.props.cItemName) {
        var button = cb.dom((0, _reactDom.findDOMNode)(this.refs.button)).find('button:first-child');
        button.length && (button[0].visible = value);
      } else {
        var item = this.keyMap[propertyName];
        if (item) item.visible = value;
        this.setState({
          data: this.state.data
        });
      }
    }
  }, {
    key: 'handleButtonClick',
    value: function handleButtonClick(e) {
      if (this.props.model) this.props.model.fireEvent('click');
    }
  }, {
    key: 'handleMenuClick',
    value: function handleMenuClick(e) {
      if (this.props.model) {
        var model = this.props.model.getParent().get(e.key);
        if (model) model.fireEvent('click');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var loop = function loop(data) {
        return data.map(function (item) {
          var style = item.visible === false ? { display: "none" } : {};
          if (item.children) {
            return _react2.default.createElement(
              SubMenu,
              { style: style, key: item.cItemName, title: item.cCaption },
              loop(item.children)
            );
          }
          return _react2.default.createElement(
            MenuItem,
            { style: style, key: item.cItemName, disabled: item.disabled },
            item.cCaption
          );
        });
      };
      var menu = _react2.default.createElement(
        _antd.Menu,
        { onClick: function onClick(e) {
            return _this2.handleMenuClick(e);
          } },
        loop(this.state.data)
      );
      if (this.state.displaymode !== 'button') {
        var icon = this.props.iStyle === 1 ? null : this.props.icon;
        var text = this.props.iStyle === 2 ? null : this.props.value;
        var iconCom = icon ? _react2.default.createElement(_SvgIcon2.default, { className: "icon-" + icon, type: icon + (this.state.disabled ? "-disabled" : "") }) : null;
        return _react2.default.createElement(
          _antd.Dropdown,
          { overlay: menu },
          _react2.default.createElement(
            _antd.Button,
            { className: this.props.className, disabled: this.state.disabled, type: this.state.type },
            iconCom,
            text,
            _react2.default.createElement(_antd.Icon, { type: 'down' })
          )
        );
      }
      var style = this.state.visible ? { verticalAlign: 'bottom', float: 'left' } : { verticalAlign: 'bottom', display: "none" };
      var control = _react2.default.createElement(
        DropdownButton,
        { style: style, ref: 'button', onClick: function onClick(e) {
            return _this2.handleButtonClick(e);
          }, overlay: menu, type: 'ghost' },
        this.props.value
      );
      return control;
    }
  }]);

  return DropdownButtonControl;
}(_react2.default.Component);

exports.default = DropdownButtonControl;

;