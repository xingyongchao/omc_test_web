'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../../../yxyweb/common/components/basic');

var _antd = require('antd');

var _HomeTitle = require('./HomeTitle');

var _HomeTitle2 = _interopRequireDefault(_HomeTitle);

var _HomeCommon = require('./HomeCommon');

var common = _interopRequireWildcard(_HomeCommon);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _home = require('../../redux/modules/home');

var homeactions = _interopRequireWildcard(_home);

var _echartsForReact = require('echarts-for-react');

var _echartsForReact2 = _interopRequireDefault(_echartsForReact);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import ReactEcharts from 'echarts-for-react';


var TabPane = _antd.Tabs.TabPane;
// import ReactEcharts from 'yxyweb/common/components/AsyncComponents/AsyncEchartsForReact'

// let ReactEcharts = null;

var SaleTrend = function (_React$Component) {
  _inherits(SaleTrend, _React$Component);

  function SaleTrend(props) {
    _classCallCheck(this, SaleTrend);

    // ReactEcharts = require('yxyweb/common/components/AsyncComponents/AsyncEchartsForReact').default;
    var _this = _possibleConstructorReturn(this, (SaleTrend.__proto__ || Object.getPrototypeOf(SaleTrend)).call(this, props));

    _this.state = {

      visible: false
      // shops: JSON.parse(JSON.stringify(props.home.trend_showData)) || [],
      // copyShops: JSON.parse(JSON.stringify(props.home.trend_showData)) || [],
    };
    var defaultShops = props.showStore === false ? [] : [{
      store: props.user.storeId,
      store_name: props.user.defaultStore
    }];
    _this.props.homeactions.setOptions({
      saleTrend_shops: JSON.parse(JSON.stringify(defaultShops)), // 临时勾选操作的门店
      saleTrend_copyShops: JSON.parse(JSON.stringify(defaultShops)), // 备份的门店
      saleTrend_showShops: JSON.parse(JSON.stringify(defaultShops)) // echart显示的门店
    });
    _this.props.homeactions.getSaleTrendData({});
    return _this;
  }

  _createClass(SaleTrend, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unmount = true;
    }
  }, {
    key: 'getOption',
    value: function getOption() {
      var legendData = [],
          seriesData = [];
      var data = this.props.home.saleTrendData || [];
      var xAxisData = data.length > 0 ? data[0].dates : [];
      data.forEach(function (element) {
        var ele = {},
            item = {
          type: 'line',
          symbol: 'emptyCircle', //这句就是去掉曲线中点的,可以为true/false
          symbolSize: 6,
          smooth: true, //这句就是让曲线变平滑的
          // stack: '总量',
          legendHoverLink: false
        };
        ele.name = element.storeName;
        ele.textStyle = { width: '5px', height: '5px' };
        item.name = element.storeName;
        var accuracy = cb.rest.AppContext.option.amountofdecimal; //金额
        element.saleMoneys.forEach(function (money, index) {
          element.saleMoneys[index] = parseFloat(money).toFixed(accuracy);
        });
        item.data = element.saleMoneys;
        legendData.push(ele);
        seriesData.push(item);
      });
      var option = {
        // title: {
        //     text: '营销总额(万元)'
        // },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#fc4c2f', '#588ce9', '#18b681'], //图例的颜色
        legend: {
          icon: 'circle', //图例图标的形状
          /*data: [
              { name: "三里屯店", textStyle: { width: '5px', height: '5px' } },
              { name: "西单店", textStyle: { width: '5px', height: '5px' } },
              { name: "中关村店", textStyle: { width: '5px', height: '5px' } }
          ],*/
          data: legendData,
          left: '80', //图例的定位,可以是百分比，像素值，left等
          top: '30',
          selectedMode: false, //图例的默认点击事件
          itemWidth: 8,
          itemGap: 30
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        toolbox: {
          // feature: {
          //     saveAsImage: {}
          // }
        },
        xAxis: {
          axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        },
        yAxis: {
          axisLine: { show: true, lineStyle: { width: 1, color: '#ccc' } },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          type: 'value',

          // 控制网格线是否显示
          splitLine: {
            show: false
          }
          // 去除y轴上的刻度线
          // axisTick: {
          //     show: false
          // }
        },
        series: seriesData
        /*series: [
            {
                name: '三里屯店',
                type: 'line',
                symbol: 'emptyCircle',  //这句就是去掉曲线中点的,可以为true/false
                symbolSize: 6,
                smooth: true,  //这句就是让曲线变平滑的
                stack: '总量',
                legendHoverLink: false,
                data: [120, 132, 101, 134, 890, 230, 210, 100, 800]
            },
            {
                name: '西单店',
                type: 'line',
                symbol: 'emptyCircle',  //这句就是去掉点的
                symbolSize: 6,
                smooth: true,  //这句就是让曲线变平滑的
                stack: '总量',
                legendHoverLink: false,
                data: [220, 182, 191, 234, 290, 330, 310, 102, 109]
            },
            {
                name: '中关村店',
                type: 'line',
                symbol: 'emptyCircle',  //这句就是去掉点的
                symbolSize: 6,
                smooth: true,  //这句就是让曲线变平滑的
                stack: '总量',
                legendHoverLink: false,
                data: [320, 332, 301, 334, 390, 330, 320, 201, 100]
            }
        ]*/
      };
      return option;
    }
  }, {
    key: 'getCardContent',
    value: function getCardContent() {
      var _this2 = this;

      var shops = this.props.home.saleTrend_shops || [];
      var allShopsData = this.props.user.showStore === false ? [] : this.props.user.userStores || [];
      var getPopShops = function getPopShops(shops, currentShop) {
        var isChecked = shops.filter(function (ele) {
          return ele.store == currentShop;
        });
        if (isChecked && isChecked.length > 0) {
          return true;
        } else {
          return false;
        }
      };
      var currentData = function currentData(type, all) {
        var findData = {};
        all.forEach(function (shop) {
          if (shop.store === type) findData = shop;
        });
        return findData;
      };

      var arr = [];
      allShopsData.forEach(function (element) {
        arr.push(_react2.default.createElement(
          _basic.Row,
          { style: { minHeight: "25px" } },
          _react2.default.createElement(
            'div',
            { className: 'pull-left' },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: getPopShops(shops, element.store),
                onChange: function onChange(e) {
                  return _this2.selectShop(element.store, e, currentData(element.store, allShopsData));
                } },
              element.store_name
            )
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        { className: 'filter-btn-fixed', style: { overflow: "auto" } },
        _react2.default.createElement(
          'div',
          { className: 'filter-txt' },
          arr
        ),
        _react2.default.createElement(
          'div',
          { className: 'filter-btn-1' },
          _react2.default.createElement(
            _antd.Button,
            { type: "primary", size: 'small', onClick: function onClick() {
                return _this2.popoverButtonClick('save');
              } },
            '\u4FDD\u5B58'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: "default", size: 'small', onClick: function onClick() {
                return _this2.popoverButtonClick('cancel');
              } },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }, {
    key: 'getTitle',
    value: function getTitle() {
      var _this3 = this;

      var cardContent = this.getCardContent();
      return _react2.default.createElement(
        'div',
        { className: 'home-title' },
        _react2.default.createElement(
          'div',
          { className: 'home-title-left' },
          '\u95E8\u5E97\u9500\u552E\u8D8B\u52BF'
        ),
        _react2.default.createElement(
          'div',
          { className: 'home-title-right' },
          _react2.default.createElement(
            'div',
            { style: { float: 'left' } },
            _react2.default.createElement(
              _antd.Popover,
              { overlayClassName: 'saleTrend_popover', placement: 'bottom', content: cardContent, trigger: 'click',
                visible: this.state.visible, onVisibleChange: function onVisibleChange(visble) {
                  return _this3.onVisibleChange(visble);
                } },
              _react2.default.createElement(
                _antd.Button,
                null,
                '\u8BF7\u9009\u62E9\u95E8\u5E97'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'home-title-date' },
            _react2.default.createElement(
              _antd.Tabs,
              { onTabClick: function onTabClick(e) {
                  return _this3.onTabClick(e);
                }, defaultActiveKey: 'seven', size: 'small' },
              _react2.default.createElement(TabPane, { tab: '\u8FD17\u5929', key: 'seven' }),
              _react2.default.createElement(TabPane, { tab: '\u8FD130\u5929', key: 'thirty' }),
              _react2.default.createElement(TabPane, { tab: '\u8FD190\u5929', key: 'ninety' })
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var homeTitle = this.getTitle();
      var option = this.getOption();
      return _react2.default.createElement(
        'div',
        { className: 'home-panel' },
        _react2.default.createElement(
          _basic.Row,
          { colCount: 6 },
          _react2.default.createElement(
            _basic.Col,
            { span: 6 },
            homeTitle
          )
        ),
        _react2.default.createElement(
          _basic.Row,
          null,
          _react2.default.createElement(_echartsForReact2.default, {
            option: option,
            notMerge: true,
            lazyUpdate: true,
            style: { height: 350, width: '100%', marginTop: 0, marginBottom: 0 },
            className: 'react_for_echarts' })
        )
      );
    }
  }, {
    key: 'onTabClick',
    value: function onTabClick(e) {
      var endDate = common.getDate(e, '0');
      var startDate = common.getDate(e, '1');
      var lastStartDate = common.getDate('last' + e, '0');
      var lastEndDate = common.getDate('last' + e, '1');
      var storeIdArr = this.props.home.storeIdArr;
      this.props.homeactions.getSaleTrendData({ store_id: storeIdArr, beginDate: startDate, endDate: endDate });
    }
  }, {
    key: 'selectShop',
    value: function selectShop(type, e, currentData) {
      var shops = this.props.home.saleTrend_shops;
      if (e.target.checked === true) {
        var length = shops.length;
        if (length < 3) shops.push(currentData);
        if (length >= 3) {
          shops.push(currentData);
          shops.splice(0, 1);
        }
      }
      if (e.target.checked === false) {
        var index = '';
        shops.forEach(function (ele, i) {
          if (ele.store === type) index = i;
        });
        index !== '' && shops.splice(index, 1);
      }
      // this.setState({ shops })
      this.props.homeactions.setOptions({ saleTrend_shops: shops });
    }
  }, {
    key: 'popoverButtonClick',
    value: function popoverButtonClick(type) {
      // let { showShops, trend_showData } = this.reduxState();
      // let { shops, copyShops } = this.state;
      var shops = this.props.home.saleTrend_shops;
      var copyShops = this.props.home.saleTrend_copyShops;
      if (type == 'save') {
        // this.actions().setOptions({ trend_showData: shops })
        // this.setState({ copyShops: shops })
        var _props$home = this.props.home,
            saleTrend_beginData = _props$home.saleTrend_beginData,
            saleTrend_endData = _props$home.saleTrend_endData;

        var now = new Date();
        var beginDate = saleTrend_beginData || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 6).format('yyyy-MM-dd');
        var endDate = saleTrend_endData || now.format('yyyy-MM-dd');
        var storeIdArr = [];
        shops.forEach(function (ele) {
          storeIdArr.push(ele.store);
        });
        this.props.homeactions.setOptions({ saleTrend_showShops: shops, saleTrend_copyShops: shops, storeIdArr: storeIdArr });
        this.props.homeactions.getSaleTrendData({ store_id: storeIdArr, beginDate: beginDate, endDate: endDate });
      } else {
        // this.actions().setOptions({ shops: trend_showData })
        // this.setState({ shops: copyShops });
        this.props.homeactions.setOptions({ saleTrend_showShops: copyShops, saleTrend_shops: copyShops });
      }
      this.setState({ visible: false });
    }
  }, {
    key: 'onVisibleChange',
    value: function onVisibleChange(visible) {
      this.setState({ visible: visible });
    }
  }]);

  return SaleTrend;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    home: state.home.toJS(),
    user: state.user.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeactions: (0, _redux.bindActionCreators)(homeactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SaleTrend);