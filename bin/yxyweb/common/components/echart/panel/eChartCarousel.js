'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _eChartPanelDisplay = require('./eChartPanelDisplay');

var _eChartPanelDisplay2 = _interopRequireDefault(_eChartPanelDisplay);

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Carousel,


var TabPane = _antd.Tabs.TabPane;

var eChartCarousel = function (_React$Component) {
  _inherits(eChartCarousel, _React$Component);

  function eChartCarousel(props) {
    _classCallCheck(this, eChartCarousel);

    var _this = _possibleConstructorReturn(this, (eChartCarousel.__proto__ || Object.getPrototypeOf(eChartCarousel)).call(this, props));

    _this.state = {
      isInDesign: false,
      panelIds: [],
      carouselTemplates: [],
      clientWidth: 100,
      clientHeight: 100,
      activeTabKey: 0,
      bPause: false
    };
    return _this;
  }

  _createClass(eChartCarousel, [{
    key: 'render',
    value: function render() {
      var self = this;
      var carouselTemplates = this.state.carouselTemplates;
      if (carouselTemplates.length == 0) {
        return _react2.default.createElement('div', null);
      } else {
        var arr = [];
        var style_outer = { width: this.state.clientWidth, height: this.state.clientHeight };
        var style_inner = { width: this.state.clientWidth, height: this.state.clientHeight };
        eChartCommon.LogChartInfo("大屏轮播: eChartCarousel Render isInDesign = " + self.state.isInDesign + " clientWidth & clientHeight", JSON.stringify(style_outer), 15);

        carouselTemplates.forEach(function (template, index) {
          arr.push(_react2.default.createElement(
            TabPane,
            {
              tab: "Tab_" + index,
              key: "Tab_" + index,
              style: style_inner,
              className: "eChartCarousel_Inner_" + index + " eChartCarousel_TabPane",
              forceRender: false
            },
            _react2.default.createElement(_eChartPanelDisplay2.default, {
              panelConfig: template,
              isInDesign: self.state.isInDesign,
              doFunc: function doFunc(funcName, params) {
                return self.doFunc(funcName, params);
              }
            })
          ));
        });
        eChartCommon.LogChartInfo("大屏轮播: Render activeTabKey ", "Tab_" + self.state.activeTabKey, 15);
        return _react2.default.createElement(
          'div',
          { style: style_outer, className: "eChartCarousel_Outer" },
          _react2.default.createElement(
            _antd.Tabs,
            {
              animated: false,
              className: "eChartCarousel_Tabs",
              activeKey: "Tab_" + self.state.activeTabKey },
            arr
          )
        );
      }
    }
  }, {
    key: 'beforeChange',
    value: function beforeChange() {
      eChartCommon.LogChartInfo("大屏轮播: 切换 beforeChange  ", "", 15);
    }
  }, {
    key: 'afterChange',
    value: function afterChange() {
      eChartCommon.LogChartInfo("大屏轮播: 切换 afterChange  ", "", 15);
    }
  }, {
    key: 'doFunc',
    value: function doFunc(funcName, params) {
      if (funcName == "pauseCarouse") {
        this.pauseCarouse(params);
      }
    }
  }, {
    key: 'pauseCarouse',
    value: function pauseCarouse(params) {
      if (params != "") {
        this.setState({ bPause: true });
      } else {
        this.setState({ bPause: false });
      }
    }
  }, {
    key: 'resetWidthAndHeight',
    value: function resetWidthAndHeight(carouselTemplates) {
      var self = this;
      var clientWidth = document.body.clientWidth;
      var clientHeight = document.body.clientHeight;
      var arr = _.isEmpty(carouselTemplates) ? self.state.carouselTemplates : carouselTemplates;

      if (_.isEmpty(arr) == false) {
        var editPanel = arr[0];
        if (editPanel.type == "2") {
          if (clientHeight < clientWidth) clientHeight = clientWidth;else clientWidth = clientHeight;
          clientHeight = clientHeight * editPanel.height2 / 2;
        }
      }

      this.state.clientWidth = clientWidth;
      this.state.clientHeight = clientHeight;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      // if (this.state.type == "2")
      //   this.state.clientHeight = this.state.clientHeight * editPanel.height2 / 2;
      window.addEventListener('resize', function () {
        return _this2.onWindowResize();
      });
      // 列表中预览传入格式：http://localhost:3003/echartcarousel?isInDesign=1&panelId=5875&type=1
      // this.state.isInDesign = (_.get(self.props, "location.query.isInDesign") == 1
      //   || _.get(self.props, "location.search").toString().indexOf("isInDesign=1") >= 0) ? true : false;
      this.state.isInDesign = false;
      var panelId = 0;
      var type = -1;
      var params = new cb.utils.queryString(self.props.location.search);
      if (params && params.query) {
        this.state.isInDesign = params.query && params.query.isInDesign == "1";
        panelId = params.query && params.query.panelId;
        type = params.query && params.query.type;
      }
      if (this.state.isInDesign) {
        if (panelId) {
          var param = { reportViewId: panelId };
          var callback = function callback(json) {
            if (json.code === 200) {
              var data = json.data;
              if (data) {
                var editPanel = eChartCommon.restoreEditPanel(data.pageLayout, data.items, "query", panelId);
                var carouselTemplates = [editPanel];
                var panelIds = [panelId];
                self.resetWidthAndHeight(carouselTemplates);
                self.setState({ panelIds: panelIds, carouselTemplates: carouselTemplates });
              }
            }
          };
          eChartProxy.doProxy(eChartProxy.url.getReportView, 'GET', param, callback);
        } else if (window.opener) {
          window.opener.cb.events.un('setPreviewPanel');
          window.opener.cb.events.on('setPreviewPanel', function (args) {
            var template = args.template;
            var carouselTemplates = [template];
            var panelIds = [template.id];
            self.resetWidthAndHeight(carouselTemplates);
            self.setState({ panelIds: panelIds, carouselTemplates: carouselTemplates });
          });
          window.opener.cb.events.execute("getPreviewPanel");
        }
      } else {
        this.getAuthedTemplate();
      }
    }
  }, {
    key: 'setAutoPlay',
    value: function setAutoPlay() {
      var self = this;
      var screenPlayTime = cb.rest.AppContext.option.screenPlayTime ? cb.rest.AppContext.option.screenPlayTime : 120;
      if (eChartDemoData.demoConfig.isTestCarousel) screenPlayTime = 5;
      eChartCommon.LogChartInfo("大屏轮播: Carousel render 显示轮播时间  " + screenPlayTime + "秒,系统设置轮播时间。cb.rest.AppContext.option.screenPlayTime   ", cb.rest.AppContext.option.screenPlayTime || "空", 15);
      if (self._timer == undefined) {
        self._timer = setInterval(function () {
          if (self.state.bPause == false) {
            var activeTabKey = self.state.activeTabKey + 1;
            if (activeTabKey >= self.state.carouselTemplates.length) activeTabKey = 0;
            self.setState({ activeTabKey: activeTabKey });
          }
        }, screenPlayTime * 1000);
      }

      // let self = this;
      // let num = self.state.carouselTemplates.length;
      // setTimeout(() => {
      //   eChartCommon.LogChartInfo("大屏轮播: 切换  5秒后设置大屏Carousel控件autoPlay", "", 15)
      //   self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
      // }, 5000);

      // if (num > 0) {
      //   setTimeout(() => {
      //     eChartCommon.LogChartInfo("大屏轮播: 切换  " + num + " 秒后再次设置大屏Carousel控件autoPlay 时间计算方法为（大屏数量 * 1 秒 ,按照一张大屏加载1秒） ", "", 15)
      //     self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
      //   }, num * 1000);

      //   setTimeout(() => {
      //     eChartCommon.LogChartInfo("大屏轮播: 切换  " + num * 2 + " 秒后再次设置大屏Carousel控件autoPlay 时间计算方法为（大屏数量 * 2 秒 ,按照一张大屏加载两秒） ", "", 15)
      //     self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
      //   }, num * 2000);
      // }

      // setTimeout(() => {
      //   eChartCommon.LogChartInfo("大屏轮播: 切换 2分钟后再次设置大屏Carousel控件autoPlay", "", 15)
      //   self.refs.swipeEChart && self.refs.swipeEChart.refs.slick.innerSlider.autoPlay()
      // }, 2 * 60 * 1000);
    }
  }, {
    key: 'getAuthedTemplate',
    value: function getAuthedTemplate() {
      var self = this;

      var callback = function callback(json) {
        if (json.code === 200 && json.data) {
          eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的所有看板。 json.data.kanbans ", JSON.stringify(json.data.kanbans), 15);
          var kanbans = _.filter(json.data.kanbans, function (o) {
            return o.type == 1;
          });
          eChartCommon.LogChartInfo("大屏轮播:获取系统有权限的type=1看板。 kanbans ", JSON.stringify(kanbans), 15);
          var panelIds = [];
          kanbans.forEach(function (ele) {
            panelIds.push(ele.id);
          });
          panelIds = _.uniq(panelIds); // panelIds = [5813, 5823, 5835, 5811, 5812, 5816, 5832];
          if (eChartDemoData.demoConfig.isTestCarousel) {
            panelIds = [13559, 13560, 13561, 13562, 13563, 13564];
            panelIds = [13559, 13560, 13561];
          }
          if (panelIds && panelIds.length > 0) {
            var _callback = function _callback(json) {
              if (json.code === 200) {
                if (json.data && json.data.length > 0) {
                  var carouselTemplates = [];
                  eChartCommon.LogChartInfo("大屏轮播:获取模板配置信息。返回 json.data.length ", json.data.length, 15);
                  json.data.forEach(function (ele, index) {
                    var editPanel = eChartCommon.restoreEditPanel(ele.pageLayout, ele.items, "query");
                    carouselTemplates.push(editPanel);
                    eChartCommon.LogChartInfo("大屏轮播:获取模板完毕。模板ID=", ele.id + " name = " + ele.name, 15);
                  });
                  eChartCommon.LogChartInfo("大屏轮播:开始轮播。大屏数量  ", carouselTemplates.length, 15);
                  self.resetWidthAndHeight(carouselTemplates);
                  self.setState({ panelIds: panelIds, carouselTemplates: carouselTemplates, activeTabKey: 0 }); //() => { this.refs.swipeEChart.refs.slick.innerSlider.slickGoTo(1); }
                  if (self.state.isInDesign == false && carouselTemplates.length > 1) self.setAutoPlay();
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
            self.closeWindow(3);
          }
        } else {
          eChartCommon.LogChartInfo("大屏轮播：调用服务出错  json.message", json.message, 999);
          cb.utils.alert(json.message, 'error');
          self.closeWindow(3);
        }
      };
      eChartProxy.doProxy(eChartProxy.url.getLayoutByUserId, 'GET', {}, callback);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self._timer) {
        clearInterval(self._timer);
        self._timer = null;
      };
      window.removeEventListener('resize', this.onWindowResize);
      self._unmount = true;
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      this.resetWidthAndHeight();
      this.setState();
    }
  }, {
    key: 'closeWindow',
    value: function closeWindow(num) {
      setTimeout(function () {
        window.close();
      }, num * 1000);
    }
  }]);

  return eChartCarousel;
}(_react2.default.Component);

exports.default = eChartCarousel;