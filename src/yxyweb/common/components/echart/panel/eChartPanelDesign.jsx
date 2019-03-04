import React, { Component } from 'react';
import { Popover, Input, Modal, Icon, Button, Checkbox, Radio, Transfer, Select } from 'antd';
import Row from '../../basic/row';
import Col from '../../basic/col';
import * as eChartCommon from '../eChartCommon';
import * as eChartProxy from '../eChartProxy';
import { Format } from '../../../helpers/formatDate';
import EChartPanelSplit from './eChartPanelSplit';
import EChartPanelSetImageText from './eChartPanelSetImageText';
import EChartPanelSetChart from './eChartPanelSetChart';
import EChartPanelSetSum from './eChartPanelSetSum';
import EChartPanelSetDateTime from './eChartPanelSetDateTime';
import EChartPanelDisplay2 from './eChartPanelDisplay2';
import EChartPanelDisplay3 from './eChartPanelDisplay3_Design';
import * as eChartDemoData from '../eChartDemoData';
import * as portalactions from '../../../redux/portal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileUpload from '../../file-upload';
import SvgIcon from 'SvgIcon';

class eChartPanelDesign extends React.Component {
  constructor(props) {
    super(props);
    eChartCommon.LogChartInfo("eChartPanelDesign constructor ", "", 900);
    let params = props.data.params;//editType: "add", id: -1, name: "", type: 1
    this.parentViewModel = props.data.parentViewModel;
    this.stateCache = [];
    let panelType = params.type ? params.type : 1;
    let leftPanelIndex = 1;
    if (panelType == 2 || panelType == 3)
      leftPanelIndex = 3;
    this.state = {
      panelType: panelType,
      editType: params.editType,
      curOperateType: "",
      // "" 主界面 // "selectTemplate" 选择模板 //"splitCol" 拆分行列 // "selectColType" 设置内容类型 //"setImageText" 标题 //"setChart" 图表 //"setSum" 汇总区
      leftPanelIndex: leftPanelIndex,
      selectedColKey: "",
      templateList: [],
      editPanel: {},
      backStyleArr: eChartCommon.getBackStyleArr(),
      focusedKey: "",
      hideSettingPanel: -1
    };
    this.skinConfig = "";
  }
  pushState() {
    let tmp = _.cloneDeep(this.state);
    this.stateCache.push(tmp);
  }
  popState() {
    let self = this;
    if (self.stateCache.length > 0) {
      cb.utils.confirm('当前操作将撤销上次所做的拆分操作，是否继续?', function () {
        let state = self.stateCache.pop();
        state.curOperateType = "";
        self.setState(state);
      });
    }
    else {
      cb.utils.alert("已经回退到最初拆分前的状态。");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let bFlag;
    if (this.state.panelType == 3) {
      if (_.isEqual(nextState, this.state) == false) {
        bFlag = true;
      }
      else {
        bFlag = false;
      }
    }
    else {
      bFlag = true;
    }
    eChartCommon.LogChartInfo("eChartPanelDesign shouldComponentUpdate return ", bFlag, 900);
    return bFlag;
  }
  componentWillReceiveProps(nextProps) {
    eChartCommon.LogChartInfo("eChartPanelDesign componentWillReceiveProps", "", 900);
    if (!nextProps.callback || nextProps.callback === this.props.callback) return;
    cb.utils.confirm(`确定要${nextProps.caption}么`, function () {
      nextProps.callback();
    });
  }
  setCurrentSkin() {
    let skinKey = this.state.editPanel.skinKey_BackStyle || this.state.editPanel.skinKey_BackColor;
    if (skinKey) {
      this.skinConfig = eChartCommon.getSkinArr(skinKey);
    } else {
      this.skinConfig = "";
    }
  }
  render() {
    let self = this;
    this.setCurrentSkin();
    let curOperateModal;
    let settingPanel;
    let previewContent = null;
    eChartCommon.LogChartInfo("eChartPanelDesign render", "", 900);
    if (self.state.panelType == 1 || self.state.panelType == 2) {
      if (self.state.curOperateType == "setImageText") {
        curOperateModal = self.getDesignColType_Title();
      }
      else if (self.state.curOperateType == "setChart") {
        curOperateModal = self.getDesignColType_Chart(undefined, true);
      }
      else if (self.state.curOperateType == "setSum") {
        curOperateModal = self.getDesignColType_Sum(undefined, true);
      }
      else if (self.state.curOperateType == "setComponent_DateTime") {
        curOperateModal = self.getDesignColType_DateTime();
      }
    } else {
      settingPanel = self.getSettingPanel();
    }

    let leftPanel = self.getLeftPanel();
    let rightPanel;
    if (_.isEmpty(self.state.editPanel)) {
      let style = self.getStyle_Edit("all", "", {})
      rightPanel = <div style={style}>编辑界面</div>;
    } else {
      if (self.state.panelType == 1 || self.state.panelType == 2)
        rightPanel = self.getEditPanel();
      else if (self.state.panelType == 3)
        rightPanel = self.getEditPanel_Mobile();
    }
    if (self.state.curOperateType == "preView") {
      previewContent = self.getPreView();
    }
    let curDisplay = self.state.curOperateType == "preView" ? "none" : "";
    let tmp = <div className={"ele_Panel_Outer ele_Panel_Outer_Type" + self.state.panelType} style={{ height: "100%", width: "100%" }}>
      <div className="ele_Panel" style={{ height: "100%", width: "100%", display: curDisplay }}>
        <div className={"eChartPanelDesign_LeftPanel" + (self.state.panelType == 33333 ? "3" : "")} style={{ height: "100%", float: "left" }}>{leftPanel}</div>
        <div className={"eChartPanelDesign_EditPanel" + (self.state.panelType == 3 ? "3" : "")} style={{ height: "100%", float: "left" }}>{rightPanel}</div>
        {settingPanel}
      </div>
      <div style={{ width: "100%", height: "100%", backgroundColor: eChartCommon.panelDefaultValue.panel2AllBackgroundColor, display: (!!previewContent ? "" : "none") }}>
        {previewContent}
      </div>
      {curOperateModal}
    </div>;
    return tmp;
  }
  getPanelSaveItems(rows) {
    let self = this;
    let itemArr = [];
    rows.forEach(rowEle => {
      rowEle.cols.forEach(colEle => {
        let item = {};
        if (colEle.widgetType == "rows") {
          let subItemArr = self.getPanelSaveItems(colEle.widgetValue);
          itemArr = _.concat(itemArr, subItemArr);
        } else if (colEle.widgetType == "chart") {
          item.billnum = colEle.panelChartConfig.billnum;
          item.groupSchemaId = colEle.panelChartConfig.groupSchemaId;
          item.itemKey = colEle.panelChartConfig.chartKey;
          item.condition = JSON.stringify(colEle.panelChartConfig.condition);
          colEle.panelChartConfig.condition = undefined;
          itemArr.push(item);
        } else if (colEle.widgetType == "sum") {
          item.billnum = colEle.sumConfig.billnum;
          item.groupSchemaId = colEle.sumConfig.groupSchemaId;
          item.itemKey = colEle.sumConfig.chartKey;
          item.condition = JSON.stringify(colEle.sumConfig.condition);
          colEle.sumConfig.condition = undefined;
          itemArr.push(item);
        }
      });
    });
    return itemArr;
  }
  savePanel(bOK, bSaveOther) {
    let self = this;
    if (bOK) {
      let editPanel = _.cloneDeep(self.state.editPanel);
      if (!editPanel.name) {
        cb.utils.alert("名称不可为空。");
        return;
      }
      editPanel.name = eChartCommon.checkTempName(editPanel.name);
      eChartCommon.LogChartInfo("大屏方案 Save editPanel ", JSON.stringify(editPanel), 900);
      let panelLayOutConfig = editPanel.panelLayOutConfig;
      let params = {};
      if (bSaveOther) {
        self.state.editType = "add";
      }
      params.type = self.state.panelType;
      if (self.state.editType == "edit") {
        params.id = editPanel.id;
      }
      params.name = editPanel.name;
      let items = self.getPanelSaveItems(panelLayOutConfig.rows);
      if (items.length > 0)
        params.items = items;
      else
        params.items = [{}];
      params.pageLayout = JSON.stringify(editPanel);
      eChartCommon.LogChartInfo("大屏方案 Save params ", JSON.stringify(params), 7);
      let callback = (json) => {
        if (json.code === 200) {
          cb.utils.alert(self.state.panelType == 1 ? "大屏看板已保存。" : "桌面看板已保存。");
          if (self.state.editType == "add") {
            let editPanel = _.cloneDeep(self.state.editPanel);
            editPanel.id = json.data;
            self.setState({ editPanel, editType: "edit" });
          }
        }
        else {
          eChartCommon.LogChartInfo("大屏方案保存失败。err ", json.message, 999);
        }
      }
      eChartProxy.doProxy(eChartProxy.url.saveReportView, 'POST', params, callback);
    }
    else {
      self.cancelOpereate();
    }
  }
  getLeftPanel() {

    let self = this;
    let leftPanelIndex = self.state.leftPanelIndex;
    let editPanel = self.state.editPanel || {};
    let content = [];
    content.push(<Row className="tab">
      {self.state.panelType == 1 ?
        <Button type={leftPanelIndex == 1 ? "primary" : "default"} onClick={() => self.setState({ leftPanelIndex: 1 })}>样式</Button>
        :
        <Button type={leftPanelIndex == 3 ? "primary" : "default"} onClick={() => self.setState({ leftPanelIndex: 3 })}>样式</Button>
      }
      <Button type={leftPanelIndex == 2 ? "primary" : "default"} onClick={() => self.setState({ leftPanelIndex: 2 })}>部件</Button>
    </Row>);

    if (leftPanelIndex == 1) {
      content.push(<Row className="title">布局</Row>);
      let templateContent = self.getTemplates();
      if (templateContent)
        content.push(templateContent);

      content.push(<Row className="title">显示比例</Row>);
      content.push(
        <Row className="proportion">
          <Button type={editPanel.panelWidthScale == 16 && editPanel.panelHeightScale == 9 ? "primary" : "default"} onClick={() => self.setPanelConfigValueArr([{ name: "panelWidthScale", value: 16 }, { name: "panelHeightScale", value: 9 }])}>16:9<i> (推荐)</i></Button>
          <Button type={editPanel.panelWidthScale == 4 && editPanel.panelHeightScale == 3 ? "primary" : "default"} onClick={() => self.setPanelConfigValueArr([{ name: "panelWidthScale", value: 4 }, { name: "panelHeightScale", value: 3 }])}>4:3</Button>
        </Row>);
      content.push(
        <Row className="wide-high">
          <Col className="little-title">宽度/高度</Col>
          <Col className="nums">
            <Input
              value={editPanel.panelWidthScale}
              onChange={(e) => self.setPanelConfigValue("panelWidthScale", e.target.value)}
            />
          </Col>
          <Col className="bi">:</Col>
          <Col className="nums">
            <Input
              value={editPanel.panelHeightScale}
              onChange={(e) => self.setPanelConfigValue("panelHeightScale", e.target.value)}
            />
          </Col>
        </Row>);

      content.push(<Row className="title">背景色</Row>);
      // let colorArr = ["#dbd4d3", "green", "blue", "yellow"];
      let colorArr = eChartCommon.getBackColorArr();
      let tmpContent = [];
      colorArr.forEach((ele, index) =>

        tmpContent.push(
          <Button
            className={"backgroundcolor" + index + " " + (editPanel.backgroundColor == ele.color ? "backgroundcolorselected" : "")}
            style={{ backgroundColor: ele.color }}
            onClick={() => self.setBackGroundColor(ele)}
            onMouseEnter={() => this.onMouseEnter(ele.color)}
            onMouseLeave={() => this.onMouseLeave()}
          >
            {(editPanel.backgroundColor == ele.color || self.state.focusedKey == ele.color) ? <Icon type="xuanzhong1-copy" /> : ""}
          </Button>
        ));
      tmpContent.push(
        <div onClick={() => self.setBackGroundColor("")}>
          <SvgIcon type="qingchubeijingse" />
        </div>
      );
      content.push(<Row className="background-color">{tmpContent}</Row>);

      content.push(<Row className="bg-style">
        <span>背景风格</span>
        <span><Button onClick={() => self.setBackStyle()}>清除</Button></span>
      </Row>);

      tmpContent = [];
      self.state.backStyleArr.forEach((ele) => {
        let isSelected = editPanel.backStyleKey && editPanel.backStyleKey == ele.backStyleKey;
        let isFocused = self.state.focusedKey == ele.backStyleKey ? true : false;
        let className = "eChartPanelDesign_" + ele.backStyleKey;
        className = className + " " + (isSelected ? "eChartPanelDesign_BackStyle_Selected" : "eChartPanelDesign_BackStyle_UnSelected");
        tmpContent.push(
          <Col
            onClick={() => self.setBackStyle(ele)}
            onMouseEnter={() => this.onMouseEnter(ele.backStyleKey)}
            onMouseLeave={() => this.onMouseLeave()}
          >
            <div className={className}>
              <img src={ele.icon} />
              {(isSelected || isFocused) ? <SvgIcon type="xuanzhong1-copy" /> : ""}
            </div>
            <div>
              {ele.name}
            </div>
          </Col >
        )
      });
      content.push(<Row colCount={12} className="bg-style-list">{tmpContent}</Row>);
    }
    else if (leftPanelIndex == 2) {
      if (self.state.panelType == 1) {
        content.push(
          <div onClick={() => self.setColType("setImageText")} className="chart-img clearfix">
            <SvgIcon type="tuwen" />
            <div>图文</div>
            <div className="icon-jia"><Icon type="jia" /></div>
            {/* <Col span={3}><Button onClick={() => self.setColType("setImageText")}>+</Button></Col> */}
          </div>);
      }
      content.push(
        <div onClick={() => self.setColType("setChart")} className="chart-img clearfix">
          <SvgIcon type="tubiao" />
          <div >图表</div>
          <div className="icon-jia"><Icon type="jia" /></div>
          {/* <Col span={3}><Button onClick={() => self.setColType("setChart")}>+</Button></Col> */}
        </div>);
      content.push(
        <div onClick={() => self.setColType("setSum")} className="chart-img clearfix">
          <SvgIcon type="huizong" />
          <div >汇总</div>
          <div className="icon-jia"><Icon type="jia" /></div>
          {/* <Col span={3}><Button onClick={() => self.setColType("setSum")}>+</Button></Col> */}
        </div>);
      if (self.state.panelType == 2) {
        content.push(
          <div onClick={() => self.setComponent(eChartCommon.components.commonFunc)} className="chart-img clearfix">
            <SvgIcon type="tianqi" />
            <div >常用功能</div>
            <div className="icon-jia"><Icon type="jia" /></div>
            {/* <div span={3}><Button onClick={() => self.setComponent(eChartCommon.components.weather)}>+</Button></div> */}
          </div>);

      }
      if (self.state.panelType == 1) {
        content.push(
          <div onClick={() => self.setComponent(eChartCommon.components.weather)} className="chart-img clearfix">
            <SvgIcon type="tianqi" />
            <div >天气</div>
            <div className="icon-jia"><Icon type="jia" /></div>
            {/* <div span={3}><Button onClick={() => self.setComponent(eChartCommon.components.weather)}>+</Button></div> */}
          </div>);

        content.push(
          <div onClick={() => self.setComponent(eChartCommon.components.datetime)} className="chart-img clearfix">
            <SvgIcon type="riqishijian" />
            <div >日期时间</div>
            <div className="icon-jia"><Icon type="jia" /></div>
            {/* <div span={3}><Button onClick={() => self.setComponent(eChartCommon.components.weather)}>+</Button></div> */}
          </div>);
      }
    }
    else if (leftPanelIndex == 3) {
      if (self.state.panelType == 2) {
        content.push(<Row className="title">布局</Row>);
        let templateContent = self.getTemplates();
        if (templateContent) {
          content.push(templateContent);
        }
      }
      content.push(<Row className="title">基础行操作</Row>);
      content.push(
        <Row>
          <div className="eChartPanelDesign_RowOperate" onClick={() => self.handleTemplate2Row(1)}><SvgIcon type="dingbucharuhang" /><div>顶部插入行</div></div>
          <div className="eChartPanelDesign_RowOperate" onClick={() => self.handleTemplate2Row(3)}><SvgIcon type="dibucharuhang" /><div>底部插入行</div></div>
          <div className="eChartPanelDesign_RowOperate" onClick={() => self.handleTemplate2Row(2)}><SvgIcon type="ciqiancharuhang" /><div>此前插入行</div></div>
          {/* <div  className="eChartPanelDesign_RowOperate"onClick={() => self.handleTemplate2Row(6)}>行后插入单元</div> */}
          <div className="eChartPanelDesign_RowOperate" onClick={() => self.handleTemplate2Row(4)}><SvgIcon type="shangyidangqianhang" /><div>上移当前行</div></div>
          <div className="eChartPanelDesign_RowOperate" onClick={() => self.handleTemplate2Row(5)}><SvgIcon type="xiayidangqianhang" /><div>下移当前行</div></div>
          <div className="eChartPanelDesign_RowOperate" onClick={() => self.handleTemplate2Row(0)}><SvgIcon type="shanchudangqianhang" /><div>删除当前行</div></div>
          {/* {self.state.panelType == 3 ?
            <div className="eChartPanelDesign_RowOperate" onClick={() => self.clearColType()}><SvgIcon type="shanchudangqianhang" /><div>移除当前控件</div></div>
            : ""} */}
        </Row>);
    }
    return content;
  }

  handleTemplate2Row(type) {
    let self = this;
    let editPanel = _.cloneDeep(self.state.editPanel);
    let rows = editPanel.panelLayOutConfig.rows
    let selectedColKey
    let selectedBaseRows;
    let selectedBaseIndex = 0;

    selectedColKey = self.state.selectedColKey;
    if (type == 0 || type == 2 || type == 4 || type == 5 || type == 6) {
      if (!selectedColKey) {
        cb.utils.alert('请选择行', 'error');
        return;
      }
    }
    if (selectedColKey) {
      rows.forEach((rowEle) => {
        let cols = rowEle.cols;
        cols.forEach((colEle) => {
          if ((colEle.bBaseCol == true || colEle.bBaseRows == true) && colEle.widgetType == "rows") {
            let innerRows = colEle.widgetValue;
            innerRows.forEach((innerRowEle, innerIndex) => {
              let colsInfo = self.getColParentInfo([innerRowEle], selectedColKey);
              if (_.isEmpty(colsInfo) == false) {
                selectedBaseIndex = innerIndex;
                selectedBaseRows = innerRows;
              }
            }
            )
          }
        }
        )
      });
    }
    if (type == 0 && selectedBaseRows.length <= 1) {
      cb.utils.alert('至少保留一行。', 'error');
      return;
    }
    if ((type == 1 || type == 3) && !selectedBaseRows)//没有选择当前行而且选择插入顶部底部，则自动选择第一个
    {
      rows.forEach((rowEle) => {
        let cols = rowEle.cols;
        cols.forEach((colEle) => {
          if ((colEle.bBaseCol == true || colEle.bBaseRows == true) && colEle.widgetType == "rows") {
            let innerRows = colEle.widgetValue;
            selectedBaseIndex = 0;
            selectedBaseRows = innerRows;
          }
        }
        )
      });
    }
    if (!selectedBaseRows) {
      cb.utils.alert('没有查找到处理行需要的信息。', 'error');
      return;
    }

    eChartCommon.LogChartInfo("当前选择的行的Index ", selectedBaseIndex, 900);
    self.pushState();
    if (type == 0) {
      selectedBaseRows.splice(selectedBaseIndex, 1);
    }
    else if (type == 1) {
      let row = eChartCommon.getPanelLayOutTemplateRow2();
      selectedBaseRows.splice(0, 0, row);
    }
    else if (type == 2) {
      let row = eChartCommon.getPanelLayOutTemplateRow2();
      selectedBaseRows.splice(selectedBaseIndex, 0, row);
    }
    else if (type == 6) {
      let row = eChartCommon.getPanelLayOutTemplateRow2();
      if (selectedBaseIndex == selectedBaseRows.length - 1)
        selectedBaseRows.push(row);
      else
        selectedBaseRows.splice(selectedBaseIndex + 1, 0, row);
    }
    else if (type == 3) {
      let row = eChartCommon.getPanelLayOutTemplateRow2();
      selectedBaseRows.push(row);
    }
    else if (type == 4) {
      if (selectedBaseIndex > 0) {
        let tmp = selectedBaseRows.splice(selectedBaseIndex, 1);
        selectedBaseRows.splice(selectedBaseIndex - 1, 0, tmp[0])
      }
    }
    else if (type == 5) {
      if (selectedBaseIndex < selectedBaseRows.length - 1) {
        let tmp = selectedBaseRows.splice(selectedBaseIndex + 1, 1);
        selectedBaseRows.splice(selectedBaseIndex, 0, tmp[0])
      }
    }

    eChartCommon.reCalcTemplate2Height2AndRowsHeight(editPanel);
    self.setState({ editPanel: editPanel });
  }

  onMouseEnter(focusedKey) {
    this.setState({ focusedKey: focusedKey });
  }
  onMouseLeave() {
    this.setState({ focusedKey: "" });

  }
  setComponent(component) {
    let self = this;
    let colEle = self.getSelectedCol();
    if (_.isEmpty(colEle)) {
      cb.utils.alert("请选择区域。");
    } else if (colEle.widgetType == "none") {
      colEle.widgetType = component.widgetType;
      colEle.componentConfig = component.componentConfig;
      if (component.componentConfig.subType == "datetime")
        this.setState({ curOperateType: "setComponent_DateTime" });
      else
        this.setState({});
    } else {
      cb.utils.alert("当前区域已经有控件，请先清除。");
    }
  }
  setColType(operateType) {
    let self = this;
    let colEle = self.getSelectedCol();
    if (_.isEmpty(colEle)) {
      cb.utils.alert("请选择区域。");
    } else if (colEle.widgetType == "none") {
      if (!!this.state.selectedColKey)
        this.setState({ curOperateType: operateType, hideSettingPanel: 0 });
    } else if (self.state.panelType == 3 && self.state.hideSettingPanel != 0) {
      this.setState({ hideSettingPanel: 0 });
    } else {
      cb.utils.alert("当前区域已经有控件，请先清除。");
    }
  }

  setBackGroundColor(ele) {
    let editPanel = this.state.editPanel;
    if (this.state.editPanel.backgroundColor == ele.color) {
      editPanel.backColorKey = "";
      editPanel.backgroundColor = "";
      editPanel.skinKey_BackColor = "";
    }
    else {
      editPanel.backColorKey = ele.backColorKey;
      editPanel.backgroundColor = ele.color;
      editPanel.skinKey_BackColor = ele.skinKey;
    }
    this.setState();
  }
  getSettingPanel() {

    let obj1;
    let obj2;
    let self = this;
    let curCol = self.getSelectedCol();
    let curOperateType = self.state.curOperateType;
    if (self.state.hideSettingPanel == 0) {
      if (curOperateType == "setChart" || curCol.widgetType == "chart") {
        obj1 = self.getDesignColType_Chart(curCol, true);
        obj2 = self.getDesignColType_Sum(undefined, false);
      } else if (curOperateType == "setSum" || curCol.widgetType == "sum") {
        obj1 = self.getDesignColType_Chart(undefined, false);
        obj2 = self.getDesignColType_Sum(curCol, true);
      }
    }
    let bHide = (_.isEmpty(obj1) && _.isEmpty(obj2));
    return <div
      className={"eChartPanelDesign_SettingPanel3 eChartPanelDesign_SettingPanel_" + (bHide ? "Hide" : "Show")}
      style={{ height: "100%", float: "left" }}
    >
      <div className={"eChartPanelDesign_SettingPanel_Outer eChartPanelDesign_SettingPanel_" + (bHide ? "Hide2" : "Show2")}
        style={{ display: (self.state.hideSettingPanel == -1 ? "none" : "") }}
      >
        <div className="eChartPanelDesign_SettingPanelTitle" >信息设置</div>
        {/* <Button onClick={() => self.hideSettingPanel()}>隐藏</Button> */}
        <div className="icon-guanbi1" onClick={() => self.hideSettingPanel()}><Icon type="guanbi1" /></div>
        {obj1}
        {obj2}
      </div>
    </div>;
  }
  selectCol(selectedColKey, widgetType) {
    // this.state.selectedColKey = selectedColKey;
    if (this.state.selectedColKey != selectedColKey) {
      let hideSettingPanel = this.state.hideSettingPanel;
      if (hideSettingPanel == -1 && widgetType != "none") {
        hideSettingPanel = 0;
      }
      this.setState({ selectedColKey, curOperateType: "", hideSettingPanel });
    }
  }
  getEditPanel_Mobile() {
    let self = this;
    let panelConfig = _.cloneDeep(self.state.editPanel);
    let content = <EChartPanelDisplay3
      isInDesign={true}
      panelId={undefined}
      panelConfig={panelConfig}
      selectCol={(selectedColKey, widgetType) => self.selectCol(selectedColKey, widgetType)}
      doSplit={(bOK, info, selectedColKey) => self.doSplit(bOK, info, selectedColKey)}
      clearColTypeInner={(colEle) => self.clearColTypeInner(colEle)}
    />;
    return <div style={{ height: "100%", width: "100%" }}>
      <div className="template3-name" style={{ width: "100%", height: "auto" }} >
        <span>名称:</span>
        <span>
          <Input
            value={self.state.editPanel.name} placeholder="请输入"
            onChange={(e) => self.setPanelConfigValue("name", e.target.value)}
          />
        </span>
      </div>
      <div className="template3-content_outer ">
        <div className="template3-content panelLayer3-all">
          {content}
        </div>
      </div>
      <div className="btn-toolbar-bottom btn-group-bottom bottom-toolbar eChartPanelDesign_EditPanel_bottom">
        <Button className="ant-btn ant-btn-primary" onClick={() => self.savePanel(true)}>确定</Button>
        <Button className="ant-btn" onClick={() => self.cancelSplit()}>撤销拆分</Button>
        <Button className="ant-btn" onClick={() => self.savePanel(false)}>取消</Button>
      </div>
    </div>;
  }
  getEditPanel() {
    let self = this;
    let editPanel = self.state.editPanel;
    let content;
    let style = self.getStyle_Edit("all", "", editPanel);
    let innerStyle = self.getInnerStyle_Edit("all", "", editPanel);

    content = self.getDisplay_Edit(editPanel.panelLayOutConfig.rows);
    return <div style={{ height: "100%", width: "100%" }}>
      <div className="template-name">
        <span style={{ float: "left" }}>名称:</span>
        <span style={{ float: "left" }}>
          <Input
            value={editPanel.name} placeholder="请输入"
            onChange={(e) => self.setPanelConfigValue("name", e.target.value)}
          />
        </span>
      </div>
      <div className="template-content panelLayer-all">
        <div className="panelLayer-all-outer" style={style} >
          <div className="panelLayer-all-inner" style={innerStyle} >
            {content}
          </div>
        </div>
      </div>
      <div className="btn-toolbar-bottom btn-group-bottom bottom-toolbar eChartPanelDesign_EditPanel_bottom">
        <Button className="ant-btn ant-btn-primary" onClick={() => self.savePanel(true)}>确定</Button>
        <Button className="ant-btn ant-btn-primary" onClick={() => self.preView(true)}>预览</Button>
        <Button className="ant-btn" onClick={() => self.cancelSplit()}>撤销拆分</Button>
        <Button className="ant-btn" onClick={() => self.savePanel(false)}>取消</Button>
      </div>
    </div>;
  }
  setBackStyle(ele) {
    let editPanel = this.state.editPanel;
    if (ele) {
      editPanel.backStyleKey = ele.backStyleKey;
      editPanel.skinKey_BackStyle = ele.skinKey;
      editPanel.backgroundImage = ele.backgroundImage;
    } else {
      editPanel.backStyleKey = "";
      editPanel.skinKey_BackStyle = "";
      editPanel.backgroundImage = "";
    }
    this.setState({ editPanel });
  }
  setPanelConfigValue(name, value) {
    let editPanel = _.cloneDeep(this.state.editPanel);
    editPanel[name] = value;
    this.setState({ editPanel });
  }
  setPanelConfigValueArr(arr) {
    let editPanel = _.cloneDeep(this.state.editPanel);
    arr.forEach((ele) => {
      editPanel[ele.name] = ele.value;
    })
    this.setState({ editPanel });
  }

  getRemainWidth() {
    let scale = {};
    let editPanel = this.state.editPanel;
    if (process.env.__CLIENT__ === true) {
      let clientWidth = document.body.clientWidth;
      let clientHeight = document.body.clientHeight;
      scale.width = Number(clientWidth) - (1366 - 920);
      scale.height = Number(clientHeight) - (637 - 450);
      if (Number(scale.width) < 920)
        scale.width = 920;
      if (Number(scale.height) < 450)
        scale.height = 450;
      eChartCommon.LogChartInfo("", "clientWidth = " + clientWidth + " clientHeight = " + clientHeight + " scale = " + JSON.stringify(scale), 12)
      if (editPanel.type == "2" && editPanel.height2) {
          scale.height = scale.height * editPanel.height2;
      }
    }
    return scale;
  }
  calcPanelWidth(style, maxWidth, maxHeight, postFix) {
    let editPanel = this.state.editPanel;
    let panelWidthScale = editPanel.panelWidthScale;
    let panelHeightScale = editPanel.panelHeightScale;
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
  }

  getStyle_Edit(eleType, innerType, ele) {

    let style = {};
    if (eleType == "row") {
      style.width = '100%';
      style.height = ele.height;
    } else if (eleType == "col") {
      style.height = '100%';
      style.width = ele.width;
      style.float = 'left';
    } else if (eleType == "all") {
      let scale = this.getRemainWidth();
      this.calcPanelWidth(style, scale.width, scale.height, "px");
    }
    style.border = "0px";
    if (eChartDemoData.demoConfig.isShowAllMargin == true || eleType == "all" || (eleType == "col" && innerType == "control") || ele.bOuterMargin) {
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

      let borderType = "";
      let borderWidth = "";
      let borderColor = "";

      if (ele.borderWidth == "0px") {
        borderType = "solid";
        borderWidth = eChartCommon.panelDefaultValue.borderWidth;
        borderColor = "transparent"
      }
      else {
        borderType = "dashed";
        borderWidth = ele.borderWidth ? ele.borderWidth : eChartCommon.panelDefaultValue.borderWidth;
        borderColor = eChartCommon.panelDefaultValue.borderColor;
      }

      if (eleType == "col" && innerType == "control" && (this.getSelectedColKey() == ele.colKey || this.state.focusedKey == ele.colKey)) {
        //选中状态
        borderType = "solid";
        borderWidth = eChartCommon.panelDefaultValue.borderWidth;
        borderColor = "#cccccc";
        borderColor = "#969BA4";
      }
      // borderColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      style.border = borderWidth + " " + borderType + " " + borderColor;
    } else {
      style.border = "0px";
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
  getDesignToolBar(colEle) {
    let tools = [];
    let self = this;
    let widgetType = colEle.widgetType;
    let bNeedDel = false;
    if (widgetType == "none") {
      tools.push(
        <EChartPanelSplit
          colEle={colEle}
          doFunc={(bOK, info) => self.doSplit(bOK, info)}
          showContent={(bOK, colKey) => self.showSplitCard(bOK, colKey)}
          selectedColKey={self.state.selectedColKey}
          curOperateType={self.state.curOperateType}
          skinConfig={self.skinConfig}
          panelType={self.state.panelType}
        />
      );
    } else {
      if (colEle.widgetType != "component" || colEle.componentConfig.subType == "datetime") {
        tools.push(
          <div title="编辑" style={{ cursor: "pointer", color: (self.skinConfig ? self.skinConfig.designSkin.textColor : undefined), zIndex: "999" }} className="qingchu-btn edit-btn" onClick={() => self.modifyCol(colEle)}> 
            <div className="qingchu-btn-bg"><SvgIcon type="edit" /></div>
          </div>//编辑
        );
      }
      bNeedDel = true;
    }
    if (!!colEle.backgroundImage) {
      tools.push(
        <div title="清除背景图" style={{ cursor: "pointer", color: (self.skinConfig ? self.skinConfig.designSkin.textColor : undefined), zIndex: "999" }} className="qingchu-btn" onClick={() => self.doUpload(colEle, "")}>清除背景图</div>
      );
    } else if (self.state.panelType == 1) {
      tools.push(
        <FileUpload
          doUpload={(fileList) => self.doUpload(colEle, fileList)}
          showUploadList={false}
          multiple={false}
          bShowName={true}
          showName={""}//上传背景图
          showNameColor={self.skinConfig ? self.skinConfig.designSkin.textColor : undefined}
          showSVG={"export"}
          fileType={"pic"}
          hideDesc={true}
          showTitle="上传背景图"
        />
      );
    }
    if (bNeedDel)
      tools.push(
        <div title="清除"
          style={{ cursor: "pointer", color: (self.skinConfig ? self.skinConfig.designSkin.textColor : undefined), zIndex: "999" }}
          className="qingchu-btn del-btn" onClick={() => self.clearColType(colEle)}>
          <div className="qingchu-btn-bg"> <SvgIcon type="delete" /></div>
        </div>//清除
      );
    tools.push(<div style={{ display: "none" }} > {colEle.colKey} </div>);
    let isSelected = this.getSelectedColKey() == colEle.colKey ? true : false;
    let isFocused = this.state.focusedKey == colEle.colKey ? true : false;
    return <div
      className={colEle.backgroundImage ? "panelLayer-col-hasbackgroundimage" : "panelLayer-col-nobackgroundimage"}
      style={{ display: ((isFocused) ? "" : "none") }}
    >
      {tools.reverse()}
    </div>;
  }
  modifyCol(colEle) {
    let selectedColKey = colEle.colKey;
    let curOperateType = "";
    switch(colEle.widgetType){
      case "imagetext":
        curOperateType = "setImageText";
      break;
      case "chart":
        curOperateType = "setChart";
      break;
      case "sum":
        curOperateType = "setSum";
      break;
      case "component":
        if (colEle.componentConfig.subType == "datetime")
          curOperateType = "setComponent_DateTime";
      break;
      default:
    }
    this.setState({ selectedColKey, curOperateType });
  }
  getDisplay_Edit(rows) {
    let self = this;
    let rowArr = [];
    rows.forEach(rowEle => {
      let colArr = [];
      let rowStyle = self.getStyle_Edit("row", "", rowEle);
      let rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
      rowEle.cols.forEach(colEle => {
        let colStyle; let colInnerStyle; let curCol; let content; let onClickFunc;
        let toolbar = self.getDesignToolBar(colEle);
        if (colEle.widgetType == "none" || colEle.widgetType == "component" || colEle.widgetType == "sum" || colEle.widgetType == "chart" || colEle.widgetType == "imagetext") {
          onClickFunc = () => self.setState({ selectedColKey: colEle.colKey });
        }
        if (colEle.widgetType == "rows") {
          colStyle = self.getStyle_Edit("col", "rows", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
          content = self.getDisplay_Edit(colEle.widgetValue);
          curCol = <div className="panelLayer-col-inner" style={colInnerStyle} >{content} </div>;
        } else if (colEle.widgetType == "none") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          content = <div style={{ display: "none" }} >无控件</div>;
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className="panelLayer-col-inner panelLayer-col-final"
            onClick={onClickFunc}
            style={colInnerStyle}
          >
            {toolbar}
            {content}
          </div>;
        } else if (colEle.widgetType == "imagetext") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          content = self.getImageText(colEle.panelImageTextConfig);
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className="panelLayer-col-inner panelLayer-col-final"
            onClick={onClickFunc}
            style={colInnerStyle}
          >
            {toolbar}
            {content}
          </div>;
        } else if (colEle.widgetType == "chart") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          content = self.getChart(colEle.panelChartConfig);
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className="panelLayer-col-inner panelLayer-col-final"
            onClick={onClickFunc}
            style={colInnerStyle}
          >
            {toolbar}
            {content}
          </div>;
        } else if (colEle.widgetType == "sum") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          content = self.getSum(colEle.sumConfig);
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className="panelLayer-col-inner panelLayer-col-final "
            onClick={onClickFunc}
            style={colInnerStyle}
          >
            {toolbar}
            {content}
          </div>;
        } else if (colEle.widgetType == "datetime") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          content = self.getDateTime(colEle.dateTimeConfig);
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className="panelLayer-col-inner panelLayer-col-final "
            onClick={onClickFunc}
            style={colInnerStyle}
          >
            {toolbar}
            {content}
          </div>;
        } else if (colEle.widgetType == "component") {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          content = self.getComponent(colEle.componentConfig);
          curCol = <div
            onMouseEnter={() => this.onMouseEnter(colEle.colKey)}
            onMouseLeave={() => this.onMouseLeave()}
            className="panelLayer-col-inner panelLayer-col-final"
            onClick={onClickFunc}
            style={colInnerStyle}
          >
            {toolbar}
            {content}
          </div>;
        }
        else {
          colStyle = self.getStyle_Edit("col", "control", colEle);
          colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
          curCol = <div className="panelLayer-col-inner panelLayer-col-final" style={colInnerStyle}>未知控件</div>;
        }
        colArr.push(<Col className="panelLayer-col-outer" style={colStyle}>{curCol}</Col>);
      });
      rowArr.push(<Row className="panelLayer-row-outer" style={rowStyle} ><div className="panelLayer-row-inner" style={rowInnerStyle}>{colArr}</div> </Row>);
    });
    return rowArr;
  }
  getComponent(config) {
    return <div className="eChartPanelDesign_HasValue" ><SvgIcon type={config.icon} /><span>{config.title}</span></div>;
  }
  getSum(config) {
    return <div className="eChartPanelDesign_HasValue" ><SvgIcon type="huizongcopy" /><span>汇总</span></div>;
    let content = JSON.stringify(config);
    return <div >显示汇总信息:{content}</div>;
  }
  getDateTime(config) {
    return <div className="eChartPanelDesign_HasValue" ><SvgIcon type="riqidefuben" /><span>日期时间</span></div>;
  }
  getChart(config) {
    return <div className="eChartPanelDesign_HasValue" ><SvgIcon type="tubiaocopy" /><span>图表</span></div>;
    let content = JSON.stringify(config);
    return <div >显示图表信息:{content}</div>;
  }
  getImageText(config) {
    return <div className="eChartPanelDesign_HasValue" ><SvgIcon type="tuwencopy" /><span>图文</span></div>;
    let style = {};
    if (config.hasOwnProperty("fontSize")) style.fontSize = config.fontSize;
    if (config.hasOwnProperty("height")) style.height = config.height;
    if (config.hasOwnProperty("width")) style.width = config.width;
    if (config.hasOwnProperty("color")) style.color = config.color;
    if (config.hasOwnProperty("fontFamily")) style.fontFamily = config.fontFamily;
    if (config.hasOwnProperty("display")) style.display = config.display;
    return config.title ?<div style={style}>
      <div style={{ textAlign: 'center', width: '100%', overflow: 'hidden' }} >{config.subType == "title" ? config.title : config.subType}</div>
    </div>:undefined;
  }
  doUpload(colEle, fileList) {
    colEle.backgroundImage = fileList ? fileList[0].address:'';
    this.setState({});
  }
  clearColTypeInner(colKey) {
    let colEle = this.getSelectedCol(colKey);
    this.clearColType(colEle);
  }
  clearColType(colEle) {
    if (_.isEmpty(colEle)) {
      colEle = this.getSelectedCol();
    }
    if (_.isEmpty(colEle)) {
      cb.utils.alert("请选择区域。");
      return;
    }
    switch(colEle.widgetType){
      case "chart":
        colEle.panelChartConfig = undefined;
      break;
      case "imagetext":
        colEle.panelImageTextConfig = undefined;
      break;
      case "sum":
        colEle.sumConfig = undefined;
      break;
      case "datetime":
        colEle.dateTimeConfig = undefined;
      break;
      case "rows":
        colEle.widgetValue = undefined;
      break;
      case "component":
        colEle.componentConfig = undefined;
      break;
      default:
    }
    colEle.widgetType = "none";
    colEle.backgroundColor = "";
    colEle.backgroundImage = "";
    this.forceUpdate();
  }
  doSetImageText(bOK, info) {
    eChartCommon.LogChartInfo("大屏方案 设计 doSetImageText info ", JSON.stringify(info), 10);
    let self = this;
    let colEle = self.getSelectedCol();
    if (bOK) {
      colEle.widgetType = "imagetext";
      colEle.panelImageTextConfig = info;
      this.setState({ curOperateType: "" });
    } else {
      this.setState({ curOperateType: "" });
    }
  }
  doSetDateTime(bOK, info) {
    let self = this;
    let colEle = self.getSelectedCol();
    if (bOK) {
      let componentConfig = colEle.componentConfig;
      componentConfig.dateTimeConfig = info;
      this.setState({ curOperateType: "" });
    } else {
      let dateTimeConfig = colEle.componentConfig.dateTimeConfig;
      if (_.isEmpty(dateTimeConfig)) {
        colEle.widgetType = "none";
        colEle.componentConfig = undefined;
      }
      this.setState({ curOperateType: "" });
    }
  }
  doSetSum(bOK, info) {
    let self = this;
    let colEle = self.getSelectedCol();
    if (bOK) {
      colEle.widgetType = "sum";
      colEle.sumConfig = info;
    }
    this.state.curOperateType = "";
    this.forceUpdate();
  }
  doSetChart(bOK, info) {
    eChartCommon.LogChartInfo("大屏方案 设计 doSetChart info ", JSON.stringify(info), 10);
    let self = this;
    let colEle = self.getSelectedCol();
    if (bOK) {
      colEle.widgetType = "chart";
      colEle.panelChartConfig = info;
    }
    this.state.curOperateType = "";
    this.forceUpdate();
  }

  cancelSplit() {
    this.popState();
  }
  doSplit(bOK, info, selectedColKey) {
    let self = this;
    selectedColKey = selectedColKey || self.getSelectedColKey();
    let editPanel = _.cloneDeep(self.state.editPanel);
    eChartCommon.LogChartInfo("大屏方案 设计 info ", JSON.stringify(info), 10);

    if (bOK) {
      self.pushState();
      let colsInfo = self.getColParentInfo(editPanel.panelLayOutConfig.rows, selectedColKey);
      if (_.isEmpty(colsInfo) == false) {
        let curRows = colsInfo.rows;
        let curRowIndex = colsInfo.rowIndex;
        let curRow = curRows[curRowIndex];
        let curCols = colsInfo.cols;
        let curColIndex = colsInfo.colIndex;
        let curCol = curCols[curColIndex];
        if (info.bOuterMargin) {
          curCol.bOuterMargin = info.bOuterMargin;
        }
        if (info.bOuterBorder) {
          curCol.bOuterBorder = info.bOuterBorder;
        }
        if (info.splitType == "col") {//左右
          let width = "100";
          width = Number(width.replace("%", ""));
          let width1 = 0;
          let width2 = 0;
          let width3 = 0;
          if (info.count == 2) {
            width1 = parseInt(width * info.num1 / (Number(info.num1) + Number(info.num2)));
            width2 = width - width1;
          } else if (info.count == 3) {
            width1 = parseInt(width * info.num1 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
            width2 = parseInt(width * info.num2 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
            width3 = width - width1 - width2;
          }
          let col1 = eChartCommon.getNewCol();
          col1.isTitleArea = curCol.isTitleArea;
          col1.width = width1 + "%";
          col1.borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
          if (!info.bInnerMargin) col1.margin = "0px";
          selectedColKey = col1.colKey;

          let col2 = eChartCommon.getNewCol();
          col2.isTitleArea = curCol.isTitleArea;
          col2.width = width2 + "%";
          col2.borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
          if (!info.bInnerMargin) col2.margin = "0px";

          let col3 = eChartCommon.getNewCol();
          col3.isTitleArea = curCol.isTitleArea;
          col3.width = width3 + "%";
          col3.borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
          if (!info.bInnerMargin) col3.margin = "0px";

          let row1 = eChartCommon.getNewRow(curRow);
          row1.isTitleArea = curCol.isTitleArea;
          if (info.count == 2) {
            row1.cols.push(col1);
            row1.cols.push(col2);
          } else if (info.count == 3) {
            row1.cols.push(col1);
            row1.cols.push(col2);
            row1.cols.push(col3);
          }
          curCol.widgetType = "rows";
          curCol.widgetValue = [];
          curCol.widgetValue.push(row1);

        } else if (info.splitType == "row") {//上下
          if (curCols.length == -999) {//当前行只有一个列，还拆行，就在当前行上进行拆行,不再使用
            let height = curRow.height;
            height = Number(height.replace("%", ""));
            let height1 = 0;
            let height2 = 0;
            let height3 = 0;
            if (info.count == 2) {
              height1 = parseInt(height * info.num1 / (Number(info.num1) + Number(info.num2)));
              height2 = height - height1;
            } else if (info.count == 3) {
              height1 = parseInt(height * info.num1 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
              height2 = parseInt(height * info.num2 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
              height3 = height - height1 - height2;
            }
            let row1 = _.cloneDeep(curRow);
            row1.rowKey = eChartCommon.getNewRowKey();
            row1.cols[0].colKey = eChartCommon.getNewColKey();;
            row1.height = height1 + "%";
            row1.cols[0].borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
            if (!info.bInnerMargin) row1.cols[0].margin = "0px";
            selectedColKey = row1.cols[0].colKey;
            let row2 = _.cloneDeep(curRow);
            row2.rowKey = eChartCommon.getNewRowKey();
            row2.cols[0].colKey = eChartCommon.getNewColKey();;
            row2.height = height2 + "%";
            row2.cols[0].borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
            if (!info.bInnerMargin) row2.cols[0].margin = "0px";
            let row3 = _.cloneDeep(curRow);
            row3.rowKey = eChartCommon.getNewRowKey();
            row3.cols[0].colKey = eChartCommon.getNewColKey();;
            row3.height = height3 + "%";
            row3.cols[0].borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
            if (!info.bInnerMargin) row3.cols[0].margin = "0px";
            if (info.count == 2) {
              curRows.splice(curRowIndex, 1, row1);
              curRows.splice(curRowIndex + 1, 0, row2);
            } else if (info.count == 3) {
              curRows.splice(curRowIndex, 1, row1);
              curRows.splice(curRowIndex + 1, 0, row2);
              curRows.splice(curRowIndex + 2, 0, row3);
            }

          } else {//当前行有多个列，还拆行，就在当前列上进行拆行
            let height1 = 0;
            let height2 = 0;
            let height3 = 0;
            if (info.count == 2) {
              height1 = parseInt(100 * info.num1 / (Number(info.num1) + Number(info.num2)));
              height2 = 100 - height1;
            }
            else if (info.count == 3) {
              height1 = parseInt(100 * info.num1 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
              height2 = parseInt(100 * info.num2 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
              height3 = 100 - height1 - height2;
            }
            let firstRowFlag = curCol.isTitleArea;
            if (height1 <= 20 && editPanel.splitCounter == 0)
              firstRowFlag = true;
            let row1 = {
              rowKey: eChartCommon.getNewRowKey(),
              isTitleArea: firstRowFlag,
              height: height1 + '%',
              padding: eChartCommon.panelDefaultValue.padding,
              margin: eChartCommon.panelDefaultValue.margin,
              cols:
                [
                  {
                    colKey: eChartCommon.getNewColKey(),
                    isTitleArea: firstRowFlag,
                    width: '100%',
                    padding: eChartCommon.panelDefaultValue.padding,
                    margin: info.bInnerMargin ? eChartCommon.panelDefaultValue.margin : "0px",
                    widgetType: "none",
                    borderWidth: info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px",
                    borderColor: curCol.borderColor,
                    backgroundColor: curCol.backgroundColor
                  }
                ]
            };
            selectedColKey = row1.cols[0].colKey;
            let row2 = {
              rowKey: eChartCommon.getNewRowKey(),
              isTitleArea: curCol.isTitleArea,
              height: height2 + '%',
              padding: eChartCommon.panelDefaultValue.padding,
              margin: eChartCommon.panelDefaultValue.margin,
              cols:
                [
                  {
                    colKey: eChartCommon.getNewColKey(),
                    isTitleArea: curCol.isTitleArea,
                    width: '100%',
                    padding: eChartCommon.panelDefaultValue.padding,
                    margin: info.bInnerMargin ? eChartCommon.panelDefaultValue.margin : "0px",
                    widgetType: "none",
                    borderWidth: info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px",
                    borderColor: curCol.borderColor,
                    backgroundColor: curCol.backgroundColor
                  }
                ]
            };
            let row3 = {
              rowKey: eChartCommon.getNewRowKey(),
              isTitleArea: curCol.isTitleArea,
              height: height3 + '%',
              padding: eChartCommon.panelDefaultValue.padding,
              margin: eChartCommon.panelDefaultValue.margin,
              cols:
                [
                  {
                    colKey: eChartCommon.getNewColKey(),
                    isTitleArea: curCol.isTitleArea,
                    width: '100%',
                    padding: eChartCommon.panelDefaultValue.padding,
                    margin: info.bInnerMargin ? eChartCommon.panelDefaultValue.margin : "0px",
                    widgetType: "none",
                    borderWidth: info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px",
                    borderColor: curCol.borderColor,
                    backgroundColor: curCol.backgroundColor
                  }
                ]
            };
            curCol.widgetType = "rows";
            curCol.widgetValue = [];
            if (info.count == 2) {
              curCol.widgetValue.push(row1);
              curCol.widgetValue.push(row2);
            }
            else if (info.count == 3) {
              curCol.widgetValue.push(row1);
              curCol.widgetValue.push(row2);
              curCol.widgetValue.push(row3);
            }
          }
        }
      }
      editPanel.splitCounter = (editPanel.splitCounter || 0) + 1;
      if (this.state.panelType == 3)
        this.setState({ curOperateType: "", editPanel, selectedColKey: "" });
      else
        this.setState({ curOperateType: "", editPanel, selectedColKey });
    } else {
      this.setState({ curOperateType: "" });
    }
  }
  getColParentInfo(rows, colKey) {
    let self = this;
    let obj = {}
    rows.forEach((rowEle, rowIndex) => {
      let curRow = [];
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
  showSplitCard(bOK, colKey) {
    if (bOK) {
      this.setState({ curOperateType: "splitCol", selectedColKey: colKey });
    }
    else {
      this.setState({ curOperateType: "" });
    }
  }
  getDesignColType_Title() {
    let self = this;
    let curCol = self.getSelectedCol();
    eChartCommon.LogChartInfo("大屏方案 设计 getDesignColType_Title curCol ", JSON.stringify(curCol), 10);
    return <EChartPanelSetImageText
      colEle={curCol}
      doFunc={(bOK, info) => self.doSetImageText(bOK, info)}
    />;
  }
  getDesignColType_Chart(curCol, bVisible) {
    let self = this;
    if (bVisible) {
      curCol = curCol || self.getSelectedCol();
    }
    eChartCommon.LogChartInfo("大屏方案 设计 getDesignColType_Chart curCol ", JSON.stringify(curCol), 10);
    return <EChartPanelSetChart
      bVisible={bVisible}
      colEle={curCol}
      doFunc={(bOK, info) => self.doSetChart(bOK, info)}
      panelType={self.state.panelType}
    />;
  }
  hideSettingPanel() {
    this.setState({ curOperateType: "", hideSettingPanel: 1 });
  }
  getDesignColType_Sum(curCol, bVisible) {
    let self = this;
    if (bVisible) {
      curCol = curCol || self.getSelectedCol();
    }
    eChartCommon.LogChartInfo("大屏方案 设计 getDesignColType_Sum curCol ", JSON.stringify(curCol), 10);
    return <EChartPanelSetSum
      bVisible={bVisible}
      panelType={self.state.panelType}
      colEle={curCol}
      doFunc={(bOK, info) => self.doSetSum(bOK, info)}
    />;
  }
  getDesignColType_DateTime() {
    let self = this;
    let curCol = self.getSelectedCol();
    return <EChartPanelSetDateTime colEle={curCol} doFunc={(bOK, info) => self.doSetDateTime(bOK, info)} />;
  }
  getSelectedColKey() {
    return this.state.selectedColKey;
  }
  getSelectedCol(colKey) {
    let self = this;
    if (!self.state.editPanel.panelLayOutConfig)
      return {};
    let rows = self.state.editPanel.panelLayOutConfig.rows;
    colKey = colKey || self.state.selectedColKey;
    let colsInfo = self.getColParentInfo(rows, colKey);
    let cols = colsInfo.cols;
    let colIndex = colsInfo.colIndex;
    if (cols && colIndex != undefined)
      return cols[colIndex];
    else
      return {};
  }

  getTemplates() {
    let self = this;
    let templateList = self.state.templateList;
    let templateContents = [];
    templateList.forEach((template) => {
      let tmp = self.getTemplate(template);
      let isSelected = self.state.editPanel && self.state.editPanel.templateKey == template.templateKey;
      let tmpClsName = (self.state.panelType == 1 ? "eChartPanelDesign" : "eChartPanelDesign2");
      tmpClsName = tmpClsName + (isSelected ? "_Template_Selected" : "_Template_UnSelected");
      templateContents.push(
        <div
          onClick={(e) => self.setEditPanel(e, template)}
          className={tmpClsName}>
          <div className="icon"><SvgIcon type={template.icon} /></div>
          <div className="explain" style={{ display: "" }}>{template.templateName}</div>
        </div>
      );
    });
    return templateContents.length != 0 ?<div className={"eChartPanelDesign_TemplateLayOut clearfix " + (self.state.panelType == 2 ? "eChartPanelDesign2_TemplateLayOut" : "")}>
      {templateContents}
    </div> : undefined;
  }
  getTemplate(template) {
    let content;
    let style = this.getStyle_Simple("all", "", template);
    content = this.getDisplay_Simple(template.panelLayOutConfig.rows);
    return <div className="eChartPanelDesign_template" style={style} >{content}</div>;
  }
  getStyle_Simple(eleType, innerType, ele) {
    let style = {};
    if (eleType == "row") {
      style.width = '100%';
      style.height = ele.height;
    } else if (eleType == "col") {
      let widgetType = ele.widgetType;
      style.height = '100%';
      style.width = ele.width;
      style.float = 'left';
    } else if (eleType == "all") {
      style.width = '40px';
      style.height = '30px';
    }
    if (eleType == "all" || (eleType == "col" && innerType == "control")) {
      style.border = eChartCommon.panelDefaultValue.borderWidth + " solid #ddd3d2";
    }
    return style;
  }
  getDisplay_Simple(rows) {
    let self = this;
    let rowArr = [];
    rows.forEach(rowEle => {
      let colArr = [];
      let rowStyle = self.getStyle_Simple("row", "", rowEle);
      rowEle.cols.forEach(colEle => {
        let colStyle;
        let curCol;
        if (colEle.widgetType == "rows") {
          colStyle = self.getStyle_Simple("col", "rows", colEle);
          curCol = self.getDisplay_Simple(colEle.widgetValue);
        } else {
          colStyle = self.getStyle_Simple("col", "control", colEle);
          curCol = "";
        }
        colArr.push(<Col style={colStyle}>{curCol}</Col>);
      });
      rowArr.push(<Row style={rowStyle} >{colArr} </Row>);
    });
    return rowArr;
  }
  setEditPanel = (e, template) => {
    let self = this;
    e.preventDefault();
    e.stopPropagation();
    cb.utils.confirm('重新选择模板将覆盖当前的模板信息，是否继续?', function () {
      let template2 = _.cloneDeep(template);
      template2.id = self.state.editPanel ? self.state.editPanel.id : -1;
      if (self.state.panelType == 3) {
        if (self.state.editPanel.name != self.state.editPanel.nameTmp) {
          template2.name = self.state.editPanel.name;
        }
      } else {
        template2.name = self.state.editPanel.name;
      }
      let curState = { editPanel: template2 };
      curState.selectedColKey = "";
      curState.curOperateType = "";
      self.stateCache = [];
      self.setState(curState);
    });
  }

  cancelOpereate() {
    eChartCommon.LogChartInfo("eChartPanelDesign cancelOpereate 设计模板取消操作", "", 900);
    const { portalactions, index } = this.props;
    portalactions.delItem(index);
    this.parentViewModel.execute('back');
  }

  componentDidMount() {
    let self = this;
    let reportViewId = self.props.data.params.id;
    let editType = this.state.editType;
    let templateList;
    if (self.state.panelType == 1) {
      templateList = eChartCommon.getPanelLayOutTemplate1();
    } else if (self.state.panelType == 2) {
      templateList = eChartCommon.getPanelLayOutTemplate2();
    } else if (self.state.panelType == 3) {
      templateList = eChartCommon.getPanelLayOutTemplate3();
    }
    if (!reportViewId || reportViewId < 1) {//增加
      let curPanel;
      curPanel = _.cloneDeep(templateList[0]);
      curPanel.createTime = Format(new Date(), 'yyyy-MM-dd hh:mm:ss');
      self.setState({ templateList, editPanel: curPanel });
    } else {//编辑
      let param = { reportViewId };
      let callback = (json) => {
        if (json.code === 200) {
          let data = json.data;
          if (data) {
            let editPanel = eChartCommon.restoreEditPanel(data.pageLayout, data.items, self.state.editType, reportViewId);
            self.setState({ templateList, editPanel });
          }
        }
      }
      eChartProxy.doProxy(eChartProxy.url.getReportView, 'GET', param, callback);
    }
    cb.events.on('getPreviewPanel', () => {
      cb.events.execute("setPreviewPanel", { "template": self.state.editPanel });
    });
  }
  preView(bOK) {
    let self = this;
    if (self.state.panelType == 1) {
      var currentWindow = window.open("/echartcarousel?isInDesign=1", "预览", "fullscreen=yes");
      currentWindow.resizeTo(screen.availWidth, screen.availHeight);
    } else {
      self.setState({ curOperateType: "preView" });
    }
  }
  getPreView() {
    let self = this;
    let panelConfig = _.cloneDeep(this.state.editPanel);
    let curCol = self.getSelectedCol()||{};
    eChartCommon.LogChartInfo("大屏方案 设计 eChartPanelDesigngetPreView Begin", "", 900);
    let tmp = <EChartPanelDisplay2 panelConfig={panelConfig} colEle={curCol} isInDesign={true} doFunc={() => self.setState({ curOperateType: "" })} />;
    eChartCommon.LogChartInfo("大屏方案 设计 eChartPanelDesigngetPreView End", "", 900);
    return tmp;
  }
}
function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    portalactions: bindActionCreators(portalactions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(eChartPanelDesign);
