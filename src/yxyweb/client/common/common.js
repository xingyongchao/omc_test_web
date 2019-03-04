import env from '../../common/helpers/env'
export const billCopy = (source, target) => {
  for (let key in target) {
    if (Array.isArray(target[key])) {
      var emptyRow = target[key][0];
      if (Array.isArray(source[key])) {
        source[key].forEach(item => {
          if (!emptyRow) return;
          billCopy(item, emptyRow);
        });
      }
    } else {
      source[key] = target[key];
    }
  }
  return source;
};
export const billMerge = (source, target, condition = {}) => {
  if (!source && !target) {
    return null;
  }
  for (let key in target) {
    if (Array.isArray(target[key])) {
      if (Array.isArray(source[key])) {
        target[key].map(function (item, index) {
          let selfCondition = condition[key];
          if (selfCondition && selfCondition.length > 0) {
            billMerge(source[key][selfCondition[index]], item);
          } else {
            if (source[key][index]) {
              billMerge(source[key][index], item);
            } else {
              source[key][index] = item;
            }
          }
        })
      } else {
        source[key] = target[key];
      }
    } else {
      source[key] = target[key];
    }
  }

  return source;
};
export const setVmParams = (viewmodel, key, value) => {
  if (!viewmodel.getParams()) return;
  viewmodel.getParams()[key] = value;
};
export const getVmParams = (viewmodel, key) => {
  if (!viewmodel.getParams()) return;
  return viewmodel.getParams()[key];
}
export const doProxy = (params, callback, data) => {
  let proxy = cb.rest.DynamicProxy.create({
    doProxy: {
      url: params.cSvcUrl,
      method: params.cHttpMethod,
      options: params.options
    }
  });
  if (params.options && params.options.async === false) {
    const ajaxResult = proxy.doProxy(data);
    callback(ajaxResult.error, ajaxResult.result);
  } else {
    proxy.doProxy(data, callback);
  }
  // proxy.doProxy(data, function(err, suc) {
  //   if (err) {
  //     if (err.message) {
  //       alert(err.message);
  //     } else {
  //       alert(err.code);
  //     }
  //     cb.utils.loadingControl.end();
  //     return;
  //   }
  //   if (callback) callback(suc)
  // });
};

export const fetchMeta = (billNo, params, callback) => {
  let url = '/meta';
  let proxy = cb.rest.DynamicProxy.create({
    getMeta: {
      url: url,
      method: 'POST',
      options: Object.assign({
        uniform: false
      }, params.options)
    }
  });
  let postData = Object.assign({}, params, {
    billNo: billNo,
    type: 'bill'
  });
  proxy.getMeta(postData, callback);

}
export const todo = (self, act, viewmodel, params) => {
  if (act && self.action()[act.toLowerCase()]) {
    let data = {
      cancel: false,
      params: params
    };
    let Act = act.replace(/(\w)/, function (v) {
      return v.toUpperCase()
    }) //首字母大写
    console.log('Voucher-- ' + act + ' click');
    let beforeAct = (beforeActData, callback) => {
      return viewmodel.promiseExecute('before' + Act, beforeActData, function () {
        if (params && params.disabledCallback)
          params.disabledCallback();
        callback && callback();
      });
    }
    if (!viewmodel.execute('before' + Act + 'Execute', data) || data.cancel) return true;
    let billNo = getVmParams(viewmodel, 'billNo');
    let afterAct = (afterActData, callback) => {
      if (params && params.enabledCallback)
        params.enabledCallback();
      return viewmodel.promiseExecute('after' + Act, afterActData, function () {
        callback && callback(afterActData)
      });
    }
    let action = self.action()[act.toLowerCase()];
    action(billNo, viewmodel, params, beforeAct, afterAct);

  } else {
    if (viewmodel.hasEvent(act)) {
      viewmodel.execute(act, params);
      console.log('Voucher-- ' + act + ' click');
      return;
    }
    console.log('voucher->do——' + act + '方法不存在');
  }
};
export const check = (billNo, viewmodel, params, beforeAct, _afterAct, cellCheck) => {
  if (!params) {
    return;
  }
  params = JSON.parse(JSON.stringify(params));
  const checkKey = params.key;
  const checkModel = viewmodel.get(checkKey);
  if (checkModel)
    checkModel.setChecking(true);
  if (!cellCheck) {
    params.location = '-1';
  }
  if (typeof params.value === 'object')
    params.value = JSON.stringify(params.value);
  //params.childAttribute = common.getVmParams(viewmodel, 'childrenField');
  let data = viewmodel.collectData(true);
  //data[params.key] = params.value; //赋新值
  let postData = {
    billnum: billNo,
    item: JSON.stringify(params),
    data: JSON.stringify(data)
  };
  let beforeActData = {
    params: params,
    data: postData
  }
  beforeAct(beforeActData, function () {
    const suffix = (params.childrenField ? params.childrenField + '.' + checkKey : checkKey).trim().toLocaleLowerCase();
    const configParams = viewmodel.allActions && viewmodel.allActions.find(x => {
      return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === `cmdcheck_${suffix}`;
    });
    const options = configParams && configParams.cSvcUrl ? {
      cSvcUrl: configParams.cSvcUrl,
      cHttpMethod: configParams.cHttpMethod || 'POST'
    } : {
        cSvcUrl: 'bill/check',
        cHttpMethod: 'POST'
      };
    if (params.async === false)
      options.options = { async: false };
    let callback = function (err, suc) {
      if (!err) {
        if (suc) {
          if (cellCheck) {
            let gridModel = viewmodel.get(params.childrenField);
            let oldRowData = gridModel.getRow(params.location);
            let newData = billMerge(oldRowData, suc);
            gridModel.updateRow(params.location, newData);
          } else {
            let newData = billMerge(viewmodel.collectData(true), suc);
            viewmodel.loadDirtyData(newData);
          }
        }
      }
      let afterActData = {
        err: err,
        res: suc
      }
      _afterAct(afterActData, afterAct)
      if (!checkModel) return;
      checkModel.setCheckMsg(err ? err.message : null);
      checkModel.setChecking(false);
    }
    doProxy(options, callback, postData);
  })

};
export const columnsetting = (billNo, viewmodel, params, _afterAct) => {
  viewmodel.get(params.name).getTitleData(billNo, viewmodel.getParams().tplid, params.code);
  _afterAct()
};

const _setSates = function (viewmodel, states) {
  if (!viewmodel.execute('beforeSetState', states)) return
  if (states.length == 1) {
    let buttons = states[0].items.filter(x => x.cGroup == 'toolbaritem');
    for (let button of buttons) {
      let model = viewmodel.get(button.cName);
      let visible = button.bVisible;
      let disabled = !button.bEnable;
      if (model) {
        model.setDisabled(disabled);
        model.setVisible(visible);
      }
    }
  }
  if (!viewmodel.execute('afterSetState', states)) return
}
export const setState = function (viewmodel) {
  let mode = getMode(viewmodel);
  let allAtates = viewmodel.get('states');
  if (allAtates && allAtates.length > 0) {
    let data = viewmodel.collectData(true);
    let conditionStates = allAtates.filter(x => x.condition && eval(x.condition));
    let states;
    if (conditionStates && conditionStates.length > 0) {
      states = conditionStates;
    } else {
      let normalStates = allAtates.filter(x => (x.code) == mode);
      states = normalStates;
    }
    _setSates(viewmodel, states);


  }
};
export const storeVmInstance = (billNo, vm) => {
  let viewModelCache = cb.cache.viewModels.get(billNo);
  if (!viewModelCache) {
    viewModelCache = [];
    cb.cache.viewModels.set(billNo, viewModelCache);
  }
  viewModelCache.push(vm);
}

export const createDownloadForm = (url, params) => {
  console.log('createDownloadForm params:');
  console.log(params);
  const eleForm = document.createElement('form')
  eleForm.method = 'post'
  eleForm.target = '_blank'
  eleForm.action = url
  eleForm.style.display = 'none'

  const eleInput = document.createElement('input')
  eleInput.name = 'json'
  eleInput.value = JSON.stringify(params)

  document.body.appendChild(eleForm)
  eleForm.appendChild(eleInput)
  eleForm.submit()
  document.body.removeChild(eleForm)
}
export const doService = (billNo, viewmodel, params, beforeAct, _afterAct, callback) => {
  let data = viewmodel.getNecessaryData();
  let postData = {
    billnum: billNo,
    data: JSON.stringify(data)
  };
  if (beforeAct) {
    let beforeActData = {
      params: params,
      data: postData
    };
    beforeAct(beforeActData, function () {
      if (callback) {
        callback(viewmodel, postData, params, _afterAct)
      }
    })
  } else {
    if (callback) {
      callback(viewmodel, postData, params, _afterAct)
    }
  }
}
export const getGridModel = (viewmodel, params = {}) => {
  let gridModel = {};
  if (params && params['childrenField']) {
    gridModel = viewmodel.get(params['childrenField']);
  } else {
    gridModel = viewmodel.getGridModel()
  }
  return gridModel;
}
export const setRenderReadOnly = (viewmodel) => {
  let mode = getMode(viewmodel);
  let readOnly = true;
  switch (mode) {
    case env.VOUCHER_STATE_ADD:
      readOnly = false;
      break;
    case env.VOUCHER_STATE_EDIT:
      readOnly = false;
      break;
    case env.VOUCHER_STATE_BROWSE:
      readOnly = true
      break;
  }
  viewmodel.setReadOnly(readOnly);
};
export const edit = (billNo, viewmodel, params, beforeAct, _afterAct) => {
  const mode = env.VOUCHER_STATE_EDIT;
  if (viewmodel.getParams().multitpl) {
    cb.loader.runCommandLine('bill', {
      billtype: 'voucher',
      billno: billNo,
      params: {
        mode,
        id: viewmodel.get('id') && viewmodel.get('id').getValue() || viewmodel.getParams().id
      }
    }, viewmodel);
    return;
  }
  beforeAct({ params }, function () {
    setMode(viewmodel, mode);
    setState(viewmodel);
    viewmodel.setReadOnly(false);
    const gridModels = viewmodel.getGridModels();
    gridModels.forEach(gridModel => {
      setGridActionStates(gridModel, viewmodel, mode);
    });
    _afterAct();
  })

};
let id = 1;
export const initVM = (err, result, billNo, params, extendCallback) => {
  if (err) {
    cb.utils.alert(JSON.stringify(err), 'error');
    console.error(err);
    cb.utils.loadingControl.end()
    return;
  }
  let func = new Function(result.vm);
  func();
  let defaultParams = {
    billNo: result.viewmeta.cBillNo,
    subId: result.viewmeta.cSubId,
    bMultiTpl: result.viewmeta.bAllowMultiTpl,
    bPrint: result.viewmeta.bPrintLimited,
    cardKey: result.viewmeta.cCardKey,
    caption: params && params.name || result.viewmeta.view.cTemplateTitle
  };
  if (result.querySchema) {
    const { condition } = result.querySchema;
    // defaultParams.condition = {};
    // condition.commonVOs.forEach(item => {
    //   defaultParams.condition[item.itemName] = item.value1;
    // });
    defaultParams.condition = condition;
  }
  let vm = new cb.viewmodels[result.viewmeta.vmName]();
  vm.setViewMeta(result.viewmeta);
  vm.id = id++
  cb.utils.extend(true, vm.getParams(), defaultParams, params);
  storeVmInstance(billNo, vm);
  vm.on('extendReady', function () {
    extendCallback(vm, result.viewmeta);
  });
  const { extscripturls } = result.viewmeta;
  if (extscripturls && extscripturls.length) {
    // extscripturls.push('http://resources.yonyoucloud.com/packages/TestExternal.js');
    try {
      cb.requireInner(extscripturls, function (external) {
        console.info('%c externaljs doAction', 'color:green');
        external.doAction('init', vm);
      }, function (error) {
        console.info('%c externaljs notFound', 'font-size:12pt;color:#860786');
      });
    } catch (e) {
      console.info('%c externaljs exception', 'font-size:12pt;color:#860786');
      console.error(e);
    }
  }
  window.yya = vm
  return {
    vm: vm,
    view: result.viewmeta
  };

}

export const emptyBill = (postData, params, callback) => {
  const param = params && params.cSvcUrl ? {
    cSvcUrl: params.cSvcUrl,
    cHttpMethod: params.cHttpMethod || 'POST'
  } : {
      cSvcUrl: 'bill/add',
      cHttpMethod: 'POST'
    };
  doProxy(param, callback, postData);
}

export const commandLine = (billNo, viewmodel, params, beforeAct, _afterAct) => {
  let cmdParams = {};
  if (params.cmdParameter) {
    try {
      cmdParams = JSON.parse(params.cmdParameter);
    } catch (error) {
      console.error('command cParameters JSON格式错误-->' + params.cmdParameter)
      return
    }
  }
  let beforeActData = {
    params: Object.assign(params, cmdParams)
  }
  beforeAct(beforeActData, function () {
    cb.loader.runCommandLine('menu', params, viewmodel)
    _afterAct();
  })

}

export const doPrint = (data, params, callback) => {
  let proxy = cb.rest.DynamicProxy.create({
    getPrint: {
      url: "/files" + params.cSvcUrl,
      method: params.cHttpMethod,
      options: {
        uniform: false,
      }
    }
  });
  proxy.getPrint(data, callback);
}
export const getMode = (viewmodel) => {
  return getVmParams(viewmodel, 'mode') || env.VOUCHER_STATE_BROWSE;
}
export const setMode = function (viewmodel, value) {
  if (!viewmodel.execute('beforeSetMode', {
    oldValue: getMode(viewmodel),
    newValue: value
  })) return
  setVmParams(viewmodel, 'mode', value);
  viewmodel.execute('modeChange', value);
};
export const afterAct = function (data) {
  if (data && data.err) {
    cb.utils.loadingControl.end();
    cb.utils.alert(data.err.message, 'error');
  }
};

export const push = function (viewModel, args, data, beforeAct, afterAct) {
  const { cSvcUrl, cHttpMethod } = args;
  // cSvcUrl = '/makeBill/pullVoucher.do?code=st_storenotice_storein&targetBillNo=st_storein';
  const targetBillNo = new cb.utils.queryString(cSvcUrl).get('targetBillNo');
  if (!targetBillNo) return;
  const params = {
    mode: env.VOUCHER_STATE_ADD,
    cSvcUrl: cSvcUrl,
    cHttpMethod: cHttpMethod,
    action: 'push',
    data: data
  };
  const beforeActData = { params };
  beforeAct(beforeActData, function () {
    cb.loader.runCommandLine('bill', {
      billtype: 'voucher',
      billno: targetBillNo,
      params: params
    }, viewModel);
    afterAct();
  });
};

export const copy = function (viewModel, args, id, beforeAct, afterAct) {
  const { cSvcUrl, cHttpMethod } = args;
  // cSvcUrl = '/bill/copy';
  const params = {
    mode: env.VOUCHER_STATE_EDIT,
    cSvcUrl: cSvcUrl,
    cHttpMethod: cHttpMethod,
    action: 'copy',
    id: id
  };
  const beforeActData = { params };
  beforeAct(beforeActData, function () {
    cb.loader.runCommandLine('bill', {
      billtype: 'voucher',
      billno: getVmParams(viewModel, 'cardKey'),
      params: params
    }, viewModel);
    afterAct();
  });
};

export const setGridActionStates = function (gridModel, viewmodel, currentState) {
  const actions = gridModel.getCache('actions');
  if (!actions) return;
  const allStates = viewmodel.get('states');
  if (!allStates || !allStates.length) return;
  const anonymousFunctions = {};
  allStates.forEach(item => {
    if (!item.condition) return;
    anonymousFunctions[item.code] = new Function('data', `return ${item.condition};`);
  });
  const rows = gridModel.getRows();
  const actionsStates = [];
  rows.forEach(data => {
    // const conditionStates = allStates.filter(x => x.condition && eval(x.condition));
    const conditionStates = allStates.filter(x => anonymousFunctions[x.code] && anonymousFunctions[x.code](data));
    const states = conditionStates && conditionStates.length
      ? conditionStates
      : allStates.filter(x => x.code === (currentState || env.VOUCHER_STATE_BROWSE));
    if (states.length !== 1) return;
    const actionState = {};
    actions.forEach(action => {
      const state = states[0].items.find(x => x.cName === action.cItemName);
      actionState[action.cItemName] = { visible: state.bVisible };
    });
    actionsStates.push(actionState);
  });
  gridModel.setActionsState(actionsStates);
}
