import React, { Component } from 'react';
import * as  eChartDemoData from '../eChartDemoData';
import * as  eChartCommon from '../eChartCommon';
import _ from 'lodash';
// import SvgIcon from 'SvgIcon';
export function setOption(chartDisplayType, option, yySetting, data, skinConfig, panelType) {
  // let dimensionCodeFileld = yySetting.dataField.dimensionX[0].codeField;///store_code
  // let dimensionNameFileld = yySetting.dataField.dimensionX[0].nameField;//store_name

  let dimensionCodeFileld = eChartCommon.eChartLabel.unionedXCode;///store_code
  let dimensionNameFileld = eChartCommon.eChartLabel.unionedXName;//store_name


  let legendData = [];
  let series = [];
  let xAxisData = [];
  let dimensionX = _.get(yySetting, 'dataField.dimensionX');
  let dimensionSub = _.get(yySetting, 'dataField.dimensionSub');
  let measure = _.get(yySetting, 'dataField.measure');
  let barWidth = _.get(yySetting, 'series.barWidth') ? _.get(yySetting, 'series.barWidth') : 10;
  let barMaxWidth = _.get(yySetting, 'series.barMaxWidth') ? _.get(yySetting, 'series.barMaxWidth') : 10;
  let barGap = _.get(yySetting, 'series.barGap') ? _.get(yySetting, 'series.barGap') : '100%';
  let barCategoryGap = _.get(yySetting, 'series.barCategoryGap') ? _.get(yySetting, 'series.barCategoryGap') : '20%';

  let maxNameLength = 0;
  // barWidth = 10;
  // let allLength = 1050;//像素
  // let barAll = data.length * measure.length;
  // if (dimensionSubLength > 0) {
  //   barAll = data.length * dimensionSubLength;
  // }
  // let barAllLength = barAll * barWidth * 2;//默认barWidth=10 ,barGap=100%，barCategoryGap=默认barGap
  // let zoomRate = 100 * allLength / (barAllLength == 0 ? 1 : barAllLength);
  // if (zoomRate < 100) {
  //   option.dataZoom = [{ type: 'slider', end: zoomRate }];
  // }
  // barWidth: 10;
  // barGap: '100%';
  // barCategoryGap: '20%';//类目间柱形距离，默认为类目间距的20%，可设固定值

  let colorList = eChartCommon.getChartColorArr(100);

  // if (dimensionSub.length > 0) {
  //   //如果存在次维度
  //   // let dimensionSubCodeFileld = yySetting.dataField.dimensionSub[0].codeField;///store_code
  //   // let dimensionSubNameFileld = yySetting.dataField.dimensionSub[0].nameField;//store_name
  //   let dimensionSubCodeFileld = eChartCommon.eChartLabel.unionedSubCode;
  //   let dimensionSubNameFileld = eChartCommon.eChartLabel.unionedSubName;

  //   let dimensionSubStack = yySetting.hasOwnProperty("stack") ? yySetting.stack : yySetting.dataField.dimensionSub[0].stack;

  //   let measureValueField0 = measure[0].valueField;
  //   let measureValueField1 = measure[1].valueField;

  //   let yAxisIndexType0 = measure[0].yAxisIndex == 0 ? yySetting.yAxis.yAxisIndexType0 : yySetting.yAxis.yAxisIndexType1;
  //   let yAxisIndexType1 = measure[1].yAxisIndex == 0 ? yySetting.yAxis.yAxisIndexType0 : yySetting.yAxis.yAxisIndexType1;



  //   let xAxisItems = [];
  //   let seriesItems = [];
  //   data.forEach(itemData => {
  //     if (xAxisItems.indexOf(itemData[dimensionNameFileld]) < 0) {
  //       xAxisItems.push(itemData[dimensionNameFileld]);
  //     }
  //     if (seriesItems.indexOf(itemData[dimensionSubNameFileld]) < 0) {
  //       seriesItems.push(itemData[dimensionSubNameFileld]);
  //     }
  //   });

  //   seriesItems.forEach((eleS, index) => {
  //     legendData.push({ name: eleS, textStyle: { width: '10px', height: '10px' } });
  //     let seriesData0 = [];
  //     let seriesData1 = [];
  //     xAxisItems.forEach(eleX => {
  //       if (xAxisData.indexOf(eleX) < 0)
  //         xAxisData.push(eleX);
  //       let itemDataValue0 = "0";
  //       let itemDataValue1 = "0";
  //       data.forEach(itemData => {
  //         if (itemData[dimensionNameFileld] == eleX && itemData[dimensionSubNameFileld] == eleS) {
  //           itemDataValue0 = itemData[measureValueField0];
  //           itemDataValue1 = itemData[measureValueField1];
  //         }
  //       });
  //       seriesData0.push(itemDataValue0);
  //       seriesData1.push(itemDataValue1);

  //     });
  //     if (yAxisIndexType0 == "bar") {
  //       series.push({
  //         name: eleS,
  //         type: yAxisIndexType0,
  //         stack: dimensionSubStack,
  //         silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
  //         barMaxWidth: barMaxWidth,
  //         // barWidth: barWidth,
  //         // barGap: barGap,// 百分比或者数字，表示bar宽度的百分之多少或者几倍
  //         // barCategoryGap: barCategoryGap,
  //         data: seriesData0,
  //         itemStyle: {
  //           normal: {
  //             color: function (params) { return colorList[params.seriesIndex] },
  //             barBorderRadius: (yySetting.bVertical == true ? [5, 5, 0, 0] : [0, 5, 5, 0]),//圆角半径，单位px，支持传入数组分别指定 4 个圆角半径
  //             opacity: 1//图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
  //           }
  //         }
  //       });
  //     }

  //     if (yAxisIndexType0 == "line") {
  //       series.push({
  //         name: eleS,
  //         type: yAxisIndexType0,
  //         stack: dimensionSubStack,
  //         smooth: dimensionSubSmooth,
  //         silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
  //         // barWidth: 10,
  //         // barGap: '0%', // Make series be overlap
  //         data: seriesData0,
  //         itemStyle: {
  //           normal: {
  //             color: colorList[index],
  //             lineStyle:
  //               { color: colorList[index] }
  //           }
  //         }
  //       });
  //     }
  //     if (yAxisIndexType1 == "bar") {
  //       series.push({
  //         name: eleS,
  //         type: yAxisIndexType1,
  //         stack: dimensionSubStack,
  //         silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
  //         barMaxWidth: barMaxWidth,
  //         // barWidth: barWidth,
  //         // barGap: barGap,// 百分比或者数字，表示bar宽度的百分之多少或者几倍
  //         // barCategoryGap: barCategoryGap,
  //         data: seriesData1,
  //         itemStyle: {
  //           normal: {
  //             color: function (params) { return colorList[params.seriesIndex] },
  //             barBorderRadius: (yySetting.bVertical == true ? [5, 5, 0, 0] : [0, 5, 5, 0]),//圆角半径，单位px，支持传入数组分别指定 4 个圆角半径
  //             opacity: 1//图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
  //           }
  //         }
  //       });
  //     }

  //     if (yAxisIndexType1 == "line") {
  //       series.push({
  //         name: eleS,
  //         type: yAxisIndexType1,
  //         stack: dimensionSubStack,
  //         smooth: dimensionSubSmooth,
  //         silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
  //         // barWidth: 10,
  //         // barGap: '0%', // Make series be overlap
  //         data: seriesData1,
  //         itemStyle: {
  //           normal: {
  //             color: colorList[index],
  //             lineStyle:
  //               { color: colorList[index] }
  //           }
  //         }
  //       });
  //     }
  //   });
  // }
  // else
  let min0 = 99999999;
  let max0 = -99999999;
  let min1 = 99999999;
  let max1 = -99999999;
  {

    measure.forEach((itemMeasure, index) => {
      legendData.push({ name: itemMeasure.caption, textStyle: { width: '10px', height: '10px' } });
      let seriesData = [];
      data.forEach(itemData => {
        if (!!itemData[dimensionNameFileld] == true) {
          // seriesData.push(itemData[itemMeasure.valueField]);
          let tmpValue = _.get(itemData, itemMeasure.valueField, 0);
          seriesData.push(tmpValue);

          if (itemMeasure.yAxisIndex == 0 && tmpValue < min0)
            min0 = tmpValue;
          if (itemMeasure.yAxisIndex == 0 && tmpValue > max0)
            max0 = tmpValue;
          if (itemMeasure.yAxisIndex == 1 && tmpValue < min1)
            min1 = tmpValue;
          if (itemMeasure.yAxisIndex == 1 && tmpValue > max1)
            max1 = tmpValue;


          if (xAxisData.indexOf(itemData[dimensionNameFileld]) < 0) {
            if (maxNameLength < itemData[dimensionNameFileld].length)
              maxNameLength = itemData[dimensionNameFileld].length;
            xAxisData.push(itemData[dimensionNameFileld]);
          }
        }
      });
      let yAxisIndex = itemMeasure.yAxisIndex;
      let yAxisIndexType = yAxisIndex == 0 ? yySetting.yAxis.yAxisIndexType0 : yySetting.yAxis.yAxisIndexType1;
      if (yAxisIndexType == "bar") {
        series.push({
          name: itemMeasure.caption,
          type: "bar",
          stack: itemMeasure.hasOwnProperty("stack") ? itemMeasure.stack : yySetting.stack,
          silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
          barMaxWidth: barMaxWidth,
          // barWidth: barWidth,
          // barGap: barGap,// 百分比或者数字，表示bar宽度的百分之多少或者几倍
          // barCategoryGap: barCategoryGap,
          data: seriesData,
          itemStyle: {
            normal: {
              // color: function (params) { return colorList[params.seriesIndex] },
              color: colorList[index],
              barBorderRadius: (yySetting.bVertical == true ? [5, 5, 0, 0] : [0, 5, 5, 0]),//圆角半径，单位px，支持传入数组分别指定 4 个圆角半径
              opacity: 1//图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
            }
          },
          yAxisIndex: yAxisIndex
        });
      }
      else {
        series.push({
          name: itemMeasure.caption,
          type: 'line',
          stack: itemMeasure.hasOwnProperty("stack") ? itemMeasure.stack : yySetting.stack,
          smooth: itemMeasure.hasOwnProperty("smooth") ? itemMeasure.smooth : yySetting.smooth,
          silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
          data: seriesData,
          itemStyle: {
            normal: {
              color: colorList[index],
              lineStyle:
                {
                  color: colorList[index],
                  width: 1.5
                }
            }
          },

          yAxisIndex: yAxisIndex
        });
      }

    });
  }
  let measure0 = _.filter(measure, function (o) { return o.yAxisIndex == 0; });
  let measure1 = _.filter(measure, function (o) { return o.yAxisIndex == 1; });
  if (measure0.length == 1 && option.yAxis[0].name == "")
    option.yAxis[0].name = measure0[0].caption;
  if (measure1.length == 1 && option.yAxis[1].name == "")
    option.yAxis[1].name = measure1[0].caption;

  option.legend.data = legendData;
  option.series = series;
  let needWrap = _.get(yySetting, 'xAxis.axisLabel.needWrap');
  let wrapRowLen = _.get(yySetting, 'xAxis.axisLabel.wrapRowLen');
  if (needWrap && wrapRowLen) {
    option.xAxis.axisLabel.formatter = (value) => eChartCommon.wrapString(value, wrapRowLen);
  }
  option.xAxis.data = xAxisData;
  // if (yySetting.bVertical == false) {
  //   option.xAxis.axisLabel.formatter = null;
  //   let tmp = option.xAxis;
  //   option.xAxis = option.yAxis;
  //   option.yAxis = tmp;
  // }

  option.tooltip.formatter = function (params) {
    var result = '';
    params.forEach(function (item) {
      if (result == '')
        result = item.name;
      result = result + "</br>" + '<span style="display:inline-block;margin-right:5px;border-radius:9px;width:8px;height:8px;background-color:' + item.color + '"></span>' + " " + item.seriesName + " : " + item.value
    });
    return result;
  };


  if (min0 >= 0 && min1 >= 0) {
    min0 = 0;
    min1 = 0;
  }
  else if (min0 >= 0 && min1 < 0) {
    min0 = min1 * max0 / max1;
  }
  else if (min1 >= 0 && min0 < 0) {
    min1 = min0 * max1 / max0;
  }
  else {
    if (Math.abs(max0 / min0) < Math.abs(max1 / min1)) {
      min1 = min0 * max1 / max0;
    }
    else {
      min0 = min1 * max0 / max1;
    }

  }

  // option.yAxis[0].max = function (value) {
  //   console.log("option.yAxis[0].max " + value.max + "   ----> " + max0);
  //   // return value.max;
  //   return max0;
  // }
  // option.yAxis[0].min = function (value) {
  //   console.log("option.yAxis[0].min " + value.min + "   ----> " + min0);
  //   // return value.min;
  //   return min0;
  // }

  // option.yAxis[1].max = function (value) {
  //   console.log("option.yAxis[1].max " + value.max + "   ----> " + max1);
  //   // return value.max;
  //   return max1;
  // }
  // option.yAxis[1].min = function (value) {
  //   console.log("option.yAxis[1].min " + value.min + "   ----> " + min1);
  //   // return value.min;
  //   return min1;
  // }



  // option.yAxis[0].max = 5555;
  // option.yAxis[0].min = -400;

  // option.yAxis[1].max = 222.2;
  // option.yAxis[1].min = -16;

  // if (chartDisplayType == "mobile") {
  //   // option.title.top = 0;

  //   option.title.top = 20;
  //   option.legend.top = 55;
  //   option.grid.top = 115;
  // }


  // option.title.top = 0;
  // option.title.height = 14;
  // option.legend.top = option.title.top + option.title.height + 15;
  // option.legend.itemWidth = 10;
  // option.legend.itemWidth = 10;
  // option.grid.top = option.legend.top + option.legend.height + 30;
  // option.tooltip.padding = [5, 15, 5, 15,];// 上右 下左
  // option.tooltip.textStyle = { fontSize: 12 };

  // option.grid = {
  //   top: 0,
  //   left: 0,// grid 组件离容器左侧的距离。
  //   right: 0,// default: '10%'  grid 组件离容器右侧的距离
  //   bottom: 30,//grid 组件离容器下侧的距离
  //   containLabel: true
  // }
  // option.xAxis.axisLabel.inside = false;



  //
  // option.toolbox.feature.saveAsImage.icon = 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891';
  // option.toolbox.feature.saveAsImage.icon = <SvgIcon type={"baocunweitupian"} />;
  // symbol: 'image://./echarts/themes/default/images/icon-shop.png',
  // option.toolbox.feature.saveAsImage.icon = 'image://http://echarts.baidu.com/images/favicon.png';


  // option.toolbox.feature.saveAsImage.iconStyle = { textPosition: 'top', textAlign: 'left' };
  // option.toolbox.orient = "vertical";
  // option.toolbox.height = 14;
  // option.toolbox.width = 81;

  // option.legend.padding = [55, 10, 5, 10]
  // option.toolbox.iconStyle = {
  //   normal: {
  //     color: 'red',//设置颜色
  //   }
  // }

  // option.toolbox.emphasis.iconStyle.borderColor = "red";
  // option.toolbox.emphasis = { iconStyle: { color: "red" } };
  // option.dataZoom = [{ type: 'inside' }];
  // option.grid.height = 500;


  if (legendData.length * xAxisData.length > 100) { //超过100可缩放
    option.dataZoom = [{ type: 'inside', zoomOnMouseWheel: 'shift' }];
  }

  if (chartDisplayType == "panel")//如果在大屏展现，则需要特殊调整参数
  {
    option.grid.left = '5%';
    option.grid.right = '5%';
    option.grid.bottom = '5%';
    option.grid.containLabel = true;
    option.yAxis[0].nameLocation = "start";
    option.yAxis[1].nameLocation = "start";
    if (panelType == 3) {
      option.title.left = 10;
      option.legend.left = 10;
    }

    else if (panelType == 2) {
      option.tooltip.position = function (point, params, dom, rect, size) {
        //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
        var x = point[0];//
        var y = point[1];
        var viewWidth = size.viewSize[0];
        var viewHeight = size.viewSize[1];
        var boxWidth = size.contentSize[0];
        var boxHeight = size.contentSize[1];
        var posX = 0;//x坐标位置
        var posY = 0;//y坐标位置

        if (x < boxWidth) {//左边放不开
          posX = 5;
        } else {//左边放的下
          posX = x - boxWidth;
        }
        if (y < boxHeight) {//上边放不开
          posY = 5;
        } else {//上边放得下
          posY = y - boxHeight;
        }
        return [posX, posY];
      }
    }
  }
  else if (chartDisplayType == "mobile")//如果在移动端展现，则需要特殊调整参数
  {
    option.title.top = 20;
    option.legend.top = 55;
    option.grid.top = 115;

    option.grid.left = '2%';
    option.grid.right = '2%';
    option.grid.bottom = '5%';
    option.grid.containLabel = true;

    option.xAxis.nameLocation = "start";
    option.yAxis.nameLocation = "start";
  }
  else if (chartDisplayType == "rpt") {
    option.grid.containLabel = true;
    option.grid.left = '2%';
    option.grid.right = '2%';
  }
  if (!!skinConfig && skinConfig.displaySkin) {
    _.set(option, "title.textStyle.color", skinConfig.displaySkin.textColor);
    _.set(option, "legend.textStyle.color", skinConfig.displaySkin.textColor);

    _.set(option, "xAxis.nameTextStyle.color", skinConfig.displaySkin.textColor);
    _.set(option, "yAxis[0].nameTextStyle.color", skinConfig.displaySkin.textColor);
    _.set(option, "yAxis[1].nameTextStyle.color", skinConfig.displaySkin.textColor);

    _.set(option, "xAxis.axisLine.lineStyle.color", skinConfig.displaySkin.axisLineColor);
    _.set(option, "yAxis[0].axisLine.lineStyle.color", skinConfig.displaySkin.axisLineColor);
    _.set(option, "yAxis[1].axisLine.lineStyle.color", skinConfig.displaySkin.axisLineColor);

    _.set(option, "xAxis.splitLine.lineStyle.color", skinConfig.displaySkin.splitLineColor);
    _.set(option, "yAxis[0].splitLine.lineStyle.color", skinConfig.displaySkin.splitLineColor);
    _.set(option, "yAxis[1].splitLine.lineStyle.color", skinConfig.displaySkin.splitLineColor);

    _.set(option, "xAxis.axisLabel.textStyle.color", skinConfig.displaySkin.textColor);
    _.set(option, "yAxis[0].axisLabel.textStyle.color", skinConfig.displaySkin.textColor);
    _.set(option, "yAxis[1].axisLabel.textStyle.color", skinConfig.displaySkin.textColor);

  }

  option.legend.pageIconColor = "#949CA6";
  option.legend.pageIconInactiveColor = "#C9CDD3";
  option.legend.pageIconSize = 10;

  setAddLengthInfoByRotate(option, yySetting, chartDisplayType, panelType, maxNameLength, _.get(option, 'xAxis.axisLabel.rotate'))

  return option;
}

const setAddLengthInfoByRotate = (option, yySetting, chartDisplayType, panelType, charLength, rotate) => {
  // if (!charLength || charLength == 1 || !rotate || chartDisplayType != "mobile") {
  //   return;
  // }
  // else {
  //   option.addLengthInfo = { charLength, rotate };
  // }
  if (!!charLength && charLength > 1 && !!rotate && (chartDisplayType == "mobile" || (chartDisplayType == "panel" && panelType == 3))) {
    option.addLengthInfo = { charLength, rotate };
  }
}
