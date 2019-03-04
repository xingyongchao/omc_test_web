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

var _rankTableChart = require('../options/rankTableChart');

var rankTableChart = _interopRequireWildcard(_rankTableChart);

var _pieChart_SingleValue = require('../options/pieChart_SingleValue');

var pieChart_SingleValue = _interopRequireWildcard(_pieChart_SingleValue);

var _scatterChart = require('../options/scatterChart');

var scatterChart = _interopRequireWildcard(_scatterChart);

var _barlineChart = require('../options/barlineChart');

var barlineChart = _interopRequireWildcard(_barlineChart);

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _formatDate = require('../../../helpers/formatDate');

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var echarts = require('echarts/lib/echarts');

var EChartDisplay = function (_Component) {
  _inherits(EChartDisplay, _Component);

  function EChartDisplay(props) {
    _classCallCheck(this, EChartDisplay);

    eChartCommon.LogChartInfo("eChartDisplay constructor", "", 3);

    var _this = _possibleConstructorReturn(this, (EChartDisplay.__proto__ || Object.getPrototypeOf(EChartDisplay)).call(this, props));

    _this.onFilterClick = function (params) {
      _this.state.queryParams.condition = params.condition;
      _this.getData();
    };

    _this.isInPanel = function () {
      return _this.state.chartDisplayType == "panel";
    };

    _this.isInRpt = function () {
      return _this.state.chartDisplayType == "rpt";
    };

    var chartDisplayType = _this.props.chartDisplayType; // 展现方式 rpt 在报表中展现 panel 监控视图
    _this.serieNum = Math.random();
    if (chartDisplayType == "rpt") {
      var bPublished = _this.props.viewid ? true : false;
      var eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(_this.props.eChartConfig);
      _this.state = {
        eChartConfig: eChartConfig,
        subChartConfigArr: eChartCommon.upgradeConfig_ForScatter_Batch(eChartConfig.subChartConfigArr),
        subChartColNum: eChartConfig.subChartColNum || 1,
        queryParams: _this.props.queryParams,
        chartDisplayType: chartDisplayType,
        isInDesign: _this.props.isInDesign || false,
        bPublished: bPublished,
        firstQueryDone: _this.props.firstQueryDone || false
      };
      _this.getData();
    } else if (chartDisplayType == "panel") {
      var panelChartConfig = _this.props.panelChartConfig;
      var queryParams = {
        billnum: panelChartConfig.billnum,
        groupSchemaId: panelChartConfig.groupSchemaId,
        condition: panelChartConfig.condition
      };
      _this.state = {
        eChartConfig: null,
        subChartConfigArr: [],
        subChartColNum: panelChartConfig.subChartColNum || 1,
        queryParams: queryParams,
        chartDisplayType: chartDisplayType,
        isInDesign: _this.props.isInDesign || false,
        bShowFilter: panelChartConfig.bShowFilter,
        panelChartConfig: panelChartConfig
      };
      _this.panelType = _this.props.panelType || 1;
      _this.billName = panelChartConfig.billName;
      _this.groupSchemaName = panelChartConfig.groupSchemaName;
      _this.getConfig();
    }
    _this.state.renderTime = (0, _formatDate.Format)(new Date(), 'yyyy-MM-dd hh:mm:ss');
    _this.state.bMounted = false;
    _this.bUpdated = false;
    _this.chinaMapTreeData = null; //参照所需要的省市县数据
    _this.scatterData = { option: {}, regionInfo: {} };
    _this.regionRegistering = [];
    _this.regionRegistered = [];
    return _this;
  }

  _createClass(EChartDisplay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      eChartCommon.LogChartInfo("监控视图的图形报表 eChartDisplay componentDidMount", "", 2);
      if (this.isInRpt()) {
        this.props.viewModel.on('firstQueryDone', function (params) {
          _this2.state.firstQueryDone = params;
        });
        this.props.viewModel.on("filterClick", this.onFilterClick);
      } else if (this.isInPanel()) {
        this.props.viewModel.on('firstQueryDone', function (params) {
          _this2.state.firstQueryDone = params;
        });
        this.props.viewModel.on("filterClick", this.onFilterClick);
      }
      this.setState({ bMounted: true });
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      var _this3 = this;

      eChartCommon.LogChartInfo("监控视图的图形报表 getConfig", "", 2);
      var param = { billnum: this.state.queryParams.billnum, groupSchemaId: this.state.queryParams.groupSchemaId };
      var callback = function callback(json) {
        if (json.code === 200) {
          if (json.data) {
            eChartCommon.LogChartInfo("数据库 eChartConfig", json.data.chartConfig);
            if (json.data.isCrossTable == false && (json.data.displayStyle == 2 || json.data.displayStyle == 3)) {
              if (_lodash2.default.isEmpty(json.data.chartConfig) == false) {
                var eChartConfig = JSON.parse(json.data.chartConfig);
                _this3.state.eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(eChartConfig);
                _this3.state.subChartConfigArr = eChartCommon.upgradeConfig_ForScatter_Batch(_this3.state.eChartConfig.subChartConfigArr);
                _this3.getData();
              }
              return;
            }
          }
        }
      };
      eChartProxy.doProxy(eChartProxy.url.getGroupSetting, 'GET', param, callback);
    }
  }, {
    key: 'checkTimer',
    value: function checkTimer() {
      var self = this;
      if (self._timer == undefined && self.isInPanel() == true && self.panelType == 1) {
        var refreshInterval = self.state.panelChartConfig.refreshInterval;
        if (isNaN(refreshInterval)) return;
        refreshInterval = Number(refreshInterval);
        if (Number.isInteger(refreshInterval) == false) return;
        if (refreshInterval == 0) {
          eChartCommon.LogChartInfo("报表设置不自动刷新。 refreshInterval ", refreshInterval, 2);
          return;
        }
        if (refreshInterval < 5) {
          eChartCommon.LogChartInfo("报表设置的自动刷新间隔太短。 refreshInterval ", refreshInterval, 999);
          return;
        }
        eChartCommon.LogChartInfo("监控视图 设置自动刷新频率定时器 renderTime ", self.state.renderTime + "   panelChartConfig = " + JSON.stringify(self.state.panelChartConfig), 3);
        self._timer = setInterval(function () {
          if (self.props.showIt == true) {
            eChartCommon.LogChartInfo("监控视图自动定时刷新。 renderTime ", self.state.renderTime + "   panelChartConfig = " + JSON.stringify(self.state.panelChartConfig), 3);
            self.getData();
          }
        }, refreshInterval * 1000);
      }
    }
    // 真正显示时轮播时间

  }, {
    key: 'getData',
    value: function getData() {
      var _this4 = this;

      var self = this;
      var bGetData = this.props.chartDisplayType == "panel" || this.state.bPublished == true || this.state.firstQueryDone == true;
      if (bGetData == false) return;
      var subChartConfigArr = this.state.subChartConfigArr;
      if (subChartConfigArr && subChartConfigArr.length > 0) {
        subChartConfigArr.forEach(function (ele, index) {
          ele.data = undefined;
          _this4.getSubChartData(ele, index);
        });
      }
    }
  }, {
    key: 'getSubChartData',
    value: function getSubChartData(config, index) {
      var self = this;
      var queryParams = this.state.queryParams;
      var dataParams = [];
      if (queryParams && _lodash2.default.isEmpty(queryParams.condition) == false && config) {
        this.checkTimer();
        var dimensionX = _lodash2.default.get(config, "yySetting.dataField.dimensionX");
        var dimensionSub = _lodash2.default.get(config, "yySetting.dataField.dimensionSub");
        var measure = _lodash2.default.get(config, "yySetting.dataField.measure");
        var topn = _lodash2.default.get(config, "yySetting.orderInfo.bUseDimensionXRows") ? _lodash2.default.get(config, "yySetting.orderInfo.dimensionXRows") : _lodash2.default.get(config, "yySetting.orderInfo.dimensionSubRows");
        var orderField = _lodash2.default.get(config, "yySetting.orderInfo.orderField");
        var topnOrderBy = _lodash2.default.get(config, "yySetting.orderInfo.orderBy");
        var LngAndLat = _lodash2.default.get(config, "yySetting.dataField.LngAndLat");
        if (dimensionX && dimensionX.length > 0) {
          dimensionX.forEach(function (eleItem) {
            dataParams.push({
              fieldname: eleItem.nameField,
              groupType: eleItem.groupType,
              depends: eleItem.depends,
              topn: eleItem.topn
            });
          });
        };
        if (dimensionSub && dimensionSub.length > 0) {
          dimensionSub.forEach(function (eleItem) {
            dataParams.push({
              fieldname: eleItem.nameField,
              groupType: eleItem.groupType,
              depends: eleItem.depends
            });
          });
        };
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
            config.data = data;
            self.forceUpdate();
          } else {
            eChartCommon.LogChartInfo("获取图形报表数据Err  查询参数 =" + JSON.stringify(queryParams) + "  errMsg  ", json.message, 999);
          }
        };
        if (this.isInPanel() == true) {
          queryParams.isFromKanban = true;
        }
        eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_lodash2.default.cloneDeep(queryParams)), callback);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate Begin", "", 900);
      if (this.isInRpt()) {
        if (_lodash2.default.isEqual(nextProps.queryParams.billnum, this.state.queryParams.billnum) == false || _lodash2.default.isEqual(nextProps.queryParams.groupSchemaId, this.state.queryParams.groupSchemaId) == false || _lodash2.default.isEqual(nextProps.eChartConfig, this.props.eChartConfig) == false) {
          this.scatterData.regionInfo = {}; //可能用户在报表展示过程中，修改报表分组条件中气泡图的显示区域信息
          this.state.eChartConfig = eChartCommon.upgradeConfig_ForEChartArr(nextProps.eChartConfig);
          this.state.subChartConfigArr = this.state.eChartConfig.subChartConfigArr;
          this.state.subChartColNum = this.state.eChartConfig.subChartColNum;
          this.state.queryParams = nextProps.queryParams;
          this.getData();
          eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate  params changed End True", "", 900);
          return true;
        } else if (this.state.bPublished == false && _lodash2.default.isEqual(nextProps.queryParams.condition, this.props.queryParams.condition) == false) {
          this.state.queryParams = nextProps.queryParams;
          this.getData();
          eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate  查询条件 changed End True", "", 900);
          return true;
        } else {
          eChartCommon.LogChartInfo("eChartDisplay状态改变 shouldComponentUpdate  End false", "", 900);
          return false;
        }
      } else if (this.isInPanel()) {
        if (_lodash2.default.isEqual(this.state.eChartConfig, nextState.eChartConfig) == false || _lodash2.default.isEqual(this.state.queryParams, nextState.queryParams) == false) {
          this.state.eChartConfig = nextState.eChartConfig;
          this.state.queryParams = nextState.queryParams;
          this.getData();
        }
        return true;
      }
    }
  }, {
    key: 'getSubChartRender',
    value: function getSubChartRender(config, data) {
      var self = this;
      var yySetting = _lodash2.default.cloneDeep(config.yySetting);
      var chartType = yySetting.type || "bar";
      if (!data || data.length == 0) {
        return _react2.default.createElement(
          'div',
          { className: 'eChart-nodata', tooltip: true },
          '\u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~'
        );
      } else if (chartType == "ranktable") {
        var ranktable = rankTableChart.getRankTable(yySetting, data, self.isInPanel(), self.panelType, self.props.skinConfig);
        if (self.isInPanel()) {
          return { ranktable: ranktable };
        } else {
          return _react2.default.createElement(
            'div',
            { className: "echarts echarts_type_" + chartType },
            _react2.default.createElement(
              'div',
              { className: 'react_for_echarts' },
              ranktable
            )
          );
        }
      } else {
        var option = _lodash2.default.cloneDeep(config.eChartSetting);
        var unionedData = eChartCommon.UnionDimensionName(yySetting, data);
        if (chartType == "bar") {
          option = barChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
        } else if (chartType == "line") {
          option = lineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
        } else if (chartType == "pie") {
          var isSingleValue = yySetting.isSingleValue;
          if (isSingleValue) option = pieChart_SingleValue.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);else option = pieChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
        } else if (chartType == "scatter") {
          option = scatterChart.setOption(self.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
          if (_lodash2.default.isEmpty(self.scatterData.regionInfo)) {
            self.scatterData.regionInfo = _lodash2.default.cloneDeep(yySetting.regionInfo);
          }
          option.geo.map = self.scatterData.regionInfo.geoName;
          self.scatterData.option = option;
          self.importMap(self.scatterData.regionInfo);
        } else if (chartType == "barline") {
          option = barlineChart.setOption(this.state.chartDisplayType, option, yySetting, unionedData, this.props.skinConfig, this.panelType);
        }
        if (self.isInPanel()) {
          var saveAsImage = _lodash2.default.get(option, "toolbox.feature.saveAsImage");
          if (_lodash2.default.isEmpty(saveAsImage) == false) delete option.toolbox.feature.saveAsImage;
          if (_lodash2.default.isEmpty(self.state.panelChartConfig.title) == false) option.title.text = self.state.panelChartConfig.title;
          if (chartType == "scatter" && self.regionRegistered.length < 1) return _react2.default.createElement('div', null);else return _react2.default.createElement(_echartsForReact2.default, {
            option: option,
            notMerge: true,
            lazyUpdate: true,
            style: { width: "100%", height: "100%" },
            onEvents: {
              "click": function click(params, curChart) {
                return self.onChartClick(params, curChart);
              }
            }
          });
        } else if (self.isInRpt()) {
          return _react2.default.createElement(
            'div',
            { className: "echarts echarts_type_" + chartType, style: { width: "100%", height: "100%" } },
            _react2.default.createElement(
              'div',
              { className: 'react_for_echarts', style: { width: "100%", height: "100%" } },
              _react2.default.createElement(_echartsForReact2.default, {
                option: option,
                notMerge: true,
                lazyUpdate: true,
                style: { width: "100%", height: "100%" },
                onEvents: {
                  "click": function click(params, curChart) {
                    return self.onChartClick(params, curChart);
                  }
                }
              })
            )
          );
        } else {
          eChartCommon.LogChartInfo("eChartDisplay 没有传入 chartDisplayType ，请检查 ", "", 999);
          return _react2.default.createElement(
            'div',
            { className: "echarts echarts_type_" + chartType },
            _react2.default.createElement(
              'div',
              { className: 'react_for_echarts' },
              _react2.default.createElement(_echartsForReact2.default, {
                option: option,
                notMerge: true,
                lazyUpdate: true,
                style: { width: "100%", height: "100%" },
                onEvents: {
                  "click": function click(params, curChart) {
                    return self.onChartClick(params, curChart);
                  }
                }
              })
            )
          );
        }
      }
    }
  }, {
    key: 'getOutId',
    value: function getOutId() {
      var chartKey = _lodash2.default.get(this.state.panelChartConfig, "chartKey");
      return "eChartDiv_" + (chartKey || this.serieNum);
    }
  }, {
    key: 'getColHeightInPanel',
    value: function getColHeightInPanel(panelType) {
      var height = "auto";
      var subChartCount = this.state.subChartConfigArr.length;
      var subChartColNum = this.state.subChartColNum;
      if (panelType == 1) {
        if (this.state.bMounted == false) {
          height = "auto";
        } else {
          var divEle = document.getElementById(this.getOutId());
          if (divEle) {
            var clientWidth = divEle.clientWidth;
            var clientHeight = divEle.clientHeight;
            if (subChartCount == 0 || subChartColNum == 0 || clientWidth == 0) {
              height = "auto";
            } else {
              var rowNum = Math.ceil(subChartCount / subChartColNum);
              height = Math.floor(clientHeight / rowNum);
            }
          }
        }
      } else if (panelType == 2) {
        if (this.state.bMounted == false) {
          height = "auto";
        } else {
          var _divEle = document.getElementById(this.getOutId());
          if (_divEle) {
            var _clientWidth = _divEle.clientWidth;
            if (_clientWidth == 0) {
              height = "auto";
            } else {
              height = eChartCommon.getColHeight(this.state.chartDisplayType, panelType, subChartColNum, _clientWidth);
            }
          }
        }
      }
      return height;
    }
  }, {
    key: 'importMap',
    value: function importMap(regionInfo, callback2, callback3) {
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
          if (parent == "0") {
            //中国
            subUrl = 'china.json';
          } else if (parent == "100000") {
            //省+直辖市
            var ele = eChartCommon.getMapProvinceArr("", regionInfo.shortName);
            if (ele) {
              subUrl = 'province/' + ele.importKey + '.json';
            }
          } else {
            //其他
            subUrl = 'citys/' + region + '.json';
          }
          params.subUrl = subUrl;
          var callback = function callback(data) {
            if (data.code == 200 && !data.data.code) {
              eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息正确    return ", JSON.stringify(data), 16);
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
              eChartCommon.LogChartInfo("eChartDisplay 散点图地图信息不正确  errInfo = " + errInfo + "regionInfo = " + JSON.stringify(regionInfo) + "  return ", JSON.stringify(data), 999);
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
          eChartCommon.LogChartInfo("-----------点击事件  scatterData ", JSON.stringify(self.scatterData), 16);
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
      var self = this;
      if (this.state.config.yySetting.type == "scatter") {
        if (self.chinaMapTreeData) {
          self.setNewMap(self.chinaMapTreeData, params, curChart);
        } else {
          var callback = function callback(json) {
            if (json.code === 200) {
              self.chinaMapTreeData = json.data;
              self.setNewMap(self.chinaMapTreeData, params, curChart);
            }
          };
          eChartProxy.doProxy(eChartProxy.url.getAllregion, 'POST', {}, callback);
        }
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var self = this;
      var obj = undefined;
      var colArr = [];
      var _state = this.state,
          subChartColNum = _state.subChartColNum,
          subChartConfigArr = _state.subChartConfigArr;

      if (!subChartConfigArr) {
        var tmpStyle = {};
        if (self.isInPanel() && self.props.skinConfig) {
          tmpStyle = { color: self.props.skinConfig.displaySkin.textColor };
        }
        return _react2.default.createElement(
          'div',
          { id: self.getOutId(), style: { width: "100%" } },
          _react2.default.createElement(
            'div',
            { className: 'eChart-nodata', tooltip: true, style: tmpStyle },
            '\u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~'
          )
        );
      } else {
        if (self.isInRpt()) {
          var rowArr = [];
          var _colArr = [];
          var height = eChartCommon.getColHeight("rpt", "", subChartColNum);
          if (subChartConfigArr && subChartConfigArr.length > 0) {
            subChartConfigArr.forEach(function (ele, index) {
              var tmpObj = _this5.getSubChartRender(ele, ele.data);
              _colArr.push(_react2.default.createElement(
                _col2.default,
                { span: 1, style: { height: height } },
                tmpObj
              ));
            });
          }
          return _react2.default.createElement(
            _row2.default,
            { colCount: subChartColNum, style: { width: "100%" }, id: self.getOutId() },
            _colArr
          );
        } else if (this.isInPanel()) {
          if (self.panelType == 1) {
            var _height = this.getColHeightInPanel(self.panelType);
            if (subChartConfigArr && subChartConfigArr.length > 0) {
              subChartConfigArr.forEach(function (ele, index) {
                var tmpObj = _this5.getSubChartRender(ele, ele.data);
                colArr.push(_react2.default.createElement(
                  _col2.default,
                  { span: 1, style: { height: _height } },
                  tmpObj
                ));
              });
            }
            return _react2.default.createElement(
              _row2.default,
              { colCount: this.state.subChartColNum, id: self.getOutId(), style: { height: '100%', width: "100%" } },
              colArr
            );
          } else if (self.panelType == 2) {
            var _height2 = this.getColHeightInPanel(self.panelType);
            if (subChartConfigArr && subChartConfigArr.length > 0) {
              subChartConfigArr.forEach(function (ele, index) {
                var tmpObj = _this5.getSubChartRender(ele, ele.data);
                colArr.push(_react2.default.createElement(
                  _col2.default,
                  { span: 1, style: { height: _height2 } },
                  tmpObj
                ));
              });
            }
            return _react2.default.createElement(
              _row2.default,
              { colCount: this.state.subChartColNum, id: self.getOutId(), style: { width: "100%" } },
              colArr
            );
          }
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.viewModel.un("filterClick", this.onFilterClick);
      var self = this;
      if (self._timer) {
        eChartCommon.LogChartInfo("监控视图 删除刷新频率定时器 renderTime ", self.state.renderTime + "   panelChartConfig = " + JSON.stringify(self.state.panelChartConfig), 3);
        clearInterval(self._timer);
        self._timer = null;
      };
      self._unmount = true;
    }
  }]);

  return EChartDisplay;
}(_react.Component);

exports.default = EChartDisplay;