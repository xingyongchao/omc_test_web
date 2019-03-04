import {List,Switch} from 'antd-mobile'
import React from 'react'

export default class SwitchControl extends React.Component{

    constructor(props){
        super(props);
        this.state={};
    }

    setListenerState=(params)=>{

    }

    componentDidMount(){
        if(this.props.model)
            this.props.model.addListener(this);
    }

    componentWillUnmount(){
        if(this.props.model)
            this.props.model.removeListener(this);
    }

    render(){
        let { cShowCaption,value, bCanModify, iMaxLength, cFormatData, cControlType, readOnly, disabled  } = this.state;
        if(bCanModify)
            return (
                <List>
                    <List.Item extra={
                        <Switch readOnly={readOnly} disabled={disabled} checked={value} {...getFieldProps('Switch1', { initialValue: true,  valuePropName: 'checked', })} onClick={(checked) => { console.log(checked); }}/>
                    }
                    >{cShowCaption}</List.Item>   
                </List>
            )
        else
            return (
                <List>
                    <List.Item extra={
                        <Switch readOnly={readOnly} disabled={disabled} checked={value} {...getFieldProps('Switch1', { initialValue: true,  valuePropName: 'checked', })} onClick={(checked) => { console.log(checked); }}/>
                    }
                    >{cShowCaption}</List.Item>   
                </List>
            )
    }

}