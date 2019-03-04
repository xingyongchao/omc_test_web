'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _row = require('../../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _util = require('../../../../helpers/util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _eChartCommon = require('../../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _reactCountup = require('react-countup');

var _reactCountup2 = _interopRequireDefault(_reactCountup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// let ConvenientQuery = null;
var eChartSumCountUp = function (_Component) {
  _inherits(eChartSumCountUp, _Component);

  function eChartSumCountUp(props) {
    _classCallCheck(this, eChartSumCountUp);

    // ConvenientQuery = require('../../filter').default;
    var _this = _possibleConstructorReturn(this, (eChartSumCountUp.__proto__ || Object.getPrototypeOf(eChartSumCountUp)).call(this, props));

    eChartCommon.LogChartInfo(" eChartSumCountUp props.sumConfig ", JSON.stringify(props.sumConfig), 16);

    _this.state = {
      panelType: props.panelType ? props.panelType : 1,
      condition: props.sumConfig.condition,
      sumConfig: props.sumConfig,
      totalFields: {},
      controls: [],
      data: {}
    };
    _this.oldValue = 0;
    _this.numPoint = 0;
    return _this;
  }

  _createClass(eChartSumCountUp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setSumFileds(this.state.sumConfig.sumFields);
      this.setSum([{}]);
      this.getData();
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
    key: 'getData',
    value: function getData() {
      var self = this;
      var sumConfig = this.state.sumConfig;
      if (self.state.condition && sumConfig.billnum) {
        if (this.state.panelType == 1) {
          self.checkTimer();
        }
        var queryParams = {
          billnum: sumConfig.billnum,
          condition: self.state.condition,
          isOnlyTotal: true
        };
        var date1 = void 0;
        var date2 = void 0;
        var callback = function callback(json) {
          date2 = new Date().getTime();
          eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求结束 时间 （秒） =" + parseInt(date2 - date1) / 1000 + " json.code = " + json.code + " json.message = " + json.message + " queryParams   ", JSON.stringify(queryParams), 15);
          if (json.code === 200) {
            var sumData = json.data.sumRecordList;
            self.setSum(sumData);
          } else {
            eChartCommon.LogChartInfo("获取图形报表数据Err  查询参数 =" + JSON.stringify(queryParams) + "  errMsg  ", json.message, 999);
          }
        };
        date1 = new Date().getTime();
        eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求开始 时间 =" + Date() + "  queryParams   ", JSON.stringify(queryParams), 15);
        queryParams.isFromKanban = true;
        eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_lodash2.default.cloneDeep(queryParams)), callback);
      }
    }
  }, {
    key: 'checkTimer',
    value: function checkTimer() {
      var self = this;
      if (self._timer == undefined && self.state.panelType == 1) {
        var refreshInterval = self.state.sumConfig.refreshInterval;
        if (isNaN(refreshInterval)) return;
        refreshInterval = Number(refreshInterval);
        if (Number.isInteger(refreshInterval) == false) {
          eChartCommon.LogChartInfo("大屏汇总区域设置的自动刷新间隔错误。 refreshInterval ", refreshInterval, 999);
          return;
        }
        if (refreshInterval == 0) {
          eChartCommon.LogChartInfo("大屏汇总区域设置不自动刷新。 refreshInterval ", refreshInterval, 6);
          return;
        }
        if (refreshInterval < 5) {
          eChartCommon.LogChartInfo("大屏汇总区域设置的自动刷新间隔太短。 refreshInterval ", refreshInterval, 999);
          return;
        }
        // refreshInterval = 2222;
        self._timer = setInterval(function () {
          if (self.props.showIt == true) {
            self.getData();
          }
        }, refreshInterval * 1000);
      }
    }
    //panelsum TotalContainer

  }, {
    key: 'setSumFileds',
    value: function setSumFileds(sumFields) {
      sumFields.sort(function (a, b) {
        return a.iOrder - b.iOrder;
      });
      var totalFields = {};
      var controls = [];
      _lodash2.default.forEach(sumFields, function (item) {
        if (item.bSelected) {
          var totalField = { caption: item.showCaption || item.caption, value: 0, postfix: item.postfix };
          totalFields[item.key] = totalField;
          controls.push(totalField);
        }
      });
      this.state.totalFields = totalFields;
      this.state.controls = controls;
      eChartCommon.LogChartInfo(" setSumFileds controls = ", JSON.stringify(controls), 6);
      // this.setState({ totalFields, controls });
    }
  }, {
    key: 'setSum',
    value: function setSum(sumData) {
      var totalFields = this.state.totalFields;
      if (!sumData) sumData = [{}];
      var controls = [];
      _lodash2.default.forEach(totalFields, function (item, key) {
        controls.push({ caption: item.caption, value: sumData[0][key] || 0, postfix: item.postfix });
      });
      this.setState({ controls: controls });
      eChartCommon.LogChartInfo(" setSum controls = ", JSON.stringify(controls), 6);
    }
  }, {
    key: 'getNumPoint',
    value: function getNumPoint(value) {
      var numPoint = 0;
      var tmp = 'A' + value;
      if (tmp.indexOf(".") >= 0) {
        numPoint = tmp.length - tmp.lastIndexOf(".") - 1;
        if (numPoint < 0) numPoint = 0;
      }
      return numPoint;
    }
  }, {
    key: 'formatNumpoint',
    value: function formatNumpoint(value) {
      var tmp = parseFloat(value).toFixed(this.numPoint);
      return tmp;
    }
  }, {
    key: 'domFun',
    value: function domFun(value) {
      var self = this;
      var bUseQianSplit = self.state.sumConfig.bUseQianSplit;
      var numDom = "";
      if (value) {
        var num = [];
        value = self.formatNumpoint(value);
        // num = formatData.formatAmount(value, 0).split("");
        num = ('' + value).split("");
        if (bUseQianSplit) {
          var num2 = [];
          var numPoint = self.numPoint;
          num = num.reverse();
          var count = 0;
          num.forEach(function (item, index) {
            if (item == ".") {
              numPoint = 0;
              count = -1;
            }
            if (count == 3) {
              num2.push(",");
              count = 0;
            }
            num2.push(item);
            if (numPoint <= 0) count = count + 1;
          });
          num = num2.reverse();
        }

        var dataNum = num.length;
        num.forEach(function (item, index) {
          if (item.match('^[0-9]*$')) {
            numDom += '<span class="' + self.getClassNamePrifx("eChartSumCountUp") + '-Num">' + item + '</span>';
          } else if (item == ".") {
            numDom += '<span class="' + self.getClassNamePrifx("eChartSumCountUp") + '-Point">' + item + '</span>';
          } else if (item == ",") {
            numDom += '<span class="' + self.getClassNamePrifx("eChartSumCountUp") + '-Split">' + item + '</span>';
          }
        });
      }
      return numDom;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.oldValue = this.newValue;
    }
  }, {
    key: 'getClassNamePrifx',
    value: function getClassNamePrifx(className) {
      if (this.state.panelType == 2) className = className + "2";
      return className;
    }
  }, {
    key: 'render',
    value: function render() {

      var self = this;
      var sumConfig = self.state.sumConfig;
      var controls = self.state.controls;
      var skinStyle_Value = {};
      var skinStyle_Caption = {};
      if (!!self.props.skinConfig && self.props.skinConfig.displaySkin) {
        skinStyle_Value.color = self.props.skinConfig.displaySkin.chartSum_NumColor;
        skinStyle_Caption.color = self.props.skinConfig.displaySkin.textColor2;
      } else if (this.state.panelType == 2) {
        skinStyle_Caption.color = eChartCommon.panelDefaultValue.panel2SumTextColor;
      }
      skinStyle_Caption.fontSize = Number(sumConfig.fontSize) || 12;
      skinStyle_Value.fontSize = Number(sumConfig.valueFontSize) || 24;
      eChartCommon.LogChartInfo(" controls = ", JSON.stringify(controls), 6);
      var sumArr = null;
      if (!!controls.length) {
        var item = controls[0];
        self.newValue = item.value ? item.value : 0;
        self.numPoint = self.getNumPoint(self.newValue);
        eChartCommon.LogChartInfo(" eChartSumCountUp self.newValue= " + self.newValue.toString() + " numPoint ", self.numPoint, 900);
        sumArr = _react2.default.createElement(
          'div',
          { className: self.getClassNamePrifx("eChartSumCountUp") + "-Inner", style: { float: 'left', width: '100%', overflow: 'hidden' } },
          _react2.default.createElement(
            'div',
            { className: self.getClassNamePrifx("eChartSumCountUp") + "-Caption", style: skinStyle_Caption, title: item.value },
            item.caption
          ),
          _react2.default.createElement(
            'div',
            { className: self.getClassNamePrifx("eChartSumCountUp") + "-Value", style: skinStyle_Value },
            _react2.default.createElement(_reactCountup2.default, {
              style: skinStyle_Value,
              start: self.oldValue,
              end: self.newValue,
              duration: 3
              // useGrouping={true}
              // separator=","
              , decimals: self.numPoint,
              decimal: '.',
              formattingFn: function formattingFn(value) {
                return self.domFun(value);
              }
            })
          )
        );
      }
      var style = { height: '100%', width: '100%', textAlign: ' center', alignItems: 'center', display: 'flex' };
      if (sumConfig.hasOwnProperty("fontSize")) style.fontSize = sumConfig.fontSize;
      if (sumConfig.hasOwnProperty("fontFamily")) style.fontFamily = sumConfig.fontFamily;
      return _react2.default.createElement(
        'div',
        { className: self.getClassNamePrifx("eChartSumCountUp") + "-Outer", style: style },
        sumArr
      );
    }
  }]);

  return eChartSumCountUp;
}(_react.Component);

exports.default = eChartSumCountUp;