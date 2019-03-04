import React, { Component } from 'react';
import * as eChartDemoData from './eChartDemoData';
import { Format } from '../../helpers/formatDate';
import Row from '../basic/row';
import Col from '../basic/col';

export const eChartLabel = {
  SplitChar: "/",
  unionedXCode: "eChartDimensionXCode",
  unionedXName: "eChartDimensionXName",
  unionedSubCode: "eChartDimensionSubCode",
  unionedSubName: "eChartDimensionSubName",
};

const keyPrefix = {
  panelTemplateColKey: "colKey_",
  panelTemplateRowKey: "rowKey_",
  panelTemplateChartKey: "chartKey_",
  panelTemplateSubChartKey: "subChartKey_",
};

export const displayStyle = [
  1,//报表的展现方式：单表   
  2,//报表的展现方式：单图     
  3//报表的展现方式：图+表  
]

export const chartDisplayType = {
  rpt: "rpt",//在最初的PC报表中展现
  panel: "panel",// 在看板（分为大屏看板和桌面看板和移动看板）中展现
  mobile: "mobile",// 在移动报表中展现（单图，单表，图+表）
}

export const panelType = {
  panelType1: 1,//大屏看板
  panelType2: 2,// 桌面看板
  panelType3: 3,// 移动看板
}

export const panelDefaultValue = {
  borderColor: "#DBE0E5",
  backgroundColor: "",
  margin: "7px",
  allMargin: "18px",
  allMargin2: "20px",
  padding: "0px",
  borderWidth: '1px',
  finalControlPadding: "5px",
  panel2AllBackgroundColor: "#f0f1f4",
  panel2SumTextColor: "#999"
};
export function getNewColKey() {
  return keyPrefix.panelTemplateColKey + getRandom();
}

export function getNewCol() {
  let colEle = {
    colKey: getNewColKey(),
    widgetType: "none",
    width: '100%',
    backgroundColor: '',
    backgroundImage: "",
    borderWidth: panelDefaultValue.borderWidth,
    borderColor: panelDefaultValue.borderColor,
    padding: panelDefaultValue.padding,
    margin: panelDefaultValue.margin,
  };

  return colEle;
}

export function getNewRowKey() {
  return keyPrefix.panelTemplateRowKey + getRandom();
}

export function getNewRow(curRow) {
  let rowEle = {
    rowKey: getNewRowKey(),// "003",
    height: '100%',
    backgroundColor: '',
    backgroundImage: "",
    borderWidth: panelDefaultValue.borderWidth,
    borderColor: panelDefaultValue.borderColor,
    padding: panelDefaultValue.padding,
    margin: panelDefaultValue.margin,
    cols: []
  };

  return rowEle;
}
export function getNewChartKey() {
  return keyPrefix.panelTemplateChartKey + getRandom();
}

export function getNewSubChartKey() {
  return keyPrefix.panelTemplateSubChartKey + getRandom();
}


export function getRandom() {
  return Math.floor(Math.random() * 10000000000);
}

//如果显示名称超长，会影响legend显示，暂时截断为15位   
export function trimCaptionForLegend(caption, logStr) {
  let str = caption.toString();
  if (str.length > 15) {
    str = str.substring(0, 15) + "...";
    LogChartInfo("需要显示为Legend的名字超长，需要截断，截断前：" + caption + "  截断后：" + str + " 其他信息:" + logStr, "", 999)
  }
  return str;
}
//如果显示名称超长，会影响XY轴显示，甚至X轴名字顶到上面，柱状图倒置，暂时截断为10位    
export function trimNameForXYAxis(caption, logStr) {
  let str = caption.toString();
  if (str.length > 10) {
    str = str.substring(0, 10) + "...";
    LogChartInfo("需要显示为XY轴的名字超长，需要截断，截断前：" + caption + "  截断后：" + str + " 其他信息:" + logStr, "", 999)
  }
  return str;
}




export const components = {
  weather: { widgetType: "component", componentConfig: { subType: "weather", title: "天气", component: "EChartWeather", icon: "tianqicopy" } },
  datetime: { widgetType: "component", componentConfig: { subType: "datetime", title: "日期时间", component: "EChartDateTime", icon: "riqidefuben", dateTimeConfig: {} } },
  commonFunc: { widgetType: "component", componentConfig: { subType: "commonFunc", title: "常用功能", component: "", icon: "riqidefuben" } }
};

export function getChartColorArr(length) {
  // var colorList = ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'];
  // var colorList = ['#4CBEF4', '#FF9352', '#49BC99', '#8580E5', '#FF5D67', '#FFC059', '#499DD5', '#7CCC55', '#7FADF1', '#48B95E', '#7BD29A', '#D679BE', '#C0E158', '#6BCCF9', '#948FF4', '#48CDD0'];
  // var colorList2 = ['#B74AE5', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#C33531', '#0AAF9F', '#3498DB'];
  // var colorList = _.concat(colorList1, colorList2)
  // var colorList = ['#FF5D67', '#4CBEF4', '#49BC99', '#FF9352', '#7FADF1', '#FFC059', '#D679BE', '#7CCC55', '#7BD29A', '#948FF4', '#5AB3ED', '#C0E158', '#6BCCF9', '#48CDD0'];
  var colorList = ['#1E9CFC', '#8CCB39', '#BC62F5', '#F0B702', '#F36627', '#48CDD0', '#C0E158', '#4AB1E8', '#FF5D67', '#8580E5', '#7CCC55', '#4CBEF4', '#FFC059', '#7AD4FF', '#CD77E5', '#FF9352', '#49BC99', '#CF4698'];
  for (var i = 0; i < length; i++) {
    colorList.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }
  return colorList;
}


export function wrapString(value, rowLen) {
  var ret = "";//拼接加\n返回的类目项
  var maxLength = rowLen;//每项显示文字个数
  var valLength = value.length;//X轴类目项的文字个数
  var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
  if (rowN > 1)//如果类目项的文字大于3,
  {
    for (var i = 0; i < rowN; i++) {
      var temp = "";//每次截取的字符串
      var start = i * maxLength;//开始截取的位置
      var end = start + maxLength;//结束截取的位置
      //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
      temp = value.substring(start, end) + "\n";
      ret += temp; //凭借最终的字符串
    }
    return ret;
  }
  else {
    return value;
  }
}

export function getEChartElementId(id) {
  // if (id == "")
  id = "chart1";
  return "eChartId_" + id;
}
export function upgradeConfig_ForScatter_Batch(configArr) {
  if (configArr && configArr.length > 0) {
    configArr.forEach(ele => {
      upgradeConfig_ForScatter(ele);
    }
    );
  }
  return configArr;
}
export function upgradeConfig_ForScatter(config) {
  //升级气泡度的regionInfo信息
  //需要判断Null
  //设置升级信息
  //气泡图地图的
  let yySetting = config.yySetting;
  if (yySetting.type == "scatter" && !yySetting.regionInfo) {
    let regionInfo = {};
    let key = yySetting.key;

    if (key == 'china') //导入的地图
    {
      regionInfo.region = "100000";
      regionInfo.shortName = "中国";
      regionInfo.parent = 0;
      regionInfo.regionArr = [100000];
      regionInfo.geoName = regionInfo.shortName + regionInfo.region;
    }
    else {
      let ele = getMapProvinceArr(key);
      if (ele) {

        regionInfo.region = ele.region;
        regionInfo.shortName = ele.name;
        regionInfo.parent = "100000";
        regionInfo.regionArr = [100000];
        regionInfo.regionArr.push(ele.region);
        regionInfo.geoName = regionInfo.shortName + regionInfo.region;
      }
      else {
        LogChartInfo("upgradeConfig_ForScatter 没找到对应的待升级地区。yySetting ", JSON.stringify(yySetting), 999)
        return;
      }
    }
    yySetting.regionInfo = regionInfo;
  }
  return config;
}

export function upgradeConfig_ForEChartArr(eChartConfig) {
  //针对报表的分组方案由支持单图改为支持多图，升级整个报表的配置信息
  // eChartConfig: {
  //   subChartColNum: 1,
  //     subChartConfigArr: []
  // }
  if (eChartConfig.hasOwnProperty("subChartColNum") == false && eChartConfig.hasOwnProperty("subChartConfigArr") == false) {
    let obj = {};
    obj.subChartColNum = 1;
    obj.subChartConfigArr = [];
    if (!!eChartConfig.chart1) {
      upgradeConfig_ForScatter(eChartConfig.chart1);
      obj.subChartConfigArr.push(eChartConfig.chart1);
    }
    else {
      LogChartInfo("分组方案由支持单图改为支持多图升级整个报表的配置信息出错。eChartConfig", JSON.stringify(eChartConfig), 999)
    }
    eChartConfig = obj;
  }
  return eChartConfig;
}
export function getMapAllCitys(cityCode) {
  let citys = [];
  citys.push({ cityCode: "110100", cityName: "北京市" });
  citys.push({ cityCode: "120100", cityName: "天津市" });
  citys.push({ cityCode: "310100", cityName: "上海市" });
  citys.push({ cityCode: "500100", cityName: "重庆市" });
  citys.push({ cityCode: "310200", cityName: "崇明县" });
  citys.push({ cityCode: "429000", cityName: "湖北省直辖县市" });
  citys.push({ cityCode: "522200", cityName: "铜仁市" });
  citys.push({ cityCode: "522400", cityName: "毕节市" });
  citys.push({ cityCode: "130100", cityName: "石家庄市" });
  citys.push({ cityCode: "130200", cityName: "唐山市" });
  citys.push({ cityCode: "130300", cityName: "秦皇岛市" });
  citys.push({ cityCode: "130400", cityName: "邯郸市" });
  citys.push({ cityCode: "130500", cityName: "邢台市" });
  citys.push({ cityCode: "130600", cityName: "保定市" });
  citys.push({ cityCode: "130700", cityName: "张家口市" });
  citys.push({ cityCode: "130800", cityName: "承德市" });
  citys.push({ cityCode: "130900", cityName: "沧州市" });
  citys.push({ cityCode: "131000", cityName: "廊坊市" });
  citys.push({ cityCode: "131100", cityName: "衡水市" });
  citys.push({ cityCode: "140100", cityName: "太原市" });
  citys.push({ cityCode: "140200", cityName: "大同市" });
  citys.push({ cityCode: "140300", cityName: "阳泉市" });
  citys.push({ cityCode: "140400", cityName: "长治市" });
  citys.push({ cityCode: "140500", cityName: "晋城市" });
  citys.push({ cityCode: "140600", cityName: "朔州市" });
  citys.push({ cityCode: "140700", cityName: "晋中市" });
  citys.push({ cityCode: "140800", cityName: "运城市" });
  citys.push({ cityCode: "140900", cityName: "忻州市" });
  citys.push({ cityCode: "141000", cityName: "临汾市" });
  citys.push({ cityCode: "141100", cityName: "吕梁市" });
  citys.push({ cityCode: "150100", cityName: "呼和浩特市" });
  citys.push({ cityCode: "150200", cityName: "包头市" });
  citys.push({ cityCode: "150300", cityName: "乌海市" });
  citys.push({ cityCode: "150400", cityName: "赤峰市" });
  citys.push({ cityCode: "150500", cityName: "通辽市" });
  citys.push({ cityCode: "150600", cityName: "鄂尔多斯市" });
  citys.push({ cityCode: "150700", cityName: "呼伦贝尔市" });
  citys.push({ cityCode: "150800", cityName: "巴彦淖尔市" });
  citys.push({ cityCode: "150900", cityName: "乌兰察布市" });
  citys.push({ cityCode: "152200", cityName: "兴安盟" });
  citys.push({ cityCode: "152500", cityName: "锡林郭勒盟" });
  citys.push({ cityCode: "152900", cityName: "阿拉善盟" });
  citys.push({ cityCode: "210100", cityName: "沈阳市" });
  citys.push({ cityCode: "210200", cityName: "大连市" });
  citys.push({ cityCode: "210300", cityName: "鞍山市" });
  citys.push({ cityCode: "210400", cityName: "抚顺市" });
  citys.push({ cityCode: "210500", cityName: "本溪市" });
  citys.push({ cityCode: "210600", cityName: "丹东市" });
  citys.push({ cityCode: "210700", cityName: "锦州市" });
  citys.push({ cityCode: "210800", cityName: "营口市" });
  citys.push({ cityCode: "210900", cityName: "阜新市" });
  citys.push({ cityCode: "211000", cityName: "辽阳市" });
  citys.push({ cityCode: "211100", cityName: "盘锦市" });
  citys.push({ cityCode: "211200", cityName: "铁岭市" });
  citys.push({ cityCode: "211300", cityName: "朝阳市" });
  citys.push({ cityCode: "211400", cityName: "葫芦岛市" });
  citys.push({ cityCode: "220100", cityName: "长春市" });
  citys.push({ cityCode: "220200", cityName: "吉林市" });
  citys.push({ cityCode: "220300", cityName: "四平市" });
  citys.push({ cityCode: "220400", cityName: "辽源市" });
  citys.push({ cityCode: "220500", cityName: "通化市" });
  citys.push({ cityCode: "220600", cityName: "白山市" });
  citys.push({ cityCode: "220700", cityName: "松原市" });
  citys.push({ cityCode: "220800", cityName: "白城市" });
  citys.push({ cityCode: "222400", cityName: "延边朝鲜族自治州" });
  citys.push({ cityCode: "230100", cityName: "哈尔滨市" });
  citys.push({ cityCode: "230200", cityName: "齐齐哈尔市" });
  citys.push({ cityCode: "230300", cityName: "鸡西市" });
  citys.push({ cityCode: "230400", cityName: "鹤岗市" });
  citys.push({ cityCode: "230500", cityName: "双鸭山市" });
  citys.push({ cityCode: "230600", cityName: "大庆市" });
  citys.push({ cityCode: "230700", cityName: "伊春市" });
  citys.push({ cityCode: "230800", cityName: "佳木斯市" });
  citys.push({ cityCode: "230900", cityName: "七台河市" });
  citys.push({ cityCode: "231000", cityName: "牡丹江市" });
  citys.push({ cityCode: "231100", cityName: "黑河市" });
  citys.push({ cityCode: "231200", cityName: "绥化市" });
  citys.push({ cityCode: "232700", cityName: "大兴安岭地区" });
  citys.push({ cityCode: "320100", cityName: "南京市" });
  citys.push({ cityCode: "320200", cityName: "无锡市" });
  citys.push({ cityCode: "320300", cityName: "徐州市" });
  citys.push({ cityCode: "320400", cityName: "常州市" });
  citys.push({ cityCode: "320500", cityName: "苏州市" });
  citys.push({ cityCode: "320600", cityName: "南通市" });
  citys.push({ cityCode: "320700", cityName: "连云港市" });
  citys.push({ cityCode: "320800", cityName: "淮安市" });
  citys.push({ cityCode: "320900", cityName: "盐城市" });
  citys.push({ cityCode: "321000", cityName: "扬州市" });
  citys.push({ cityCode: "321100", cityName: "镇江市" });
  citys.push({ cityCode: "321200", cityName: "泰州市" });
  citys.push({ cityCode: "321300", cityName: "宿迁市" });
  citys.push({ cityCode: "330100", cityName: "杭州市" });
  citys.push({ cityCode: "330200", cityName: "宁波市" });
  citys.push({ cityCode: "330300", cityName: "温州市" });
  citys.push({ cityCode: "330400", cityName: "嘉兴市" });
  citys.push({ cityCode: "330500", cityName: "湖州市" });
  citys.push({ cityCode: "330600", cityName: "绍兴市" });
  citys.push({ cityCode: "330700", cityName: "金华市" });
  citys.push({ cityCode: "330800", cityName: "衢州市" });
  citys.push({ cityCode: "330900", cityName: "舟山市" });
  citys.push({ cityCode: "331000", cityName: "台州市" });
  citys.push({ cityCode: "331100", cityName: "丽水市" });
  citys.push({ cityCode: "340100", cityName: "合肥市" });
  citys.push({ cityCode: "340200", cityName: "芜湖市" });
  citys.push({ cityCode: "340300", cityName: "蚌埠市" });
  citys.push({ cityCode: "340400", cityName: "淮南市" });
  citys.push({ cityCode: "340500", cityName: "马鞍山市" });
  citys.push({ cityCode: "340600", cityName: "淮北市" });
  citys.push({ cityCode: "340700", cityName: "铜陵市" });
  citys.push({ cityCode: "340800", cityName: "安庆市" });
  citys.push({ cityCode: "341000", cityName: "黄山市" });
  citys.push({ cityCode: "341100", cityName: "滁州市" });
  citys.push({ cityCode: "341200", cityName: "阜阳市" });
  citys.push({ cityCode: "341300", cityName: "宿州市" });
  citys.push({ cityCode: "341500", cityName: "六安市" });
  citys.push({ cityCode: "341600", cityName: "亳州市" });
  citys.push({ cityCode: "341700", cityName: "池州市" });
  citys.push({ cityCode: "341800", cityName: "宣城市" });
  citys.push({ cityCode: "350100", cityName: "福州市" });
  citys.push({ cityCode: "350200", cityName: "厦门市" });
  citys.push({ cityCode: "350300", cityName: "莆田市" });
  citys.push({ cityCode: "350400", cityName: "三明市" });
  citys.push({ cityCode: "350500", cityName: "泉州市" });
  citys.push({ cityCode: "350600", cityName: "漳州市" });
  citys.push({ cityCode: "350700", cityName: "南平市" });
  citys.push({ cityCode: "350800", cityName: "龙岩市" });
  citys.push({ cityCode: "350900", cityName: "宁德市" });
  citys.push({ cityCode: "360100", cityName: "南昌市" });
  citys.push({ cityCode: "360200", cityName: "景德镇市" });
  citys.push({ cityCode: "360300", cityName: "萍乡市" });
  citys.push({ cityCode: "360400", cityName: "九江市" });
  citys.push({ cityCode: "360500", cityName: "新余市" });
  citys.push({ cityCode: "360600", cityName: "鹰潭市" });
  citys.push({ cityCode: "360700", cityName: "赣州市" });
  citys.push({ cityCode: "360800", cityName: "吉安市" });
  citys.push({ cityCode: "360900", cityName: "宜春市" });
  citys.push({ cityCode: "361000", cityName: "抚州市" });
  citys.push({ cityCode: "361100", cityName: "上饶市" });
  citys.push({ cityCode: "370100", cityName: "济南市" });
  citys.push({ cityCode: "370200", cityName: "青岛市" });
  citys.push({ cityCode: "370300", cityName: "淄博市" });
  citys.push({ cityCode: "370400", cityName: "枣庄市" });
  citys.push({ cityCode: "370500", cityName: "东营市" });
  citys.push({ cityCode: "370600", cityName: "烟台市" });
  citys.push({ cityCode: "370700", cityName: "潍坊市" });
  citys.push({ cityCode: "370800", cityName: "济宁市" });
  citys.push({ cityCode: "370900", cityName: "泰安市" });
  citys.push({ cityCode: "371000", cityName: "威海市" });
  citys.push({ cityCode: "371100", cityName: "日照市" });
  citys.push({ cityCode: "371200", cityName: "莱芜市" });
  citys.push({ cityCode: "371300", cityName: "临沂市" });
  citys.push({ cityCode: "371400", cityName: "德州市" });
  citys.push({ cityCode: "371500", cityName: "聊城市" });
  citys.push({ cityCode: "371600", cityName: "滨州市" });
  citys.push({ cityCode: "371700", cityName: "菏泽市" });
  citys.push({ cityCode: "410100", cityName: "郑州市" });
  citys.push({ cityCode: "410200", cityName: "开封市" });
  citys.push({ cityCode: "410300", cityName: "洛阳市" });
  citys.push({ cityCode: "410400", cityName: "平顶山市" });
  citys.push({ cityCode: "410500", cityName: "安阳市" });
  citys.push({ cityCode: "410600", cityName: "鹤壁市" });
  citys.push({ cityCode: "410700", cityName: "新乡市" });
  citys.push({ cityCode: "410800", cityName: "焦作市" });
  citys.push({ cityCode: "410900", cityName: "濮阳市" });
  citys.push({ cityCode: "411000", cityName: "许昌市" });
  citys.push({ cityCode: "411100", cityName: "漯河市" });
  citys.push({ cityCode: "411200", cityName: "三门峡市" });
  citys.push({ cityCode: "411300", cityName: "南阳市" });
  citys.push({ cityCode: "411400", cityName: "商丘市" });
  citys.push({ cityCode: "411500", cityName: "信阳市" });
  citys.push({ cityCode: "411600", cityName: "周口市" });
  citys.push({ cityCode: "411700", cityName: "驻马店市" });
  citys.push({ cityCode: "469000", cityName: "省直辖县级行政区划" });
  citys.push({ cityCode: "420100", cityName: "武汉市" });
  citys.push({ cityCode: "420200", cityName: "黄石市" });
  citys.push({ cityCode: "420300", cityName: "十堰市" });
  citys.push({ cityCode: "420500", cityName: "宜昌市" });
  citys.push({ cityCode: "420600", cityName: "襄阳市" });
  citys.push({ cityCode: "420700", cityName: "鄂州市" });
  citys.push({ cityCode: "420800", cityName: "荆门市" });
  citys.push({ cityCode: "420900", cityName: "孝感市" });
  citys.push({ cityCode: "421000", cityName: "荆州市" });
  citys.push({ cityCode: "421100", cityName: "黄冈市" });
  citys.push({ cityCode: "421200", cityName: "咸宁市" });
  citys.push({ cityCode: "421300", cityName: "随州市" });
  citys.push({ cityCode: "422800", cityName: "恩施土家族苗族自治州" });
  citys.push({ cityCode: "430100", cityName: "长沙市" });
  citys.push({ cityCode: "430200", cityName: "株洲市" });
  citys.push({ cityCode: "430300", cityName: "湘潭市" });
  citys.push({ cityCode: "430400", cityName: "衡阳市" });
  citys.push({ cityCode: "430500", cityName: "邵阳市" });
  citys.push({ cityCode: "430600", cityName: "岳阳市" });
  citys.push({ cityCode: "430700", cityName: "常德市" });
  citys.push({ cityCode: "430800", cityName: "张家界市" });
  citys.push({ cityCode: "430900", cityName: "益阳市" });
  citys.push({ cityCode: "431000", cityName: "郴州市" });
  citys.push({ cityCode: "431100", cityName: "永州市" });
  citys.push({ cityCode: "431200", cityName: "怀化市" });
  citys.push({ cityCode: "431300", cityName: "娄底市" });
  citys.push({ cityCode: "433100", cityName: "湘西土家族苗族自治州" });
  citys.push({ cityCode: "440100", cityName: "广州市" });
  citys.push({ cityCode: "440200", cityName: "韶关市" });
  citys.push({ cityCode: "440300", cityName: "深圳市" });
  citys.push({ cityCode: "440400", cityName: "珠海市" });
  citys.push({ cityCode: "440500", cityName: "汕头市" });
  citys.push({ cityCode: "440600", cityName: "佛山市" });
  citys.push({ cityCode: "440700", cityName: "江门市" });
  citys.push({ cityCode: "440800", cityName: "湛江市" });
  citys.push({ cityCode: "440900", cityName: "茂名市" });
  citys.push({ cityCode: "441200", cityName: "肇庆市" });
  citys.push({ cityCode: "441300", cityName: "惠州市" });
  citys.push({ cityCode: "441400", cityName: "梅州市" });
  citys.push({ cityCode: "441500", cityName: "汕尾市" });
  citys.push({ cityCode: "441600", cityName: "河源市" });
  citys.push({ cityCode: "441700", cityName: "阳江市" });
  citys.push({ cityCode: "441800", cityName: "清远市" });
  citys.push({ cityCode: "441900", cityName: "东莞市" });
  citys.push({ cityCode: "442000", cityName: "中山市" });
  citys.push({ cityCode: "445100", cityName: "潮州市" });
  citys.push({ cityCode: "445200", cityName: "揭阳市" });
  citys.push({ cityCode: "445300", cityName: "云浮市" });
  citys.push({ cityCode: "450100", cityName: "南宁市" });
  citys.push({ cityCode: "450200", cityName: "柳州市" });
  citys.push({ cityCode: "450300", cityName: "桂林市" });
  citys.push({ cityCode: "450400", cityName: "梧州市" });
  citys.push({ cityCode: "450500", cityName: "北海市" });
  citys.push({ cityCode: "450600", cityName: "防城港市" });
  citys.push({ cityCode: "450700", cityName: "钦州市" });
  citys.push({ cityCode: "450800", cityName: "贵港市" });
  citys.push({ cityCode: "450900", cityName: "玉林市" });
  citys.push({ cityCode: "451000", cityName: "百色市" });
  citys.push({ cityCode: "451100", cityName: "贺州市" });
  citys.push({ cityCode: "451200", cityName: "河池市" });
  citys.push({ cityCode: "451300", cityName: "来宾市" });
  citys.push({ cityCode: "451400", cityName: "崇左市" });
  citys.push({ cityCode: "460100", cityName: "海口市" });
  citys.push({ cityCode: "460200", cityName: "三亚市" });
  citys.push({ cityCode: "460300", cityName: "三沙市" });
  citys.push({ cityCode: "510100", cityName: "成都市" });
  citys.push({ cityCode: "510300", cityName: "自贡市" });
  citys.push({ cityCode: "510400", cityName: "攀枝花市" });
  citys.push({ cityCode: "510500", cityName: "泸州市" });
  citys.push({ cityCode: "510600", cityName: "德阳市" });
  citys.push({ cityCode: "510700", cityName: "绵阳市" });
  citys.push({ cityCode: "510800", cityName: "广元市" });
  citys.push({ cityCode: "510900", cityName: "遂宁市" });
  citys.push({ cityCode: "511000", cityName: "内江市" });
  citys.push({ cityCode: "511100", cityName: "乐山市" });
  citys.push({ cityCode: "511300", cityName: "南充市" });
  citys.push({ cityCode: "511400", cityName: "眉山市" });
  citys.push({ cityCode: "511500", cityName: "宜宾市" });
  citys.push({ cityCode: "511600", cityName: "广安市" });
  citys.push({ cityCode: "511700", cityName: "达州市" });
  citys.push({ cityCode: "511800", cityName: "雅安市" });
  citys.push({ cityCode: "511900", cityName: "巴中市" });
  citys.push({ cityCode: "512000", cityName: "资阳市" });
  citys.push({ cityCode: "513200", cityName: "阿坝藏族羌族自治州" });
  citys.push({ cityCode: "513300", cityName: "甘孜藏族自治州" });
  citys.push({ cityCode: "513400", cityName: "凉山彝族自治州" });
  citys.push({ cityCode: "520100", cityName: "贵阳市" });
  citys.push({ cityCode: "520200", cityName: "六盘水市" });
  citys.push({ cityCode: "520300", cityName: "遵义市" });
  citys.push({ cityCode: "520400", cityName: "安顺市" });
  citys.push({ cityCode: "522300", cityName: "黔西南布依族苗族自治州" });
  citys.push({ cityCode: "522600", cityName: "黔东南苗族侗族自治州" });
  citys.push({ cityCode: "522700", cityName: "黔南布依族苗族自治州" });
  citys.push({ cityCode: "530100", cityName: "昆明市" });
  citys.push({ cityCode: "530300", cityName: "曲靖市" });
  citys.push({ cityCode: "530400", cityName: "玉溪市" });
  citys.push({ cityCode: "530500", cityName: "保山市" });
  citys.push({ cityCode: "530600", cityName: "昭通市" });
  citys.push({ cityCode: "530700", cityName: "丽江市" });
  citys.push({ cityCode: "530800", cityName: "普洱市" });
  citys.push({ cityCode: "530900", cityName: "临沧市" });
  citys.push({ cityCode: "532300", cityName: "楚雄彝族自治州" });
  citys.push({ cityCode: "532500", cityName: "红河哈尼族彝族自治州" });
  citys.push({ cityCode: "532600", cityName: "文山壮族苗族自治州" });
  citys.push({ cityCode: "532800", cityName: "西双版纳傣族自治州" });
  citys.push({ cityCode: "532900", cityName: "大理白族自治州" });
  citys.push({ cityCode: "533100", cityName: "德宏傣族景颇族自治州" });
  citys.push({ cityCode: "533300", cityName: "怒江傈僳族自治州" });
  citys.push({ cityCode: "533400", cityName: "迪庆藏族自治州" });
  citys.push({ cityCode: "540100", cityName: "拉萨市" });
  citys.push({ cityCode: "542100", cityName: "昌都地区" });
  citys.push({ cityCode: "542200", cityName: "山南地区" });
  citys.push({ cityCode: "542300", cityName: "日喀则地区" });
  citys.push({ cityCode: "542400", cityName: "那曲地区" });
  citys.push({ cityCode: "542500", cityName: "阿里地区" });
  citys.push({ cityCode: "542600", cityName: "林芝地区" });
  citys.push({ cityCode: "610100", cityName: "西安市" });
  citys.push({ cityCode: "610200", cityName: "铜川市" });
  citys.push({ cityCode: "610300", cityName: "宝鸡市" });
  citys.push({ cityCode: "610400", cityName: "咸阳市" });
  citys.push({ cityCode: "610500", cityName: "渭南市" });
  citys.push({ cityCode: "610600", cityName: "延安市" });
  citys.push({ cityCode: "610700", cityName: "汉中市" });
  citys.push({ cityCode: "610800", cityName: "榆林市" });
  citys.push({ cityCode: "610900", cityName: "安康市" });
  citys.push({ cityCode: "611000", cityName: "商洛市" });
  citys.push({ cityCode: "620100", cityName: "兰州市" });
  citys.push({ cityCode: "620200", cityName: "嘉峪关市" });
  citys.push({ cityCode: "620300", cityName: "金昌市" });
  citys.push({ cityCode: "620400", cityName: "白银市" });
  citys.push({ cityCode: "620500", cityName: "天水市" });
  citys.push({ cityCode: "620600", cityName: "武威市" });
  citys.push({ cityCode: "620700", cityName: "张掖市" });
  citys.push({ cityCode: "620800", cityName: "平凉市" });
  citys.push({ cityCode: "620900", cityName: "酒泉市" });
  citys.push({ cityCode: "621000", cityName: "庆阳市" });
  citys.push({ cityCode: "621100", cityName: "定西市" });
  citys.push({ cityCode: "621200", cityName: "陇南市" });
  citys.push({ cityCode: "622900", cityName: "临夏回族自治州" });
  citys.push({ cityCode: "623000", cityName: "甘南藏族自治州" });
  citys.push({ cityCode: "630100", cityName: "西宁市" });
  citys.push({ cityCode: "632100", cityName: "海东地区" });
  citys.push({ cityCode: "632200", cityName: "海北藏族自治州" });
  citys.push({ cityCode: "632300", cityName: "黄南藏族自治州" });
  citys.push({ cityCode: "632500", cityName: "海南藏族自治州" });
  citys.push({ cityCode: "632600", cityName: "果洛藏族自治州" });
  citys.push({ cityCode: "632700", cityName: "玉树藏族自治州" });
  citys.push({ cityCode: "632800", cityName: "海西蒙古族藏族自治州" });
  citys.push({ cityCode: "640100", cityName: "银川市" });
  citys.push({ cityCode: "640200", cityName: "石嘴山市" });
  citys.push({ cityCode: "640300", cityName: "吴忠市" });
  citys.push({ cityCode: "640400", cityName: "固原市" });
  citys.push({ cityCode: "640500", cityName: "中卫市" });
  citys.push({ cityCode: "650100", cityName: "乌鲁木齐市" });
  citys.push({ cityCode: "650200", cityName: "克拉玛依市" });
  citys.push({ cityCode: "652100", cityName: "吐鲁番地区" });
  citys.push({ cityCode: "652200", cityName: "哈密地区" });
  citys.push({ cityCode: "652300", cityName: "昌吉回族自治州" });
  citys.push({ cityCode: "652700", cityName: "博尔塔拉蒙古自治州" });
  citys.push({ cityCode: "652800", cityName: "巴音郭楞蒙古自治州" });
  citys.push({ cityCode: "652900", cityName: "阿克苏地区" });
  citys.push({ cityCode: "653000", cityName: "克孜勒苏柯尔克孜自治州" });
  citys.push({ cityCode: "653100", cityName: "喀什地区" });
  citys.push({ cityCode: "653200", cityName: "和田地区" });
  citys.push({ cityCode: "654000", cityName: "伊犁哈萨克自治州" });
  citys.push({ cityCode: "654200", cityName: "塔城地区" });
  citys.push({ cityCode: "654300", cityName: "阿勒泰地区" });
  citys.push({ cityCode: "659000", cityName: "自治区直辖县级行政区划" });
  citys.push({ cityCode: "710000", cityName: "台湾省" });
  citys.push({ cityCode: "810100", cityName: "香港特别行政区" });
  citys.push({ cityCode: "820000", cityName: "澳门特别行政区" });


  if (cityCode) {
    return _.find(citys, function (o) { return o.cityCode == cityCode; })
  }
  else
    return citys;

}

export function getMapProvinceArr(key, shortName) {
  let area = [];
  area.push({ key: "china", caption: "中国", importKey: "china", geoMapKey: "china" });
  area.push({ region: "100000", key: "china", caption: "中国", importKey: "china", geoMapKey: "china" });
  area.push({ region: "110000", key: "beijing", caption: "北京", importKey: "beijing", geoMapKey: "北京" });
  area.push({ region: "370000", key: "shandong", caption: "山东", importKey: "shandong", geoMapKey: "山东" });
  area.push({ region: "500000", key: "chongqing", caption: "重庆", importKey: "chongqing", geoMapKey: "重庆" });
  area.push({ region: "350000", key: "fujian", caption: "福建", importKey: "fujian", geoMapKey: "福建" });
  area.push({ region: "620000", key: "gansu", caption: "甘肃", importKey: "gansu", geoMapKey: "甘肃" });
  area.push({ region: "440000", key: "guangdong", caption: "广东", importKey: "guangdong", geoMapKey: "广东" });
  area.push({ region: "450000", key: "guangxi", caption: "广西", importKey: "guangxi", geoMapKey: "广西" });
  area.push({ region: "520000", key: "guizhou", caption: "贵州", importKey: "guizhou", geoMapKey: "贵州" });
  area.push({ region: "460000", key: "hainan", caption: "海南", importKey: "hainan", geoMapKey: "海南" });
  area.push({ region: "130000", key: "hebei", caption: "河北", importKey: "hebei", geoMapKey: "河北" });
  area.push({ region: "230000", key: "heilongjiang", caption: "黑龙江", importKey: "heilongjiang", geoMapKey: "黑龙江" });
  area.push({ region: "410000", key: "henan", caption: "河南", importKey: "henan", geoMapKey: "河南" });
  area.push({ region: "810000", key: "hongkong", caption: "香港", importKey: "hongkong", geoMapKey: "香港" });
  area.push({ region: "420000", key: "hubei", caption: "湖北", importKey: "hubei", geoMapKey: "湖北" });
  area.push({ region: "430000", key: "hunan", caption: "湖南", importKey: "hunan", geoMapKey: "湖南" });
  area.push({ region: "320000", key: "jiangsu", caption: "江苏", importKey: "jiangsu", geoMapKey: "江苏" });
  area.push({ region: "360000", key: "jiangxi", caption: "江西", importKey: "jiangxi", geoMapKey: "江西" });
  area.push({ region: "220000", key: "jilin", caption: "吉林", importKey: "jilin", geoMapKey: "吉林" });
  area.push({ region: "210000", key: "liaoning", caption: "辽宁", importKey: "liaoning", geoMapKey: "辽宁" });
  area.push({ region: "910000", key: "macau", caption: "澳门", importKey: "macau", geoMapKey: "澳门" });
  area.push({ region: "150000", key: "neimenggu", caption: "内蒙古", importKey: "neimenggu", geoMapKey: "内蒙古" });
  area.push({ region: "640000", key: "ningxia", caption: "宁夏", importKey: "ningxia", geoMapKey: "宁夏" });
  area.push({ region: "630000", key: "qinghai", caption: "青海", importKey: "qinghai", geoMapKey: "青海" });
  area.push({ region: "140000", key: "shanxi", caption: "山西", importKey: "shanxi", geoMapKey: "山西" });
  area.push({ region: "610000", key: "shanxi1", caption: "陕西", importKey: "shanxi1", geoMapKey: "陕西" });
  area.push({ region: "340000", key: "anhui", caption: "安徽", importKey: "anhui", geoMapKey: "安徽" });
  area.push({ region: "310000", key: "shanghai", caption: "上海", importKey: "shanghai", geoMapKey: "上海" });
  area.push({ region: "510000", key: "sichuan", caption: "四川", importKey: "sichuan", geoMapKey: "四川" });
  area.push({ region: "710000", key: "taiwan", caption: "台湾", importKey: "taiwan", geoMapKey: "台湾" });
  area.push({ region: "120000", key: "tianjin", caption: "天津", importKey: "tianjin", geoMapKey: "天津" });
  area.push({ region: "650000", key: "xinjiang", caption: "新疆", importKey: "xinjiang", geoMapKey: "新疆" });
  area.push({ region: "540000", key: "xizang", caption: "西藏", importKey: "xizang", geoMapKey: "西藏" });
  area.push({ region: "530000", key: "yunnan", caption: "云南", importKey: "yunnan", geoMapKey: "云南" });
  area.push({ region: "330000", key: "zhejiang", caption: "浙江", importKey: "zhejiang", geoMapKey: "浙江" });
  if (key) {
    return _.find(area, function (o) { return o.key == key; })
  }
  else if (shortName) {
    return _.find(area, function (o) { return o.geoMapKey == shortName; })
  }
  else
    return area;
}



export function LogChartInfo(logTag, logStr, errNumber) {
  let tmpStr = "";
  if (errNumber == 999)
    console.log("图形报表日志 " + tmpStr + " 异常信息 " + logTag + (logStr === "" ? "" : (" = " + logStr)));
  else if (errNumber >= 901)
    console.log("图形报表日志 " + tmpStr + logTag + (logStr === "" ? "" : (" = " + logStr)) + " err=" + errNumber);//
}

export function checkTempName(tmpName) {
  // let preFix = "T_";
  // if (tmpName.indexOf(preFix) != 0)
  //   tmpName = preFix + tmpName;
  return tmpName;
}

export function getArrayFields(obj, arrPath, fieldName) {
  let arr = _.get(obj, arrPath);
  let arrReturn = [];
  let str = "";
  if (arr && arr.length > 0) {
    arr.forEach(item => {
      str = item[fieldName];
      if (arrReturn.indexOf(str) < 0)
        arrReturn.push(str);
    });
  }
  return arrReturn;
}

//配置表说明，并作为新建图表的模板
export function getEChartConfig_Template(eChartType, eChartSubType, chartKey) {

  let titleTop = 0;
  let titleHeight = 14;
  let legendTop = titleTop + titleHeight + 15;
  let legendHeight = 10;
  let gridTop = legendTop + legendHeight + 38;

  let config =
    {
      chart1://饼形图
        {
          chartKey: "chart1",
          version: "1.0",
          createTime: "",
          yySetting: {
            type: "pie",
            subType: "0",
            orderInfo:
              {
                bUseDimensionXRows: true,
                dimensionXRows: 31, //“主维度显示行数”：最多31
                dimensionSubRows: 5,//“辅维度显示行数”：最多5
                orderField: "",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
                orderBy: "desc",// “排序方式（升序、降序）”：默认降序
              },
            dataField: {
              dimensionX: [
                { codeField: "area_code", nameField: "area_name", bLabel: true, iLabelOrder: 1 },
                { codeField: "store_code", nameField: "store_name", bLabel: true, iLabelOrder: 2 }
              ],
              measure: [
                { valueField: "fRetailMoney" }
              ]
            },
            radius: {
              radiusInner: 40,//内外半径
              radiusOuter: 65, //内外半径
            },
            isSingleValue: false //单数值百分比图
          },
          eChartSetting: {
            title: {
              text: "饼形图示例",
              subtext: "",
              textStyle: {
                fontSize: 14,
                color: '#333'
              },
              // top: titleTop,
              // height: titleHeight
            },
            legend: {
              show: true,
              type: "scroll",
              orient: 'vertical',
              icon: 'circle',//图例图标的形状
              data: [


              ],
              left: '0',//left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              top: legendTop,// '10%',//Top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              // height: legendHeight,
              selectedMode: true,//图例的默认点击事件,
              itemGap: 15,
              itemHeight: 8,
              itemWidth: 8
            },
            tooltip: {
              trigger: 'item',
              axisPointer: { lineStyle: { color: '#505766', type: 'dashed' } },
              padding: [5, 15, 5, 15],// 提示框浮层内边距，单位px.上右 下左,
              textStyle: { fontSize: 12 },
              formatter: "{a} <br/>{b} : {c} ({d}%)"
              // 折线（区域）图、柱状（条形）图、K线图: { a }（系列名称），{ b } （类目值），{ c } （数值）, { d } （无）
              // 饼图、仪表盘、漏斗图: { a } （系列名称），{ b } （数据项名称），{ c } （数值）, { d } （百分比）
            },
            series: [
              {
                name: "扇区数值",
                type: 'pie',
                radius: ['40%', '65%'],
                center: ['50%', '50%'],
                data: [
                  // { value: 335, name: '直接访问' },
                  // { value: 310, name: '邮件营销' }
                ],
                label: {
                  normal: {
                    textStyle: {
                      color: '#333'
                    },
                    show: true,
                    position: 'outside',
                    formatter: "{b}:{d}%"
                  },
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: '#d8dbdf'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                }
              }],
            toolbox: {
              show: true,
              right: 20,
              feature: {
                // dataView: {
                // readOnly: true //是否只读
                // },
                saveAsImage: {
                  title: "保存为图片",
                  icon: 'image://http://yxy-lsy.oss-cn-beijing.aliyuncs.com/9b675cda-f3d5-4c2f-b30f-ae77729fe34c.png'

                }
              }
            }
          }
        },

      chart2://柱形图，不存在次维度，多度量
        {
          chartKey: "chart2",
          version: "1.0",
          createTime: "",
          yySetting: {
            type: "bar",
            subType: "0",
            bVertical: true,// true 柱形图 false 条形图
            stack: "",//是否堆积，如果存在值，则覆盖所有bar/line
            orderInfo:
              {
                bUseDimensionXRows: true,
                dimensionXRows: 31, //“主维度显示行数”：最多31
                dimensionSubRows: 5,//  “辅维度显示行数”：最多5
                orderField: "",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
                orderBy: "desc",// “排序方式（升序、降序）”：默认降序
              },
            dataField: {
              dimensionX: [//主维度，比如 1月--12月
                { codeField: "area_code", nameField: "area_name", bLabel: false, iLabelOrder: 1 },
                { codeField: "store_code", nameField: "store_name", bLabel: true, iLabelOrder: 2 }
              ],
              dimensionSub: [//次维度 比如 门店,最多支持一个
                // { codeField: "store_code", nameField: "store_name", caption: "门店", stack: true }
              ],
              measure: [ //度量 比如客户的零售金额 如果有次维度，则只能设一个度量，没有次维度可以设多度量
                { valueField: "fMoney", caption: "金额", stack: "总额" },
                { valueField: "fNetMoney", caption: "销售净额", stack: "累计" },
                { valueField: "fRetailMoney", caption: "零售金额", stack: "累计" }
              ]
            },
            xAxis: {
              axisLabel: {
                needWrap: false,//显示文字是否需要折行
                wrapRowLen: 1,//当displayType=2时，每行的字符数
              }
            },
            series:
              {
                barWidth: 10,//柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比
                barMaxWidth: 10,
                barGap: '100%',// 百分比或者数字，表示bar宽度的百分之多少或者几倍
                barCategoryGap: '20%'
              }
          },
          eChartSetting: {
            title: {
              text: "柱形图示例",
              subtext: "",
              textStyle: {
                fontSize: 14,
                color: '#333'
              },
              top: titleTop,
              height: titleHeight
            },
            legend: {
              show: true,
              type: "scroll",
              icon: 'circle',//图例图标的形状
              data: [
              ],
              left: '0',//left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              top: legendTop,// '10%',//Top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              height: legendHeight,
              selectedMode: true,//图例的默认点击事件
              itemGap: 25,
              itemHeight: 8,
              itemWidth: 8
            },
            grid: {
              top: gridTop,
              left: '7%',// grid 组件离容器左侧的距离。
              right: '4%',// default: '10%' grid 组件离容器右侧的距离
              bottom: '15%',//grid 组件离容器下侧的距离
              containLabel: false
            },
            xAxis: {
              // show: true,
              name: "",
              nameLocation: "end",
              type: 'category',
              boundaryGap: true,
              axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },// 是否显示坐标轴轴线
              splitLine: { show: true, lineStyle: { color: '#F2F2F2' } },//是否显示分隔线。默认数值轴显示，类目轴不显示。
              axisTick: { show: false },//是否显示坐标轴刻度
              axisLabel: {
                interval: 0,//坐标轴刻度标签的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                rotate: 15,//刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。旋转的角度从 -90 度到 90 度。
                textStyle: {
                  color: '#999'
                }
              }
            },
            yAxis: {
              name: "",
              nameLocation: "end",
              type: 'value',
              axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },// 是否显示坐标轴轴线
              splitLine: { show: true, lineStyle: { color: '#F2F2F2' } },//是否显示分隔线。默认数值轴显示，类目轴不显示。
              axisTick: { show: false },//是否显示坐标轴刻度
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              show: true,
              right: 20,
              feature: {
                // dataZoom: {
                // yAxisIndex: 'none'
                // },
                // dataView: {
                // readOnly: true //是否只读
                // },
                // magicType: { type: ['line', 'bar'] },//, 'stack', 'tiled'
                // restore: {},
                saveAsImage: {
                  title: "保存为图片",
                  icon: 'image://http://yxy-lsy.oss-cn-beijing.aliyuncs.com/9b675cda-f3d5-4c2f-b30f-ae77729fe34c.png'
                }
              }
            },
            // dataZoom: [
            // //组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
            // {
            // type: 'inside',//内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系。
            // xAxisIndex: [0],
            // start: 0,//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            // end: 100//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            // },
            // {
            // type: 'inside',
            // yAxisIndex: [0],
            // start: 0,
            // end: 100
            // }
            // ],
            tooltip: {
              show: true,
              trigger: 'axis',
              axisPointer: { lineStyle: { color: '#505766', type: 'dashed' } },
              padding: [5, 15, 5, 15],// 提示框浮层内边距，单位px.上右 下左
              textStyle: { fontSize: 12 },

              // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}"
              // 折线（区域）图、柱状（条形）图、K线图: { a }（系列名称），{ b } （类目值），{ c } （数值）, { d } （无）
              // 饼图、仪表盘、漏斗图: { a } （系列名称），{ b } （数据项名称），{ c } （数值）, { d } （百分比）

            },
            series: [],
            label: {
              normal: {
                show: false,//文字太乱 去掉
                position: 'top',
                // textStyle: {
                // color: 'rgba(0, 0, 0, 0.3)'
                // },
                formatter: " {c}"
              }
            }
          }
        },
      chart3://折线图
        {
          chartKey: "chart3",
          version: "1.0",
          createTime: "",
          yySetting: {
            type: "line",
            subType: "0",
            smooth: true,
            stack: "",//是否堆积，如果存在值，则覆盖所有bar/line
            orderInfo:
              {
                bUseDimensionXRows: true,
                dimensionXRows: 31, //“主维度显示行数”：最多31
                dimensionSubRows: 5,//  “辅维度显示行数”：最多5
                orderField: "",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
                orderBy: "desc",// “排序方式（升序、降序）”：默认降序
              },
            dataField: {
              dimensionX: [//主维度的分组字段，是否显示由bLabel决定，比如根据门店+商品分组，但X轴只显示商品名字
                { codeField: "area_code", nameField: "area_name", bLabel: false, iLabelOrder: 1 },
                { codeField: "store_code", nameField: "store_name", bLabel: true, iLabelOrder: 2 }

              ],
              dimensionSub: [//次维度 比如 门店,最多支持一个
                // { codeField: "store_code", nameField: "store_name", caption: "门店", smooth: true }
              ],
              measure: [ //度量 比如客户的零售金额 如果有次维度，则只能设一个度量，没有次维度可以设多度量
                { valueField: "fMoney", caption: "金额", smooth: true, stack: "总额" },
                { valueField: "fNetMoney", caption: "销售净额", smooth: true, stack: "总额" },
                { valueField: "fRetailMoney", caption: "零售金额", smooth: false, stack: "总额" }
              ]
            },
            xAxis: {
              axisLabel: {
                needWrap: false,//显示文字是否折行
                wrapRowLen: 1//当displayType=2时，每行的字符数
              }
            }
          },
          eChartSetting: {
            title: {
              text: "折线图示例",
              subtext: "",
              textStyle: {
                fontSize: 14,
                color: '#333'
              },
              top: titleTop,
              height: titleHeight
            },
            legend: {
              show: true,
              type: "scroll",
              icon: 'circle',//图例图标的形状
              data: [


              ],
              left: '0',//left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              top: legendTop,// '10%',//Top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              height: legendHeight,
              selectedMode: true,//图例的默认点击事件
              itemGap: 25,
              itemHeight: 8,
              itemWidth: 8
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: { lineStyle: { color: '#505766', type: 'dashed' } },
              padding: [15, 15, 15, 15],// 提示框浮层内边距，单位px.上右下左
              textStyle: { fontSize: 12 },
            },
            series: [],
            grid: {
              top: gridTop,
              left: '7%',// grid 组件离容器左侧的距离。
              right: '4%',// default: '10%' grid 组件离容器右侧的距离
              bottom: '15%',//grid 组件离容器下侧的距离
              containLabel: false
            },
            xAxis: {
              name: "",
              nameLocation: "end",
              type: 'category',
              boundaryGap: false,
              axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },// 是否显示坐标轴轴线
              splitLine: { show: true, lineStyle: { color: '#F2F2F2' } }, // 控制网格线是否显示
              axisTick: { show: false }, // 去除X轴上的刻度线
              axisLabel: {
                interval: 0,//坐标轴刻度标签的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                rotate: 15,//刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。旋转的角度从 -90 度到 90 度。
                textStyle: {
                  color: '#999'
                }
              }
            },
            yAxis: {
              name: "",
              nameLocation: "end",
              type: 'value',
              axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },//控制y轴线是否显示
              splitLine: { show: true, lineStyle: { color: '#F2F2F2' } }, // 控制网格线是否显示
              axisTick: { show: false }, // 去除y轴上的刻度线
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              show: true,
              right: 20,
              feature: {
                // dataZoom: {
                // yAxisIndex: 'none'
                // },
                // dataView: {
                // readOnly: true //是否只读
                // },
                // magicType: { type: ['line', 'bar'] },//, 'stack', 'tiled'
                // restore: {},
                saveAsImage: {
                  title: "保存为图片",
                  icon: 'image://http://yxy-lsy.oss-cn-beijing.aliyuncs.com/9b675cda-f3d5-4c2f-b30f-ae77729fe34c.png'
                }
              }
            },
            // dataZoom: [
            // //组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
            // {
            // type: 'inside',//内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系。
            // xAxisIndex: [0],
            // start: 0,//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            // end: 100//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            // },
            // {
            // type: 'inside',
            // yAxisIndex: [0],
            // start: 0,
            // end: 100
            // }
            // ]
          }
        },
      chart4://气泡图
        {

          chartKey: "chart4",
          version: "1.0",
          createTime: "",
          yySetting: {
            type: "scatter",
            subType: "0",
            key: 'china', //地图枚举类型
            importKey: 'china', //导入的地图
            regionInfo:
              {
                region: 100000,
                shortName: "中国",
                parent: 0,
                regionArr: [100000],
                geoName: "中国100000"//"中国,河北省,秦皇岛市,北戴河区"

              },

            orderInfo:
              {
                bUseDimensionXRows: true,
                dimensionXRows: 31, //“主维度显示行数”：最多31
                dimensionSubRows: 5,//  “辅维度显示行数”：最多5
                orderField: "",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
                orderBy: "desc",// “排序方式（升序、降序）”：默认降序
              },
            dataField: {
              dimensionX: [//主维度的分组字段，是否显示由bLabel决定，比如根据门店+商品分组，但X轴只显示商品名字
                { codeField: "store_code", nameField: "store_code", bLabel: false, iLabelOrder: 1 },
                { codeField: "store_name", nameField: "store_name", bLabel: true, iLabelOrder: 2 }
              ],
              measure: [ //度量 比如客户的零售金额 如果有次维度，则只能设一个度量，没有次维度可以设多度量
                { valueField: "fMoney", caption: "金额" }
              ],
              LngAndLat://经纬度
                {
                  longitude: { longitudeField: "longitudeField" },//经度
                  latitude: { latitudeField: "latitudeField" }//纬度
                }
            },
            symbolConfig:
              {
                bShowSymbolBySize: true,//通过圆圈大小显示不同数量
                symbolCommonSize: 10,//bShowSymbolBySize=false时的圆圈大小
                symbolMaxSize: 20,
                symbolMinSize: 4,
                bShowSymbolByColor: true,//通过颜色不同显示不同数量
                bShowEffect: true,//是否用带有涟漪特效动画的气泡（气泡）图将某些想要突出的数据进行视觉突出。
                effectQty: 3//带有涟漪特效动画的气泡个数
              }

          },
          eChartSetting: {
            backgroundColor: 'white',
            title: {
              text: "气泡图示例",
              subtext: "",
              textStyle: {
                fontSize: 14,
                color: '#333'
              },
              top: titleTop,
              height: titleHeight
            },

            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} "
            },
            visualMap: {
              type: 'continuous',
              min: 0,
              max: 999,
              calculable: true,
              inRange: {
                // color: ['#24D1FD', '#6351FF']
                // color: ['#FFDA57', '#FFA334']
                color: ['#21C1FA', '#4784FF']
              },
              textStyle: {
                color: '#333'
              },
              itemWidth: 15,
              itemHeight: 100
            },
            geo: {
              map: 'china',
              roam: true,
              zoom: 1.1,
              label: {
                emphasis: {
                  show: true,
                  color: 'black',
                  fontSize: 12
                }
              },
              // emphasis: {
              // label: {
              // show: false
              // }
              // },

              itemStyle: {
                normal: {
                  // areaColor: '#323c48',
                  areaColor: '#E6EEFC',
                  borderColor: '#4081EB'
                },
                emphasis: {
                  // areaColor: '#2a333d'
                  areaColor: '#4081EB'
                }
              }
            },
            series: [
              {
                name: '气泡值',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: [
                  // { name: "鄂尔多斯", value: [109.781327, 39.608266, 12] },
                  // { name: "招远", value: [120.38, 37.35, 12] },
                  // { name: "齐齐哈尔", value: [123.97, 47.33, 14] }
                ],
                symbolSize: function (val) { return val[2] / 10; },
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },

                itemStyle: {
                  emphasis: {
                    borderColor: '#fff',
                    borderWidth: panelDefaultValue.borderWidth,
                  }
                }
              },
              {
                name: '气泡值前N个',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                // data: [
                // { name: "鄂尔多斯", value: [109.781327, 39.608266, 12] },
                // { name: "招远", value: [120.38, 37.35, 13] },
                // { name: "齐齐哈尔", value: [123.97, 47.33, 14] }
                // ].sort(function (a, b) {
                // return b.value[2] - a.value[2];
                // }).slice(0, 5),
                symbolSize: function (val) { return val[2] / 10; },
                showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'fill'
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },

              }
            ],
            toolbox: {
              show: true,
              right: 20,
              feature: {
                // dataZoom: {
                // yAxisIndex: 'none'
                // },
                // dataView: {
                // readOnly: true //是否只读
                // },
                // magicType: { type: ['line', 'bar'] },//, 'stack', 'tiled'
                // restore: {},
                saveAsImage: {
                  title: "保存为图片",
                  icon: 'image://http://yxy-lsy.oss-cn-beijing.aliyuncs.com/9b675cda-f3d5-4c2f-b30f-ae77729fe34c.png'
                }
              }
            }
          }
        },
      chart5://柱折图
        {
          chartKey: "chart5",
          version: "1.0",
          createTime: "",
          yySetting: {
            type: "barline",
            subType: "0",
            smooth: false,
            bVertical: true,// true 柱形图 false 条形图
            stack: "",//是否堆积，如果存在值，则覆盖所有bar/line
            orderInfo:
              {
                bUseDimensionXRows: true,
                dimensionXRows: 31, //“主维度显示行数”：最多31
                dimensionSubRows: 5,//  “辅维度显示行数”：最多5
                orderField: "",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
                orderBy: "desc",// “排序方式（升序、降序）”：默认降序
              },
            dataField: {
              dimensionX: [//主维度，比如 1月--12月
                { codeField: "area_code", nameField: "area_name", bLabel: false, iLabelOrder: 1 },
                { codeField: "store_code", nameField: "store_name", bLabel: true, iLabelOrder: 2 }
              ],
              dimensionSub: [//次维度 比如 门店,最多支持一个
                // { codeField: "store_code", nameField: "store_name", caption: "门店", stack: true }
              ],
              measure: [ //度量 比如客户的零售金额 如果有次维度，则只能设一个度量，没有次维度可以设多度量
                { valueField: "fMoney", caption: "金额", stack: "总额", smooth: false, yAxisIndex: 0 },
                { valueField: "fNetMoney", caption: "销售净额", stack: "累计", smooth: false, yAxisIndex: 1 },
                { valueField: "fRetailMoney", caption: "零售金额", stack: "累计", smooth: false, yAxisIndex: 1 }
              ]
            },
            xAxis: {
              axisLabel: {
                needWrap: false,//显示文字是否需要折行
                wrapRowLen: 1,//当displayType=2时，每行的字符数
              }
            },
            yAxis:
              {
                yAxisIndexType0: "bar",
                yAxisIndexType1: "line"
              },
            series:
              {
                barWidth: 10,//柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比
                barMaxWidth: 10,
                barGap: '100%',// 百分比或者数字，表示bar宽度的百分之多少或者几倍
                barCategoryGap: '20%'
              }
          },
          eChartSetting: {
            title: {
              text: "柱折图示例",
              subtext: "",
              textStyle: {
                fontSize: 14,
                color: '#333'
              },
              top: titleTop,
              height: titleHeight
            },
            legend: {
              show: true,
              type: "scroll",
              icon: 'circle',//图例图标的形状
              data: [


              ],
              left: '0',//left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              top: legendTop,// '10%',//Top 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right'
              height: legendHeight,
              selectedMode: true,//图例的默认点击事件
              itemGap: 25,
              itemHeight: 8,
              itemWidth: 8
            },
            grid: {
              top: gridTop,
              left: '7%',// grid 组件离容器左侧的距离。
              right: '4%',// default: '10%' grid 组件离容器右侧的距离
              bottom: '15%',//grid 组件离容器下侧的距离
              containLabel: false
            },
            xAxis: {
              // show: true,
              name: "",
              nameLocation: "end",
              type: 'category',
              boundaryGap: true,
              axisLine: { onZeroAxisIndex: 0, show: true, lineStyle: { width: 1, color: '#ccc' } },// 是否显示坐标轴轴线
              splitLine: { show: true, lineStyle: { color: '#F2F2F2' } },//是否显示分隔线。默认数值轴显示，类目轴不显示。
              axisTick: { show: false },//是否显示坐标轴刻度
              axisLabel: {
                interval: 0,//坐标轴刻度标签的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                rotate: 15,//刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。旋转的角度从 -90 度到 90 度。
                textStyle: {
                  color: '#999'
                }
              }
            },
            yAxis: [{
              name: "",
              nameLocation: "end",
              type: 'value',
              axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },// 是否显示坐标轴轴线
              splitLine: { show: true, lineStyle: { color: '#F2F2F2' } },//是否显示分隔线。默认数值轴显示，类目轴不显示。
              axisTick: { show: false },//是否显示坐标轴刻度
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            },
            {
              name: "",
              nameLocation: "end",
              type: 'value',
              axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },// 是否显示坐标轴轴线
              splitLine: { show: false, lineStyle: { color: '#F2F2F2' } },//是否显示分隔线。默认数值轴显示，类目轴不显示。
              axisTick: { show: false },//是否显示坐标轴刻度
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            }],
            toolbox: {
              show: true,
              right: 20,
              feature: {
                // dataZoom: {
                // yAxisIndex: 'none'
                // },
                // dataView: {
                // readOnly: true //是否只读
                // },
                // magicType: { type: ['line', 'bar'] },//, 'stack', 'tiled'
                // restore: {},
                saveAsImage: {
                  title: "保存为图片",
                  icon: 'image://http://yxy-lsy.oss-cn-beijing.aliyuncs.com/9b675cda-f3d5-4c2f-b30f-ae77729fe34c.png'
                }
              }
            },
            // dataZoom: [
            // //组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
            // {
            // type: 'inside',//内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系。
            // xAxisIndex: [0],
            // start: 0,//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            // end: 100//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
            // },
            // {
            // type: 'inside',
            // yAxisIndex: [0],
            // start: 0,
            // end: 100
            // }
            // ],
            tooltip: {
              show: true,
              trigger: 'axis',
              axisPointer: { lineStyle: { color: '#505766', type: 'dashed' } },
              padding: [5, 15, 5, 15],// 提示框浮层内边距，单位px.上右 下左
              textStyle: { fontSize: 12 },

              // formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}"
              // 折线（区域）图、柱状（条形）图、K线图: { a }（系列名称），{ b } （类目值），{ c } （数值）, { d } （无）
              // 饼图、仪表盘、漏斗图: { a } （系列名称），{ b } （数据项名称），{ c } （数值）, { d } （百分比）

            },
            series: [],
            label: {
              normal: {
                show: false,//文字太乱 去掉
                position: 'top',
                // textStyle: {
                // color: 'rgba(0, 0, 0, 0.3)'
                // },
                formatter: " {c}"
              }
            }
          }
        },
      chart6://排名表
        {
          chartKey: "chart6",
          version: "1.0",
          createTime: "",
          yySetting: {
            type: "ranktable",
            subType: "0",
            title: {
              text: "排名表示例"
            },
            indexCol: {
              bAddIndexCol: true,
              caption: "排名",
              key: "ranktableindex"
            },
            orderInfo:
              {
                topNum: 5, //“显示行数”：最多31
                orderField: "fMoney",// “排序指标”：按照哪个指标排序的含义，默认按照展示指标中的第一个。
                orderBy: "desc",// “排序方式（升序、降序）”：默认降序
                includeSelf: false,//是否包括当前所在的店铺/区域
              },
            dataField: {
              dimensionX: [
                { codeField: "store_code", nameField: "store_code", caption: "门店编码", bLabel: false, iLabelOrder: 1 },
                { codeField: "store_name", nameField: "store_name", caption: "门店名称", bLabel: true, iLabelOrder: 2 }
              ],
              measure: [
                // { valueField: "store_code", caption: "门店编码", bShowValueNotBar: true, iOrder: 1, bShowValueAfterBar: false },
                // { valueField: "store_name", caption: "门店名称", bShowValueNotBar: true, iOrder: 2, bShowValueAfterBar: false },
                { valueField: "fMoney", caption: "金额", bShowValueNotBar: false, iOrder: 3, bShowValueAfterBar: true },
                { valueField: "fNetMoney", caption: "销售净额", bShowValueNotBar: true, iOrder: 4, bShowValueAfterBar: false },
                { valueField: "fRetailMoney", caption: "零售金额", bShowValueNotBar: true, iOrder: 5, bShowValueAfterBar: false }
              ]
            }
          },
          eChartSetting: {}
        },
    }
  if (eChartType == "")
    return config;
  else {//取模版设置取默认模板
    let chart;
    if (eChartType == "pie") {
      chart = config.chart1;
      chart.yySetting.subType = eChartSubType;
      chart.eChartSetting.title.text = "饼形图示例";
    }
    else if (eChartType == "bar") {
      chart = config.chart2;
      chart.yySetting.subType = eChartSubType;
      if (eChartSubType == "1") {//垂直不堆积
        chart.yySetting.bVertical = true;
        chart.yySetting.stack = "";
        chart.eChartSetting.title.text = "柱形图示例";

      }
      else if (eChartSubType == "2") {//垂直堆积
        chart.yySetting.bVertical = true;
        chart.yySetting.stack = "累计";
        chart.eChartSetting.title.text = "堆叠柱形图示例";
      }
      else if (eChartSubType == "3") {//水平不堆积
        chart.yySetting.bVertical = false;
        chart.yySetting.stack = "";
        chart.eChartSetting.title.text = "条形图示例";
        chart.eChartSetting.grid.left = '10%';
      }
      else if (eChartSubType == "4") {//水平堆积
        chart.yySetting.bVertical = false;
        chart.yySetting.stack = "累计";
        chart.eChartSetting.title.text = "堆叠条形图示例";
        chart.eChartSetting.grid.left = '10%';
      }

    }
    else if (eChartType == "line") {
      chart = config.chart3;
      chart.yySetting.subType = eChartSubType;
      if (eChartSubType == "1") {//折线
        chart.yySetting.smooth = false;
        chart.eChartSetting.title.text = "折线图示例";
      }
      else if (eChartSubType == "2") {//曲线
        chart.yySetting.smooth = true;
        chart.eChartSetting.title.text = "曲线图示例";
      }
    }
    else if (eChartType == "scatter") {
      chart = config.chart4;
      chart.yySetting.subType = eChartSubType;
    }
    else if (eChartType == "barline") {
      chart = config.chart5;
      chart.yySetting.subType = eChartSubType;
    }
    else if (eChartType == "ranktable") {
      chart = config.chart6;
      chart.yySetting.subType = eChartSubType;
    }
    chart.chartKey = chartKey;//暂时全部设为chart1
    chart.yySetting.dataField.dimensionX = [];
    chart.yySetting.dataField.dimensionSub = [];
    chart.yySetting.dataField.measure = [];
    chart.createTime = Format(new Date(), 'yyyy-MM-dd hh:mm:ss');
    return chart;
  }
}


//主维度的显示名字和次维度的名字可能会重复，处理名字重复的问题
export function UnionDimensionName(yySetting, data) {
  let dimensionX = yySetting.dataField.dimensionX.sort(function (a, b) {
    return a.iLabelOrder > b.iLabelOrder;
  });
  let dimensionSub = yySetting.dataField.dimensionSub;
  // { codeField: "area_code", nameField: "area_name", bLabel: false },
  // { codeField: "store_code", nameField: "store_name", bLabel: true }
  let xCodeArray = [];
  let xNameArray = [];
  let subCodeArray = [];
  let subNameArray = [];
  let xCode = "";
  let xName = "";

  data.forEach(itemData => {
    xCode = "";
    xName = "";
    dimensionX.forEach(itemX => {
      if (itemData.hasOwnProperty(itemX.codeField)) {
        xCode = xCode == "" ? itemData[itemX.codeField] : (xCode + eChartLabel.SplitChar + itemData[itemX.codeField]);
      }
      if (itemX.bLabel == true)
        if (itemData.hasOwnProperty(itemX.nameField)) {
          xName = xName == "" ? itemData[itemX.nameField] : (xName + eChartLabel.SplitChar + itemData[itemX.nameField]);
        }
    });

    xName = trimNameForXYAxis(xName, yySetting.type);
    if (xCodeArray.indexOf(xCode) >= 0) {
      itemData[eChartLabel.unionedXCode] = xCode;
      itemData[eChartLabel.unionedXName] = xNameArray[xCodeArray.indexOf(xCode)];
    }
    else {
      if (xNameArray.indexOf(xName) < 0) {
        xCodeArray.push(xCode);
        xNameArray.push(xName);
        itemData[eChartLabel.unionedXCode] = xCode;
        itemData[eChartLabel.unionedXName] = xName;
      }
      else {
        //存在编码不同，显示名字相同的情况
        for (var i = 2; i < 1000; i++) {
          if (xNameArray.indexOf(xName + "(" + i.toString() + ")") < 0) {
            xName = xName + "(" + i.toString() + ")";
            i = 1000;
          }
        }
        xCodeArray.push(xCode);
        xNameArray.push(xName);
        itemData[eChartLabel.unionedXCode] = xCode;
        itemData[eChartLabel.unionedXName] = xName;
      }
    }
    if (dimensionSub && dimensionSub.length > 0) {
      let subItem = dimensionSub[0];
      let subCode = itemData[subItem.codeField];
      let subName = itemData[subItem.nameField];
      itemData[eChartLabel.unionedSubCode] = subCode;
      itemData[eChartLabel.unionedSubName] = subName;
      if (subCodeArray.indexOf(subCode) >= 0) {
        // itemData[subItem.nameField] = subNameArray[subCodeArray.indexOf(subCode)];
        itemData[eChartLabel.unionedSubName] = subNameArray[subCodeArray.indexOf(subCode)];
      }
      else {
        if (subNameArray.indexOf(subName) < 0) {
          subCodeArray.push(subCode);
          subNameArray.push(subName);
        }
        else {
          //存在编码不同，显示名字相同的情况
          for (var i = 2; i < 1000; i++) {
            if (subNameArray.indexOf(subName + "(" + i.toString() + ")") < 0) {
              subName = subName + "(" + i.toString() + ")";
              i = 1000;
            }
          }
          subCodeArray.push(subCode);
          subNameArray.push(subName);
          // itemData[subItem.nameField] = subName;
          itemData[eChartLabel.unionedSubName] = subName;
        }
      }
    }
  });

  data.forEach(itemData => {
    try {
      if (_.isEmpty(itemData[eChartLabel.unionedXCode].toString()))
        itemData[eChartLabel.unionedXCode] = "空数据";//主维度空值数据
      if (_.isEmpty(itemData[eChartLabel.unionedXName].toString()))
        itemData[eChartLabel.unionedXName] = "空数据";//主维度空值数据
      if (dimensionSub && dimensionSub.length > 0) {
        if (_.isEmpty(itemData[eChartLabel.unionedSubCode].toString()))
          itemData[eChartLabel.unionedSubCode] = "辅维度空值数据";
        if (_.isEmpty(itemData[eChartLabel.unionedSubName].toString()))
          itemData[eChartLabel.unionedSubName] = "辅维度空值数据";
      }
    }
    catch (e) {
      LogChartInfo("eChartCommon UnionDimensionName 出错。Err = " + e.message + " itemData=", JSON.stringify(itemData), 999)
    }

  });
  return data;
}


// export function wrapString(str, rowLen) {

// var ret = "";//拼接加\n返回的类目项
// var maxLength = rowLen;//每项显示文字个数
// var valLength = str.length;//X轴类目项的文字个数
// var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
// if (rowN > 1)//如果类目项的文字大于3,
// {
// for (var i = 0; i < rowN; i++) {
// var temp = "";//每次截取的字符串
// var start = i * maxLength;//开始截取的位置
// var end = start + maxLength;//结束截取的位置
// //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
// temp = str.substring(start, end) + "\n";
// ret += temp; //凭借最终的字符串
// }
// return ret;
// }
// else {
// return str;
// }
// }


// xAxis: {
// axisLabel: {
// displayType: 2,//1 横 2 竖 3 斜
// interval: 0,//坐标轴刻度标签的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
// rotate: 0,//刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。旋转的角度从 -90 度到 90 度。
// displayType2RowLen: 2//当displayType=2时，每行的字符数
// }
// }


// export function getPanelLayOutTestConfig() {
//   let panelConfig =
//     {
//       title: "大屏视图",
//       name: "大屏视图测试",
//       version: "1.0",
//       curChartKey: "",
//       type: "1",//大屏 1 看板 2
//       backgroundColor: '#f2efee',
//       backgroundImage: "", //空
//       borderWidth: panelDefaultValue.borderWidth,
//       borderColor: panelDefaultValue.borderColor,
//       padding: panelDefaultValue.padding,
//       margin: panelDefaultValue.margin,
//       panelLayOutConfig: {
//         rows:
//           [
//             {
//               height: '10%',
//               padding: panelDefaultValue.padding,
//               margin: panelDefaultValue.margin,
//               cols:
//                 [
//                   {
//                     width: '50%',
//                     padding: panelDefaultValue.padding,
//                     margin: panelDefaultValue.margin,
//                     widgetType: "imagetext",
//                     borderWidth: panelDefaultValue.borderWidth,
//                     borderColor: panelDefaultValue.borderColor,
//                     backgroundColor: '#d0e0e3',
//                     panelImageTextConfig:
//                       {
//                         subType: "title",
//                         title: "金一上地华联店",
//                         height: '100%',
//                         width: '100%',
//                         fontSize: 24,
//                         color: 'white',
//                         textAlign: 'center',
//                         fontFamily: 'STKaiti'// STSong = 华文宋体 // LiSu = 隶书 // YouYuan = 幼圆 // STXihei = 华文细黑 // STKaiti = 华文楷体 // STZhongsong = 华文中宋 // STFangsong = 华文仿宋 // FZShuTi = 方正舒体 // FZYaoti = 方正姚体 // STCaiyun = 华文彩云 // STHupo = 华文琥珀 // STLiti = 华文隶书 // STXingkai = 华文行楷 // STXinwei = 华文新魏
//                       }
//                   }
//                   ,
//                   {
//                     width: '50%',
//                     padding: panelDefaultValue.padding,
//                     margin: panelDefaultValue.margin,
//                     widgetType: "imagetext",
//                     borderWidth: panelDefaultValue.borderWidth,
//                     borderColor: panelDefaultValue.borderColor,
//                     backgroundColor: '#b8bdb6',
//                     panelImageTextConfig:
//                       {
//                         subType: "title",
//                         title: "金一北京路华联店",
//                         height: '100%',
//                         width: '100%',
//                         fontSize: 24,
//                         color: 'white',
//                         textAlign: 'center',
//                         fontFamily: 'STLiti'// STSong = 华文宋体 // LiSu = 隶书 // YouYuan = 幼圆 // STXihei = 华文细黑 // STKaiti = 华文楷体 // STZhongsong = 华文中宋 // STFangsong = 华文仿宋 // FZShuTi = 方正舒体 // FZYaoti = 方正姚体 // STCaiyun = 华文彩云 // STHupo = 华文琥珀 // STLiti = 华文隶书 // STXingkai = 华文行楷 // STXinwei = 华文新魏

//                       }
//                   }
//                 ]
//             }
//             ,
//             {
//               height: '10%',
//               padding: panelDefaultValue.padding,
//               margin: panelDefaultValue.margin,
//               cols:
//                 [
//                   {
//                     width: '100%',
//                     padding: panelDefaultValue.padding,
//                     margin: panelDefaultValue.margin,
//                     widgetType: "sum",
//                     borderWidth: panelDefaultValue.borderWidth,
//                     borderColor: panelDefaultValue.borderColor,
//                     backgroundColor: '#c1bdca',
//                     //panelsum 配置信息
//                     sumConfig: {
//                       title: "累计信息",
//                       refreshInterval: 10,//秒
//                       billnum: "rm_saleanalysis",
//                       filterId: "13430301",
//                       solutionId: '3353425',
//                       // groupSchemaId: "4494",
//                       bShowFilter: false,
//                       condition: null,
//                       sumFields: [
//                         { key: "billnum", caption: "单据数", iOrder: 1, postfix: "单" },
//                         { key: "fMoney", caption: "金额", iOrder: 3, postfix: "元" },
//                         { key: "fDiscount", caption: "折扣额", iOrder: 4, postfix: "元" },
//                         { key: "fQuantity", caption: "销售数量", iOrder: 2, postfix: "个" }
//                       ]
//                     }
//                     // cCaption "销售数量"
//                     // cControlType "Column"
//                     // cFormatData "{"decimal":"<%option.quantitydecimal%>"}"
//                     // cItemName "fQuantity"
//                     // cShowCaption "销售数量"
//                     // cStyle "{"fileType":"image","maxQuantity":"5","highlight":true}"
//                   }
//                 ]
//             }
//             ,
//             {
//               height: '40%',
//               padding: panelDefaultValue.padding,
//               margin: panelDefaultValue.margin,
//               cols:
//                 [
//                   {
//                     width: '100%',
//                     padding: panelDefaultValue.padding,
//                     margin: panelDefaultValue.margin,
//                     widgetType: "chart",
//                     borderWidth: panelDefaultValue.borderWidth,
//                     borderColor: panelDefaultValue.borderColor,
//                     backgroundColor: '#acbabd',
//                     panelChartConfig: {
//                       title: "销售收款——分组2",
//                       chartKey: "chartKey_5163384183962936",
//                       refreshInterval: 1000,//秒
//                       billnum: "rm_salereceipts_report",//"rm_saleanalysis",
//                       filterId: "2171879",
//                       // solutionId: "3353369"
//                       groupSchemaId: "10337",
//                       bShowFilter: false,
//                       condition: null,
//                     }
//                   }
//                 ]
//             }
//             ,
//             {
//               height: '40%',
//               padding: panelDefaultValue.padding,
//               margin: panelDefaultValue.margin,
//               cols:
//                 [
//                   {
//                     width: '50%',
//                     padding: panelDefaultValue.padding,
//                     margin: panelDefaultValue.margin,
//                     widgetType: "chart",
//                     borderWidth: panelDefaultValue.borderWidth,
//                     borderColor: panelDefaultValue.borderColor,
//                     backgroundColor: '#c3b7b7',
//                     panelChartConfig: {
//                       title: "销售收款——分组",
//                       chartKey: "chartKey_98240975230945",
//                       refreshInterval: 1000,//秒
//                       billnum: "rm_salereceipts_report",
//                       filterId: "2171879",
//                       // solutionId: "2095159",
//                       groupSchemaId: "7194",
//                       bShowFilter: false,
//                       condition: null,
//                     }
//                   }
//                   ,
//                   {
//                     width: '50%',
//                     padding: panelDefaultValue.padding,
//                     margin: panelDefaultValue.margin,
//                     widgetType: "chart",
//                     borderWidth: panelDefaultValue.borderWidth,
//                     borderColor: panelDefaultValue.borderColor,
//                     backgroundColor: '#c2c5c2',
//                     panelChartConfig: {
//                       title: "销售排名-门店",
//                       chartKey: "chartKey_09274582384324",
//                       refreshInterval: 1000,//秒
//                       billnum: "rm_saleranking",
//                       filterId: "12548165",
//                       // solutionId: "3353335",
//                       groupSchemaId: "4481",
//                       bShowFilter: false,
//                       condition: null,
//                     }
//                   }
//                 ]
//             }
//           ]
//       }
//     }
//   return panelConfig;
// }
//大屏看板
export function getPanelLayOutTemplate1() {
  let temps = [];
  let temp1 = {
    "id": -1,
    "icon": "laobanfangan",
    "title": "老板大屏看板",
    "name": "老板大屏看板",
    "templateName": "老板模板",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey_1",
    "curChartKey": "",
    "type": "1",
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.allMargin,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelWidthScale": 16,
    "panelHeightScale": 9,
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": "100%",
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [{
          "colKey": getNewColKey(),// "colKey_9060292547",
          "widgetType": "rows",
          "width": "100%",
          "backgroundColor": "",
          "backgroundImage": "",
          "borderWidth": panelDefaultValue.borderWidth,
          "borderColor": panelDefaultValue.borderColor,
          "padding": panelDefaultValue.padding,
          "margin": panelDefaultValue.margin,
          "widgetValue": [{
            "rowKey": getNewRowKey(),// "rowKey_7064652237",
            isTitleArea: true,
            "height": "10%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "cols": [{
              "colKey": getNewColKey(),// "colKey_1425098330",
              isTitleArea: true,
              "width": "100%",
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "widgetType": "none",
              "borderWidth": "0px",
              "borderColor": panelDefaultValue.borderColor,
              "backgroundColor": ""
            }]
          }, {
            "rowKey": getNewRowKey(),// "rowKey_3576247806",
            "height": "90%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "cols": [{
              "colKey": getNewColKey(),// "colKey_1253480796",
              "width": "100%",
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "widgetType": "rows",
              "borderWidth": "0px",
              "borderColor": panelDefaultValue.borderColor,
              "backgroundColor": "",
              "widgetValue": [{
                "rowKey": getNewRowKey(),// "rowKey_8623133664",
                "height": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin,
                "cols": [{
                  "colKey": getNewColKey(),// "colKey_8377435413",
                  "widgetType": "rows",
                  "width": "30%",
                  "backgroundColor": "",
                  "backgroundImage": "",
                  "borderWidth": panelDefaultValue.borderWidth,
                  "borderColor": panelDefaultValue.borderColor,
                  "padding": panelDefaultValue.padding,
                  "margin": panelDefaultValue.margin,
                  "widgetValue": [{
                    "rowKey": getNewRowKey(),// "rowKey_7248319879",
                    "height": "33%",
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_1530853256",
                      "width": "100%",
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin,
                      "widgetType": "none",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "backgroundColor": ""
                    }]
                  }, {
                    "rowKey": getNewRowKey(),// "rowKey_5636779580",
                    "height": "33%",
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_7796245342",
                      "width": "100%",
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin,
                      "widgetType": "none",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "backgroundColor": ""
                    }]
                  }, {
                    "rowKey": getNewRowKey(),// "rowKey_3383890869",
                    "height": "34%",
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_1107980645",
                      "width": "100%",
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin,
                      "widgetType": "none",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "backgroundColor": ""
                    }]
                  }]
                }, {
                  "colKey": getNewColKey(),// "colKey_9683767826",
                  "widgetType": "rows",
                  "width": "40%",
                  "backgroundColor": "",
                  "backgroundImage": "",
                  "borderWidth": panelDefaultValue.borderWidth,
                  "borderColor": panelDefaultValue.borderColor,
                  "padding": panelDefaultValue.padding,
                  "margin": panelDefaultValue.margin,
                  "bOuterMargin": true,
                  "widgetValue": [{
                    "rowKey": getNewRowKey(),// "rowKey_2239252168",
                    "height": "73%",
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_9616586687",
                      "width": "100%",
                      "padding": panelDefaultValue.padding,
                      "margin": "0px",
                      "widgetType": "none",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "backgroundColor": ""
                    }]
                  }, {
                    "rowKey": getNewRowKey(),// "rowKey_2992347983",
                    "height": "27%",
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_3255271887",
                      "width": "100%",
                      "padding": panelDefaultValue.padding,
                      "margin": "0px",
                      "widgetType": "rows",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "backgroundColor": "",
                      "widgetValue": [{
                        "rowKey": getNewRowKey(),// "rowKey_3563703394",
                        "height": "100%",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "borderWidth": panelDefaultValue.borderWidth,
                        "borderColor": panelDefaultValue.borderColor,
                        "padding": panelDefaultValue.padding,
                        "margin": panelDefaultValue.margin,
                        "cols": [{
                          "colKey": getNewColKey(),// "colKey_578030597",
                          "widgetType": "none",
                          "width": "50%",
                          "backgroundColor": "",
                          "backgroundImage": "",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "padding": panelDefaultValue.padding,
                          "margin": "0px"
                        }, {
                          "colKey": getNewColKey(),// "colKey_3340125646",
                          "widgetType": "none",
                          "width": "50%",
                          "backgroundColor": "",
                          "backgroundImage": "",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "padding": panelDefaultValue.padding,
                          "margin": "0px"
                        }]
                      }]
                    }]
                  }]
                }, {
                  "colKey": getNewColKey(),// "colKey_8883704878",
                  "widgetType": "rows",
                  "width": "30%",
                  "backgroundColor": "",
                  "backgroundImage": "",
                  "borderWidth": panelDefaultValue.borderWidth,
                  "borderColor": panelDefaultValue.borderColor,
                  "padding": panelDefaultValue.padding,
                  "margin": panelDefaultValue.margin,
                  "widgetValue": [{
                    "rowKey": getNewRowKey(),// "rowKey_542846251",
                    "height": "50%",
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_4476533454",
                      "width": "100%",
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin,
                      "widgetType": "rows",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "backgroundColor": "",
                      "bOuterMargin": true,
                      "widgetValue": [{
                        "rowKey": getNewRowKey(),// "rowKey_5280916634",
                        "height": "27%",
                        "padding": panelDefaultValue.padding,
                        "margin": panelDefaultValue.margin,
                        "cols": [{
                          "colKey": getNewColKey(),// "colKey_4590039080",
                          "width": "100%",
                          "padding": panelDefaultValue.padding,
                          "margin": "0px",
                          "widgetType": "none",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "backgroundColor": ""
                        }]
                      }, {
                        "rowKey": getNewRowKey(),// "rowKey_5451607197",
                        "height": "73%",
                        "padding": panelDefaultValue.padding,
                        "margin": panelDefaultValue.margin,
                        "cols": [{
                          "colKey": getNewColKey(),// "colKey_6428247005",
                          "width": "100%",
                          "padding": panelDefaultValue.padding,
                          "margin": "0px",
                          "widgetType": "none",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "backgroundColor": ""
                        }]
                      }]
                    }]
                  }, {
                    "rowKey": getNewRowKey(),// "rowKey_9296181763",
                    "height": "50%",
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_7943267767",
                      "width": "100%",
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin,
                      "widgetType": "rows",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "backgroundColor": "",
                      "bOuterMargin": true,
                      "widgetValue": [{
                        "rowKey": getNewRowKey(),// "rowKey_2690264045",
                        "height": "27%",
                        "padding": panelDefaultValue.padding,
                        "margin": panelDefaultValue.margin,
                        "cols": [{
                          "colKey": getNewColKey(),// "colKey_1716925296",
                          "width": "100%",
                          "padding": panelDefaultValue.padding,
                          "margin": "0px",
                          "widgetType": "none",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "backgroundColor": ""
                        }]
                      }, {
                        "rowKey": getNewRowKey(),// "rowKey_2313720299",
                        "height": "73%",
                        "padding": panelDefaultValue.padding,
                        "margin": panelDefaultValue.margin,
                        "cols": [{
                          "colKey": getNewColKey(),// "colKey_5534343104",
                          "width": "100%",
                          "padding": panelDefaultValue.padding,
                          "margin": "0px",
                          "widgetType": "none",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "backgroundColor": ""
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  };

  let temp2 = {
    "id": -1,
    "icon": "quyujinglifangan",
    "title": "区域经理大屏看板",
    "name": "区域经理大屏看板",
    templateName: "区域经理模板",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey_2",
    "curChartKey": "",
    "type": "1",
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.allMargin,
    "backStyleKey": "",
    "backColorKey": "",
    skinKey_BackStyle: "",
    skinKey_BackColor: "",
    "panelWidthScale": 16,
    "panelHeightScale": 9,
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_3824143855",
        "height": "100%",
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [{
          "colKey": getNewColKey(),// "colKey_3444093764",
          "widgetType": "rows",
          "width": "100%",
          "backgroundColor": "",
          "backgroundImage": "",
          "borderWidth": panelDefaultValue.borderWidth,
          "borderColor": panelDefaultValue.borderColor,
          "padding": panelDefaultValue.padding,
          "margin": panelDefaultValue.margin,
          "widgetValue": [{
            "rowKey": getNewRowKey(),// "rowKey_3527541752",
            isTitleArea: true,
            "height": "10%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "cols": [{
              "colKey": getNewColKey(),// "colKey_1834733277",
              isTitleArea: true,
              "width": "100%",
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "widgetType": "none",
              "borderWidth": "0px",
              "borderColor": panelDefaultValue.borderColor,
              "backgroundColor": ""
            }]
          }, {
            "rowKey": getNewRowKey(),// "rowKey_2949500584",
            "height": "90%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "cols": [{
              "colKey": getNewColKey(),// "colKey_5534622016",
              "width": "100%",
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "widgetType": "rows",
              "borderWidth": "0px",
              "borderColor": panelDefaultValue.borderColor,
              "backgroundColor": "",
              "widgetValue": [{
                "rowKey": getNewRowKey(),// "rowKey_9242856946",
                "height": "12%",
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin,
                "cols": [{
                  "colKey": getNewColKey(),// "colKey_4448918331",
                  "width": "100%",
                  "padding": panelDefaultValue.padding,
                  "margin": panelDefaultValue.margin,
                  "widgetType": "none",
                  "borderWidth": panelDefaultValue.borderWidth,
                  "borderColor": panelDefaultValue.borderColor,
                  "backgroundColor": ""
                }]
              }, {
                "rowKey": getNewRowKey(),// "rowKey_2167253091",
                "height": "43%",
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin,
                "cols": [{
                  "colKey": getNewColKey(),// "colKey_5235815332",
                  "width": "100%",
                  "padding": panelDefaultValue.padding,
                  "margin": panelDefaultValue.margin,
                  "widgetType": "rows",
                  "borderWidth": panelDefaultValue.borderWidth,
                  "borderColor": panelDefaultValue.borderColor,
                  "backgroundColor": "",
                  "widgetValue": [{
                    "rowKey": getNewRowKey(),// "rowKey_4595019948",
                    "height": "100%",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "borderWidth": panelDefaultValue.borderWidth,
                    "borderColor": panelDefaultValue.borderColor,
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_4717338626",
                      "widgetType": "none",
                      "width": "35%",
                      "backgroundColor": "",
                      "backgroundImage": "",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin
                    }, {
                      "colKey": getNewColKey(),// "colKey_5327928897",
                      "widgetType": "rows",
                      "width": "65%",
                      "backgroundColor": "",
                      "backgroundImage": "",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin,
                      "widgetValue": [{
                        "rowKey": getNewRowKey(),// "rowKey_6122752114",
                        "height": "100%",
                        "backgroundColor": "",
                        "backgroundImage": "",
                        "borderWidth": panelDefaultValue.borderWidth,
                        "borderColor": panelDefaultValue.borderColor,
                        "padding": panelDefaultValue.padding,
                        "margin": panelDefaultValue.margin,
                        "cols": [{
                          "colKey": getNewColKey(),// "colKey_3207327833",
                          "widgetType": "none",
                          "width": "50%",
                          "backgroundColor": "",
                          "backgroundImage": "",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "padding": panelDefaultValue.padding,
                          "margin": panelDefaultValue.margin
                        }, {
                          "colKey": getNewColKey(),// "colKey_2527321226",
                          "widgetType": "none",
                          "width": "50%",
                          "backgroundColor": "",
                          "backgroundImage": "",
                          "borderWidth": panelDefaultValue.borderWidth,
                          "borderColor": panelDefaultValue.borderColor,
                          "padding": panelDefaultValue.padding,
                          "margin": panelDefaultValue.margin
                        }]
                      }]
                    }]
                  }]
                }]
              }, {
                "rowKey": getNewRowKey(),// "rowKey_872316685",
                "height": "45%",
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin,
                "cols": [{
                  "colKey": getNewColKey(),// "colKey_7643130096",
                  "width": "100%",
                  "padding": panelDefaultValue.padding,
                  "margin": panelDefaultValue.margin,
                  "widgetType": "rows",
                  "borderWidth": panelDefaultValue.borderWidth,
                  "borderColor": panelDefaultValue.borderColor,
                  "backgroundColor": "",
                  "widgetValue": [{
                    "rowKey": getNewRowKey(),
                    "height": "100%",
                    "backgroundColor": "",
                    "backgroundImage": "",
                    "borderWidth": panelDefaultValue.borderWidth,
                    "borderColor": panelDefaultValue.borderColor,
                    "padding": panelDefaultValue.padding,
                    "margin": panelDefaultValue.margin,
                    "cols": [{
                      "colKey": getNewColKey(),// "colKey_6514570685",
                      "widgetType": "none",
                      "width": "35%",
                      "backgroundColor": "",
                      "backgroundImage": "",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin
                    }, {
                      "colKey": getNewColKey(),
                      "widgetType": "none",
                      "width": "65%",
                      "backgroundColor": "",
                      "backgroundImage": "",
                      "borderWidth": panelDefaultValue.borderWidth,
                      "borderColor": panelDefaultValue.borderColor,
                      "padding": panelDefaultValue.padding,
                      "margin": panelDefaultValue.margin
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  };

  let temp3 = {
    id: -1,
    icon: "zidingyifangan",
    title: "自定义大屏看板",
    name: "",
    templateName: "自定义模板",
    templateType: "0",// 0 空白模板 1 系统预置模板
    splitCounter: 0,
    createTime: "",
    version: "1.0",
    templateKey: "templateKey_3",
    curChartKey: "",
    type: "1",//大屏看板 = 1 桌面看板 = 2
    backgroundColor: '',
    backgroundImage: "", //空
    borderWidth: "0px",
    borderColor: panelDefaultValue.borderColor,//'red',
    padding: panelDefaultValue.padding,
    margin: panelDefaultValue.allMargin,
    "backStyleKey": "",
    "backColorKey": "",
    skinKey_BackStyle: "",
    skinKey_BackColor: "",
    panelWidthScale: 16,
    panelHeightScale: 9,
    panelLayOutConfig: {
      rows:
        [
          {
            rowKey: getNewRowKey(),// "001",
            height: '100%',
            backgroundColor: '',
            backgroundImage: "",
            borderWidth: panelDefaultValue.borderWidth,
            borderColor: panelDefaultValue.borderColor,
            padding: panelDefaultValue.padding,
            margin: panelDefaultValue.margin,
            cols:
              [
                {
                  colKey: getNewColKey(),// "001",
                  widgetType: "none",
                  width: '100%',
                  backgroundColor: '',
                  backgroundImage: "",
                  borderWidth: panelDefaultValue.borderWidth,
                  borderColor: panelDefaultValue.borderColor,
                  padding: panelDefaultValue.padding,
                  margin: panelDefaultValue.margin,
                }
              ]
          }
        ]
    }
  };
  temps.push(temp1);
  temps.push(temp2);
  temps.push(temp3);
  return temps;
}

// export function reCalcTemplate2Height2AndRowsHeight(editPanel) {

// let rows = editPanel.panelLayOutConfig.rows;
// let height2 = 0;
// let fRatio = 0;
// rows.forEach((ele) => {
// height2 = height2 + Number(ele.height2);
// });
// editPanel.height2 = height2;
// for (var i = 0; i < rows.length; i++) {
// let ele = rows[i];
// if (i != rows.length - 1) {
// let ratio = Math.floor(ele.height2 / height2 * 10000);
// ratio = ratio / 100;
// fRatio = ratio + fRatio;
// ele.height = ratio + "%";
// }
// else {
// ele.height = Number(100 - fRatio) + "%";
// }
// }
// return editPanel;
// }


export function reCalcTemplate2Height2AndRowsHeight(editPanel) {

  let rows = editPanel.panelLayOutConfig.rows;
  let height2 = 0;
  let fRatio = 0;
  rows.forEach((rowEle) => {
    reCalcRowsHeight2AndInnerRowsHeight(rowEle);
    height2 = height2 + Number(rowEle.height2);
  });
  editPanel.height2 = height2;
  for (var i = 0; i < rows.length; i++) {
    let ele = rows[i];
    if (i != rows.length - 1) {
      let ratio = Math.floor(ele.height2 / height2 * 10000);
      ratio = ratio / 100;
      fRatio = ratio + fRatio;
      ele.height = ratio + "%";
    }
    else {
      ele.height = Number(100 - fRatio) + "%";
    }
  }
  return editPanel;
}


export function reCalcRowsHeight2AndInnerRowsHeight(rowEle) {

  let maxNum = 0;
  rowEle.cols.forEach((colEle) => {
    if (colEle.widgetType == "rows") {
      if (maxNum < colEle.widgetValue.length)
        maxNum = colEle.widgetValue.length;
    }
  });
  rowEle.height2 = rowEle.baseRowHeight * maxNum;
  rowEle.cols.forEach((colEle) => {
    if (colEle.widgetType == "rows") {
      let fRatio = 0;
      for (var i = 0; i < colEle.widgetValue.length; i++) {
        let ele = colEle.widgetValue[i];
        if (i < maxNum - 1) {
          let ratio = Math.floor(1 / maxNum * 10000);
          ratio = ratio / 100;
          fRatio = ratio + fRatio;
          ele.height = ratio + "%";
        }
        else {
          ele.height = Number(100 - fRatio) + "%";
        }
      }
    }
  });

}

//桌面看板
export function getPanelLayOutTemplate2() {
  let temps = [];
  let temp1 = {
    "id": -1,
    "icon": "icon-test",
    "title": "左1右2",
    "name": "模板A",
    height2: 0,
    "templateName": "左1右2",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey2_1",
    "curChartKey": "",
    "type": "2",//大屏看板 = 1 桌面看板 = 2
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "33%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "67%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };

  let temp2 = {
    "id": -1,
    "icon": "icon-test4",
    "title": "左2右1",
    "name": "模板B",
    height2: 0,
    "templateName": "左2右1",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey2_2",
    "curChartKey": "",
    "type": "2",//大屏看板 = 1 桌面看板 = 2
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "67%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "33%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };


  let temp3 = {
    "id": -1,
    "icon": "icon-test1",
    "title": "中3",
    "name": "模板C",
    height2: 0,
    "templateName": "中3",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey2_3",
    "curChartKey": "",
    "type": "2",//大屏看板 = 1 桌面看板 = 2
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "33.33%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "33.33%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "33.34%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };



  let temp4 = {
    "id": -1,
    "icon": "icon-test2",
    "title": "上4下1",
    "name": "模板D",
    height2: 0,
    "templateName": "上4下1",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey2_4",
    "curChartKey": "",
    "type": "2",//大屏看板 = 1 桌面看板 = 2
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "25%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "25%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "25%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "25%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      },
      {
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.5,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "100%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };



  let temp5 = {
    "id": -1,
    "icon": "icon-test3",
    "title": "单行",
    "name": "模板E",
    height2: 0,
    "templateName": "单行",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey2_5",
    "curChartKey": "",
    "type": "2",//大屏看板 = 1 桌面看板 = 2
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "100%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };
  let temp999 = {
    "id": -1,
    "icon": "laobanfangan",
    "title": "左1右222",
    "name": "左1右222",
    height2: 0,
    "templateName": "左1右222",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey2_999",
    "curChartKey": "",
    "type": "2",//大屏看板 = 1 桌面看板 = 2
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "33%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }, {
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "67%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }, {
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }, {
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      },
      {
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.5,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "100%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };
  temp1 = reCalcTemplate2Height2AndRowsHeight(temp1);
  temps.push(temp1);
  temp2 = reCalcTemplate2Height2AndRowsHeight(temp2);
  temps.push(temp2);
  temp3 = reCalcTemplate2Height2AndRowsHeight(temp3);
  temps.push(temp3);
  temp4 = reCalcTemplate2Height2AndRowsHeight(temp4);
  temps.push(temp4);
  temp5 = reCalcTemplate2Height2AndRowsHeight(temp5);
  temps.push(temp5);

  // LogChartInfo("重新计算列高 before ", JSON.stringify(temp999), 900)
  // temp999 = reCalcTemplate2Height2AndRowsHeight(temp999);
  // LogChartInfo("重新计算列高 after ", JSON.stringify(temp999), 900)
  // temps.push(temp999);
  return temps;
}

export function getPanelLayOutTemplateRow2() {
  let row = {
    rowKey: getNewRowKey(),// "001",
    height: "0%",
    backgroundColor: '',
    backgroundImage: "",
    borderWidth: panelDefaultValue.borderWidth,
    borderColor: panelDefaultValue.borderColor,
    padding: panelDefaultValue.padding,
    margin: panelDefaultValue.margin,
    cols:
      [
        {
          colKey: getNewColKey(),// "001",
          widgetType: "none",
          width: '100%',
          backgroundColor: '',
          backgroundImage: "",
          borderWidth: panelDefaultValue.borderWidth,
          borderColor: panelDefaultValue.borderColor,
          padding: panelDefaultValue.padding,
          margin: panelDefaultValue.margin,
        }
      ]
  }

  return row;
}

//移动看板
export function getPanelLayOutTemplate3() {
  let temps = [];

  let temp1 = {
    "id": -1,
    "icon": "icon-test3",
    "title": "一列",
    "name": "移动看板A",
    "nameTmp": "移动看板A",
    height2: 0,
    "templateName": "一列",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey3_1",
    "curChartKey": "",
    "type": "3",//大屏看板 = 1 桌面看板 = 2 移动看板 = 3
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "100%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };
  let temp2 = {
    "id": -1,
    "icon": "icon-test",
    "title": "两列",
    "name": "移动看板B",
    "nameTmp": "移动看板B",
    height2: 0,
    "templateName": "两列",
    templateType: "1",// 0 空白模板 1 系统预置模板
    splitCounter: 1000,
    createTime: "",
    "version": "1.0",
    "templateKey": "templateKey3_2",
    "curChartKey": "",
    "type": "3",//大屏看板 = 1 桌面看板 = 2 移动看板 = 3
    "backgroundColor": "",
    "backgroundImage": "",
    "borderWidth": "0px",
    "borderColor": panelDefaultValue.borderColor,
    "padding": panelDefaultValue.padding,
    "margin": panelDefaultValue.padding,//panelDefaultValue.allMargin2,
    "backStyleKey": "",
    "backColorKey": "",
    "skinKey_BackStyle": "",
    "skinKey_BackColor": "",
    "panelLayOutConfig": {
      "rows": [{
        "rowKey": getNewRowKey(),// "rowKey_7443500939",
        "height": 0,
        height2: 0,
        baseRowHeight: 0.3,
        "backgroundColor": "",
        "backgroundImage": "",
        "borderWidth": panelDefaultValue.borderWidth,
        "borderColor": panelDefaultValue.borderColor,
        "padding": panelDefaultValue.padding,
        "margin": panelDefaultValue.margin,
        "cols": [
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "50%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          },
          {
            "colKey": getNewColKey(),// "colKey_1425098330",
            "width": "50%",
            "padding": panelDefaultValue.padding,
            "margin": panelDefaultValue.margin,
            "widgetType": "rows",
            bBaseCol: true,
            "borderWidth": "1px",
            "borderColor": panelDefaultValue.borderColor,
            "backgroundColor": "",
            "widgetValue": [{
              "rowKey": getNewRowKey(),
              "height": 0,
              "backgroundColor": "",
              "backgroundImage": "",
              "borderWidth": panelDefaultValue.borderWidth,
              "borderColor": panelDefaultValue.borderColor,
              "padding": panelDefaultValue.padding,
              "margin": panelDefaultValue.margin,
              "cols": [{
                "colKey": getNewColKey(),
                "widgetType": "none",
                "width": "100%",
                "backgroundColor": "",
                "backgroundImage": "",
                "borderWidth": panelDefaultValue.borderWidth,
                "borderColor": panelDefaultValue.borderColor,
                "padding": panelDefaultValue.padding,
                "margin": panelDefaultValue.margin
              }]
            }]
          }
        ]
      }]
    }
  };

  // temp1 = reCalcTemplate2Height2AndRowsHeight(temp1);
  temps.push(temp1);
  // temp2 = reCalcTemplate2Height2AndRowsHeight(temp2);
  temps.push(temp2);

  return temps;
}

// export function reCalcTemplate2Height2AndRowsHeight(editPanel) {

// let rows = editPanel.panelLayOutConfig.rows;
// let height2 = 0;
// let fRatio = 0;
// rows.forEach((ele) => {
// height2 = height2 + Number(ele.height2);
// });
// editPanel.height2 = height2;
// for (var i = 0; i < rows.length; i++) {
// let ele = rows[i];
// if (i != rows.length - 1) {
// let ratio = Math.floor(ele.height2 / height2 * 10000);
// ratio = ratio / 100;
// fRatio = ratio + fRatio;
// ele.height = ratio + "%";
// }
// else {
// ele.height = Number(100 - fRatio) + "%";
// }
// }

// }

//桌面看板
// export function getPanelLayOutTemplate2() {
// let row1 = getPanelLayOutTemplateRow2(0.5);
// let row2 = getPanelLayOutTemplateRow2(0.5);
// let rows = [];
// rows.push(row1);
// rows.push(row2);
// let temp = {
// id: -1,
// icon: "zidingyifangan",
// title: "桌面大屏看板",
// name: "",
// height2: 0,
// templateName: "桌面大屏看板",
// templateType: "0",// 0 空白模板 1 系统预置模板
// splitCounter: 0,
// createTime: "",
// version: "1.0",
// templateKey: "templateKey_4",
// curChartKey: "",
// type: "2",//大屏看板 = 1 桌面看板 = 2
// backgroundColor: '',//#f2efee
// backgroundImage: "", //空
// borderWidth: "0px",
// borderColor: panelDefaultValue.borderColor,//'red',
// padding: "0px",
// margin: "0px",
// "backStyleKey": "",
// "backColorKey": "",
// skinKey_BackStyle: "",
// skinKey_BackColor: "",
// // panelWidthScale: 16,
// // panelHeightScale: 9,
// panelLayOutConfig: {
// rows: rows
// }
// };
// reCalcTemplate2Height2AndRowsHeight(temp);
// return temp;
// }

// export function getPanelLayOutTemplateRow2(height2) {
// let row = {
// rowKey: getNewRowKey(),// "001",
// height: "0%",
// height2: height2,
// backgroundColor: '',
// backgroundImage: "",
// borderWidth: panelDefaultValue.borderWidth,
// borderColor: panelDefaultValue.borderColor,
// padding: panelDefaultValue.padding,
// margin: panelDefaultValue.margin,
// cols:
// [
// {
// colKey: getNewColKey(),// "001",
// widgetType: "none",
// width: '100%',
// backgroundColor: '',
// backgroundImage: "",
// borderWidth: panelDefaultValue.borderWidth,
// borderColor: panelDefaultValue.borderColor,
// padding: panelDefaultValue.padding,
// margin: panelDefaultValue.margin,
// }
// ]
// }
// return row;
// }

export function getBackStyleArr(key) {
  // 1 主背景 // 2 标题背景 // 3 图形背景 // 4 汇总背景F
  let arr = [];
  arr.push({ backStyleKey: "backStyle_1", className: "backStyle_1", skinKey: "skinKey_1", name: "神秘黑色", backgroundImage: "http://yxy-lsy.oss-cn-beijing.aliyuncs.com/b7ea3a9e-9f3a-466e-b4b0-67bea04fe626.png", icon: "http://yxy-lsy.oss-cn-beijing.aliyuncs.com/10feb3d6-754d-43db-a072-28e691c0ab9c.png" });
  arr.push({ backStyleKey: "backStyle_2", className: "backStyle_2", skinKey: "skinKey_1", name: "科技蓝色", backgroundImage: "http://yxy-lsy.oss-cn-beijing.aliyuncs.com/3927e832-affe-40f5-a62b-2f05958088aa.png", icon: "http://yxy-lsy.oss-cn-beijing.aliyuncs.com/c980df8e-62ae-4a4a-b102-ed2376185e78.png" });
  if (key)
    return _.find(arr, function (o) { return o.backStyleKey == key });
  else
    return arr;
}


export function getBackColorArr(key) {
  // 1 主背景 // 2 标题背景 // 3 图形背景 // 4 汇总背景F
  // ["#0B0E26", "#08306B", "#F2F3F5"]
  let arr = [];
  arr.push({ backColorKey: "backColor_1", className: "backStyle_1", color: "#0B0E26", skinKey: "skinKey_1" });
  arr.push({ backColorKey: "backColor_2", className: "backStyle_2", color: "#08306B", skinKey: "skinKey_1" });
  arr.push({ backColorKey: "backColor_3", className: "", color: "#F2F3F5", skinKey: "skinKey_2" });
  if (key)
    return _.find(arr, function (o) { return o.backColorKey == key });
  else
    return arr;
}


export function getSkinArr(skinKey) {
  // 1 主背景 // 2 标题背景 // 3 图形背景 // 4 汇总背景F
  let arr = [];
  let arr1 = {
    skinKey: "skinKey_1",//适用于深色背景
    skinClassNameFlag: "eChartSkin-1",
    designSkin:
      {
        textColor: "#FFFFFF"
      },
    displaySkin:
      {
        textColor: "#FFFFFF",
        textColor2: "#FFFFFF",
        labelLineColor: "#999999",
        axisLineColor: "#20385E",
        splitLineColor: "#20385E",
        chartSum_NumColor: "#FED600",
        scatterChart_LabelEmphasisColor: "#FFFFFF",
        scatterChart_ItemStyleEmphasisOpacity: 0.5
      }
  };

  let arr2 = {
    skinKey: "skinKey_2",//适用于浅色背景
    skinClassNameFlag: "eChartSkin-2",
    designSkin:
      {
        textColor: "#333333"
      },
    displaySkin:
      {
        textColor: "#333333",
        textColor2: "#666666",//列表列标题，以及汇总的标题
        labelLineColor: "#CCCCCC",
        axisLineColor: "#E4E4E4",
        splitLineColor: "#E4E4E4",
        chartSum_NumColor: "#F36627",
        scatterChart_LabelEmphasisColor: "#333",
        scatterChart_ItemStyleEmphasisOpacity: 0.85
      }
  };
  // let arr1 = {
  // skinKey: "skinKey_1",
  // designSkin:
  // {
  // textColor: "red"
  // },
  // displaySkin:
  // {
  // textColor: "red",
  // textColor2: "green",
  // labelLineColor: "blue"
  // }
  // };

  // let arr2 = {
  // skinKey: "skinKey_2",
  // designSkin:
  // {
  // textColor: "green"
  // },
  // displaySkin:
  // {
  // textColor: "green",
  // textColor2: "green",
  // labelLineColor: "green"
  // }
  // };
  arr.push(arr1);
  arr.push(arr2);

  if (skinKey) {
    return _.find(arr, function (o) { return o.skinKey == skinKey });
  }
  else {
    return arr;
  }
}

export function restoreEditPanel(pageLayout, items, editType, reportViewId) {
  let editPanel = JSON.parse(pageLayout);
  if (editType == "edit") {
    //如果复制模板，会导致pageLayout里面的id和外面的ID不一致，在此修改一下
    if (reportViewId && editPanel.id != reportViewId) {
      editPanel.id = reportViewId;
    }
  }
  else if (editType == "query") {
  }
  else {
    editPanel.id = -1;
  }
  restoreEditPanelRows(editPanel.panelLayOutConfig.rows, items);
  return editPanel;
}

export function restoreEditPanelRows(rows, items) {

  rows.forEach(rowEle => {
    rowEle.cols.forEach(colEle => {
      let config;
      let item;
      if (colEle.widgetType == "sum" || colEle.widgetType == "chart") {
        if (colEle.widgetType == "sum")
          config = colEle.sumConfig;
        else
          config = colEle.panelChartConfig;

        item = _.find(items, function (o) { return o.itemKey == config.chartKey });
        config.condition = JSON.parse(item.condition);
        //根据模板给不同租户升级的时候，同一个billnum对应的filterId，groupSchemaId，solutionId等会不一样
        //暂时注销，0719后面的迭代再发布
        config.filterId = item.filtersId;
        config.groupSchemaId = item.groupSchemaId;
        config.solutionId = item.solutionId;
      }
      else if (colEle.widgetType == "rows") {
        restoreEditPanelRows(colEle.widgetValue, items);
      }
    });
  });
}


export function trimCondition(queryParams) {
  let param = _.cloneDeep(queryParams);
  LogChartInfo("eChartCommon 更新过滤条件，去除里面的空值 before param = ", JSON.stringify(param), 900)
  let commonVOs = _.get(param, "condition.commonVOs");
  if (commonVOs && commonVOs.length > 0) {
    for (var i = commonVOs.length - 1; i >= 0; i--) {
      let item = commonVOs[i];
      if (item.hasOwnProperty("value1") == false) {
        commonVOs.splice(i, 1);
      }
      else if (item.value1 === null) {
        commonVOs.splice(i, 1);
      }
      else if (item.value1 === undefined) {
        commonVOs.splice(i, 1);
      }
      else if (item.value1 === "") {
        commonVOs.splice(i, 1);
      }
    }
  }
  LogChartInfo("eChartCommon 更新过滤条件，去除里面的空值 after param = ", JSON.stringify(param), 900)
  return param;
}

export function subConfig_Get(eChart, chartKey, bAdd) {

  let tmpItem;
  let subChartConfigArr = _.get(eChart, "eChartConfig.subChartConfigArr");
  let bHasArr = subChartConfigArr && subChartConfigArr.length > 0;
  if (bHasArr) {
    subChartConfigArr.forEach(
      item => {
        if (item.chartKey == chartKey)
          tmpItem = item;
      }
    );
  }
  // if (_.isEmpty(tmpItem) && !(bAdd == true && bHasArr == false)) {
  if (_.isEmpty(tmpItem) && bAdd == false) {
    LogChartInfo("subConfig_Get 没有找到对应的eChart  chartKey =" + chartKey + " eChart=  ", JSON.stringify(eChart), 999)
  }
  return tmpItem;
}

export function subConfigArray_Operate(eChart, chartKey, newConfig, operate) {
  let subChartConfigArr = _.get(eChart, "eChartConfig.subChartConfigArr");
  if (operate == "add") {
    subChartConfigArr.push(newConfig);
  }
  else if (operate == "mod") {
    let tmpIndex = -1;
    if (subChartConfigArr && subChartConfigArr.length > 0) {
      subChartConfigArr.forEach(
        (item, index) => {
          if (item.chartKey == chartKey)
            tmpIndex = index;
        }
      );
    }
    if (tmpIndex >= 0) {
      subChartConfigArr[tmpIndex] = newConfig;
      return true;
    }
    else {
      LogChartInfo("subConfigArray_Operate  没有找到对应的eChart  chartKey =" + chartKey + " eChart=  ", JSON.stringify(eChart), 999)
      return false;
    }
  }
  else if (operate == "del") {
    if (chartKey) {
      _.remove(subChartConfigArr, function (o) {
        return o.chartKey == chartKey;
      });
    }
    else {//如果为空，则删除最后一个
      subChartConfigArr.pop();
    }
  }
}

export function getColHeight(chartDisplayType, panelType, subChartColNum, width) {
  let height = "auto";
  if (chartDisplayType == "rpt") {

    if (subChartColNum == 1)
      height = 350;
    else if (subChartColNum == 2)
      height = 280;
    else if (subChartColNum == 3)
      height = 210;
    else if (subChartColNum == 4)
      height = 175;
    else if (subChartColNum == 5)
      height = 140;
  }
  else if (chartDisplayType == "mobile") {
    if (width == 0) {
      height = "auto";
    }
    else {
      if (subChartColNum == 1)
        height = width * 0.4;
      else if (subChartColNum == 2)
        height = width * 0.35;
      else if (subChartColNum == 3)
        height = width * 0.3;
      else if (subChartColNum == 4)
        height = width * 0.25;
      else if (subChartColNum == 5)
        height = width * 0.2;
      height = height * 1.5;
    }
  }
  else if (chartDisplayType == "panel") {
    if (panelType == 2) {
      if (width == 0) {
        height = "auto";
      }
      else {
        if (subChartColNum == 1)
          height = width * 0.4;
        else if (subChartColNum == 2)
          height = width * 0.35;
        else if (subChartColNum == 3)
          height = width * 0.3;
        else if (subChartColNum == 4)
          height = width * 0.25;
        else if (subChartColNum == 5)
          height = width * 0.2;
      }
    }
    else if (panelType == 3) {
      if (width == 0) {
        height = "auto";
      }
      else {
        if (subChartColNum == 1)
          height = width * 0.4;
        else if (subChartColNum == 2)
          height = width * 0.35;
        else if (subChartColNum == 3)
          height = width * 0.3;
        else if (subChartColNum == 4)
          height = width * 0.25;
        else if (subChartColNum == 5)
          height = width * 0.2;
        height = height * 2;
      }
    }
  }
  return height;
}
