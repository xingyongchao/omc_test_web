'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table-2');

var _antd = require('antd');

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _CellModel = require('./CellModel');

var _CellModel2 = _interopRequireDefault(_CellModel);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _util = require('../../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableTouch = function (_React$Component) {
  _inherits(TableTouch, _React$Component);

  function TableTouch(props) {
    _classCallCheck(this, TableTouch);

    var _this = _possibleConstructorReturn(this, (TableTouch.__proto__ || Object.getPrototypeOf(TableTouch)).call(this, props));

    _this.rowClassNameGetter = function (index) {
      if (index === _this.selectIndex) return 'public_fixedDataTableRow_selected';
      if (_this.props.model) {
        var selectRows = _this.props.model.getSelectedRowIndexes();
        for (var i = 0; i < selectRows.length; i++) {
          var rowIndex = selectRows[i];
          if (index === rowIndex) return 'public_fixedDataTableRow_CheckedRow';
        }
      }
    };

    _this.setListenerState = function (params) {
      if (params.columnMode === 'local' && _this.props.columns) {
        for (var attr in _this.props.columns) {
          Object.assign(_this.props.columns[attr], params.columns[attr]);
        }params.columns = _this.props.columns;
      }
      var tmp_ColIndexs = {};
      var index = 0;
      /*cellState*/
      if (params.cellState) {
        _this.cellState = params.cellState;
      }

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
            params.columns[attr].iColWidth = parseFloat(params.columns[attr].iColWidth * 4 / 3);
          }
        }
        hasColumn = true;
        if (index === 0) {
          tmp_ColIndexs[attr] = 0;
        } else {
          tmp_ColIndexs[attr] = index;
        }
        index = index + 1;
      }
      if (params.pageInfo) {
        _this.setPageInfo(params.pageInfo);
      }
      _this.GridProps.showRowNo = params.showRowNo; //是否显示行号
      _this.GridProps.showCheckBox = params.showCheckBox; //是否显示复选框
      _this.GridProps.isRadio = !params.multiple; //是否单选
      _this.GridProps.showAggregates = params.showAggregates; //是否显示合计
      _this.GridProps.showSubtotal = params.showSubtotal; //是否显示小计
      _this.GridProps.isPagination = params.pagination; //是否分页
      _this.GridProps.showColumnSetting = params.showColumnSetting; //是否显示栏目设置
      _this.ColIndexs = tmp_ColIndexs; //栏目与index对照

      if (hasColumn) {
        _this.columns = params.columns;
        if (params.rows && params.rows.length > 0) _this.dataList = params.rows;
        //初始化单元格状态
        _this._InitCellStatus(params.columns, params.rows);
        _this.readOnly = params.readOnly;
        var columnset = _this.RemodelingColumn(params.rows, params.columns);
        _this.setState({
          readOnly: params.readOnly,
          columnset: columnset,
          showColumnSetting: params.showColumnSetting
        });
      }
    };

    _this._InitCellStatus = function (Columns, DataSource) {
      /*初始化action列的渲染数据*/
      var action = _this.props.action;
      if (action && action.cControlType && action.cControlType == 'Toolbar') {
        _this.action = action;
      }
      var PopMeta = {};
      if (DataSource !== undefined) {
        var attr;

        var _ret = function () {
          //设置初始单元格编辑状态/行选择初始状态/action状态/单元格状态 disabled/readOnly/style
          var temp_cellState = cb.utils.extend(true, [], _this.cellState);
          var temp_isColErro = cb.utils.extend(true, [], _this.isColErro);
          var temp_actionState = cb.utils.extend(true, [], _this.actionState);
          var length = DataSource.length;
          if (length <= 0) return {
              v: void 0
            };

          var _loop = function _loop(i) {
            DataSource[i]._selected = false;
            if (_this.action && _this.action.controls) {
              var actionList = _this.action.controls;
              if (!temp_actionState[i]) temp_actionState[i] = {};
              actionList.map(function (action) {
                if (!temp_actionState[i][action.cItemName]) temp_actionState[i][action.cItemName] = { disabled: false, visible: true };
              });
            }
            if (!temp_cellState[i]) temp_cellState[i] = {};
            if (!temp_isColErro[i]) temp_isColErro[i] = {};
            for (attr in Columns) {
              if (!temp_cellState[i][attr]) temp_cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {} };
              if (!temp_isColErro[i][attr]) temp_isColErro[i][attr] = false;
            }
          };

          for (var i = 0; i < length; i++) {
            _loop(i);
          }
          if (temp_actionState) _this.actionState = temp_actionState;
          if (_this.props.model) _this.props.model.initActionsState(_this.actionState);
          _this.cellState = temp_cellState;
          _this.isColErro = temp_isColErro;
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    };

    _this.setColumns = function (columns) {
      var columndata = cb.utils.extend(true, {}, columns);
      if (_this.props.widthMode == 'percent') {
        var tableWidth = _this.props.width || 1100;
        for (var key in columndata) {
          var iColWidth = parseFloat(columndata[key].iColWidth);
          var width = isNaN(iColWidth) ? 25 : iColWidth;
          width = tableWidth * width / 100;
          columndata[key].iColWidth = width;
        }
      } else {
        for (var attr in columndata) {
          if (isNaN(columndata[attr].iColWidth)) {
            columndata[attr].iColWidth = 200;
          } else {
            columndata[attr].iColWidth = parseFloat(columndata[attr].iColWidth * 4 / 3);
          }
        }
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

    _this.setSum = function (sumData) {
      // if (sumData.length > 0)
      _this.setState({
        sumData: sumData
      });
    };

    _this.setDataSource = function (data) {
      _this.selectIndex = -1;
      _this.dataList = data;
      _this.indeterminate = false;
      _this.selectAll = false;
      /*设置scrollRow--滚动加载*/
      var _this$state$paginatio = _this.state.pagination,
          current = _this$state$paginatio.current,
          pageSize = _this$state$paginatio.pageSize;

      if (data.length <= pageSize) {
        _this.scrollRow = 0;
      } else {
        _this.scrollRow = current * 10;
      }

      //初始化单元格状态
      _this._InitCellStatus(_this.columns, data);
      var columnset = _this.RemodelingColumn(data, _this.columns);
      _this.setState({ columnset: columnset });
      if (_this.props.onChangeData) _this.props.onChangeData();
    };

    _this.RemodelingColumn = function (dataList, columnState) {
      var ret = [],
          columnData = [],
          actionAlign = '',
          Operation = {};

      var readOnly = _this.readOnly;
      /*操作列*/
      if (readOnly === false && _this.action.controls) {
        columnState.Operation = { 'cItemName': 'Operation', 'iColWidth': 40, 'cControlType': 'Action', 'iAlign': 3 };
        columnData.push(columnState.Operation);
      }
      /*行号*/
      if (_this.GridProps.showRowNo) {
        if (!columnState.GridRowNo) columnState.GridRowNo = { 'cItemName': 'GridRowNo', 'iColWidth': 50, 'cControlType': 'Input', 'bFixed': '1' };
        columnData.push(columnState.GridRowNo);
      }
      /*选择列*/
      if (_this.GridProps.showCheckBox || _this.props.hasAction) {
        if (!columnState.CheckBox) columnState.CheckBox = { 'cItemName': 'CheckBox', 'iColWidth': 45, 'cControlType': 'SelectCheckBox' };
        columnData.push(columnState.CheckBox);
      }

      for (var attr in columnState) {
        if (attr != 'CheckBox' && attr != 'GridRowNo' && attr != 'Operation') columnData.push(columnState[attr]);
      }
      _this.totalWidth = 0;
      columnData.map(function (col) {
        var column = this.setColumn(col.cItemName, col);
        this.totalWidth += col.iColWidth;
        ret.push(column);
      }, _this);
      return ret;
    };

    _this.setColumn = function (attr, col) {
      var controlType = col.cControlType;
      var iColWidth = parseFloat(col.iColWidth);
      var width = isNaN(iColWidth) ? 200 : iColWidth;
      var headerCell = void 0,
          headerClassName = '';
      var fiexd = col.bFixed == 1 ? true : false;
      var align = '';
      if (col.iAlign === 1) {
        align = 'left';
      } else if (col.iAlign === 2) {
        align = 'center';
      } else {
        align = 'right';
      }
      if (!col.bCanModify && !_this.readOnly) {
        headerClassName = 'public_fixedDataTableCell_disabled';
      } else {
        headerClassName = 'headerName';
      }

      headerCell = _react2.default.createElement(
        _fixedDataTable.Cell,
        { className: headerClassName },
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'left', width: _this.props.width, display: "flex" }, id: col.index },
          _react2.default.createElement(
            'span',
            { style: { width: width }, className: 'textCol table-header-name' },
            col.cShowCaption
          )
        )
      );
      if (attr === 'Operation') {
        headerCell = _react2.default.createElement(
          _fixedDataTable.Cell,
          null,
          _react2.default.createElement('div', { className: 'headerName' })
        );
        return _react2.default.createElement(_fixedDataTable.Column, { key: attr,
          allowCellsRecycling: true, columnKey: attr,
          header: headerCell, cell: function cell(rowIndex) {
            return _this.setCell(rowIndex, col);
          },
          width: width, align: 'center', fixedRight: true, footer: _this._setFooter });
      }
      if (attr === 'CheckBox') {
        var model = _this.props.model.getEditRowModel().get(attr);
        if (_this.GridProps.isRadio || _this.props.hasAction) {
          headerCell = _react2.default.createElement(_fixedDataTable.Cell, null);
        } else {
          headerCell = _react2.default.createElement(
            _fixedDataTable.Cell,
            null,
            _react2.default.createElement(
              'div',
              { className: 'checkboxHD' },
              _react2.default.createElement(_antd.Checkbox, { indeterminate: _this.indeterminate, checked: _this.selectAll, onChange: function onChange(e, i) {
                  return _this.SelectChange(e, -1);
                } })
            )
          );
        }
        fiexd = true, align = 'center';
      }
      return _react2.default.createElement(_fixedDataTable.Column, { key: attr,
        allowCellsRecycling: true, columnKey: attr,
        header: headerCell, cell: function cell(rowIndex) {
          return _this.setCell(rowIndex, col);
        },
        width: width, align: align, fixed: fiexd, footer: _this._setFooter });
    };

    _this.setCell = function (rowIndex, col) {
      var _React$createElement;

      var isColErro = _this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] ? _this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] : false;
      if (_this.state.style && _this.state.style.height) {
        _this.rowheight = _this.state.style.height;
      }
      return _react2.default.createElement(_CellModel2.default, (_React$createElement = {
        dataList: _this.dataList, hasAction: _this.props.hasAction, readOnly: _this.readOnly, selectIndex: _this.selectIndex, RowProperty: rowIndex, selectAllState: _this._selectAllState,
        action: _this.action, indeterminate: _this.indeterminate, selectAll: _this.selectAll, cellState: _this.cellState, isColErro: isColErro, Column: col, model: _this.props.model, GridProps: _this.GridProps, triggerRender: _this._triggerRender, columnsList: _this.columns, rowHeight: _this.props.rowHeight || _this.rowheight, setCellBlur: _this.setCellBlur,
        renderIndex: _this.renderIndex, ActionClick: _this.ActionClick }, _defineProperty(_React$createElement, 'rowHeight', _this.rowheight), _defineProperty(_React$createElement, 'actionState', _this.actionState), _React$createElement));
    };

    _this._triggerRender = function () {
      var columnset = _this.RemodelingColumn(_this.dataList, _this.columns);
      _this.setState({ columnset: columnset });
    };

    _this._selectAllState = function (selectAll, indeterminate) {
      _this.selectAll = selectAll;
      _this.indeterminate = indeterminate;
      _this._triggerRender();
    };

    _this.SelectChange = function (e, index) {
      if (!e.target.checked) {
        _this.props.model.unselectAll();
        _this.indeterminate = false;
      } else {
        _this.props.model.selectAll();
      }
      _this.dataList.map(function (item, index) {
        _this.dataList[index]._selected = e.target.checked;
      });
      _this.selectAll = e.target.checked;
      var columnset = _this.RemodelingColumn(_this.dataList, _this.columns);
      _this.setState({ columnset: columnset });
    };

    _this._onRowClick = function (e, index) {
      if (_this.dataList.length == 0 || !_this.dataList[index]) return;
      if (!_this.GridProps.showCheckBox || _this.GridProps.isRadio || _this.props.hasAction) _this.props.model.select(index);else if (_this.props.tableMode == 'refer') _this.props.model.select(index, false);
      // this.props.tableMode == 'refer'
      _this.props.model.setFocusedRowIndex(index);
    };

    _this.setCellValue = function (data) {
      _this.dataList[data.rowIndex][data.cellName] = data.value;
      var columnset = _this.RemodelingColumn(_this.dataList, _this.columns);
      _this.setState({ columnset: columnset });
    };

    _this.setCellBlur = function (data) {
      if (_this._triggerRender) _this._triggerRender();
    };

    _this.select = function (indexes) {
      for (var i = 0; i < _this.dataList.length; i++) {
        _this.dataList[i]._selected = false;
      }
      for (var attr in indexes) {
        _this.dataList[indexes[attr]]._selected = true;
      }
      _this.selectIndex = indexes[0] * 1;
      _this.scrollRow = indexes[0];
      _this._triggerRender();
    };

    _this.unselect = function (indexes) {
      for (var attr in indexes) {
        _this.dataList[indexes[attr]]._selected = false;
      }
      _this._triggerRender();
    };

    _this.setActionState = function (data) {
      var actionState = _this.actionState;
      actionState[data.rowIndex][data.itemName][data.name] = data.value;
      _this._triggerRender();
    };

    _this.setActionsState = function (data) {
      _this.actionState = data;
      _this._triggerRender();
    };

    _this.setCellState = function (data) {
      var state = _this.cellState;
      if (state[data.rowIndex][data.cellName]) {
        if (state[data.rowIndex][data.cellName][data.propertyName] == data.value) return;
        state[data.rowIndex][data.cellName][data.propertyName] = data.value;
        _this._triggerRender();
      }
      //index cellName name value  oldvalue
    };

    _this.updateRow = function (data) {
      _this.dataList[data.index] = data.row;
      _this._triggerRender();
    };

    _this.insertRow = function (data) {
      _this.dataList.splice(data.index, 0, data.row);
      //设置新增行单元格初始状态
      _this._InitCellStatus(_this.columns, _this.dataList);
      _this.scrollRow = _this.dataList.length - 1;
      _this._triggerRender();
      _this.props.model.select(data.index);
    };

    _this.insertRows = function (data) {
      if (_this.dataList.length == 0) {
        _this.setDataSource(data.rows);
      } else {
        for (var i = 0; i < data.rows.length; i++) {
          _this.dataList.splice(data.index + i, 0, data.rows[i]);
        }
        _this._InitCellStatus(_this.columns, _this.dataList);
        _this._triggerRender();
        _this.props.model.select(data.index + data.rows.length - 1);
      }
    };

    _this.deleteRows = function (indexes) {
      // var pageinfo = this.state.pagination;
      // var index;

      // indexes = [];
      // indexes.push(this.selectIndex);
      // for (var i = indexes.length - 1; i >= 0; i--) {
      //     index = indexes[i];
      //     this.dataList.splice(index, 1);
      // }
      // let columnset = this.RemodelingColumn(this.dataList, this.columns);
      // this.selectIndex = -1;
      // if (this.props.model) {
      //     this.props.model.setDataSource(this.dataList);
      // }
      // this.setState({
      //     pagination: pageinfo,
      //     columnset
      // });
    };

    _this.ActionClick = function (e, action, index) {
      var viewModel = _this.props.model.getParent();
      while (viewModel.getParent()) {
        viewModel = viewModel.getParent();
      }var params = { index: index, cItemName: action.cItemName };
      viewModel.get(action.cItemName).fireEvent('click', params);
    };

    _this.validate = function (val) {
      if (val.type == 'error') {
        if (val.data) {
          var isColErro = _this.isColErro;
          isColErro.map(function (item) {
            for (var key in item) {
              item[key] = false;
            }
          });
          val.data.map(function (item) {
            if (isColErro[item.rowIndex][item.cellName] != undefined && isColErro[item.rowIndex][item.cellName] != 'undefined') isColErro[item.rowIndex][item.cellName] = true;
            // Message.error('表体存在必输项，请输入完整在尝试保存！');
            // cb.utils.alert('表体存在必输项，请输入完整在尝试保存！', 'error');
          });
          _this._triggerRender();
          cb.utils.alert('表体存在必输项，请输入完整再尝试保存！', 'error');
        } else {
          cb.utils.alert('表体数据为空！不允许保存！', 'error');
        }
      }
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

    _this._PaginChange = function (page) {
      if (_this.props.model) _this.props.model.setPageIndex(page);
    };

    _this.onShowSizeChange = function (current, size) {
      if (_this.props.model) _this.props.model.setPageSize(size);
    };

    _this.setPage = function (pagination, isPage) {
      if (isPage && pagination.total !== 0) {
        var sumData = _this.state.sumData;
        var columns = _this.columns;
        var showSums = [];
        if (sumData.length > 0) {
          for (var key in sumData[0]) {
            if (!columns[key]) continue;
            if (sumData[0][key] == 0) continue;
            showSums.push(_react2.default.createElement(
              _col2.default,
              { span: 1, style: { fontSize: '18px' } },
              columns[key].cCaption,
              '\uFF1A',
              sumData[0][key]
            ));
            if (showSums.length > 2) {
              break;
            }
          }
        }
        var selectOptions = [{ "value": 10, "text": 10 }, { "value": 20, "text": 20 }, { "value": 30, "text": 30 }, { "value": 40, "text": 40 }, { "value": 50, "text": 50 }];
        var selectOptionsControl = selectOptions.map(function (item, index) {
          return _react2.default.createElement(
            _antd.Select.Option,
            { key: item.value, text: item.text },
            item.text
          );
        });
        return _react2.default.createElement(
          'div',
          { className: 'pagination-new' },
          _react2.default.createElement(_antd.Pagination, { showQuickJumper: true, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '80', '100', '65536'], showTotal: function showTotal(total) {
              return '\u5171' + total + '\u6761';
            }, size: 'small', total: pagination.total, current: pagination.current, pageSize: pagination.pageSize, onShowSizeChange: _this.onShowSizeChange, onChange: _this._PaginChange })
        );
      }
    };

    _this._setFooter = function (cellProps) {
      var column = _this.columns;
      if (_this.GridProps.showAggregates || _this.GridProps.showAggregates == 'local') {
        if (_this.GridProps.showCheckBox) {
          if (cellProps.columnKey === 'CheckBox') {
            return _react2.default.createElement(
              'div',
              { className: 'fixedDataTable-footer-title' },
              _react2.default.createElement(
                'div',
                { className: 'public_fixedDataTableCell_cellContent' },
                ' \u5408\u8BA1'
              )
            );
          }
        } else if (_this.GridProps.showRowNo) {
          if (cellProps.columnKey === 'GridRowNo') {
            return _react2.default.createElement(
              'div',
              { className: 'fixedDataTable-footer-title' },
              _react2.default.createElement(
                'div',
                { className: 'public_fixedDataTableCell_cellContent' },
                ' \u5408\u8BA1'
              )
            );
          }
        } else if (_this.ColIndexs[cellProps.columnKey] === 0) {
          return _react2.default.createElement(
            'div',
            { className: 'fixedDataTable-footer-title' },
            _react2.default.createElement(
              'div',
              { className: 'public_fixedDataTableCell_cellContent' },
              ' \u5408\u8BA1'
            )
          );
        }
        if (cellProps.columnKey == 'Setting') {
          return _react2.default.createElement(
            'div',
            { className: 'fixedDataTable-footer-title' },
            _react2.default.createElement('div', { className: 'public_fixedDataTableCell_cellContent' })
          );
        }
        var sumData = _this.state.sumData;
        if (sumData.length > 0) {
          var data = _this.dataList;
          var sum = 0;
          for (var key in sumData[0]) {
            if (key === cellProps.columnKey) {
              sum = _this._getDecimal(_this.columns[key], sumData[0][key]);
              return _react2.default.createElement(
                _fixedDataTable.Cell,
                null,
                _react2.default.createElement(
                  'div',
                  { style: { "padding": "12px 10px", lineHeight: "14px" }, className: 'textCol' },
                  sum
                )
              );
            }
          }
        } else {
          if (_this.GridProps.showAggregates == 'local') {
            if (column[cellProps.columnKey].bNeedSum) {
              var _data = _this.dataList;
              var _sum = 0;
              if (_data.length > 0) {
                for (var i = 0; i < _data.length; i++) {
                  var val = _data[i][cellProps.columnKey];
                  val = val ? val : 0;
                  _sum = _sum + val;
                }
              }
              _sum = _this._getDecimal(_this.columns[cellProps.columnKey], _sum);
              return _react2.default.createElement(
                _fixedDataTable.Cell,
                null,
                _react2.default.createElement(
                  'div',
                  { style: { "padding": "12px 10px", lineHeight: "14px" }, className: 'textCol' },
                  _sum
                )
              );
            }
          } else {
            return _react2.default.createElement(
              _fixedDataTable.Cell,
              null,
              _react2.default.createElement('div', { style: { "padding": "12px 10px", lineHeight: "14px" }, className: 'textCol' })
            );
          }
        }
      } else if (_this.GridProps.showSubtotal) {
        if (cellProps.columnKey == 'Setting') {
          return _react2.default.createElement(
            'div',
            { className: 'fixedDataTable-footer-title' },
            _react2.default.createElement('div', { className: 'public_fixedDataTableCell_cellContent' })
          );
        }
        if (_this.GridProps.showCheckBox) {
          if (cellProps.columnKey === 'CheckBox') {
            return _react2.default.createElement(
              'div',
              { className: 'fixedDataTable-footer-title' },
              _react2.default.createElement(
                'div',
                { className: 'public_fixedDataTableCell_cellContent' },
                ' \u5C0F\u8BA1'
              )
            );
          }
        } else if (_this.GridProps.showRowNo) {
          if (cellProps.columnKey === 'GridRowNo') {
            return _react2.default.createElement(
              'div',
              { className: 'fixedDataTable-footer-title' },
              _react2.default.createElement(
                'div',
                { className: 'public_fixedDataTableCell_cellContent' },
                ' \u5C0F\u8BA1'
              )
            );
          }
        } else if (_this.ColIndexs[cellProps.columnKey] === 0) {
          return _react2.default.createElement(
            'div',
            { className: 'fixedDataTable-footer-title' },
            _react2.default.createElement(
              'div',
              { className: 'public_fixedDataTableCell_cellContent' },
              ' \u5C0F\u8BA1'
            )
          );
        }
        if (column[cellProps.columnKey].bNeedSum) {
          var _data2 = _this.dataList;
          var _sum2 = 0;
          if (_data2.length > 0) {
            for (var _i = 0; _i < _data2.length; _i++) {
              var _val = _data2[_i][cellProps.columnKey];
              _val = _val ? _val : 0;
              _sum2 = _sum2 + _val;
            }
          }
          return _react2.default.createElement(
            _fixedDataTable.Cell,
            null,
            _react2.default.createElement(
              'div',
              { style: { "padding": "12px 10px", lineHeight: "14px" }, className: 'textCol' },
              _sum2
            )
          );
        }
      }
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
      if (_this.showRows + hideRows - 1 == rowCount || _this.bodyHeight + scrolly == rowCount * _this.rowheight) {
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
      var text = _this.state.showSearch ? '搜索无结果' : '暂时没有数据哦~';
      var icon = _this.props.emptyIcon || 'nodata';
      return _react2.default.createElement(
        'div',
        { className: 'table-nodata' },
        _react2.default.createElement(_SvgIcon2.default, { type: icon }),
        text
      );
    };

    _this.getStringLength = function (str) {
      if (!str) str = '';
      var realLength = 0,
          len = str.length,
          charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
          realLength += 1;
        } else {
          realLength += 2;
        }
      }
      return realLength;
    };

    _this.state = {
      readOnly: true, //是否只读
      visible: false,
      pagination: { total: 0, current: 0, pageSize: 0 },
      sumData: [], //合计数据
      style: props.style,
      gridWidth: props.width || 1100
    };
    // showCheckBox 是否显示选择框  showRowNo 是否显示行号
    //是否单选 isPagination 是否分页
    _this.GridProps = {
      showRowNo: true,
      showCheckBox: false,
      isPagination: false
    };
    _this.selectAll = false;
    _this.dataList = []; /*grid数据*/
    _this.columns = {}; /*grid栏目数据*/
    _this.ColIndexs = {}; /*key与number对照*/
    _this.selectIndex = -1; /*选择行index*/
    _this.scrollCol = null;
    _this.scrollRow = 0;
    _this.headerHeight = 46;
    _this.actionState = [];
    _this.CellState = []; /*单元格状态 disabled readnonly style*/
    _this.isColErro = [];
    _this.action = {}; /*操作列渲染数据*/
    _this.actionStyle = {};
    _this.RowCol = {}; /*记录RowColChange改变前数据*/
    _this.renderIndex = 1;
    _this.rowheight = props.rowHeight || 56;
    _this.showRows = 0;
    _this.__isElectronic = false;
    _this.bodyHeight = 0;
    return _this;
  }

  _createClass(TableTouch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (window.__isElectronic) {
        this.__isElectronic = true;
        if (this.props.rowHeight) this.rowheight = this.props.rowHeight;else this.rowheight = 46;
        this.headerHeight = 40;
      }

      if (this.props.model) {
        this.props.model.addListener(this);
        /*表格高度*/
        var scrollXWidth = this.totalWidth > (this.props.width || 1100) ? 17 : 2;
        var height = this.props.height ? this.props.height : 1020;
        var bodyHeight = height - this.headerHeight - scrollXWidth;
        var pageIndex = Math.ceil(bodyHeight / this.rowheight / 10);
        if (this.__isElectronic && this.props.tableMode == 'refer') {
          this.showRows = Math.ceil(bodyHeight / this.rowheight);
          this.props.model.setPageSize(10);
        } else {
          this.showRows = Math.ceil(bodyHeight / this.rowheight);
          // Math.floor(bodyHeight / this.rowheight)
          var pageSize = pageIndex * 10;
          this.props.model.setPageSize(pageSize);
        }
      }
      var clientWidth = document.documentElement.clientWidth;
      if (clientWidth <= 1024 && clientWidth == this.state.gridWidth) {
        this.setState({ gridWidth: this.state.gridWidth - 20 });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.height != nextProps.height) {
        if (nextProps.model && this.__isElectronic && this.props.tableMode == 'refer') {
          var scrollXWidth = this.totalWidth > (this.props.width || 1100) ? 17 : 2;
          var height = nextProps.height ? nextProps.height : 1020;
          this.bodyHeight = height - this.headerHeight - scrollXWidth;
        }
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

    //监听全选


    //行单击事件


    //单元格数据改变事件

    //-------------------------------------------------------------------viewmodel返调用方法------------------------------------------------------------------------------

    //model调用  set action列状态

  }, {
    key: 'setReadOnly',
    value: function setReadOnly(value) {
      this.readOnly = value;
      this.setState({ readOnly: value });
    }
    //model调用  set单元格状态

    //--------------------------------------------------------------------------grid按钮事件------------------------------------------------------------------------------------------------
    //更新行


    //增行

    //批量增行/插行

    //删行

    //---------------------------------------------------------------------------------分页相关-----------------------------------------------------------------------------------
    //设置分页

    //分页改变事件

    /*页大小改变*/

    // onRowTouchEnd=(e,isEnd)=>{
    //     if (isEnd == 1) {
    //         let pagination = this.state.pagination;
    //         let newSize = pagination.current + 1;
    //         let pageCount = pagination.total/pagination.pageSize;
    //         pageCount = Math.ceil(pageCount);
    //         if (newSize > pageCount) return;
    //         if (this.props.model)
    //             this.props.model.setPageIndex(pagination.current + 1);
    //     }
    // }

  }, {
    key: 'render',
    value: function render() {
      // let pagination = this.setPage(this.state.pagination, this.GridProps.isPagination);
      var visible = this.state.visible;

      var style = this.state.style || {};
      var gridHeight = this.props.height || 600;
      // let gridWidth = this.props.width || 1100;
      if (this.dataList.length == 0 && !this.props.height) gridHeight = 200;

      var footerHeight = this.props.footerHeight || 0;
      /*交班--根据传入rowcount  动态渲染高度*/
      var calcHeightByRowCount = this.state.calcHeightByRowCount;
      if (calcHeightByRowCount) {
        gridHeight = this.rowheight * calcHeightByRowCount + (this.headerHeight || 40) + footerHeight + 8;
        if (gridHeight < 200) gridHeight = 200;
      }

      if (style.rowheight) this.rowheight = parseFloat(style.rowheight);
      if (visible) gridClassName = 'hide';
      if (this.GridProps.showAggregates == 'local' && this.state.sumData.length > 0) footerHeight += this.rowheight;
      if (this.GridProps.showSubtotal) footerHeight += this.rowheight;
      if (this.dataList.length == 0) footerHeight = 0;
      // if (this.GridProps.showAggregates != 'local' && this.state.sumData.length == 0)
      //   footerHeight = 0;
      var emptyData = this.getEmptyData();
      return _react2.default.createElement(
        'div',
        { className: 'touch-grid' },
        _react2.default.createElement(
          _row2.default,
          null,
          _react2.default.createElement(
            _fixedDataTable.Table,
            {
              rowHeight: this.rowheight,
              overflowY: 'auto',
              overflowX: 'auto',
              onScrollEnd: this.onScrollEnd
              // onRowTouchEnd={this.onRowTouchEnd}
              , footerHeight: footerHeight,
              onRowTouchMove: this.onRowTouchMove,
              headerHeight: this.headerHeight || 40,
              rowsCount: this.dataList.length,
              width: this.state.gridWidth,
              height: gridHeight,
              isColumnResizing: false,
              onRowClick: this._onRowClick,
              rowClassNameGetter: this.rowClassNameGetter,
              scrollToRow: this.scrollRow,
              scrollToColumn: this.scrollCol,
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