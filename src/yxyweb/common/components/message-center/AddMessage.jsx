import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Layout, Button, Form, Radio, Icon, Row, Col, Table, Input, Tag, Select, DatePicker } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import SvgIcon from 'SvgIcon';
import classnames from 'classnames'
import { toJSON, genAction, genFetchOptions, proxy } from 'yxyweb/common/helpers/util';
import env from 'yxyweb/common/helpers/env';
import Sider from '../../../../../node_modules/antd/lib/layout/Sider';
import * as addActions from '../../redux/addMessage';
import Label from '../basic/label';
import Footer from './Footer';
import LeftContent from './LeftContent'

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

class SubscribeRadio extends Component {
    render() {
        const RadioGroup = Radio.Group;
        return <RadioGroup value={this.props.stopstatus} onChange={this.props.onChange}>
            <Radio value={0}>启用</Radio>
            <Radio value={1}>停用</Radio>
        </RadioGroup>
    }
}

class SubscribeCycle extends Component {
    render() {
        const { RangePicker } = DatePicker;
        const {startTime,endTime} =this.props;
        const format="YYYY-MM-DD"
        return <RangePicker value={[startTime, endTime]}
        format={format} onChange={this.props.onChange} />

    }
}

class SubscribeFrequency extends Component {
    render() {
        const month = [];
        for (let i = 1; i < 29; i++) {
            month.push(<Option value={i.toString()}>{i}号</Option>)
        }
        const intervalDay = [];
        for (let i = 0; i < 8; i++) {
            intervalDay.push(<Option value={i}>{i}</Option>);
        }
        const intervalWeek = [];
        for (let i = 0; i < 5; i++) {
            intervalWeek.push(<Option value={i}>{i}</Option>);
        }
        const intervalMonth = [];
        for (let i = 0; i < 13; i++) {
            intervalMonth.push(<Option value={i}>{i}</Option>);
        }
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group
        return <div className='subscribe_cycle_radio'><RadioGroup value={this.props.value} onChange={this.props.onChange}>
            <RadioButton value={1}>天</RadioButton>
            <RadioButton value={2}>周</RadioButton>
            <RadioButton value={3}>月</RadioButton>
        </RadioGroup> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.value === 1 ? <span className='subscribe_cycle_select'>间隔<Select value={this.props.interval} onChange={this.props.onIntervalChange} style={{ width: 100 }}>
                {intervalDay}
            </Select>天触发一次 </span> : null}
            {this.props.value === 2 ? <span className='subscribe_cycle_select'>间隔<Select value={this.props.interval} onChange={this.props.onIntervalChange}  style={{ width: 100 }}>
                {intervalWeek}
            </Select>周触发一次</span> : null}
            {this.props.value === 3 ? <span className='subscribe_cycle_select'>间隔<Select value={this.props.interval} onChange={this.props.onIntervalChange} style={{ width: 100 }}>
                {intervalMonth}
            </Select>月触发一次</span > : null}
            <br />
            {this.props.value === 2 ? <Select mode='tags' value={this.props.day}  onChange={this.props.onWeekOrMonthChange} className={this.props.className||'subscribe_cycle_week_or_month'}>
                <Option value='2'>星期一</Option>
                <Option value='3'>星期二</Option>
                <Option value='4'>星期三</Option>
                <Option value='5'>星期四</Option>
                <Option value='6'>星期五</Option>
                <Option value='7'>星期六</Option>
                <Option value='1'>星期日</Option>
            </Select> : null}
            {this.props.value === 3 ? <Select mode='tags' value={this.props.day}  onChange={this.props.onWeekOrMonthChange} className={this.props.className||'subscribe_cycle_week_or_month'}>
                {month}</Select> : null}

        </div>

    }
}

class SubscribeTime extends Component {
    render() {
        const Option = Select.Option;
        const time = [];
        for (let i = 0; i < 24; i++) {
            time.push(<Option value={i.toString()}>{'每日' + i.toString() + '点'}</Option>)
        }
        return <Select className={this.props.className} mode="multiple" value={this.props.value} onChange={this.props.onChange}>{time}</Select>
    }
}

class QueryScheme extends Component {
    render() {
        const Option = Select.Option;
        let queryScheme=[];
        this.props.solutionList.forEach((item)=>{
            queryScheme.push(<Option value={item.id}><span className='solution_name'>{item.solutionName}</span></Option>)
        }
        )
        return <Select value={this.props.value} onChange={this.props.onChange}>{queryScheme}</Select>
    }
}

class SubscribeUser extends Component {
    render() {
        const Option = Select.Option;
        const receivers = [];
        

        // for (let i = 1; i < this.props.receivers.length + 1; i++) {
        //     receivers.push(<Option value={this.props.userId[i - 1]}>{this.props.receivers[i - 1]}</Option>)
        // }
        this.props.receivers.forEach((item)=>{
            receivers.push(<Option value={item.value} lable={item.lable}><div><span className="recipient_name">{item.name}</span><span className='account_name'>{item.account}</span></div></Option>)
        })
        return <Select optionFilterProp="children" className={this.props.className}
            mode="multiple" value={this.props.userId} onChange={this.props.onChange} optionLabelProp='lable'
        >{receivers}
        </Select>
    }


}

class AddMessage extends Component {
    constructor(props) {
        super(props);
          this.state = {
            nameErrInfo: null,
            contextErrInfo: null,
            timepointErrInfo:null,
            receiversErrInfo:null,
            frequencyErrInfo:null,
          }
        } 
    componentDidMount() {
        this.props.addActions.initOperator();
    }
    getControl(control, caption, required) {
        const title = required ? <label><Icon type='star' />{caption}</label> : <label>{caption}</label>;
        return (
            <Label control={control} title={title} />
        );
    }
    onFocus = () => {
        setTimeout(() => {
            const input = findDOMNode(this.input);
            this.props.addActions.focus(input.selectionStart);
        }, 0);
    }
    onChange = (e) => {
        this.props.addActions.change(e.target.value, e.target.selectionStart);
    }
    handleOperatorSelect = (key) => {
        this.props.addActions.selectOperator(key);
    }
    handleOk = () => {
        this.props.addActions.onOk();

    }
    handleCancel = () => {
        this.setState({
            nameErrInfo: null,
            contextErrInfo: null,
            timepointErrInfo:null,
            receiversErrInfo:null,
            frequencyErrInfo:null,
        })
        this.props.addActions.close();
    }
    onNameChange = (e) => {
        this.props.addActions.changeName(e.target.value);
    }
    onStopstatusChange = (e) => {
        this.props.addActions.changeStopstatus(e.target.value);
    }
    onContextChange = (e) => {
        this.props.addActions.changeContext(e.target.value);
    }
    onFrequencyChange = (e) => {
        this.setState({frequencyErrInfo:null })
        this.props.addActions.changeFrequency(e.target.value);
    }
    onTimepointChange = (value) => {
        this.props.addActions.changeTimepoint(value);
    }
    onItervalChange = (value) => {
        this.props.addActions.changeInterval(value);
    }

    onSolutionChange =(value)=> {
        this.props.addActions.changeSolution(value);
    }

    onWeekOrMonthChange = (value) => {
        this.props.addActions.changeWeekOrMonth(value);
    }

    onReceiversChange = (value) =>{
        this.props.addActions.changeReceivers(value)
    }
    onCycleChange = (value) =>{
        this.props.addActions.changeCycle(value)
    }
    changeNameErrInfo=(text)=>{
        this.setState({
            nameErrInfo:text
        })
    }

    changeContextErrInfo=(text)=>{
        this.setState({
            contextErrInfo:text
        })
    }

    changeTimepointErrInfo=(text)=>{
        this.setState({
            timepointErrInfo:text
        })
    }

    changeReceiversErrInfo=(text)=>{
        this.setState({
            receiversErrInfo:text
        })
    }

    changeFrequencyErrInfo=(text)=>{
        this.setState({
            frequencyErrInfo:text
        })
    }

    getFormControl = () => {
        const { TextArea } = Input;
        const classname='error_info';
        const { name, stopstatus,startTime,endTime,receivers, userId,frequency, interval, timepoint, day, operatorData, conditionDesc, context, errorInfo,solutionList,solutionId } = this.props.addMessage;
        const operatorCom = <Operator dataSource={operatorData} onClick={this.handleOperatorSelect} />
        const subscribeName = <Input className={this.state.nameErrInfo?classname:null} value={name} placeholder="请输入" onChange={this.onNameChange} />
        const subscribeState = <SubscribeRadio stopstatus={stopstatus} onChange={this.onStopstatusChange} />
        const subscribeCondition = <TextArea className={errorInfo?classname:'subscribe_condition_inputArea'} rows={3} ref={node => this.input = node} onFocus={this.onFocus} onChange={this.onChange} value={conditionDesc} />
        const subscribeContent = <Input className={this.state.contextErrInfo?classname:null} placeholder="请输入" value={context} onChange={this.onContextChange} />
        const subscribeCycle = <SubscribeCycle startTime={startTime} endTime={endTime} onChange={this.onCycleChange}/>
        const subscribeFrequency = <SubscribeFrequency className={this.state.frequencyErrInfo?'frequency_error_info':null} value={frequency} onIntervalChange={this.onItervalChange} onWeekOrMonthChange={this.onWeekOrMonthChange} onChange={this.onFrequencyChange} interval={interval} day={day} />
        const subscribeTime = <SubscribeTime className={this.state.timepointErrInfo?'select_error_info':null} value={timepoint} onChange={this.onTimepointChange} />
        const subscribeUser = <SubscribeUser className={this.state.receiversErrInfo?'select_error_info':null} receivers={receivers} userId={userId} onChange={this.onReceiversChange}/>
        const queryScheme=<QueryScheme solutionList={solutionList} value={solutionId} onChange={this.onSolutionChange} />
        return (
            <div>
                <div className="receiver_people"> 
                {this.getControl(subscribeName, '订阅名称', true)}
                {this.state.nameErrInfo?<div className='error'>{this.state.nameErrInfo}</div>:null}
                </div>
                {this.getControl(subscribeState, '订阅状态')}
                {this.getControl(queryScheme, '查询方案')}
                <div className="operator">{this.getControl(operatorCom, '运算符')}</div>
                <div className='subscribe_condition'>
                {this.getControl(subscribeCondition, '订阅条件')}
                {errorInfo ? <label className="error">{errorInfo}</label> : null}
                </div>
                <div className="receiver_people"> 
                {this.getControl(subscribeContent, '消息内容', true)}
                {this.state.contextErrInfo?<div className='error'>{this.state.contextErrInfo}</div>:null}
                </div>
                {this.getControl(subscribeCycle, '订阅周期')}
                <div className="receiver_people"> 
                {this.getControl(subscribeFrequency, '订阅频率', true)}
                {(frequency==2||frequency==3)&&this.state.frequencyErrInfo?<div className='error'>{this.state.frequencyErrInfo}</div>:null}
                </div>
                <div className="receiver_people"> 
                {this.getControl(subscribeTime, '订阅时点', true)}
                {this.state.timepointErrInfo?<div className='error'>{this.state.timepointErrInfo}</div>:null}
                </div>
                <div className="receiver_people"> 
                {this.getControl(subscribeUser, '接收人', true)}
                {this.state.receiversErrInfo?<div className='error'>{this.state.receiversErrInfo}</div>:null}
                </div>

            </div>

        )
    }

    render() {
        const{caption}=this.props.addMessage;

        return (<Modal title={caption} className='FormulaDesigner' maskClosable={false} width={800} mask={false} visible={this.props.addMessage.visible} onCancel={this.handleCancel} footer={<Footer onOk={this.handleOk} 
        onNameErrInfoChange={this.changeNameErrInfo}
        onContextErrInfoChange={this.changeContextErrInfo}
        onTimepointErrInfoChange={this.changeTimepointErrInfo}
        onReceiversErrInfoChange={this.changeReceiversErrInfo}
        onFrequencyErrInfoChange={this.changeFrequencyErrInfo}
        />} >
            <div style={{ height: '100%' }}>
                <div className="LeftContent">
                    {<LeftContent />}
                </div>
                <div className="RightContent">
                    {this.getFormControl()}
                </div>
            </div>
        </Modal>
        )
    }
}
function mapStateToProps(state) {
    return {
        addMessage: state.addMessage.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addActions: bindActionCreators(addActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMessage);

