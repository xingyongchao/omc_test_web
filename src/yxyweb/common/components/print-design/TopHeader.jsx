import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Affix, Anchor } from 'antd';
import { Row, Col, Label } from '../basic';
import * as printactions from '../../redux/print';
const { Link } = Anchor;

class TopHeader extends Component {
    constructor(props) {
        super(props);
        this.actions = props.printactions;
    }
    componentDidMount() {
        // this.actions.loadBoList();
    }
    onTypeClick = (bo_code) => {
        this.actions.setData({ selectType: bo_code });
        // window.location.href('#' + bo_code);
    }
    getControl = () => {
        let { templateData, selectType } = this.props.print;
        if (!templateData) return '';
        let control = [];
        templateData.forEach(function (element) {
            let className = "topHeader-item";
            if (selectType == element.bo_code) className = "topHeader-item-selected"
            control.push(
                <Col span={1} key={element.bo_code} className={className}><div onClick={() => this.onTypeClick(element.bo_code)}>
                    {/* {element.bo_name} */}
                    <Link href={"#" + element.bo_code} title={element.bo_name} />
                </div></Col>
            )
        }, this);
        return <Row colCount={8}>{control}</Row>
    }
    render() {
        let control = this.getControl();
        return (
            <Anchor affix={false}>
            <Row className="uretail-print-topHeader" >
                {control}
            </Row>
            </Anchor>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
