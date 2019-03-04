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

var _meta = require('../meta');

var _ModalLight = require('../common/ModalLight');

var _ModalLight2 = _interopRequireDefault(_ModalLight);

var _tabs = require('../../redux/tabs');

var tabsactions = _interopRequireWildcard(_tabs);

var _portal = require('../../redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _dynamicModal = require('../../redux/dynamicModal');

var modalactions = _interopRequireWildcard(_dynamicModal);

var _tree = require('../../redux/tree');

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoucherListBillTypes = {
  'VoucherList': 'voucher-list',
  'ArchiveList': 'voucher-list',
  'TreeList': 'voucher-list',
  'Option': 'meta-option'
};

var Meta = function (_Component) {
  _inherits(Meta, _Component);

  function Meta(props) {
    _classCallCheck(this, Meta);

    var _this = _possibleConstructorReturn(this, (Meta.__proto__ || Object.getPrototypeOf(Meta)).call(this, props));

    _this.state = {
      currentMode: _env2.default.VOUCHER_STATE_BROWSE,
      greaterHeight: true
    };
    return _this;
  }

  _createClass(Meta, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.viewModel.addListener(this);
      this.props.viewModel.on('modeChange', function (mode) {
        _this2.setState({ currentMode: mode });
      });
      this.props.viewModel.on('afterRenderComponent', function () {
        var greaterHeight = _this2.refs.container.clientHeight <= _this2.props.height ? false : true;
        _this2.setState({ greaterHeight: greaterHeight });
      });
      if (this.refs.container.clientHeight <= this.props.height) this.setState({ greaterHeight: false });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.viewModel.removeListener(this);
      this.props.viewModel.execute('destroy');
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.id !== this.props.id || nextState.currentMode !== this.state.currentMode || nextState.greaterHeight !== this.state.greaterHeight || nextProps.width !== this.props.width;
    }
  }, {
    key: 'communication',
    value: function communication(action) {
      // action.type, action.payload
      var _props = this.props,
          portalactions = _props.portalactions,
          index = _props.index,
          modalactions = _props.modalactions,
          execHandler = _props.execHandler,
          viewModel = _props.viewModel;

      if (action.type === 'close') return this.handleClose();
      if (action.type === 'return') return this.handleReturn(action.payload);
      if (action.type === 'modal') {
        if (action.payload.mode === 'html') {
          (0, _ModalLight2.default)({ content: _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: action.payload.html } }) });
          return;
        }
        if (action.payload.mode === 'inner') {
          modalactions.openMetaModal(action.payload.groupCode, action.payload.viewModel);
          return;
        }
        return action.payload.data === false ? modalactions.closeModal() : modalactions.openModal(action.payload.key, action.payload.data);
      }
      if (action.type === 'menu') return execHandler(action.payload.menuCode, action.payload.carryData);
      var _action$payload = action.payload,
          title = _action$payload.title,
          params = _action$payload.params,
          metaData = _action$payload.metaData;

      delete action.payload.title;
      delete action.payload.params;
      if (metaData) {
        var metaTemplate = metaData.view;
        var templateType = metaTemplate.templateType && metaTemplate.templateType.trim().toLocaleLowerCase();
        if (templateType === 'modal') {
          modalactions.openMetaRunnerModal(title, action.payload);
          return;
        }
      }
      portalactions.addItem(index, { title: title, content: action.payload, params: params || action.payload, parent: viewModel });
    }
  }, {
    key: 'handleReturn',
    value: function handleReturn(payload) {
      var _props2 = this.props,
          portalactions = _props2.portalactions,
          index = _props2.index,
          viewModel = _props2.viewModel;

      portalactions.delItem(index);
      var parentViewModel = viewModel.getCache('parentViewModel');
      if (parentViewModel) parentViewModel.execute('back', payload);
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      var _props3 = this.props,
          tabsactions = _props3.tabsactions,
          index = _props3.index;

      tabsactions.deleteItem(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          metaData = _props4.metaData,
          viewModel = _props4.viewModel,
          width = _props4.width,
          height = _props4.height,
          index = _props4.index;

      var className = metaData && VoucherListBillTypes[metaData.cBillType] || '';
      var component = null;
      if (metaData) component = _react2.default.createElement(_meta.Container, { className: 'height-100', meta: metaData.view, viewModel: viewModel, width: width, height: height, index: index });
      var _state = this.state,
          currentMode = _state.currentMode,
          greaterHeight = _state.greaterHeight;

      var classNames = [className];
      classNames.push('container-' + (currentMode === _env2.default.VOUCHER_STATE_BROWSE ? 'browse' : 'edit') + '-mode');
      classNames.push('container-' + (greaterHeight ? 'greater' : 'less') + '-height');
      return _react2.default.createElement(
        'div',
        { ref: 'container', className: classNames.join(' ') },
        component
      );
    }
  }]);

  return Meta;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch),
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch),
    modalactions: (0, _redux.bindActionCreators)(modalactions, dispatch),
    execHandler: (0, _redux.bindActionCreators)(_tree.execHandler, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Meta);