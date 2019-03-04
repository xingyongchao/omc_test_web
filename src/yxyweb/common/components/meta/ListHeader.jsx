import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Switch, Popover, Icon, Menu } from 'antd';
import { Row, Col } from '../basic';
import Toolbar from './Toolbar';
import ConvenientQuery from "../filter";
// import ReportSelect from './ReportSelect';
import ReportSelect from '../basic/groupcondition';
import * as  eChartDemoData from '../echart/eChartDemoData';
import { Button } from 'antd/lib/radio';
export default class ListHeader extends Component {
  constructor(props) {
    super(props);

    const { query, filterId } = props.model.getParams();
    this.isStaticReport = query.reportId || query.subscriptionId || !filterId ? true : false;
    this.viewid = _.get(props.model.getParams(), 'query.viewid');

    this.bPublished = this.viewid ? true : false;

  }
  componentDidMount() {
    this.height = findDOMNode(this.refs.listHeader).clientHeight;
    this.props.model.execute('listHeaderHeightUpdate', this.height);
    this.props.model.on('filterHeightUpdate', () => {
      const height = findDOMNode(this.refs.listHeader).clientHeight;
      if (this.height === height) return;
      this.height = height;
      this.props.model.execute('listHeaderHeightUpdate', this.height);
    });
  }
  setQueryItems(viewModel, item) {
    const queryItems = viewModel.getCache('queryItems') || [];
    if (queryItems.indexOf(item) === -1)
      queryItems.push(item);
    viewModel.setCache('queryItems', queryItems);
  }
  publishMenu(model) {
    model.execute('publishMenu');
  }

  render() {
    const { meta, model, hasTree } = this.props;
    let filter = null, toolbar = null, solution = null;
    meta.containers.map(item => {
      switch (item.cControlType.trim().toLocaleLowerCase()) {
        case 'convenientquery':
          if (this.isStaticReport) return;
          this.setQueryItems(model, 'filter');
          filter = <ConvenientQuery model={model} cols={3} />
          break;
        case 'toolbar':
          if (this.bPublished == true) {
            item.controls = _.filter(item.controls, function (o) { return (o.cItemName != "btnsumSetting" && o.cItemName != "btnMenupublish") })
          }
          const extraProps = {};
          try {
            if (cb.rest.toolbarHotfix) {
              let showCount = item.controls && item.controls.length > 1 && item.controls[0].cItemName !== 'btnAdd' ? 0 : 1;
              if (item.cStyle) {
                const config = JSON.parse(item.cStyle);
                if (config.hotfix === false) {
                  showCount = undefined;
                } else {
                  if (!cb.utils.isEmpty(config.showCount))
                    showCount = config.showCount;
                  if (showCount === true)
                    showCount = items.controls.length;
                }
              }
              extraProps.showCount = showCount;
            }
          } catch (e) {

          }
          toolbar = <Toolbar align='right' controls={item.controls} model={model} {...extraProps} />
          break;
        case 'reportselect':
          if (this.isStaticReport) return;
          this.setQueryItems(model, 'schema');
          solution = <ReportSelect viewModel={model} viewid={this.viewid} />
          break;
      }
    });
    const secondCom = solution
      ? <Row>
        <div className="rpt-toolbar">{toolbar}</div>
        <div className="rpt-select">{solution}</div>
      </Row>
      : <Row><Col span={24}>{toolbar}</Col></Row>;
    return (
      <Row ref="listHeader" className="listheadRow">
        <Row>
          <Col span={24}>{filter}</Col>
        </Row>
        {secondCom}
      </Row>
    );
  }
}
