'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _eChartPanelDisplay = require('./eChartPanelDisplay3');

var _eChartPanelDisplay2 = _interopRequireDefault(_eChartPanelDisplay);

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Carousel, Popover } from 'antd';


var Item = _antdMobile.Popover.Item;

var eChartCarousel3 = function (_React$Component) {
  _inherits(eChartCarousel3, _React$Component);

  function eChartCarousel3(props) {
    _classCallCheck(this, eChartCarousel3);

    var _this = _possibleConstructorReturn(this, (eChartCarousel3.__proto__ || Object.getPrototypeOf(eChartCarousel3)).call(this, props));

    _this.handleVisibleChange = function (visible) {
      _this.setState({
        bShowGroupList: visible
      });
    };

    _this.onSelect = function (opt) {
      _this.setState({ activeIndex: opt.key, bShowGroupList: false });
    };

    _this.state = {
      carouselTemplates: [],
      chartTabs: [],
      bShowGroupList: false,
      activeIndex: 0
    };
    return _this;
  }

  _createClass(eChartCarousel3, [{
    key: 'render',
    value: function render() {
      var self = this;

      eChartCommon.LogChartInfo("self.state.activeIndex ", self.state.activeIndex, 900);
      if (self.state.chartTabs.length == 0) {
        return _react2.default.createElement('div', null);
      } else {
        var carouselTemplates = self.state.carouselTemplates;
        return _react2.default.createElement(
          'div',
          { className: 'eChartCarousel3_Group_Outer' },
          _react2.default.createElement(
            _antdMobile.Popover,
            {
              overlay: self.getPopItems(carouselTemplates),
              visible: self.state.bShowGroupList,
              onVisibleChange: this.handleVisibleChange,
              onSelect: this.onSelect,
              overlayClassName: 'eChartCarousel3_Popover',
              mask: true
              // getTooltipContainer={() => { return document.getElementById('popup-container') || document.body; }}
            },
            _react2.default.createElement(
              'div',
              { className: 'eChartCarousel3_Group',
                style: { cursor: "pointer" }
              },
              _react2.default.createElement(
                'span',
                { className: 'eChartCarousel3_max' },
                carouselTemplates && carouselTemplates[self.state.activeIndex] && carouselTemplates[self.state.activeIndex].name
              ),
              _react2.default.createElement('i', { className: self.state.bShowGroupList === true ? "icon icon-shouqi" : "icon icon-zhakai" })
            )
          ),
          _react2.default.createElement(
            _antdMobile.Carousel,
            {
              autoplay: false,
              infinite: true,
              beforeChange: function beforeChange(from, to) {
                return self.beforeTabChange(from, to);
              },
              afterChange: function afterChange(index) {
                return self.afterTabChange(index);
              },
              selectedIndex: self.state.activeIndex,
              dots: true,
              className: "eChartCarousel3_ActivedIndex_" + self.state.activeIndex
            },
            self.state.chartTabs
          )
        );
      }
    }
  }, {
    key: 'beforeTabChange',
    value: function beforeTabChange(from, to) {
      // eChartCommon.LogChartInfo("beforeTabChange set isTabChanging true", "", 900);
      // this.isTabChanging = true;
    }
  }, {
    key: 'afterTabChange',
    value: function afterTabChange(index) {
      // eChartCommon.LogChartInfo("afterTabChange set isTabChanging false", "", 900);
      // this.isTabChanging = false;
      this.setState({ activeIndex: index });
    }
    // getIsTabChanging() {
    // eChartCommon.LogChartInfo("isTabChanging return ", this.isTabChanging, 900);
    // return this.isTabChanging;
    // }

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getAuthedTemplate();
    }
  }, {
    key: 'getPopItems',
    value: function getPopItems(carouselTemplates) {
      var self = this;
      var popItems = [];
      if (carouselTemplates && carouselTemplates.length > 0) {
        carouselTemplates.forEach(function (template, index) {
          popItems.push(_react2.default.createElement(
            Item,
            { key: index, value: template.name },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                null,
                template.name
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                index == self.state.activeIndex ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1' }) : _react2.default.createElement('div', null),
                ' '
              )
            )
          ));
        });
      }
      return popItems;
    }
  }, {
    key: 'setCarousel',
    value: function setCarousel(carouselTemplates) {
      var self = this;
      var chartTabs = [];
      if (carouselTemplates.length > 0) {
        carouselTemplates.forEach(function (template, index) {
          chartTabs.push(_react2.default.createElement(_eChartPanelDisplay2.default, {
            isInDesign: false,
            panelId: template.id,
            panelConfig: template
            // getIsTabChanging={() => self.getIsTabChanging()}
            , refreshForXieLa: function refreshForXieLa() {
              return self.forceUpdate();
            } //斜向拉动会半屏显示
          }));
        });
        this.setState({ carouselTemplates: carouselTemplates, chartTabs: chartTabs });
      }
    }
  }, {
    key: 'getAuthedTemplate',
    value: function getAuthedTemplate() {
      var self = this;

      var callback = function callback(json) {
        if (json.code === 200 && json.data) {
          eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的所有看板。 json.data.kanbans ", JSON.stringify(json.data.kanbans), 900);
          var kanbans = _.filter(json.data.kanbans, function (o) {
            return o.type == 3;
          });
          eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的type=1看板。 kanbans ", JSON.stringify(kanbans), 900);
          var panelIds = [];
          kanbans.forEach(function (ele) {
            if (panelIds.indexOf(ele.id) < 0) panelIds.push(ele.id);
          });
          if (eChartDemoData.demoConfig.isTestCarousel3) {
            panelIds = [15531, 15545, 15559, 15560, 15535, 15536, 15537];
          }
          if (panelIds.length > 0) {
            var _callback = function _callback(json) {
              if (json.code === 200) {
                if (json.data && json.data.length > 0) {
                  var carouselTemplates = [];
                  eChartCommon.LogChartInfo("大屏轮播:获取模板配置信息。返回 json.data.length ", json.data.length, 900);
                  json.data.forEach(function (ele, index) {
                    var editPanel = eChartCommon.restoreEditPanel(ele.pageLayout, ele.items, "query");
                    carouselTemplates.push(editPanel);
                    eChartCommon.LogChartInfo("大屏轮播:获取模板完毕。模板ID=", ele.id + " name = " + ele.name, 900);
                  });
                  eChartCommon.LogChartInfo("大屏轮播:开始轮播。大屏数量  ", carouselTemplates.length, 900);
                  self.setCarousel(carouselTemplates);
                } else {
                  eChartCommon.LogChartInfo("大屏轮播：没有找到能够展示的大屏。模板ID ", JSON.stringify(panelIds), 999);
                }
              } else {
                eChartCommon.LogChartInfo("大屏轮播:获取模板列表信息出错。模板 panelIds = " + JSON.stringify(panelIds) + " json.message ", json.message, 999);
              }
            };
            eChartProxy.doProxy(eChartProxy.url.getReportViews, 'GET', { ids: panelIds }, _callback);
          } else {
            eChartCommon.LogChartInfo("大屏轮播：请检查当前操作员是否有模板权限 ", "", 999);
            // cb.utils.alert("请检查当前操作员是否有模板权限", 'error');
          }
        } else {
          eChartCommon.LogChartInfo("大屏轮播：调用服务出错  json.message", json.message, 999);
          cb.utils.alert(json.message, 'error');
        }
      };
      eChartProxy.doProxy(eChartProxy.url.getLayoutByUserId, 'GET', {}, callback);
    }
  }]);

  return eChartCarousel3;
}(_react2.default.Component);

exports.default = eChartCarousel3;