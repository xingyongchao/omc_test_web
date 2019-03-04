'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
function combine(baseurl, pathname) {
  var separator = /\/$/.test(baseurl) === false && /^\//.test(pathname) === false ? '/' : '';
  return Array.prototype.slice.call(arguments, 0).join(separator);
}

/**
 * 提供fetch函数的第二个参数
 */
var genFetchOptions = exports.genFetchOptions = function genFetchOptions(method, headers, paramsObj) {
  var _headers = headers,
      _paramsObj = paramsObj;

  if (paramsObj === undefined) {
    _paramsObj = headers;
    _headers = {
      'content-type': 'application/json'
    };
  }
  return {
    method: method,
    headers: _headers,
    body: JSON.stringify(_paramsObj),
    credentials: 'include'
  };
};

/**
 * 将fetch函数的response转化为json格式
 */
var toJSON = exports.toJSON = function toJSON(response) {
  if (response.status !== 200) {
    return response.text().then(function (text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        var items = [];
        items.push(response.statusText);
        items.push(text);
        items.push('(' + response.url + ')');
        return {
          code: process.env.__CLIENT__ ? response.status : 500,
          message: items.join('\r\n')
        };
      }
    });
  }
  return response.text().then(function (text) {
    try {
      // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
      // because the buffer-to-string conversion in `fs.readFileSync()`
      // translates it to FEFF, the UTF-16 BOM.
      if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
      return JSON.parse(text);
    } catch (e) {
      var items = [];
      items.push(e.message);
      items.push(text);
      items.push('(' + response.url + ')');
      return {
        code: 500,
        message: '\u63A5\u53E3\u8FD4\u56DE\u683C\u5F0F\u4E0D\u662Fapplication/json\u683C\u5F0F\uFF1A' + items.join('\r\n')
      };
    }
  });
};

/**
 * 提供fetch函数的异常捕捉参数
 */
var catchException = exports.catchException = function catchException(error) {
  var errInfo = error.toString();
  console.error(errInfo);
  return {
    code: 500,
    message: process.env.NODE_ENV === 'development' ? errInfo : '网络异常'
  };
};

var doFetch = exports.doFetch = function doFetch(url) {
  var options = genFetchOptions('get');
  return fetch(url, options).then(toJSON, catchException).then(function (json) {
    return {
      code: 200,
      data: json
    };
  });
};

/**
 * 生成一个redux可用的action对象
 */
var genAction = exports.genAction = function genAction(type, payload) {
  return {
    type: type,
    payload: payload
  };
};

/**
 * 处理fetch接口后的业务状态码，如登陆失效
 */
var auth = exports.auth = function auth(json, dispatch) {
  if (json.code === 900) {
    // dispatch({ type: 'PLATFORM_DATA_LOGIN_OUT' });
    cb.route.redirectLoginPage();
    return;
  }
  return json;
};

var uniformProxy = exports.uniformProxy = function uniformProxy(config) {
  var method = config.method && config.method.trim().toLocaleUpperCase() || 'GET';
  var headers = config.headers || { 'Content-Type': 'application/json;charset=utf-8' };
  var credentials = 'include';
  var url = config.url;
  var args = [];
  if (method === 'GET' || method === 'DELETE') {
    args.push(url);
    args.push({ method: method, headers: headers, credentials: credentials });
  } else if (method === 'POST' || method === 'PUT') {
    var body = JSON.stringify(config.params);
    args.push(url);
    args.push({ method: method, headers: headers, body: body, credentials: credentials });
  }
  return fetch.apply(null, args).then(toJSON, catchException);
};

var rebuildTreeData = exports.rebuildTreeData = function rebuildTreeData(treeData, orgMenus, storeMenus) {
  treeData.forEach(function (item) {
    if (item.children) {
      if (item.code === 'SJ99') {
        item.cols = 2;
        item.children = item.children.slice(0, 20);
      }
      rebuildTreeData(item.children, orgMenus, storeMenus);
    } else {
      item.disabled = !item.viewType;
      item.isShopRelated ? storeMenus.push(item) : orgMenus.push(item);
    }
  });
};

var xhr = function xhr(config) {
  var url = config.url,
      method = config.method,
      options = config.options,
      params = config.params;

  var xhrProxy = cb.rest.DynamicProxy.create({ fetch: { url: url, method: method, options: options } });
  return new Promise(function (resolve) {
    xhrProxy.fetch(params, function (err, result) {
      resolve(err ? err : { code: 200, data: result });
    });
  });
};

var proxy = exports.proxy = function proxy(config) {
  if (cb.rest.mode === 'xhr' || config.options && config.options.jsonp) return xhr(config);
  var mode = config.crossDomain ? 'cors' : null;
  var method = config.method && config.method.trim().toLocaleUpperCase() || 'GET';
  var headers = config.headers || config.crossDomain ? {} : { 'Content-Type': 'application/json;charset=utf-8' };
  var credentials = config.crossDomain ? null : 'include';
  var url = cb.rest._getUrl(config.url, config.options);
  var args = [];
  if (method === 'GET' || method === 'DELETE') {
    url = cb.rest._appendUrl(url, config.params);
    args.push(url);
    args.push({ method: method, mode: mode, headers: headers, credentials: credentials });
  } else if (method === 'POST' || method === 'PUT') {
    var body = JSON.stringify(config.params);
    args.push(url);
    args.push({ method: method, mode: mode, headers: headers, body: body, credentials: credentials });
  }
  cb.utils.loading(true);
  return fetch.apply(null, args).then(toJSON, catchException).then(function (json) {
    cb.utils.loading(false);
    if (json.code === 900) {
      cb.route.redirectLoginPage();
      return;
    }
    return json;
  });
};

var getPredicateValue = exports.getPredicateValue = function getPredicateValue(formatValue) {
  var exp = /<%.*?%>/g;
  var items = formatValue.match(exp);
  if (!items) return formatValue;
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
  if (!valid) return formatValue;
  return formatValue.replace(exp, function (key) {
    return values[key];
  });
};

var getFormatValue = exports.getFormatValue = function getFormatValue(value, format) {
  var showValue = value,
      prefix = null,
      suffix = null;
  if (!cb.utils.isEmpty(value) && format) {
    if (format.before) {
      prefix = getPredicateValue(format.before);
      showValue = prefix + showValue;
    }
    if (format.after) {
      suffix = getPredicateValue(format.after);
      showValue += suffix;
    }
  }
  return { showValue: showValue, prefix: prefix, suffix: suffix };
};

// toFixed它是一个四舍六入五成双的诡异的方法，"四舍六入五成双"含义：对于位数很多的近似数，当有效位数确定后，其后面多余的数字应该舍去，只保留有效数字最末一位，这种修约（舍入）规则是“四舍六入五成双”，也即“4舍6入5凑偶”这里“四”是指≤4 时舍去，"六"是指≥6时进上，"五"指的是根据5后面的数字来定，当5后有数时，舍5入1；当5后无有效数字时，需要分两种情况来讲：①5前为奇数，舍5入1；②5前为偶数，舍5不进。（0是偶数）
var getRoundValue = exports.getRoundValue = function getRoundValue(value, decimal) {
  if (!decimal) return value;
  var pow = Math.pow(10, decimal);
  var returnValue = Math.round(Math.abs(value) * pow) / pow;
  if (value < 0) returnValue = -returnValue;
  return returnValue.toFixed(decimal);
};

/* 加减乘法过程中出现浮点数，导致精度格式化后错误（first, second存在小数时，有可能出现此问题）*/
var getMultiplication = exports.getMultiplication = function getMultiplication(first, second, type) {
  first = parseFloat(first);
  second = parseFloat(second);
  var firstArr = first.toString().split('.');
  var secondArr = second.toString().split('.');
  var first_decimal = firstArr.length > 1 ? firstArr[1].length : 0;
  var second_decimal = secondArr.length > 1 ? secondArr[1].length : 0;
  var total_decimal = 0;
  if (type === 'Multiplication') {
    total_decimal = first_decimal + second_decimal;
    return parseFloat((first * second).toFixed(total_decimal));
  }
  if (type === 'add') {
    total_decimal = first_decimal >= second_decimal ? first_decimal : second_decimal;
    return parseFloat((first + second).toFixed(total_decimal));
  }
  if (type === 'subduction') {
    total_decimal = first_decimal >= second_decimal ? first_decimal : second_decimal;
    return parseFloat((first - second).toFixed(total_decimal));
  }
};