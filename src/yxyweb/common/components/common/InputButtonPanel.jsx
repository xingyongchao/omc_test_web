/**
 * Created by janeluck on 17/9/14.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import SvgIcon from 'SvgIcon'
//import addEventListener from 'add-dom-event-listener'
import _ from 'lodash'

function isEmpty(v) {
  return v === '0' || !v
}

// 内部input组件用于外部渲染占位
export class InnerInput extends React.Component {
}

class InnerButton extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    onMouseDown: PropTypes.func,
    className: PropTypes.string
  }
  static defaultProps = {
    onMouseDown: function (value) {
    },
  }

  onMouseDown = (event) => {
    const type = this.props.type
    // 阻止虚拟键盘获得焦点, 保留原输入框的focus状态
    event.preventDefault()
    this.props.onMouseDown(type)
  }

  render() {
    return (<button {...(_.omit(this.props, ['children', 'onMouseDown', 'type']))} onMouseDown={this.onMouseDown}
                    tabIndex="-1">{this.props.children}</button>)
  }
}

// todo: 1.  点击按钮的交互样式
export default class InputButtonPanel extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    // 是否展示确定按钮
    showOk: PropTypes.bool,
    // 点击确定的交互事件
    onOk: PropTypes.func
  }
  static defaultProps = {
    onChange: function (value) {
      console.log(value)
    },
    showOk: false,
    onOk: function (value) {
      console.log(value)
    }
  }


  getResultString = (originStr = '', start = 0, end = 0, str = '') => {

    // 回退键特殊处理
    if (str === 'back') {
      str = ''
      if (start === end) start -= 1
    }
    //return originStr.slice(0, start) + (str === 'back' ? '' : str) + originStr.slice(end)
    //return originStr.replace(new RegExp('(^[\\d\\.]{' + start + '})[\\d\\.]{' + (end - start) + '}'), '$1' + str)
    // 根据光标的位置, 处理输入结果
    return originStr.replace(new RegExp('(.{' + start + '}).{' + (end - start) + '}'), '$1' + str)
  }

  handleOkDown = () => {
    const {onOk, value} = this.props
    onOk(value)
  }

  handleMouseDown = (type) => {
    // 获取当前焦点的input或者textarea
    let activeEl = document.activeElement
    if (['INPUT', 'TEXTAREA'].indexOf(activeEl.tagName) < 0) return

    const value = activeEl.value || ''
    const {selectionStart, selectionEnd} = activeEl

    const result = this.getResultString(value, selectionStart, selectionEnd, type)

    // 计算光标所在的位置
    const caretPosition = result.length - (value.length - selectionEnd)
    const {onChange, onOk, mode} = this.props
    switch (type) {
      case 'clear':
        onChange('')
        break
      case 'back':
        onChange(result)
        break
      case '.':
        if (value.indexOf('.') < 0) onChange(result)
        break
      case '00':
        onChange(mode !== 'text' && isEmpty(value) ? 0 : result)
        break
      case 'sure':
        onOk(value)
        break
      default:
        onChange(mode !== 'text' && isEmpty(value) ? type : result)
        break
    }

    // 设置元素的光标位置
    setTimeout(() => {
      const currentV = activeEl.value
      // 如果结果被再处理，光标定位到末尾
      if (typeof currentV !== 'undefined' && currentV != result) {
        activeEl.setSelectionRange(99999, 99999)
      } else {
        activeEl.setSelectionRange(caretPosition, caretPosition)
      }
    }, 0)

  }


  render() {

    const {showOk} = this.props
    return (<div>
      <div ref={wrap => this.wrap = wrap} className="InputButtonPanelWrap clearfix" onMouseDown={function (event) {
        event.preventDefault()
      }}>


        <div className="num">
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="1">1</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="2">2</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="3">3</InnerButton>
            </div>

          </div>
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="4">4</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="5">5</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="6">6</InnerButton>

            </div>

          </div>
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="7">7</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="8">8</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="9">9</InnerButton>

            </div>

          </div>
          <div className="InputButtonPanel-row">
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="0">0</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type="00">00</InnerButton>
            </div>
            <div className="InputButtonPanel-cell">
              <InnerButton onMouseDown={this.handleMouseDown} type=".">.</InnerButton>
            </div>
          </div>
        </div>

        <div className={classnames('del', {'InputButtonPanel-hasSure': showOk})}>
          <div>
            <InnerButton className='InputButtonPanel-button-back' onMouseDown={this.handleMouseDown}
                         type="back"><SvgIcon type="shanchu1"/></InnerButton>
          </div>
          <div>

            <InnerButton className='InputButtonPanel-button-clear' onMouseDown={this.handleMouseDown}
                         type="clear"><SvgIcon type="quanbushanchu"/></InnerButton>


          </div>
          {showOk && ( <div className='InputButtonPanel-button-sure'>

            <InnerButton onMouseDown={this.handleOkDown} type="sure">确定</InnerButton>


          </div>)}

        </div>

      </div>
    </div>)
  }
}
InputButtonPanel.InnerInput = InnerInput


// 使用实例
export class InputButtonPanelExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }

  }

  onChange = (v) => {
    this.setState({value: v})
  }
  handleChange = (e) => {
    const value = e.target.value
    this.setState({
      value
    })
  }
  onOk = (v) => {
    console.log(v)
  }


  render() {

    const value = this.state.value
    return (<div>

      {/* <input type="text" value={value} onChange={this.handleChange}/>*/}
      <InputButtonPanel value={this.props.value} onChange={this.onChange} showOk onOk={this.onOk}>

        <div><span>使用</span> <InnerInput/><span>积分</span> <span>抵扣</span><span>{value * 10}</span></div>
        <div><span>当前积分：</span><span>{value}</span></div>

      </InputButtonPanel>

    </div>)
  }
}

