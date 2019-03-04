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

var eChartDateTime = function (_React$Component) {
  _inherits(eChartDateTime, _React$Component);

  function eChartDateTime(props) {
    _classCallCheck(this, eChartDateTime);

    var _this = _possibleConstructorReturn(this, (eChartDateTime.__proto__ || Object.getPrototypeOf(eChartDateTime)).call(this, props));

    _this.dateTimeConfig = props.componentConfig.dateTimeConfig;
    _this.state = {
      panelType: props.panelType ? props.panelType : 1
    };
    eChartCommon.LogChartInfo("大屏方案日期时间 props.componentConfig ", JSON.stringify(props.componentConfig), 16);
    // this.dateTimeConfig = {
    //   bShow_Date: true,
    //   bShow_HourMinute: true,
    //   bShow_Second: true,
    //   bShow_Week: true,
    //   dateSplit: "",//默认或者为空年月日  空格  .   -
    //   timeSplit: ":",
    //   fontSize: 20,
    //   fontFamily: "STKaiti"
    // };

    return _this;
  }

  _createClass(eChartDateTime, [{
    key: 'render',
    value: function render() {

      //getYear() 返回年份
      //getMonth() 返回月份值
      //getDate() 查看Date对象并返回日期

      //getHours() 返回小时数
      //getMinutes() 返回分钟数
      //getSeconds() 返回秒数
      //getDay() 返回星期几

      var date = new Date();
      var dateTimeConfig = this.dateTimeConfig;
      var year = date.getFullYear().toString();
      var month = (date.getMonth() + 1).toString();
      var day = date.getDate().toString();
      var hour = date.getHours().toString();
      var minute = date.getMinutes().toString();
      var second = date.getSeconds().toString();
      var week = date.getDay().toString();

      if (month.length == 1) month = "0" + month;
      if (day.length == 1) day = "0" + day;
      if (hour.length == 1) hour = "0" + hour;
      if (minute.length == 1) minute = "0" + minute;
      if (second.length == 1) second = "0" + second;

      if (week == "1") week = "一";
      if (week == "2") week = "二";
      if (week == "3") week = "三";
      if (week == "4") week = "四";
      if (week == "5") week = "五";
      if (week == "6") week = "六";
      if (week == "7") week = "日";

      var content = [];
      if (dateTimeConfig.bShow_Date) {
        content.push(this.getContent(year, this.getClassNamePrifx("eChartWeather") + "-Year-Outer", this.getClassNamePrifx("eChartWeather") + "-Year-Inner"));
        content.push(this.getSpliter(dateTimeConfig.dateSplit, "年", this.getClassNamePrifx("eChartWeather") + "-Date-Split"));

        content.push(this.getContent(month, this.getClassNamePrifx("eChartWeather") + "-Month-Outer", this.getClassNamePrifx("eChartWeather") + "-Month-Inner"));
        content.push(this.getSpliter(dateTimeConfig.dateSplit, "月", this.getClassNamePrifx("eChartWeather") + "-Date-Split"));

        content.push(this.getContent(day, this.getClassNamePrifx("eChartWeather") + "-Day-Outer", this.getClassNamePrifx("eChartWeather") + "-Day-Inner"));
        if (dateTimeConfig.dateSplit == "" || dateTimeConfig.dateSplit == "年月日") content.push(this.getSpliter(dateTimeConfig.dateSplit, "日", this.getClassNamePrifx("eChartWeather") + "-Date-Split"));
      }

      if (dateTimeConfig.bShow_HourMinute) {
        if (content.length > 0) {
          content.push(this.getSpliter(" ", "", this.getClassNamePrifx("eChartWeather") + "-Split"));
        }
        content.push(this.getContent(hour, this.getClassNamePrifx("eChartWeather") + "-Hour-Outer", this.getClassNamePrifx("eChartWeather") + "-Hour-Inner"));
        content.push(this.getSpliter(dateTimeConfig.timeSplit, ":", this.getClassNamePrifx("eChartWeather") + "-Time-Split"));
        content.push(this.getContent(minute, this.getClassNamePrifx("eChartWeather") + "-Minute-Outer", this.getClassNamePrifx("eChartWeather") + "-Minute-Inner"));
        if (dateTimeConfig.bShow_Second) {
          content.push(this.getSpliter(dateTimeConfig.timeSplit, ":", this.getClassNamePrifx("eChartWeather") + "-Time-Split"));
          content.push(this.getContent(second, this.getClassNamePrifx("eChartWeather") + "-Second-Outer", this.getClassNamePrifx("eChartWeather") + "-Second-Inner"));
        }
      }
      if (dateTimeConfig.bShow_Week) {
        if (content.length > 0) {
          content.push(this.getSpliter(" ", "", this.getClassNamePrifx("eChartWeather") + "-Split"));
        }
        content.push(this.getContent("星期" + week, this.getClassNamePrifx("eChartWeather") + "-Week-Outer", this.getClassNamePrifx("eChartWeather") + "-Week-Inner"));
      }

      var style = { width: '100%', textAlign: ' center', fontSize: 24 };
      if (dateTimeConfig.hasOwnProperty("fontSize")) style.fontSize = dateTimeConfig.fontSize;
      if (dateTimeConfig.hasOwnProperty("fontFamily")) style.fontFamily = dateTimeConfig.fontFamily;
      if (!!this.props.skinConfig && this.props.skinConfig.displaySkin) {
        style.color = this.props.skinConfig.displaySkin.textColor;
      }
      // if (dateTimeConfig.hasOwnProperty("color")) style.fontFamily = dateTimeConfig.color;

      return _react2.default.createElement(
        'div',
        { className: this.getClassNamePrifx("eChartWeather") + "-Outer", style: { height: '100%', width: '100%', textAlign: ' center', alignItems: 'center', display: 'flex' } },
        _react2.default.createElement(
          'div',
          { className: this.getClassNamePrifx("eChartWeather") + "-Innerer", style: style },
          content
        )
      );
    }
  }, {
    key: 'getClassNamePrifx',
    value: function getClassNamePrifx(className) {
      if (this.state.panelType == 2) className = className + "2";
      return className;
    }
  }, {
    key: 'getSpliter',
    value: function getSpliter(spliter, nullValue, curClassName) {
      var str = "";
      if (spliter == "" || spliter == "年月日") {
        return _react2.default.createElement(
          'span',
          { className: curClassName },
          nullValue
        );
      } else if (spliter.length > 0 && spliter.trim() == "") {
        return _react2.default.createElement(
          'span',
          { className: curClassName },
          '\xA0'
        );
      } else {
        return _react2.default.createElement(
          'span',
          { className: curClassName },
          spliter
        );
      }
    }
  }, {
    key: 'getContent',
    value: function getContent(str, outClassName, innerClassName) {
      var strArr = [];
      var contentArr = [];
      strArr = str.split("");
      strArr.forEach(function (item, index) {
        contentArr.push(_react2.default.createElement(
          'span',
          { className: innerClassName },
          item
        ));
      });
      return _react2.default.createElement(
        'span',
        { className: outClassName },
        contentArr,
        ' '
      );
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
      var num = 60;
      if (self.dateTimeConfig.bShow_HourMinute == true) num = 1;
      this._timer = setInterval(function () {
        self.forceUpdate();
      }, num * 1000);
    }
  }]);

  return eChartDateTime;
}(_react2.default.Component);

exports.default = eChartDateTime;