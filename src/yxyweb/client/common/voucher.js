import * as common from './common'
import env from '../../common/helpers/env'

const voucher = function () {
  const render = (viewmodel, data, dirty) => {
    common.setRenderReadOnly(viewmodel)
    if (dirty) {
      viewmodel.setDirty(true)
      viewmodel.loadDirtyData(data)
      // common.getGridModel(viewmodel) && common.getGridModel(viewmodel).initRowState(cb.models.DataStates.Insert)
      const gridModels = viewmodel.getGridModels();
      gridModels.forEach(gridModel => {
        gridModel.initRowState(cb.models.DataStates.Insert);
      });
    } else {
		viewmodel.loadData(data)
		viewmodel.validate(true);

    }
    common.setState(viewmodel)
    viewmodel.execute('afterLoadData', data);
  }

  const _reloadVoucher = (bSwitchTpl, data, viewmodel, billNo, afterAct) => {
    if (bSwitchTpl) {
      let vmParams = {
        tplid: data.tplid
      }
      vmParams.billData = data
      let cbk = function (err, meta) {
        const reloadVoucherCallback = (vm, view) => {
          viewmodel.communication({
            payload: {
              menuName: view.cBillName,
              vm: vm,
              refresh: true,
              metaData: view
            }
          })
        }
        _fetchMetaCallback(err, meta, billNo, reloadVoucherCallback, vmParams)
      }
      common.fetchMeta(billNo, vmParams, cbk)
    } else {
      _resetData(viewmodel, data, afterAct)
    }
  }

  const _doService = (billNo, viewmodel, params, beforeAct, afterAct) => {
    common.doService(billNo, viewmodel, params, beforeAct, afterAct, _doServiceByData)
  }

  const _doServiceByData = (viewmodel, postData, params, afterAct) => {
    let callback = function (err, res) {
      if (!err) {
        cb.utils.alert(`${params.cShowCaption}成功`, 'success')
        let oldData = viewmodel.collectData(true)
        let newData = common.billMerge(oldData, res)
        render(viewmodel, newData)
      }
      let afterActData = {
        err: err,
        res: res
      }
      if (afterAct) afterAct(afterActData, common.afterAct)
    }
    common.doProxy(params, callback, postData)
  }

  const _tplIsEquql = (data, viewmodel) => {
    let result = false
    if (!viewmodel.get(env.VOUCHER_TPL_KEY)) {
      result = false
    } else {
      if (data[env.VOUCHER_TPL_KEY] != viewmodel.get(env.VOUCHER_TPL_KEY).getValue()) {
        result = true
      } else {
        result = false
      }
    }
    return result
  }

  const _resetData = (viewmodel, data, afterAct) => {
    common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE)
    render(viewmodel, data)
    if (!afterAct) return
    afterAct({
      res: data
    }, common.afterAct)
  }

  const _loadVm = function (oldVM, newVM) {
    newVM.originalVM = oldVM.originalVM
    newVM.originalViewMeta = oldVM.originalViewMeta
    newVM.biz.do('rule', newVM)
    newVM.biz.do('initDefaultActions', newVM)
  }

  const _fetchMetaCallback = function (err, meta, billNo, viewCallback, params) {
    const extendCallback = (vm, view) => {
      vm.viewCallback = viewCallback
      vm.originalVM = vm
      vm.originalParams = params
      vm.originalViewMeta = meta.viewmeta
      let data = {
        vm,
        view
      }
      vm.promiseExecute('afterLoadMeta', data, function () {
        let title = view.cBillName;
        switch (params.mode) {
          case env.VOUCHER_STATE_ADD:
            title = '新增' + title;
            break;
          case env.VOUCHER_STATE_EDIT:
            title = '编辑' + title;
            break;
          case env.VOUCHER_STATE_BROWSE:
            title += '详情';
            break;
        }
        viewCallback(vm, view, title) //先绑定view防止extend中 viewmode addProperty
        const gridModels = vm.getGridModels();
        gridModels.forEach(gridModel => {
          gridModel.on('afterSetDataSource', () => {
            const afterAct = gridModel.getCache('afterAct');
            if (afterAct)
              afterAct();
            common.setGridActionStates(gridModel, vm, vm.getParams().mode);
          });
          gridModel.on('afterMount', () => {
            common.setGridActionStates(gridModel, vm, vm.getParams().mode);
          });
          // vm.on('afterEdit', () => {
          //   common.setGridActionStates(gridModel, vm, vm.getParams().mode);
          // });
        });
        const { billData } = vm.getParams();
        vm.biz.do('load', vm, {
          data: billData
        })
        vm.biz.do('rule', vm)
        if (params.copy)
          vm.biz.do('copy', vm);
      })


    }
    const backRefresh = (vm) => {
      const params = Object.assign(vm.getParams(), { mode: env.VOUCHER_STATE_EDIT, id: vm.get('id').getValue() });
      _getInitdata(billNo, params, function (err, billData) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }
        _resetData(vm, billData);
      });
    }
    const vmAndView = common.initVM(err, meta, billNo, params, extendCallback)
    if (vmAndView) {
      let { vm, view } = vmAndView
      vm.setCache('entryMode', params.mode);
      vm.initData()
      common.setMode(vm, params.mode);
      // vm.setCache('entryMode', params.mode);
      vm.on('refresh', function () {
        backRefresh(vm);
      });
      vm.on('back', function () {
        if (common.getMode(vm) !== env.VOUCHER_STATE_BROWSE) return;
        backRefresh(vm);
      });
      const returnPromise = new cb.promise();
      vm.on('return', function (caption) {
        if (common.getMode(vm) === env.VOUCHER_STATE_BROWSE || !vm.getDirtyData(false))
          return true;
        // returnSave(billNo, vm, function () {
        //   returnPromise.resolve();
        //   const parentViewModel = vm.getCache('parentViewModel');
        //   if (parentViewModel)
        //     parentViewModel.execute('refresh');
        // });
        // return returnPromise;
        cb.utils.confirm(`确定要${caption}么`, function () {
          returnPromise.resolve();
        }, function () {
          returnPromise.reject();
        });
        return returnPromise;
      });
      // common.setRenderReadOnly(vm)
      vm.biz.do('initDefaultActions', vm)
      if (params.mode === env.VOUCHER_STATE_EDIT)
        vm.execute('afterEdit');
    }
  }

  const _getInitdata = function (billNo, params, callback, beforeAct) {
    const proxy = cb.rest.DynamicProxy.create({ getCmdList: { url: 'billmeta/getbillcommands', method: 'GET' } });
    proxy.getCmdList({ billno: billNo }, function (err, result) {
      let postData = {
        "billnum": billNo
      }
      let cmdName, cSvcUrl, cHttpMethod
      let mode = params && params.mode || env.VOUCHER_STATE_BROWSE
      if (mode === env.VOUCHER_STATE_BROWSE && params && params.readOnly) {
        // 浏览态卡片刷新当前页面需要重置mode
        mode = env.VOUCHER_STATE_EDIT;
      }
      switch (mode) {
        case env.VOUCHER_STATE_ADD:
          cmdName = 'cmdadd';
          cSvcUrl = 'bill/add'
          cHttpMethod = 'POST'
          Object.assign(postData, params.carryParams);
          break
        case env.VOUCHER_STATE_EDIT:
          cmdName = 'cmddetail';
          cSvcUrl = 'bill/detail'
          cHttpMethod = 'GET'
          if (!params.id) {
            callback();
            return;
          }
          postData.id = params.id
          if (params.isSum)
            postData.isSum = params.isSum;
          Object.assign(postData, params.carryParams);
          break
        case env.VOUCHER_STATE_BROWSE:
          cmdName = 'cmdenter';
          cSvcUrl = 'bill/enter'
          cHttpMethod = 'GET'
          postData.subid = params && params.subId
          break
      }
      if (cmdName && result) {
        const configParams = result.find(x => {
          return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === cmdName;
        });
        if (configParams && configParams.cSvcUrl) {
          cSvcUrl = configParams.cSvcUrl;
          cHttpMethod = configParams.cHttpMethod || 'GET'
        }
      }
      if (params && params.readOnly === true) {
        params.mode = env.VOUCHER_STATE_BROWSE
      }
      let par = {
        cSvcUrl: cSvcUrl,
        cHttpMethod: cHttpMethod
      }
      let beforeActData = {
        params: params,
        data: postData
      }
      if (beforeAct) {
        beforeAct(beforeActData, function () {
          common.doProxy(par, callback, postData)
        })
      } else {
        common.doProxy(par, callback, postData)
      }
    });
  }

  const cellCheck = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let gridModel = common.getGridModel(viewmodel, params)
    let cellName = params.cellName
    let column = gridModel.getColumn(cellName)
    let data = {
      location: params.rowIndex,
      key: cellName,
      childrenField: params.childrenField,
      value: JSON.stringify(params.value),
      type: column.cControlType,
      fieldname: column.cFieldName,
      async: params.async
    }
    let beforeActData = {
      params: params,
      data: data
    };
    beforeAct(beforeActData, function () {
      if (column.bCheck === true) {
        const ruleItems = gridModel.getCache('ruleItems');
        if (ruleItems && ruleItems.indexOf(cellName) > -1)
          data.async = false;
        common.check(billNo, viewmodel, data, beforeAct, afterAct, true)
      }

    })

  }

  const lineOpenOrClose = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let rowIndexes = params && params.params && params.params.index != null ?
      [params.params.index] :
      common.getGridModel(viewmodel, params).getSelectedRowIndexes();
    if (!rowIndexes.length) {
      return
    }
    let selectData = common.getGridModel(viewmodel, params).getSelectedRows()
    let index = rowIndexes[0]
    let childrenField = common.getGridModel(viewmodel, params).getName()
    let data = viewmodel.collectData(true)
    data[childrenField] = selectData
    let postData = {
      billnum: billNo,
      data: JSON.stringify(data)
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      let callback = function (err, res) {
        if (!err) {
          cb.utils.alert('操作成功', 'success')
          let oldData = viewmodel.collectData(true)
          let newData = common.billMerge(oldData, res, [index])
          render(viewmodel, newData)
          common.getGridModel(viewmodel, params).select([index])
        }
        let afterActData = {
          err: err,
          res: res
        }
        afterAct(afterActData, common.afterAct)
      }
      common.doProxy(params, callback, postData)
    })

  }

  const copy1 = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let callback = function (err, res) {
      let newData
      if (!err) {
        let oldData = viewmodel.collectData(true)
        //lastData = cb.utils.extend(true, {}, oldData)
        newData = common.billMerge(oldData, res)
        common.setMode(viewmodel, env.VOUCHER_STATE_ADD)
        render(viewmodel, newData, true)
      }
      let afterActData = {
        err: err,
        res: newData
      }
      afterAct(afterActData, common.afterAct)
    }
    let postData = {
      "billnum": billNo
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      common.emptyBill(postData, params, callback)
    })

  }

  const copy = function (billNo, viewModel, params, beforeAct, afterAct) {
    if (viewModel) {
      common.copy(viewModel, params, viewModel.get('id').getValue(), beforeAct, afterAct);
      return;
    }
    if (!params || !params.cSvcUrl) return;
    const callback = function (err, emptyData) {
      if (err) {
        common.afterAct({ err });
        return;
      }
      _getInitdata(billNo, params, function (err1, copyData) {
        if (err1) {
          common.afterAct({ err1 });
          return;
        }
        params.mode = 'add';
        afterAct(null, common.billCopy(copyData, emptyData));
      });
    };
    const postData = { billnum: billNo };
    common.doProxy(params, callback, postData);
  }

  const refresh = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let refreshCallback = function (err, billData) {
      if (!err && billData) {
        const bSwitchTpl = _tplIsEquql(billData, viewmodel)
        _reloadVoucher(bSwitchTpl, billData, viewmodel, billNo, afterAct)
      } else {
        let afterActData = {
          err: err,
          res: billData
        }
        afterAct(afterActData, common.afterAct)
      }

    }
    let pm = {
      mode: env.VOUCHER_STATE_EDIT,
      id: viewmodel.get('id').getValue(),
      isSum: params && params.isSum
    }
    let beforeActData = {
      params: params,
      data: pm
    };
    beforeAct(beforeActData, function () {
      _getInitdata(billNo, pm, refreshCallback, beforeAct)
    })
  }

  const loadData = (billNo, viewmodel, para, beforeAct, afterAct) => {
    let data = para.data// || {}
    let mode = common.getMode(viewmodel)
    const action = common.getVmParams(viewmodel, 'action');
    let parent = common.getVmParams(viewmodel, 'parent')
    let cCarry = common.getVmParams(viewmodel, 'cCarry')
    let carryKeys = []
    if (cCarry && parent) {
      try {
        cCarry = JSON.parse(cCarry)
      } catch (error) {
        console.error('列表cCarry JSON格式错误-->' + cCarry)
        return
      }

      if (typeof (cCarry) === 'object') {
        for (let key in cCarry) {
          let value = cCarry[key]
          data[key] = parent[value]
          carryKeys.push(key)
        }
      }
    }
    //携带需要setdirty true  否则保存不收集
    carryKeys.map(key => {
      let model = viewmodel.get(key)
      if (model) {
        model.setDirty(true)
      }
    })
    let beforeActData = {
      params: para,
      data: data
    }
    beforeAct(beforeActData, function () {
      render(viewmodel, data, mode == env.VOUCHER_STATE_ADD);
    })


  }

  const buildRule = (billNo, viewmodel, para, beforeAct, afterAct) => {
    let postData = {
      billNumber: billNo,
      language: 'javascript'
    }
    let beforeActData = {
      params: para,
      data: postData
    }
    beforeAct(beforeActData, function () {
      common.doProxy({
        cSvcUrl: '/itemrule/script',
        cHttpMethod: 'GET'
      }, function (err, data) {
        data = eval(data)
        data.rules.forEach(function (rule) {
          var fields = {}
          rule.triggers.forEach(function (trigger) {
            var fieldName = trigger.ds
            if (fieldName) {
              if (!fields[fieldName])
                fields[fieldName] = []
              fields[fieldName].push(trigger.item)
            } else {
              if (!viewmodel.get(trigger.item)) return
              viewmodel.get(trigger.item).on('afterValueChange', function () {
                this.run(this.param)
              }, {
                  run: data.run,
                  param: {
                    ruleid: rule.id,
                    vm: viewmodel,
                    trigger: {
                      ds: fieldName,
                      item: trigger.item,
                      lineid: '0'
                    }
                  }
                })
            }
          })
          for (var attr in fields) {
            if (!viewmodel.get(attr)) continue
            viewmodel.get(attr).setCache('ruleItems', fields[attr]);
            viewmodel.get(attr).on('afterCellValueChange', function (args) {
              if (this.items.indexOf(args.cellName) === -1) return
              this.param.trigger.item = args.cellName
              this.param.trigger.lineid = '0:' + args.rowIndex
              this.run(this.param)
            }, {
                items: fields[attr],
                run: data.run,
                param: {
                  ruleid: rule.id,
                  vm: viewmodel,
                  trigger: {
                    ds: attr
                  }
                }
              })
          }
        })
        var jointFields = {}
        data.jointFields.forEach(function (field) {
          var fieldName = field.ds
          if (fieldName) {
            if (!jointFields[fieldName])
              jointFields[fieldName] = []
            jointFields[fieldName].push(field.item)
          } else {
            if (!viewmodel.get(field.item)) return
            viewmodel.get(field.item).on('jointQuery', function () {
              let config = null;
              try {
                config = JSON.parse(this.param.vm.get(this.param.trigger.item).getState('cStyle'));
              } catch (e) {
                config = {};
              }
              let queryData = this.jointQuery(this.param)
              const items = [];
              for (var attr in queryData.paras) {
                items.push(attr + '=' + queryData.paras[attr]);
              }
              config.menuCode = 'SJ0201';
              if (config.menuCode) {
                viewmodel.communication({ type: 'menu', payload: { menuCode: config.menuCode, menuUrl: '?' + items.join(',') } });
                return;
              }
              let parent = this.param.vm
              let dt = {
                billtype: 'voucher',
                billno: queryData.target,
                params: cb.utils.extend(true, queryData.paras, {
                  mode: env.VOUCHER_STATE_EDIT
                })
              }
              cb.loader.runCommandLine('bill', dt, parent)
            }, {
                jointQuery: data.jointQuery,
                param: {
                  vm: viewmodel,
                  trigger: {
                    ds: field.ds,
                    item: field.item
                  }
                }
              })
          }
        })
        for (var attr in jointFields) {
          if (!viewmodel.get(attr)) continue
          viewmodel.get(attr).on('cellJointQuery', function (args) {
            if (this.items.indexOf(args.cellName) === -1) return
            this.param.trigger.item = args.cellName
            this.param.trigger.lineid = '0:' + args.rowIndex
            let queryData = this.jointQuery(this.param)
            let parent = this.param.vm
            let dt = {
              billtype: 'voucher',
              billno: queryData.target,
              params: cb.utils.extend(true, queryData.paras, {
                mode: env.VOUCHER_STATE_EDIT
              })
            }
            cb.loader.runCommandLine('bill', dt, parent)
          }, {
              items: jointFields[attr],
              jointQuery: data.jointQuery,
              param: {
                vm: viewmodel,
                trigger: {
                  ds: attr
                }
              }
            })
        }
        var refFields = {}
        data.refFields.forEach(function (field) {
          var fieldName = field.ds
          if (fieldName) {
            if (!refFields[fieldName])
              refFields[fieldName] = []
            refFields[fieldName].push(field.item)
          } else {
            var referModel = viewmodel.get(field.item);
            if (!referModel) return
            referModel.on('beforeBrowse', function () {
              let queryData = this.jointQuery(this.param)
              if (!queryData) return
              _setReferRule(queryData, this.referModel)
            }, {
                referModel: referModel,
                jointQuery: data.jointQuery,
                param: {
                  action: 'ref',
                  vm: viewmodel,
                  trigger: {
                    ds: field.ds,
                    item: field.item
                  }
                }
              })
          }
        })
        for (var attr in refFields) {
          var referModel = viewmodel.get(attr);
          if (!referModel) continue
          referModel.on('beforeBrowse', function (args) {
            if (this.items.indexOf(args.cellName) === -1) return
            this.param.trigger.item = args.cellName
            this.param.trigger.lineid = '0:' + args.rowIndex
            let queryData = this.jointQuery(this.param)
            if (!queryData) return
            _setReferRule(queryData, args.context)
          }, {
              referModel: referModel,
              items: refFields[attr],
              jointQuery: data.jointQuery,
              param: {
                action: 'ref',
                vm: viewmodel,
                trigger: {
                  ds: attr
                }
              }
            })
        }

        afterAct()
      }, postData)
    })

  }
  const _setReferRule = (queryData, referModel) => {
    var target = queryData.target
    if (target) {
      if (target.cRefType) {
        referModel.setRefCode(target.cRefType)
      }
      if (target.cRefRetId) {
        referModel.setReturnFields(cRefRetId.refid)
      }
    }
    referModel.setFilter({
      isExtend: true,
      simpleVOs: queryData.paras
    })
  }

  const _resetOriginal = (viewmodel, afterAct) => {
    let newVM = viewmodel.originalVM
    if (newVM.get(env.VOUCHER_TPL_KEY) && viewmodel.get(env.VOUCHER_TPL_KEY) && (newVM.getOriginalData()[env.VOUCHER_TPL_KEY] != viewmodel.get(env.VOUCHER_TPL_KEY).getValue())) {
      viewmodel.communication({
        payload: {
          menuName: newVM.originalViewMeta.cBillName,
          vm: newVM,
          refresh: true,
          metaData: newVM.originalViewMeta
        }
      })
      _loadVm(viewmodel, newVM)
    }
    common.setMode(newVM, env.VOUCHER_STATE_BROWSE)
    let newData = newVM.getOriginalData()
    if (newVM.get(env.VOUCHER_TPL_KEY) && !newData[env.VOUCHER_TPL_KEY]) {
      newData[env.VOUCHER_TPL_KEY] = newVM.get(env.VOUCHER_TPL_KEY).get('cDefaultValue')
    }
    render(newVM, newData)
    let afterActData = {
      res: newData
    }
    afterAct(afterActData, common.afterAct)
  }

  const abandon = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let beforeActData = {
      params: params
    }
    beforeAct(beforeActData, function () {
      let mode = common.getMode(viewmodel);
      if (mode === env.VOUCHER_STATE_BROWSE) {
        viewmodel.communication({ type: 'return' });
        return;
      }
      const data = viewmodel.getDirtyData(false);
      if (!data) {
        _abandon(viewmodel, afterAct);
        return;
      }
      cb.utils.confirm(`确定要${params.cShowCaption}么`, function () {
        _abandon(viewmodel, afterAct);
      }, function () {
        if (params && params.enabledCallback)
          params.enabledCallback();
      });
      return;
      returnSave(billNo, viewmodel, _abandon);
    });
  }
  const _abandon = function (viewmodel, afterAct) {
    if (viewmodel.getParams().multitpl || viewmodel.getCache('entryMode') !== env.VOUCHER_STATE_BROWSE) {
      viewmodel.communication({ type: 'return' });
      return;
    }
    _resetOriginal(viewmodel, afterAct);
  }
  const returnSave = function (billNo, viewModel, closeCallback) {
    cb.utils.confirm('是否保存？', function () {
      save(billNo, viewModel, null, function (beforeActData, callback) {
        return viewModel.promiseExecute('beforeSave', beforeActData, callback);
      }, function () {
        closeCallback(viewModel);
      });
    }, function () {
      closeCallback(viewModel);
    });
  }
  const inValid = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let invalidReason = prompt("请输入作废理由", "")
    let data = viewmodel.getNecessaryData()
    if (invalidReason) {
      data = cb.utils.extend(data, {
        invalidReason
      })
    }
    let postData = {
      billnum: billNo,
      data: JSON.stringify(data)
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {

      _doServiceByData(viewmodel, postData, params, afterAct)
    })
  }

  const submit = (billNo, viewmodel, params, beforeAct, afterAct) => {
    console.log('submit --->')
    let proxy = cb.rest.DynamicProxy.create({
      startProcess: {
        url: 'bpmController/startProcess',
        method: 'POST',
        options: {
          token: true
        }
      }
    })
    let postData = {
      billNum: billNo,
      billId: viewmodel.get("id").getValue(),
      billCode: viewmodel.get("code").getValue()
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      proxy.startProcess(postData, function (err, data) {
        if (err) {
          console.error(err.message)
          return
        }
        cb.utils.alert(data)
        afterAct()
      })
    })


  }

  const checkApprove = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let postData = {
      billNum: billNo,
      billId: viewmodel.get('id'),
      billCode: viewmodel.get('code')
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      viewmodel.communication({
        type: 'modal',
        payload: {
          type: 'platform',
          url: 'checkapprove',
          model: viewmodel,
          data: postData
        }
      })
      afterAct()
    })

  }

  const audit = (billNo, viewmodel, params, beforeAct, afterAct) => {
    if (viewmodel.get("isWfControlled") && viewmodel.get("isWfControlled").getValue()) {
      let postData = {
        billNum: billNo,
        billId: viewmodel.get('id'),
        billCode: viewmodel.get('code')
      }
      let beforeActData = {
        params: params,
        data: postData
      }
      beforeAct(beforeActData, function () {
        viewmodel.communication({
          type: 'modal',
          payload: {
            type: 'platform',
            url: 'approve',
            model: viewmodel,
            data: postData
          }
        })
        afterAct()
      })

    } else {
      let data = viewmodel.collectData(true)
      let postData = {
        billnum: billNo,
        data: JSON.stringify(data)
      }
      let beforeActData = {
        params: params,
        data: postData
      }
      beforeAct(beforeActData, function () {

        _doServiceByData(viewmodel, postData, params, afterAct)
      })
    }

  }

  const close = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let data = viewmodel.collectData(true)
    let postData = {
      billnum: billNo,
      data: JSON.stringify(data)
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      _doServiceByData(viewmodel, postData, params, afterAct)
    })

  }

  const addRow = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let beforeActData = {
      params: params
    }
    beforeAct(beforeActData, function () {
      let data = common.getGridModel(viewmodel, params).appendRow()
      afterAct(data)
    })

  }

  const deleteRow = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let rowIndexes = params && params.params && params.params.index != null ?
      [params.params.index] :
      common.getGridModel(viewmodel, params).getSelectedRowIndexes();
    let beforeActData = {
      params: params,
      data: rowIndexes
    }
    beforeAct(beforeActData, function () {
      let data = common.getGridModel(viewmodel, params).deleteRows(rowIndexes)
      afterAct(data)
    })

  }

  const insertRow = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let rowIndexes = params && params.params && params.params.index != null ?
      [params.params.index] :
      common.getGridModel(viewmodel, params).getSelectedRowIndexes();
    let beforeActData = {
      params: params,
      data: rowIndexes
    }
    beforeAct(beforeActData, function () {
      if (!rowIndexes.length) {
        return
      }
      let data = common.getGridModel(viewmodel, params).insertRow(rowIndexes[0])
      afterAct(data)
    })

  }

  const copyRow = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let rowIndexes = params && params.params && params.params.index != null ?
      [params.params.index] :
      common.getGridModel(viewmodel, params).getSelectedRowIndexes();
    if (!rowIndexes.length) {
      return
    }
    let rowData = common.getGridModel(viewmodel, params).getSelectedRows()
    let beforeActData = {
      params: params,
      data: {
        rowIndexes,
        rowData
      }
    }
    beforeAct(beforeActData, function () {
      let data = common.getGridModel(viewmodel, params).insertRow(rowIndexes[0], rowData[0])
      afterAct(data)
    })

  }

  const shiftUpRow = function (billNo, viewModel, params, beforeAct, afterAct) {
    const rowIndexes = params && params.params && params.params.index != null ?
      [params.params.index] :
      common.getGridModel(viewModel, params).getSelectedRowIndexes();
    if (!rowIndexes.length) return;
    const rowIndex = rowIndexes[0];
    const args = {
      params: params,
      data: rowIndex
    };
    beforeAct(args, function () {
      common.getGridModel(viewModel, params).shiftUpRow(rowIndex);
      afterAct(args);
    });
  };

  const shiftDownRow = function (billNo, viewModel, params, beforeAct, afterAct) {
    const rowIndexes = params && params.params && params.params.index != null ?
      [params.params.index] :
      common.getGridModel(viewModel, params).getSelectedRowIndexes();
    if (!rowIndexes.length) return;
    const rowIndex = rowIndexes[0];
    const args = {
      params: params,
      data: rowIndex
    };
    beforeAct(args, function () {
      common.getGridModel(viewModel, params).shiftDownRow(rowIndex);
      afterAct(args);
    });
  };

  const localPrint = function (billNo, viewModel, params, beforeAct, afterAct) {
    params = params || {};
    if (!params.cAction) {
      const configParams = viewModel.allActions && viewModel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'localprint';
      });
      Object.assign(params, configParams);
    }
    const id = viewModel.get('id').getValue();
    if (cb.utils.isEmpty(id)) {
      cb.utils.alert('未找到具体单据', 'error');
      return;
    }
    const route = params && params.cSvcUrl || '/bill';
    const { disabledCallback, enabledCallback } = params;
    const templatesModel = viewModel.get('templates');
    if (templatesModel) {
      const templateCode = templatesModel.getValue();
      if (cb.utils.isEmpty(templateCode)) {
        cb.utils.alert('请选择打印模板', 'error');
        return;
      }
      if (disabledCallback) {
        disabledCallback();
        params.disabledCallback = false;
      }
      _localPrint(billNo, templateCode, id, route, beforeAct, enabledCallback);
    } else {
      if (disabledCallback) {
        disabledCallback();
        params.disabledCallback = false;
      }
      const proxy = cb.rest.DynamicProxy.create({
        getTemplate: { url: 'print/getTemplateByBo', method: 'GET', options: { mask: true } }
      });
      proxy.getTemplate({ billno: billNo }, function (err, data) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          if (enabledCallback)
            enabledCallback();
          return;
        }
        const template = data.length === 1 ? data[0] : data.find(item => {
          return item.isdefault;
        });
        if (cb.utils.isEmpty(template)) {
          cb.utils.alert('没有设置打印模板，请检查', 'error');
          if (enabledCallback)
            enabledCallback();
          return;
        }
        _localPrint(billNo, template.templatecode, id, route, beforeAct, enabledCallback);
      });
    }
  }

  const _localPrint = function (billno, templateCode, id, route, beforeAct, enabledCallback) {
    const proxy = cb.rest.DynamicProxy.create({
      print: { url: route + '/getTemplateStructure', method: 'POST', options: { mask: true } }
    });
    const params = { billno, templateCode, ids: [id] };
    proxy.print(params, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        if (enabledCallback)
          enabledCallback();
        return;
      }
      beforeAct(result, function () {
        cb.utils.localPrint(result);
        if (enabledCallback)
          enabledCallback();
      });
    });
  }

  const save = function (billNo, viewmodel, params, beforeAct, afterAct, caption) {
    params = params || {};
    if (!params.cAction) {
      const configParams = viewmodel.allActions && viewmodel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'save';
      });
      Object.assign(params, configParams);
    }
    const invalidMsg = viewmodel.validate();
    if (invalidMsg) {
      cb.utils.alert('以下数据项校验失败：' + invalidMsg.join(','), 'error');
      return;
    }
    let mode = common.getMode(viewmodel)
    const action = common.getVmParams(viewmodel, 'action');
    let data = viewmodel.collectData()
    if (!data) {
      cb.utils.alert('未作任何修改')
      viewmodel.setReadOnly(true)
      common.setState(viewmodel)
      return
    }
    if (common.getVmParams(viewmodel, 'metatype') && common.getVmParams(viewmodel, 'metatype') == 'editablevoucherlist') {
      data = data[viewmodel.getGridModel().getName()]
    }
    if (mode == env.VOUCHER_STATE_ADD) {
      data['_status'] = cb.models.DataStates.Insert
      let parentId = common.getVmParams(viewmodel, 'parentId') //树表新建时的父类
      if (parentId != undefined) {
        let key = common.getVmParams(viewmodel, 'foreignKey') //档案的parentid
        if (key) {
          data[key] = parentId
        }
      }
    } else {
      data["_status"] = cb.models.DataStates.Update
    }

    let postData = Object.assign({
      billnum: billNo,
      data: JSON.stringify(data)
    }, params.defineParams);
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      let callback = function (err, res) {
        // if (err) {
        //   cb.utils.alert(err.message, 'error');
        //   return;
        // }
        let newData = res;
        let afterActData = {
          params,
          err: err,
          res: newData
        }
        if (!err) {
          cb.utils.alert(`${caption || '保存'}成功`, 'success')
          common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE);
          const currentAction = params.cAction.trim().toLocaleLowerCase();
          if (currentAction === 'saveandadd') {
            afterAct(afterActData, common.afterAct);
            return/*保存并新增*/
          }
          if (currentAction !== 'saveandaudit' && viewmodel.getParams().saveReturn !== false && (viewmodel.getParams().multitpl || viewmodel.getCache('entryMode') !== env.VOUCHER_STATE_BROWSE)) {
            if (cb.utils.isEmpty(viewmodel.get('id').getValue()) && res)
              viewmodel.get('id').setValue(res.id);
            afterAct(afterActData, common.afterAct);
            viewmodel.communication({ type: 'return', payload: viewmodel.get('id').getValue() });
            return;
          }
          // common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE)
          let oldData = viewmodel.collectData(true)
          let condition;
          let arrayKeys = []
          for (let key in res) {
            if (Array.isArray(res[key]) && viewmodel.get(key) && viewmodel.get(key).getDirtyRowIndexes && viewmodel.get(key).getDirtyRowIndexes() && viewmodel.get(key).getDirtyRowIndexes().length > 0) {
              arrayKeys.push(key)
              condition = {};
            }
          }

          arrayKeys.forEach((key) => {
            condition[key] = viewmodel.get(key).getDirtyRowIndexes()
          })
          newData = common.billMerge(oldData, res, condition)
          render(viewmodel, newData)
        }
        // let afterActData = {
        //   params,
        //   err: err,
        //   res: newData
        // }
        afterAct(afterActData, common.afterAct)
      }
      params.options = { mask: true };
      common.doProxy(params, callback, postData)
    })

  }

  const doDelete = function (billNo, viewmodel, params, beforeAct, afterAct) {

    let data = viewmodel.getNecessaryData()
    let postData = {
      billnum: billNo,
      data: JSON.stringify(data)
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      const text = viewmodel.getParams().caption;
      cb.utils.confirm(`是否确认删除此${text}`, function () {
        common.doProxy(params, function (err, suc) {
          if (!err) {
            cb.utils.alert('操作成功', 'success')
            viewmodel.communication({ type: 'return' });
            // viewmodel.execute('moveprev')
          }
          let afterActData = {
            err: err,
            res: suc
          }
          afterAct(afterActData, common.afterAct)
        }, postData)
      })
    });
  }

  const moveFirstOrLast = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let postData = {
      billnum: billNo
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      let callback = function (err, res) {
        if (!err) {
          render(viewmodel, res)
        }
        let afterActData = {
          err: err,
          res: res
        }
        afterAct(afterActData, common.afterAct)
      }
      common.doProxy(params, callback, postData)
    })

  }

  const movePrevOrNext = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let postData = {
      billnum: billNo
    }
    cb.utils.extend(postData, viewmodel.getNecessaryData())
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      let callback = function (err, res) {
        if (!err) {
          const bSwitchTpl = _tplIsEquql(res, viewmodel)
          _reloadVoucher(bSwitchTpl, res, viewmodel, billNo, afterAct)
        } else {
          let afterActData = {
            err: err,
            res: res
          }
          afterAct(afterActData, common.afterAct)
        }

      }
      common.doProxy(params, callback, postData)
    })

  }



  //拉单
  const pull = (billNo, viewmodel, params, beforeAct, afterAct) => {
    var queryString = new cb.utils.queryString(params.cSvcUrl)
    let targetCode = queryString.get('code')
    let targetBillNo = queryString.get('targetBillNo')
    if (targetCode && targetBillNo) {
      let queryData = {
        code: targetCode,
        isMainSelect: 1,
        childIds: [viewmodel.get('id').getValue()]
      }
      let par = {
        cSvcUrl: queryString.pathname + queryString.toStr(),
        cHttpMethod: params.cHttpMethod
      }
      let beforeActData = {
        params: params,
        data: queryData
      }
      beforeAct(beforeActData, function () {
        let callback = function (err, data) {
          if (!err) {
            let params = {
              mode: env.VOUCHER_STATE_ADD,
              carryData: data
            }
            let dt = {
              billtype: 'voucher',
              billno: targetBillNo,
              params: params
            }
            cb.loader.runCommandLine('bill', dt, viewmodel)
          }
          let afterActData = {
            err: err,
            res: data
          }
          afterAct(afterActData, common.afterAct)

        }
        common.doProxy(par, callback, queryData)
      })

    }
  }
  const saveAndAdd = (billNo, viewModel, params) => {
    let saveParams = viewModel.allActions && viewModel.allActions.find(item => {
      return item.cAction.trim().toLocaleLowerCase() === 'save';
    });
    if (!saveParams) {
      cb.utils.alert('没有取到保存参数', 'error');
      return;
    }
    saveParams = Object.assign({}, saveParams, { cAction: params.cAction });
    const beforeSave = (beforeActData, callback) => {
      viewModel.promiseExecute('beforeSave', beforeActData, callback);
    };
    const afterSave = (afterActData, callback) => {
      viewModel.promiseExecute('afterSave', afterActData, function () {
        callback && callback(afterActData);
      });
    };
    save(billNo, viewModel, saveParams, beforeSave, function (afterSaveData) {
      afterSave(afterSaveData, function () {
        if (afterSaveData.err) {
          common.afterAct(afterSaveData);
          return;
        }
        let addParams = viewModel.allActions && viewModel.allActions.find(item => {
          return item.cAction.trim().toLocaleLowerCase() === 'add';
        });
        // if (!addParams) {
        //   cb.utils.alert('没有取到提交参数', 'error');
        //   return;
        // }
        addParams = Object.assign({}, addParams, { cAction: params.cAction });
        const beforeAdd = (beforeActData, callback) => {
          viewModel.promiseExecute('beforeAdd', beforeActData, callback);
        };
        const afterAdd = (afterActData, callback) => {
          viewModel.promiseExecute('afterAdd', afterActData, function () {
            callback && callback(afterActData);
          });
        };
        add(billNo, viewModel, addParams, beforeAdd, afterAdd);
      });
    });
  }
  const saveAndAudit = (billNo, viewModel, params) => {
    let saveParams = viewModel.allActions && viewModel.allActions.find(item => {
      return item.cAction.trim().toLocaleLowerCase() === 'save';
    });
    if (!saveParams) {
      cb.utils.alert('没有取到保存参数', 'error');
      return;
    }
    saveParams = Object.assign({}, saveParams, { cAction: params.cAction });
    const beforeSave = (beforeActData, callback) => {
      viewModel.promiseExecute('beforeSave', beforeActData, callback);
    };
    const afterSave = (afterActData, callback) => {
      viewModel.promiseExecute('afterSave', afterActData, function () {
        callback && callback(afterActData);
      });
    };
    save(billNo, viewModel, saveParams, beforeSave, function (afterSaveData) {
      afterSave(afterSaveData, function () {
        if (afterSaveData.err) {
          common.afterAct(afterSaveData);
          return;
        }
        let auditParams = viewModel.allActions && viewModel.allActions.find(item => {
          return item.cAction.trim().toLocaleLowerCase() === 'audit';
        });
        if (!auditParams) {
          cb.utils.alert('没有取到提交参数', 'error');
          return;
        }
        auditParams = Object.assign({}, auditParams, { cAction: params.cAction });
        const beforeAudit = (beforeActData, callback) => {
          viewModel.promiseExecute('beforeAudit', beforeActData, callback);
        };
        const afterAudit = (afterActData, callback) => {
          viewModel.promiseExecute('afterAudit', afterActData, function () {
            callback && callback(afterActData);
          });
        };
        audit(billNo, viewModel, auditParams, beforeAudit, afterAudit);
      });
    });
  }
  const add = (billNo, viewmodel, params, beforeAct, afterAct) => {
    if (!viewmodel) {
      return _getInitdata(billNo, params, afterAct);
      const { cSvcUrl, cHttpMethod } = params.params;
      const callback = function (err, emptyData) {
        if (err) {
          common.afterAct({ err });
          return;
        }
        afterAct(null, emptyData);
      };
      const postData = Object.assign({ billnum: billNo }, params.carryParams);
      common.doProxy({ cSvcUrl, cHttpMethod }, callback, postData);
      return;
    }
    params = params || {};
    if (!params.cAction) {
      const configParams = viewmodel.allActions && viewmodel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'add';
      });
      Object.assign(params, configParams);
    }
    var queryString = new cb.utils.queryString(params.cSvcUrl)
    var callbackdata = []
    if (queryString.has('code')) {
      let dt = {
        billtype: 'billmaker',
        billno: queryString.get('billno'),
        params: {
          'code': queryString.get('code'),
          'makeBilltype': queryString.get('makeBilltype')
        }
      }
      cb.loader.runCommandLine('bill', dt, null, function (vm, viewmeta) {
        var callback = function (err, suc) {
          callbackdata = suc
          let afterActData = {
            err: err,
            res: suc
          }
          afterAct(afterActData, common.afterAct)
        }
        let postData = {
          "billnum": billNo
        }
        let beforeActData = {
          params: params,
          data: postData
        };
        beforeAct(beforeActData, function () {
          common.emptyBill(postData, params, callback)
          vm.on('afterOkClick', function (args) {
            if (args.data) {
              common.setMode(viewmodel, env.VOUCHER_STATE_ADD)
              var newdata = common.billMerge(args.data, callbackdata)
              render(viewmodel, newdata, true)
            }
          })
          vm.on('close', function () {
            viewmodel.communication({
              type: 'modal',
              payload: false
            })
          })
          viewmodel.communication({
            type: 'modal',
            payload: {
              type: 'platform',
              url: 'billmaker',
              model: viewmodel,
              data: {
                vm: vm,
                viewmeta: viewmeta
              }
            }
          })
        })

      })
    } else {
      let postData = {
        "billnum": billNo
      }
      let beforeActData = {
        params: params,
        data: postData
      };
      beforeAct(beforeActData, function () {
        common.emptyBill(postData, params, function (err, suc) {
          let afterActData = {
            err: err,
            res: suc
          }
          if (!err) {
            common.setMode(viewmodel, env.VOUCHER_STATE_ADD)
            viewmodel.addData = suc
            if (viewmodel.get(env.VOUCHER_TPL_KEY)) {
              let currentTpl = viewmodel.get(env.VOUCHER_TPL_KEY).getValue()
              suc[env.VOUCHER_TPL_KEY] = currentTpl
            }
            render(viewmodel, suc, true);
            // render(viewmodel, suc);
          }
          afterAct(afterActData, common.afterAct)

        })
      })

    }
  }

  const output = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let printID = viewmodel.get(env.VOUCHER_PRINT_KEY) && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue() && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue().toString()
    let queryString = new cb.utils.queryString("/files" + params.cSvcUrl)
    if (!queryString) {
      return
    }
    let format = queryString.has('type') ? queryString.get('type') : 'pdf'
    let inputParams = {
      // bill: {
      billnum: billNo,
      ids: [viewmodel.get('id').getValue()].join(),
      id: viewmodel.get('id').getValue(),
      data: params.data,
      partParam: params.partParam
      //   tplid: printID
      // },
      // type: 'voucher',
      // format: format
    }
    queryString.set('token', cb.rest.AppContext.token || '')
    let url = queryString && queryString.pathname + queryString.toStr()

    let beforeActData = {
      params: params,
      data: inputParams
    };
    beforeAct(beforeActData, function () {
      common.createDownloadForm(url, inputParams)
      afterAct()
    })

  }

  const savebo = (billNo, viewmodel, params, beforeAct, afterAct) => {
    const proxy = cb.rest.DynamicProxy.create({
      saveBo: { url: 'print/saveBo', method: 'GET' }
    })
    proxy.saveBo({ billno: billNo }, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      cb.utils.alert('保存业务对象成功', 'success');
    });
  }

  const preview = (billNo, viewmodel, params, beforeAct, afterAct) => {
    const actionName = params.params && params.params.cAction;
    if (actionName === 'localPrint') {
      const localPrintButtonModel = viewmodel.get('btnLocalPrint');
      if (localPrintButtonModel) {
        params.disabledCallback = function () {
          localPrintButtonModel.setDisabled(true);
        }
        params.enabledCallback = function () {
          localPrintButtonModel.setDisabled(false);
        }
      }
      viewmodel.biz.do(actionName, viewmodel, params);
      return;
    }
    beforeAct({ params }, function () {
      const template = viewmodel.get('templates').getValue();
      if (!template) {
        cb.utils.alert('请选择打印模板', 'warning');
        return;
      }
      const newTab = window.open('about:blank');
      const proxy = cb.rest.DynamicProxy.create({
        preview: { url: 'print/printPreview', method: 'POST' }
      })
      proxy.preview({
        route: params.cSvcUrl || '/bill',
        billno: billNo,
        template: template,
        ids: [viewmodel.get('id').getValue()]
      }, function (err, result) {
        if (!err)
          newTab.location.href = result;
        const afterActData = {
          err: err,
          res: result
        };
        afterAct(afterActData, common.afterAct);
      });
    });
  }

  const print = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let printID = viewmodel.get(env.VOUCHER_PRINT_KEY) && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue() && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue().toString()
    let postData = {
      json: {
        bill: {
          billnum: billNo,
          ids: [viewmodel.get('id').getValue()],
          tplid: printID
        },
        type: 'voucher'
      }
    }

    let beforeActData = {
      params: params,
      data: postData
    };
    beforeAct(beforeActData, function () {
      let callback = function (err, result) {
        if (err) {
          console.error(err)
          return
        }
        window.open(result)
        afterAct()
      }
      common.doPrint(postData, params, callback)
    })


  }

  const initDefaultActions = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let allActions = viewmodel.allActions
    let beforeActData = {
      params: params,
      data: allActions
    };
    beforeAct(beforeActData, function () {
      viewmodel.on('moveprev', function () {
        let prevAction = allActions.find((x) => {
          return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === 'cmdmoveprev'
        })
        if (prevAction) {
          movePrevOrNext(billNo, viewmodel, prevAction)
        }
      })
      viewmodel.on('movenext', function () {
        let nextAction = allActions.find((x) => {
          return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === 'cmdmovenext'
        })
        if (nextAction) {
          movePrevOrNext(billNo, viewmodel, nextAction)
        }
      })
      if (viewmodel.get(env.VOUCHER_TPL_KEY)) {
        viewmodel.get(env.VOUCHER_TPL_KEY).on('afterValueChange', function (data) {
          if (data && data.value) {
            viewmodel.biz.do('selecttpl', viewmodel, data)
          }
        })
      }
      afterAct()
    })

  }

  const selectTpl = function (billNo, oldVM, params, beforeAct, afterAct) {
    params.tplid = params['value'].value
    let cbk = (err, result, ) => {
      const vmAndView = common.initVM(err, result, billNo, params)
      if (vmAndView) {
        let { vm: newVM, view: newView } = vmAndView
        oldVM.communication({
          payload: {
            menuName: newView.cBillName,
            vm: newVM,
            refresh: true,
            metaData: newView
          }
        })
        _loadVm(oldVM, newVM)
        common.setMode(newVM, common.getMode(oldVM))
        let loadData,
          setData
        if (common.getMode(newVM) == env.VOUCHER_STATE_ADD) {
          loadData = oldVM.collectData(true)
          setData = oldVM.addData
        } else {
          loadData = oldVM.getOriginalData()
          setData = oldVM.collectData(true)
        }
        newVM.setData(setData)
        render(newVM, loadData, common.getMode(newVM) == env.VOUCHER_STATE_ADD)

        if (afterAct) afterAct()
      }
    }
    let beforeActData = {
      params: params,
    };
    beforeAct(beforeActData, function () {

      common.fetchMeta(billNo, params, cbk)
    })
  }

  const push = function (billNo, viewModel, params, beforeAct, afterAct) {
    if (viewModel) {
      common.push(viewModel, params, viewModel.collectData(true), beforeAct, afterAct);
      return;
    }
    if (!params || !params.cSvcUrl) return;
    const targetCode = new cb.utils.queryString(params.cSvcUrl).get('code');
    if (!targetCode) return;
    const callback = function (err, pushData) {
      if (err) {
        common.afterAct({ err });
        return;
      }
      params.carryParams = params.carryParams || {};
      params.carryParams.externalData = pushData;
      _getInitdata(billNo, params, function (err1, emptyData) {
        if (err1) {
          common.afterAct({ err1 });
          return;
        }
        afterAct(null, common.billMerge(emptyData, pushData));
      });
    };
    const postData = {
      code: targetCode,
      isMainSelect: 1,
      childIds: [params.data.id]
    };
    common.doProxy(params, callback, postData);
  }

  const compositeAction = (billNo, viewModel, params) => {
    let firstAction = null;
    let Act = null;
    try {
      const defineParams = JSON.parse(params.cParameter);
      firstAction = defineParams.action.split('&')[0].replace(/(\w)/, function (v) {
        return v.toUpperCase()
      });
      Act = viewModel.biz.action()[firstAction.trim().toLocaleLowerCase()];
      if (!Act) return;
      params.defineParams = defineParams;
    } catch (e) {
      console.error('compositeAction error: ' + e.message);
      return;
    }
    const beforeAct = (beforeActData, callback) => {
      viewModel.promiseExecute('before' + firstAction, beforeActData, callback);
    };
    const afterAct = (afterActData, callback) => {
      viewModel.promiseExecute('after' + firstAction, afterActData, function () {
        callback && callback(afterActData);
      });
    };
    Act(billNo, viewModel, params, beforeAct, afterAct, params.cShowCaption);
  }

  const saveDraft = (billNo, viewModel, params, beforeAct, afterAct) => {
    viewModel.communication({
      type: 'modal',
      payload: {
        key: 'Savedraft',
        data: {
          model: viewModel
        }
      }
    });
  }

  return {
    init: function (billNo, params, viewCallback) {
      params = params || {};
      if (!params.mode && params.query && params.query.mode)
        params.mode = params.query.mode;
      let self = this
      let initDataCallback = function (err, billData) {
        if (!err) {
          const { cardViewModel } = params;
          if (cardViewModel) {
            cardViewModel.biz.do('load', cardViewModel, {
              data: billData
            });
            cb.utils.loadingControl.end();
            return;
          }
          let vmParams = Object.assign({}, params)
          if (billData && billData.tplid && params && !params.tplid) {
            vmParams.tplid = billData.tplid
          }
          if (params && params.carryData) {
            billData = Object.assign(billData, params.carryData)
          }
          let cbk = function (err, meta) {
            vmParams.billData = billData
            if (billData && billData['_status'] === cb.models.DataStates.Insert)
              vmParams.mode = env.VOUCHER_STATE_ADD;
            _fetchMetaCallback(err, meta, billNo, viewCallback, vmParams)
          }
          common.fetchMeta(billNo, vmParams, cbk)
        } else {
          common.afterAct({
            err: err
          })
        }
      }
      if (params && params.metatype == 'editablevoucherlist') { //只有一个可编辑的列表,不获取数据直接加载页面
        initDataCallback()
      } else {
        // _getInitdata(billNo, params, initDataCallback)
        const proxy = cb.rest.DynamicProxy.create({ getTplList: { url: 'billmeta/tpllist', method: 'GET' } });
        proxy.getTplList({ billno: billNo }, function (err, result) {
          if (err || result.length === 1) {
            params.tplid = result && result[0].iTplId;
            if (params.action)
              return self.action()[params.action](billNo, null, params, function () { }, initDataCallback);
            _getInitdata(billNo, params, initDataCallback);
            return;
          }
          const tpllist = {};
          result.forEach(function (tpl) {
            const tplid = tpl.iTplId;
            switch (tpl.iTplMode) {
              case 0:
                tpllist[env.VOUCHER_STATE_BROWSE] = tplid;
                break;
              case 2:
                tpllist[env.VOUCHER_STATE_EDIT] = tplid;
            }
          });
          params.multitpl = true;
          params.tplid = params.mode === 'browse' || params.readOnly ? tpllist[env.VOUCHER_STATE_BROWSE] : tpllist[env.VOUCHER_STATE_EDIT];
          if (params.action)
            return self.action()[params.action](billNo, null, params, function () { }, initDataCallback);
          _getInitdata(billNo, params, initDataCallback);
        });
      }

    },
    do: function (act, viewmodel, params) {
      common.todo(this, act, viewmodel, params)
    },
    action: function () {
      return {
        doservice: _doService,
        load: loadData,
        rule: buildRule,
        initdefaultactions: initDefaultActions,
        commandline: common.commandLine,
        abandon: abandon,
        copy: copy,
        push: push,
        edit: common.edit,
        save: save,
        addrow: addRow,
        insertrow: insertRow,
        deleterow: deleteRow,
        copyrow: copyRow,
        shiftuprow: shiftUpRow,
        shiftdownrow: shiftDownRow,
        delete: doDelete,
        invalid: inValid,
        audit: audit,
        submit: submit,
        unaudit: audit,
        close: close,
        open: close,
        movefirst: moveFirstOrLast,
        movelast: moveFirstOrLast,
        moveprev: movePrevOrNext,
        movenext: movePrevOrNext,
        add: add,
        create: add,
        pull: pull,
        check: common.check,
        refresh: refresh,
        columnsetting: common.columnsetting,
        checkapprove: checkApprove,
        cellcheck: cellCheck,
        lineopen: lineOpenOrClose,
        lineclose: lineOpenOrClose,
        output: output,
        print: print,
        selecttpl: selectTpl,
        saveandadd: saveAndAdd,
        saveandaudit: saveAndAudit,
        savebo: savebo,
        preview: preview,
        localprint: localPrint,
        selfdefineaction: compositeAction,
        savedraft: saveDraft
      }
    }
  }
}()

cb.namespace('biz.common')
cb.biz.common.voucher = voucher

export default voucher
