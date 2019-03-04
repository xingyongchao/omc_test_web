import _ from 'lodash'
export const preventDefault = function (nativeEvent) {
  if (!nativeEvent) {
    return
  }
  if (nativeEvent.preventDefault) {
    nativeEvent.preventDefault()
  } else if (typeof nativeEvent.returnValue !== 'unknown') {
    nativeEvent.returnValue = false
  }
}

export const stopPropagation = function (nativeEvent) {
  if (!nativeEvent) {
    return
  }
  if (nativeEvent.stopPropagation) {
    nativeEvent.stopPropagation()
  } else if (typeof nativeEvent.cancelBubble !== 'unknown') {
    // The ChangeEventPlugin registers a "propertychange" event for
    // IE. This event does not support bubbling or cancelling, and
    // any references to cancelBubble throw "Member not found".  A
    // typeof check of "unknown" circumvents this issue (and is also
    // IE specific).
    nativeEvent.cancelBubble = true
  }
}

const keyNameToModifer = {
  Alt: ['Alt', 'altKey'],
  Ctrl: ['Control', 'ctrlKey'],
  Meta: ['Meta', 'metaKey'],
  Shift: ['Shift', 'shiftKey']
}
// 获取modifiers为true的键集合数组
export const getEventModifiers = function (nativeEvent) {
  return _.filter(Object.keys(keyNameToModifer), (k) => {
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyNameToModifer[k][0]);
    }
    return !!nativeEvent[keyNameToModifer[k][1]]
  })
}



// 浏览器键名标准化
const normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  // windows系统下93为ContextMenu，mac为MetaRight
  ContextMenu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
}
// 功能键和控制键对应字符集
const translateToKey = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Ctrl',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  124: 'F13',
  125: 'F14',
  126: 'F15',
  127: 'F16',
  128: 'F17',
  129: 'F18',
  130: 'F19',
  131: 'F20',
  132: 'F21',
  133: 'F22',
  134: 'F23',
  135: 'F24',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta'
}


const stringKey = {
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',

  65: 'A',
  66: 'B',
  67: 'C',
  68: 'D',
  69: 'E',
  70: 'F',
  71: 'G',
  72: 'H',
  73: 'I',
  74: 'J',
  75: 'K',
  76: 'L',
  77: 'M',
  78: 'N',
  79: 'O',
  80: 'P',
  81: 'Q',
  82: 'R',
  83: 'S',
  84: 'T',
  85: 'U',
  86: 'V',
  87: 'W',
  88: 'X',
  89: 'Y',
  90: 'Z',

}
// 特殊符号对应字符集
const specialKey = {
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  221: ']',
  220: '\\',
  222: '\''
}

//数字键盘对应字符集
const numberPadKey = {
  96: '0',
  97: '1',
  98: '2',
  99: '3',
  100: '4',
  101: '5',
  102: '6',
  103: '7',
  104: '8',
  105: '9',
  106: '*',
  // + 其实不用考虑
  107: '+',
  108: 'Enter',
  109: '-',
  110: '.',
  111: '/',
}


const keysCollect = _.assign({}, stringKey, numberPadKey, specialKey, translateToKey)

// 获取键名
export const getEventKey = function (nativeEvent) {
  const charCode = nativeEvent.keyCode || nativeEvent.which
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.
    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    const key = normalizeKey[nativeEvent.key] || ''
    if (key && key !== 'Unidentified') {
      return key
    }
  }
  //return keysCollect[charCode] || String.fromCharCode(charCode)
  return keysCollect[charCode] || ''
}

