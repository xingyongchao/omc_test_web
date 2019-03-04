import React from 'react';
import { Popover } from 'antd';
import * as BasicComponents from '../basic';
import _ from 'lodash';
// 过滤控件
const {Row,Col,Button,Label,Tag2} = BasicComponents;
const BasicComponentsMap = {};
for (var attr in BasicComponents){
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
}
export default class FilterEChart extends React.Component {
  constructor(props) {
    super(props);
    let params = props.model.getParams();
    let filterId = props.config && props.config.filterid || props.config.filterId || params.filterId;
    let cardKey = params.cardKey;
    this.state = {
      filterId: filterId, 
      cardKey: cardKey,  
      current: '', 
      visible:false, 
      filterModel: [] ,
      isInPanel:params.isInPanel||false,
      isInDesign: params.isInDesign || false
    };
    this.vm = cb.loader.initMetaCommonViewModel(
      'FilterViewModel', 'filterViewModel',
      {
        filterId: filterId, condition: params.condition, cardKey: cardKey, isInPanel: this.state.isInPanel,
        isInDesign: this.state.isInDesign, solutionId: params.solutionId, viewid: _.get(props.model.getParams(), 'query.viewid'), 
        bHasNullDate: props.model.getParams().bHasNullDate || false
      },
      this.props.model, ['filterClick']
    );
    this.props.model.on('updateCondition', condition => {
      if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
      let flag = true;
      this.vm.setCache('condition', condition);
      condition.commonVOs.forEach(a => {
        var attr = a.itemName;
        const itemModel = this.vm.get(attr);
        if (!itemModel) return;
        itemModel.getFromModel().setValue(a.value1);
        const ctrlType = itemModel.getState('ctrlType');
        if (ctrlType && ctrlType.trim().toLocaleLowerCase() === 'tagbutton'){flag = false}
      });
      if (flag){this.SearchEvent()}
    });
    this.props.model.on('eChartPanel_GetCondition', () => {this.SearchEvent()});
  }
  componentDidMount() {if (this.vm) {this.vm.addListener(this)}}
  componentDidUpdate() {this.props.model.execute('filterHeightUpdate')}
  componentWillUnmount() {this.vm.removeListener(this)}
  Tag2Clicked = () => {this.SearchEvent()}
  initFilterFields(args) {
    let filterModel = [];
    const {CommonModel,AllFilterModel} = args.filterDetail;
    AllFilterModel.forEach( (eleAll)=> {
      CommonModel.forEach( (eleCommon) => {
        if (eleAll.id && eleCommon.itemId && eleCommon.itemId == eleAll.id) {
          filterModel.push(Object.assign({}, eleAll, eleCommon));
        }
      });
    });
    this.vm.fireEvent('initFilterViewModel', { filterModel: filterModel });
    filterModel = filterModel.sort((a, b) => { return a.orderId - b.orderId })
    this.setState({current: args.current, filterModel:filterModel });
   }
  SearchEvent() {
    if (this.vm) {
      this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
      this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
    }
    this.setState({visible:false})
  }
  getControls(ele,isShowCaption) {
    let control = null;let filterVMField = null;
    const ctrlType = ele.ctrlType.trim().toLocaleLowerCase();
    if (ele.isCommon == 1 || ele.isCommon == true) {
      const ComName = BasicComponentsMap[ctrlType];
      switch (ctrlType){
        case "tagbutton":
        if (ele.autoFlt == true) {
          filterVMField = this.vm.get(ele.itemName);
          let fromModel = filterVMField.getFromModel();
          control = (
            <Col key={ele.itemName} span={24}>
              <Tag2 TagTitle={!isShowCaption && ele.cShowCaption} TagData={ele.enumString} TagCanMultSel={ele.multSelect != 0} TagClicked={this.Tag2Clicked} model={fromModel}> </Tag2>
            </Col>
          );
        }
        break;
        case "predicatedatepicker":
          const model = this.vm.get(ele.itemName).getFromModel();
          control = <ComName model={model} key={ele.itemName} cShowCaption={!isShowCaption && ele.cShowCaption} isInPanel={this.state.isInPanel} />
        break;
        default:
          let config = null;
          try {config = JSON.parse(ele.extendField)} catch (e) {config = {}}
          filterVMField = this.vm.get(ele.itemName);
          if (!!filterVMField){
            let compareLogic = ele.compareLogic;
            let fromModel = filterVMField.getFromDisplayModel() || filterVMField.getFromModel();
            let toModel = filterVMField.getToModel();
            let ctrlType = ele.ctrlType ? ele.ctrlType.trim().toLocaleLowerCase() : 'input';
            control = compareLogic === 'between' ? <div className="Test-time-two" key={ele.itemName}>
              <Col span={11}>{this.getComponent(ComName, fromModel, config, ctrlType, ele,isShowCaption)}</Col>
              <Col span={2} className="sp-range-txt"><span>至</span></Col>
              <Col span={11}>{this.getComponent(ComName, toModel, config, ctrlType, ele,isShowCaption)}</Col>
            </div> : this.getComponent(ComName, fromModel, config, ctrlType, ele,isShowCaption)
          }
      }
    }
    return control;
  }
  getComponent(ComName, model, config, ctrlType, ele,isShowCaption) {
    return ComName ? <ComName model={model} key={ele.itemName} placeholder={isShowCaption && '请选择'+ele.cShowCaption} cShowCaption={!isShowCaption && ele.cShowCaption} {...config} /> : <h1 key={ele.itemName}>{ctrlType}</h1>;
  }
  showModal = () => {this.setState({visible: true })}
  handleCancel = () => {this.setState({visible: false})}
  footerContent(){
    return <div className='popover-filter-footer'>
      <Button type="default" onClick={this.handleCancel}>取消</Button>
      {!this.props.autoExpand ? <Button type="primary" onClick={(e) => this.SearchEvent()}>搜索</Button> : null}
    </div>
  }
  getContent(controls,filterModel){
    let modelFooter = this.footerContent();
    return <div className="col-float" style={{width: "100%"}}>
      <div className='popover-filter-list'>
        {
          controls.length ? controls.map((val,index)=>{
            const ctrlType = filterModel[index].ctrlType.trim().toLocaleLowerCase();
            return ctrlType=="predicatedatepicker" ? (<div className="viewCell width-percent-100">{val}</div>):(<div className="viewCell width-percent-50">{val}</div>)
          }) : null 
        }
      </div>
      {modelFooter}
    </div>
  }
  render() {
    let {filterModel,visible} = this.state;
    let controls = filterModel.length ? filterModel.map(ele=>this.getControls(ele)) : []; 
    let _filterModel = _.cloneDeep(filterModel);
    _filterModel = _filterModel.slice(0,2);
    let showControls = _filterModel.length ? _filterModel.map(ele=>this.getControls(ele,true)) : null;
    let content  = this.getContent(controls,filterModel)
    return <div className='filter-inDesktop'>
      {showControls}
      <Popover content={content} trigger="click" onCancel={this.handleCancel} visible={visible} overlayClassName={'filter-container-inDesktop'}>
        <Button type="ghost" onClick={this.showModal} >···</Button>
      </Popover>
    </div>
  }
};