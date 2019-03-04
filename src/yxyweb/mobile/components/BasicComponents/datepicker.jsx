import React, { Component } from 'react'
import { Calendar, InputItem, Flex, List, WingBlank } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import { dateFormat } from 'yxyweb/common/helpers/formatDate';

const now = new Date();

export default class DatePickerControl extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ config: {} });
    if (this.props.model) {
      this.props.model.addListener(this);
      if (this.props.toModel) {
        this.props.toModel.addListener(this);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.model) {
      this.props.model.removeListener(this);
      if (this.props.toModel) {
        this.props.toModel.removeListener(this);
      }
    }
  }

  onCancel() {
    if (this.props.setHideFilter)
      this.props.setHideFilter(false);
    this.setState({ show: false });
    this.autoFocus();
  }

  autoFocus() {
    if (this.state.focusTag === 'end') {
      this.endref.inputRef.inputRef.focus();
    } else {
      this.startref.inputRef.inputRef.focus();
    }
  }

  onFocus(focusTag) {
    this.setState({ focusTag: focusTag });
  }

  onConfirm(start, end) {
    start = dateFormat(start, 'yyyy-MM-dd');
    end = end && dateFormat(end, 'yyyy-MM-dd');
    if (end)
      this.setState({ show: false, startDate: start, endDate: end, defaultValue: [start, end] });
    else
      this.setState({ show: false, startDate: start, defaultValue: [start] });
    if (this.props.setHideFilter)
      this.props.setHideFilter(false);
    this.autoFocus();
    if (this.props.model) {
      this.props.model.setValue(start, true);
    }
    if (this.props.toModel && end) {
      this.props.toModel && this.props.toModel.setValue(end, true);
    }
  }

  /**onConfirm(start,end) {
      let {focusTag,startDate,endDate,defaultValue} = this.state;
      if(!defaultValue){
          defaultValue=[null,null];
      }
      let end = undefined;
      if(focusTag==='end'){
          end = start;
          end = dateFormat(end, 'yyyy-MM-dd');
          defaultValue[1]=end;
          this.setState({ show: false, endDate: end, defaultValue:defaultValue });
      }else if(focusTag==='start'){
          start = dateFormat(start, 'yyyy-MM-dd');
          defaultValue[0]=start;
          this.setState({ show: false, startDate: start, defaultValue:defaultValue });
      }else{

      }
      // start = dateFormat(start, 'yyyy-MM-dd');
      // end = dateFormat(end, 'yyyy-MM-dd');
      this.autoFocus();
      if (this.props.model){
          if(focusTag==='start'){
              this.props.model.setValue(start, true);
          }
          if(focusTag==='end'){
              this.props.toModel && this.props.toModel.setValue(end, true);
          }
      }
  }**/

  onClear() {
    this.setState({ startDate: '', endDate: '', defaultValue: [] });
    if (this.props.model) {
      this.props.model.setValue('', true);
      if (this.props.toModel) {
        this.props.toModel && this.props.toModel.setValue('', true);
      }
    }
  }

  onSelect(start, vals) {
    let tempDefaultValue = [];
    if (this.state.defaultValue) {
      tempDefaultValue = this.state.defaultValue;
    }

    if (tempDefaultValue.length == 2) {
      let tempstart = dateFormat(start, 'yyyy-MM-dd');
      if (this.state.focusTag === 'end') {
        tempDefaultValue[1] = tempstart;
      } else {
        tempDefaultValue[0] = tempstart;
      }
    } else {
      if (start) {
        tempDefaultValue.push(dateFormat(start, 'yyyy-MM-dd'));
      }
      if (vals.length && vals[0]) {
        tempDefaultValue.push(dateFormat(vals[0], 'yyyy-MM-dd'));
      }
    }
    if (tempDefaultValue.length == 2) {
      this.setState({ defaultValue: tempDefaultValue });
    }
  }

  handClick() {
    let { bCanModify, readOnly, disabled } = this.state;
    if (bCanModify === false || disabled === true || readOnly === true) {
      return;
    }
    if (this.props.setHideFilter)
      this.props.setHideFilter(true);
    if (!this.state.show) {
      this.onFocus.bind(this, 'start');
      this.setState({ show: true });
    }
  }

  onChange(type, value) {
    if (type === 'start') {
      this.setState({ startDate: value });
    } else {
      this.setState({ endDate: value });
    }
  }

  getControl() {
    if (!this.state) {
      return ''
    }
    let { defaultValue } = this.state;
    let tempDefaultValue = [], start, end;
    if (defaultValue && defaultValue.length == 2) {
      tempDefaultValue = [new Date(defaultValue[0]), new Date(defaultValue[1])];
    }
    if (this.props.model) {
      start = this.props.model.getValue();
      if (start) {
        tempDefaultValue.push(new Date(start));
      }
    }
    if (this.props.toModel) {
      end = this.props.toModel.getValue();
      if (end) {
        tempDefaultValue.push(new Date(end));
      }
    }
    if (!start && !end) {
      tempDefaultValue = [];
    }
    return (
      <Calendar
        visible={this.state.show}
        onCancel={this.onCancel.bind(this)}
        onConfirm={this.onConfirm.bind(this)}
        defaultValue={tempDefaultValue}
        type={this.props.toModel ? "range" : 'one'}
        onClear={this.onClear.bind(this)}
      />
    )
  }

  render() {
    let start = '';
    let end = '';
    let cShowCaption = '';
    if (!cb.utils.isEmpty(this.state)) {
      start = this.state.startDate;
      end = this.state.endDate;
      cShowCaption = this.state.cShowCaption;
    }
    if (this.props.model) {
      start = this.props.model.getValue() || "";
    }
    if (this.props.toModel) {
      end = this.props.toModel.getValue() || "";
    }
    if (this.state.readOnly || this.state.bCanModify === false) {
      let value = start;
      if (this.props.toModel && !cb.utils.isEmpty(end) && !cb.utils.isEmpty(value))
        value = value + '~' + end;
      return (
        <List>
          <InputItem disabled value={value}>{cShowCaption}</InputItem>
        </List>
      )
    }
    return (
      <div className="uretail_date">
        <List>
          <WingBlank size='lg'>
            <span style={{ float: 'left', margin: '0.15rem 0.3rem 0 0' }}>{this.props.title || cShowCaption}</span>
            {this.props.toModel ?
              <Flex onClick={this.handClick.bind(this)}>
                <Flex.Item>
                  <InputItem placeholder='开始日期' disabled clear onChange={this.onChange.bind(this, 'start')} onFocus={this.onFocus.bind(this, 'start')} ref={(startref) => { this.startref = startref }} value={start} />
                </Flex.Item> - <Flex.Item>
                  <InputItem placeholder='结束日期' disabled clear onChange={this.onChange.bind(this, 'end')} onFocus={this.onFocus.bind(this, 'end')} ref={(endref) => { this.endref = endref }} value={end} />
                </Flex.Item>
              </Flex> :
              <List onClick={this.handClick.bind(this)}>
                <InputItem placeholder='选择日期' disabled clear onChange={this.onChange.bind(this, 'start')} onFocus={this.onFocus.bind(this, 'start')} ref={(startref) => { this.startref = startref }} value={start} />
              </List>}
          </WingBlank>
        </List>
        {this.getControl()}
      </div>
    );
  }

}
