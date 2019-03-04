import React, { Component } from 'react';
import { Row } from 'antd';
// import Table from '../grid-touch';
import SvgIcon from 'SvgIcon';
import env from '../../helpers/env';
let Table = null;

export default class TableControl extends Component {
  constructor(props) {
    super(props);
    Table = env.INTERACTIVE_MODE === 'touch' ? require('../grid-touch').default : require('../basic/table').default;
    const { meta, viewModel } = props;
    const columns = {};
    if (meta.controls) {
      const { billNo } = viewModel.getParams();
      meta.controls.forEach(column => {
        column.index = `${billNo}|${meta.cGroupCode}|${column.cItemName}`;
        columns[column.cItemName] = column;
      });
    }
    this.__isElectronic = window.__isElectronic;
    const controlModel = viewModel.get(meta.childrenField);
    this.state = {
      icon: meta.cImage,
      caption: meta.cName,
      model: controlModel,
      columns
    };
  }
  render() {
    const { icon, caption, model, columns } = this.state;
    const width = this.props.width - 2;
    const iconControl = <SvgIcon type={icon} />;
    let rowHeight = 45;
    if(this.__isElectronic) rowHeight = 30;
    return (
      <Row>
        <Row className="caption-title">{iconControl}<h3>{caption}</h3></Row>
        <Table width={width} model={model} columns={columns} footerHeight={50} rowHeight={rowHeight} widthMode='percent' emptyIcon='huanxingtu' />
      </Row>
    );
  }
}
