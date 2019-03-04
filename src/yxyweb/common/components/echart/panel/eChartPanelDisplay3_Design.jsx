import React, { Component } from 'react';
import Row from '../../basic/row';
import Col from '../../basic/col';
import * as  eChartCommon from '../eChartCommon';
import EChartDisplay_Mobile from '../echart/eChartDisplay_Mobile';
import EChartSum from './component/eChartSum';
import * as  eChartProxy from '../eChartProxy';
import SvgIcon from 'SvgIcon';
// import { Button } from 'antd/lib/radio';
let EChartPanelSplit = null;
let PullToRefresh = null;
// 移动看板
export default class eChartPanelDisplay3_Design extends React.Component {
  constructor(props) {
    super(props);
    eChartCommon.LogChartInfo("eChartPanelDisplay3 constructor", "", 900);
    this.serieNum = Math.random();
    let isInDesign = props.isInDesign || false;
    if (isInDesign) {
      EChartPanelSplit = require('./eChartPanelSplit').default;
    }
    else {
      // PullToRefresh = require('antd-mobile').PullToRefresh;
    }
    this.state = {
      panelConfig: props.panelConfig ? props.panelConfig : undefined,
      isInDesign: isInDesign,
      panelId: props.panelId,
      chartDisplayType: eChartCommon.chartDisplayType.panel,
      panelType: eChartCommon.panelType.panelType3,
      curOperateType: "",
      selectedColKey: "",
      refreshKey: this.getNewRefreshKey(),
      focusedKey: ""
    };
  }
  getNewRefreshKey() {
    return "Refresh_" + eChartCommon.getRandom()
  }
  Refresh() {//下拉刷新
    this.setState({ refreshKey: this.getNewRefreshKey() });
    if (this.state.isInDesign == false)
      this.props.refreshForXieLa();
  }
  render() {
    eChartCommon.LogChartInfo("eChartPanelDisplay3 render", "", 900);
    let self = this;
    if (self.state.panelConfig) {
      let content;
      let style = self.getStyle_Edit("all", "", self.state.panelConfig);
      let innerStyle = self.getInnerStyle_Edit("all", "", self.state.panelConfig);
      content = self.getRows(self.state.panelConfig.panelLayOutConfig.rows, true);
      let tmp = <div
        key={self.state.refreshKey}
        id="eChartPanelDisplay3_Id"
        className={"eChartPanel3 panelLayer3-all-outer " + (style.padding == "0px" ? " panelLayer3-all-outer-nopadding " : " panelLayer3-all-outer-haspadding")}
        style={style}
      >
        <div className="panelLayer3-all-inner" style={innerStyle} >
          {content}
        </div>
      </div>;
      eChartCommon.LogChartInfo("大屏方案3 eChartPanelDisplay3展现Render End ", "", 900);
      if (self.state.isInDesign) {
        return tmp;
      }
      else {
        return <PullToRefresh
          indicator={{ activate: " ", deactivate: " ", release: " ", finish: " " }}
          refreshing={false}
          damping={100}
          style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
          }}
          direction={'down'}
          onRefresh={() => {
            this.Refresh();
          }}
        >
          {tmp}
        </PullToRefresh>;
      }
    }
    else {
      return <div className='eChart-nodata'  >暂时没有数据哦~(监控视图)</div>;
    }
  }

  getImageText(config, colEle) {
    let self = this;
    let style = {};
    if (config.subType == "title") {
      if (config.hasOwnProperty("fontSize")) style.fontSize = config.fontSize;
      if (config.hasOwnProperty("width")) style.width = config.width;
      if (config.hasOwnProperty("color"))
        style.color = config.color;
      if (config.hasOwnProperty("textAlign")) style.textAlign = config.textAlign;
      if (config.hasOwnProperty("fontFamily")) style.fontFamily = config.fontFamily;
      if (config.hasOwnProperty("alignItems")) style.alignItems = config.alignItems;
      if (config.hasOwnProperty("display")) style.display = config.display;
      return <div style={style}>
        <div style={{ textAlign: 'center', width: '100%' }} >{config.title}</div>
      </div>;
    }
    else {
      let imgStyle = { display: "block", width: "100%" };
      return <div
        style={style}
        className={config.logoImg ? "eChartPanelDisplay3_HasImg" : "eChartPanelDisplay3_NoImg"}  >
        <img id={colEle.colKey + "_img"}
          style={imgStyle}
          src={config.logoImg}
        />
      </div>
    }
  }

  componentDidMount() {
    let self = this;
    if (self.state.isInDesign == false && !self.state.panelConfig) {
      self.getPanel(self.state.panelId);
    }
  }
  componentWillReceiveProps(nextProps) {
    eChartCommon.LogChartInfo("eChartPanelDisplay3 componentWillReceiveProps", "", 900);
    if (this.state.isInDesign == false && nextProps.panelId != this.state.panelId) {
      this.getPanel(nextProps.panelId);
    }
    else if (this.state.isInDesign == true && _.isEqual(nextProps.panelConfig, this.state.panelConfig) == false) {
      if (nextProps.panelConfig.templateKey != this.state.panelConfig.templateKey)
        this.setState({ panelConfig: nextProps.panelConfig, selectedColKey: "" });
      else
        this.setState({ panelConfig: nextProps.panelConfig });
    }
  }
  getPanel(panelId) {
    let self = this;
    let param = { reportViewId: panelId };
    let callback = (json) => {
      if (json.code === 200) {
        let data = json.data;
        if (data) {
          let editPanel = eChartCommon.restoreEditPanel(data.pageLayout, data.items, "query", panelId);
          self.setState({ panelId, panelConfig: editPanel });
        }
      }
    }
    eChartProxy.doProxy(eChartProxy.url.getReportView, 'GET', param, callback);
  }

  getStyle_Edit(eleType, innerType, ele) {
    let style = {};
    style.border = "0px";
    style.margin = "0px";
    if (eleType == "row") {
      style.width = '100%';
    }
    else if (eleType == "col") {
      style.width = ele.width;
      style.float = 'left';
      style.overflow = "hidden"
    }
    else if (eleType == "all") {
      style.width = '100%';
      if (this.state.isInDesign == false)
        style.height = window.innerHeight;
      else
        style.height = '100%';
      // style.overflow = "auto"
      style.border = "solid 0px #cccccc";
    }
    if (eleType == "col" && (innerType == "none" || innerType == "control")) {
      if (this.state.isInDesign == true)
        style.padding = "7px 7px 7px 7px";
      else
        style.padding = "0.1rem";
    }
    else {
      style.padding = "0px";
    }
    return style;
  }

  getInnerStyle_Edit(eleType, innerType, ele) {
    let style = {};
    let self = this;
    style.width = '100%';
    style.padding = 0;
    style.margin = 0;
    if (self.state.isInDesign == true && ele.colKey == self.state.selectedColKey) {
      style.border = "solid " + eChartCommon.panelDefaultValue.borderWidth + " #969BA4";
    }
    else if (self.state.isInDesign == true && innerType == "none") {
      style.border = "dashed " + eChartCommon.panelDefaultValue.borderWidth + " #969BA4";
    }
    else if (eleType == "col" && (innerType == "control" || innerType == "none")) {
      style.border = eChartCommon.panelDefaultValue.borderWidth + " #fff  ";
    }
    else {
      style.border = "0px";
    }
    if (eleType == "col" && innerType == "control") {
    }
    else if (innerType == "none") {
      style.backgroundColor = "white";
      style.height = self.calcNoneAreaHeight();
    }
    else if (eleType == "all") {
      if (this.state.isInDesign == false)
        style.height = window.innerHeight;
    }
    return style;
  }

  calcNoneAreaHeight(baseRowHeight) {
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
  addBorderClassName(bNoBorder) {
    if (bNoBorder)
      return " panelLayer3-noborder";
    else
      return " panelLayer3-hasborder";
  }
  setSelectedColKey(selectedColKey, widgetType) {
    this.state.selectedColKey = selectedColKey;
    this.state.curOperateType = "";
    if (this.props.selectCol)
      this.props.selectCol(selectedColKey, widgetType);
  }
  getRows(rows, bOutRow) {
    let self = this;
    let rowArr = [];
    rows.forEach(rowEle => {
      let colArr = [];
      let rowStyle = self.getStyle_Edit("row", "", rowEle);
      let rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
      rowEle.cols.forEach(colEle => {
        let colStyle;
        let colInnerStyle;
        let curCol;
        let content;
        let colNoBorder;
        let isTitleArea = colEle.isTitleArea ? colEle.isTitleArea : false;
        let bFocused = false;
        let delButton;
        let onClickFunc;
        if (colEle.widgetType == "none" || colEle.widgetType == "component" || colEle.widgetType == "sum" || colEle.widgetType == "chart" || colEle.widgetType == "imagetext") {
          onClickFunc = () => self.setSelectedColKey(colEle.colKey, colEle.widgetType);
        }
        if (colEle.widgetType == "rows") {
          colStyle = self.getStyle_Edit("col", "rows", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = self.getRows(colEle.widgetValue, false);
          curCol = <div
            className={
              "panelLayer3-col-inner"
              + self.addBorderClassName(colNoBorder)
            }
            style={colInnerStyle} >
            {content}
          </div>;
        }
        else if (colEle.widgetType == "chart") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = self.getChartRender(colEle);
          bFocused = colEle.colKey == self.state.focusedKey ? true : false;
          if (bFocused && self.state.isInDesign == true) {
            delButton = self.getDelButton(colEle.colKey);
          }
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className={
              "panelLayer3-col-inner panelLayer3-col-final "
              + self.addBorderClassName(colNoBorder)
              + (bFocused ? " panelLayer3-col-isfocused" : " panelLayer3-col-isnotfocused")
            }
            style={colInnerStyle}
            onClick={onClickFunc}
          >
            {content}
            {delButton}
          </div>;
        }
        else if (colEle.widgetType == "sum") {
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
          content = <EChartSum
            showIt={true}
            sumConfig={colEle.sumConfig}
            panelType={self.state.panelType}
            isInDesign={self.state.isInDesign}
          />;
          // }
          bFocused = colEle.colKey == self.state.focusedKey ? true : false;
          if (bFocused && self.state.isInDesign == true) {
            delButton = self.getDelButton(colEle.colKey);
          }
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className={
              "panelLayer3-col-inner panelLayer3-col-final "
              + self.addBorderClassName(colNoBorder)
              + (bFocused ? " panelLayer3-col-isfocused" : " panelLayer3-col-isnotfocused")
            }
            style={colInnerStyle}
            onClick={onClickFunc}
          >
            {content}
            {delButton}
          </div>;
        }
        else if (colEle.widgetType == "none") {
          bFocused = colEle.colKey == self.state.focusedKey ? true : false;
          if (self.state.isInDesign) {
            colStyle = self.getStyle_Edit("col", "none", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "none", colEle);
            colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;

            let splitContent = <EChartPanelSplit
              colEle={colEle}
              doFunc={(bOK, info) => self.doSplit(bOK, info)}
              showContent={(bOK, colKey) => self.showSplitCard(bOK, colKey)}
              selectedColKey={self.state.selectedColKey}
              curOperateType={self.state.curOperateType}
              // skinConfig={self.skinConfig}
              panelType={self.state.panelType}
            />;
            content = <div
              className="panelLayer3-nocontrol"
              style={{ display: (bFocused ? "" : "none") }}
            >
              {splitContent}
            </div>;
          }
          else {
            content = <div className="panelLayer3-nocontrol" />;
          }

          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className={
              "panelLayer3-col-inner panelLayer3-col-final "
              + self.addBorderClassName(colNoBorder)
              + (bFocused ? " panelLayer3-col-isfocused" : " panelLayer3-col-isnotfocused")
            }
            style={colInnerStyle}
            onClick={onClickFunc}
          >
            {content}
          </div>;

        }
        else {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = <div >未知控件</div>;
          curCol = <div
            className={"panelLayer3-col-inner panelLayer3-col-final "
              + self.addBorderClassName(colNoBorder)
            }
            style={colInnerStyle}>
            {content}
          </div>;
        }
        if (colStyle.padding == "0px" || colStyle.padding == "") {
          colArr.push(
            <Col
              className={"panelLayer3-col-outer panelLayer3-col-outer-nopadding"}
              style={colStyle}
            >
              {curCol}
            </Col>);
        }
        else {
          colArr.push(
            <Col
              className={"panelLayer3-col-outer panelLayer3-col-outer-haspadding"}
              style={colStyle}
            >
              {curCol}
            </Col>);
        }
      });
      let rowNoBorder = rowInnerStyle.border.indexOf("0px") == 0 || rowInnerStyle.border.indexOf(" 0px") >= 0;
      let isTitleArea_Row = rowEle.isTitleArea ? rowEle.isTitleArea : false;
      if (rowStyle.padding == "0px" || rowStyle.padding == "") {
        rowArr.push(<Row className={"panelLayer3-row-outer panelLayer3-row-outer-nopadding"} style={rowStyle} >
          <div className={"panelLayer3-row-inner " + self.addBorderClassName(rowNoBorder)} style={rowInnerStyle}>
            {colArr}
          </div>
        </Row>);
      }
      else {
        rowArr.push(
          <Row className={"panelLayer3-row-outer panelLayer3-row-outer-haspadding"} style={rowStyle} >
            <div className={"panelLayer3-row-inner " + self.addBorderClassName(rowNoBorder)} style={rowInnerStyle}>
              {colArr}
            </div>
          </Row>);
      }
    });
    return rowArr;
  }
  getDelButton(colKey) {
    return <div
      title="清除"
      style={{ cursor: "pointer", zIndex: "999" }}
      className={"qingchu-btn del-btn eChartPanel3_Del"}
      onClick={() => this.props.clearColTypeInner(colKey)}
    >
      <div className="qingchu-btn-bg">
        <SvgIcon type="delete" />
      </div>
    </div>;
  }
  doSplit(bOK, info) {
    if (bOK && this.props.doSplit) {
      this.props.doSplit(bOK, info, this.state.selectedColKey);
      this.state.selectedColKey = "";
    }
    this.setState({ curOperateType: "" });
  }

  showSplitCard(bOK, colKey) {
    if (bOK) {
      this.setState({ curOperateType: "splitCol", selectedColKey: colKey });
    }
    else {
      this.setState({ curOperateType: "" });
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
      className='eChartPanel3-Chart'
      style={{ width: '100%' }}
    // key={"Panel3Key_" + colEle.colKey}
    >
      <EChartDisplay_Mobile
        // key={"Panel3Key_" + colEle.colKey}
        chartDisplayType={self.state.chartDisplayType}
        panelType={self.state.panelType}
        isInDesign={self.state.isInDesign}
        panelChartConfig={colEle.panelChartConfig}
      // config={colEle.panelChartConfig}
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

  onMouseEnter(focusedKey) {
    eChartCommon.LogChartInfo("eChartPanelDisplay3 onMouseEnter", "", 900);
    this.setState({ focusedKey: focusedKey });
  }
  onMouseLeave() {
    eChartCommon.LogChartInfo("eChartPanelDisplay3 onMouseLeave", "", 900);
    this.setState({ focusedKey: "" });
  }
}
