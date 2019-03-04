import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import Row from '../../../basic/row';
import Col from '../../../basic/col';
import * as  eChartCommon from '../../eChartCommon';
import * as  eChartProxy from '../../eChartProxy';
import { genAction, proxy } from '../../../../helpers/util';

export default class eChartWeather extends React.Component {
  constructor(props) {
    super(props);
    this.serieNum = Math.random();
    this.state = {
      panelType: props.panelType ? props.panelType : 1,
      componentConfig: props.componentConfig,
      weatherConfig: {},
      localCity: "",
      baiduAK: "Da2GUB3raZGa2XnLnmYT1KUwvaT9FYPw" //张信提供
      // params.ak = "ACtwE9Dui60IXBsUksGI3sNAWmd79KPP";//浏览器端AK
      // params.ak = "EGgzZ22dsboWQEcPQ6KDQLknQd3YkkkP";//网上搜出来的

    };
    this.getLocalCity();
  }

  render() {
    let self = this;
    let config = this.state.weatherConfig;
    let arr1 = [];
    let arr2 = [];
    if (_.isEmpty(config)) {
      arr1.push(<div></div>);
    }
    else {
      let pm25 = config.pm25;
      let chuanyi = _.find(config.index, function (o) { return o.title == "穿衣"; });
      let ziwaixian = _.find(config.index, function (o) { return o.title == "紫外线强度"; });

      let xiche = _.find(config.index, function (o) { return o.title == "洗车"; });
      let ganmao = _.find(config.index, function (o) { return o.title == "感冒"; });
      let yundong = _.find(config.index, function (o) { return o.title == "运动"; });


      let tianqi = config.weather_data[0];
      // let style1 = { backgroundImage: 'url(' + tianqi.dayPictureUrl + ')', width: '100%', height: '100%' };
      // style1.backgroundSize = '100% 100%';
      // style1.backgroundRepeat = 'no-repeat';
      // style1.backgroundPosition = 'center';
      // style1.height = "40px"

      // let style2 = { backgroundImage: 'url(' + tianqi.nightPictureUrl + ')', width: '100%', height: '100%' };
      // style2.backgroundSize = '100% 100%';
      // style2.backgroundRepeat = 'no-repeat';
      // style2.backgroundPosition = 'center';
      // style2.height = "40px"

      // 在0 - 35微克为优
      // 35 - 75微克为良
      // 75 - 115微克为轻度污染
      // 115 - 150微克为中度污染
      // 150 - 250微克为重度污染
      // 250微克以上为严重污染。
      let pm25desc = "优";
      if (pm25 > 35)
        pm25desc = "良";
      if (pm25 > 75)
        pm25desc = "轻度";
      if (pm25 > 115)
        pm25desc = "中度";
      if (pm25 > 150)
        pm25desc = "重度";
      if (pm25 > 250)
        pm25desc = "严重";
      if (new Date().getHours() >= 6 && new Date().getHours() < 18) {
        arr1.push(<span className={self.getClassNamePrifx("eChartWeather") + "-img"}><img src={tianqi.dayPictureUrl} /></span>);
      }
      else {
        arr1.push(<Col className={self.getClassNamePrifx("eChartWeather") + "-img"}><img src={tianqi.nightPictureUrl} /></Col>);
      }
      arr1.push(<span className={self.getClassNamePrifx("eChartWeather") + "-temperature"}>{tianqi.temperature}</span>);
      arr1.push(<span className={self.getClassNamePrifx("eChartWeather") + "-temperature-title"}>{tianqi.weather}</span>);

      arr2.push(<span className={self.getClassNamePrifx("eChartWeather") + "-address"}>{this.state.localCity}</span>);
      arr2.push(<span className={self.getClassNamePrifx("eChartWeather") + "-pm"}>{pm25}</span>);
      arr2.push(<span className={self.getClassNamePrifx("eChartWeather") + "-pm-degree"}>{pm25desc}</span>);

    }
    let style = {};
    if (this.props.skinConfig)
      style.color = this.props.skinConfig.displaySkin.textColor;

    return <div className={self.getClassNamePrifx("eChartWeather") + ""} style={style}>
      <div className={self.getClassNamePrifx("eChartWeather") + "-1"}>  {arr1}  </div>
      <div className={self.getClassNamePrifx("eChartWeather") + "-2"}>  {arr2}  </div>
    </div>;
  }

  getClassNamePrifx(className) {
    if (this.state.panelType == 2)
      className = className + "2";
    return className;
  }

  // getLocalCity() {//通过百度Web服务API 提供服务 测试跨域// 跨域Chrome设置 --disable-web-security --user-data-dir=C:\MyChromeDevUserData12
  //   let self = this;
  //   let url = "https://api.map.baidu.com/location/ip?output=json&ak=" + self.state.baiduAK + "&coor=bd09ll";
  //   var u = new URLSearchParams();
  //   // u.append("Access-Control-Allow-Origin", "*");
  //   // u.append("Access-Control-Allow-Headers", "X-Requested-With");
  //   // u.append("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //   // u.append("X-Powered-By", '3.2.1')

  //   u.append("Content-type", "application/json");
  //   u.append("Accept", "application/json");
  //   // u.append("Cache-Control", "no-cache");
  //   u.append('If-Modified-Since', '0');
  //   // u.append("Content-type", "application/json;charset=utf-8");
  //   fetch(url,
  //     {
  //       // url: url,
  //       // mode: "cors",
  //       method: 'GET',
  //       // headers: u,
  //       // credentials: null

  //     }
  //   ).then(function (response) {
  //     // console.log("XXXXXXXXXXXXXXXXXXXUU1 " + JSON.stringify(response));
  //     return response.json();
  //   }).then(function (data) {
  //     console.log("XXXXXXXXXXXXXXXXXXXUU2 " + JSON.stringify(data));
  //     self.state.localCity = data.content.address;
  //     self.getWeather();

  //   }).catch(function (e) {
  //     console.log("XXXXXXXXXXXXXXXXXXXUU3 " + e);
  //   });

  //   // let callback = (data) => {
  //   //   // alert("getWeather = " + JSON.stringify(data));
  //   //   if (data.code = 200 && (data.data.status == "0" || data.data.status == "success")) {
  //   //     self.state.localCity = data.data.content.address;
  //   //     self.getWeather();
  //   //   }
  //   // }

  // }


  getLocalCity() {//通过百度Web服务API 提供服务，需要跨域
    // "https://api.map.baidu.com/location/ip?output=json&ak=" + self.state.baiduAK + "&coor=bd09ll"
    eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市 getLocalCity this.serieNum =" + this.serieNum + "  Begin ", "", 6);
    let self = this;
    let url = "https://api.map.baidu.com/location/ip";
    let params = {};
    params.output = "json";
    params.ak = self.state.baiduAK;
    params.coor = "bd09ll";
    let config = { url, method: 'GET', params, options: { jsonp: true } };
    let callback = (data) => {
      // alert("getWeather = " + JSON.stringify(data));
      if (data.status == "0" || data.status == "success") {
        eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市 getLocalCity this.serieNum =" + this.serieNum + " return  data ", JSON.stringify(data), 6);
        self.state.localCity = data.content.address;
        self.getWeather();
        eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市 getLocalCity this.serieNum =" + this.serieNum + "  End ", "", 6);
      }
      else {
        eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市：调用服务出错   params=" + JSON.stringify(params) + "  data ", JSON.stringify(data), 999);
      }
    }
    proxy(config)
      .then(json => {
        callback(json);
      });

  }

  // getLocalCity() {//通过百度  JavaScript API  IP定位城市
  //   let self = this;
  //   // cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=' + self.state.baiduAK], () => {
  //   cb.requireInner(['http://api.map.baidu.com/getscript?v=3.0&ak=' + self.state.baiduAK], () => {
  //     var map = new BMap.Map('getCity');
  //     function myFun(result) {
  //       if (!!result.name) {
  //         self.state.localCity = result.name;
  //         self.getWeather();
  //       }
  //     }
  //     var myCity = new BMap.LocalCity();
  //     myCity.get(myFun);
  //   });
  // }



  // getLocalCity() {//通过百度  JavaScript API  浏览器获取经纬度
  //   let self = this;
  //   // cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=' + self.state.baiduAK], () => {
  //   cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=' + self.state.baiduAK], () => {
  //     var geolocation = new BMap.Geolocation();
  //     geolocation.getCurrentPosition(function (r) {
  //       if (this.getStatus() == BMAP_STATUS_SUCCESS) {
  //         alert('您的经纬度：' + r.point.lng + ',' + r.point.lat);
  //       }
  //       else {
  //         alert('failed' + this.getStatus());
  //       }
  //     });
  //   });
  // }

  getWeather() {
    let self = this;

    let params = {};
    params.location = self.state.localCity;
    if (params.location) {
      params.output = "json";
      params.ak = self.state.baiduAK;
      // http://api.map.baidu.com/telematics/v3/weather?location=北京市&output=json&ak=Da2GUB3raZGa2XnLnmYT1KUwvaT9FYPw
      let url = "getWeather";
      let callback = (data) => {
        // alert("getWeather = " + JSON.stringify(data));
        if (data.code == 200 && data.data.status == "success") {
          self.setState({ weatherConfig: data.data.results[0] });
        }
        else {
          eChartCommon.LogChartInfo("获取天气：调用服务出错   params=" + JSON.stringify(params) + "  return ", JSON.stringify(data), 999);
        }
      }
      eChartProxy.doProxy(url, 'GET', params, callback);
    }
  }



  componentWillUnmount() {
    let self = this;
    if (self._timer) {
      clearInterval(self._timer);
      self._timer = null;
    };
    self._unmount = true
  }
  componentDidMount() {
    let self = this;
    let refreshInterval = 1000 * 60 * 10;//毫秒计数
    self._timer = setInterval(() => {
      self.getWeather();
    }, refreshInterval);
  }
}
