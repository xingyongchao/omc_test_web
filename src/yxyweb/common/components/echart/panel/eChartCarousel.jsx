import React, { Component } from 'react';
import { Tabs } from 'antd';//Carousel,
import SvgIcon from 'SvgIcon';
import * as  eChartCommon from '../eChartCommon';
import * as  eChartProxy from '../eChartProxy';
import EChartPanelDisplay from './eChartPanelDisplay';
import * as eChartDemoData from '../eChartDemoData';
const TabPane = Tabs.TabPane;
export default class eChartCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInDesign: false,
      panelIds: [],
      carouselTemplates: [],
      clientWidth: 100,
      clientHeight: 100,
      activeTabKey: 0,
      bPause: false
    };
  }

  render() {
    let self = this;
    let carouselTemplates = this.state.carouselTemplates;
    if (carouselTemplates.length == 0) {
      return <div />;
    }
    else {
      let arr = [];
      let style_outer = { width: this.state.clientWidth, height: this.state.clientHeight };
      let style_inner = { width: this.state.clientWidth, height: this.state.clientHeight };
      eChartCommon.LogChartInfo("大屏轮播: eChartCarousel Render isInDesign = " + self.state.isInDesign + " clientWidth & clientHeight", JSON.stringify(style_outer), 15);

      carouselTemplates.forEach((template, index) => {
        arr.push(
          <TabPane
            tab={"Tab_" + index}
            key={"Tab_" + index}
            style={style_inner}
            className={"eChartCarousel_Inner_" + index + " eChartCarousel_TabPane"}
            forceRender={false}
          >
            <EChartPanelDisplay
              panelConfig={template}
              isInDesign={self.state.isInDesign}
              doFunc={(funcName, params) => self.doFunc(funcName, params)}
            />
          </TabPane>
        );
      }
      );
      eChartCommon.LogChartInfo("大屏轮播: Render activeTabKey ", "Tab_" + self.state.activeTabKey, 15)
      return <div style={style_outer} className={"eChartCarousel_Outer"} >
        <Tabs
          animated={false}
          className={"eChartCarousel_Tabs"}
          activeKey={"Tab_" + self.state.activeTabKey}>
          {arr}
        </Tabs>
      </div>;
    }
  }
  beforeChange() {
    eChartCommon.LogChartInfo("大屏轮播: 切换 beforeChange  ", "", 15)
  }
  afterChange() {
    eChartCommon.LogChartInfo("大屏轮播: 切换 afterChange  ", "", 15)
  }

  doFunc(funcName, params) {
    if (funcName == "pauseCarouse") {
      this.pauseCarouse(params);
    }
  }
  pauseCarouse(params) {
    if (params != "") {
      this.setState({ bPause: true });
    }
    else {
      this.setState({ bPause: false });
    }
  }

  resetWidthAndHeight(carouselTemplates) {
    let self = this;
    let clientWidth = document.body.clientWidth;
    let clientHeight = document.body.clientHeight;
    let arr = _.isEmpty(carouselTemplates) ? self.state.carouselTemplates : carouselTemplates;

    if (_.isEmpty(arr) == false) {
      let editPanel = arr[0];
      if (editPanel.type == "2") {
        if (clientHeight < clientWidth)
          clientHeight = clientWidth;
        else
          clientWidth = clientHeight;
        clientHeight = clientHeight * editPanel.height2 / 2;
      }
    }

    this.state.clientWidth = clientWidth;
    this.state.clientHeight = clientHeight;
  }
  componentDidMount() {
    let self = this;
    // if (this.state.type == "2")
    //   this.state.clientHeight = this.state.clientHeight * editPanel.height2 / 2;
    window.addEventListener('resize', () => this.onWindowResize())
    // 列表中预览传入格式：http://localhost:3003/echartcarousel?isInDesign=1&panelId=5875&type=1
    // this.state.isInDesign = (_.get(self.props, "location.query.isInDesign") == 1
    //   || _.get(self.props, "location.search").toString().indexOf("isInDesign=1") >= 0) ? true : false;
    this.state.isInDesign = false;
    let panelId = 0;
    let type = -1;
    var params = new cb.utils.queryString(self.props.location.search);
    if (params && params.query) {
      this.state.isInDesign = params.query && params.query.isInDesign == "1";
      panelId = params.query && params.query.panelId;
      type = params.query && params.query.type;
    }
    if (this.state.isInDesign) {
      if (panelId) {
        let param = { reportViewId: panelId };
        let callback = (json) => {
          if (json.code === 200) {
            let data = json.data;
            if (data) {
              let editPanel = eChartCommon.restoreEditPanel(data.pageLayout, data.items, "query", panelId);
              let carouselTemplates = [editPanel];
              let panelIds = [panelId];
              self.resetWidthAndHeight(carouselTemplates);
              self.setState({ panelIds, carouselTemplates });
            }
          }
        }
        eChartProxy.doProxy(eChartProxy.url.getReportView, 'GET', param, callback);
      }
      else if (window.opener) {
        window.opener.cb.events.un('setPreviewPanel');
        window.opener.cb.events.on('setPreviewPanel', (args) => {
          let template = args.template;
          let carouselTemplates = [template];
          let panelIds = [template.id];
          self.resetWidthAndHeight(carouselTemplates);
          self.setState({ panelIds, carouselTemplates });

        });
        window.opener.cb.events.execute("getPreviewPanel");
      }
    }
    else {
      this.getAuthedTemplate();
    }
  }

  setAutoPlay() {
    let self = this;
    let screenPlayTime = cb.rest.AppContext.option.screenPlayTime ? cb.rest.AppContext.option.screenPlayTime : 120;
    if (eChartDemoData.demoConfig.isTestCarousel) screenPlayTime = 5;
    eChartCommon.LogChartInfo("大屏轮播: Carousel render 显示轮播时间  " + screenPlayTime + "秒,系统设置轮播时间。cb.rest.AppContext.option.screenPlayTime   ", cb.rest.AppContext.option.screenPlayTime || "空", 15)
    if (self._timer == undefined) {
      self._timer = setInterval(() => {
        if (self.state.bPause == false) {
          let activeTabKey = self.state.activeTabKey + 1;
          if (activeTabKey >= self.state.carouselTemplates.length)
            activeTabKey = 0;
          self.setState({ activeTabKey });
        }
      }, screenPlayTime * 1000);
    }

    // let self = this;
    // let num = self.state.carouselTemplates.length;
    // setTimeout(() => {
    //   eChartCommon.LogChartInfo("大屏轮播: 切换  5秒后设置大屏Carousel控件autoPlay", "", 15)
    //   self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
    // }, 5000);

    // if (num > 0) {
    //   setTimeout(() => {
    //     eChartCommon.LogChartInfo("大屏轮播: 切换  " + num + " 秒后再次设置大屏Carousel控件autoPlay 时间计算方法为（大屏数量 * 1 秒 ,按照一张大屏加载1秒） ", "", 15)
    //     self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
    //   }, num * 1000);

    //   setTimeout(() => {
    //     eChartCommon.LogChartInfo("大屏轮播: 切换  " + num * 2 + " 秒后再次设置大屏Carousel控件autoPlay 时间计算方法为（大屏数量 * 2 秒 ,按照一张大屏加载两秒） ", "", 15)
    //     self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
    //   }, num * 2000);
    // }

    // setTimeout(() => {
    //   eChartCommon.LogChartInfo("大屏轮播: 切换 2分钟后再次设置大屏Carousel控件autoPlay", "", 15)
    //   self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
    // }, 2 * 60 * 1000);

  }

  getAuthedTemplate() {
    let self = this;

    let callback = (json) => {
      if (json.code === 200 && json.data) {
        eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的所有看板。 json.data.kanbans ", JSON.stringify(json.data.kanbans), 15)
        let kanbans = _.filter(json.data.kanbans, function (o) { return o.type == 1 })
        eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的type=1看板。 kanbans ", JSON.stringify(kanbans), 15)
        let panelIds = [];
        kanbans.forEach((ele) => { panelIds.push(ele.id) });
        panelIds = _.uniq(panelIds);// panelIds = [5813, 5823, 5835, 5811, 5812, 5816, 5832];
        if (eChartDemoData.demoConfig.isTestCarousel) {
          panelIds = [13559, 13560, 13561, 13562, 13563, 13564];
          panelIds = [13559, 13560, 13561];
        }
        if (panelIds && panelIds.length > 0) {
          let callback = (json) => {
            if (json.code === 200) {
              if (json.data && json.data.length > 0) {
                let carouselTemplates = [];
                eChartCommon.LogChartInfo("大屏轮播:获取模板配置信息。返回 json.data.length ", json.data.length, 15)
                json.data.forEach((ele, index) => {
                  let editPanel = eChartCommon.restoreEditPanel(ele.pageLayout, ele.items, "query");
                  carouselTemplates.push(editPanel);
                  eChartCommon.LogChartInfo("大屏轮播:获取模板完毕。模板ID=", ele.id + " name = " + ele.name, 15)
                });
                eChartCommon.LogChartInfo("大屏轮播:开始轮播。大屏数量  ", carouselTemplates.length, 15)
                self.resetWidthAndHeight(carouselTemplates);
                self.setState({ panelIds, carouselTemplates, activeTabKey: 0 }); //() => { this.refs.swipeEChart.refs.slick.innerSlider.slickGoTo(1); }
                if (self.state.isInDesign == false && carouselTemplates.length > 1)
                  self.setAutoPlay();
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
          self.closeWindow(3);
        }
      }
      else {
        eChartCommon.LogChartInfo("大屏轮播：调用服务出错  json.message", json.message, 999);
        cb.utils.alert(json.message, 'error');
        self.closeWindow(3);
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getLayoutByUserId, 'GET', {}, callback);
  }

  componentWillUnmount() {
    let self = this;
    if (self._timer) {
      clearInterval(self._timer);
      self._timer = null;
    };
    window.removeEventListener('resize', this.onWindowResize)
    self._unmount = true
  }
  onWindowResize() {
    this.resetWidthAndHeight();
    this.setState();
  }

  closeWindow(num) {
    setTimeout(() => { window.close(); }, num * 1000);
  }
}
