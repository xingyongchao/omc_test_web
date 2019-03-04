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

var _PortalTabItem = require('./PortalTabItem');

var _PortalTabItem2 = _interopRequireDefault(_PortalTabItem);

var _tabs = require('../../redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

var _portal = require('../../redux/portal');

var portalactions = _interopRequireWildcard(_portal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;

var TabList = function (_Component) {
  _inherits(TabList, _Component);

  function TabList(props) {
    _classCallCheck(this, TabList);

    var _this = _possibleConstructorReturn(this, (TabList.__proto__ || Object.getPrototypeOf(TabList)).call(this, props));

    _this.onChange = function (activeKey) {
      var tabsactions = _this.props.tabsactions;

      tabsactions.activateItem(activeKey);
    };

    _this.onEdit = function (targetKey, action) {
      _this[action](targetKey);
    };

    _this.remove = function (key) {
      var _this$props = _this.props,
          tabsactions = _this$props.tabsactions,
          portalactions = _this$props.portalactions,
          portal = _this$props.portal;

      var current = portal.tabs[key];
      if (!current || !current.panes.length) return;
      var currentPanes = current.panes;
      var activeContent = currentPanes[currentPanes.length - 1].content;
      if (activeContent.vm) {
        activeContent.vm.promiseExecute('return', '关闭', function () {
          tabsactions.deleteItem(key);
        });
      } else if (activeContent.type && activeContent.url) {
        if (activeContent.checkReturn) {
          portalactions.refreshItem(key, '关闭', function () {
            tabsactions.deleteItem(key);
          });
        } else {
          tabsactions.deleteItem(key);
        }
      }
    };

    _this.list = []; //渲染队列
    _this.keylist = []; //维护渲染队列时候便于比对key值
    _this.newmetaid = 0;
    return _this;
  }

  // componentDidUpdate() {
  //   const { tabsactions } = this.props;
  //   tabsactions.disableUpdate();
  // }

  _createClass(TabList, [{
    key: 'handleRefresh',
    value: function handleRefresh() {
      debugger;
    }
  }, {
    key: 'handleCloseOther',
    value: function handleCloseOther() {
      debugger;
    }
  }, {
    key: 'handleCloseAll',
    value: function handleCloseAll() {
      debugger;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tabs = this.props.tabs;

      if (tabs.needUpdate) {
        //只有更新时候进入此分支
        var length = tabs.panes.length,
            //this.keylist.length>?this.keylist.length:tabs.panes.length;
        i = 0,
            width = 0,
            height = 0;

        if (tabs.width) width = tabs.width;
        if (tabs.height) height = tabs.height;

        for (; i < length; i++) {
          //遍历panes数组，更新tabs渲染队列
          var _tabs$panes$i = tabs.panes[i],
              key = _tabs$panes$i.key,
              title = _tabs$panes$i.title,
              closable = _tabs$panes$i.closable,
              content = _tabs$panes$i.content,
              params = _tabs$panes$i.params;

          var tabPaneProps = { tab: title, key: key, closable: closable };
          var tabItemProps = { index: key, title: title, content: content, params: params, width: width, height: height };
          if (this.list[i]) {
            if (key !== this.keylist[i]) {
              //如果遍历到的渲染队列的元素跟panes的对不上，则认为是已经删除，就把其从渲染队列中删除
              this.list.splice(i, 1);
              this.keylist.splice(i, 1);
            } else {
              if (content.vm || content.type && content.url) {
                this.list[i] = _react2.default.createElement(
                  TabPane,
                  tabPaneProps,
                  _react2.default.createElement(_PortalTabItem2.default, tabItemProps)
                );
              }
            }
          } else {
            //如果渲染队列比panes短，则将长出的元素放入渲染队列
            if (content.vm || content.type && content.url) {
              this.list.push(_react2.default.createElement(
                TabPane,
                tabPaneProps,
                _react2.default.createElement(_PortalTabItem2.default, tabItemProps)
              ));
              this.keylist.push(key);
            }
          }
        }
        if (this.list[i]) {
          //如果遍历完成后list内容比panes多，则删除多余的pane
          this.list.splice(i, 1);
          this.keylist.splice(i, 1);
        }
      }
      var operations = _react2.default.createElement(
        _antd.Popover,
        { content: _react2.default.createElement(
            'div',
            { className: 'title-setting top-right-title' },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return _this2.handleRefresh();
                  } },
                _react2.default.createElement(_antd.Icon, { type: 'user' }),
                '\u5237\u65B0'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return _this2.handleCloseOther();
                  } },
                _react2.default.createElement(_antd.Icon, { type: 'lock' }),
                '\u5173\u95ED\u5176\u4ED6'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return _this2.handleCloseAll();
                  } },
                _react2.default.createElement(_antd.Icon, { type: 'poweroff' }),
                '\u5173\u95ED\u5168\u90E8'
              )
            )
          ) },
        _react2.default.createElement(
          'span',
          { className: 'title-name' },
          _react2.default.createElement(_antd.Icon, { type: 'rowBottom' })
        )
      );
      return _react2.default.createElement(
        'div',
        { ref: 'container', className: 'height-100' },
        _react2.default.createElement(
          _antd.Tabs,
          {
            hideAdd: true,
            onChange: this.onChange,
            activeKey: tabs.activeKey,
            type: 'editable-card',
            onEdit: this.onEdit,
            animated: false,
            className: this.props.className,
            tabBarExtraContent: operations
          },
          this.list
        )
      );
    }
  }]);

  return TabList;
}(_react.Component);

function mapStateToProps(state) {
  return {
    tabs: state.tabs.toJS(),
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch),
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TabList);