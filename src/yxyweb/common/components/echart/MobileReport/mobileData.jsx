import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Row from 'yxyweb/common/components/basic/row';
import Col from 'yxyweb/common/components/basic/col';
// import RptTable from '../../../yxyweb/common/components/basic/table';
import EChartDisplay_Mobile from 'yxyweb/common/components/echart/echart/eChartDisplay_Mobile';
import * as  eChartDemoData from 'yxyweb/common/components/echart/eChartDemoData';
import * as  eChartCommon from 'yxyweb/common/components/echart/eChartCommon';
import MTable from 'yxyweb/common/components/grid-mobile';
// import { Switch } from 'antd-mobile';

export default class MobileData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // displayType: props.displayType,// 1 单表 2 单图 3 多图+表
      // layOutConfig: props.layOutConfig,
      // eChartConfig: props.eChartConfig,
      // billnum: props.billnum,
      // groupSchemaId: props.groupSchemaId,
      // condition: null,
      // //displayContent
      // firstQueryDone: false
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {

  // }
  componentDidMount() {
    // if (this.props.viewModel) {
    //   this.props.viewModel.on('firstQueryDone', (params) => {
    //     this.state.firstQueryDone = params;
    //   });

    //   this.props.viewModel.on("filterClick", (params) => {
    //     this.state.condition = params.condition;
    //   });
    // }
  }
  // componentWillReceiveProps(nextProps) {

  //   // let tmp = {
  //   //   displayType: nextProps.displayType,// 1 单表 2 单图 3 多图+表
  //   //   layOutConfig: nextProps.layOutConfig,
  //   //   eChartConfig: nextProps.eChartConfig,
  //   //   billnum: nextProps.billnum,
  //   //   groupSchemaId: nextProps.groupSchemaId,
  //   //   condition: nextProps.condition
  //   // }
  //   // this.setState(tmp);
  // }


  render() {
    // const { meta, viewModel } = this.props;
    eChartCommon.LogChartInfo("移动报表 MobileData Render ", "", 900);
    let tmpCom = null;
    if (this.props.displayType == 1)//if (this.props.displayContent == "table")// 表
    {
      tmpCom = this.renderTable();
    }
    else if (this.props.displayType == 2)//单图
    {
      tmpCom = this.renderChart();
    }
    else if (this.props.displayType == 3)//表和多图。也可能只有多图
    {
      tmpCom = [];
      let tmpCom1 = this.renderChart();
      let tmpCom2 = this.renderTable();
      tmpCom.push(<div style={{ display: (this.props.displayContent == "chart" ? "" : "none") }} > {tmpCom1}</div>);
      tmpCom.push(<div style={{ display: (this.props.displayContent == "table" ? "" : "none") }} > {tmpCom2}</div>);
    }
    return (
      <div className="MobileData">
        {tmpCom}
      </div>
    );
  }

  renderTable() {
    const { meta, viewModel, mobileDataScale } = this.props;
    const controlModel = viewModel.getGridModel();
    controlModel.setState("override", false);
    // console.log('set--override--false');
    // if (!this.props.condition)
    //   return <div />;
    // else
    if (this.props.groupSchemaId && !this.props.isMobile) {
      return <div className='mobileData_SchemaIsNotMobile'> 报表分组方案不支持移动端展现，请检查。</div >;
    }

    if (mobileDataScale) {
      eChartCommon.LogChartInfo("移动报表 MobileData renderTable  mobileDataScale", JSON.stringify(mobileDataScale), 900);
      return <div
        className="MobileData_Table">
        <MTable
          model={controlModel}
          meta={meta}
          height={mobileDataScale.height}
          width={mobileDataScale.width}
        />
      </div>;
    }
    else {
      return <div />;
    }
    // const {meta, width, viewModel } = this.props;
    // const style = meta.cStyle ? JSON.parse(meta.cStyle) : {};
    // const tableWidth = style.width || width;
    // const columns = {};
    // if (meta.controls) {
    //   meta.controls.forEach(column => {
    //     columns[column.cItemName] = column;
    //   })
    // }
    // const controlModel = viewModel.get(meta.childrenField || meta.cCode);
    // return (
    //   <RptTable
    //     width={tableWidth}
    //     code={meta.cGroupCode}
    //     columns={columns}
    //     style={style}
    //     model={controlModel}
    //     tableClass="rptTable"
    //     tableTyep={'rptTable'}
    //   />
    // );
  }

  // onSwitchChange() {
  //   this.setState({ bDisplayTable: !this.state.bDisplayTable });
  // }

  renderChart() {

    // let key = Object.keys(this.props.eChartConfig)[0];
    let width = this.props.mobileDataScale.width || "100%";
    let height = this.props.mobileDataScale.height || "auto";
    // cb.utils.Toast('renderChart width = ' + width + "  height  = " + height, 'fail');
    // let config = this.props.eChartConfig[key];
    if (!this.props.isMobile) {
      return <div className='mobileData_SchemaIsNotMobile'> 报表分组方案不支持移动端展现，请检查。</div >;
    }
    else {

      return (
        <div
          className="MobileData_Chart"
          id={eChartCommon.getEChartElementId("")}
          style={{
            width: width,
            height: height,
            display: (this.props.displayType == 3 && this.state.bDisplayTable == true ? "none" : "")
          }}
        >
          <EChartDisplay_Mobile
            chartDisplayType={"mobile"}
            eChartConfig={this.props.eChartConfig}
            billnum={this.props.billnum}
            groupSchemaId={this.props.groupSchemaId}
            condition={this.props.condition}
            viewModel={this.props.viewModel}
            firstQueryDone={this.props.firstQueryDone}
          />
        </div>
      );
    }
  }

  // renderTableAndChart() {
  //   let self = this;
  //   // const { meta, width, viewModel } = this.props;
  //   // const style = meta.cStyle ? JSON.parse(meta.cStyle) : {};
  //   // const tableWidth = style.width || width;
  //   // const columns = {};
  //   // if (meta.controls) {
  //   //   meta.controls.forEach(column => {
  //   //     columns[column.cItemName] = column;
  //   //   })
  //   // }
  //   // const controlModel = viewModel.get(meta.childrenField || meta.cCode);
  //   let rpt;
  //   rpt = <RptTable width={tableWidth} code={meta.cGroupCode} columns={columns} style={style} model={controlModel} tableClass="rptTable" tableTyep={'rptTable'} />;

  //   let content = [];
  //   content = self.getRows(this.props.layOutConfig.rows, content, rpt);
  //   return (
  //     <div>{content}</div>
  //   );
  // }


  // getRows(config, content, rpt) {
  //   let self = this;
  //   config.forEach(rowEle => {
  //     let curRow = [];
  //     rowEle.forEach(colEle => {
  //       if (colEle.widgetType == "rpt") {
  //         curRow.push(<Col span={colEle.colspan}> {rpt}</Col>);
  //       }
  //       else if (colEle.widgetType == "chart") {
  //         let chart = <div id={eChartCommon.getEChartElementId(colEle.widgetValue)}>
  //           <EChartDisplay
  //             config={self.props.eChartConfig[colEle.widgetValue]}
  //             billnum={self.props.billnum}
  //             groupSchemaId={self.props.groupSchemaId}
  //             condition={self.props.condition}
  //           />
  //         </div>;
  //         curRow.push(<Col span={colEle.colspan}> {chart}</Col>);
  //       }
  //       else if (colEle.widgetType == "rows") {
  //         let innerContent = [];
  //         innerContent = self.getRows(colEle.widgetValue, innerContent, rpt);
  //         curRow.push(<Col span={colEle.colspan}> {innerContent}</Col>);
  //       }
  //     });
  //     content.push(<Row colCount={12}>{curRow}</Row>);
  //   });
  //   return content;
  // }
  // actionsProxy(url, method, params, callback) {
  //   const config = { url: url, method: method, params: params };
  //   proxy(config)
  //     .then(json => {
  //       callback(json);
  //     });
  // }
}

