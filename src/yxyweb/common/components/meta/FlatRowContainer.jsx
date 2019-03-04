import React, { Component } from 'react';
import { Input, InputNumber } from 'antd';
import text from '../basic/text';
export default class FlatRowContainer extends Component {
  constructor(props) {
    super(props);
    const { meta, viewModel, cStyle } = props;
    const { childrenField, cCode } = meta;
    const controlModel = viewModel.get(childrenField || cCode);
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    this.state = Object.assign({
      controlModel
    }, config);
  }
  componentDidMount() {
    this.state.controlModel.addListener(this);
  }
  componentWillUnmount() {
    this.state.controlModel.removeListener(this);
  }
  setListenerState(params) {
    this.setState(params);
  }
  setDataSource(rows) {
    this.setState({ rows });
  }
  setCellValue(data) {
    const { rowIndex, cellName, value } = data;
    const { rows } = this.state;
    rows[rowIndex][cellName] = value;
    this.setDataSource(rows);
  }
  handleChange(rowIndex, cellName, value) {
    let _value = (value===0|| !!value) ? value : null
    this.state.controlModel.setCellValue(rowIndex, cellName, _value, true);
  }
  getPrecision(iNumPoint, controlType) {
    switch (controlType) {
      case 'money':
        iNumPoint = cb.rest.AppContext.option ? cb.rest.AppContext.option.amountofdecimal:0;
        break;
      case 'price':
        iNumPoint = cb.rest.AppContext.option ? cb.rest.AppContext.option.monovalentdecimal:0;
        break;
    }
    return iNumPoint;
  }
  renderRow(row, index) {
    const editRowModel = this.state.controlModel.getEditRowModel();
    const { columns, readOnly } = this.state;
    const items = [];
    _.forEach(columns, (value, key) => {
      const controlType = value.cControlType && value.cControlType.trim().toLocaleLowerCase();
      const fieldName = value.cItemName, disabled = value.disabled, readonly = !value.bCanModify || readOnly;
      let item = null;
      switch (controlType) {
        case 'inputnumber':
        case 'money':
        case 'price':
          const precision = this.getPrecision(value.iNumPoint, controlType);
          const min = editRowModel.get(fieldName).getState('min');
          item = readonly ? text(row[fieldName]) : <InputNumber value={row[fieldName]} precision={precision} min={min} onChange={(value) => this.handleChange(index, key, value)} />
          break;
        default:
          item = <Input value={row[fieldName]} className='member-list-disabled' disabled={disabled} onChange={(e) => this.handleChange(index, key, e.target.value)} />
          if (!disabled && readonly)
            item = <span className='m-title'>{row[fieldName]}</span>
          break;
      }

      items.push(item);
    });
    return items;
  }
  renderRows(rows) {
    const { iCols } = this.props.meta;
    const controlWidth = 100 / (iCols || 2);
    const className = `width-percent-${controlWidth.toFixed(0)}`;
    return rows.map((row, index) => {
      return (
        <div className={className}>
          {this.renderRow(row, index)}
        </div>
      );
    });
  }
  render() {
    const { rows, classname } = this.state;
    if (!rows || !rows.length)
      return null;
    return (
      <div className={`member-list ${classname || ''}`}>
        {this.renderRows(rows)}
      </div>
    );
  }
}
