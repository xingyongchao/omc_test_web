import * as  eChartDemoData from '../eChartDemoData';
import * as  eChartCommon from '../eChartCommon';


import _ from 'lodash';
export function setOption(chartDisplayType, option, yySetting, data, skinConfig, panelType) {

  let dimensionCodeFileld = eChartCommon.eChartLabel.unionedXCode;///store_code
  let dimensionNameFileld = eChartCommon.eChartLabel.unionedXName;//store_name

  let dimensionX = _.get(yySetting, 'dataField.dimensionX');
  let dimensionSub = _.get(yySetting, 'dataField.dimensionSub');
  let measure = _.get(yySetting, 'dataField.measure');

  let legendData = [];
  let series = [];
  let xAxisData = [];
  let colorList = eChartCommon.getChartColorArr(100);

  let maxNameLength = 0;
  if (dimensionSub.length > 0) {
    //如果存在次维度
    // let dimensionSubCodeFileld = yySetting.dataField.dimensionSub[0].codeField;///store_code
    // let dimensionSubNameFileld = yySetting.dataField.dimensionSub[0].nameField;//store_name
    let dimensionSubCodeFileld = eChartCommon.eChartLabel.unionedSubCode;
    let dimensionSubNameFileld = eChartCommon.eChartLabel.unionedSubName;
    // let dimensionSubSmooth = yySetting.dataField.dimensionSub[0].hasOwnProperty("smooth") ? yySetting.dataField.dimensionSub[0].smooth : yySetting.smooth;
    // let dimensionSubStack = yySetting.dataField.dimensionSub[0].hasOwnProperty("stack") ? yySetting.dataField.dimensionSub[0].stack : yySetting.stack;
    let dimensionSubSmooth = yySetting.smooth;
    let dimensionSubStack = yySetting.stack;
    let measureValueField = measure[0].valueField;

    let xAxisItems = [];
    let seriesItems = [];
    data.forEach(itemData => {
      if (xAxisItems.indexOf(itemData[dimensionNameFileld]) < 0) {
        xAxisItems.push(itemData[dimensionNameFileld]);
        if (maxNameLength < itemData[dimensionNameFileld].length)
          maxNameLength = itemData[dimensionNameFileld].length;
      }
      itemData[dimensionSubNameFileld] = eChartCommon.trimCaptionForLegend(itemData[dimensionSubNameFileld], "lineChart");
      if (seriesItems.indexOf(itemData[dimensionSubNameFileld]) < 0) {
        seriesItems.push(itemData[dimensionSubNameFileld]);
      }
    });

    seriesItems.forEach((eleS, index) => {
      legendData.push({ name: eleS, textStyle: { width: '10px', height: '10px' } });
      let seriesData = [];
      xAxisItems.forEach(eleX => {
        if (xAxisData.indexOf(eleX) < 0)
          xAxisData.push(eleX);
        let itemDataValue = "0";
        data.forEach(itemData => {
          if (itemData[dimensionNameFileld] == eleX && itemData[dimensionSubNameFileld] == eleS)
            itemDataValue = itemData[measureValueField];
        });
        seriesData.push(itemDataValue);
      });

      series.push({
        name: eleS,
        type: 'line',
        stack: dimensionSubStack,
        smooth: dimensionSubSmooth,
        silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
        // barWidth: 10,
        // barGap: '0%', // Make series be overlap
        data: seriesData,
        itemStyle: {
          normal: {
            color: colorList[index],
            lineStyle:
              { color: colorList[index] }
          }
        }
      });
    });

  }
  else {
    measure.forEach((itemMeasure, index) => {
      legendData.push({ name: itemMeasure.caption, textStyle: { width: '10px', height: '10px' } });
      let seriesData = [];
      data.forEach(itemData => {
        if (!!itemData[dimensionNameFileld] == true) {
          // seriesData.push(itemData[itemMeasure.valueField]);
          seriesData.push(_.get(itemData, itemMeasure.valueField, 0));
          if (xAxisData.indexOf(itemData[dimensionNameFileld]) < 0) {
            if (maxNameLength < itemData[dimensionNameFileld].length)
              maxNameLength = itemData[dimensionNameFileld].length;
            xAxisData.push(itemData[dimensionNameFileld]);
          }
        }
      });
      series.push({
        name: itemMeasure.caption,
        type: 'line',
        // stack: itemMeasure.hasOwnProperty("stack") ? itemMeasure.stack : yySetting.stack,
        // smooth: itemMeasure.hasOwnProperty("smooth") ? itemMeasure.smooth : yySetting.smooth,
        stack: yySetting.stack,
        smooth: yySetting.smooth,
        silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
        // barWidth: 10,
        // barGap: '0%', // Make series be overlap
        data: seriesData,
        itemStyle: {
          normal: {
            color: colorList[index],
            lineStyle:
              { color: colorList[index] }
          }
        }
      });

    });
  }
  option.legend.data = legendData;
  option.series = series;
  let needWrap = _.get(yySetting, 'xAxis.axisLabel.needWrap');
  let wrapRowLen = _.get(yySetting, 'xAxis.axisLabel.wrapRowLen');
  if (needWrap && wrapRowLen) {
    option.xAxis.axisLabel.formatter = (value) => eChartCommon.wrapString(value, wrapRowLen);
  }
  option.xAxis.data = xAxisData;
  option.tooltip.formatter = function (params) {
    var result = '';
    params.forEach(function (item) {
      if (result == '')
        result = item.name;
      result = result + "</br>" + '<span style="display:inline-block;margin-right:5px;border-radius:9px;width:8px;height:8px;background-color:' + item.color + '"></span>' + " " + item.seriesName + " : " + item.value
    });
    return result;
  };


  if (dimensionX.length == 1) {
    if (yySetting.bVertical)
      option.xAxis.name = option.xAxis.name || dimensionX[0].caption;
    else
      option.yAxis.name = option.yAxis.name || dimensionX[0].caption;
  }
  if (measure.length == 1) {
    // option.legend.show = false;
    if (yySetting.bVertical)
      option.yAxis.name = option.yAxis.name || measure[0].caption;
    else
      option.xAxis.name = option.xAxis.name || measure[0].caption;
  }

  if (chartDisplayType == "mobile") {
    option.legend.top = 35;
  }

  if (chartDisplayType == "panel")//如果在大屏展现，则需要特殊调整参数
  {
    option.grid.left = '5%';
    option.grid.right = '5%';
    option.grid.bottom = '5%';
    option.grid.containLabel = true;
    option.xAxis.nameLocation = "start";
    option.yAxis.nameLocation = "start";
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
    _.set(option, "yAxis.nameTextStyle.color", skinConfig.displaySkin.textColor);

    _.set(option, "xAxis.axisLine.lineStyle.color", skinConfig.displaySkin.axisLineColor);
    _.set(option, "yAxis.axisLine.lineStyle.color", skinConfig.displaySkin.axisLineColor);

    _.set(option, "xAxis.splitLine.lineStyle.color", skinConfig.displaySkin.splitLineColor);
    _.set(option, "yAxis.splitLine.lineStyle.color", skinConfig.displaySkin.splitLineColor);

    _.set(option, "xAxis.axisLabel.textStyle.color", skinConfig.displaySkin.textColor);
    _.set(option, "yAxis.axisLabel.textStyle.color", skinConfig.displaySkin.textColor);

    // let xAxisData2 = [];
    // _.forEach(option.xAxis.data, (ele, key) => {
    //   let newData = {
    //     value: ele,
    //     textStyle: { color: skinConfig.displaySkin.textColor }
    //   };
    //   xAxisData2.push(newData);
    // });
    // option.xAxis.data = xAxisData2;
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
