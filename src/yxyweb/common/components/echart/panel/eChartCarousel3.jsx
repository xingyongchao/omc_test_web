import React, { Component } from 'react';
import { Carousel, Popover } from 'antd-mobile';
// import { Carousel, Popover } from 'antd';
import SvgIcon from 'SvgIcon';
import * as  eChartCommon from '../eChartCommon';
import * as  eChartProxy from '../eChartProxy';
import EChartPanelDisplay3 from './eChartPanelDisplay3';
import * as eChartDemoData from '../eChartDemoData';
const Item = Popover.Item;
export default class eChartCarousel3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselTemplates: [],
      chartTabs: [],
      bShowGroupList: false,
      activeIndex: 0
    };
  }
  handleVisibleChange = (visible) => {
    this.setState({
      bShowGroupList: visible
    });
  };
  onSelect = (opt) => {
    this.setState({ activeIndex: opt.key, bShowGroupList: false });
  };
  render() {
    let self = this;

    eChartCommon.LogChartInfo("self.state.activeIndex ", self.state.activeIndex, 900);
    if (self.state.chartTabs.length == 0) {
      return <div />;
    }
    else {
      let carouselTemplates = self.state.carouselTemplates;
      return <div className="eChartCarousel3_Group_Outer">
        <Popover
          overlay={self.getPopItems(carouselTemplates)}
          visible={self.state.bShowGroupList}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
          overlayClassName="eChartCarousel3_Popover"
          mask={true}
        // getTooltipContainer={() => { return document.getElementById('popup-container') || document.body; }}
        >
          <div className="eChartCarousel3_Group"
            style={{ cursor: "pointer" }}
          >
            <span className="eChartCarousel3_max">{carouselTemplates && carouselTemplates[self.state.activeIndex] && carouselTemplates[self.state.activeIndex].name}</span>
            <i className={self.state.bShowGroupList === true ? "icon icon-shouqi" : "icon icon-zhakai"}  ></i>
          </div>
        </Popover >
        <Carousel
          autoplay={false}
          infinite={true}
          beforeChange={(from, to) => self.beforeTabChange(from, to)}
          afterChange={index => self.afterTabChange(index)}
          selectedIndex={self.state.activeIndex}
          dots={true}
          className={"eChartCarousel3_ActivedIndex_" + self.state.activeIndex}
        >
          {self.state.chartTabs}
        </ Carousel>
      </div>;
    }
  }
  beforeTabChange(from, to) {
    // eChartCommon.LogChartInfo("beforeTabChange set isTabChanging true", "", 900);
    // this.isTabChanging = true;
  }
  afterTabChange(index) {
    // eChartCommon.LogChartInfo("afterTabChange set isTabChanging false", "", 900);
    // this.isTabChanging = false;
    this.setState({ activeIndex: index });
  }
  // getIsTabChanging() {
  // eChartCommon.LogChartInfo("isTabChanging return ", this.isTabChanging, 900);
  // return this.isTabChanging;
  // }
  componentDidMount() {
    this.getAuthedTemplate();
  }
  getPopItems(carouselTemplates) {
    let self = this;
    let popItems = [];
    if (carouselTemplates && carouselTemplates.length > 0) {
      carouselTemplates.forEach((template, index) => {
        popItems.push(
          <Item key={index} value={template.name} >
            <div>
              <div>{template.name}</div>
              <div> {index == self.state.activeIndex ? <SvgIcon type="xuanzhong1" /> : <div />} </div>
            </div>
          </Item>);
      }
      );
    }
    return popItems;
  }
  setCarousel(carouselTemplates) {
    let self = this;
    let chartTabs = [];
    if (carouselTemplates.length > 0) {
      carouselTemplates.forEach((template, index) => {
        chartTabs.push(
          <EChartPanelDisplay3
            isInDesign={false}
            panelId={template.id}
            panelConfig={template}
            // getIsTabChanging={() => self.getIsTabChanging()}
            refreshForXieLa={() => self.forceUpdate()}//斜向拉动会半屏显示
          />);
      }
      );
      this.setState({ carouselTemplates, chartTabs });
    }
  }
  getAuthedTemplate() {
    let self = this;

    let callback = (json) => {
      if (json.code === 200 && json.data) {
        eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的所有看板。 json.data.kanbans ", JSON.stringify(json.data.kanbans), 900)
        let kanbans = _.filter(json.data.kanbans, function (o) { return o.type == 3 })
        eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的type=1看板。 kanbans ", JSON.stringify(kanbans), 900)
        let panelIds = [];
        kanbans.forEach((ele) => {
          if (panelIds.indexOf(ele.id) < 0)
            panelIds.push(ele.id)
        });
        if (eChartDemoData.demoConfig.isTestCarousel3) {
          panelIds = [15531, 15545, 15559, 15560, 15535, 15536, 15537];
        }
        if (panelIds.length > 0) {
          let callback = (json) => {
            if (json.code === 200) {
              if (json.data && json.data.length > 0) {
                let carouselTemplates = [];
                eChartCommon.LogChartInfo("大屏轮播:获取模板配置信息。返回 json.data.length ", json.data.length, 900)
                json.data.forEach((ele, index) => {
                  let editPanel = eChartCommon.restoreEditPanel(ele.pageLayout, ele.items, "query");
                  carouselTemplates.push(editPanel);
                  eChartCommon.LogChartInfo("大屏轮播:获取模板完毕。模板ID=", ele.id + " name = " + ele.name, 900)
                });
                eChartCommon.LogChartInfo("大屏轮播:开始轮播。大屏数量  ", carouselTemplates.length, 900)
                self.setCarousel(carouselTemplates);
              }
              else {
                eChartCommon.LogChartInfo("大屏轮播：没有找到能够展示的大屏。模板ID ", JSON.stringify(panelIds), 999)
              }
            }
            else {
              eChartCommon.LogChartInfo("大屏轮播:获取模板列表信息出错。模板 panelIds = " + JSON.stringify(panelIds) + " json.message ", json.message, 999)
            }
          }
          eChartProxy.doProxy(eChartProxy.url.getReportViews, 'GET', { ids: panelIds }, callback);
        }
        else {
          eChartCommon.LogChartInfo("大屏轮播：请检查当前操作员是否有模板权限 ", "", 999);
          // cb.utils.alert("请检查当前操作员是否有模板权限", 'error');
        }
      }
      else {
        eChartCommon.LogChartInfo("大屏轮播：调用服务出错  json.message", json.message, 999);
        cb.utils.alert(json.message, 'error');
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getLayoutByUserId, 'GET', {}, callback);
  }
}
