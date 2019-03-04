import React, { Component } from 'react';
import { Input } from 'antd';
import Row from '../../basic/row';
import Col from '../../basic/col';
import * as  eChartCommon from '../eChartCommon';
import EChartDisplay from '../echart/eChartDisplay';
import { Format } from '../../../helpers/formatDate';
import * as eChartDemoData from '../eChartDemoData';
import EChartWeather from './component/eChartWeather';
import EChartSum from './component/eChartSum';
import EChartSumCountUp from './component/eChartSumCountUp';
import EChartDateTime from './component/eChartDateTime';

// 大屏看板 桌面看板
export default class eChartPanelDisplay extends React.Component {
  constructor(props) {
    super(props);
    // let panelConfig = props.panelConfig ? props.panelConfig : eChartCommon.getPanelLayOutTestConfig();
    let panelConfig = props.panelConfig;
    this.serieNum = Math.random();
    this.state = {
      panelConfig: panelConfig,
      // backStyleArr: eChartCommon.getBackStyleArr(),
      isInDesign: props.isInDesign ? props.isInDesign : false,
      bMounted: false,
      maxedColKey: ""
    };
    this.panelName = panelConfig.name;
    eChartCommon.LogChartInfo("大屏方案 展现 constructor panelConfig  ", JSON.stringify(panelConfig), 900);
    this.scaleStyle = {};
    this.calcPanelWidth(this.scaleStyle, 16 * 70, 9 * 70, "px");
    this.skinConfig = "";
    this.skinStyle = {};
    this.ImgScaleArr = [];
    this.setCurrentSkin();
  }
  setCurrentSkin() {
    let skinKey = this.state.panelConfig.skinKey_BackStyle || this.state.panelConfig.skinKey_BackColor;
    if (skinKey) {
      this.skinConfig = eChartCommon.getSkinArr(skinKey);
      this.skinStyle.color = this.skinConfig.displaySkin.textColor;
    }
    else {
      this.skinConfig = "";
    }
  }
  render() {

    // const { groupConditionState, groupConditionRedux } = this.props;
    let self = this;
    eChartCommon.LogChartInfo("大屏方案 展现 this.serieNum =" + this.serieNum + " Render ImgScaleArr ", JSON.stringify(self.ImgScaleArr), 14);
    if (self.state.panelConfig) {
      let content;
      let maxedContent;
      // let style = self.getStyle("all", self.state.panelConfig);
      let style = self.getStyle_Edit("all", "", self.state.panelConfig);
      let innerStyle = self.getInnerStyle_Edit("all", "", self.state.panelConfig);
      let maxedInnerStyle = _.cloneDeep(innerStyle);
      if (self.state.maxedColKey != "") {
        maxedContent = self.getMaxedColContent(self.state.maxedColKey);
        maxedInnerStyle.display = "";
        innerStyle.display = "none"
      }
      else {
        innerStyle.display = "";
        maxedInnerStyle.display = "none"
      }
      content = self.getRows(self.state.panelConfig.panelLayOutConfig.rows);

      return <div className={"eChartPanel panelLayer-all-outer " + (self.skinConfig ? self.skinConfig.skinClassNameFlag + "-all" : "") + (style.padding == "0px" ? " panelLayer-all-outer-nopadding " : " panelLayer-all-outer-haspadding")} style={style}>
        <div className="panelLayer-all-inner" style={maxedInnerStyle} >
          {maxedContent}
        </div>
        <div className="panelLayer-all-inner" style={innerStyle} >
          {content}
        </div>
      </div>;
    }
    else {
      return <div className='eChart-nodata' style={self.skinStyle} >暂时没有数据哦~(监控视图)</div>;
    }

  }
  getImageText(config, colEle) {
    let self = this;
    let style = {};
    if (config.subType == "title") {
      if (config.hasOwnProperty("fontSize")) style.fontSize = config.fontSize;
      // if (config.hasOwnProperty("backgroundColor")) style.backgroundColor = config.backgroundColor;
      if (config.hasOwnProperty("height")) style.height = config.height;
      if (config.hasOwnProperty("width")) style.width = config.width;
      if (config.hasOwnProperty("color"))
        style.color = config.color;
      if (this.skinStyle.color)
        style.color = this.skinStyle.color;
      if (config.hasOwnProperty("textAlign")) style.textAlign = config.textAlign;
      if (config.hasOwnProperty("fontFamily")) style.fontFamily = config.fontFamily;
      if (config.hasOwnProperty("alignItems")) style.alignItems = config.alignItems;
      if (config.hasOwnProperty("display")) style.display = config.display;

      return <div style={style}>
        <div style={{ textAlign: 'center', width: '100%' }} >{config.title}</div>
      </div>;
    }
    else {

      let imgScale = _.find(this.ImgScaleArr, function (o) { return o.imgId == colEle.colKey + "_img" });
      if (config.logoImg && !imgScale) {
        let tmp = {};
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
      let imgStyle = { display: "block" };

      if (imgScale && imgScale.displayBy == "width") {
        style = { width: "100%", height: "100%" }
        imgStyle.width = "100%";
        if (config.logoPosition.vertical == "top") {
          imgStyle.padding = "0px  0px " + Math.ceil(imgScale.padding) + "px  0px "
        }
        else if (config.logoPosition.vertical == "middle") {
          imgStyle.padding = " " + Math.ceil(imgScale.padding / 2) + "px  0px " + Math.ceil(imgScale.padding / 2) + "px  0px "
        }
        else if (config.logoPosition.vertical == "bottom") {
          imgStyle.padding = Math.ceil(imgScale.padding) + "px 0px  0px 0px "
        }
      }
      else if (imgScale && imgScale.displayBy == "height") {
        style = { width: "100%", height: "100%" }
        imgStyle.height = "100%";

        if (config.logoPosition.horizontal == "left") {
          imgStyle.padding = " 0px " + Math.ceil(imgScale.padding) + "px 0px 0px "
        }
        else if (config.logoPosition.horizontal == "center") {
          imgStyle.padding = " 0px " + Math.ceil(imgScale.padding / 2) + "px 0px " + Math.ceil(imgScale.padding / 2) + "px "
        }
        else if (config.logoPosition.horizontal == "right") {
          imgStyle.padding = " 0px 0px 0px " + Math.ceil(imgScale.padding) + "px"
        }
      }
      else if (imgScale && imgScale.displayBy == "no") {
        style = {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }
        let transform1 = "";
        let transform2 = "";
        if (config.logoPosition.horizontal == "left") {
          style.left = "0%";
          transform1 = "0%";
        }
        else if (config.logoPosition.horizontal == "center") {
          style.left = "50%";
          transform1 = "-50%";
        }
        else if (config.logoPosition.horizontal == "right") {
          style.left = "100%";
          transform1 = "-100%";
        }

        if (config.logoPosition.vertical == "top") {
          style.top = "0%";
          transform2 = "0%";
        }
        else if (config.logoPosition.vertical == "middle") {
          style.top = "50%";
          transform2 = "-50%";
        }
        else if (config.logoPosition.vertical == "bottom") {
          style.top = "100%";
          transform2 = "-100%";
        }
        style.transform = "translate(" + transform1 + "," + transform2 + ")";
      }

      else {
        imgStyle.width = "100%";
        imgStyle.height = "100%";
      }

      return <div style={style} className={config.logoImg ? "eChartPanelDisplay_HasImg" : "eChartPanelDisplay_NoImg"}  >
        <img id={colEle.colKey + "_img"}
          style={imgStyle}
          src={self.state.bMounted ? config.logoImg : ""}
          onLoad={() => self.onLoadImg(colEle)} />
      </div>
    }

  }
  onLoadImg(colEle) {
    let self = this;
    eChartCommon.LogChartInfo("大屏方案 展现 this.serieNum =" + this.serieNum + " Load01 ImgScaleArr ", JSON.stringify(self.ImgScaleArr), 14);
    let ele = _.find(self.ImgScaleArr, function (o) { return o.imgId == colEle.colKey + "_img" })
    if (ele) {
      ele.bLoadImg = true;
      let imgEle = document.getElementById(ele.imgId);
      let divEle = document.getElementById(ele.divId);
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
            }
            else {
              ele.displayBy = "height";
              ele.padding = ele.divWidth - ele.imgWidth * ele.divHeight / ele.imgHeight;
            }
          }
          else {
            ele.displayBy = "no";
          }
        }
      }
    }
    eChartCommon.LogChartInfo("大屏方案 展现 this.serieNum =" + this.serieNum + " Load02 ImgScaleArr ", JSON.stringify(self.ImgScaleArr), 14);
    self.forceUpdate();
  }

  componentDidMount() {
    let self = this;
    let style = {};
    // this.calcPanelWidth(style, 16 * 70, 9 * 70, "px");
    // this.scaleStyle = style;
    this.ImgScaleArr.forEach((ele) => {
      let divEle = document.getElementById(ele.divId);
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

  getStyle_Edit(eleType, innerType, ele) {

    let style = {};
    if (eleType == "row") {
      style.width = '100%';
      style.height = ele.height;
    }
    else if (eleType == "col") {
      // let widgetType = ele.widgetType;
      style.height = '100%';
      style.width = ele.width;
      style.float = 'left';
      style.overflow = "hidden"
      // style.position = "relative";//
    }
    else if (eleType == "all") {
      // style.width = '800px';
      // style.height = '600px';
      if (this.state.isInDesign && 1 == 2) {
        // this.calcPanelWidth(style, 16 * 70, 9 * 70, "px");
        style.width = this.scaleStyle.width;
        style.height = this.scaleStyle.height;
      }
      else {
        style.width = '100%';
        style.height = '100%';
      }
    }

    style.border = "0px";
    style.padding = "0px";
    style.margin = "0px";
    if (eChartDemoData.demoConfig.isShowAllMargin == true || (eleType == "col" && innerType == "control") || ele.bOuterMargin) {
      if (ele.hasOwnProperty("margin"))
        style.padding = ele.margin;
    }

    return style;
  }

  getInnerStyle_Edit(eleType, innerType, ele) {

    let style = {};
    style.width = '100%';
    style.height = '100%';
    style.padding = 0;
    style.margin = 0;
    if (eChartDemoData.demoConfig.isShowAllMargin == true || eleType == "all" || (eleType == "col" && innerType == "control") || ele.bOuterBorder) {
      let borderType = "solid";
      // if (eleType == "col" && innerType == "control" && this.getSelectedColKey() == ele.colKey) {
      //   borderType = "dashed";
      // }
      let borderWidth = ele.borderWidth ? ele.borderWidth : eChartCommon.panelDefaultValue.borderWidth;
      let borderColor = eChartCommon.panelDefaultValue.borderColor;
      // borderColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      style.border = borderWidth + " " + borderType + " " + borderColor;
    }
    else {
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

  calcPanelWidth(style, maxWidth, maxHeight, postFix) {
    // style.width = '100%';
    // style.height = '100%';

    let self = this;
    let panelConfig = self.state.panelConfig;

    let panelWidthScale = panelConfig.panelWidthScale;
    let panelHeightScale = panelConfig.panelHeightScale;

    if (panelWidthScale && panelHeightScale) {
      if (panelWidthScale / panelHeightScale > maxWidth / maxHeight) {
        style.width = maxWidth;
        style.height = Math.floor(maxWidth * panelHeightScale / panelWidthScale);
      }
      else {
        style.height = maxHeight;
        style.width = Math.floor(maxHeight * panelWidthScale / panelHeightScale);
      }
    }
    else {
      style.width = maxWidth;
      style.height = maxHeight;
    }
    style.width = style.width + postFix;
    style.height = style.height + postFix;

    style.width = document.body.clientWidth;
    style.height = document.body.clientHeight;
  }
  addFinalSkinClassName() {
    if (this.skinConfig)
      return " " + this.skinConfig.skinClassNameFlag + "-final";
    else
      return ""
  }
  addBackStyleAndColorClassName() {
    let ele;
    let str = " panelLayer-NoStyleAndColor";
    if (this.state.panelConfig.backStyleKey) {
      ele = eChartCommon.getBackStyleArr(this.state.panelConfig.backStyleKey);
      if (ele && ele.className != "")
        str = " panelLayer-" + ele.className;
    }
    else if (this.state.panelConfig.backColorKey) {
      ele = eChartCommon.getBackColorArr(this.state.panelConfig.backColorKey);
      if (ele && ele.className != "")
        str = " panelLayer-" + ele.className;
    }
    return str;
  }
  addBorderClassName(bNoBorder) {
    if (bNoBorder)
      return " panelLayer-noborder";
    else
      return " panelLayer-hasborder";
  }

  getRows(rows) {
    let self = this;
    let rowArr = [];
    rows.forEach(rowEle => {
      let colArr = [];
      let rowStyle = self.getStyle_Edit("row", "", rowEle);
      let rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
      rowEle.cols.forEach(colEle => {
        // let colStyle = self.getStyle("col", colEle);
        let colStyle;
        let colInnerStyle;
        let curCol;
        let content;
        let colNoBorder;
        let isTitleArea = colEle.isTitleArea ? colEle.isTitleArea : false;
        if (colEle.widgetType == "chart") {
          // curCol = self.getChartRender(colEle);

          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = self.getChartRender(colEle);
          curCol = <div
            className={
              "panelLayer-col-inner panelLayer-col-final "
              + self.addFinalSkinClassName()
              + self.addBorderClassName(colNoBorder)
              + self.addBackStyleAndColorClassName()

            }
            style={colInnerStyle} >
            {content}
          </div>;
        }
        else if (colEle.widgetType == "rows") {
          colStyle = self.getStyle_Edit("col", "rows", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = self.getRows(colEle.widgetValue);
          curCol = <div
            className={
              "panelLayer-col-inner"
              + self.addBorderClassName(colNoBorder)
            }
            style={colInnerStyle} >
            {content}
          </div>;
        }
        else if (colEle.widgetType == "imagetext") {
          // curCol = self.getTextTitle(colEle.panelImageTextConfig);

          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          if (colEle.panelImageTextConfig.subType == "logo") {
            colInnerStyle.position = "relative";
          }
          content = self.getImageText(colEle.panelImageTextConfig, colEle);
          curCol = <div
            className={
              "panelLayer-col-inner panelLayer-col-final "
              + self.addFinalSkinClassName()
              + self.addBorderClassName(colNoBorder)
              + self.addBackStyleAndColorClassName()

            }
            style={colInnerStyle}
            id={colEle.colKey + "_div"}>
            {content}
          </div>;

        }
        else if (colEle.widgetType == "sum") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          if (colEle.sumConfig.subType == "count") {
            content = <EChartSumCountUp showIt={true} sumConfig={colEle.sumConfig} skinConfig={self.skinConfig}></EChartSumCountUp>;
          }
          else {
            content = <EChartSum showIt={true} sumConfig={colEle.sumConfig} skinConfig={self.skinConfig}></EChartSum>;
          }
          curCol = <div
            className={
              "panelLayer-col-inner panelLayer-col-final "
              + self.addFinalSkinClassName()
              + self.addBorderClassName(colNoBorder)
              + self.addBackStyleAndColorClassName()

            }
            style={colInnerStyle}>
            {content}
          </div>;
        }



        else if (colEle.widgetType == "component") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          if (colEle.componentConfig.subType == "weather")
            content = <EChartWeather componentConfig={colEle.componentConfig} skinConfig={self.skinConfig} />;
          else if (colEle.componentConfig.subType == "datetime")
            content = <EChartDateTime componentConfig={colEle.componentConfig} skinConfig={self.skinConfig} />;
          curCol = <div
            className={
              "panelLayer-col-inner panelLayer-col-final "
              + self.addFinalSkinClassName()
              + self.addBorderClassName(colNoBorder)
              + self.addBackStyleAndColorClassName()

            }
            style={colInnerStyle}>
            {content}
          </div>;
        }
        else if (colEle.widgetType == "none") {
          // colStyle.textAlign = 'center';
          // colStyle.fontSize = 24;
          // curCol = "待定义控件";
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = <div style={self.skinStyle} className="panelLayer-nocontrol">{self.state.isInDesign ? " 无控件" : ""}</div>;
          curCol = <div
            className={
              "panelLayer-col-inner panelLayer-col-final "
              + self.addFinalSkinClassName()
              + self.addBorderClassName(colNoBorder)
              + self.addBackStyleAndColorClassName()

            }
            style={colInnerStyle}>
            {/* {content} */}
          </div>;

        }
        else {
          //colEle.widgetType == 其他
          // colStyle.textAlign = 'center';
          // colStyle.fontSize = 24;
          // curCol = "未知控件";
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = <div style={self.skinStyle}>未知控件</div>;
          curCol = <div
            className={"panelLayer-col-inner panelLayer-col-final "
              + self.addFinalSkinClassName()
              + self.addBorderClassName(colNoBorder)
              + self.addBackStyleAndColorClassName()

            }
            style={colInnerStyle}>
            {content}
          </div>;


        }
        if (colStyle.padding == "0px" || colStyle.padding == "") {
          colArr.push(<Col
            className={"panelLayer-col-outer panelLayer-col-outer-nopadding"}
            style={colStyle}
            onDoubleClick={e => self.onDoubleClick(e, colEle)}
          >
            {curCol}
          </Col>);
        }
        else {
          colArr.push(
            <Col
              className={"panelLayer-col-outer panelLayer-col-outer-haspadding"}
              style={colStyle}
              onDoubleClick={e => self.onDoubleClick(e, colEle)}
            >
              {curCol}
              <div style={{ display: isTitleArea ? "none" : "" }} className={"panelLayer-col-outer-corner-1"}></div>
              <div style={{ display: isTitleArea ? "none" : "" }} className={"panelLayer-col-outer-corner-2"}></div>
              <div style={{ display: isTitleArea ? "none" : "" }} className={"panelLayer-col-outer-corner-3"}></div>
              <div style={{ display: isTitleArea ? "none" : "" }} className={"panelLayer-col-outer-corner-4"}></div>
            </Col>);
        }
      });
      let rowNoBorder = rowInnerStyle.border.indexOf("0px") == 0 || rowInnerStyle.border.indexOf(" 0px") >= 0;
      let isTitleArea_Row = rowEle.isTitleArea ? rowEle.isTitleArea : false;
      if (rowStyle.padding == "0px" || rowStyle.padding == "") {
        rowArr.push(<Row className={"panelLayer-row-outer panelLayer-row-outer-nopadding"} style={rowStyle} >
          <div className={"panelLayer-row-inner " + self.addBorderClassName(rowNoBorder)} style={rowInnerStyle}>
            {colArr}
          </div>
        </Row>);
      }
      else {
        rowArr.push(
          <Row className={"panelLayer-row-outer panelLayer-row-outer-haspadding"} style={rowStyle} >
            <div className={"panelLayer-row-inner " + self.addBorderClassName(rowNoBorder)} style={rowInnerStyle}>
              {colArr}
            </div>
            <div style={{ display: isTitleArea_Row ? "none" : "" }} className={"panelLayer-row-outer-corner-1"}></div>
            <div style={{ display: isTitleArea_Row ? "none" : "" }} className={"panelLayer-row-outer-corner-2"}></div>
            <div style={{ display: isTitleArea_Row ? "none" : "" }} className={"panelLayer-row-outer-corner-3"}></div>
            <div style={{ display: isTitleArea_Row ? "none" : "" }} className={"panelLayer-row-outer-corner-4"}></div>
          </Row>);
      }

    });
    return rowArr;
  }

  getMaxedColContent(colKey) {
    let self = this;
    let colEle = this.getSelectedCol(colKey);
    eChartCommon.LogChartInfo("eChartPanelDisplay 双击事件 " + " colEle.colKey =  " + colEle.colKey + "  colEle.widgetType =  " + colEle.widgetType + " colEle =", JSON.stringify(colEle), 1);

    let isTitleArea = colEle.isTitleArea ? colEle.isTitleArea : false;

    let colStyle = self.getStyle_Edit("col", "control", colEle);
    let colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
    let colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
    let content = self.getChartRender(colEle);
    let curCol = <div
      onDoubleClick={e => self.onDoubleClick(e, "")}
      className={
        "panelLayer-col-inner panelLayer-col-final "
        + self.addFinalSkinClassName()
        + self.addBorderClassName(colNoBorder)
        + self.addBackStyleAndColorClassName()
      }
      style={colInnerStyle} >
      {content}
    </div>;
    return curCol;

  }
  onDoubleClick(e, colEle) {

    if (colEle && colEle.widgetType == "chart") {
      this.setState({ maxedColKey: colEle.colKey });
      if (this.props.doFunc) {
        this.props.doFunc("pauseCarouse", colEle.colKey)
      }
    }
    else if (colEle == "") {
      this.setState({ maxedColKey: "" });
      this.props.doFunc("pauseCarouse", "")
    }

  }


  getSelectedCol(colKey) {
    let self = this;
    let rows = self.state.panelConfig.panelLayOutConfig.rows;

    let colsInfo = self.getColParentInfo(rows, colKey);
    let cols = colsInfo.cols;
    let colIndex = colsInfo.colIndex;
    if (cols && colIndex != undefined)
      return cols[colIndex];
    else
      return {};
  }

  getColParentInfo(rows, colKey) {
    let self = this;
    let obj = {}
    rows.forEach((rowEle, rowIndex) => {
      let curRow = [];
      rowEle.cols.forEach((colEle, colIndex) => {
        if (colEle.colKey === colKey) {
          // obj.col = colEle;
          obj.rows = rows;
          obj.rowIndex = rowIndex;
          obj.cols = rowEle.cols;
          obj.colIndex = colIndex;
        }
        else if (colEle.widgetType == "rows") {
          let obj2 = self.getColParentInfo(colEle.widgetValue, colKey);
          obj = _.isEmpty(obj2) ? obj : obj2;
        }
      }
      );
    });

    return obj;
  }
  getChartRender(colEle) {
    let self = this;
    let tmp = <div
      className='eChartPanel-Chart'
      style={{ height: '100%', width: '100%' }}
    >
      <EChartDisplay
        chartDisplayType={"panel"}
        panelType={eChartCommon.panelType.panelType1}
        isInDesign={self.state.isInDesign}
        panelChartConfig={colEle.panelChartConfig}
        handleChartClick={(btnKey, btnValue) => self.handleChartClick(btnKey, btnValue)}
        showIt={true}
        skinConfig={self.skinConfig}
      />
    </div>
    return tmp;
  }
  getChartEleByKey(rows, chartKey) {
    let self = this;
    let obj = undefined;
    rows.forEach(rowEle => {
      let curRow = [];
      rowEle.forEach(colEle => {
        if (colEle.widgetType == "chart" && colEle.panelChartConfig.chartKey === chartKey) {
          obj = colEle;
        }
        else if (colEle.widgetType == "rows") {
          if (obj === undefined) {
            obj = self.getChartEleByKey(colEle.widgetValue, chartKey);
          }
        }
      });
    });
    return obj;
  }

  handleChartClick(btnKey, btnValue) {
    let self = this;
    if (btnKey == "SwitchSize") {
      this.state.panelConfig.curChartKey = this.state.panelConfig.curChartKey == btnValue ? "" : btnValue;
      this.setState();
    }
    else if (btnKey == "ShowFilter") {
      let colEle = self.getChartEleByKey(self.state.panelConfig.panelLayOutConfig.rows, btnValue);
      if (colEle)
        colEle.panelChartConfig.bShowFilter = !colEle.panelChartConfig.bShowFilter;
    }
  }
}
