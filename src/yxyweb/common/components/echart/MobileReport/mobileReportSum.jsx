import React, { Component } from 'react';
import { genAction, proxy, getPredicateValue, getRoundValue } from 'yxyweb/common/helpers/util';
import _ from 'lodash';
import { Tabs } from 'antd-mobile';
import * as  eChartCommon from 'yxyweb/common/components/echart/eChartCommon';
// let ConvenientQuery = null;
//panelsum eChartSum
export default class mobileReportSum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billnum: props.billnum ? props.billnum : "rm_saleanalysis",
      condition: null,
      totalFields: {},
      controls: [],
      bDisplaySumField: true,
      sumDisplayIndex: 0,
      sumData: [{}],
      firstQueryDone: false
    };
    this.sumCount = 4;
  }

  componentWillUnmount () {
  }

  componentDidMount() {
    let self = this;
    if (this.props.viewModel) {
      this.props.viewModel.on("filterClick", (params) => {
        eChartCommon.LogChartInfo("移动报表 MobileReportSum filterClick   ", "", 900);
        self.state.condition = params.condition;
        self.getSumData();
      });
      this.props.viewModel.on('firstQueryDone', (params) => {
        eChartCommon.LogChartInfo("移动报表 MobileReportSum firstQueryDone params =  ", params, 900);
        this.state.firstQueryDone = params;
        // self.getSumData();
      });
    }
    if (self.state.billnum) {
      self.getTotalFields(self.state.billnum)
    }
  }

  getTotalFields(billnum) {
    let self = this;
    if (_.isEmpty(self.state.totalFields) && !!billnum && self.state.bDisplaySumField) {
      let totalFields = {};
      let sumFieldsCount = 0;
      let param = { billnum, isOnlySelected: true };
      let callback = (json) => {
        if (json.code === 200) {
          if (json.data) {
            let items = json.data.items;
            items.forEach((ele) => {
              let caption = ele.showCaption ? ele.showCaption : ele.caption;
              if (ele.selected) {
                const totalField = { caption: caption, value: 0 };
                if (!totalFields[ele.fieldname]) {
                  totalFields[ele.fieldname] = totalField;
                  sumFieldsCount = sumFieldsCount + 1;
                }
              }
            });
            if (_.isEmpty(totalFields)) {
              self.setState({ bDisplaySumField: false });
              return;
            }
            else {
              if (this.props.setSumFieldsCount)
                this.props.setSumFieldsCount(sumFieldsCount);
              self.state.totalFields = totalFields;
              self.setSum();
            }
          };
        }
        else {
          self.setState({ bDisplaySumField: false });
        }
      }
      this.actionsProxy('report/getTotalSetting', 'GET', param, callback);
    }
  }
  componentWillReceiveProps(nextProps) {
  }



  formatData(fieldName, fieldValue, fields) {
    if (isNaN(fieldValue)) return fieldValue;
    let fieldEle = _.find(fields, function (o) { return o.cItemName == fieldName });
    /*谓词变量支持系统参数*/
    if (!fieldEle) {
      return fieldValue;
    }
    let cFormatData = fieldEle.cFormatData;
    try {
      if (!cFormatData || cFormatData == '') {
        cFormatData = {};
      } else {
        cFormatData = JSON.parse(cFormatData);
      }
    } catch (e) {
      // cb.utils.alert('数量/金额/单价，预制错误！', 'error');
      return fieldValue;
    }
    let iNumPoint = fieldEle.iNumPoint;
    let decimal = cFormatData.decimal ? getPredicateValue(cFormatData.decimal) : null;
    let controlType = fieldEle.cControlType;
    if (controlType === 'money') {
      if (decimal)
        iNumPoint = decimal;
      else
        iNumPoint = cb.rest.AppContext.option.amountofdecimal;
    }
    else if (controlType === 'price') {
      if (decimal)
        iNumPoint = decimal;
      else
        iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
    } else {
      if (decimal)
        iNumPoint = decimal;
      else
        if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
    }
    if (!isNaN(iNumPoint) && iNumPoint != null) {
      fieldValue = parseFloat(fieldValue);
      fieldValue = getRoundValue(fieldValue, iNumPoint);
    }
    if (cFormatData.after)
      fieldValue = fieldValue + cFormatData.after;
    return fieldValue;
  }

  setSum(sumData) {
    let self = this;
    let fields = self.state.entitiesFields;
    sumData = sumData || self.state.sumData;
    if (_.isEmpty(sumData) || !sumData.length) sumData = [{}];
    const controls = [];
    _.forEach(self.state.totalFields, (item, key) => {
      let value = sumData[0][key] || 0;
      if (fields) {
        value = self.formatData(key, value, fields);
      }
      controls.push({ caption: item.caption, value: value });
    });
    self.setState({ sumData, controls });
  }
  componentWillReceiveProps(nextProps) {
    // if (this.state.condition != nextProps.condition) {
    //   this.state.condition = nextProps.condition;
    //   this.getSumData();
    // }
  }
  getSumData() {
    let self = this;
    if (!self.state.condition || self.state.bDisplaySumField == false || self.state.firstQueryDone == false) {
      self.setSum([{}]);
    }
    else {
      let queryParams = {
        billnum: self.state.billnum,
        isOnlyTotal: true,
        condition: self.state.condition
      };

      let callback = (json) => {
        let data = [{}];
        if (json.code === 200) {
          data = json.data.sumRecordList;
          if (data == null || (data.length == 1 && data[0] == null))
            data = [{}];
          let fields = _.get(json.data, "viewmodel.entities[0].fields");
          self.state.entitiesFields = fields;
          self.setSum(data);
        }
        else {
          self.setState({ sumData: data, entitiesFields: {} });
        }
      }

      this.actionsProxy('/report/list', 'POST', queryParams, callback);
    }
  }

  render() {
    const { controls } = this.state;
    let self = this;
    eChartCommon.LogChartInfo("移动报表 MobileReportSum Render ", "", 900);
    // const children = [];
    // controls.forEach((item, index) => {
    //   if (index >= self.state.sumDisplayIndex * this.sumCount && children.length < this.sumCount) {
    //     children.push(<div style={{ float: 'left', width: '50%' }}>
    //       <div><h4>{item.value}</h4></div>
    //       <div><h3>{item.caption}</h3></div>
    //     </div>)
    //   }
    // });
    // return (
    //   <div
    //     style={{ float: 'left', width: '100%' }}
    //     className="MobileSum"
    //     onClick={() => { this.sumPageNext() }}
    //   >
    //     {children}
    //   </div>
    // );
    if (!controls || controls.length == 0 || this.state.bDisplaySumField == false)
      return <div />;
    let children = [];
    let allTabs = [];
    let tabs = [];
    controls.forEach((item, index) => {
      if (children.length < this.sumCount) {
        children.push(<div className="MobileSumItem">
          <div><h3>{item.caption}</h3></div>
          <div style={{ fontSize: '25px' }}> {item.value} </div>
        </div>)
      }
      if (children.length == this.sumCount || index == controls.length - 1) {
        allTabs.push(
          <div className="MobileSumTab">
            {children}
          </div>);
        tabs.push({ title: ' ', sumFieldsCount: children.length });
        children = [];
      }
    });


    let content;
    if (allTabs.length == 1) {
      content = allTabs;
    }
    else {
      content = <Tabs
        tabs={tabs}
        tabBarPosition={"bottom"}
        onChange={(tab, index) => this.handleTabChange(tab, index)}
      >
        {allTabs}
      </Tabs>;
    }
    return (
      <div
        style={{ float: 'left', width: '100%' }}
        className={"MobileSum MobileSumControlCount_" + (controls.length < 5 ? controls.length.toString() : "5")}
      >
        <div className={"MobileSumTabSpliter_" + (controls.length < 5 ? controls.length.toString() : "5")} >
        </div>
        {content}
      </div>
    );
  }

  handleTabChange(tab, index) {
    // let sumFieldsCount = tab.sumFieldsCount;
    // if (this.props.setSumFieldsCount)
    //   this.props.setSumFieldsCount(sumFieldsCount);
  }
  // sumPageNext() {
  //   let num = this.state.sumDisplayIndex;
  //   num = num + 1;
  //   if (num * this.sumCount >= this.state.controls.length)
  //     num = 0;
  //   this.setState({ sumDisplayIndex: num });
  // }
  actionsProxy(url, method, params, callback) {
    const config = { url: url, method: method, params: params };
    proxy(config)
      .then(json => {
        callback(json);
      });
  }
}









