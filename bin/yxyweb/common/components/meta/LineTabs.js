'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

var _index = require('./index');

var MetaComponents = _interopRequireWildcard(_index);

var _metaRunner = require('../meta-runner');

var _metaRunner2 = _interopRequireDefault(_metaRunner);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = _antd.Menu.Item;
var TabPane = _antd.Tabs.TabPane;

var LineTabs = function (_Component) {
  _inherits(LineTabs, _Component);

  function LineTabs(props) {
    _classCallCheck(this, LineTabs);

    var _this = _possibleConstructorReturn(this, (LineTabs.__proto__ || Object.getPrototypeOf(LineTabs)).call(this, props));

    _this.keyField = 'cGroupCode';
    _this.keyVisible = {};
    _this.defaultActiveKey = _this.init(props.containers);
    _this.state = {
      activeKey: _this.defaultActiveKey,
      keyVisible: _this.keyVisible,
      className: props.config.classname
    };
    return _this;
  }

  _createClass(LineTabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          viewModel = _props.viewModel,
          meta = _props.meta;

      viewModel.on('updateViewMeta', function (args) {
        if (_this2.groupKeys.indexOf(args.code) === -1) return;
        if (args.caption) {
          var container = _this2.newContainers.find(function (item) {
            return item[_this2.keyField] === args.code;
          });
          if (container) {
            container.cName = args.caption;
            _this2.setState({ flag: true });
          }
          return;
        }
        var _state = _this2.state,
            keyVisible = _state.keyVisible,
            activeKey = _state.activeKey;

        keyVisible[args.code] = args.visible;
        var states = { keyVisible: keyVisible };
        states.activeKey = Object.keys(keyVisible).find(function (v) {
          return keyVisible[v];
        }) || '';
        // if (keyVisible[activeKey] === false) {
        //   states.activeKey = this.defaultActiveKey;
        //   if (keyVisible[states.activeKey] === false)
        //     states.activeKey = '';
        // }
        // if (activeKey === '' && args.visible)
        //   states.activeKey = args.code;
        _this2.setState(states);
      });
    }
  }, {
    key: 'init',
    value: function init(containers) {
      var _this3 = this;

      if (!containers || !containers.length) return;
      var activeKey = '';
      this.toolbarContainers = {};
      this.newContainers = [];
      this.groupKeys = [];
      this.external = {};
      containers.forEach(function (container, index) {
        var key = container[_this3.keyField];
        if (index === 0) activeKey = key;
        var subContainers = container.containers;
        if (!subContainers || !subContainers.length) return;
        var newContainer = Object.assign({}, container);
        newContainer.containers = [];
        subContainers.forEach(function (item) {
          if (item.cControlType && item.cControlType.trim().toLocaleLowerCase() === 'toolbar') {
            if (_this3.toolbarContainers[key]) _this3.toolbarContainers[key].controls = (_this3.toolbarContainers[key].controls || []).concat(item.controls || []);else _this3.toolbarContainers[key] = item;
          } else {
            newContainer.containers.push(item);
          }
        });
        _this3.newContainers.push(newContainer);
        _this3.groupKeys.push(key);
        _this3.keyVisible[key] = true;
        if (!container.cStyle) return;
        var config = JSON.parse(container.cStyle);
        if (!config.billnum) return;
        _this3.external[key] = { config: container.cStyle, component: null };
      });
      return activeKey;
    }
  }, {
    key: 'externalReady',
    value: function externalReady(parentViewModel, viewModel, config) {
      if (!config.filter) return;
      var condition = { commonVOs: [{ itemName: config.filter, value1: null }] };
      var currentValue = parentViewModel.get(config.key).getValue();
      condition.commonVOs[0].value1 = currentValue;
      var params = viewModel.getParams();
      params.filterId = null;
      params.condition = condition;
      if (!currentValue) params.autoLoad = false;
      parentViewModel.on('afterLoadData', function () {
        currentValue = parentViewModel.get(config.key).getValue();
        if (!currentValue) return;
        condition.commonVOs[0].value1 = currentValue;
        viewModel.execute('filterClick', { condition: condition });
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      var _this4 = this;

      var key = e.key;

      this.setState({ activeKey: key });
      if (!this.external[key] || this.external[key].component) return;
      var config = JSON.parse(this.external[key].config);
      var data = {
        billtype: 'voucherlist',
        billno: config.billnum
      };
      cb.loader.runCommandLine('bill', data, this.props.viewModel, function (vm, viewmeta) {
        _this4.externalReady(_this4.props.viewModel, vm, config);
        _this4.external[key].component = _react2.default.createElement(_metaRunner2.default, { index: _this4.props.index, width: _this4.props.width, viewModel: vm, metaData: viewmeta });
        _this4.external[key].viewModel = vm;
        _this4.setState({ flag: true });
      });
    }
  }, {
    key: 'renderMenuItems',
    value: function renderMenuItems() {
      var _this5 = this;

      var keyVisible = this.state.keyVisible;

      var menuItems = [];
      this.newContainers.forEach(function (item) {
        var key = item[_this5.keyField];
        if (keyVisible[key] === false) return;
        menuItems.push(_react2.default.createElement(
          MenuItem,
          { key: key },
          _react2.default.createElement(
            'a',
            null,
            item.cName
          )
        ));
      });
      return menuItems;
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this6 = this;

      var menuItems = this.renderMenuItems();
      return _react2.default.createElement(
        _antd.Menu,
        { className: 'tab-menu', mode: 'horizontal', selectedKeys: [this.state.activeKey], onSelect: function onSelect(e) {
            return _this6.handleClick(e);
          } },
        menuItems
      );
    }
  }, {
    key: 'renderTabItems',
    value: function renderTabItems() {
      var _this7 = this;

      var _props2 = this.props,
          viewModel = _props2.viewModel,
          width = _props2.width,
          height = _props2.height;

      var items = [];
      var tabContent = null;
      this.newContainers.forEach(function (container) {
        var key = container[_this7.keyField];
        tabContent = _this7.external[key] ? _this7.external[key].component : _react2.default.createElement(MetaComponents.Container, { meta: container, viewModel: viewModel, width: width, height: height, parents: 'LineTabs' });
        items.push(_react2.default.createElement(
          TabPane,
          { tab: container.cName, key: key },
          _react2.default.createElement(
            'div',
            { id: (viewModel.getParams() && viewModel.getParams().billNo) + '|' + key },
            tabContent
          )
        ));
      });
      return items;
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar() {
      var toolbarContainer = this.toolbarContainers[this.state.activeKey];
      if (!toolbarContainer) return null;
      return _react2.default.createElement(
        'div',
        { className: 'tab-top-right' },
        _react2.default.createElement(MetaComponents.Toolbar, { align: 'right', config: toolbarContainer.cStyle, controls: toolbarContainer.controls, model: this.props.viewModel })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          activeKey = _state2.activeKey,
          className = _state2.className;

      if (!activeKey) return null;
      var menu = _react2.default.createElement(
        _basic.Row,
        null,
        this.renderMenu(),
        this.renderToolbar()
      );
      var tabs = _react2.default.createElement(
        _antd.Tabs,
        { className: 'card-container', activeKey: activeKey, type: 'card', animated: false },
        this.renderTabItems()
      );
      return _react2.default.createElement(
        _basic.Row,
        { className: 'line-tabs ' + className },
        menu,
        tabs
      );
    }
  }]);

  return LineTabs;
}(_react.Component);

exports.default = LineTabs;