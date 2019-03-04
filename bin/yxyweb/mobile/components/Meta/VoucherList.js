'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _ScrollList = require('./ScrollList');

var _ScrollList2 = _interopRequireDefault(_ScrollList);

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _ListHeader = require('./ListHeader');

var _ListHeader2 = _interopRequireDefault(_ListHeader);

var _mobileFilter = require('../../../common/components/echart/MobileReport/mobileFilter');

var _mobileFilter2 = _interopRequireDefault(_mobileFilter);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ListFilter from './ListFilter';


var VoucherList = function (_Component) {
  _inherits(VoucherList, _Component);

  function VoucherList(props) {
    _classCallCheck(this, VoucherList);

    var _this = _possibleConstructorReturn(this, (VoucherList.__proto__ || Object.getPrototypeOf(VoucherList)).call(this, props));

    _initialiseProps.call(_this);

    cb.utils.setStatusBarStyle("dark");
    _this.state = { openFilter: false, isEdit: false, bHasData: false };
    _this.tableMeta = null;
    _this.listHeaderMeta = null;
    _this.hasFilter = false;

    _this.topToolbarMeta = null;
    _this.batchToolbarMeta = null;
    _this.inRowToolbarMeta = null;
    _this.hasBatchToolbar = false;
    var meta = props.meta,
        viewModel = props.viewModel;

    _this.recursiveContainer(meta);
    return _this;
  }

  _createClass(VoucherList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'recursiveContainer',
    value: function recursiveContainer(container) {
      var _this2 = this;

      // if (this.tableMeta) return;
      if (container.containers) {
        container.containers.forEach(function (item) {
          var containerType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
          if (containerType === 'table') {
            _this2.tableMeta = item;
            _this2.initTableMeta(item);
          } else if (containerType === 'listheader') {
            _this2.listHeaderMeta = item;
            _this2.hasFilter = _this2.getFilter(item);
          } else if (containerType === 'toolbar') {
            var cStyle = item.cStyle;
            try {
              if (cb.utils.isEmpty(cStyle)) {
                cStyle = null;
              } else {
                cStyle = JSON.parse(cStyle);
              }
            } catch (e) {
              cb.utils.alert('cStyle预制错误！', 'error');
            }
            if (cStyle) {
              switch (cStyle.toolbarType) {
                case "top":
                  _this2.topToolbarMeta = item;
                  break;
                case "batch":
                  _this2.batchToolbarMeta = item;
                  _this2.hasBatchToolbar = true;
                  break;
                case "inrow":
                  _this2.inRowToolbarMeta = item;
                  break;
              }
            }
          } else {
            _this2.recursiveContainer(item);
          }
        });
      }
    }
  }, {
    key: 'initTableMeta',
    value: function initTableMeta(gridMeta) {
      this.gridModel = this.props.viewModel.get(gridMeta.childrenField || gridMeta.cCode);
      this.gridModel.setState('override', false);
      var actions = this.inRowToolbarMeta;
      this.gridModel.setCache('actions', actions && actions.controls || []);
    }
    /*是否存在过滤*/

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          meta = _props.meta,
          viewModel = _props.viewModel,
          width = _props.width,
          height = _props.height,
          index = _props.index,
          returnCallback = _props.returnCallback,
          homeCallback = _props.homeCallback;

      height = parseInt(height) - window.__fontUnit * 1.7 + 22;
      return this.hasFilter ? _react2.default.createElement(
        'div',
        { className: 'mobile-voucherlist' },
        _react2.default.createElement(
          _antdMobile.Drawer,
          { className: 'filter-drawer',
            open: this.state.openFilter,
            enableDragHandle: true
            // sidebar={
            //   <ListFilter
            //     model={viewModel}
            //     onOk={this.onFilterOk}
            //     initFilterFields={this.initFilterFields}
            //   />
            // }
            , sidebar: _react2.default.createElement(_mobileFilter2.default, {
              model: viewModel,
              onOk: this.onFilterOk,
              initFilterFields: this.initFilterFields,
              filterType: "list"
            }),
            position: 'right',
            onOpenChange: this.onOpenChange
          },
          _react2.default.createElement(_ListHeader2.default, { tagBarStatus: this.setTagBarStatus, bHasData: this.state.bHasData, hasBatchToolbar: this.hasBatchToolbar, topToolbarMeta: this.topToolbarMeta,
            meta: this.listHeaderMeta, hasFilter: true, viewModel: viewModel, onEdit: this.onEdit,
            title: meta.cTemplateTitle, showFilter: function showFilter() {
              return _this3.setState({ openFilter: true });
            } }),
          _react2.default.createElement(_ScrollList2.default, {
            isEdit: this.state.isEdit, isHaveTagBar: this.state.isShowTagBar, onDataChange: this.onDataChange, batchToolbarMeta: this.batchToolbarMeta, meta: this.tableMeta,
            inRowToolbarMeta: this.inRowToolbarMeta, height: height, viewModel: viewModel
          })
        )
      ) : _react2.default.createElement(
        'div',
        { className: 'mobile-voucherlist' },
        _react2.default.createElement(_ListHeader2.default, { tagBarStatus: this.setTagBarStatus, bHasData: this.state.bHasData, hasBatchToolbar: this.hasBatchToolbar, topToolbarMeta: this.topToolbarMeta,
          meta: this.listHeaderMeta, viewModel: viewModel, title: meta.cTemplateTitle }),
        _react2.default.createElement(_ScrollList2.default, { isHaveTagBar: this.state.isShowTagBar, onDataChange: this.onDataChange,
          isEdit: this.state.isEdit, batchToolbarMeta: this.batchToolbarMeta, meta: this.tableMeta,
          inRowToolbarMeta: this.inRowToolbarMeta, height: height, viewModel: viewModel
        })
      );
    }
  }]);

  return VoucherList;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.getFilter = function (meta) {
    var hasFilter = false;
    if (meta.containers) {
      meta.containers.map(function (item) {
        var containerType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        if (containerType == 'convenientquery') {
          hasFilter = true;
          var viewModel = _this4.props.viewModel;
          var queryItems = viewModel.getCache('queryItems') || [];
          if (queryItems.indexOf('filter') === -1) queryItems.push('filter');
          viewModel.setCache('queryItems', queryItems);
          _this4.filterMeta = item;
        }
      });
    }
    return hasFilter;
  };

  this.onOpenChange = function () {
    _this4.setState({ openFilter: !_this4.state.openFilter });
  };

  this.onFilterOk = function () {
    _this4.setState({ openFilter: false });
  };

  this.onEdit = function (isEdit) {
    _this4.setState({ isEdit: isEdit });
  };

  this.onDataChange = function (dataSource) {
    var bHasData = dataSource.length > 0 ? true : false;
    _this4.setState({ bHasData: bHasData });
  };

  this.initFilterFields = function () {
    _this4.setState({ openFilter: _this4.state.openFilter });
  };

  this.setTagBarStatus = function (isShowTagBar) {
    _this4.setState({ isShowTagBar: isShowTagBar });
  };
};

exports.default = VoucherList;