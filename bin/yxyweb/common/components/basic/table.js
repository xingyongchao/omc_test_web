'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fixedDataTable = require('fixed-data-table-2');

var _antd = require('antd');

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

var _GridFilterModel = require('../grid/GridFilterModel');

var _GridFilterModel2 = _interopRequireDefault(_GridFilterModel);

var _CellModel = require('../grid/CellModel');

var _CellModel2 = _interopRequireDefault(_CellModel);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _util = require('../../helpers/util');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _popover = require('../../../../common/components/popover');

var PopoverMap = _interopRequireWildcard(_popover);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ** 2016-11-21 zhangmyh
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 添加componentWillReceiveProps和componentDidUpdate事件处理，在viewmodel更新时，更新viewmodel监听
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 这样改动主要为了在设置表格标题之后，刷新表格内容，并重新关联viewmodel，使columnSetting按钮可用
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FixedDataTableControl = function (_React$Component) {
  _inherits(FixedDataTableControl, _React$Component);

  function FixedDataTableControl(props) {
    _classCallCheck(this, FixedDataTableControl);

    var _this = _possibleConstructorReturn(this, (FixedDataTableControl.__proto__ || Object.getPrototypeOf(FixedDataTableControl)).call(this, props));

    _this.rowClassNameGetter = function (index) {
      if (_this.rowStatus[index] && _this.rowStatus[index].disabled && _this.rowStatus[index].disabled != undefined) {
        return 'public_fixedDataTableRow_disabled';
      }
      if (_this.rowStatus[index] && _this.rowStatus[index].className && _this.rowStatus[index].disabled != undefined) {
        return 'public_fixedDataTableRow_' + _this.rowStatus[index].className;
      }

      /*add by jinzh1 查找功能row*/
      var lookUpRowIndexes = _this.lookUpRowIndexes;
      if (lookUpRowIndexes.length > 0) {
        var className = '';
        for (var i = 0; i < lookUpRowIndexes.length; i++) {
          if (index == lookUpRowIndexes[i]) {
            className = 'public_fixedDataTableRow_LookUpRow';
            break;
          }
        }
        for (var _i = 0; _i < lookUpRowIndexes.length; _i++) {
          if (index == _this.lookUpRow) {
            className = className + ' public_fixedDataTableRow_LookUpRow_Focused';
            break;
          }
        }
        if (className != '') return className;
      }

      // if (this.props.model && !this.GridProps.showCheckBox && !this.state.readOnly) {
      if (_this.props.model) {
        var selectRows = _this.props.model.getSelectedRowIndexes();
        for (var _i2 = 0; _i2 < selectRows.length; _i2++) {
          var rowIndex = selectRows[_i2];
          if (index === rowIndex) return 'public_fixedDataTableRow_CheckedRow';
        }
      }
      if (!_this.isExpanded) {
        if (index === _this.selectIndex) return 'public_fixedDataTableRow_selected';
        return;
      }
      if (index % 2 === 1) return 'public_fixedDataTableRow_expanded';
      if (index === _this.selectIndex) return 'public_fixedDataTableRow_selected';
    };

    _this._DocumentMouseDown = function (e) {
      var p1 = cb.dom(event.target).parents('.columnSetting');
      var p2 = cb.dom(event.target).parents('.ant-popover');
      if (p1.length == 0 && p2.length == 0 && _this.state.popFlag) {
        _this.setState({
          popFlag: false
        });
      }
    };

    _this._handleKeyDown = function (e) {
      var self = _this;
      switch (e.keyCode) {
        case 13:
          //回车
          self.switchCell();
      }
    };

    _this.switchCell = function () {
      if (_this.state.readOnly) return; //只读状态
      if (_this.selectIndex == -1) return; //未选中行
      var Status = _this.CellStatus; //单元格编辑状态
      var nowRowIndex = 0;
      var selectRowIndexes = _this.props.model.getSelectedRowIndexes();
      if (!selectRowIndexes || selectRowIndexes.length > 1) return;
      nowRowIndex = selectRowIndexes[0];
      var data = { rowIndex: nowRowIndex, cellName: '' };
      Status.map(function (item) {
        for (var items in item) {
          if (items != 'GridRowNo') {
            if (item[items]) data.cellName = items;
          }
        }
      });
      _this.setCellEnter(data);
    };

    _this.setListenerState = function (params) {
      if (params.columnMode === 'local' && _this.props.columns) {
        var columns = {};
        for (var attr in _this.props.columns) {
          var modelColumn = params.columns[attr];
          if (!modelColumn) continue;
          var viewColumn = _this.props.columns[attr];
          modelColumn.index = viewColumn.index;
          modelColumn.enterDirection = viewColumn.enterDirection;
          modelColumn.relatedActions = viewColumn.relatedActions;
          var column = {};
          Object.assign(column, viewColumn, modelColumn);
          columns[attr] = column;
        }
        params.columns = columns;
      }
      if (_this.props.widthMode == 'percent') {
        var tableWidth = _this.props.width || 1100;
        for (var key in params.columns) {
          var iColWidth = parseFloat(params.columns[key].iColWidth);
          var width = isNaN(iColWidth) ? 25 : iColWidth;
          width = tableWidth * width / 100;
          params.columns[key].iColWidth = width;
        }
      }

      var tmp_ColIndexs = {};
      var index = 0;

      /*cellState*/
      if (params.cellState) {
        _this.cellState = params.cellState;
      }

      //栏目col与index对照
      var hasColumn = false;
      for (var attr in params.columns) {
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
      _this.colsWidth = _this.computeColsWidth(params.columns);
      _this.GridProps.showCheckBox = params.showCheckBox; //是否显示选择列
      _this.GridProps.showRowNo = params.showRowNo; //是否显示行号
      _this.GridProps.showAggregates = params.showAggregates; //是否显示合计
      _this.GridProps.showSubtotal = params.showSubtotal; //是否显示小计
      _this.GridProps.isRadio = !params.multiple; //是否单选
      _this.GridProps.isPagination = params.pagination; //是否分页
      _this.GridProps.showColumnSetting = params.showColumnSetting; //是否显示栏目设置
      _this.GridProps.multiSort = params.multiSort; //是否显示表头排序
      _this.ColIndexs = tmp_ColIndexs; //栏目与index对照

      if (hasColumn) {
        _this.columns = params.columns;
        if (params.rows && params.rows.length > 0) _this.dataList = params.rows;
        //初始化单元格状态
        _this._InitCellStatus(params.columns, params.rows, params.mergeCells);
        _this.readOnly = params.readOnly;
        var columnset = _this.RemodelingColumn(params.rows, params.columns);
        _this.setState({
          readOnly: params.readOnly,
          columnset: columnset,
          showColumnSetting: params.showColumnSetting,
          mergeCells: params.mergeCells,
          columnMode: params.columnMode
        });
      }
    };

    _this._InitCellStatus = function (Columns, DataSource, mergeCells) {
      var self = _this;
      /*初始化action列的渲染数据*/
      var action = _this.props.action;
      if (action && action.cControlType && action.cControlType == 'Toolbar') {
        self.action = action;
        self.hasAction = true;
        var cStyle = action.cStyle;
        try {
          if (!cStyle || cStyle == '') {
            cStyle = {};
          } else {
            cStyle = JSON.parse(cStyle);
          }
        } catch (e) {
          cb.utils.alert('Toolbar cStyle，预制错误！', 'error');
        }
        _this.fixedwidth = cStyle.fixedwidth;
      }
      // let containers = this.state.containers ? this.state.containers : [];
      var PopMeta = {};
      // containers.map(function (key) {
      //   if (key.cControlType == 'Toolbar') {/*操作列元数据*/
      //     self.action = key;
      //     self.hasAction = true;
      //   }
      //   if (key.cControlType == 'Pop') {/*组合控件元数据*/
      //     PopMeta[key.cGroupCode] = key;
      //   }
      // });
      if (DataSource !== undefined) {
        var attr;

        var _ret = function () {
          //设置初始单元格编辑状态/行选择初始状态/action状态/单元格状态 disabled/readOnly/style
          var temp_cellState = cb.utils.extend(true, [], _this.cellState);
          var temp_isColErro = cb.utils.extend(true, [], _this.isColErro);
          var temp_CellStatus = cb.utils.extend(true, [], _this.CellStatus);
          var temp_rowStatus = cb.utils.extend(true, [], _this.rowStatus);
          var temp_actionState = cb.utils.extend(true, {}, _this.actionState);
          var temp_CompositeLayout = cb.utils.extend(true, [], _this.CompositeLayout); //组合控件布局
          var temp_compositeControl = cb.utils.extend(true, [], _this.compositeControl); //组合控件元数据
          var length = DataSource.length;
          if (length <= 0) return {
              v: void 0
            };
          for (var i = 0; i < length; i++) {
            if (!temp_CellStatus[i]) temp_CellStatus[i] = {};
            DataSource[i]._selected = false;
            if (!temp_rowStatus[i]) temp_rowStatus[i] = { disabled: false, visible: false };
            if (_this.action && _this.action.controls) {
              (function () {
                var actionList = _this.action.controls;
                var _id = DataSource[i]._id;
                if (!temp_actionState[_id]) temp_actionState[_id] = {};
                actionList.map(function (action) {
                  if (!temp_actionState[_id][action.cItemName]) temp_actionState[_id][action.cItemName] = { disabled: false, visible: true };
                });
              })();
            }
            if (!temp_cellState[i]) temp_cellState[i] = {};
            if (!temp_isColErro[i]) temp_isColErro[i] = {};
            if (!temp_CompositeLayout[i]) temp_CompositeLayout[i] = {};
            if (!temp_compositeControl[i]) temp_compositeControl[i] = {};
            for (attr in Columns) {
              if (attr === 'CheckBox' || attr === 'GridRowNo') {
                temp_CellStatus[i][attr] = true;
              } else {
                if (!temp_CellStatus[i][attr]) temp_CellStatus[i][attr] = false;
                if (!temp_cellState[i][attr]) temp_cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {}, className: "" };
                if (!temp_isColErro[i][attr]) temp_isColErro[i][attr] = false;
                if (Columns[attr].cControlType == 'composite') {
                  temp_CompositeLayout[i][attr] = Columns[attr].cRefRetId;
                  temp_compositeControl[i][attr] = PopMeta[attr];
                }
              }
            }
          }
          if (temp_actionState) _this.actionState = temp_actionState;
          _this.CellStatus = temp_CellStatus;
          _this.rowStatus = temp_rowStatus;
          _this.cellState = temp_cellState;
          _this.isColErro = temp_isColErro;
          _this.CompositeLayout = temp_CompositeLayout;
          _this.compositeControl = temp_compositeControl;
          /*合并列 对照*/
          if (mergeCells || _this.state.mergeCells) _this.initMergeColContrast(DataSource, Columns);
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    };

    _this.setColumns = function (columndata) {
      /*add by jinzh1 解决view与viewModel栏目顺序不一致 导致view显示与栏目设置不一致问题*/
      if (_this.state.columnMode === 'local' && _this.props.columns) {
        var columns = {};
        for (var attr in _this.props.columns) {
          var modelColumn = columndata[attr];
          if (!modelColumn) continue;
          var viewColumn = _this.props.columns[attr];
          modelColumn.index = viewColumn.index;
          modelColumn.enterDirection = viewColumn.enterDirection;
          modelColumn.relatedActions = viewColumn.relatedActions;
          var column = {};
          Object.assign(column, viewColumn, modelColumn);
          columns[attr] = column;
        }
        columndata = columns;
      }

      var tmp_ColIndexs = {},
          index = 0,
          hasSpecialCol = false,
          specialCols = [];
      if (_this.props.widthMode == 'percent') {
        var tableWidth = _this.props.width || 1100;
        for (var key in columndata) {
          var iColWidth = parseFloat(columndata[key].iColWidth);
          var width = isNaN(iColWidth) ? 25 : iColWidth;
          width = tableWidth * width / 100;
          columndata[key].iColWidth = width;
        }
      } else {
        for (var key in columndata) {
          if (columndata[key].cControlType == 'specialcom' && hasSpecialCol == false) {
            hasSpecialCol = true;
            specialCols.push(key);
          }
          if (index === 0) {
            tmp_ColIndexs[key] = 0;
          } else {
            tmp_ColIndexs[key] = index;
          }
          index = index + 1;
        }
      }
      _this.hasSpecialCol = hasSpecialCol;
      _this.specialCols = specialCols;
      _this.colsWidth = _this.computeColsWidth(columndata);
      _this.ColIndexs = tmp_ColIndexs;
      _this.groupHeaderHeight = 0;
      _this._InitCellStatus(columndata, _this.dataList);
      var columnset = _this.RemodelingColumn(_this.dataList, columndata);
      _this.columns = columndata;
      if (_this.props.tableTyep == 'rptTable') {
        var showAggregates = false;
        for (var key in columndata) {
          if (columndata[key].bNeedSum) {
            showAggregates = true;
            break;
          }
        }
        _this.GridProps.showAggregates = showAggregates;
      }
      _this.setState({ columnset: columnset });
    };

    _this.computeColsWidth = function (columns) {
      var colsWidth = 0;
      for (var key in columns) {
        var iColWidth = parseFloat(columns[key].iColWidth || 150);
        colsWidth += iColWidth;
      }
      return colsWidth;
    };

    _this.initMergeColContrast = function (dataSource, columns) {
      var mergeColContrast = {};
      for (var key in columns) {
        mergeColContrast[key] = [];
        dataSource.map(function (row) {
          mergeColContrast[key].push(0);
        });
      }
      _this.mergeColContrast = mergeColContrast;
    };

    _this.setMergeColContrast = function (mergeColContrast) {
      _this.mergeColContrast = mergeColContrast;
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
      _this.allSelect = false;
      _this.indeterminate = false;
      //初始化单元格状态
      _this._InitCellStatus(_this.columns, data);
      var columnset = _this.RemodelingColumn(data, _this.columns);
      _this.setState({ columnset: columnset });

      var selectRows = _this.props.model.getSelectedRowIndexes();
      if (selectRows[0]) {
        _this.scrollRow = selectRows[0];
      } else {
        _this.scrollRow = 0;
        _this.scrollEndHeight = 0;
        _this.nowSetDataSource = true;
      }
    };

    _this.RemodelingColumn = function (dataList, columnState) {
      var self = _this,
          ret = [],
          columnData = [],
          actionAlign = '',
          Operation = {};

      var isGroup = false; /*是否多表头*/
      for (var attr in columnState) {
        if (columnState[attr].parent) {
          isGroup = true;
          break;
        }
      }
      if (isGroup) return _this.RemodelingGroupColumn(dataList, columnState);

      var readOnly = _this.readOnly;
      /*操作列*/
      if (readOnly === false && _this.action.controls) {
        columnState.Operation = { 'cItemName': 'Operation', 'iColWidth': 64, 'cControlType': 'Action' };
        if (_this.fixedwidth) columnState.Operation.iColWidth = _this.fixedwidth;
        columnData.push(columnState.Operation);
      }
      /*选择列*/
      // if (this.GridProps.showCheckBox && this.props.tableTyep != 'rptTable') {
      if (_this.GridProps.showCheckBox) {
        if (!columnState.CheckBox) columnState.CheckBox = { 'cItemName': 'CheckBox', 'iColWidth': 45, 'cControlType': 'SelectCheckBox' };
        columnData.push(columnState.CheckBox);
      }
      /*行号*/
      if (_this.GridProps.showRowNo) {
        if (!columnState.GridRowNo) columnState.GridRowNo = { 'cItemName': 'GridRowNo', 'iColWidth': 40, 'cControlType': 'Input' };
        columnData.push(columnState.GridRowNo);
      }
      // /*固定左位置的操作列*/
      // if (actionAlign == 'left') {
      //   columnState.Operation = Operation;
      //   columnData.push(columnState.Operation);
      // }
      for (var attr in columnState) {
        if (attr != 'CheckBox' && attr != 'GridRowNo' && attr != 'Operation') columnData.push(columnState[attr]);
      }
      // /*右位置的操作列*/
      // if (actionAlign == 'right') {
      //   Operation.bFixed = 0;
      //   columnState.Operation = Operation;
      //   columnData.push(columnState.Operation);
      // }
      // if (this.props.widthMode == 'percent') {
      //   let tableWidth = this.props.width || 1100;

      //   this.totalWidth = 0;
      //   columnData.map(function (col) {
      //     let column = self.setColumn(col.cItemName, col);
      //     let iColWidth = parseFloat(col.iColWidth);
      //     let width = isNaN(iColWidth) ? 25 : iColWidth;
      //     width = tableWidth * width / 100;
      //     col.iColWidth = width;
      //     this.totalWidth += width;
      //     ret.push(column);
      //   }, this);
      //   return ret;
      // } else {
      _this.totalWidth = 0;
      columnData.map(function (col) {
        var column = self.setColumn(col.cItemName, col);
        var iColWidth = parseFloat(col.iColWidth);
        var width = isNaN(iColWidth) ? 150 : iColWidth;
        this.totalWidth += width;
        ret.push(column);
      }, _this);
      return ret;
      // }
    };

    _this.RemodelingGroupColumn = function (dataList, columnState) {

      /*行号*/
      // columnState.GridRowNo = { 'cFieldName': 'GridRowNo', 'cItemName': 'GridRowNo', 'iColWidth': 30, 'cControlType': 'Input' };

      var cols = {};
      var columns = cb.utils.extend(true, {}, columnState);
      _this.totalWidth = 0;
      for (var key in columns) {
        var item = columns[key]; //栏目属性对象
        item.iColWidth = item.iColWidth ? parseFloat(item.iColWidth) : 150;
        if (!item.parent) {
          cols[item.cItemName] = item;
        } else {
          _this.loopColumn(item.parent, cols, item);
        }
        _this.totalWidth += item.iColWidth;
      }
      return _this.restructureColumn(dataList, cols);
    };

    _this.restructureColumn = function (dataList, columns) {
      var col = [];
      for (var key in columns) {
        var item = columns[key]; //栏目属性对象
        if (item.children) {
          var children = _this.loopChildren(item);
          var header = _this.getGroupHeader(item);
          col.push(_react2.default.createElement(
            _fixedDataTable.ColumnGroup,
            { key: item.cFieldName, header: header },
            children
          ));
        } else {
          var column = _this.setColumn(item.cItemName, item);
          col.push(_react2.default.createElement(
            _fixedDataTable.ColumnGroup,
            { key: item.cFieldName, header: _react2.default.createElement(
                _fixedDataTable.Cell,
                null,
                _react2.default.createElement('div', { className: 'headerName', style: { "height": _this.headerHeight } })
              ) },
            column
          ));
        }
      }
      return col;
    };

    _this.getGroupHeader = function (item) {
      var header = [];
      header.push(_react2.default.createElement(
        _row2.default,
        { className: 'group-row', style: { "height": 40 } },
        _react2.default.createElement(
          'div',
          { className: 'group-col', style: { "height": 40 } },
          item.cShowCaption
        )
      ));
      var headerRow = _this.getHeaderRow(item.children);
      if (headerRow.length > 0) {
        var i = 1;
        headerRow.map(function (row) {
          header.push(_react2.default.createElement(
            _row2.default,
            { className: 'group-row', style: { "height": 40 } },
            row
          ));
          i += 1;
        });
        _this.groupHeaderHeight = i * 40;
      } else {
        _this.groupHeaderHeight = 40;
      }
      var rowWidth = _this.getGroupHeaderWidth(item.children);
      return _react2.default.createElement(
        'div',
        { className: 'table-group-header', style: { "width": rowWidth } },
        header
      );
    };

    _this.getHeaderRow = function (children) {
      var headerRows = [],
          headerRow = [];
      children.map(function (col) {
        if (col.children) {
          var width = _this.getGroupHeaderWidth(col.children);
          col.iColWidth = width;
          headerRow.push(_react2.default.createElement(
            'div',
            { className: 'group-col', style: { "height": 40, "width": width } },
            col.cShowCaption
          ));
          if (col.children[0].children) {
            var newRow = _this.getHeaderRow(col.children);
            headerRows[headerRows.length] = newRow;
          }
        }
      });
      if (headerRow.length > 0) headerRows[headerRows.length] = headerRow;
      return headerRows;
    };

    _this.getGroupHeaderWidth = function (item) {
      var width = 0;
      item.map(function (col) {
        var w = _this.loopHeader(col, width);
        width += w;
      });
      return width;
    };

    _this.loopHeader = function (item) {
      var children = item.children;
      var width = 0;
      if (children) {
        children.map(function (col) {
          if (col.iColWidth) {
            width += col.iColWidth;
          } else {
            width += _this.loopHeader(col);
          }
        });
      } else {
        width = item.iColWidth ? item.iColWidth : 150;
      }
      return width;
    };

    _this.loopChildren = function (item) {
      var col = [];
      item.children.forEach(function (ele) {
        if (ele.children) {
          var children = this.loopChildren(ele);
          col = col.concat(children);
        } else {
          var column = this.setColumn(ele.cItemName, ele);
          col.push(column);
        }
      }, _this);

      return col;
    };

    _this.loopColumn = function (data, cols, item, child) {
      if (!data.parent) {
        if (!cols[data.cFieldName]) {
          cols[data.cFieldName] = data;
          cols[data.cFieldName].children = [];
        }
        if (child && child.parent) delete child.parent;
        var colsChild = cols[data.cFieldName].children;
        var existChild = false,
            existIndex = 0;
        colsChild.forEach(function (ele, index) {
          if (ele.cFieldName == item.cFieldName) {
            existIndex = index;
            existChild = true;
          }
        }, _this);

        if (existChild) {
          cols[data.cFieldName].children[existIndex].children.push(child);
        } else {
          if (child) {
            item.children = [child];
          }
          if (item.parent) delete item.parent;
          cols[data.cFieldName].children.push(item);
        }
      } else {
        _this.loopColumn(data.parent, cols, data, item);
      }
    };

    _this.setColumn = function (attr, col) {
      var controlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
      var iColWidth = parseFloat(col.iColWidth);
      var width = isNaN(iColWidth) ? 150 : iColWidth;
      var name = col.cShowCaption;
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
      if (attr === 'CheckBox') {
        if (!_this.GridProps.isRadio) {
          var model = _this.props.model.getEditRowModel().get(attr);
          headerCell = _react2.default.createElement(
            _fixedDataTable.Cell,
            null,
            _react2.default.createElement(
              'div',
              { className: 'checkboxHD' },
              _react2.default.createElement(_antd.Checkbox, { indeterminate: _this.indeterminate, checked: _this.allSelect, onChange: function onChange(e, i) {
                  return _this.SelectChange(e, -1);
                } })
            )
          );
        }
        fiexd = true, align = 'center';
      } else if (attr === 'GridRowNo') {
        fiexd = true, align = 'center';
        headerCell = _react2.default.createElement(
          _fixedDataTable.Cell,
          null,
          _react2.default.createElement('div', { className: 'headerName line-number', style: { "height": _this.headerHeight } })
        );
      } else if (attr === 'Operation') {
        headerCell = _react2.default.createElement(
          _fixedDataTable.Cell,
          null,
          _react2.default.createElement('div', { className: 'headerName', style: { "height": _this.headerHeight } })
        );
        return _react2.default.createElement(_fixedDataTable.Column, { key: attr,
          allowCellsRecycling: true, columnKey: attr, isResizable: true,
          header: headerCell, cell: function cell(rowIndex) {
            return _this.setCell(rowIndex, col);
          },
          width: width, align: 'center', fixedRight: true, footer: _this._setFooter });
      } else if (controlType == 'vouchermoney') {
        /*凭证 金额*/
        width = 175, align = 'left', _this.headerHeight = 60;
        headerCell = _react2.default.createElement(
          _fixedDataTable.Cell,
          null,
          _react2.default.createElement(
            _row2.default,
            { className: "CredentialsHeader" },
            _react2.default.createElement(
              'ul',
              { className: "CredentialsTitle" },
              name
            ),
            _react2.default.createElement(
              'ul',
              { className: "CredentialsMoney" },
              _react2.default.createElement(
                'li',
                { className: "firstCol" },
                '\u4EBF'
              ),
              _react2.default.createElement(
                'li',
                null,
                '\u5343'
              ),
              _react2.default.createElement(
                'li',
                null,
                '\u767E'
              ),
              _react2.default.createElement(
                'li',
                { className: "lineBlue" },
                '\u5341'
              ),
              _react2.default.createElement(
                'li',
                null,
                '\u4E07'
              ),
              _react2.default.createElement(
                'li',
                null,
                '\u5343'
              ),
              _react2.default.createElement(
                'li',
                { className: "lineBlue" },
                '\u767E'
              ),
              _react2.default.createElement(
                'li',
                null,
                '\u5341'
              ),
              _react2.default.createElement(
                'li',
                null,
                '\u5143'
              ),
              _react2.default.createElement(
                'li',
                { className: "lineRed" },
                '\u89D2'
              ),
              _react2.default.createElement(
                'li',
                null,
                '\u5206'
              )
            )
          )
        );
      } else {
        if (!col.bCanModify && !_this.readOnly) {
          headerClassName = 'public_fixedDataTableCell_disabled';
        } else {
          headerClassName = 'headerName';
        }
        var fixedtable = _this.refs.fixedtable;
        headerCell = _react2.default.createElement(
          _fixedDataTable.Cell,
          { className: headerClassName },
          _react2.default.createElement(_GridFilterModel2.default, { fixedtable: fixedtable, multiSort: _this.GridProps.multiSort, tableClass: _this.props.tableClass, readOnly: _this.readOnly, Column: col, name: name, model: _this.props.model, width: width, attr: attr, data: _this.dataList,
            onSortChange: _this.onSortChange, sortColumn: _this.sortColumn, lookUpRow: _this.lookUpRow,
            moveLookUpRow: _this.moveLookUpRow, lookUpKey: _this.lookUpKey
          })
        );
      }
      return _react2.default.createElement(_fixedDataTable.Column, { key: attr
        // isReorderable={true}
        , allowCellsRecycling: true, columnKey: attr, isResizable: true,
        header: headerCell, cell: function cell(rowIndex) {
          return _this.setCell(rowIndex, col);
        },
        width: width, align: align, fixed: fiexd, footer: _this._setFooter });
      // footer={this._setFooter}
    };

    _this.moveLookUpRow = function (lookUpRowIndexes, lookUpRow, key) {
      if (lookUpRow > -1) _this.scrollRow = lookUpRow;
      _this.lookUpRowIndexes = lookUpRowIndexes;
      _this.lookUpRow = lookUpRow;
      _this.lookUpKey = key;
      _this._triggerRender();
    };

    _this.onSortChange = function (key) {
      _this.sortColumn = key;
    };

    _this.setCell = function (rowIndex, col) {
      var _React$createElement;

      var isColErro = _this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] ? _this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] : false;
      if (_this.state.style && _this.state.style.height) {
        _this.rowheight = _this.state.style.height;
      }
      return _react2.default.createElement(_CellModel2.default, (_React$createElement = {
        dataList: _this.dataList, readOnly: _this.readOnly, selectIndex: _this.selectIndex, rowStatus: _this.rowStatus, CellStatus: _this.CellStatus, RowProperty: rowIndex, selectAllState: _this._selectAllState, ColIndexs: _this.ColIndexs, mergeColContrast: _this.mergeColContrast,
        action: _this.action, actionState: _this.actionState, selectAll: _this.allSelect, indeterminate: _this.indeterminate, cellState: _this.cellState, isColErro: isColErro, Column: col, model: _this.props.model, GridProps: _this.GridProps, onCellClick: _this._onCellClick, triggerRender: _this._triggerRender, columnsList: _this.columns, CompositeLayout: _this.CompositeLayout, rowHeight: _this.props.rowHeight || 50, compositeControl: _this.compositeControl, setCellBlur: _this.setCellBlur,
        setMergeColContrast: _this.setMergeColContrast, mergeCells: _this.state.mergeCells, showAction: _this.state.showAction[rowIndex.rowIndex]
      }, _defineProperty(_React$createElement, 'rowHeight', _this.rowheight), _defineProperty(_React$createElement, 'showActionIndex', _this.showActionIndex), _defineProperty(_React$createElement, 'ActionClick', _this.ActionClick), _React$createElement));
    };

    _this._triggerRender = function () {
      var columnset = _this.RemodelingColumn(_this.dataList, _this.columns);
      _this.setState({ columnset: columnset });
    };

    _this._selectAllState = function (selectAll, indeterminate) {
      _this.allSelect = selectAll;
      _this.indeterminate = indeterminate;
      _this._triggerRender();
    };

    _this.SelectChange = function (e, index) {
      if (!e.target.checked) {
        _this.props.model.unselectAll();
      } else {
        _this.props.model.selectAll();
      }
    };

    _this._onColumnResizeEndCallback = function (newColumnWidth, columnKey) {
      // if (newColumnWidth < 40) return
      if (!_this.columns[columnKey]) return;
      _this.columns[columnKey].iColWidth = newColumnWidth;
      var columnset = _this.RemodelingColumn(_this.dataList, _this.columns);
      _this.setState({ columnset: columnset });
    };

    _this._onRowClick = function (e, index) {
      if (_this.dataList.length == 0 || !_this.dataList[index]) return;
      if (!_this.GridProps.showCheckBox) _this.props.model.select(index);
      _this.props.model.setFocusedRowIndex(index);
    };

    _this._onCellClick = function (e, index, columnKey) {
      _this._isRowColChange({ rowIndex: index, columnKey: columnKey, column: _this.columns[columnKey] }, function () {
        var ColIndex = _this.ColIndexs[columnKey];
        var data = { index: index, columnKey: columnKey };
        if (!_this.props.model.execute('onEdit', data)) return;
        var column = _this.columns[columnKey];
        if (column.cControlType == 'switchlabel') {
          _this.props.model.setFocusedRowIndex(index);
        }
        if (_this.CellStatus[index] !== undefined) {
          _this.CellStatus[index][columnKey] = true;
          _this.scrollCol = ColIndex + 2;
          _this._triggerRender();
        }
      });
    };

    _this._isRowColChange = function (value, callback) {
      var oldValue = _this.RowCol;
      if (oldValue.rowIndex != value.rowIndex || oldValue.columnKey != value.columnKey) {
        _this.props.model.promiseExecute('rowColChange', { value: value, oldValue: oldValue }, function () {
          oldValue.rowIndex = value.rowIndex;
          oldValue.columnKey = value.columnKey;
          callback();
        });
      } else {
        callback();
      }
    };

    _this.setCellValue = function (data) {
      _this.dataList[data.rowIndex][data.cellName] = data.value;
      var columnset = _this.RemodelingColumn(_this.dataList, _this.columns);
      _this.setState({ columnset: columnset });
    };

    _this._onRowDoubleClick = function (e, index) {
      var dataArry = _this.dataList;
      var rowData = dataArry[index];
      _this.props.model.fireEvent('dblClick', rowData);
    };

    _this.setCellBlur = function (data) {
      _this.CellStatus[data.rowIndex][data.cellName] = false;
      if (_this._triggerRender) _this._triggerRender();
    };

    _this.setCellEnter = function (data) {
      var keyIndex = _this.ColIndexs[data.cellName];
      var column = _this.columns;
      var enterDirection = column[data.cellName] ? column[data.cellName].enterDirection : null;
      if (enterDirection == null) return;
      var i = 1,
          columnKey = void 0,
          rowIndex = void 0;
      /*1向上 2向下 3向左 4向右*/
      switch (enterDirection) {
        case 1:
          /*回车向上*/
          if (data.rowIndex == 0) return;
          columnKey = data.cellName;
          rowIndex = data.rowIndex - 1;
          _this._onRowClick(null, rowIndex);
          break;
        case 2:
          /*回车向下*/
          columnKey = data.cellName;
          rowIndex = data.rowIndex + 1;
          _this._onRowClick(null, rowIndex);
          _this.scrollRow = rowIndex;
          break;
        case 3:
          /*回车向左*/
          if (keyIndex == 0) return;
          for (var attr in _this.ColIndexs) {
            if (_this.ColIndexs[attr] === keyIndex - i) {
              if (column[attr].bCanModify) {
                columnKey = attr;
              } else {
                i = i + 1;
              }
            }
          }
          rowIndex = data.rowIndex;
          break;
        case 4:
          /*回车向右*/
          for (var attr in _this.ColIndexs) {
            if (_this.ColIndexs[attr] === keyIndex + i) {
              if (column[attr].bCanModify) {
                columnKey = attr;
              } else {
                i = i + 1;
              }
            }
          }
          rowIndex = data.rowIndex;
          break;

        default:
          /*回车向右*/
          rowIndex = data.rowIndex;
          break;
      }
      if (!columnKey) return;
      _this.CellStatus[data.rowIndex][data.cellName] = false;
      _this._onCellClick(null, rowIndex, columnKey);
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
      _this.updateindeterminate();
    };

    _this.unselect = function (indexes) {
      for (var attr in indexes) {
        _this.dataList[indexes[attr]]._selected = false;
      }
      _this.updateindeterminate();
    };

    _this.selectAll = function () {
      _this.dataList.map(function (item, index) {
        _this.dataList[index]._selected = true;
      });
      _this.allSelect = true;
      _this.indeterminate = false;
      _this._triggerRender();
    };

    _this.unselectAll = function () {
      _this.dataList.map(function (item, index) {
        _this.dataList[index]._selected = false;
      });
      _this.allSelect = false;
      _this.indeterminate = false;
      _this._triggerRender();
    };

    _this.updateindeterminate = function () {
      var data = _this.dataList;
      var j = 0,
          indexes = [],
          selectAll = false,
          indeterminate = false;
      data.forEach(function (item, index) {
        if (!item._selected) return;
        indexes.push(index);
        j++;
      });
      if (j == 0) {
        selectAll = false;
        indeterminate = false;
      } else if (j > 0 && j < data.length) {
        selectAll = false;
        indeterminate = true;
      } else if (j == data.length) {
        selectAll = true;
        indeterminate = false;
      }
      _this._selectAllState(selectAll, indeterminate);
    };

    _this.setRowState = function (data) {
      // if (data.propertyName == 'disabled')
      _this.rowStatus[data.rowIndex][data.propertyName] = data.value;
      _this._triggerRender();
    };

    _this.setActionState = function (data) {
      var row = _this.dataList[data.rowIndex];
      var actionState = _this.actionState;
      actionState[row._id][data.itemName][data.name] = data.value;
      _this._triggerRender();
    };

    _this.setActionsState = function (data) {
      _this.dataList.map(function (row, index) {
        _this.actionState[row._id] = data[index];
      });
      _this._triggerRender();
    };

    _this.setCompositeLayout = function (data) {
      _this.CompositeLayout[data.rowIndex][data.itemName] = data.value;
      _this._triggerRender();
    };

    _this.setCompositeMeta = function (data) {
      _this.compositeControl[data.rowIndex][data.itemName] = data.value;
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

    _this.setCellStates = function (data) {
      var state = _this.cellState;
      data.map(function (row) {
        if (state[row.rowIndex][row.cellName]) {
          if (state[row.rowIndex][row.cellName][row.propertyName] == row.value) return;
          state[row.rowIndex][row.cellName][row.propertyName] = row.value;
        }
      });
      _this._triggerRender();
      //index cellName name value  oldvalue
    };

    _this.updateRow = function (data) {
      if (data.index.length) {
        data.index.forEach(function (rowIndex, index) {
          _this.dataList[rowIndex] = data.row[index];
        });
      } else {
        _this.dataList[data.index] = data.row;
      }
      _this._triggerRender();
    };

    _this.insertRow = function (data) {
      _this.dataList.splice(data.index, 0, data.row);
      //设置新增行单元格初始状态
      _this._InitCellStatus(_this.columns, _this.dataList);
      _this.scrollRow = _this.dataList.length - 1;
      // this._triggerRender();
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
        // this._triggerRender();
        _this.props.model.select(data.index + data.rows.length - 1);
      }
    };

    _this.batchInsertRow = function (data) {
      data.forEach(function (item) {
        var rowIndex = item.rowIndex,
            rowData = item.rowData;

        _this.dataList.splice(rowIndex, 0, rowData);
      });
      _this._InitCellStatus(_this.columns, _this.dataList);
      _this._triggerRender();
    };

    _this.deleteRows = function (indexes) {
      indexes.map(function (index) {
        _this.rowStatus.splice(index, 1);
      });
      _this._triggerRender();
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
      } else {
        var colErr = {};
        for (var key in _this.columns) {
          colErr[key] = false;
        }
        for (var i = 0; i < _this.isColErro.length; i++) {
          _this.isColErro[i] = colErr;
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
      _this.scrollRow = 0;
      _this.scrollEndHeight = 0;
    };

    _this.onShowSizeChange = function (current, size) {
      if (_this.props.model) _this.props.model.setPageSize(size);
      _this.scrollRow = 0;
      _this.scrollEndHeight = 0;
    };

    _this._setFooter = function (cellProps) {
      var column = _this.columns;
      var _this$GridProps = _this.GridProps,
          showAggregates = _this$GridProps.showAggregates,
          showSubtotal = _this$GridProps.showSubtotal,
          showCheckBox = _this$GridProps.showCheckBox,
          showRowNo = _this$GridProps.showRowNo;

      var footerTitle = void 0,
          footerCellStyle = { "padding": "8px 10px", "lineHeight": "14px" };
      if (showAggregates == true) {
        footerTitle = _react2.default.createElement(
          'div',
          { className: 'fixedDataTable-footer-title' },
          _react2.default.createElement(
            'div',
            { className: 'public_fixedDataTableCell_cellContent' },
            ' \u5C0F\u8BA1'
          ),
          _react2.default.createElement(
            'div',
            { className: 'public_fixedDataTableCell_cellContent' },
            ' \u5408\u8BA1'
          )
        );
        // if (showCheckBox && this.props.tableTyep != 'rptTable') {
        if (showCheckBox) {
          if (cellProps.columnKey === 'CheckBox') return footerTitle;
        } else if (showRowNo) {
          if (cellProps.columnKey === 'GridRowNo') return footerTitle;
        } else if (_this.ColIndexs[cellProps.columnKey] === 0) {
          return footerTitle;
        }
        if (column[cellProps.columnKey].bNeedSum) {
          var data = _this.dataList;
          var sum = 0,
              totalSum = 0;
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var val = data[i][cellProps.columnKey];
              val = val ? val : 0;
              sum = sum + parseFloat(val);
            }
          }
          var sumData = _this.state.sumData;
          for (var key in sumData[0]) {
            if (key === cellProps.columnKey) {
              totalSum = sumData[0][key];
            }
          }
          sum = _this._getDecimal(_this.columns[cellProps.columnKey], sum);
          totalSum = _this._getDecimal(_this.columns[cellProps.columnKey], totalSum);
          return _react2.default.createElement(
            'div',
            { className: 'fixedDataTable-footer-title' },
            _react2.default.createElement(
              'div',
              { className: 'public_fixedDataTableCell_cellContent subtotal' },
              _react2.default.createElement(
                _fixedDataTable.Cell,
                { style: { "height": _this.props.footerHeigh || 38 } },
                _react2.default.createElement(
                  'div',
                  { style: footerCellStyle, className: 'textCol' },
                  sum
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'public_fixedDataTableCell_cellContent aggregates' },
              _react2.default.createElement(
                _fixedDataTable.Cell,
                { style: { "height": _this.props.footerHeigh || 38 } },
                _react2.default.createElement(
                  'div',
                  { style: footerCellStyle, className: 'textCol' },
                  totalSum
                )
              )
            )
          );
        }
      } else if (showAggregates == 'local') {
        footerTitle = _react2.default.createElement(
          'div',
          { className: 'fixedDataTable-footer-title' },
          _react2.default.createElement(
            'div',
            { className: 'public_fixedDataTableCell_cellContent aggregates' },
            ' \u5408\u8BA1'
          )
        );
        // if (showCheckBox && this.props.tableTyep != 'rptTable') {
        if (showCheckBox) {
          if (cellProps.columnKey === 'CheckBox') return footerTitle;
        } else if (showRowNo) {
          if (cellProps.columnKey === 'GridRowNo') return footerTitle;
        } else if (_this.ColIndexs[cellProps.columnKey] === 0) {
          return footerTitle;
        }
        if (column[cellProps.columnKey].bNeedSum) {
          var _data = _this.dataList;
          var _sum = 0;
          if (_data.length > 0) {
            for (var _i3 = 0; _i3 < _data.length; _i3++) {
              var _val = _data[_i3][cellProps.columnKey];
              _val = _val ? _val : 0;
              _sum = _sum + parseFloat(_val);
            }
          }
          _sum = _this._getDecimal(_this.columns[cellProps.columnKey], _sum);
          return _react2.default.createElement(
            _fixedDataTable.Cell,
            { style: { "height": _this.props.footerHeigh || 38 } },
            _react2.default.createElement(
              'div',
              { style: footerCellStyle, className: 'textCol' },
              _sum
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
        console.error('数量/金额/单价，预制错误！');
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

    _this._pageSizeChange = function (value) {
      _this.props.model.setPageSize(value * 1);
      _this.scrollRow = 0;
      _this.scrollEndHeight = 0;
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
        // let pageCount = Math.ceil(pagination.total / pagination.pageSize);
        // if (pageCount == 1) return ''
        return _react2.default.createElement(
          'div',
          { className: 'pagination-new' },
          _react2.default.createElement(_antd.Pagination, { showQuickJumper: true, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '50', '80', '100', '1000', '2000', '3000', '65536'], showTotal: function showTotal(total) {
              return '\u5171' + total + '\u6761';
            }, size: 'small', total: pagination.total, current: pagination.current, pageSize: pagination.pageSize, onShowSizeChange: _this.onShowSizeChange, onChange: _this._PaginChange })
        );
      }
    };

    _this.columnSetting = function () {
      // this.props.model.getTitleData(this.props.code);
      _this.setState({
        popFlag: !_this.state.popFlag
      });
      _this.props.model.columnSetting(_this.props.code);
    };

    _this.onMouseEnter = function (e, index) {
      var titleList = _this.state.titleList;
      titleList[index].bShowPop = true;
      _this.setState({
        titleList: titleList
      });
    };

    _this.onMouseLeave = function (e, index) {
      var titleList = _this.state.titleList;
      titleList.forEach(function (ele, i) {
        ele.bShowPop = false;
      });
      _this.sort = "";
      _this.setState({
        titleList: titleList
      });
    };

    _this.sortClick = function (type, index) {
      var titleList = _this.state.titleList;
      if (type == 'up' && index == 0) return;
      if (type == 'down' && index == titleList.length - 1) return;
      if (titleList[index] && titleList[index].bJointQuery) {
        cb.utils.alert('关键字段不允许移动！', 'warning');
        return;
      }
      var pre = cb.utils.extend(true, {}, titleList[index - 1]);
      var next = cb.utils.extend(true, {}, titleList[index + 1]);
      var now = cb.utils.extend(true, {}, titleList[index]);
      var preOrder = pre.iOrder;
      var nextOrder = next.iOrder;
      var nowOrder = now.iOrder;
      if (type == 'up') {
        _this.sort = "up";
        // let preOrder = now.iOrder - 1;
        // if (!pre.iOrder) return;
        // if (pre.iOrder == preOrder) {
        //   pre.iOrder = preOrder + 1;
        // } else {
        //   titleList.forEach(function (ele) {
        //     if (preOrder == ele.iOrder) {
        //       ele.iOrder = preOrder + 1;
        //       return;
        //     }
        //   });
        // }
        // now.iOrder = preOrder;
        titleList[index] = pre;
        titleList[index].iOrder = nowOrder;
        titleList[index - 1] = now;
        titleList[index - 1].iOrder = preOrder;
      } else {
        _this.sort = "down";
        // let nextOrder = now.iOrder + 1;
        // if (!next.iOrder) return;
        // if (next.iOrder == nextOrder) {
        //   next.iOrder = nextOrder - 1;
        // } else {
        //   titleList.forEach(function (ele) {
        //     if (nextOrder == ele.iOrder) {
        //       ele.iOrder = nextOrder - 1;
        //       return;
        //     }
        //   });
        // }
        // now.iOrder == nextOrder;
        titleList[index] = next;
        titleList[index].iOrder = nowOrder;
        titleList[index + 1] = now;
        titleList[index + 1].iOrder = nextOrder;
      }
      _this.setState({
        titleList: titleList
      });
    };

    _this.setTitle = function (titleList) {
      _this.setState({
        titleList: titleList
      });
    };

    _this.setColumnByTtile = function (columns) {
      _this.columns = columns;
      var columnset = _this.RemodelingColumn(_this.dataList, columns);
      _this.setState({ columnset: columnset });
    };

    _this.getSettingContent = function () {
      var titleList = _this.state.titleList;
      var titileItem = [];
      titleList.forEach(function (element, index) {
        var _this2 = this;

        var item = void 0;
        var bShowPop = element.bShowPop ? element.bShowPop : false;
        if (!element.bHidden) {
          var showIt = false;
          if (element.bShowIt == 1) {
            showIt = true;
          }
          item = bShowPop ? _react2.default.createElement(
            _row2.default,
            { style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
                return _this2.onMouseEnter(e, index);
              }, onMouseLeave: function onMouseLeave(e) {
                return _this2.onMouseLeave(e, index);
              } },
            _react2.default.createElement(
              'div',
              { className: 'pull-left', title: element.cShowCaption },
              _react2.default.createElement(
                _antd.Checkbox,
                { checked: showIt, onChange: function onChange(e) {
                    return _this2.onChecked(e, element, index);
                  } },
                element.cShowCaption || element.cCaption
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'pull-right' },
              _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-up', onClick: function onClick() {
                  return _this2.sortClick('up', index);
                } }),
              _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-down', onClick: function onClick() {
                  return _this2.sortClick('down', index);
                } })
            )
          ) : _react2.default.createElement(
            _row2.default,
            { colCount: 2, style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
                return _this2.onMouseEnter(e, index);
              }, onMouseLeave: function onMouseLeave(e) {
                return _this2.onMouseLeave(e, index);
              } },
            _react2.default.createElement(
              'div',
              { className: 'pull-left' },
              _react2.default.createElement(
                _antd.Checkbox,
                { checked: showIt, onChange: function onChange(e) {
                    return _this2.onChecked(e, element, index);
                  } },
                element.cShowCaption || element.cCaption
              )
            ),
            _react2.default.createElement('div', { className: 'pull-right' })
          );
          titileItem.push(item);
        }
      }, _this);
      var buttonClass = 'filter-btn-fixed';

      var settingContent = _react2.default.createElement(
        'div',
        { className: buttonClass, style: { overflow: "auto", height: "250px" } },
        _react2.default.createElement(
          'div',
          { className: 'filter-txt' },
          titileItem
        ),
        _react2.default.createElement(
          'div',
          { className: 'filter-btn-1' },
          _react2.default.createElement(
            _antd.Button,
            { type: "primary", size: 'small', onClick: function onClick() {
                return _this.buttonClick('save');
              } },
            '\u4FDD\u5B58'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: "default", size: 'small', onClick: function onClick() {
                return _this.buttonClick('cancel');
              } },
            '\u53D6\u6D88'
          )
        )
      );
      return settingContent;
    };

    _this.onChecked = function (e, element, index) {
      var checked = e.target.checked;
      var id = element.id;
      var titleList = _this.state.titleList;
      var showTitleLen = _this.getShowTitleLen(titleList);
      if (showTitleLen < 2 && !checked) {
        cb.utils.alert('至少保留一个显示列！', 'warning');
        return;
      }
      if (titleList[index].bJointQuery) {
        cb.utils.alert('关联字段不允许修改！', 'warning');
        return;
      }
      if (checked) {
        titleList[index].bShowIt = 1;
      } else {
        titleList[index].bShowIt = 0;
      }

      _this.setState({
        titleList: titleList
      });
    };

    _this.getShowTitleLen = function (titleList) {
      var len = 0;
      titleList.map(function (item) {
        if (item.bShowIt == 1) len = len + 1;
      });
      return len;
    };

    _this.buttonClick = function (type) {
      if (type == 'save') {
        var newTitleList = [];
        _this.state.titleList.map(function (title) {
          delete title.cFieldName;
          newTitleList.push(title);
        });
        _this.props.model.setTitleData(newTitleList);
      }
      _this.setState({
        popFlag: false
      });
    };

    _this.onRowMouseEnter = function (e, index) {
      if (!_this.action.controls) return;
      if (_this.fixedTable && _this.fixedTable.state && _this.fixedTable.state.isColumnResizing) return;
      _this.selectIndex = index;
      _this.mouseEnterClass = e.target.className;
      var showAction = _this.state.showAction;
      _this.showActionIndex = index;
      showAction[index] = true;
      _this.scrollRow = index;
      _this.setState({
        showAction: showAction
      });
    };

    _this.onRowMouseLeave = function (e, index) {
      if (!_this.action.controls) return;
      if (_this.fixedTable && _this.fixedTable.state && _this.fixedTable.state.isColumnResizing) return;
      var actionParent = new cb.dom(e.relatedTarget).parents('.acticonCell');
      var actionParent1 = new cb.dom(e.relatedTarget).parents('.ant-popover');
      if (actionParent.length || actionParent1.length) return;
      _this.selectIndex = -1;
      _this.showActionIndex = -1;
      var showAction = _this.state.showAction;
      showAction[index] = false;
      _this.setState({
        showAction: showAction
      });
    };

    _this.getColumnSetting = function () {
      var hasSetting = _this.state.showColumnSetting;
      if (hasSetting) {
        var settingContent = _this.getSettingContent();
        var popFlag = _this.state.popFlag;
        return _react2.default.createElement(
          'div',
          { className: 'columnSetting' },
          _react2.default.createElement(
            _antd.Popover,
            { overlayStyle: { width: "200px" }, placement: "bottomRight", content: settingContent, trigger: "click", visible: popFlag },
            _react2.default.createElement(_antd.Button, { className: 'SettingBtn', type: "ghost", size: 'small', icon: 'ellipsis', onClick: function onClick() {
                return _this.columnSetting();
              } })
          )
        );
      } else {
        return '';
      }
    };

    _this.getActionControl = function () {
      if (!_this.state.readOnly) return; /*编辑态不显示*/
      if (_this.isScrolling) return; /*滚动时不显示*/
      if (_this.props.noBrowseAction) return; /*浏览态不显示*/
      // if(!this.dataList[this.showActionIndex]) return;/*无数据时 不渲染*/

      var actionList = _this.action.controls;
      var actionState = _this.actionState;
      var actionControl = [],
          rowheight = _this.rowheight;;
      var actionStyle = { "display": "none", "height": rowheight - 1 };
      var rowStyle = { "display": "flex", "alignItems": "center", "height": rowheight - 1 };
      var _id = _this.dataList[_this.showActionIndex] ? _this.dataList[_this.showActionIndex]._id : 0;
      if (actionList && actionList.length > 0) {
        if (_this.state.showAction && _this.state.showAction[_this.showActionIndex]) {
          actionStyle.display = "block";
          var headerHeight = _this.headerHeight || 40;
          var initialTop = headerHeight + 8 + (rowheight - 40) / 2;
          actionStyle.top = initialTop + _this.showActionIndex * rowheight - _this.scrollEndHeight;
          if (actionStyle.top <= initialTop) {
            _this.offsetType = 'top';
            _this.offsetY = initialTop - actionStyle.top;
            _this.scrollEndHeight = _this.scrollEndHeight - _this.offsetY;
            actionStyle.top = initialTop;
          } else if (actionStyle.top >= _this.bodyHeight) {
            _this.offsetType = 'end';
            _this.offsetY = actionStyle.top - _this.bodyHeight - (initialTop - headerHeight);
            if (_this.offsetY > 0) {
              _this.scrollEndHeight = _this.scrollEndHeight + _this.offsetY;
              actionStyle.top = _this.bodyHeight + 8 - (rowheight - 40) / 2;
            } else {
              actionStyle.top = _this.bodyHeight + 8 - (rowheight - 40) / 2 + _this.offsetY;
            }
          }
          actionStyle.top = actionStyle.top - (rowheight - 26) / 2;
        }
        actionList.map(function (action) {
          var _this3 = this;

          var icon = action.iStyle === 1 ? null : '#icon-' + action.icon;
          var text = action.iStyle === 2 ? null : action.cShowCaption;

          if (actionState[_id] && actionState[_id][action.cItemName].visible) {
            if (action.cControlType != 'popbutton') {
              var extraProps = {};
              if (!action.popoverKey) extraProps.onClick = function (e) {
                return _this3.ActionClick(e, action);
              };
              var temp_action = _react2.default.createElement(
                'span',
                { key: action.cItemName },
                _react2.default.createElement(
                  'a',
                  _extends({ className: 'table-list-btn' }, extraProps),
                  text
                )
              );
              if (action.popoverKey) {
                var ComName = PopoverMap[action.popoverKey];
                if (ComName) temp_action = _react2.default.createElement(
                  ComName,
                  { model: action.model, data: this.dataList[this.showActionIndex] },
                  temp_action
                );
              }
              actionControl.push(temp_action);
            } else {
              var currentRow = this.dataList[this.showActionIndex];
              if (!currentRow) return;
              // actionControl.push(<CssProgress id={currentRow.id} text={text} cItemName={action.cItemName} icon={icon} />);
            }
          }
        }, _this);
        var actionCellName = "acticonCell";
        if (_this.props.model) {
          var selectRows = _this.props.model.getSelectedRowIndexes();
          for (var i = 0; i < selectRows.length; i++) {
            var rowIndex = selectRows[i];
            if (_this.selectIndex === rowIndex) actionCellName = actionCellName + ' actionCellSelect';
          }
        }
        var lookUpRowIndexes = _this.lookUpRowIndexes;
        if (lookUpRowIndexes.length > 0) {
          lookUpRowIndexes.forEach(function (index) {
            if (_this.showActionIndex == index) actionCellName = actionCellName + ' actionCellSelect';
          });
        }
        return _react2.default.createElement(
          'div',
          { className: actionCellName, style: actionStyle },
          _react2.default.createElement(
            _row2.default,
            { style: rowStyle },
            actionControl
          )
        );
        // return '';
      }
    };

    _this.ActionClick = function (e, action) {
      /*表单 报表设计器 行按钮*/
      if (_this.props.noViewModel == true && _this.props.onActionClick) {
        _this.props.onActionClick(_this.showActionIndex, action);
        return;
      }
      if (_this.actionClickTime) {
        var nowTime = new Date().valueOf();
        if (nowTime - _this.actionClickTime < 1000) return;
        _this.actionClickTime = nowTime;
      } else {
        _this.actionClickTime = new Date().valueOf();
      }
      _this.props.model.setFocusedRowIndex(_this.showActionIndex);
      var viewModel = _this.props.model.getParent();
      while (viewModel.getParent()) {
        viewModel = viewModel.getParent();
      }var params = { index: _this.showActionIndex, cItemName: action.cItemName };
      viewModel.get(action.cItemName).fireEvent('click', params);
      if (action.cItemName == 'btnDelete' || action.cItemName == 'btnDeleteRow') {
        _this.selectIndex = -1;
        var showAction = _this.state.showAction;
        showAction[_this.showActionIndex] = false;
        _this.setState({
          showAction: showAction
        });
      }
    };

    _this.onScrollStart = function () {
      _this.isScrolling = true;
      _this.showActionIndex = -1;
    };

    _this.onScrollEnd = function (a, b, c) {
      _this.isScrolling = false;
      _this.scrollEndHeight = b;
      _this.offsetY = 0;
      _this.nowSetDataSource = false;
    };

    _this.rowHeightGetter = function (index) {
      if (_this.hasSpecialCol) {
        var row = _this.dataList[index];
        var maxRows = 0;
        _this.specialCols && _this.specialCols.map(function (speCol) {
          var cStyle = _this.columns[speCol].cStyle;
          try {
            cStyle = JSON.parse(cStyle);
          } catch (e) {
            cb.utils.alert('specialcom  cstyle预制错误！');
            return;
          }
          var specialDataSource = cStyle.dataSource;
          if (row[specialDataSource] && row[specialDataSource].length > maxRows) maxRows = row[specialDataSource].length;
        });
        if (maxRows <= 1) return _this.rowheight;
        return 30 * maxRows;
      } else {
        return _this.rowheight;
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

    _this.state = {
      readOnly: true, //是否只读
      visible: false,
      pagination: { total: 0, current: 0, pageSize: 0 },
      sumData: [], //合计数据
      containers: props.containers,
      style: props.style,
      mergeCells: _this.props.mergeCells || false,
      popFlag: false,
      titleList: [],
      showAction: [],
      lookUpRowIndexes: [],
      lookUpRow: -1
    };
    // showCheckBox 是否显示选择框  showRowNo 是否显示行号 showAggregates 是否显示合计小计 isRadio 是否单选 isPagination 是否分页
    _this.GridProps = {
      showCheckBox: false, showRowNo: false, showAggregates: true, showSubtotal: false, isRadio: true, isPagination: false
    };
    _this.dataList = []; /*grid数据*/_this.columns = {}; /*grid栏目数据*/_this.ColIndexs = {}; /*key与number对照*/
    _this.selectIndex = -1; /*选择行index*/_this.scrollCol = null;_this.scrollRow = 0;_this.CellStatus = []; //单元格是否编辑状态
    _this.rowStatus = []; /*行状态*/_this.allSelect = false;_this.isExpanded = false; /*是否可展开*/
    _this.headerHeight = 40;_this.actionState = {};_this.indeterminate = false; /*全选框选中但未全选样式*/
    _this.CellState = []; /*单元格状态 disabled readnonly style*/_this.isColErro = [];
    _this.CompositeLayout = [];_this.action = {}; /*操作列渲染数据*/_this.hasAction = false;_this.hoverRow = 0;_this.actionStyle = {};
    _this.compositeControl = {}; /*组合控件元数据存储*/_this.RowCol = {}; /*记录RowColChange改变前数据*/
    _this.sort = "";_this.showActionIndex = -1;_this.sortColumn = '';
    _this.rowheight = 40;_this.scrollEndHeight = 0;
    _this.mergeColContrast = {};
    _this.lookUpRowIndexes = [];_this.lookUpRow = -1;_this.lookUpKey = '';
    return _this;
  }

  _createClass(FixedDataTableControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      this.keydownHandler = (0, _addEventListener2.default)(document, 'keydown', this._handleKeyDown);
      this.mousedownHandler = (0, _addEventListener2.default)(document, 'mousedown', this._DocumentMouseDown);
      if (this.refs.fixedtable) this.fixedTable = this.refs.fixedtable;
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
      this.keydownHandler.remove();
      this.keydownHandler = null;
      this.mousedownHandler.remove();
      this.mousedownHandler = null;
    }
    //鼠标点击事件

    //捕捉键盘事件

    //切换编辑单元格状态

    //-----------------------------------------------------------设置grid中columns，datasource等属性--------------------------------------------------------------------------------------------------


    //初始化单元格状态

    //----------------------------------------------接受viewmodeld参数-----------------------------------------------------------------------------------------------
    //接受来自model的column信息

    //接收来自model的data信息


    //---------------------------------------------组织grid结构----------------------------------------------------------------------------------------------------------------
    //组织column结构


    /*多表头*/

    /*组织多表头栏目*/

    /*组织多表头显示组件*/

    /*组织多表头的行表头*/

    /*获取多表头宽度*/


    //设置column


    //------------

    //监听全选


    //列宽改变拖动函数

    // _onColumnReorderEndCallback = (event) => {
    //   const { columnAfter, columnBefore, reorderColumn } = event;
    //   let columns = this.columns;
    //   let newColIndex = cb.utils.extend(true, {}, this.ColIndexs);
    //   let initialIndex = this.ColIndexs[columnAfter];
    //   for (var j = initialIndex; j <= this.ColIndexs[reorderColumn]; j++) {
    //     for (var key in this.ColIndexs) {
    //       if (this.ColIndexs[key] == j) {
    //         initialIndex++;
    //         newColIndex[key] = initialIndex;
    //       }
    //     }
    //   }
    //   // newColIndex[columnAfter] = this.ColIndexs[reorderColumn];
    //   newColIndex[reorderColumn] = this.ColIndexs[columnAfter];
    //   let columnsCount = 0;
    //   for (var key in columns) {
    //     columnsCount++;
    //   }
    //   let newColumns = {};
    //   for (var i = 0; i < columnsCount; i++) {
    //     for (var key in newColIndex) {
    //       if (newColIndex[key] == i) {
    //         newColumns[key] = columns[key];
    //         break;
    //       }
    //     }
    //   }
    //   this.ColIndexs = newColIndex;
    //   this.setColumns(newColumns);
    // }
    //行单击事件


    //单元格单击事件

    //判断是否row col change事件

    //单元格数据改变事件


    //双击事件


    //-------------------------------------------------------------------viewmodel返调用方法------------------------------------------------------------------------------

    //model调用  set行状态

    //model调用  set action列状态

  }, {
    key: 'setReadOnly',
    value: function setReadOnly(value) {
      this.readOnly = value;
      var columnset = this.RemodelingColumn(this.dataList, this.columns);
      this.setState({ readOnly: value, columnset: columnset });
    }
    //model调用  set 组合控件的显示布局

    //model调用  set 组合控件的显示布局

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

    /*pageSize改变事件*/

    //栏目设置————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    //排序

    /*悬浮的action*/

    //悬浮按钮————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  }, {
    key: 'render',
    value: function render() {
      var pagination = this.setPage(this.state.pagination, this.GridProps.isPagination);
      var footerHeight = 0,
          visible = this.state.visible,
          showAggregates = this.GridProps.showAggregates,
          showSubtotal = this.GridProps.showSubtotal;
      var columnSetting = this.getColumnSetting();
      var overflowY = 'auto';
      if (showAggregates == true) {
        footerHeight = this.props.footerHeigh || (this.props.rowHeight || 38) * 2;
      } else if (showAggregates == 'local') {
        footerHeight = this.props.footerHeigh || this.props.rowHeight || 38;
      }
      var style = this.state.style || {};
      var gridClassName = '';
      var scrollXWidth = this.totalWidth > (this.props.width || 1100) ? 17 : 2;
      if (!this.GridProps.isPagination) scrollXWidth = 17;
      if (style.rowheight) this.rowheight = parseFloat(style.rowheight);
      if (visible) gridClassName = 'hide';
      var actionControl = this.getActionControl();
      var emptyData = this.getEmptyData();

      var gridHeight = 0;
      if (this.props.maxRowCount) {
        if (this.props.height === 0) {
          gridHeight = this.rowheight * this.props.maxRowCount + (this.headerHeight || 40) + scrollXWidth;
          if (this.GridProps.isPagination) gridHeight = gridHeight - 58;
        } else {
          gridHeight = this.rowheight * this.props.maxRowCount + (this.headerHeight || 40) + footerHeight + scrollXWidth;
          if (this.GridProps.isPagination) {
            if (gridHeight > this.props.height - 58) {
              gridHeight = this.props.height - 58;
            }
          } else {
            if (gridHeight > this.props.height) {
              gridHeight = this.props.height;
            }
          }
        }
      }
      /*单据表体高度*/
      else {
          var len = 10;
          if (this.dataList.length < 10) len = this.dataList.length;
          if (this.props.tableClass == 'rptTable') scrollXWidth = 2;
          gridHeight = this.rowheight * len + (this.headerHeight || 40) + (this.groupHeaderHeight || 0) + footerHeight + scrollXWidth;
        }

      if (emptyData) gridHeight = 200 + footerHeight;
      // if (this.props.tableClass == 'rptTable') gridHeight += footerHeight;
      if (gridHeight < 170 && this.dataList.length == 0) gridHeight = 170;

      var tableClass = this.props.tableClass ? this.props.tableClass : 'listTable';
      if (tableClass == 'BillDesign' || tableClass == 'ReportDesign') {
        tableClass = 'listTable';
        gridHeight = this.props.height;
      }
      if (this.state.mergeCells) tableClass = 'mergeTable';

      /*交班--根据传入rowcount  动态渲染高度*/
      var calcHeightByRowCount = this.state.calcHeightByRowCount;
      if (calcHeightByRowCount) {
        gridHeight = this.rowheight * calcHeightByRowCount + (this.headerHeight || 40) + footerHeight + scrollXWidth;
        if (gridHeight < 170) gridHeight = 170;
      }
      if (this.dataList.length == 0) {
        footerHeight = 0;
      }
      if (this.state.readOnly) tableClass = tableClass + " readOnlyTable";
      this.bodyHeight = gridHeight - (this.headerHeight || 40) - footerHeight - scrollXWidth;
      if (this.props.tableTyep == 'rptTable') {
        var tableWidth = this.props.width || 1100;
        if (this.colsWidth > tableWidth) gridHeight += 15;
      }
      if (this.hasSpecialCol) {
        gridHeight = this.rowheight * 10 + (this.headerHeight || 40) + (this.groupHeaderHeight || 0) + footerHeight + scrollXWidth;
      }
      return _react2.default.createElement(
        'div',
        { className: 'meta-table ' + gridClassName + ' ' + tableClass },
        _react2.default.createElement(
          _row2.default,
          null,
          columnSetting,
          actionControl,
          _react2.default.createElement(
            _fixedDataTable.Table,
            { ref: 'fixedtable',
              rowHeight: this.rowheight,
              overflowY: overflowY,
              overflowX: 'auto',
              onScrollStart: this.onScrollStart,
              onScrollEnd: this.onScrollEnd,
              headerHeight: this.headerHeight || 40,
              groupHeaderHeight: this.groupHeaderHeight || 0,
              footerHeight: footerHeight,
              rowsCount: this.dataList.length,
              width: this.props.width || 1100,
              height: gridHeight,
              onColumnResizeEndCallback: this._onColumnResizeEndCallback,
              isColumnResizing: false
              // onColumnReorderEndCallback={this._onColumnReorderEndCallback}
              // isColumnReordering={false}
              , onRowClick: this._onRowClick
              // onRowDoubleClick={this._onRowDoubleClick}
              , rowClassNameGetter: this.rowClassNameGetter,
              rowHeightGetter: this.rowHeightGetter,
              scrollToRow: this.scrollRow,
              scrollToColumn: this.scrollCol,
              onRowMouseEnter: this.onRowMouseEnter,
              onRowMouseLeave: this.onRowMouseLeave,
              onVerticalScroll: this.onVerticalScroll
              // showScrollbarY={false}
            },
            this.state.columnset
          ),
          emptyData
        ),
        _react2.default.createElement(
          _row2.default,
          null,
          pagination
        )
      );
    }
  }]);

  return FixedDataTableControl;
}(_react2.default.Component);

exports.default = FixedDataTableControl;