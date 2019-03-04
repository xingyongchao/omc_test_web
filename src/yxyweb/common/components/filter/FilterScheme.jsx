import React, { Component } from 'react';
import { Popover, Col, Modal, Icon, Button, Checkbox, Radio, Transfer, Select, Row, Input, Tag } from 'antd';
import SvgIcon from 'SvgIcon';
import * as filterredux from '../../redux/filterscheme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as BasicComponents from '../basic';
import FilterDefined from './filterDefined'
import _ from 'lodash'
import { object } from 'prop-types';
let BasicComponentsMap = {},  Solutionitem = {}, commonVOs = [], commonitem = {},commonNewitem = {}, id = null,isCheck;
for (var attr in BasicComponents)
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
class FilterScheme extends Component {
  constructor(props) {
    super(props);
    let User = cb.rest.AppContext.user.authCodes || []
    this.viewModel = new cb.models.ContainerModel({ params: { cardKey: props.cardKey } });
    this.state = {
      mention:false,
      definedVisible:false,
      inMouseitemName: "",
      checked: [],
      IsdefaultValue:0,
      inpValue: '',
      NewList: "",
      sort: "",
      filterId: this.props.filterId,
      modelId: this.props.Id,
      ValueList: [],
      InputValue: "",
      visible: false,
      id: null,
      NewaddChecked: [],
      checkedValue: [],
      copy_checkedValue:[],
      showDele: true,
      checkedValue2:[],
      queryCheckValue:[],
      User:User
    };
  }
  componentWillMount() {
    this.props.filterredux.getSchemeListData(this.state.modelId, this.state.filterId);
    this.props.filterredux.getQueryItem(this.state.modelId, this.state.filterId);
    this.props.filterredux.getCompareLogic(this.state.modelId);
  }
  handleBodyClick = (e) => {
    if(e.target.className == "query-item-button add-query-criteria"){
      if(e.stopPropagation){
      e.stopPropagation();
    }
    }
    document.body.removeEventListener('click', this.handleBodyClick);
  }
  render() {
    if(this.props.filterscheme[this.state.modelId] == undefined) return null
    let type = this.state.visible ? "up" : "down";
    let button = <div style={{ width: "20px", height: "30px" }}> <Icon type={type} /> </div>;
    let schemeList = this.getSchemeListRender();
    let addScheme = this.AddSchemeRender();
    let schemePop = (
      <div >
        <div style={{ marginLeft: 0, clear: 'both', whiteSpace: 'nowrap' }} className="scheme-popover">
        <Popover placement="bottomLeft" overlayStyle={{ width: "236px" }} content={schemeList} trigger={"click"} visible={this.state.visible} onVisibleChange={this.handleVisibleChange.bind(this)}>
        <div className="filter-scheme Grouping-condition">
        <div className="filter-scheme-input Grouping-condition-input" >
        <span className="filter-scheme-span " style={{ cursor: "pointer" }} >{this.props.filterscheme[this.state.modelId].currentName}</span>
        {button}
        </div>
        </div>
        </Popover>
        </div>
      </div>
    );
    return (<div className="scheme-list">{schemePop}{addScheme}</div>);
  }
  handleVisibleChange(){
    commonVOs = [];
    this.setState({ visible: !this.state.visible,definedVisible:false,checkedValue2:[],checkedValue:[]});
  }
  getSchemeListRender() {
    let schemeList = this.props.filterscheme[this.state.modelId].schemeList;
    let currentId = this.props.filterscheme[this.state.modelId].currentId;
    let showDele = this.state.showDele;
    let {User} = this.state
    let renderList = [];
    let filteradd = null;
    if (schemeList && schemeList.length > 0) {
      schemeList.forEach(function (element, index) {
        let item;
        let isChecked = element.id == currentId ? true : false;
        let itemChecked = isChecked ? <span className="groupCondition-Checked" ><i className="anticon icon-xuanzhong1" checked={isChecked}></i>  </span > : <span className="groupCondition-Checked" ></span >;
        let isDefault = element.isDefault ? element.isDefault : false;
        let itemDefault = isDefault ? <span className="groupCondition-Default"> <span className="crossdefault-btn">默认</span>  </span> : <span className="groupCondition-Default"></span>;
        let isMouseEnter = element.isMouseEnter ? element.isMouseEnter : false;
        let itemEnter = isMouseEnter ?
          <span className="groupCondition-MouseEnter">{isDefault ? null : <span className="stopclose" onClick={(e) => this.setDefaultScheme(element.id, e)}>设为默认</span>}
          <span onClick={() => this.editSchemeInfo(element.id)}>设置</span>
          <span className="Noclose" onClick={() => this.deleteScheme(element.id,this.state.filterId)} style={{ display: showDele == true ? 'inline' : 'none' }}>删除</span>
          </span> : <span className="groupCondition-MouseEnter"></span  >;
          item = (<Row key={index} style={{ minHeight: "25px" }} onMouseEnter={(e) => this.IsEnterSchemeitem(true, e, element.id)} onMouseLeave={(e) => this.IsEnterSchemeitem(false, e, element.id)}>
            {itemChecked}
            <span style={{ cursor: "pointer" }} onClick={() => this.chooseScheme(element.id)}> {element.solutionName ? element.solutionName : element.id}</span>
            {itemDefault}
            {itemEnter}
          </Row>
        )
        renderList.push(item);
      }, this);
    }
    if(User.indexOf("userdef_filter")>-1){
      filteradd = <div className="defined_button" onClick={()=>this.openDefined()}>自定义过滤条件</div>
    }
    else{filteradd = null;}
    return (
      <div className="scheme-List group-add-grouping-count defined-filterItem" style={{paddingBottom:60}}>
        <div className="scheme-List-content" style={{ overflow: "auto", maxHeight: "258px", paddingBottom: "2px" }}>{renderList}</div>
        <div className="add-scheme group-add-grouping" style={{height:76}}>
        <div className="add-scheme-button" onClick={() => this.AddScheme()} style={{ cursor: "pointer" }}><SvgIcon type="plus" />新增方案</div>
        {filteradd}
        </div>
      </div>
    );
  }
  openDefined(){
   this.handleVisibleChange()
    this.setState({definedVisible:true})
  }
  IsEnterSchemeitem(bEnter, e, id) {
    let self = this;
    this.props.filterredux.IsEnterSchemeitem(bEnter, id,this.state.modelId);
    let schemeList = this.props.filterscheme[this.state.modelId].schemeList;
    if(schemeList&&schemeList.length>0){
      schemeList.forEach(function(ele,index){
      let isDefault = ele.isDefault;
        if(id == ele.id){
          if(isDefault){self.setState({showDele:false})}
          else{self.setState({showDele:true})}
        }
      })
    }
  }
  setDefaultScheme(defaultid, e) {
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.stopPropagation();
    this.props.filterredux.setDefaultScheme(defaultid, this.state.filterId,this.state.modelId,this.props.schemeListChange);
  }
  triggerReferBrowse(referModel) {
    if (!referModel) return;
    var referValue = referModel.getValue();
    if (!referValue) return;
    referModel.browse(false, function (vm) {
      vm.on('getRefMetaReady', function () {
        var condition = {
          'isExtend': true,
          simpleVOs: [{ field: 'id', op: 'in', value1: referValue.split(',') }]
        };
        vm.execute('pressEnter', { model: referModel, condition: condition, browse: false });
      });
    });
  }
  editSchemeInfo(id) {
    commonVOs = [];
    this.setState({ visible: !this.state.visible ,mention:false})
    this.props.filterredux.AddScheme(!this.props.filterscheme[this.state.modelId].bAddscheme,this.state.modelId);
    if (!this.props.filterscheme[this.state.modelId].bEdit) { this.props.filterredux.Isedit(!this.props.filterscheme[this.state.modelId].bEdit,this.state.modelId); }
    if(this.props.filterscheme[this.state.modelId].isdefault){this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault,this.state.modelId);}
    if(this.props.filterscheme[this.state.modelId].queryVisible){ this.props.filterredux.openQuerylist(false,this.state.modelId);}
    this.props.filterredux.editSchemeInfo(id, (editSchemeitem) => {
      let AllFilterModel = editSchemeitem.AllFilterModel;
      let queryCheckValue = editSchemeitem.CommonModel;
      let InputValue = editSchemeitem.solutionName;
      let IsdefaultValue = editSchemeitem.isDefault;
      let ID = editSchemeitem.id
      if (IsdefaultValue) { this.props.filterredux.IsDefault(true,this.state.modelId); }
      queryCheckValue.forEach((element) => {
        let _index =  _.findIndex(AllFilterModel, (obj) => {
          return obj.id === element.itemId
        })
        element.displayname = AllFilterModel[_index].displayname || null;
         element.enumArray = AllFilterModel[_index].enumArray || null;
        const { itemName, compareLogic,itemId, ctrlType, value1, value2, displayname, multSelect, refReturn, cRefType, enumArray} = element;
        const filterVMField = new cb.models.FilterModel({
          compareLogic,
          ctrlType: ctrlType,
          value1: value1,
          value2: value2,
          displayname,
          multSelect,
          refReturn,
          cRefType: cRefType,
          enumArray
        });
        this.viewModel.addProperty(itemName, filterVMField);
        const lowerCtrlType = ctrlType && ctrlType.trim().toLocaleLowerCase();
        if (lowerCtrlType === 'refer' || lowerCtrlType === 'treerefer' || lowerCtrlType === 'listrefer') {
            this.triggerReferBrowse(filterVMField.getFromModel());
            this.triggerReferBrowse(filterVMField.getToModel());
        }
      })
      let checkedValue=[];
      for (let j = 0; j < queryCheckValue.length; j++) {
        let Id = queryCheckValue[j].itemId;
        checkedValue.push(Id);
      }
      let checkedValue2 = [].concat(checkedValue)
      let copy_queryCheckValue = [].concat(queryCheckValue)
      this.setState({queryCheckValue:copy_queryCheckValue, ValueList:queryCheckValue, InputValue: InputValue, id: ID,checkedValue,checkedValue2,inMouseitemName:"",IsdefaultValue:IsdefaultValue});
    },this.state.modelId);
  }
  deleteScheme(id,filtersId) {
    let self = this;
    this.props.filterredux.deleteScheme(id,filtersId,this.props.schemeListChange,this.state.modelId);
    let currentId = this.props.filterscheme[this.state.modelId].currentId;
    let schemeList = this.props.filterscheme[this.state.modelId].schemeList;
    if(currentId == id){
      schemeList.forEach(function(ele,index){
        if(ele.isDefault == 1){
          self.props.filterredux.chooseScheme(ele.id,self.state.modelId);
          self.props.schemeChange(ele.id)
        }
      })
    }
  }
  chooseScheme(id) {
    this.props.filterredux.chooseScheme(id,this.state.modelId);
    this.props.schemeChange(id)
    this.setState({visible:!this.state.visible})
  }
  AddqueryItems() {
    return (<div className="query-button">
        <div className="query-item-button add-query-criteria" onClick={(e)=>this.openQuerylist(e)}><SvgIcon type="plus" />添加查询条件</div>
        <Button type={"default"} className="cancelScheme" onClick={() => this.CloseAddScheme()}>取消</Button>
        <Button type={"primary"} className="confirmScheme" onClick={() => this.SaveSolution()}>确认</Button>
        </div>
    )
  }
  SaveSolution() {
    let Data = this.viewModel.collectData(true);
    let DataValue = {};
    let rangeInput;
    this.setState({visible:false})
    if (this.props.filterscheme[this.state.modelId].isdefault) { isCheck = 1;}
    else { isCheck = 0; }
    let commonList=[];
    for (let i = 0; i < commonVOs.length; i++) {
      let name = commonVOs[i].itemName;
      if (name in Data) {
        DataValue = Data[name];
        let dataLength = Object.keys(DataValue);
        if(dataLength.length > 1){rangeInput = 1;}
        else{rangeInput = 0}
        if((DataValue.value1 instanceof Array) || (DataValue.value2 instanceof Array)){
          (DataValue.value1=DataValue.value1.join(",")) || (DataValue.value2 = DataValue.value2.join(","))
        }
        let itemId = commonVOs[i].itemId;
        let orderId = commonVOs[i].orderId;
        let id = commonVOs[i].id;
        let compareLogic = commonVOs[i].compareLogic
        commonNewitem = {
          "itemId": itemId,
          "orderId": orderId,
          "id": id,
          "compareLogic":compareLogic,
          "rangeInput":rangeInput
        }
        Object.assign(commonNewitem, DataValue);
      }
      commonList.push(commonNewitem)
      let hash = {};
      commonList = commonList.reduce(function (item, next) {
        hash[next.itemId] ? '' : hash[next.itemId] = true && item.push(next);
        return item
      }, [])
    }
    Solutionitem = {
      "solutionName": this.state.InputValue,
      "isDefault": isCheck,
      "filtersId": this.state.filterId,
      "id": this.state.id,
      "commonVOs": commonList,
    }
    let filtersId = this.state.filterId;
    if (this.state.InputValue) { this.props.filterredux.ToSolution(Solutionitem, filtersId, this.props.schemeListChange,this.state.modelId)}
    else { this.setState({mention:true})}
  }
  openQuerylist=(e)=>{
    let schemeList = this.props.filterscheme[this.state.modelId].schemeList;
    let queryList = this.props.filterscheme[this.state.modelId].queryList;
    // this.props.filterredux.getCompareLogic(this.state.modelId,schemeList,queryList);
    document.body.addEventListener('click', this.handleBodyClick);
    if( this.props.filterscheme[this.state.modelId].queryVisible == false){
      this.props.filterredux.openQuerylist(!this.props.filterscheme[this.state.modelId].queryVisible,this.state.modelId);
    }
  }
  QueryItem() {
    this.props.filterredux.openQuerylist(false,this.state.modelId);
    let _checkedValue = [],query_checkedValue = [];
    let {checkedValue,checkedValue2,ValueList,queryCheckValue} = this.state;
    ValueList.forEach((ele,index) => {
      query_checkedValue.push((ele.id || ele.itemId))
          queryCheckValue.forEach((element,index) => {
            if(element.itemId == (ele.id || ele.itemId)){
              _checkedValue.push(queryCheckValue[index])
            }
            if(query_checkedValue.includes(element.itemId)){
              query_checkedValue.splice(query_checkedValue.indexOf(element.itemId),1)
            }
          })
        })
        let copy_checkedValue = [];
        if(_checkedValue != []){
          _checkedValue.forEach((ele,index) => {copy_checkedValue.push(ele.itemId);})
        }
        else{ copy_checkedValue = [].concat( _checkedValue);}
        checkedValue2 =  [].concat(copy_checkedValue).concat(query_checkedValue)
     commonVOs.splice(0,commonVOs.length)
    this.setState({checkedValue2, visible:false});
  }
  QueryItemRender() {
    let queryList =this.props.filterscheme[this.state.modelId].queryList;
    let a = this.props.filterscheme[this.state.modelId].queryVisible
    console.log('a',a)
    console.log('queryList',queryList)
    let noData = 'filter_scheme_popoverdown';
    if(!queryList) return
    if(queryList.length > 0){
      noData = 'filter_scheme_popover'
    }
    let queryContent =
      <Popover
        overlayClassName={noData}
        content={this.getQueryContent()}
        trigger={"click"}
        visible={this.props.filterscheme[this.state.modelId].queryVisible}
        onVisibleChange={()=>this.visibleChange()}
        placement="topLeft"
      >
      </Popover>;
    return <div className="ant-popover-left">{queryContent}</div>;
  }
  visibleChange=()=>{
    this.props.filterredux.openQuerylist(false,this.state.modelId);
  }
  getQueryContent() {
    let ContentCheckBoxs = [];
    let queryList = this.props.filterscheme[this.state.modelId].queryList;
    let {checkedValue,checkedValue2} = this.state;
      queryList.forEach(function (ele, index) {
        let id = ele.id.toString();
        let itemTitle = ele.itemTitle;
        let checkedgroup;
        checkedgroup = (<div><Checkbox key={index} onChange={this.onChangeCheck.bind(this)} value={id}  checked={checkedValue.includes(Number(id)) || checkedValue2.includes(Number(id)) }>{itemTitle}</Checkbox></div>)
        ContentCheckBoxs.push(checkedgroup)
      }, this)
    return <div className='query-criteria-select' style={{ overflow: "auto", paddingLeft: "10px" }}>
      <div className="ant-checkbox-group">
        {ContentCheckBoxs}
      </div>
      <div className='Checked-confirm-btn'>
        <Button type={"primary"} size="small" className="confirmChecked" onClick={() => this.AddDataOk()}>确认</Button>
        <Button type={"default"} size="small" className="cancelChecked" onClick={() => this.QueryItem()}>取消</Button>
      </div>
    </div>
  }
  onChangeCheck(e) {
    let {checkedValue,checkedValue2} = this.state;
    let _num = Number(e.target.value);
    if(checkedValue2.includes(_num)){checkedValue2.splice(checkedValue2.indexOf(_num), 1); }
    else{checkedValue2.push(_num);}
    if(checkedValue.includes(_num)){ checkedValue.splice(checkedValue.indexOf(_num), 1);}
    this.setState({checkedValue2,checkedValue})
  }
  AddDataOk = () => {
    console.log('ValueList',this.state.ValueList)
    this.props.filterredux.openQuerylist(false, this.state.modelId);
    let ValueList = [];
    commonVOs = [];
    let queryList = this.props.filterscheme[this.state.modelId].queryList
    let {checkedValue,checkedValue2,queryCheckValue} = this.state;
    checkedValue = [].concat(checkedValue2)
    ValueList = checkedValue.map(value => {
    let _queryList = queryList.find(v => v.id === value);
    return _queryList || [];
    })
    ValueList = ValueList.map(value=>{
    let _queryCheckValue = queryCheckValue.find(v=>v.itemId===value.id);
    return _queryCheckValue || value;
    })
    console.log('ValueList',ValueList)
    ValueList.forEach((element) => {
      // let _index =  _.findIndex(AllFilterModel, (obj) => {
      //   return obj.id === element.itemId
      // })
      // element.displayname = AllFilterModel[_index].displayname;
      //  element.enumArray = AllFilterModel[_index].enumArray;
      const { itemName, compareLogic, itemType,ctrlType,cRefType, value1, value2, displayname, multSelect, refReturn, referCode, enumArray } = element;
      const filterVMField = new cb.models.FilterModel({
        compareLogic,
        ctrlType: itemType || ctrlType,
        value1: value1,
        value2: value2,
        displayname,
        multSelect,
        refReturn,
        cRefType: referCode || cRefType,
        enumArray
      });
      this.viewModel.addProperty(itemName, filterVMField);
      let eleType = itemType || ctrlType
      const lowerCtrlType = itemType || ctrlType && eleType.trim().toLocaleLowerCase();
        if (lowerCtrlType === 'refer' || lowerCtrlType === 'treerefer' || lowerCtrlType === 'listrefer') {
            this.triggerReferBrowse(filterVMField.getFromModel());
            this.triggerReferBrowse(filterVMField.getToModel());
        }
    })
    this.setState({ ValueList,checkedValue});
  }
  getComponent(ComName, model, config, ctrlType, cShowCaption,enumArray,multSelect,) {
    if(ComName == "tagbutton"){
      ComName = BasicComponents.Tag2;
      return   <ComName model={model}  TagData={enumArray} TagCanMultSel={multSelect} {...config} ></ComName>;
    }
    return ComName ? <ComName model={model} title={cShowCaption} isInFilterJSX={true} {...config} /> : <h1>{ctrlType}</h1>;
  }
  onMouseIsenter(Isenter, itemName) {
    if (Isenter) {this.setState({ inMouseitemName: itemName });}
    else { this.setState({ inMouseitemName: "" });}
  }
  AddData() {
    let self = this;
    let { ValueList} = this.state;
    console.log('ValueList',ValueList)
    let controlRender = [];
    ValueList.forEach(function (element, index) {
      const ele = element;
      let { itemName, itemTitle, compareLogic,enumArray,multSelect } = ele;
      let itemType = ele.itemType || ele.ctrlType;
      const filterVMField = this.viewModel.get(itemName);
      let fromModel = filterVMField.getFromDisplayModel() || filterVMField.getFromModel();
      let toModel = filterVMField.getToModel();
      let ctrlType;
      if (itemType) {ctrlType = itemType.trim().toLocaleLowerCase();}
      else{ ctrlType = "input";}
      const options = [];
      const Option = Select.Option;
      let compareLogicData = this.props.filterscheme[this.state.modelId].compareLogicList;
      if (multSelect)
        compareLogicData={in:compareLogicData.in,nin:compareLogicData.nin};
      for (var keyvalue in compareLogicData) {
        let compareLogicItem = (<Option key={keyvalue} style={{ width: 60 }} >{compareLogicData[keyvalue]}</Option>)
        options.push(compareLogicItem)
      }
      const config = {};
      let ComName = "";
      if(ctrlType == "tagbutton"){ ComName = "tagbutton"}
      else{ComName = BasicComponentsMap[ctrlType];}
      let control;
      commonitem = {
        "itemId": ele.id || ele.itemId,
        "orderId": index,
        "itemName": ele.itemName,
        "id": id,
        "compareLogic":compareLogic
      };
      if(commonVOs.length>0){
          let _index = _.findIndex(commonVOs, (obj) => {
          return obj.itemName === ele.itemName && obj.itemId === (ele.id || ele.itemId);
        })
          if (_index<0) commonVOs.push(commonitem);
      }
      else{ commonVOs.push(commonitem); }
      let bshowupdown = (ele.itemName == self.state.inMouseitemName ? true : false);
      let updown = bshowupdown ?
        <span className="sumarea_list_updown">
          <Button style={{ borderWidth: 0 }} className="action-shanchucopy2" onClick={() => this.sortClick('up', index)}><Icon type={'shanchucopy2'}></Icon></Button>
          <Button style={{ borderWidth: 0 }} className="action-shanchucopy1" onClick={() => this.sortClick('down', index)}><Icon type={'shanchucopy1'}></Icon></Button>
          <Button style={{ borderWidth: 0 }} className="action-guanbi1" onClick={() => this.sortClick('delete', index)}><Icon type={'guanbi1'}></Icon></Button>
        </span>:<span></span>
      if (compareLogic === 'between') {
        if(ctrlType == "predicatedatepicker"){
          control = (
            <div>
              <div className="Test-time-two sumarea_list_item"
                onMouseEnter={(e) => this.onMouseIsenter(true, ele.itemName, index)}
                onMouseLeave={(e) => this.onMouseIsenter(false, ele.itemName, index)}>
                <Col className="query-content-title">{itemTitle}</Col>
                <Col><Select className="compareLogic" value={compareLogicData[compareLogic]} onChange={(value)=>this.handleChange(value,ele.id || ele.itemId)}>{options}</Select> </Col>
                <Col className="query-component-1">{this.getComponent(ComName, fromModel, config, ctrlType)}</Col>
                {updown}
              </div>
            </div>
          );
        }
        else{
          control = (
            <div>
              <div className="Test-time-two sumarea_list_item"
                onMouseEnter={(e) => this.onMouseIsenter(true, ele.itemName, index)}
                onMouseLeave={(e) => this.onMouseIsenter(false, ele.itemName, index)}>
                <Col className="query-content-title">{itemTitle}</Col>
                <Col><Select className="compareLogic" value={compareLogicData[compareLogic]} onChange={(value)=>this.handleChange(value,ele.id || ele.itemId)}>{options}</Select> </Col>
                <Col className="query-component-1">{this.getComponent(ComName, fromModel, config, ctrlType)}</Col>
                <Col className="query-component-2"><span>至</span></Col>
                <Col className="query-component-3">{this.getComponent(ComName, toModel, config, ctrlType)}</Col>
                {updown}
              </div>
            </div>
          );
        }
        }
      else {
        control = (
          <div>
            <div className="query-content-list sumarea_list_item"
              onMouseEnter={(e) => this.onMouseIsenter(true, ele.itemName)}
              onMouseLeave={(e) => this.onMouseIsenter(false, ele.itemName)}>
              <Col className="query-content-title">{itemTitle}</Col>
              <Col><Select className="compareLogic" value={compareLogicData[compareLogic]} style={{ width: 60 }} onChange={(value)=>this.handleChange(value,ele.id || ele.itemId)}>{options}</Select></Col>
              <Col className="query-component-3">{this.getComponent(ComName, fromModel, config, ctrlType, itemTitle,enumArray,multSelect)}</Col>
              {updown}
            </div>
          </div>
        );
      }
      controlRender.push(control)
    }, this)
    return <div className="query-content-ranking">{controlRender}</div>
  }
  handleChange(value,id) {
    let {ValueList} = this.state;
    commonVOs.forEach(function(ele,index){
      if(ele.itemId == id){
        if(ele.compareLogic != value){
        ele.compareLogic = value;
        }
      }
    })
  let _index = _.findIndex(ValueList,function(obj){return obj.id  == id || obj.itemId == id;})
  if(_index > -1){
    ValueList[_index].compareLogic = value;
  }
  this.setState({ValueList})
  }
  sortClick(type, index) {
    let { ValueList,checkedValue,checkedValue2,queryCheckValue } = this.state;
    let ValueListSort = [].concat(ValueList);
    if (type == "up" && index == 0) return;
    if (type == "down" && index == ValueListSort.length - 1) return;
    let pre = cb.utils.extend(true, {}, ValueListSort[index - 1]);
    let next = cb.utils.extend(true, {}, ValueListSort[index + 1]);
    let now = cb.utils.extend(true, {}, ValueListSort[index]);
    let commonvosPre =cb.utils.extend(true, {},  commonVOs[index - 1]);
    let commonvosNext =cb.utils.extend(true, {}, commonVOs[index + 1]);
    let commonvosNow = cb.utils.extend(true, {}, commonVOs[index ]);
    if (type == 'up') {
      ValueListSort[index] = pre;
      ValueListSort[index - 1] = now;
      commonVOs[index] = commonvosPre;
      commonVOs[index - 1] = commonvosNow;
    }
    if (type == 'down') {
      ValueListSort[index] = next;
      ValueListSort[index + 1] = now;
      commonVOs[index] = commonvosNext;
      commonVOs[index + 1] = commonvosNow
    }
    if (type == 'delete') {
      let ID = ValueListSort[index].id || ValueListSort[index].itemId
      ValueListSort.splice(index, 1)
      if(checkedValue2.includes(ID)){ checkedValue2.splice(checkedValue2.indexOf(ID), 1);}
      queryCheckValue.forEach((ele,index) =>{
        if(ID == ele.itemId){
        queryCheckValue.splice(index,1)
        }
      })
      commonVOs.forEach((element,index) => {
        if(ID == element.itemId){
        commonVOs.splice(index,1)
        }
      })
      checkedValue = [].concat(checkedValue2)
     }
     commonVOs.forEach((ele,index) => {
       ele.orderId = index
     })
    this.setState({ ValueList: ValueListSort,checkedValue2,checkedValue, queryCheckValue })
  }
  AddScheme() {
    let schemeList = this.props.filterscheme[this.state.modelId].schemeList;
    // this.props.filterredux.getQueryItem(this.state.modelId, this.state.filterId,schemeList);
    this.props.filterredux.AddScheme(!this.props.filterscheme[this.state.modelId].bAddscheme,this.state.modelId);
    if (this.props.filterscheme[this.state.modelId].bEdit) {
      this.props.filterredux.Isedit(!this.props.filterscheme[this.state.modelId].bEdit, this.state.modelId);
    }
    if (this.props.filterscheme[this.state.modelId].isdefault) {
      this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault,this.state.modelId);
    }
    if(this.props.filterscheme[this.state.modelId].queryVisible){
      this.props.filterredux.openQuerylist(false,this.state.modelId);
    }
    this.setState({ visible: false, ValueList:[], InputValue: "", checkedValue:[],queryCheckValue:[], inMouseitemName:"",checkedValue2:[] ,mention:false,id:null});
  }
  CloseAddScheme() {
    this.props.filterredux.AddScheme(false,this.state.modelId);
    this.setState({visible:false,ValueList:[]})
  }
  AddSchemeContent() {
    let {mention} = this.state;
    let schemeContent = this.AddData();
    let  nameMention = '';
    let input_schemename = ""
    if(mention){
      nameMention = (<span className="scheme-name-mention">不能为空</span>);
      input_schemename = "input_schemename"
    }
    let nameContent = (<div className="add-scheme">
    <Row className="add-scheme-content">
      <Col span={1} className="scheme-name"><i className="anticon anticon-star"></i>名称</Col>
      <Col span={4} className="scheme-name-content"><Input type="text" value={this.state.InputValue} onChange={this.InputValue.bind(this)} className={input_schemename} /> </Col>
      <Col span={5} className="scheme-set"><Checkbox checked={this.props.filterscheme[this.state.modelId].isdefault} onClick={() => this.IsDefault()}>设为默认</Checkbox></Col>
    </Row>
    {nameMention}
    <div>{schemeContent}</div>
  </div>)
    return nameContent
  }
  IsDefault() {
    let {IsdefaultValue} = this.state;
    if(this.props.filterscheme[this.state.modelId].bEdit){
      if(IsdefaultValue){
        if(!this.props.filterscheme[this.state.modelId].isdefault){
          this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault,this.state.modelId);
        }
      }
      else{this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault,this.state.modelId);}
    }
    else{this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault,this.state.modelId);}
  }
  InputValue(e) {
    let solutionName = ""
    solutionName = e.target.value
    this.setState({ InputValue: solutionName })
  }
  handleCancel() {
    this.CloseAddScheme();
    this.setState({visible:false,ValueList:[]})
  }
  AddSchemeRender() {
    let bAddscheme = this.props.filterscheme[this.state.modelId].bAddscheme;
    let bEdit = this.props.filterscheme[this.state.modelId].bEdit;
    let addqueryItems = this.AddqueryItems();
    let queryItemRender = this.QueryItemRender()
    let addSchemeContent = this.AddSchemeContent()
    let {definedVisible} = this.state;
    let content;
    content = <div><Modal className="scheme-content" title={bEdit ? "编辑" : "新增"} visible={true} onOk={(e) => this.handleok(e)}
              onCancel={(e) => this.handleCancel(e)}maskClosable={false}style={{ height: 400 }} footer={null}>
              <div className="Scheme-Content-body">{addSchemeContent}</div>
              <div className="query-state"> {queryItemRender}</div>
              <div className="ant-modal-footer">{addqueryItems}</div>
              </Modal>
              </div>;
    if (bAddscheme) {return content;}
    else {
      if(definedVisible){
      return (<FilterDefined visible={this.state.definedVisible} model={this.props.model} filterId={this.state.filterId}></FilterDefined>);
      }
     else return content = "";
    }
  }
}
function mapStateToProps(state) {
  return { filterscheme: state.filterscheme.toJS()}
}
function mapDispatchToProps(dispatch) {
  return {filterredux: bindActionCreators(filterredux, dispatch),}
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterScheme);
