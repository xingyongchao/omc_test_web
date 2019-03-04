import React, { Component } from 'react';
import { TreeTable } from '../basic';

export default class TreeTableContainer extends Component {
  constructor(props) {
    super(props);
    const columns = {};
    const controls = props.meta.controls ? props.meta.controls : null;
    if (controls) {
      controls.forEach(column => {
        columns[column.cItemName] = column;
      })
    }
    this.state = {
      height: props.height,
      columns
    };
  }
  render() {
    const { meta, viewModel, height, width } = this.props;
    const controlModel = viewModel.get(meta.childrenField || meta.cCode);
    let toolbarMeta = null;
    if (meta.containers && meta.containers[0])
      toolbarMeta = meta.containers[0];
    if (toolbarMeta && toolbarMeta.controls) {
      toolbarMeta.controls.forEach(item => {
        if (!item.cParameter) return;
        try {
          const config = JSON.parse(item.cParameter);
          config.model = viewModel.get(item.cItemName);
          Object.assign(item, config);
        } catch (e) {

        }
      });
    }
    return (
      <TreeTable model={controlModel} columns={this.state.columns} code={meta.cGroupCode} actionMeta={toolbarMeta} width={width} height={height} />
    );
  }
}
