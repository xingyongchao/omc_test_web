'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lineChart = require('../options/lineChart');

var lineChart = _interopRequireWildcard(_lineChart);

var _barChart = require('../options/barChart');

var barChart = _interopRequireWildcard(_barChart);

var _pieChart = require('../options/pieChart');

var pieChart = _interopRequireWildcard(_pieChart);

var _rankTableChart_Mobile = require('../options/rankTableChart_Mobile');

var rankTableChart = _interopRequireWildcard(_rankTableChart_Mobile);

var _pieChart_SingleValue = require('../options/pieChart_SingleValue');

var pieChart_SingleValue = _interopRequireWildcard(_pieChart_SingleValue);

var _scatterChart = require('../options/scatterChart');

var scatterChart = _interopRequireWildcard(_scatterChart);

var _barlineChart = require('../options/barlineChart');

var barlineChart = _interopRequireWildcard(_barlineChart);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _formatDate = require('../../../helpers/formatDate');

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Icon } from 'antd';

// import ReactEcharts from '../../AsyncComponents/AsyncEchartsForReact';


// let ReactEcharts = null;
var echarts = require('echarts/lib/echarts');

var EChartDisplay_Mobile = function (_Component) {
  _inherits(EChartDisplay_Mobile, _Component);

  function EChartDisplay_Mobile(props) {
    _classCallCheck(this, EChartDisplay_Mobile);

    eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart constructor", "", 900);

    // ReactEcharts = require('../../AsyncComponents/AsyncEchartsForReact').default;

    var _this = _possibleConstructorReturn(this, (EChartDisplay_Mobile.__proto__ || Object.getPrototypeOf(EChartDisplay_Mobile)).call(this, props));

    _this.isInPanel = function () {
      return _this.state.chartDisplayType == "panel";
    };

    _this.isInMobile = function () {
      return _this.state.chartDisplayType == "mobile";
    };

    _this.serieNum = Math.random();
    _this.bUpdated = false;
    _this.chinaMapTreeData = null; //参照所需要的省市县数据
    _this.scatterData = {
      option: {},
      regionInfo: {}
    };
    _this.regionRegistering = [];
    _this.regionRegistered = [];

    if (_this.props.chartDisplayType == "mobile") {
      //移动报表
      var eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(_this.props.eChartConfig);
      _this.state = {
        eChartConfig: eChartConfig,
        subChartConfigArr: eChartCommon.upgradeConfig_ForScatter_Batch(eChartConfig.subChartConfigArr),
        // subChartColNum: eChartConfig.subChartColNum || 1,
        subChartColNum: 1,
        chartDisplayType: _this.props.chartDisplayType,
        billnum: _this.props.billnum,
        groupSchemaId: _this.props.groupSchemaId,
        condition: _this.props.condition || null,
        bMounted: false,
        firstQueryDone: _this.props.firstQueryDone || false
      };
      _this.getData();
    } else {
      var panelChartConfig = _this.props.panelChartConfig;
      _this.state = {
        eChartConfig: null,
        subChartConfigArr: [],
        // subChartColNum: panelChartConfig.subChartColNum || 1,
        subChartColNum: 1,
        chartDisplayType: _this.props.chartDisplayType,
        panelType: _this.props.panelType,
        panelChartConfig: panelChartConfig,
        isInDesign: _this.props.isInDesign || false,
        billnum: panelChartConfig.billnum,
        groupSchemaId: panelChartConfig.groupSchemaId,
        condition: panelChartConfig.condition,
        bMounted: false,
        firstQueryDone: true
      };
    }
    return _this;
  }

  _createClass(EChartDisplay_Mobile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.viewModel) {
        this.props.viewModel.on("filterClick", function (params) {
          // this.setState({ condition: params.condition });
          _this2.state.condition = params.condition;
          _this2.getData();
        });
      }
      if (this.state.chartDisplayType == "mobile") {
        this.props.viewModel.on('firstQueryDone', function (params) {
          if (!!params) _this2.state.firstQueryDone = params;
          // this.setState({ firstQueryDone: params });
        });
      }
      this.state.bMounted = true;
      if (this.state.panelType == 3) {
        this.getConfig();
      }
      //
      // this.setState({ bMounted: true });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {

      var bFlag = void 0;
      if (this.state.panelType == 3) {
        if (_lodash2.default.isEqual(nextState, this.state) == false) {
          bFlag = true;
        } else {
          bFlag = false;
        }
      } else {
        bFlag = true;
      }
      eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart shouldComponentUpdate return ", bFlag, 900);
      return bFlag;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart componentWillReceiveProps", "", 900);
      if (this.state.panelType == 3) {
        if (_lodash2.default.isEqual(nextProps.panelChartConfig, this.state.panelChartConfig) == false) {
          var panelChartConfig = nextProps.panelChartConfig;
          this.state.panelChartConfig = panelChartConfig;
          this.state.billnum = panelChartConfig.billnum;
          this.state.groupSchemaId = panelChartConfig.groupSchemaId;
          this.state.condition = panelChartConfig.condition;
          this.state.subChartConfigArr = [];
          // this.state.subChartColNum = panelChartConfig.subChartColNum;
          this.state.subChartColNum = 1;
          this.getConfig();
        }
      } else {
        if (_lodash2.default.isEqual(nextProps.groupSchemaId, this.props.groupSchemaId) == false) {
          this.scatterData = {
            option: {},
            regionInfo: {}
          };
        }
        if (_lodash2.default.isEqual(nextProps.billnum, this.props.billnum) == false || _lodash2.default.isEqual(nextProps.groupSchemaId, this.props.groupSchemaId) == false || _lodash2.default.isEqual(nextProps.eChartConfig, this.props.eChartConfig) == false
        // || _.isEqual(nextProps.condition, this.props.condition) == false
        ) {
            this.state.billnum = nextProps.billnum;
            this.state.groupSchemaId = nextProps.groupSchemaId;
            this.state.eChartConfig = nextProps.eChartConfig ? eChartCommon.upgradeConfig_ForEChartArr(nextProps.eChartConfig) : this.state.eChartConfig;
            this.state.data = undefined;
            // this.state.condition = nextProps.condition;
            this.getData();
          }
      }
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this3 = this;

      if (this.state.firstQueryDone == false) return;
      var self = this;
      // if (this.isInPanel()) {
      var subChartConfigArr = this.state.subChartConfigArr;
      if (subChartConfigArr && subChartConfigArr.length > 0) {
        subChartConfigArr.forEach(function (config, index) {
          config.data = undefined;
          _this3.getSubChartData(config, index);
        });
      }
      // }
      // else {
      //   let config = this.state.config;
      //   this.getSubChartData(this.state.config, -1);
      // }
    }
  }, {
    key: 'getSubChartData',
    value: function getSubChartData(config, index) {
      var self = this;
      var queryParams = {
        billnum: this.state.billnum,
        groupSchemaId: this.state.groupSchemaId,
        condition: this.state.condition
      };

      var dataParams = [];
      var dimensionX = _lodash2.default.get(config, "yySetting.dataField.dimensionX");
      var dimensionSub = _lodash2.default.get(config, "yySetting.dataField.dimensionSub");
      var measure = _lodash2.default.get(config, "yySetting.dataField.measure");
      var topn = _lodash2.default.get(config, "yySetting.orderInfo.bUseDimensionXRows") ? _lodash2.default.get(config, "yySetting.orderInfo.dimensionXRows") : _lodash2.default.get(config, "yySetting.orderInfo.dimensionSubRows");
      var orderField = _lodash2.default.get(config, "yySetting.orderInfo.orderField");
      var topnOrderBy = _lodash2.default.get(config, "yySetting.orderInfo.orderBy");
      var LngAndLat = _lodash2.default.get(config, "yySetting.dataField.LngAndLat");
      if (dimensionX && dimensionX.length > 0) {
        dimensionX.forEach(function (eleItem) {
          var ele = {};
          ele.fieldname = eleItem.nameField;
          ele.groupType = eleItem.groupType;
          ele.depends = eleItem.depends;
          // if (dataParams.length == dimensionX.length - 1)
          ele.topn = topn;
          dataParams.push(ele);
        });
      }
      ;
      if (dimensionSub && dimensionSub.length > 0) {
        dimensionSub.forEach(function (eleItem) {
          var ele = {};
          ele.fieldname = eleItem.nameField;
          ele.groupType = eleItem.groupType;
          ele.depends = eleItem.depends;
          dataParams.push(ele);
        });
      }
      ;
      if (measure && measure.length > 0) {
        measure.forEach(function (eleItem) {
          var ele = {};
          ele.fieldname = eleItem.valueField;
          ele.groupType = eleItem.groupType;
          ele.depends = eleItem.depends;
          if (ele.fieldname == orderField) {
            ele.topnOrderBy = topnOrderBy;
          }
          dataParams.push(ele);
        });
      }
      if (LngAndLat && LngAndLat.longitude) {
        dataParams.push({ fieldname: LngAndLat.longitude.longitudeField, groupType: 3 });
        dataParams.push({ fieldname: LngAndLat.latitude.latitudeField, groupType: 3 });
      };
      queryParams.data = JSON.stringify(dataParams);
      var callback = function callback(json) {
        if (json.code === 200) {
          var data = json.data.recordList;
          // if (index >= 0) {
          config.data = data;
          self.forceUpdate();
          // }
          // else {
          //   self.setState({ data });
          // }
        } else {
          eChartCommon.LogChartInfo("获取图形报表数据Err  查询参数 =" + JSON.stringify(queryParams) + "  errMsg  ", json.message, 999);
        }
      };
      eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_lodash2.default.cloneDeep(queryParams)), callback);
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      var _this4 = this;

      var param = { billnum: this.state.billnum, groupSchemaId: this.state.groupSchemaId };
      var callback = function callback(json) {
        if (json.code === 200) {
          if (json.data) {
            if (json.data.isCrossTable == false && (json.data.displayStyle == 2 || json.data.displayStyle == 3)) {
              if (_lodash2.default.isEmpty(json.data.chartConfig) == false) {
                var eChartConfig = JSON.parse(json.data.chartConfig);
                _this4.state.eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(eChartConfig);
                _this4.state.subChartConfigArr = eChartCommon.upgradeConfig_ForScatter_Batch(eChartConfig.subChartConfigArr);
                _this4.getData();
              }
            }
          }
        }
      };
      eChartProxy.doProxy(eChartProxy.url.getGroupSetting, 'GET', param, callback);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      eChartCommon.LogChartInfo("EChartDisplay_Mobile CheckChart Render", "", 900);
      var self = this;
      var obj = undefined;
      var colArr = [];
      var subChartConfigArr = this.state.subChartConfigArr;
      if (self.isInPanel() == true && !subChartConfigArr || self.isInMobile() == true && (!subChartConfigArr || this.state.firstQueryDone == false)) {
        return _react2.default.createElement(
          'div',
          { id: self.getOutId(), style: { width: "100%", height: "250" } },
          _react2.default.createElement(
            'div',
            { className: 'eChartMobile-nodata' },
            self.state.panelType == 3 ? "" : _react2.default.createElement(_SvgIcon2.default, { type: 'huanxingtu' }),
            self.state.panelType == 3 ? "" : _react2.default.createElement(
              'div',
              { className: 'eChartMobile-nodata-text' },
              '\u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~'
            )
          )
        );
      } else {
        if (self.isInMobile()) {
          var height = this.getColHeightInMobile();

          if (subChartConfigArr && subChartConfigArr.length > 0) {
            subChartConfigArr.forEach(function (ele, index) {
              var tmpObj = _this5.getSubChartRender(ele, ele.data, height);
              colArr.push(_react2.default.createElement(
                _col2.default,
                { span: 1, style: { height: "auto", float: "left" } },
                tmpObj
              ));
            });
          }
          return _react2.default.createElement(
            _row2.default,
            {
              colCount: this.state.subChartColNum,
              id: self.getOutId()
              // style={self.getPanelSizeStyle()}
              , style: { width: "100%", height: "100%" }
            },
            colArr
          );
        } else if (this.isInPanel()) {
          var _height = this.getColHeightInMobile();
          if (subChartConfigArr && subChartConfigArr.length > 0) {
            subChartConfigArr.forEach(function (ele, index) {
              var tmpObj = _this5.getSubChartRender(ele, ele.data, _height);
              colArr.push(_react2.default.createElement(
                _col2.default,
                { span: 1, style: { height: "auto" } },
                tmpObj
              ));
            });
          }
          return _react2.default.createElement(
            _row2.default,
            {
              colCount: this.state.subChartColNum,
              id: self.getOutId()
              // style={self.getPanelSizeStyle()}
              , style: { width: "100%" }
            },
            colArr
          );
        }
      }
    }
  }, {
    key: 'getSubChartRender',
    value: function getSubChartRender(initConfig, initData, colHeight) {
      if (!initData) {
        return _react2.default.createElement(
          'div',
          { className: 'eChart-nodata' },
          '\u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~'
        );
      } else {
        var config = _lodash2.default.cloneDeep(initConfig);
        var data = _lodash2.default.cloneDeep(initData);
        var yySetting = config.yySetting;
        var chartType = yySetting.type || "bar";
        var self = this;
        var option = config.eChartSetting;
        var unionedData = eChartCommon.UnionDimensionName(yySetting, data);
        if (chartType == "bar") {
          option = barChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
        } else if (chartType == "line") {
          option = lineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
        } else if (chartType == "pie") {
          var isSingleValue = yySetting.isSingleValue;
          if (isSingleValue) option = pieChart_SingleValue.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);else option = pieChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
        } else if (chartType == "scatter") {
          option = scatterChart.setOption(self.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
          if (_lodash2.default.isEmpty(self.scatterData.regionInfo)) {
            self.scatterData.regionInfo = yySetting.regionInfo;
          }
          option.geo.map = self.scatterData.regionInfo.geoName;
          self.scatterData.option = option;
          self.importMap(self.scatterData.regionInfo);
        } else if (chartType == "barline") {
          option = barlineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.state.panelType);
        }
        var saveAsImage = _lodash2.default.get(option, "toolbox.feature.saveAsImage");
        if (_lodash2.default.isEmpty(saveAsImage) == false) delete option.toolbox.feature.saveAsImage;
        self.calcAddLength(option);
        return _react2.default.createElement(
          'div',
          {
            style: self.state.subChartColNum == 1 ? self.getEChartSizeStyle(option, chartType) : { width: "100%", height: colHeight + "px" }
            // style={{ width: "100%", height: colHeight + "px" }}
            , className: "echarts eChartMobile" + (self.state.panelType == 3 ? "3" : "") + " echarts" + (self.state.panelType == 3 ? "3" : "") + "_type_" + chartType },
          _react2.default.createElement(_echartsForReact2.default, {
            option: option,
            notMerge: true,
            lazyUpdate: true,
            style: self.state.subChartColNum == 1 ? self.getEChartSizeStyle(option, chartType, true) : { height: colHeight + "px" }
            // style={self.getEChartSizeStyle(option, chartType, true)}
            , onEvents: {
              "click": function click(params, curChart) {
                return self.onChartClick(params, curChart);
              }
            }
          })
        );
      }
    }
  }, {
    key: 'calcAddLength',
    value: function calcAddLength(option) {
      var length = 0;
      if (option.addLengthInfo) {
        length = (option.addLengthInfo.charLength - 1) * Math.sin(option.addLengthInfo.rotate * 0.017453293); // 必需。一个以弧度表示的角。将角度乘以 0.017453293 （2PI/360）即可转换为弧度。
        length = length * 10; //字符高度
      }
      _lodash2.default.set(option, "addLengthInfo.addLength", length);
    }
  }, {
    key: 'getColHeightInMobile',
    value: function getColHeightInMobile() {
      // let chartType = _.get(this.state.config, "yySetting.type");
      var height = "auto";
      if (this.state.bMounted == false) {
        height = "auto";
      } else {
        var divEle = document.getElementById(this.getOutId());
        if (divEle) {
          var width = divEle.clientWidth;
          if (width == 0) {
            height = "auto";
          } else {
            height = eChartCommon.getColHeight(this.state.chartDisplayType, this.state.panelType, this.state.subChartColNum, width);
          }
        }
      }
      return height;
    }
  }, {
    key: 'getEChartSizeStyle',
    value: function getEChartSizeStyle(option, chartType, onlyHeight) {

      var RotateAddLength = 0;
      if (option && option.addLengthInfo) {
        RotateAddLength = option.addLengthInfo.addLength;
        eChartCommon.LogChartInfo("图形报表 因为x轴坐标信息倾斜需要增加的高度 ", RotateAddLength, 900);
        // delete option.RotateAddLength;
      } else {}
      if (this.state.bMounted == false || !chartType) {
        return { width: "100%", height: "auto" };
      } else {
        var divEle = document.getElementById(this.getOutId());
        var width = 100;
        if (divEle) {
          width = divEle.clientWidth;
        } else if (this.state.panelType == 3) {
          if (onlyHeight) return { height: "auto" };else return { width: "100%", height: "auto" };
        } else if (window) {
          width = window.innerWidth;
        }
        var height = width * 0.8;
        if (width == 0) {
          width = "100%";
          height = "auto";
        } else if (chartType == "bar") {
          height = width * 0.8 + RotateAddLength;
        } else if (chartType == "line") {
          height = width * 0.8 + RotateAddLength;
        } else if (chartType == "pie") {
          if (this.state.panelType == 3) height = width * 0.8;else height = width * 0.95;
        } else if (chartType == "scatter") {
          if (this.state.panelType == 3) height = width * 0.8;else height = width * 0.9;
        } else if (chartType == "barline") {
          height = width * 0.8 + RotateAddLength;
        }
        if (chartType == "ranktable") {
          height = undefined;
        }
        if (onlyHeight) return { height: height };else return { width: width, height: height };
      }
    }
  }, {
    key: 'getOutId',
    value: function getOutId() {
      // let chartKey = _.get(this.state.panelChartConfig, "chartKey")
      // if (chartKey)
      // return "eChartDiv_" + this.state.panelChartConfig.chartKey;
      // else
      return "eChartDiv_" + this.serieNum;
    }
  }, {
    key: 'importMap',
    value: function importMap(regionInfo, callback2, callback3) {
      // // 最初解决方式
      // require('echarts/map/js/' + (importKey == "china" ? "" : "province/") + importKey + '.js');
      // // 修改后解决方式
      var self = this;
      if (self.regionRegistered.indexOf(regionInfo.region) >= 0) {
        if (callback2) {
          callback2();
        }
        return;
      } else if (self.regionRegistering.indexOf(regionInfo.region) >= 0) {
        return;
      } else {
        self.regionRegistering.push(regionInfo.region);
        if (regionInfo) {
          var region = regionInfo.region;
          var parent = regionInfo.parent;
          var params = {};
          var subUrl = 'china.json';
          if (parent == "0") //中国
            {
              subUrl = 'china.json';
            } else if (parent == "100000") //省+直辖市
            {
              var ele = eChartCommon.getMapProvinceArr("", regionInfo.shortName);
              if (ele) {
                subUrl = 'province/' + ele.importKey + '.json';
              }
            } else //其他
            {
              subUrl = 'citys/' + region + '.json';
            }
          params.subUrl = subUrl;
          var callback = function callback(data) {
            if (data.code == 200 && !data.data.code) {
              eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息正确 return ", JSON.stringify(data), 16);
              echarts.registerMap(regionInfo.geoName, data.data);
              self.regionRegistered.push(regionInfo.region);
              setTimeout(function () {
                if (self.bUpdated == false) {
                  self.bUpdated = true;
                  self.forceUpdate();
                }
                if (callback2) {
                  callback2();
                }
              }, 1);
            } else {
              var errInfo = data.message || data.data.message || "无明确信息";
              eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息不正确 errInfo = " + errInfo + "regionInfo = " + JSON.stringify(regionInfo) + " return ", JSON.stringify(data), 999);
              if (callback3) {
                callback3();
              }
            }
          };
          eChartProxy.doProxy('getMap', 'GET', params, callback);
        }
      }
    }
  }, {
    key: 'getRegion',
    value: function getRegion(regionArr, fatherId, childName) {
      var self = this;
      var child = void 0;
      regionArr.forEach(function (ele) {
        if (ele.id == fatherId) {
          if (ele.children) {
            ele.children.forEach(function (ele2) {
              if (ele2.name == childName || ele2.shortname == childName) child = child || ele2;
            });
          }
        } else {
          if (ele.children) {
            var tmp = self.getRegion(ele.children, fatherId, childName);
            child = child || tmp;
          }
        }
      });
      return child;
    }
  }, {
    key: 'goBackToSettingArea',
    value: function goBackToSettingArea(self, curChart) {

      var callback = function callback() {
        var config = self.state.config;
        self.scatterData.regionInfo = _lodash2.default.cloneDeep(config.yySetting.regionInfo);
        self.scatterData.option.geo.map = self.scatterData.regionInfo.geoName;
        curChart.setOption(self.scatterData.option, true);
      };
      return callback;
    }
  }, {
    key: 'setNewMap',
    value: function setNewMap(chinaMapTreeData, params, curChart) {
      var self = this;
      eChartCommon.LogChartInfo("----------- 点击事件 选择区域 params.name = " + params.name + " 当前regionInfo ", JSON.stringify(self.scatterData.regionInfo), 900);
      var selectRegion = self.getRegion(chinaMapTreeData, self.scatterData.regionInfo.region, params.name);
      var tmpRegionInfo = {};
      if (selectRegion && _lodash2.default.isEmpty(selectRegion) == false) {
        var _tmpRegionInfo = {};
        _tmpRegionInfo.region = selectRegion.id;
        _tmpRegionInfo.shortName = selectRegion.shortname;
        _tmpRegionInfo.parent = selectRegion.parent;
        _tmpRegionInfo.geoName = _tmpRegionInfo.shortName + _tmpRegionInfo.region;
        var callback = function callback() {
          self.scatterData.regionInfo = _tmpRegionInfo;
          self.scatterData.option.geo.map = self.scatterData.regionInfo.geoName;
          eChartCommon.LogChartInfo("-----------点击事件 scatterData ", JSON.stringify(self.scatterData), 16);
          curChart.setOption(self.scatterData.option, true);
        };
        self.importMap(_tmpRegionInfo, callback, self.goBackToSettingArea(self, curChart));
      } else {
        self.goBackToSettingArea(self, curChart)();
      }
    }
  }, {
    key: 'onChartClick',
    value: function onChartClick(params, curChart) {
      return;
      // let self = this;
      // if (this.state.config.yySetting.type == "scatter") {
      // if (self.chinaMapTreeData) {
      // self.setNewMap(self.chinaMapTreeData, params, curChart);
      // }
      // else {
      // let callback = (json) => {
      // if (json.code === 200) {
      // self.chinaMapTreeData = json.data;
      // self.setNewMap(self.chinaMapTreeData, params, curChart);
      // }
      // }
      // eChartProxy.doProxy(eChartProxy.url.getAllregion, 'POST', {}, callback);
      // }
      // }
    }
  }]);

  return EChartDisplay_Mobile;
}(_react.Component);

exports.default = EChartDisplay_Mobile;