import {Modal, Icon} from 'antd'
import Notification from 'rc-notification'
import React from 'react'
import SvgIcon from 'SvgIcon'
import _ from 'lodash'
import classnames from 'classnames'
import SelfConfirm from './Confirm'
function noop() {

}

const UretailAlert = function (paramObj) {

  const wrapClassName = _.get(paramObj, 'wrapClassName')
  const currentMode = _.get(paramObj, 'currentMode')

  // uretail-notification: 统一提示框
  // uretail-message（短文本）, uretail-notice（长文本可关闭）
  const notification = Notification.newInstance({
    prefixCls: currentMode === 'self' ? 'uretail-notification-self' : 'uretail-notification'
  })

  //使用实例: cb.utils.alert({title: 'awesome', type: 'success', duration: 666})
  //使用实例: cb.utils.alert({title: 'awesome', type: 'success', content: <p>xor<p/>, duration: 666})
  //兼容旧的写法，参数推荐使用语义对象(option)
  return function (...args) {
    let option = {
      title: '',
      // type: info | success | error | warning
      type: 'info',
      // content不传为短文本提示
      content: null
      // duration
      // onClose
    }
    if (_.isPlainObject(args[0]) && !React.isValidElement(args[0])) {
      option = _.extend(option, args[0])
    } else {
      option = _.extendWith(option, {title: args[0], type: args[1], content: args[2]}, (objValue, srcValue) => {
        return _.isUndefined(srcValue) ? objValue : srcValue
      })
    }

    const {title, type, content, ...others} = option
    const duration = type === 'error' ? 3 : 2
    const key = Date.now()
    let iconType = ''
    let NoticeIcon
    switch (type) {
      case 'success':
        iconType = 'chenggongtishi';
        break;
      case 'info':
        iconType = 'tongzhixinxi';
        break;
      case 'error':
        iconType = 'cuowutishi';
        break;
      case 'warning':
        iconType = 'tishi';
        break;
      default:
        iconType = 'tongzhixinxi';
    }

    NoticeIcon = currentMode === 'self' ? <Icon type={iconType} /> : <SvgIcon type={iconType}/>
    if (type === 'loading') {
      NoticeIcon = <img className='uretail-notification-loadingSvg'
                        src={require('yxyweb/client/styles/default/svgs/localLoading.svg')}/>
    }

    notification.notice({
      content: _.isNull(content) ? (
        <div className={classnames('uretail-message-custom-content uretail-message-' + type, wrapClassName)}>
          <div className="anticon">{NoticeIcon}</div>
          <div className="anticon-circle">{title}</div>
        </div>
      ) : (<div className={classnames(`uretail-notification-${type}`, 'clearfix',wrapClassName )}>
        <div style={{float: 'left'}} className="icon-count">
          {NoticeIcon}
        </div>
        <div style={{float: 'left'}} className="uretail-notice-count">
          <div className="long-title">{title}</div>
          <div className="long-count">{content}</div>
        </div>
        <div className="icon-count">
          <SvgIcon className="long-closed" type='guanbi' onClick={() => {
            notification.removeNotice(key)
          }}/>
        </div>
      </div>),
      key,
      duration,
      ...others
    })
  }
}


const UretailConfirm = function (self) {

  //兼容旧的写法，参数推荐使用语义对象(option)
  //return function (title, onOk, onCancel, content, okText, cancelText) {
  return function (...args) {

    let option = {
      title: '',
      content: '',
      onOk: noop,
      onCancel: noop,
      iconType: null,
      okText: '确定',
      cancelText: '取消'
    }
    if (_.isPlainObject(args[0]) && !React.isValidElement(args[0])) {
      option = _.extend(option, args[0])
    } else {
      option = _.extendWith(option, {
        title: args[0],
        onOk: args[1],
        onCancel: args[2],
        content: args[3],
        okText: args[4],
        cancelText: args[5]
      }, (objValue, srcValue) => {
        return _.isUndefined(srcValue) ? objValue : srcValue
      })
    }

    let {title, ...others} = option
    title = <div className='model-title'>
      <svg className="icon" aria-hidden="true">
        <use href='#icon-tishi'></use>
      </svg>
      {title}
    </div>
    const Confirm = (self || cb.electron.getSharedObject()) ? SelfConfirm : Modal.confirm;
    return Confirm({
      title,
      ...others
    })
  }
}


export {
  UretailAlert,
  UretailConfirm,
}
