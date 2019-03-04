import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import { Format } from '../../../helpers/formatDate';
import Row from '../../basic/row';
import Col from '../../basic/col';
import * as eChartCommon from '../eChartCommon';
import * as eChartDemoData from '../eChartDemoData';
import * as eChartProxy from '../eChartProxy';
const Option = Select.Option;
let ConvenientQuery = null;
export default class eChartPanelSetChart extends React.Component {
  constructor(props) {
    super(props);
    eChartCommon.LogChartInfo("eChartPanelSetChart constructor ", "", 900)
    ConvenientQuery = require('../../filter').default;
    // curOperateType == "setImageText"
    this.bVisible = !!props.bVisible;
    this.state = { panelType: props.panelType || 1 };
    if (this.bVisible) {
      this.colEle = props.colEle;
      this.initState(true, props.colEle.panelChartConfig, props.panelType);
      this.initModelForFilter();
    }
  }

  initState(bFirst, panelChartConfig, panelType) {
    panelChartConfig = panelChartConfig || {};
    this.state = {
      panelType: panelType || 1,
      reportArray: _.isEmpty(this.state.reportArray) ? [] : this.state.reportArray,
      billnum: panelChartConfig.billnum,
      billName: panelChartConfig.billName,
      groupSchemaArray: [],
      groupSchemaId: panelChartConfig.groupSchemaId,
      groupSchemaName: panelChartConfig.groupSchemaName,
      filterId: panelChartConfig.filterId,
      solutionId: panelChartConfig.solutionId,
      condition: panelChartConfig.condition,
      refreshInterval: panelChartConfig.hasOwnProperty("refreshInterval") ? panelChartConfig.refreshInterval : (panelType == 3 ? 0 : 3600),
      subChartColNum: panelChartConfig.subChartColNum || 1
    };
  }
  componentWillReceiveProps(nextProps) {
    eChartCommon.LogChartInfo("eChartPanelSetChart componentWillReceiveProps", "", 900);
    if (this.state.panelType == 3) {
      let preVisible = this.bVisible;
      this.bVisible = !!nextProps.bVisible;
      if (preVisible == true && this.bVisible == false) {
        this.forceUpdate();
      }
      else if (this.bVisible && (_.isEmpty(this.props.colEle) || _.isEqual(nextProps.colEle.panelChartConfig, this.props.colEle.panelChartConfig) == false)) {
        this.colEle = nextProps.colEle;
        this.initState(false, nextProps.colEle.panelChartConfig, nextProps.panelType);
        this.initModelForFilter();
        if (this.state.billnum) {
          this.getGroupSchema(this.state.billnum);
        }
        else {
          this.forceUpdate();
        }
      }
    }
  }

  render() {
    // const { groupConditionState, groupConditionRedux } = this.props;
    eChartCommon.LogChartInfo("eChartPanelSetChart render ", "", 900)
    let self = this;
    if (!self.bVisible) {
      return <div className="eChartPanelDesign_SetChart3_NoData" />;
    }
    let content = self.getCardContent();
    if (this.state.panelType == 3) {
      return <div
        className="eChartPanelDesign_SetChart3"
        key={"setChartKey_" + self.colEle.colKey}
      >
        {content}
        <div className="eChartPanelSplit_bottom3 clearfix">
          <Button type={"primary"} onClick={() => self.doFunc(true)}>确定</Button>
          <Button type={"default"} onClick={() => self.doFunc(false)}>取消</Button>
        </div>
      </div>;
    }
    else {
      return <Modal
        className="eChartPanelDesign_SetChart"
        title="添加图表"
        onOk={(e) => self.doFunc(true)}
        onCancel={(e) => self.doFunc(false)}
        visible={true}
      >
        {content}
      </Modal>;
    }
  }


  getGroupSchemaContent() {
    let self = this;
    let arrArr = this.state.groupSchemaArray;
    let arr = [];
    // if (!!arrArr)
    arrArr.forEach((ele) => {
      let displayStyle = ele.displayStyle;
      if (displayStyle == 2 || displayStyle == 3)
        arr.push(<Option value={ele.id}>{ele.name}</Option>);
    });
    // if (arr.length > 0) {
    return <Select
      value={self.state.groupSchemaId}
      onSelect={(groupSchemaId) => self.setGroupSchemaInfo(groupSchemaId)}
      disabled={self.state.billnum ? false : true}
    >
      {arr}
    </Select>
    // }
    // else {
    // return <div>无图表信息可选择</div>;

    // }
  }

  getReportListContent() {
    let arrArr = this.state.reportArray;
    arrArr.sort(function (a, b) { return a.name.length - b.name.length });

    let arr = [];
    let billNumArr = [];
    arrArr.forEach((ele) => {
      if (billNumArr.indexOf(ele.billnum) < 0) {
        billNumArr.push(ele.billnum);
        arr.push(<Option value={ele.billnum}>{ele.name}</Option>);
      }
    });
    return arr;
  }
  setReportInfo(billnum) {
    let ele = _.find(this.state.reportArray, function (o) { return o.billnum == billnum });
    if (ele) {
      let state = {};
      state.billnum = billnum;
      state.billName = ele.name;
      state.groupSchemaId = "";
      state.filterId = ele.filterId;
      state.solutionId = ele.solutionId;
      state.condition = undefined;
      this.setState(state);
      this.getGroupSchema(billnum);

    }
  }
  setGroupSchemaInfo(groupSchemaId) {
    let ele = _.find(this.state.groupSchemaArray, function (o) { return o.id == groupSchemaId });
    if (ele) {
      let state = {};
      state.groupSchemaId = groupSchemaId;
      state.groupSchemaName = ele.name;
      state.subChartColNum = (ele.chartConfig && JSON.parse(ele.chartConfig) && JSON.parse(ele.chartConfig).subChartColNum) || 1;
      this.setState(state);
    }
  }

  getCardContent() {
    let self = this;
    let options1 = this.getReportListContent();
    let options2 = this.getGroupSchemaContent();
    let filter = undefined;
    if (self.state.filterId) {
      filter = <div
        key={self.state.filterId}
        className={"eChartPanelDesign" + self.state.panelType == 3 ? "_3" : ""}
        style={{ display: '' }}
      >
        <ConvenientQuery
          model={self.model}
          cols={self.state.panelType == 3 ? 1 : 2}
        />
      </div>;
    }
    let content = <div className="tb">
      <Row className="width-less">
        <Col className="eChartPanelSetChart_1">报表</Col>
        <Col>
          <Select
            value={self.state.billnum}
            onSelect={(billnum) => self.setReportInfo(billnum)}
          >
            {options1}
          </Select>
        </Col>
      </Row>
      <Row className="width-less">
        <Col className="eChartPanelSetChart_2">分组方案</Col>
        <Col>
          {options2}
        </Col>
      </Row>
      <Row className="width-less-pl">
        <Col className="eChartPanelSetChart_3">图表列数</Col>
        <Col>
          <Input
            // defaultValue={self.state.subChartColNum}
            value={self.state.subChartColNum}
            onChange={(e) => this.setState({ "subChartColNum": e.target.value })}
          />
        </Col>
      </Row>
      {
        self.state.panelType != 3 ?
          <Row className="width-less-pl">
            <Col className="eChartPanelSetChart_3">刷新频率</Col>
            <Col>
              <Input defaultValue={self.state.refreshInterval} onChange={(e) => this.setState({ "refreshInterval": e.target.value })} />
            </Col>
            <Col className="tips">
              秒<span>(提示:刷新太频繁会造成服务器压力过大)</span>
            </Col>
          </Row>
          : null
      }
      {/* <Row className="width-less-pl">
        <Col className="eChartPanelSetChart_3">图表列数</Col>
        <Col>
          <Input defaultValue={self.state.subChartColNum} onChange={(e) => this.setState({ "subChartColNum": e.target.value })} />
        </Col>
      </Row> */}
      <Row className="gltj">
        <Col className="eChartPanelSetChart_4">过滤条件</Col>
        <Col>
          {filter}
        </Col>
      </Row>

    </div >;
    return content;
  }

  getReportList() {

    let param = {};
    let callback = (json) => {
      if (json.code === 200) {
        if (json.data) {
          this.setState({ reportArray: json.data });
        }
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getReportList, 'GET', param, callback);
  }

  getGroupSchema(billnum) {
    if (billnum) {
      let param = { billnum: billnum };
      let callback = (json) => {
        if (json.code === 200) {
          if (json.data) {
            let groupSchemaArray = json.data || [];
            if (this.state.panelType == 3) {
              groupSchemaArray = _.filter(groupSchemaArray, function (o) { return o.isMobile == true });
            }
            this.setState({ groupSchemaArray });
          }
        }
      }
      eChartProxy.doProxy(eChartProxy.url.getGroupSchema, 'GET', param, callback);
    }
    else {
      this.setState({ groupSchemaArray: [] });
    }
  }

  initModelForFilter() {

    let self = this;
    this.model = new cb.models.SimpleModel({});
    this.model.getParams = function () {
      let tmp = {
        filterId: self.state.filterId,
        condition: self.state.condition,
        isInDesign: true,
        solutionId: self.state.solutionId,
        bHasNullDate: true,
        panelType: self.state.panelType
      };
      return tmp;
    };
    this.model.on('filterClick', function (args) {
      self.state.condition = args.condition;
    });
    this.model.setName("监控视图图表设置");
  }


  doFunc(bOK) {
    this.model.execute('eChartPanel_GetCondition');
    if (bOK) {
      let info = {};
      info.chartKey = eChartCommon.getNewChartKey();
      info.billnum = this.state.billnum || "";
      info.billName = this.state.billName || "";
      info.groupSchemaId = this.state.groupSchemaId || "";
      info.groupSchemaName = this.state.groupSchemaName || "";
      info.filterId = this.state.filterId || "";
      info.solutionId = this.state.solutionId || "";
      info.condition = this.state.condition;
      info.refreshInterval = this.state.refreshInterval;
      info.subChartColNum = this.state.subChartColNum;
      if (info.refreshInterval == "") {
        info.refreshInterval = 0;
      }
      if (info.billnum == "") {
        cb.utils.alert('请设置报表', 'error');
      }
      else if (info.groupSchemaId == "") {
        cb.utils.alert('请设置方案', 'error');
      }
      else if (info.filterId == "") {
        cb.utils.alert('请设置filterId', 'error');
      }
      else if (info.solutionId == "") {
        cb.utils.alert('请设置solutionId', 'error');
      }
      else if (_.isEmpty(info.condition)) {
        cb.utils.alert('请设置condition', 'error');
      }
      else if (_.isNull(info.subChartColNum) || info.subChartColNum.toString().trim() == "") {
        cb.utils.alert("图表列数请输入1-3的整数。");
      }
      else if (isNaN(info.subChartColNum) == true || Number(info.subChartColNum) < 1 || Number(info.subChartColNum) > 3) {
        cb.utils.alert("图表列数请输入1-3的整数。");
      }
      else {
        this.props.doFunc(bOK, info);
      }
    }
    else {
      this.props.doFunc(bOK);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    let bFlag;
    if (this.state.panelType == 3) {
      if (_.isEqual(nextState, this.state) == false) {
        bFlag = true;
      }
      else {
        bFlag = false;
      }
    }
    else {
      bFlag = true;
    }
    eChartCommon.LogChartInfo("eChartPanelSetChart shouldComponentUpdate return ", bFlag, 900);
    return bFlag;
  }
  componentDidMount() {
    this.getReportList();
    if (this.state.billnum)
      this.getGroupSchema(this.state.billnum);
  }
}


