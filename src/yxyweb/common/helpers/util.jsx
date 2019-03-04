export function combine(baseurl, pathname) {
  const separator = (/\/$/.test(baseurl) === false && /^\//.test(pathname) === false) ? '/' : ''
  return Array.prototype.slice.call(arguments, 0).join(separator)
}

/**
 * 提供fetch函数的第二个参数
 */
export const genFetchOptions = (method, headers, paramsObj) => {
  let _headers = headers, _paramsObj = paramsObj

  if (paramsObj === undefined) {
    _paramsObj = headers
    _headers = {
      'content-type': 'application/json'
    }
  }
  return {
    method,
    headers: _headers,
    body: JSON.stringify(_paramsObj),
    credentials: 'include',
  }
}

/**
 * 将fetch函数的response转化为json格式
 */
export const toJSON = response => {
  if (response.status !== 200) {
    return response.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (e) {
        const items = [];
        items.push(response.statusText);
        items.push(text);
        items.push('(' + response.url + ')');
        return {
          code: process.env.__CLIENT__ ? response.status : 500,
          message: items.join('\r\n')
        }
      }
    })
  }
  return response.text().then(text => {
    try {
      // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
      // because the buffer-to-string conversion in `fs.readFileSync()`
      // translates it to FEFF, the UTF-16 BOM.
      if (text.charCodeAt(0) === 0xFEFF)
        text = text.slice(1);
      return JSON.parse(text);
    } catch (e) {
      const items = [];
      items.push(e.message);
      items.push(text);
      items.push('(' + response.url + ')');
      return {
        code: 500,
        message: `接口返回格式不是application/json格式：${items.join('\r\n')}`
      }
    }
  })
}

/**
 * 提供fetch函数的异常捕捉参数
 */
export const catchException = error => {
  const errInfo = error.toString();
  console.error(errInfo);
  return {
    code: 500,
    message: process.env.NODE_ENV === 'development' ? errInfo : '网络异常'
  }
}

export const doFetch = function (url) {
  const options = genFetchOptions('get');
  return fetch(url, options)
    .then(toJSON, catchException)
    .then(json => {
      return {
        code: 200,
        data: json
      }
    })
}

/**
 * 生成一个redux可用的action对象
 */
export const genAction = (type, payload) => {
  return {
    type,
    payload
  }
}

/**
 * 处理fetch接口后的业务状态码，如登陆失效
 */
export const auth = (json, dispatch) => {
  if (json.code === 900) {
    // dispatch({ type: 'PLATFORM_DATA_LOGIN_OUT' });
    cb.route.redirectLoginPage();
    return;
  }
  return json
}

export const uniformProxy = (config) => {
  const method = config.method && config.method.trim().toLocaleUpperCase() || 'GET';
  const headers = config.headers || { 'Content-Type': 'application/json;charset=utf-8' };
  const credentials = 'include';
  const url = config.url;
  const args = [];
  if (method === 'GET' || method === 'DELETE') {
    args.push(url);
    args.push({ method, headers, credentials });
  }
  else if (method === 'POST' || method === 'PUT') {
    const body = JSON.stringify(config.params);
    args.push(url);
    args.push({ method, headers, body, credentials });
  }
  return fetch.apply(null, args)
    .then(toJSON, catchException);
}

export const rebuildTreeData = (treeData, orgMenus, storeMenus) => {
  treeData.forEach(item => {
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
}

const xhr = (config) => {
  const { url, method, options, params } = config;
  const xhrProxy = cb.rest.DynamicProxy.create({ fetch: { url, method, options } });
  return new Promise(resolve => {
    xhrProxy.fetch(params, (err, result) => {
      resolve(err ? err : { code: 200, data: result });
    });
  });
};

export const proxy = (config) => {
  if (cb.rest.mode === 'xhr' || config.options && config.options.jsonp)
    return xhr(config);
  const mode = config.crossDomain ? 'cors' : null;
  const method = config.method && config.method.trim().toLocaleUpperCase() || 'GET';
  const headers = config.headers || config.crossDomain ? {} : { 'Content-Type': 'application/json;charset=utf-8' };
  const credentials = config.crossDomain ? null : 'include';
  let url = cb.rest._getUrl(config.url, config.options);
  const args = [];
  if (method === 'GET' || method === 'DELETE') {
    url = cb.rest._appendUrl(url, config.params);
    args.push(url);
    args.push({ method, mode, headers, credentials });
  }
  else if (method === 'POST' || method === 'PUT') {
    const body = JSON.stringify(config.params);
    args.push(url);
    args.push({ method, mode, headers, body, credentials });
  }
  cb.utils.loading(true);
  return fetch.apply(null, args)
    .then(toJSON, catchException)
    .then(function (json) {
      cb.utils.loading(false);
      if (json.code === 900) {
        cb.route.redirectLoginPage();
        return;
      }
      return json;
    });
}

export const getPredicateValue = formatValue => {
  const exp = /<%.*?%>/g;
  const items = formatValue.match(exp);
  if (!items)
    return formatValue;
  const values = {};
  let valid = true;
  items.forEach(item => {
    const predicate = item.substring(2, item.length - 2).split('.');
    if (predicate.length !== 2) {
      valid = false;
      return;
    }
    const obj = cb.rest.AppContext[predicate[0]];
    values[item] = obj && (cb.utils.isEmpty(obj[predicate[1]]) ? '' : obj[predicate[1]]);
  });
  if (!valid)
    return formatValue;
  return formatValue.replace(exp, function (key) {
    return values[key];
  });
}

export const getFormatValue = (value, format) => {
  let showValue = value, prefix = null, suffix = null;
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
  return { showValue, prefix, suffix };
}

// toFixed它是一个四舍六入五成双的诡异的方法，"四舍六入五成双"含义：对于位数很多的近似数，当有效位数确定后，其后面多余的数字应该舍去，只保留有效数字最末一位，这种修约（舍入）规则是“四舍六入五成双”，也即“4舍6入5凑偶”这里“四”是指≤4 时舍去，"六"是指≥6时进上，"五"指的是根据5后面的数字来定，当5后有数时，舍5入1；当5后无有效数字时，需要分两种情况来讲：①5前为奇数，舍5入1；②5前为偶数，舍5不进。（0是偶数）
export const getRoundValue = (value, decimal) => {
  if(!decimal) return value
  const pow = Math.pow(10, decimal);
  let returnValue = Math.round(Math.abs(value) * pow) / pow;
  if (value < 0)
    returnValue = -returnValue;
  return returnValue.toFixed(decimal);
}

/* 加减乘法过程中出现浮点数，导致精度格式化后错误（first, second存在小数时，有可能出现此问题）*/
export const getMultiplication = (first, second, type) => {
  first = parseFloat(first);
  second = parseFloat(second);
  let firstArr = first.toString().split('.');
  let secondArr = second.toString().split('.');
  let first_decimal = firstArr.length > 1 ? firstArr[1].length : 0;
  let second_decimal = secondArr.length > 1 ? secondArr[1].length : 0;
  let total_decimal = 0;
  if (type === 'Multiplication') {
    total_decimal = first_decimal + second_decimal
    return parseFloat((first * second).toFixed(total_decimal))
  }
  if (type === 'add') {
    total_decimal = (first_decimal >= second_decimal) ? first_decimal : second_decimal
    return parseFloat((first + second).toFixed(total_decimal))
  }
  if (type === 'subduction') {
    total_decimal = (first_decimal >= second_decimal) ? first_decimal : second_decimal
    return parseFloat((first - second).toFixed(total_decimal))
  }
}
