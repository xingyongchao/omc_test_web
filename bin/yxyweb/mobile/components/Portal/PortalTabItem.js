'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antdMobile = require('antd-mobile');

var _MetaRunner = require('../MetaRunner');

var _MetaRunner2 = _interopRequireDefault(_MetaRunner);

var _portal = require('../../../common/redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _env = require('../../../common/helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antdMobile.Tabs.TabPane;

require('../../../../mobile/styles/globalCss/portalTabItem.css');

var PortalTabItem = function (_Component) {
  _inherits(PortalTabItem, _Component);

  function PortalTabItem(props) {
    _classCallCheck(this, PortalTabItem);

    var _this = _possibleConstructorReturn(this, (PortalTabItem.__proto__ || Object.getPrototypeOf(PortalTabItem)).call(this, props));

    _this.tabs = [];
    _this.list = [];
    _this.height = window.screen.height;
    _this.width = window.screen.width;
    return _this;
  }

  _createClass(PortalTabItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      /*监听屏幕方向改变*/
      cb.events.on('lockOrientation', function (args) {
        this.setState({ "lockOrientation": args });
      }, this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props = this.props,
          portalactions = _props.portalactions,
          match = _props.match;
      // portalactions.destroy(match.params.menuId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          portal = _props2.portal,
          match = _props2.match,
          width = _props2.width,
          height = _props2.height;

      var index = match.params.menuId;
      var current = portal.tabs[index];
      if (!height) {
        // height = document.documentElement.offsetHeight;
        if (window.plus && window.plus.screen && this.state && this.state.lockOrientation) {
          // height = window.plus.screen.resolutionHeight;
          height = this.width;
        } else {
          // height = window.screen.height;
          height = this.height;
        }
      }
      if (!current || !current.panes.length) return null;
      this.tabs = [];
      var length = current.panes.length;
      var i = void 0;
      for (i = 0; i < length; i++) {
        var pane = current.panes[i];
        this.tabs.push({ key: pane.key, title: 'Tab' + i });
        var tabContent = void 0;
        if (pane.content.vm) {
          tabContent = _react2.default.createElement(_MetaRunner2.default, {
            index: index,
            width: width,
            height: height,
            viewModel: pane.content.vm,
            metaData: pane.content.metaData,
            id: pane.key });
        }
        if (tabContent) {
          if (this.list[i]) {
            this.list[i] = _react2.default.createElement(
              'div',
              { key: pane.key, style: { height: height } },
              tabContent
            );
          } else {
            this.list.push(_react2.default.createElement(
              'div',
              { key: pane.key, style: { height: height } },
              tabContent
            ));
          }
        }
      }
      if (this.list[i]) this.list.splice(i, 1);
      return _react2.default.createElement(
        'div',
        { style: { height: height }, className: 'meta-container' },
        _react2.default.createElement(
          _antdMobile.Tabs,
          { key: length, tabs: this.tabs, page: current.activeKey, animated: false },
          this.list
        )
      );
    }
  }]);

  return PortalTabItem;
}(_react.Component);

function mapStateToProps(state) {
  return {
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PortalTabItem);