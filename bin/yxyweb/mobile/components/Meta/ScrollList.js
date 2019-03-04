'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _listview = require('../BasicComponents/listview');

var _listview2 = _interopRequireDefault(_listview);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _button = require('../BasicComponents/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxItem = _antdMobile.Checkbox.CheckboxItem;

var ScrollList = function (_Component) {
  _inherits(ScrollList, _Component);

  function ScrollList(props) {
    _classCallCheck(this, ScrollList);

    var _this = _possibleConstructorReturn(this, (ScrollList.__proto__ || Object.getPrototypeOf(ScrollList)).call(this, props));

    _initialiseProps.call(_this);

    var meta = props.meta,
        viewModel = props.viewModel;

    var columns = {};
    if (meta.controls) {
      meta.controls.forEach(function (column) {
        columns[column.cItemName] = column;
      });
    }
    var model = viewModel.get(meta.childrenField || meta.cCode);
    model.setState('override', false);
    var cStyle = meta.cStyle;
    try {
      if (!cStyle || cStyle == '') {
        // cStyle = [
        //   {
        //     cols: [
        //       { span: 0, cItemName: 'code', float: 'left', showCaption: false, className: 'voucherCode' },
        //       { span: 0, cItemName: 'iBusinesstypeid_name', float: 'left', showCaption: false, className: 'businessType' }
        //     ]
        //   },
        //   {
        //     cols: [
        //       { span: 24, cItemName: 'fMoneySum', showCaption: true },
        //       { span: 24, cItemName: 'fPresellPayMoney', showCaption: true },
        //       { span: 24, cItemName: 'vouchdate', showCaption: true }
        //     ]
        //   }
        // ];
      } else {
        cStyle = JSON.parse(cStyle);
        if (meta.containers) {
          meta.containers.map(function (container) {
            if (container.controls) {
              columns[container.cGroupCode] = {};
              container.controls.forEach(function (column) {
                columns[[container.cGroupCode]][column.cItemName] = column;
              });
            }
          });
        }
      }
    } catch (e) {
      cb.utils.alert('格式化字段，预制错误！', 'error');
    }
    _this.state = {
      columns: columns,
      model: model,
      cStyle: cStyle,
      isLoading: true,
      refreshing: false,
      dataSource: [],
      isFirstLoading: true
    };
    _this.actionState = {};
    return _this;
  }

  _createClass(ScrollList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.state.model.addListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var _this2 = this;

      var columns = this.state.columns;
      if (params.columnMode === 'local' && columns) {
        for (var attr in columns) {
          Object.assign(columns[attr], params.columns[attr]);
        }params.columns = columns;
      }

      _lodash2.default.forEach(params.columns, function (item, attr) {
        if (!_this2.dblClickItemName && item.bJointQuery) _this2.dblClickItemName = attr;
      });
      this.setState({ columns: params.columns });
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(data) {
      this.initList(this.state.columns, data);
      if (this.props.onDataChange) this.props.onDataChange(data);

      this.setState({ dataSource: data, isLoading: false, refreshing: false, isFirstLoading: false });
    }
  }, {
    key: 'setPageInfo',
    value: function setPageInfo(pageInfo) {
      this.setState({ pageInfo: pageInfo });
    }
  }, {
    key: 'select',
    value: function select() {
      this.setState({ selectAll: this.state.selectAll });
    }
  }, {
    key: 'unselect',
    value: function unselect() {
      this.setState({ selectAll: this.state.selectAll });
    }
  }, {
    key: 'selectAll',
    value: function selectAll() {
      this.setState({ selectAll: true });
    }
  }, {
    key: 'unselectAll',
    value: function unselectAll() {
      this.setState({ selectAll: false });
    }
    //返回到顶部事件

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          cStyle = _state.cStyle,
          columns = _state.columns,
          isLoading = _state.isLoading,
          refreshing = _state.refreshing,
          dataSource = _state.dataSource,
          isShowRTop = _state.isShowRTop,
          isFirstLoading = _state.isFirstLoading;

      var height = document.documentElement.offsetHeight - window.__fontUnit * 1.28 + 22;
      var batchToolbar = this.getBatchToolbar();
      var className = "uretail_list";
      if (this.props.isEdit) className = "edit-list uretail_list";
      var selectIndexes = this.state.model.getSelectedRowIndexes();
      if (this.props.isEdit) height = height - 40;
      if (this.props.isHaveTagBar) height = height - 65;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(_listview2.default, { isEdit: this.props.isEdit, onRowSelect: this.onRowSelect, ref: function ref(el) {
            return _this3.lv = el;
          },
          showRTop: this.showRTop, key: 'voucherlistview', height: height, pageInfo: this.state.pageInfo,
          isFirstLoading: isFirstLoading, cStyle: cStyle, onRowClick: this.handleRowClick,
          refreshList: this.refreshList, columns: columns, loadMore: this.loadMore, isLoading: isLoading,
          refreshing: refreshing, dataSource: dataSource, selectIndexes: selectIndexes || [],
          selectAll: this.selectAll, actionState: this.actionState, inRowToolbarMeta: this.props.inRowToolbarMeta, onRowActionClick: this.onRowActionClick }),
        _react2.default.createElement(
          'div',
          { className: 'return-top', style: { "display": isShowRTop ? 'block' : 'none' },
            onClick: this.returnTop },
          _react2.default.createElement(_SvgIcon2.default, { type: 'fanhuidingbu' })
        ),
        batchToolbar
      );
    }
  }]);

  return ScrollList;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.initList = function (columns, dataSource) {
    var inRowToolbarMeta = _this4.props.inRowToolbarMeta;
    if (!inRowToolbarMeta) return;
    var controls = inRowToolbarMeta.controls;
    var temp_actionState = cb.utils.extend(true, {}, _this4.actionState);
    dataSource.map(function (row, index) {
      var _id = row._id;
      if (!temp_actionState[_id]) temp_actionState[_id] = {};
      controls.map(function (action) {
        if (!temp_actionState[_id][action.cItemName]) temp_actionState[_id][action.cItemName] = { visible: true };
      });
    });
    _this4.actionState = temp_actionState;
  };

  this.setActionState = function (data) {
    var row = _this4.state.dataSource[data.rowIndex];
    var actionState = _this4.actionState;
    actionState[row._id][data.itemName][data.name] = data.value;
    _this4.setState({ selectAll: _this4.state.selectAll });
  };

  this.setActionsState = function (data) {
    _this4.state.dataSource.map(function (row, index) {
      _this4.actionState[row._id] = data[index];
    });
    _this4.setState({ selectAll: _this4.state.selectAll });
  };

  this.loadMore = function () {
    var _state$pageInfo = _this4.state.pageInfo,
        pageCount = _state$pageInfo.pageCount,
        pageIndex = _state$pageInfo.pageIndex;

    if (pageCount == pageIndex) return;
    _this4.setState({ isLoading: true });
    _this4.state.model.setPageIndex(pageIndex + 1);
  };

  this.refreshList = function () {
    _this4.setState({ refreshing: true });
    _this4.props.viewModel.execute('refresh');;
  };

  this.handleRowClick = function (e, rowIndex) {
    _this4.state.model.execute('dblClick', _this4.state.dataSource[rowIndex]);
    // this.state.model.execute('cellJointQuery', { rowIndex, cellName: this.dblClickItemName });
  };

  this.returnTop = function () {
    if (_this4.lv) {
      _this4.setState({ isShowRTop: false });
      _this4.lv.lv.scrollTo(0, 0);
      _this4.lv.lv.scrollTo(0, 0);
    }
  };

  this.showRTop = function () {
    _this4.setState({ isShowRTop: true });
  };

  this.onSelectAll = function (e) {
    var checked = e.target.checked;
    if (checked) _this4.state.model.selectAll();else _this4.state.model.unselectAll();
  };

  this.onRowSelect = function (checked, rowID) {
    if (checked) _this4.state.model.select(rowID, false);else _this4.state.model.unselect(rowID);
  };

  this.onRowActionClick = function (cItemName, rowIndex) {
    var params = { index: rowIndex, cItemName: cItemName };
    _this4.props.viewModel.get(cItemName).fireEvent('click', params);
  };

  this.getBatchToolbar = function () {
    if (!_this4.props.isEdit) return null;
    var meta = _this4.props.batchToolbarMeta;
    var controls = meta.controls || [];
    var toolbars = [];
    controls.map(function (control) {
      var model = _this4.props.viewModel.get(control.cItemName);
      toolbars.push(_react2.default.createElement(_button2.default, { model: model }));
    });
    return _react2.default.createElement(
      'div',
      { className: 'batch-toolbar' },
      _react2.default.createElement(
        'div',
        { className: 'batch-toolbar-checkbox' },
        _react2.default.createElement(
          CheckboxItem,
          { checked: _this4.state.selectAll, onChange: function onChange(e) {
              return _this4.onSelectAll(e);
            } },
          '\u5168\u9009'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'batch-toolbar-button' },
        toolbars
      )
    );
  };
};

exports.default = ScrollList;