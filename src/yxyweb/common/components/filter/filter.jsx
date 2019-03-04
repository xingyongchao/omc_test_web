import React from 'react';
import { Select } from 'antd';
import { Row, Col, DatePicker, Input, InputNumber, Refer } from '../basic';
import RangePicker from '../basic/rangepicker';

const Option = Select.Option;

export default class FilterControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compareLogic: 'eq',
      selectedField: '',
      defaultValue: this.props.selectedValue
    };
  }
  getFieldControl() {
    let self = this;
    let selectedField = this.props.dataSource.length && this.props.dataSource.filter(function (item) {
      return item.itemName == self.props.selectedValue;
    })[0];

    const ctrlType = selectedField.ctrlType.trim().toLocaleLowerCase();
    const compareLogic = this.props.compareLogic || this.state.compareLogic;
    let fromModel = this.props.model && this.props.model.getFromModel();
    let toModel = this.props.model && this.props.model.getToModel();

    let control;
    switch (ctrlType) {
      case 'input':
        if (compareLogic == 'between') {
          control = (
            <Row>
              <Col span={11}><Input model={fromModel} /></Col>
              <Col span={2} className="sp-range-txt"><span>至</span></Col>
              <Col span={11}><Input model={toModel} /></Col>
            </Row>
          );
        }
        else
          control = <Input model={fromModel} />;
        break;
      case 'inputnumber':
        if (compareLogic == 'between') {
          control = (<Row>
            <Col span={11}><InputNumber model={fromModel} /></Col>
            <Col span={2} className="sp-range-txt"><span>至</span></Col>
            <Col span={11}><InputNumber model={toModel} /></Col>
          </Row>);
        }
        else
          control = <InputNumber model={fromModel} />;
        break;
      case 'refer':
        if (compareLogic == 'between') {
          control = (
            <Row>
              <Col span={11}><Refer model={fromModel} /></Col>
              <Col span={2} className="sp-range-txt"><span>至</span></Col>
              <Col span={11}><Refer model={toModel} /></Col>
            </Row>
          );
        }
        else
          control = <Refer model={fromModel} />;
        break;
      case 'datepicker':
        if (compareLogic == 'between') {
          control = (
            <Row>
              <Col span={11}><DatePicker model={fromModel} /></Col>
              <Col span={2} className="sp-range-txt"><span>至</span></Col>
              <Col span={11}><DatePicker model={toModel} /></Col>
            </Row>
          );
        }
        else
          control = <DatePicker model={fromModel} />;
        break;
    }
    return (<div>{control}</div>);
  }
  handleChange(value) {
    let selectedField = this.props.dataSource.filter(function (item) {
      return item.itemName == value;
    })[0];

    if (this.props.onChange)
      this.props.onChange(this.state.defaultValue, selectedField);

    if (selectedField)
      this.setState({ selectedField: selectedField, defaultValue: selectedField.itemName });
  }
  getSelect() {
    let options = new Array();
    this.props.dataSource && this.props.dataSource.length && this.props.dataSource.forEach(function (item) {
      options.push(<Option value={item.itemName}>{item.cShowCaption}</Option>);
    });
    return (
      <Select showSearch style={{ width: 95 }} optionFilterProp="children" value={this.props.selectedValue}
        notFoundContent="无法找到" onChange={e => this.handleChange(e)}>
        {options}
      </Select>
    );
  }
  getControl() {
    let selectControl = this.getSelect();
    let inputControl = this.getFieldControl();

    let control = (<Row>
      <Col span={6}>{selectControl}</Col>
      <Col span={18}>{inputControl}</Col>
    </Row>);

    return control;
  }
  render() {
    let control = this.getControl();
    return (
      <div>
        {control}
      </div>
    );
  }
};
