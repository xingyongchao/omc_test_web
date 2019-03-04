import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import { Format } from '../../../helpers/formatDate';
import Row from '../../basic/row';
import Col from '../../basic/col';
import * as  eChartCommon from '../eChartCommon';
import * as eChartDemoData from '../eChartDemoData';
import * as  eChartProxy from '../eChartProxy';
import SvgIcon from 'SvgIcon';
const Option = Select.Option;
const RadioGroup = Radio.Group;
let ConvenientQuery = null;
export default class eChartPanelSetDateTime extends React.Component {
  constructor(props) {
    super(props);

    let self = this;
    let config = self.props.colEle.componentConfig.dateTimeConfig || {};
    self.state = {
      bShow_Date: config.hasOwnProperty("fontFamily") ? config.bShow_Date : true,
      bShow_HourMinute: config.hasOwnProperty("fontFamily") ? config.bShow_HourMinute : true,
      bShow_Second: config.hasOwnProperty("fontFamily") ? config.bShow_Second : true,
      bShow_Week: config.hasOwnProperty("fontFamily") ? config.bShow_Week : true,
      dateSplit: config.hasOwnProperty("fontFamily") ? config.dateSplit : "-",//默认或者为空年月日  空格  .   -
      timeSplit: config.hasOwnProperty("fontFamily") ? config.timeSplit : ":",
      fontSize: config.hasOwnProperty("fontFamily") ? config.fontSize : 20,
      fontFamily: config.hasOwnProperty("fontFamily") ? config.fontFamily : "STKaiti"
    }

  }

  render() {
    let self = this;
    let content = self.getCardContent();

    return <Modal
      className="eChartPanelSetDateTime_SetChart eChartPanelSetDateTime_SetDateTime"
      title="添加日期时间"
      onOk={(e) => self.doFunc(true)}
      onCancel={(e) => self.doFunc(false)}
      visible={true}
    >
      {content}
    </Modal>;
  }


  getCardContent() {
    let self = this;
    let content = <div className="hz">

      <Row className="width-less">
        <Col >
          显示日期
        </Col>
        <Col >
          <RadioGroup onChange={(e) => this.setState({ "bShow_Date": e.target.value })} value={self.state.bShow_Date}          >
            <Radio value={true}>是</Radio><Radio value={false}>否</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row className="width-less">
        <Col >
          显示时分
        </Col>
        <Col >
          <RadioGroup onChange={(e) => this.setState({ "bShow_HourMinute": e.target.value })} value={self.state.bShow_HourMinute}          >
            <Radio value={true}>是</Radio><Radio value={false}>否</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row className="width-less">
        <Col >
          显示秒
        </Col>
        <Col >
          <RadioGroup
            onChange={(e) => this.setState({ "bShow_Second": e.target.value })}
            value={self.state.bShow_Second}
            disabled={!self.state.bShow_HourMinute}    >
            <Radio value={true}>是</Radio><Radio value={false}>否</Radio>
          </RadioGroup>
        </Col>
      </Row>
      <Row className="width-less">
        <Col >
          显示周
        </Col>
        <Col >
          <RadioGroup onChange={(e) => this.setState({ "bShow_Week": e.target.value })} value={self.state.bShow_Week}          >
            <Radio value={true}>是</Radio><Radio value={false}>否</Radio>
          </RadioGroup>
        </Col>
      </Row>


      {/* <Row className="width-less-pl">
        <Col >
          日期分隔符
        </Col>
        <Col >
          <RadioGroup
            onChange={(e) => this.setState({ "dateSplit": e.target.value })}
            value={self.state.dateSplit}
          >
            <Radio value={"-"}>-</Radio>
            <Radio value={"."}>.</Radio>
            <Radio value={"/"}>/</Radio>
            <Radio value={"年月日"}>年月日</Radio>
          </RadioGroup>
        </Col>
      </Row> */}


      <Row className="width-less-pl">
        <Col >
          日期分隔符
        </Col>
        <Col >
          <div className="eChartPanelSetDateTime_dateSplit">
            <Col
              className={self.state.dateSplit == "-" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected"}
              onClick={() => self.setState({ "dateSplit": "-" })}
            >-</Col>
            <Col style={{ lineHeight: '20px' }}
              className={self.state.dateSplit == "·" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected"}
              onClick={() => self.setState({ "dateSplit": "·" })}
            >.</Col>
            <Col
              className={self.state.dateSplit == "/" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected"}
              onClick={() => self.setState({ "dateSplit": "/" })}
            >/</Col>
            <Col
              className={self.state.dateSplit == "年月日" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected"}
              onClick={() => self.setState({ "dateSplit": "年月日" })}
            >年月日</Col>
          </div>
        </Col>
      </Row>
      <Row className="width-less-pl" style={{ display: 'none' }} >
        <Col >
          时间分隔符
        </Col>
        <Col >
          <Input defaultValue={self.state.timeSplit} onChange={(e) => this.setState({ "timeSplit": e.target.value })} />
        </Col>
      </Row>

      <Row className="width-less-pl">
        <Col >
          字体大小
        </Col>
        <Col >
          <Input defaultValue={self.state.fontSize} onChange={(e) => this.setState({ "fontSize": e.target.value })} />
        </Col>
      </Row>

    </div >;
    return content;
  }


  displayStyleChange(value) {
    this.setState({ subType: value });
  }
  setEditFieldName(e, fieldName) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ "editFieldName": fieldName })
  }
  setShowCaption(key, value) {
    let sumFields = this.state.sumFields;
    let ele = _.find(sumFields, (ele) => { return ele.key == key });
    if (value)
      ele.showCaption = value;
    else
      ele.showCaption = ele.caption;

    this.setState({ sumFields });
  }
  onChecked = (checked, key) => {
    let self = this;

    let sumFields = self.state.sumFields;
    let ele = _.find(sumFields, (o) => { return o.key == key });
    if (checked) {
      let tmpOrder = 1;
      _.forEach(sumFields, (eleTmp) => {
        if (eleTmp.iOrder > tmpOrder && eleTmp.iOrder != 9999)
          tmpOrder = eleTmp.iOrder;
      });
      ele.bSelected = true;
      ele.iOrder = tmpOrder;
    }
    else {
      ele.bSelected = false;
      ele.iOrder = 9999;
    }
    self.setState({ sumFields });
  }

  checkInteger(fieldValue, bCanZero, bCanSmallThanZero, bCanNumPoint) {

    if (fieldValue.toString().trim() == "") {
      return false;
    }
    else if (isNaN(fieldValue) == true) {
      return false;
    }
    else if (bCanZero == false && Number(fieldValue) == 0) {
      return false;
    }
    else if (bCanSmallThanZero == false && Number(fieldValue) < 0) {
      return false;
    }
    else if (bCanNumPoint == false && fieldValue.toString().indexOf(".") >= 0) {
      return false;
    }
    return true;
  }



  doFunc(bOK) {

    if (bOK) {
      let info = {};
      info.chartKey = eChartCommon.getNewChartKey();
      info.bShow_Date = this.state.bShow_Date;
      info.bShow_HourMinute = this.state.bShow_HourMinute;
      info.bShow_Second = this.state.bShow_Second;
      info.bShow_Week = this.state.bShow_Week;
      info.dateSplit = this.state.dateSplit;
      info.timeSplit = this.state.timeSplit;
      info.fontFamily = this.state.fontFamily;

      if (this.checkInteger(this.state.fontSize, false, false, false) == false) {
        cb.utils.alert('字体大小设置不正确', 'error');
      }
      else if (info.bShow_Date == false && info.bShow_HourMinute == false && info.bShow_Week == false) {
        cb.utils.alert('请设置显示内容', 'error');
      }
      else {
        info.fontSize = Number(this.state.fontSize);
        this.props.doFunc(bOK, info);
      }
    }
    else {
      this.props.doFunc(bOK);
    }
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
}


