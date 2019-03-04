'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by janeluck on 17/11/01.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 页面快捷键
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// import getEventTarget from 'react-dom/lib/getEventTarget.js'


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _addDomEventListener = require('add-dom-event-listener');

var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);

var _Util = require('./Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TEXT_NODE = 3;
/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */
function getEventTarget(nativeEvent) {
  // Fallback to nativeEvent.srcElement for IE9
  // https://github.com/facebook/react/issues/12506
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === TEXT_NODE ? target.parentNode : target;
}

var Shortcut = function () {
  function Shortcut(options) {
    _classCallCheck(this, Shortcut);

    this._options = {
      type: 'keydown',
      container: document
    };
    this.shortcutCollection = {};

    var container = options && options.container;
    // 检测container是否为dom元素， 默认绑到document
    if (_lodash2.default.isElement(container)) {
      container.tabIndex < 0 && (container.tabIndex = 0);
    } else {
      container = document;
    }
    this._init(container, _lodash2.default.assign({}, this._options, options));
  }

  _createClass(Shortcut, [{
    key: '_init',
    value: function _init(container, options) {
      var that = this;

      var func = function func(nativeEvent) {
        var target = getEventTarget(nativeEvent);
        /*const charCode = getEventCharCode(nativeEvent)
        const character = String.fromCharCode(charCode).toLowerCase()*/
        // if (options.disable_in_input && (target.tagName == 'INPUT' || target.tagName == 'TEXTAREA')) return

        // activeKeys储存触发事件的键名
        var activeKeys = (0, _Util.getEventModifiers)(nativeEvent);
        var key = (0, _Util.getEventKey)(nativeEvent);
        if (key !== '' && _lodash2.default.indexOf(['Ctrl', 'Shift', 'Alt', 'Meta'], key) < 0) {
          activeKeys.push(key);
        }
        var activeCombination = that._convertKey(activeKeys.join('+'));
        var item = that.shortcutCollection[activeCombination];
        if (item && item.getEnableState(nativeEvent) && _lodash2.default.isFunction(item['callback'])) {
          (0, _Util.preventDefault)(nativeEvent);
          (0, _Util.stopPropagation)(nativeEvent);
          item['callback'](nativeEvent);
        }
      };

      that.handler = (0, _addDomEventListener2.default)(container, options.type, func);
    }
  }, {
    key: '_convertKey',
    value: function _convertKey(shortCut) {
      // 排序后转字符串，得到唯一的键名
      return shortCut.toLowerCase().split('+').sort().join('+');
    }
  }, {
    key: '_toArray',
    value: function _toArray(obj) {
      return _lodash2.default.isArray(obj) ? obj : [obj];
    }

    // 添加快捷键
    // 可以添加一条或者多条
    // @param {Object, Array}
    // {
    // shortCut:'Alt+K',
    // callback(){},
    // 判断该快捷键是否启用
    // getEnableState(){
    // }

  }, {
    key: 'add',
    value: function add(obj) {
      var that = this;
      var combinations = that._toArray(obj);
      _lodash2.default.forEach(combinations, function (item) {
        if (_lodash2.default.isEmpty(item.shortCut)) return;
        that.shortcutCollection[that._convertKey(item.shortCut)] = _lodash2.default.assign({
          getEnableState: function getEnableState(nativeEvent) {
            var tagName = getEventTarget(nativeEvent).tagName;
            //return tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'SELECT'
            return !(tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT');
          },
          callback: function callback() {}
        }, _lodash2.default.pick(item, ['getEnableState', 'callback']));
      });
    }

    // 清除所有的快捷键

  }, {
    key: 'clear',
    value: function clear() {
      this.shortcutCollection = {};
    }

    // 清除指定快捷键
    // 可以删除一条或者多条
    // @param {String, Array}

  }, {
    key: 'remove',
    value: function remove(obj) {
      var that = this;
      var result = that._toArray(obj);
      _lodash2.default.forEach(result, function (item) {
        var k = that._convertKey(item);
        delete that.shortcutCollection[k];
      });
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.handler.remove();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind();
    }
  }]);

  return Shortcut;
}();

exports.default = Shortcut;