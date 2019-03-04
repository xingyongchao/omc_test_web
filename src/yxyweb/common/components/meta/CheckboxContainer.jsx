import React, { Component } from 'react';
import Checkbox from '../basic/checkbox';
import Label from '../basic/label';

export default class CheckboxContainer extends Component {
  render() {
    const { meta, viewModel } = this.props;
    const { controls, cName, childrenField } = meta;
    const checkboxes = (controls || []).map(control => {
      const modelKey = control.cItemName;
      let controlModel = childrenField && viewModel.get(childrenField) && viewModel.get(childrenField).getEditRowModel && viewModel.get(childrenField).getEditRowModel().get(modelKey);
      if (!controlModel)
        controlModel = viewModel.get(modelKey);
      return <Checkbox model={controlModel} {...control} type='simple' />
    });
    return (
      <div className='meta-checkbox-container'>
        <Label control={checkboxes} title={cName || ''} />
      </div>
    );
  }
}
