import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import nophoto from 'src/mobile/styles/default/images/my-header.png'

export default class CarHeaderControl extends Component {
  constructor(props) {
    super(props);
    this.key = props.key;
    this.meta = props.meta;
    this.model = props.model;
  }

  componentDidMount() {
    if (this.model)
      this.model.addListener(this);
  }

  componentWillUnmount() {
    if (this.model)
      this.model.removeListener(this);
  }

  _renderComponents() {
    if (!this.meta)
      return "";
    let controls = [];
    this.meta.containers.map((item, index) => {
      const control = this.getControl(item, index);
      if (control)
        controls.push(<Flex><Flex.Item>{control}</Flex.Item></Flex>);
    })
    return controls;
  }

  getControl(item, index) {
    const ctrlType = item.cControlType.trim().toLocaleLowerCase();
    const { model } = this.props;
    switch (ctrlType) {
      case "member":
        if (!model.get('iMemberid').getValue() || model.get('iMemberid').getValue() === 0) {
          return null
        }
        return (<div className='detail_tab_bar_v detail_tab_ba_status' style={{ marginTop: "0" }}>
          <div className="message" style={{ lineHeight: '0.3rem' }}>
            <ul className="message_header">
              <li>
                {
                  !cb.utils.isEmpty(model.get('avatar')) ?
                    <img src={model.get('avatar').getValue()} />
                    :
                    <div className="default-avatar"></div>
                }
                {/* <img src={cb.utils.isEmpty(model.get('avatar'))?nophoto:model.get('avatar').getValue()}/> */}
              </li>
              <li><span>{model.get('iMemberid_name').getValue()}</span></li>
            </ul>

            <ul className="number_dk">
              <li><span>{model.get('fPointPay').getValue()}</span></li>
              <li>抵扣积分</li>
            </ul>
            <ul className="number_bd">
              <li><span>{model.get('fPointCurrent').getValue()}</span></li>
              <li>本单积分</li>
            </ul>
          </div></div>)
    }
  }

  render() {
    let control = this._renderComponents();
    if (control.length === 0) {
      return <div></div>;
    }
    return (<div className="billing_top_margin">
      {control}
    </div>);
  }

}
