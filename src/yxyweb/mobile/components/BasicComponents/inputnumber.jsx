import React, { Component } from 'react';
// import { List, InputItem } from 'antd-mobile';
import InputNumber from './input'
import { getFixedNumber } from 'src/common/redux/modules/billing/paymode'
export default class InputNumberControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  /**componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState = (params) => {
    let cFormatData = params.cFormatData;
    try {
      if (!cFormatData || cFormatData == '') {
        cFormatData = {};
      } else {
        cFormatData = JSON.parse(cFormatData);
      }
    } catch (e) {
      cb.utils.alert('格式化字段预制错误！', 'error');
    }
    params.cFormatData = cFormatData;
    this.setState(params);
  }
  onInputChange = (val) => {
    this.setState({ value: val });
  }
  onInputBlur = (val) => {
    if (this.props.model)
      this.props.model.setValue(val, true);
  }**/
  render() {

    return <InputNumber type="number" {...this.props}/>

    /***
    let { value, bCanModify, iMaxLength, cFormatData, cShowCaption, cControlType, readOnly, disabled } = this.state;
    let prefix = (cFormatData && cFormatData.prefix) ? cFormatData.prefix : "";
    let originalValue = value;
    if (cControlType === "money" && value) {
      if (value < 0) {
        value = Math.abs(value);
      }
      value = getFixedNumber(value);
    }
    if (cb.utils.isEmpty(value)) value = "";
    let showValue = prefix + value;
    if (originalValue < 0) {
      showValue = "-" + prefix + value;
    }
    if (cb.utils.isEmpty(showValue)) showValue = "";
    let className = "textAlignRight";
    if (this.props.viewMeta && this.props.viewMeta.iAlign == 1) className = "textAlignLeft";
    if (this.props.viewMeta && this.props.viewMeta.iAlign == 2) className = "textAlignCenter";
    if (this.props.viewMeta && this.props.viewMeta.iAlign == 3) className = "textAlignRight";
    if (cShowCaption && !this.props.noTitle) {
      if(bCanModify)
          return <List>
            <InputItem className={className} readOnly={readOnly} disabled={disabled} maxLength={iMaxLength} onBlur={this.onInputBlur} onChange={this.onInputChange} placeholder="请输入" value={showValue}>{cShowCaption}</InputItem>
          </List>
      else
        return <List>
          <InputItem className={className} disabled={this.state.readOnly} editable={bCanModify} maxLength={iMaxLength} onBlur={this.onInputBlur} onChange={this.onInputChange} placeholder="请输入" value={showValue}>{cShowCaption}</InputItem>
        </List>
    } else {
      if(bCanModify)
        return (
          <List>
            <InputItem className={'noTitle'} readOnly={readOnly} disabled={disabled} maxLength={iMaxLength} onBlur={this.onInputBlur} onChange={this.onInputChange} placeholder="请输入" value={showValue}></InputItem>
          </List>
        );
      else
        return (
          <List>
            <List.Item className="noTitle" >{showValue}</List.Item>
          </List>
        );
    }
    ***/
  }
}
