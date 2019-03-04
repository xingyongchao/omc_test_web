'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartDisplay = require('../echart/eChartDisplay');

var _eChartDisplay2 = _interopRequireDefault(_eChartDisplay);

var _formatDate = require('../../../helpers/formatDate');

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _eChartWeather = require('./component/eChartWeather');

var _eChartWeather2 = _interopRequireDefault(_eChartWeather);

var _eChartSum = require('./component/eChartSum');

var _eChartSum2 = _interopRequireDefault(_eChartSum);

var _eChartSumCountUp = require('./component/eChartSumCountUp');

var _eChartSumCountUp2 = _interopRequireDefault(_eChartSumCountUp);

var _eChartDateTime = require('./component/eChartDateTime');

var _eChartDateTime2 = _interopRequireDefault(_eChartDateTime);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _CommonFunctions = require('../../../../../common/components/home/CommonFunctions');

var _CommonFunctions2 = _interopRequireDefault(_CommonFunctions);

var _filterEChart = require('../../filter/filterEChart');

var _filterEChart2 = _interopRequireDefault(_filterEChart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eChartPanelDisplay2 = function (_React$Component) {
  _inherits(eChartPanelDisplay2, _React$Component);

  function eChartPanelDisplay2(props) {
    _classCallCheck(this, eChartPanelDisplay2);

    var _this = _possibleConstructorReturn(this, (eChartPanelDisplay2.__proto__ || Object.getPrototypeOf(eChartPanelDisplay2)).call(this, props));

    _this.serieNum = Math.random();
    _this.state = {
      panelConfig: props.panelConfig || undefined,
      isInDesign: props.isInDesign || false,
      panelId: props.panelId
    };
    eChartCommon.LogChartInfo("大屏方案2 eChartPanelDisplay2 展现 constructor", "", 900);
    return _this;
  }

  _createClass(eChartPanelDisplay2, [{
    key: 'getImageText',
    value: function getImageText(config, colEle) {
      var self = this;
      if (config.subType == "title") {
        var style = {};
        if (config.hasOwnProperty("fontSize")) style.fontSize = config.fontSize;
        if (config.hasOwnProperty("width")) style.width = config.width;
        if (config.hasOwnProperty("color")) style.color = config.color;
        if (config.hasOwnProperty("textAlign")) style.textAlign = config.textAlign;
        if (config.hasOwnProperty("fontFamily")) style.fontFamily = config.fontFamily;
        if (config.hasOwnProperty("alignItems")) style.alignItems = config.alignItems;
        if (config.hasOwnProperty("display")) style.display = config.display;
        return _react2.default.createElement(
          'div',
          { style: style },
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', width: '100%' } },
            config.title
          )
        );
      } else {
        var imgStyle = { display: "block", width: "100%" };
        return _react2.default.createElement(
          'div',
          { className: config.logoImg ? "eChartPanelDisplay2_HasImg" : "eChartPanelDisplay2_NoImg" },
          _react2.default.createElement('img', { id: colEle.colKey + "_img", style: imgStyle, src: config.logoImg })
        );
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      if (self.state.isInDesign == false) {
        self.getPanel(self.state.panelId);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.panelId != this.state.panelId) this.getPanel(nextProps.panelId);
    }
  }, {
    key: 'getPanel',
    value: function getPanel(panelId) {
      var self = this;
      var param = { reportViewId: panelId };
      var callback = function callback(json) {
        if (json.code === 200) {
          var data = json.data;
          if (data) {
            var editPanel = eChartCommon.restoreEditPanel(data.pageLayout, data.items, "query", panelId);
            self.setState({ panelId: panelId, panelConfig: editPanel });
          }
        }
      };
      eChartProxy.doProxy(eChartProxy.url.getReportView, 'GET', param, callback);
    }
  }, {
    key: 'getStyle_Edit',
    value: function getStyle_Edit(eleType, innerType, ele) {
      var style = {};
      if (eleType == "row") {
        style.width = '100%';
      } else if (eleType == "col") {
        style.width = ele.width;
        style.float = 'left';
        style.overflow = "hidden";
      } else if (eleType == "all") {
        style.width = '100%';
        style.backgroundColor = eChartCommon.panelDefaultValue.panel2AllBackgroundColor;
      }
      style.border = "0px";
      style.padding = "0px";
      style.margin = "0px";
      if (eleType == "col" && innerType == "control") {
        style.padding = "0 10px 10px 0";
      }
      return style;
    }
  }, {
    key: 'getInnerStyle_Edit',
    value: function getInnerStyle_Edit(eleType, innerType, ele) {
      var style = { width: '100%', padding: 0, margin: 0, border: "0px" };
      if (eleType == "col" && innerType == "control" && ele.widgetType != "imagetext" && ele.widgetType != "component") {
        style.backgroundColor = "white";
        style.padding = "15px 15px 15px 15px";
      }
      return style;
    }
  }, {
    key: 'addBorderClassName',
    value: function addBorderClassName(bNoBorder) {
      return bNoBorder ? " panelLayer2-noborder" : " panelLayer2-hasborder";
    }
  }, {
    key: 'getRows',
    value: function getRows(rows, bOutRow) {
      var self = this;
      var rowArr = [];
      rows.forEach(function (rowEle) {
        var colArr = [];
        var rowStyle = self.getStyle_Edit("row", "", rowEle);
        var rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
        rowEle.cols.forEach(function (colEle) {
          var colStyle = void 0;var colInnerStyle = void 0;var curCol = void 0;var content = void 0;var colNoBorder = void 0;
          var isTitleArea = colEle.isTitleArea || false;
          if (colEle.widgetType == "chart") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            var model = new cb.models.SimpleModel({});
            var _colEle$panelChartCon = colEle.panelChartConfig,
                filterId = _colEle$panelChartCon.filterId,
                condition = _colEle$panelChartCon.condition,
                solutionId = _colEle$panelChartCon.solutionId;

            var panelType = eChartCommon.panelType.panelType2;
            model.getParams = function () {
              return { filterId: filterId, condition: condition, solutionId: solutionId, panelType: panelType, isInDesign: true, bHasNullDate: true };
            };
            model.on('filterClick', function (args) {
              eChartCommon.LogChartInfo("监控视图汇总设置 触发事件 filterClick", JSON.stringify(args.condition), 7);
              self.state.condition = args.condition;
            });
            content = self.getChartRender(colEle, model);
            curCol = _react2.default.createElement(
              'div',
              { className: "panelLayer2-col-inner panelLayer2-col-final " + self.addBorderClassName(colNoBorder), style: colInnerStyle },
              _react2.default.createElement(_filterEChart2.default, { model: model, config: colEle.panelChartConfig }),
              content
            );
          } else if (colEle.widgetType == "rows") {
            colStyle = self.getStyle_Edit("col", "rows", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = self.getRows(colEle.widgetValue, false);
            curCol = _react2.default.createElement(
              'div',
              { className: "panelLayer2-col-inner" + self.addBorderClassName(colNoBorder), style: colInnerStyle },
              ' ',
              content,
              ' '
            );
          } else if (colEle.widgetType == "imagetext") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            if (colEle.panelImageTextConfig.subType == "logo") {
              colInnerStyle.position = "relative";
            }
            content = self.getImageText(colEle.panelImageTextConfig, colEle);
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer2-col-inner panelLayer2-col-final " + self.addBorderClassName(colNoBorder),
                style: colInnerStyle,
                id: colEle.colKey + "_div" },
              content
            );
          } else if (colEle.widgetType == "sum") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            if (colEle.sumConfig.subType == "count") {
              content = _react2.default.createElement(_eChartSumCountUp2.default, { showIt: true, sumConfig: colEle.sumConfig, panelType: 2 });
            } else {
              content = _react2.default.createElement(_eChartSum2.default, { showIt: true, sumConfig: colEle.sumConfig, panelType: 2 });
            }
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer2-col-inner panelLayer2-col-final " + self.addBorderClassName(colNoBorder),
                style: colInnerStyle },
              content
            );
          } else if (colEle.widgetType == "component") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            if (colEle.componentConfig.subType == "weather") {
              content = _react2.default.createElement(_eChartWeather2.default, { componentConfig: colEle.componentConfig, panelType: 2 });
            } else if (colEle.componentConfig.subType == "datetime") {
              content = _react2.default.createElement(_eChartDateTime2.default, { componentConfig: colEle.componentConfig, panelType: 2 });
            } else if (colEle.componentConfig.subType == "commonFunc") {
              content = _react2.default.createElement(_CommonFunctions2.default, null);
            }
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer2-col-inner panelLayer2-col-final " + self.addBorderClassName(colNoBorder),
                style: colInnerStyle },
              content
            );
          } else if (colEle.widgetType == "none") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colStyle.display = "none";
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = _react2.default.createElement(
              'div',
              { className: 'panelLayer2-nocontrol' },
              self.state.isInDesign ? " 无控件" : ""
            );
            curCol = _react2.default.createElement('div', {
              className: "panelLayer2-col-inner panelLayer2-col-final " + self.addBorderClassName(colNoBorder),
              style: colInnerStyle });
          } else {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = _react2.default.createElement(
              'div',
              null,
              '\u672A\u77E5\u63A7\u4EF6'
            );
            curCol = _react2.default.createElement(
              'div',
              { className: "panelLayer2-col-inner panelLayer2-col-final " + self.addBorderClassName(colNoBorder), style: colInnerStyle },
              content
            );
          }
          if (colStyle.padding == "0px" || colStyle.padding == "") {
            colArr.push(_react2.default.createElement(
              _col2.default,
              { className: "panelLayer2-col-outer panelLayer2-col-outer-nopadding", style: colStyle },
              curCol
            ));
          } else {
            colArr.push(_react2.default.createElement(
              _col2.default,
              { className: "panelLayer2-col-outer panelLayer2-col-outer-haspadding", style: colStyle },
              curCol
            ));
          }
        });
        var rowNoBorder = rowInnerStyle.border.indexOf("0px") == 0 || rowInnerStyle.border.indexOf(" 0px") >= 0;
        var isTitleArea_Row = rowEle.isTitleArea ? rowEle.isTitleArea : false;
        if (rowStyle.padding == "0px" || rowStyle.padding == "") {
          rowArr.push(_react2.default.createElement(
            _row2.default,
            { className: "panelLayer2-row-outer panelLayer2-row-outer-nopadding", style: rowStyle },
            _react2.default.createElement(
              'div',
              { className: "panelLayer2-row-inner " + self.addBorderClassName(rowNoBorder), style: rowInnerStyle },
              colArr
            )
          ));
        } else {
          rowArr.push(_react2.default.createElement(
            _row2.default,
            { className: "panelLayer2-row-outer panelLayer2-row-outer-haspadding", style: rowStyle },
            _react2.default.createElement(
              'div',
              { className: "panelLayer2-row-inner " + self.addBorderClassName(rowNoBorder), style: rowInnerStyle },
              colArr
            )
          ));
        }
      });
      return rowArr;
    }
  }, {
    key: 'getSelectedCol',
    value: function getSelectedCol(colKey) {
      var self = this;
      var rows = self.state.panelConfig.panelLayOutConfig.rows;
      var colsInfo = self.getColParentInfo(rows, colKey);
      var cols = colsInfo.cols;
      var colIndex = colsInfo.colIndex;
      if (cols && colIndex != undefined) return cols[colIndex];else return {};
    }
  }, {
    key: 'getColParentInfo',
    value: function getColParentInfo(rows, colKey) {
      var self = this;
      var obj = {};
      rows.forEach(function (rowEle, rowIndex) {
        rowEle.cols.forEach(function (colEle, colIndex) {
          if (colEle.colKey === colKey) {
            obj.rows = rows;
            obj.rowIndex = rowIndex;
            obj.cols = rowEle.cols;
            obj.colIndex = colIndex;
          } else if (colEle.widgetType == "rows") {
            var obj2 = self.getColParentInfo(colEle.widgetValue, colKey);
            obj = _.isEmpty(obj2) ? obj : obj2;
          }
        });
      });
      return obj;
    }
  }, {
    key: 'getChartRender',
    value: function getChartRender(colEle, model) {
      var self = this;
      return _react2.default.createElement(
        'div',
        { className: 'eChartPanel2-Chart', style: { width: '100%' } },
        _react2.default.createElement(_eChartDisplay2.default, {
          viewModel: model,
          chartDisplayType: "panel",
          panelType: eChartCommon.panelType.panelType2,
          isInDesign: self.state.isInDesign,
          panelChartConfig: colEle.panelChartConfig,
          showIt: true
        })
      );
    }
  }, {
    key: 'getChartEleByKey',
    value: function getChartEleByKey(rows, chartKey) {
      var self = this;
      var obj = undefined;
      rows.forEach(function (rowEle) {
        rowEle.forEach(function (colEle) {
          if (colEle.widgetType == "chart" && colEle.panelChartConfig.chartKey === chartKey) {
            obj = colEle;
          } else if (colEle.widgetType == "rows") {
            if (obj === undefined) {
              obj = self.getChartEleByKey(colEle.widgetValue, chartKey);
            }
          }
        });
      });
      return obj;
    }
  }, {
    key: 'goBack',
    value: function goBack(e) {
      if (this.state.isInDesign == true) {
        this.props.doFunc();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      eChartCommon.LogChartInfo("大屏方案2 eChartPanelDisplay2展现Render Begin ", "", 900);
      var self = this;
      if (self.state.panelConfig) {
        var content = void 0;
        var style = self.getStyle_Edit("all", "", self.state.panelConfig);
        var innerStyle = self.getInnerStyle_Edit("all", "", self.state.panelConfig);
        content = self.getRows(self.state.panelConfig.panelLayOutConfig.rows, true);
        var tmp = _react2.default.createElement(
          'div',
          {
            className: "eChartPanel2 panelLayer2-all-outer " + (style.padding == "0px" ? " panelLayer2-all-outer-nopadding " : " panelLayer2-all-outer-haspadding"),
            style: style
          },
          self.state.isInDesign == true ? _react2.default.createElement(
            'div',
            { className: 'Tabletop-Kanban' },
            _react2.default.createElement(
              _antd.Button,
              { className: 'ant-btn no-border-radius', onClick: function onClick() {
                  return self.goBack();
                } },
              _react2.default.createElement(_SvgIcon2.default, { type: 'rollback' }),
              ' \u8FD4\u56DE'
            )
          ) : _react2.default.createElement('div', null),
          _react2.default.createElement(
            'div',
            { className: 'panelLayer2-all-inner', style: innerStyle },
            content
          )
        );
        eChartCommon.LogChartInfo("大屏方案2 eChartPanelDisplay2展现Render End ", "", 900);
        return tmp;
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'eChart-nodata' },
          '\u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~(\u76D1\u63A7\u89C6\u56FE)'
        );
      }
    }
  }]);

  return eChartPanelDisplay2;
}(_react2.default.Component);

exports.default = eChartPanelDisplay2;