import React, { Component } from 'react';
import Row from '../../../basic/row';
import { genAction, proxy } from '../../../../helpers/util';
import _ from 'lodash';
import * as  eChartCommon from '../../eChartCommon';
import * as  eChartProxy from '../../eChartProxy';
import CountUp from 'react-countup'
// let ConvenientQuery = null;
export default class eChartSumCountUp extends Component {

  constructor(props) {
    super(props);
    // ConvenientQuery = require('../../filter').default;
    eChartCommon.LogChartInfo(" eChartSumCountUp props.sumConfig ", JSON.stringify(props.sumConfig), 16)

    this.state = {
      panelType: props.panelType ? props.panelType : 1,
      condition: props.sumConfig.condition,
      sumConfig: props.sumConfig,
      totalFields: {},
      controls: [],
      data: {}
    };
    this.oldValue = 0;
    this.numPoint = 0;
  }
  componentDidMount() {
    this.setSumFileds(this.state.sumConfig.sumFields);
    this.setSum([{}]);
    this.getData();
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
      if (this.state.panelType == 1) {
        self.checkTimer();
      }
      let queryParams = {
        billnum: sumConfig.billnum,
        condition: self.state.condition,
        isOnlyTotal: true
      }
      let date1;
      let date2;
      let callback = (json) => {
        date2 = new Date().getTime();
        eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求结束 时间 （秒） =" + parseInt(date2 - date1) / 1000 + " json.code = " + json.code + " json.message = " + json.message + " queryParams   ", JSON.stringify(queryParams), 15);
        if (json.code === 200) {
          let sumData = json.data.sumRecordList;
          self.setSum(sumData);
        }
        else {
          eChartCommon.LogChartInfo("获取图形报表数据Err  查询参数 =" + JSON.stringify(queryParams) + "  errMsg  ", json.message, 999);
        }
      }
      date1 = new Date().getTime();
      eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求开始 时间 =" + Date() + "  queryParams   ", JSON.stringify(queryParams), 15);
      queryParams.isFromKanban = true;
      eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_.cloneDeep(queryParams)), callback);
    }
  }


  checkTimer() {
    let self = this;
    if (self._timer == undefined && self.state.panelType == 1) {
      let refreshInterval = self.state.sumConfig.refreshInterval;
      if (isNaN(refreshInterval))
        return;
      refreshInterval = Number(refreshInterval);
      if (Number.isInteger(refreshInterval) == false) {
        eChartCommon.LogChartInfo("大屏汇总区域设置的自动刷新间隔错误。 refreshInterval ", refreshInterval, 999);
        return;
      }
      if (refreshInterval == 0) {
        eChartCommon.LogChartInfo("大屏汇总区域设置不自动刷新。 refreshInterval ", refreshInterval, 6);
        return;
      }
      if (refreshInterval < 5) {
        eChartCommon.LogChartInfo("大屏汇总区域设置的自动刷新间隔太短。 refreshInterval ", refreshInterval, 999);
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
    sumFields.sort(function (a, b) { return a.iOrder - b.iOrder });
    let totalFields = {};
    let controls = [];
    _.forEach(sumFields, (item) => {
      if (item.bSelected) {
        const totalField = { caption: item.showCaption || item.caption, value: 0, postfix: item.postfix };
        totalFields[item.key] = totalField;
        controls.push(totalField);
      }
    });
    this.state.totalFields = totalFields;
    this.state.controls = controls;
    eChartCommon.LogChartInfo(" setSumFileds controls = ", JSON.stringify(controls), 6);
    // this.setState({ totalFields, controls });
  }
  setSum(sumData) {
    let totalFields = this.state.totalFields;
    if (!sumData) sumData = [{}];
    let controls = [];
    _.forEach(totalFields, (item, key) => {
      controls.push({ caption: item.caption, value: sumData[0][key] || 0, postfix: item.postfix });
    });
    this.setState({ controls });
    eChartCommon.LogChartInfo(" setSum controls = ", JSON.stringify(controls), 6);

  }
  getNumPoint(value) {
    let numPoint = 0;
    let tmp = 'A' + value;
    if (tmp.indexOf(".") >= 0) {
      numPoint = tmp.length - tmp.lastIndexOf(".") - 1;
      if (numPoint < 0)
        numPoint = 0;
    }
    return numPoint;
  }
  formatNumpoint(value) {
    let tmp = parseFloat(value).toFixed(this.numPoint);
    return tmp;
  }
  domFun(value) {
    let self = this;
    let bUseQianSplit = self.state.sumConfig.bUseQianSplit;
    let numDom = "";
    if (value) {
      let num = [];
      value = self.formatNumpoint(value);
      // num = formatData.formatAmount(value, 0).split("");
      num = ('' + value).split("");
      if (bUseQianSplit) {
        let num2 = [];
        let numPoint = self.numPoint;
        num = num.reverse();
        let count = 0;
        num.forEach(function (item, index) {
          if (item == ".") {
            numPoint = 0;
            count = -1;
          }
          if (count == 3) {
            num2.push(",");
            count = 0;
          }
          num2.push(item);
          if (numPoint <= 0)
            count = count + 1;

        });
        num = num2.reverse();
      }

      let dataNum = num.length;
      num.forEach(function (item, index) {
        if (item.match('^[0-9]*$')) {
          numDom += '<span class="' + self.getClassNamePrifx("eChartSumCountUp") + '-Num">' + item + '</span>';
        }
        else if (item == ".") {
          numDom += '<span class="' + self.getClassNamePrifx("eChartSumCountUp") + '-Point">' + item + '</span>';
        }
        else if (item == ",") {
          numDom += '<span class="' + self.getClassNamePrifx("eChartSumCountUp") + '-Split">' + item + '</span>';
        }
      });
    }
    return numDom;
  }
  componentDidUpdate() {
    this.oldValue = this.newValue;
  }
  getClassNamePrifx(className) {
    if (this.state.panelType == 2)
      className = className + "2";
    return className;
  }

  render() {

    let self = this;
    let sumConfig = self.state.sumConfig;
    let controls = self.state.controls;
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
    eChartCommon.LogChartInfo(" controls = ", JSON.stringify(controls), 6);
    let sumArr = null;
    if (!!controls.length) {
      let item = controls[0];
      self.newValue = item.value ? item.value : 0;
      self.numPoint = self.getNumPoint(self.newValue);
      eChartCommon.LogChartInfo(" eChartSumCountUp self.newValue= " + self.newValue.toString() + " numPoint ", self.numPoint, 900);
      sumArr = <div className={self.getClassNamePrifx("eChartSumCountUp") + "-Inner"} style={{ float: 'left', width: '100%', overflow: 'hidden', }}>
        <div className={self.getClassNamePrifx("eChartSumCountUp") + "-Caption"} style={skinStyle_Caption} title={item.value} >{item.caption}</div>
        <div className={self.getClassNamePrifx("eChartSumCountUp") + "-Value"} style={skinStyle_Value}  >
          <CountUp
            style={skinStyle_Value}
            start={self.oldValue}
            end={self.newValue}
            duration={3}
            // useGrouping={true}
            // separator=","
            decimals={self.numPoint}
            decimal="."
            formattingFn={(value) => self.domFun(value)}
          />
        </div>
      </div>;

    }
    let style = { height: '100%', width: '100%', textAlign: ' center', alignItems: 'center', display: 'flex' };
    if (sumConfig.hasOwnProperty("fontSize")) style.fontSize = sumConfig.fontSize;
    if (sumConfig.hasOwnProperty("fontFamily")) style.fontFamily = sumConfig.fontFamily;
    return <div className={self.getClassNamePrifx("eChartSumCountUp") + "-Outer"} style={style}>{sumArr}</div>;
  }
}
