import * as common from './common';

const formula = function (str, srcData, dstData) {
  var func = new Function('src', 'dst', 'return ' + str);
  return func(srcData, dstData);
}

const billmaker = function () {
  //选择
  const selectgrid = function (billNo, viewmodel, params) {
    var cache = viewmodel.get('MakeBillCache');
    var RuleCache = viewmodel.get('RuleCache');
    var mainId = RuleCache.mainAndChildId.mainId;
    var childForId = RuleCache.mainAndChildId.childForId;
    var childId = RuleCache.mainAndChildId.childId;
    if (params.type === 'head') {
      var postData = {}, allIds = [], headIds = [], indexes = [];
      var params = { cSvcUrl: 'makeBill/getBodyData', cHttpMethod: 'POST' };
      var HeadData = viewmodel.get(viewmodel.get('Head')).getData();
      var HeadSelectData = viewmodel.get(viewmodel.get('Head')).getSelectedRows();
      var selectRowData;
      HeadSelectData.forEach(function (item) {
        allIds.push(item[mainId]);
        if (cache[item[mainId]]) return;
        headIds.push(item[mainId]);
        selectRowData = item;
      });
      if (HeadSelectData.length > 1) {
        if (!formula(RuleCache.rulePolicyList.head[0], RuleCache.HeadRuleData, selectRowData)) {
          for (var i = 0; i < HeadData.length; i++) {
            if (HeadData[i][mainId] === headIds[0])
              indexes.push(i);
          }
          viewmodel.get(viewmodel.get('Head')).unselect(indexes);
          cb.utils.alert('所选数据不符合生单规则，请重新选择数据！');
          return;
        }
      }
      if (HeadSelectData.length === 1)
        RuleCache.HeadRuleData = selectRowData;
      //是否单表结构
      if (RuleCache.isSingleVoucher === 0) {
        postData.headIds = headIds;
        postData.code = viewmodel.get('MakeBill').code;
        var callback = function (err, suc) {
          if (err && err.message) {
            cb.utils.alert(err.message, 'error');
            return;
          }
          suc.forEach(function (item) {
            if (!cache[item[childForId]])
              cache[item[childForId]] = [];
            cache[item[childForId]].push(item);
          });
          var data = [];
          allIds.forEach(function (headId) {
            var items = cache[headId];
            if (items)
              items.forEach(function (subItem) {
                data.push(subItem)
              });
          });
          viewmodel.get(viewmodel.get('Body')).setDataSource(data);
          var bodyselectindexes = [];
          for (var bodyIds in cache.BodySelectIds) {
            for (var i = 0; i < data.length; i++) {
              cache.BodySelectIds[bodyIds].forEach(function (item) {
                if (item === data[i][mainId.mainId])
                  bodyselectindexes.push(i);
              });
            }
            viewmodel.get(viewmodel.get('Body')).select(bodyselectindexes);
          }
        }
        common.doProxy(params, callback, postData);
      }
    } else {
      var BodyData = viewmodel.get(viewmodel.get('Body')).getSelectedRows();
      BodyData.forEach(function (rowindex) {
        if (!cache.BodySelectIds[rowindex[childForId]]) {
          cache.BodySelectIds[rowindex[childForId]] = [];
          cache.BodySelectIds[rowindex[childForId]].push(rowindex[childId]);
        } else {
          if (cache.BodySelectIds[rowindex[childForId]].indexOf(rowindex[childId]) === -1)
            cache.BodySelectIds[rowindex[childForId]].push(rowindex[childId]);
        }
      });
    }
  }
  //取消选择
  const unselectgrid = function (billNo, viewmodel, params) {
    var cache = viewmodel.get('MakeBillCache');
    var RuleCache = viewmodel.get('RuleCache');
    var mainId = RuleCache.mainAndChildId.mainId;
    var childForId = RuleCache.mainAndChildId.childForId;
    var childId = RuleCache.mainAndChildId.childId;
    if (params.type === 'head' && RuleCache.isSingleVoucher === 0) {
      var unselectdata = viewmodel.get(viewmodel.get('Head')).getRowsByIndexes(params.rowIndexes);
      if (cache[unselectdata[0][mainId]])
        delete cache[unselectdata[0][mainId]]
      if (cache.BodySelectIds[unselectdata[0][mainId]])
        delete cache.BodySelectIds[unselectdata[0][mainId]]
      var HeadData = viewmodel.get(viewmodel.get('Head')).getSelectedRows();
      var headIds = [];
      HeadData.forEach(function (item) {
        headIds.push(item[mainId]);
      });
      if (headIds.length !== 0) {
        var data = [];
        headIds.forEach(function (headId) {
          var items = cache[headId];
          if (items)
            items.forEach(function (subItem) {
              data.push(subItem)
            });
        });
        viewmodel.get(viewmodel.get('Body')).setDataSource(data);
        var bodyselectindexes = [];
        for (var bodyIds in cache.BodySelectIds) {
          for (var i = 0; i < data.length; i++) {
            cache.BodySelectIds[bodyIds].forEach(function (item) {
              if (item === data[i][mainId])
                bodyselectindexes.push(i);
            });
          }
          viewmodel.get(viewmodel.get('Body')).select(bodyselectindexes);
        }
      } else {
        viewmodel.get(viewmodel.get('Body')).setDataSource([]);
      }
    } else {
      var BodyData = viewmodel.get(viewmodel.get('Body')).getData();
      var BodySelectData = viewmodel.get(viewmodel.get('Body')).getSelectedRows();
      if (BodySelectData.length === 0) {
        cache.BodySelectIds = {};
        return;
      }
      var unselectId = BodyData[params.rowIndexes[0]][childId];
      var unselectMainId = BodyData[params.rowIndexes[0]][childForId];
      for (var bodyIds in cache.BodySelectIds) {
        if (bodyIds === unselectMainId)
          cache.BodySelectIds[bodyIds].push(unselectId);
      }
    }
  }
  //全选
  const selectall = function (billNo, viewmodel, params) {
    var cache = viewmodel.get('MakeBillCache');
    var RuleCache = viewmodel.get('RuleCache');
    var mainId = RuleCache.mainAndChildId.mainId;
    var childForId = RuleCache.mainAndChildId.childForId;
    var childId = RuleCache.mainAndChildId.childId;
    if (params.type === 'head') {
      var postData = {}, allIds = [], headIds = [], indexes = [];
      var params = { cSvcUrl: 'makeBill/getBodyData', cHttpMethod: 'POST' };
      var HeadData = viewmodel.get(viewmodel.get('Head')).getData();
      var BodyData = viewmodel.get(viewmodel.get('Body')).getSelectedRows();
      var HeadSelectIndexes = viewmodel.get(viewmodel.get('Head')).getSelectedRowIndexes();
      //全选时，数据重新从服务端获取。清除缓存中的数据。
      var BodySelectIds = cache.BodySelectIds;
      cache = {};
      cache.BodySelectIds = BodySelectIds;
      if (RuleCache.HeadRuleData)
        delete RuleCache.HeadRuleData;

      HeadData.forEach(function (item, index) {
        if (RuleCache.HeadRuleData) {
          if (!formula(RuleCache.rulePolicyList.head[0], RuleCache.HeadRuleData, item)) {
            headIds.push(item[mainId]);
            if (RuleCache.HeadRuleData[mainId] !== item[mainId]) indexes.push(index);
            return;
          }
          allIds.push(item[mainId]);
        } else {
          RuleCache.HeadRuleData = item;
          allIds.push(item[mainId]);
        }
      });
      if (indexes.length > 0) {
        viewmodel.get(viewmodel.get('Head')).unselect(indexes);
        cb.utils.alert('所选数据中存在不符合生单规则的数据！');
        return
      }
      //是否单表结构
      if (RuleCache.isSingleVoucher === 0) {
        postData.headIds = allIds;
        postData.code = viewmodel.get('MakeBill').code;
        var callback = function (err, suc) {
          suc.forEach(function (item) {
            if (!cache[item[childForId]])
              cache[item[childForId]] = [];
            cache[item[childForId]].push(item);
          });
          var data = [];
          allIds.forEach(function (headId) {
            if (cache[headId]) {
              cache[headId].forEach(function (subItem) {
                data.push(subItem)
              });
            }
          });
          viewmodel.get(viewmodel.get('Body')).setDataSource(data);
          var bodyselectindexes = [];
          for (var bodyIds in cache.BodySelectIds) {
            for (var i = 0; i < data.length; i++) {
              cache.BodySelectIds[bodyIds].forEach(function (item) {
                if (item === data[i][mainId])
                  bodyselectindexes.push(i);
              });
            }
            viewmodel.get(viewmodel.get('Body')).select(bodyselectindexes);
          }
        }
        common.doProxy(params, callback, postData);
      }
    } else {
      var BodyData = viewmodel.get(viewmodel.get('Body')).getData();
      if (BodyData !== null) {
        BodyData.forEach(function (rowindex) {
          if (!cache.BodySelectIds[rowindex[childForId]]) {
            cache.BodySelectIds[rowindex[childForId]] = [];
            cache.BodySelectIds[rowindex[childForId]].push(rowindex[childId]);
          } else {
            if (cache.BodySelectIds[rowindex[childForId]].indexOf(rowindex[childId]) === -1)
              cache.BodySelectIds[rowindex[childForId]].push(rowindex[childId]);
          }
        });
      }
    }
  }
  //全消
  const unselectall = function (billNo, viewmodel, params) {
    var cache = viewmodel.get('MakeBillCache');
    var RuleCache = viewmodel.get('RuleCache');
    var HeadData = viewmodel.get(viewmodel.get('Head')).getData();
    HeadData.forEach(function (item) {
      if (cache[item[RuleCache.mainAndChildId.mainId]])
        delete cache[item[RuleCache.mainAndChildId.mainId]];
    });
    if (params.type === 'head' && RuleCache.isSingleVoucher === 0)
      viewmodel.get(viewmodel.get('Body')).setDataSource([]);
  }
  //筛选
  const scress = function (billNo, viewmodel, params) {
    debugger;
  }
  //确定
  const sure = function (billNo, viewmodel, params) {
    var RuleCache = viewmodel.get('RuleCache');
    var childId = RuleCache.mainAndChildId.childId;
    var ids = [], PropertyName = '';
    var postData = {};
    postData.code = viewmodel.get('MakeBill').code;    
    var proxyUrl = '/makeBill/pullVoucher';
    // //是否推单
    // if (viewmodel.get('RuleCache').makeBilltype === 'push')
    //   proxyUrl = '/makeBill/pushVoucher';    
    //是否单表结构
    if (RuleCache.isSingleVoucher === 0) {
      PropertyName = viewmodel.get('Body');
      var headName = viewmodel.get('Head');
      var headId = RuleCache.mainAndChildId.mainId;
      var hIds = [];
      var headData = viewmodel.get(headName).getSelectedRows();
      if (headData.length === 0) {
        cb.utils.alert('未选择数据，请选择数据后重试！');
        return;
      }
      for (var i = 0; i < headData.length; i++) {
        hIds.push(headData[i][headId]);
      }
      postData.mainIds = hIds;      
    } else {
      childId = RuleCache.mainAndChildId.mainId;
      PropertyName = viewmodel.get('Head');
    }
    var selectData = viewmodel.get(PropertyName).getSelectedRows();
    if (selectData.length === 0) {
      cb.utils.alert('未选择数据，请选择数据后重试！');
      return;
    }
    for (var i = 0; i < selectData.length; i++) {
      ids.push(selectData[i][childId]);
    }
    postData.childIds = ids;
    var proxy = cb.rest.DynamicProxy.create({
      makeBill: { url: proxyUrl, method: 'POST' }
    });
    proxy.makeBill(postData, function (err, suc) {
      if (err) {
        if (err.message)
          cb.utils.alert('出错啦后台->' + err.message);
        else
          cb.utils.alert('出错啦后台->' + err.code);
        return;
      }
      // if (viewmodel.get('RuleCache').makeBilltype === 'pull') {
      viewmodel.execute('afterOkClick', { data: suc });
      viewmodel.execute('close');
      // } else {
      //   cb.utils.alert('生单成功!');
      //   viewmodel.execute('close');
      // }
    });
  }
  //定位
  const position = function (billNo, viewmodel, params) {
    debugger;
  }
  //刷新
  const fresh = function (billNo, viewmodel, params) {
    var FilterCache = viewmodel.get('FilterCache');
    if (FilterCache.hasFilter) {
      viewmodel.get(viewmodel.get('Body')).setDataSource([]);
      var postdata = { condition: FilterCache.condition };
      this.search(billNo, viewmodel, postdata);
    } else {
      this.load(billNo, viewmodel, params);
    }
  }
  //栏目设置
  const item = function (billNo, viewmodel, params) {
    debugger;
  }
  //帮助
  const help = function (billNo, viewmodel, params) {
    debugger;
  }
  //退出
  const out = function (billNo, viewmodel, params) {
    viewmodel.execute('close');
  }
  //过滤
  const search = (billNo, viewmodel, params) => {
    delete params.showSearch;
    var FilterCache = viewmodel.get('FilterCache');
    var Property = { cSvcUrl: 'makeBill/getMakeVoucherShowData', cHttpMethod: 'POST' };
    var callback = function (err, suc) {
      var cache = viewmodel.get('MakeBillCache');
      cache.BodySelectIds = {};
      var headPropertyName = viewmodel.get('Head');
      viewmodel.get(headPropertyName).setDataSource(suc.headData);
    }
    FilterCache.condition = params.condition;
    params.code = viewmodel.get('MakeBill').code;
    common.doProxy(Property, callback, params);
  }
  const load = (billNo, viewmodel, params) => {
    var FilterCache = viewmodel.get('FilterCache');
    if (viewmodel.get('MakeBill').code == null || viewmodel.get('MakeBill').code == "") {
      FilterCache.hasFilter = false;
      var Property = { cSvcUrl: 'makeBill/getMakeVoucherShowData', cHttpMethod: 'POST' };
      var callback = function (err, suc) {
        var cache = viewmodel.get('MakeBillCache');
        cache.BodySelectIds = {};
        var headPropertyName = viewmodel.get('Head');
        viewmodel.get(headPropertyName).setDataSource(suc.headData);
      }
      params.code = viewmodel.get('MakeBill').code;
      common.doProxy(Property, callback, params);
    } else {
      FilterCache.hasFilter = true;
    }
  }
  return {
    init: function (billNo, params, callback) {
      if (params.menu_url !== undefined) {
        var queryString = new cb.utils.queryString(params.menu_url);
        params.code = queryString.get('code');
        params.makeBilltype = queryString.get('makeBilltype');
      }
      var self = this;
      var proxy = cb.rest.DynamicProxy.create({
        getMeta: { url: '/meta', method: 'POST', options: { uniform: false } }
      });
      let postData = Object.assign({}, params, { type: 'billmaker', billNo: billNo, code: params.code, makeBilltype: params.makeBilltype })
      proxy.getMeta(postData, function (err, result) {
        if (err) {
          console.error(err);
          return;
        }
        var func = new Function(result.vm);
        func();
        var defaultParams = {
          billNo: result.viewmeta.cBillNo,
          subId: result.viewmeta.cSubId
        };
        var vm = new cb.viewmodels[result.viewmeta.vmName]();
        cb.utils.extend(true, vm.getParams(), defaultParams, params);
        var RuleCache = vm.get('RuleCache');
        var MakeBill = vm.get('MakeBill');
        MakeBill.code = params.code;
        MakeBill.makeBilltype = params.makeBilltype;
        RuleCache.isSingleVoucher = result.makeBill.isSingleVoucher;
        RuleCache.mainAndChildId = result.makeBill.mainAndChildId;
        RuleCache.rulePolicyList = result.makeBill.rulePolicyList;
        RuleCache.makeBilltype = params.makeBilltype;
        //是否单表 0双表  1单表
        if (RuleCache.isSingleVoucher === 0) {
          var bodyPropertyName = vm.get('Body');
          vm.get(bodyPropertyName).on('afterSelect', function (rowIndexes) {
            var args = {};
            args.rowIndexes = rowIndexes;
            args.type = 'body';
            self.do('selectgrid', vm, args);
          });
          vm.get(bodyPropertyName).on('afterUnselect', function (rowIndexes) {
            var args = {};
            args.rowIndexes = rowIndexes;
            args.type = 'body';
            self.do('unselectgrid', vm, args);
          });
          vm.get(bodyPropertyName).on('afterSelectAll', function (rows) {
            var args = {};
            args.rows = rows;
            args.type = 'body';
            self.do('selectall', vm, args);
          });
          vm.get(bodyPropertyName).on('afterUnselectAll', function () {
            var args = {};
            args.type = 'body';
            self.do('unselectall', vm, args);
          });
        }
        var headPropertyName = vm.get('Head');
        vm.get(headPropertyName).on('afterSelect', function (rowIndexes) {
          var args = {};
          args.rowIndexes = rowIndexes;
          args.type = 'head';
          self.do('selectgrid', vm, args);
        });
        vm.get(headPropertyName).on('afterUnselect', function (rowIndexes) {
          var args = {};
          args.rowIndexes = rowIndexes;
          args.type = 'head';
          self.do('unselectgrid', vm, args);
        });
        vm.get(headPropertyName).on('afterSelectAll', function (rows) {
          var args = {};
          args.rows = rows;
          args.type = 'head';
          self.do('selectall', vm, args);
        });
        vm.get(headPropertyName).on('afterUnselectAll', function () {
          var args = {};
          args.type = 'head';
          self.do('unselectall', vm, args);
        });
        callback(vm, result.viewmeta);
        self.do('load', vm);
      });
    },
    do: function (act, viewmodel, params) {
      common.todo(this, act, viewmodel, params)
    },
    action: function () {
      return {
        selectgrid: selectgrid,
        unselectgrid: unselectgrid,
        selectall: selectall,
        unselectall: unselectall,
        scress: scress,
        sure: sure,
        position: position,
        fresh: fresh,
        item: item,
        help: help,
        out: out,
        search: search,
        load: load,
        columnsetting: common.columnsetting
      }
    }
  }
}()

cb.namespace('biz.common')
cb.biz.common.billmaker = billmaker;

export default billmaker;
