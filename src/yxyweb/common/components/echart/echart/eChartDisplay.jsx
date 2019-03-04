import React, { Component } from 'react'
import * as lineChart from '../options/lineChart';
import * as barChart from '../options/barChart';
import * as pieChart from '../options/pieChart';
import * as rankTableChart from '../options/rankTableChart';
import * as pieChart_SingleValue from '../options/pieChart_SingleValue';
import * as scatterChart from '../options/scatterChart';
import * as barlineChart from '../options/barlineChart';
import * as  eChartDemoData from '../eChartDemoData';
import * as  eChartCommon from '../eChartCommon';
import * as  eChartProxy from '../eChartProxy';
import _ from 'lodash';
import { Format } from '../../../helpers/formatDate';
import Row from 'yxyweb/common/components/basic/row';
import Col from 'yxyweb/common/components/basic/col';
import ReactEcharts from 'echarts-for-react';
const echarts = require('echarts/lib/echarts');

export default class EChartDisplay extends Component {
  constructor(props) {
    eChartCommon.LogChartInfo("eChartDisplay constructor", "", 3);
    super(props);
    let chartDisplayType = this.props.chartDisplayType;// 展现方式 rpt 在报表中展现 panel 监控视图
    this.serieNum = Math.random();
    if (chartDisplayType == "rpt") {
      let bPublished = this.props.viewid ? true : false;
      let eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(this.props.eChartConfig)
      this.state = {
        eChartConfig,
        subChartConfigArr: eChartCommon.upgradeConfig_ForScatter_Batch(eChartConfig.subChartConfigArr),
        subChartColNum: eChartConfig.subChartColNum || 1,
        queryParams: this.props.queryParams,
        chartDisplayType: chartDisplayType,
        isInDesign: this.props.isInDesign || false,
        bPublished,
        firstQueryDone: this.props.firstQueryDone || false
      };
      this.getData();
    } else if (chartDisplayType == "panel") {
      let panelChartConfig = this.props.panelChartConfig;
      let queryParams = {
        billnum: panelChartConfig.billnum,
        groupSchemaId: panelChartConfig.groupSchemaId,
        condition: panelChartConfig.condition
      };
      this.state = {
        eChartConfig: null,
        subChartConfigArr: [],
        subChartColNum: panelChartConfig.subChartColNum || 1,
        queryParams: queryParams,
        chartDisplayType: chartDisplayType,
        isInDesign: this.props.isInDesign || false,
        bShowFilter: panelChartConfig.bShowFilter,
        panelChartConfig: panelChartConfig
      };
      this.panelType = this.props.panelType  || 1;
      this.billName = panelChartConfig.billName;
      this.groupSchemaName = panelChartConfig.groupSchemaName;
      this.getConfig();
    }
    this.state.renderTime = Format(new Date(), 'yyyy-MM-dd hh:mm:ss');
    this.state.bMounted = false;
    this.bUpdated = false;
    this.chinaMapTreeData = null;//参照所需要的省市县数据
    this.scatterData = {option: {}, regionInfo: {} };
    this.regionRegistering = [];
    this.regionRegistered = [];
  }
  onFilterClick = (params) => {
    this.state.queryParams.condition = params.condition;
    this.getData();
  };
  componentDidMount() {
    eChartCommon.LogChartInfo("监控视图的图形报表 eChartDisplay componentDidMount", "", 2);
    if (this.isInRpt()) {
      this.props.viewModel.on('firstQueryDone', (params) => {
        this.state.firstQueryDone = params;
      });
      this.props.viewModel.on("filterClick", this.onFilterClick);
    }else if(this.isInPanel()){
      this.props.viewModel.on('firstQueryDone', (params) => {
        this.state.firstQueryDone = params;
      });
      this.props.viewModel.on("filterClick", this.onFilterClick);
    }
    this.setState({ bMounted: true });
  }
  getConfig() {
    eChartCommon.LogChartInfo("监控视图的图形报表 getConfig", "", 2);
    let param = { billnum: this.state.queryParams.billnum, groupSchemaId: this.state.queryParams.groupSchemaId };
    let callback = (json) => {
      if (json.code === 200) {
        if (json.data) {
          eChartCommon.LogChartInfo("数据库 eChartConfig", json.data.chartConfig);
          if (json.data.isCrossTable == false && (json.data.displayStyle == 2 || json.data.displayStyle == 3)) {
            if (_.isEmpty(json.data.chartConfig) == false) {
              let eChartConfig = JSON.parse(json.data.chartConfig);
              this.state.eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(eChartConfig);
              this.state.subChartConfigArr = eChartCommon.upgradeConfig_ForScatter_Batch(this.state.eChartConfig.subChartConfigArr);
              this.getData();
            }
            return;
          }
        }
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getGroupSetting, 'GET', param, callback);
  }
  checkTimer() {
    let self = this;
    if (self._timer == undefined && self.isInPanel() == true && self.panelType == 1) {
      let refreshInterval = self.state.panelChartConfig.refreshInterval;
      if (isNaN(refreshInterval))
        return;
      refreshInterval = Number(refreshInterval);
      if (Number.isInteger(refreshInterval) == false)
        return;
      if (refreshInterval == 0) {
        eChartCommon.LogChartInfo("报表设置不自动刷新。 refreshInterval ", refreshInterval, 2);
        return;
      }
      if (refreshInterval < 5) {
        eChartCommon.LogChartInfo("报表设置的自动刷新间隔太短。 refreshInterval ", refreshInterval, 999);
        return;
      }
      eChartCommon.LogChartInfo("监控视图 设置自动刷新频率定时器 renderTime ", self.state.renderTime + "   panelChartConfig = " + JSON.stringify(self.state.panelChartConfig), 3);
      self._timer = setInterval(() => {
        if (self.props.showIt == true) {
          eChartCommon.LogChartInfo("监控视图自动定时刷新。 renderTime ", self.state.renderTime + "   panelChartConfig = " + JSON.stringify(self.state.panelChartConfig), 3);
          self.getData()
        }
      }, refreshInterval * 1000);
    }
  }
  // 真正显示时轮播时间
  getData() {
    let self = this;
    let bGetData = this.props.chartDisplayType == "panel" || this.state.bPublished == true || this.state.firstQueryDone == true;
    if (bGetData == false) return;
    let subChartConfigArr = this.state.subChartConfigArr;
    if (subChartConfigArr && subChartConfigArr.length > 0) {
      subChartConfigArr.forEach((ele, index) => {
        ele.data = undefined;
        this.getSubChartData(ele, index);
      })
    }
  }
  getSubChartData(config, index) {
    let self = this;
    let queryParams = this.state.queryParams;
    let dataParams = [];
    if (queryParams && (_.isEmpty(queryParams.condition) == false) && config) {
      this.checkTimer();
      let dimensionX = _.get(config, "yySetting.dataField.dimensionX");
      let dimensionSub = _.get(config, "yySetting.dataField.dimensionSub");
      let measure = _.get(config, "yySetting.dataField.measure");
      let topn = _.get(config, "yySetting.orderInfo.bUseDimensionXRows") ? _.get(config, "yySetting.orderInfo.dimensionXRows") : _.get(config, "yySetting.orderInfo.dimensionSubRows");
      let orderField = _.get(config, "yySetting.orderInfo.orderField");
      let topnOrderBy = _.get(config, "yySetting.orderInfo.orderBy");
      let LngAndLat = _.get(config, "yySetting.dataField.LngAndLat");
      if (dimensionX && dimensionX.length > 0) {
        dimensionX.forEach(eleItem => {
          dataParams.push({
            fieldname: eleItem.nameField,
            groupType: eleItem.groupType,
            depends: eleItem.depends,
            topn: eleItem.topn,
          });
        });
      } ;
      if (dimensionSub && dimensionSub.length > 0) {
        dimensionSub.forEach(eleItem => {
          dataParams.push({
            fieldname:eleItem.nameField,
            groupType:eleItem.groupType,
            depends:eleItem.depends
          });
        });
      } ;
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
          config.data = data;
          self.forceUpdate();
        } else {
          eChartCommon.LogChartInfo("获取图形报表数据Err  查询参数 =" + JSON.stringify(queryParams) + "  errMsg  ", json.message, 999);
        }
      }
      if (this.isInPanel() == true) {
        queryParams.isFromKanban = true;
      }
      eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_.cloneDeep(queryParams)), callback);
    }
  }
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate Begin", "", 900);
    if (this.isInRpt()) {
      if (
        _.isEqual(nextProps.queryParams.billnum, this.state.queryParams.billnum) == false ||
        _.isEqual(nextProps.queryParams.groupSchemaId, this.state.queryParams.groupSchemaId) == false ||
        _.isEqual(nextProps.eChartConfig, this.props.eChartConfig) == false) {
        this.scatterData.regionInfo = {};//可能用户在报表展示过程中，修改报表分组条件中气泡图的显示区域信息
        this.state.eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(nextProps.eChartConfig);
        this.state.subChartConfigArr = this.state.eChartConfig.subChartConfigArr;
        this.state.subChartColNum = this.state.eChartConfig.subChartColNum;
        this.state.queryParams = nextProps.queryParams;
        this.getData();
        eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate  params changed End True", "", 900);
        return true;
      } else if (this.state.bPublished == false && _.isEqual(nextProps.queryParams.condition, this.props.queryParams.condition) == false) {
        this.state.queryParams = nextProps.queryParams;
        this.getData();
        eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate  查询条件 changed End True", "", 900);
        return true;
      } else {
        eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate  End false", "", 900);
        return false;
      }
    } else if (this.isInPanel()) {
      if (_.isEqual(this.state.eChartConfig, nextState.eChartConfig) == false || _.isEqual(this.state.queryParams, nextState.queryParams) == false) {
        this.state.eChartConfig = nextState.eChartConfig;
        this.state.queryParams = nextState.queryParams;
        this.getData();
      }
      return true;
    }
  }
  isInPanel = () => {
    return this.state.chartDisplayType == "panel";
  }
  isInRpt = () => {
    return this.state.chartDisplayType == "rpt";
  }
  getSubChartRender(config, data) {
    let self = this;
    let yySetting = _.cloneDeep(config.yySetting);
    let chartType = yySetting.type || "bar";
    if (!data || data.length == 0) {
      return <div className='eChart-nodata' tooltip >暂时没有数据哦~</div>;
    } else if (chartType == "ranktable") {
      let ranktable = rankTableChart.getRankTable(yySetting, data, self.isInPanel(), self.panelType, self.props.skinConfig);
      if (self.isInPanel()) {
        return { ranktable };
      } else {
        return <div className={"echarts echarts_type_" + chartType} >
          <div className="react_for_echarts" >
            {ranktable}
          </div>
        </div>;
      }
    } else {
      let option = _.cloneDeep(config.eChartSetting);
      let unionedData = eChartCommon.UnionDimensionName(yySetting, data);
      if (chartType == "bar") {
        option = barChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
      } else if (chartType == "line") {
        option = lineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
      } else if (chartType == "pie") {
        let isSingleValue = yySetting.isSingleValue;
        if (isSingleValue)
          option = pieChart_SingleValue.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
        else
          option = pieChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
      } else if (chartType == "scatter") {
        option = scatterChart.setOption(self.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
        if (_.isEmpty(self.scatterData.regionInfo)) {
          self.scatterData.regionInfo = _.cloneDeep(yySetting.regionInfo);
        }
        option.geo.map = self.scatterData.regionInfo.geoName;
        self.scatterData.option = option;
        self.importMap(self.scatterData.regionInfo);
      } else if (chartType == "barline") {
        option = barlineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
      }
      if (self.isInPanel()) {
        let saveAsImage = _.get(option, "toolbox.feature.saveAsImage");
        if (_.isEmpty(saveAsImage) == false)
          delete option.toolbox.feature.saveAsImage;
        if (_.isEmpty(self.state.panelChartConfig.title) == false)
          option.title.text = self.state.panelChartConfig.title;
        if (chartType == "scatter" && self.regionRegistered.length < 1)
          return <div />;
        else
          return <ReactEcharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            style={{ width: "100%", height: "100%" }}
            onEvents={{
              "click": (params, curChart) => self.onChartClick(params, curChart)
            }}
          />;
      } else if (self.isInRpt()) {
        return (
          <div className={"echarts echarts_type_" + chartType} style={{ width: "100%", height: "100%" }}>
            <div className="react_for_echarts" style={{ width: "100%", height: "100%" }} >
              <ReactEcharts
                option={option}
                notMerge={true}
                lazyUpdate={true}
                style={{ width: "100%", height: "100%" }}
                onEvents={{
                  "click": (params, curChart) => self.onChartClick(params, curChart),
                }}
              />
            </div>
          </div>
        );
      } else {
        eChartCommon.LogChartInfo("eChartDisplay 没有传入 chartDisplayType ，请检查 ", "", 999);
        return (
          <div className={"echarts echarts_type_" + chartType}>
            <div className="react_for_echarts">
              <ReactEcharts
                option={option}
                notMerge={true}
                lazyUpdate={true}
                style={{ width: "100%", height: "100%" }}
                onEvents={{
                  "click": (params, curChart) => self.onChartClick(params, curChart),
                }}
              />
            </div>
          </div>
        );
      }
    }
  }
  getOutId() {
    let chartKey = _.get(this.state.panelChartConfig, "chartKey")
    return "eChartDiv_" +  (chartKey || this.serieNum);
  }
  getColHeightInPanel(panelType) {
    let height = "auto";
    let subChartCount = this.state.subChartConfigArr.length;
    let subChartColNum = this.state.subChartColNum;
    if (panelType == 1) {
      if (this.state.bMounted == false) {
        height = "auto";
      } else {
        let divEle = document.getElementById(this.getOutId());
        if (divEle) {
          let clientWidth = divEle.clientWidth;
          let clientHeight = divEle.clientHeight;
          if (subChartCount == 0 || subChartColNum == 0 || clientWidth == 0) {
            height = "auto";
          } else {
            let rowNum = Math.ceil(subChartCount / subChartColNum);
            height = Math.floor(clientHeight / rowNum);
          }
        }
      }
    } else if (panelType == 2) {
      if (this.state.bMounted == false) {
        height = "auto";
      } else {
        let divEle = document.getElementById(this.getOutId());
        if (divEle) {
          let clientWidth = divEle.clientWidth;
          if (clientWidth == 0) {
            height = "auto";
          } else {
            height = eChartCommon.getColHeight(this.state.chartDisplayType, panelType, subChartColNum, clientWidth);
          }
        }
      }
    }
    return height;
  }
  importMap(regionInfo, callback2, callback3) {
    let self = this;
    if (self.regionRegistered.indexOf(regionInfo.region) >= 0) {
      if (callback2) {
        callback2();
      }
      return;
    } else if (self.regionRegistering.indexOf(regionInfo.region) >= 0) {
      return;
    } else {
      self.regionRegistering.push(regionInfo.region);
      if (regionInfo) {
        let region = regionInfo.region;
        let parent = regionInfo.parent;
        let params = {};
        let subUrl = 'china.json';
        if (parent == "0") {//中国
          subUrl = 'china.json';
        } else if (parent == "100000") {//省+直辖市
          let ele = eChartCommon.getMapProvinceArr("", regionInfo.shortName);
          if (ele) {
            subUrl = 'province/' + ele.importKey + '.json';
          }
        } else {//其他
          subUrl = 'citys/' + region + '.json';
        }
        params.subUrl = subUrl;
        let callback = (data) => {
          if (data.code == 200 && !data.data.code) {
            eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息正确    return ", JSON.stringify(data), 16);
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
          } else {
            let errInfo = data.message || data.data.message || "无明确信息";
            eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息不正确  errInfo = " + errInfo + "regionInfo = " + JSON.stringify(regionInfo) + "  return ", JSON.stringify(data), 999);
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
      } else {
        if (ele.children) {
          let tmp = self.getRegion(ele.children, fatherId, childName);
          child = child || tmp;
        }
      }
    })
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
        eChartCommon.LogChartInfo("-----------点击事件  scatterData ", JSON.stringify(self.scatterData), 16);
        curChart.setOption(self.scatterData.option, true);
      }
      self.importMap(tmpRegionInfo, callback, self.goBackToSettingArea(self, curChart));
    } else {
      self.goBackToSettingArea(self, curChart)();
    }
  }
  onChartClick(params, curChart) {
    let self = this;
    if (this.state.config.yySetting.type == "scatter") {
      if (self.chinaMapTreeData) {
        self.setNewMap(self.chinaMapTreeData, params, curChart);
      } else {
        let callback = (json) => {
          if (json.code === 200) {
            self.chinaMapTreeData = json.data;
            self.setNewMap(self.chinaMapTreeData, params, curChart);
          }
        }
        eChartProxy.doProxy(eChartProxy.url.getAllregion, 'POST', {}, callback);
      }
    }
  }
  componentWillUpdate(nextProps, nextState) {}
  render() {
    let self = this;
    let obj = undefined;
    let colArr = [];
    let {subChartColNum,subChartConfigArr} = this.state;
    if (!subChartConfigArr) {
      let tmpStyle = {}
      if (self.isInPanel() && self.props.skinConfig) {
        tmpStyle = { color: self.props.skinConfig.displaySkin.textColor };
      }
      return <div id={self.getOutId()} style={{ width: "100%" }}>
        <div className='eChart-nodata' tooltip style={tmpStyle} >暂时没有数据哦~</div>
      </div>;
    } else {
      if (self.isInRpt()) {
        let rowArr = [];
        let colArr = [];
        let height = eChartCommon.getColHeight("rpt", "", subChartColNum);
        if (subChartConfigArr && subChartConfigArr.length > 0) {
          subChartConfigArr.forEach((ele, index) => {
            let tmpObj = this.getSubChartRender(ele, ele.data);
            colArr.push(<Col span={1} style={{ height: height }}>{tmpObj}</Col>);
          });
        }
        return <Row colCount={subChartColNum} style={{ width: "100%" }} id={self.getOutId()}>{colArr}</Row>;
      } else if (this.isInPanel()) {
        if (self.panelType == 1) {
          let height = this.getColHeightInPanel(self.panelType);
          if (subChartConfigArr && subChartConfigArr.length > 0) {
            subChartConfigArr.forEach((ele, index) => {
              let tmpObj = this.getSubChartRender(ele, ele.data);
              colArr.push(<Col span={1} style={{ height: height }}>{tmpObj}</Col>);
            })
          }
          return <Row colCount={this.state.subChartColNum} id={self.getOutId()} style={{ height: '100%', width: "100%" }} >
            {colArr}
          </Row>;
        } else if (self.panelType == 2) {
          let height = this.getColHeightInPanel(self.panelType);
          if (subChartConfigArr && subChartConfigArr.length > 0) {
            subChartConfigArr.forEach((ele, index) => {
              let tmpObj = this.getSubChartRender(ele, ele.data);
              colArr.push(<Col span={1} style={{ height: height }}>{tmpObj}</Col>);
            })
          }
          return <Row colCount={this.state.subChartColNum} id={self.getOutId()} style={{ width: "100%" }} >
            {colArr}
          </Row>;
        }
      }
    }
  }
  componentWillUnmount() {
    this.props.viewModel.un("filterClick", this.onFilterClick);
    let self = this;
    if (self._timer) {
      eChartCommon.LogChartInfo("监控视图 删除刷新频率定时器 renderTime ", self.state.renderTime + "   panelChartConfig = " + JSON.stringify(self.state.panelChartConfig), 3);
      clearInterval(self._timer);
      self._timer = null;
    };
    self._unmount = true
  }
}
