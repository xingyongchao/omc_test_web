import React, { Component } from 'react'
import * as lineChart from '../options/lineChart';
import * as barChart from '../options/barChart';
import * as pieChart from '../options/pieChart';
import * as rankTableChart from '../options/rankTableChart_Mobile';
import * as pieChart_SingleValue from '../options/pieChart_SingleValue';
import * as scatterChart from '../options/scatterChart';
import * as barlineChart from '../options/barlineChart';
import * as eChartCommon from '../eChartCommon';
import * as eChartProxy from '../eChartProxy';
import SvgIcon from 'SvgIcon';
// import { Icon } from 'antd';
import _ from 'lodash';
import { Format } from '../../../helpers/formatDate';
// import ReactEcharts from '../../AsyncComponents/AsyncEchartsForReact';
import ReactEcharts from 'echarts-for-react';
import Row from 'yxyweb/common/components/basic/row';
import Col from 'yxyweb/common/components/basic/col';
// let ReactEcharts = null;
const echarts = require('echarts/lib/echarts');

export default class EChartDisplay_Mobile extends Component {
  constructor(props) {
    eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart constructor", "", 900);
    super(props);
    // ReactEcharts = require('../../AsyncComponents/AsyncEchartsForReact').default;

    this.serieNum = Math.random();
    this.bUpdated = false;
    this.chinaMapTreeData = null;//参照所需要的省市县数据
    this.scatterData = {
      option: {},
      regionInfo: {}
    };
    this.regionRegistering = [];
    this.regionRegistered = [];

    if (this.props.chartDisplayType == "mobile") {//移动报表
      let eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(this.props.eChartConfig)
      this.state = {
        eChartConfig,
        subChartConfigArr: eChartCommon.upgradeConfig_ForScatter_Batch(eChartConfig.subChartConfigArr),
        // subChartColNum: eChartConfig.subChartColNum || 1,
        subChartColNum: 1,
        chartDisplayType: this.props.chartDisplayType,
        billnum: this.props.billnum,
        groupSchemaId: this.props.groupSchemaId,
        condition: this.props.condition || null,
        bMounted: false,
        firstQueryDone: this.props.firstQueryDone || false
      };
      this.getData();
    }
    else {
      let panelChartConfig = this.props.panelChartConfig;
      this.state = {
        eChartConfig: null,
        subChartConfigArr: [],
        // subChartColNum: panelChartConfig.subChartColNum || 1,
        subChartColNum: 1,
        chartDisplayType: this.props.chartDisplayType,
        panelType: this.props.panelType,
        panelChartConfig: panelChartConfig,
        isInDesign: this.props.isInDesign || false,
        billnum: panelChartConfig.billnum,
        groupSchemaId: panelChartConfig.groupSchemaId,
        condition: panelChartConfig.condition,
        bMounted: false,
        firstQueryDone: true
      };
    }
  }
  isInPanel = () => {
    return this.state.chartDisplayType == "panel";
  }
  isInMobile = () => {
    return this.state.chartDisplayType == "mobile";
  }
  componentDidMount() {

    if (this.props.viewModel) {
      this.props.viewModel.on("filterClick", (params) => {
        // this.setState({ condition: params.condition });
        this.state.condition = params.condition;
        this.getData();
      });
    }
    if (this.state.chartDisplayType == "mobile") {
      this.props.viewModel.on('firstQueryDone', (params) => {
        if (!!params)
          this.state.firstQueryDone = params;
        // this.setState({ firstQueryDone: params });
      });
    }
    this.state.bMounted = true;
    if (this.state.panelType == 3) {
      this.getConfig();
    }
    //
    // this.setState({ bMounted: true });
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
    eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart shouldComponentUpdate return ", bFlag, 900);
    return bFlag;
  }

  componentWillReceiveProps(nextProps) {
    eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart componentWillReceiveProps", "", 900);
    if (this.state.panelType == 3) {
      if (_.isEqual(nextProps.panelChartConfig, this.state.panelChartConfig) == false) {
        let panelChartConfig = nextProps.panelChartConfig;
        this.state.panelChartConfig = panelChartConfig;
        this.state.billnum = panelChartConfig.billnum;
        this.state.groupSchemaId = panelChartConfig.groupSchemaId;
        this.state.condition = panelChartConfig.condition;
        this.state.subChartConfigArr = [];
        // this.state.subChartColNum = panelChartConfig.subChartColNum;
        this.state.subChartColNum = 1;
        this.getConfig();
      }
    }
    else {
      if (_.isEqual(nextProps.groupSchemaId, this.props.groupSchemaId) == false) {
        this.scatterData = {
          option: {},
          regionInfo: {}
        }
      }
      if (
        _.isEqual(nextProps.billnum, this.props.billnum) == false
        || _.isEqual(nextProps.groupSchemaId, this.props.groupSchemaId) == false
        || _.isEqual(nextProps.eChartConfig, this.props.eChartConfig) == false
        // || _.isEqual(nextProps.condition, this.props.condition) == false
      ) {
        this.state.billnum = nextProps.billnum;
        this.state.groupSchemaId = nextProps.groupSchemaId;
        this.state.eChartConfig = nextProps.eChartConfig ? eChartCommon.upgradeConfig_ForEChartArr(nextProps.eChartConfig) : this.state.eChartConfig;
        this.state.data = undefined;
        // this.state.condition = nextProps.condition;
        this.getData();
      }
    }
  }

  getData() {
    if (this.state.firstQueryDone == false)
      return;
    let self = this;
    // if (this.isInPanel()) {
    let subChartConfigArr = this.state.subChartConfigArr;
    if (subChartConfigArr && subChartConfigArr.length > 0) {
      subChartConfigArr.forEach
        ((config, index) => {
          config.data = undefined;
          this.getSubChartData(config, index);
        })
    }
    // }
    // else {
    //   let config = this.state.config;
    //   this.getSubChartData(this.state.config, -1);
    // }
  }

  getSubChartData(config, index) {
    let self = this;
    let queryParams = {
      billnum: this.state.billnum,
      groupSchemaId: this.state.groupSchemaId,
      condition: this.state.condition
    };

    let dataParams = [];
    let dimensionX = _.get(config, "yySetting.dataField.dimensionX");
    let dimensionSub = _.get(config, "yySetting.dataField.dimensionSub");
    let measure = _.get(config, "yySetting.dataField.measure");
    let topn = _.get(config, "yySetting.orderInfo.bUseDimensionXRows") ? _.get(config, "yySetting.orderInfo.dimensionXRows") : _.get(config, "yySetting.orderInfo.dimensionSubRows");
    let orderField = _.get(config, "yySetting.orderInfo.orderField")
    let topnOrderBy = _.get(config, "yySetting.orderInfo.orderBy")
    let LngAndLat = _.get(config, "yySetting.dataField.LngAndLat");
    if (dimensionX && dimensionX.length > 0) {
      dimensionX.forEach(eleItem => {
        let ele = {};
        ele.fieldname = eleItem.nameField;
        ele.groupType = eleItem.groupType;
        ele.depends = eleItem.depends;
        // if (dataParams.length == dimensionX.length - 1)
        ele.topn = topn;
        dataParams.push(ele);
      });
    }
    ;
    if (dimensionSub && dimensionSub.length > 0) {
      dimensionSub.forEach(eleItem => {
        let ele = {};
        ele.fieldname = eleItem.nameField;
        ele.groupType = eleItem.groupType;
        ele.depends = eleItem.depends;
        dataParams.push(ele);
      });
    }
    ;
    if (measure && measure.length > 0) {
      measure.forEach(eleItem => {
        let ele = {};
        ele.fieldname = eleItem.valueField;
        ele.groupType = eleItem.groupType;
        ele.depends = eleItem.depends;
        if (ele.fieldname == orderField) {
          ele.topnOrderBy = topnOrderBy;
        }
        dataParams.push(ele);
      });
    }
    if (LngAndLat && LngAndLat.longitude) {
      dataParams.push({ fieldname: LngAndLat.longitude.longitudeField, groupType: 3 });
      dataParams.push({ fieldname: LngAndLat.latitude.latitudeField, groupType: 3 });
    };
    queryParams.data = JSON.stringify(dataParams);
    let callback = (json) => {
      if (json.code === 200) {
        let data = json.data.recordList;
        // if (index >= 0) {
        config.data = data;
        self.forceUpdate();
        // }
        // else {
        //   self.setState({ data });
        // }
      }
      else {
        eChartCommon.LogChartInfo("获取图形报表数据Err  查询参数 =" + JSON.stringify(queryParams) + "  errMsg  ", json.message, 999);
      }
    }
    eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_.cloneDeep(queryParams)), callback);
  }

  getConfig() {
    let param = { billnum: this.state.billnum, groupSchemaId: this.state.groupSchemaId };
    let callback = (json) => {
      if (json.code === 200) {
        if (json.data) {
          if (json.data.isCrossTable == false && (json.data.displayStyle == 2 || json.data.displayStyle == 3)) {
            if (_.isEmpty(json.data.chartConfig) == false) {
              let eChartConfig = JSON.parse(json.data.chartConfig);
              this.state.eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(eChartConfig);
              this.state.subChartConfigArr = eChartCommon.upgradeConfig_ForScatter_Batch(eChartConfig.subChartConfigArr);
              this.getData()
            }
          }
        }
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getGroupSetting, 'GET', param, callback);
  }

  render() {
    eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart Render", "", 900);
    let self = this;
    let obj = undefined;
    let colArr = [];
    let subChartConfigArr = this.state.subChartConfigArr;
    if (
      (self.isInPanel() == true && !subChartConfigArr) ||
      (self.isInMobile() == true && (!subChartConfigArr || this.state.firstQueryDone == false))
    ) {
      return <div id={self.getOutId()} style={{ width: "100%", height: "250" }} >
        <div className='eChartMobile-nodata'>
          {self.state.panelType == 3 ? "" : <SvgIcon type="huanxingtu" />}
          {self.state.panelType == 3 ? "" : <div className='eChartMobile-nodata-text' >暂时没有数据哦~</div>}
        </div>
      </div>;
    }
    else {
      if (self.isInMobile()) {
        let height = this.getColHeightInMobile();

        if (subChartConfigArr && subChartConfigArr.length > 0) {
          subChartConfigArr.forEach((ele, index) => {
            let tmpObj = this.getSubChartRender(ele, ele.data, height);
            colArr.push(<Col span={1} style={{ height: "auto", float: "left" }} >{tmpObj}</Col>);
          })
        }
        return <Row
          colCount={this.state.subChartColNum}
          id={self.getOutId()}
          // style={self.getPanelSizeStyle()}
          style={{ width: "100%", height: "100%" }}
        >
          {colArr}
        </Row>;
      }
      else if (this.isInPanel()) {
        let height = this.getColHeightInMobile();
        if (subChartConfigArr && subChartConfigArr.length > 0) {
          subChartConfigArr.forEach((ele, index) => {
            let tmpObj = this.getSubChartRender(ele, ele.data, height);
            colArr.push(<Col span={1} style={{ height: "auto" }} >{tmpObj}</Col>);
          })
        }
        return <Row
          colCount={this.state.subChartColNum}
          id={self.getOutId()}
          // style={self.getPanelSizeStyle()}
          style={{ width: "100%" }}
        >
          {colArr}
        </Row>;
      }

    }
  }

  getSubChartRender(initConfig, initData, colHeight) {
    if (!initData) {
      return <div className='eChart-nodata' >暂时没有数据哦~</div>;
    }
    else {
      let config = _.cloneDeep(initConfig);
      let data = _.cloneDeep(initData);
      let yySetting = config.yySetting;
      let chartType = yySetting.type || "bar";
      let self = this;
      let option = config.eChartSetting;
      let unionedData = eChartCommon.UnionDimensionName(yySetting, data);
      if (chartType == "bar") {
        option = barChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
      }
      else if (chartType == "line") {
        option = lineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
      }
      else if (chartType == "pie") {
        let isSingleValue = yySetting.isSingleValue;
        if (isSingleValue)
          option = pieChart_SingleValue.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
        else
          option = pieChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
      }
      else if (chartType == "scatter") {
        option = scatterChart.setOption(self.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
        if (_.isEmpty(self.scatterData.regionInfo)) {
          self.scatterData.regionInfo = yySetting.regionInfo;
        }
        option.geo.map = self.scatterData.regionInfo.geoName;
        self.scatterData.option = option;
        self.importMap(self.scatterData.regionInfo);
      }
      else if (chartType == "barline") {
        option = barlineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
      }
      let saveAsImage = _.get(option, "toolbox.feature.saveAsImage");
      if (_.isEmpty(saveAsImage) == false)
        delete option.toolbox.feature.saveAsImage;
      self.calcAddLength(option);
      return (
        <div
          style={self.state.subChartColNum == 1 ? self.getEChartSizeStyle(option, chartType) : { width: "100%", height: colHeight + "px" }}
          // style={{ width: "100%", height: colHeight + "px" }}
          className={"echarts eChartMobile" + (self.state.panelType == 3 ? "3" : "") + " echarts" + (self.state.panelType == 3 ? "3" : "") + "_type_" + chartType}>
          <ReactEcharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={self.state.subChartColNum == 1 ? self.getEChartSizeStyle(option, chartType, true) : { height: colHeight + "px" }}
            // style={self.getEChartSizeStyle(option, chartType, true)}
            onEvents={{
              "click": (params, curChart) => self.onChartClick(params, curChart),
            }}
          />
        </div>
      );
    }
  }
  calcAddLength(option) {
    let length = 0;
    if (option.addLengthInfo) {
      length = (option.addLengthInfo.charLength - 1) * Math.sin(option.addLengthInfo.rotate * 0.017453293); // 必需。一个以弧度表示的角。将角度乘以 0.017453293 （2PI/360）即可转换为弧度。
      length = length * 10;//字符高度
    }
    _.set(option, "addLengthInfo.addLength", length);
  }
  getColHeightInMobile() {
    // let chartType = _.get(this.state.config, "yySetting.type");
    let height = "auto";
    if (this.state.bMounted == false) {
      height = "auto";
    }
    else {
      let divEle = document.getElementById(this.getOutId());
      if (divEle) {
        let width = divEle.clientWidth;
        if (width == 0) {
          height = "auto";
        }
        else {
          height = eChartCommon.getColHeight(this.state.chartDisplayType, this.state.panelType, this.state.subChartColNum, width);
        }
      }
    }
    return height;
  }
  getEChartSizeStyle(option, chartType, onlyHeight) {

    let RotateAddLength = 0;
    if (option && option.addLengthInfo) {
      RotateAddLength = option.addLengthInfo.addLength;
      eChartCommon.LogChartInfo("图形报表 因为x轴坐标信息倾斜需要增加的高度 ", RotateAddLength, 900);
      // delete option.RotateAddLength;
    }
    else {
    }
    if (this.state.bMounted == false || !chartType) {
      return { width: "100%", height: "auto" };
    }
    else {
      let divEle = document.getElementById(this.getOutId());
      let width = 100;
      if (divEle) {
        width = divEle.clientWidth;
      }
      else if (this.state.panelType == 3) {
        if (onlyHeight)
          return { height: "auto" };
        else
          return { width: "100%", height: "auto" };
      }
      else if (window) {
        width = window.innerWidth;
      }
      let height = width * 0.8;
      if (width == 0) {
        width = "100%";
        height = "auto";
      }
      else if (chartType == "bar") {
        height = width * 0.8 + RotateAddLength;
      }
      else if (chartType == "line") {
        height = width * 0.8 + RotateAddLength;
      }
      else if (chartType == "pie") {
        if (this.state.panelType == 3)
          height = width * 0.8;
        else
          height = width * 0.95;
      }
      else if (chartType == "scatter") {
        if (this.state.panelType == 3)
          height = width * 0.8;
        else
          height = width * 0.9;
      }
      else if (chartType == "barline") {
        height = width * 0.8 + RotateAddLength;
      }
      if (chartType == "ranktable") {
        height = undefined;
      }
      if (onlyHeight)
        return { height: height };
      else
        return { width: width, height: height };

    }
  }
  getOutId() {
    // let chartKey = _.get(this.state.panelChartConfig, "chartKey")
    // if (chartKey)
    // return "eChartDiv_" + this.state.panelChartConfig.chartKey;
    // else
    return "eChartDiv_" + this.serieNum;
  }

  importMap(regionInfo, callback2, callback3) {
    // // 最初解决方式
    // require('echarts/map/js/' + (importKey == "china" ? "" : "province/") + importKey + '.js');
    // // 修改后解决方式
    let self = this;
    if (self.regionRegistered.indexOf(regionInfo.region) >= 0) {
      if (callback2) {
        callback2();
      }
      return;
    }
    else if (self.regionRegistering.indexOf(regionInfo.region) >= 0) {
      return;
    }
    else {
      self.regionRegistering.push(regionInfo.region);
      if (regionInfo) {
        let region = regionInfo.region;
        let parent = regionInfo.parent;
        let params = {};
        let subUrl = 'china.json';
        if (parent == "0")//中国
        {
          subUrl = 'china.json';
        }
        else if (parent == "100000")//省+直辖市
        {
          let ele = eChartCommon.getMapProvinceArr("", regionInfo.shortName);
          if (ele) {
            subUrl = 'province/' + ele.importKey + '.json';
          }
        }
        else//其他
        {
          subUrl = 'citys/' + region + '.json';
        }
        params.subUrl = subUrl;
        let callback = (data) => {
          if (data.code == 200 && !data.data.code) {
            eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息正确 return ", JSON.stringify(data), 16);
            echarts.registerMap(regionInfo.geoName, data.data);
            self.regionRegistered.push(regionInfo.region);
            setTimeout(() => {
              if (self.bUpdated == false) {
                self.bUpdated = true;
                self.forceUpdate();
              }
              if (callback2) {
                callback2();
              }
            }, 1);
          }
          else {
            let errInfo = data.message || data.data.message || "无明确信息";
            eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息不正确 errInfo = " + errInfo + "regionInfo = " + JSON.stringify(regionInfo) + " return ", JSON.stringify(data), 999);
            if (callback3) {
              callback3();
            }
          }
        }
        eChartProxy.doProxy('getMap', 'GET', params, callback);
      }
    }
  }
  getRegion(regionArr, fatherId, childName) {
    let self = this;
    let child;
    regionArr.forEach(ele => {
      if (ele.id == fatherId) {
        if (ele.children) {
          ele.children.forEach(ele2 => {
            if (ele2.name == childName || ele2.shortname == childName)
              child = child || ele2;
          });
        }
      }
      else {
        if (ele.children) {
          let tmp = self.getRegion(ele.children, fatherId, childName);
          child = child || tmp;
        }
      }
    }
    )
    return child;
  }
  goBackToSettingArea(self, curChart) {

    let callback = () => {
      let config = self.state.config;
      self.scatterData.regionInfo = _.cloneDeep(config.yySetting.regionInfo);
      self.scatterData.option.geo.map = self.scatterData.regionInfo.geoName;
      curChart.setOption(self.scatterData.option, true);
    }
    return callback;
  }

  setNewMap(chinaMapTreeData, params, curChart) {
    let self = this;
    eChartCommon.LogChartInfo("----------- 点击事件 选择区域 params.name = " + params.name + " 当前regionInfo ", JSON.stringify(self.scatterData.regionInfo), 900);
    let selectRegion = self.getRegion(chinaMapTreeData, self.scatterData.regionInfo.region, params.name);
    let tmpRegionInfo = {};
    if (selectRegion && _.isEmpty(selectRegion) == false) {
      let tmpRegionInfo = {};
      tmpRegionInfo.region = selectRegion.id;
      tmpRegionInfo.shortName = selectRegion.shortname;
      tmpRegionInfo.parent = selectRegion.parent;
      tmpRegionInfo.geoName = tmpRegionInfo.shortName + tmpRegionInfo.region;
      let callback = () => {
        self.scatterData.regionInfo = tmpRegionInfo;
        self.scatterData.option.geo.map = self.scatterData.regionInfo.geoName;
        eChartCommon.LogChartInfo("-----------点击事件 scatterData ", JSON.stringify(self.scatterData), 16);
        curChart.setOption(self.scatterData.option, true);
      }
      self.importMap(tmpRegionInfo, callback, self.goBackToSettingArea(self, curChart));
    }
    else {
      self.goBackToSettingArea(self, curChart)();
    }
  }

  onChartClick(params, curChart) {
    return;
    // let self = this;
    // if (this.state.config.yySetting.type == "scatter") {
    // if (self.chinaMapTreeData) {
    // self.setNewMap(self.chinaMapTreeData, params, curChart);
    // }
    // else {
    // let callback = (json) => {
    // if (json.code === 200) {
    // self.chinaMapTreeData = json.data;
    // self.setNewMap(self.chinaMapTreeData, params, curChart);
    // }
    // }
    // eChartProxy.doProxy(eChartProxy.url.getAllregion, 'POST', {}, callback);
    // }
    // }
  }
}
