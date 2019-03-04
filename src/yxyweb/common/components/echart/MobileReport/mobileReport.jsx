import React, { Component } from 'react'
import NavBar from '../../../../mobile/components/NavBar'
import { genAction, proxy } from 'yxyweb/common/helpers/util';
import SvgIcon from 'SvgIcon';
import MobileReportSum from './mobileReportSum';
import MobileData from './mobileData';
import MobileTest from './mobileTest';
import Row from 'yxyweb/common/components/basic/row';
import Col from 'yxyweb/common/components/basic/col';
import { Button, Switch, Popover } from 'antd-mobile';// Switch,
import * as  eChartCommon from 'yxyweb/common/components/echart/eChartCommon';

require('src/mobile/styles/globalCss/reportForm.css');
import MobileFilter from './mobileFilter';
const Item = Popover.Item;
export default class mobileReport extends Component {

  constructor(props) {
    super(props);
    this.isTest = false;

    // cb.utils.setStatusBarStyle("dark");
    let params = props.viewModel.getParams();
    let viewid = _.get(params, 'query.viewid');
    this.state = {
      billnum: params.billNo ? params.billNo : "rm_saleanalysis",
      filterId: params.filterId ? params.filterId : 14414907,
      titleName: params.caption ? params.caption : '移动报表',
      groupSchemaId: null,
      groupSchemaName: null,
      groupInfo: {},
      solutionId: 0,
      dateRefIndex: 0,
      bSwitchChartTable: true,
      bSwitchTables: true,
      bShowGroupList: false,
      condition: null,
      firstQueryDone: false,
      sumFieldsCount: 0,
      viewid: viewid ? viewid : 0,
    };
    this.innerWidth = window ? window.innerWidth : 375;
    this.innerHeight = window ? window.innerHeight : 667;
    this.GroupSchemaArr = [];
    this.urlConfig = {
      getGroupSchemaList: { url: 'report/getGroupSchema', method: 'GET' },
      getGroupSetting: { url: 'report/getGroupSetting', method: 'GET' },
      getSolutionList: { url: 'filterDesign/getSolutionList', method: 'POST' },
    };
  }
  componentWillUnmount() {
    window.webViewEventHand.cancelEvent(null);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.billnum != nextState.billnum ||
      this.state.filterId != nextState.filterId ||
      this.state.groupSchemaId != nextState.groupSchemaId ||
      this.state.groupInfo != nextState.groupInfo ||
      this.state.solutionId != nextState.solutionId ||
      this.state.dateRefIndex != nextState.dateRefIndex ||
      this.state.bSwitchChartTable != nextState.bSwitchChartTable ||
      this.state.bSwitchTables != nextState.bSwitchTables ||
      this.state.bShowGroupList != nextState.bShowGroupList

    )
      return true;
    else
      return false;
  }
  getDisplayType() {
    return this.state.groupInfo.displayType;
  }
  componentDidMount() {
    if (this.props.viewModel) {
      this.props.viewModel.on('firstQueryDone', (params) => {
        this.state.firstQueryDone = params;
      });

      this.props.viewModel.on("filterClick", (params) => {
        this.state.condition = params.condition;
      });

      this.groupSchemasMeta = {
        cControlType: 'Select',
        modelType: 'ListModel',
        cItemName: 'groupSchemas',
        valueField: 'id',
        textField: 'name',
      };
      this.props.viewModel.addProperty(this.groupSchemasMeta.cItemName, new cb.models[this.groupSchemasMeta.modelType](this.groupSchemasMeta));

    }
    let self = this;
    this.getGroupSchemaList();
    this.getSolutionList();
    /*add by jinzh1  监听返回键*/
    window.webViewEventHand.addEvent('SettleDetailBack', function (callback) {
      self.setScreenOrientation(true);
      self.setState({ bSwitchChartTable: true, bSwitchTables: true });
    }.bind(this));
  }
  // tmpFunc() {
  //   let self = this;
  //   self.setScreenOrientation(true);
  //   self.state.bSwitchChartTable = true;
  //   self.state.bSwitchTables = true;
  //   self.forceUpdate();
  // }
  getSwitch() {
    let self = this;
    let tmpSwitch;
    if (this.getDisplayType() == 1)//表横竖
    {
      tmpSwitch = <div className={"mobileReport_SwitchButton mobileReport_SwitchButton1 mobileReport_SwitchButton_" + (self.getIsVertical() == true ? "Vertical" : "Horizontal")} >
        <Button
          disabled={this.state.bSwitchTables}
          onClick={() => self.onTablesSwitchChange()}
          className={this.state.bSwitchTables == true ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'}
        >
          竖
        </Button>
        <Button
          disabled={!this.state.bSwitchTables}
          onClick={() => self.onTablesSwitchChange()}
          className={this.state.bSwitchTables === false ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'}
        >
          横
        </Button>
      </div >;
    }
    else if (this.getDisplayType() == 3)//表和图
    {
      tmpSwitch = <div className={"mobileReport_SwitchButton mobileReport_SwitchButton3  mobileReport_SwitchButton_" + (self.getIsVertical() == true ? "Vertical" : "Horizontal")}>
        <Button
          disabled={this.state.bSwitchChartTable}
          onClick={() => self.onChartTableSwitchChange()}
          className={this.state.bSwitchChartTable === true ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'}
        >
          图
        </Button>
        <Button
          disabled={!this.state.bSwitchChartTable}
          onClick={() => self.onChartTableSwitchChange()}
          className={this.state.bSwitchChartTable === false ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'}
        >
          表
        </Button>
      </div >;
    }
    return tmpSwitch;
  }
  onChartTableSwitchChange() {

    if (window.plus && window.plus.screen && window.plus.screen.lockOrientation) {
      if (this.state.bSwitchChartTable === true) {
        this.setScreenOrientation(false);
      }
      else {
        this.setScreenOrientation(true);
      }
    }
    this.setState({ bSwitchChartTable: !this.state.bSwitchChartTable });
    // this.state.bSwitchChartTable = !this.state.bSwitchChartTable;
    // this.forceUpdate();
    // cb.utils.Toast('onChartTableSwitchChange ', 'fail');
  }
  // Screen.lockOrientation() 方法接受屏幕的方向字符串或字符串数组为参数，可选参数为：
  // portrait-primary
  // Portrait模式, Home键在下边
  // portrait-secondary
  // Portrait模式, Home键在上边
  // landscape-primary
  // Landscape模式, Home键在右边
  // landscape-secondary
  // Landscap模式, Home键在左边
  setScreenOrientation(bVertical) {
    //需要判断安卓IOS
    if (cb.utils.isIos() == true) {
      if (bVertical) {
        window.plus.screen.lockOrientation("portrait-primary");//仅支持竖屏显示
        cb.events.execute('lockOrientation', false);
        cb.utils.setStatusBarStyle("light");
      }
      else {
        window.plus.screen.lockOrientation("landscape-secondary");//仅支持横屏显示
        cb.events.execute('lockOrientation', true);
        cb.utils.setStatusBarStyle("dark");
      }
    }
    else {
      if (bVertical) {
        window.plus.screen.lockOrientation("portrait-primary");//仅支持竖屏显示
        cb.events.execute('lockOrientation', false);
        cb.utils.setStatusBarStyle("light");
      }
      else {
        window.plus.screen.lockOrientation("landscape-primary");//仅支持横屏显示
        cb.events.execute('lockOrientation', true);
        cb.utils.setStatusBarStyle("dark");
      }
    }
  }
  onTablesSwitchChange() {
    if (window.plus && window.plus.screen && window.plus.screen.lockOrientation) {
      if (this.state.bSwitchTables === true) {
        this.setScreenOrientation(false);
      }
      else {
        this.setScreenOrientation(true);
      }
    }
    this.setState({ bSwitchTables: !this.state.bSwitchTables });
    // this.state.bSwitchTables = !this.state.bSwitchTables;
    // this.forceUpdate();
    // cb.utils.Toast('onTablesSwitchChange ', 'fail');
  }
  getGroupSchemaList() {
    let self = this;
    if (self.GroupSchemaArr.length > 0)
      return null;
    const { billnum } = this.state;
    let proxyParams = { billnum };
    if (self.state.viewid)
      proxyParams.viewid = self.state.viewid;
    let callback = (json) => {
      let bFlag = false;
      if (json.code === 200 && json.data && json.data.length > 0) {
        let conditionList = _.filter(json.data, function (o) { return (o.isMobile == true || !!proxyParams.viewid) });

        // if (self.state.viewid)
        //   conditionList = _.filter(conditionList, function (o) { return o.id == self.state.viewid });


        // let conditionList = json.data;
        if (conditionList && conditionList.length > 0) {
          bFlag = true;
          let groupSchemaId = 0;
          let groupSchemaName = "";
          self.props.viewModel.setCache('queryItems', ['filter', 'schema']);
          self.GroupSchemaArr = conditionList;
          let def = _.find(conditionList, function (o) { return o.isDefault == true }) || conditionList[0];
          const userId = cb.rest.AppContext.user.id;
          try {
            const localData = JSON.parse(localStorage.getItem(`${billnum}_${userId}`));
            const localDefaultId = localData && localData.groupSchemaId;
            if (localDefaultId) {
              const localDefaultGroupSchema = conditionList.find(item => {
                return item.id == localDefaultId;
              });
              if (localDefaultGroupSchema)
                def = localDefaultGroupSchema
            }
          } catch (e) {

          }
          groupSchemaId = def && def.id;
          groupSchemaName = def && def.name;
          self.getGroupSetting(groupSchemaId, groupSchemaName);
        }
      }
      if (bFlag == false) {
        let groupState = { groupSchemaId: "", groupSchemaName: "", groupInfo: { displayType: 1 }, bShowGroupList: false };
        this.setState(groupState);
        self.props.viewModel.setCache('queryItems', ['filter']);

        // console.log("移动报表 获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
      }
    }
    self.doProxy(this.urlConfig.getGroupSchemaList, proxyParams, callback);
  }
  switchGroupSchema(id, name) {
    const { viewModel } = this.props;

    let tmp = [];
    if (id) {
      tmp.push({ id, name });
      let obj = viewModel.get('groupSchemas');
      if (obj) {
        obj.setDataSource(tmp);
        obj.setValue(id);
        viewModel.biz.do("switchGroupSchema", viewModel, { groupSchemaId: id, groupSchemaName: name });
        const { billnum } = this.state;
        const userId = cb.rest.AppContext.user.id;
        const localDataKey = `${billnum}_${userId}`;
        let localData;
        try {
          localData = JSON.parse(localStorage.getItem(localDataKey));
        } catch (e) {

        }
        if (!localData)
          localData = {};
        localData.groupSchemaId = id;
        localStorage.setItem(localDataKey, JSON.stringify(localData));
      }
    }
  }



  getGroupSetting(groupSchemaId, groupSchemaName) {
    this.switchGroupSchema(groupSchemaId, groupSchemaName);
    let self = this;
    groupSchemaId = groupSchemaId || self.state.groupSchemaId;

    let obj = _.find(self.GroupSchemaArr, function (o) { return o.id == groupSchemaId });
    let groupState = { groupSchemaId, groupSchemaName, groupInfo: { displayType: 1 }, bShowGroupList: false };
    if (obj) {
      // console.log("移动报表 获取分组信息 : " + JSON.stringify(obj));
      groupState.groupInfo.isCrossTable = obj.isCrossTable;
      if (groupState.groupInfo.isCrossTable == false) {
        if (obj.displayStyle) {
          groupState.groupInfo.displayType = obj.displayStyle;
          groupState.groupInfo.layOutConfig = obj.pageLayout ? JSON.parse(obj.pageLayout) : {};
          groupState.groupInfo.eChartConfig = obj.chartConfig ? JSON.parse(obj.chartConfig) : {};
          groupState.groupInfo.isPc = obj.hasOwnProperty("isPc") ? obj.isPc : true;
          groupState.groupInfo.isMobile = obj.hasOwnProperty("isMobile") ? obj.isMobile : true;
        }
      }
    }
    this.setState(groupState);
  }

  // getGroupSetting(groupSchemaId, groupSchemaName) {
  //   this.switchGroupSchema(groupSchemaId, groupSchemaName);
  //   let self = this;
  //   groupSchemaId = groupSchemaId || self.state.groupSchemaId;
  //   let proxyParams = { billnum: self.state.billnum, groupSchemaId: groupSchemaId };
  //   let callback = (json) => {
  //     let groupState = { groupSchemaId, groupSchemaName, groupInfo: { displayType: 1 } };
  //     if (json.code === 200) {
  //       if (json.data) {
  //         // console.log("移动报表 获取分组信息 : " + JSON.stringify(json.data));
  //         groupState.groupInfo.isCrossTable = json.data.isCrossTable;
  //         if (groupState.groupInfo.isCrossTable == false) {
  //           if (json.data.displayStyle) {
  //             groupState.groupInfo.displayType = json.data.displayStyle;
  //             groupState.groupInfo.layOutConfig = json.data.pageLayout ? JSON.parse(json.data.pageLayout) : {};
  //             groupState.groupInfo.eChartConfig = json.data.chartConfig ? JSON.parse(json.data.chartConfig) : {};
  //           }
  //         }
  //       }
  //     }
  //     this.setState(groupState);
  //   }
  //   self.doProxy(this.urlConfig.getGroupSetting, proxyParams, callback);
  // }
  getSolutionList() {
    let self = this;
    let filterId = self.state.filterId;
    let proxyParams = { filterId: self.state.filterId };
    let callback = (json) => {
      if (json.code === 200 && json.data && json.data.length > 0) {
        let solutionId = json.data[0].id;
        self.setState({ solutionId });
      }
      else {
        eChartCommon.LogChartInfo("移动报表 getSolutionList Err ", "根据filterId没有获取到任何过滤方案", 999);
        const filterViewModel = this.props.viewModel.getCache('FilterViewModel');
        if (filterViewModel)
          filterViewModel.get('search').fireEvent('click', { solutionid: 0 });
      }
    }
    self.doProxy(this.urlConfig.getSolutionList, proxyParams, callback);
  }

  doProxy(tmp, params, callback, noUniform) {
    const config = { url: tmp.url, method: tmp.method, params: params };
    if (noUniform) {
      config.options = { uniform: false };
    }
    proxy(config)
      .then(json => {
        callback(json);
      });
  }

  getReportContent() {
    let self = this;
    let groupInfo = self.state.groupInfo;
    return <MobileData
      billnum={self.state.billnum}
      groupSchemaId={self.state.groupSchemaId}
      displayType={groupInfo.displayType}
      layOutConfig={groupInfo.layOutConfig}
      eChartConfig={groupInfo.eChartConfig}
      isPc={groupInfo.isPc}
      isMobile={groupInfo.isMobile}
      viewModel={self.props.viewModel}
      mobileDataScale={self.getMobileDataScale()}
      displayContent={self.getDisplayContent()}
      meta={self.props.meta}
      condition={this.state.condition}
      firstQueryDone={this.state.firstQueryDone}
    />;
  }
  getIsVertical() {
    let displayType = this.getDisplayType();
    let isVertical = true;
    if (displayType == 1 && this.state.bSwitchTables == false)
      isVertical = false;
    else if (displayType == 3 && this.state.bSwitchChartTable == false)
      isVertical = false;
    return isVertical;
  }


  getDisplayContent() {// table chart
    let displayType = this.getDisplayType();// 1 单表 2 单图 3 多图+表
    let content = "";
    if (displayType == 1) {
      content = "table";
    }
    if (displayType == 2) {
      content = "chart";
    }
    else if (displayType == 3) {
      if (this.state.bSwitchChartTable == true)
        content = "chart";
      else
        content = "table";
    }
    return content;
  }

  onSelect = (opt) => {
    // this.setState({
    //   bShowGroupList: false,

    // });
    this.getGroupSetting(opt.key, opt.props.value);
  };
  handleVisibleChange = (visible) => {
    this.setState({
      bShowGroupList: visible
    });
  };

  getGroupSchemaContent() {

    let self = this;
    if (self.GroupSchemaArr.length > 0) {
      let arr = [];
      self.GroupSchemaArr.forEach((ele) => {
        arr.push(<Item key={ele.id} value={ele.name} >
          <div>
            <div>{ele.name}</div>
            <div> {ele.id == self.state.groupSchemaId ? <SvgIcon type="xuanzhong1" /> : <div />} </div>
          </div>
        </Item>);
      });
      return <Popover
        overlay={arr}
        visible={self.state.bShowGroupList}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.onSelect}
        overlayClassName="mobileReport_Popover"
        mask={true}
        getTooltipContainer={() => { return document.getElementById('popup-container') || document.body; }}
      >
        <div className="mobileReport_Group"
          style={{ cursor: "pointer" }}
        >
          <span className="mobileReport_max">{self.state.groupSchemaName}</span>
          <i className={self.state.bShowGroupList === true ? "icon icon-shouqi" : "icon icon-zhakai"}  ></i>
        </div>
      </Popover >;
    }
    else {
      return undefined;
    }
  }

  componentWillUnmount() {
    // cb.utils.setStatusBarStyle("light");
  }

  render() {
    let self = this;
    eChartCommon.LogChartInfo("移动报表 MobileReport Render ", "", 900);
    // self.props.viewModel.setCache('queryItems', ['filter', 'schema']);
    let isVertical = this.getIsVertical();
    if (this.isTest == true) {
      return <MobileTest />;
    }
    else {
      let totalContent = <MobileReportSum
        billnum={this.state.billnum}
        viewModel={self.props.viewModel}
        setSumFieldsCount={this.setSumFieldsCount.bind(this)}
      />;
      let reportContent = this.getReportContent();
      let groupSchemaContent = self.getGroupSchemaContent();
      // let dataScale = self.getMobileDataScale();
      let rightContent = <div className={'mobileReport_NavSwitch' + this.getDisplayType()} style={{ display: isVertical ? "none" : "" }} >
        {this.getSwitch()}
      </div>;
      let otherContent1 = <div
        className='mobileReport_NavBar'
        style={{ width: this.getScreenWidth(), height: "auto", float: "left" }}>
        <NavBar
          title={this.state.titleName}
          onLeftClick={this.onLeftClick.bind(this)}
          rightContent={rightContent}
        />
      </div>;
      let otherContent2 = <div
        className='mobileReport_TotalAndData'
        style={{ width: this.getScreenWidth(), height: "auto", float: "left" }}>
        <div
          className='mobileReport_Total'
          style={{ width: this.getScreenWidth(), height: "auto", float: "left", display: isVertical ? "" : "none" }}>
          {totalContent}
        </div>
        <div
          className='mobileReport_SwitchAndData'
          style={{
            // width: dataScale.width,
            // height: dataScale.height,
            overflow: 'auto'
          }}
        >
          <div
            className={'mobileReport_Switch' + this.getDisplayType()}
            style={{ width: this.getScreenWidth(), height: "auto", float: "left", display: isVertical ? "" : "none" }}>
            {this.getSwitch()}
          </div>
          <div
            className='mobileReport_Data'
            style={{ width: this.getScreenWidth(), height: "auto", float: "left" }}>
            {reportContent}
          </div>
        </div>
      </div>

      eChartCommon.LogChartInfo("移动报表 MobileReport Render sumFieldsCount", self.state.sumFieldsCount, 900);
      return <div
        className={'mobileReport_Outer mobileReport_Outer_'
          + (isVertical ? "Vertical" : "Horizontal")
          + ' mobileReport_Outer_SumCount_' + self.state.sumFieldsCount
        }
        style={{ height: this.getScreenHeight(), width: this.getScreenWidth() }}>
        <MobileFilter
          filterId={this.state.filterId}
          viewid={this.state.viewid}
          viewModel={self.props.viewModel}
          cardKey={this.state.billnum}
          model={self.props.viewModel}
          otherTitleContent={groupSchemaContent}
          otherContent1={otherContent1}
          otherContent2={otherContent2}
          isVertical={isVertical}
          filterType={"report"}
        />
      </div>
    }
  }

  setSumFieldsCount(sumFieldsCount) {
    eChartCommon.LogChartInfo("移动报表 MobileReport setSumFieldsCount sumFieldsCount", sumFieldsCount, 900);
    // this.setState({ sumFieldsCount });
    this.state.sumFieldsCount = sumFieldsCount;
    this.forceUpdate();
    // this.state.sumFieldsCount = sumFieldsCount;
    // this.setState(prevState => {
    //   console.log(prevState)
    //   return { sumFieldsCount }
    // })
  }
  getMobileDataScale() {
    let isVertical = this.getIsVertical();
    let width = this.getScreenWidth();
    let height = "auto";
    // if (this.getDisplayType() == 1)//单表
    height = this.getHeight();
    // let height = this.getScreenHeight();
    // if (isVertical == true) {
    //   // height = height - 20 - 249;
    //   height = this.getHeight();
    // }
    // else {
    //   height = height - 70;
    // }
    eChartCommon.LogChartInfo("移动报表  isVertical = " + isVertical + " this.getScreenWidth() = " + this.getScreenWidth() + "  this.getScreenHeight() = " + this.getScreenHeight() + " 数据显示区域 width = " + width + " height = " + height, "", 900);
    return { width, height };

  }

  getHeight() {
    let isVertical = this.getIsVertical();
    let height = this.getScreenHeight();
    let fontUnit = window ? window.__fontUnit : 50;
    let sumFieldsCount = this.state.sumFieldsCount;
    let content = this.getDisplayContent();

    if (isVertical) {
      if (sumFieldsCount >= 5) {
        // height = height - (
        //   1.28 // mobileTitleSumData padding-top
        //   + 0.76 //.mobileTitle
        //   + 0.3//.MobileSum padding-bottom
        //   + 0.3 * 2//MobileSumItem  margin-top 2层汇总
        //   + 0.3//.mobileReport_Switch1 margin-top
        //   + 0.5//  mobileReport_SwitchButton_Vertical
        //   + 0.3//.mobileReport_Switch1 margin-bottom
        // ) * fontUnit
        //   - (15 + 28) * 2 //汇总数字文本，2层汇总 MobileSumItem 2
        //   - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
        //   ;

        if (content == "table") {
          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 3//.MobileSumControlCount_5 height
            + 0.3//.mobileReport_Switch1 margin-top
            + 0.5//  mobileReport_SwitchButton_Vertical
            + 0.3//.mobileReport_Switch1 margin-bottom
          ) * fontUnit;
        }
        else {
          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 3//.MobileSumControlCount_5 height
            + 0.4//chart margin-top

          ) * fontUnit;
        }
      }
      else if (sumFieldsCount == 3 || sumFieldsCount == 4) {
        // height = height - (
        //   1.28 // mobileTitleSumData padding-top
        //   + 0.76 //.mobileTitle
        //   + 0.3//.MobileSum padding-bottom
        //   + 0.3 * 2//MobileSumItem  margin-top 2层汇总
        //   + 0.3//.mobileReport_Switch1 margin-top
        //   + 0.5//  mobileReport_SwitchButton_Vertical
        //   + 0.3//.mobileReport_Switch1 margin-bottom
        // ) * fontUnit
        //   - (15 + 28) * 2 //汇总数字文本，2层汇总 MobileSumItem 2
        //   // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
        //   ;
        if (content == "table") {
          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 2.55//.MobileSumControlCount_3 height
            + 0.3//.mobileReport_Switch1 margin-top
            + 0.5//  mobileReport_SwitchButton_Vertical
            + 0.3//.mobileReport_Switch1 margin-bottom
          ) * fontUnit;
        }
        else {
          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 2.55//.MobileSumControlCount_3 height
            + 0.4//chart margin-top

          ) * fontUnit;
        }
      }
      else if (sumFieldsCount == 1 || sumFieldsCount == 2) {
        // height = height - (
        //   1.28 // mobileTitleSumData padding-top
        //   + 0.76 //.mobileTitle
        //   + 0.3//.MobileSum padding-bottom
        //   + 0.3 * 1//MobileSumItem  margin-top 2层汇总
        //   + 0.3//.mobileReport_Switch1 margin-top
        //   + 0.5//  mobileReport_SwitchButton_Vertical
        //   + 0.3//.mobileReport_Switch1 margin-bottom
        // ) * fontUnit
        //   - (15 + 28) * 1 //汇总数字文本，2层汇总 MobileSumItem 2
        //   // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
        //   ;
        if (content == "table") {
          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 1.45//.MobileSumControlCount_2 height
            + 0.3//.mobileReport_Switch1 margin-top
            + 0.5//  mobileReport_SwitchButton_Vertical
            + 0.3//.mobileReport_Switch1 margin-bottom
          ) * fontUnit;
        }
        else {
          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 1.45//.MobileSumControlCount_2 height
            + 0.4//chart margin-top

          ) * fontUnit;
        }
      }
      else if (sumFieldsCount == 0) {
        if (content == "table") {
          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            // + 0.3//.MobileSum padding-bottom
            // + 0.3 * 1//MobileSumItem  margin-top 2层汇总
            + 0.3//.mobileReport_Switch1 margin-top
            + 0.5//  mobileReport_SwitchButton_Vertical
            + 0.3//.mobileReport_Switch1 margin-bottom
          ) * fontUnit
            // - (15 + 28) * 1 //汇总数字文本，2层汇总 MobileSumItem 2
            // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
            ;
        }
        else {

          height = height - (
            1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            // + 0.3//.MobileSum padding-bottom
            // + 0.3 * 1//MobileSumItem  margin-top 2层汇总
            + 0.4//chart margin-top

          ) * fontUnit
            // - (15 + 28) * 1 //汇总数字文本，2层汇总 MobileSumItem 2
            // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
            ;
        }
      }
    }
    else {//横向展现
      height = height - 1.28 * fontUnit;
    }
    if (height > 0)
      return height;
    else
      return undefined;
  }
  getScreenWidth() {//显示屏幕的高度宽度
    if (this.getIsVertical() == true) {
      // return document.documentElement.clientWidth;
      return this.innerWidth;
    }
    else {
      // return document.documentElement.clientHeight;
      return this.innerHeight;
    }
  }
  getScreenHeight() {//显示屏幕的高度宽度
    if (this.getIsVertical() == true) {
      return this.innerHeight;
    }
    else {
      return this.innerWidth;
    }
  }

  onLeftClick() {
    if (this.getIsVertical() == true) {
      // cb.utils.setStatusBarStyle("light");
      this.props.returnCallback();
    }
    else {
      if (this.getDisplayType() == 1) {
        this.onTablesSwitchChange();
      }
      if (this.getDisplayType() == 3) {
        this.onChartTableSwitchChange();
      }
    }
  }
}
