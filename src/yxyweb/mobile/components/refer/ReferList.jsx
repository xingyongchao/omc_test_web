import React, { Component } from 'react';
import ListView from '../BasicComponents/listview'
import { Button } from 'antd-mobile';
import { debug } from 'util';
export default class ReferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndexes: []
    }
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }

  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  setListenerState(params) {
    let fields = [];
    _.forEach(params.columns, (item, attr) => {
      if (!this.dblClickItemName && item.bJointQuery) this.dblClickItemName = attr;
      fields.push(attr);
    });
    this.setState({ "columns": params.columns, "fields": fields, "multiple": params.multiple });
  }

  setDataSource(data) {
    this.setState({ dataSource: data, isLoading: false, refreshing: false });
  }
  select(selectIndexes) {
    this.setState({ selectIndexes });
  }
  unselect(indexes) {
    let unSelectIndex = indexes[0];
    let selectIndexes = this.state.selectIndexes;
    selectIndexes && selectIndexes.map((selectIndex, index) => {
      if (unSelectIndex == selectIndex) selectIndexes.splice(index, 1);
    });
    this.setState({ selectIndexes });
  }
  setPageInfo(pageInfo) {
    this.setState({ pageInfo });
  }

  handleRowClick(e, rowId) {
    this.SelectChange(rowId);
    if (!this.state.multiple)
      this.props.okClick();
  }
  onOkClick = () => {
    this.props.okClick();
  }
  //监听选择
  SelectChange = (rowId) => {
    let selectIndexes = this.state.selectIndexes;
    let checked = true;
    selectIndexes && selectIndexes.map(index => {
      if (rowId == index) checked = false;
    })
    let all = false;
    if (!this.state.multiple) all = true;
    if (checked) {
      if (all) {
        this.props.model.select([rowId], all);
      } else {
        this.props.model.select(rowId, all);
      }
    } else {
      this.props.model.unselect(rowId);
    }
  }
  loadMore = () => {
    const { pageCount, pageIndex } = this.state.pageInfo;
    if (pageCount == pageIndex) return;
    this.setState({ isLoading: true });
    this.props.model.setPageIndex(pageIndex + 1);
  }

  refreshList = () => {
    this.setState({ refreshing: true });
    this.props.model.execute('refresh');
  }

  render() {
    if (!this.state) {
      return null;
    }
    let { fields, columns, isLoading, refreshing, dataSource } = this.state;
    let className = "billing-cz";
    if (columns && columns.code && columns.code.cDataSourceName) {
      className = columns.code.cDataSourceName.replace(/\.+/g, '_') + " " + className;
    }
    let height = this.props.height;
    if (this.state.multiple)
      height = height - 60;
    return (
      <div className={className} >
        <ListView key="referListView" selectIndexes={this.state.selectIndexes} height={height} pageSize={20} fields={fields} listType="refer" cRefType={this.props.cRefType}
          onRowClick={this.handleRowClick.bind(this)} refreshList={this.refreshList}
          columns={columns} loadMore={this.loadMore.bind(this)} isLoading={isLoading}
          refreshing={refreshing} dataSource={dataSource} pageInfo={this.state.pageInfo} />
        <div className="button-fixed-bottom">
          {this.state.multiple ? <Button type="primary" onClick={this.onOkClick}>确定</Button> : null}
        </div>
      </div>);
  }

}
