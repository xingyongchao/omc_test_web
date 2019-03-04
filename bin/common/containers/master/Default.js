'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _antd = require('antd');

var _LeftMenu = require('../../../yxyweb/common/components/portal/LeftMenu');

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _TopMenu = require('../../components/portal/TopMenu');

var _TopMenu2 = _interopRequireDefault(_TopMenu);

var _Tabs = require('../../../yxyweb/common/components/portal/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _DynamicModal = require('../../../yxyweb/common/components/portal/DynamicModal');

var _DynamicModal2 = _interopRequireDefault(_DynamicModal);

var _tabs = require('../../../yxyweb/common/redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {LeftMenu, TopMenu, Tabs} from '../../components/portal';


var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Sider = _antd.Layout.Sider;

var Page = function (_Component) {
  _inherits(Page, _Component);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this.state = {
      push: props.location.action === 'PUSH',
      loading: false
    };
    // let {tabsactions} = this.props;
    // tabsactions.addItem({
    //   key: 'PORTAL',
    //   title: '首页',
    //   closable: false,
    //   content: {
    //     type: 'platform',
    //     url: 'home'
    //   }
    // });
    return _this;
  }

  _createClass(Page, [{
    key: 'handleResize',
    value: function handleResize() {
      var _props = this.props,
          tabsactions = _props.tabsactions,
          tabs = _props.tabs;

      var contentEle = (0, _reactDom.findDOMNode)(this.content);
      var currentHeight = contentEle.clientHeight - 20;
      tabsactions.refreshHeight(currentHeight);
      var currentWidth = contentEle.clientWidth - 30;
      // 当宽度小于400时，不知为何，浏览器就会无响应，后续找原因
      if (currentWidth < 400 || currentWidth === tabs.width) return;
      tabsactions.refreshWidth(currentWidth);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.handleResize();
      this.resizeHandler = (0, _addEventListener2.default)(window, 'resize', function () {
        return _this2.handleResize();
      });
      this.loadingCount = 0;
      cb.utils.loadingControl = {
        start: function start() {
          cb.utils.loading(true);
          _this2.loadingCount++;
          if (_this2.loadingCount === 1) _this2.setState({ loading: true });
        },
        end: function end() {
          cb.utils.loading(false);
          if (_this2.loadingCount > 0) _this2.loadingCount--;
          if (_this2.loadingCount === 0) _this2.setState({ loading: false });
        }
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var leftTimeShow = this.props.leftTime < 30 && this.props.leftTime != -1;
      var minHeight = 60;
      var menuCount = this.props.tree.TreeData.length;
      if (menuCount) minHeight += 44 * menuCount;
      minHeight += 20;
      var loadingControl = null;
      if (this.state.loading) loadingControl = _react2.default.createElement(
        'div',
        { className: 'ant-modal-mask uretail-loading-bg' },
        _react2.default.createElement(
          _antd.Spin,
          { size: 'large', tip: '\u52A0\u8F7D\u4E2D...' },
          _react2.default.createElement('div', null)
        )
      );

      return _react2.default.createElement(
        _antd.Layout,
        { style: { minHeight: minHeight } },
        _react2.default.createElement(
          Header,
          { className: 'header' },
          _react2.default.createElement(_TopMenu2.default, null)
        ),
        _react2.default.createElement(
          _antd.Layout,
          { style: { overflow: 'hidden' } },
          _react2.default.createElement(
            Sider,
            { className: 'left-menu' },
            _react2.default.createElement(_LeftMenu2.default, { reload: this.state.push })
          ),
          _react2.default.createElement(
            Content,
            { ref: function ref(node) {
                return _this3.content = node;
              }, className: 'uretail-right-content',
              style: { padding: (leftTimeShow && 48 || 15) + 'px 15px 0 15px' } },
            _react2.default.createElement(_Tabs2.default, { className: 'rootTabs height-100' })
          )
        ),
        loadingControl,
        _react2.default.createElement(_DynamicModal2.default, null)
      );
    }
  }]);

  return Page;
}(_react.Component);

function mapStateToProps(state) {
  return {
    tree: state.tree.toJS(),
    tabs: state.tabs.toJS(),
    leftTime: state.user.get('leftTime')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Page);