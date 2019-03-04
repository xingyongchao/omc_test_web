/**
 * Created by janeluck on 17/9/5.
 */
import React, {Component} from 'react'

export default class SvgIcon extends Component {
  render() {
    const {type, className, ...others} = this.props
    return <svg {...others} className={`icon ${className || ''}`}>
      <use xlinkHref={`#icon-${type}`}></use>
    </svg>
  }
}


