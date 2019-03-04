import React, { Component } from 'react';
import { Row } from '../basic';
import _ from 'lodash';
import { genAction, proxy } from '../../helpers/util';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as  eChartCommon from '../echart/eChartCommon';
import { getPredicateValue, getRoundValue } from '../../helpers/util';
import TotalContainerOld from './TotalContainerOld';
export default class TotalContainer extends Component {
  //   render() {
  //     const { billnum, viewModel } = this.props;
  //     // const controlModel = viewModel.get(meta.cCode);
  //     return (
  //       <Total billnum={billnum} viewModel={viewModel} />
  //     );
  //   }
  // }

  // class Total extends Component {

  constructor(props) {
    super(props);
    let bPublished = this.props.viewid ? true : false;
    this.state = {
      billnum: props.billnum ? props.billnum : this.props.viewModel.getParams().billNo,
      totalFields: {},
      condition: {},
      controls: [],
      bDisplaySumField: true,
      bPublished,
      firstQueryDone: false
    };
  }
  componentDidMount() {
    let self = this;
    self.props.viewModel.on('firstQueryDone', (params) => {
      // if (params == true) {
      self.state.firstQueryDone = params;
      // }
    });
    self.props.viewModel.on("filterClick", (params) => {
      self.state.condition = params.condition;
      self.getSum();
    });
    self.props.viewModel.on("saveSumArea", (params) => {
      self.state.bDisplaySumField = true;
      self.getTotalFields(self.state.billnum, true);
    });
    if (self.state.billnum) {
      self.getTotalFields(self.state.billnum)
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  // let self = this;
  // const { sumAreaState, sumAreaRedux } = this.props;
  // let refreshNum = _.get(nextProps.sumAreaState, "refreshNum");
  // if (refreshNum && refreshNum == this.state.billnum) {
  //   self.state.bDisplaySumField = true;
  //   this.getTotalFields(this.state.billnum, true);
  //   sumAreaRedux.SetRefreshNum("");
  // }
  // return true;
  // }
  getTotalFields(billnum, bReGet) {
    let self = this;
    if ((bReGet || _.isEmpty(self.state.totalFields)) && !!billnum && self.state.bDisplaySumField) {
      let totalFields = {};
      let param = { billnum, isOnlySelected: true };
      let callback = (json) => {
        if (json.code === 200) {
          if (json.data) {
            let items = json.data.items;
            items.forEach((ele) => {
              let caption = ele.showCaption ? ele.showCaption : ele.caption;
              if (ele.selected) {
                const totalField = { caption: caption, value: 0 };
                totalFields[ele.fieldname] = totalField;
              }
            });
            if (_.isEmpty(totalFields)) {
              self.setState({ bDisplaySumField: false });
              return;
            }
            self.state.totalFields = totalFields;
            self.getSum();
          };
        }
        else {
          eChartCommon.LogChartInfo("TotalContainer getTotalFields Err  errMsg   ", json.message + " 查询参数 = " + JSON.stringify(param), 999);
        }
      }
      this.actionsProxy('report/getTotalSetting', 'GET', param, callback);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.billnum !== "" && this.state.billnum != nextProps.billnum) {
      this.state.billnum = nextProps.billnum;
      this.getTotalFields(nextProps.billnum);
    }
  }


  getSum() {

    let self = this;
    if (_.isEmpty(self.state.billnum))
      return;
    if (_.isEmpty(self.state.condition))
      return;
    if (_.isEmpty(self.state.totalFields))
      return;

    if (!self.state.firstQueryDone) {
      self.setSum({});
      return;
    }
    let queryParams = {
      billnum: self.state.billnum,
      isOnlyTotal: true,
      condition: self.state.condition
    };

    let callback = (json) => {
      if (json.code === 200) {
        let data = json.data.sumRecordList;
        if (data == null || (data.length == 1 && data[0] == null))
          data = [{}];
        let fields = _.get(json.data, "viewmodel.entities[0].fields");
        self.setSum(data, fields);
      }
      else {
        self.setSum({});
      }
    }

    this.actionsProxy('/report/list', 'POST', queryParams, callback);
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

  setSum(sumData, fields) {
    let self = this;
    if (_.isEmpty(sumData)) sumData = [{}];
    if (!sumData.length) sumData = [{}];
    const controls = [];
    _.forEach(self.state.totalFields, (item, key) => {
      let value = sumData[0][key] || 0;
      value = self.formatData(key, value, fields);
      controls.push({ caption: item.caption, value: value });
    });
    self.setState({ controls });
  }
  render() {
    const { controls } = this.state;
    let self = this;
    if (!controls.length || self.state.bDisplaySumField == false) {
      //如果不存在新的汇总区域设置，则使用旧的
      return <TotalContainerOld meta={self.props.meta} viewModel={self.props.viewModel} />;
    }
    const itemClassName = `rpt-zhekou-${controls.length === 1 ? 'padding' : 'center'}`;
    const children = [];
    const width = 100 / controls.length;
    controls.forEach(item => {
      children.push(<div className="rpt-zhekou-list" style={{ float: 'left', width: width + '%' }}>
        <div className="zhekou-name"><h3 className={itemClassName}>{item.caption}</h3></div>
        <div className="zhekou-number"><h4 className={itemClassName}>{item.value}</h4></div>
      </div>)
    });
    return (
      <Row className="rpt-zhekou">{children}</Row>
    );
  }

  actionsProxy(url, method, params, callback) {
    const config = { url: url, method: method, params: params };
    proxy(config)
      .then(json => {
        callback(json);
      });
  }
}
