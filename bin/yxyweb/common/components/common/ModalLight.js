'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = modalLight;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _antd = require('antd');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _addDomEventListener = require('add-dom-event-listener');

var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

var _Util = require('./Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {} /**
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
function modalLight(config, manually) {
  /* manually:手动开启和关闭 lz */
  // 默认点击蒙层关闭
  var props = _lodash2.default.assign({
    maskClosable: true,
    prefixCls: 'ant-modal',
    width: 500,
    closable: true,
    onPressEnter: noop,
    onPressEsc: noop,
    keyboard: true
  }, config);
  var prefixCls = props.prefixCls,
      style = props.style || {},
      maskClosable = props.maskClosable,
      width = props.width,

  // 统一类名Uretail-ModalLight
  classString = (0, _classnames2.default)(prefixCls, 'Uretail-ModalLight', props.className);
  var div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    var unmountResult = _reactDom2.default.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
      enterHandler.remove();
      if (_lodash2.default.isFunction(props.onClose)) {
        props.onClose();
      }
    }
  }

  // enter键关闭
  var enterHandler = (0, _addDomEventListener2.default)(document, 'keydown', function (event) {
    if (event.keyCode === 13) {

      (0, _Util.preventDefault)(event);
      (0, _Util.stopPropagation)(event);
      // 关闭前回调onPressEnter
      Promise.resolve(props.onPressEnter(event)).then(close).catch(function (e) {
        console.log(e);
      });
    }
    if (event.keyCode === 27) {
      (0, _Util.preventDefault)(event);
      (0, _Util.stopPropagation)(event);
      // 关闭前回调onEscEnter
      props.onPressEsc(event);
      close();
    }
  });

  function init() {
    _reactDom2.default.render(_react2.default.createElement(_antd.Modal, {
      className: classString,
      visible: true,
      title: '',
      transitionName: cb.electron.getSharedObject() ? null : 'zoom',
      footer: '',
      maskTransitionName: cb.electron.getSharedObject() ? null : 'fade',
      maskClosable: maskClosable,
      style: style,
      width: width,
      onCancel: close,
      closable: props.closable,
      // 支持esc快捷关闭
      keyboard: props.keyboard
    }, props.content), div);
  }

  if (!manually) init();

  return {
    init: init,
    destroy: close
  };
}

/*
process.env.__CLIENT__ && modalLight({
  content: <div>
    <div>结算成功</div>
  </div>
})
*/