'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UretailConfirm = exports.UretailAlert = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _antd = require('antd');

var _rcNotification = require('rc-notification');

var _rcNotification2 = _interopRequireDefault(_rcNotification);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Confirm = require('./Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function noop() {}

var UretailAlert = function UretailAlert(paramObj) {

  var wrapClassName = _lodash2.default.get(paramObj, 'wrapClassName');
  var currentMode = _lodash2.default.get(paramObj, 'currentMode');

  // uretail-notification: 统一提示框
  // uretail-message（短文本）, uretail-notice（长文本可关闭）
  var notification = _rcNotification2.default.newInstance({
    prefixCls: currentMode === 'self' ? 'uretail-notification-self' : 'uretail-notification'
  });

  //使用实例: cb.utils.alert({title: 'awesome', type: 'success', duration: 666})
  //使用实例: cb.utils.alert({title: 'awesome', type: 'success', content: <p>xor<p/>, duration: 666})
  //兼容旧的写法，参数推荐使用语义对象(option)
  return function () {
    var option = {
      title: '',
      // type: info | success | error | warning
      type: 'info',
      // content不传为短文本提示
      content: null
      // duration
      // onClose
    };
    if (_lodash2.default.isPlainObject(arguments.length <= 0 ? undefined : arguments[0]) && !_react2.default.isValidElement(arguments.length <= 0 ? undefined : arguments[0])) {
      option = _lodash2.default.extend(option, arguments.length <= 0 ? undefined : arguments[0]);
    } else {
      option = _lodash2.default.extendWith(option, { title: arguments.length <= 0 ? undefined : arguments[0], type: arguments.length <= 1 ? undefined : arguments[1], content: arguments.length <= 2 ? undefined : arguments[2] }, function (objValue, srcValue) {
        return _lodash2.default.isUndefined(srcValue) ? objValue : srcValue;
      });
    }

    var _option = option,
        title = _option.title,
        type = _option.type,
        content = _option.content,
        others = _objectWithoutProperties(_option, ['title', 'type', 'content']);

    var duration = type === 'error' ? 3 : 2;
    var key = Date.now();
    var iconType = '';
    var NoticeIcon = void 0;
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

    NoticeIcon = currentMode === 'self' ? _react2.default.createElement(_antd.Icon, { type: iconType }) : _react2.default.createElement(_SvgIcon2.default, { type: iconType });
    if (type === 'loading') {
      NoticeIcon = _react2.default.createElement('img', { className: 'uretail-notification-loadingSvg',
        src: require('../../../client/styles/default/svgs/localLoading.svg') });
    }

    notification.notice(_extends({
      content: _lodash2.default.isNull(content) ? _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('uretail-message-custom-content uretail-message-' + type, wrapClassName) },
        _react2.default.createElement(
          'div',
          { className: 'anticon' },
          NoticeIcon
        ),
        _react2.default.createElement(
          'div',
          { className: 'anticon-circle' },
          title
        )
      ) : _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('uretail-notification-' + type, 'clearfix', wrapClassName) },
        _react2.default.createElement(
          'div',
          { style: { float: 'left' }, className: 'icon-count' },
          NoticeIcon
        ),
        _react2.default.createElement(
          'div',
          { style: { float: 'left' }, className: 'uretail-notice-count' },
          _react2.default.createElement(
            'div',
            { className: 'long-title' },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: 'long-count' },
            content
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'icon-count' },
          _react2.default.createElement(_SvgIcon2.default, { className: 'long-closed', type: 'guanbi', onClick: function onClick() {
              notification.removeNotice(key);
            } })
        )
      ),
      key: key,
      duration: duration
    }, others));
  };
};

var UretailConfirm = function UretailConfirm(self) {

  //兼容旧的写法，参数推荐使用语义对象(option)
  //return function (title, onOk, onCancel, content, okText, cancelText) {
  return function () {

    var option = {
      title: '',
      content: '',
      onOk: noop,
      onCancel: noop,
      iconType: null,
      okText: '确定',
      cancelText: '取消'
    };
    if (_lodash2.default.isPlainObject(arguments.length <= 0 ? undefined : arguments[0]) && !_react2.default.isValidElement(arguments.length <= 0 ? undefined : arguments[0])) {
      option = _lodash2.default.extend(option, arguments.length <= 0 ? undefined : arguments[0]);
    } else {
      option = _lodash2.default.extendWith(option, {
        title: arguments.length <= 0 ? undefined : arguments[0],
        onOk: arguments.length <= 1 ? undefined : arguments[1],
        onCancel: arguments.length <= 2 ? undefined : arguments[2],
        content: arguments.length <= 3 ? undefined : arguments[3],
        okText: arguments.length <= 4 ? undefined : arguments[4],
        cancelText: arguments.length <= 5 ? undefined : arguments[5]
      }, function (objValue, srcValue) {
        return _lodash2.default.isUndefined(srcValue) ? objValue : srcValue;
      });
    }

    var _option2 = option,
        title = _option2.title,
        others = _objectWithoutProperties(_option2, ['title']);

    title = _react2.default.createElement(
      'div',
      { className: 'model-title' },
      _react2.default.createElement(
        'svg',
        { className: 'icon', 'aria-hidden': 'true' },
        _react2.default.createElement('use', { href: '#icon-tishi' })
      ),
      title
    );
    var Confirm = self || cb.electron.getSharedObject() ? _Confirm2.default : _antd.Modal.confirm;
    return Confirm(_extends({
      title: title
    }, others));
  };
};

exports.UretailAlert = UretailAlert;
exports.UretailConfirm = UretailConfirm;