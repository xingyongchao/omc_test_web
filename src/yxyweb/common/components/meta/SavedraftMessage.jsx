import React, { Component } from 'react';
import {Modal,Input,Row,Col} from 'antd';
import { openDB, IDB_searchData, IDB_saveData,IDB_deleteOneData } from 'src/yxyweb/common/redux/indexedDB'
import moment from 'moment'
import _ from 'lodash'
export default class SavedraftMessage extends Component{
constructor(props) {
    let timeData = moment(); 
    let InpuTime = moment(timeData).format('YYYY-MM-DD HHmmss');
    let _timeData = moment(timeData).valueOf();
    super(props);
    let {model} = this.props;
    let data = model.collectData();
    let userId = cb.rest.AppContext.user.id;
    let billNo = model.getParams().billNo;
    let caption = model.getParams().caption;
    let keyValue = model.getCache('draftInfo');
    let status = model.getParams().mode;
    let draftName = caption +'草稿'+'    '+ InpuTime;
    this.state={
        showName:false,
        data:data,
        userId:userId,
        billNo:billNo,
        caption:caption,
        cacheData:[],
        copyTime:_timeData,
        keyValue:keyValue,
        draftName:draftName,
        status:status
    };
}
InputValue = (e) =>{
    let changeName = ""
    changeName = e.target.value
    console.log(' changeName', changeName)
    this.setState({ draftName:  changeName })
}
saveBillnodata = () => {
    let self = this;
    let putDraftname = this.state.draftName;
    if(putDraftname){
        let options={dbTableName:'billNodata'}
    IDB_searchData(options).then(dbData => {
        this.viewmodel = self.props.model;
        let {data,userId,billNo,status,copyTime,keyValue,draftName} = this.state;
        let draftKey = userId+'_'+billNo+'_'+copyTime;
        let checkKey = userId+'_'+billNo;
        
        let condition = {draftName:draftName,attrKey:draftKey,copyTime:copyTime,checkKey:checkKey,savedraftstate:status};
        let cacheObj = Object.assign(data,condition);
        if(keyValue){
        let _index = _.findIndex(dbData,function(obj){ return obj.attrKey === keyValue.attrKey})
        if(_index > -1){
            let key = dbData[_index].attrKey;
            let options={id:key,dbTableName: 'billNodata'}
            IDB_deleteOneData(options).then(result => {IDB_saveData(cacheObj, 'billNodata').then(result => {cb.utils.alert('保存成功', 'success');this.viewmodel.communication({ type: 'return' });})
            .catch(e => {cb.utils.alert('缓存数据失败！', 'error')});})
            
        }
        }
        else{ IDB_saveData(cacheObj, 'billNodata').then(result => {cb.utils.alert('保存成功', 'success');this.viewmodel.communication({ type: 'return' });})
        .catch(e => {cb.utils.alert('缓存数据失败！', 'error')});}
        this.props.close();
      }).catch(e => console.error(e.message))
    }
    else{this.setState({showName:true})}
}
onok = (e) => {
    return openDB('off-lineDB', 2, ['billNodata']).then(result => {
        if (result)
          this.saveBillnodata();
        else
          cb.utils.alert('打开数据库失败，缓存功能不可用！', 'error')
      }).catch(e => {
        console.error(e)
      })
}
onCancel = (e) => {
    this.props.close();
}
render(){
    let {draftName,showName} = this.state;
    return(
        <div>
            <Modal className="savedraft_modal" title="保存草稿" visible onOk={this.onok} onCancel={this.onCancel} maskClosable={false} okText="确定" cancelText="取消">
            <Row >
            <Col span={1} className={"savedraft_title"}>草稿名称</Col>
            <Col span={4}><Input type="text" className={"savedraft_name"} value={draftName} onChange={this.InputValue}/></Col>
            </Row>
            <Row><span style={{ display: showName == true ? 'inline' : 'none' }} className="draft_name">不能为空</span></Row>
            </Modal>
        </div>
        )
    }
}