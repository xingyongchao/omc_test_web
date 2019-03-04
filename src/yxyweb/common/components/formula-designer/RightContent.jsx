import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Icon, Tag, Select, InputNumber } from 'antd';
import Label from '../basic/label';

import * as formulaActions from '../../redux/formula';

const TextArea = Input.TextArea;

class Operator extends Component {
  render() {
    const { dataSource } = this.props;
    if (!dataSource || !dataSource.length)
      return null;
    const items = [];
    dataSource.forEach(item => {
      const { key, value } = item;
      items.push(<Tag key={key} onClick={() => this.props.onClick(key)}>{value}</Tag>);
    });
    return (
      <div>{items}</div>
    );
  }
}

class RightContent extends Component {
  componentDidMount() {
    this.props.formulaActions.initOperator();
  }
  onCaptionChange = (e) => {
    this.props.formulaActions.changeCaption(e.target.value);
  }
  onChange = (e) => {
    this.props.formulaActions.change(e.target.value, e.target.selectionStart);
  }
  onFocus = () => {
    setTimeout(() => {
      const input = findDOMNode(this.input);
      this.props.formulaActions.focus(input.selectionStart);
    }, 0);
  }
  handleOperatorSelect = (key) => {
    this.props.formulaActions.selectOperator(key);
  }
  getControl(control, caption, required) {
    const title = required ? <label><Icon type='star' />{caption}</label> : <label>{caption}</label>;
    return (
      <Label control={control} title={title} />
    );
  }
  getFormatControl = () => {
    const { cControlType, cFormatData } = this.props.formula;
    let controlType = cControlType && cControlType.trim().toLocaleLowerCase();
    if (controlType == 'input') return null;
    if (controlType == 'datepicker') {
      return (
        <Input placeholder="例：YYYY-MM-DD HH:mm:ss" value={cFormatData} onChange={this.onFormatChange} />
      )
    }
    if (controlType == 'inputnumber') {
      let monovalentdecimal = {}, amountofdecimal = {}, quantitydecimal = {};
      monovalentdecimal.decimal = "<%option.monovalentdecimal%>";
      amountofdecimal.decimal = "<%option.amountofdecimal%>";
      quantitydecimal.decimal = "<%option.quantitydecimal%>";
      return (
        <Select value={cFormatData} onChange={this.onFormatChange}>
          <Select.Option value={JSON.stringify(monovalentdecimal)}>单价精度</Select.Option>
          <Select.Option value={JSON.stringify(amountofdecimal)}>金额精度</Select.Option>
          <Select.Option value={JSON.stringify(quantitydecimal)}>数量精度</Select.Option>
        </Select>
      )
    }
    return null;
  }
  onFormatChange = (e) => {
    this.props.formulaActions.setCommonData({ 'cFormatData': e.target ? e.target.value : e });
  }
  onFieldTypeChange = (value) => {
    this.props.formulaActions.setCommonData({ 'cControlType': value, 'cFormatData': null, 'iNumPoint': 0 });
  }
  onNumPointChange = (value) => {
    this.props.formulaActions.setCommonData({ 'iNumPoint': value });
  }
  render() {
    const { operatorData, caption, expression, errorInfo, cControlType, iNumPoint, cFormatData } = this.props.formula;
    const columnNameCom = <Input value={caption} onChange={this.onCaptionChange} />
    const operatorCom = <Operator dataSource={operatorData} onClick={this.handleOperatorSelect} />
    const expressionCom = <TextArea ref={node => this.input = node} onFocus={this.onFocus} value={expression} onChange={this.onChange} />
    let controlType = cControlType && cControlType.trim().toLocaleLowerCase();
    const fieldTyepControl = (
      <Select value={controlType} onChange={this.onFieldTypeChange}>
        <Select.Option value="input">文本</Select.Option>
        <Select.Option value="inputnumber">数值</Select.Option>
        <Select.Option value="datepicker">日期</Select.Option>
      </Select>
    )
    const formatControl = this.getFormatControl();
    const numPointControl = <InputNumber value={iNumPoint} onChange={this.onNumPointChange} />
    return (
      <div>
        {this.getControl(columnNameCom, '栏目名称', true)}
        {this.getControl(operatorCom, '运算符')}
        <div className="formula-editing">
          {this.getControl(expressionCom, '编辑区', true)}
          <label className="error">{errorInfo}</label>
        </div>
        {this.getControl(fieldTyepControl, '数据类型', true)}
        {formatControl ? this.getControl(formatControl, '格式化', false) : null}
        {controlType == 'inputnumber' ? this.getControl(numPointControl, '精度', false) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formula: state.formula.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    formulaActions: bindActionCreators(formulaActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightContent);
