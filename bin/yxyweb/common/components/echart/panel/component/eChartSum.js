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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// let ConvenientQuery = null;
//panelsum eChartSum

var eChartSum = function (_Component) {
  _inherits(eChartSum, _Component);

  function eChartSum(props) {
    _classCallCheck(this, eChartSum);

    var _this = _possibleConstructorReturn(this, (eChartSum.__proto__ || Object.getPrototypeOf(eChartSum)).call(this, props));

    eChartCommon.LogChartInfo("eChartSum constructor ", "", 900);
    // ConvenientQuery = require('../../filter').default;
    _this.initState(true, props.sumConfig, props.panelType, props.isInDesign);
    // this.initModelForFilter();
    return _this;
  }

  _createClass(eChartSum, [{
    key: 'initState',
    value: function initState(bFirst, sumConfig, panelType, isInDesign) {
      this.state = {
        panelType: panelType || 1,
        sumConfig: sumConfig,
        condition: sumConfig.condition,
        isInDesign: isInDesign,
        // sumConfig: {
        // title: "累计信息",
        // refreshInterval: 10,//秒
        // billnum: "rm_saleanalysis",
        // groupSchemaId: "4494",
        // filterId: "12999193",
        // bShowFilter: true,
        // solutionId: '3353401',
        // sumFields: [
        // { key: "billnum", caption: "单据数", iOrder: 1 },
        // { key: "fMoney", caption: "金额", iOrder: 3 },
        // { key: "fDiscount", caption: "折扣额", iOrder: 4 },
        // { key: "fQuantity", caption: "销售数量", iOrder: 2 }
        // ]
        // }
        totalFields: {},
        controls: [],
        data: {}
      };
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
      eChartCommon.LogChartInfo("eChartSum shouldComponentUpdate return ", bFlag, 900);
      return bFlag;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      eChartCommon.LogChartInfo("eChartSum componentWillReceiveProps ", "", 900);
      if (this.state.panelType == 3 && _lodash2.default.isEqual(nextProps.sumConfig, this.state.sumConfig) == false) {
        this.initState(false, nextProps.sumConfig, nextProps.panelType, nextProps.isInDesign);
        this.setSumFileds(this.state.sumConfig.sumFields);
        // this.setSum([{}]);
        this.getData();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setSumFileds(this.state.sumConfig.sumFields);
      // this.setSum([{}]);
      this.getData();
      // if (this.props.model)
      // this.props.model.addListener(this);
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
        self.checkTimer();
        var queryParams = {
          billnum: sumConfig.billnum,
          condition: self.state.condition,
          isOnlyTotal: true
        };
        var date1 = void 0;
        var date2 = void 0;
        var callback = function callback(json) {
          date2 = new Date().getTime();
          eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求结束 时间 （秒） =" + parseInt(date2 - date1) / 1000 + " json.code = " + json.code + " json.message = " + json.message + " queryParams ", JSON.stringify(queryParams), 15);
          if (json.code === 200) {
            var sumData = json.data.sumRecordList;
            self.setSum(sumData);
          } else {
            eChartCommon.LogChartInfo("获取图形报表数据Err 查询参数 =" + JSON.stringify(queryParams) + " errMsg ", json.message, 999);
          }
        };
        date1 = new Date().getTime();
        eChartCommon.LogChartInfo("获取图形报表 /report/list 本次List请求开始 时间 =" + Date() + " queryParams ", JSON.stringify(queryParams), 15);
        queryParams.isFromKanban = true;
        eChartProxy.doProxy(eChartProxy.url.reportList, 'POST', eChartCommon.trimCondition(_lodash2.default.cloneDeep(queryParams)), callback);
      }
    }
  }, {
    key: 'getClassNamePrifx',
    value: function getClassNamePrifx(className) {
      if (this.state.panelType == 2) className = className + "2";
      return className;
    }
  }, {
    key: 'checkTimer',
    value: function checkTimer() {
      var self = this;
      if (self._timer == undefined && (self.state.panelType == 1 || self.state.panelType == 3) && !!self.state.isInDesign == false) {
        var refreshInterval = self.state.sumConfig.refreshInterval;
        if (isNaN(refreshInterval)) {
          eChartCommon.LogChartInfo("汇总区域设置的自动刷新间隔错误。 refreshInterval ", refreshInterval, 999);
          return;
        }
        refreshInterval = Number(refreshInterval);
        if (Number.isInteger(refreshInterval) == false) {
          eChartCommon.LogChartInfo("汇总区域设置的自动刷新间隔错误。 refreshInterval ", refreshInterval, 999);
          return;
        }
        if (refreshInterval == 0) {
          eChartCommon.LogChartInfo("汇总区域设置不自动刷新。 refreshInterval ", refreshInterval, 6);
          return;
        }
        if (refreshInterval < 1) {
          eChartCommon.LogChartInfo("汇总区域设置的自动刷新间隔太短。 refreshInterval ", refreshInterval, 999);
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
      var tmpSumFields = _lodash2.default.cloneDeep(sumFields);
      tmpSumFields.sort(function (a, b) {
        return a.iOrder - b.iOrder;
      });
      var totalFields = {};
      var controls = [];
      _lodash2.default.forEach(tmpSumFields, function (item) {
        if (item.bSelected) {
          var totalField = { caption: item.showCaption || item.caption, value: 0, postfix: item.postfix };
          totalFields[item.key] = totalField;
          controls.push(totalField);
        }
      });
      this.state.totalFields = totalFields;
      this.state.controls = controls;
      this.setSum([{}]);
      eChartCommon.LogChartInfo(" setSumFileds controls = ", JSON.stringify(controls), 6);
      // this.setState({ totalFields, controls });
    }
  }, {
    key: 'setSum',
    value: function setSum(sumData) {
      var totalFields = this.state.totalFields;
      if (!sumData || _lodash2.default.isEmpty(sumData) || !sumData.length) sumData = [{}];
      var controls = [];
      _lodash2.default.forEach(totalFields, function (item, key) {
        controls.push({ caption: item.caption, value: sumData[0][key] || 0, postfix: item.postfix });
      });
      this.state.controls = controls;
      this.forceUpdate();
      // this.setState({ controls });
      eChartCommon.LogChartInfo(" setSum controls = ", JSON.stringify(controls), 6);
    }
  }, {
    key: 'render',
    value: function render() {
      eChartCommon.LogChartInfo("eChartSum render ", "", 900);
      var self = this;
      var sumConfig = self.state.sumConfig;
      var controls = this.state.controls;
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
      // valueFontSize
      eChartCommon.LogChartInfo(" controls = ", JSON.stringify(controls), 6);
      // let filter =
      // <div className="eChart-filter" style={{ display: self.state.sumConfig.bShowFilter ? '' : 'none' }}>
      // <ConvenientQuery model={this.model} cols={1} />
      // </div>;
      var sumArr = [];
      if (!!controls.length) {
        var width = 100 / controls.length;
        controls.forEach(function (item) {
          sumArr.push(_react2.default.createElement(
            'div',
            {
              className: self.getClassNamePrifx("eChartSumSub"),
              style: { float: 'left', width: width + '%', overflow: 'hidden' }
              // style={{ float: 'left', width: width + '%', whiteSpace: 'normal', wordWrap: 'break-word', wordBreak: 'break-all' }}
            },
            _react2.default.createElement(
              'div',
              { style: skinStyle_Caption },
              item.caption
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                { style: skinStyle_Value },
                item.value
              )
            )
          ));
        });
      }
      var style = { width: '100%', textAlign: ' center' };
      if (sumConfig.hasOwnProperty("fontSize")) style.fontSize = sumConfig.fontSize;
      if (sumConfig.hasOwnProperty("fontFamily")) style.fontFamily = sumConfig.fontFamily;

      return _react2.default.createElement(
        'div',
        { style: { height: '100%', width: '100%', textAlign: ' center', alignItems: 'center', display: 'flex' } },
        _react2.default.createElement(
          'div',
          { className: self.getClassNamePrifx("eChartSum"), style: style },
          sumArr
        )
      );
    }

    // render() {
    // let controls = this.state.controls;
    // if (!controls.length)
    // return null;
    // const itemClassName = `rpt-zhekou-${controls.length === 1 ? 'padding' : 'center'}`;
    // const sumArr = [];
    // const width = 100 / controls.length;
    // controls.forEach(item => {
    // sumArr.push(<div className="rpt-zhekou-list" style={{ float: 'left', width: width + '%' }}>
    // <span className="zhekou-name"><h3 className={itemClassName}>{item.caption}</h3></span>
    // <span className="zhekou-number"><h4 className={itemClassName}>{item.value}</h4></span>
    // </div>)
    // });
    // return (
    // <Row className="rpt-zhekou">{sumArr}</Row>
    // );
    // }

  }]);

  return eChartSum;
}(_react.Component);

exports.default = eChartSum;