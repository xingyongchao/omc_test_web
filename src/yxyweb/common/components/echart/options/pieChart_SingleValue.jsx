import * as  eChartDemoData from '../eChartDemoData';
import * as  eChartCommon from '../eChartCommon';
export function setOption(chartDisplayType, option, yySetting, data, skinConfig) {
  // let dimensionCodeFileld = yySetting.dataField.dimensionX[0].codeField;///store_code
  // let dimensionNameFileld = yySetting.dataField.dimensionX[0].nameField;//store_name

  let dimensionCodeFileld = eChartCommon.eChartLabel.unionedXCode;///store_code
  let dimensionNameFileld = eChartCommon.eChartLabel.unionedXName;//store_name

  let measureValueFileld = yySetting.dataField.measure[0].valueField;//fMoney
  let caption = yySetting.dataField.measure[0].caption;
  let seriesData = [];
  let colorList = eChartCommon.getChartColorArr(100);
  let percentValue = 12.3456;

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
    value: (100 - percentValue),
    name: "",
    label: {
      normal: {
        show: false
      }
    }
  });


  option.legend.show = false;


  let series = [
    {
      data: seriesData,
      itemStyle: {
        normal: {
          color: function (params) {
            if (params.dataIndex == 0)
              return "red";
            if (params.dataIndex == 1)
              return "#d9d9d9";

          }
        }
      }
    }
  ]
  if (yySetting.radius)//radiusInner
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
  }

  option.series[0] = cb.utils.extend({}, option.series[0], series[0]);
  // option.series[0].label.lineHeight = 30;
  // option.series[0].label.padding = [24, 4, 24, 4];

  return option;
}


