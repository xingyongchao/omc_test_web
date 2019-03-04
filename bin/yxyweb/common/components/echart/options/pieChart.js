'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOption = setOption;

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function setOption(chartDisplayType, option, yySetting, data, skinConfig, panelType) {
  // let dimensionCodeFileld = yySetting.dataField.dimensionX[0].codeField;///store_code
  // let dimensionNameFileld = yySetting.dataField.dimensionX[0].nameField;//store_name

  var dimensionCodeFileld = eChartCommon.eChartLabel.unionedXCode; ///store_code
  var dimensionNameFileld = eChartCommon.eChartLabel.unionedXName; //store_name

  var measureValueFileld = yySetting.dataField.measure[0].valueField; //fMoney
  var legendData = [];
  var seriesData = [];
  var colorList = eChartCommon.getChartColorArr(100);
  data.forEach(function (item) {
    if (!!item[dimensionNameFileld] == true) {
      legendData.push({ name: item[dimensionNameFileld], textStyle: { width: '10px', height: '10px' } });
      seriesData.push({ value: item[measureValueFileld], name: item[dimensionNameFileld] });
    }
  });

  option.legend.data = legendData;

  if (yySetting.orderInfo.orderBy == "asc") seriesData = seriesData.sort(function (a, b) {
    return a.value - b.value;
  });
  if (yySetting.orderInfo.orderBy == "desc") seriesData = seriesData.sort(function (a, b) {
    return b.value - a.value;
  });
  // if (yySetting.rowNumber < seriesData.length)
  //   seriesData = seriesData.slice(0, yySetting.rowNumber);

  // option.calculable = true;
  var series = [{
    data: seriesData,
    itemStyle: {
      normal: {
        color: function color(params) {
          return colorList[params.dataIndex];
        }
      }
    }
  }];
  if (yySetting.radius) //radiusInner
    {
      series[0].radius = [yySetting.radius.radiusInner.toString() + '%', yySetting.radius.radiusOuter.toString() + '%'];
    }
  option.series[0] = cb.utils.extend({}, option.series[0], series[0]);

  if (chartDisplayType == "mobile") {
    option.title.top = 20;
    option.legend.top = 55;
    option.legend.orient = "horizontal";
    option.series[0].center = ['50%', '65%'];

    var pageIcons = [];
    // pageIcons.push('path://M737.6 172.1c17.1-17.1 17.1-44.8 0-61.9s-44.8-17.1-61.9 0L273.6 512.4l402.2 402.2c17.1 17.1 44.8 17.1 61.9 0s17.1-44.8 0-61.9L397.3 512.4l340.3-340.3z');
    // pageIcons.push('path://M286.4 172.1c-17.1-17.1-17.1-44.8 0-61.9s44.8-17.1 61.9 0l402.2 402.2-402.2 402.2c-17.1 17.1-44.8 17.1-61.9 0s-17.1-44.8 0-61.9l340.3-340.3-340.3-340.3z');
    pageIcons.push('path://M655.59457419 295.65338757c10.88416321-10.88416321 10.88416321-28.51523459-1e-8-39.3993978s-28.51523459-10.88416321-39.39939779 0L360.25821593 512.25460031l256.00061055 256.00061053c10.88416321 10.88416321 28.51523459 10.88416321 39.39939779 0s10.88416321-28.51523459 0-39.39939779L438.99336144 512.25460031l216.60121274-216.60121274z');
    pageIcons.push('path://M368.40542581 295.65338757c-10.88416321-10.88416321-10.88416321-28.51523459 1e-8-39.3993978s28.51523459-10.88416321 39.39939779 0l256.00061053 256.00061055-256.00061053 256.00061052c-10.88416321 10.88416321-28.51523459 10.88416321-39.3993978 0s-10.88416321-28.51523459 0-39.39939779l216.60121275-216.60121274-216.60121274-216.60121274z');
    option.legend.pageIcons = { vertical: pageIcons, horizontal: pageIcons };

    option.tooltip.position = function (point, params, dom, rect, size) {
      //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
      var x = point[0]; //
      var y = point[1];
      var viewWidth = size.viewSize[0];
      var viewHeight = size.viewSize[1];
      var boxWidth = size.contentSize[0];
      var boxHeight = size.contentSize[1];
      var posX = 0; //x坐标位置
      var posY = 0; //y坐标位置

      if (x < boxWidth) {
        //左边放不开
        posX = 5;
      } else {
        //左边放的下
        posX = x - boxWidth;
      }

      if (y < boxHeight) {
        //上边放不开
        posY = 5;
      } else {
        //上边放得下
        posY = y - boxHeight;
      }

      return [posX, posY];
    };
  } else if (chartDisplayType == eChartCommon.chartDisplayType.panel) //如果在大屏展现，则需要特殊调整参数
    {
      option.series[0].label.normal.show = false;
      option.series[0].labelLine.normal.show = false;
      if (panelType == 3) {
        option.series[0].center = ['65%', '50%'];
      } else {
        option.series[0].center = ['70%', '50%'];
      }
    }
  if (!!skinConfig && skinConfig.displaySkin) {
    _.set(option, "title.textStyle.color", skinConfig.displaySkin.textColor);
    _.set(option, "legend.textStyle.color", skinConfig.displaySkin.textColor);
    _.set(option.series[0], "labelLine.normal.lineStyle.color", skinConfig.displaySkin.labelLineColor);
    _.set(option.series[0], "label.normal.textStyle.color", skinConfig.displaySkin.textColor);
  }
  // pageIcons.push('M0,0L20,0L10,-20z');
  // pageIcons.push('M0,0L20,0L10,20z');
  // pageIcons.push('path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z');
  // pageIcons.push('path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z');
  // let pageIcons = [];
  // let pageIcons2 = [];
  // pageIcons.push('image://http://ov62qgheo.bkt.clouddn.com/8f3ce0aa-6d36-4d4f-a426-8442b848e6f3.png');
  // pageIcons.push('image://http://ov62qgheo.bkt.clouddn.com/0d41f8be-d7a7-4067-86e2-478dc4abb73b.png');
  // pageIcons2.push('image://http://ov62qgheo.bkt.clouddn.com/3dd88357-b814-4b4a-a8d8-442067b252cd.png');
  // pageIcons2.push('image://http://ov62qgheo.bkt.clouddn.com/82051940-1c3f-4e31-88f8-2d975d19dca8.png');
  // option.legend.pageIcons = { vertical: pageIcons2, horizontal: pageIcons };
  option.legend.pageIconColor = "#949CA6";
  option.legend.pageIconInactiveColor = "#C9CDD3";
  option.legend.pageIconSize = 10;
  // option.legend.pageButtonPosition = "start";
  return option;
}