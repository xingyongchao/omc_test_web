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

function setOption(chartDisplayType, option, yySetting, data, skinConfig) {
  // let dimensionCodeFileld = yySetting.dataField.dimensionX[0].codeField;///store_code
  // let dimensionNameFileld = yySetting.dataField.dimensionX[0].nameField;//store_name

  var dimensionCodeFileld = eChartCommon.eChartLabel.unionedXCode; ///store_code
  var dimensionNameFileld = eChartCommon.eChartLabel.unionedXName; //store_name

  var measureValueFileld = yySetting.dataField.measure[0].valueField; //fMoney
  var caption = yySetting.dataField.measure[0].caption;
  var seriesData = [];
  var colorList = eChartCommon.getChartColorArr(100);
  var percentValue = 12.3456;

  seriesData.push({
    value: percentValue,
    name: caption,
    label: {
      normal: {
        show: true,
        position: 'center',
        textStyle: {
          // fontSize: '30',
          fontWeight: 'bold'
        },
        formatter: '{b}\n{c}%'
      }
    }
  });
  seriesData.push({
    value: 100 - percentValue,
    name: "",
    label: {
      normal: {
        show: false
      }
    }
  });

  option.legend.show = false;

  var series = [{
    data: seriesData,
    itemStyle: {
      normal: {
        color: function color(params) {
          if (params.dataIndex == 0) return "red";
          if (params.dataIndex == 1) return "#d9d9d9";
        }
      }
    }
  }];
  if (yySetting.radius) //radiusInner
    {
      series[0].radius = [yySetting.radius.radiusInner.toString() + '%', yySetting.radius.radiusOuter.toString() + '%'];
    }
  option.title.left = "center";
  option.tooltip.show = false;

  // option.series[0].label.show = false;
  // option.series[0].label.normal.show = false;

  option.series[0].labelLine.show = false;
  option.series[0].labelLine.normal.show = false;

  option.series[0].label = {
    // normal: {
    //   show: false,
    //   position: 'center',
    //   textStyle: {
    //     // fontSize: '30',
    //     fontWeight: 'bold'
    //   },
    //   formatter: '{b}\n{c}%'
    // }
  };

  option.series[0] = cb.utils.extend({}, option.series[0], series[0]);
  // option.series[0].label.lineHeight = 30;
  // option.series[0].label.padding = [24, 4, 24, 4];

  return option;
}