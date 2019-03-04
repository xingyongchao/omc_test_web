import React, { Component } from 'react';
import { Button, Drawer, Flex } from 'antd-mobile';
import SvgIcon from 'SvgIcon';
import * as BasicComponents from '../../../../mobile/components/BasicComponents';
import * as  eChartCommon from 'yxyweb/common/components/echart/eChartCommon';
require('src/mobile/styles/globalCss/filter.css');
const BasicComponentsMap = {};
for (var attr in BasicComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];

let _self = null;
export default class mobileFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schemeData: [],
      current: '',
      schemeName: '',
      filterModel: [],
      openFilter: false,
      isReferOpen: false,
      referControl: null
    };
    this.filterType = props.filterType;
    this.showFields = new Array();
    // var params = this.props.model.getParams();

  }
  initVM() {
    let self = this;
    var params = self.props.model.getParams();
    let filterId = this.props.filterId || params.filterId;
    if (!this.vm && !!filterId) {
      this.vm = cb.loader.initMetaCommonViewModel(
        'FilterViewModel',
        'filterViewModel',
        {
          filterId: filterId,
          condition: params.condition ? params.condition : null,
          cardKey: this.props.cardKey || params.cardKey,
          viewid: this.filterType == "report" ? (this.props.viewid || params.viewid) : undefined
        },
        this.props.model,
        ['filterClick']
      );
      this.vm.addListener(this);
      this.props.model.on('updateCondition', condition => {
        if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
        let flag = true;
        this.vm.setCache('condition', condition);
        condition.commonVOs.forEach(a => {
          var attr = a.itemName;
          const itemModel = this.vm.get(attr);
          if (!itemModel) return;
          itemModel.getFromModel().setValue(a.value1);
        });
      });
    }
  }
  componentDidMount() {
    _self = this;
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.open != nextProps.open || this.state.open != nextProps.open) {
    //   this.setState({ open: nextProps.open })
    // }
  }
  // componentDidUpdate() {
  //   if (this.vm)
  //     this.vm.addListener(this);
  // }
  componentWillUnmount() {
    this.vm.removeListener(this);
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  initFilterFields = (args) => {
    let filterModel = [];
    let CommonModel = args.filterDetail.CommonModel;
    let AllFilterModel = args.filterDetail.AllFilterModel;
    let cacheFilterModel = [];
    AllFilterModel.forEach(function (eleAll) {
      CommonModel.forEach(function (eleCommon) {
        if (eleAll.id && eleCommon.itemId && eleCommon.itemId == eleAll.id) {
          let tmp = {}, ctrlType = '';
          Object.assign(tmp, eleAll, eleCommon);
          filterModel.push(tmp);
          ctrlType = eleCommon.ctrlType.toLocaleLowerCase();
          if (eleCommon.ctrlType && (ctrlType === 'tagbutton' || ctrlType === 'searchbox')) {
            cacheFilterModel.push(tmp);
          }
        }
      }, this);
    }, this);
    this.vm.setCache('filterModel', filterModel.length > 0 ? filterModel[0] : null);
    this.vm.setCache('cacheFilterModel', cacheFilterModel.length > 0 ? cacheFilterModel : null);
    this.vm.fireEvent('initFilterViewModel', { filterModel: filterModel });
    this.setState({
      schemeData: args.schemeData,
      current: args.current,
      schemeName: args.schemeName,
      filterModel: filterModel.sort(function (a, b) { return a.orderId - b.orderId }),
    });
    if (this.props.initFilterFields)
      this.props.initFilterFields();
  }
  onOk = () => {
    if (this.vm) {
      this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
      this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
    }
    if (this.props.onOk) this.props.onOk();
    this.onOpenChange()
  }
  onReset = () => {
    if (this.vm)
      this.vm.get('reset').execute('click');
    // if (this.props.onOk) this.props.onOk();
  }
  getFilterContent = () => {
    let self = this;
    let { referControl, isReferOpen, isHideFilter } = this.state;
    const { filterModel } = this.state;
    let controls1 = [];
    let controls2 = [];
    let controls3 = [];
    // controls.push(
    //   <Flex className="mobileFilter_Footer_Button " style={{ display: (!isHideFilter ? 'flex' : 'none') }}>
    //     <Flex.Item>
    //       <Button onClick={self.onReset}>重置</Button>
    //     </Flex.Item>
    //     <Flex.Item>
    //       <Button onClick={self.onOk}>确定</Button>
    //     </Flex.Item>
    //   </Flex >
    // );
    let titleContent = [];
    filterModel.map((item, index) => {
      const ctrlType = item.ctrlType.trim().toLocaleLowerCase();
      const control = this.getControl(ctrlType, item);
      if (ctrlType == "predicatedatepicker" && !self.props.viewid) {
        titleContent.push(<span className='mobileFilter_Span1' ><div>{control}</div></span>);
      }
      else {
        if (control)
          controls1.push(
            <Flex><Flex.Item>{control}</Flex.Item></Flex>
          )
      }
    });

    controls2.push(
      <Flex className="mobileFilter_Footer_Button " style={{ display: (!isHideFilter ? 'flex' : 'none') }}>
        <Flex.Item>
          <Button onClick={self.onReset}>重置</Button>
        </Flex.Item>
        <Flex.Item>
          <Button onClick={self.onOk}>确定</Button>
        </Flex.Item>
      </Flex >
    );
    controls3.push(<div className='mobileFilter_Refer' style={{ display: (isReferOpen ? 'block' : 'none') }}>{isReferOpen ? referControl : ''}</div>);

    if (!!this.props.otherTitleContent)
      titleContent.push(<span className='mobileFilter_Span2' ><div>{this.props.otherTitleContent}</div></span>);

    titleContent.push(<span className='mobileFilter_Span3' style={{ display: this.props.viewid ? "none" : "" }}  >
      <div onClick={() => { self.onOpenChange() }}>筛选
    {/* <SvgIcon type="shaixuan1" /> */}
        <i className={"icon icon-shaixuan1"}  ></i>
      </div>
    </span>);
    let sidebar = <div className='mobileFilter_SideBar' >
      <div className='mobileFilter_Controls' >
        {controls1}
      </div>
      <div className='mobileFilter_OkReset' >
        {controls2}
      </div>
      {controls3}
    </div>;
    return (
      <div className="mobileFilter">
        <Drawer className="mobileFilter_Drawer filter-drawer"
          open={self.state.openFilter}
          enableDragHandle={false}
          sidebar={sidebar}
          position='right'
          onOpenChange={self.onOpenChange}
        >
          {self.props.otherContent1}
          <div className="mobileTitleSumData" style={{ width: "100%", height: "auto" }}  >
            {/* <div className="mobileTitleSumData_Scroll" > */}
            <div className={"mobileTitle mobileTitleCount_" + titleContent.length} style={{ display: this.props.isVertical ? "" : "none" }}>
              {titleContent}
            </div>
            {self.props.otherContent2}
            {/* </div> */}
          </div>
        </Drawer>
      </div>
    )



  }

  onOpenChange = () => {
    this.setState({ openFilter: !this.state.openFilter });
  }

  referStatus(control, isOpen) {
    if (control != null)
      this.setState({ referControl: control, isReferOpen: isOpen, isHideFilter: isOpen });
    else
      this.setState({ isReferOpen: isOpen, isHideFilter: isOpen });
  }

  getControl = (ctrlType, item) => {
    const model = this.vm.get(item.itemName);
    if (!model)
      return;
    let compareLogic = item.compareLogic;
    let fromModel = model.getFromDisplayModel() || model.getFromModel();
    let toModel = model.getToModel();
    let control = null;
    const ComName = BasicComponentsMap[ctrlType];
    if (compareLogic === 'between') {
      let toModel = model.getFromDisplayModel() || model.getToModel();
      if (ComName)
        control = <ComName setHideFilter={this.setHideFilter} model={fromModel} toModel={toModel} title={item.cShowCaption} />;
      else
        control = <span>{item.cShowCaption}--{ctrlType}</span>
    } else if (ctrlType === 'searchbox') {

    } else {
      if (ComName) {
        if (ctrlType === 'refer' || ctrlType === 'treerefer') {
          control = <ComName model={fromModel} title={item.cShowCaption} referStatus={this.referStatus.bind(this)} />;
        } else if (ctrlType === 'tagbutton') {
          // control = <ComName model={fromModel} TagClicked = {this.onOk} title={item.cShowCaption} />;
        } else {
          control = <ComName model={fromModel} title={item.cShowCaption} />;
        }
      }
      else {
        control = <span  >{item.cShowCaption}--{ctrlType}</span>
      }
    }
    return control;
  }

  setHideFilter(bl) {
    _self.setState({ isHideFilter: bl });
  }

  getFilterControls = () => {
    const { filterModel } = this.state;
    let controls = [];
    filterModel.map(item => {
      const ctrlType = item.ctrlType.trim().toLocaleLowerCase();
      const control = this.getControl(ctrlType, item);
      if (control)
        controls.push(
          <Flex><Flex.Item>{control}</Flex.Item></Flex>
        )
    });
    return (
      <div className="filter-controls">
        {controls}
      </div>
    )
  }

  render() {
    eChartCommon.LogChartInfo("移动报表 MobileFilter Render ", "", 900);

    this.initVM();
    if (this.filterType == "report") {
      let content = this.getFilterContent();
      return <div >
        {content}
      </div>;
    }
    else //"list"
    {
      let { referControl, isReferOpen, isHideFilter } = this.state;
      const control = this.getFilterControls();
      return <div className="filter-container">
        {control}
        <Flex className="filter-footer-button" style={{ display: (!isHideFilter ? 'flex' : 'none') }}>
          <Flex.Item>
            <Button onClick={this.onReset}>重置</Button>
          </Flex.Item>
          <Flex.Item>
            <Button onClick={this.onOk}>确定</Button>
          </Flex.Item>
        </Flex>
        <div className='refer_v_drawer' style={{ display: (isReferOpen ? 'block' : 'none') }}>{isReferOpen ? referControl : ''}</div>
      </div>;
    }
  }
}
