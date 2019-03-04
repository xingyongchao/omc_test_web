import React, { Component } from 'react';
import { Popover, Input, Button, Radio } from 'antd';
// import { Popover, Input, Button, Radio } from 'antd-mobile';
import { Format } from '../../../helpers/formatDate';
import Row from '../../basic/row';
import Col from '../../basic/col';
import SvgIcon from 'SvgIcon';
const RadioGroup = Radio.Group;

export default class eChartPanelSplit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      splitInfo: {
        splitType: "col",
        count: 2,
        num1: 1,
        num2: 1,
        num3: 1,
        bInnerBorder: true,
        bInnerMargin: true,
        bOuterBorder: false,
        bOuterMargin: false
      },
      panelType: props.panelType ? props.panelType : 1,
    };
  }

  render() {
    // const { groupConditionState, groupConditionRedux } = this.props;
    let self = this;
    let content = self.getSplitContent();
    let visible = self.props.selectedColKey == self.props.colEle.colKey && self.props.curOperateType == "splitCol";

    return <div className={"eChartPanelSplit " + (self.props.colEle.backgroundImage ? "eChartPanelSplit_HasImg" : "eChartPanelSplit_NoImg")}>
      <Popover
        content={content}
        trigger={"click"}
        visible={visible}
        onVisibleChange={(visible2) => self.showContent(visible2, 1)}
      >
        <Button
          className="chaifen"
          onClick={() => self.showContent(true, 2)}
          style={{ color: self.props.skinConfig ? self.props.skinConfig.designSkin.textColor : undefined }}
          title="拆分"  >
          <SvgIcon type="chaifen" />
          {/* 拆分 */}
        </Button>
      </Popover>
    </div>;

  }

  setStateInfoValue(name, value) {
    let self = this;
    let splitInfo = self.state.splitInfo;
    splitInfo[name] = value;
    self.setState({ splitInfo });
  }
  getSplitContent() {
    let self = this;
    let splitInfo = self.state.splitInfo;
    let content = <div>
      <div className="eChartPanelSplit_content">
        <div className="clearfix">
          <Row className="label-title">拆分方向</Row>
          <Row className="direction">
            {/* <Button type={splitInfo.splitType == "row" ? "primary" : ""} onClick={() => self.setStateInfoValue("splitType", "row")}>横向</Button>
            <Button type={splitInfo.splitType == "col" ? "primary" : ""} onClick={() => self.setStateInfoValue("splitType", "col")}>纵向</Button> */}

            {self.state.panelType == 1 ? <Col className={splitInfo.splitType == "row" ? "selected" : "unselected"} onClick={() => self.setStateInfoValue("splitType", "row")}><SvgIcon type="hang" /> </Col> : null}
            <Col className={splitInfo.splitType == "col" ? "selected" : "unselected"} onClick={() => self.setStateInfoValue("splitType", "col")}><SvgIcon type="lie" /></Col>
          </Row>
        </div>
        <div className="clearfix">
          <Row className="label-title">拆分数量</Row>
          <Row className="num">
            <Button type={splitInfo.count == 2 ? "primary" : ""} onClick={() => self.setStateInfoValue("count", 2)}>2</Button>
            <Button type={splitInfo.count == 3 ? "primary" : ""} onClick={() => self.setStateInfoValue("count", 3)}>3</Button>
          </Row>
        </div>
        <div className="clearfix">
          <Row className="label-title">拆分比例</Row>
          <div className="bili clearfix">
            <Input style={{ display: "inline" }} value={splitInfo.num1} onChange={(e) => self.setStateInfoValue("num1", e.target.value)} />
            <span>:</span>
            <Input style={{ display: "inline" }} value={splitInfo.num2} onChange={(e) => self.setStateInfoValue("num2", e.target.value)} />
            {splitInfo.count == 3 ? <span>:</span> : ""}
            {splitInfo.count == 3 ? <Input style={{ display: "inline" }} value={splitInfo.num3} onChange={(e) => self.setStateInfoValue("num3", e.target.value)} /> : ""}
          </div>
        </div>
        {self.state.panelType == 1 ? <div>
          <div className="clearfix">
            <Row>
              <span className="label-title">保留内层边框</span>
              <RadioGroup
                value={splitInfo.bInnerBorder ? true : false}
                onChange={(e) => self.setStateInfoValue("bInnerBorder", e.target.value)}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            </Row>
          </div>
          <div className="clearfix">
            <Row>
              <span className="label-title">保留内层间距</span>
              <RadioGroup
                value={splitInfo.bInnerMargin ? true : false}
                onChange={(e) => self.setStateInfoValue("bInnerMargin", e.target.value)}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            </Row>
          </div>
          <div className="clearfix">
            <Row>
              <span className="label-title">保留外层边框</span>
              <RadioGroup
                value={splitInfo.bOuterBorder ? true : false}
                onChange={(e) => self.setStateInfoValue("bOuterBorder", e.target.value)}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            </Row>
          </div>
          <div className="clearfix">
            <Row>
              <span className="label-title">保留外层间距</span>
              <RadioGroup
                value={splitInfo.bOuterMargin ? true : false}
                onChange={(e) => self.setStateInfoValue("bOuterMargin", e.target.value)}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            </Row>
          </div>
        </div> : null}
      </div >
      <div className="eChartPanelSplit_bottom clearfix">
        <Button type={"primary"} onClick={() => self.doFunc(true)}>确定</Button>
        <Button type={"default"} onClick={() => self.doFunc(false)}>取消</Button>
      </div>
    </div >;
    return content;
  }
  doFunc(bOK) {
    let splitInfo = this.state.splitInfo;
    // splitInfo.colKey = this.props.colEle.colKey;
    this.props.doFunc(bOK, splitInfo);
  }

  showContent(visible, type) {
    if (visible == true && type == 2) {
      this.props.showContent(true, this.props.colEle.colKey);
    }
    if (visible == false && type == 1) {
      this.props.showContent(false);
    }

  }

}
