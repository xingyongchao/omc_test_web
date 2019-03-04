// import React, { Component } from 'react';
// import { Button, Drawer, Flex } from 'antd-mobile';
// import SvgIcon from 'SvgIcon';
// import * as BasicComponents from '../BasicComponents';
// require('src/mobile/styles/globalCss/filter.css');
// const BasicComponentsMap = {};
// for (var attr in BasicComponents)
//   BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];

// let _self = null;
// export default class VoucherList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       schemeData: [],
//       current: '',
//       schemeName: '',
//       filterModel: [],
//       isReferOpen: false,
//     };
//     this.showFields = new Array();
//     var params = this.props.model.getParams();
//     this.vm = cb.loader.initMetaCommonViewModel(
//       'FilterViewModel',
//       'filterViewModel',
//       { filterId: params.filterId, condition: params.condition, cardKey: params.cardKey },
//       this.props.model,
//       ['filterClick']
//     );
//     this.props.model.on('updateCondition', condition => {
//       if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
//       let flag = true;
//       this.vm.setCache('condition', condition);
//       condition.commonVOs.forEach(a => {
//         var attr = a.itemName;
//         const itemModel = this.vm.get(attr);
//         if (!itemModel) return;
//         itemModel.getFromModel().setValue(a.value1);
//       });
//     });
//   }
//   componentDidMount() {
//     _self = this;
//     if (this.vm)
//       this.vm.addListener(this);
//     if (this.props.model)
//       this.props.model.addListener(this);
//   }
//   componentWillReceiveProps(nextProps) {
//     if (this.props.open != nextProps.open || this.state.open != nextProps.open) {
//       this.setState({ open: nextProps.open })
//     }
//   }
//   // componentDidUpdate() {
//   //   if (this.vm)
//   //     this.vm.addListener(this);
//   // }
//   componentWillUnmount() {
//     this.vm.removeListener(this);
//     if (this.props.model)
//       this.props.model.removeListener(this);
//   }
//   initFilterFields = (args) => {
//     let filterModel = [];
//     let CommonModel = args.filterDetail.CommonModel;
//     let AllFilterModel = args.filterDetail.AllFilterModel;
//     AllFilterModel.forEach(function (eleAll) {
//       CommonModel.forEach(function (eleCommon) {
//         if (eleAll.id && eleCommon.itemId && eleCommon.itemId == eleAll.id) {
//           let tmp = {};
//           Object.assign(tmp, eleAll, eleCommon);
//           filterModel.push(tmp);
//         }
//       }, this);
//     }, this);
//     this.vm.setCache('filterModel', filterModel.length > 0 ? filterModel[0] : null);
//     this.vm.fireEvent('initFilterViewModel', { filterModel: filterModel });
//     this.setState({
//       schemeData: args.schemeData,
//       current: args.current,
//       schemeName: args.schemeName,
//       filterModel: filterModel.sort(function (a, b) { return a.orderId - b.orderId }),
//     });
//     if (this.props.initFilterFields)
//       this.props.initFilterFields();
//   }
//   onOk = () => {
//     if (this.vm) {
//       this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
//       this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
//     }
//     if (this.props.onOk) this.props.onOk();
//   }
//   onReset = () => {
//     if (this.vm)
//       this.vm.get('reset').execute('click');
//     // if (this.props.onOk) this.props.onOk();
//   }
//   getFilterControls = () => {
//     const { filterModel } = this.state;
//     let controls = [];
//     filterModel.map(item => {
//       const ctrlType = item.ctrlType.trim().toLocaleLowerCase();
//       const control = this.getControl(ctrlType, item);
//       if (control)
//         controls.push(
//           <Flex><Flex.Item>{control}</Flex.Item></Flex>
//         )
//     });
//     return (
//       <div className="filter-controls">
//         {controls}
//       </div>
//     )
//   }

//   referStatus(control, isOpen) {
//     if (control != null)
//       this.setState({ referControl: control, isReferOpen: isOpen, isHideFilter: isOpen });
//     else
//       this.setState({ isReferOpen: isOpen, isHideFilter: isOpen });
//   }

//   getControl = (ctrlType, item) => {
//     const model = this.vm.get(item.itemName);
//     if (!model)
//       return;
//     let compareLogic = item.compareLogic;
//     let fromModel = model.getFromDisplayModel() || model.getFromModel();
//     let toModel = model.getToModel();
//     let control = null;
//     const ComName = BasicComponentsMap[ctrlType];
//     if (compareLogic === 'between') {
//       let toModel = model.getFromDisplayModel() || model.getToModel();
//       if (ComName)
//         control = <ComName setHideFilter={this.setHideFilter} model={fromModel} toModel={toModel} title={item.cShowCaption} />;
//       else
//         control = <span>{item.cShowCaption}--{ctrlType}</span>
//     } else if (ctrlType === 'searchbox') {

//     } else {
//       if (ComName) {
//         if (ctrlType === 'refer') {
//           control = <ComName model={fromModel} title={item.cShowCaption} referStatus={this.referStatus.bind(this)} />;
//         }
//         else {
//           control = <ComName model={fromModel} title={item.cShowCaption} />;
//         }
//       }
//       else {
//         control = <span className="bill_list_bm">{item.cShowCaption}--{ctrlType}</span>
//       }
//     }
//     return control;
//   }

//   setHideFilter(bl) {
//     _self.setState({ isHideFilter: bl });
//   }

//   render() {
//     let { referControl, isReferOpen, isHideFilter } = this.state;
//     const control = this.getFilterControls();
//     return <div className="filter-container">
//       {control}
//       <Flex className="filter-footer-button" style={{ display: (!isHideFilter ? 'flex' : 'none') }}>
//         <Flex.Item>
//           <Button onClick={this.onReset}>重置</Button>
//         </Flex.Item>
//         <Flex.Item>
//           <Button onClick={this.onOk}>确定</Button>
//         </Flex.Item>
//       </Flex>
//       <div className='refer_v_drawer' style={{ display: (isReferOpen ? 'block' : 'none') }}>{isReferOpen ? referControl : ''}</div>
//     </div>;
//   }
// }
