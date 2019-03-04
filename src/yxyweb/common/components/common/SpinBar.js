import React, {Component} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class SpinBar extends Component {

  shouldComponentUpdate(nextProps) {
   // return true
    return  nextProps.loading !== this.props.loading
  }

  static propTypes = {
    loading: PropTypes.bool,
  }
  static defaultProps = {
    loading: false
  }

  render() {
    const loading = this.props.loading
    return <div className='Uretail-SpinBar-wrap'>
      <div className={classnames('Uretail-SpinBar', {'Uretail-SpinBarActive': loading})}>
        <span className='Uretail-SpinBar-bar'/>
      </div>
    </div>
  }
}

export default SpinBar
