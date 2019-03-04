import React, { Component } from 'react';
import { Input, Button } from 'antd';
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
import * as  eChartProxy from '../eChartProxy';
import SvgIcon from 'SvgIcon';
import CommonFunctions from '../../../../../common/components/home/CommonFunctions';
import FilterEChart from '../../filter/filterEChart'
export default class eChartPanelDisplay2 extends React.Component {
  constructor(props) {
    super(props);
    this.serieNum = Math.random();
    this.state = {
      panelConfig: props.panelConfig  || undefined,
      isInDesign: props.isInDesign || false,
      panelId: props.panelId
    };
    eChartCommon.LogChartInfo("大屏方案2 eChartPanelDisplay2 展现 constructor", "", 900);
  }
  getImageText(config, colEle) {
    let self = this;
    if (config.subType == "title") {
      let style = {};
      if (config.hasOwnProperty("fontSize")) style.fontSize = config.fontSize;
      if (config.hasOwnProperty("width")) style.width = config.width;
      if (config.hasOwnProperty("color")) style.color = config.color;
      if (config.hasOwnProperty("textAlign")) style.textAlign = config.textAlign;
      if (config.hasOwnProperty("fontFamily")) style.fontFamily = config.fontFamily;
      if (config.hasOwnProperty("alignItems")) style.alignItems = config.alignItems;
      if (config.hasOwnProperty("display")) style.display = config.display;
      return <div style={style}>
        <div style={{ textAlign: 'center', width: '100%' }} >{config.title}</div>
      </div>;
    } else {
      let imgStyle = { display: "block", width: "100%" };
      return <div className={config.logoImg ? "eChartPanelDisplay2_HasImg" : "eChartPanelDisplay2_NoImg"}>
        <img id={colEle.colKey + "_img"} style={imgStyle} src={config.logoImg} />
      </div>
    }
  }
  componentDidMount() {
    let self = this;
    if (self.state.isInDesign == false) {
      self.getPanel(self.state.panelId);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.panelId != this.state.panelId)
      this.getPanel(nextProps.panelId);
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
    if (eleType == "row") {
      style.width = '100%';
    } else if (eleType == "col") {
      style.width = ele.width;
      style.float = 'left';
      style.overflow = "hidden"
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
  getInnerStyle_Edit(eleType, innerType, ele) {
    let style = {width:'100%', padding:0, margin: 0, border:"0px"};
    if (eleType == "col" && innerType == "control" && ele.widgetType != "imagetext" && ele.widgetType != "component") {
      style.backgroundColor = "white";
      style.padding = "15px 15px 15px 15px";
    }
    return style;
  }
  addBorderClassName(bNoBorder) {
    return bNoBorder ?" panelLayer2-noborder":" panelLayer2-hasborder";
  }
  getRows(rows, bOutRow) {
    let self = this;
    let rowArr = [];
    rows.forEach(rowEle => {
      let colArr = [];
      let rowStyle = self.getStyle_Edit("row", "", rowEle);
      let rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
      rowEle.cols.forEach(colEle => {
        let colStyle; let colInnerStyle; let curCol; let content; let colNoBorder;
        let isTitleArea = colEle.isTitleArea || false;
        if (colEle.widgetType == "chart") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          let model =new cb.models.SimpleModel({});
          let {filterId,condition,solutionId} =colEle.panelChartConfig;
          let panelType = eChartCommon.panelType.panelType2
          model.getParams =  () =>{
            return {filterId,condition,solutionId,panelType, isInDesign: true, bHasNullDate: true }
          };
          model.on('filterClick', function (args) {
            eChartCommon.LogChartInfo("监控视图汇总设置 触发事件 filterClick", JSON.stringify(args.condition), 7);
            self.state.condition = args.condition;
          });
          content = self.getChartRender(colEle,model);
          curCol = <div className={"panelLayer2-col-inner panelLayer2-col-final "+ self.addBorderClassName(colNoBorder) } style={colInnerStyle} > 
            {<FilterEChart model={model} config={colEle.panelChartConfig}/>}
            {content}
          </div>;
        } else if (colEle.widgetType == "rows") {
          colStyle = self.getStyle_Edit("col", "rows", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = self.getRows(colEle.widgetValue, false);
          curCol = <div className={"panelLayer2-col-inner"+ self.addBorderClassName(colNoBorder) } style={colInnerStyle} > {content} </div>;
        } else if (colEle.widgetType == "imagetext") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          if (colEle.panelImageTextConfig.subType == "logo") {
            colInnerStyle.position = "relative";
          }
          content = self.getImageText(colEle.panelImageTextConfig, colEle);
          curCol = <div
            className={"panelLayer2-col-inner panelLayer2-col-final "+ self.addBorderClassName(colNoBorder) }
            style={colInnerStyle}
            id={colEle.colKey + "_div"}>
            {content}
          </div>;
        } else if (colEle.widgetType == "sum") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          if (colEle.sumConfig.subType == "count") {
            content = <EChartSumCountUp showIt={true} sumConfig={colEle.sumConfig} panelType={2}></EChartSumCountUp>;
          } else {
            content = <EChartSum showIt={true} sumConfig={colEle.sumConfig} panelType={2}></EChartSum>;
          }
          curCol = <div
            className={"panelLayer2-col-inner panelLayer2-col-final "+ self.addBorderClassName(colNoBorder) }
            style={colInnerStyle}>
            {content}
          </div>;
        } else if (colEle.widgetType == "component") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          if (colEle.componentConfig.subType == "weather") {
            content = <EChartWeather componentConfig={colEle.componentConfig} panelType={2} />;
          } else if (colEle.componentConfig.subType == "datetime") {
            content = <EChartDateTime componentConfig={colEle.componentConfig} panelType={2} />;
          } else if (colEle.componentConfig.subType == "commonFunc") {
            content = <CommonFunctions />;
          }
          curCol = <div
            className={"panelLayer2-col-inner panelLayer2-col-final "+ self.addBorderClassName(colNoBorder) }
            style={colInnerStyle}>
            {content}
          </div>;
        } else if (colEle.widgetType == "none") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colStyle.display = "none";
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = <div className="panelLayer2-nocontrol">{self.state.isInDesign ? " 无控件" : ""}</div>;
          curCol = <div
            className={"panelLayer2-col-inner panelLayer2-col-final "+ self.addBorderClassName(colNoBorder) }
            style={colInnerStyle}>
          </div>;

        } else {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          colNoBorder = colInnerStyle.border.indexOf("0px") == 0 || colInnerStyle.border.indexOf(" 0px") >= 0;
          content = <div >未知控件</div>;
          curCol = <div className={"panelLayer2-col-inner panelLayer2-col-final "+ self.addBorderClassName(colNoBorder) } style={colInnerStyle}> 
            {content} 
          </div>;
        }
        if (colStyle.padding == "0px" || colStyle.padding == "") {
          colArr.push(<Col className={"panelLayer2-col-outer panelLayer2-col-outer-nopadding"} style={colStyle} >
            {curCol}
          </Col>);
        } else {
          colArr.push(<Col className={"panelLayer2-col-outer panelLayer2-col-outer-haspadding"} style={colStyle} >
            {curCol}
          </Col>);
        }
      });
      let rowNoBorder = rowInnerStyle.border.indexOf("0px") == 0 || rowInnerStyle.border.indexOf(" 0px") >= 0;
      let isTitleArea_Row = rowEle.isTitleArea ? rowEle.isTitleArea : false;
      if (rowStyle.padding == "0px" || rowStyle.padding == "") {
        rowArr.push(<Row className={"panelLayer2-row-outer panelLayer2-row-outer-nopadding"} style={rowStyle} >
          <div className={"panelLayer2-row-inner " + self.addBorderClassName(rowNoBorder)} style={rowInnerStyle}>
            {colArr}
          </div>
        </Row>);
      } else {
        rowArr.push(
          <Row className={"panelLayer2-row-outer panelLayer2-row-outer-haspadding"} style={rowStyle} >
            <div className={"panelLayer2-row-inner " + self.addBorderClassName(rowNoBorder)} style={rowInnerStyle}>
              {colArr}
            </div>
          </Row>
        );
      }
    });
    return rowArr;
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
      rowEle.cols.forEach((colEle, colIndex) => {
        if (colEle.colKey === colKey) {
          obj.rows = rows;
          obj.rowIndex = rowIndex;
          obj.cols = rowEle.cols;
          obj.colIndex = colIndex;
        } else if (colEle.widgetType == "rows") {
          let obj2 = self.getColParentInfo(colEle.widgetValue, colKey);
          obj = _.isEmpty(obj2) ? obj : obj2;
        }
      });
    });
    return obj;
  }
  getChartRender(colEle,model) {
    let self = this;
    return <div className='eChartPanel2-Chart'style={{ width: '100%' }} >
      <EChartDisplay
        viewModel={model}
        chartDisplayType={"panel"}
        panelType={eChartCommon.panelType.panelType2}
        isInDesign={self.state.isInDesign}
        panelChartConfig={colEle.panelChartConfig}
        showIt={true}
      />
    </div>
  }
  getChartEleByKey(rows, chartKey) {
    let self = this;
    let obj = undefined;
    rows.forEach(rowEle => {
      rowEle.forEach(colEle => {
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
  goBack(e) {
    if (this.state.isInDesign == true) {
      this.props.doFunc();
    }
  }
  render() {
    eChartCommon.LogChartInfo("大屏方案2 eChartPanelDisplay2展现Render Begin ", "", 900);
    let self = this;
    if (self.state.panelConfig) {
      let content;
      let style = self.getStyle_Edit("all", "", self.state.panelConfig);
      let innerStyle = self.getInnerStyle_Edit("all", "", self.state.panelConfig);
      content = self.getRows(self.state.panelConfig.panelLayOutConfig.rows, true);
      let tmp = <div
        className={"eChartPanel2 panelLayer2-all-outer " + (style.padding == "0px" ? " panelLayer2-all-outer-nopadding " : " panelLayer2-all-outer-haspadding")}
        style={style}
      >
        {self.state.isInDesign == true ? <div className="Tabletop-Kanban"><Button className="ant-btn no-border-radius" onClick={() => self.goBack()}><SvgIcon type="rollback" /> 返回</Button></div> : <div />}
        <div className="panelLayer2-all-inner" style={innerStyle} >
          {content}
        </div>
      </div>;
      eChartCommon.LogChartInfo("大屏方案2 eChartPanelDisplay2展现Render End ", "", 900);
      return tmp;
    } else {
      return <div className='eChart-nodata'>暂时没有数据哦~(监控视图)</div>;
    }
  }
}
