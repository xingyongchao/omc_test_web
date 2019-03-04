
import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import Row from '../basic/row';
import Col from '../basic/col';
import MCell from './MCell';
import SvgIcon from 'SvgIcon';
import { getPredicateValue } from '../../helpers/util'

export default class TableTouch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pagination: { total: 0, current: 0, pageSize: 0 },
    };
    // showCheckBox 是否显示选择框  showRowNo 是否显示行号
    //是否单选 isPagination 是否分页
    this.GridProps = {
      showRowNo: true,
      showCheckBox: false,
      isPagination: false,
    };
    this.dataList = [];/*grid数据*/
    this.columns = {};/*grid栏目数据*/
    this.ColIndexs = {};/*key与number对照*/
    this.headerHeight = 40;
    this.rowheight = props.rowHeight || 40;
    this.showRows = 0;
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
      /*表格高度*/
      let height = this.props.height ? this.props.height : 1020;
      let bodyHeight = height - this.headerHeight;
      let pageIndex = Math.ceil(bodyHeight / this.rowheight / 10);
      this.showRows = Math.ceil(bodyHeight / this.rowheight);
      let pageSize = pageIndex * 10;
      this.props.model.setPageSize(pageSize);

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
    if (params.cellState)
      this.cellState = params.cellState;

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
          params.columns[attr].iColWidth = parseFloat(params.columns[attr].iColWidth * 3 / 4);
        }
      }
      hasColumn = true;
      if (index === 0)
        tmp_ColIndexs[attr] = 0;
      else
        tmp_ColIndexs[attr] = index;
      index = index + 1;
    }
    if (params.pageInfo) this.setPageInfo(params.pageInfo);
    this.GridProps.showRowNo = params.showRowNo;//是否显示行号
    this.GridProps.showCheckBox = params.showCheckBox;//是否显示复选框
    this.GridProps.isRadio = !params.multiple;//是否单选
    this.ColIndexs = tmp_ColIndexs;//栏目与index对照
    if (hasColumn) {
      this.columns = params.columns;
      if (params.rows && params.rows.length > 0) this.dataList = params.rows;
      //初始化单元格状态
      this._InitCellStatus(params.columns, params.rows);
      let columnset = this.RemodelingColumn(params.rows, params.columns);
      this.setState({ columnset });
    }
  }

  //初始化单元格状态
  _InitCellStatus = (Columns, DataSource) => {
    if (DataSource !== undefined) {
      //设置初始单元格编辑状态/行选择初始状态/action状态/单元格状态 disabled/readOnly/style
      let temp_cellState = cb.utils.extend(true, [], this.cellState);
      let length = DataSource.length;
      if (length <= 0) return;
      for (let i = 0; i < length; i++) {
        DataSource[i]._selected = false;
        if (!temp_cellState[i])
          temp_cellState[i] = {};
        for (var attr in Columns) {
          if (!temp_cellState[i][attr])
            temp_cellState[i][attr] = { disabled: false, visible: false, readOnly: false, style: {} };
        }
      }
      this.cellState = temp_cellState;
    }
  }
  //----------------------------------------------接受viewmodeld参数-----------------------------------------------------------------------------------------------
  //接受来自model的column信息
  setColumns = (columns) => {
    let columndata = cb.utils.extend(true, {}, columns)
    for (var attr in columndata) {
      if (isNaN(columndata[attr].iColWidth))
        columndata[attr].iColWidth = 200;
      else
        columndata[attr].iColWidth = parseFloat(columndata[attr].iColWidth * 3 / 4);
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
  //接收来自model的data信息
  setDataSource = (data) => {
    this.dataList = data;
    //初始化单元格状态
    this._InitCellStatus(this.columns, data);
    let columnset = this.RemodelingColumn(data, this.columns);
    this.setState({ columnset });
  }

  //---------------------------------------------组织grid结构----------------------------------------------------------------------------------------------------------------
  //组织column结构
  RemodelingColumn = (dataList, columnState) => {
    let ret = [], columnData = [];
    /*行号*/
    if (this.GridProps.showRowNo) {
      if (!columnState.GridRowNo)
        columnState.GridRowNo = { 'cItemName': 'GridRowNo', 'iColWidth': 50, 'cControlType': 'Input', 'bFixed': '1' };
      columnData.push(columnState.GridRowNo);
    }
    for (var attr in columnState) {
      if (attr != 'GridRowNo') columnData.push(columnState[attr]);
    }
    columnData.map(function (col) {
      let column = this.setColumn(col.cItemName, col);
      ret.push(column);
    }, this);
    return ret;
  }
  //设置column
  setColumn = (attr, col) => {
    var iColWidth = parseFloat(col.iColWidth);
    let width = isNaN(iColWidth) ? 200 : iColWidth;
    let headerCell, headerClassName = '';
    let fiexd = col.bFixed == 1 ? true : false;
    let align = 'left';
    // if (col.iAlign === 1)
    //   align = 'left';
    // else if (col.iAlign === 2)
    //   align = 'center';
    // else
    //   align = 'right';

    headerCell = (
      <Cell className='mobile-header-cell'>
        {/* <div style={{ textAlign: align, width: this.props.width, display: "flex" }} id={col.index}> */}
        <div style={{ "width": width }} id={col.index}>
          <span style={{ width: width }} className="textCol table-header-name">
            {col.cShowCaption}
          </span>
        </div>
      </Cell>
    )
    return (<Column key={attr}
      allowCellsRecycling columnKey={attr}
      header={headerCell} cell={(rowIndex) => this.setCell(rowIndex, col)}
      width={width} align={align} fixed={fiexd} />);
  }
  setCell = (rowIndex, col) => {
    return (<MCell
      dataList={this.dataList} readOnly={true} RowProperty={rowIndex}
      Column={col} model={this.props.model}
      columnsList={this.columns} rowHeight={this.rowheight}
    />);
  }
  //行单击事件
  _onRowClick = (e, index) => {
    if (this.dataList.length == 0 || !this.dataList[index]) return;
    if (!this.GridProps.showCheckBox || this.GridProps.isRadio || this.props.hasAction)
      this.props.model.select(index);
    this.props.model.setFocusedRowIndex(index);
  }
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
    if ((this.showRows + hideRows) == rowCount) {
      let pagination = this.state.pagination;
      let newSize = pagination.current + 1;
      let pageCount = pagination.total / pagination.pageSize;
      pageCount = Math.ceil(pageCount);
      if (newSize > pageCount) return;
      if (this.props.model)
        this.props.model.setPageIndex(pagination.current + 1);
    }
  }
  getEmptyData = () => {
    let data = this.dataList;
    if (data.length) return;
    if (!this.state.showSearch)
      return (
        <div className='eChartMobile-nodata'>
          <SvgIcon type="huanxingtu" />
          <div className='eChartMobile-nodata-text' > 暂时没有数据哦~</div>
        </div>
      )
    else
      return <div className='refer_no_date'></div>
  }
  render() {
    let emptyData = this.getEmptyData();
    return (
      <div className="mobile-grid">
        <Row>
          <Table
            rowHeight={this.rowheight}
            overflowY={'auto'}
            overflowX={'auto'}
            showScrollbarX={false}
            showScrollbarY={false}
            onScrollEnd={this.onScrollEnd}
            // onRowTouchEnd={this.onRowTouchEnd}
            footerHeight={0}
            headerHeight={this.headerHeight || 40}
            rowsCount={this.dataList.length}
            width={this.props.width}
            height={this.props.height}
            isColumnResizing={false}
            onRowClick={this._onRowClick}
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
