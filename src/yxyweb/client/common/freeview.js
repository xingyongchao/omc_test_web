import * as common from './common';

const freeview = function () {
  const cellCheck = function (billNo, viewmodel, params, beforeAct, afterAct) {
    let gridModel = common.getGridModel(viewmodel, params);
    let cellName = params.cellName;
    let column = gridModel.getColumn(cellName);
    let data = {
      location: params.rowIndex,
      key: cellName,
      childrenField: params.childrenField,
      value: params.value
    }
    let beforeActData = {
      params: params,
      data: data
    };
    if (!beforeAct(beforeActData)) return
    if (column && column.cControlType.toLowerCase() == 'refer') {
      common.refercheck(billNo, viewmodel, data, afterAct, true);
    }
    if (column.bCheck === true) {
      common.check(billNo, viewmodel, data, afterAct, true);
    }
  };
  return {
    init: function (billNo, params, callback) {
      let self = this;
      let initCallback = (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        let func = new Function(result.vm);
        func();
        let defaultParams = {
          billNo: result.viewmeta.cBillNo,
          subId: result.viewmeta.cSubId
        };
        let vm = new cb.viewmodels[result.viewmeta.vmName]();
        window.yya = vm
        cb.utils.extend(true, vm.getParams(), defaultParams, params);
        common.storeVmInstance(billNo, vm);
        vm.on('extendReady', function () {
          callback(vm, result.viewmeta);
        });
        vm.initData();
      }
      common.fetchMeta(billNo, params, initCallback);

    },
    do: function (act, viewmodel, params) {
      common.todo(this, act, viewmodel, params)
    },
    action: function () {
      return {
        check: common.check,
        cellcheck: cellCheck,
      }
    }
  }
}()

cb.namespace('biz.common');
cb.biz.common.freeview = freeview;

export default freeview;
