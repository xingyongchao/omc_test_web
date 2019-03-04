'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _menu = require('../basic/menu');

var _menu2 = _interopRequireDefault(_menu);

var _tree = require('../../redux/tree');

var treeactions = _interopRequireWildcard(_tree);

var _tabs = require('../../redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

var _portal = require('../../redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _util = require('../../helpers/util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftMenu = function (_Component) {
  _inherits(LeftMenu, _Component);

  function LeftMenu(props) {
    _classCallCheck(this, LeftMenu);

    var _this = _possibleConstructorReturn(this, (LeftMenu.__proto__ || Object.getPrototypeOf(LeftMenu)).call(this, props));

    _this.onBeforeUnload = function () {
      for (var attr in _this.windows) {
        _this.windows[attr].close();
      }
    };

    _this.onClick = function (selectedKeys) {
      if (selectedKeys.length !== 1) return;
      _this.props.treeactions.execHandler(selectedKeys[0]);
    };

    _this.handleClick = function (activeKey, selectedNode, filterCondition) {
      var menuId = selectedNode[_this.state.keyField];
      if (!menuId) {
        cb.utils.alert('menuId为空', 'warning');
        return;
      }
      var _this$props = _this.props,
          tabsactions = _this$props.tabsactions,
          portalactions = _this$props.portalactions,
          tabs = _this$props.tabs,
          portal = _this$props.portal;

      var index = tabs.panes.findIndex(function (pane) {
        return pane.key === activeKey;
      });
      var viewType = selectedNode.viewType;

      if (viewType === 'external' || viewType === 'ajax') {
        var menuUrl = selectedNode.menuUrl,
            metaType = selectedNode.metaType;

        var config = null;
        try {
          config = JSON.parse(metaType);
        } catch (e) {
          cb.utils.alert(e.message, 'warning');
          config = {};
        }
        if (config.type === 'window') return _this.handleWindow(viewType, menuUrl, menuId, config.mode === 'fullscreen');
      }
      var keepFilter = true;
      if (filterCondition && filterCondition.filterId === null) {
        keepFilter = false;
        delete filterCondition.filterId;
      }
      if (index > -1) {
        tabsactions.activateItem(activeKey);
        var current = portal.tabs[activeKey];
        if (!current) return;
        var currentPanes = current.panes;
        if (!currentPanes || !currentPanes.length) return;
        if (filterCondition) {
          if (currentPanes.length === 1) {
            currentPanes[0].content.vm.execute('updateCondition', filterCondition);
            return;
          }
        } else {
          if (currentPanes.length === 1) return;
        }
        var activeContent = currentPanes[currentPanes.length - 1].content;
        if (!activeContent) return;
        if (activeContent.vm) {
          activeContent.vm.promiseExecute('return', '返回', function () {
            portalactions.firstItem(activeKey);
          });
        } else if (activeContent.type && activeContent.url) {
          if (activeContent.checkReturn) {
            portalactions.refreshItem(activeKey, '返回', function () {
              portalactions.firstItem(activeKey);
            });
          } else {
            portalactions.firstItem(activeKey);
          }
        }
        if (filterCondition) currentPanes[0].content.vm.execute('updateCondition', filterCondition);
        return;
      }
      var params = Object.assign({}, selectedNode, {
        userClick: true,
        menuId: menuId
      });
      var callback = function callback(returnData) {
        if (filterCondition) {
          var vm = returnData.content.vm;
          vm.getParams().condition = filterCondition;
          if (!keepFilter) vm.getParams().filterId = null;
        }
        tabsactions.addItem(returnData);
      };
      cb.loader.runCommandLine('menu', params, null, callback);
    };

    _this.state = {
      keyField: 'code',
      titleField: 'name'
    };
    _this.windows = {};
    // if (!props.reload) return;
    // let { treeactions } = this.props;
    // this.newtreeid = 0;
    // treeactions.treeload(() => {
    //   this.newtreeid++;
    // });
    return _this;
  }

  _createClass(LeftMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var treeactions = this.props.treeactions;

      treeactions.setHandler(this.handleClick);
      window.onbeforeunload = this.onBeforeUnload;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.onBeforeUnload();
    }
  }, {
    key: 'windowOpen',
    value: function windowOpen(menuId, fullscreen, callback) {
      var currentWindow = this.windows[menuId];
      if (currentWindow && !currentWindow.closed) {
        currentWindow.focus();
        if (fullscreen) currentWindow.resizeTo(screen.availWidth, screen.availHeight);
        return;
      }
      var url = callback();
      if (url === false) return;
      url = (0, _util.getPredicateValue)(url);
      var features = fullscreen ? 'fullscreen=yes' : null;
      currentWindow = window.open(url, menuId, features);
      this.windows[menuId] = currentWindow;
      if (fullscreen) currentWindow.resizeTo(screen.availWidth, screen.availHeight);
    }
  }, {
    key: 'handleWindow',
    value: function handleWindow(viewType, menuUrl, menuId, fullscreen) {
      if (!menuUrl) {
        cb.utils.alert('menuUrl为空', 'warning');
        return;
      }
      if (viewType === 'ajax') {
        this.windowOpen(menuId, fullscreen, function () {
          var proxy = cb.rest.DynamicProxy.create({ getUrl: { url: menuUrl, method: 'GET', options: { async: false } } });
          var data = proxy.getUrl();
          if (!data.error) return data.result;
          cb.utils.alert(data.error.message, 'error');
          return false;
        });
      } else {
        this.windowOpen(menuId, fullscreen, function () {
          if (!cb.events.execute('menuClick', menuId)) return false;
          return menuUrl;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var treeData = this.props.tree.TreeData;
      if (!treeData.length) return null;
      var trigger = 'hover';
      if (process.env.__CLIENT__) {
        cb.rest.AppContext.portalTreeData = treeData;
        if (cb.rest.device === 'android') trigger = 'click';
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_menu2.default, { trigger: trigger, defaultSelectedKeys: ['PORTAL'], titleField: this.state.titleField, keyField: this.state.keyField,
          dataSource: treeData, onSelect: this.onClick,
          id: 'menu' + this.props.tree.id })
      );
    }
  }]);

  return LeftMenu;
}(_react.Component);

function mapStateToProps(state) {
  return {
    tree: state.tree.toJS(),
    tabs: state.tabs.toJS(),
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    treeactions: (0, _redux.bindActionCreators)(treeactions, dispatch),
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch),
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LeftMenu);