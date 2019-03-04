'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _formatDate = require('../../../helpers/formatDate');

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;
var ConvenientQuery = null;

var eChartPanelSetChart = function (_React$Component) {
  _inherits(eChartPanelSetChart, _React$Component);

  function eChartPanelSetChart(props) {
    _classCallCheck(this, eChartPanelSetChart);

    var _this = _possibleConstructorReturn(this, (eChartPanelSetChart.__proto__ || Object.getPrototypeOf(eChartPanelSetChart)).call(this, props));

    eChartCommon.LogChartInfo("eChartPanelSetChart constructor ", "", 900);
    ConvenientQuery = require('../../filter').default;
    // curOperateType == "setImageText"
    _this.bVisible = !!props.bVisible;
    _this.state = { panelType: props.panelType || 1 };
    if (_this.bVisible) {
      _this.colEle = props.colEle;
      _this.initState(true, props.colEle.panelChartConfig, props.panelType);
      _this.initModelForFilter();
    }
    return _this;
  }

  _createClass(eChartPanelSetChart, [{
    key: 'initState',
    value: function initState(bFirst, panelChartConfig, panelType) {
      panelChartConfig = panelChartConfig || {};
      this.state = {
        panelType: panelType || 1,
        reportArray: _.isEmpty(this.state.reportArray) ? [] : this.state.reportArray,
        billnum: panelChartConfig.billnum,
        billName: panelChartConfig.billName,
        groupSchemaArray: [],
        groupSchemaId: panelChartConfig.groupSchemaId,
        groupSchemaName: panelChartConfig.groupSchemaName,
        filterId: panelChartConfig.filterId,
        solutionId: panelChartConfig.solutionId,
        condition: panelChartConfig.condition,
        refreshInterval: panelChartConfig.hasOwnProperty("refreshInterval") ? panelChartConfig.refreshInterval : panelType == 3 ? 0 : 3600,
        subChartColNum: panelChartConfig.subChartColNum || 1
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      eChartCommon.LogChartInfo("eChartPanelSetChart componentWillReceiveProps", "", 900);
      if (this.state.panelType == 3) {
        var preVisible = this.bVisible;
        this.bVisible = !!nextProps.bVisible;
        if (preVisible == true && this.bVisible == false) {
          this.forceUpdate();
        } else if (this.bVisible && (_.isEmpty(this.props.colEle) || _.isEqual(nextProps.colEle.panelChartConfig, this.props.colEle.panelChartConfig) == false)) {
          this.colEle = nextProps.colEle;
          this.initState(false, nextProps.colEle.panelChartConfig, nextProps.panelType);
          this.initModelForFilter();
          if (this.state.billnum) {
            this.getGroupSchema(this.state.billnum);
          } else {
            this.forceUpdate();
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // const { groupConditionState, groupConditionRedux } = this.props;
      eChartCommon.LogChartInfo("eChartPanelSetChart render ", "", 900);
      var self = this;
      if (!self.bVisible) {
        return _react2.default.createElement('div', { className: 'eChartPanelDesign_SetChart3_NoData' });
      }
      var content = self.getCardContent();
      if (this.state.panelType == 3) {
        return _react2.default.createElement(
          'div',
          {
            className: 'eChartPanelDesign_SetChart3',
            key: "setChartKey_" + self.colEle.colKey
          },
          content,
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelSplit_bottom3 clearfix' },
            _react2.default.createElement(
              _antd.Button,
              { type: "primary", onClick: function onClick() {
                  return self.doFunc(true);
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: "default", onClick: function onClick() {
                  return self.doFunc(false);
                } },
              '\u53D6\u6D88'
            )
          )
        );
      } else {
        return _react2.default.createElement(
          _antd.Modal,
          {
            className: 'eChartPanelDesign_SetChart',
            title: '\u6DFB\u52A0\u56FE\u8868',
            onOk: function onOk(e) {
              return self.doFunc(true);
            },
            onCancel: function onCancel(e) {
              return self.doFunc(false);
            },
            visible: true
          },
          content
        );
      }
    }
  }, {
    key: 'getGroupSchemaContent',
    value: function getGroupSchemaContent() {
      var self = this;
      var arrArr = this.state.groupSchemaArray;
      var arr = [];
      // if (!!arrArr)
      arrArr.forEach(function (ele) {
        var displayStyle = ele.displayStyle;
        if (displayStyle == 2 || displayStyle == 3) arr.push(_react2.default.createElement(
          Option,
          { value: ele.id },
          ele.name
        ));
      });
      // if (arr.length > 0) {
      return _react2.default.createElement(
        _antd.Select,
        {
          value: self.state.groupSchemaId,
          onSelect: function onSelect(groupSchemaId) {
            return self.setGroupSchemaInfo(groupSchemaId);
          },
          disabled: self.state.billnum ? false : true
        },
        arr
      );
      // }
      // else {
      // return <div>无图表信息可选择</div>;

      // }
    }
  }, {
    key: 'getReportListContent',
    value: function getReportListContent() {
      var arrArr = this.state.reportArray;
      arrArr.sort(function (a, b) {
        return a.name.length - b.name.length;
      });

      var arr = [];
      var billNumArr = [];
      arrArr.forEach(function (ele) {
        if (billNumArr.indexOf(ele.billnum) < 0) {
          billNumArr.push(ele.billnum);
          arr.push(_react2.default.createElement(
            Option,
            { value: ele.billnum },
            ele.name
          ));
        }
      });
      return arr;
    }
  }, {
    key: 'setReportInfo',
    value: function setReportInfo(billnum) {
      var ele = _.find(this.state.reportArray, function (o) {
        return o.billnum == billnum;
      });
      if (ele) {
        var state = {};
        state.billnum = billnum;
        state.billName = ele.name;
        state.groupSchemaId = "";
        state.filterId = ele.filterId;
        state.solutionId = ele.solutionId;
        state.condition = undefined;
        this.setState(state);
        this.getGroupSchema(billnum);
      }
    }
  }, {
    key: 'setGroupSchemaInfo',
    value: function setGroupSchemaInfo(groupSchemaId) {
      var ele = _.find(this.state.groupSchemaArray, function (o) {
        return o.id == groupSchemaId;
      });
      if (ele) {
        var state = {};
        state.groupSchemaId = groupSchemaId;
        state.groupSchemaName = ele.name;
        state.subChartColNum = ele.chartConfig && JSON.parse(ele.chartConfig) && JSON.parse(ele.chartConfig).subChartColNum || 1;
        this.setState(state);
      }
    }
  }, {
    key: 'getCardContent',
    value: function getCardContent() {
      var _this2 = this;

      var self = this;
      var options1 = this.getReportListContent();
      var options2 = this.getGroupSchemaContent();
      var filter = undefined;
      if (self.state.filterId) {
        filter = _react2.default.createElement(
          'div',
          {
            key: self.state.filterId,
            className: "eChartPanelDesign" + self.state.panelType == 3 ? "_3" : "",
            style: { display: '' }
          },
          _react2.default.createElement(ConvenientQuery, {
            model: self.model,
            cols: self.state.panelType == 3 ? 1 : 2
          })
        );
      }
      var content = _react2.default.createElement(
        'div',
        { className: 'tb' },
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetChart_1' },
            '\u62A5\u8868'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              _antd.Select,
              {
                value: self.state.billnum,
                onSelect: function onSelect(billnum) {
                  return self.setReportInfo(billnum);
                }
              },
              options1
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetChart_2' },
            '\u5206\u7EC4\u65B9\u6848'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            options2
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetChart_3' },
            '\u56FE\u8868\u5217\u6570'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(_antd.Input
            // defaultValue={self.state.subChartColNum}
            , { value: self.state.subChartColNum,
              onChange: function onChange(e) {
                return _this2.setState({ "subChartColNum": e.target.value });
              }
            })
          )
        ),
        self.state.panelType != 3 ? _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetChart_3' },
            '\u5237\u65B0\u9891\u7387'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.refreshInterval, onChange: function onChange(e) {
                return _this2.setState({ "refreshInterval": e.target.value });
              } })
          ),
          _react2.default.createElement(
            _col2.default,
            { className: 'tips' },
            '\u79D2',
            _react2.default.createElement(
              'span',
              null,
              '(\u63D0\u793A:\u5237\u65B0\u592A\u9891\u7E41\u4F1A\u9020\u6210\u670D\u52A1\u5668\u538B\u529B\u8FC7\u5927)'
            )
          )
        ) : null,
        _react2.default.createElement(
          _row2.default,
          { className: 'gltj' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetChart_4' },
            '\u8FC7\u6EE4\u6761\u4EF6'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            filter
          )
        )
      );
      return content;
    }
  }, {
    key: 'getReportList',
    value: function getReportList() {
      var _this3 = this;

      var param = {};
      var callback = function callback(json) {
        if (json.code === 200) {
          if (json.data) {
            _this3.setState({ reportArray: json.data });
          }
        }
      };
      eChartProxy.doProxy(eChartProxy.url.getReportList, 'GET', param, callback);
    }
  }, {
    key: 'getGroupSchema',
    value: function getGroupSchema(billnum) {
      var _this4 = this;

      if (billnum) {
        var param = { billnum: billnum };
        var callback = function callback(json) {
          if (json.code === 200) {
            if (json.data) {
              var groupSchemaArray = json.data || [];
              if (_this4.state.panelType == 3) {
                groupSchemaArray = _.filter(groupSchemaArray, function (o) {
                  return o.isMobile == true;
                });
              }
              _this4.setState({ groupSchemaArray: groupSchemaArray });
            }
          }
        };
        eChartProxy.doProxy(eChartProxy.url.getGroupSchema, 'GET', param, callback);
      } else {
        this.setState({ groupSchemaArray: [] });
      }
    }
  }, {
    key: 'initModelForFilter',
    value: function initModelForFilter() {

      var self = this;
      this.model = new cb.models.SimpleModel({});
      this.model.getParams = function () {
        var tmp = {
          filterId: self.state.filterId,
          condition: self.state.condition,
          isInDesign: true,
          solutionId: self.state.solutionId,
          bHasNullDate: true,
          panelType: self.state.panelType
        };
        return tmp;
      };
      this.model.on('filterClick', function (args) {
        self.state.condition = args.condition;
      });
      this.model.setName("监控视图图表设置");
    }
  }, {
    key: 'doFunc',
    value: function doFunc(bOK) {
      this.model.execute('eChartPanel_GetCondition');
      if (bOK) {
        var info = {};
        info.chartKey = eChartCommon.getNewChartKey();
        info.billnum = this.state.billnum || "";
        info.billName = this.state.billName || "";
        info.groupSchemaId = this.state.groupSchemaId || "";
        info.groupSchemaName = this.state.groupSchemaName || "";
        info.filterId = this.state.filterId || "";
        info.solutionId = this.state.solutionId || "";
        info.condition = this.state.condition;
        info.refreshInterval = this.state.refreshInterval;
        info.subChartColNum = this.state.subChartColNum;
        if (info.refreshInterval == "") {
          info.refreshInterval = 0;
        }
        if (info.billnum == "") {
          cb.utils.alert('请设置报表', 'error');
        } else if (info.groupSchemaId == "") {
          cb.utils.alert('请设置方案', 'error');
        } else if (info.filterId == "") {
          cb.utils.alert('请设置filterId', 'error');
        } else if (info.solutionId == "") {
          cb.utils.alert('请设置solutionId', 'error');
        } else if (_.isEmpty(info.condition)) {
          cb.utils.alert('请设置condition', 'error');
        } else if (_.isNull(info.subChartColNum) || info.subChartColNum.toString().trim() == "") {
          cb.utils.alert("图表列数请输入1-3的整数。");
        } else if (isNaN(info.subChartColNum) == true || Number(info.subChartColNum) < 1 || Number(info.subChartColNum) > 3) {
          cb.utils.alert("图表列数请输入1-3的整数。");
        } else {
          this.props.doFunc(bOK, info);
        }
      } else {
        this.props.doFunc(bOK);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var bFlag = void 0;
      if (this.state.panelType == 3) {
        if (_.isEqual(nextState, this.state) == false) {
          bFlag = true;
        } else {
          bFlag = false;
        }
      } else {
        bFlag = true;
      }
      eChartCommon.LogChartInfo("eChartPanelSetChart shouldComponentUpdate return ", bFlag, 900);
      return bFlag;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getReportList();
      if (this.state.billnum) this.getGroupSchema(this.state.billnum);
    }
  }]);

  return eChartPanelSetChart;
}(_react2.default.Component);

exports.default = eChartPanelSetChart;