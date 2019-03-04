import React, { Component } from 'react';
import { Button } from 'antd-mobile';
// import SvgIcon from 'src/client/components/SvgIcon'

/**
 * value由只能由props中传入，为了校验数量是否有权限加减不自己在state中维护
*/

export default class StepperSelf extends Component {
  constructor(props) {
    super(props)
    let obj = {
      showType: props.showType || 'text', /*数字展示区域类型 'text' || 'input'*/
      min: props.min !== undefined ? props.min : 1,
      max: props.max !== undefined ? props.max : 9999999,
      value: props.value || 1,
      step: props.step || 1,
      isMin: false,       /*是否达到最小值*/
      isMax: false,
    }
    if(obj.min == obj.value) obj.isMin = true
    if(obj.max == obj.value) obj.isMax = true
    this.state = obj
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  downClick(e) {
    let { value, min, step, max } = this.state;
    value = value - step;
    if (value <= min) {
      this.setState({ isMin: true, isMax: false });
      value = min
    } else {
      this.setState({ isMin: false, isMax: false });
    }
    if (this.props.onChange)
      this.props.onChange(value, e, 'down')
  }

  upClick(e) {
    let { value, step, min, max } = this.state;
    value = value + step;
    if (value >= max){
      value = max
      this.setState({ isMax: true, isMin: true })
    }else {
      this.setState({ isMax: false, isMin: false })
    }
    if (this.props.onChange)
      this.props.onChange(value, e, 'up')
  }

  render() {
    let { showType, value, isMin, isMax } = this.state;
    const quantitydecimal = cb.rest.AppContext.option.quantitydecimal;
    value = parseFloat(value).toFixed(quantitydecimal);
    return (
      <div className="stepper_container am-stepper showNumber">
        <div className="stepper_btn am-stepper-handler-wrap">
          <span className={!isMin ? "stepper_left_btn am-stepper-handler am-stepper-handler-down" : "stepper_right_btn am-stepper-handler am-stepper-handler-down am-stepper-handler-disabled"}
            onClick={(e) => this.downClick(e)}
          >
            <svg className={`icon am-icon am-icon-minus am-icon-xxs`}>
              <use xlinkHref={`#minus`}></use>
            </svg>
          </span>
          <span
            className={!isMax ? "stepper_rignt_btn am-stepper-handler am-stepper-handler-up " : "stepper_rignt_btn am-stepper-handler am-stepper-handler-up am-stepper-handler-disabled"}
            onClick={(e) => this.upClick(e)}>
            <svg className={`am-icon am-icon-plus am-icon-xxs`}>
              <use xlinkHref={`#plus`}></use>
            </svg>
          </span>
        </div >
        <div className="stepper_show_area am-stepper-input-wrap" >
          {showType === 'input' ? <input className="am-stepper-input" onChange={e => this.onChange(e)} value={value} />
            : <div>{value}</div>}
        </div>
      </div>
    )
  }
}
