import React, { Component } from 'react';
import { Button, Popover, Icon } from 'antd-mobile';
import SvgIcon from 'SvgIcon';
import NavBar from '../NavBar';
import SearchBox from '../BasicComponents/searchbox'
import TagButton from '../BasicComponents/tagbutton'
import _ from 'lodash'

export default class VoucherList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bHasData: props.bHasData
    };
    this.filterFirstControl = null;
    this.hasSearchBox = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.bHasData != this.state.bHasData)
      this.setState({ 'bHasData': nextProps.bHasData })
  }
  getTitle = () => {
    return this.props.title;
  }
  showFilter = () => {
    if (this.props.showFilter) this.props.showFilter();
  }
  getRightContent = () => {
    let control, toolbar, buttons = [];
    if (this.state.isEdit)
      return <span className="complete" onClick={this.onComplete}>完成</span>
    buttons.push(
      <span className="filter" onClick={this.showFilter}>
        <SvgIcon type='shaixuan' style={{ width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' }} />
      </span>
    )
    if (this.props.hasFilter) {
      const filterViewModel = this.props.viewModel.getCache('FilterViewModel');
      if (filterViewModel && filterViewModel.getCache('filterModel')) {
        this.filterFirstControl = filterViewModel.getCache('filterModel');
      }
      if (this.filterFirstControl) {
        const ctrlType = this.filterFirstControl.ctrlType.toLocaleLowerCase();
        if (ctrlType === 'searchbox') {
          this.hasSearchBox = true;
          buttons.push(
            <span className="sousuo">
              <i onClick={this.switchSearchPanel.bind(this)} className="icon icon-sousuo"></i>
            </span>
          )
        }
      }
    }
    if (this.props.topToolbarMeta) {
      toolbar = this.getToolbar(this.props.topToolbarMeta);
      buttons.push(toolbar);
    }
    control = <div>{buttons}</div>;
    return <div className="mobile-list-header-right">{control}</div>
  }

  onOk = (model, filterModel) => {
    const parentModel = this.props.viewModel;
    if (model)
      // this.props.model.setValue(cval?"":this.state.value, true);
      if (parentModel && model && filterModel)
        filterModel.fireEvent('searchEvent', { model: parentModel, solutionid: this.state.current });
    filterModel.get('search').fireEvent('click', { model: parentModel, solutionid: this.state.current });
  }

  getTagBar = () => {
    let control,cacheFilterModel;
    const filterViewModel = this.props.viewModel.getCache('FilterViewModel');
    if (filterViewModel && filterViewModel.getCache('cacheFilterModel')) {
      cacheFilterModel = filterViewModel.getCache('cacheFilterModel');
    }
    this.filterFirstControl = cacheFilterModel && _.find(cacheFilterModel,(o)=>{
      let ctrlType = o.ctrlType.toLocaleLowerCase()
      if(ctrlType === 'tagbutton'){
        return o;
      }
    })
    if (this.filterFirstControl) {
      const ctrlType = this.filterFirstControl.ctrlType.toLocaleLowerCase();
      if (ctrlType === 'tagbutton' && filterViewModel.get(this.filterFirstControl.itemName)) {
        if(!this.hasTagButton){
          this.hasTagButton = true;
          this.props.tagBarStatus(this.hasTagButton);
        }
        let filterModel = filterViewModel.get(this.filterFirstControl.itemName);
        let fmodel = filterModel.getFromDisplayModel() || filterModel.getFromModel();
        return <div className='list_head_tag'><TagButton model={fmodel} TagClicked={() => this.onOk(fmodel, filterViewModel)} title={this.filterFirstControl.cShowCaption} /></div>;
      }
    }
    return null;
  }

  getToolbar = (toolbarMeta) => {
    const controls = toolbarMeta.controls;
    if (!controls) return null;
    let showButtons = [];
    controls.map(control => {
      const controlKey = control.cItemName;
      let controlModel = this.props.viewModel.get(controlKey);
      showButtons.push(
        <span className={controlKey} onClick={e => this.onToolbarClick(e, controlModel)}>
          <SvgIcon type={control.icon == "plus" ? "xinzeng" : control.icon} style={{ width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' }} />
        </span>
      )
    });
    if (this.props.hasBatchToolbar && this.state.bHasData)
      showButtons.push(
        <span className="edit" onClick={this.onEdit} >
          <SvgIcon type="bianji1" style={{ width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' }} />
        </span>
      )
    return showButtons
  }
  onToolbarClick = (e, model) => {
    model.fireEvent('click')
  }
  onEdit = () => {
    if (this.props.onEdit)
      this.props.onEdit(true);
    this.setState({ isEdit: true });
  }
  onComplete = () => {
    if (this.props.onEdit)
      this.props.onEdit(false);
    this.setState({ isEdit: false });
  }
  switchSearchPanel() {
    this.setState({ searchStatus: true });
    setTimeout(function () {
      this.refs.cusSearchBarRef.refs.cusSearchBarRef.focus();
    }.bind(this), 200);
  }

  onCancel() {
    this.setState({ searchStatus: false });
  }

  getHeaderContent = () => {
    const filterViewModel = this.props.viewModel.getCache('FilterViewModel');
    if (filterViewModel && filterViewModel.getCache('filterModel')) {
      this.filterFirstControl = filterViewModel.getCache('filterModel');
    }
    const title = this.getTitle();
    const rightContent = this.getRightContent();
    const tagBar = this.getTagBar();
    const { searchStatus } = this.state;
    let control = null;
    if (this.filterFirstControl && this.filterFirstControl.ctrlType === 'SearchBox' && searchStatus) {  //searchbox
      //filterViewModel.get('search')
      let model = filterViewModel.get(this.filterFirstControl.itemName);
      let fromModel = model.getFromDisplayModel() || model.getFromModel();
      control = <SearchBox focus ref={'cusSearchBarRef'} onCancel={this.onCancel.bind(this)} parentModel={this.props.viewModel} placeholder={this.filterFirstControl.itemTitle} filterModel={filterViewModel} model={fromModel} title={title} />
    } else {
      control = <NavBar title={title} rightContent={rightContent} />
    }
    return <div className='voucherlist_head'>{control}{tagBar}</div>;
  }

  render() {
    const headerContent = this.getHeaderContent();
    return headerContent;
  }
}
