
import React from 'react';
import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table-2';
import { Checkbox, Pagination, Popover, Select, Button, Message, Notification, Icon } from 'antd';
import Row from '../basic/row';
import Col from '../basic/col';
import CellModel from './CellModel';
import SvgIcon from 'SvgIcon';
import { getPredicateValue } from '../../helpers/util'

export default class TableTouch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,//是否只读
      visible: false,
      pagination: { total: 0, current: 0, pageSize: 0 },
      sumData: [],//合计数据
      style: props.style,
      gridWidth: props.width || 1100,
    };
    // showCheckBox 是否显示选择框  showRowNo 是否显示行号
    //是否单选 isPagination 是否分页
    this.GridProps = {
      showRowNo: true,
      showCheckBox: false,
      isPagination: false,
    };
    this.selectAll = false;
    this.dataList = [];/*grid数据*/
    this.columns = {};/*grid栏目数据*/
    this.ColIndexs = {};/*key与number对照*/
    this.selectIndex = -1;/*选择行index*/
    this.scrollCol = null;
    this.scrollRow = 0;
    this.headerHeight = 46;
    this.actionState = [];
    this.CellState = [];/*单元格状态 disabled readnonly style*/
    this.isColErro = [];
    this.action = {};/*操作列渲染数据*/
    this.actionStyle = {};
    this.RowCol = {};/*记录RowColChange改变前数据*/
    this.renderIndex = 1;
    this.rowheight = props.rowHeight || 56;
    this.showRows = 0;
    this.__isElectronic = false;
    this.bodyHeight = 0;
  }

  componentDidMount() {
    if (window.__isElectronic) {
      this.__isElectronic = true;
      if (this.props.rowHeight)
        this.rowheight = this.props.rowHeight;
      else
        this.rowheight = 46;
      this.headerHeight = 40;
    }

    if (this.props.model) {
      this.props.model.addListener(this);
      /*表格高度*/
      let scrollXWidth = (this.totalWidth > (this.props.width || 1100) ? 17 : 2);
      let height = this.props.height ? this.props.height : 1020;
      let bodyHeight = height - this.headerHeight - scrollXWidth;
      let pageIndex = Math.ceil(bodyHeight / this.rowheight / 10);
      if (this.__isElectronic && this.props.tableMode == 'refer') {
        this.showRows = Math.ceil(bodyHeight / this.rowheight);
        this.props.model.setPageSize(10);
      } else {
        this.showRows = Math.ceil(bodyHeight / this.rowheight);
        // Math.floor(bodyHeight / this.rowheight)
        let pageSize = pageIndex * 10;
        this.props.model.setPageSize(pageSize);
      }
    }
    let clientWidth = document.documentElement.clientWidth;
    if (clientWidth <= 1024 && clientWidth == this.state.gridWidth) {
      this.setState({ gridWidth: this.state.gridWidth - 20 })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.height != nextProps.height) {
      if (nextProps.model && this.__isElectronic && this.props.tableMode == 'refer') {
        let scrollXWidth = (this.totalWidth > (this.props.width || 1100) ? 17 : 2);
        let height = nextProps.height ? nextProps.height : 1020;
        this.bodyHeight = height - this.headerHeight - scrollXWidth;
      }
    }
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  rowClassNameGetter = (index) => {
    if (index === this.selectIndex)
      return 'public_fixedDataTableRow_selected';
    if (this.props.model) {
      let selectRows = this.props.model.getSelectedRowIndexes();
      for (var i = 0; i < selectRows.length; i++) {
        let rowIndex = selectRows[i];
        if (index === rowIndex)
          return 'public_fixedDataTableRow_CheckedRow';
      }
    }
  }

  //-----------------------------------------------------------设置grid中columns，datasource等属性--------------------------------------------------------------------------------------------------
  setListenerState = (params) => {
    if (params.columnMode === 'local' && this.props.columns) {
      for (var attr in this.props.columns)
        Object.assign(this.props.columns[attr], params.columns[attr]);
      params.columns = this.props.columns;
    }
    let tmp_ColIndexs = {};
    let index = 0;
    /*cellState*/
    if (params.cellState) {
      this.cellState = params.cellState;
    }


    //栏目col与index对照
    var hasColumn = false;
    let tableWidth = this.props.width || 1100;
    for (var attr in params.columns) {
      if (this.props.widthMode == 'percent') {
        let iColWidth = parseFloat(params.columns[attr].iColWidth);
        let width = isNaN(iColWidth) ? 25 : iColWidth;
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
      this.setPageInfo(params.pageInfo);
    }
    this.GridProps.showRowNo = params.showRowNo;//是否显示行号
    this.GridProps.showCheckBox = params.showCheckBox;//是否显示复选框
    this.GridProps.isRadio = !params.multiple;//是否单选
    this.GridProps.showAggregates = params.showAggregates;//是否显示合计
    this.GridProps.showSubtotal = params.showSubtotal;//是否显示小计
    this.GridProps.isPagination = params.pagination;//是否分页
    this.GridProps.showColumnSetting = params.showColumnSetting;//是否显示栏目设置
    this.ColIndexs = tmp_ColIndexs;//栏目与index对照

    if (hasColumn) {
      this.columns = params.columns;
      if (params.rows && params.rows.length > 0)
        this.dataList = params.rows;
      //初始化单元格状态
      this._InitCellStatus(params.columns, params.rows);
      this.readOnly = params.readOnly;
      let columnset = this.RemodelingColumn(params.rows, params.columns);
      this.setState({
        readOnly: params.readOnly,
        columnset,
        showColumnSetting: params.showColumnSetting
      });
    }
  }

  //初始化单元格状态
  _InitCellStatus = (Columns, DataSource) => {
    /*初始化action列的渲染数据*/
    let action = this.props.action;
    if (action && action.cControlType && action.cControlType == 'Toolbar') {
      this.action = action;
    }
    let PopMeta = {};
    if (DataSource !== undefined) {
      //设置初始单元格编辑状态/行选择初始状态/action状态/单元格状态 disabled/readOnly/style
      let temp_cellState = cb.utils.extend(true, [], this.cellState);
      let temp_isColErro = cb.utils.extend(true, [], this.isColErro);
      let temp_actionState = cb.utils.extend(true, [], this.actionState);
      let length = DataSource.length;
      if (length <= 0) return;
      for (let i = 0; i < length; i++) {
        DataSource[i]._selected = false;
        if (this.action && this.action.controls) {
          let actionList = this.action.controls;
          if (!temp_actionState[i])
            temp_actionState[i] = {};
          actionList.map(function (action) {
            if (!temp_actionState[i][action.cItemName])
              temp_actionState[i][action.cItemName] = { disabled: false, visible: true };
          });
        }
        if (!temp_cellState[i])
          temp_cellState[i] = {};
        if (!temp_isColErro[i])
          temp_isColErro[i] = {};
        for (var attr in Columns) {
          if (!temp_cellState[i][attr])
            temp_cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {} };
          if (!temp_isColErro[i][attr])
            temp_isColErro[i][attr] = false;
        }
      }
      if (temp_actionState) this.actionState = temp_actionState;
      if (this.props.model) this.props.model.initActionsState(this.actionState);
      this.cellState = temp_cellState;
      this.isColErro = temp_isColErro;
    }
  }
  //----------------------------------------------接受viewmodeld参数-----------------------------------------------------------------------------------------------
  //接受来自model的column信息
  setColumns = (columns) => {
    let columndata = cb.utils.extend(true, {}, columns)
    if (this.props.widthMode == 'percent') {
      let tableWidth = this.props.width || 1100;
      for (var key in columndata) {
        let iColWidth = parseFloat(columndata[key].iColWidth);
        let width = isNaN(iColWidth) ? 25 : iColWidth;
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
    let columnset = this.RemodelingColumn(this.dataList, columndata);
    this.columns = columndata;
    let length = this.dataList.length;
    for (let i = 0; i < length; i++) {
      for (var attr in columndata) {
        if (!this.cellState[i][attr]) {
          this.cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {} };
        }
      }
    }
    this.setState({ columnset });
  }

  setSum = (sumData) => {
    // if (sumData.length > 0)
    this.setState({
      sumData
    })
  }

  //接收来自model的data信息
  setDataSource = (data) => {
    this.selectIndex = -1;
    this.dataList = data;
    this.indeterminate = false;
    this.selectAll = false;
    /*设置scrollRow--滚动加载*/
    let { current, pageSize } = this.state.pagination;
    if (data.length <= pageSize) {
      this.scrollRow = 0;
    } else {
      this.scrollRow = current * 10;
    }

    //初始化单元格状态
    this._InitCellStatus(this.columns, data);
    let columnset = this.RemodelingColumn(data, this.columns);
    this.setState({ columnset });
    if (this.props.onChangeData)
      this.props.onChangeData();
  }

  //---------------------------------------------组织grid结构----------------------------------------------------------------------------------------------------------------
  //组织column结构
  RemodelingColumn = (dataList, columnState) => {
    let ret = [], columnData = [], actionAlign = '', Operation = {};

    const readOnly = this.readOnly;
    /*操作列*/
    if (readOnly === false && this.action.controls) {
      columnState.Operation = { 'cItemName': 'Operation', 'iColWidth': 40, 'cControlType': 'Action', 'iAlign': 3 };
      columnData.push(columnState.Operation);
    }
    /*行号*/
    if (this.GridProps.showRowNo) {
      if (!columnState.GridRowNo)
        columnState.GridRowNo = { 'cItemName': 'GridRowNo', 'iColWidth': 50, 'cControlType': 'Input', 'bFixed': '1' };
      columnData.push(columnState.GridRowNo);
    }
    /*选择列*/
    if (this.GridProps.showCheckBox || this.props.hasAction) {
      if (!columnState.CheckBox)
        columnState.CheckBox = { 'cItemName': 'CheckBox', 'iColWidth': 45, 'cControlType': 'SelectCheckBox' };
      columnData.push(columnState.CheckBox);
    }

    for (var attr in columnState) {
      if (attr != 'CheckBox' && attr != 'GridRowNo' && attr != 'Operation')
        columnData.push(columnState[attr]);
    }
    this.totalWidth = 0;
    columnData.map(function (col) {
      let column = this.setColumn(col.cItemName, col);
      this.totalWidth += col.iColWidth;
      ret.push(column);
    }, this);
    return ret;
  }
  //设置column
  setColumn = (attr, col) => {
    let controlType = col.cControlType;
    var iColWidth = parseFloat(col.iColWidth);
    let width = isNaN(iColWidth) ? 200 : iColWidth;
    let headerCell, headerClassName = '';
    let fiexd = col.bFixed == 1 ? true : false;
    let align = '';
    if (col.iAlign === 1) {
      align = 'left';
    } else if (col.iAlign === 2) {
      align = 'center';
    } else {
      align = 'right';
    }
    if (!col.bCanModify && !this.readOnly) {
      headerClassName = 'public_fixedDataTableCell_disabled';
    } else {
      headerClassName = 'headerName';
    }

    headerCell = (
      <Cell className={headerClassName}>
        <div style={{ textAlign: 'left', width: this.props.width, display: "flex" }} id={col.index}>
          <span style={{ width: width }} className="textCol table-header-name">
            {col.cShowCaption}
          </span>
        </div>
      </Cell>
    )
    if (attr === 'Operation') {
      headerCell = (<Cell><div className='headerName'></div></Cell>);
      return (<Column key={attr}
        allowCellsRecycling columnKey={attr}
        header={headerCell} cell={(rowIndex) => this.setCell(rowIndex, col)}
        width={width} align="center" fixedRight={true} footer={this._setFooter} />);
    }
    if (attr === 'CheckBox') {
      let model = this.props.model.getEditRowModel().get(attr);
      if (this.GridProps.isRadio || this.props.hasAction) {
        headerCell = <Cell></Cell>
      } else {
        headerCell = (
          <Cell>
            <div className='checkboxHD'>
              <Checkbox indeterminate={this.indeterminate} checked={this.selectAll} onChange={(e, i) => this.SelectChange(e, -1)}></Checkbox>
            </div>
          </Cell>
        );
      }
      fiexd = true, align = 'center';
    }
    return (<Column key={attr}
      allowCellsRecycling columnKey={attr}
      header={headerCell} cell={(rowIndex) => this.setCell(rowIndex, col)}
      width={width} align={align} fixed={fiexd} footer={this._setFooter} />);
  }
  setCell = (rowIndex, col) => {
    let isColErro = this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] ? this.isColErro[rowIndex.rowIndex][rowIndex.columnKey] : false;
    if (this.state.style && this.state.style.height) {
      this.rowheight = this.state.style.height;
    }
    return (<CellModel
      dataList={this.dataList} hasAction={this.props.hasAction} readOnly={this.readOnly} selectIndex={this.selectIndex} RowProperty={rowIndex} selectAllState={this._selectAllState}
      action={this.action} indeterminate={this.indeterminate} selectAll={this.selectAll} cellState={this.cellState} isColErro={isColErro} Column={col} model={this.props.model} GridProps={this.GridProps} triggerRender={this._triggerRender} columnsList={this.columns} rowHeight={this.props.rowHeight || this.rowheight} setCellBlur={this.setCellBlur}
      renderIndex={this.renderIndex} ActionClick={this.ActionClick} rowHeight={this.rowheight} actionState={this.actionState}
    />);
  }
  _triggerRender = () => {
    var columnset = this.RemodelingColumn(this.dataList, this.columns);
    this.setState({ columnset });
  }

  _selectAllState = (selectAll, indeterminate) => {
    this.selectAll = selectAll;
    this.indeterminate = indeterminate;
    this._triggerRender();
  }
  //监听全选
  SelectChange = (e, index) => {
    if (!e.target.checked) {
      this.props.model.unselectAll();
      this.indeterminate = false;
    } else {
      this.props.model.selectAll();
    }
    this.dataList.map((item, index) => {
      this.dataList[index]._selected = e.target.checked;
    });
    this.selectAll = e.target.checked;
    var columnset = this.RemodelingColumn(this.dataList, this.columns);
    this.setState({ columnset });
  }

  //行单击事件
  _onRowClick = (e, index) => {
    if (this.dataList.length == 0 || !this.dataList[index]) return;
    if (!this.GridProps.showCheckBox || this.GridProps.isRadio || this.props.hasAction)
      this.props.model.select(index);
    else if (this.props.tableMode == 'refer')
      this.props.model.select(index, false);
    // this.props.tableMode == 'refer'
    this.props.model.setFocusedRowIndex(index);
  }

  //单元格数据改变事件
  setCellValue = (data) => {
    this.dataList[data.rowIndex][data.cellName] = data.value;
    let columnset = this.RemodelingColumn(this.dataList, this.columns);
    this.setState({ columnset });
  }
  setCellBlur = (data) => {
    if (this._triggerRender)
      this._triggerRender();
  }
  //-------------------------------------------------------------------viewmodel返调用方法------------------------------------------------------------------------------
  select = (indexes) => {
    for (var i = 0; i < this.dataList.length; i++) {
      this.dataList[i]._selected = false;
    }
    for (var attr in indexes) {
      this.dataList[indexes[attr]]._selected = true;
    }
    this.selectIndex = indexes[0] * 1;
    this.scrollRow = indexes[0];
    this._triggerRender();
  }

  unselect = (indexes) => {
    for (var attr in indexes) {
      this.dataList[indexes[attr]]._selected = false;
    }
    this._triggerRender();
  }
  //model调用  set action列状态
  setActionState = (data) => {
    let actionState = this.actionState;
    actionState[data.rowIndex][data.itemName][data.name] = data.value;
    this._triggerRender();
  }
  setActionsState = (data) => {
    this.actionState = data;
    this._triggerRender();
  }
  setReadOnly(value) {
    this.readOnly = value;
    this.setState({ readOnly: value });
  }
  //model调用  set单元格状态
  setCellState = (data) => {
    let state = this.cellState;
    if (state[data.rowIndex][data.cellName]) {
      if (state[data.rowIndex][data.cellName][data.propertyName] == data.value) return;
      state[data.rowIndex][data.cellName][data.propertyName] = data.value;
      this._triggerRender();
    }
    //index cellName name value  oldvalue
  }
  //--------------------------------------------------------------------------grid按钮事件------------------------------------------------------------------------------------------------
  //更新行
  updateRow = (data) => {
    this.dataList[data.index] = data.row;
    this._triggerRender();
  }

  //增行
  insertRow = (data) => {
    this.dataList.splice(data.index, 0, data.row);
    //设置新增行单元格初始状态
    this._InitCellStatus(this.columns, this.dataList);
    this.scrollRow = this.dataList.length - 1;
    this._triggerRender();
    this.props.model.select(data.index);
  }
  //批量增行/插行
  insertRows = (data) => {
    if (this.dataList.length == 0) {
      this.setDataSource(data.rows);
    } else {
      for (var i = 0; i < data.rows.length; i++) {
        this.dataList.splice(data.index + i, 0, data.rows[i])
      }
      this._InitCellStatus(this.columns, this.dataList);
      this._triggerRender();
      this.props.model.select(data.index + data.rows.length - 1);
    }
  }
  //删行
  deleteRows = (indexes) => {
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
  }
  ActionClick = (e, action, index) => {
    let viewModel = this.props.model.getParent();
    while (viewModel.getParent())
      viewModel = viewModel.getParent();
    let params = { index: index, cItemName: action.cItemName }
    viewModel.get(action.cItemName).fireEvent('click', params);
  }
  validate = (val) => {
    if (val.type == 'error') {
      if (val.data) {
        let isColErro = this.isColErro;
        isColErro.map(function (item) {
          for (var key in item) {
            item[key] = false;
          }
        });
        val.data.map(function (item) {
          if (isColErro[item.rowIndex][item.cellName] != undefined && isColErro[item.rowIndex][item.cellName] != 'undefined')
            isColErro[item.rowIndex][item.cellName] = true;
          // Message.error('表体存在必输项，请输入完整在尝试保存！');
          // cb.utils.alert('表体存在必输项，请输入完整在尝试保存！', 'error');
        });
        this._triggerRender();
        cb.utils.alert('表体存在必输项，请输入完整再尝试保存！', 'error');
      } else {
        cb.utils.alert('表体数据为空！不允许保存！', 'error');
      }
    }
  }
  //---------------------------------------------------------------------------------分页相关-----------------------------------------------------------------------------------
  //设置分页
  setPageInfo = (paginationlist) => {
    if (paginationlist.pageSize === -1)
      this.GridProps.isPagination = false;
    var pageinfo = this.state.pagination;
    pageinfo.total = paginationlist.recordCount
    pageinfo.current = paginationlist.pageIndex;
    pageinfo.pageSize = paginationlist.pageSize;
    this.setState({
      pagination: pageinfo
    });
  }
  //分页改变事件
  _PaginChange = (page) => {
    if (this.props.model)
      this.props.model.setPageIndex(page);
  }
  /*页大小改变*/
  onShowSizeChange = (current, size) => {
    if (this.props.model)
      this.props.model.setPageSize(size);
  }
  setPage = (pagination, isPage) => {
    if (isPage && pagination.total !== 0) {
      let sumData = this.state.sumData;
      let columns = this.columns;
      let showSums = [];
      if (sumData.length > 0) {
        for (var key in sumData[0]) {
          if (!columns[key]) continue;
          if (sumData[0][key] == 0) continue;
          showSums.push(
            <Col span={1} style={{ fontSize: '18px' }}>
              {columns[key].cCaption}：{sumData[0][key]}
            </Col>
          )
          if (showSums.length > 2) {
            break;
          }
        }
      }
      let selectOptions = [{ "value": 10, "text": 10 }, { "value": 20, "text": 20 }, { "value": 30, "text": 30 }, { "value": 40, "text": 40 }, { "value": 50, "text": 50 }];
      let selectOptionsControl = selectOptions.map((item, index) => {
        return <Select.Option key={item.value} text={item.text}>{item.text}</Select.Option>
      });
      return (
        <div className='pagination-new'>
          <Pagination showQuickJumper showSizeChanger pageSizeOptions={['10', '20', '30', '50', '80', '100', '65536']} showTotal={total => `共${total}条`} size="small" total={pagination.total} current={pagination.current} pageSize={pagination.pageSize} onShowSizeChange={this.onShowSizeChange} onChange={this._PaginChange} />
        </div>
      );
    }
  }

  _setFooter = (cellProps) => {
    let column = this.columns;
    if (this.GridProps.showAggregates || this.GridProps.showAggregates == 'local') {
      if (this.GridProps.showCheckBox) {
        if (cellProps.columnKey === 'CheckBox') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 合计</div>
            </div>
          )
        }
      } else if (this.GridProps.showRowNo) {
        if (cellProps.columnKey === 'GridRowNo') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 合计</div>
            </div>
          )
        }
      } else if (this.ColIndexs[cellProps.columnKey] === 0) {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'> 合计</div>
          </div>
        )
      }
      if (cellProps.columnKey == 'Setting') {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'></div>
          </div>
        )
      }
      let sumData = this.state.sumData;
      if (sumData.length > 0) {
        let data = this.dataList;
        let sum = 0;
        for (var key in sumData[0]) {
          if (key === cellProps.columnKey) {
            sum = this._getDecimal(this.columns[key], sumData[0][key]);
            return (
              <Cell>
                <div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" >
                  {sum}
                </div>
              </Cell>
            )
          }
        }
      } else {
        if (this.GridProps.showAggregates == 'local') {
          if (column[cellProps.columnKey].bNeedSum) {
            let data = this.dataList;
            let sum = 0;
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let val = data[i][cellProps.columnKey];
                val = val ? val : 0;
                sum = sum + val;
              }
            }
            sum = this._getDecimal(this.columns[cellProps.columnKey], sum);
            return (
              <Cell>
                <div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" >
                  {sum}
                </div>
              </Cell>
            )
          }
        } else {
          return (
            <Cell><div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" ></div></Cell>
          )
        }
      }
    } else if (this.GridProps.showSubtotal) {
      if (cellProps.columnKey == 'Setting') {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'></div>
          </div>
        )
      }
      if (this.GridProps.showCheckBox) {
        if (cellProps.columnKey === 'CheckBox') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 小计</div>
            </div>
          )
        }
      } else if (this.GridProps.showRowNo) {
        if (cellProps.columnKey === 'GridRowNo') {
          return (
            <div className="fixedDataTable-footer-title">
              <div className='public_fixedDataTableCell_cellContent'> 小计</div>
            </div>
          )
        }
      } else if (this.ColIndexs[cellProps.columnKey] === 0) {
        return (
          <div className="fixedDataTable-footer-title">
            <div className='public_fixedDataTableCell_cellContent'> 小计</div>
          </div>
        )
      }
      if (column[cellProps.columnKey].bNeedSum) {
        let data = this.dataList;
        let sum = 0;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            let val = data[i][cellProps.columnKey];
            val = val ? val : 0;
            sum = sum + val;
          }
        }
        return (
          <Cell>
            <div style={{ "padding": "12px 10px", lineHeight: "14px" }} className="textCol" >
              {sum}
            </div>
          </Cell>
        )
      }
    }
  }
  _getDecimal = (col, sum) => {
    let NumPoint = col.iNumPoint;
    /*谓词变量支持系统参数*/
    let cFormatData = col.cFormatData;
    try {
      if (!cFormatData || cFormatData == '') {
        cFormatData = {};
      } else {
        cFormatData = JSON.parse(cFormatData);
      }
    } catch (e) {
      cb.utils.alert('数量/金额/单价，预制错误！', 'error');
    }
    let decimal = cFormatData.decimal ? getPredicateValue(cFormatData.decimal) : null;
    let controlType = col.cControlType ? col.cControlType.trim().toLocaleLowerCase() : '';
    if (controlType === 'money') {
      if (decimal)
        NumPoint = decimal;
      else
        NumPoint = cb.rest.AppContext.option.amountofdecimal;
    } else if (controlType === 'price') {
      if (decimal)
        NumPoint = decimal;
      else
        NumPoint = cb.rest.AppContext.option.monovalentdecimal;
    } else if (controlType === 'inputnumber') {
      if (decimal)
        NumPoint = decimal;
      else
        if (!NumPoint || NumPoint == '') NumPoint = 0;

    } else {
      NumPoint = null;
    }
    if (!isNaN(sum) && NumPoint) {
      sum = Number(sum);
      sum = sum.toFixed(NumPoint);
    }
    return sum;
  }
  onScrollEnd = (scrollx, scrolly, hideRows) => {
    let rowCount = this.dataList.length;
    if ((this.showRows + hideRows - 1) == rowCount || (this.bodyHeight + scrolly) == rowCount * this.rowheight) {
      let pagination = this.state.pagination;
      let newSize = pagination.current + 1;
      let pageCount = pagination.total / pagination.pageSize;
      pageCount = Math.ceil(pageCount);
      if (newSize > pageCount) return;
      if (this.props.model)
        this.props.model.setPageIndex(pagination.current + 1);
    }
  }
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
  getEmptyData = () => {
    let data = this.dataList;
    if (data.length) return;
    const text = this.state.showSearch ? '搜索无结果' : '暂时没有数据哦~';
    const icon = this.props.emptyIcon || 'nodata';
    return <div className='table-nodata'><SvgIcon type={icon} />{text}</div>
  }
  getStringLength = (str) => {
    if (!str) str = '';
    let realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) {
        realLength += 1;
      } else {
        realLength += 2;
      }
    }
    return realLength
  }
  render() {
    // let pagination = this.setPage(this.state.pagination, this.GridProps.isPagination);
    let visible = this.state.visible;

    let style = this.state.style || {};
    let gridHeight = this.props.height || 600;
    // let gridWidth = this.props.width || 1100;
    if (this.dataList.length == 0 && !this.props.height) gridHeight = 200;

    let footerHeight = this.props.footerHeight || 0;
    /*交班--根据传入rowcount  动态渲染高度*/
    const calcHeightByRowCount = this.state.calcHeightByRowCount;
    if (calcHeightByRowCount) {
      gridHeight = this.rowheight * calcHeightByRowCount + (this.headerHeight || 40) + footerHeight + 8;
      if (gridHeight < 200) gridHeight = 200;
    }

    if (style.rowheight) this.rowheight = parseFloat(style.rowheight);
    if (visible) gridClassName = 'hide';
    if (this.GridProps.showAggregates == 'local' && this.state.sumData.length > 0)
      footerHeight += this.rowheight;
    if (this.GridProps.showSubtotal)
      footerHeight += this.rowheight;
    if (this.dataList.length == 0) footerHeight = 0;
    // if (this.GridProps.showAggregates != 'local' && this.state.sumData.length == 0)
    //   footerHeight = 0;
    let emptyData = this.getEmptyData();
    return (
      <div className="touch-grid">
        <Row>
          <Table
            rowHeight={this.rowheight}
            overflowY={'auto'}
            overflowX={'auto'}
            onScrollEnd={this.onScrollEnd}
            // onRowTouchEnd={this.onRowTouchEnd}
            footerHeight={footerHeight}
            onRowTouchMove={this.onRowTouchMove}
            headerHeight={this.headerHeight || 40}
            rowsCount={this.dataList.length}
            width={this.state.gridWidth}
            height={gridHeight}
            isColumnResizing={false}
            onRowClick={this._onRowClick}
            rowClassNameGetter={this.rowClassNameGetter}
            scrollToRow={this.scrollRow}
            scrollToColumn={this.scrollCol}
            touchScrollEnabled
          >
            {this.state.columnset}
          </Table>
          {emptyData}
        </Row>
      </div>
    );
  }
}
