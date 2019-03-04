'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _antdMobile = require('antd-mobile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBarControl = function (_Component) {
  _inherits(NavBarControl, _Component);

  function NavBarControl(props) {
    _classCallCheck(this, NavBarControl);

    var _this = _possibleConstructorReturn(this, (NavBarControl.__proto__ || Object.getPrototypeOf(NavBarControl)).call(this, props));

    _this.onLeftClick = function () {
      if (_this.props.onLeftClick) {
        _this.props.onLeftClick();
        return;
      }
      //设置状态栏字体白色
      cb.utils.setStatusBarStyle("light");
      _this.context.router.history.goBack();
      if (_this.props.goBack) _this.props.goBack();
    };

    _this.onRightClick = function (e) {
      if (_this.props.onRightClick) _this.props.onRightClick(e);
    };

    _this.getRightContent = function (rightContent) {
      if (!rightContent) return null;
      return _react2.default.createElement(
        'div',
        { onClick: _this.onRightClick },
        rightContent
      );
    };

    _this.state = {};
    if (_this.props.color) {
      if (_this.props.color.indexOf('#fff') >= 0) {
        cb.utils.setStatusBarStyle("light");
      } else {
        cb.utils.setStatusBarStyle("dark");
      }
    }
    return _this;
  }

  _createClass(NavBarControl, [{
    key: 'getFinallyContent',
    value: function getFinallyContent() {
      var _props = this.props,
          mode = _props.mode,
          icon = _props.icon,
          leftContent = _props.leftContent,
          rightContent = _props.rightContent,
          title = _props.title;

      var rightControl = this.getRightContent(rightContent);
      var str = null;
      if (icon === 'kong') {
        str = _react2.default.createElement(
          _antdMobile.NavBar,
          {
            mode: mode ? mode : 'dark',
            leftContent: leftContent ? leftContent : '',
            rightContent: rightControl ? rightContent : '',
            onLeftClick: this.onLeftClick
          },
          title ? title : ''
        );
      } else {
        str = _react2.default.createElement(
          _antdMobile.NavBar,
          {
            mode: mode ? mode : 'dark', icon: icon ? _react2.default.createElement(_antdMobile.Icon, { type: icon }) : _react2.default.createElement('i', { className: 'icon icon-fanhui' }),
            leftContent: leftContent ? leftContent : '',
            rightContent: rightControl ? rightContent : '',
            onLeftClick: this.onLeftClick
          },
          title ? title : ''
        );
      }
      return str;
    }
  }, {
    key: 'render',
    value: function render() {
      var content = this.getFinallyContent();
      return content;
    }
  }]);

  return NavBarControl;
}(_react.Component);

NavBarControl.contextTypes = {
  router: _propTypes2.default.object.isRequired
};
exports.default = NavBarControl;