'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _antdMobile = require('antd-mobile');

var _Meta = require('../Meta');

var _portal = require('../../../common/redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _MobileReport = require('../../../common/components/echart/MobileReport');

var _env = require('../../../common/helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ModalLight from '../common/ModalLight';

// import * as tabsactions from '../../redux/modules/tabs';

// import * as modalactions from '../../redux/modules/dynamicModal';
// import { execHandler } from '../../redux/modules/tree';


var VoucherListBillTypes = {
  'VoucherList': 'voucher-list',
  'ArchiveList': 'voucher-list',
  'TreeList': 'voucher-list',
  'Option': 'meta-option'
};

var BillTypeComponents = {
  'voucherlist': _Meta.VoucherList,
  'archivelist': _Meta.VoucherList,
  'treelist': _Meta.VoucherList,
  'report': _MobileReport.MobileReport
};

var Meta = function (_Component) {
  _inherits(Meta, _Component);

  function Meta(props) {
    _classCallCheck(this, Meta);

    var _this = _possibleConstructorReturn(this, (Meta.__proto__ || Object.getPrototypeOf(Meta)).call(this, props));

    _this.handleReturn = function () {
      var _this$props = _this.props,
          portal = _this$props.portal,
          portalactions = _this$props.portalactions,
          index = _this$props.index,
          viewModel = _this$props.viewModel;

      var current = portal.tabs[index];
      if (!current) return;
      var currentPanes = current.panes;
      if (!currentPanes || !currentPanes.length) return;

      var _viewModel$getParams = viewModel.getParams(),
          mode = _viewModel$getParams.mode;

      if (mode && mode !== _env2.default.VOUCHER_STATE_BROWSE && viewModel.getDirtyData(false)) {
        cb.utils.confirm('确定要返回么', function () {
          _this._return(currentPanes, portalactions, index, viewModel);
        });
      } else {
        _this._return(currentPanes, portalactions, index, viewModel);
      }
    };

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
      // if (this.refs.container.clientHeight <= this.props.height)
      //   this.setState({ greaterHeight: false });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.viewModel.removeListener(this);
      this.props.viewModel.execute('destroy');
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextMode = nextProps.viewModel.getParams().mode;
      if (nextMode && nextMode != this.state.currentMode) this.setState({ currentMode: nextMode });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.id !== this.props.id || nextState.currentMode !== this.state.currentMode || nextState.greaterHeight !== this.state.greaterHeight;
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
      if (action.type === 'return') return this.handleReturn(action.refresh);
      if (action.type === 'modal') {
        if (action.payload.mode === 'html') {
          ModalLight({ content: _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: action.payload.html } }) });
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
    key: '_return',
    value: function _return(currentPanes, portalactions, index, viewModel) {
      if (currentPanes.length === 1) {
        this._home();
      } else {
        portalactions.delItem(index);
        var parentViewModel = viewModel.getCache('parentViewModel');
        if (parentViewModel) parentViewModel.execute('back');
      }
    }
  }, {
    key: '_home',
    value: function _home() {
      this.props.dispatch((0, _reactRouterRedux.goBack)());
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      var _props2 = this.props,
          tabsactions = _props2.tabsactions,
          index = _props2.index;

      tabsactions.deleteItem(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          metaData = _props3.metaData,
          viewModel = _props3.viewModel,
          width = _props3.width,
          height = _props3.height,
          index = _props3.index;

      var metaTemplate = metaData.view,
          billType = metaData.cBillType && metaData.cBillType.trim().toLocaleLowerCase();
      var ComName = BillTypeComponents[billType];
      if (ComName) return _react2.default.createElement(ComName, { meta: metaTemplate, viewModel: viewModel, width: width, height: height, index: index, returnCallback: this.handleReturn, homeCallback: this.goHome });
      var className = VoucherListBillTypes[metaData.cBillType] || '';
      var _state = this.state,
          currentMode = _state.currentMode,
          greaterHeight = _state.greaterHeight;

      var classNames = [className];
      classNames.push('container-' + (currentMode === _env2.default.VOUCHER_STATE_BROWSE ? 'browse' : 'edit') + '-mode');
      classNames.push('container-' + (greaterHeight ? 'greater' : 'less') + '-height');
      return _react2.default.createElement(
        'div',
        { ref: 'container', className: classNames.join(' ') },
        _react2.default.createElement(_Meta.Voucher, { meta: metaTemplate, viewModel: viewModel, width: width, height: height, index: index, returnCallback: this.handleReturn, homeCallback: this.goHome })
      );
    }
  }]);

  return Meta;
}(_react.Component);

function mapStateToProps(state) {
  return {
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // tabsactions: bindActionCreators(tabsactions, dispatch),
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch),
    // modalactions: bindActionCreators(modalactions, dispatch),
    // execHandler: bindActionCreators(execHandler, dispatch)
    dispatch: dispatch
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Meta);