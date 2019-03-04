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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 大屏看板 桌面看板
var eChartPanelDisplay = function (_React$Component) {
  _inherits(eChartPanelDisplay, _React$Component);

  function eChartPanelDisplay(props) {
    _classCallCheck(this, eChartPanelDisplay);

    // let panelConfig = props.panelConfig ? props.panelConfig : eChartCommon.getPanelLayOutTestConfig();
    var _this = _possibleConstructorReturn(this, (eChartPanelDisplay.__proto__ || Object.getPrototypeOf(eChartPanelDisplay)).call(this, props));

    var panelConfig = props.panelConfig;
    _this.serieNum = Math.random();
    _this.state = {
      panelConfig: panelConfig,
      // backStyleArr: eChartCommon.getBackStyleArr(),
      isInDesign: props.isInDesign ? props.isInDesign : false,
      bMounted: false,
      maxedColKey: ""
    };
    _this.panelName = panelConfig.name;
    eChartCommon.LogChartInfo("大屏方案 展现 constructor panelConfig  ", JSON.stringify(panelConfig), 900);
    _this.scaleStyle = {};
    _this.calcPanelWidth(_this.scaleStyle, 16 * 70, 9 * 70, "px");
    _this.skinConfig = "";
    _this.skinStyle = {};
    _this.ImgScaleArr = [];
    _this.setCurrentSkin();
    return _this;
  }

  _createClass(eChartPanelDisplay, [{
    key: 'setCurrentSkin',
    value: function setCurrentSkin() {
      var skinKey = this.state.panelConfig.skinKey_BackStyle || this.state.panelConfig.skinKey_BackColor;
      if (skinKey) {
        this.skinConfig = eChartCommon.getSkinArr(skinKey);
        this.skinStyle.color = this.skinConfig.displaySkin.textColor;
      } else {
        this.skinConfig = "";
      }
    }
  }, {
    key: 'render',
    value: function render() {

      // const { groupConditionState, groupConditionRedux } = this.props;
      var self = this;
      eChartCommon.LogChartInfo("大屏方案 展现 this.serieNum =" + this.serieNum + " Render ImgScaleArr ", JSON.stringify(self.ImgScaleArr), 14);
      if (self.state.panelConfig) {
        var content = void 0;
        var maxedContent = void 0;
        // let style = self.getStyle("all", self.state.panelConfig);
        var style = self.getStyle_Edit("all", "", self.state.panelConfig);
        var innerStyle = self.getInnerStyle_Edit("all", "", self.state.panelConfig);
        var maxedInnerStyle = _.cloneDeep(innerStyle);
        if (self.state.maxedColKey != "") {
          maxedContent = self.getMaxedColContent(self.state.maxedColKey);
          maxedInnerStyle.display = "";
          innerStyle.display = "none";
        } else {
          innerStyle.display = "";
          maxedInnerStyle.display = "none";
        }
        content = self.getRows(self.state.panelConfig.panelLayOutConfig.rows);

        return _react2.default.createElement(
          'div',
          { className: "eChartPanel panelLayer-all-outer " + (self.skinConfig ? self.skinConfig.skinClassNameFlag + "-all" : "") + (style.padding == "0px" ? " panelLayer-all-outer-nopadding " : " panelLayer-all-outer-haspadding"), style: style },
          _react2.default.createElement(
            'div',
            { className: 'panelLayer-all-inner', style: maxedInnerStyle },
            maxedContent
          ),
          _react2.default.createElement(
            'div',
            { className: 'panelLayer-all-inner', style: innerStyle },
            content
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'eChart-nodata', style: self.skinStyle },
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
        // if (config.hasOwnProperty("backgroundColor")) style.backgroundColor = config.backgroundColor;
        if (config.hasOwnProperty("height")) style.height = config.height;
        if (config.hasOwnProperty("width")) style.width = config.width;
        if (config.hasOwnProperty("color")) style.color = config.color;
        if (this.skinStyle.color) style.color = this.skinStyle.color;
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

        var imgScale = _.find(this.ImgScaleArr, function (o) {
          return o.imgId == colEle.colKey + "_img";
        });
        if (config.logoImg && !imgScale) {
          var tmp = {};
          tmp.divId = colEle.colKey + "_div";
          tmp.imgId = colEle.colKey + "_img";
          tmp.divWidth = 0;
          tmp.divHeight = 0;
          tmp.imgWidth = 0;
          tmp.imgHeight = 0;
          tmp.displayBy = "";
          tmp.bLoadImg = false;
          this.ImgScaleArr.push(tmp);
        }
        var imgStyle = { display: "block" };

        if (imgScale && imgScale.displayBy == "width") {
          style = { width: "100%", height: "100%" };
          imgStyle.width = "100%";
          if (config.logoPosition.vertical == "top") {
            imgStyle.padding = "0px  0px " + Math.ceil(imgScale.padding) + "px  0px ";
          } else if (config.logoPosition.vertical == "middle") {
            imgStyle.padding = " " + Math.ceil(imgScale.padding / 2) + "px  0px " + Math.ceil(imgScale.padding / 2) + "px  0px ";
          } else if (config.logoPosition.vertical == "bottom") {
            imgStyle.padding = Math.ceil(imgScale.padding) + "px 0px  0px 0px ";
          }
        } else if (imgScale && imgScale.displayBy == "height") {
          style = { width: "100%", height: "100%" };
          imgStyle.height = "100%";

          if (config.logoPosition.horizontal == "left") {
            imgStyle.padding = " 0px " + Math.ceil(imgScale.padding) + "px 0px 0px ";
          } else if (config.logoPosition.horizontal == "center") {
            imgStyle.padding = " 0px " + Math.ceil(imgScale.padding / 2) + "px 0px " + Math.ceil(imgScale.padding / 2) + "px ";
          } else if (config.logoPosition.horizontal == "right") {
            imgStyle.padding = " 0px 0px 0px " + Math.ceil(imgScale.padding) + "px";
          }
        } else if (imgScale && imgScale.displayBy == "no") {
          style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          };
          var transform1 = "";
          var transform2 = "";
          if (config.logoPosition.horizontal == "left") {
            style.left = "0%";
            transform1 = "0%";
          } else if (config.logoPosition.horizontal == "center") {
            style.left = "50%";
            transform1 = "-50%";
          } else if (config.logoPosition.horizontal == "right") {
            style.left = "100%";
            transform1 = "-100%";
          }

          if (config.logoPosition.vertical == "top") {
            style.top = "0%";
            transform2 = "0%";
          } else if (config.logoPosition.vertical == "middle") {
            style.top = "50%";
            transform2 = "-50%";
          } else if (config.logoPosition.vertical == "bottom") {
            style.top = "100%";
            transform2 = "-100%";
          }
          style.transform = "translate(" + transform1 + "," + transform2 + ")";
        } else {
          imgStyle.width = "100%";
          imgStyle.height = "100%";
        }

        return _react2.default.createElement(
          'div',
          { style: style, className: config.logoImg ? "eChartPanelDisplay_HasImg" : "eChartPanelDisplay_NoImg" },
          _react2.default.createElement('img', { id: colEle.colKey + "_img",
            style: imgStyle,
            src: self.state.bMounted ? config.logoImg : "",
            onLoad: function onLoad() {
              return self.onLoadImg(colEle);
            } })
        );
      }
    }
  }, {
    key: 'onLoadImg',
    value: function onLoadImg(colEle) {
      var self = this;
      eChartCommon.LogChartInfo("大屏方案 展现 this.serieNum =" + this.serieNum + " Load01 ImgScaleArr ", JSON.stringify(self.ImgScaleArr), 14);
      var ele = _.find(self.ImgScaleArr, function (o) {
        return o.imgId == colEle.colKey + "_img";
      });
      if (ele) {
        ele.bLoadImg = true;
        var imgEle = document.getElementById(ele.imgId);
        var divEle = document.getElementById(ele.divId);
        if (imgEle) {
          ele.imgWidth = imgEle.naturalWidth;
          ele.imgHeight = imgEle.naturalHeight;
          ele.divWidth = divEle.clientWidth;
          ele.divHeight = divEle.clientHeight;
          if (ele.imgWidth && ele.imgHeight && ele.divWidth && ele.divHeight) {
            if (ele.imgWidth > ele.divWidth || ele.imgHeight > ele.divHeight) {
              if (Number(ele.imgWidth) * Number(ele.divHeight) > Number(ele.imgHeight) * Number(ele.divWidth)) {
                ele.displayBy = "width";
                ele.padding = ele.divHeight - ele.imgHeight * ele.divWidth / ele.imgWidth;
              } else {
                ele.displayBy = "height";
                ele.padding = ele.divWidth - ele.imgWidth * ele.divHeight / ele.imgHeight;
              }
            } else {
              ele.displayBy = "no";
            }
          }
        }
      }
      eChartCommon.LogChartInfo("大屏方案 展现 this.serieNum =" + this.serieNum + " Load02 ImgScaleArr ", JSON.stringify(self.ImgScaleArr), 14);
      self.forceUpdate();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var style = {};
      // this.calcPanelWidth(style, 16 * 70, 9 * 70, "px");
      // this.scaleStyle = style;
      this.ImgScaleArr.forEach(function (ele) {
        var divEle = document.getElementById(ele.divId);
        if (divEle) {
          ele.divWidth = divEle.clientWidth;
          ele.divHeight = divEle.clientHeight;
        }
      });
      this.setState({ bMounted: true });
      eChartCommon.LogChartInfo("大屏方案 展现 this.serieNum =" + this.serieNum + " DMount  ImgScaleArr ", JSON.stringify(self.ImgScaleArr), 14);
    }
    // getStyle(type, ele) {
    //   let style = {};
    //   if (type == "row") {
    //     style.width = '100%';
    //     style.height = ele.height;
    //   }
    //   else if (type == "col") {
    //     let widgetType = ele.widgetType;
    //     style.height = '100%';
    //     style.width = ele.width;
    //     style.float = 'left';
    //   }
    //   else if (type == "all") {
    //     style.width = '800px';
    //     style.height = '600px';
    //   }


    //   if (ele.hasOwnProperty("backgroundImage") && _.isEmpty(ele.backgroundImage) == false)
    //     style.backgroundImage = 'url(' + ele.backgroundImage + ')';
    //   if (ele.hasOwnProperty("padding")) style.padding = ele.padding;
    //   if (ele.hasOwnProperty("margin")) style.margin = ele.margin;

    //   ele.padding = 0;
    //   ele.margin = 0;
    //   // ele.borderWidth = 0;

    //   if (ele.hasOwnProperty("backgroundColor"))
    //     style.backgroundColor = ele.backgroundColor;
    //   style.border = (ele.borderWidth ? ele.borderWidth : "0px") + " solid " + (ele.borderColor ? ele.borderColor : " black");
    //   return style;
    // }

  }, {
    key: 'getStyle_Edit',
    value: function getStyle_Edit(eleType, innerType, ele) {

      var style = {};
      if (eleType == "row") {
        style.width = '100%';
        style.height = ele.height;
      } else if (eleType == "col") {
        // let widgetType = ele.widgetType;
        style.height = '100%';
        style.width = ele.width;
        style.float = 'left';
        style.overflow = "hidden";
        // style.position = "relative";//
      } else if (eleType == "all") {
        // style.width = '800px';
        // style.height = '600px';
        if (this.state.isInDesign && 1 == 2) {
          // this.calcPanelWidth(style, 16 * 70, 9 * 70, "px");
          style.width = this.scaleStyle.width;
          style.height = this.scaleStyle.height;
        } else {
          style.width = '100%';
          style.height = '100%';
        }
      }

      style.border = "0px";
      style.padding = "0px";
      style.margin = "0px";
      if (eChartDemoData.demoConfig.isShowAllMargin == true || eleType == "col" && innerType == "control" || ele.bOuterMargin) {
        if (ele.hasOwnProperty("margin")) style.padding = ele.margin;
      }

      return style;
    }
  }, {
    key: 'getInnerStyle_Edit',
    value: function getInnerStyle_Edit(eleType, innerType, ele) {

      var style = {};
      style.width = '100%';
      style.height = '100%';
      style.padding = 0;
      style.margin = 0;
      if (eChartDemoData.demoConfig.isShowAllMargin == true || eleType == "all" || eleType == "col" && innerType == "control" || ele.bOuterBorder) {
        var borderType = "solid";
        // if (eleType == "col" && innerType == "control" && this.getSelectedColKey() == ele.colKey) {
        //   borderType = "dashed";
        // }
        var borderWidth = ele.borderWidth ? ele.borderWidth : eChartCommon.panelDefaultValue.borderWidth;
        var borderColor = eChartCommon.panelDefaultValue.borderColor;
        // borderColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        style.border = borderWidth + " " + borderType + " " + borderColor;
      } else {
        style.border = "0px";
      }
      if (eleType == "all" && ele.hasOwnProperty("margin")) {
        style.padding = ele.margin;
      }

      if (eleType == "col" && innerType == "control" && ele.widgetType != "imagetext" && ele.widgetType != "component") {
        style.padding = eChartCommon.panelDefaultValue.finalControlPadding;
      }
      if (ele.hasOwnProperty("backgroundColor")) style.backgroundColor = ele.backgroundColor;
      if (ele.hasOwnProperty("backgroundImage") && _.isEmpty(ele.backgroundImage) == false) {
        style.backgroundImage = 'url(' + ele.backgroundImage + ')';
      }

      if (!!style.backgroundImage) {
        style.backgroundSize = '100% 100%';
        style.backgroundRepeat = 'no-repeat';
        style.backgroundPosition = 'center';
      }
      return style;
    }
  }, {
    key: 'calcPanelWidth',
    value: function calcPanelWidth(style, maxWidth, maxHeight, postFix) {
      // style.width = '100%';
      // style.height = '100%';

      var self = this;
      var panelConfig = self.state.panelConfig;

      var panelWidthScale = panelConfig.panelWidthScale;
      var panelHeightScale = panelConfig.panelHeightScale;

      if (panelWidthScale && panelHeightScale) {
        if (panelWidthScale / panelHeightScale > maxWidth / maxHeight) {
          style.width = maxWidth;
          style.height = Math.floor(maxWidth * panelHeightScale / panelWidthScale);
        } else {
          style.height = maxHeight;
          style.width = Math.floor(maxHeight * panelWidthScale / panelHeightScale);
        }
      } else {
        style.width = maxWidth;
        style.height = maxHeight;
      }
      style.width = style.width + postFix;
      style.height = style.height + postFix;

      style.width = document.body.clientWidth;
      style.height = document.body.clientHeight;
    }
  }, {
    key: 'addFinalSkinClassName',
    value: function addFinalSkinClassName() {
      if (this.skinConfig) return " " + this.skinConfig.skinClassNameFlag + "-final";else return "";
    }
  }, {
    key: 'addBackStyleAndColorClassName',
    value: function addBackStyleAndColorClassName() {
      var ele = void 0;
      var str = " panelLayer-NoStyleAndColor";
      if (this.state.panelConfig.backStyleKey) {
        ele = eChartCommon.getBackStyleArr(this.state.panelConfig.backStyleKey);
        if (ele && ele.className != "") str = " panelLayer-" + ele.className;
      } else if (this.state.panelConfig.backColorKey) {
        ele = eChartCommon.getBackColorArr(this.state.panelConfig.backColorKey);
        if (ele && ele.className != "") str = " panelLayer-" + ele.className;
      }
      return str;
    }
  }, {
    key: 'addBorderClassName',
    value: function addBorderClassName(bNoBorder) {
      if (bNoBorder) return " panelLayer-noborder";else return " panelLayer-hasborder";
    }
  }, {
    key: 'getRows',
    value: function getRows(rows) {
      var self = this;
      var rowArr = [];
      rows.forEach(function (rowEle) {
        var colArr = [];
        var rowStyle = self.getStyle_Edit("row", "", rowEle);
        var rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
        rowEle.cols.forEach(function (colEle) {
          // let colStyle = self.getStyle("col", colEle);
          var colStyle = void 0;
          var colInnerStyle = void 0;
          var curCol = void 0;
          var content = void 0;
          var colNoBorder = void 0;
          var isTitleArea = colEle.isTitleArea ? colEle.isTitleArea : false;
          if (colEle.widgetType == "chart") {
            // curCol = self.getChartRender(colEle);

            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = self.getChartRender(colEle);
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer-col-inner panelLayer-col-final " + self.addFinalSkinClassName() + self.addBorderClassName(colNoBorder) + self.addBackStyleAndColorClassName(),
                style: colInnerStyle },
              content
            );
          } else if (colEle.widgetType == "rows") {
            colStyle = self.getStyle_Edit("col", "rows", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = self.getRows(colEle.widgetValue);
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer-col-inner" + self.addBorderClassName(colNoBorder),
                style: colInnerStyle },
              content
            );
          } else if (colEle.widgetType == "imagetext") {
            // curCol = self.getTextTitle(colEle.panelImageTextConfig);

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
                className: "panelLayer-col-inner panelLayer-col-final " + self.addFinalSkinClassName() + self.addBorderClassName(colNoBorder) + self.addBackStyleAndColorClassName(),
                style: colInnerStyle,
                id: colEle.colKey + "_div" },
              content
            );
          } else if (colEle.widgetType == "sum") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            if (colEle.sumConfig.subType == "count") {
              content = _react2.default.createElement(_eChartSumCountUp2.default, { showIt: true, sumConfig: colEle.sumConfig, skinConfig: self.skinConfig });
            } else {
              content = _react2.default.createElement(_eChartSum2.default, { showIt: true, sumConfig: colEle.sumConfig, skinConfig: self.skinConfig });
            }
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer-col-inner panelLayer-col-final " + self.addFinalSkinClassName() + self.addBorderClassName(colNoBorder) + self.addBackStyleAndColorClassName(),
                style: colInnerStyle },
              content
            );
          } else if (colEle.widgetType == "component") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            if (colEle.componentConfig.subType == "weather") content = _react2.default.createElement(_eChartWeather2.default, { componentConfig: colEle.componentConfig, skinConfig: self.skinConfig });else if (colEle.componentConfig.subType == "datetime") content = _react2.default.createElement(_eChartDateTime2.default, { componentConfig: colEle.componentConfig, skinConfig: self.skinConfig });
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer-col-inner panelLayer-col-final " + self.addFinalSkinClassName() + self.addBorderClassName(colNoBorder) + self.addBackStyleAndColorClassName(),
                style: colInnerStyle },
              content
            );
          } else if (colEle.widgetType == "none") {
            // colStyle.textAlign = 'center';
            // colStyle.fontSize = 24;
            // curCol = "待定义控件";
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = _react2.default.createElement(
              'div',
              { style: self.skinStyle, className: 'panelLayer-nocontrol' },
              self.state.isInDesign ? " 无控件" : ""
            );
            curCol = _react2.default.createElement('div', {
              className: "panelLayer-col-inner panelLayer-col-final " + self.addFinalSkinClassName() + self.addBorderClassName(colNoBorder) + self.addBackStyleAndColorClassName(),
              style: colInnerStyle });
          } else {
            //colEle.widgetType == 其他
            // colStyle.textAlign = 'center';
            // colStyle.fontSize = 24;
            // curCol = "未知控件";
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
            content = _react2.default.createElement(
              'div',
              { style: self.skinStyle },
              '\u672A\u77E5\u63A7\u4EF6'
            );
            curCol = _react2.default.createElement(
              'div',
              {
                className: "panelLayer-col-inner panelLayer-col-final " + self.addFinalSkinClassName() + self.addBorderClassName(colNoBorder) + self.addBackStyleAndColorClassName(),
                style: colInnerStyle },
              content
            );
          }
          if (colStyle.padding == "0px" || colStyle.padding == "") {
            colArr.push(_react2.default.createElement(
              _col2.default,
              {
                className: "panelLayer-col-outer panelLayer-col-outer-nopadding",
                style: colStyle,
                onDoubleClick: function onDoubleClick(e) {
                  return self.onDoubleClick(e, colEle);
                }
              },
              curCol
            ));
          } else {
            colArr.push(_react2.default.createElement(
              _col2.default,
              {
                className: "panelLayer-col-outer panelLayer-col-outer-haspadding",
                style: colStyle,
                onDoubleClick: function onDoubleClick(e) {
                  return self.onDoubleClick(e, colEle);
                }
              },
              curCol,
              _react2.default.createElement('div', { style: { display: isTitleArea ? "none" : "" }, className: "panelLayer-col-outer-corner-1" }),
              _react2.default.createElement('div', { style: { display: isTitleArea ? "none" : "" }, className: "panelLayer-col-outer-corner-2" }),
              _react2.default.createElement('div', { style: { display: isTitleArea ? "none" : "" }, className: "panelLayer-col-outer-corner-3" }),
              _react2.default.createElement('div', { style: { display: isTitleArea ? "none" : "" }, className: "panelLayer-col-outer-corner-4" })
            ));
          }
        });
        var rowNoBorder = rowInnerStyle.border.indexOf("0px") == 0 || rowInnerStyle.border.indexOf(" 0px") >= 0;
        var isTitleArea_Row = rowEle.isTitleArea ? rowEle.isTitleArea : false;
        if (rowStyle.padding == "0px" || rowStyle.padding == "") {
          rowArr.push(_react2.default.createElement(
            _row2.default,
            { className: "panelLayer-row-outer panelLayer-row-outer-nopadding", style: rowStyle },
            _react2.default.createElement(
              'div',
              { className: "panelLayer-row-inner " + self.addBorderClassName(rowNoBorder), style: rowInnerStyle },
              colArr
            )
          ));
        } else {
          rowArr.push(_react2.default.createElement(
            _row2.default,
            { className: "panelLayer-row-outer panelLayer-row-outer-haspadding", style: rowStyle },
            _react2.default.createElement(
              'div',
              { className: "panelLayer-row-inner " + self.addBorderClassName(rowNoBorder), style: rowInnerStyle },
              colArr
            ),
            _react2.default.createElement('div', { style: { display: isTitleArea_Row ? "none" : "" }, className: "panelLayer-row-outer-corner-1" }),
            _react2.default.createElement('div', { style: { display: isTitleArea_Row ? "none" : "" }, className: "panelLayer-row-outer-corner-2" }),
            _react2.default.createElement('div', { style: { display: isTitleArea_Row ? "none" : "" }, className: "panelLayer-row-outer-corner-3" }),
            _react2.default.createElement('div', { style: { display: isTitleArea_Row ? "none" : "" }, className: "panelLayer-row-outer-corner-4" })
          ));
        }
      });
      return rowArr;
    }
  }, {
    key: 'getMaxedColContent',
    value: function getMaxedColContent(colKey) {
      var self = this;
      var colEle = this.getSelectedCol(colKey);
      eChartCommon.LogChartInfo("eChartPanelDisplay 双击事件 " + " colEle.colKey =  " + colEle.colKey + "  colEle.widgetType =  " + colEle.widgetType + " colEle =", JSON.stringify(colEle), 1);

      var isTitleArea = colEle.isTitleArea ? colEle.isTitleArea : false;

      var colStyle = self.getStyle_Edit("col", "control", colEle);
      var colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
      var colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
      var content = self.getChartRender(colEle);
      var curCol = _react2.default.createElement(
        'div',
        {
          onDoubleClick: function onDoubleClick(e) {
            return self.onDoubleClick(e, "");
          },
          className: "panelLayer-col-inner panelLayer-col-final " + self.addFinalSkinClassName() + self.addBorderClassName(colNoBorder) + self.addBackStyleAndColorClassName(),
          style: colInnerStyle },
        content
      );
      return curCol;
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(e, colEle) {

      if (colEle && colEle.widgetType == "chart") {
        this.setState({ maxedColKey: colEle.colKey });
        if (this.props.doFunc) {
          this.props.doFunc("pauseCarouse", colEle.colKey);
        }
      } else if (colEle == "") {
        this.setState({ maxedColKey: "" });
        this.props.doFunc("pauseCarouse", "");
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
          className: 'eChartPanel-Chart',
          style: { height: '100%', width: '100%' }
        },
        _react2.default.createElement(_eChartDisplay2.default, {
          chartDisplayType: "panel",
          panelType: eChartCommon.panelType.panelType1,
          isInDesign: self.state.isInDesign,
          panelChartConfig: colEle.panelChartConfig,
          handleChartClick: function handleChartClick(btnKey, btnValue) {
            return self.handleChartClick(btnKey, btnValue);
          },
          showIt: true,
          skinConfig: self.skinConfig
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
    key: 'handleChartClick',
    value: function handleChartClick(btnKey, btnValue) {
      var self = this;
      if (btnKey == "SwitchSize") {
        this.state.panelConfig.curChartKey = this.state.panelConfig.curChartKey == btnValue ? "" : btnValue;
        this.setState();
      } else if (btnKey == "ShowFilter") {
        var colEle = self.getChartEleByKey(self.state.panelConfig.panelLayOutConfig.rows, btnValue);
        if (colEle) colEle.panelChartConfig.bShowFilter = !colEle.panelChartConfig.bShowFilter;
      }
    }
  }]);

  return eChartPanelDisplay;
}(_react2.default.Component);

exports.default = eChartPanelDisplay;