cb.viewmodels.register('ReferViewModel', function (modelType) {
  var model = function (data) {
    cb.models.ContainerModel.call(this, data);
    this.init();
  };
  model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.init = function () {
    var allData = this.getParams().where.allData;
    var pageSize = allData ? 65536 : 10;
    if (cb.rest.terminalType == 3) pageSize = 20;
    var fields = {
      referInput: new cb.models.SimpleModel(),
      referButton: new cb.models.SimpleModel(),
      tree: new cb.models.TreeModel({ keyField: 'code', titleField: 'name', multiple: this.getParams().multiple }),
      searchBox: new cb.models.SimpleModel(),
      filter: new cb.models.SimpleModel(),
      reload: new cb.models.SimpleModel(),
      table: new cb.models.GridModel({
        showAggregates: false,
        multiple: this.getParams().multiple,
        dataSourceMode: 'remote',
        override: cb.rest.interMode === 'touch' ? false : true,
        pageInfo: {
          pageSize: pageSize,
          pageIndex: 1
        }
      }),
      submit: new cb.models.SimpleModel(),
      cancel: new cb.models.SimpleModel(),
      switch: new cb.models.SimpleModel()
    };
    this.setData(fields);

    this.get('reload').on('click', function (args) { ReferViewModel_Extend.reloadAction(this.getParent(), args); });
    this.get('filter').on('click', function (args) { ReferViewModel_Extend.filterAction(this.getParent(), args); });
    this.get('tree').on('select', function (args) { ReferViewModel_Extend.treeSelected(this.getParent(), args); });
    this.get('table').on('dblClick', function (args) {
      this.getParent().execute('afterOkClick', [args]);
    });
    this.get('searchBox').on('search', function (args) { ReferViewModel_Extend.searchClick(this.getParent(), args); });
    this.on('pressEnter', function (args) {
      ReferViewModel_Extend.inputPressEnter(this, args);
    });
    this.get('switch').on('change', function (args) {
      ReferViewModel_Extend.switchChange(this.getParent(), args);
    });
    this.on('columnSetting', function () {
      var data = this.getCache('columnParams');
      this.get('table').getTitleData(data.billNo, data.tplId, data.groupCode);
    });

    this.getRefMeta();
  };

  model.prototype.getRefMeta = function () {
    var proxy = cb.rest.DynamicProxy.create({ getRefMeta: { url: 'pub/ref/getRefMeta', method: 'GET' } });
    var params = { refCode: this.getParams().refCode };
    var self = this;
    proxy.getRefMeta(params, function (err, result) {
      if (err) {
        console.error('getRefMeta: ' + err.message);
        return;
      }
      var refEntity = result.refEntity;
      if (refEntity.extendField) {
        try {
          var placeholder = JSON.parse(refEntity.extendField).placeholder;
          self.get('searchBox').setState('placeholder', placeholder);
        } catch (e) {

        }
      }
      var proxyConfig = {
        getRefData: { url: (refEntity.svcKey || 'bill') + '/ref/getRefData', method: 'POST' },
        getReferList: { url: 'pub/ref/refList', method: 'POST' }
      };
      self.setProxy(proxyConfig);
      const referType = refEntity.cTpltype;
      self.setCache('referType', referType);
      if (referType === 'TreeTable')
        self.get('tree').setState('multiple', false);
      if (refEntity.cFilterId && cb.rest.terminalType != 3) {
        self.getParams().filterId = refEntity.cFilterId;
        self.on('filterClick', function (params) {
          ReferViewModel_Extend.filterClick(self, params);
        });
      } else {
        self.setCache('directSearch', true);
      }
      if (result.gridMeta) {
        var viewMeta = result.gridMeta.viewApplication;
        var gridMeta = viewMeta.view.containers.filter(function (item) {
          return item.cControlType.trim().toLocaleLowerCase() === 'table';
        })[0];
        if (!gridMeta) {
          console.error('getRefMeta: no grid meta');
          return;
        }
        self.setCache('columnParams', { billNo: viewMeta.cBillNo, tplId: viewMeta.view.iTplId, groupCode: gridMeta.cGroupCode });
        var columns = self.getColumnsData(result.gridMeta, function (defineMap) {
          self.execute('afterInit', { defineMap: defineMap });
        });
        if (referType === 'TreeList') {
          self.get('tree').setState('keyField', 'id');
          self.get('tree').setColumns(columns)
        } else {
          self.get('table').setColumns(columns);
        }
      }
      self.execute('getRefMetaReady');
      self.initData();
    });
  };

  model.prototype.initData = function () {
    var referType = this.getCache('referType');
    var where = this.getParams().where || {};
    this.execute('afterInit', { cTplType: referType, enterFire: where.enterFire });
    var proxy = this.getProxy();
    if (!this.getParams().isList) {
      if (where.enterFire) return;
      var param = ReferViewModel_Extend.buildParam(this);
      if (where.value) {
        param.likeValue = where.value;
        this.get('searchBox').setValue(where.value);
      } else {
        this.get('searchBox').setValue('');
      }
      if (referType === 'Tree' || referType === 'TreeTable' || referType === 'TreeList') {
        var treeModel = this.get('tree');
        treeModel.setState('maxLevel', where.treeMaxLevel);
        proxy.getRefData(cb.utils.extend({ dataType: 'tree' }, param), function (err, data) {
          if (err) {
            console.error('getRefData:' + err.message);
            return;
          }
          treeModel.setDataSource(data || []);
          treeModel.select([])
        });
      }
      if (referType === 'Table' || referType === 'TreeTable') {
        if (this.getCache('directSearch')) {
          var gridModel = this.get('table');
          // gridModel.setPageSize(10);
          gridModel.setDataSource(proxy.config.getRefData, cb.utils.extend({ dataType: 'grid' }, param));
        } else {
          this.setCache('directSearch', true);
        }
      }
    } else {
      var param = { condition: this.getParams().value };
      proxy.getReferList(param, function (err, data) {
        if (err) {
          console.error(err.message);
          return;
        }
      });
    }
  };

  model.prototype.getColumnsData = function (val, callback) {
    var columns = {}, defineMap = {};
    var columnArray = val.viewApplication.view.containers.filter(function (item) {
      return item.cControlType === 'Table';
    })[0].controls;
    for (var i = 0; i < columnArray.length; i++) {
      var item = columnArray[i];
      columns[item.cItemName] = item;
    }
    var columnArray = val.viewmodel.entities.filter(function (item) {
      return item.bMain && item.cType === 'Bill';
    })[0].fields;
    for (var i = 0; i < columnArray.length; i++) {
      var item = columnArray[i];
      columns[item.cItemName] = cb.utils.extend(columns[item.cItemName], item);
      if (!item.cSelfDefineType) continue;
      defineMap[item.cSelfDefineType] = item.cItemName;
    }
    callback(defineMap);
    return columns;
  };

  model.prototype.okClick = function () {
    var referType = this.getCache('referType');
    var data = referType === 'Tree' || referType === 'TreeList' ?
      this.get('tree').getSelectedNodes() :
      this.get('table').getSelectedRows();
    this.execute('afterOkClick', data);
  };

  return model;
});

var ReferViewModel_Extend = {
  buildParam: function (viewModel) {
    var params = viewModel.getParams();
    var param = { refCode: params.refCode };
    var where = params.where || {};
    if (where.treeFilter)
      param.treeCondition = where.treeFilter;
    if (where.filter)
      param.condition = JSON.parse(JSON.stringify(where.filter));
    if (where.condition)
      param.mapCondition = where.condition;
    if (where.billData)
      cb.utils.extend(param, where.billData);
    return param;
  },
  reloadAction: function (viewModel, args) {
    var filterViewModel = viewModel.getCache('FilterViewModel');
    if (filterViewModel)
      filterViewModel.get('reset').execute('click');
    else
      viewModel.get('searchBox').setValue('');
    var referType = viewModel.getCache('referType');
    if (referType === 'Tree' || referType === 'TreeList') return;
    var proxy = viewModel.getProxy();
    var param = this.buildParam(viewModel);
    param.dataType = 'grid';
    viewModel.get('table').setState('showSearch', false);
    viewModel.get('table').setDataSource(proxy.config.getRefData, param);
  },
  filterAction: function (viewModel, args) {
    console.log('filter');
  },
  treeSelected: function (viewModel, args) {
    if (args.length == 0) return;
    viewModel.get('searchBox').setValue('');
    var referType = viewModel.getCache('referType');
    if (referType === 'Tree' || referType === 'TreeList') return;
    var proxy = viewModel.getProxy();
    var param = this.buildParam(viewModel);
    param.path = args[0].path;
    param.dataType = 'grid';
    viewModel.get('table').setState('showSearch', false);
    viewModel.get('table').setDataSource(proxy.config.getRefData, param);
  },
  searchClick: function (viewModel, args) {
    console.log('searchClick--' + args);
    var proxy = viewModel.getProxy();
    var param = this.buildParam(viewModel);
    param.likeValue = args ? args : null;
    param.dataType = 'grid';
    viewModel.get('table').setState('showSearch', true);
    viewModel.get('table').setDataSource(proxy.config.getRefData, param);
  },
  filterClick: function (viewModel, args) {
    var proxy = viewModel.getProxy();
    var param = this.buildParam(viewModel);
    param.condition = param.condition || {};
    cb.utils.extend(param.condition, args.condition);
    param.dataType = 'grid';
    viewModel.get('table').setState('showSearch', args.showSearch);
    viewModel.get('table').setDataSource(proxy.config.getRefData, param);
  },
  switchChange: function (viewModel, args) {
    viewModel.get('table').showRows(args ? false : true);
  },
  inputPressEnter: function (viewModel, args) {
    console.log('pressEnter');
    var where = viewModel.getParams().where;
    var checkValid = where && where.checkValid;
    var likeValue = args.value;
    var referType = viewModel.getCache('referType');
    var param = this.buildParam(viewModel);
    if (likeValue)
      param.likeValue = likeValue.trim();
    if (args.condition) {
      if (referType === 'Tree' || referType === 'TreeList')
        param.treeCondition = args.condition;
      else
        param.condition = args.condition;
    }
    viewModel.getProxy().getRefData(param, function (err, data) {
      if (args.callback)
        args.callback();
      if (err) {
        console.error('getRefData:' + err.message);
        return;
      }
      if (referType === 'Tree' || referType === 'TreeList') {
        if (data.treeData.length) {
          data.treeData.length > 1 && args.browse !== false ? args.model.browse() : viewModel.execute('afterOkClick', data.treeData);;
        } else {
          checkValid === false ? viewModel.execute('afterOkClick', likeValue) : cb.utils.alert('参照数据中无此条记录！请重试', 'warning');
        }
      } else {
        if (data.gridData.recordList.length) {
          data.gridData.recordList.length > 1 && args.browse !== false ? args.model.browse() : viewModel.execute('afterOkClick', data.gridData.recordList);;
        } else {
          checkValid === false ? viewModel.execute('afterOkClick', likeValue) : cb.utils.alert('参照数据中无此条记录！请重试', 'warning');
        }
      }
    });
  }
};
