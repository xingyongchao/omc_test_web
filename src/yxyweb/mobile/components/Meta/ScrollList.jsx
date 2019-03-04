import React, { Component } from 'react';
import { Checkbox } from 'antd-mobile';
import ListView from '../BasicComponents/listview';
import _ from 'lodash';
import SvgIcon from 'SvgIcon';
import Button from '../BasicComponents/button';
const CheckboxItem = Checkbox.CheckboxItem;

export default class ScrollList extends Component {
  constructor(props) {
    super(props);
    const { meta, viewModel } = props;
    const columns = {};
    if (meta.controls) {
      meta.controls.forEach(column => {
        columns[column.cItemName] = column;
      });
    }
    const model = viewModel.get(meta.childrenField || meta.cCode);
    model.setState('override', false);
    let cStyle = meta.cStyle;
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
          meta.containers.map(container => {
            if (container.controls) {
              columns[container.cGroupCode] = {};
              container.controls.forEach(column => {
                columns[[container.cGroupCode]][column.cItemName] = column;
              });
            }
          });
        }
      }
    } catch (e) {
      cb.utils.alert('格式化字段，预制错误！', 'error');
    }
    this.state = {
      columns,
      model,
      cStyle,
      isLoading: true,
      refreshing: false,
      dataSource: [],
      isFirstLoading: true,
    };
    this.actionState = {};
  }
  componentDidMount() {
    this.state.model.addListener(this);
  }
  setListenerState(params) {
    let columns = this.state.columns;
    if (params.columnMode === 'local' && columns) {
      for (var attr in columns)
        Object.assign(columns[attr], params.columns[attr]);
      params.columns = columns;
    }

    _.forEach(params.columns, (item, attr) => {
      if (!this.dblClickItemName && item.bJointQuery) this.dblClickItemName = attr;
    });
    this.setState({ columns: params.columns });
  }
  setDataSource(data) {
    this.initList(this.state.columns, data);
    if (this.props.onDataChange) this.props.onDataChange(data)

    this.setState({ dataSource: data, isLoading: false, refreshing: false, isFirstLoading: false });
  }
  initList = (columns, dataSource) => {
    let inRowToolbarMeta = this.props.inRowToolbarMeta;
    if (!inRowToolbarMeta) return;
    let controls = inRowToolbarMeta.controls;
    let temp_actionState = cb.utils.extend(true, {}, this.actionState);
    dataSource.map((row, index) => {
      let _id = row._id;
      if (!temp_actionState[_id])
        temp_actionState[_id] = {};
      controls.map(action => {
        if (!temp_actionState[_id][action.cItemName])
          temp_actionState[_id][action.cItemName] = { visible: true };
      });
    });
    this.actionState = temp_actionState;
  }
  setPageInfo(pageInfo) {
    this.setState({ pageInfo });
  }
  select() {
    this.setState({ selectAll: this.state.selectAll });
  }
  unselect() {
    this.setState({ selectAll: this.state.selectAll });
  }
  selectAll() {
    this.setState({ selectAll: true });
  }
  unselectAll() {
    this.setState({ selectAll: false });
  }
  setActionState = (data) => {
    let row = this.state.dataSource[data.rowIndex];
    let actionState = this.actionState;
    actionState[row._id][data.itemName][data.name] = data.value;
    this.setState({ selectAll: this.state.selectAll });
  }
  setActionsState = (data) => {
    this.state.dataSource.map((row, index) => {
      this.actionState[row._id] = data[index];
    })
    this.setState({ selectAll: this.state.selectAll });
  }
  loadMore = () => {
    const { pageCount, pageIndex } = this.state.pageInfo;
    if (pageCount == pageIndex) return;
    this.setState({ isLoading: true });
    this.state.model.setPageIndex(pageIndex + 1);
  }
  refreshList = () => {
    this.setState({ refreshing: true });
    this.props.viewModel.execute('refresh');;
  }
  handleRowClick = (e, rowIndex) => {
    this.state.model.execute('dblClick', this.state.dataSource[rowIndex]);
    // this.state.model.execute('cellJointQuery', { rowIndex, cellName: this.dblClickItemName });
  }
  //返回到顶部事件
  returnTop = () => {
    if (this.lv) {
      this.setState({ isShowRTop: false });
      this.lv.lv.scrollTo(0, 0);
      this.lv.lv.scrollTo(0, 0);
    }
  }
  showRTop = () => {
    this.setState({ isShowRTop: true });
  }
  onSelectAll = (e) => {
    let checked = e.target.checked;
    if (checked)
      this.state.model.selectAll();
    else
      this.state.model.unselectAll();
  }
  onRowSelect = (checked, rowID) => {
    if (checked)
      this.state.model.select(rowID, false);
    else
      this.state.model.unselect(rowID);
  }
  onRowActionClick = (cItemName, rowIndex) => {
    let params = { index: rowIndex, cItemName: cItemName }
    this.props.viewModel.get(cItemName).fireEvent('click', params);
  }
  getBatchToolbar = () => {
    if (!this.props.isEdit) return null;
    let meta = this.props.batchToolbarMeta;
    let controls = meta.controls || [];
    let toolbars = [];
    controls.map(control => {
      let model = this.props.viewModel.get(control.cItemName);
      toolbars.push(
        <Button model={model} />
      )
    });
    return (
      <div className="batch-toolbar">
        <div className="batch-toolbar-checkbox">
          <CheckboxItem checked={this.state.selectAll} onChange={e => this.onSelectAll(e)} >全选</CheckboxItem>
        </div>
        <div className="batch-toolbar-button">{toolbars}</div>
      </div>
    )
  }
  render() {
    const { cStyle, columns, isLoading, refreshing, dataSource, isShowRTop, isFirstLoading } = this.state;
    let height = document.documentElement.offsetHeight - (window.__fontUnit * 1.28) + 22;
    let batchToolbar = this.getBatchToolbar();
    let className = "uretail_list";
    if (this.props.isEdit) className = "edit-list uretail_list";
    let selectIndexes = this.state.model.getSelectedRowIndexes();
    if (this.props.isEdit) height = height - 40;
    if (this.props.isHaveTagBar) height = height - 65;
    return (
      <div className={className}>
        <ListView  isEdit={this.props.isEdit} onRowSelect={this.onRowSelect} ref={el => this.lv = el}
          showRTop={this.showRTop} key="voucherlistview" height={height} pageInfo={this.state.pageInfo}
          isFirstLoading={isFirstLoading} cStyle={cStyle} onRowClick={this.handleRowClick}
          refreshList={this.refreshList} columns={columns} loadMore={this.loadMore} isLoading={isLoading}
          refreshing={refreshing} dataSource={dataSource} selectIndexes={selectIndexes || []}
          selectAll={this.selectAll} actionState={this.actionState} inRowToolbarMeta={this.props.inRowToolbarMeta} onRowActionClick={this.onRowActionClick} />
        <div className="return-top" style={{ "display": (isShowRTop ? 'block' : 'none') }}
          onClick={this.returnTop}>
          <SvgIcon type="fanhuidingbu" />
        </div>
        {batchToolbar}
      </div>
    );
  }
}
