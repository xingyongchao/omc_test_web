import React, { Component } from 'react';
import Button from '../BasicComponents/button';
require('src/mobile/styles/globalCss/footer.css');

export default class CarHeaderControl extends Component {
  constructor(props) {
    super(props);
    this.key = props.key;
    this.viewmodel = props.model;
    const controls = this.props.controls;
    this.visibleMap = {};
    controls && controls.map(item => {
      this.visibleMap[item.cItemName] = true;
    });
  }

  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
    }
  }

  componentWillMount() {
    if (this.props.model) {
      this.props.model.removeListener(this);
    }
  }
  handleVisibleChange(controlKey, visible) {
    this.visibleMap[controlKey] = visible;
    let hideCount = 0;
    const { controls } = this.props;
    controls && controls.forEach(item => {
      const { cItemName } = item;
      if (this.visibleMap[cItemName]) return;
      hideCount++;
    });
    const hide = (!controls || hideCount === controls.length);
    if (this.props.onVisibleChange)
      this.props.onVisibleChange(!hide);
  }
  getFooterControl = (controls) => {
    let buttons = [];
    if (controls) {
      controls.map(control => {
        let model = this.viewmodel.get(control.cItemName);
        buttons.push(
          <Button model={model} onVisibleChange={visible => this.handleVisibleChange(control.cItemName, visible)} />
          // <span className='print_cls' onClick={() => { model.fireEvent('click') }}>{control.cShowCaption}</span>
        )
      });
    }
    return buttons;
  }
  render() {
    if (!this.props.controls) return null;
    let control = this.getFooterControl(this.props.controls);
    return (
      <div className='footer_cls'>
        {control}
        {/* <span className='print_cls' onClick={() => { cb.utils.Toast('正在开发中...', 'warning') }}>重打小票</span> */}
      </div>
    )
  }
}
