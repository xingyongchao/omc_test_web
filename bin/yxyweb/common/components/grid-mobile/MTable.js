'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table-2');

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _MCell = require('./MCell');

var _MCell2 = _interopRequireDefault(_MCell);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _util = require('../../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableTouch = function (_React$Component) {
  _inherits(TableTouch, _React$Component);

  function TableTouch(props) {
    _classCallCheck(this, TableTouch);

    var _this = _possibleConstructorReturn(this, (TableTouch.__proto__ || Object.getPrototypeOf(TableTouch)).call(this, props));

    _this.setListenerState = function (params) {
      if (params.columnMode === 'local' && _this.props.columns) {
        for (var attr in _this.props.columns) {
          Object.assign(_this.props.columns[attr], params.columns[attr]);
        }params.columns = _this.props.columns;
      }
      var tmp_ColIndexs = {};
      var index = 0;
      /*cellState*/
      if (params.cellState) _this.cellState = params.cellState;

      //栏目col与index对照
      var hasColumn = false;
      var tableWidth = _this.props.width || 1100;
      for (var attr in params.columns) {
        if (_this.props.widthMode == 'percent') {
          var iColWidth = parseFloat(params.columns[attr].iColWidth);
          var width = isNaN(iColWidth) ? 25 : iColWidth;
          width = tableWidth * width / 100;
          params.columns[attr].iColWidth = width;
        } else {
          if (isNaN(params.columns[attr].iColWidth)) {
            params.columns[attr].iColWidth = 200;
          } else {
            params.columns[attr].iColWidth = parseFloat(params.columns[attr].iColWidth * 3 / 4);
          }
        }
        hasColumn = true;
        if (index === 0) tmp_ColIndexs[attr] = 0;else tmp_ColIndexs[attr] = index;
        index = index + 1;
      }
      if (params.pageInfo) _this.setPageInfo(params.pageInfo);
      _this.GridProps.showRowNo = params.showRowNo; //是否显示行号
      _this.GridProps.showCheckBox = params.showCheckBox; //是否显示复选框
      _this.GridProps.isRadio = !params.multiple; //是否单选
      _this.ColIndexs = tmp_ColIndexs; //栏目与index对照
      if (hasColumn) {
        _this.columns = params.columns;
        if (params.rows && params.rows.length > 0) _this.dataList = params.rows;
        //初始化单元格状态
        _this._InitCellStatus(params.columns, params.rows);
        var columnset = _this.RemodelingColumn(params.rows, params.columns);
        _this.setState({ columnset: columnset });
      }
    };

    _this._InitCellStatus = function (Columns, DataSource) {
      if (DataSource !== undefined) {
        //设置初始单元格编辑状态/行选择初始状态/action状态/单元格状态 disabled/readOnly/style
        var temp_cellState = cb.utils.extend(true, [], _this.cellState);
        var length = DataSource.length;
        if (length <= 0) return;
        for (var i = 0; i < length; i++) {
          DataSource[i]._selected = false;
          if (!temp_cellState[i]) temp_cellState[i] = {};
          for (var attr in Columns) {
            if (!temp_cellState[i][attr]) temp_cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {} };
          }
        }
        _this.cellState = temp_cellState;
      }
    };

    _this.setColumns = function (columns) {
      var columndata = cb.utils.extend(true, {}, columns);
      for (var attr in columndata) {
        if (isNaN(columndata[attr].iColWidth)) columndata[attr].iColWidth = 200;else columndata[attr].iColWidth = parseFloat(columndata[attr].iColWidth * 3 / 4);
      }

      var columnset = _this.RemodelingColumn(_this.dataList, columndata);
      _this.columns = columndata;
      var length = _this.dataList.length;
      for (var i = 0; i < length; i++) {
        for (var attr in columndata) {
          if (!_this.cellState[i][attr]) {
            _this.cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {} };
          }
        }
      }
      _this.setState({ columnset: columnset });
    };

    _this.setDataSource = function (data) {
      _this.dataList = data;
      //初始化单元格状态
      _this._InitCellStatus(_this.columns, data);
      var columnset = _this.RemodelingColumn(data, _this.columns);
      _this.setState({ columnset: columnset });
    };

    _this.RemodelingColumn = function (dataList, columnState) {
      var ret = [],
          columnData = [];
      /*行号*/
      if (_this.GridProps.showRowNo) {
        if (!columnState.GridRowNo) columnState.GridRowNo = { 'cItemName': 'GridRowNo', 'iColWidth': 50, 'cControlType': 'Input', 'bFixed': '1' };
        columnData.push(columnState.GridRowNo);
      }
      for (var attr in columnState) {
        if (attr != 'GridRowNo') columnData.push(columnState[attr]);
      }
      columnData.map(function (col) {
        var column = this.setColumn(col.cItemName, col);
        ret.push(column);
      }, _this);
      return ret;
    };

    _this.setColumn = function (attr, col) {
      var iColWidth = parseFloat(col.iColWidth);
      var width = isNaN(iColWidth) ? 200 : iColWidth;
      var headerCell = void 0,
          headerClassName = '';
      var fiexd = col.bFixed == 1 ? true : false;
      var align = 'left';
      // if (col.iAlign === 1)
      //   align = 'left';
      // else if (col.iAlign === 2)
      //   align = 'center';
      // else
      //   align = 'right';

      headerCell = _react2.default.createElement(
        _fixedDataTable.Cell,
        { className: 'mobile-header-cell' },
        _react2.default.createElement(
          'div',
          { style: { "width": width }, id: col.index },
          _react2.default.createElement(
            'span',
            { style: { width: width }, className: 'textCol table-header-name' },
            col.cShowCaption
          )
        )
      );
      return _react2.default.createElement(_fixedDataTable.Column, { key: attr,
        allowCellsRecycling: true, columnKey: attr,
        header: headerCell, cell: function cell(rowIndex) {
          return _this.setCell(rowIndex, col);
        },
        width: width, align: align, fixed: fiexd });
    };

    _this.setCell = function (rowIndex, col) {
      return _react2.default.createElement(_MCell2.default, {
        dataList: _this.dataList, readOnly: true, RowProperty: rowIndex,
        Column: col, model: _this.props.model,
        columnsList: _this.columns, rowHeight: _this.rowheight
      });
    };

    _this._onRowClick = function (e, index) {
      if (_this.dataList.length == 0 || !_this.dataList[index]) return;
      if (!_this.GridProps.showCheckBox || _this.GridProps.isRadio || _this.props.hasAction) _this.props.model.select(index);
      _this.props.model.setFocusedRowIndex(index);
    };

    _this.setPageInfo = function (paginationlist) {
      if (paginationlist.pageSize === -1) _this.GridProps.isPagination = false;
      var pageinfo = _this.state.pagination;
      pageinfo.total = paginationlist.recordCount;
      pageinfo.current = paginationlist.pageIndex;
      pageinfo.pageSize = paginationlist.pageSize;
      _this.setState({
        pagination: pageinfo
      });
    };

    _this._getDecimal = function (col, sum) {
      var NumPoint = col.iNumPoint;
      /*谓词变量支持系统参数*/
      var cFormatData = col.cFormatData;
      try {
        if (!cFormatData || cFormatData == '') {
          cFormatData = {};
        } else {
          cFormatData = JSON.parse(cFormatData);
        }
      } catch (e) {
        cb.utils.alert('数量/金额/单价，预制错误！', 'error');
      }
      var decimal = cFormatData.decimal ? (0, _util.getPredicateValue)(cFormatData.decimal) : null;
      var controlType = col.cControlType ? col.cControlType.trim().toLocaleLowerCase() : '';
      if (controlType === 'money') {
        if (decimal) NumPoint = decimal;else NumPoint = cb.rest.AppContext.option.amountofdecimal;
      } else if (controlType === 'price') {
        if (decimal) NumPoint = decimal;else NumPoint = cb.rest.AppContext.option.monovalentdecimal;
      } else if (controlType === 'inputnumber') {
        if (decimal) NumPoint = decimal;else if (!NumPoint || NumPoint == '') NumPoint = 0;
      } else {
        NumPoint = null;
      }
      if (!isNaN(sum) && NumPoint) {
        sum = Number(sum);
        sum = sum.toFixed(NumPoint);
      }
      return sum;
    };

    _this.onScrollEnd = function (scrollx, scrolly, hideRows) {
      var rowCount = _this.dataList.length;
      if (_this.showRows + hideRows == rowCount) {
        var pagination = _this.state.pagination;
        var newSize = pagination.current + 1;
        var pageCount = pagination.total / pagination.pageSize;
        pageCount = Math.ceil(pageCount);
        if (newSize > pageCount) return;
        if (_this.props.model) _this.props.model.setPageIndex(pagination.current + 1);
      }
    };

    _this.getEmptyData = function () {
      var data = _this.dataList;
      if (data.length) return;
      if (!_this.state.showSearch) return _react2.default.createElement(
        'div',
        { className: 'eChartMobile-nodata' },
        _react2.default.createElement(_SvgIcon2.default, { type: 'huanxingtu' }),
        _react2.default.createElement(
          'div',
          { className: 'eChartMobile-nodata-text' },
          ' \u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~'
        )
      );else return _react2.default.createElement('div', { className: 'refer_no_date' });
    };

    _this.state = {
      visible: false,
      pagination: { total: 0, current: 0, pageSize: 0 }
    };
    // showCheckBox 是否显示选择框  showRowNo 是否显示行号
    //是否单选 isPagination 是否分页
    _this.GridProps = {
      showRowNo: true,
      showCheckBox: false,
      isPagination: false
    };
    _this.dataList = []; /*grid数据*/
    _this.columns = {}; /*grid栏目数据*/
    _this.ColIndexs = {}; /*key与number对照*/
    _this.headerHeight = 40;
    _this.rowheight = props.rowHeight || 40;
    _this.showRows = 0;
    return _this;
  }

  _createClass(TableTouch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) {
        this.props.model.addListener(this);
        /*表格高度*/
        var height = this.props.height ? this.props.height : 1020;
        var bodyHeight = height - this.headerHeight;
        var pageIndex = Math.ceil(bodyHeight / this.rowheight / 10);
        this.showRows = Math.ceil(bodyHeight / this.rowheight);
        var pageSize = pageIndex * 10;
        this.props.model.setPageSize(pageSize);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }

    //-----------------------------------------------------------设置grid中columns，datasource等属性--------------------------------------------------------------------------------------------------


    //初始化单元格状态

    //----------------------------------------------接受viewmodeld参数-----------------------------------------------------------------------------------------------
    //接受来自model的column信息

    //接收来自model的data信息


    //---------------------------------------------组织grid结构----------------------------------------------------------------------------------------------------------------
    //组织column结构

    //设置column

    //行单击事件

    //设置分页

  }, {
    key: 'render',
    value: function render() {
      var emptyData = this.getEmptyData();
      return _react2.default.createElement(
        'div',
        { className: 'mobile-grid' },
        _react2.default.createElement(
          _row2.default,
          null,
          _react2.default.createElement(
            _fixedDataTable.Table,
            {
              rowHeight: this.rowheight,
              overflowY: 'auto',
              overflowX: 'auto',
              showScrollbarX: false,
              showScrollbarY: false,
              onScrollEnd: this.onScrollEnd
              // onRowTouchEnd={this.onRowTouchEnd}
              , footerHeight: 0,
              headerHeight: this.headerHeight || 40,
              rowsCount: this.dataList.length,
              width: this.props.width,
              height: this.props.height,
              isColumnResizing: false,
              onRowClick: this._onRowClick,
              touchScrollEnabled: true
            },
            this.state.columnset
          ),
          emptyData
        )
      );
    }
  }]);

  return TableTouch;
}(_react2.default.Component);

exports.default = TableTouch;