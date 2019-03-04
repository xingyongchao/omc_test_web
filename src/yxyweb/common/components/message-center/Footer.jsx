import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'antd';

import * as addActions from '../../redux/addMessage';


class Footer extends Component {
  handleCancel = () => {
    if(name=='' || context == "" || userId.length==0 || timepoint == ''){
    this.props.onNameErrInfoChange('')
    this.props.onContextErrInfoChange('')
    this.props.onTimepointErrInfoChange('')
    this.props.onReceiversErrInfoChange('')
    this.props.onFrequencyErrInfoChange('')
    this.props.addActions.close()
    return
  }
  this.props.addActions.close()
  }
  handleCheck = () => {
    this.props.addActions.check();
  }
  handleOk = () => {
    this.props.onNameErrInfoChange('')
    this.props.onContextErrInfoChange('')
    this.props.onTimepointErrInfoChange('')
    this.props.onReceiversErrInfoChange('')
    this.props.onFrequencyErrInfoChange('')
    const { name,context,timepoint,userId,day,frequency} = this.props.addMessage;
   if(name=='' || context == "" || userId.length==0 || timepoint.length ==0 || ((frequency==2||frequency==3)&&day.length==0)){
    if(name==''){
       this.props.onNameErrInfoChange('不能为空')}
    
     if(context==""){
     this.props.onContextErrInfoChange('不能为空')
    }
    if(timepoint.length==0){
    this.props.onTimepointErrInfoChange('不能为空')
    }
    if(userId.length==0){
       this.props.onReceiversErrInfoChange('不能为空')
    }
    if((frequency==2||frequency==3)&&day.length==0){
      this.props.onFrequencyErrInfoChange('不能为空')
   }
    return
  }
    this.props.onOk();
  }
  render() {
    const checkPass = this.props.addMessage.checkPass;
    const checkState= this.props.addMessage.checkState;
    return (
      <div>
        <Button onClick={this.handleCancel}>取消</Button>
        <Button disabled={!checkState} onClick={this.handleCheck}>校验</Button>
        <Button disabled={!checkPass} onClick={this.handleOk}>确定</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addMessage: state.addMessage.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addActions: bindActionCreators(addActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
