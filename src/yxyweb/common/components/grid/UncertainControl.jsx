import React from 'react';
import Input from '../basic/input'
import InputNumber from '../basic/inputnumber'
import DatePicker from '../basic/datepicker'
import TimePicker from '../basic/timepicker'
import CheckboxEnum from '../basic/checkboxenum'
import Select from '../basic/select'

export default class UncertainControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null
    };
  }
  componentDidMount() {
    let col = this.props.cellConfig;
    if (!col)
      col = { 'cControlType': 'Input' };
    let cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
    let model = null;
    switch (cControlType) {
      case 'select':
      case 'radio':
      case 'checkboxenum':
        model = new cb.models.ListModel(col);
        break;
      default:
        model = new cb.models.SimpleModel(col);
        break;
    }
    this.setState({ model });
    model.on('blur', () => {
      let val = this.state.model.getValue();
      let { rowIndex, columnKey } = this.props.RowProperty;
      this.props.model.setCellValue(rowIndex, columnKey, val || '', true, true);
    });
    model.on('afterValueChange', (val) => {
      if (val.value != null && typeof val.value == 'object') {
        let { rowIndex, columnKey } = this.props.RowProperty;
        let newValue = val.value;
        if (!cb.utils.isArray(newValue)) {
          newValue = newValue.value;
        } else {
          let temp = '';
          newValue.map(newVal => {
            if (temp == '')
              temp = newVal.value;
            else
              temp = temp + ',' + newVal.value;
          });
          newValue = temp;
        }
        this.props.model.setCellValue(rowIndex, columnKey, newValue || '', true, true);
      }
    })
  }
  getComponents(col) {
    if (!col)
      col = { 'cControlType': 'Input' };
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
      case 'refer':
      case 'treerefer':
      case 'listrefer':
        components = <Input focus model={model} />
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
      let data = this.props.dataList;
      let { rowIndex, columnKey } = this.props.RowProperty;
      let value = data[rowIndex][columnKey];
      if (!cb.utils.isEmpty(value)) model.setValue(value);
    }
    return components;
  }
  render() {
    let components = this.getComponents(this.props.cellConfig);
    return components;
  }
}
