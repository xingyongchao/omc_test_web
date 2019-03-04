'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartDisplay_Mobile = require('../echart/eChartDisplay_Mobile');

var _eChartDisplay_Mobile2 = _interopRequireDefault(_eChartDisplay_Mobile);

var _eChartSum = require('./component/eChartSum');

var _eChartSum2 = _interopRequireDefault(_eChartSum);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { Button } from 'antd/lib/radio';
var EChartPanelSplit = null;
var PullToRefresh = null;
// 移动看板

var eChartPanelDisplay3_Design = function (_React$Component) {
  _inherits(eChartPanelDisplay3_Design, _React$Component);

  function eChartPanelDisplay3_Design(props) {
    _classCallCheck(this, eChartPanelDisplay3_Design);

    var _this = _possibleConstructorReturn(this, (eChartPanelDisplay3_Design.__proto__ || Object.getPrototypeOf(eChartPanelDisplay3_Design)).call(this, props));

    eChartCommon.LogChartInfo("eChartPanelDisplay3 constructor", "", 900);
    _this.serieNum = Math.random();
    var isInDesign = props.isInDesign || false;
    if (isInDesign) {
      // EChartPanelSplit = require('./eChartPanelSplit').default;
    } else {
      PullToRefresh = require('antd-mobile').PullToRefresh;
    }
    _this.state = {
      panelConfig: props.panelConfig ? props.panelConfig : undefined,
      isInDesign: isInDesign,
      panelId: props.panelId,
      chartDisplayType: eChartCommon.chartDisplayType.panel,
      panelType: eChartCommon.panelType.panelType3,
      curOperateType: "",
      selectedColKey: "",
      refreshKey: _this.getNewRefreshKey(),
      focusedKey: ""
    };
    return _this;
  }

  _createClass(eChartPanelDisplay3_Design, [{
    key: 'getNewRefreshKey',
    value: function getNewRefreshKey() {
      return "Refresh_" + eChartCommon.getRandom();
    }
  }, {
    key: 'Refresh',
    value: function Refresh() {
      //下拉刷新
      this.setState({ refreshKey: this.getNewRefreshKey() });
      if (this.state.isInDesign == false) this.props.refreshForXieLa();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      eChartCommon.LogChartInfo("eChartPanelDisplay3 render", "", 900);
      var self = this;
      if (self.state.panelConfig) {
        var content = void 0;
        var style = self.getStyle_Edit("all", "", self.state.panelConfig);
        var innerStyle = self.getInnerStyle_Edit("all", "", self.state.panelConfig);
        content = self.getRows(self.state.panelConfig.panelLayOutConfig.rows, true);
        var tmp = _react2.default.createElement(
          'div',
          {
            key: self.state.refreshKey,
            id: 'eChartPanelDisplay3_Id',
            className: "eChartPanel3 panelLayer3-all-outer " + (style.padding == "0px" ? " panelLayer3-all-outer-nopadding " : " panelLayer3-all-outer-haspadding"),
            style: style
          },
          _react2.default.createElement(
            'div',
            { className: 'panelLayer3-all-inner', style: innerStyle },
            content
          )
        );
        eChartCommon.LogChartInfo("大屏方案3 eChartPanelDisplay3展现Render End ", "", 900);
        if (self.state.isInDesign) {
          return tmp;
        } else {
          return _react2.default.createElement(
            PullToRefresh,
            {
              indicator: { activate: " ", deactivate: " ", release: " ", finish: " " },
              refreshing: false,
              damping: 100,
              style: {
                height: '100%',
                width: '100%',
                overflow: 'auto'
              },
              direction: 'down',
              onRefresh: function onRefresh() {
                _this2.Refresh();
              }
            },
            tmp
          );
        }
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'eChart-nodata' },
          '\u6682\u65F6\u6CA1\u6709\u6570\u636E\u54E6~(\u76D1\u63A7\u89C6\u56FE)'
        );
      }
    }
  }, {
    key: 'getImageText',
    value: function getImageText(config, colEle) {
      var self = this;
      var style = {};
      if (config.subType == "title") {
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
          {
            style: style,
            className: config.logoImg ? "eChartPanelDisplay3_HasImg" : "eChartPanelDisplay3_NoImg" },
          _react2.default.createElement('img', { id: colEle.colKey + "_img",
            style: imgStyle,
            src: config.logoImg
          })
        );
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      if (self.state.isInDesign == false && !self.state.panelConfig) {
        self.getPanel(self.state.panelId);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      eChartCommon.LogChartInfo("eChartPanelDisplay3 componentWillReceiveProps", "", 900);
      if (this.state.isInDesign == false && nextProps.panelId != this.state.panelId) {
        this.getPanel(nextProps.panelId);
      } else if (this.state.isInDesign == true && _.isEqual(nextProps.panelConfig, this.state.panelConfig) == false) {
        if (nextProps.panelConfig.templateKey != this.state.panelConfig.templateKey) this.setState({ panelConfig: nextProps.panelConfig, selectedColKey: "" });else this.setState({ panelConfig: nextProps.panelConfig });
      }
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
      style.border = "0px";
      style.margin = "0px";
      if (eleType == "row") {
        style.width = '100%';
      } else if (eleType == "col") {
        style.width = ele.width;
        style.float = 'left';
        style.overflow = "hidden";
      } else if (eleType == "all") {
        style.width = '100%';
        if (this.state.isInDesign == false) style.height = window.innerHeight;else style.height = '100%';
        // style.overflow = "auto"
        style.border = "solid 0px #cccccc";
      }
      if (eleType == "col" && (innerType == "none" || innerType == "control")) {
        if (this.state.isInDesign == true) style.padding = "7px 7px 7px 7px";else style.padding = "0.1rem";
      } else {
        style.padding = "0px";
      }
      return style;
    }
  }, {
    key: 'getInnerStyle_Edit',
    value: function getInnerStyle_Edit(eleType, innerType, ele) {
      var style = {};
      var self = this;
      style.width = '100%';
      style.padding = 0;
      style.margin = 0;
      if (self.state.isInDesign == true && ele.colKey == self.state.selectedColKey) {
        style.border = "solid " + eChartCommon.panelDefaultValue.borderWidth + " #969BA4";
      } else if (self.state.isInDesign == true && innerType == "none") {
        style.border = "dashed " + eChartCommon.panelDefaultValue.borderWidth + " #969BA4";
      } else if (eleType == "col" && (innerType == "control" || innerType == "none")) {
        style.border = eChartCommon.panelDefaultValue.borderWidth + " #fff  ";
      } else {
        style.border = "0px";
      }
      if (eleType == "col" && innerType == "control") {} else if (innerType == "none") {
        style.backgroundColor = "white";
        style.height = self.calcNoneAreaHeight();
      } else if (eleType == "all") {
        if (this.state.isInDesign == false) style.height = window.innerHeight;
      }
      return style;
    }
  }, {
    key: 'calcNoneAreaHeight',
    value: function calcNoneAreaHeight(baseRowHeight) {
      return 100;
      // baseRowHeight = baseRowHeight || 0.5;
      // let width = 0;
      // if (this.state.isInDesign == true) {
      //   let divEle = document.getElementById("eChartPanelDisplay3_Id");
      //   if (divEle) {
      //     width = divEle.clientWidth;
      //   }
      //   else {
      //     width = 650;
      //   }
      // }
      // else {
      //   width = window.innerWidth ? window.innerWidth : 376;
      // }
      // if (width) {
      //   return width * baseRowHeight;
      // }
      // else {
      //   return 150;
      // }
    }
  }, {
    key: 'addBorderClassName',
    value: function addBorderClassName(bNoBorder) {
      if (bNoBorder) return " panelLayer3-noborder";else return " panelLayer3-hasborder";
    }
  }, {
    key: 'setSelectedColKey',
    value: function setSelectedColKey(selectedColKey) {
      this.state.selectedColKey = selectedColKey;
      this.state.curOperateType = "";
      if (this.props.selectCol) this.props.selectCol(selectedColKey);
    }
  }, {
    key: 'getRows',
    value: function getRows(rows, bOutRow) {
      var _this3 = this;

      var self = this;
      var rowArr = [];
      rows.forEach(function (rowEle) {
        var colArr = [];
        var rowStyle = self.getStyle_Edit("row", "", rowEle);
        var rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
        rowEle.cols.forEach(function (colEle) {
          var colStyle = void 0;
          var colInnerStyle = void 0;
          var curCol = void 0;
          var content = void 0;
          var colNoBorder = void 0;
          var isTitleArea = colEle.isTitleArea ? colEle.isTitleArea : false;
          var bFocused = false;
          var delButton = void 0;
          var onClickFunc = void 0;
          if (colEle.widgetType == "none" || colEle.widgetType == "component" || colEle.widgetType == "sum" || colEle.widgetType == "chart" || colEle.widgetType == "imagetext") {
            onClickFunc = function onClickFunc() {
              return self.setSelectedColKey(colEle.colKey);
            };
          }
          if (colEle.widgetType == "rows") {
            colStyle = self.getStyle_Edit("col", "rows", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = self.getRows(colEle.widgetValue, false);
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer3-col-inner" + self.addBorderClassName(colNoBorder),
                style: colInnerStyle },
              content
            );
          } else if (colEle.widgetType == "chart") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = self.getChartRender(colEle);
            bFocused = colEle.colKey == self.state.focusedKey ? true : false;
            if (bFocused && self.state.isInDesign == true) {
              delButton = self.getDelButton(colEle.colKey);
            }
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: "panelLayer3-col-inner panelLayer3-col-final " + self.addBorderClassName(colNoBorder) + (bFocused ? " panelLayer3-col-isfocused" : " panelLayer3-col-isnotfocused"),
                style: colInnerStyle,
                onClick: onClickFunc
              },
              content,
              delButton
            );
          } else if (colEle.widgetType == "sum") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            // if (colEle.sumConfig.subType == "count") {
            //   content = <EChartSumCountUp
            //     showIt={true}
            //     sumConfig={colEle.sumConfig}
            //     chartDisplayType={self.state.chartDisplayType}
            //     panelType={self.state.panelType}
            //   />;
            // }
            // else {
            content = _react2.default.createElement(_eChartSum2.default, {
              showIt: true,
              sumConfig: colEle.sumConfig,
              panelType: self.state.panelType,
              isInDesign: self.state.isInDesign
            });
            // }
            bFocused = colEle.colKey == self.state.focusedKey ? true : false;
            if (bFocused && self.state.isInDesign == true) {
              delButton = self.getDelButton(colEle.colKey);
            }
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: "panelLayer3-col-inner panelLayer3-col-final " + self.addBorderClassName(colNoBorder) + (bFocused ? " panelLayer3-col-isfocused" : " panelLayer3-col-isnotfocused"),
                style: colInnerStyle,
                onClick: onClickFunc
              },
              content,
              delButton
            );
          } else if (colEle.widgetType == "none") {
            bFocused = colEle.colKey == self.state.focusedKey ? true : false;
            colStyle = self.getStyle_Edit("col", "none", colEle);
            if (self.state.isInDesign) {
              colInnerStyle = self.getInnerStyle_Edit("col", "none", colEle);
              colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;

              var splitContent = _react2.default.createElement(EChartPanelSplit, {
                colEle: colEle,
                doFunc: function doFunc(bOK, info) {
                  return self.doSplit(bOK, info);
                },
                showContent: function showContent(bOK, colKey) {
                  return self.showSplitCard(bOK, colKey);
                },
                selectedColKey: self.state.selectedColKey,
                curOperateType: self.state.curOperateType
                // skinConfig={self.skinConfig}
                , panelType: self.state.panelType
              });
              content = _react2.default.createElement(
                'div',
                {
                  className: 'panelLayer3-nocontrol',
                  style: { display: bFocused ? "" : "none" }
                },
                splitContent
              );
            } else {
              content = _react2.default.createElement('div', { className: 'panelLayer3-nocontrol' });
            }

            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: "panelLayer3-col-inner panelLayer3-col-final " + self.addBorderClassName(colNoBorder) + (bFocused ? " panelLayer3-col-isfocused" : " panelLayer3-col-isnotfocused"),
                style: colInnerStyle,
                onClick: onClickFunc
              },
              content
            );
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
              {
                className: "panelLayer3-col-inner panelLayer3-col-final " + self.addBorderClassName(colNoBorder),
                style: colInnerStyle },
              content
            );
          }
          if (colStyle.padding == "0px" || colStyle.padding == "") {
            colArr.push(_react2.default.createElement(
              _col2.default,
              {
                className: "panelLayer3-col-outer panelLayer3-col-outer-nopadding",
                style: colStyle
              },
              curCol
            ));
          } else {
            colArr.push(_react2.default.createElement(
              _col2.default,
              {
                className: "panelLayer3-col-outer panelLayer3-col-outer-haspadding",
                style: colStyle
              },
              curCol
            ));
          }
        });
        var rowNoBorder = rowInnerStyle.border.indexOf("0px") == 0 || rowInnerStyle.border.indexOf(" 0px") >= 0;
        var isTitleArea_Row = rowEle.isTitleArea ? rowEle.isTitleArea : false;
        if (rowStyle.padding == "0px" || rowStyle.padding == "") {
          rowArr.push(_react2.default.createElement(
            _row2.default,
            { className: "panelLayer3-row-outer panelLayer3-row-outer-nopadding", style: rowStyle },
            _react2.default.createElement(
              'div',
              { className: "panelLayer3-row-inner " + self.addBorderClassName(rowNoBorder), style: rowInnerStyle },
              colArr
            )
          ));
        } else {
          rowArr.push(_react2.default.createElement(
            _row2.default,
            { className: "panelLayer3-row-outer panelLayer3-row-outer-haspadding", style: rowStyle },
            _react2.default.createElement(
              'div',
              { className: "panelLayer3-row-inner " + self.addBorderClassName(rowNoBorder), style: rowInnerStyle },
              colArr
            )
          ));
        }
      });
      return rowArr;
    }
  }, {
    key: 'getDelButton',
    value: function getDelButton(colKey) {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        {
          title: '\u6E05\u9664',
          style: { cursor: "pointer", zIndex: "999" },
          className: "qingchu-btn del-btn eChartPanel3_Del",
          onClick: function onClick() {
            return _this4.props.clearColTypeInner(colKey);
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'qingchu-btn-bg' },
          _react2.default.createElement(_SvgIcon2.default, { type: 'delete' })
        )
      );
    }
  }, {
    key: 'doSplit',
    value: function doSplit(bOK, info) {
      if (bOK && this.props.doSplit) {
        this.props.doSplit(bOK, info, this.state.selectedColKey);
        this.state.selectedColKey = "";
      }
      this.setState({ curOperateType: "" });
    }
  }, {
    key: 'showSplitCard',
    value: function showSplitCard(bOK, colKey) {
      if (bOK) {
        this.setState({ curOperateType: "splitCol", selectedColKey: colKey });
      } else {
        this.setState({ curOperateType: "" });
      }
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
        var curRow = [];
        rowEle.cols.forEach(function (colEle, colIndex) {
          if (colEle.colKey === colKey) {
            // obj.col = colEle;
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
    value: function getChartRender(colEle) {
      var self = this;
      var tmp = _react2.default.createElement(
        'div',
        {
          className: 'eChartPanel3-Chart',
          style: { width: '100%' }
          // key={"Panel3Key_" + colEle.colKey}
        },
        _react2.default.createElement(_eChartDisplay_Mobile2.default
        // key={"Panel3Key_" + colEle.colKey}
        , { chartDisplayType: self.state.chartDisplayType,
          panelType: self.state.panelType,
          isInDesign: self.state.isInDesign,
          panelChartConfig: colEle.panelChartConfig
          // config={colEle.panelChartConfig}
        })
      );
      return tmp;
    }
  }, {
    key: 'getChartEleByKey',
    value: function getChartEleByKey(rows, chartKey) {
      var self = this;
      var obj = undefined;
      rows.forEach(function (rowEle) {
        var curRow = [];
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
    key: 'onMouseEnter',
    value: function onMouseEnter(focusedKey) {
      eChartCommon.LogChartInfo("eChartPanelDisplay3 onMouseEnter", "", 900);
      this.setState({ focusedKey: focusedKey });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      eChartCommon.LogChartInfo("eChartPanelDisplay3 onMouseLeave", "", 900);
      this.setState({ focusedKey: "" });
    }
  }]);

  return eChartPanelDisplay3_Design;
}(_react2.default.Component);

exports.default = eChartPanelDisplay3_Design;