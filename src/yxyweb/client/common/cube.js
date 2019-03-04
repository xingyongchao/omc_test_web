module.exports = window.cb = {};

cb.namespace = function () {
  var ns, arg, items;
  for (var i = 0, len = arguments.length; i < len; i++) {
    arg = arguments[i];
    if (!arg) continue;
    ns = cb;
    items = arg.split('.');
    for (var j = (items[0] === 'cb') ? 1 : 0, len1 = items.length; j < len1; j++) {
      ns[items[j]] = ns[items[j]] || {};
      ns = ns[items[j]];
    }
  }
  return ns;
};

cb.route = {
  redirectLoginPage: function () {
    cb.utils.alert('redirectLoginPage', 'error');
  }
};

cb.utils = {};
cb.utils.queryString = function (url) {
  this.pathname = '';
  this.query = {};

  this.init = function () {
    if (!url) url = location.search;
    var index1 = url.indexOf('?');
    var index2 = url.indexOf('#');
    if (index1 >= 0) {
      this.pathname = url.substr(0, index1);
      url = index2 < 0 ? url.substr(index1 + 1) : url.substring(index1 + 1, index2);
      if (url.length > 0) {
        url = url.replace(/\+/g, ' ');
        var params = url.split('&');
        for (var i = 0, len = params.length; i < len; i++) {
          var param = params[i].split('=');
          var key = decodeURIComponent(param[0]);
          var value = (param.length == 2) ? decodeURIComponent(param[1]) : key;
          this.query[key] = value;
        }
      }
    } else {
      this.pathname = url;
    }
  };

  this.set = function (key, value) {
    this.query[key] = value;
  };

  this.get = function (key) {
    return this.query[key];
  };

  this.has = function (key) {
    return this.query[key] != null;
  };

  this.toStr = function () {
    var items = ['?'];
    for (var key in this.query) {
      items.push(encodeURIComponent(key));
      items.push('=');
      items.push(encodeURIComponent(this.query[key]));
      items.push('&');
    }
    if (items.length === 1) {
      return '';
    } else {
      items.splice(items.length - 1, 1);
      return items.join('');
    }
  };

  this.init();
};
cb.utils.browser = function () {
  if (!!window.ActiveXObject || 'ActiveXObject' in window)
    return 'IE';
  return null;
};
cb.utils.isArray = function (arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr);
  }

  return Object.prototype.toString.call(arr) === '[object Array]';
};
cb.utils.isPlainObject = function (obj) {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
    return false;
  }

  var hasOwnConstructor = Object.prototype.hasOwnProperty.call(obj, 'constructor');
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for (key in obj) {/**/
  }

  return typeof key === 'undefined' || Object.prototype.hasOwnProperty.call(obj, key);
};
cb.utils.extend = function () {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0],
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  } else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
    target = {};
  }

  for (; i < length; ++i) {
    options = arguments[i];
    // Only deal with non-null/undefined values
    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target !== copy) {
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && this.isArray(src) ? src : [];
            } else {
              clone = src && this.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = this.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            target[name] = copy;
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
};

cb.utils.changeUserDefineTypeEnumValue = function (list, bToName) {
  list.forEach(function (ele) {
    if (bToName) {
      if (ele.type == "String") ele.type = "文本"
      if (ele.type == "Integer") ele.type = "整型"
      if (ele.type == "Double") ele.type = "数值"
      if (ele.type == "Date") ele.type = "日期"
      if (ele.type == "Time") ele.type = "时间"
      if (ele.type == "Datetime") ele.type = "日期时间"
      if (ele.type == "Archive") ele.type = "档案"
    }
    else {
      if (ele.type == "文本") ele.type = "String"
      if (ele.type == "整型") ele.type = "Integer"
      if (ele.type == "数值") ele.type = "Double"
      if (ele.type == "日期") ele.type = "Date"
      if (ele.type == "时间") ele.type = "Time"
      if (ele.type == "日期时间") ele.type = "Datetime"
      if (ele.type == "档案") ele.type = "Archive"
    }
  }, this);
  return list;
};
cb.utils.getNewId = function (prefix) {
  var number = (cb.cache.newIds.get(prefix) || 0) + 1;
  cb.cache.newIds.set(prefix, number);
  return prefix + '_' + number;
};
cb.utils.getCookie = function (name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg)) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
};
cb.utils.getPrototype = function (prototype) {
  return (function () {
    function F() {
    };
    F.prototype = prototype;
    return new F();
  })();
};
cb.utils.loadingControl = {
  start: function () {
  },
  end: function () {
  }
};
cb.utils.loading = function () {
};
cb.utils.isEmpty = function (value) {
  return value == null || value === '';
};
cb.utils.getBooleanValue = function (value) {
  if (cb.utils.isEmpty(value))
    return value;
  if (typeof value === 'string') {
    value = value.trim().toLocaleLowerCase();
    if (value === '1' || value === 'y' || value === 'true')
      return true;
    if (value === '0' || value === 'n' || value === 'false')
      return false;
  }
  if (value === 1)
    return true;
  if (value === 0)
    return false;
  return value;
};
cb.utils.isEmptyObject = function (e) {
  var t;
  for (t in e)
    return !1;
  return !0
}
cb.utils.getNewGuid = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
cb.utils.getNowFormatDate = function () {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}
cb.utils.getBill2ReferKeyFieldMap = function (cRefRetId, defineMap) {
  var bill2ReferKeyFieldMap = {};
  try {
    var obj = JSON.parse(cRefRetId);
    var exp = /<%.*?%>/g;
    for (var billKey in obj) {
      var referKey = obj[billKey];
      var items = referKey.match(exp);
      if (items) {
        if (!defineMap)
          return false;
        var values = {};
        items.forEach(item => {
          var predicate = item.substring(2, item.length - 2);
          values[item] = defineMap[predicate];
        });
        bill2ReferKeyFieldMap[billKey] = referKey.replace(exp, function (key) {
          return values[key];
        });
      } else {
        var billIndex = billKey.indexOf('@'), referIndex = referKey.indexOf('@');
        if (billIndex > -1 && referIndex > -1) {
          var billIterators = billKey.substr(billIndex + 1).split('@@');
          var referIterators = referKey.substr(referIndex + 1).split('@@');
          var billStartIndex = parseInt(billIterators[0]), billEndIndex = parseInt(billIterators[1]),
            referStartIndex = parseInt(referIterators[0]), referEndIndex = parseInt(referIterators[1]);
          var billLength = billEndIndex - billStartIndex + 1, referLength = referEndIndex - referStartIndex + 1;
          if (billLength === referLength) {
            billKey = billKey.substr(0, billIndex);
            referKey = referKey.substr(0, referIndex);
            for (var i = 0; i < billLength; i++)
              bill2ReferKeyFieldMap[billKey + (billStartIndex + i)] = referKey + (referStartIndex + i);
          } else {
            bill2ReferKeyFieldMap[billKey] = referKey;
          }
        } else {
          bill2ReferKeyFieldMap[billKey] = referKey;
        }
      }
    }
  } catch (e) {
    console.error('参照携带定义' + cRefRetId + '有错误：' + e.message);
  }
  return bill2ReferKeyFieldMap;
};
cb.utils.getPredicateValue = function (formatValue) {
  var exp = /<%.*?%>/g;
  var items = formatValue.match(exp);
  if (!items)
    return formatValue;
  var values = {};
  var valid = true;
  items.forEach(function (item) {
    var predicate = item.substring(2, item.length - 2).split('.');
    if (predicate.length !== 2) {
      valid = false;
      return;
    }
    var obj = cb.rest.AppContext[predicate[0]];
    values[item] = obj && (cb.utils.isEmpty(obj[predicate[1]]) ? '' : obj[predicate[1]]);
  });
  if (!valid)
    return formatValue;
  return formatValue.replace(exp, function (key) {
    return values[key];
  });
}

cb.events = {};
cb.events.on = function (name, callback, context) {
  if (!name || !callback) return;
  this._events || (this._events = {});
  var events = this._events[name] || (this._events[name] = []);
  events.push({ callback: callback, context: context });
};
cb.events.un = function (name, callback) {
  if (!name || !this._events || !this._events[name]) return;
  if (!callback) {
    delete this._events[name];
  } else {
    var index = this._events[name].findIndex(function (value) {
      if (value.callback === callback)
        return true;
    });
    if (index !== -1)
      this._events[name].removeData(this._events[name][index]);
  }
};
cb.events.hasEvent = function (name) {
  if (!name) return;
  return this._events && this._events[name] && this._events[name].length;
};
cb.events.execute = function (name) {
  if (!name) return;
  var events = this._events ? this._events[name] : null;
  if (!events) return true;
  var result = true;
  var args = Array.prototype.slice.call(arguments, 1);
  events.forEach(function (event) {
    result = event.callback.apply(event.context || this, args) === false ? false : result;
  }, this);
  return result;
};

cb.promise = function () {
  this.callbacks = [];
};

cb.promise.prototype = {
  resolve: function (result) {
    this.complete('resolve', result);
  },
  reject: function (result) {
    this.complete('reject', result);
  },
  complete: function (type, result) {
    while (this.callbacks[0])
      this.callbacks.shift()[type](result);
  },
  then: function (successHandler, failedHandler) {
    this.callbacks.push({
      resolve: successHandler,
      reject: failedHandler
    });
    return this;
  }
};

var dom = function (arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++)
    this[i] = arr[i];
  this.length = len;
  return this;
};
dom.prototype = {
  hasClass: function (className) {
    if (!this[0])
      return false;
    return this[0].classList.contains(className);
  },
  is: function (selector) {
    if (!this[0] || typeof selector === 'undefined')
      return false;
    var el = this[0];
    if (typeof selector === 'string') {
      if (el === document)
        return selector === document;
      if (el === window)
        return selector === window;
      if (el.matches)
        return el.matches(selector);
      if (el.webkitMatchesSelector)
        return el.webkitMatchesSelector(selector);
      if (el.mozMatchesSelector)
        return el.mozMatchesSelector(selector);
      if (el.msMatchesSelector)
        return el.msMatchesSelector(selector);
      var compareWith = cb.dom(selector);
      for (var i = 0, len = compareWith.length; i < len; i++) {
        if (compareWith[i] === el)
          return true;
      }
      return false;
    }
    if (selector === document)
      return el === document;
    if (selector === window)
      return el === window;
    if (selector.nodeType || selector instanceof cb.dom) {
      var compareWith = selector.nodeType ? [selector] : selector;
      for (var i = 0, len = compareWith.length; i < len; i++) {
        if (compareWith[i] === el)
          return true;
      }
      return false;
    }
    return false;
  },
  parents: function (selector) {
    var parents = [];
    for (var i = 0, len = this.length; i < len; i++) {
      var parent = this[i].parentNode;
      while (parent) {
        if (selector) {
          if (cb.dom(parent).is(selector))
            parents.push(parent);
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return cb.dom(cb.dom.unique(parents));
  },
  find: function (selector) {
    var foundElements = [];
    for (var i = 0, len = this.length; i < len; i++) {
      var found = this[i].querySelectorAll(selector);
      for (var j = 0, len1 = found.length; j < len1; j++)
        foundElements.push(found[j]);
    }
    return new dom(foundElements);
  },
  children: function (selector) {
    var children = [];
    for (var i = 0, len = this.length; i < len; i++) {
      var childNodes = this[i].childNodes;
      for (var j = 0, len1 = childNodes.length; j < len1; j++) {
        var childNode = childNodes[j];
        if (!selector) {
          if (childNode.nodeType === 1)
            children.push(childNode);
        } else {
          if (childNode.nodeType === 1 && cb.dom(childNode).is(selector))
            children.push(childNode);
        }
      }
    }
    return new dom(cb.dom.unique(children));
  }
};

cb.dom = function (selector, context) {
  if (!selector)
    return new dom([]);
  if (selector && !context && selector instanceof dom)
    return selector;
  var arr = [];
  if (typeof selector === 'string') {
    var html = selector.trim();
    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      var toCreate;
      if (html.indexOf('<li') === 0) {
        toCreate = 'ul';
      } else if (html.indexOf('<tr') === 0) {
        toCreate = 'tbody';
      } else if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
        toCreate = 'tr';
      } else if (html.indexOf('<tbody') === 0) {
        toCreate = 'table'
      } else if (html.indexOf('<option') === 0) {
        toCreate = 'select';
      } else {
        toCreate = 'div';
      }
      var tempParent = document.createElement(toCreate);
      tempParent.innerHTML = selector;
      for (var i = 0, len = tempParent.childNodes.length; i < len; i++)
        arr.push(tempParent.childNodes[i]);
    } else {
      if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
        arr.push(document.getElementById(selector.split('#')[1]));
      } else {
        var els = (context || document).querySelectorAll(selector);
        for (var i = 0, len = els.length; i < len; i++)
          if (els[i])
            arr.push(els[i]);
      }
    }
  } else if (selector.nodeType || selector === window || selector === document) {
    arr.push(selector)
  } else if (selector.length && selector[0].nodeType) {
    for (var i = 0, len = selector.length; i < len; i++) {
      arr.push(selector[i]);
    }
  }
  return new dom(arr);
};
cb.dom.unique = function (arr) {
  var unique = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (unique.indexOf(arr[i]) === -1)
      unique.push(arr[i]);
  }
  return unique;
};

cb.models = {};
cb.models.register = function (modelType, func) {
  cb.models[modelType] = func(modelType);
};
cb.models.register('BaseModel', function (modelType) {
  var model = function (data) {
    var propertyNames = [];
    if (data)
      for (var propertyName in data)
        propertyNames.push(propertyName);
    var _data = cb.utils.extend({}, { listeners: [], propertyNames: propertyNames, events: {}, cache: {} }, data);

    this._get_data = function (key) {
      if (!key) return;
      return _data[key];
    };

    this._set_data = function (key, value, update) {
      if (!key) return;
      if (update && propertyNames.indexOf(key) < 0)
        propertyNames.push(key);
      _data[key] = value;
    };

    this._del_data = function (key) {
      if (!key) return;
      delete _data[key];
    };

    this._cls_data = function () {
      _data = null;
    };
  };
  model.prototype.modelType = modelType;

  model.prototype.setParent = function (parent) {
    this.setCache('parent', parent);
  };

  model.prototype.getParent = function () {
    return this.getCache('parent');
  };

  model.prototype.setName = function (name) {
    this.setCache('name', name);
  };

  model.prototype.getName = function () {
    return this.getCache('name');
  };

  model.prototype.addListener = function (listener) {
    var listeners = this._get_data('listeners');
    if (listeners.indexOf(listener) >= 0) return;
    listeners.push(listener);
    this.updateListenerState(listener);
  };

  model.prototype.removeListener = function (listener) {
    var listeners = this._get_data('listeners');
    var index;
    if ((index = listeners.indexOf(listener)) < 0) return;
    listeners.splice(index, 1);
  };

  model.prototype.get = function (name) {
    return this._get_data(name);
  };

  model.prototype.setDirty = function (dirty) {
    if (dirty) {
      this._set_data('isDirty', true);
      return;
    }
    this._del_data('isDirty');
    this._set_data('originalData', this.getData());
  };

  model.prototype.getDirtyData = function (necessary) {
    var value = this.getData();
    if (necessary !== false && (this._get_data('isDirty') || this._get_data('cDefaultValue') != null))
      return value;
    if (value === this._get_data('originalData')) return;
    return value;
  };

  model.prototype.getData = function () {
    return this._get_data('value');
  };

  model.prototype.setState = function (name, value, ctrlName) {
    if (!ctrlName)
      this._set_data(name, value, true);
    var state = {};
    state[name] = value;
    this.doPropertyChange('setState', state, ctrlName);
  };

  model.prototype.getState = function (name, ctrlName) {
    if (!ctrlName)
      return this._get_data(name);
    var listeners = this._get_data('listeners');
    var listener = listeners.find(function (item) {
      return item.ctrlName === ctrlName;
    });
    if (!listener)
      return this._get_data(name);
    return listener.getState(name);
  };

  model.prototype.fireEvent = function (eventName, args) {
    if (!this.execute('before' + eventName, args)) return;
    this.execute(eventName, args);
    this.execute('after' + eventName, args);
  };

  model.prototype.setProxy = function (config) {
    if (config instanceof cb.rest.DynamicProxy)
      this._set_data('proxy', config);
    else
      this._set_data('proxy', cb.rest.DynamicProxy.create(config));
  };

  model.prototype.getProxy = function () {
    return this._get_data('proxy');
  };

  model.prototype.doPropertyChange = function (name, value, ctrlName) {
    var listeners = this._get_data('listeners');
    if (!listeners.length)
      return listeners;
    var notNotifiedListeners = [];
    if (!ctrlName) {
      listeners.forEach(function (item) {
        if (!this.notifyListener(item, name, value))
          notNotifiedListeners.push(item);
      }, this);
    } else {
      var listener = listeners.find(function (item) {
        return item.ctrlName === ctrlName;
      });
      if (listener) {
        if (!this.notifyListener(listener, name, value))
          notNotifiedListeners.push(item);
      }
    }
    if (notNotifiedListeners.length)
      return notNotifiedListeners;
  };

  model.prototype.notifyListener = function (listener, name, value) {
    if (typeof listener[name] !== 'function')
      return false;
    var propertyName;
    if (name !== 'setState')
      propertyName = this.getName();
    listener[name](value, propertyName);
    return true;
  };

  model.prototype.setReadOnly = function (value, ctrlName) {
    if (this.getState('bCanModify') === false)
      value = true;
    if (this.getState('bNotModify') === false)
      value = false;
    this.setState('readOnly', value, ctrlName);
  };

  model.prototype.getReadOnly = function (ctrlName) {
    return this.getState('readOnly', ctrlName);
  };

  model.prototype.setDisabled = function (value, ctrlName) {
    if (!ctrlName)
      this._set_data('disabled', value, true);
    var notNotifiedListeners = this.doPropertyChange('setDisabled', value, ctrlName);
    if (notNotifiedListeners) {
      var state = { disabled: value };
      notNotifiedListeners.forEach(function (listener) {
        this.notifyListener(listener, 'setState', state);
      }, this);
    }
  };

  model.prototype.getDisabled = function (ctrlName) {
    return this.getState('disabled', ctrlName);
  };

  model.prototype.setVisible = function (value, ctrlName) {
    if (!ctrlName)
      this._set_data('visible', value, true);
    var notNotifiedListeners = this.doPropertyChange('setVisible', value, ctrlName);
    if (notNotifiedListeners) {
      var state = { visible: value };
      notNotifiedListeners.forEach(function (listener) {
        this.notifyListener(listener, 'setState', state);
      }, this);
    }
  };

  model.prototype.getVisible = function (ctrlName) {
    return this.getState('visible', ctrlName);
  };

  model.prototype.setChecking = function (checking) {
    this._set_data('checking', checking);
  };

  model.prototype.setCheckMsg = function (msg) {
    this._set_data('checkMsg', msg);
    var type = msg ? 'error' : '';
    this.doPropertyChange('validate', {
      type: type,
      message: msg
    });
  };

  model.prototype.validate = function (cancel) {
    if (cancel) {
      this._del_data('checking');
      this._del_data('checkMsg');
    }
    var isChecking = this._get_data('checking');
    if (isChecking) {
      this.doPropertyChange('validate', {
        type: 'error',
        message: '正在校验中'
      });
      return false;
    }
    var checkMsg = this._get_data('checkMsg');
    if (checkMsg) {
      this.doPropertyChange('validate', {
        type: 'error',
        message: checkMsg
      });
      return false;
    }
    if (this._get_data('bIsNull') || !cb.utils.isEmpty(this.getData())) {
      this.doPropertyChange('validate', {
        type: '',
        message: ''
      });
      return true;
    }
    var listeners = this.doPropertyChange('validate', {
      type: 'error',
      message: '不能为空'
    });
    // if (listeners && !listeners.length && this._get_data('bShowIt'))
    //   cb.utils.alert(this._get_data('cShowCaption') + '必输', 'error');
    return false;
  };

  model.prototype.on = function (name, callback, context) {
    if (!name || !callback) return;
    var events = this._get_data('events');
    var event = events[name] || (events[name] = []);
    event.push({ callback: callback, context: context });
  };

  model.prototype.un = function (name, callback) {
    var events = this._get_data('events');
    if (!name || !events || !events[name]) return;
    if (!callback) {
      delete events[name];
    } else {
      var index = events[name].findIndex(function (value) {
        if (value.callback === callback)
          return true;
      });
      if (index !== -1)
        events[name].splice(index, 1);
    }
  };

  model.prototype.hasEvent = function (name) {
    if (!name) return;
    var events = this._get_data('events');
    return events && events[name] && events[name].length;
  };

  model.prototype.execute = function (name) {
    if (!name) return;
    var events = this._get_data('events')[name];
    if (!events) return true;
    var result = true;
    var args = Array.prototype.slice.call(arguments, 1);
    events.forEach(function (event) {
      if (result === false) return;
      var returnData;
      if (cb.rest.nodeEnv === 'development') {
        returnData = event.callback.apply(event.context || this, args);
      } else {
        try {
          returnData = event.callback.apply(event.context || this, args);
        } catch (e) {
          console.error('execute[' + name + '] exception: ' + e.stack);
        }
      }
      result = returnData instanceof cb.promise ? returnData : (returnData === false ? false : result);
    }, this);
    return result;
  };

  model.prototype.promiseExecute = function (check, eventName) {
    var name = check;
    var sliceStart = 1;
    if (typeof check === 'boolean') {
      name = eventName;
      sliceStart = 2;
    }
    if (!name) return;
    var args = Array.prototype.slice.call(arguments, sliceStart);
    if (!args.length) return;
    var callbackIndex = args.length - 1;
    var callback = args[callbackIndex];
    if (typeof callback !== 'function') return;
    args.splice(callbackIndex, 1);
    args.unshift(name);
    var returnData = this.execute.apply(this, args);
    if (returnData instanceof cb.promise) {
      var self = this;
      returnData.then(function () {
        callback.apply(self, arguments);
      }, function () {

      });
    } else {
      if (!returnData) return;
      callback.call(this);
    }
  };

  model.prototype.setCache = function (key, value) {
    this._get_data('cache')[key] = value;
  };

  model.prototype.getCache = function (key) {
    return this._get_data('cache')[key];
  };

  model.prototype.clearCache = function (key) {
    delete this._get_data('cache')[key];
  };

  model.prototype.runGC = function () {
    this._cls_data();
  };

  return model;
});
//cb.utils.extend(cb.models.BaseModel.prototype, cb.events);

cb.models.register('SimpleModel', function (modelType) {
  var model = function (data) {
    cb.models.BaseModel.call(this, data);
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.updateListenerState = function (listener) {
    var propertyNames = this._get_data('propertyNames');
    // if (!propertyNames.length) return;
    var state = {};
    propertyNames.forEach(function (propertyName) {
      var data = this._get_data(propertyName);
      if (propertyName === 'value')
        data = getNewValue(data);
      state[propertyName] = data;
    }, this);
    if (this.notifyListener(listener, 'setListenerState', state)) return;
    this.notifyListener(listener, 'setState', state);
  };

  model.prototype.setData = function (data) {
    this.setValue(data);
  };

  model.prototype.clear = function (useDefault) {
    if (useDefault === false) {
      this.setValue();
      return;
    }
    var defaultValue = this._get_data('cDefaultValue');
    this.setValue(defaultValue);
    if (defaultValue == null) return;
    this.execute('afterValueChange', { value: defaultValue, async: false });
  };

  var getNewValue = function (value) {
    if (value == null || typeof value !== 'object')
      return value;
    if (cb.utils.isArray(value))
      return cb.utils.extend(true, [], value);
    return cb.utils.extend(true, {}, value);
  };

  var setValue = function (value) {
    var notNotifiedListeners = this.doPropertyChange('setValue', value);
    if (!notNotifiedListeners) return;
    var state = { value: value };
    notNotifiedListeners.forEach(function (listener) {
      this.notifyListener(listener, 'setState', state);
    }, this);
  }

  model.prototype.setValue = function (value, check) {
    var oldValue = this.getValue();
    if (value === oldValue) return;
    var data = { value: value, oldValue: oldValue };
    if (check && !this.execute('beforeValueChange', data)) {
      if (this._get_data('invalidReset') !== false)
        setValue.call(this, oldValue);
      return;
    }
    this._set_data('value', value, true);
    var newValue = getNewValue(value);
    setValue.call(this, newValue);
    check && this.execute('afterValueChange', data);
  };

  model.prototype.getValue = function () {
    return this.getData();
  };

  return model;
});

cb.models.register('ListModel', function (modelType) {
  var model = function (data) {
    var defaults = {
      allowClear: false,
      multiple: false,
      valueField: 'value',
      textField: 'text',
      dataSource: [],
      dataSourceMode: 'local',
      keyMap: {}
    };
    data = cb.utils.extend({}, defaults, data);
    if (data.bExtend) {
      data.multiple = true;
      delete data.bExtend;
    }
    if (data.cControlType && data.cControlType.trim().toLocaleLowerCase() === 'checkboxenum')
      data.multiple = true;
    cb.models.BaseModel.call(this, data);
    var enumArray = data.enumArray;
    if (enumArray) {
      var obj = JSON.parse(enumArray);
      obj.forEach(function (enumItem) {
        var key = enumItem.key;
        var item = {};
        item[data.valueField] = key;
        item[data.textField] = enumItem.value;
        if (enumItem.nameType)
          item.nameType = enumItem.nameType;
        if (enumItem.icon)
          item.icon = enumItem.icon;
        data.dataSource.push(item);
        data.keyMap[key] = item;
      });
      delete data.enumArray;
    }
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.updateListenerState = function (listener) {
    var propertyNames = this._get_data('propertyNames');
    // if (!propertyNames.length) return;
    var state = {};
    propertyNames.forEach(function (propertyName) {
      var data = this._get_data(propertyName);
      if (propertyName === 'value') {
        var value = getData.call(this);
        data = getNodesByKeys.call(this, value) || value;
      }
      state[propertyName] = data;
    }, this);
    if (this.notifyListener(listener, 'setListenerState', state)) return;
    this.notifyListener(listener, 'setState', state);
  };

  model.prototype.setData = function (data) {
    data = getData.call(this, true, data);
    this._set_data('value', data, true);
    this.doPropertyChange('setValue', getNodesByKeys.call(this, data));
  };

  model.prototype.getData = function () {
    var value = getData.call(this);
    if (cb.utils.isArray(value))
      return value.join(',');
    return value;
  };

  var getData = function (flag, data) {
    var multiple = this._get_data('multiple');
    var value = flag ? data : this._get_data('value');
    if (!multiple)
      return value;
    if (cb.utils.isArray(value))
      return value;
    return value == null ? [] : value.split(',');
  }

  model.prototype.clear = function (useDefault) {
    if (useDefault === false) {
      this.setData();
      return;
    }
    var defaultValue = this._get_data('cDefaultValue');
    this.setData(defaultValue);
    if (defaultValue == null) return;
    this.execute('afterValueChange', { value: getNodesByKeys.call(this, defaultValue), async: false });
  };

  model.prototype.setDataSource = function (proxyConfig, queryParams, callback) {
    if (this._get_data('dataSourceMode') === 'local') {
      var data = proxyConfig;
      if (!this.execute('beforeSetDataSource', data)) return;
      processDataSource.call(this, data);
      this.execute('afterSetDataSource', data);
    } else {
      var proxy = cb.rest.DynamicProxy.create({ queryData: proxyConfig });
      var params = cb.utils.extend(true, {}, queryParams);
      proxy.queryData(params, function (err, result) {
        if (err) {
          // cb.utils.alert(err.message, 'error');
          return;
        }
        if (callback) {
          callback(result);
        } else {
          var data = cb.utils.isArray(result) ? result : [];
          if (!this.execute('beforeSetDataSource', data)) return;
          processDataSource.call(this, data);
          this.execute('afterSetDataSource', data);
        }
      }, this);
    }
  };

  var processDataSource = function (dataSource) {
    // if (!cb.utils.isArray(dataSource) || !dataSource.length) return;
    if (!cb.utils.isArray(dataSource)) return;
    var keyField = this._get_data('valueField');
    dataSource = dataSource.filter(function (item) {
      return item[keyField] != null && item[keyField] !== '';
    });
    // if (!dataSource.length) return;
    this._set_data('dataSource', dataSource, true);
    this.doPropertyChange('setState', { dataSource: dataSource });
    var keyMap = {};
    dataSource.forEach(function (item) {
      keyMap[item[keyField]] = item;
    });
    this._set_data('keyMap', keyMap);
    this.doPropertyChange('setValue', getNodesByKeys.call(this, this.getValue()));
  };

  var getNodesByKeys = function (keys) {
    var keyMap = this._get_data('keyMap');
    if (cb.utils.isArray(keys)) {
      var nodes = [];
      keys.forEach(function (key) {
        nodes.push(keyMap[key]);
      });
      return nodes;
    }
    return keyMap[keys];
  };

  model.prototype.select = function (selectedKeys) {
    var data = getNodesByKeys.call(this, selectedKeys);
    if (!this.execute('beforeSelect', data)) return;
    this.setValue(selectedKeys, true);
    this.execute('select', data);
    this.execute('afterSelect', data);
  };

  model.prototype.getSelectedNodes = function () {
    return getNodesByKeys.call(this, this.getSelectedKeys());
  };

  model.prototype.getSelectedKeys = function () {
    return getData.call(this);
  };

  model.prototype.setValue = function (value, check) {
    value = getData.call(this, true, value);
    var oldValue = this.getValue();
    if (value === oldValue) return;
    var node = getNodesByKeys.call(this, value) || value;
    var oldNode = getNodesByKeys.call(this, oldValue) || oldValue;
    var data = { value: node, oldValue: oldNode };
    // if (check && !this.execute('beforeValueChange', data)) return;
    if (check) {
      this.promiseExecute('beforeValueChange', data, function () {
        this._set_data('value', value, true);
        this.doPropertyChange('setValue', node);
        check && this.execute('afterValueChange', data);
      });
    } else {
      this._set_data('value', value, true);
      this.doPropertyChange('setValue', node);
      check && this.execute('afterValueChange', data);
    }
  };

  model.prototype.getValue = function () {
    return getData.call(this);
  };

  return model;
});

cb.models.register('ReferModel', function (modelType) {
  var model = function (data) {
    var defaults = {
      multiple: false,
      bill2ReferKeyFieldMap: {},
      valueField: 'id',
      textField: 'name',
      separator: ','
    };
    data = cb.utils.extend({}, defaults, data);
    if (data.cRefRetId) {
      var bill2ReferKeyFieldMap = cb.utils.getBill2ReferKeyFieldMap(data.cRefRetId);
      if (!bill2ReferKeyFieldMap) {
        data.delayMap = true;
        var self = this;
        var proxy = cb.rest.DynamicProxy.create({ getDefines: { url: 'aa/userDef/getUserDefs', method: 'POST' } });
        proxy.getDefines({ getpropertytype: true, classid: 'productArchive' }, function (err, result) {
          if (err) {
            console.error('参照自定义项错误：' + err.message);
            return;
          }
          var defineMap = {};
          result.forEach(function (item) {
            defineMap['property' + item.propertytype] = item.defineId;
          });
          self._set_data('defineMap', defineMap);
        });
      } else {
        data.bill2ReferKeyFieldMap = bill2ReferKeyFieldMap;
        delete data.cRefRetId;
      }
    } else {
      data.returnText = true;
      data.checkValid = false;
    }
    if (data.refReturn) {
      data.valueField = data.refReturn;
      delete data.refReturn;
    }
    if (data.displayname) {
      data.textField = data.displayname;
      delete data.displayname;
    } else {
      data.textField = data.valueField;
    }
    if (data.cStyle) {
      try {
        var separator = JSON.parse(data.cStyle).separator;
        if (separator)
          data.separator = separator;
        delete data.cStyle;
      } catch (e) {

      }
    }
    cb.models.BaseModel.call(this, data);
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.updateListenerState = function (listener) {
    var propertyNames = this._get_data('propertyNames');
    // if (!propertyNames.length) return;
    var state = {};
    propertyNames.forEach(function (propertyName) {
      state[propertyName] = this._get_data(propertyName);
    }, this);
    if (state.text)
      state.value = state.text;
    if (cb.utils.isEmpty(state.value))
      state.value = null;
    this.notifyListener(listener, 'setState', state);
    this.execute('afterMount');
  };

  model.prototype.setData = function (data) {
    this._set_data('value', data, true);
    this._set_data('text', data, true);
    this.doPropertyChange('setState', { value: data });
  };

  model.prototype.clear = function (useDefault) {
    this.setData(useDefault === false ? null : this._get_data('cDefaultValue'));
  };

  model.prototype.setTreeFilter = function (filter) {
    this._set_data('treeFilter', filter, true);
  };

  model.prototype.getTreeFilter = function () {
    return this._get_data('treeFilter');
  };

  model.prototype.setFilter = function (filter) {
    this._set_data('filter', filter, true);
  };

  model.prototype.getFilter = function () {
    return this._get_data('filter');
  };

  model.prototype.setCondition = function (condition) {
    this._set_data('condition', condition, true);
  };

  model.prototype.getCondition = function () {
    return this._get_data('condition');
  };

  model.prototype.setReturnFields = function (fields) {
    this._set_data('bill2ReferKeyFieldMap', fields);
  };

  model.prototype.getReturnFields = function () {
    return this._get_data('bill2ReferKeyFieldMap');
  };

  model.prototype.browse = function (ignoreValue, callback) {
    this.promiseExecute('beforeBrowse', function () {
      var billData;
      var viewModel = this.getParent();
      if (viewModel) {
        var gridModel = viewModel.getParent();
        var data;
        if (gridModel) {
          var rowData = viewModel.getNecessaryData();
          viewModel = gridModel.getParent();
          if (viewModel.getParent()) {
            data = viewModel.getNecessaryData();
            data[gridModel.getName()] = [rowData];
            rowData = data;
            gridModel = viewModel.getParent();
            viewModel = gridModel.getParent();
            data = viewModel.getNecessaryData();
            data[gridModel.getName()] = [rowData];
          } else {
            var data = viewModel.getNecessaryData();
            data[gridModel.getName()] = [rowData];
          }
        } else {
          data = viewModel.getNecessaryData();
        }
        billData = {
          key: this.getName(),
          bSelfDefine: this._get_data('bSelfDefine'),
          cSelfDefineType: this._get_data('cSelfDefineType'),
          billnum: viewModel.getParams() && viewModel.getParams().billNo,
          data: JSON.stringify(data)
        }
      } else {
        var filterModel = this._get_data('filterModel');
        if (filterModel) {
          var filterViewModel = filterModel.getParent();
          billData = {
            key: filterModel.getName(),
            bSelfDefine: this._get_data('bSelfDefine'),
            cSelfDefineType: this._get_data('cSelfDefineType'),
            billnum: filterViewModel.getParams().cardKey,
            externalData: 'filter'
          }
        }
      }
      var where = {
        billData: billData,
        treeFilter: this.getTreeFilter(),
        filter: this.getFilter(),
        condition: this.getCondition(),
        select: this.getSelectedNodes(),
        // value: this.getValue(),
        treeMaxLevel: this.getState('maxLevel')
      };
      if (!ignoreValue)
        where.value = this._get_data('text'); // this.getValue();
      if (callback)
        where.enterFire = true;
      where.checkValid = this._get_data('checkValid');
      var ctrlType = this._get_data('cControlType') || this._get_data('ctrlType');
      where.allData = ctrlType && ctrlType.trim().toLocaleLowerCase() === 'listrefer';
      var vm = this.getCache('vm');
      if (vm) {
        cb.utils.extend(vm.getParams(), { where: where });
        vm.initData();
        if (callback)
          callback(vm);
        return;
      }
      var self = this;
      var afterInit = function (data) {
        if (data.defineMap) {
          if (!self._get_data('delayMap')) return;
          var selfDefineMap = self._get_data('defineMap');
          if (!selfDefineMap) return;
          var dataDefineMap = data.defineMap;
          var defineMap = {};
          for (var attr in selfDefineMap)
            defineMap[attr] = dataDefineMap[selfDefineMap[attr]];
          var bill2ReferKeyFieldMap = cb.utils.getBill2ReferKeyFieldMap(self._get_data('cRefRetId'), defineMap);
          self._set_data('bill2ReferKeyFieldMap', bill2ReferKeyFieldMap);
        } else {
          if (data.enterFire) return;
          self.doPropertyChange('open', { vm: this, referType: data.cTplType });
          self.execute('afterBrowse');
        }
      };
      var afterOkClick = function (value) {
        self.setValue(value, true);
      };
      vm = cb.loader.initRefer(this._get_data('cRefType'), this._get_data('multiple'), where, afterInit, afterOkClick);
      this.setCache('vm', vm);
      if (callback)
        callback(vm);
    });
  };

  var getReferObj = function (value) {
    var textField = this._get_data('textField');
    var valueField = this._get_data('valueField');
    var separator = this._get_data('separator');
    var text = [], select, value1;
    if (!this._get_data('multiple')) {
      if (!value.length) {
        select = value;
        text.push('');
        value1 = null;
      } else {
        select = value[0];
        text.push(select[textField]);
        value1 = select[valueField];
      }
    } else {
      select = value;
      value1 = [];
      select.forEach(function (item) {
        if (!item.hasOwnProperty(textField) || !item.hasOwnProperty(valueField)) return;
        text.push(item[textField]);
        value1.push(item[valueField]);
      });
    }
    return { text: text.join(separator), select: select, value: value1 };
  };

  var setReferCarrier = function (value) {
    if (this._get_data('multiple')) return;
    var viewModel = this.getParent();
    if (!viewModel) return;
    if (!value || !value.length)
      value = [{}];
    var select = value[0];
    var bill2ReferKeyFieldMap = this._get_data('bill2ReferKeyFieldMap');
    for (var billKey in bill2ReferKeyFieldMap) {
      var billItem = viewModel.get(billKey);
      if (!billItem) {
        console.error('参照携带字段' + billKey + '未在表单中定义');
        continue;
      }
      var itemValue = select[bill2ReferKeyFieldMap[billKey]];
      if (itemValue == null)
        itemValue = null;
      billItem.setValue(itemValue);
    }
  };

  model.prototype.setValue = function (value, check) {
    if (cb.utils.isArray(value)) {
      var referObj = getReferObj.call(this, value);
      var oldValue = this.getSelectedNodes();
      var data = { value: referObj.select, oldValue: oldValue, obj: referObj };
      if (check) {
        this.promiseExecute('beforeValueChange', data, function () {
          this._set_data('value', referObj.value, true);
          this._set_data('select', referObj.select, true);
          this._set_data('text', referObj.text, true);
          this.doPropertyChange('setValue', referObj.text);
          setReferCarrier.call(this, value);
          this.execute('afterValueChange', data);
        });
      } else {
        this._set_data('value', referObj.value, true);
        this._set_data('select', referObj.select, true);
        this._set_data('text', referObj.text, true);
        this.doPropertyChange('setValue', referObj.text);
        setReferCarrier.call(this, value);
      }
    } else {
      var oldValue = this.getSelectedNodes();
      var data = { value: value, oldValue: oldValue };
      if (check) {
        this.promiseExecute('beforeValueChange', data, function () {
          this.setData(value);
          if (this._get_data('checkValid') !== false)
            setReferCarrier.call(this, value);
          this.execute('afterValueChange', data);
        });
      } else {
        this.setData(value);
      }
    }
  };

  model.prototype.getValue = function () {
    return this.getData();
  };

  model.prototype.getSelectedNodes = function () {
    return this._get_data('select');
  };

  model.prototype.setRefCode = function (code) {
    this._set_data('cRefType', code, true);
    this.clearCache('vm');
  };

  model.prototype.setRefReturn = function (ret) {
    this._set_data('textField', ret);
  };

  return model;
});

cb.models.register('TagModel', function (modelType) {
  var model = function (data) {
    var defaults = {
      multiple: true,
      bill2ReferKeyFieldMap: {},
      refer2BillKeyFieldMap: {},
      textField: 'name',
      convert: true,
      selfCollected: false,
      needRefCode: false,
      innerStatusField: '_status'
    };
    data = cb.utils.extend({}, defaults, data);
    try {
      var obj = JSON.parse(data.cRefRetId);
      for (var billKey in obj) {
        var referKey = obj[billKey];
        data.bill2ReferKeyFieldMap[billKey] = referKey;
        data.refer2BillKeyFieldMap[referKey] = billKey;
      }
      delete data.cRefRetId;
      if (data.refReturn) {
        if (data.refer2BillKeyFieldMap[data.refReturn]) {
          data.selfCollected = true;
        } else {
          data.refer2BillKeyFieldMap[data.refReturn] = data.cItemName;
        }
        data.textField = data.refer2BillKeyFieldMap[data.refReturn];
        delete data.refReturn;
        data.convert = false;
      } else {
        if (data.refer2BillKeyFieldMap[data.cItemName])
          data.selfCollected = true;
      }
      if (data.columns) {
        for (var attr in data.columns) {
          data.refer2BillKeyFieldMap[attr] = attr;
        }
      }
    } catch (e) {
      console.error('Tag关联定义' + data.cRefRetId + '有错误');
    }
    cb.models.BaseModel.call(this, data);
    if (data.columns)
      setEditRowModel.call(this);
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.updateListenerState = function (listener) {
    var propertyNames = this._get_data('propertyNames');
    // if (!propertyNames.length) return;
    var state = {};
    propertyNames.forEach(function (propertyName) {
      var data = this._get_data(propertyName);
      if (propertyName === 'value')
        data = getShowValue.call(this);
      state[propertyName] = data;
    }, this);
    if (this.notifyListener(listener, 'setListenerState', state)) return;
    this.notifyListener(listener, 'setState', state);
  };

  model.prototype.validate = function () {
    if (this._get_data('bIsNull')) return true;
    var rows = this._get_data('showValue');
    if (rows && rows.length) {
      this.doPropertyChange('validate', {
        type: '',
        message: ''
      });
      return true;
    }
    var listeners = this.doPropertyChange('validate', {
      type: 'error',
      message: '不能为空'
    });
    // if (listeners && !listeners.length)
    //   cb.utils.alert(this._get_data('cShowCaption') + '必输', 'error');
    return false;
  };

  var getData = function (dirty, view) {
    var data = [], rowIndexes = dirty ? [] : null;
    var value = this._get_data('value');
    if (!value || !value.length) {
      if (dirty) return;
      return data;
    }
    var valueState = this._get_data('valueState'),
      showValue = this._get_data('showValue'),
      statusFlag = this._get_data('innerStatusField'),
      selfCollected = this._get_data('selfCollected'),
      textField = this._get_data('textField'),
      item, itemState;
    for (var i = 0, len = value.length; i < len; i++) {
      itemState = valueState[i];
      if (dirty && itemState === cb.models.DataStates.Unchanged || view && itemState === cb.models.DataStates.Delete) continue;
      item = {};
      for (var key in value[i]) {
        if (!selfCollected && !view && key === textField) continue;
        item[key] = value[i][key];
      }
      if (!view)
        item[statusFlag] = itemState;
      data.push(item);
      if (dirty && itemState !== cb.models.DataStates.Delete)
        rowIndexes.push(showValue.indexOf(value[i]));
    }
    if (dirty) {
      if (!data.length) return;
      this._set_data('dirtyRowIndexes', rowIndexes);
    }
    return data;
  };

  model.prototype.getDirtyData = function () {
    if (this._get_data('isDirty'))
      return this.getData();
    return getData.call(this, true);
  };

  model.prototype.getDirtyRowIndexes = function () {
    return this._get_data('dirtyRowIndexes');
  };

  model.prototype.getData = function () {
    return getData.call(this);
  };

  model.prototype.getAllData = function () {
    return getData.call(this, false, true);
  };

  model.prototype.setData = function (data) {
    if (cb.utils.isArray(data))
      setValue.call(this, data);
  };

  model.prototype.clear = function () {
    setValue.call(this, []);
  };

  var setValue = function (data) {
    this._set_data('value', data, true);
    initValueState.call(this);
    this.doPropertyChange('setValue', getShowValue.call(this));
  }

  var initValueState = function () {
    var value = this._get_data('value');
    var statusFlag = this._get_data('innerStatusField');
    var valueState = new Array(value.length);
    for (var i = 0, len = value.length; i < len; i++)
      valueState[i] = value[i][statusFlag] || cb.models.DataStates.Unchanged;
    this._set_data('valueState', valueState);
  };

  var getShowValue = function () {
    var showValue = [];
    var value = this._get_data('value');
    if (!value || !value.length) {
      this._set_data('showValue', showValue, true);
      return;
    }
    var newValue = [];
    var valueState = this._get_data('valueState');
    for (var i = 0, len = value.length; i < len; i++) {
      if (valueState[i] === cb.models.DataStates.Delete) continue;
      newValue.push(value[i]);
    }
    var sortField = this._get_data('sortField');
    if (sortField) {
      newValue.forEach(function (item, index) {
        if (cb.utils.isEmpty(item[sortField]))
          item[sortField] = index;
      });
      newValue.sort(function (a, b) {
        return a[sortField] - b[sortField];
      });
    }
    var needConvert = this._get_data('convert');
    var hasColumns = this._get_data('columns');
    var textField = this._get_data('textField');
    var showValue1 = [];
    for (var i = 0, len = newValue.length; i < len; i++) {
      showValue.push(newValue[i]);
      showValue1.push(needConvert || hasColumns ? cb.utils.extend(true, {}, newValue[i]) : newValue[i][textField]);
    }
    this._set_data('showValue', showValue, true);
    return showValue1;
  };

  model.prototype.getShowValue = function () {
    return this._get_data('showValue');
  };

  model.prototype.getShowValueCount = function () {
    return this._get_data('showValue').length;
  };

  model.prototype.setTreeFilter = function (filter) {
    this._set_data('treeFilter', filter, true);
  };

  model.prototype.getTreeFilter = function () {
    return this._get_data('treeFilter');
  };

  model.prototype.setFilter = function (filter) {
    this._set_data('filter', filter, true);
  };

  model.prototype.getFilter = function () {
    return this._get_data('filter');
  };

  model.prototype.setCondition = function (condition) {
    this._set_data('condition', condition, true);
  };

  model.prototype.getCondition = function (condition) {
    return this._get_data('condition');
  };

  var transferBill2Refer = function (value) {
    var newValue = [];
    if (!value || !value.length) {
      this._set_data('showValue', value, true);
      return newValue;
    }
    var valueState = this._get_data('valueState');
    var bill2ReferKeyFieldMap = this._get_data('bill2ReferKeyFieldMap');
    var showValue = [];
    value.forEach(function (item, index) {
      if (valueState[index] === cb.models.DataStates.Delete) return;
      var referItem = {};
      for (var billKey in bill2ReferKeyFieldMap)
        referItem[bill2ReferKeyFieldMap[billKey]] = item[billKey];
      newValue.push(referItem);
      showValue.push(item);
    });
    this._set_data('showValue', showValue, true);
    return newValue;
  };

  var transferRefer2Bill = function (value) {
    if (!value || !value.length)
      return value;
    var needRefCode = this._get_data('needRefCode');
    var refCode = this._get_data('cRefType');
    var refer2BillKeyFieldMap = this._get_data('refer2BillKeyFieldMap');
    var newValue = [];
    value.forEach(function (item) {
      var billItem = {};
      if (needRefCode)
        billItem.refCode = refCode;
      for (var referKey in refer2BillKeyFieldMap)
        billItem[refer2BillKeyFieldMap[referKey]] = item[referKey];
      newValue.push(billItem);
    });
    return newValue;
  };

  var getReferSelectedRowIndexes = function (data) {
    var value = this.getValue();
    if (!value || !value.length) return;
    var valueState = this._get_data('valueState');
    var bill2ReferKeyFieldMap = this._get_data('bill2ReferKeyFieldMap');
    var selectedRowIndexes = [];
    value.forEach(function (item, index) {
      if (valueState[index] === cb.models.DataStates.Delete) return;
      for (var i = 0, len = data.length; i < len; i++) {
        var flag = true;
        for (var billKey in bill2ReferKeyFieldMap) {
          var referKey = bill2ReferKeyFieldMap[billKey];
          if (data[i][referKey] === item[billKey]) continue;
          flag = false;
        }
        if (flag) {
          selectedRowIndexes.push(i);
          return;
        }
      }
    });
    return selectedRowIndexes;
  };

  var getReferSelectedKeys = function (keyMap) {
    var value = this.getValue();
    if (!value || !value.length) return;
    var valueState = this._get_data('valueState');
    var bill2ReferKeyFieldMap = this._get_data('bill2ReferKeyFieldMap');
    var selectedKeys = [];
    value.forEach(function (item, index) {
      if (valueState[index] === cb.models.DataStates.Delete) return;
      for (var attr in keyMap) {
        var flag = true;
        for (var billKey in bill2ReferKeyFieldMap) {
          var referKey = bill2ReferKeyFieldMap[billKey];
          if (keyMap[attr][referKey] === item[billKey]) continue;
          flag = false;
        }
        if (flag) {
          selectedKeys.push(attr);
          return;
        }
      }
    });
    return selectedKeys;
  };

  model.prototype.browse = function (allData) {
    this.promiseExecute('beforeBrowse', function () {
      var billData;
      var viewModel = this.getParent();
      if (viewModel) {
        var gridModel = viewModel.getParent();
        var rowData = gridModel ? viewModel.getNecessaryData() : null;
        while (viewModel.getParent())
          viewModel = viewModel.getParent();
        var data = viewModel.getNecessaryData();
        if (rowData)
          data[gridModel.getName()] = [rowData];
        billData = {
          key: this.getName(),
          billnum: viewModel.getParams().billNo,
          data: JSON.stringify(data)
        }
      }
      var where = {
        billData: billData,
        treeFilter: this.getTreeFilter(),
        filter: this.getFilter(),
        condition: this.getCondition()
      };
      where.allData = allData;
      var vm = this.getCache('vm');
      if (vm) {
        cb.utils.extend(vm.getParams(), { where: where });
        vm.initData();
        return;
      }
      var self = this;
      var afterInit = function (data) {
        if (data.defineMap) return;
        self.doPropertyChange('open', { vm: this, referType: data.cTplType });
        self.execute('afterBrowse');
      };
      var afterOkClick = function (value) {
        // self.setValue(transferRefer2Bill.call(self, value), true);
        self.setValue(value, true);
      };
      vm = cb.loader.initRefer(this._get_data('cRefType'), this._get_data('multiple'), where, afterInit, afterOkClick);
      this.setCache('vm', vm);
      vm.get('table').on('afterSetDataSource', function (data) {
        self._set_data('referDataSource', data);
        this.select(getReferSelectedRowIndexes.call(self, data));
      });
      vm.get('tree').on('afterSetDataSource', function () {
        self._del_data('referDataSource');
        this.check(getReferSelectedKeys.call(self, this._get_data('keyMap')));
      });
    });
  };

  model.prototype.setValue = function (value, check) {
    var oldValue = this.getValue();
    var data = { value: value, oldValue: oldValue };
    value = transferRefer2Bill.call(this, value);
    if (check) {
      this.promiseExecute('beforeValueChange', data, function () {
        setValueInner.call(this, value, oldValue);
        this.execute('afterValueChange', data);
      });
    } else {
      setValueInner.call(this, value, oldValue);
    }
  };

  var setValueInner = function (value, oldValue) {
    var referDataSource = this._get_data('referDataSource');
    var valueState = this._get_data('valueState');
    var bill2ReferKeyFieldMap = this._get_data('bill2ReferKeyFieldMap');
    var deleteIndexes = [];
    for (var i = 0, len = oldValue.length; i < len; i++) {
      var oldValueItem = oldValue[i];
      var flag = false;
      if (referDataSource) {
        var j, len1 = referDataSource.length;
        for (j = 0; j < len1; j++) {
          var dataItem = referDataSource[j];
          var flag1 = true;
          for (var billKey in bill2ReferKeyFieldMap) {
            if (dataItem[bill2ReferKeyFieldMap[billKey]] === oldValueItem[billKey]) continue;
            flag1 = false;
            break;
          }
          if (flag1) break;
        }
        if (j === len1)
          flag = true;
      }
      if (flag) {
        // if (valueState[i] === cb.models.DataStates.Delete)
        //   valueState[i] = cb.models.DataStates.Unchanged;
        continue;
      }
      for (var j = 0, len1 = value.length; j < len1; j++) {
        var valueItem = value[j];
        var flag1 = true;
        for (var billKey in bill2ReferKeyFieldMap) {
          if (valueItem[billKey] === oldValueItem[billKey]) continue;
          flag1 = false;
        }
        if (flag1) {
          flag = true;
          break;
        }
      }
      if (flag) {
        if (valueState[i] === cb.models.DataStates.Delete)
          valueState[i] = cb.models.DataStates.Unchanged;
        continue;
      }
      deleteIndexes.push(i);
    }
    for (var i = deleteIndexes.length - 1; i >= 0; i--) {
      var index = deleteIndexes[i];
      if (valueState[index] === cb.models.DataStates.Insert) {
        valueState.splice(index, 1);
        oldValue.splice(index, 1);
      } else {
        valueState[index] = cb.models.DataStates.Delete;
      }
    }
    var insertItems = {};
    for (var i = 0, len = value.length; i < len; i++) {
      var valueItem = value[i];
      var flag = false;
      for (var j = 0, len1 = oldValue.length; j < len1; j++) {
        var oldValueItem = oldValue[j];
        var flag1 = true;
        for (var billKey in bill2ReferKeyFieldMap) {
          if (oldValueItem[billKey] === valueItem[billKey]) continue;
          flag1 = false;
        }
        if (flag1) {
          flag = true;
          break;
        }
      }
      if (flag) continue;
      insertItems[i] = valueItem;
    }
    for (var index in insertItems) {
      // oldValue.splice(index, 0, insertItems[index]);
      // valueState.splice(index, 0, cb.models.DataStates.Insert);
      oldValue.push(insertItems[index]);
      valueState.push(cb.models.DataStates.Insert)
    }
    this.doPropertyChange('setValue', getShowValue.call(this));
  };

  model.prototype.getValue = function () {
    return this._get_data('value');
  };

  model.prototype.deleteItem = function (index) {
    this.promiseExecute('beforeValueChange', function () {
      var value = this.getValue();
      var valueState = this._get_data('valueState');
      var indexInValue = value.indexOf(this._get_data('showValue')[index]);
      if (valueState[indexInValue] === cb.models.DataStates.Insert) {
        valueState.splice(indexInValue, 1);
        value.splice(indexInValue, 1);
      } else {
        valueState[indexInValue] = cb.models.DataStates.Delete;
      }
      this.doPropertyChange('setValue', getShowValue.call(this));
      this.execute('afterValueChange');
    });
  };

  model.prototype.setCellValue = function (index, cellName, cellValue) {
    var value = this.getValue();
    var valueState = this._get_data('valueState');
    var showValue = this._get_data('showValue');
    var indexInValue = value.indexOf(showValue[index]);
    value[indexInValue][cellName] = cellValue;
    var currentDataState = valueState[indexInValue];
    if (currentDataState !== cb.models.DataStates.Insert && currentDataState !== cb.models.DataStates.Delete)
      valueState[indexInValue] = cb.models.DataStates.Update;
    this.doPropertyChange('setValue', getShowValue.call(this));
  };

  model.prototype.setCellValues = function (values) {
    var value = this.getValue();
    var valueState = this._get_data('valueState');
    var showValue = this._get_data('showValue');
    values.forEach(function (item) {
      var indexInValue = value.indexOf(showValue[item.index]);
      value[indexInValue][item.cellName] = item.cellValue;
      var currentDataState = valueState[indexInValue];
      if (currentDataState !== cb.models.DataStates.Insert && currentDataState !== cb.models.DataStates.Delete)
        valueState[indexInValue] = cb.models.DataStates.Update;
    });
    this.doPropertyChange('setValue', getShowValue.call(this));
  };

  model.prototype.deleteItems = function (indexes) {
    if (!cb.utils.isArray(indexes))
      indexes = [indexes];
    var value = this.getValue();
    var valueState = this._get_data('valueState');
    var showValue = this._get_data('showValue');
    indexes.sort(function (i, j) {
      return i - j;
    });
    for (var i = indexes.length - 1; i >= 0; i--) {
      var index = indexes[i];
      var indexInValue = value.indexOf(showValue[index]);
      if (valueState[indexInValue] === cb.models.DataStates.Insert) {
        valueState.splice(indexInValue, 1);
        value.splice(indexInValue, 1);
      } else {
        valueState[indexInValue] = cb.models.DataStates.Delete;
      }
    }
    this.doPropertyChange('setValue', getShowValue.call(this));
    this.execute('afterValueChange');
  };

  model.prototype.setMultiple = function (multiple) {
    this._set_data('multiple', multiple);
    this.clearCache('vm');
  };

  model.prototype.setRefCode = function (code, cRefRetId) {
    this._set_data('cRefType', code, true);
    if (cRefRetId) {
      try {
        var obj = JSON.parse(cRefRetId), bill2ReferKeyFieldMap = {}, refer2BillKeyFieldMap = {};
        for (var billKey in obj) {
          var referKey = obj[billKey];
          bill2ReferKeyFieldMap[billKey] = referKey;
          refer2BillKeyFieldMap[referKey] = billKey;
        }
        this._set_data('bill2ReferKeyFieldMap', bill2ReferKeyFieldMap);
        this._set_data('refer2BillKeyFieldMap', refer2BillKeyFieldMap);
      } catch (e) {
        console.error('Tag关联定义' + cRefRetId + '有错误');
      }
    }
    this.clearCache('vm');
  };

  model.prototype.setFocusedRowIndex = function (index) {
    if (index === this._get_data('focusedRowIndex')) return;
    updateEditRowModel.call(this, index, this.getRow(index));
  };

  model.prototype.getRow = function (rowIndex) {
    return cb.utils.extend(true, {}, this._get_data('value')[rowIndex]);
  };

  model.prototype.getEditRowModel = function () {
    return this._get_data('editRowModel');
  };

  var updateEditRowModel = function (index, row) {
    this._set_data('focusedRowIndex', index);
    var editRowModel = this.getEditRowModel();
    editRowModel.clear(false);
    editRowModel.setData(row);
    editRowModel.setReadOnly(this.getReadOnly());
  };

  var setEditRowModel = function () {
    this._set_data('focusedRowIndex', -1);
    var columns = this._get_data('columns'), column, controlType, model;
    var fields = {};
    for (var attr in columns) {
      column = columns[attr];
      controlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
      if (controlType === 'attachment') {
        model = new cb.models.TagModel(cb.utils.extend(true, {}, column));
        model.on('afterValueChange', function () {
          var context = this.getParent().getParent();
          var index = context._get_data('focusedRowIndex');
          otherValueChange.call(context, index, this.getName(), this.getData());
        });
      }
      fields[attr] = model;
    }
    model = new cb.models.ContainerModel();
    model.setParent(this);
    model.setData(fields);
    model.setReadOnly(true);
    this._set_data('editRowModel', model);
  };

  var otherValueChange = function (rowIndex, cellName, data) {
    this.setCellValue(rowIndex, cellName, data, true);
  };

  return model;
});

cb.models.register('ReportModel', function (modelType) {
  var model = function (data) {
    cb.models.BaseModel.call(this, data);
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.hideColumn = function (columnName) {
    this.getParent().communication({
      type: 'hideColumn',
      payload: {
        componentName: this.getName(),
        columnName: columnName
      }
    })
  };

  return model;
});

cb.models.register('FilterModel', function (modelType) {
  var model = function (data) {
    var defaults = {
      between: false
    };
    data = cb.utils.extend({}, defaults, data);
    initData.call(this, data);
    cb.models.BaseModel.call(this, data);
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  var initData = function (data) {
    data.between = data.compareLogic === 'between';
    var newData = cb.utils.extend(true, {}, data);
    var ctrlType = data.ctrlType && data.ctrlType.trim().toLocaleLowerCase();
    var multiple = ctrlType === 'predicatedatepicker' || data.multSelect === 0 ? false : true;
    if (ctrlType === 'tagbutton')
      multiple = true;
    switch (ctrlType) {
      case 'refer':
      case 'treerefer':
      case 'listrefer':
        data.fromModel = new cb.models.ReferModel(cb.utils.extend(true, {
          multiple: multiple,
          checkValid: false,
          value: data.value1,
          filterModel: this
        }, newData));
        if (data.between)
          data.toModel = new cb.models.ReferModel(cb.utils.extend(true, {
            multiple: multiple,
            checkValid: false,
            value: data.value2,
            filterModel: this
          }, newData));
        break;
      case 'select':
      case 'tagbutton':
      case 'radio':
      case 'predicatedatepicker':
        data.fromModel = new cb.models.ListModel(cb.utils.extend(true, {
          multiple: multiple,
          allowClear: true,
          value: data.value1
        }, newData));
        if (data.between)
          data.toModel = new cb.models.ListModel(cb.utils.extend(true, {
            multiple: multiple,
            allowClear: true,
            value: data.value2
          }, newData));
        break;
      default:
        data.fromModel = new cb.models.SimpleModel(cb.utils.extend(true, { value: data.value1 }, newData));
        if (data.between)
          data.toModel = new cb.models.SimpleModel(cb.utils.extend(true, { value: data.value2 }, newData));
        break;
    }
  };

  model.prototype.getFromModel = function () {
    return this._get_data('fromModel');
  };

  model.prototype.getToModel = function () {
    return this._get_data('toModel');
  };

  model.prototype.getFromDisplayModel = function () {
    var ctrlType = this._get_data('ctrlType');
    ctrlType = ctrlType && ctrlType.trim().toLocaleLowerCase();
    if (ctrlType !== 'cascader') return;
    var fromModel = this.getFromModel();
    if (!fromModel) return;
    var displayField = fromModel._get_data('displayname');
    if (!displayField) return;
    return this.getParent().get(displayField);
  };

  model.prototype.getDirtyData = function () {
    return this.getData(true);
  };

  model.prototype.getData = function (dirty) {
    var ctrlType = this._get_data('ctrlType');
    ctrlType = ctrlType && ctrlType.trim().toLocaleLowerCase();
    if (ctrlType === 'predicatedatepicker')
      return this.getFromModel().getValue();
    var rawData = { value1: getValue(ctrlType, this.getFromModel(), dirty) };
    if (this._get_data('between')) {
      rawData.value2 = getValue(ctrlType, this.getToModel(), dirty);
      if (ctrlType === 'datepicker') {
        if (rawData.value1) {
          if (rawData.value1.length < 19)
            rawData.value1 += ' 00:00:00';
        }
        if (rawData.value2) {
          if (rawData.value2.length < 19)
            rawData.value2 += ' 23:59:59';
        }
      }
    }
    return rawData;
  };

  var getValue = function (ctrlType, model, dirty) {
    var value = model.getValue();
    switch (ctrlType) {
      case 'refer':
      case 'treerefer':
      case 'listrefer':
        if (cb.utils.isEmpty(value) || cb.utils.isArray(value) && !value.length)
          return null;
        if (!dirty)
          return value;
        var selectItems = model.getState('select');
        return cb.utils.isArray(value) ? selectItems : [selectItems];
      case 'tagbutton':
        return cb.utils.isArray(value) ? value.join(',') : value;
      case 'select':
        if (cb.utils.isEmpty(value) || cb.utils.isArray(value) && !value.length)
          return null;
        return value;
      default:
        return value;
    }
  }

  model.prototype.setDirty = function () {

  };

  return model;
});

cb.models.register('TreeModel', function (modelType) {
  var model = function (data) {
    var defaults = {
      multiple: false,
      checkable: false,
      expandAll: false,
      keyField: 'key',
      titleField: 'title',
      childrenField: 'children',
      parentField: 'parent',
      dataSource: [],
      dataSourceMode: 'local',
      keyMap: {},
      needConvert: false,
      defaultSelectedKeys: false
    };
    data = cb.utils.extend({}, defaults, data);
    cb.models.BaseModel.call(this, data);
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.updateListenerState = function (listener) {
    var propertyNames = this._get_data('propertyNames');
    var data = {};
    propertyNames.forEach(function (key) {
      if (key === 'dataSourceMode' || key === 'keyMap') return;
      data[key] = this._get_data(key);
      if (key === 'value' && data[key])
        data[key] = this.getNodesByKeys(data[key]);
      if (key === 'columns')
        data[key] = getVisibleColumns(data[key]);
    }, this);
    if (this.notifyListener(listener, 'setListenerState', data)) return;
    this.notifyListener(listener, 'setState', data);
  };

  model.prototype.columnSetting = function (code) {
    var viewModel = this.getParent();
    while (viewModel.getParent())
      viewModel = viewModel.getParent();
    viewModel.execute('columnSetting', { name: this.getName(), code: code });
  };

  model.prototype.getTitleData = function (billNo, tplid, groupCode) {
    var url = '/getTitleData/' + billNo + '/' + (tplid || 0) + '/' + groupCode;
    var proxyConfig = { url: url, method: 'GET', options: { uniform: false } };
    var proxy = cb.rest.DynamicProxy.create({ queryData: proxyConfig });
    proxy.queryData({}, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      var titleList = [];
      result.forEach(function (ele) {
        if (ele.bHidden) return;
        titleList.push(ele);
      });
      this.doPropertyChange('setTitle', titleList);
    }, this);
  };

  model.prototype.setTitleData = function (listData) {
    var url = '/setTitleData';
    var proxyConfig = { url: url, method: 'POST', options: { uniform: false } };
    var proxy = cb.rest.DynamicProxy.create({ queryData: proxyConfig });
    proxy.queryData(listData, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      var columns = {};
      listData.forEach(function (title) {
        if (title.bHidden || !title.bShowIt) return;
        columns[title.cItemName] = title;
      });
      this.setColumns(columns);
    }, this);
  };

  model.prototype.setActionsState = function (actionState) {
    if (!actionState || !actionState.length) return;
    if (!this.execute('beforeSetActionsState', actionState)) return;
    this.doPropertyChange('setActionsState', actionState);
    this.execute('afterSetActionsState', actionState);
  }

  model.prototype.setColumns = function (columns) {
    var oldColumns = this._get_data('columns') || {};
    for (var attr in columns)
      columns[attr] = cb.utils.extend(oldColumns[attr] || {}, columns[attr]);
    for (var attr in oldColumns) {
      if (columns[attr]) continue;
      columns[attr] = cb.utils.extend(oldColumns[attr], { bShowIt: false });
    }
    if (!this.execute('beforeSetColumns', columns)) return;
    this._set_data('columns', columns, true);
    this.doPropertyChange('setColumns', getVisibleColumns(columns));
    this.execute('afterSetColumns', columns);
  };

  var getVisibleColumns = function (columns) {
    var visibleColumns = {}, column;
    for (var attr in columns) {
      column = columns[attr];
      if (column.bHidden || !column.bShowIt) continue;
      var ctrlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
      if (ctrlType === 'select') {
        var model = new cb.models.ListModel(column);
        column.textField = model._get_data('textField');
        column.keyMap = model._get_data('keyMap');
      }
      visibleColumns[attr] = column;
    }
    return visibleColumns;
  };

  model.prototype.setData = function (data) {
    var parentField = this._get_data('parentField');
    var value = [];
    while (data) {
      value.push(data);
      var nodes = this.getNodesByKeys(data);
      data = nodes[0][parentField];
    }
    this.setValue(value.reverse());
  };

  model.prototype.clear = function () {
    this.setValue([]);
  };

  model.prototype.setDataSource = function (proxyConfig, queryParams, callback) {
    if (this._get_data('dataSourceMode') === 'local') {
      var data = proxyConfig;
      if (!this.execute('beforeSetDataSource', data)) return;
      processDataSource.call(this, data, this._get_data('defaultSelectedKeys'));
      this.execute('afterSetDataSource', data);
    } else {
      var proxy = cb.rest.DynamicProxy.create({ queryData: proxyConfig });
      var params = cb.utils.extend(true, {}, queryParams);
      proxy.queryData(params, function (err, result) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }
        var data = cb.utils.isArray(result) ? result : [];
        var needConvert = this._get_data('needConvert');
        if (needConvert)
          data = convert.call(this, data);
        if (callback) {
          callback(data);
        } else {
          if (!this.execute('beforeSetDataSource', data)) return;
          processDataSource.call(this, data, this._get_data('defaultSelectedKeys'));
          this.execute('afterSetDataSource', data);
        }
      }, this);
    }
  };

  var convert = function (result) {
    var obj = {};
    result.forEach(function (item) {
      var newItem = cb.utils.extend({}, item);
      delete newItem.parent;
      obj[item.id] = newItem;
    });
    var options = [];
    var childrenField = this._get_data('childrenField');
    result.forEach(function (item) {
      if (item.parent) {
        var parent = obj[item.parent];
        if (!parent) return;
        if (!parent[childrenField])
          parent[childrenField] = [];
        parent[childrenField].push(obj[item.id]);
      } else {
        options.push(obj[item.id]);
      }
    });
    return options;
  }

  model.prototype.addNode = function (node, defaultSelect) {
    var keyField = this._get_data('keyField');
    var key = node[keyField];
    if (key == null) return;
    var parentKey = node.parent;
    var dataSource = this._get_data('dataSource');
    var keyMap = this._get_data('keyMap');
    if (parentKey) {
      var parentData = keyMap[parentKey];
      if (!parentData) return;
      var childrenField = this._get_data('childrenField');
      if (!parentData[childrenField])
        parentData[childrenField] = [];
      parentData[childrenField].push(node);
    } else {
      dataSource.push(node);
    }
    this.doPropertyChange('setDataSource', dataSource);
    processTreeNode.call(this, node, keyMap);
    if (defaultSelect)
      this.select(key.toString());
  };

  model.prototype.deleteNode = function (key) {
    var node = this._get_data('keyMap')[key];
    if (!node) return;
    var dataSource = this._get_data('dataSource');
    if (cb.utils.isArray(dataSource)) {
      deleteNode.call(this, dataSource, node);
    } else {
      deleteNode.call(this, dataSource[this._get_data('childrenField')], node);
    }
    processDataSource.call(this, dataSource);
  };

  var deleteNode = function (nodes, node) {
    if (!nodes || !nodes.length) return;
    var index = nodes.indexOf(node);
    if (index === -1) {
      var childrenField = this._get_data('childrenField');
      nodes.forEach(function (item) {
        deleteNode.call(this, item[childrenField], node);
        if (item[childrenField] && !item[childrenField].length)
          delete item[childrenField];
      }, this);
    } else {
      nodes.splice(index, 1);
    }
  };

  model.prototype.updateNodes = function (nodes) {
    if (!cb.utils.isArray(nodes)) return;
    var len = nodes.length;
    var noRender = true;
    nodes.map((node, index) => {
      if (len == index + 1) noRender = false;
      this.updateNode(node, noRender)
    });
  }
  model.prototype.updateNode = function (node, noRender) {
    var keyField = this._get_data('keyField');
    var key = node[keyField];
    if (key == null) return;
    var keyMap = this._get_data('keyMap');
    var currentData = keyMap[key];
    if (!currentData) return;
    var dataSource = this._get_data('dataSource');
    if (currentData.parent != node.parent) { // 顶级节点 undefined null 对比
      if (currentData.parent && !node.parent) {
        var parentData = keyMap[currentData.parent];
        if (!parentData) return;
        var childrenField = this._get_data('childrenField');
        if (!parentData[childrenField] || !parentData[childrenField].length) return;
        var index = parentData[childrenField].indexOf(currentData);
        if (index === -1) return;
        parentData[childrenField].splice(index, 1);
        if (!parentData[childrenField].length)
          delete parentData[childrenField];
        dataSource.push(currentData);
      } else if (!currentData.parent && node.parent) {
        var index = dataSource.indexOf(currentData);
        if (index === -1) return;
        dataSource.splice(index, 1);
        var parentData = keyMap[node.parent];
        if (!parentData) return;
        var childrenField = this._get_data('childrenField');
        if (!parentData[childrenField])
          parentData[childrenField] = [];
        parentData[childrenField].push(currentData);
      } else {
        var parentData = keyMap[currentData.parent];
        if (!parentData) return;
        var childrenField = this._get_data('childrenField');
        if (!parentData[childrenField] || !parentData[childrenField].length) return;
        var index = parentData[childrenField].indexOf(currentData);
        if (index === -1) return;
        parentData[childrenField].splice(index, 1);
        if (!parentData[childrenField].length)
          delete parentData[childrenField];
        parentData = keyMap[node.parent];
        if (!parentData) return;
        if (!parentData[childrenField])
          parentData[childrenField] = [];
        parentData[childrenField].push(currentData);
      }
    }
    // for (var attr in node) {
    //   if (!currentData.hasOwnProperty(attr)) continue;
    //   currentData[attr] = node[attr];
    // }
    cb.utils.extend(currentData, node);
    if (noRender) return
    this.doPropertyChange('setDataSource', dataSource);
  };

  var updateNodeRecursive = function (node, field, value) {
    node[field] = value;
    var childrenField = this._get_data('childrenField');
    if (!node[childrenField]) return;
    node[childrenField].forEach(function (item) {
      updateNodeRecursive.call(this, item, field, value);
    }, this);
  };

  model.prototype.updateNodeRecursive = function (node, field, value) {
    var keyField = this._get_data('keyField');
    var key = node[keyField];
    if (key == null) return;
    var keyMap = this._get_data('keyMap');
    var currentData = keyMap[key];
    if (!currentData) return;
    updateNodeRecursive.call(this, currentData, field, value);
    this.doPropertyChange('setDataSource', this._get_data('dataSource'));
  };

  var processDataSource = function (dataSource, defaultSelectedKeys) {
    var keyMap = {};
    if (cb.utils.isArray(dataSource)) {
      dataSource.forEach(function (item) {
        processTreeNode.call(this, item, keyMap);
      }, this);
    } else {
      processTreeNode.call(this, dataSource, keyMap);
    }
    this._set_data('keyMap', keyMap);
    this._set_data('dataSource', dataSource, true);
    this.doPropertyChange('setDataSource', dataSource);
    if (!defaultSelectedKeys) return;
    if (cb.utils.isArray(defaultSelectedKeys)) {
      this.select(defaultSelectedKeys);
    } else {
      if (!cb.utils.isArray(dataSource) || !dataSource.length) return;
      var key = dataSource[0][this._get_data('keyField')];
      if (key == null) return;
      this.select(key.toString());
    }
  };

  var processTreeNode = function (node, keyMap) {
    var keyField = this._get_data('keyField');
    if (node[keyField] == null) return;
    keyMap[node[keyField]] = node;
    var childrenField = this._get_data('childrenField');
    var maxLevel = this._get_data('maxLevel');
    if (maxLevel && node.level === maxLevel)
      delete node[childrenField];
    if (!node[childrenField] || !node[childrenField].length) return;
    node[childrenField].forEach(function (item) {
      processTreeNode.call(this, item, keyMap);
    }, this);
  };

  model.prototype.getNodesByKeys = function (keys) {
    var keyMap = this._get_data('keyMap');
    var nodes = [];
    if (keys == null) {
      for (var key in keyMap) {
        nodes.push(keyMap[key]);
      }
    } else {
      keys = cb.utils.isArray(keys) ? keys : [keys];
      keys.forEach(function (key) {
        nodes.push(keyMap[key]);
      });
    }
    return nodes;
  };

  model.prototype.select = function (selectedKeys) {
    selectedKeys = cb.utils.isArray(selectedKeys) ? selectedKeys : [selectedKeys];
    var data = this.getNodesByKeys(selectedKeys);
    if (!this.execute('beforeSelect', data)) return;
    this._set_data('selectedKeys', selectedKeys, true);
    this.doPropertyChange('setState', { selectedKeys: selectedKeys });
    this.setValue(selectedKeys, true);
    this.execute('select', data);
    this.execute('afterSelect', data);
  };

  model.prototype.getSelectedNodes = function () {
    return this.getNodesByKeys(this.getSelectedKeys());
  };

  model.prototype.getSelectedKeys = function () {
    return this._get_data('selectedKeys') || [];
  };

  model.prototype.check = function (checkedKeys) {
    var data = this.getNodesByKeys(checkedKeys);
    if (!this.execute('beforeCheck', data)) return;
    this._set_data('checkedKeys', checkedKeys, true);
    this.doPropertyChange('setState', { checkedKeys: checkedKeys });
    this.execute('check', data);
    this.execute('afterCheck', data);
  };

  model.prototype.getCheckedNodes = function () {
    return this.getNodesByKeys(this.getCheckedKeys());
  };

  model.prototype.getCheckedKeys = function () {
    return this._get_data('checkedKeys');
  };

  model.prototype.setValue = function (value, check) {
    var oldValue = this.getValue();
    if (value === oldValue) return;
    var node = this.getNodesByKeys(value);
    var oldNode = this.getNodesByKeys(oldValue);
    var data = { value: node, oldValue: oldNode };
    if (check && !this.execute('beforeValueChange', data)) return;
    this._set_data('value', value, true);
    this.doPropertyChange('setValue', node);
    check && this.execute('afterValueChange', data);
  };

  model.prototype.getValue = function () {
    return this.getData();
  };

  model.prototype.isFirst = function (node) {
    var parentKey = node.parent;
    var dataSource = this._get_data('dataSource');
    var keyMap = this._get_data('keyMap');
    if (parentKey) {
      var parentData = keyMap[parentKey];
      if (!parentData) return;
      var childrenField = this._get_data('childrenField');
      var nodes = parentData[childrenField];
      if (!nodes) return;
      return nodes.indexOf(node) === 0;
    }
    return dataSource.indexOf(node) === 0;
  };

  model.prototype.isLast = function (node) {
    var parentKey = node.parent;
    var dataSource = this._get_data('dataSource');
    var keyMap = this._get_data('keyMap');
    if (parentKey) {
      var parentData = keyMap[parentKey];
      if (!parentData) return;
      var childrenField = this._get_data('childrenField');
      var nodes = parentData[childrenField];
      if (!nodes) return;
      return nodes.indexOf(node) === nodes.length - 1;
    }
    return dataSource.indexOf(node) === dataSource.length - 1;
  };

  return model;
});

cb.models.DataStates = {
  Insert: 'Insert',
  Update: 'Update',
  Delete: 'Delete',
  Unchanged: 'Unchanged'
};

cb.models.register('GridModel', function (modelType) {
  var model = function (data) {
    var defaults = {
      columns: {},
      dataSource: [],
      rows: [],
      readOnly: true,
      dataSourceMode: 'local',
      columnMode: 'local',
      editMode: 'cell',
      cellState: {},
      autoWrap: true,
      mergeCells: false,
      showAggregates: true,
      showSubtotal: false,
      multiSort: true,
      sortFields: [],
      showCheckBox: true,
      multiple: true,
      showRowNo: false,
      showColumnSetting: true,
      pagination: true,
      pageInfo: {
        pageSize: 10,
        pageIndex: 1
      },
      independent: false,
      defaultSelectedRowIndexes: false,
      innerUsedAttrs: {
        id: '_id',
        selected: '_selected',
        status: '_status'
      }
    };
    data = cb.utils.extend({}, defaults, data);
    if (!data.fieldNames)
      data.fieldNames = getFieldNames(data.columns);
    cb.models.BaseModel.call(this, data);
    initColumns.call(this, data.columns);
    if (data.dataSource.length)
      setIds.call(this, data.dataSource);
    this.initRowState();
    if (data.independent)
      this.afterInit();
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.afterInit = function () {
    setEditRowModel.call(this);
  };

  var initColumns = function (columns) {
    for (var attr in columns) {
      var column = columns[attr];
      var controlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase();
      if (controlType === 'table' || controlType === 'attachment') {
        this.setCache('grandson', { attr: attr, column: column });
      }
    }
    var grandson = this.getCache('grandson');
    if (grandson && !columns[grandson.attr])
      columns[grandson.attr] = grandson.column;
  }

  var getVisibleColumns = function (columns) {
    var visibleColumns = {}, column;
    for (var attr in columns) {
      column = columns[attr];
      if (column.bHidden === false && column.bShowIt)
        visibleColumns[attr] = column;
    }
    return visibleColumns;
  };

  //获取过滤结果数据
  model.prototype.setFilter = function (attr, col, params) {
    var rows = this._get_data('rows');
    var data = [];
    if (!rows && params.sort === "")
      return;
    if (params.sort === 'init') {
      var dataSource = this._get_data('dataSource');
      this._set_data('rows', cb.utils.extend(true, [], dataSource));
      this.doPropertyChange('setDataSource', getShowRows.call(this, cb.utils.extend(true, [], dataSource)));
    } else {
      if (rows) {
        if (params.filter.length === 0 || params.filter === 'all') {
          data = rows;
        } else {
          rows.forEach(function (row, index) {
            params.filter.forEach(function (item) {
              if (row[attr] == item) {
                data.push(row);
              }
            });
          });
        }
      }
      if (params.sort !== "") {
        data.sort((indexA, indexB) => {
          var valueA = typeof indexA[attr] === 'undefined' ? '' : indexA[attr];
          var valueB = typeof indexB[attr] === 'undefined' ? '' : indexB[attr];
          var sortVal = 0;
          if (params.sort === 'DESC') {
            if (valueA > valueB) {
              sortVal = 1;
            }
            if (valueA < valueB) {
              sortVal = -1;
            }
          } else {
            if (valueA > valueB) {
              sortVal = -1;
            }
            if (valueA < valueB) {
              sortVal = 1;
            }
          }

          return sortVal;
        });
      }
      this._set_data('rows', data);
      this.doPropertyChange('setDataSource', getShowRows.call(this, data));
    }
  }

  //获取过滤界面所需数据
  model.prototype.getFilterData = function (attr, col) {
    var rows = this._get_data('dataSource');
    var key = '';
    var FilterDataList = [];
    if (rows) {
      rows.forEach(function (row, index) {
        var bPush = true;
        switch (col.cControlType) {
          case 'Refer':
            key = typeof row[attr] === 'object' ? row[attr].name : row[attr];
            break;
          case 'Select':
            key = typeof row[attr] === 'object' ? row[attr].text : row[attr];
            break;
          default:
            key = row[attr];
        }
        if (index === 0) {
          FilterDataList.push(key)
        }
        FilterDataList.forEach(function (item) {
          if (key === item) {
            bPush = false;
          }
        })
        if (bPush && key !== undefined) {
          FilterDataList.push(key)
        }
      });
    }
    return FilterDataList.length ? FilterDataList : null;
  }

  model.prototype.updateListenerState = function (listener) {
    var columns = this._get_data('columns');
    var data = {
      columns: getVisibleColumns(columns),
      columnMode: this._get_data('columnMode'),
      rows: getShowRows.call(this, this._get_data('rows')),
      readOnly: this._get_data('readOnly'),
      mergeCells: this._get_data('mergeCells'),
      showAggregates: this._get_data('showAggregates'),
      showSubtotal: this._get_data('showSubtotal'),
      showCheckBox: this._get_data('showCheckBox'),
      multiple: this._get_data('multiple'),
      showRowNo: this._get_data('showRowNo'),
      pagination: this._get_data('pagination'),
      showColumnSetting: this._get_data('showColumnSetting'),
      multiSort: this._get_data('multiSort'),
      cellState: this._get_data('cellState')
    };
    if (data.pagination)
      data.pageInfo = this._get_data('pageInfo');
    this.notifyListener(listener, 'setListenerState', data);
    this.execute('afterMount');
  };

  model.prototype.setData = function (data) {
    if (data.columns)
      this.setColumns(data.columns, cb.utils.isArray(data.fieldNames) ? data.fieldNames : null);
    if (cb.utils.isArray(data))
      this.setDataSource(data);
  };

  model.prototype.validate = function () {
    var rows = this._get_data('rows');
    if (rows.length) {
      var columns = getVisibleColumns(this._get_data('columns')), items = [], row, column;
      for (var i = 0, len = rows.length; i < len; i++) {
        row = rows[i];
        for (var attr in columns) {
          column = columns[attr];
          if (column.bIsNull || row[attr] != null) continue;
          items.push({ rowIndex: i, cellName: attr });
        }
      }
      if (items.length) {
        var listeners = this.doPropertyChange('validate', {
          type: 'error',
          message: '不能为空',
          data: items
        });
        // if (listeners && !listeners.length)
        //   cb.utils.alert(this._get_data('cShowCaption') + '必输', 'error');
        return false;
      }
      this.doPropertyChange('validate', {
        type: '',
        message: ''
      });
      return true;
    }
    if (this._get_data('bIsNull')) return true;
    var listeners = this.doPropertyChange('validate', {
      type: 'error',
      message: '不能为空'
    });
    // if (listeners && !listeners.length)
    //   cb.utils.alert(this._get_data('cShowCaption') + '必输', 'error');
    return false;
  };

  var getCellDataByCtrlType = function (cell, columnName) {
    if (cell == null)
      return cell;
    var columnModel = this.getEditRowModel().get(columnName);
    if (!(columnModel instanceof cb.models.BaseModel))
      return cell;
    var controlType = columnModel._get_data('cControlType');
    controlType = controlType && controlType.trim().toLocaleLowerCase();
    if (controlType === 'refer' || controlType === 'treerefer' || controlType === 'listrefer')
      return typeof cell === 'object' ? cell[columnModel._get_data('textField')] : cell;
    if (controlType === 'select' || controlType === 'radio')
      return typeof cell === 'object' ? cell[columnModel._get_data('valueField')] : cell;
    if (controlType === 'checkboxenum') {
      if (!cb.utils.isArray(cell))
        return cell;
      var valueField = columnModel._get_data('valueField');
      var values = [];
      cell.forEach(function (item) {
        values.push(item[valueField]);
      });
      return values.join(',');
    }
    if (controlType === 'table') {
      var rows = [];
      cell.forEach(function (item) {
        rows.push(cb.utils.extend(true, {}, item));
      });
      return rows;
    }
    if (controlType === 'labelswitch' || controlType === 'tag' || controlType === 'attachment' || controlType === 'checkboxgroup' || controlType === 'rangepicker')
      return cell;
    return typeof cell === 'object' ? cell.value : cell;
  };

  var getCellText = function (cell, columnName) {
    if (cell == null)
      return cell;
    var columnModel = this.getEditRowModel().get(columnName);
    if (!(columnModel instanceof cb.models.BaseModel))
      return cell;
    var controlType = columnModel._get_data('cControlType');
    controlType = controlType && controlType.trim().toLocaleLowerCase();
    var textField = columnModel._get_data('textField');
    if (controlType === 'refer' || controlType === 'treerefer' || controlType === 'listrefer')
      return typeof cell === 'object' ? (cell[textField] != null ? cell[textField] : null) : cell;
    if (controlType === 'select') {
      if (cell == null)
        return cell;
      if (typeof cell !== 'object') {
        var multiple = columnModel._get_data('multiple');
        var keyMap = columnModel._get_data('keyMap');
        if (multiple) {
          var items = [];
          cell.split(',').forEach(function (item) {
            if (!keyMap[item]) return;
            items.push(keyMap[item][textField]);
          });
          cell = items.join('/');
        } else {
          cell = keyMap[cell];
        }
      }
      return cell;
      return cell && cell[textField];
    }
    if (controlType === 'tag' || controlType === 'attachment' || controlType === 'checkboxgroup') {
      var items = [];
      cell.forEach(function (item) {
        items.push(item[textField]);
      });
      return items;
    }
    if (controlType === 'cascader')
      return columnModel.getNodesByKeys(cell)[0].mergername;
    return cell;
  }

  model.prototype.getDirtyData = function () {
    if (this._get_data('isDirty'))
      return this.getData();
    var data = [], rowIndexes = [];
    var rows = this._get_data('dataSource'), row;
    var rowsDataState = this._get_data('rowsDataState'), dataState;
    var rowsInPage = this._get_data('rows');
    var columns = this._get_data('columns'), column;
    var originalKeyMap = this._get_data('originalKeyMap'), originalRowData;
    var innerUsedAttrs = this._get_data('innerUsedAttrs');
    var idFlag = innerUsedAttrs.id, selectedFlag = innerUsedAttrs.selected, statusFlag = innerUsedAttrs.status;
    var orderField = this._get_data('orderField');
    for (var i = 0; i < rows.length; i++) {
      dataState = rowsDataState[i];
      if (dataState === cb.models.DataStates.Unchanged) continue;
      var rowData = rows[i];
      var rowIndex = rowsInPage.indexOf(rowData);
      if (dataState === cb.models.DataStates.Insert) {
        row = {};
        for (var attr in rowData) {
          if (attr === idFlag || attr === selectedFlag) continue;
          row[attr] = getCellDataByCtrlType.call(this, rowData[attr], attr);
        }
        row[statusFlag] = dataState;
        if (orderField != null)
          row[orderField] = rowIndex;
        data.push(row);
        rowIndexes.push(rowIndex);
      } else if (dataState === cb.models.DataStates.Update) {
        originalRowData = originalKeyMap[rowData[idFlag]];
        row = {};
        var isDirty;
        for (var attr in rowData) {
          if (attr === idFlag || attr === selectedFlag) continue;
          column = columns[attr];
          var value = getCellDataByCtrlType.call(this, rowData[attr], attr);
          if (column && column['bMustSelect']) {
            row[attr] = value;
            isDirty = true;
          } else {
            if (value === originalRowData[attr]) continue;
            row[attr] = value;
            isDirty = true;
          }
        }
        row[statusFlag] = dataState;
        if (isDirty) {
          if (orderField != null)
            row[orderField] = rowIndex;
          data.push(row);
          rowIndexes.push(rowIndex);
        }
      } else if (dataState === cb.models.DataStates.Delete) {
        row = {};
        for (var attr in columns)
          if (columns[attr]['bMustSelect'])
            row[attr] = rowData[attr];
        row[statusFlag] = dataState;
        data.push(row);
      }
    }
    this._set_data('dirtyRowIndexes', rowIndexes);
    if (!data.length) return;
    return data;
  };

  model.prototype.getDirtyRowIndexes = function () {
    return this._get_data('dirtyRowIndexes') || [];
  };

  var getData = function (view) {
    var data = [];
    var rows = this._get_data('dataSource'), row;
    var rowsDataState = this._get_data('rowsDataState'), dataState;
    var rowsInPage = this._get_data('rows');
    var columns = this._get_data('columns'), column;
    var innerUsedAttrs = this._get_data('innerUsedAttrs');
    var idFlag = innerUsedAttrs.id, selectedFlag = innerUsedAttrs.selected, statusFlag = innerUsedAttrs.status;
    var orderField = this._get_data('orderField');
    var grandson = this.getCache('grandson');
    for (var i = 0; i < rows.length; i++) {
      dataState = rowsDataState[i];
      if (view && dataState === cb.models.DataStates.Delete) continue;
      var rowData = rows[i];
      var rowIndex = rowsInPage.indexOf(rowData);
      row = {};
      for (var attr in rowData) {
        if (!view && (attr === idFlag || attr === selectedFlag)) continue;
        row[attr] = getCellDataByCtrlType.call(this, rowData[attr], attr);
      }
      if (view && grandson) {
        var grandsonData = row[grandson.attr];
        if (grandsonData && grandsonData.length) {
          var newGrandsonData = [];
          grandsonData.forEach(function (item) {
            if (item[statusFlag] === cb.models.DataStates.Delete) return;
            delete item[statusFlag];
            newGrandsonData.push(item);
          });
          row[grandson.attr] = newGrandsonData;
        }
      }
      if (!view)
        row[statusFlag] = dataState;
      if (orderField != null) {
        if (rowIndex > -1)
          row[orderField] = rowIndex;
        // if (dataState === cb.models.DataStates.Unchanged)
        //   row[statusFlag] = cb.models.DataStates.Update;
      }
      data.push(row);
    }
    return data;
  };

  model.prototype.getData = function () {
    return getData.call(this);
  };

  model.prototype.getAllData = function () {
    return getData.call(this, true);
  };

  model.prototype.initRowState = function (rowState) {
    var ds = this._get_data('dataSource');
    var statusFlag = this._get_data('innerUsedAttrs').status;
    var grandson = this.getCache('grandson');
    var rowsDataState = new Array(ds.length);
    for (var i = 0, len = ds.length; i < len; i++) {
      rowsDataState[i] = rowState || ds[i][statusFlag] || cb.models.DataStates.Unchanged;
      if (!grandson) continue;
      var grandsonData = ds[i][grandson.attr];
      if (grandsonData && grandsonData.length) {
        grandsonData.forEach(function (item) {
          if (rowState)
            item[statusFlag] = rowState;
          if (item[statusFlag]) return;
          item[statusFlag] = rowsDataState[i];
        });
      }
    }
    this._set_data('rowsDataState', rowsDataState);
  };

  model.prototype.getColumns = function (fields) {
    var columns = this._get_data('columns');
    var column;
    var ret = {};
    if (!fields) {
      for (var attr in columns) {
        column = cb.utils.extend(true, {}, columns[attr]);
        if (!column.fieldName)
          column.fieldName = attr;
        ret[attr] = column;
        // ret.push(column);
      }
    } else {
      if (!cb.utils.isArray(fields))
        fields = [fields];
      fields.forEach(function (field) {
        column = cb.utils.extend(true, {}, columns[field]);
        // if (!column.fieldName)
        //   column.fieldName = field;
        ret[field] = column;
        // ret.push(column);
      });
    }
    return ret;
  };

  model.prototype.getColumn = function (field) {
    var column = cb.utils.extend(true, {}, this._get_data('columns')[field]);
    if (!column.fieldName)
      column.fieldName = field;
    return column;
  };

  model.prototype.hasColumn = function (field) {
    return this._get_data('columns').hasOwnProperty(field);
  };

  var getFieldNames = function (columns) {
    var fieldNames = [];
    for (var field in columns)
      fieldNames.push(field);
    return fieldNames;
  };

  model.prototype.setDirty = function (dirty) {
    if (dirty) {
      this._set_data('isDirty', true);
      return;
    }
    this._del_data('isDirty');
    var originalData = [], originalKeyMap = {};
    var rows = this._get_data('dataSource');
    var idFlag = this._get_data('innerUsedAttrs').id;
    rows.forEach(function (row) {
      var rowData = cb.utils.extend(true, {}, row);
      originalData.push(rowData);
      originalKeyMap[rowData[idFlag]] = rowData;
    });
    this._set_data('originalData', originalData);
    this._set_data('originalKeyMap', originalKeyMap);
  };

  model.prototype.setReadOnly = function (value) {
    if (this.getState('bCanModify') === false)
      value = true;
    if (this.getState('bNotModify') === false)
      value = false;
    // this.setState('readOnly', value);
    this._set_data('readOnly', value);
    this.doPropertyChange('setReadOnly', value);
    if (this._get_data('focusedRowIndex') !== -1)
      this.getEditRowModel().setReadOnly(value);
  };

  model.prototype.setShowCheckbox = function (value) {
    this._set_data("showCheckBox", value);
  }

  model.prototype.setFocusedRowIndex = function (index) {
    if (index === this._get_data('focusedRowIndex')) return false;
    updateEditRowModel.call(this, index, this.getRow(index));
  };

  model.prototype.getFocusedRowIndex = function () {
    return this._get_data('focusedRowIndex');
  };

  model.prototype.getCellValue = function (rowIndex, cellName) {
    var row = rowIndex >= 0 ? this._get_data('rows')[rowIndex] : null;
    if (!row || !cellName) return;
    return getCellDataByCtrlType.call(this, row[cellName], cellName);
  };

  model.prototype.setCellValue = function (rowIndex, cellName, value, check, blur) {
    var row = rowIndex >= 0 ? this._get_data('rows')[rowIndex] : null;
    if (!row || !cellName) return;
    var data = { rowIndex: rowIndex, cellName: cellName, value: value, oldValue: row[cellName] };
    if (check && !this.execute('beforeCellValueChange', data)) return;
    row[cellName] = data.value;
    updateRowState.call(this, rowIndex, cb.models.DataStates.Update);
    this.doPropertyChange('setCellValue', {
      rowIndex: rowIndex,
      cellName,
      value: getCellText.call(this, data.value, cellName)
    });
    if (blur)
      this.doPropertyChange('setCellBlur', { rowIndex: rowIndex, cellName: cellName });
    check && this.execute('afterCellValueChange', data);
    if (rowIndex !== this._get_data('focusedRowIndex')) return;
    updateEditRowModel.call(this, rowIndex, getRow.call(this, row));
  };

  model.prototype.getRowDataState = function (rowIndex) {
    var ds = this._get_data('dataSource'),
      rowsDataState = this._get_data('rowsDataState'),
      rowsInPage = this._get_data('rows');
    if (rowIndex < 0 || rowIndex >= rowsInPage.length) return;
    var indexInDS = ds.indexOf(rowsInPage[rowIndex]);
    return rowsDataState[indexInDS];
  };

  model.prototype.getRowState = function (rowIndex, name) {
    var row = rowIndex >= 0 ? this._get_data('rows')[rowIndex] : null;
    if (!row || !name) return;
    return row[name];
  };

  model.prototype.setRowState = function (rowIndex, name, value) {
    var rows = this._get_data('rows');
    var row = rowIndex >= 0 ? rows[rowIndex] : null;
    if (!row || !name) return;
    var oldValue = this.getRowState(rowIndex, name);
    if (oldValue === value) return;
    var data = { rowIndex: rowIndex, propertyName: name, value: value, oldValue: oldValue };
    if (!this.execute('beforeRowStateChange', data)) return;
    rows[rowIndex][name] = value;
    this.doPropertyChange('setRowState', data);
    this.execute('afterRowStateChange', data);
  };

  model.prototype.setActionState = function (rowIndex, itemName, name, value) {
    var data = { rowIndex: rowIndex, itemName: itemName, name: name, value: value };
    this.doPropertyChange('setActionState', data);

    var actionsState = this._get_data('actionsState');
    actionsState[rowIndex][itemName][name] = value;
    this._set_data('actionsState', actionsState, true);
  };
  model.prototype.setActionsState = function (actionState) {
    if (!actionState || !actionState.length) return;
    if (!this.execute('beforeSetActionsState', actionState)) return;
    this.doPropertyChange('setActionsState', actionState);
    this.execute('afterSetActionsState', actionState);

    this._set_data('actionsState', actionState, true);
  };
  model.prototype.initActionsState = function (actionsState) {
    this._set_data('actionsState', actionsState);
  }
  model.prototype.getActionsState = function () {
    var actionsState = this._get_data('actionsState');
    return actionsState;
  }
  model.prototype.setAction = function () {

  }
  model.prototype.setCompositeLayout = function (rowIndex, itemName, value) {
    var data = { rowIndex: rowIndex, itemName: itemName, value: value };
    this.doPropertyChange('setCompositeLayout', data);
  };
  model.prototype.setCompositeMeta = function (rowIndex, itemName, value) {
    var data = { rowIndex: rowIndex, itemName: itemName, value: value };
    this.doPropertyChange('setCompositeMeta', data);
  }
  model.prototype.getColumnState = function (cellName, name) {
    var col = this._get_data('columns')[cellName];
    if (!col || !name) return;
    return col[name];
  };

  model.prototype.setColumnState = function (cellName, name, value) {
    if (name === 'visible')
      name = 'bShowIt';
    var col = this._get_data('columns')[cellName];
    if (!col || !name) return;
    var oldValue = this.getColumnState(cellName, name);
    if (oldValue === value) return;
    var data = { cellName: cellName, propertyName: name, value: value, oldValue: oldValue };
    if (!this.execute('beforeColumnStateChange', data)) return;
    this._get_data('columns')[cellName][name] = value;
    // this.setColumns(this._get_data('columns'));
    this.doPropertyChange('setColumns', getVisibleColumns(this._get_data('columns')));
    // this.doPropertyChange('setColumnState', data);
    this.execute('afterColumnStateChange', data);
  };

  model.prototype.setColumnValue = function (cellName, value, check) {
    if (!cellName) return;
    var data = { cellName: cellName, value: value };
    if (check && !this.execute('beforeColumnValueChange', data)) return;
    var rows = this._get_data('rows');
    for (var i = 0, len = rows.length; i < len; i++) {
      rows[i][cellName] = value;
      updateRowState.call(this, i, cb.models.DataStates.Update);
    }
    this.showRows();
    check && this.execute('afterColumnValueChange', data);
  };

  model.prototype.getCellState = function (rowIndex, cellName, name) {
    var row = rowIndex >= 0 ? this._get_data('cellState')[rowIndex] : null;
    if (!row || !cellName) return;
    var cell = row[cellName];
    if (!cell) return;
    return cell[name];
  };

  model.prototype.setCellState = function (rowIndex, cellName, name, value) {
    var oldValue = this.getCellState(rowIndex, cellName, name);
    if (oldValue === value) return;
    var data = { rowIndex: rowIndex, cellName: cellName, propertyName: name, value: value, oldValue: oldValue };
    if (!this.execute('beforeCellStateChange', data)) return;
    var rows = this._get_data('cellState');
    var row = rowIndex >= 0 ? rows[rowIndex] : null;
    if (!row)
      row = rows[rowIndex] = {};
    var cell = row[cellName];
    if (!cell)
      rows[rowIndex][cellName] = {};
    rows[rowIndex][cellName][name] = value;
    this.doPropertyChange('setCellState', data);
    this.execute('afterCellStateChange', data);
  };

  model.prototype.setCellStates = function (states) {
    if (!cb.utils.isArray(states)) return;
    var rows = this._get_data('cellState');
    states.forEach(function (item) {
      var rowIndex = item.rowIndex, cellName = item.cellName, name = item.propertyName, value = item.value;
      var row = rowIndex >= 0 ? rows[rowIndex] : null;
      if (!row)
        row = rows[rowIndex] = {};
      var cell = row[cellName];
      if (!cell)
        rows[rowIndex][cellName] = {};
      rows[rowIndex][cellName][name] = value;
    });
    this.doPropertyChange('setCellStates', states);
  };

  model.prototype.setColumns = function (columns, fieldNames) {
    var oldColumns = this._get_data('columns');
    for (var attr in columns)
      columns[attr] = cb.utils.extend(oldColumns[attr] || {}, columns[attr]);
    for (var attr in oldColumns) {
      if (columns[attr]) continue;
      columns[attr] = cb.utils.extend(oldColumns[attr], { bShowIt: false });
    }
    initColumns.call(this, columns);
    if (!this.execute('beforeSetColumns', columns)) return;
    this._set_data('columns', columns, true);
    this._set_data('fieldNames', fieldNames || getFieldNames(columns));
    this.doPropertyChange('setColumns', getVisibleColumns(columns));
    this.execute('afterSetColumns', columns);
    setEditRowModel.call(this);
  };

  model.prototype.addColumns = function (externalColumns) {
    var columns = this._get_data('columns');
    cb.utils.extend(columns, externalColumns);
    this.doPropertyChange('setColumns', getVisibleColumns(columns));
    addEditRowModel.call(this, externalColumns);
    this._set_data('externalColumns', externalColumns);
  };

  model.prototype.resetColumns = function () {
    var externalColumns = this._get_data('externalColumns');
    if (!externalColumns) return;
    var columns = this._get_data('columns');
    for (var attr in externalColumns)
      delete columns[attr];
    this.doPropertyChange('setColumns', getVisibleColumns(columns));
    removeEditRowModel.call(this, externalColumns);
    this._del_data('externalColumns');
  };

  model.prototype.columnSetting = function (code) {
    var viewModel = this.getParent();
    while (viewModel.getParent())
      viewModel = viewModel.getParent();
    viewModel.execute('columnSetting', { name: this.getName(), code: code });
  };

  model.prototype.showRows = function (selected) {
    var rows = [];
    var dataSource = this._get_data('dataSource');
    var rowsDataState = this._get_data('rowsDataState');
    var selectedFlag = this._get_data('innerUsedAttrs').selected;
    for (var i = 0, len = dataSource.length; i < len; i++) {
      if (rowsDataState[i] === cb.models.DataStates.Delete) continue;
      var row = dataSource[i];
      if (selected && row[selectedFlag] !== true) continue;
      rows.push(row);
    }
    this._set_data('rows', rows, true);
    this.doPropertyChange('setDataSource', getShowRows.call(this, rows));
  };

  var getShowRows = function (rows) {
    var showRows = [], showRow;
    rows.forEach(function (row) {
      showRow = {};
      for (var attr in row)
        showRow[attr] = getCellText.call(this, row[attr], attr);
      showRows.push(showRow);
    }, this);
    return showRows;
  };

  model.prototype.clear = function () {
    this._set_data('dataSource', [], true);
    this.initRowState();
    this.showRows();
    updateEditRowModel.call(this, -1);
  };

  model.prototype.setDataSource = function (proxyConfig, queryParams, callback) {
    if (this._get_data('dataSourceMode') === 'local') {
      var data = cb.utils.isArray(proxyConfig) ? proxyConfig : [];
      if (!this.execute('beforeSetDataSource', data)) return;
      this._set_data('dataSource', data, true);
      if (data.length)
        setIds.call(this, data);
      this.initRowState();
      this.showRows();
      this.execute('afterSetDataSource', data);
      var focusedRowIndex = this._get_data('focusedRowIndex');
      if (focusedRowIndex !== -1 && data.length)
        updateEditRowModel.call(this, focusedRowIndex, this.getRow(focusedRowIndex));
      var defaultSelectedRowIndexes = this._get_data('defaultSelectedRowIndexes');
      if (!defaultSelectedRowIndexes) return;
      if (cb.utils.isArray(defaultSelectedRowIndexes)) {
        this.select(defaultSelectedRowIndexes);
      } else {
        if (!data.length) return;
        this.select(0);
      }
    } else {
      var pageInfo = this._get_data('pageInfo');
      pageInfo.pageIndex = 1;
      showPageInner.call(this, proxyConfig, queryParams, callback, true);
      this._set_data('proxyConfig', proxyConfig);
      this._set_data('queryParams', queryParams);
      this._set_data('callback', callback);
    }
  };

  model.prototype.load = function (proxyConfig, params, callback) {
    var proxy = cb.rest.DynamicProxy.create({ load: proxyConfig });
    proxy.load(params, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      if (result.schema) {
        this._set_data('columnMode', 'remote');
        this.setColumns(result.schema);
      }
      this.setDataSource(result.data);
      if (callback)
        callback.call(this);
    }, this);
  };

  var setIds = function (rows) {
    var idFlag = this._get_data('innerUsedAttrs').id;
    rows.forEach(function (row) {
      row[idFlag] = row[idFlag] || cb.utils.getNewId('rowId');
    });
  };

  model.prototype.setPageSize = function (pageSize) {
    if (typeof pageSize !== 'number') return;
    pageSize = Math.max(-1, pageSize);
    var pageInfo = this._get_data('pageInfo');
    pageInfo.pageSize = pageSize;
    pageInfo.pageIndex = 1;
    if (!this.execute('pageInfoChange', pageInfo)) return;
    showPage.call(this, true);
  };

  model.prototype.getPageSize = function () {
    return this._get_data('pageInfo').pageSize;
  };

  model.prototype.setPageIndex = function (pageIndex) {
    if (typeof pageIndex !== 'number') return;
    pageIndex = Math.max(1, pageIndex);
    var pageInfo = this._get_data('pageInfo');
    pageInfo.pageIndex = pageIndex;
    if (!this.execute('pageInfoChange', pageInfo)) return;
    showPage.call(this);
  };

  model.prototype.getPageIndex = function () {
    return this._get_data('pageInfo').pageIndex;
  };

  model.prototype.setPageInfo = function (pageInfo) {
    this._set_data('pageInfo', pageInfo, true);
    this.doPropertyChange('setPageInfo', pageInfo);
  };

  var showPage = function (refresh) {
    var proxyConfig = this._get_data('proxyConfig');
    if (!proxyConfig) return;
    var queryParams = this._get_data('queryParams');
    var callback = this._get_data('callback');
    showPageInner.call(this, proxyConfig, queryParams, callback, refresh);
  };
  model.prototype.getTitleData = function (billNo, tplid, groupCode) {
    var url = "/getTitleData/" + billNo + '/' + (tplid || 0) + "/" + groupCode;
    var proxyConfig = { url: url, method: "GET", options: { uniform: false } };
    var proxy = cb.rest.DynamicProxy.create({ queryData: proxyConfig });
    proxy.queryData({}, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      } else {
        var titleList = [];
        result.forEach(function (ele) {
          if (!ele.bHidden) titleList.push(ele);
        }, this);
        this.doPropertyChange('setTitle', titleList);
      }
    }, this);
  }
  model.prototype.setTitleData = function (listData) {
    var url = "/setTitleData";
    var proxyConfig = { url: url, method: "POST", options: { uniform: false } };
    var proxy = cb.rest.DynamicProxy.create({ queryData: proxyConfig });
    proxy.queryData(listData, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      } else {
        var columns = {};
        listData.forEach(function (title) {
          if (title.bShowIt && !title.bHidden) {
            columns[title.cItemName] = title;
          }
        }, this);
        // this.doPropertyChange('setColumnByTtile', columns);
        this.setColumns(columns);
        // this.doPropertyChange('setColumns', columns);
      }
    }, this);
  }
  var showPageInner = function (proxyConfig, queryParams, callback, refresh) {
    var proxy = cb.rest.DynamicProxy.create({ queryData: proxyConfig });
    var defaultParams = { page: { pageSize: this.getPageSize(), pageIndex: this.getPageIndex() } };
    var params = cb.utils.extend(true, defaultParams, queryParams);
    proxy.queryData(params, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      if (callback)
        callback.call(this, result);
      var data = cb.utils.isArray(result.recordList) ? result.recordList : [];
      if (!this.execute('beforeSetDataSource', data)) return;
      if (!refresh && this._get_data('override') === false) {
        this._set_data('dataSource', this._get_data('dataSource').concat(data), true);
      } else {
        this._set_data('dataSource', data, true);
      }
      if (data.length)
        setIds.call(this, data);
      this.initRowState();
      this.showRows();
      var pageInfo = {
        pageSize: result.pageSize,
        pageIndex: result.pageIndex,
        pageCount: result.pageCount,
        recordCount: result.recordCount
      };
      this.setPageInfo(pageInfo);
      if (result.sumRecordList)
        this.doPropertyChange('setSum', result.sumRecordList);
      this.execute('afterSetDataSource', data);
      var defaultSelectedRowIndexes = this._get_data('defaultSelectedRowIndexes');
      if (!defaultSelectedRowIndexes) return;
      if (cb.utils.isArray(defaultSelectedRowIndexes)) {
        this.select(defaultSelectedRowIndexes);
      } else {
        if (!data.length) return;
        this.select(0);
      }
    }, this);
  };

  model.prototype.select = function (rowIndexes, all) {
    if (rowIndexes == null) return;
    if (!cb.utils.isArray(rowIndexes))
      rowIndexes = [rowIndexes];
    var selectedRowIndexes = all === false ? this.getSelectedRowIndexes().concat(rowIndexes) : rowIndexes;
    if (!this.execute('beforeSelect', selectedRowIndexes)) return;
    var rows = this._get_data('rows');
    var selectedFlag = this._get_data('innerUsedAttrs').selected;
    if (all !== false) {
      rows.forEach(function (row) {
        row[selectedFlag] = false;
      });
    }
    rowIndexes.forEach(function (index) {
      rows[index][selectedFlag] = true;
    });
    var rowIndex = rowIndexes[0];
    if (rowIndex !== this._get_data('focusedRowIndex'))
      updateEditRowModel.call(this, rowIndex, this.getRow(rowIndex));
    this.doPropertyChange('select', selectedRowIndexes);
    this.execute('afterSelect', selectedRowIndexes);
  };

  model.prototype.unselect = function (rowIndexes) {
    if (rowIndexes == null) return;
    if (!cb.utils.isArray(rowIndexes))
      rowIndexes = [rowIndexes];
    if (!this.execute('beforeUnselect', rowIndexes)) return;
    var rows = this._get_data('rows');
    var selectedFlag = this._get_data('innerUsedAttrs').selected;
    rowIndexes.forEach(function (index) {
      rows[index][selectedFlag] = false;
    });
    this.doPropertyChange('unselect', rowIndexes);
    this.execute('afterUnselect', rowIndexes);
  };

  model.prototype.selectAll = function () {
    if (!this.execute('beforeSelectAll')) return;
    var rows = this._get_data('rows');
    var selectedFlag = this._get_data('innerUsedAttrs').selected;
    rows.forEach(function (row) {
      row[selectedFlag] = true;
    });
    this.doPropertyChange('selectAll');
    this.execute('afterSelectAll', rows);
  };

  model.prototype.unselectAll = function () {
    if (!this.execute('beforeUnselectAll')) return;
    var rows = this._get_data('rows');
    var selectedFlag = this._get_data('innerUsedAttrs').selected;
    rows.forEach(function (row) {
      row[selectedFlag] = false;
    });
    this.doPropertyChange('unselectAll');
    this.execute('afterUnselectAll');
  };

  model.prototype.getSelectedRows = function () {
    var selectedRows = [];
    var selectedFlag = this._get_data('innerUsedAttrs').selected;
    var rows = this._get_data('rows'), row;
    for (var i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      if (!row[selectedFlag]) continue;
      selectedRows.push(getRow.call(this, row));
    }
    return selectedRows;
  };

  model.prototype.getSelectedRowIndexes = function () {
    var selectedRowIndexes = [];
    var selectedFlag = this._get_data('innerUsedAttrs').selected;
    var rows = this._get_data('rows');
    for (var i = 0, len = rows.length; i < len; i++) {
      if (!rows[i][selectedFlag]) continue;
      selectedRowIndexes.push(i);
    }
    return selectedRowIndexes;
  };

  model.prototype.getRows = function () {
    var rows = [];
    this._get_data('rows').forEach(function (row) {
      rows.push(getRow.call(this, row));
    }, this);
    return rows;
  };

  model.prototype.getRowsCount = function () {
    return this._get_data('rows').length;
  };

  model.prototype.updateRow = function (rowIndex, rowData) {
    // if (this.getReadOnly()) return;
    var row = this._get_data('rows')[rowIndex];
    cb.utils.extend(true, row, rowData);
    this.doPropertyChange('updateRow', { index: rowIndex, row: getShowRows.call(this, [row])[0] });
    updateRowState.call(this, rowIndex, cb.models.DataStates.Update);
    if (rowIndex !== this._get_data('focusedRowIndex')) return;
    updateEditRowModel.call(this, rowIndex, getRow.call(this, row));
    // this.execute('afterUpdateRow', { index: rowIndex, row: getShowRows.call(this, [row])[0] });
  };

  model.prototype.updateRows = function (rowIndexes, rowDatas) {
    var rows = this._get_data('rows');
    var resultRows = [];
    for (var i = 0, len = rowIndexes.length; i < len; i++) {
      var rowIndex = rowIndexes[i];
      var row = rows[rowIndex];
      cb.utils.extend(true, row, rowDatas[i]);
      resultRows.push(row);
      updateRowState.call(this, rowIndex, cb.models.DataStates.Update);
    }
    this.doPropertyChange('updateRow', { index: rowIndexes, row: getShowRows.call(this, resultRows) });
  };

  model.prototype.insertRow = function (rowIndex, rowData) {
    // if (this.getReadOnly()) return;
    var row = cb.utils.extend(true, {}, getDefaultRowData.call(this), rowData);
    setIds.call(this, [row]);
    var rows = this._get_data('rows');
    var index = Math.min(rows.length, Math.max(0, rowIndex));
    var data = { index: index, row: row };
    if (!this.execute('beforeInsertRow', data)) return;
    var ds = this._get_data('dataSource');
    var indexInDS = rows.length ? (rows[index] ? ds.indexOf(rows[index]) : ds.indexOf(rows[rows.length - 1]) + 1) : 0;
    this._get_data('dataSource').splice(indexInDS, 0, row);
    this._get_data('rowsDataState').splice(indexInDS, 0, cb.models.DataStates.Insert);
    rows.splice(index, 0, row);
    this.doPropertyChange('insertRow', cb.utils.extend(true, {}, data));
    this.execute('afterInsertRow', data);
    return data
  };

  model.prototype.insertRows = function (rowIndex, rowDatas) {
    if (this.getReadOnly() || !cb.utils.isArray(rowDatas)) return;
    var rows = [], states = [], row;
    rowDatas.forEach(function (rowData) {
      // row = cb.utils.extend(true, {}, getDefaultRowData.call(this), rowData);
      /*modify by jinzh1 参照选择多行 带到表体  枚举显示问题*/
      row = cb.utils.extend(true, {}, getDefaultRowData.call(this), getShowRows.call(this, [rowData])[0]);
      rows.push(row);
      states.push(cb.models.DataStates.Insert);
    }, this);
    setIds.call(this, rows);
    var rowsInPage = this._get_data('rows');
    var index = Math.min(rowsInPage.length, Math.max(0, rowIndex));
    var data = { index: index, rows: rows };
    if (!this.execute('beforeInsertRows', data)) return;
    var ds = this._get_data('dataSource');
    var indexInDS = rowsInPage.length ? (rowsInPage[index] ? ds.indexOf(rowsInPage[index]) : ds.indexOf(rowsInPage[rowsInPage.length - 1]) + 1) : 0;
    this._get_data('dataSource').splice.apply(this._get_data('dataSource'), [indexInDS, 0].concat(rows));
    this._get_data('rowsDataState').splice.apply(this._get_data('rowsDataState'), [indexInDS, 0].concat(states));
    rowsInPage.splice.apply(rowsInPage, [index, 0].concat(rows));
    this.doPropertyChange('insertRows', cb.utils.extend(true, {}, data));
    this.execute('afterInsertRows', data);
    return data
  };

  model.prototype.batchInsertRow = function (data) {
    if (this.getReadOnly() || !cb.utils.isArray(data)) return;
    var rows = this._get_data('rows');
    var ds = this._get_data('dataSource');
    var rowsDataState = this._get_data('rowsDataState');
    var renderRows = [];
    data.forEach(function (item) {
      var rowIndex = item.rowIndex, rowData = item.rowData;
      var row = cb.utils.extend(true, {}, getDefaultRowData.call(this), rowData);
      setIds.call(this, [row]);
      var index = Math.min(rows.length, Math.max(0, rowIndex));
      var indexInDS = rows.length ? (rows[index] ? ds.indexOf(rows[index]) : ds.indexOf(rows[rows.length - 1]) + 1) : 0;
      ds.splice(indexInDS, 0, row);
      rowsDataState.splice(indexInDS, 0, cb.models.DataStates.Insert);
      rows.splice(index, 0, row);
      renderRows.push({ rowIndex: index, rowData: cb.utils.extend(true, {}, row) });
    }, this);
    this.doPropertyChange('batchInsertRow', renderRows);
  };

  model.prototype.shiftUpRow = function (rowIndex) {
    if (rowIndex <= 0) return;
    var ds = this._get_data('dataSource'),
      rowsDataState = this._get_data('rowsDataState'),
      rows = this._get_data('rows');
    var currentRow = rows[rowIndex];
    var swapRow = rows[rowIndex - 1];
    var currentRowIndexInDS = ds.indexOf(currentRow);
    var swapRowIndexInDS = ds.indexOf(swapRow);
    rows.splice(rowIndex, 1);
    rows.splice(rowIndex - 1, 0, currentRow);
    if (rowsDataState[swapRowIndexInDS] !== cb.models.DataStates.Insert)
      rowsDataState[swapRowIndexInDS] = cb.models.DataStates.Update;
    var currentRowDataState = rowsDataState[currentRowIndexInDS] === cb.models.DataStates.Insert ?
      cb.models.DataStates.Insert :
      cb.models.DataStates.Update;
    rowsDataState.splice(currentRowIndexInDS, 1);
    rowsDataState.splice(swapRowIndexInDS, 0, currentRowDataState);
    ds.splice(currentRowIndexInDS, 1);
    ds.splice(swapRowIndexInDS, 0, currentRow);
    this.doPropertyChange('setDataSource', getShowRows.call(this, rows));
  };

  model.prototype.shiftDownRow = function (rowIndex) {
    var rows = this._get_data('rows'),
      length = rows.length;
    if (rowIndex >= length - 1) return;
    var ds = this._get_data('dataSource'),
      rowsDataState = this._get_data('rowsDataState');
    var currentRow = rows[rowIndex];
    var swapRow = rows[rowIndex + 1];
    var currentRowIndexInDS = ds.indexOf(currentRow);
    var swapRowIndexInDS = ds.indexOf(swapRow);
    rows.splice(rowIndex + 1, 1);
    rows.splice(rowIndex, 0, swapRow);
    if (rowsDataState[currentRowIndexInDS] !== cb.models.DataStates.Insert)
      rowsDataState[currentRowIndexInDS] = cb.models.DataStates.Update;
    var swapRowDataState = rowsDataState[swapRowIndexInDS] === cb.models.DataStates.Insert ?
      cb.models.DataStates.Insert :
      cb.models.DataStates.Update;
    rowsDataState.splice(swapRowIndexInDS, 1);
    rowsDataState.splice(currentRowIndexInDS, 0, swapRowDataState);
    ds.splice(swapRowIndexInDS, 1);
    ds.splice(currentRowIndexInDS, 0, swapRow);
    this.doPropertyChange('setDataSource', getShowRows.call(this, rows));
  };

  model.prototype.appendRow = function (rowData) {
    // if (this.getReadOnly()) return;
    var row = cb.utils.extend(true, {}, getDefaultRowData.call(this), rowData);
    setIds.call(this, [row]);
    var rows = this._get_data('rows');
    var index = rows.length;
    var data = { index: index, row: row };
    if (!this.execute('beforeInsertRow', data)) return;
    this._get_data('dataSource').push(row);
    this._get_data('rowsDataState').push(cb.models.DataStates.Insert);
    rows.push(row);
    this.doPropertyChange('insertRow', cb.utils.extend(true, {}, data));
    this.select(index);
    this.execute('afterInsertRow', data);
    checkDefaultRowData.call(this, index, row);
    return data
  };

  model.prototype.deleteRows = function (rowIndexes) {
    // if (this.getReadOnly()) return;
    if (!cb.utils.isArray(rowIndexes))
      rowIndexes = [rowIndexes];
    var rows = this.getRowsByIndexes(rowIndexes);
    if (!this.execute('beforeDeleteRows', rows)) return;
    var ds = this._get_data('dataSource'),
      rowsDataState = this._get_data('rowsDataState'),
      rowsInPage = this._get_data('rows'),
      length = rowsInPage.length,
      rowIndex,
      indexInDS;
    rowIndexes.sort(function (i, j) {
      return i - j;
    });
    var focusedRowIndex = -1;
    if (rowIndexes.length === 1 && rowsInPage.length > 1)
      focusedRowIndex = rowIndexes[0] === rowsInPage.length - 1 ? rowIndexes[0] - 1 : rowIndexes[0];
    for (var i = rowIndexes.length - 1; i >= 0; i--) {
      rowIndex = rowIndexes[i];
      if (rowIndex < 0 || rowIndex >= length) continue;
      indexInDS = ds.indexOf(rowsInPage[rowIndex]);
      rowsInPage.splice(rowIndex, 1);
      if (rowsDataState[indexInDS] === cb.models.DataStates.Insert) {
        rowsDataState.splice(indexInDS, 1);
        ds.splice(indexInDS, 1);
      } else {
        rowsDataState[indexInDS] = cb.models.DataStates.Delete;
      }
    }
    this.doPropertyChange('deleteRows', rowIndexes);
    this.doPropertyChange('setDataSource', getShowRows.call(this, rowsInPage));
    updateEditRowModel.call(this, -1);
    if (focusedRowIndex !== -1)
      this.select(focusedRowIndex);
    this.execute('afterDeleteRows', rows);
    return rows
  };

  model.prototype.getRowsByIndexes = function (rowIndexes) {
    var rows = [];
    if (!cb.utils.isArray(rowIndexes))
      rowIndexes = [rowIndexes];
    rowIndexes.forEach(function (rowIndex) {
      rows.push(this.getRow(rowIndex));
    }, this);
    return rows;
  };

  model.prototype.getRow = function (rowIndex) {
    return getRow.call(this, this._get_data('rows')[rowIndex]);
  };

  var getRow = function (rowData) {
    var innerUsedAttrs = this._get_data('innerUsedAttrs');
    var idFlag = innerUsedAttrs.id, selectedFlag = innerUsedAttrs.selected;
    var row = {};
    for (var attr in rowData) {
      // if (attr === idFlag || attr === selectedFlag) continue;
      if (attr === selectedFlag) continue;
      row[attr] = getCellDataByCtrlType.call(this, rowData[attr], attr);
    }
    return row;
  };

  var updateRowState = function (rowIndex, dataState) {
    var rowsDataState = this._get_data('rowsDataState');
    var ds = this._get_data('dataSource'),
      rowsInPage = this._get_data('rows');
    var indexInDS = ds.indexOf(rowsInPage[rowIndex]);
    var currentDataState = rowsDataState[indexInDS];
    if (currentDataState !== cb.models.DataStates.Insert && currentDataState !== cb.models.DataStates.Delete)
      rowsDataState[indexInDS] = dataState;
  };

  var getDefaultRowData = function () {
    var rowData = {};
    var editRowModel = this.getEditRowModel();
    var propertyNames = editRowModel._get_data('propertyNames');
    var columnModel, defaultValue, ctrlType;
    propertyNames.forEach(function (propertyName) {
      columnModel = editRowModel.get(propertyName);
      if (!(columnModel instanceof cb.models.BaseModel)) return;
      defaultValue = columnModel._get_data('cDefaultValue');
      if (defaultValue == null) return;
      ctrlType = columnModel._get_data('cControlType');
      ctrlType = ctrlType && ctrlType.trim().toLocaleLowerCase();
      if (ctrlType === 'select') {
        rowData[propertyName] = columnModel._get_data('keyMap')[defaultValue];
      } else {
        rowData[propertyName] = defaultValue;
      }
    });
    return rowData;
  };

  var checkDefaultRowData = function (rowIndex, rowData) {
    var editRowModel = this.getEditRowModel();
    var propertyNames = editRowModel._get_data('propertyNames');
    var columnModel, defaultValue, ctrlType;
    propertyNames.forEach(function (propertyName) {
      columnModel = editRowModel.get(propertyName);
      if (!(columnModel instanceof cb.models.BaseModel) || columnModel._get_data('cDefaultValue') == null) return;
      this.execute('afterCellValueChange', { rowIndex: rowIndex, cellName: propertyName, value: rowData[propertyName], async: false });
    }, this);
  }

  model.prototype.getEditRowModel = function () {
    return this._get_data('editRowModel');
  };

  var updateEditRowModel = function (index, row) {
    this._set_data('focusedRowIndex', index);
    var editRowModel = this.getEditRowModel();
    editRowModel.clear(false);
    editRowModel.setData(row);
    editRowModel.setReadOnly(this.getReadOnly());
  };

  var addEditRowModel = function (columns) {
    var editRowModel = this.getEditRowModel();
    for (var attr in columns)
      editRowModel.addProperty(attr, getEditFieldModel.call(this, columns[attr], attr));
  };

  var removeEditRowModel = function (columns) {
    var editRowModel = this.getEditRowModel();
    for (var attr in columns)
      editRowModel.removeProperty(attr);
  };

  var setEditRowModel = function () {
    this._set_data('focusedRowIndex', -1);
    var columns = this._get_data('columns'), model;
    var fields = {};
    for (var attr in columns) {
      model = getEditFieldModel.call(this, columns[attr], attr);
      fields[attr] = model;
    }
    model = new cb.models.ContainerModel();
    model.setParent(this);
    model.setData(fields);
    model.setReadOnly(true);
    this._set_data('editRowModel', model);
  };

  var getEditFieldModel = function (column, attr) {
    var controlType = column.cControlType && column.cControlType.trim().toLocaleLowerCase(), model;
    if (controlType === 'refer' || controlType === 'treerefer' || controlType === 'listrefer') {
      model = new cb.models.ReferModel(cb.utils.extend(true, {}, { multiple: true }, column));
      model.on('beforeValueChange', function (data) {
        var context = this.getParent().getParent();
        var index = context._get_data('focusedRowIndex');
        if (index === -1) return;
        referValueChange.call(context, index, this.getName(), data, this._get_data('bill2ReferKeyFieldMap'), this._get_data('checkValid'), this._get_data('returnText'));
        this.execute('blur');
        this.execute('afterValueChange', data);
        return false;
      });
      model.on('beforeBrowse', function () {
        var context = this.getParent().getParent();
        var index = context._get_data('focusedRowIndex');
        return context.execute('beforeBrowse', { rowIndex: index, cellName: this.getName(), context: this });
      });
    } else if (controlType === 'tag' || controlType === 'attachment' || controlType === 'checkboxgroup') {
      model = new cb.models.TagModel(cb.utils.extend(true, { needCollect: false }, column));
      model.on('afterValueChange', function () {
        var context = this.getParent().getParent();
        var index = context._get_data('focusedRowIndex');
        otherValueChange.call(context, index, this.getName(), this.getData());
      });
      model.on('beforeBrowse', function () {
        var context = this.getParent().getParent();
        var index = context._get_data('focusedRowIndex');
        return context.execute('beforeBrowse', { rowIndex: index, cellName: this.getName(), context: this });
      });
      var viewModel = this.getParent();
      while (viewModel.getParent())
        viewModel = viewModel.getParent();
      if (viewModel._get_data(attr))
        console.error('孙表暂存出错');
      viewModel._set_data(attr, model, true);
    } else if (controlType === 'select' || controlType === 'radio' || controlType === 'checkboxenum') {
      model = new cb.models.ListModel(cb.utils.extend(true, {}, column));
      model.on('beforeValueChange', function (data) {
        var context = this.getParent().getParent();
        var index = context._get_data('focusedRowIndex');
        if (index === -1) return;
        otherValueChange.call(context, index, this.getName(), data.value);
        return false;
      });
    } else if (controlType === 'table') {
      model = new cb.models.GridModel(cb.utils.extend(true, { needCollect: false }, column));
      model.on('afterInsertRow', tableValueChange);
      model.on('afterDeleteRows', tableValueChange);
      model.on('afterCellValueChange', tableValueChange);
      var viewModel = this.getParent();
      while (viewModel.getParent())
        viewModel = viewModel.getParent();
      if (viewModel._get_data(attr))
        console.error('孙表暂存出错');
      viewModel._set_data(attr, model, true);
    } else if (controlType === 'cascader') {
      model = new cb.models.TreeModel({
        cControlType: controlType,
        keyField: 'id',
        titleField: 'name',
        dataSourceMode: 'remote'
      });
      model.setDataSource({ url: '/region/getAllregion', method: 'POST' });
      model.on('beforeValueChange', function (data) {
        var context = this.getParent().getParent();
        var index = context._get_data('focusedRowIndex');
        if (index === -1) return;
        otherValueChange.call(context, index, this.getName(), data.value[data.value.length - 1].id);
        this.execute('blur');
        return false;
      });
    } else {
      model = new cb.models.SimpleModel(cb.utils.extend(true, {}, { invalidReset: false }, column));
      model.on('beforeValueChange', function (data) {
        var context = this.getParent().getParent();
        var index = context._get_data('focusedRowIndex');
        if (index === -1) return;
        otherValueChange.call(context, index, this.getName(), data.value);
        return false;
      });
    }
    model.on('blur', function () {
      var context = this.getParent().getParent();
      var index = context._get_data('focusedRowIndex');
      context.doPropertyChange('setCellBlur', { rowIndex: index, cellName: this.getName() });
    });
    // model.on('enter', function () {
    //   var context = this.getParent().getParent();
    //   var index = context._get_data('focusedRowIndex');
    //   context.doPropertyChange('setCellEnter', { rowIndex: index, cellName: this.getName() });
    // });
    return model;
  };

  var referValueChange = function (rowIndex, cellName, args, bill2ReferKeyFieldMap, checkValid, returnText) {
    var data = args.value;
    if (cb.utils.isArray(data)) {
      if (returnText) {
        this.setCellValue(rowIndex, cellName, args.obj.text, true);
      } else {
        if (!data.length)
          data = [{}];
        var rowDatas = [];
        var referRows = [];
        data.forEach(function (item, index) {
          var rowData = {};
          rowData[cellName] = getCellText.call(this, item, cellName);
          for (var billKey in bill2ReferKeyFieldMap) {
            var billValue = item[bill2ReferKeyFieldMap[billKey]];
            if (billValue == null)
              billValue = null;
            rowData[billKey] = billValue;
          }
          if (index > 0 && !this.execute('beforeInsertRowFromRefer', { index: rowIndex + index, row: rowData, columnName: cellName })) return;
          rowDatas.push(rowData);
          referRows.push(item);
        }, this);
        this.promiseExecute('beforeInsertRowsFromRefer', { index: rowIndex, rows: rowDatas, columnName: cellName }, function () {
          var cellEventArgs = { rowIndex: rowIndex, cellName: cellName, value: referRows[0] };
          if (!this.execute('beforeCellValueChange', cellEventArgs)) return;
          this.updateRow(rowIndex, rowDatas[0]);
          this.execute('afterCellValueChange', cellEventArgs);
          if (rowDatas.length > 1) {
            var remainedRows = rowDatas.splice(1);
            this.insertRows(rowIndex + 1, remainedRows);
            for (var i = 0, len = remainedRows.length; i < len; i++)
              this.execute('afterCellValueChange', {
                rowIndex: rowIndex + 1 + i,
                cellName: cellName,
                value: referRows[i + 1]
              });
          }
        });
      }
    } else {
      if (cb.utils.isEmpty(data))
        data = {};
      var cellEventArgs = { rowIndex: rowIndex, cellName: cellName, value: data };
      if (!this.execute('beforeCellValueChange', cellEventArgs)) return;
      var rowData = {};
      rowData[cellName] = getCellText.call(this, data, cellName);
      if (checkValid !== false || typeof data === 'object') {
        for (var billKey in bill2ReferKeyFieldMap) {
          var billValue = data[bill2ReferKeyFieldMap[billKey]];
          if (billValue == null)
            billValue = null;
          rowData[billKey] = billValue;
        }
      }
      this.updateRow(rowIndex, rowData);
      this.execute('afterCellValueChange', cellEventArgs);
    }
  };

  var tableValueChange = function () {
    var context = this.getParent().getParent();
    var rowIndex = context._get_data('focusedRowIndex');
    var cellName = this.getName();
    var row = rowIndex >= 0 ? context._get_data('rows')[rowIndex] : null;
    if (!row || !cellName) return;
    row[cellName] = this.getData();
    updateRowState.call(context, rowIndex, cb.models.DataStates.Update);
  };

  var otherValueChange = function (rowIndex, cellName, data) {
    this.setCellValue(rowIndex, cellName, data, true);
  };

  return model;
});

cb.models.register('ContainerModel', function (modelType) {
  var model = function (data) {
    cb.models.BaseModel.call(this, data);
  };
  model.prototype = cb.utils.getPrototype(cb.models.BaseModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.getParams = function () {
    return this._get_data('params');
  };

  model.prototype.set = function (propertyName, value) {
    if (value instanceof cb.models.BaseModel) {
      value.setParent(this);
      value.setName(propertyName);
      if (typeof value.afterInit === 'function')
        value.afterInit();
    }
    this._set_data(propertyName, value, true);
  };

  model.prototype.get = function (propertyName) {
    return this._get_data(propertyName);
  };

  model.prototype.updateListenerState = function (listener) {

  };

  model.prototype.setData = function (data) {
    for (var propertyName in data)
      this.addProperty(propertyName, data[propertyName]);
  };

  model.prototype.addProperty = function (propertyName, value) {
    var property = this.get(propertyName);
    property && property.setData ? property.setData(value) : this.set(propertyName, value);
  };

  model.prototype.removeProperty = function (propertyName) {
    var propertyNames = this._get_data('propertyNames');
    var index;
    if ((index = propertyNames.indexOf(propertyName)) !== -1)
      propertyNames.splice(index, 1);
    this._del_data(propertyName);
  };

  model.prototype.getAllData = function () {

    var propertyNames = this._get_data('propertyNames');
    var rawData = {};
    var property;
    propertyNames.forEach(function (propertyName) {

      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needCollect') === false || property._get_data('needClear') === false) return;
      var value = property.getAllData ? property.getAllData() : property.getData();
      rawData[propertyName] = value;
    }, this);
    return rawData;
  };

  model.prototype.getOriginalData = function () {
    var propertyNames = this._get_data('propertyNames');
    var originalData = {};
    var property;
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needCollect') === false || property._get_data('needClear') === false) return;
      var value = property._get_data('originalData');
      originalData[propertyName] = value;
    }, this);
    return originalData;
  };

  model.prototype.getNecessaryData = function () {
    var propertyNames = this._get_data('propertyNames');
    var necessaryData = {};
    var property;
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needCollect') === false || property._get_data('needClear') === false || !property._get_data('bMustSelect')) return;
      necessaryData[propertyName] = property.getData();
    }, this);
    return necessaryData;
  };

  model.prototype.setDirty = function (dirty) {
    var propertyNames = this._get_data('propertyNames');
    var property;
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needCollect') === false || property._get_data('needClear') === false) return;
      property.setDirty(dirty);
    }, this);
  };

  model.prototype.validate = function (cancel) {
    var propertyNames = this._get_data('propertyNames');
    var property, invalidMsgs = [];
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      // remove temp: || property._get_data('needCollect') === false
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needClear') === false || property.validate(cancel)) return;
      // invalidMsgs.push(property._get_data('cShowCaption') + '必输');
      invalidMsgs.push(property._get_data('cShowCaption'));
    }, this);
    // console.error(invalidMsgs);
    // return invalidMsgs.join(';');
    if (invalidMsgs.length)
      return invalidMsgs;
  };

  model.prototype.getDirtyData = function (necessary) {
    var propertyNames = this._get_data('propertyNames');
    var dirtyData = {};
    var property, isDirty;
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needCollect') === false || property._get_data('needClear') === false) return;
      if (necessary !== false && property._get_data('bMustSelect')) {
        dirtyData[propertyName] = property.getData();
        isDirty = true;
      } else {
        var value = property.getDirtyData(necessary);
        if (value === undefined) return;
        dirtyData[propertyName] = value;
        isDirty = true;
      }
    }, this);
    if (isDirty)
      return dirtyData;
  };

  model.prototype.loadData = function (data) {
    this.clear(false);
    this.setData(data);
    this.setDirty(false);
  };

  model.prototype.loadDirtyData = function (data) {
    this.clear();
    this.setData(data);
  };

  model.prototype.clear = function (useDefault) {
    var propertyNames = this._get_data('propertyNames');
    var property;
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needClear') === false) return;
      property.clear(useDefault);
    }, this);
  };

  model.prototype.collectData = function (all) {
    return all ? this.getAllData() : this.getDirtyData();
  };

  model.prototype.setReadOnly = function (value) {
    var propertyNames = this._get_data('propertyNames');
    var property;
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel)) return;
      property.setReadOnly(value);
    }, this);
  };

  model.prototype.setDisabled = function (value) {
    var propertyNames = this._get_data('propertyNames');
    var property;
    propertyNames.forEach(function (propertyName) {
      property = this.get(propertyName);
      if (!(property instanceof cb.models.BaseModel) || property._get_data('needClear') === false) return;
      property.setDisabled(value);
    }, this);
  };

  model.prototype.getGridModel = function (propertyName) {
    if (propertyName)
      return this.get(propertyName);
    var gridModel = this._get_data('gridModel');
    if (gridModel)
      return gridModel;
    var propertyNames = this._get_data('propertyNames');
    for (var i = 0, len = propertyNames.length; i < len; i++) {
      gridModel = this.get(propertyNames[i]);
      if (gridModel instanceof cb.models.GridModel) {
        this._set_data('gridModel', gridModel);
        return gridModel;
      }
    }
  };

  model.prototype.getGridModels = function () {
    var propertyNames = this._get_data('propertyNames');
    var gridModels = [];
    for (var i = 0, len = propertyNames.length; i < len; i++) {
      var gridModel = this.get(propertyNames[i]);
      if (gridModel instanceof cb.models.GridModel)
        gridModels.push(gridModel);
    }
    return gridModels;
  };

  model.prototype.getTreeModel = function (propertyName) {
    if (propertyName)
      return this.get(propertyName);
    var treeModel = this._get_data('treeModel');
    if (treeModel)
      return treeModel;
    var propertyNames = this._get_data('propertyNames');
    for (var i = 0, len = propertyNames.length; i < len; i++) {
      treeModel = this.get(propertyNames[i]);
      if (treeModel instanceof cb.models.TreeModel) {
        this._set_data('treeModel', treeModel);
        return treeModel;
      }
    }
  };

  model.prototype.communication = function (args) {
    this.doPropertyChange('communication', args);
  };

  model.prototype.getViewMeta = function (containerCode) {
    var viewMeta = this.getCache('viewMeta');
    if (!viewMeta) return;
    return cb.utils.extend(true, {}, viewMeta[containerCode]);
  };

  model.prototype.setViewMeta = function (meta) {
    if (!meta || !meta.view || !meta.view.containers || !meta.view.containers.length) return;
    var viewMeta = {};
    meta.view.containers.forEach(function (container) {
      recursiveContainer(container, viewMeta);
    });
    this.setCache('viewMeta', viewMeta);
  };

  var recursiveContainer = function (container, viewMeta) {
    var containerCode = container.cGroupCode;
    if (!containerCode) {
      console.error('container code is empty: ' + containerCode);
      return;
    }
    if (viewMeta[containerCode]) {
      console.error('container code is duplicate: ' + containerCode);
      return;
    }
    viewMeta[containerCode] = container;
    if (!container.containers || !container.containers.length) return;
    container.containers.forEach(function (container) {
      recursiveContainer(container, viewMeta);
    });
  };

  return model;
});

cb.cache = {
  get: function (cacheName) {
    return this[cacheName];
  },
  set: function (cacheName, value) {
    this[cacheName] = value;
  },
  clear: function () {
    for (var attr in this)
      if (attr !== 'get' && attr !== 'set' && attr !== 'clear')
        delete this[attr];
  }
};
cb.cache.newIds = { get: cb.cache.get, set: cb.cache.set, clear: cb.cache.clear };
cb.cache.viewModels = { get: cb.cache.get, set: cb.cache.set, clear: cb.cache.clear };

cb.viewmodels = {};
cb.viewmodels.register = function (modelType, func) {
  cb.viewmodels[modelType] = func(modelType);
};

cb.loader = {};
cb.loader.runCommandLine = function (commend, data, viewmodel, callback) {
  switch (commend) {
    case 'menu': {
      cb.loader.fromMenu(data, viewmodel, callback);
      break;
    }
    case 'bill': {
      cb.loader.byBillNo(data, viewmodel, callback);
      break;
    }
  }
}
cb.loader.fromMenu = function (data, viewmodel, callback) {
  if (data && data.content) {
    data.params = cb.utils.extend(true, {}, data);
    callback(data);
    return;
  }
  if (!data || !data.menuId) {
    console.error('no menuId')
    return
  }
  let userClick = data.userClick;
  let node;
  if (userClick) {
    node = data;
  } else {
    let portalTreeData = cb.rest.AppContext.portalTreeData;
    if (!portalTreeData || portalTreeData.length == 0) {
      console.error('no portalTreeData')
      return
    }
    let loop = datas => datas.map((item) => {
      if (!node) {
        if (item.id == data.menuId) {
          node = Object.assign(data, item);
        } else {
          if (item.children) {
            loop(item.children)
          }
        }
      }

    })
    loop(portalTreeData);
    if (!node || node.length == 0) {
      console.error('menuId->' + data.menuId + '不正确');
      return
    }
  }
  let returnData = { title: node.name, params: node };
  if (userClick)
    returnData.key = node.key || node.menuId;
  switch (node.viewType) {
    case 'meta':
      var query = null;
      if (node.menuUrl) {
        var queryString = new cb.utils.queryString(node.menuUrl);
        query = queryString.query;
      } else {
        query = {};
      }
      var params = cb.utils.extend({}, node, { query: query });
      this.byBillNo({
        billtype: node.metaType,
        billno: node.metaKey,
        params: params
      }, viewmodel, callback && function (vm, view) {
        returnData.content = {
          vm: vm,
          metaData: view
        };
        callback(returnData);
      });
      break;
    case 'platform':
      returnData.content = {
        type: node.viewType,
        url: node.menuUrl
      };
      callback(returnData);
      break;
    case 'ajax':
      var proxy = cb.rest.DynamicProxy.create({ getUrl: { url: node.menuUrl, method: 'GET' } });
      proxy.getUrl(function (err, result) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }
        returnData.content = {
          type: 'iframe',
          url: cb.utils.getPredicateValue(result)
        };
        callback(returnData);
      });
      break;
    case 'external':
      returnData.content = {
        type: 'iframe',
        url: cb.utils.getPredicateValue(node.menuUrl)
      };
      callback(returnData);
      break;
  }
};
cb.loader.byBillNo = function (data, viewmodel, callback) {
  if (!data.billtype || !data.billno) return;
  // cb.utils.loadingControl.start();
  var bill = require('./index');
  if (bill[data.billtype.toLowerCase()]) {
    if (!data.params)
      data.params = {};
    if (!data.params.query)
      data.params.query = {};
    bill[data.billtype.toLowerCase()].init(data.billno, data.params, function (vm, viewmeta, title) {
      if (viewmodel) {
        vm.setCache('parentViewModel', viewmodel);
        vm.execute('afterInit');
      }
      var executeComm = true;
      if (callback)
        executeComm = callback.apply(this, arguments);
      if (viewmodel && executeComm) {
        viewmodel.communication({
          payload: {
            menuCode: data.menuCode,
            node: data.node,
            title: title,
            params: data,
            vm: vm,
            metaData: viewmeta
          }
        });
      }
      // cb.utils.loadingControl.end();
    });
  } else {
    console.error('menu中预制的billtype: ' + data.billtype.toLowerCase() + '不存在');
    // cb.utils.loadingControl.end();
  }

};
cb.loader.initRefer = function (refCode, multiple, where, afterInit, afterOkClick) {
  require('./referViewModel');
  var vm = new cb.viewmodels.ReferViewModel({ params: { refCode: refCode, multiple: multiple, where: where } });
  if (typeof afterInit === 'function')
    vm.on('afterInit', afterInit);
  if (typeof afterOkClick === 'function')
    vm.on('afterOkClick', afterOkClick);
  return vm;
};
/*
  name: ViewModel名称，必填
  path: ViewModel路径，选填，默认等于name
  params: 携带参数，选填
  parent: 隶属ParentViewModel，选填
  events: 注册事件，选填
*/
cb.loader.initMetaCommonViewModel = function (name, path, params, parent, events) {
  if (!name) return;
  if (!path)
    path = name;
  if (!parent) {
    require('./' + path);
    return new cb.viewmodels[name](params ? { params: params } : null);
  }
  var vm = parent.getCache(name);
  if (vm) {
    if (cb.utils.isArray(events)) {
      events.forEach(function (eventName) {
        vm.un(eventName);
        vm.on(eventName, function (data) {
          parent.execute(eventName, data);
        });
      });
    }
    cb.utils.extend(vm.getParams(), params);
    if (typeof vm.initData === 'function')
      vm.initData();
    return vm;
  }
  require('./' + path);
  vm = new cb.viewmodels[name](params ? { params: params } : null);
  vm.setCache('parentViewModel', parent);
  if (cb.utils.isArray(events)) {
    events.forEach(function (eventName) {
      vm.on(eventName, function (data) {
        parent.execute(eventName, data);
      });
    });
  }
  parent.setCache(name, vm);
  return vm;
};

cb.rest = {};
cb.rest.getImgSrc = function (src, params) {
  var context = cb.rest.AppContext;
  var queryString = new cb.utils.queryString(src);
  queryString.set('token', context.token || '');
  if (params)
    for (var attr in params)
      queryString.set(attr, params[attr]);
  src = queryString.pathname + queryString.toStr();
  if (src.indexOf('http://') < 0) {
    if (src.substr(0, 1) !== '/')
      src = '/' + src;
    src = context.serviceUrl + src;
  }
  return src;
};
cb.rest._getUrl = function (restUrl, params) {
  var context = cb.rest.AppContext;
  var queryString = new cb.utils.queryString(restUrl);
  if (params && params.terminalType === false) {

  } else {
    queryString.set('terminalType', cb.rest.terminalType || 1);
  }
  if (params && params.token === false) {

  } else {
    queryString.set('token', context.token || '');
  }
  if (cb.utils.browser() === 'IE' || params && params.refresh)
    queryString.set('_', new Date().valueOf());
  for (var attr in context.query)
    queryString.set(attr, context.query[attr]);
  restUrl = queryString.pathname + queryString.toStr();
  if (restUrl.indexOf('http://') < 0 && restUrl.indexOf('https://') < 0) {
    if (restUrl.substr(0, 1) !== '/')
      restUrl = '/' + restUrl;
    var items = [];
    if (!(params && params.baseurl === false))
      items.push(context.serviceUrl);
    if (!(params && params.uniform === false))
      items.push('/uniform');
    items.push(restUrl);
    restUrl = items.join('');
  }
  return restUrl;
};
cb.rest._appendUrl = function (restUrl, params) {
  if (!params) return restUrl;
  var queryStr = [];
  for (var attr in params) {
    queryStr.push(attr + '=' + params[attr]);
  }
  if (!queryStr.length) return restUrl;
  var queryString = queryStr.join('&');
  return restUrl.indexOf('?') >= 0 ? (restUrl + '&' + queryString) : (restUrl + '?' + queryString);
};
cb.rest.DynamicProxy = function (config) {
  if (this.init)
    this.init(config);
};
cb.rest.DynamicProxy.create = function (config) {
  return new cb.rest.DynamicProxy(config);
};
cb.rest.DynamicProxy.prototype.init = function (config) {
  if (!config) return;
  this.config = config;
  for (var attr in this.config) {
    this[attr] = (function (attr) {
      return function (data, callback, context) {
        return this.Do(attr, data, callback, null, context);
      }
    })(attr);
    this[attr + 'Sync'] = (function (attr) {
      return function (data) {
        return this.Do(attr, data, null, false);
      }
    })(attr);
  }
};
cb.rest.DynamicProxy.prototype.Do = function (op, data, callback, async, context) {
  if (!this.config || !this.config[op] || !this.config[op].url) return;
  var config = this.config[op];
  var restUrl = config.url;
  var options = cb.utils.extend({}, config.options);
  options.method = config.method || 'GET';
  if (typeof data === 'function') {
    options.callback = data;
    options.context = context || options.context || this;
  } else {
    options.params = data;
  }
  if (callback) {
    options.callback = callback;
    options.context = context || options.context || this;
  }
  if (async === false)
    options.async = false;
  return this.ajax(restUrl, options);
};
cb.rest.DynamicProxy.prototype.ajax = function (url, options) {
  return cb.rest.ajax(url, options);
};
cb.rest.MergeProxy = function () {
  var _request = { datas: [], events: [] };

  this.add = function (proxy, data, callback, context) {
    if (cb.utils.isArray(proxy)) {
      var len = proxy.length;
      if (cb.utils.isArray(data)) {
        if (data.length === len) {
          for (var i = 0; i < len; i++) {
            this.addInner(proxy[i], data[i], callback, context);
          }
        }
      } else {
        for (var i = 0; i < len; i++) {
          this.addInner(proxy[i], data, callback, context);
        }
        ;
      }
    } else {
      this.addInner(proxy, data, callback, context);
    }
  };

  this.addInner = function (proxy, data, callback, context) {
    var requestMethod = proxy.method.toLocaleUpperCase()
    var requestUrl = cb.rest._getUrl(proxy.url, proxy.options);
    var requestData;
    if (requestMethod === 'GET' || requestMethod === 'DELETE') {
      requestUrl = cb.rest._appendUrl(requestUrl, data);
      requestData = null;
    } else {
      requestData = data;
    }
    _request.datas.push({ requestUrl: requestUrl, requestMethod: requestMethod, requestData: requestData });
    _request.events.push({ callback: callback, context: context });
  };

  this.submit = function (callback) {
    if (!_request.datas.length) return;
    var proxy = cb.rest.DynamicProxy.create({ BatchSubmit: { url: 'client/batchSubmit', method: 'POST', options: { uniform: false } } });
    proxy.BatchSubmit(_request.datas, function (err, result) {
      if (callback) {
        callback(err, result);
        return;
      }
      if (err) {
        cb.utils.alert('合并请求提交失败: ' + err, 'error');
        return;
      }
      var len = result && result.length;
      if (!len) return;
      for (var i = 0; i < len; i++) {
        var event = _request.events[i];
        if (!event) continue;
        // cb.rest.AjaxRequestManager.processAjaxResult(result[i], true, event.callback, event.context);
        event.callback.call(event.context, result[i]);
      }
    });
  };

  this.count = function () {
    return _request.datas.length;
  }
};
cb.rest.MergeProxy.create = function () {
  return new cb.rest.MergeProxy();
};
cb.rest.ajax = function (url, options) {
  options.url = url;
  return cb.rest.AjaxRequestManager.doRequest(options);
};
cb.rest.AjaxRequestManager = {
  _xhrs: [],
  _jsonps: { index: 0 },
  doRequest: function (options) {
    var method = options.method || 'GET';
    var url = cb.rest._getUrl(options.url, options);
    var queryJson = null;
    if (method.equalsIgnoreCase('get') || method.equalsIgnoreCase('delete'))
      url = cb.rest._appendUrl(url, options.params);
    else if (method.equalsIgnoreCase('post') || method.equalsIgnoreCase('put'))
      queryJson = JSON.stringify(options.params);
    if (options.jsonp)
      return this.getJsonp(url, options.callback);
    var xhr = this.getXMLHttpRequest();
    if (!xhr) return;
    xhr.open(method, url, options.async === false ? false : true);
    if (options.timeout) {
      xhr.timeout = options.timeout;
      xhr.ontimeout = function () {
        cb.rest.AjaxRequestManager.onerror(this, options, 'timeout');
      }
    }
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send(queryJson);
    if (options.async === false) {
      return this.onreadystatechange(xhr, options);
    } else {
      xhr.onreadystatechange = function () {
        cb.rest.AjaxRequestManager.onreadystatechange(this, options);
      };
    }
    if (options.mask !== false)
      cb.utils.loadingControl.start();
  },
  onreadystatechange: function (xhr, options) {
    if (xhr.readyState !== 4) return;
    if (options.mask !== false)
      cb.utils.loadingControl.end();
    if (xhr.status === 200) {
      var ajaxResult = JSON.parse(xhr.responseText);
      if (options.async === false) {
        xhr.isBusy = false;
        return cb.rest.AjaxRequestManager.processAjaxResult(ajaxResult, false);
      }
      cb.rest.AjaxRequestManager.processAjaxResult(ajaxResult, options.async, options.callback, options.context);
    } else if (xhr.status === 0) {
      cb.rest.AjaxRequestManager.onerror(xhr, options, 'offline');
    }
    xhr.isBusy = false;
  },
  onerror: function (xhr, options, message) {
    var ajaxResult = { code: 500, message: message };
    if (options.async === false)
      return cb.rest.AjaxRequestManager.processAjaxResult(ajaxResult, false);
    cb.rest.AjaxRequestManager.processAjaxResult(ajaxResult, options.async, options.callback, options.context);
  },
  getXMLHttpRequest: function () {
    return this.createXMLHttpRequest();
    var xhr;
    for (var i = 0, len = this._xhrs.length; i < len; i++) {
      if (!this._xhrs[i].isBusy) {
        xhr = this._xhrs[i];
        break;
      }
    }
    if (!xhr) {
      xhr = this.createXMLHttpRequest();
      this._xhrs.push(xhr);
    }
    xhr.isBusy = true;
    return xhr;
  },
  createXMLHttpRequest: function () {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : (window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : null);
    return xhr;
  },
  getJsonp: function (url, callback) {
    var responseCallback = 'callback' + this._jsonps.index++;
    var scriptDom = document.createElement('script');
    this._jsonps[responseCallback] = function (data) {
      try {
        callback(data);
      } finally {
        document.body.removeChild(scriptDom);
        delete cb.rest.AjaxRequestManager._jsonps[responseCallback];
      }
    }
    url += url.indexOf('?') === -1 ? '?' : '&' + 'callback=cb.rest.AjaxRequestManager._jsonps.' + responseCallback;
    scriptDom.src = url;
    document.body.appendChild(scriptDom);
  },
  processAjaxResult: function (ajaxResult, async, callback, context) {
    if (!ajaxResult) return;
    if (!ajaxResult.code) {
      if (async === false)
        return ajaxResult;
      if (callback)
        callback.call(context, null, ajaxResult);
      return;
    }
    if (ajaxResult.code == 200) {
      if (async === false)
        return { result: ajaxResult.data };
      if (callback)
        callback.call(context, null, ajaxResult.data);
    } else {
      if (ajaxResult.code === 900) {
        cb.route.redirectLoginPage();
        return;
      }
      if (async === false)
        return { error: ajaxResult };
      if (callback)
        callback.call(context, ajaxResult);
    }
  }
};
cb.rest.ContextBuilder = {
  construct: function () {
    cb.rest.AppContext = {
      serviceUrl: location.protocol + '//' + location.host,
      token: cb.utils.getCookie('token') || localStorage.getItem('token'),
      query: new cb.utils.queryString().query
    };
    // var userCookie = cb.utils.getCookie('user');
    // if (userCookie) {
    //   var user = JSON.parse(userCookie);
    //   cb.rest.AppContext.token = user.token;
    //   cb.rest.AppContext.user = user;
    // }
  }
};
cb.rest.ContextBuilder.construct();

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.2 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

(function (global, setTimeout) {
  var requirejs, require, define;
  var req, s, head, baseElement, dataMain, src,
    interactiveScript, currentlyAddingScript, mainScript, subPath,
    version = '2.3.2',
    commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
    cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    jsSuffixRegExp = /\.js$/,
    currDirRegExp = /^\.\//,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty,
    isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
    isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
    //PS3 indicates loaded and complete, but need to wait for complete
    //specifically. Sequence is 'loading', 'loaded', execution,
    // then 'complete'. The UA check is unfortunate, but not sure how
    //to feature test w/o causing perf issues.
    readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
      /^complete$/ : /^(complete|loaded)$/,
    defContextName = '_',
    //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
    isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
    contexts = {},
    cfg = {},
    globalDefQueue = [],
    useInteractive = false;

  //Could match something like ')//comment', do not lose the prefix to comment.
  function commentReplace(match, singlePrefix) {
    return singlePrefix || '';
  }

  function isFunction(it) {
    return ostring.call(it) === '[object Function]';
  }

  function isArray(it) {
    return ostring.call(it) === '[object Array]';
  }

  /**
   * Helper function for iterating over an array. If the func returns
   * a true value, it will break out of the loop.
   */
  function each(ary, func) {
    if (ary) {
      var i;
      for (i = 0; i < ary.length; i += 1) {
        if (ary[i] && func(ary[i], i, ary)) {
          break;
        }
      }
    }
  }

  /**
   * Helper function for iterating over an array backwards. If the func
   * returns a true value, it will break out of the loop.
   */
  function eachReverse(ary, func) {
    if (ary) {
      var i;
      for (i = ary.length - 1; i > -1; i -= 1) {
        if (ary[i] && func(ary[i], i, ary)) {
          break;
        }
      }
    }
  }

  function hasProp(obj, prop) {
    return hasOwn.call(obj, prop);
  }

  function getOwn(obj, prop) {
    return hasProp(obj, prop) && obj[prop];
  }

  /**
   * Cycles over properties in an object and calls a function for each
   * property value. If the function returns a truthy value, then the
   * iteration is stopped.
   */
  function eachProp(obj, func) {
    var prop;
    for (prop in obj) {
      if (hasProp(obj, prop)) {
        if (func(obj[prop], prop)) {
          break;
        }
      }
    }
  }

  /**
   * Simple function to mix in properties from source into target,
   * but only if target does not already have a property of the same name.
   */
  function mixin(target, source, force, deepStringMixin) {
    if (source) {
      eachProp(source, function (value, prop) {
        if (force || !hasProp(target, prop)) {
          if (deepStringMixin && typeof value === 'object' && value &&
            !isArray(value) && !isFunction(value) &&
            !(value instanceof RegExp)) {

            if (!target[prop]) {
              target[prop] = {};
            }
            mixin(target[prop], value, force, deepStringMixin);
          } else {
            target[prop] = value;
          }
        }
      });
    }
    return target;
  }

  //Similar to Function.prototype.bind, but the 'this' object is specified
  //first, since it is easier to read/figure out what 'this' will be.
  function bind(obj, fn) {
    return function () {
      return fn.apply(obj, arguments);
    };
  }

  function scripts() {
    return document.getElementsByTagName('script');
  }

  function defaultOnError(err) {
    throw err;
  }

  //Allow getting a global that is expressed in
  //dot notation, like 'a.b.c'.
  function getGlobal(value) {
    if (!value) {
      return value;
    }
    var g = global;
    each(value.split('.'), function (part) {
      g = g[part];
    });
    return g;
  }

  /**
   * Constructs an error with a pointer to an URL with more information.
   * @param {String} id the error ID that maps to an ID on a web page.
   * @param {String} message human readable error.
   * @param {Error} [err] the original error, if there is one.
   *
   * @returns {Error}
   */
  function makeError(id, msg, err, requireModules) {
    var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
    e.requireType = id;
    e.requireModules = requireModules;
    if (err) {
      e.originalError = err;
    }
    return e;
  }

  if (typeof define !== 'undefined') {
    //If a define is already in play via another AMD loader,
    //do not overwrite.
    return;
  }

  if (typeof requirejs !== 'undefined') {
    if (isFunction(requirejs)) {
      //Do not overwrite an existing requirejs instance.
      return;
    }
    cfg = requirejs;
    requirejs = undefined;
  }

  //Allow for a require config object
  if (typeof require !== 'undefined' && !isFunction(require)) {
    //assume it is a config object.
    cfg = require;
    require = undefined;
  }

  function newContext(contextName) {
    var inCheckLoaded, Module, context, handlers,
      checkLoadedTimeoutId,
      config = {
        //Defaults. Do not set a default for map
        //config to speed up normalize(), which
        //will run faster if there is no default.
        waitSeconds: 7,
        baseUrl: './',
        paths: {},
        bundles: {},
        pkgs: {},
        shim: {},
        config: {}
      },
      registry = {},
      //registry of just enabled modules, to speed
      //cycle breaking code when lots of modules
      //are registered, but not activated.
      enabledRegistry = {},
      undefEvents = {},
      defQueue = [],
      defined = {},
      urlFetched = {},
      bundlesMap = {},
      requireCounter = 1,
      unnormalizedCounter = 1;

    /**
     * Trims the . and .. from an array of path segments.
     * It will keep a leading path segment if a .. will become
     * the first path segment, to help with module name lookups,
     * which act like paths, but can be remapped. But the end result,
     * all paths that use this function should look normalized.
     * NOTE: this method MODIFIES the input array.
     * @param {Array} ary the array of path segments.
     */
    function trimDots(ary) {
      var i, part;
      for (i = 0; i < ary.length; i++) {
        part = ary[i];
        if (part === '.') {
          ary.splice(i, 1);
          i -= 1;
        } else if (part === '..') {
          // If at the start, or previous value is still ..,
          // keep them so that when converted to a path it may
          // still work when converted to a path, even though
          // as an ID it is less than ideal. In larger point
          // releases, may be better to just kick out an error.
          if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
            continue;
          } else if (i > 0) {
            ary.splice(i - 1, 2);
            i -= 2;
          }
        }
      }
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @param {Boolean} applyMap apply the map config to the value. Should
     * only be done if this normalization is for a dependency ID.
     * @returns {String} normalized name
     */
    function normalize(name, baseName, applyMap) {
      var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
        foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
        baseParts = (baseName && baseName.split('/')),
        map = config.map,
        starMap = map && map['*'];

      //Adjust any relative paths.
      if (name) {
        name = name.split('/');
        lastIndex = name.length - 1;

        // If wanting node ID compatibility, strip .js from end
        // of IDs. Have to do this here, and not in nameToUrl
        // because node allows either .js or non .js to map
        // to same file.
        if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
          name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
        }

        // Starts with a '.' so need the baseName
        if (name[0].charAt(0) === '.' && baseParts) {
          //Convert baseName to array, and lop off the last part,
          //so that . matches that 'directory' and not name of the baseName's
          //module. For instance, baseName of 'one/two/three', maps to
          //'one/two/three.js', but we want the directory, 'one/two' for
          //this normalization.
          normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
          name = normalizedBaseParts.concat(name);
        }

        trimDots(name);
        name = name.join('/');
      }

      //Apply map config if available.
      if (applyMap && map && (baseParts || starMap)) {
        nameParts = name.split('/');

        outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
          nameSegment = nameParts.slice(0, i).join('/');

          if (baseParts) {
            //Find the longest baseName segment match in the config.
            //So, do joins on the biggest to smallest lengths of baseParts.
            for (j = baseParts.length; j > 0; j -= 1) {
              mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

              //baseName segment has config, find if it has one for
              //this name.
              if (mapValue) {
                mapValue = getOwn(mapValue, nameSegment);
                if (mapValue) {
                  //Match, update name to the new value.
                  foundMap = mapValue;
                  foundI = i;
                  break outerLoop;
                }
              }
            }
          }

          //Check for a star map match, but just hold on to it,
          //if there is a shorter segment match later in a matching
          //config, then favor over this star map.
          if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
            foundStarMap = getOwn(starMap, nameSegment);
            starI = i;
          }
        }

        if (!foundMap && foundStarMap) {
          foundMap = foundStarMap;
          foundI = starI;
        }

        if (foundMap) {
          nameParts.splice(0, foundI, foundMap);
          name = nameParts.join('/');
        }
      }

      // If the name points to a package's name, use
      // the package main instead.
      pkgMain = getOwn(config.pkgs, name);

      return pkgMain ? pkgMain : name;
    }

    function removeScript(name) {
      if (isBrowser) {
        each(scripts(), function (scriptNode) {
          if (scriptNode.getAttribute('data-requiremodule') === name &&
            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
            scriptNode.parentNode.removeChild(scriptNode);
            return true;
          }
        });
      }
    }

    function hasPathFallback(id) {
      var pathConfig = getOwn(config.paths, id);
      if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
        //Pop off the first array value, since it failed, and
        //retry
        pathConfig.shift();
        context.require.undef(id);

        //Custom require that does not do map translation, since
        //ID is "absolute", already mapped/resolved.
        context.makeRequire(null, {
          skipMap: true
        })([id]);

        return true;
      }
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
      var prefix,
        index = name ? name.indexOf('!') : -1;
      if (index > -1) {
        prefix = name.substring(0, index);
        name = name.substring(index + 1, name.length);
      }
      return [prefix, name];
    }

    /**
     * Creates a module mapping that includes plugin prefix, module
     * name, and path. If parentModuleMap is provided it will
     * also normalize the name via require.normalize()
     *
     * @param {String} name the module name
     * @param {String} [parentModuleMap] parent module map
     * for the module name, used to resolve relative names.
     * @param {Boolean} isNormalized: is the ID already normalized.
     * This is true if this call is done for a define() module ID.
     * @param {Boolean} applyMap: apply the map config to the ID.
     * Should only be true if this map is for a dependency.
     *
     * @returns {Object}
     */
    function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
      var url, pluginModule, suffix, nameParts,
        prefix = null,
        parentName = parentModuleMap ? parentModuleMap.name : null,
        originalName = name,
        isDefine = true,
        normalizedName = '';

      //If no name, then it means it is a require call, generate an
      //internal name.
      if (!name) {
        isDefine = false;
        name = '_@r' + (requireCounter += 1);
      }

      nameParts = splitPrefix(name);
      prefix = nameParts[0];
      name = nameParts[1];

      if (prefix) {
        prefix = normalize(prefix, parentName, applyMap);
        pluginModule = getOwn(defined, prefix);
      }

      //Account for relative paths if there is a base name.
      if (name) {
        if (prefix) {
          if (pluginModule && pluginModule.normalize) {
            //Plugin is loaded, use its normalize method.
            normalizedName = pluginModule.normalize(name, function (name) {
              return normalize(name, parentName, applyMap);
            });
          } else {
            // If nested plugin references, then do not try to
            // normalize, as it will not normalize correctly. This
            // places a restriction on resourceIds, and the longer
            // term solution is not to normalize until plugins are
            // loaded and all normalizations to allow for async
            // loading of a loader plugin. But for now, fixes the
            // common uses. Details in #1131
            normalizedName = name.indexOf('!') === -1 ?
              normalize(name, parentName, applyMap) :
              name;
          }
        } else {
          //A regular module.
          normalizedName = normalize(name, parentName, applyMap);

          //Normalized name may be a plugin ID due to map config
          //application in normalize. The map config values must
          //already be normalized, so do not need to redo that part.
          nameParts = splitPrefix(normalizedName);
          prefix = nameParts[0];
          normalizedName = nameParts[1];
          isNormalized = true;

          url = context.nameToUrl(normalizedName);
        }
      }

      //If the id is a plugin id that cannot be determined if it needs
      //normalization, stamp it with a unique ID so two matching relative
      //ids that may conflict can be separate.
      suffix = prefix && !pluginModule && !isNormalized ?
        '_unnormalized' + (unnormalizedCounter += 1) :
        '';

      return {
        prefix: prefix,
        name: normalizedName,
        parentMap: parentModuleMap,
        unnormalized: !!suffix,
        url: url,
        originalName: originalName,
        isDefine: isDefine,
        id: (prefix ?
          prefix + '!' + normalizedName :
          normalizedName) + suffix
      };
    }

    function getModule(depMap) {
      var id = depMap.id,
        mod = getOwn(registry, id);

      if (!mod) {
        mod = registry[id] = new context.Module(depMap);
      }

      return mod;
    }

    function on(depMap, name, fn) {
      var id = depMap.id,
        mod = getOwn(registry, id);

      if (hasProp(defined, id) &&
        (!mod || mod.defineEmitComplete)) {
        if (name === 'defined') {
          fn(defined[id]);
        }
      } else {
        mod = getModule(depMap);
        if (mod.error && name === 'error') {
          fn(mod.error);
        } else {
          mod.on(name, fn);
        }
      }
    }

    function onError(err, errback) {
      var ids = err.requireModules,
        notified = false;

      if (errback) {
        errback(err);
      } else {
        each(ids, function (id) {
          var mod = getOwn(registry, id);
          if (mod) {
            //Set error on module, so it skips timeout checks.
            mod.error = err;
            if (mod.events.error) {
              notified = true;
              mod.emit('error', err);
            }
          }
        });

        if (!notified) {
          req.onError(err);
        }
      }
    }

    /**
     * Internal method to transfer globalQueue items to this context's
     * defQueue.
     */
    function takeGlobalQueue() {
      //Push all the globalDefQueue items into the context's defQueue
      if (globalDefQueue.length) {
        each(globalDefQueue, function (queueItem) {
          var id = queueItem[0];
          if (typeof id === 'string') {
            context.defQueueMap[id] = true;
          }
          defQueue.push(queueItem);
        });
        globalDefQueue = [];
      }
    }

    handlers = {
      'require': function (mod) {
        if (mod.require) {
          return mod.require;
        } else {
          return (mod.require = context.makeRequire(mod.map));
        }
      },
      'exports': function (mod) {
        mod.usingExports = true;
        if (mod.map.isDefine) {
          if (mod.exports) {
            return (defined[mod.map.id] = mod.exports);
          } else {
            return (mod.exports = defined[mod.map.id] = {});
          }
        }
      },
      'module': function (mod) {
        if (mod.module) {
          return mod.module;
        } else {
          return (mod.module = {
            id: mod.map.id,
            uri: mod.map.url,
            config: function () {
              return getOwn(config.config, mod.map.id) || {};
            },
            exports: mod.exports || (mod.exports = {})
          });
        }
      }
    };

    function cleanRegistry(id) {
      //Clean up machinery used for waiting modules.
      delete registry[id];
      delete enabledRegistry[id];
    }

    function breakCycle(mod, traced, processed) {
      var id = mod.map.id;

      if (mod.error) {
        mod.emit('error', mod.error);
      } else {
        traced[id] = true;
        each(mod.depMaps, function (depMap, i) {
          var depId = depMap.id,
            dep = getOwn(registry, depId);

          //Only force things that have not completed
          //being defined, so still in the registry,
          //and only if it has not been matched up
          //in the module already.
          if (dep && !mod.depMatched[i] && !processed[depId]) {
            if (getOwn(traced, depId)) {
              mod.defineDep(i, defined[depId]);
              mod.check(); //pass false?
            } else {
              breakCycle(dep, traced, processed);
            }
          }
        });
        processed[id] = true;
      }
    }

    function checkLoaded() {
      var err, usingPathFallback,
        waitInterval = config.waitSeconds * 1000,
        //It is possible to disable the wait interval by using waitSeconds of 0.
        expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
        noLoads = [],
        reqCalls = [],
        stillLoading = false,
        needCycleCheck = true;

      //Do not bother if this call was a result of a cycle break.
      if (inCheckLoaded) {
        return;
      }

      inCheckLoaded = true;

      //Figure out the state of all the modules.
      eachProp(enabledRegistry, function (mod) {
        var map = mod.map,
          modId = map.id;

        //Skip things that are not enabled or in error state.
        if (!mod.enabled) {
          return;
        }

        if (!map.isDefine) {
          reqCalls.push(mod);
        }

        if (!mod.error) {
          //If the module should be executed, and it has not
          //been inited and time is up, remember it.
          if (!mod.inited && expired) {
            if (hasPathFallback(modId)) {
              usingPathFallback = true;
              stillLoading = true;
            } else {
              noLoads.push(modId);
              removeScript(modId);
            }
          } else if (!mod.inited && mod.fetched && map.isDefine) {
            stillLoading = true;
            if (!map.prefix) {
              //No reason to keep looking for unfinished
              //loading. If the only stillLoading is a
              //plugin resource though, keep going,
              //because it may be that a plugin resource
              //is waiting on a non-plugin cycle.
              return (needCycleCheck = false);
            }
          }
        }
      });

      if (expired && noLoads.length) {
        //If wait time expired, throw error of unloaded modules.
        err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
        err.contextName = context.contextName;
        return onError(err);
      }

      //Not expired, check for a cycle.
      if (needCycleCheck) {
        each(reqCalls, function (mod) {
          breakCycle(mod, {}, {});
        });
      }

      //If still waiting on loads, and the waiting load is something
      //other than a plugin resource, or there are still outstanding
      //scripts, then just try back later.
      if ((!expired || usingPathFallback) && stillLoading) {
        //Something is still waiting to load. Wait for it, but only
        //if a timeout is not already in effect.
        if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
          checkLoadedTimeoutId = setTimeout(function () {
            checkLoadedTimeoutId = 0;
            checkLoaded();
          }, 50);
        }
      }

      inCheckLoaded = false;
    }

    Module = function (map) {
      this.events = getOwn(undefEvents, map.id) || {};
      this.map = map;
      this.shim = getOwn(config.shim, map.id);
      this.depExports = [];
      this.depMaps = [];
      this.depMatched = [];
      this.pluginMaps = {};
      this.depCount = 0;

      /* this.exports this.factory
         this.depMaps = [],
         this.enabled, this.fetched
      */
    };

    Module.prototype = {
      init: function (depMaps, factory, errback, options) {
        options = options || {};

        //Do not do more inits if already done. Can happen if there
        //are multiple define calls for the same module. That is not
        //a normal, common case, but it is also not unexpected.
        if (this.inited) {
          return;
        }

        this.factory = factory;

        if (errback) {
          //Register for errors on this module.
          this.on('error', errback);
        } else if (this.events.error) {
          //If no errback already, but there are error listeners
          //on this module, set up an errback to pass to the deps.
          errback = bind(this, function (err) {
            this.emit('error', err);
          });
        }

        //Do a copy of the dependency array, so that
        //source inputs are not modified. For example
        //"shim" deps are passed in here directly, and
        //doing a direct modification of the depMaps array
        //would affect that config.
        this.depMaps = depMaps && depMaps.slice(0);

        this.errback = errback;

        //Indicate this module has be initialized
        this.inited = true;

        this.ignore = options.ignore;

        //Could have option to init this module in enabled mode,
        //or could have been previously marked as enabled. However,
        //the dependencies are not known until init is called. So
        //if enabled previously, now trigger dependencies as enabled.
        if (options.enabled || this.enabled) {
          //Enable this module and dependencies.
          //Will call this.check()
          this.enable();
        } else {
          this.check();
        }
      },

      defineDep: function (i, depExports) {
        //Because of cycles, defined callback for a given
        //export can be called more than once.
        if (!this.depMatched[i]) {
          this.depMatched[i] = true;
          this.depCount -= 1;
          this.depExports[i] = depExports;
        }
      },

      fetch: function () {
        if (this.fetched) {
          return;
        }
        this.fetched = true;

        context.startTime = (new Date()).getTime();

        var map = this.map;

        //If the manager is for a plugin managed resource,
        //ask the plugin to load it now.
        if (this.shim) {
          context.makeRequire(this.map, {
            enableBuildCallback: true
          })(this.shim.deps || [], bind(this, function () {
            return map.prefix ? this.callPlugin() : this.load();
          }));
        } else {
          //Regular dependency.
          return map.prefix ? this.callPlugin() : this.load();
        }
      },

      load: function () {
        var url = this.map.url;

        //Regular dependency.
        if (!urlFetched[url]) {
          urlFetched[url] = true;
          context.load(this.map.id, url);
        }
      },

      /**
       * Checks if the module is ready to define itself, and if so,
       * define it.
       */
      check: function () {
        if (!this.enabled || this.enabling) {
          return;
        }

        var err, cjsModule,
          id = this.map.id,
          depExports = this.depExports,
          exports = this.exports,
          factory = this.factory;

        if (!this.inited) {
          // Only fetch if not already in the defQueue.
          if (!hasProp(context.defQueueMap, id)) {
            this.fetch();
          }
        } else if (this.error) {
          this.emit('error', this.error);
        } else if (!this.defining) {
          //The factory could trigger another require call
          //that would result in checking this module to
          //define itself again. If already in the process
          //of doing that, skip this work.
          this.defining = true;

          if (this.depCount < 1 && !this.defined) {
            if (isFunction(factory)) {
              //If there is an error listener, favor passing
              //to that instead of throwing an error. However,
              //only do it for define()'d  modules. require
              //errbacks should not be called for failures in
              //their callbacks (#699). However if a global
              //onError is set, use that.
              if ((this.events.error && this.map.isDefine) ||
                req.onError !== defaultOnError) {
                try {
                  exports = context.execCb(id, factory, depExports, exports);
                } catch (e) {
                  err = e;
                }
              } else {
                exports = context.execCb(id, factory, depExports, exports);
              }

              // Favor return value over exports. If node/cjs in play,
              // then will not have a return value anyway. Favor
              // module.exports assignment over exports object.
              if (this.map.isDefine && exports === undefined) {
                cjsModule = this.module;
                if (cjsModule) {
                  exports = cjsModule.exports;
                } else if (this.usingExports) {
                  //exports already set the defined value.
                  exports = this.exports;
                }
              }

              if (err) {
                err.requireMap = this.map;
                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                err.requireType = this.map.isDefine ? 'define' : 'require';
                return onError((this.error = err));
              }

            } else {
              //Just a literal value
              exports = factory;
            }

            this.exports = exports;

            if (this.map.isDefine && !this.ignore) {
              defined[id] = exports;

              if (req.onResourceLoad) {
                var resLoadMaps = [];
                each(this.depMaps, function (depMap) {
                  resLoadMaps.push(depMap.normalizedMap || depMap);
                });
                req.onResourceLoad(context, this.map, resLoadMaps);
              }
            }

            //Clean up
            cleanRegistry(id);

            this.defined = true;
          }

          //Finished the define stage. Allow calling check again
          //to allow define notifications below in the case of a
          //cycle.
          this.defining = false;

          if (this.defined && !this.defineEmitted) {
            this.defineEmitted = true;
            this.emit('defined', this.exports);
            this.defineEmitComplete = true;
          }

        }
      },

      callPlugin: function () {
        var map = this.map,
          id = map.id,
          //Map already normalized the prefix.
          pluginMap = makeModuleMap(map.prefix);

        //Mark this as a dependency for this plugin, so it
        //can be traced for cycles.
        this.depMaps.push(pluginMap);

        on(pluginMap, 'defined', bind(this, function (plugin) {
          var load, normalizedMap, normalizedMod,
            bundleId = getOwn(bundlesMap, this.map.id),
            name = this.map.name,
            parentName = this.map.parentMap ? this.map.parentMap.name : null,
            localRequire = context.makeRequire(map.parentMap, {
              enableBuildCallback: true
            });

          //If current map is not normalized, wait for that
          //normalized name to load instead of continuing.
          if (this.map.unnormalized) {
            //Normalize the ID if the plugin allows it.
            if (plugin.normalize) {
              name = plugin.normalize(name, function (name) {
                return normalize(name, parentName, true);
              }) || '';
            }

            //prefix and name should already be normalized, no need
            //for applying map config again either.
            normalizedMap = makeModuleMap(map.prefix + '!' + name,
              this.map.parentMap);
            on(normalizedMap,
              'defined', bind(this, function (value) {
                this.map.normalizedMap = normalizedMap;
                this.init([], function () {
                  return value;
                }, null, {
                    enabled: true,
                    ignore: true
                  });
              }));

            normalizedMod = getOwn(registry, normalizedMap.id);
            if (normalizedMod) {
              //Mark this as a dependency for this plugin, so it
              //can be traced for cycles.
              this.depMaps.push(normalizedMap);

              if (this.events.error) {
                normalizedMod.on('error', bind(this, function (err) {
                  this.emit('error', err);
                }));
              }
              normalizedMod.enable();
            }

            return;
          }

          //If a paths config, then just load that file instead to
          //resolve the plugin, as it is built into that paths layer.
          if (bundleId) {
            this.map.url = context.nameToUrl(bundleId);
            this.load();
            return;
          }

          load = bind(this, function (value) {
            this.init([], function () {
              return value;
            }, null, {
                enabled: true
              });
          });

          load.error = bind(this, function (err) {
            this.inited = true;
            this.error = err;
            err.requireModules = [id];

            //Remove temp unnormalized modules for this module,
            //since they will never be resolved otherwise now.
            eachProp(registry, function (mod) {
              if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                cleanRegistry(mod.map.id);
              }
            });

            onError(err);
          });

          //Allow plugins to load other code without having to know the
          //context or how to 'complete' the load.
          load.fromText = bind(this, function (text, textAlt) {
            /*jslint evil: true */
            var moduleName = map.name,
              moduleMap = makeModuleMap(moduleName),
              hasInteractive = useInteractive;

            //As of 2.1.0, support just passing the text, to reinforce
            //fromText only being called once per resource. Still
            //support old style of passing moduleName but discard
            //that moduleName in favor of the internal ref.
            if (textAlt) {
              text = textAlt;
            }

            //Turn off interactive script matching for IE for any define
            //calls in the text, then turn it back on at the end.
            if (hasInteractive) {
              useInteractive = false;
            }

            //Prime the system by creating a module instance for
            //it.
            getModule(moduleMap);

            //Transfer any config to this other module.
            if (hasProp(config.config, id)) {
              config.config[moduleName] = config.config[id];
            }

            try {
              req.exec(text);
            } catch (e) {
              return onError(makeError('fromtexteval',
                'fromText eval for ' + id +
                ' failed: ' + e,
                e,
                [id]));
            }

            if (hasInteractive) {
              useInteractive = true;
            }

            //Mark this as a dependency for the plugin
            //resource
            this.depMaps.push(moduleMap);

            //Support anonymous modules.
            context.completeLoad(moduleName);

            //Bind the value of that module to the value for this
            //resource ID.
            localRequire([moduleName], load);
          });

          //Use parentName here since the plugin's name is not reliable,
          //could be some weird string with no path that actually wants to
          //reference the parentName's path.
          plugin.load(map.name, localRequire, load, config);
        }));

        context.enable(pluginMap, this);
        this.pluginMaps[pluginMap.id] = pluginMap;
      },

      enable: function () {
        enabledRegistry[this.map.id] = this;
        this.enabled = true;

        //Set flag mentioning that the module is enabling,
        //so that immediate calls to the defined callbacks
        //for dependencies do not trigger inadvertent load
        //with the depCount still being zero.
        this.enabling = true;

        //Enable each dependency
        each(this.depMaps, bind(this, function (depMap, i) {
          var id, mod, handler;

          if (typeof depMap === 'string') {
            //Dependency needs to be converted to a depMap
            //and wired up to this module.
            depMap = makeModuleMap(depMap,
              (this.map.isDefine ? this.map : this.map.parentMap),
              false,
              !this.skipMap);
            this.depMaps[i] = depMap;

            handler = getOwn(handlers, depMap.id);

            if (handler) {
              this.depExports[i] = handler(this);
              return;
            }

            this.depCount += 1;

            on(depMap, 'defined', bind(this, function (depExports) {
              if (this.undefed) {
                return;
              }
              this.defineDep(i, depExports);
              this.check();
            }));

            if (this.errback) {
              on(depMap, 'error', bind(this, this.errback));
            } else if (this.events.error) {
              // No direct errback on this module, but something
              // else is listening for errors, so be sure to
              // propagate the error correctly.
              on(depMap, 'error', bind(this, function (err) {
                this.emit('error', err);
              }));
            }
          }

          id = depMap.id;
          mod = registry[id];

          //Skip special modules like 'require', 'exports', 'module'
          //Also, don't call enable if it is already enabled,
          //important in circular dependency cases.
          if (!hasProp(handlers, id) && mod && !mod.enabled) {
            context.enable(depMap, this);
          }
        }));

        //Enable each plugin that is used in
        //a dependency
        eachProp(this.pluginMaps, bind(this, function (pluginMap) {
          var mod = getOwn(registry, pluginMap.id);
          if (mod && !mod.enabled) {
            context.enable(pluginMap, this);
          }
        }));

        this.enabling = false;

        this.check();
      },

      on: function (name, cb) {
        var cbs = this.events[name];
        if (!cbs) {
          cbs = this.events[name] = [];
        }
        cbs.push(cb);
      },

      emit: function (name, evt) {
        each(this.events[name], function (cb) {
          cb(evt);
        });
        if (name === 'error') {
          //Now that the error handler was triggered, remove
          //the listeners, since this broken Module instance
          //can stay around for a while in the registry.
          delete this.events[name];
        }
      }
    };

    function callGetModule(args) {
      //Skip modules already defined.
      if (!hasProp(defined, args[0])) {
        getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
      }
    }

    function removeListener(node, func, name, ieName) {
      //Favor detachEvent because of IE9
      //issue, see attachEvent/addEventListener comment elsewhere
      //in this file.
      if (node.detachEvent && !isOpera) {
        //Probably IE. If not it will throw an error, which will be
        //useful to know.
        if (ieName) {
          node.detachEvent(ieName, func);
        }
      } else {
        node.removeEventListener(name, func, false);
      }
    }

    /**
     * Given an event from a script node, get the requirejs info from it,
     * and then removes the event listeners on the node.
     * @param {Event} evt
     * @returns {Object}
     */
    function getScriptData(evt) {
      //Using currentTarget instead of target for Firefox 2.0's sake. Not
      //all old browsers will be supported, but this one was easy enough
      //to support and still makes sense.
      var node = evt.currentTarget || evt.srcElement;

      //Remove the listeners once here.
      removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
      removeListener(node, context.onScriptError, 'error');

      return {
        node: node,
        id: node && node.getAttribute('data-requiremodule')
      };
    }

    function intakeDefines() {
      var args;

      //Any defined modules in the global queue, intake them now.
      takeGlobalQueue();

      //Make sure any remaining defQueue items get properly processed.
      while (defQueue.length) {
        args = defQueue.shift();
        if (args[0] === null) {
          return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
            args[args.length - 1]));
        } else {
          //args are id, deps, factory. Should be normalized by the
          //define() function.
          callGetModule(args);
        }
      }
      context.defQueueMap = {};
    }

    context = {
      config: config,
      contextName: contextName,
      registry: registry,
      defined: defined,
      urlFetched: urlFetched,
      defQueue: defQueue,
      defQueueMap: {},
      Module: Module,
      makeModuleMap: makeModuleMap,
      nextTick: req.nextTick,
      onError: onError,

      /**
       * Set a configuration for the context.
       * @param {Object} cfg config object to integrate.
       */
      configure: function (cfg) {
        //Make sure the baseUrl ends in a slash.
        if (cfg.baseUrl) {
          if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
            cfg.baseUrl += '/';
          }
        }

        // Convert old style urlArgs string to a function.
        if (typeof cfg.urlArgs === 'string') {
          var urlArgs = cfg.urlArgs;
          cfg.urlArgs = function (id, url) {
            return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
          };
        }

        //Save off the paths since they require special processing,
        //they are additive.
        var shim = config.shim,
          objs = {
            paths: true,
            bundles: true,
            config: true,
            map: true
          };

        eachProp(cfg, function (value, prop) {
          if (objs[prop]) {
            if (!config[prop]) {
              config[prop] = {};
            }
            mixin(config[prop], value, true, true);
          } else {
            config[prop] = value;
          }
        });

        //Reverse map the bundles
        if (cfg.bundles) {
          eachProp(cfg.bundles, function (value, prop) {
            each(value, function (v) {
              if (v !== prop) {
                bundlesMap[v] = prop;
              }
            });
          });
        }

        //Merge shim
        if (cfg.shim) {
          eachProp(cfg.shim, function (value, id) {
            //Normalize the structure
            if (isArray(value)) {
              value = {
                deps: value
              };
            }
            if ((value.exports || value.init) && !value.exportsFn) {
              value.exportsFn = context.makeShimExports(value);
            }
            shim[id] = value;
          });
          config.shim = shim;
        }

        //Adjust packages if necessary.
        if (cfg.packages) {
          each(cfg.packages, function (pkgObj) {
            var location, name;

            pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

            name = pkgObj.name;
            location = pkgObj.location;
            if (location) {
              config.paths[name] = pkgObj.location;
            }

            //Save pointer to main module ID for pkg name.
            //Remove leading dot in main, so main paths are normalized,
            //and remove any trailing .js, since different package
            //envs have different conventions: some use a module name,
            //some use a file name.
            config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
              .replace(currDirRegExp, '')
              .replace(jsSuffixRegExp, '');
          });
        }

        //If there are any "waiting to execute" modules in the registry,
        //update the maps for them, since their info, like URLs to load,
        //may have changed.
        eachProp(registry, function (mod, id) {
          //If module already has init called, since it is too
          //late to modify them, and ignore unnormalized ones
          //since they are transient.
          if (!mod.inited && !mod.map.unnormalized) {
            mod.map = makeModuleMap(id, null, true);
          }
        });

        //If a deps array or a config callback is specified, then call
        //require with those args. This is useful when require is defined as a
        //config object before require.js is loaded.
        if (cfg.deps || cfg.callback) {
          context.require(cfg.deps || [], cfg.callback);
        }
      },

      makeShimExports: function (value) {
        function fn() {
          var ret;
          if (value.init) {
            ret = value.init.apply(global, arguments);
          }
          return ret || (value.exports && getGlobal(value.exports));
        }

        return fn;
      },

      makeRequire: function (relMap, options) {
        options = options || {};

        function localRequire(deps, callback, errback) {
          var id, map, requireMod;

          if (options.enableBuildCallback && callback && isFunction(callback)) {
            callback.__requireJsBuild = true;
          }

          if (typeof deps === 'string') {
            if (isFunction(callback)) {
              //Invalid call
              return onError(makeError('requireargs', 'Invalid require call'), errback);
            }

            //If require|exports|module are requested, get the
            //value for them from the special handlers. Caveat:
            //this only works while module is being defined.
            if (relMap && hasProp(handlers, deps)) {
              return handlers[deps](registry[relMap.id]);
            }

            //Synchronous access to one module. If require.get is
            //available (as in the Node adapter), prefer that.
            if (req.get) {
              return req.get(context, deps, relMap, localRequire);
            }

            //Normalize module name, if it contains . or ..
            map = makeModuleMap(deps, relMap, false, true);
            id = map.id;

            if (!hasProp(defined, id)) {
              return onError(makeError('notloaded', 'Module name "' +
                id +
                '" has not been loaded yet for context: ' +
                contextName +
                (relMap ? '' : '. Use require([])')));
            }
            return defined[id];
          }

          //Grab defines waiting in the global queue.
          intakeDefines();

          //Mark all the dependencies as needing to be loaded.
          context.nextTick(function () {
            //Some defines could have been added since the
            //require call, collect them.
            intakeDefines();

            requireMod = getModule(makeModuleMap(null, relMap));

            //Store if map config should be applied to this require
            //call for dependencies.
            requireMod.skipMap = options.skipMap;

            requireMod.init(deps, callback, errback, {
              enabled: true
            });

            checkLoaded();
          });

          return localRequire;
        }

        mixin(localRequire, {
          isBrowser: isBrowser,

          /**
           * Converts a module name + .extension into an URL path.
           * *Requires* the use of a module name. It does not support using
           * plain URLs like nameToUrl.
           */
          toUrl: function (moduleNamePlusExt) {
            var ext,
              index = moduleNamePlusExt.lastIndexOf('.'),
              segment = moduleNamePlusExt.split('/')[0],
              isRelative = segment === '.' || segment === '..';

            //Have a file extension alias, and it is not the
            //dots from a relative path.
            if (index !== -1 && (!isRelative || index > 1)) {
              ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
              moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
            }

            return context.nameToUrl(normalize(moduleNamePlusExt,
              relMap && relMap.id, true), ext, true);
          },

          defined: function (id) {
            return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
          },

          specified: function (id) {
            id = makeModuleMap(id, relMap, false, true).id;
            return hasProp(defined, id) || hasProp(registry, id);
          }
        });

        //Only allow undef on top level require calls
        if (!relMap) {
          localRequire.undef = function (id) {
            //Bind any waiting define() calls to this context,
            //fix for #408
            takeGlobalQueue();

            var map = makeModuleMap(id, relMap, true),
              mod = getOwn(registry, id);

            mod.undefed = true;
            removeScript(id);

            delete defined[id];
            delete urlFetched[map.url];
            delete undefEvents[id];

            //Clean queued defines too. Go backwards
            //in array so that the splices do not
            //mess up the iteration.
            eachReverse(defQueue, function (args, i) {
              if (args[0] === id) {
                defQueue.splice(i, 1);
              }
            });
            delete context.defQueueMap[id];

            if (mod) {
              //Hold on to listeners in case the
              //module will be attempted to be reloaded
              //using a different config.
              if (mod.events.defined) {
                undefEvents[id] = mod.events;
              }

              cleanRegistry(id);
            }
          };
        }

        return localRequire;
      },

      /**
       * Called to enable a module if it is still in the registry
       * awaiting enablement. A second arg, parent, the parent module,
       * is passed in for context, when this method is overridden by
       * the optimizer. Not shown here to keep code compact.
       */
      enable: function (depMap) {
        var mod = getOwn(registry, depMap.id);
        if (mod) {
          getModule(depMap).enable();
        }
      },

      /**
       * Internal method used by environment adapters to complete a load event.
       * A load event could be a script load or just a load pass from a synchronous
       * load call.
       * @param {String} moduleName the name of the module to potentially complete.
       */
      completeLoad: function (moduleName) {
        var found, args, mod,
          shim = getOwn(config.shim, moduleName) || {},
          shExports = shim.exports;

        takeGlobalQueue();

        while (defQueue.length) {
          args = defQueue.shift();
          if (args[0] === null) {
            args[0] = moduleName;
            //If already found an anonymous module and bound it
            //to this name, then this is some other anon module
            //waiting for its completeLoad to fire.
            if (found) {
              break;
            }
            found = true;
          } else if (args[0] === moduleName) {
            //Found matching define call for this script!
            found = true;
          }

          callGetModule(args);
        }
        context.defQueueMap = {};

        //Do this after the cycle of callGetModule in case the result
        //of those calls/init calls changes the registry.
        mod = getOwn(registry, moduleName);

        if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
          if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
            if (hasPathFallback(moduleName)) {
              return;
            } else {
              return onError(makeError('nodefine',
                'No define call for ' + moduleName,
                null,
                [moduleName]));
            }
          } else {
            //A script that does not call define(), so just simulate
            //the call for it.
            callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
          }
        }

        checkLoaded();
      },

      /**
       * Converts a module name to a file path. Supports cases where
       * moduleName may actually be just an URL.
       * Note that it **does not** call normalize on the moduleName,
       * it is assumed to have already been normalized. This is an
       * internal API, not a public one. Use toUrl for the public API.
       */
      nameToUrl: function (moduleName, ext, skipExt) {
        var paths, syms, i, parentModule, url,
          parentPath, bundleId,
          pkgMain = getOwn(config.pkgs, moduleName);

        if (pkgMain) {
          moduleName = pkgMain;
        }

        bundleId = getOwn(bundlesMap, moduleName);

        if (bundleId) {
          return context.nameToUrl(bundleId, ext, skipExt);
        }

        //If a colon is in the URL, it indicates a protocol is used and it is just
        //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
        //or ends with .js, then assume the user meant to use an url and not a module id.
        //The slash is important for protocol-less URLs as well as full paths.
        if (req.jsExtRegExp.test(moduleName)) {
          //Just a plain path, not module name lookup, so just return it.
          //Add extension if it is included. This is a bit wonky, only non-.js things pass
          //an extension, this method probably needs to be reworked.
          url = moduleName + (ext || '');
        } else {
          //A module that needs to be converted to a path.
          paths = config.paths;

          syms = moduleName.split('/');
          //For each module name segment, see if there is a path
          //registered for it. Start with most specific name
          //and work up from it.
          for (i = syms.length; i > 0; i -= 1) {
            parentModule = syms.slice(0, i).join('/');

            parentPath = getOwn(paths, parentModule);
            if (parentPath) {
              //If an array, it means there are a few choices,
              //Choose the one that is desired
              if (isArray(parentPath)) {
                parentPath = parentPath[0];
              }
              syms.splice(0, i, parentPath);
              break;
            }
          }

          //Join the path parts together, then figure out if baseUrl is needed.
          url = syms.join('/');
          url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
          url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
        }

        return config.urlArgs && !/^blob\:/.test(url) ?
          url + config.urlArgs(moduleName, url) : url;
      },

      //Delegates to req.load. Broken out as a separate function to
      //allow overriding in the optimizer.
      load: function (id, url) {
        req.load(context, id, url);
      },

      /**
       * Executes a module callback function. Broken out as a separate function
       * solely to allow the build system to sequence the files in the built
       * layer in the right sequence.
       *
       * @private
       */
      execCb: function (name, callback, args, exports) {
        return callback.apply(exports, args);
      },

      /**
       * callback for script loads, used to check status of loading.
       *
       * @param {Event} evt the event from the browser for the script
       * that was loaded.
       */
      onScriptLoad: function (evt) {
        //Using currentTarget instead of target for Firefox 2.0's sake. Not
        //all old browsers will be supported, but this one was easy enough
        //to support and still makes sense.
        if (evt.type === 'load' ||
          (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
          //Reset interactive script so a script node is not held onto for
          //to long.
          interactiveScript = null;

          //Pull out the name of the module and the context.
          var data = getScriptData(evt);
          context.completeLoad(data.id);
        }
      },

      /**
       * Callback for script errors.
       */
      onScriptError: function (evt) {
        var data = getScriptData(evt);
        if (!hasPathFallback(data.id)) {
          var parents = [];
          eachProp(registry, function (value, key) {
            if (key.indexOf('_@r') !== 0) {
              each(value.depMaps, function (depMap) {
                if (depMap.id === data.id) {
                  parents.push(key);
                  return true;
                }
              });
            }
          });
          return onError(makeError('scripterror', 'Script error for "' + data.id +
            (parents.length ?
              '", needed by: ' + parents.join(', ') :
              '"'), evt, [data.id]));
        }
      }
    };

    context.require = context.makeRequire();
    return context;
  }

  /**
   * Main entry point.
   *
   * If the only argument to require is a string, then the module that
   * is represented by that string is fetched for the appropriate context.
   *
   * If the first argument is an array, then it will be treated as an array
   * of dependency string names to fetch. An optional function callback can
   * be specified to execute when all of those dependencies are available.
   *
   * Make a local req variable to help Caja compliance (it assumes things
   * on a require that are not standardized), and to give a short
   * name for minification/local scope use.
   */
  req = requirejs = cb.requireInner = function (deps, callback, errback, optional) {

    //Find the right context, use default
    var context, config,
      contextName = defContextName;

    // Determine if have config object in the call.
    if (!isArray(deps) && typeof deps !== 'string') {
      // deps is a config object
      config = deps;
      if (isArray(callback)) {
        // Adjust args if there are dependencies
        deps = callback;
        callback = errback;
        errback = optional;
      } else {
        deps = [];
      }
    }

    if (config && config.context) {
      contextName = config.context;
    }

    context = getOwn(contexts, contextName);
    if (!context) {
      context = contexts[contextName] = req.s.newContext(contextName);
    }

    if (config) {
      context.configure(config);
    }

    return context.require(deps, callback, errback);
  };

  /**
   * Support require.config() to make it easier to cooperate with other
   * AMD loaders on globally agreed names.
   */
  req.config = function (config) {
    return req(config);
  };

  /**
   * Execute something after the current tick
   * of the event loop. Override for other envs
   * that have a better solution than setTimeout.
   * @param  {Function} fn function to execute later.
   */
  req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
    setTimeout(fn, 4);
  } : function (fn) {
    fn();
  };

  /**
   * Export require as a global, but only if it does not already exist.
   */
  if (!require) {
    require = req;
  }

  req.version = version;

  //Used to filter out dependencies that are already paths.
  req.jsExtRegExp = /^\/|:|\?|\.js$/;
  req.isBrowser = isBrowser;
  s = req.s = {
    contexts: contexts,
    newContext: newContext
  };

  //Create default context.
  req({});

  //Exports some context-sensitive methods on global require.
  each([
    'toUrl',
    'undef',
    'defined',
    'specified'
  ], function (prop) {
    //Reference from contexts instead of early binding to default context,
    //so that during builds, the latest instance of the default context
    //with its config gets used.
    req[prop] = function () {
      var ctx = contexts[defContextName];
      return ctx.require[prop].apply(ctx, arguments);
    };
  });

  if (isBrowser) {
    head = s.head = document.getElementsByTagName('head')[0];
    //If BASE tag is in play, using appendChild is a problem for IE6.
    //When that browser dies, this can be removed. Details in this jQuery bug:
    //http://dev.jquery.com/ticket/2709
    baseElement = document.getElementsByTagName('base')[0];
    if (baseElement) {
      head = s.head = baseElement.parentNode;
    }
  }

  /**
   * Any errors that require explicitly generates will be passed to this
   * function. Intercept/override it if you want custom error handling.
   * @param {Error} err the error object.
   */
  req.onError = defaultOnError;

  /**
   * Creates the node for the load command. Only used in browser envs.
   */
  req.createNode = function (config, moduleName, url) {
    var node = config.xhtml ?
      document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
      document.createElement('script');
    node.type = config.scriptType || 'text/javascript';
    node.charset = 'utf-8';
    node.async = true;
    return node;
  };

  /**
   * Does the request to load a module for the browser case.
   * Make this a separate function to allow other environments
   * to override it.
   *
   * @param {Object} context the require context to find state.
   * @param {String} moduleName the name of the module.
   * @param {Object} url the URL to the module.
   */
  req.load = function (context, moduleName, url) {
    var config = (context && context.config) || {},
      node;
    if (isBrowser) {
      //In the browser so use a script tag
      node = req.createNode(config, moduleName, url);

      node.setAttribute('data-requirecontext', context.contextName);
      node.setAttribute('data-requiremodule', moduleName);

      //Set up load listener. Test attachEvent first because IE9 has
      //a subtle issue in its addEventListener and script onload firings
      //that do not match the behavior of all other browsers with
      //addEventListener support, which fire the onload event for a
      //script right after the script execution. See:
      //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
      //UNFORTUNATELY Opera implements attachEvent but does not follow the script
      //script execution mode.
      if (node.attachEvent &&
        //Check if node.attachEvent is artificially added by custom script or
        //natively supported by browser
        //read https://github.com/requirejs/requirejs/issues/187
        //if we can NOT find [native code] then it must NOT natively supported.
        //in IE8, node.attachEvent does not have toString()
        //Note the test for "[native code" with no closing brace, see:
        //https://github.com/requirejs/requirejs/issues/273
        !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
        !isOpera) {
        //Probably IE. IE (at least 6-8) do not fire
        //script onload right after executing the script, so
        //we cannot tie the anonymous define call to a name.
        //However, IE reports the script as being in 'interactive'
        //readyState at the time of the define call.
        useInteractive = true;

        node.attachEvent('onreadystatechange', context.onScriptLoad);
        //It would be great to add an error handler here to catch
        //404s in IE9+. However, onreadystatechange will fire before
        //the error handler, so that does not help. If addEventListener
        //is used, then IE will fire error before load, but we cannot
        //use that pathway given the connect.microsoft.com issue
        //mentioned above about not doing the 'script execute,
        //then fire the script load event listener before execute
        //next script' that other browsers do.
        //Best hope: IE10 fixes the issues,
        //and then destroys all installs of IE 6-9.
        //node.attachEvent('onerror', context.onScriptError);
      } else {
        node.addEventListener('load', context.onScriptLoad, false);
        node.addEventListener('error', context.onScriptError, false);
      }
      node.src = url;

      //Calling onNodeCreated after all properties on the node have been
      //set, but before it is placed in the DOM.
      if (config.onNodeCreated) {
        config.onNodeCreated(node, config, moduleName, url);
      }

      //For some cache cases in IE 6-8, the script executes before the end
      //of the appendChild execution, so to tie an anonymous define
      //call to the module name (which is stored on the node), hold on
      //to a reference to this node, but clear after the DOM insertion.
      currentlyAddingScript = node;
      if (baseElement) {
        head.insertBefore(node, baseElement);
      } else {
        head.appendChild(node);
      }
      currentlyAddingScript = null;

      return node;
    } else if (isWebWorker) {
      try {
        //In a web worker, use importScripts. This is not a very
        //efficient use of importScripts, importScripts will block until
        //its script is downloaded and evaluated. However, if web workers
        //are in play, the expectation is that a build has been done so
        //that only one script needs to be loaded anyway. This may need
        //to be reevaluated if other use cases become common.

        // Post a task to the event loop to work around a bug in WebKit
        // where the worker gets garbage-collected after calling
        // importScripts(): https://webkit.org/b/153317
        setTimeout(function () {
        }, 0);
        importScripts(url);

        //Account for anonymous modules
        context.completeLoad(moduleName);
      } catch (e) {
        context.onError(makeError('importscripts',
          'importScripts failed for ' +
          moduleName + ' at ' + url,
          e,
          [moduleName]));
      }
    }
  };

  function getInteractiveScript() {
    if (interactiveScript && interactiveScript.readyState === 'interactive') {
      return interactiveScript;
    }

    eachReverse(scripts(), function (script) {
      if (script.readyState === 'interactive') {
        return (interactiveScript = script);
      }
    });
    return interactiveScript;
  }

  //Look for a data-main script attribute, which could also adjust the baseUrl.
  if (isBrowser && !cfg.skipDataMain) {
    //Figure out baseUrl. Get it from the script tag with require.js in it.
    eachReverse(scripts(), function (script) {
      //Set the 'head' where we can append children by
      //using the script's parent.
      if (!head) {
        head = script.parentNode;
      }

      //Look for a data-main attribute to set main script for the page
      //to load. If it is there, the path to data main becomes the
      //baseUrl, if it is not already set.
      dataMain = script.getAttribute('data-main');
      if (dataMain) {
        //Preserve dataMain in case it is a path (i.e. contains '?')
        mainScript = dataMain;

        //Set final baseUrl if there is not already an explicit one,
        //but only do so if the data-main value is not a loader plugin
        //module ID.
        if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
          //Pull off the directory of data-main for use as the
          //baseUrl.
          src = mainScript.split('/');
          mainScript = src.pop();
          subPath = src.length ? src.join('/') + '/' : './';

          cfg.baseUrl = subPath;
        }

        //Strip off any trailing .js since mainScript is now
        //like a module name.
        mainScript = mainScript.replace(jsSuffixRegExp, '');

        //If mainScript is still a path, fall back to dataMain
        if (req.jsExtRegExp.test(mainScript)) {
          mainScript = dataMain;
        }

        //Put the data-main script in the files to load.
        cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

        return true;
      }
    });
  }

  /**
   * The function that handles definitions of modules. Differs from
   * require() in that a string for the module should be the first argument,
   * and the function to execute after dependencies are loaded should
   * return a value to define the module corresponding to the first argument's
   * name.
   */
  define = cb.defineInner = function (name, deps, callback) {
    var node, context;

    //Allow for anonymous modules
    if (typeof name !== 'string') {
      //Adjust args appropriately
      callback = deps;
      deps = name;
      name = null;
    }

    //This module may not have dependencies
    if (!isArray(deps)) {
      callback = deps;
      deps = null;
    }

    //If no name, and callback is a function, then figure out if it a
    //CommonJS thing with dependencies.
    if (!deps && isFunction(callback)) {
      deps = [];
      //Remove comments from the callback string,
      //look for require calls, and pull them into the dependencies,
      //but only if there are function args.
      if (callback.length) {
        callback
          .toString()
          .replace(commentRegExp, commentReplace)
          .replace(cjsRequireRegExp, function (match, dep) {
            deps.push(dep);
          });

        //May be a CommonJS thing even without require calls, but still
        //could use exports, and module. Avoid doing exports and module
        //work though if it just needs require.
        //REQUIRES the function to expect the CommonJS variables in the
        //order listed below.
        deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
      }
    }

    //If in IE 6-8 and hit an anonymous define() call, do the interactive
    //work.
    if (useInteractive) {
      node = currentlyAddingScript || getInteractiveScript();
      if (node) {
        if (!name) {
          name = node.getAttribute('data-requiremodule');
        }
        context = contexts[node.getAttribute('data-requirecontext')];
      }
    }

    //Always save off evaluating the def call until the script onload handler.
    //This allows multiple modules to be in a file without prematurely
    //tracing dependencies, and allows for anonymous module support,
    //where the module name is not known until the script onload event
    //occurs. If no context, use the global queue, and get it processed
    //in the onscript load callback.
    if (context) {
      context.defQueue.push([name, deps, callback]);
      context.defQueueMap[name] = true;
    } else {
      globalDefQueue.push([name, deps, callback]);
    }
  };

  define.amd = {
    jQuery: true
  };

  /**
   * Executes the text. Normally just uses eval, but can be modified
   * to use a better, environment-specific call. Only used for transpiling
   * loader plugins, not for plain JS modules.
   * @param {String} text the text to execute/evaluate.
   */
  req.exec = function (text) {
    /*jslint evil: true */
    return eval(text);
  };

  //Set up with config info.
  req(cfg);
}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));

cb.utils.loadModule = function (deps, callback, errback) {
  if (!cb.utils.isArray(deps)) {
    deps();
    return;
  }
  var args = [];
  var req = require.context('../../../client/business');
  try {
    deps.forEach(function (item) {
      args.push(req('./' + item));
    });
  } catch (error) {
    if (errback)
      errback(error);
    return;
  }
  callback.apply(this, args);
};

cb.require = function (deps, callback, errback) {
  if (true) {
    cb.utils.loadModule(deps, callback, errback);
    return;
  }
  cb.requireInner(deps, callback, errback);
};

cb.define = function (deps, callback) {
  if (true) {
    cb.utils.loadModule(deps, callback);
    return;
  }
  cb.defineInner(deps, callback);
};


// 挂载到cube上的电子秤方法，初始防错预制，最后在html.jsx里写入
function logError() {
  // console.error('本地未接电子秤')
}

cb.electron = {
  getSharedObject: logError,
  sendOrder: function () {
    logError()
    return {
      then: logError
    }
  }
}
