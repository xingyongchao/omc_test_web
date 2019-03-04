import React from 'react';
import Input from '../basic/input'
import InputNumber from '../basic/inputnumber'
import DatePicker from '../basic/datepicker'
import TimePicker from '../basic/timepicker'
import Select from '../basic/select'
import Refer from '../basic/refer'

export default class TreeTableEditCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null
    };
  }
  componentDidMount() {
    let col = this.props.column;
    let cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
    let model = null;
    switch (cControlType) {
      case 'select':
      case 'radio':
        model = new cb.models.ListModel(col);
        break;
      case 'refer':
        model = new cb.models.ReferModel(cb.utils.extend(true, {}, { multiple: false }, col));
        break;
      default:
        model = new cb.models.SimpleModel(col);
        break;
    }
    this.setState({ model });
    model.on('blur', () => {
      const { bExpand, rowIndex, column } = this.props;
      let cControlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
      if (cControlType == 'refer') {
        this.props.onCellBlur(val, bExpand, rowIndex, column.cItemName, false)
        return;
      }
      let val = this.state.model.getValue();
      this.props.onCellBlur(val, bExpand, rowIndex, column.cItemName, true)
    });
    model.on('afterValueChange', (val) => {
      const { bExpand, rowIndex, column } = this.props;
      let cControlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
      if (cControlType == 'refer') {
        let value = val.value;
        let data = {};
        let returnFields = this.state.model.getReturnFields();
        let valueField = this.state.model.get('valueField');
        data[column.cItemName] = cb.utils.isEmpty(value) ? null : value[valueField];
        for (var billKey in returnFields) {
          if (cb.utils.isEmpty(value))
            data[billKey] = null;
          else
            data[billKey] = value[returnFields[billKey]];
        }
        this.props.onCellBlur(data, bExpand, rowIndex, column.cItemName, true)
      }
    })
    model.on('beforeBrowse', (data) => {
      let TreeModel = this.props.model;
      return TreeModel.execute('beforeBrowse', { rowData: this.props.row, context: this.state.model });
    });
  }
  getComponents(col) {
    let components = null;
    let NumPoint = 1;
    /*转换iNumPoint为inputNumber控件识别的小数位*/
    if (col.iNumPoint && col.iNumPoint > 1) {
      NumPoint = 0.1;
      NumPoint = Math.pow(NumPoint, col.iNumPoint).toFixed(col.iNumPoint);
    }
    let controlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
    let model = this.state.model;
    switch (controlType) {
      case 'input':
        // case 'refer':
        // case 'treerefer':
        // case 'listrefer':
        components = <Input focus model={model} />
        break;
      case 'refer':
        components = <Refer focus model={model} />
        break;
      case 'inputnumber':
      case 'money':
      case 'price':
        if (controlType === 'money')
          NumPoint = cb.rest.AppContext.option.amountofdecimal;
        else if (controlType === 'price')
          NumPoint = cb.rest.AppContext.option.monovalentdecimal;
        components = <InputNumber className={'edit-input-number'} focus model={model} iNumPoint={col.iNumPoint} cFormatData={col.cFormatData} />
        break;
      case 'datepicker':
        components = <DatePicker model={model} className={'edit-input-number'} cFormatData={col.cFormatData} />
        break;
      case 'timepicker':
        components = <TimePicker model={model} className='edit-input-number' />
        break;
      case 'select':
      case 'radio':
        components = <Select focus model={model} className={'edit-input-number'} />
        break;
      case 'checkboxenum':
        components = <Select focus model={model} />
        break;
      default:
        components = <Input focus model={model} />
        break;
    }
    if (model) {
      let value = this.props.row[col.cItemName];
      if (!cb.utils.isEmpty(value)) model.setValue(value);
    }
    return components;
  }
  render() {
    let components = this.getComponents(this.props.column);
    return <div className="tree-table-edit-cell">{components}</div>;
  }
}
