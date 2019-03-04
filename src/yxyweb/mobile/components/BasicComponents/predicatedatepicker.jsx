import React, { Component } from 'react';
import { Popover, Calendar } from 'antd-mobile';
import moment from 'moment';
import SvgIcon from 'SvgIcon';
const Item = Popover.Item;

export default class PredicateDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predicateValue: null,
      startValue: null,
      endValue: null,
      visible: false,
      calendarVisible: false,
      format: 'YYYY-MM-DD',
      startSuffix: ' 00:00:00',
      endSuffix: ' 23:59:59'
    };
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
      const { value1, value2, predicateValue } = value;
      const startValue = value1 && moment(value1) || null, endValue = value2 && moment(value2) || null;
      this.setState({ predicateValue, startValue, endValue });
    } else {
      this.onPredicateChange(value);
    }
  }
  onPredicateChange(predicateValue) {
    const { format, startSuffix, endSuffix } = this.state;
    this.state.visible = false;
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
      case 'custom':
        this.setState({ visible: false, calendarVisible: true });
        break;
    }
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }
  onConfirm = (startTime, endTime) => {
    const format = 'yyyy-MM-dd';
    const { startSuffix, endSuffix } = this.state;
    const value1 = startTime.format(format) + startSuffix;
    const value2 = endTime.format(format) + endSuffix;
    this.setModelValue(value1, value2);
    this.setState({ calendarVisible: false });
  }
  onCancel = () => {
    this.setState({ calendarVisible: false });
  }
  setModelValue(value1, value2, predicateValue) {
    this.props.model.setValue({ value1, value2, predicateValue }, true);
  }
  baseControl() {
    const { dataSource, predicateValue, startValue, endValue, visible, calendarVisible, format } = this.state;
    if (!dataSource || !dataSource.length)
      return null;
    const valueField = this.valueField, textField = this.textField;
    const options = [];
    const customText = `${startValue && startValue.format(format)} ~ ${endValue && endValue.format(format)}`;
    let predicateText = null;
    dataSource.forEach(item => {
      if (item[valueField] === predicateValue)
        predicateText = item[textField];
      options.push(<Item value={item[valueField]}>
        <div>
          {item[textField]}
          {predicateText == item[textField] ? <SvgIcon type="xuanzhong1" /> : <div />}
        </div>
      </Item>);

    });
    options.push(<Item value='custom'>
      <div>
        {`${!predicateText && customText || '自定义时间'}`}
        {!predicateText ? <SvgIcon type="xuanzhong1" /> : <div />}
      </div>
    </Item>);
    if (!predicateText)
      predicateText = customText;
    return (
      <div>
        <Popover
          getTooltipContainer={() => { return document.getElementById('popup-container') || document.body; }}
          visible={visible}
          overlay={options}
          mask={true}
          onSelect={e => this.onPredicateChange(e.props.value)}
          onVisibleChange={this.handleVisibleChange}
          overlayClassName="PredicateDatePicker_Popover">
          <div className="PredicateDatePicker_TextAndIcon">
            <div className="PredicateDatePicker_Text">
              {predicateText}
            </div>
            <i className={visible === true ? "icon icon-shouqi" : "icon icon-zhakai"}  ></i>
          </div>
        </Popover>
        <Calendar visible={calendarVisible} type='range' onConfirm={this.onConfirm} onCancel={this.onCancel} />
      </div>
    );
  }
  render() {
    return this.baseControl();
  }
}
