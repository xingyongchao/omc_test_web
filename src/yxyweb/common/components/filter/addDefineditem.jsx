import React, { Component } from 'react';
import { Popover, Col, Modal, Icon, Button, Checkbox, Radio, Transfer, Select, Row, Input, Tree,Tag } from 'antd';
import {Label,Refer} from '../basic';
import { proxy } from '../../helpers/util';
import DefinedLeftcontent from './definedLeftcontent'
import Footer from '../message-center/Footer'
const data = [{key:0,value:'='},{key:1,value:'+'},{key:2,value:'-'},{key:3,value:'*'},{key:4,value:'/'},{key:5,value:'<='}]
const markdata = [{key:0,value:'等于'},{key:1,value:'大于'},{key:2,value:'小于'},{key:3,value:'包含'}]
class Operator extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMore: false,
            operatordata:[]
        }
    }
    componentDidMount(){
        this.getOperatorList()
    }
   async  getOperatorList(){
      const config = {
        url: 'enum/getEnumMap',
        method: 'GET',
        params : {
            enumtype:'conditionType'
          }
      };
      const json = await proxy(config);
      if(json.code!==200) return ;
      json.data && this.setState({operatordata:json.data})
      console.log('getOperatorList',json)
    }
    buttonClick(e, type) {
        if (type == 'search') {
          this.SearchEvent();
        }
        else {//
          let showMore = false;
          if (type == 'more') showMore = true;
          this.setState({
            showMore: showMore
          });
        }
      }
    render(){
        let {operatordata} = this.state
        if(!data || !data.length){
        return null;
        }
        let showMoreStr;
        let showMore = this.state.showMore;
        if(operatordata.length>6){
            showMoreStr = (showMore ?
                (<Button style={{ borderWidth: 0 }} className="showMore" type="ghost" size="small" onClick={(e) => this.buttonClick(e, '')}>更多<Icon type="up-circle" /></Button>)
                :
                (<Button style={{ borderWidth: 0 }} className="showMore" type="ghost" size="small" onClick={(e) => this.buttonClick(e, 'more')}>更多<Icon type="down-circle" /></Button>)
              );
        }
        else{showMoreStr = (<span style={{ paddingLeft: 5 }}></span>);}
        const items = [];
        data.forEach((item,index) => {
            const { key, value } = item;
            if(this.state.showMore){
            items.push(<Tag key={key} value={value} onClick={() => this.props.onClick(value)}>{value}</Tag>);
            }
            else{
            if(index < 5){
            items.push(<Tag key={key} value={value} onClick={() => this.props.onClick(value)}>{value}</Tag>);
            }
            }
            
        });
        return (
            <div>{items}{showMoreStr}</div>
        );
    }

}
class Comparemark extends Component{
    constructor(props){
        super(props);
        this.state = {
            comparemarkdata:[]
        }
    }
    componentDidMount(){
        this.getEnumList()
    }
   async  getEnumList(){
      const config = {
        url: 'enum/getEnumMap',
        method: 'GET',
        params : {
            enumtype:'compareLogic'
          }
      };
      const json = await proxy(config);
      if(json.code!==200) return ;
      json.data && this.setState({comparemarkdata:json.data})
      console.log('getEnumList',json)
    }
    render(){
    const options = [];
    const Option = Select.Option;
    if(! markdata || ! markdata.length){
        return null;
    }
    markdata.forEach(function(ele,index){
        let item = (<Option key={ele.key}>{ele.value}</Option>)
        options.push(item)
    })
    return <Select  defaultValue={markdata[0].value || null} onChange={(value)=>this.props.onChange(value)}>{options}</Select>
    

    }
}
class ReferInput extends Component{
    constructor(props){
        super(props);
        this.referModel = new cb.models.ReferModel({cRefType:'pub_refList',refReturn:'code',displayname:'name'});
    }
    componentDidMount() {
        let codeValue = ""
        this.referModel.on('afterValueChange', function () {
             codeValue = this.getValue();
        })
        this.props.getValue(codeValue)
    }
    render(){
        return (<Refer model={this.referModel} />)
    }
}
class FilterType extends Component{
    componentDidMount(){
        this.getFiltertypeList()
    }
   async  getFiltertypeList(){
      const config = {
        url: 'enum/getEnumMap',
        method: 'GET',
        params : {
            enumtype:'aa_itemType'
          }
      };
      const json = await proxy(config);
      if(json.code!==200) return 
      console.log('getFiltertypeList',json)
    }
    render(){
    const options = [];
    const Option = Select.Option;
    if(!markdata || !markdata.length){
        return null;
    }
    markdata.forEach(function(ele,index){
        let item = (<Option key={ele.key}>{ele.value}</Option>)
        options.push(item)
    })
    return <Select  defaultValue={markdata[0].value || null} onChange={(value)=>this.props.onChange(value)}>{options}</Select>
    }
}
export default class addDefineditem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            nameErrInfo: null,
            filterName:"",
            visible:true,
            changeStatus:0,
            errorInfo:true,
            operatorValue:'',
            isShow:false
        }
    }
    
    componentDidMount(){
    }
    render(){
        return (
            <div className="adddefined_modal">
              <Modal title="新增过滤项"  visible={this.state.visible} className="addfilter_content" width={820}
                onCancel={()=>this.onCancel()}  maskClosable={false} 
                // footer={<Footer onNameErrInfoChange={this.changeNameErrInfo}/>}
              >
              <div style={{ height: 480 }}>
                <div className="LeftContent" style={{width: 232,float: 'left', height: 494,overflowy: 'auto',marginRight:26}}>
                    <DefinedLeftcontent onSelect={(selectedKeys,billNodata)=>this.onSelect(selectedKeys,billNodata)} model={this.props.model}/>
                </div>
                <div className="RightContent" style={{ width: 514, float:' left', marginleft: 34, paddingtop: 20,height: 494,overflowy: 'auto'}}>
                    {this.getFilterControl()}
                </div>
              </div>
              </Modal>
            </div>
          );
    }
    onCancel(){
        this.setState({visible:!this.state.visible})
    }
    onSelect(selectedKeys,billNodata){
        let self = this;
        let {operatorValue} = self.state;
        let _index = _.findIndex(billNodata, (obj) => {
            return obj.name === selectedKeys;
          })
        let title = billNodata[_index].title
        operatorValue += `[${title}]`
        self.setState({operatorValue})
        console.log('onSelect',selectedKeys)
    }
    getControl(control, caption, required) {
        const title = required ? <label><Icon type='star' />{caption}</label> : <label>{caption}</label>;
        return (
            <Label control={control} title={title} className="rightcontent_item" />
        );
    }
    onNameChange(e){
        this.setState({filterName:e.target.value})
    }
    // onChangestatus(e){
    //     console.log(e)
    //     // this.setState({changeStatus:e.target.value})

    // }
    handleOperatorSelect(e){
        let {operatorValue} = this.state;
        console.log(e)
        operatorValue += e;
        this.setState({operatorValue})
    }
    onChangearea(e){
        console.log(e.target.value)
        this.setState({operatorValue:e.target.value})
    }
    handChange(value){
        console.log(value)
    }
    changeFiltertype(value){
        console.log(value)
        console.log(this.fromModel)
        switch(value){
            case '1':
            this.setState({isShow:true})
            break;
        }
    }
    getValue(Value){
        console.log('value',Value)
    }
    getFilterControl(){
        const { TextArea } = Input;
        const classname='error_info';
        let {filterName,changeStatus,errorInfo,operatorValue,isShow} = this.state;
        // let ChooseRadio = this.chooseRadio();
        const addDefinedName = <Input className={this.state.nameErrInfo?classname:null} value={filterName} placeholder="请输入" onChange={(e)=>this.onNameChange(e)} />
        const operatorCom = <Operator  onClick={(e)=>this.handleOperatorSelect(e)} />
        // const controlRadio = <SelectRadio stopstatus={changeStatus} onChange={(e)=>this.onChangestatus(e)}/>
        const addDefinedCondition = <TextArea className={errorInfo?classname:'subscribe_condition_inputArea'} rows={3}  onChange={(e)=>this.onChangearea(e)} value={operatorValue} />
        const compareMark = <Comparemark onChange={(value)=>this.handChange(value)} ></Comparemark>
        const filterType = <FilterType onChange={(value)=>this.changeFiltertype(value)}></FilterType>
        const referInput = <ReferInput model = {this.fromModel} getValue={(Value)=>this.getValue(Value)}></ReferInput>
        let referId =(isShow?<div className="referInput_id">{this.getControl(referInput, '参照ID', true)}{this.state.nameErrInfo?<div className='error'>{this.state.nameErrInfo}</div>:null}</div>:null)
        return(
            <div>
                <div className="add_definedname">
                {this.getControl(addDefinedName, '订阅名称', true)}
                {this.state.nameErrInfo?<div className='error'>{this.state.nameErrInfo}</div>:null}
                </div>
                {/* {this.getControl(controlRadio,'控制')} */}
                <div className="operator">{this.getControl(operatorCom, '运算符')}</div>
                <div className='subscribe_condition'>
                {this.getControl(addDefinedCondition, '过滤表达式',true)}
                {errorInfo ? <label className="error">{errorInfo}</label> : null}
                </div>
                <div className="compareMark"> 
                {this.getControl(compareMark, '比较符',true)}
                </div>
                <div className="filterType"> 
                {this.getControl(filterType, '过滤类型',true)}
                </div>
                {referId}
            </div>
        )
    }
    changeNameErrInfo=(text)=>{
        this.setState({
            nameErrInfo:text
        })
    }
}