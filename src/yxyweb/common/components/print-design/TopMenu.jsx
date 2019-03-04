import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Input, Select, Switch } from 'antd';
import { Row, Col, Label } from '../basic';
import SvgIcon from 'SvgIcon';
import * as printactions from '../../redux/print';


class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.actions = props.printactions;
    }
    /*新增模板*/
    addNewTemplate = () => {
        let { selectType } = this.props.print;
        this.actions.addTemplate({ "billno": selectType });
    }
    onOk = (e) => {
        let { selectType, templatecode, templatename } = this.props.print;

        let renderData = { templatecode: templatecode, templatename: templatename, billno: selectType };
        this.actions.addTemplate(renderData);
        this.actions.setData({ showModal: false, templatecode: '', templatename: '' });
    }
    /*关闭modal*/
    onCancel = (e) => {
        this.actions.setData({ showModal: false });
    }
    getTypeControl = () => {
        let { templateData } = this.props.print
        if (!templateData) return '';
        let control = [];
        templateData.forEach(function (element) {
            control.push(
                <Select.Option key={element.bo_code}>{element.bo_name}</Select.Option>
            )
        }, this);
        return control;
    }
    render() {
        let { showModal, selectType, templatecode, templatename } = this.props.print;
        let typeControl = this.getTypeControl();
        return (
            <Row className="uretail-print-topmenu" >
                <Button className="no-border-radius m-l-10" type="primary" onClick={() => this.addNewTemplate()}><SvgIcon type="plus-copy" />新增模板</Button>
            </Row>
        );
    }
}
function mapStateToProps(state) {
    return {
        print: state.print.toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        printactions: bindActionCreators(printactions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
