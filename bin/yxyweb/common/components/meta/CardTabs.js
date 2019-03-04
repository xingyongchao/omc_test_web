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

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;

var CardTabs = function (_Component) {
  _inherits(CardTabs, _Component);

  function CardTabs(props) {
    _classCallCheck(this, CardTabs);

    var _this = _possibleConstructorReturn(this, (CardTabs.__proto__ || Object.getPrototypeOf(CardTabs)).call(this, props));

    _this.keyField = 'cGroupCode';
    _this.init(props.meta.containers);
    var config = props.meta.cStyle;
    var className = '';
    if (config) {
      try {
        className = JSON.parse(config).classname;
      } catch (e) {}
    }
    _this.state = {
      activeKey: _this.defaultActiveKey,
      paneStates: {},
      forceRenders: [],
      className: className
    };
    return _this;
  }

  _createClass(CardTabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var activeKey = this.state.activeKey;

      if (this.external[activeKey]) this.handleChange(activeKey);
      var viewModel = this.props.viewModel;

      viewModel.on('updateCount', function (key, count) {
        return _this2.updateCount(key, count);
      });
      viewModel.on('updateViewMeta', function (args) {
        if (args.forceRender) {
          var forceRenders = _this2.state.forceRenders;

          forceRenders.push(args.code);
          _this2.setState({ forceRenders: forceRenders });
        }
        var _state = _this2.state,
            paneStates = _state.paneStates,
            activeKey = _state.activeKey;

        var newActiveKey = activeKey;
        var code = args.code,
            visible = args.visible,
            disabled = args.disabled,
            refresh = args.refresh,
            active = args.active;

        paneStates[code] = { visible: visible, disabled: disabled, refresh: refresh };
        if (active && visible !== false) newActiveKey = code;
        var states = { paneStates: paneStates };
        if (paneStates[activeKey] && paneStates[activeKey].visible === false) newActiveKey = _this2.defaultActiveKey;
        _this2.setState(states);
        if (newActiveKey !== activeKey) _this2.handleChange(newActiveKey);
      });
    }
  }, {
    key: 'init',
    value: function init(containers) {
      var _this3 = this;

      if (!containers || !containers.length) return;
      this.groupContainers = [];
      this.otherContainers = [];
      this.external = {};
      containers.forEach(function (container, index) {
        if (container.cControlType && container.cControlType.trim().toLocaleLowerCase() !== 'group') {
          _this3.otherContainers.push(container);
          return;
        }
        var key = container[_this3.keyField];
        if (!_this3.groupContainers.length) _this3.defaultActiveKey = key;
        _this3.groupContainers.push(container);
        if (!container.cStyle) return;
        _this3.external[key] = { config: container.cStyle, component: null };
      });
    }
  }, {
    key: 'updateCount',
    value: function updateCount() {}
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
    key: 'handleChange',
    value: function handleChange(key, disabled) {
      var _this4 = this;

      if (disabled) return;
      this.setState({ activeKey: key });
      this.props.viewModel.execute('tabActiveKeyChange', { key: key });
      if (!this.external[key]) return;
      if (this.external[key].component) {
        var paneStates = this.state.paneStates;

        if (paneStates[key] && paneStates[key].refresh) this.external[key].viewModel.execute('refresh');
        return;
      }
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
    key: 'renderMetaContainer',
    value: function renderMetaContainer(container) {
      var viewModel = this.props.viewModel;

      var containerType = container.cControlType && container.cControlType.trim().toLocaleLowerCase();
      switch (containerType) {
        case 'toolbar':
          this.toolbar = _react2.default.createElement(MetaComponents.Toolbar, { controls: container.controls, model: viewModel });
          break;
        case 'sign':
          this.sign = _react2.default.createElement(MetaComponents.Sign, { controls: container.controls, viewModel: viewModel });
          break;
      }
    }
  }, {
    key: 'renderProgressBar',
    value: function renderProgressBar(containers, activeMode) {
      var _this5 = this;

      var _state2 = this.state,
          paneStates = _state2.paneStates,
          activeKey = _state2.activeKey;

      var items = [];
      containers.forEach(function (container, index) {
        var key = container[_this5.keyField];
        var disabled = false;
        if (paneStates[key]) {
          if (paneStates[key].visible === false) return;
          disabled = paneStates[key].disabled || false;
        }
        var icon = container.cImage;
        if (disabled) icon += '-disabled';else if (activeMode === 'icon' && key === activeKey) icon += '-active';
        items.push(_react2.default.createElement(
          'li',
          { className: key === activeKey ? 'selected' : null, key: key, disabled: disabled, onClick: function onClick() {
              return _this5.handleChange(key, disabled);
            } },
          _react2.default.createElement(
            'div',
            { className: 'inventory-process-img' },
            _react2.default.createElement(_SvgIcon2.default, { type: icon })
          ),
          _react2.default.createElement(
            'div',
            null,
            container.cName
          )
        ));
      });
      if (items.length === 1) items.length = 0;
      this.progressbar = items.length ? _react2.default.createElement(
        'ul',
        { className: 'inventory-process' },
        items
      ) : null;
    }
  }, {
    key: 'renderOtherContainers',
    value: function renderOtherContainers() {
      var _this6 = this;

      if (this.otherContainers.length !== 1) return null;
      var cardHeaderMeta = this.otherContainers[0];
      var containers = cardHeaderMeta.containers,
          cStyle = cardHeaderMeta.cStyle;

      containers && containers.forEach(function (item) {
        _this6.renderMetaContainer(item);
      });
      var activeMode = 'class';
      if (cStyle) {
        try {
          activeMode = JSON.parse(cStyle).activemode;
        } catch (e) {}
      }
      this.renderProgressBar(this.groupContainers, activeMode);
      return _react2.default.createElement(
        _basic.Row,
        null,
        this.toolbar,
        this.progressbar,
        this.sign
      );
    }
  }, {
    key: 'renderTabItems',
    value: function renderTabItems(containers) {
      var _this7 = this;

      var _props = this.props,
          viewModel = _props.viewModel,
          width = _props.width,
          height = _props.height;
      var _state3 = this.state,
          paneStates = _state3.paneStates,
          forceRenders = _state3.forceRenders;

      var items = [];
      var tabContent = null;
      containers.forEach(function (container, index) {
        var key = container[_this7.keyField];
        var disabled = false;
        if (paneStates[key]) {
          if (paneStates[key].visible === false) return;
          disabled = paneStates[key].disabled || false;
        }
        tabContent = container.cStyle ? _this7.external[key].component : _react2.default.createElement(MetaComponents.Container, { meta: container, viewModel: viewModel, width: width, height: height });
        items.push(_react2.default.createElement(
          TabPane,
          { tab: container.cName, forceRender: forceRenders.indexOf(key) >= 0, key: key, disabled: disabled },
          _react2.default.createElement(
            'div',
            { id: viewModel.getParams().billNo + '|' + key },
            tabContent
          )
        ));
      });
      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      return _react2.default.createElement(
        _basic.Row,
        { className: 'card-tabs ' + this.state.className },
        this.renderOtherContainers(),
        _react2.default.createElement(
          _antd.Tabs,
          { className: 'tab-list', activeKey: this.state.activeKey, type: 'card', animated: false, onChange: function onChange(key) {
              return _this8.handleChange(key);
            } },
          this.renderTabItems(this.groupContainers)
        )
      );
    }
  }]);

  return CardTabs;
}(_react.Component);

exports.default = CardTabs;