import React, { Component } from 'react';
import { Row } from '../basic';
import _ from 'lodash';

export default class TotalContainerOld extends Component {
  render() {
    const { meta, viewModel } = this.props;
    const controlModel = viewModel.get(meta.cCode);
    return (
      <Total code={meta.cGroupCode} model={controlModel} />
    );
  }
}

class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: []
    };
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  setListenerState(params) {
    const code = this.props.code;
    this.totalFields = {};
    const controls = [];
    _.forEach(params.columns, (item, key) => {
      let config = null;
      try {
        config = JSON.parse(item.cStyle);
      } catch (e) {
        config = {};
      }
      if (!config.highlight) return;
      if (config.code && config.code !== code) return;
      const totalField = { caption: item.cShowCaption, value: 0 };
      this.totalFields[key] = totalField;
      controls.push(totalField);
    });
    this.setState({ controls });
  }
  setSum(sumData) {
    if (!sumData.length) sumData = [{}];
    const controls = [];
    _.forEach(this.totalFields, (item, key) => {
      controls.push({ caption: item.caption, value: sumData[0][key] || 0 });
    });
    this.setState({ controls });
  }
  render() {
    const { controls } = this.state;
    if (!controls.length)
      return null;
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
}
