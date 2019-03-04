'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _SvgIcon = require('../../../yxyweb/common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _SpinBar = require('../../../yxyweb/common/components/common/SpinBar');

var _SpinBar2 = _interopRequireDefault(_SpinBar);

var _loading = require('../../../yxyweb/common/redux/loading');

var _Expire = require('../../containers/user/Expire');

var _ActionStatus = require('../../../yxyweb/common/constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _tabs = require('../../../yxyweb/common/redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

var _portal = require('../../../yxyweb/common/redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _user = require('../../redux/modules/user');

var useractions = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _antd.Menu.SubMenu;
var MenuItem = _antd.Menu.Item;
var TabPane = _antd.Tabs.TabPane;
var Option = _antd.Select.Option;

var TopMenu = function (_Component) {
  _inherits(TopMenu, _Component);

  function TopMenu(props) {
    _classCallCheck(this, TopMenu);

    var _this = _possibleConstructorReturn(this, (TopMenu.__proto__ || Object.getPrototypeOf(TopMenu)).call(this, props));

    _this.handleAthority = function () {
      var accountCenterKey = 'authority';
      var _this$props = _this.props,
          tabsactions = _this$props.tabsactions,
          tabs = _this$props.tabs;

      var index = tabs.panes.findIndex(function (pane) {
        return pane.key === accountCenterKey;
      });
      if (index > -1) {
        tabsactions.activateItem(accountCenterKey);
        return;
      }
      debugger;
      tabsactions.addItem({
        key: accountCenterKey,
        title: '授权',
        content: {
          type: 'platform',
          url: 'authority'
        }
      });
    };

    _this.handleUpdateLogInfo = function () {
      var key = 'update-log';
      var _this$props2 = _this.props,
          tabsactions = _this$props2.tabsactions,
          tabs = _this$props2.tabs;

      var index = tabs.panes.findIndex(function (pane) {
        return pane.key === key;
      });
      if (index > -1) {
        tabsactions.activateItem(key);
        return;
      }
      tabsactions.addItem({
        key: key,
        title: '更新日志',
        content: {
          type: 'platform',
          url: 'update-log'
        }
      });

      // useractions.setAccountActiveKey('updateLogInfo');
    };

    _this.onChange = function (activeKey) {
      var tabsactions = _this.props.tabsactions;

      tabsactions.activateItem(activeKey);
    };

    _this.onEdit = function (targetKey, action) {
      _this[action](targetKey);
    };

    _this.remove = function (key) {
      var _this$props3 = _this.props,
          tabsactions = _this$props3.tabsactions,
          portalactions = _this$props3.portalactions,
          portal = _this$props3.portal;

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

    _this.handleRefresh = function () {
      var _this$props4 = _this.props,
          tabs = _this$props4.tabs,
          portalactions = _this$props4.portalactions,
          portal = _this$props4.portal;
      var activeKey = tabs.activeKey;

      var current = portal.tabs[activeKey];
      if (!current || !current.panes.length) return;
      portalactions.delItem(activeKey);
      var currentPanes = current.panes;
      if (currentPanes.length === 1) {
        var callback = function callback(returnData) {
          var title = returnData.title,
              content = returnData.content,
              params = returnData.params;

          portalactions.addItem(activeKey, { title: title, content: content, params: params });
        };
        cb.loader.runCommandLine('menu', currentPanes[0].params, null, callback);
      } else {
        var _currentPanes = currentPanes[currentPanes.length - 1],
            title = _currentPanes.title,
            content = _currentPanes.content,
            params = _currentPanes.params,
            parent = _currentPanes.parent;

        if (content.vm) {
          cb.loader.runCommandLine('bill', params, parent);
        } else {
          portalactions.addItem(activeKey, { title: title, content: content, params: params, parent: parent });
        }
      }
    };

    _this.closeOther = function () {
      var _this$props5 = _this.props,
          tabsactions = _this$props5.tabsactions,
          tabs = _this$props5.tabs;

      tabsactions.closeOther(tabs.activeKey);
    };

    _this.closeAll = function () {
      _this.props.tabsactions.closeAll();
    };

    _this.searchStores = function (e) {
      var userStores = _this.props.user.userStores;

      if (!userStores || !userStores.length) return;
      var filterStores = userStores.filter(function (item) {
        return item.store_name.indexOf(e.target.value) > -1;
      });
      _this.setState({ filterStores: filterStores });
    };

    _this.switchInterMode = function () {
      _this.props.useractions.switchInterMode('touch');
    };

    _this.state = {
      trigger: process.env.__CLIENT__ && cb.rest.device === 'android' ? 'click' : 'hover'
    };
    return _this;
  }

  _createClass(TopMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var toggleLoadingStatus = this.props.toggleLoadingStatus;

      cb.utils.loading = function (status) {
        toggleLoadingStatus(status);
      };
      cb.events.on('personInfo', function () {
        _this2.handlePersonalInfo();
      });
      cb.events.on('redirectLogin', function () {
        _this2.handleLogout();
      });
    }
  }, {
    key: 'handleAccountCenter',
    value: function handleAccountCenter() {
      var accountCenterKey = 'accountCenter';
      var _props = this.props,
          tabsactions = _props.tabsactions,
          tabs = _props.tabs;

      var index = tabs.panes.findIndex(function (pane) {
        return pane.key === accountCenterKey;
      });
      if (index > -1) {
        tabsactions.activateItem(accountCenterKey);
        return;
      }
      tabsactions.addItem({
        key: accountCenterKey,
        title: '账号中心',
        content: {
          type: 'platform',
          url: 'account-center'
        }
      });
    }
  }, {
    key: 'handlePersonalInfo',
    value: function handlePersonalInfo() {
      this.handleAccountCenter();
      var useractions = this.props.useractions;

      useractions.setAccountActiveKey('personalInfo');
    }
    //TODO 添加授权

  }, {
    key: 'handleChangePsd',
    value: function handleChangePsd() {
      this.handleAccountCenter();
      var useractions = this.props.useractions;

      useractions.setAccountActiveKey('changePsd');
    }
  }, {
    key: 'handleLogout',
    value: function handleLogout() {
      cb.route.redirectLoginPage(false);
      // this.props.tabsactions.clear();
    }
  }, {
    key: 'renderTabs',
    value: function renderTabs(dataSource, titles, activeKey) {
      if (!dataSource || !dataSource.length) return;
      var operations = _react2.default.createElement(
        _antd.Popover,
        { trigger: this.state.trigger, content: _react2.default.createElement(
            'div',
            { className: 'title-setting top-right-title' },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { onClick: this.handleRefresh },
                '\u5237\u65B0\u5F53\u524D\u9875\u9762'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { onClick: this.closeOther },
                '\u5173\u95ED\u5176\u4ED6\u9875\u9762'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'a',
                { onClick: this.closeAll },
                '\u5173\u95ED\u5168\u90E8\u9875\u9762'
              )
            )
          ) },
        _react2.default.createElement(
          'span',
          { className: 'title-name' },
          _react2.default.createElement(_antd.Icon, { type: 'shuaxin' })
        )
      );
      var tabs = this.props.tabs;

      var width = 0;
      if (tabs.width - 400 > 0) {
        width = tabs.width - 400;
        if (this.rightElement) width = width + 400 - this.rightElement.clientWidth + 30;
      }
      var headTitle = '友零售－';
      var items = [];
      dataSource.forEach(function (item) {
        var title = titles[item.key] && titles[item.key].activeTitle || item.title;
        items.push(_react2.default.createElement(TabPane, { tab: title, key: item.key, closable: item.closable }));
        if (item.key === activeKey) document.title = headTitle + title;
      });
      return _react2.default.createElement(
        _antd.Tabs,
        { style: { width: width, float: 'left' },
          hideAdd: true,
          onChange: this.onChange,
          activeKey: activeKey,
          type: 'editable-card',
          onEdit: this.onEdit,
          animated: false,
          tabBarExtraContent: operations },
        items
      );
    }
  }, {
    key: 'handleOrgChange',
    value: function handleOrgChange(value, name) {
      this.props.useractions.changeOrg(value, name);
    }
  }, {
    key: 'renderOrgs',
    value: function renderOrgs() {
      var _this3 = this;

      var _props$user = this.props.user,
          showOrg = _props$user.showOrg,
          userOrgs = _props$user.userOrgs,
          orgId = _props$user.orgId,
          defaultOrgName = _props$user.defaultOrgName;

      if (!showOrg) return null;
      var items = [];
      if (userOrgs && userOrgs.length) {
        userOrgs.forEach(function (org) {
          items.push(_react2.default.createElement(
            'p',
            { className: orgId === org.org ? 'topMenu_checked' : '' },
            _react2.default.createElement(
              'a',
              {
                onClick: function onClick() {
                  return _this3.handleOrgChange(org.org, org.org_name);
                } },
              org.org_name,
              orgId === org.org ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1' }) : null
            )
          ));
        });
      }
      return items.length ? _react2.default.createElement(
        _antd.Popover,
        { trigger: this.state.trigger, content: items },
        _react2.default.createElement(
          'span',
          { className: 'orgOrStore' },
          _react2.default.createElement(
            'b',
            null,
            defaultOrgName
          ),
          _react2.default.createElement(_antd.Icon, { type: 'rowBottom' })
        )
      ) : null;
    }
  }, {
    key: 'handleStoreChange',
    value: function handleStoreChange(value, name) {
      this.props.useractions.changeStore(value, name);
    }
  }, {
    key: 'renderStores',
    value: function renderStores() {
      var _this4 = this;

      var _props$user2 = this.props.user,
          showStore = _props$user2.showStore,
          userStores = _props$user2.userStores,
          storeId = _props$user2.storeId,
          defaultStoreName = _props$user2.defaultStoreName;

      if (!showStore) return null;
      var displayStores = this.state.filterStores || userStores;
      var content = [];
      var items = [];
      if (userStores && userStores.length) {
        if (userStores.length > 10) content.push(_react2.default.createElement(_antd.Input, { onChange: this.searchStores, suffix: _react2.default.createElement(_antd.Icon, { type: 'search' }) }));
        displayStores.forEach(function (store) {
          items.push(_react2.default.createElement(
            'p',
            { className: storeId === store.store ? 'topMenu_checked' : '' },
            _react2.default.createElement(
              'a',
              {
                onClick: function onClick() {
                  return _this4.handleStoreChange(store.store, store.store_name);
                } },
              store.store_name,
              storeId === store.store ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1' }) : null
            )
          ));
        });
        content.push(_react2.default.createElement(
          'div',
          null,
          items
        ));
      }
      return content.length ? _react2.default.createElement(
        _antd.Popover,
        { trigger: this.state.trigger, content: content },
        _react2.default.createElement(
          'span',
          { className: 'orgOrStore' },
          _react2.default.createElement(
            'b',
            null,
            defaultStoreName
          ),
          _react2.default.createElement(_antd.Icon, { type: 'rowBottom' })
        )
      ) : null;
    }
  }, {
    key: 'handleGradeChange',
    value: function handleGradeChange(value, name) {
      this.props.useractions.changeGrade(value, name);
    }
  }, {
    key: 'renderGrades',
    value: function renderGrades() {
      var _this5 = this;

      var _props$user3 = this.props.user,
          showStore = _props$user3.showStore,
          userGrades = _props$user3.userGrades,
          gradeId = _props$user3.gradeId,
          defaultGradeName = _props$user3.defaultGradeName;

      if (!showStore) return null;
      var items = [];
      if (userGrades && userGrades.length) {
        userGrades.forEach(function (grade) {
          items.push(_react2.default.createElement(
            'p',
            { className: gradeId === grade.id ? 'topMenu_checked' : '' },
            _react2.default.createElement(
              'a',
              {
                onClick: function onClick() {
                  return _this5.handleGradeChange(grade.id, grade.name);
                } },
              grade.name,
              gradeId === grade.id ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1' }) : null
            )
          ));
        });
      }
      return items.length ? _react2.default.createElement(
        _antd.Popover,
        { trigger: this.state.trigger, content: items },
        _react2.default.createElement(
          'span',
          { className: 'orgOrStore' },
          _react2.default.createElement(
            'b',
            null,
            defaultGradeName
          ),
          _react2.default.createElement(_antd.Icon, { type: 'rowBottom' })
        )
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props2 = this.props,
          tabs = _props2.tabs,
          portal = _props2.portal,
          user = _props2.user,
          loading = _props2.loading;

      var logo = user.logo ? user.logo : '';
      var logoStyle = {};
      if (logo) {
        logoStyle = { backgroundImage: 'url(' + logo + ')' };
      }
      return _react2.default.createElement(
        'div',
        null,
        logo ? _react2.default.createElement(
          'div',
          { className: 'logo' },
          _react2.default.createElement('div', { style: logoStyle })
        ) : _react2.default.createElement(
          'div',
          { className: 'logo' },
          _react2.default.createElement(_SvgIcon2.default, { type: 'logojiawenzi' })
        ),
        this.renderTabs(tabs.panes, portal.tabs, tabs.activeKey),
        _react2.default.createElement(
          'div',
          { ref: function ref(node) {
              return _this6.rightElement = node;
            }, className: 'top-right' },
          this.renderOrgs(),
          this.renderStores(),
          this.renderGrades(),
          _react2.default.createElement(
            _antd.Popover,
            { trigger: this.state.trigger, content: _react2.default.createElement(
                'div',
                { className: 'title-setting top-right-title' },
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        return _this6.handleAthority();
                      } },
                    _react2.default.createElement(_antd.Icon, { type: 'user' }),
                    '\u6388\u6743'
                  )
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        return _this6.handlePersonalInfo();
                      } },
                    _react2.default.createElement(_antd.Icon, { type: 'user' }),
                    '\u4E2A\u4EBA\u4FE1\u606F'
                  )
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        return _this6.handleChangePsd();
                      } },
                    _react2.default.createElement(_antd.Icon, { type: 'lock' }),
                    '\u4FEE\u6539\u5BC6\u7801'
                  )
                ),
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        return _this6.handleLogout();
                      } },
                    _react2.default.createElement(_antd.Icon, { type: 'poweroff' }),
                    '\u9000\u51FA\u767B\u5F55'
                  )
                )
              ) },
            _react2.default.createElement(
              'span',
              { className: 'title-name' },
              _react2.default.createElement(
                'em',
                null,
                user.avatar ? _react2.default.createElement('img', { src: user.avatar }) : null
              ),
              'HI\uFF0C',
              user.name,
              _react2.default.createElement(_antd.Icon, { type: 'rowBottom' })
            )
          ),
          _react2.default.createElement(
            _antd.Popover,
            { trigger: this.state.trigger,
              placement: 'bottom',
              content: _react2.default.createElement(
                'div',
                { className: 'title-setting top-right-title' },
                _react2.default.createElement(
                  'p',
                  null,
                  _react2.default.createElement(
                    'a',
                    { onClick: this.handleUpdateLogInfo },
                    _react2.default.createElement(_antd.Icon, { type: 'gengxinrizhi' }),
                    '\u66F4\u65B0\u65E5\u5FD7'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'title-setting-telephone' },
                  _react2.default.createElement(
                    'div',
                    { className: 'telephone-number' },
                    '010-86393388/\u8F6C5'
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'telephone-infor' },
                    '\u5BA2\u670D\u70ED\u7EBF'
                  )
                )
              ) },
            _react2.default.createElement(
              'span',
              { className: 'TopMenu-gengxinrizhi' },
              _react2.default.createElement(_SvgIcon2.default, { type: 'bangzhuzhongxin' })
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'TopMenu-qiehuanchuping' },
            _react2.default.createElement(_SvgIcon2.default, { type: 'qiehuanchuping',
              onClick: this.switchInterMode })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'TopMenu-loading' },
          _react2.default.createElement(_Expire.ExpireInfo, { user: user, dispatch: this.props.dispatch }),
          _react2.default.createElement(_SpinBar2.default, { loading: loading })
        )
      );
    }
  }]);

  return TopMenu;
}(_react.Component);

function mapStateToProps(state) {
  return {
    tabs: state.tabs.toJS(),
    portal: state.portal.toJS(),
    user: state.user.toJS(),
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch),
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch),
    useractions: (0, _redux.bindActionCreators)(useractions, dispatch),
    toggleLoadingStatus: (0, _redux.bindActionCreators)(_loading.toggleLoadingStatus, dispatch),
    dispatch: dispatch
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TopMenu);