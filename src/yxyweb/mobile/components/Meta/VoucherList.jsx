import React, { Component } from 'react';
import { Button, Drawer } from 'antd-mobile';
import SvgIcon from 'SvgIcon';
import ScrollList from './ScrollList';
import NavBar from '../NavBar';
import ListHeader from './ListHeader';
// import ListFilter from './ListFilter';
import MobileFilter from 'yxyweb/common/components/echart/MobileReport/mobileFilter'
import addEventListener from 'rc-util/lib/Dom/addEventListener';

export default class VoucherList extends Component {
  constructor(props) {
    super(props);
    cb.utils.setStatusBarStyle("dark");
    this.state = { openFilter: false, isEdit: false, bHasData: false };
    this.tableMeta = null;
    this.listHeaderMeta = null;
    this.hasFilter = false;

    this.topToolbarMeta = null;
    this.batchToolbarMeta = null;
    this.inRowToolbarMeta = null;
    this.hasBatchToolbar = false;
    const { meta, viewModel } = props;
    this.recursiveContainer(meta);
  }

  componentDidMount() {

  }

  recursiveContainer(container) {
    // if (this.tableMeta) return;
    if (container.containers) {
      container.containers.forEach(item => {
        const containerType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        if (containerType === 'table') {
          this.tableMeta = item;
          this.initTableMeta(item);
        } else if (containerType === 'listheader') {
          this.listHeaderMeta = item;
          this.hasFilter = this.getFilter(item);
        } else if (containerType === 'toolbar') {
          let cStyle = item.cStyle;
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
                this.topToolbarMeta = item;
                break;
              case "batch":
                this.batchToolbarMeta = item;
                this.hasBatchToolbar = true;
                break;
              case "inrow":
                this.inRowToolbarMeta = item;
                break;
            }
          }
        } else {
          this.recursiveContainer(item);
        }
      });
    }
  }
  initTableMeta(gridMeta) {
    this.gridModel = this.props.viewModel.get(gridMeta.childrenField || gridMeta.cCode);
    this.gridModel.setState('override', false);
    const actions = this.inRowToolbarMeta;
    this.gridModel.setCache('actions', actions && actions.controls || []);
  }
  /*是否存在过滤*/
  getFilter = (meta) => {
    let hasFilter = false;
    if (meta.containers) {
      meta.containers.map(item => {
        const containerType = item.cControlType && item.cControlType.trim().toLocaleLowerCase();
        if (containerType == 'convenientquery') {
          hasFilter = true;
          const viewModel = this.props.viewModel;
          const queryItems = viewModel.getCache('queryItems') || [];
          if (queryItems.indexOf('filter') === -1)
            queryItems.push('filter');
          viewModel.setCache('queryItems', queryItems);
          this.filterMeta = item;
        }
      });
    }
    return hasFilter;
  }
  onOpenChange = () => {
    this.setState({ openFilter: !this.state.openFilter });
  }
  onFilterOk = () => {
    this.setState({ openFilter: false });
  }
  onEdit = (isEdit) => {
    this.setState({ isEdit });
  }
  onDataChange = (dataSource) => {
    let bHasData = dataSource.length > 0 ? true : false;
    this.setState({ bHasData });
  }
  initFilterFields = () => {
    this.setState({ openFilter: this.state.openFilter });
  }

  setTagBarStatus=(isShowTagBar)=>{
     this.setState({isShowTagBar});
  }

  render() {
    let { meta, viewModel, width, height, index, returnCallback, homeCallback } = this.props;
    height = parseInt(height) - (window.__fontUnit * 1.7) + 22;
    return (
      this.hasFilter ?
        <div className="mobile-voucherlist">
          <Drawer className="filter-drawer"
            open={this.state.openFilter}
            enableDragHandle={true}
            // sidebar={
            //   <ListFilter
            //     model={viewModel}
            //     onOk={this.onFilterOk}
            //     initFilterFields={this.initFilterFields}
            //   />
            // }
            sidebar={
              <MobileFilter
                model={viewModel}
                onOk={this.onFilterOk}
                initFilterFields={this.initFilterFields}
                filterType={"list"}
              />
            }
            position='right'
            onOpenChange={this.onOpenChange}
          >
            <ListHeader tagBarStatus={this.setTagBarStatus} bHasData={this.state.bHasData} hasBatchToolbar={this.hasBatchToolbar} topToolbarMeta={this.topToolbarMeta}
              meta={this.listHeaderMeta} hasFilter={true} viewModel={viewModel} onEdit={this.onEdit}
              title={meta.cTemplateTitle} showFilter={() => this.setState({ openFilter: true })} />
            <ScrollList
              isEdit={this.state.isEdit} isHaveTagBar={this.state.isShowTagBar} onDataChange={this.onDataChange} batchToolbarMeta={this.batchToolbarMeta} meta={this.tableMeta}
              inRowToolbarMeta={this.inRowToolbarMeta} height={height} viewModel={viewModel}
            />
          </Drawer>
        </div>
        :
        <div className="mobile-voucherlist">
          <ListHeader tagBarStatus={this.setTagBarStatus} bHasData={this.state.bHasData} hasBatchToolbar={this.hasBatchToolbar} topToolbarMeta={this.topToolbarMeta}
            meta={this.listHeaderMeta} viewModel={viewModel} title={meta.cTemplateTitle} />
          <ScrollList isHaveTagBar={this.state.isShowTagBar} onDataChange={this.onDataChange}
            isEdit={this.state.isEdit} batchToolbarMeta={this.batchToolbarMeta} meta={this.tableMeta}
            inRowToolbarMeta={this.inRowToolbarMeta} height={height} viewModel={viewModel}
          />
        </div>
    );
  }
}
