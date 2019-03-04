import * as common from './common';
const option = function () {
  const loadData = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let proxy = cb.rest.DynamicProxy.create({
      getData: {
        url: '/option.do/' + viewmodel.getParams().subId,
        method: 'GET',
        options: {
          uniform: false
        }
      }
    });
    let beforeDt = {
      orgId: cb.rest.AppContext.orgId,
      subid: viewmodel.getParams().subid,
      optionId: viewmodel.getParams().optionId
    }
    let beforeActData = {
      params: params,
      data: beforeDt
    }
    beforeAct(beforeActData, function () {
      proxy.getData(beforeDt, function (err, res) {
        if (!err) {
          viewmodel.setReadOnly(false);
          viewmodel.loadData(res);
        }
        let afterActData = {
          err: err,
          res: res
        }
        afterAct(afterActData, common.afterAct)
      });
    })

  };
  const save = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let data = viewmodel.collectData();
    if (!data) {
      cb.utils.alert('未作任何修改');
      return;
    }
    // data["_status"] = cb.models.DataStates.Update;
    const inputData = [];
    for (var attr in data)
      inputData.push({ name: attr, value: data[attr], optionId: viewmodel.getParams().optionId })
    let postData = {
      // optionId: viewmodel.getParams().optionId,
      // subid: viewmodel.getParams().subId,
      // orgId: cb.rest.AppContext.orgId,
      // data: data
      data: inputData
    };
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      let callback = function (err, res) {
        let newData = res;
        if (!err) {
          cb.utils.alert('保存成功');
          let oldData = viewmodel.collectData(true);
          newData = Object.assign({}, oldData, res);
          viewmodel.loadData(newData);
        }
        let afterActData = {
          err: err,
          res: newData
        }
        afterAct(afterActData, common.afterAct)

      }
      common.doProxy(params, callback, postData);
    });
  };
  const abandon = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let data = viewmodel.collectData();
    let beforeActData = {
      params: params
    }
    beforeAct(beforeActData, function () {
      if (data) {
        cb.utils.confirm("确定要放弃么", function () {
          // viewmodel.communication({ type: 'close' });
          // return;
          let afterActData = {
            res: viewmodel.getOriginalData()
          }
          viewmodel.loadData(viewmodel.getOriginalData());
          afterAct(afterActData, common.afterAct)
        });
      } else {
        // viewmodel.communication({ type: 'close' });
      }
    })

  };
  return {
    init: function (billNo, params, callback) {
      let self = this;
      let proxy = cb.rest.DynamicProxy.create({
        getMeta: {
          url: '/meta',
          method: 'POST',
          options: {
            uniform: false
          }
        }
      });
      let postData = Object.assign({}, params, {
        type: 'option',
        optionId: billNo
      })
      proxy.getMeta(postData, function (err, result) {
        if (err) {
          cb.utils.alert(JSON.stringify(err), 'error');
          console.error(err);
          cb.utils.loadingControl.end();
          return;
        }
        let func = new Function(result.vm);
        func();
        let defaultParams = {
          optionId: billNo,
          billNo: result.viewmeta.cBillNo,
          subId: result.viewmeta.cSubId,
          foreignKey: result.viewmeta.foreignKey
        };
        let vm = new cb.viewmodels[result.viewmeta.vmName]();
        cb.utils.extend(true, vm.getParams(), defaultParams, params);
        common.storeVmInstance(billNo, vm);
        vm.on('extendReady', function () {
          callback(vm, result.viewmeta);
        });
        vm.initData();
        window.yya = vm
        self.do('load', vm);
      });
    },
    do: function (act, viewmodel, params) {
      common.todo(this, act, viewmodel, params)
    },
    action: function () {
      return {
        load: loadData,
        save: save,
        abandon: abandon
      }
    }
  }
}()

cb.namespace('biz.common');
cb.biz.common.option = option;

export default option
