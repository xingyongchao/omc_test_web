import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import Row from '../../../basic/row';
import Col from '../../../basic/col';
import * as  eChartCommon from '../../eChartCommon';
import * as  eChartProxy from '../../eChartProxy';
import { genAction, proxy } from '../../../../helpers/util';

export default class eChartDateTime extends React.Component {
  constructor(props) {
    super(props);
    this.dateTimeConfig = props.componentConfig.dateTimeConfig;
    this.state = {
      panelType: props.panelType ? props.panelType : 1,
    }
    eChartCommon.LogChartInfo("大屏方案日期时间 props.componentConfig ", JSON.stringify(props.componentConfig), 16);
    // this.dateTimeConfig = {
    //   bShow_Date: true,
    //   bShow_HourMinute: true,
    //   bShow_Second: true,
    //   bShow_Week: true,
    //   dateSplit: "",//默认或者为空年月日  空格  .   -
    //   timeSplit: ":",
    //   fontSize: 20,
    //   fontFamily: "STKaiti"
    // };

  }

  render() {

    //getYear() 返回年份
    //getMonth() 返回月份值
    //getDate() 查看Date对象并返回日期

    //getHours() 返回小时数
    //getMinutes() 返回分钟数
    //getSeconds() 返回秒数
    //getDay() 返回星期几

    let date = new Date();
    let dateTimeConfig = this.dateTimeConfig;
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    let second = date.getSeconds().toString();
    let week = date.getDay().toString();

    if (month.length == 1)
      month = "0" + month;
    if (day.length == 1)
      day = "0" + day;
    if (hour.length == 1)
      hour = "0" + hour;
    if (minute.length == 1)
      minute = "0" + minute;
    if (second.length == 1)
      second = "0" + second;

    if (week == "1")
      week = "一";
    if (week == "2")
      week = "二";
    if (week == "3")
      week = "三";
    if (week == "4")
      week = "四";
    if (week == "5")
      week = "五";
    if (week == "6")
      week = "六";
    if (week == "7")
      week = "日";



    let content = [];
    if (dateTimeConfig.bShow_Date) {
      content.push(this.getContent(year, this.getClassNamePrifx("eChartWeather") + "-Year-Outer", this.getClassNamePrifx("eChartWeather") + "-Year-Inner"));
      content.push(this.getSpliter(dateTimeConfig.dateSplit, "年", this.getClassNamePrifx("eChartWeather") + "-Date-Split"));

      content.push(this.getContent(month, this.getClassNamePrifx("eChartWeather") + "-Month-Outer", this.getClassNamePrifx("eChartWeather") + "-Month-Inner"));
      content.push(this.getSpliter(dateTimeConfig.dateSplit, "月", this.getClassNamePrifx("eChartWeather") + "-Date-Split"));

      content.push(this.getContent(day, this.getClassNamePrifx("eChartWeather") + "-Day-Outer", this.getClassNamePrifx("eChartWeather") + "-Day-Inner"));
      if (dateTimeConfig.dateSplit == "" || dateTimeConfig.dateSplit == "年月日")
        content.push(this.getSpliter(dateTimeConfig.dateSplit, "日", this.getClassNamePrifx("eChartWeather") + "-Date-Split"));
    }

    if (dateTimeConfig.bShow_HourMinute) {
      if (content.length > 0) {
        content.push(this.getSpliter(" ", "", this.getClassNamePrifx("eChartWeather") + "-Split"));
      }
      content.push(this.getContent(hour, this.getClassNamePrifx("eChartWeather") + "-Hour-Outer", this.getClassNamePrifx("eChartWeather") + "-Hour-Inner"));
      content.push(this.getSpliter(dateTimeConfig.timeSplit, ":", this.getClassNamePrifx("eChartWeather") + "-Time-Split"));
      content.push(this.getContent(minute, this.getClassNamePrifx("eChartWeather") + "-Minute-Outer", this.getClassNamePrifx("eChartWeather") + "-Minute-Inner"));
      if (dateTimeConfig.bShow_Second) {
        content.push(this.getSpliter(dateTimeConfig.timeSplit, ":", this.getClassNamePrifx("eChartWeather") + "-Time-Split"));
        content.push(this.getContent(second, this.getClassNamePrifx("eChartWeather") + "-Second-Outer", this.getClassNamePrifx("eChartWeather") + "-Second-Inner"));
      }
    }
    if (dateTimeConfig.bShow_Week) {
      if (content.length > 0) {
        content.push(this.getSpliter(" ", "", this.getClassNamePrifx("eChartWeather") + "-Split"));
      }
      content.push(this.getContent("星期" + week, this.getClassNamePrifx("eChartWeather") + "-Week-Outer", this.getClassNamePrifx("eChartWeather") + "-Week-Inner"));
    }

    let style = { width: '100%', textAlign: ' center', fontSize: 24 };
    if (dateTimeConfig.hasOwnProperty("fontSize")) style.fontSize = dateTimeConfig.fontSize;
    if (dateTimeConfig.hasOwnProperty("fontFamily")) style.fontFamily = dateTimeConfig.fontFamily;
    if (!!this.props.skinConfig && this.props.skinConfig.displaySkin) {
      style.color = this.props.skinConfig.displaySkin.textColor;

    }
    // if (dateTimeConfig.hasOwnProperty("color")) style.fontFamily = dateTimeConfig.color;

    return <div className={this.getClassNamePrifx("eChartWeather") + "-Outer"} style={{ height: '100%', width: '100%', textAlign: ' center', alignItems: 'center', display: 'flex' }}>
      <div className={this.getClassNamePrifx("eChartWeather") + "-Innerer"} style={style}>
        {content}
      </div>
    </div>;
  }
  getClassNamePrifx(className) {
    if (this.state.panelType == 2)
      className = className + "2";
    return className;
  }

  getSpliter(spliter, nullValue, curClassName) {
    let str = "";
    if (spliter == "" || spliter == "年月日") {
      return <span className={curClassName}>{nullValue}</span>;
    }
    else if (spliter.length > 0 && spliter.trim() == "") {
      return <span className={curClassName}>&nbsp;</span>;
    }
    else {
      return <span className={curClassName}>{spliter}</span>;
    }
  }

  getContent(str, outClassName, innerClassName) {
    let strArr = [];
    let contentArr = [];
    strArr = str.split("");
    strArr.forEach(function (item, index) {
      contentArr.push(<span className={innerClassName}>{item}</span>)
    });
    return <span className={outClassName}>{contentArr} </span>;
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
    let num = 60;
    if (self.dateTimeConfig.bShow_HourMinute == true)
      num = 1;
    this._timer = setInterval(() => {
      self.forceUpdate();
    }, num * 1000);
  }
}
