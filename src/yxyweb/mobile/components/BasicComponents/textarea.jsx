import React, { Component } from 'react';
import { List, TextareaItem } from 'antd-mobile';
import { getFixedNumber } from 'src/common/redux/modules/billing/paymode'
export default class TextareaControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
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
  }
  render() {
    let { value, bCanModify, iMaxLength, cFormatData, cShowCaption, cControlType } = this.state;
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
    let className = "textAlignRight";
    if (this.props.viewMeta.iAlign == 1) className = "textAlignLeft";
    if (this.props.viewMeta.iAlign == 2) className = "textAlignCenter";
    if (this.props.viewMeta.iAlign == 3) className = "textAlignRight";
    if (cShowCaption && !this.props.noTitle) {
      if (this.state.readOnly) {
        return (
          <List>
            <List.Item className="textarea-readonly" extra={showValue}>{cShowCaption}</List.Item>
          </List>
        )
      } else {
        return <List>
          <TextareaItem title={cShowCaption} autoHeight className={className} disabled={this.state.readOnly}
            editable={bCanModify} maxLength={iMaxLength} onBlur={this.onInputBlur}
            onChange={this.onInputChange} placeholder={this.state.readOnly ? "" : "请输入"} value={showValue} />
        </List>
      }
    } else {
      return (
        <List>
          <List.Item className="noTitle" >{showValue}</List.Item>
        </List>
      );
    }
  }
}
