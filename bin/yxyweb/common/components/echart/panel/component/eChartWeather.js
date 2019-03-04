'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _row = require('../../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _eChartCommon = require('../../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _util = require('../../../../helpers/util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eChartWeather = function (_React$Component) {
  _inherits(eChartWeather, _React$Component);

  function eChartWeather(props) {
    _classCallCheck(this, eChartWeather);

    var _this = _possibleConstructorReturn(this, (eChartWeather.__proto__ || Object.getPrototypeOf(eChartWeather)).call(this, props));

    _this.serieNum = Math.random();
    _this.state = {
      panelType: props.panelType ? props.panelType : 1,
      componentConfig: props.componentConfig,
      weatherConfig: {},
      localCity: "",
      baiduAK: "Da2GUB3raZGa2XnLnmYT1KUwvaT9FYPw" //张信提供
      // params.ak = "ACtwE9Dui60IXBsUksGI3sNAWmd79KPP";//浏览器端AK
      // params.ak = "EGgzZ22dsboWQEcPQ6KDQLknQd3YkkkP";//网上搜出来的

    };
    _this.getLocalCity();
    return _this;
  }

  _createClass(eChartWeather, [{
    key: 'render',
    value: function render() {
      var self = this;
      var config = this.state.weatherConfig;
      var arr1 = [];
      var arr2 = [];
      if (_.isEmpty(config)) {
        arr1.push(_react2.default.createElement('div', null));
      } else {
        var pm25 = config.pm25;
        var chuanyi = _.find(config.index, function (o) {
          return o.title == "穿衣";
        });
        var ziwaixian = _.find(config.index, function (o) {
          return o.title == "紫外线强度";
        });

        var xiche = _.find(config.index, function (o) {
          return o.title == "洗车";
        });
        var ganmao = _.find(config.index, function (o) {
          return o.title == "感冒";
        });
        var yundong = _.find(config.index, function (o) {
          return o.title == "运动";
        });

        var tianqi = config.weather_data[0];
        // let style1 = { backgroundImage: 'url(' + tianqi.dayPictureUrl + ')', width: '100%', height: '100%' };
        // style1.backgroundSize = '100% 100%';
        // style1.backgroundRepeat = 'no-repeat';
        // style1.backgroundPosition = 'center';
        // style1.height = "40px"

        // let style2 = { backgroundImage: 'url(' + tianqi.nightPictureUrl + ')', width: '100%', height: '100%' };
        // style2.backgroundSize = '100% 100%';
        // style2.backgroundRepeat = 'no-repeat';
        // style2.backgroundPosition = 'center';
        // style2.height = "40px"

        // 在0 - 35微克为优
        // 35 - 75微克为良
        // 75 - 115微克为轻度污染
        // 115 - 150微克为中度污染
        // 150 - 250微克为重度污染
        // 250微克以上为严重污染。
        var pm25desc = "优";
        if (pm25 > 35) pm25desc = "良";
        if (pm25 > 75) pm25desc = "轻度";
        if (pm25 > 115) pm25desc = "中度";
        if (pm25 > 150) pm25desc = "重度";
        if (pm25 > 250) pm25desc = "严重";
        if (new Date().getHours() >= 6 && new Date().getHours() < 18) {
          arr1.push(_react2.default.createElement(
            'span',
            { className: self.getClassNamePrifx("eChartWeather") + "-img" },
            _react2.default.createElement('img', { src: tianqi.dayPictureUrl })
          ));
        } else {
          arr1.push(_react2.default.createElement(
            _col2.default,
            { className: self.getClassNamePrifx("eChartWeather") + "-img" },
            _react2.default.createElement('img', { src: tianqi.nightPictureUrl })
          ));
        }
        arr1.push(_react2.default.createElement(
          'span',
          { className: self.getClassNamePrifx("eChartWeather") + "-temperature" },
          tianqi.temperature
        ));
        arr1.push(_react2.default.createElement(
          'span',
          { className: self.getClassNamePrifx("eChartWeather") + "-temperature-title" },
          tianqi.weather
        ));

        arr2.push(_react2.default.createElement(
          'span',
          { className: self.getClassNamePrifx("eChartWeather") + "-address" },
          this.state.localCity
        ));
        arr2.push(_react2.default.createElement(
          'span',
          { className: self.getClassNamePrifx("eChartWeather") + "-pm" },
          pm25
        ));
        arr2.push(_react2.default.createElement(
          'span',
          { className: self.getClassNamePrifx("eChartWeather") + "-pm-degree" },
          pm25desc
        ));
      }
      var style = {};
      if (this.props.skinConfig) style.color = this.props.skinConfig.displaySkin.textColor;

      return _react2.default.createElement(
        'div',
        { className: self.getClassNamePrifx("eChartWeather") + "", style: style },
        _react2.default.createElement(
          'div',
          { className: self.getClassNamePrifx("eChartWeather") + "-1" },
          '  ',
          arr1,
          '  '
        ),
        _react2.default.createElement(
          'div',
          { className: self.getClassNamePrifx("eChartWeather") + "-2" },
          '  ',
          arr2,
          '  '
        )
      );
    }
  }, {
    key: 'getClassNamePrifx',
    value: function getClassNamePrifx(className) {
      if (this.state.panelType == 2) className = className + "2";
      return className;
    }

    // getLocalCity() {//通过百度Web服务API 提供服务 测试跨域// 跨域Chrome设置 --disable-web-security --user-data-dir=C:\MyChromeDevUserData12
    //   let self = this;
    //   let url = "https://api.map.baidu.com/location/ip?output=json&ak=" + self.state.baiduAK + "&coor=bd09ll";
    //   var u = new URLSearchParams();
    //   // u.append("Access-Control-Allow-Origin", "*");
    //   // u.append("Access-Control-Allow-Headers", "X-Requested-With");
    //   // u.append("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //   // u.append("X-Powered-By", '3.2.1')

    //   u.append("Content-type", "application/json");
    //   u.append("Accept", "application/json");
    //   // u.append("Cache-Control", "no-cache");
    //   u.append('If-Modified-Since', '0');
    //   // u.append("Content-type", "application/json;charset=utf-8");
    //   fetch(url,
    //     {
    //       // url: url,
    //       // mode: "cors",
    //       method: 'GET',
    //       // headers: u,
    //       // credentials: null

    //     }
    //   ).then(function (response) {
    //     // console.log("XXXXXXXXXXXXXXXXXXXUU1 " + JSON.stringify(response));
    //     return response.json();
    //   }).then(function (data) {
    //     console.log("XXXXXXXXXXXXXXXXXXXUU2 " + JSON.stringify(data));
    //     self.state.localCity = data.content.address;
    //     self.getWeather();

    //   }).catch(function (e) {
    //     console.log("XXXXXXXXXXXXXXXXXXXUU3 " + e);
    //   });

    //   // let callback = (data) => {
    //   //   // alert("getWeather = " + JSON.stringify(data));
    //   //   if (data.code = 200 && (data.data.status == "0" || data.data.status == "success")) {
    //   //     self.state.localCity = data.data.content.address;
    //   //     self.getWeather();
    //   //   }
    //   // }

    // }


  }, {
    key: 'getLocalCity',
    value: function getLocalCity() {
      var _this2 = this;

      //通过百度Web服务API 提供服务，需要跨域
      // "https://api.map.baidu.com/location/ip?output=json&ak=" + self.state.baiduAK + "&coor=bd09ll"
      eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市 getLocalCity this.serieNum =" + this.serieNum + "  Begin ", "", 6);
      var self = this;
      var url = "https://api.map.baidu.com/location/ip";
      var params = {};
      params.output = "json";
      params.ak = self.state.baiduAK;
      params.coor = "bd09ll";
      var config = { url: url, method: 'GET', params: params, options: { jsonp: true } };
      var callback = function callback(data) {
        // alert("getWeather = " + JSON.stringify(data));
        if (data.status == "0" || data.status == "success") {
          eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市 getLocalCity this.serieNum =" + _this2.serieNum + " return  data ", JSON.stringify(data), 6);
          self.state.localCity = data.content.address;
          self.getWeather();
          eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市 getLocalCity this.serieNum =" + _this2.serieNum + "  End ", "", 6);
        } else {
          eChartCommon.LogChartInfo("eChartWeather 获取当前所在城市：调用服务出错   params=" + JSON.stringify(params) + "  data ", JSON.stringify(data), 999);
        }
      };
      (0, _util.proxy)(config).then(function (json) {
        callback(json);
      });
    }

    // getLocalCity() {//通过百度  JavaScript API  IP定位城市
    //   let self = this;
    //   // cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=' + self.state.baiduAK], () => {
    //   cb.requireInner(['http://api.map.baidu.com/getscript?v=3.0&ak=' + self.state.baiduAK], () => {
    //     var map = new BMap.Map('getCity');
    //     function myFun(result) {
    //       if (!!result.name) {
    //         self.state.localCity = result.name;
    //         self.getWeather();
    //       }
    //     }
    //     var myCity = new BMap.LocalCity();
    //     myCity.get(myFun);
    //   });
    // }


    // getLocalCity() {//通过百度  JavaScript API  浏览器获取经纬度
    //   let self = this;
    //   // cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=' + self.state.baiduAK], () => {
    //   cb.requireInner(['http://api.map.baidu.com/getscript?v=2.0&ak=' + self.state.baiduAK], () => {
    //     var geolocation = new BMap.Geolocation();
    //     geolocation.getCurrentPosition(function (r) {
    //       if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //         alert('您的经纬度：' + r.point.lng + ',' + r.point.lat);
    //       }
    //       else {
    //         alert('failed' + this.getStatus());
    //       }
    //     });
    //   });
    // }

  }, {
    key: 'getWeather',
    value: function getWeather() {
      var self = this;

      var params = {};
      params.location = self.state.localCity;
      if (params.location) {
        params.output = "json";
        params.ak = self.state.baiduAK;
        // http://api.map.baidu.com/telematics/v3/weather?location=北京市&output=json&ak=Da2GUB3raZGa2XnLnmYT1KUwvaT9FYPw
        var url = "getWeather";
        var callback = function callback(data) {
          // alert("getWeather = " + JSON.stringify(data));
          if (data.code == 200 && data.data.status == "success") {
            self.setState({ weatherConfig: data.data.results[0] });
          } else {
            eChartCommon.LogChartInfo("获取天气：调用服务出错   params=" + JSON.stringify(params) + "  return ", JSON.stringify(data), 999);
          }
        };
        eChartProxy.doProxy(url, 'GET', params, callback);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self._timer) {
        clearInterval(self._timer);
        self._timer = null;
      };
      self._unmount = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var refreshInterval = 1000 * 60 * 10; //毫秒计数
      self._timer = setInterval(function () {
        self.getWeather();
      }, refreshInterval);
    }
  }]);

  return eChartWeather;
}(_react2.default.Component);

exports.default = eChartWeather;