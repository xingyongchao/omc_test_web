'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _basic = require('../basic');

var _rpttable = require('../rpttable');

var _rpttable2 = _interopRequireDefault(_rpttable);

var _TotalContainer = require('./TotalContainer');

var _TotalContainer2 = _interopRequireDefault(_TotalContainer);

var _DimensionNavTree = require('./DimensionNavTree');

var _DimensionNavTree2 = _interopRequireDefault(_DimensionNavTree);

var _eChartDisplay = require('../echart/echart/eChartDisplay');

var _eChartDisplay2 = _interopRequireDefault(_eChartDisplay);

var _eChartDemoData = require('../echart/eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _util = require('../../helpers/util');

var _eChartCommon = require('../echart/eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _groupCondition = require('../../redux/groupCondition');

var groupConditionRedux = _interopRequireWildcard(_groupCondition);

var _antd = require('antd');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RptTableContainer = function (_Component) {
  _inherits(RptTableContainer, _Component);

  function RptTableContainer(props) {
    _classCallCheck(this, RptTableContainer);

    var _this = _possibleConstructorReturn(this, (RptTableContainer.__proto__ || Object.getPrototypeOf(RptTableContainer)).call(this, props));

    var viewid = _.get(props.viewModel.getParams(), 'query.viewid');
    if (!viewid) viewid = "";
    _this.state = {
      displayType: 1, // 1 单表 2 单图 3 多图+表
      layOutConfig: {},
      eChartConfig: {},
      billnum: "",
      groupSchemaId: "",
      groupSchemaName: "",
      condition: {},
      firstQueryDone: false,
      // publishMenu: false,
      viewid: viewid,
      isPc: true,
      isMobile: false
    };
    return _this;
  }

  _createClass(RptTableContainer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // RptTableContainer shouldComponentUpdate
      var _props = this.props,
          groupConditionState = _props.groupConditionState,
          groupConditionRedux = _props.groupConditionRedux;

      var id = _.get(nextProps.groupConditionState[this.state.billnum], "refreshGroupSchemaId");
      if (id && id == this.state.groupSchemaId) {
        this.getConfig();
        groupConditionRedux.setValue(this.state.billnum, { refreshGroupSchemaId: "" });
        return true;
      }
      return true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      //注册分组方案切换事件
      this.props.viewModel.on('refreshEChartConfig', function (params) {
        // if (eChartDemoData.demoConfig.isDemoConfig == true && params.groupSchemaId == eChartDemoData.demoConfig.demoGroupSchemaId) {
        //   this.getConfigDemo(params);
        // }
        // else {
        _this2.getConfig(params);
        // }
      });
      //注册点击过滤事件
      this.props.viewModel.on("filterClick", function (params) {
        _this2.setState({ condition: params.condition });
      });

      this.props.viewModel.on('firstQueryDone', function (params) {
        _this2.state.firstQueryDone = params;
      });

      this.props.viewModel.on('getPublishMenuInfo', function () {
        var viewModel = self.props.viewModel;
        var params = {};
        params.name = viewModel.getParams().name;
        params.groupSchemaName = self.state.groupSchemaName;
        params.billnum = viewModel.getParams().billNo; // self.state.billnum;
        params.isPc = self.state.isPc;
        params.isMobile = self.state.isMobile;
        if (!!self.state.groupSchemaId) params.groupSchemaId = self.state.groupSchemaId;
        params.condition = self.state.condition;
        viewModel.execute('setPublishMenuInfo', params);
      });

      // this.props.viewModel.on('publishMenu', (params) => {
      //   this.setState({ publishMenu: true });
      // });
    }
    // getPublishMenuCard(viewModel) {

    //   let self = this;
    //   let content;
    //   if (self.state.publishMenu == true) {
    //     let name = viewModel.getParams().name;
    //     let groupSchemaName = self.state.groupSchemaName;

    //     let card;
    //     card = <div className="publishMenu_count">
    //       <span>方案名称:</span>
    //       <Input
    //         id="publishMenu_Title"
    //         placeholder="请输入"
    //         defaultValue={name + "_" + groupSchemaName}
    //       />
    //     </div>;

    //     content =
    //       <Modal
    //         className="publishMenu"
    //         title={"发布菜单"}
    //         onOk={(e) => this.handleOk(e)}
    //         onCancel={(e) => this.handleCancel(e)}
    //         visible={true}
    //       >
    //         {card}
    //       </Modal>;
    //   }
    //   return content;
    // }

    // handleOk = (e) => {
    //   let ele = document.getElementById('publishMenu_Title')
    //   let name = ele.value;
    //   if (name == "" || name.length > 16) {
    //     cb.utils.alert("名称不可为空且长度小于16个字。");
    //     return;
    //   }
    //   let billnum = this.state.billnum;
    //   let groupSchemaId = this.state.groupSchemaId;
    //   let condition = JSON.stringify(this.state.condition);
    //   let params = { billnum, name, groupSchemaId, condition };

    //   let callback = (json) => {
    //     if (json.code === 200) {
    //       cb.utils.alert("报表方案已发布。");
    //       this.setState({ publishMenu: false });
    //     }
    //     else {
    //       cb.utils.alert(json.message);
    //     }
    //   }
    //   this.actionsProxy('/report/publishMenu', 'POST', params, callback);
    // }
    // handleCancel = (e) => {
    //   this.setState({ publishMenu: false });
    // }

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // //重写组件的setState方法，直接返回空
      // this.setState = (state, callback) => {
      //   return;
      // };
    }
  }, {
    key: 'actionsProxy',
    value: function actionsProxy(url, method, params, callback) {
      var config = { url: url, method: method, params: params };
      (0, _util.proxy)(config).then(function (json) {
        callback(json);
      });
    }

    // getConfig(params) {
    //   let billnum = params ? params.billnum : this.state.billnum;
    //   let groupSchemaId = params ? params.groupSchemaId : this.state.groupSchemaId;
    //   let groupSchemaName = params ? params.groupSchemaName : this.state.groupSchemaName;
    //   let param = { billnum: billnum, groupSchemaId: groupSchemaId };
    //   let callback = (json) => {
    //     if (json.code === 200) {
    //       if (json.data) {
    //         let isCrossTable = json.data.isCrossTable;
    //         if (isCrossTable == false) {
    //           if (json.data.displayStyle) {
    //             let displayType = json.data.displayStyle;
    //             let layOutConfig = json.data.pageLayout ? JSON.parse(json.data.pageLayout) : {};
    //             let eChartConfig = json.data.chartConfig ? JSON.parse(json.data.chartConfig) : {};
    //             let isPc = json.data.hasOwnProperty("isPc") ? json.data.isPc : true;
    //             let isMobile = json.data.hasOwnProperty("isMobile") ? json.data.isMobile : false;
    //             let obj = { displayType, layOutConfig, eChartConfig, isMobile, isPc, billnum, groupSchemaId, groupSchemaName };
    //             this.setState(obj);
    //             return;
    //           }
    //         }
    //       }
    //     }
    //     eChartCommon.LogChartInfo("图形报表_配置信息读取失败或者交叉表不支持 param = " + JSON.stringify(param) + " json.message = " + json.message, "", 999);
    //     this.setState({ displayType: 1, layOutConfig: {}, eChartConfig: {}, isMobile: true, isPc: true, billnum, groupSchemaId, groupSchemaName });
    //   }
    //   this.actionsProxy('/report/getGroupSetting', 'GET', param, callback);
    // }

  }, {
    key: 'getConfig',
    value: function getConfig(params) {
      var _this3 = this;

      var billnum = params ? params.billnum : this.state.billnum;
      var groupSchemaId = params ? params.groupSchemaId : this.state.groupSchemaId;
      var groupSchemaName = params ? params.groupSchemaName : this.state.groupSchemaName;
      var param = { billnum: billnum, groupSchemaId: groupSchemaId };
      var callback = function callback(json) {

        if (json.code === 200 && json.data && json.data.isCrossTable == false && json.data.displayStyle) {
          var displayType = json.data.displayStyle;
          var layOutConfig = json.data.pageLayout ? JSON.parse(json.data.pageLayout) : {};
          var eChartConfig = json.data.chartConfig ? JSON.parse(json.data.chartConfig) : {};
          var isPc = json.data.hasOwnProperty("isPc") ? json.data.isPc : true;
          var isMobile = json.data.hasOwnProperty("isMobile") ? json.data.isMobile : false;
          var obj = { displayType: displayType, layOutConfig: layOutConfig, eChartConfig: eChartConfig, isMobile: isMobile, isPc: isPc, billnum: billnum, groupSchemaId: groupSchemaId, groupSchemaName: groupSchemaName };
          _this3.setState(obj);
        } else {
          eChartCommon.LogChartInfo("图形报表_配置信息读取失败或者交叉表不支持图形显示 param = " + JSON.stringify(param) + " json.data.isCrossTable = " + _.get(json, "data.isCrossTable") + " json.message = " + json.message, "", 999);
          _this3.setState({ displayType: 1, layOutConfig: {}, eChartConfig: {}, isMobile: true, isPc: true, billnum: billnum, groupSchemaId: groupSchemaId, groupSchemaName: groupSchemaName });
        }
      };
      this.actionsProxy('/report/getGroupSetting', 'GET', param, callback);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          meta = _props2.meta,
          viewModel = _props2.viewModel;

      var otherCom = null;
      if (this.state.displayType == 1) //单表
        {
          otherCom = this.renderTable();
        } else if (this.state.displayType == 2) //单图
        {
          otherCom = this.renderChart();
        } else if (this.state.displayType == 3) //表和多图。也可能只有多图
        {
          otherCom = this.renderTableAndChart();
        }
      // let publishMenu = this.getPublishMenuCard(viewModel);
      return _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(_TotalContainer2.default, {
          meta: meta,
          billnum: this.state.billnum,
          viewModel: viewModel
          // firstQueryDone={this.state.firstQueryDone}
          , viewid: this.state.viewid
        }),
        otherCom
      );
    }
  }, {
    key: 'renderTable',
    value: function renderTable() {
      var _props3 = this.props,
          meta = _props3.meta,
          width = _props3.width,
          viewModel = _props3.viewModel;

      var style = meta.cStyle ? JSON.parse(meta.cStyle) : {};
      var tableWidth = style.width || width;
      var columns = {};
      if (meta.controls) {
        meta.controls.forEach(function (column) {
          columns[column.cItemName] = column;
        });
      }
      var controlModel = viewModel.get(meta.childrenField || meta.cCode);
      return _react2.default.createElement(_rpttable2.default, {
        width: tableWidth,
        code: meta.cGroupCode,
        columns: columns,
        style: style,
        model: controlModel, tableClass: 'rptTable', tableTyep: 'rptTable' });
    }
  }, {
    key: 'renderChart',
    value: function renderChart() {
      var charts = this.getSubChartContent(this.state.eChartConfig);
      return _react2.default.createElement(
        'div',
        null,
        charts
      );
    }
  }, {
    key: 'renderTableAndChart',
    value: function renderTableAndChart() {
      var self = this;
      var _props4 = this.props,
          meta = _props4.meta,
          width = _props4.width,
          viewModel = _props4.viewModel;

      var style = meta.cStyle ? JSON.parse(meta.cStyle) : {};
      var tableWidth = style.width || width;
      var columns = {};
      if (meta.controls) {
        meta.controls.forEach(function (column) {
          columns[column.cItemName] = column;
        });
      }
      var controlModel = viewModel.get(meta.childrenField || meta.cCode);
      var rpt = _react2.default.createElement(_rpttable2.default, { width: tableWidth, code: meta.cGroupCode, columns: columns,
        style: style, model: controlModel, tableClass: 'rptTable', tableTyep: 'rptTable' });
      var content = [];
      content = self.getRows(this.state.layOutConfig.rows, content, rpt, controlModel);
      return _react2.default.createElement(
        'div',
        null,
        content
      );
    }
  }, {
    key: 'getRows',
    value: function getRows(config, content, rpt, controlModel) {
      var self = this;
      config.forEach(function (rowEle) {
        var curRow = [];
        rowEle.forEach(function (colEle) {
          if (colEle.widgetType == "rpt") {
            curRow.push(_react2.default.createElement(
              _basic.Col,
              { span: colEle.colspan },
              ' ',
              rpt
            ));
          } else if (colEle.widgetType == "chart") {
            var charts = self.getSubChartContent(self.state.eChartConfig);
            curRow.push(_react2.default.createElement(
              _basic.Col,
              { span: colEle.colspan },
              ' ',
              charts
            ));
          } else if (colEle.widgetType == "rows") {
            var innerContent = [];
            innerContent = self.getRows(colEle.widgetValue, innerContent, rpt, controlModel);
            curRow.push(_react2.default.createElement(
              _basic.Col,
              { span: colEle.colspan },
              ' ',
              innerContent
            ));
          }
        });
        content.push(_react2.default.createElement(
          _basic.Row,
          { colCount: 12 },
          curRow
        ));
      });
      return content;
    }
  }, {
    key: 'getSubChartContent',
    value: function getSubChartContent(eChartConfig) {

      var self = this;
      var queryParams = {
        billnum: self.state.billnum,
        groupSchemaId: self.state.groupSchemaId,
        condition: self.state.condition
      };
      return _react2.default.createElement(_eChartDisplay2.default, {
        chartDisplayType: "rpt",
        eChartConfig: eChartConfig,
        viewModel: self.props.viewModel,
        queryParams: queryParams,
        firstQueryDone: this.state.firstQueryDone,
        viewid: this.state.viewid
      });
    }

    // getSubChartContent(eChartConfig) {

    //   let self = this;
    //   let subChartColNum = eChartConfig.subChartColNum;
    //   let subChartConfigArr = eChartConfig.subChartConfigArr;
    //   if (subChartColNum > 5 || subChartColNum < 1 || isNaN(subChartColNum)) {
    //     subChartColNum = 1;
    //   }
    //   let queryParams = {
    //     billnum: self.state.billnum,
    //     groupSchemaId: self.state.groupSchemaId,
    //     condition: self.state.condition
    //   };
    //   let rowArr = [];
    //   let colArr = [];
    //   // let height = 350;
    //   // if (subChartColNum == 2)
    //   //   height = 250;
    //   // if (subChartColNum == 3)
    //   //   height = 200;
    //   // if (subChartColNum == 4)
    //   //   height = 175;
    //   // if (subChartColNum == 5)
    //   //   height = 150;
    //   let height = eChartCommon.getColHeight("rpt", "", subChartColNum);
    //   subChartConfigArr.forEach((ele, index) => {
    //     colArr.push(
    //       <Col span={1} style={{ height: height }} >
    //         <EChartDisplay
    //           config={ele}
    //           viewModel={self.props.viewModel}
    //           queryParams={queryParams}
    //           firstQueryDone={this.state.firstQueryDone}
    //           chartDisplayType={"rpt"}
    //           viewid={this.state.viewid}
    //         />
    //       </Col>
    //     );
    //   });
    //   return <Row colCount={subChartColNum} style={{ width: "100%" }}>{colArr}</Row>;
    // }


  }]);

  return RptTableContainer;
}(_react.Component);

function mapStateToProps(state) {
  return {
    groupConditionState: state.groupCondition.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    groupConditionRedux: (0, _redux.bindActionCreators)(groupConditionRedux, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RptTableContainer);