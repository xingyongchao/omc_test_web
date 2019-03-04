import React, { Component } from 'react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';
import Row from './row';
import Col from './col';
import Label from './label';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class PredicateDatePicker extends Component {
  constructor(props) {
    super(props);
    const { cStyle } = props;
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    this.state = Object.assign({
      predicateValue: null,
      startValue: null,
      endValue: null,
      endOpen: false,
      format: 'YYYY-MM-DD',
      startSuffix: ' 00:00:00',
      endSuffix: ' 23:59:59'
    }, config);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState(params) {
    const { valueField, textField, value, dataSource, defaultValue } = params;
    this.valueField = valueField;
    this.textField = textField;
    delete params.valueField;
    delete params.textField;
    delete params.value;
    this.setState(params);
    if (defaultValue === false) {
      this.setValue(value && value[valueField] || value);
    } else {
      this.setValue(cb.utils.isEmpty(value) ? dataSource && dataSource.length && dataSource[0][valueField] : value[valueField] || value);
    }
  }
  setValue(value) {
    if (cb.utils.isEmpty(value)) {
      this.setState({ predicateValue: null, startValue: null, endValue: null });
    } else if (typeof value === 'object') {
      let { value1, value2, predicateValue } = value;
      const startValue = value1 && moment(value1) || null, endValue = value2 && moment(value2) || null;
      // const predicateValue = this.fitPredicateValue(startValue, endValue);
      if (startValue && endValue && cb.utils.isEmpty(predicateValue))
        predicateValue = this.fitPredicateValue(startValue, endValue);
      this.setState({ predicateValue, startValue, endValue });
    } else {
      this.onPredicateChange(value);
    }
  }
  onPredicateChange(predicateValue) {
    const { format, startSuffix, endSuffix } = this.state;
    switch (predicateValue) {
      case '0':
        const today = moment().format(format);
        this.setModelValue(today + startSuffix, today + endSuffix, predicateValue);
        break;
      case '-1':
        const yesterday = moment().subtract(1, 'days').format(format);
        this.setModelValue(yesterday + startSuffix, yesterday + endSuffix, predicateValue);
        break;
      case '-7':
        this.setModelValue(moment().subtract(6, 'day').format(format) + startSuffix, moment().format(format) + endSuffix, predicateValue);
        break;
      case '-30':
        this.setModelValue(moment().subtract(29, 'day').format(format) + startSuffix, moment().format(format) + endSuffix, predicateValue);
        break;
      case '7':
        {
          let daystoNextMonday = 7 - ( moment().isoWeekday()-1);
          let nextWeekStart =  moment().add('days', daystoNextMonday)
          let nextWeekEnd =  moment().add('days',  daystoNextMonday+6)
          this.setModelValue(nextWeekStart.format(format) + startSuffix,nextWeekEnd.format(format) + endSuffix, predicateValue);
          break;
        }
      case '30':
        {
          let nextMonthStart = moment().add('month', 1).format('YYYY-MM') + '-01'
          let nextMonthEnd = moment(nextMonthStart).add('month', 1).add('days', -1).format(format)
          this.setModelValue(nextMonthStart + startSuffix, nextMonthEnd + endSuffix, predicateValue);
          break;
        }
      case '90':
        {
          let nowquarter = moment().quarter();
          let nowyear = moment().year();
          let nextQuarterStart;
          let nextQuarterEnd;
          switch (nowquarter){
            case 1:
              nextQuarterStart = nowyear+'-04-01';
              nextQuarterEnd = nowyear+'-06-30';
            break;
            case 2:
              nextQuarterStart = nowyear+'-07-01';
              nextQuarterEnd = nowyear+'-09-30';
            break;
            case 3:
              nextQuarterStart = nowyear+'-10-01';
              nextQuarterEnd = nowyear+'-12-31';
            break;
            default:
              nextQuarterStart = nowyear+1+'-01-01';
              nextQuarterEnd = nowyear+1+'-03-31';
          }
          this.setModelValue(nextQuarterStart + startSuffix, nextQuarterEnd + endSuffix, predicateValue);
          break;
        }
      case '365':
        {
          let nextYearStart = moment().add('year',1).format('YYYY')+'-01-01'
          let nextYearEnd = moment(nextYearStart).add('year',1).add('days', -1).format(format)
          this.setModelValue(nextYearStart + startSuffix, nextYearEnd + endSuffix, predicateValue);
          break;
        }
    }
  }
  disabledStartDate = (startValue) => {
    const { endValue, format, endSuffix } = this.state;
    if (!startValue || !endValue)
      return false;
    const endDate = moment(endValue.format(format) + endSuffix, format + ' HH:mm:ss');
    return startValue.valueOf() > endDate.valueOf();
  }
  disabledEndDate = (endValue) => {
    const { startValue, format, startSuffix } = this.state;
    if (!endValue || !startValue)
      return false;
    const startDate = moment(startValue.format(format) + startSuffix, format + ' HH:mm:ss');
    return endValue.valueOf() < startDate.valueOf();
  }
  onStartChange = (value) => {
    const { format, startSuffix, endSuffix, endValue } = this.state;
    const value1 = value && value.format(format) + startSuffix || null;
    const value2 = endValue && endValue.format(format) + endSuffix || null;
    this.setModelValue(value1, null);
  }
  onEndChange = (value) => {
    const { startValue, format, startSuffix, endSuffix } = this.state;
    const value1 = startValue && startValue.format(format) + startSuffix || null;
    const value2 = value && value.format(format) + endSuffix || null;
    const predicateValue = this.fitPredicateValue(startValue, value);
    this.setModelValue(value1, value2, predicateValue);
  }
  setModelValue(value1, value2, predicateValue) {
    this.props.model.setValue({ value1, value2, predicateValue }, true);
  }
  handleStartOpenChange = (open) => {
    const { endValue } = this.state;
    if (!open)
      this.setState({ endOpen: true });
  }
  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  fitPredicateValue(startValue, endValue) {
    const { format } = this.state;
    const startString = startValue && startValue.format(format);
    const endString = endValue && endValue.format(format);
    if (!startString || !endString) return;
    const today = moment().format(format);
    if (startString === today && endString === today)
      return '0';
    const yesterday = moment().subtract(1, 'days').format(format);
    if (startString === yesterday && endString === yesterday)
      return '-1';
    if (startString === moment().subtract(6, 'day').format(format) && endString === today)
      return '-7';
    if (startString === moment().subtract(29, 'days').format(format) && endString === today)
      return '-30';
    // 下周
    let daystoNextMonday = 7- (moment().isoWeekday()-1);
    let nextWeekStart =  moment().add('days', daystoNextMonday).format(format)
    let nextWeekEnd =  moment().add('days',  daystoNextMonday+6).format(format)
    if (startString === nextWeekStart && endString === nextWeekEnd)
      return '7';
    // 下月
    let nextMonthStart = moment().add('month', 1).format('YYYY-MM') + '-01'
    let nextMonthEnd = moment(nextMonthStart).add('month', 1).add('days', -1).format(format)
    if (startString === nextMonthStart && endString === nextMonthEnd)
      return '30';
    // 下季度
    let nowquarter = moment().quarter();
    let nowyear = moment().year();
    let nextQuarterStart;
    let nextQuarterEnd;
    switch (nowquarter){
      case 1:
        nextQuarterStart = nowyear+'-04-01';
        nextQuarterEnd = nowyear+'-06-30';
      break;
      case 2:
        nextQuarterStart = nowyear+'-07-01';
        nextQuarterEnd = nowyear+'-09-30';
      break;
      case 3:
        nextQuarterStart = nowyear+'-10-01';
        nextQuarterEnd = nowyear+'-12-31';
      break;
      default:
        nextQuarterStart = nowyear+1+'-01-01';
        nextQuarterEnd = nowyear+1+'-03-31';
    }
    if (startString === nextQuarterStart && endString === nextQuarterEnd)
      return '90';
    // 下年
    let nextYearStart = moment().add('year',1).format('YYYY')+'-01-01'
    let nextYearEnd = moment(nextYearStart).add('year',1).add('days', -1).format(format)
    if (startString === nextYearStart && endString === nextYearEnd)
      return '365';
    return null
  }
  baseControl() {
    const { dataSource } = this.state;
    if (!dataSource || !dataSource.length)
      return null;
    const valueField = this.valueField, textField = this.textField;
    const options = [];
    dataSource.forEach(item => {
      options.push(<RadioButton value={item[valueField]}>{item[textField]}</RadioButton>);
    });
    const { predicateValue, startValue, endValue, endOpen } = this.state;
    let isInPanel = this.props.isInPanel ? this.props.isInPanel : false;
    let panelType = this.props.panelType || 0;
    return (
      <Row className="m-b-10">
        <div style={{ float: 'left' }} className="m-r-10">
          <RadioGroup value={predicateValue} onChange={e => this.onPredicateChange(e.target.value)}>
            {options}
          </RadioGroup>
        </div>
        {isInPanel == false ?
          <div style={{ float: 'left' }} className='query-scheme-date'>
            <Row colCount={3}>
              <Col span={1} className="m-r-10">
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  value={startValue}
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
              </Col>

              <div style={{ float: 'left' }} className={"m-r-10" + (panelType == 3 ? " basic-predicate-to " : "")}>至</div>
              <Col span={1}>
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  value={endValue}
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              </Col>
            </Row>
          </div> : ""}
      </Row>
    );
  }
  render() {
    const { cShowCaption } = this.props;
    const control = this.baseControl();
    let isInPanel = this.props.isInPanel ? this.props.isInPanel : false;
    return (
      <div className={'basic-predicate-data-picker '+(this.state.classname || '')}>
        {cShowCaption && isInPanel == false ? <Label isInFilterJSX control={control} title={cShowCaption} /> : control}
      </div>
    );
  }
}
