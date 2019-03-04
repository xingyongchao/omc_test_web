import React, { Component } from 'react';
import Row from '../../../basic/row';
import { genAction, proxy } from '../../../../helpers/util';
import _ from 'lodash';
import * as eChartCommon from '../../eChartCommon';
import * as eChartProxy from '../../eChartProxy';
// let ConvenientQuery = null;
//panelsum eChartSum

export default class eChartSum extends Component {

  constructor(props) {
    super(props);
    eChartCommon.LogChartInfo("eChartSum constructor ", "", 900)
    // ConvenientQuery = require('../../filter').default;
    this.initState(true, props.sumConfig, props.panelType, props.isInDesign)
    // this.initModelForFilter();
  }

  initState(bFirst, sumConfig, panelType, isInDesign) {
    this.state = {
      panelType: panelType || 1,
      sumConfig: sumConfig,
      condition: sumConfig.condition,
      isInDesign: isInDesign,
      // sumConfig: {
      // title: "累计信息",
      // refreshInterval: 10,//秒
      // billnum: "rm_saleanalysis",
      // groupSchemaId: "4494",
      // filterId: "12999193",
      // bShowFilter: true,
      // solutionId: '3353401',
      // sumFields: [
      // { key: "billnum", caption: "单据数", iOrder: 1 },
      // { key: "fMoney", caption: "金额", iOrder: 3 },
      // { key: "fDiscount", caption: "折扣额", iOrder: 4 },
      // { key: "fQuantity", caption: "销售数量", iOrder: 2 }
      // ]
      // }
      totalFields: {},
      controls: [],
      data: {}
    };
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
    eChartCommon.LogChartInfo("eChartSum shouldComponentUpdate return ", bFlag, 900);
    return bFlag;
  }
  componentWillReceiveProps(nextProps) {
    eChartCommon.LogChartInfo("eChartSum componentWillReceiveProps ", "", 900)
    if (this.state.panelType == 3 && _.isEqual(nextProps.sumConfig, this.state.sumConfig) == false) {
      this.initState(false, nextProps.sumConfig, nextProps.panelType, nextProps.isInDesign);
      this.setSumFileds(this.state.sumConfig.sumFields);
      // this.setSum([{}]);
      this.getData();
    }
  }
  componentDidMount() {
    this.setSumFileds(this.state.sumConfig.sumFields);
    // this.setSum([{}]);
    this.getData();
    // if (this.props.model)
    // this.props.model.addListener(this);
  }
  componentWillUnmount() {
    let self = this;
    if (self._timer) {
      clearInterval(self._timer);
      self._timer = null;
    };
    self._unmount = true
  }


  getData() {
    let self = this;
    let sumConfig = this.state.sumConfig;
    if (self.state.condition && sumConfig.billnum) {
      self.checkTimer();
      let queryParams = {
        billnum: sumConfig.billnum,
        condition: self.state.condition,
        isOnlyTotal: true
      }
      let date1;
      let date2;
      let callback = (json) => {
        date2 = new Date().getTime();
        eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求结束 时间 （秒） =" + parseInt(date2 - date1) / 1000 + " json.code = " + json.code + " json.message = " + json.message + " queryParams ", JSON.stringify(queryParams), 15);
        if (json.code === 200) {
          let sumData = json.data.sumRecordList;
          self.setSum(sumData);
        }
        else {
          eChartCommon.LogChartInfo("获取图形报表数据Err 查询参数 =" + JSON.stringify(queryParams) + " errMsg ", json.message, 999);
        }
      }
      date1 = new Date().getTime();
      eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求开始 时间 =" + Date() + " queryParams ", JSON.stringify(queryParams), 15);
      queryParams.isFromKanban = true;
      eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_.cloneDeep(queryParams)), callback);
    }
  }
  getClassNamePrifx(className) {
    if (this.state.panelType == 2)
      className = className + "2";
    return className;
  }


  checkTimer() {
    let self = this;
    if (self._timer == undefined && (self.state.panelType == 1 || self.state.panelType == 3) && !!self.state.isInDesign == false) {
      let refreshInterval = self.state.sumConfig.refreshInterval;
      if (isNaN(refreshInterval)) {
        eChartCommon.LogChartInfo("汇总区域设置的自动刷新间隔错误。 refreshInterval ", refreshInterval, 999);
        return;
      }
      refreshInterval = Number(refreshInterval);
      if (Number.isInteger(refreshInterval) == false) {
        eChartCommon.LogChartInfo("汇总区域设置的自动刷新间隔错误。 refreshInterval ", refreshInterval, 999);
        return;
      }
      if (refreshInterval == 0) {
        eChartCommon.LogChartInfo("汇总区域设置不自动刷新。 refreshInterval ", refreshInterval, 6);
        return;
      }
      if (refreshInterval < 1) {
        eChartCommon.LogChartInfo("汇总区域设置的自动刷新间隔太短。 refreshInterval ", refreshInterval, 999);
        return;
      }
      // refreshInterval = 2222;
      self._timer = setInterval(() => {
        if (self.props.showIt == true) {
          self.getData()
        }
      }, refreshInterval * 1000);
    }
  }
  //panelsum TotalContainer
  setSumFileds(sumFields) {
    let tmpSumFields = _.cloneDeep(sumFields);
    tmpSumFields.sort(function (a, b) { return a.iOrder - b.iOrder });
    let totalFields = {};
    let controls = [];
    _.forEach(tmpSumFields, (item) => {
      if (item.bSelected) {
        const totalField = { caption: item.showCaption || item.caption, value: 0, postfix: item.postfix };
        totalFields[item.key] = totalField;
        controls.push(totalField);
      }
    });
    this.state.totalFields = totalFields;
    this.state.controls = controls;
    this.setSum([{}]);
    eChartCommon.LogChartInfo(" setSumFileds controls = ", JSON.stringify(controls), 6);
    // this.setState({ totalFields, controls });
  }
  setSum(sumData) {
    let totalFields = this.state.totalFields;
    if (!sumData || _.isEmpty(sumData) || !sumData.length) sumData = [{}];
    let controls = [];
    _.forEach(totalFields, (item, key) => {
      controls.push({ caption: item.caption, value: sumData[0][key] || 0, postfix: item.postfix });
    });
    this.state.controls = controls;
    this.forceUpdate();
    // this.setState({ controls });
    eChartCommon.LogChartInfo(" setSum controls = ", JSON.stringify(controls), 6);

  }
  render() {
    eChartCommon.LogChartInfo("eChartSum render ", "", 900)
    let self = this;
    let sumConfig = self.state.sumConfig;
    let controls = this.state.controls;
    let skinStyle_Value = {};
    let skinStyle_Caption = {};
    if (!!self.props.skinConfig && self.props.skinConfig.displaySkin) {
      skinStyle_Value.color = self.props.skinConfig.displaySkin.chartSum_NumColor;
      skinStyle_Caption.color = self.props.skinConfig.displaySkin.textColor2;
    }
    else if (this.state.panelType == 2) {
      skinStyle_Caption.color = eChartCommon.panelDefaultValue.panel2SumTextColor;
    }
    skinStyle_Caption.fontSize = Number(sumConfig.fontSize) || 12;
    skinStyle_Value.fontSize = Number(sumConfig.valueFontSize) || 24;
    // valueFontSize
    eChartCommon.LogChartInfo(" controls = ", JSON.stringify(controls), 6);
    // let filter =
    // <div className="eChart-filter" style={{ display: self.state.sumConfig.bShowFilter ? '' : 'none' }}>
    // <ConvenientQuery model={this.model} cols={1} />
    // </div>;
    let sumArr = [];
    if (!!controls.length) {
      const width = 100 / controls.length;
      controls.forEach(item => {
        sumArr.push(<div
          className={self.getClassNamePrifx("eChartSumSub")}
          style={{ float: 'left', width: width + '%', overflow: 'hidden', }}
        // style={{ float: 'left', width: width + '%', whiteSpace: 'normal', wordWrap: 'break-word', wordBreak: 'break-all' }}
        >
          <div style={skinStyle_Caption} >{item.caption}</div>
          <div>
            <span style={skinStyle_Value} >{item.value}</span>
            {/* <span style={skinStyle_Caption} >{item.postfix}</span> */}
          </div>
        </div>)
      });
    }
    let style = { width: '100%', textAlign: ' center' };
    if (sumConfig.hasOwnProperty("fontSize")) style.fontSize = sumConfig.fontSize;
    if (sumConfig.hasOwnProperty("fontFamily")) style.fontFamily = sumConfig.fontFamily;

    return (

      <div style={{ height: '100%', width: '100%', textAlign: ' center', alignItems: 'center', display: 'flex' }}>
        <div className={self.getClassNamePrifx("eChartSum")} style={style}>
          {/* {filter} */}
          {sumArr}
        </div>
      </div>
    );
  }

  // render() {
  // let controls = this.state.controls;
  // if (!controls.length)
  // return null;
  // const itemClassName = `rpt-zhekou-${controls.length === 1 ? 'padding' : 'center'}`;
  // const sumArr = [];
  // const width = 100 / controls.length;
  // controls.forEach(item => {
  // sumArr.push(<div className="rpt-zhekou-list" style={{ float: 'left', width: width + '%' }}>
  // <span className="zhekou-name"><h3 className={itemClassName}>{item.caption}</h3></span>
  // <span className="zhekou-number"><h4 className={itemClassName}>{item.value}</h4></span>
  // </div>)
  // });
  // return (
  // <Row className="rpt-zhekou">{sumArr}</Row>
  // );
  // }

}
