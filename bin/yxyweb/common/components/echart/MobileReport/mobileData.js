'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _eChartDisplay_Mobile = require('../echart/eChartDisplay_Mobile');

var _eChartDisplay_Mobile2 = _interopRequireDefault(_eChartDisplay_Mobile);

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _gridMobile = require('../../grid-mobile');

var _gridMobile2 = _interopRequireDefault(_gridMobile);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import RptTable from '../../../yxyweb/common/components/basic/table';


// import { Switch } from 'antd-mobile';

var MobileData = function (_Component) {
  _inherits(MobileData, _Component);

  function MobileData(props) {
    _classCallCheck(this, MobileData);

    var _this = _possibleConstructorReturn(this, (MobileData.__proto__ || Object.getPrototypeOf(MobileData)).call(this, props));

    _this.state = {
      // displayType: props.displayType,// 1 单表 2 单图 3 多图+表
      // layOutConfig: props.layOutConfig,
      // eChartConfig: props.eChartConfig,
      // billnum: props.billnum,
      // groupSchemaId: props.groupSchemaId,
      // condition: null,
      // //displayContent
      // firstQueryDone: false
    };
    return _this;
  }

  // shouldComponentUpdate(nextProps, nextState) {

  // }


  _createClass(MobileData, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
    // if (this.props.viewModel) {
    //   this.props.viewModel.on('firstQueryDone', (params) => {
    //     this.state.firstQueryDone = params;
    //   });

    //   this.props.viewModel.on("filterClick", (params) => {
    //     this.state.condition = params.condition;
    //   });
    // }

    // componentWillReceiveProps(nextProps) {

    //   // let tmp = {
    //   //   displayType: nextProps.displayType,// 1 单表 2 单图 3 多图+表
    //   //   layOutConfig: nextProps.layOutConfig,
    //   //   eChartConfig: nextProps.eChartConfig,
    //   //   billnum: nextProps.billnum,
    //   //   groupSchemaId: nextProps.groupSchemaId,
    //   //   condition: nextProps.condition
    //   // }
    //   // this.setState(tmp);
    // }


  }, {
    key: 'render',
    value: function render() {
      // const { meta, viewModel } = this.props;
      eChartCommon.LogChartInfo("移动报表 MobileData Render ", "", 900);
      var tmpCom = null;
      if (this.props.displayType == 1) //if (this.props.displayContent == "table")// 表
        {
          tmpCom = this.renderTable();
        } else if (this.props.displayType == 2) //单图
        {
          tmpCom = this.renderChart();
        } else if (this.props.displayType == 3) //表和多图。也可能只有多图
        {
          tmpCom = [];
          var tmpCom1 = this.renderChart();
          var tmpCom2 = this.renderTable();
          tmpCom.push(_react2.default.createElement(
            'div',
            { style: { display: this.props.displayContent == "chart" ? "" : "none" } },
            ' ',
            tmpCom1
          ));
          tmpCom.push(_react2.default.createElement(
            'div',
            { style: { display: this.props.displayContent == "table" ? "" : "none" } },
            ' ',
            tmpCom2
          ));
        }
      return _react2.default.createElement(
        'div',
        { className: 'MobileData' },
        tmpCom
      );
    }
  }, {
    key: 'renderTable',
    value: function renderTable() {
      var _props = this.props,
          meta = _props.meta,
          viewModel = _props.viewModel,
          mobileDataScale = _props.mobileDataScale;

      var controlModel = viewModel.getGridModel();
      controlModel.setState("override", false);
      // console.log('set--override--false');
      // if (!this.props.condition)
      //   return <div />;
      // else
      if (this.props.groupSchemaId && !this.props.isMobile) {
        return _react2.default.createElement(
          'div',
          { className: 'mobileData_SchemaIsNotMobile' },
          ' \u62A5\u8868\u5206\u7EC4\u65B9\u6848\u4E0D\u652F\u6301\u79FB\u52A8\u7AEF\u5C55\u73B0\uFF0C\u8BF7\u68C0\u67E5\u3002'
        );
      }

      if (mobileDataScale) {
        eChartCommon.LogChartInfo("移动报表 MobileData renderTable  mobileDataScale", JSON.stringify(mobileDataScale), 900);
        return _react2.default.createElement(
          'div',
          {
            className: 'MobileData_Table' },
          _react2.default.createElement(_gridMobile2.default, {
            model: controlModel,
            meta: meta,
            height: mobileDataScale.height,
            width: mobileDataScale.width
          })
        );
      } else {
        return _react2.default.createElement('div', null);
      }
      // const {meta, width, viewModel } = this.props;
      // const style = meta.cStyle ? JSON.parse(meta.cStyle) : {};
      // const tableWidth = style.width || width;
      // const columns = {};
      // if (meta.controls) {
      //   meta.controls.forEach(column => {
      //     columns[column.cItemName] = column;
      //   })
      // }
      // const controlModel = viewModel.get(meta.childrenField || meta.cCode);
      // return (
      //   <RptTable
      //     width={tableWidth}
      //     code={meta.cGroupCode}
      //     columns={columns}
      //     style={style}
      //     model={controlModel}
      //     tableClass="rptTable"
      //     tableTyep={'rptTable'}
      //   />
      // );
    }

    // onSwitchChange() {
    //   this.setState({ bDisplayTable: !this.state.bDisplayTable });
    // }

  }, {
    key: 'renderChart',
    value: function renderChart() {

      // let key = Object.keys(this.props.eChartConfig)[0];
      var width = this.props.mobileDataScale.width || "100%";
      var height = this.props.mobileDataScale.height || "auto";
      // cb.utils.Toast('renderChart width = ' + width + "  height  = " + height, 'fail');
      // let config = this.props.eChartConfig[key];
      if (!this.props.isMobile) {
        return _react2.default.createElement(
          'div',
          { className: 'mobileData_SchemaIsNotMobile' },
          ' \u62A5\u8868\u5206\u7EC4\u65B9\u6848\u4E0D\u652F\u6301\u79FB\u52A8\u7AEF\u5C55\u73B0\uFF0C\u8BF7\u68C0\u67E5\u3002'
        );
      } else {

        return _react2.default.createElement(
          'div',
          {
            className: 'MobileData_Chart',
            id: eChartCommon.getEChartElementId(""),
            style: {
              width: width,
              height: height,
              display: this.props.displayType == 3 && this.state.bDisplayTable == true ? "none" : ""
            }
          },
          _react2.default.createElement(_eChartDisplay_Mobile2.default, {
            chartDisplayType: "mobile",
            eChartConfig: this.props.eChartConfig,
            billnum: this.props.billnum,
            groupSchemaId: this.props.groupSchemaId,
            condition: this.props.condition,
            viewModel: this.props.viewModel,
            firstQueryDone: this.props.firstQueryDone
          })
        );
      }
    }

    // renderTableAndChart() {
    //   let self = this;
    //   // const { meta, width, viewModel } = this.props;
    //   // const style = meta.cStyle ? JSON.parse(meta.cStyle) : {};
    //   // const tableWidth = style.width || width;
    //   // const columns = {};
    //   // if (meta.controls) {
    //   //   meta.controls.forEach(column => {
    //   //     columns[column.cItemName] = column;
    //   //   })
    //   // }
    //   // const controlModel = viewModel.get(meta.childrenField || meta.cCode);
    //   let rpt;
    //   rpt = <RptTable width={tableWidth} code={meta.cGroupCode} columns={columns} style={style} model={controlModel} tableClass="rptTable" tableTyep={'rptTable'} />;

    //   let content = [];
    //   content = self.getRows(this.props.layOutConfig.rows, content, rpt);
    //   return (
    //     <div>{content}</div>
    //   );
    // }


    // getRows(config, content, rpt) {
    //   let self = this;
    //   config.forEach(rowEle => {
    //     let curRow = [];
    //     rowEle.forEach(colEle => {
    //       if (colEle.widgetType == "rpt") {
    //         curRow.push(<Col span={colEle.colspan}> {rpt}</Col>);
    //       }
    //       else if (colEle.widgetType == "chart") {
    //         let chart = <div id={eChartCommon.getEChartElementId(colEle.widgetValue)}>
    //           <EChartDisplay
    //             config={self.props.eChartConfig[colEle.widgetValue]}
    //             billnum={self.props.billnum}
    //             groupSchemaId={self.props.groupSchemaId}
    //             condition={self.props.condition}
    //           />
    //         </div>;
    //         curRow.push(<Col span={colEle.colspan}> {chart}</Col>);
    //       }
    //       else if (colEle.widgetType == "rows") {
    //         let innerContent = [];
    //         innerContent = self.getRows(colEle.widgetValue, innerContent, rpt);
    //         curRow.push(<Col span={colEle.colspan}> {innerContent}</Col>);
    //       }
    //     });
    //     content.push(<Row colCount={12}>{curRow}</Row>);
    //   });
    //   return content;
    // }
    // actionsProxy(url, method, params, callback) {
    //   const config = { url: url, method: method, params: params };
    //   proxy(config)
    //     .then(json => {
    //       callback(json);
    //     });
    // }

  }]);

  return MobileData;
}(_react.Component);

exports.default = MobileData;