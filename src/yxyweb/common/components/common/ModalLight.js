/**
 * Created by janeluck on 17/9/27.
 * Modal清爽版, 只有一个关闭图标的模态框
 * 支持enter, esc快捷关闭, 默认点击蒙层关闭
 *  @param {Object}  模态层参数集合, {content, maskClosable, width, onClose...}
 *  @return {Object} 包含实例的destroy方法
 *
 * 使用实例:
 * modalLight({
      content: <div>
        <div>结算成功</div>
      </div>
    })
 */
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import {
  Modal
} from 'antd'
import _ from 'lodash'
import addEventListener from 'add-dom-event-listener'
import {
  preventDefault,
  stopPropagation
} from "./Util"

function noop() {

}

export default function modalLight(config, manually) {
  /* manually:手动开启和关闭 lz */
  // 默认点击蒙层关闭
  var props = _.assign({
    maskClosable: true,
    prefixCls: 'ant-modal',
    width: 500,
    closable: true,
    onPressEnter: noop,
    onPressEsc: noop,
    keyboard: true
  }, config)
  const prefixCls = props.prefixCls,
    style = props.style || {},
    maskClosable = props.maskClosable,
    width = props.width,
    // 统一类名Uretail-ModalLight
    classString = classNames(prefixCls, 'Uretail-ModalLight', props.className)
  var div = document.createElement('div')
  document.body.appendChild(div)

  function close() {
    var unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
      enterHandler.remove()
      if (_.isFunction(props.onClose)) {
        props.onClose()
      }
    }
  }

  // enter键关闭
  const enterHandler = addEventListener(document, 'keydown', (event) => {
    if (event.keyCode === 13) {

      preventDefault(event)
      stopPropagation(event)
      // 关闭前回调onPressEnter
      Promise.resolve(props.onPressEnter(event)).then(close).catch(function (e) {
        console.log(e)
      })

    }
    if (event.keyCode === 27) {
      preventDefault(event)
      stopPropagation(event)
      // 关闭前回调onEscEnter
      props.onPressEsc(event)
      close()
    }

  })


  function init() {
    ReactDOM.render(React.createElement(
      Modal, {
        className: classString,
        visible: true,
        title: '',
        transitionName: cb.electron.getSharedObject() ? null : 'zoom',
        footer: '',
        maskTransitionName: cb.electron.getSharedObject() ? null : 'fade',
        maskClosable: maskClosable,
        style,
        width,
        onCancel: close,
        closable: props.closable,
        // 支持esc快捷关闭
        keyboard: props.keyboard
      },
      props.content
    ), div)
  }

  if (!manually) init()

  return {
    init,
    destroy: close
  }
}


/*
process.env.__CLIENT__ && modalLight({
  content: <div>
    <div>结算成功</div>
  </div>
})
*/
