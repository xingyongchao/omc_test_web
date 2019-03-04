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

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _searchbox = require('../BasicComponents/searchbox');

var _searchbox2 = _interopRequireDefault(_searchbox);

var _tagbutton = require('../BasicComponents/tagbutton');

var _tagbutton2 = _interopRequireDefault(_tagbutton);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoucherList = function (_Component) {
  _inherits(VoucherList, _Component);

  function VoucherList(props) {
    _classCallCheck(this, VoucherList);

    var _this = _possibleConstructorReturn(this, (VoucherList.__proto__ || Object.getPrototypeOf(VoucherList)).call(this, props));

    _this.getTitle = function () {
      return _this.props.title;
    };

    _this.showFilter = function () {
      if (_this.props.showFilter) _this.props.showFilter();
    };

    _this.getRightContent = function () {
      var control = void 0,
          toolbar = void 0,
          buttons = [];
      if (_this.state.isEdit) return _react2.default.createElement(
        'span',
        { className: 'complete', onClick: _this.onComplete },
        '\u5B8C\u6210'
      );
      buttons.push(_react2.default.createElement(
        'span',
        { className: 'filter', onClick: _this.showFilter },
        _react2.default.createElement(_SvgIcon2.default, { type: 'shaixuan', style: { width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' } })
      ));
      if (_this.props.hasFilter) {
        var filterViewModel = _this.props.viewModel.getCache('FilterViewModel');
        if (filterViewModel && filterViewModel.getCache('filterModel')) {
          _this.filterFirstControl = filterViewModel.getCache('filterModel');
        }
        if (_this.filterFirstControl) {
          var ctrlType = _this.filterFirstControl.ctrlType.toLocaleLowerCase();
          if (ctrlType === 'searchbox') {
            _this.hasSearchBox = true;
            buttons.push(_react2.default.createElement(
              'span',
              { className: 'sousuo' },
              _react2.default.createElement('i', { onClick: _this.switchSearchPanel.bind(_this), className: 'icon icon-sousuo' })
            ));
          }
        }
      }
      if (_this.props.topToolbarMeta) {
        toolbar = _this.getToolbar(_this.props.topToolbarMeta);
        buttons.push(toolbar);
      }
      control = _react2.default.createElement(
        'div',
        null,
        buttons
      );
      return _react2.default.createElement(
        'div',
        { className: 'mobile-list-header-right' },
        control
      );
    };

    _this.onOk = function (model, filterModel) {
      var parentModel = _this.props.viewModel;
      if (model)
        // this.props.model.setValue(cval?"":this.state.value, true);
        if (parentModel && model && filterModel) filterModel.fireEvent('searchEvent', { model: parentModel, solutionid: _this.state.current });
      filterModel.get('search').fireEvent('click', { model: parentModel, solutionid: _this.state.current });
    };

    _this.getTagBar = function () {
      var control = void 0,
          cacheFilterModel = void 0;
      var filterViewModel = _this.props.viewModel.getCache('FilterViewModel');
      if (filterViewModel && filterViewModel.getCache('cacheFilterModel')) {
        cacheFilterModel = filterViewModel.getCache('cacheFilterModel');
      }
      _this.filterFirstControl = cacheFilterModel && _lodash2.default.find(cacheFilterModel, function (o) {
        var ctrlType = o.ctrlType.toLocaleLowerCase();
        if (ctrlType === 'tagbutton') {
          return o;
        }
      });
      if (_this.filterFirstControl) {
        var ctrlType = _this.filterFirstControl.ctrlType.toLocaleLowerCase();
        if (ctrlType === 'tagbutton' && filterViewModel.get(_this.filterFirstControl.itemName)) {
          if (!_this.hasTagButton) {
            _this.hasTagButton = true;
            _this.props.tagBarStatus(_this.hasTagButton);
          }
          var filterModel = filterViewModel.get(_this.filterFirstControl.itemName);
          var fmodel = filterModel.getFromDisplayModel() || filterModel.getFromModel();
          return _react2.default.createElement(
            'div',
            { className: 'list_head_tag' },
            _react2.default.createElement(_tagbutton2.default, { model: fmodel, TagClicked: function TagClicked() {
                return _this.onOk(fmodel, filterViewModel);
              }, title: _this.filterFirstControl.cShowCaption })
          );
        }
      }
      return null;
    };

    _this.getToolbar = function (toolbarMeta) {
      var controls = toolbarMeta.controls;
      if (!controls) return null;
      var showButtons = [];
      controls.map(function (control) {
        var controlKey = control.cItemName;
        var controlModel = _this.props.viewModel.get(controlKey);
        showButtons.push(_react2.default.createElement(
          'span',
          { className: controlKey, onClick: function onClick(e) {
              return _this.onToolbarClick(e, controlModel);
            } },
          _react2.default.createElement(_SvgIcon2.default, { type: control.icon == "plus" ? "xinzeng" : control.icon, style: { width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' } })
        ));
      });
      if (_this.props.hasBatchToolbar && _this.state.bHasData) showButtons.push(_react2.default.createElement(
        'span',
        { className: 'edit', onClick: _this.onEdit },
        _react2.default.createElement(_SvgIcon2.default, { type: 'bianji1', style: { width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' } })
      ));
      return showButtons;
    };

    _this.onToolbarClick = function (e, model) {
      model.fireEvent('click');
    };

    _this.onEdit = function () {
      if (_this.props.onEdit) _this.props.onEdit(true);
      _this.setState({ isEdit: true });
    };

    _this.onComplete = function () {
      if (_this.props.onEdit) _this.props.onEdit(false);
      _this.setState({ isEdit: false });
    };

    _this.getHeaderContent = function () {
      var filterViewModel = _this.props.viewModel.getCache('FilterViewModel');
      if (filterViewModel && filterViewModel.getCache('filterModel')) {
        _this.filterFirstControl = filterViewModel.getCache('filterModel');
      }
      var title = _this.getTitle();
      var rightContent = _this.getRightContent();
      var tagBar = _this.getTagBar();
      var searchStatus = _this.state.searchStatus;

      var control = null;
      if (_this.filterFirstControl && _this.filterFirstControl.ctrlType === 'SearchBox' && searchStatus) {
        //searchbox
        //filterViewModel.get('search')
        var model = filterViewModel.get(_this.filterFirstControl.itemName);
        var fromModel = model.getFromDisplayModel() || model.getFromModel();
        control = _react2.default.createElement(_searchbox2.default, { focus: true, ref: 'cusSearchBarRef', onCancel: _this.onCancel.bind(_this), parentModel: _this.props.viewModel, placeholder: _this.filterFirstControl.itemTitle, filterModel: filterViewModel, model: fromModel, title: title });
      } else {
        control = _react2.default.createElement(_NavBar2.default, { title: title, rightContent: rightContent });
      }
      return _react2.default.createElement(
        'div',
        { className: 'voucherlist_head' },
        control,
        tagBar
      );
    };

    _this.state = {
      bHasData: props.bHasData
    };
    _this.filterFirstControl = null;
    _this.hasSearchBox = false;
    return _this;
  }

  _createClass(VoucherList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.bHasData != this.state.bHasData) this.setState({ 'bHasData': nextProps.bHasData });
    }
  }, {
    key: 'switchSearchPanel',
    value: function switchSearchPanel() {
      this.setState({ searchStatus: true });
      setTimeout(function () {
        this.refs.cusSearchBarRef.refs.cusSearchBarRef.focus();
      }.bind(this), 200);
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.setState({ searchStatus: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var headerContent = this.getHeaderContent();
      return headerContent;
    }
  }]);

  return VoucherList;
}(_react.Component);

exports.default = VoucherList;