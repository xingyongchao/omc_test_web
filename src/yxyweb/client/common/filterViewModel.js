cb.viewmodels.register('FilterViewModel', function (modelType) {
  var model = function (data) {
    cb.models.ContainerModel.call(this, data);
    this.init();
  };
  //   FilterViewModel
  model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.init = function () {
    var fields = {
      schemeName: new cb.models.SimpleModel({ bMustSelect: true }),
      isDefault: new cb.models.SimpleModel({ value: false }),
      save: new cb.models.SimpleModel({ needClear: false }),
      search: new cb.models.SimpleModel({ needClear: false }),
      reset: new cb.models.SimpleModel({ needClear: false }),
      addScheme: new cb.models.SimpleModel({ needClear: false }),
      schemeMenu: new cb.models.SimpleModel({ needClear: false })
    };
    this.setData(fields);
    this.setDirty(false);
    this.on('searchEvent', function (args) {
      FilterViewModel_Extend.beforeSearch(this, args);
    });

    var triggerReferBrowse = function (referModel, isInDesign) {
      if (!referModel) return;
      var referValue = referModel.getValue();
      if (!isInDesign && !referValue) return;
      referModel.browse(false, function (vm) {
        vm.on('getRefMetaReady', function () {
          if (!referValue) {
            if (referValue === null)
              referModel.setValue(referValue);
            return;
          }
          var condition = {
            'isExtend': true,
            simpleVOs: [{ field: 'id', op: 'in', value1: {}.toString.call(referValue) === '[object Array]' ? referValue : referValue.split(',') }]
          };
          vm.execute('pressEnter', { model: referModel, condition: condition, browse: false });
        });
      });
    }

    this.on('initFilterViewModel', function (args) {
      var doReset = this.getCache('reset');
      this.clearCache('reset');
      var commonVOs = doReset ? [] : FilterViewModel_Extend.collectSearchData(this);
      var commonObj = doReset ? [] : FilterViewModel_Extend.collectSearchData(this, true);
      var commonFilterItemNames = this.getCache('commonFilterItemNames');
      if (commonFilterItemNames) {
        commonFilterItemNames.forEach(itemName => {
          this.removeProperty(itemName);
        });
      }
      commonFilterItemNames = [];
      let filterModel = args.filterModel;
      this.execute('beforeInit', filterModel);
      let filterVMField;
      var self = this;
      var isInDesign = this.getParams().isInDesign;
      filterModel.forEach((ele, index) => {
        let tmpName = ele.itemName;
        // if (self.get(tmpName))
        //   self.removeProperty(tmpName);
        if (ele.isCommon == 1 || ele.isCommon == true) {
          let initData = cb.utils.extend(true, {}, ele);
          initData.value1 = ele.value1;
          initData.value2 = ele.value2;
          var lowerCtrlType = initData.ctrlType && initData.ctrlType.trim().toLocaleLowerCase();
          if (lowerCtrlType === 'tagbutton') {
            try {
              if (initData.needAll !== false) {
                initData.enumArray = JSON.stringify([{ "nameType": "text", "value": "全部", "key": null }].concat(JSON.parse(ele.enumArray)));
                if (cb.utils.isEmpty(initData.value1))
                  initData.value1 = [null];
              } else {
                if (cb.utils.isEmpty(initData.value1))
                  initData.value1 = [JSON.parse(ele.enumArray)[0].key];
              }
            } catch (e) {

            }
          } else if (lowerCtrlType === 'predicatedatepicker') {
            if (!cb.utils.isEmpty(initData.value1) && (!isNaN(initData.value1) || isNaN(Date.parse(initData.value1)))) {

            } else if (initData.value1 || initData.value2) {
              initData.value1 = { value1: initData.value1, value2: initData.value2 };
            }
          } else if (lowerCtrlType === 'refer' || lowerCtrlType === 'treerefer' || lowerCtrlType === 'listrefer') {
            if (initData.value1)
              if (initData.value1.split)
                initData.value1 = initData.value1.split(',');
            if (initData.value2)
              if (initData.value2.split)
                initData.value2 = initData.value2.split(',');
          }
          var origValue = commonVOs.find(function (item) {
            return item.itemName === tmpName;
          });
          if (origValue) {
            if (lowerCtrlType === 'tagbutton') {
              if (!cb.utils.isEmpty(origValue.value1))
                initData.value1 = cb.utils.isArray(origValue.value1) ? origValue.value1 : [origValue.value1];
            } else if (lowerCtrlType === 'predicatedatepicker') {
              initData.value1 = { value1: origValue.value1, value2: origValue.value2 };
            } else {
              if (!cb.utils.isEmpty(origValue.value1))
                initData.value1 = origValue.value1;
              if (!cb.utils.isEmpty(origValue.value2))
                initData.value2 = origValue.value2;
            }
          }
          filterVMField = new cb.models.FilterModel(initData);
          self.addProperty(tmpName, filterVMField);
          commonFilterItemNames.push(tmpName);
          if (lowerCtrlType === 'refer' || lowerCtrlType === 'treerefer' || lowerCtrlType === 'listrefer') {
            var origObj = commonObj.find(function (item) {
              return item.itemName === tmpName;
            });
            if (origObj) {
              if (!cb.utils.isEmpty(origObj.value1))
                self.get(tmpName).getFromModel().on('afterMount', function () {
                  this.setValue(origObj.value1);
                });
              if (!cb.utils.isEmpty(origObj.value2))
                self.get(tmpName).getToModel().on('afterMount', function () {
                  this.setValue(origObj.value2);
                });
            } else {
              triggerReferBrowse(self.get(tmpName).getFromModel(), isInDesign);
              triggerReferBrowse(self.get(tmpName).getToModel(), isInDesign);
            }
          }
        }
      });
      this.setCache('commonFilterItemNames', commonFilterItemNames);
      this.execute('afterInit');
      const deleteIndexes = [];
      filterModel.forEach((item, index) => {
        if (item.isCommon && self.get(item.itemName).getVisible() === false)
          deleteIndexes.push(index);
      });
      deleteIndexes.sort(function (i, j) {
        return j - i;
      });
      deleteIndexes.forEach(index => {
        filterModel.splice(index, 1);
      });
    });

    this.on('itemChange', function (args) {
      FilterViewModel_Extend.itemChange(this, args);
    });
    this.get('save').on('click', function (args) {
      FilterViewModel_Extend.saveAction(this.getParent(), args);
    });
    this.get('search').on('click', function (args) {

      FilterViewModel_Extend.searchAction(this.getParent(), args);
    });
    this.get('reset').on('click', function (args) {
      FilterViewModel_Extend.resetAction(this.getParent(), args);
    });
    this.get('schemeMenu').on('deleteScheme', function (args) {
      FilterViewModel_Extend.deleteSchemeAction(this.getParent(), args);
    });
    this.initData();

    this.on('loadScheme', function (val) {

      if (typeof FilterViewModel_Extend == 'object')
        FilterViewModel_Extend.loadSchemeById(this, val);
    });
  };

  model.prototype.initData = function () {


    if (typeof FilterViewModel_Extend == 'object')
      FilterViewModel_Extend.doAction("init_Extend", this);
  };

  return model;
});

var FilterViewModel_Extend = {
  doAction: function (name, viewModel) {
    this[name](viewModel);
  },
  init_Extend: function (viewModel) {
    var filterId = viewModel.getParams().filterId;
    if (!filterId) return;
    const params = { filterId };
    const solutionId = viewModel.getParams().isInPanel && viewModel.getParams().solutionId;
    if (solutionId)
      params.solutionId = solutionId;
    const viewId = viewModel.getParams().viewid;
    if (viewId)
      params.viewId = viewId;
    var self = this;
    var proxy = cb.rest.DynamicProxy.create({
      getInitFilterInfo: {
        url: 'client/getInitFilterInfo',
        method: 'GET',
        options: { uniform: false }
      },
      getSolutionList: {
        url: 'filterDesign/getSolutionList',
        method: 'POST',
        options: {
          token: true
        }
      },
      getFilterBase: {
        url: 'filterDesign/getFilterBase',
        method: 'GET',
        options: {
          token: true
        }
      }
    });
    proxy.getInitFilterInfo(params, function (errors, results) {
      const err = results[0].code !== 200 && results[0];
      if (err) {
        console.error(err.message);
        return;
      }
      const { data } = results[0];
      if (data && data.behaviorObject) {
        cb.require([data.behaviorObject], function (extend) {
          extend.doAction('init', viewModel);
          self.extendReady1(viewModel, results, solutionId, viewId);
        }, function (error) {
          console.error(error.message);
          self.extendReady1(viewModel, results, solutionId, viewId);
        })
      } else {
        self.extendReady1(viewModel, results, solutionId, viewId);
      }
    });
    return;
    proxy.getFilterBase({ filterId: filterId }, function (err, data) {
      if (err) {
        console.error(err.message);
        return;
      }
      if (data && data.behaviorObject) {
        cb.require([data.behaviorObject], function (extend) {
          extend.doAction('init', viewModel);
          self.extendReady(viewModel, proxy);
        }, function (error) {
          console.error(error.message);
          self.extendReady(viewModel, proxy);
        })
      } else {
        self.extendReady(viewModel, proxy);
      }
    });
  },
  extendReady1: function (viewModel, results, tmpId, viewId) {
    const cerr = results[1].code !== 200 && results[1];
    if (cerr) {
      console.error(cerr);
      return;
    }
    const cdata = results[1].data;
    if (cdata.length) {
      viewModel.setCache('schemeList', cdata);
      if (!tmpId) {
        const defaultSolution = cdata.find(item => {
          return item.isDefault;
        });
        tmpId = defaultSolution && defaultSolution.id || cdata[0].id;
      }
      this.loadSchemeById1(viewModel, results, tmpId, viewId);
    }
    else {
      viewModel.setCache('schemeList', cdata);
      this.loadSchemeById1(viewModel, results, tmpId, viewId);
    }
  },
  extendReady: function (viewModel, proxy) {
    var self = this;
    proxy.getSolutionList({ filterId: viewModel.getParams().filterId }, function (cerr, cdata) {
      if (cerr) {
        console.error(cerr);
        return;
      }
      if (cdata.length) {
        viewModel.setCache('schemeList', cdata);
        // 指定Schema
        let tmpId = cdata[0].id;
        for (let i = 0; i < cdata.length; i++) {
          if (cdata[i].isDefault) {
            tmpId = cdata[i].id;
          }
        }
        if (viewModel.getParams().isInPanel == true && viewModel.getParams().solutionId)
          tmpId = viewModel.getParams().solutionId;
        self.loadSchemeById(viewModel, tmpId);
      }
    });
  },
  loadSchemeById1: function (viewModel, results, schemeId, viewid) {
    viewModel.setCache('reset', true);
    var initFiltersData = {
      schemeData: viewModel.getCache('schemeList'),
      current: schemeId,
      schemeName: viewModel.getCache('schemeList').filter(function (item) { return item.id == schemeId; }).length > 0 && viewModel.getCache('schemeList').filter(function (item) { return item.id == schemeId; })[0].solutionName
    };
    const err = results[2].code !== 200 && results[2];
    if (err) {
      console.error(err.message);
      return;
    }
    const { data } = results[2];
    if (initFiltersData.schemeName)
      viewModel.get('schemeName').setValue(initFiltersData.schemeName);
    var flag = true;
    var condition = viewModel.getParams().condition;
    viewModel.setCache('condition', condition);
    var predicateFields = [];
    data.CommonModel.forEach(function (item, index) {
      var lowerCtrlType = item.ctrlType && item.ctrlType.trim().toLocaleLowerCase();
      if (!item.isCommon) {
        if (lowerCtrlType !== 'tagbutton' || !condition || !condition.commonVOs || !condition.commonVOs.length) return;
        var conditionItem = condition.commonVOs.find(function (a) {
          return a.itemName === item.itemName;
        });
        if (!conditionItem || !cb.utils.isArray(conditionItem.value1)) return;
        conditionItem.value1 = conditionItem.value1.join(',');
        return;
      }
      if (lowerCtrlType === 'tagbutton' && index == 0)
        flag = false;
      if (lowerCtrlType === 'predicatedatepicker') {
        predicateFields.push(item.itemName);
        if (viewid || viewModel.getParams().bHasNullDate)
          item.defaultValue = false;
      }
      if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
      var conditionItem = condition.commonVOs.find(function (a) {
        return a.itemName === item.itemName;
      });
      if (!conditionItem) return;
      item.value1 = conditionItem.value1;
      if (lowerCtrlType === 'predicatedatepicker' && conditionItem.hasOwnProperty("value2"))
        item.value2 = conditionItem.value2;

    });
    initFiltersData.filterDetail = data; //.sort(function (a, b) { return a.itemId - b.itemId; });
    viewModel.doPropertyChange('initFilterFields', initFiltersData);
    viewModel.on('navClick', function (navFilter) {
      viewModel.get('search').fireEvent('click', { solutionid: schemeId, navFilter });
    });
    // viewModel.execute('afterInit');
    if (flag)
      viewModel.get('search').fireEvent('click', { solutionid: schemeId });
    predicateFields.forEach(function (field) {
      viewModel.get(field).getFromModel().on('afterValueChange', function (args) {
        if (args.value && args.value.value1 && args.value.value2)
          viewModel.get('search').fireEvent('click', { model: viewModel, solutionid: schemeId });
      });
    });
  },
  loadSchemeById: function (viewModel, schemeId) {
    viewModel.setCache('reset', true);
    var initFiltersData = {
      schemeData: viewModel.getCache('schemeList'),
      current: schemeId,
      schemeName: viewModel.getCache('schemeList').filter(function (item) { return item.id == schemeId; })[0].solutionName
    };

    var proxy = cb.rest.DynamicProxy.create({
      getCommonFilters: {
        // url: 'filter/getcommonfilters',
        url: 'uniform/filter/' + schemeId + '/solutionFilters',
        method: 'GET',
        options: {
          uniform: false
        }
      }
    });
    let params = { solutionid: schemeId };
    let viewid = viewModel.getParams().viewid;
    if (viewid) params.viewid = viewid;
    proxy.getCommonFilters(params, function (err, data) {
      if (err) {
        console.error(err.message);
        return;
      }
      viewModel.get('schemeName').setValue(initFiltersData.schemeName);
      var flag = true;
      var condition = viewModel.getParams().condition;
      viewModel.setCache('condition', condition);
      var predicateFields = [];
      data.CommonModel.forEach(function (item, index) {
        var lowerCtrlType = item.ctrlType && item.ctrlType.trim().toLocaleLowerCase();
        if (!item.isCommon) {
          if (lowerCtrlType !== 'tagbutton' || !condition || !condition.commonVOs || !condition.commonVOs.length) return;
          var conditionItem = condition.commonVOs.find(function (a) {
            return a.itemName === item.itemName;
          });
          if (!conditionItem || !cb.utils.isArray(conditionItem.value1)) return;
          conditionItem.value1 = conditionItem.value1.join(',');
          return;
        }
        if (lowerCtrlType === 'tagbutton' && index == 0)
          flag = false;
        if (lowerCtrlType === 'predicatedatepicker') {
          predicateFields.push(item.itemName);
          if (viewid || viewModel.getParams().bHasNullDate)
            item.defaultValue = false;
        }
        if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
        var conditionItem = condition.commonVOs.find(function (a) {
          return a.itemName === item.itemName;
        });
        if (!conditionItem) return;
        item.value1 = conditionItem.value1;
        if (lowerCtrlType === 'predicatedatepicker' && conditionItem.hasOwnProperty("value2"))
          item.value2 = conditionItem.value2;

      });
      initFiltersData.filterDetail = data; //.sort(function (a, b) { return a.itemId - b.itemId; });
      viewModel.doPropertyChange('initFilterFields', initFiltersData);
      // viewModel.execute('afterInit');
      if (flag)
        viewModel.get('search').fireEvent('click', { solutionid: schemeId });
      predicateFields.forEach(function (field) {
        viewModel.get(field).getFromModel().on('afterValueChange', function (args) {
          if (args.value && args.value.value1 && args.value.value2)
            viewModel.get('search').fireEvent('click', { model: viewModel, solutionid: schemeId });
        });
      });
    });
  },
  saveAction: function (viewModel, args) {
    var self = this;
    var proxy = cb.rest.DynamicProxy.create({
      addSolutionAll: {
        url: 'filterDesign/addSolutionAll',
        method: 'POST',
        options: {
          token: true
        }
      },
      updateSolutionAll: {
        url: 'filterDesign/updateSolutionAll',
        method: 'POST',
        options: {
          token: true
        }
      }
    });

    var schemeData = {
      solutionVO: {
        filtersId: args.filterId,
        isDefault: args.isDefault,
        isPublic: args.isPublic,
        solutionName: args.solutionName
      },
      filterVO: {
        filtersId: args.filterId,
        commonVOs: []
      }
    };
    if (args.filterModel && args.filterModel.length > 0) {
      args.filterModel.forEach(function (ele) {
        let attrValue = {};
        attrValue.itemName = ele.itemName;
        // if (ele.itemName == "codebianma") ele.orderId = 3;
        // if (ele.itemName == "name") ele.orderId = 2;
        // if (ele.itemName == "storeType") ele.orderId = 1;
        // if (ele.itemName == "regionCode") ele.orderId = 4;
        // if (ele.itemName == "areaClass") ele.orderId = 7;
        // if (ele.itemName == "openShop") ele.orderId = 6;
        // if (ele.itemName == "stop") ele.orderId = 5;
        attrValue.orderId = ele.orderId;
        if (ele.isCommon == 1 || ele.isCommon == true)
          attrValue.isCommon = 1;
        else
          attrValue.isCommon = 2; //应zhaoyin接口要求，不显示的isCommon=2
        schemeData.filterVO.commonVOs.push(attrValue);
      });
      if (args.schemeId != -1) {
        schemeData.solutionVO.id = args.schemeId;
        let tmpOrder = -1;
        schemeData.filterVO.commonVOs.forEach(
          function (ele) {
            tmpOrder = tmpOrder + 1;
            if (ele.orderId < tmpOrder)
              ele.orderId = tmpOrder;
            else if (ele.orderId > tmpOrder)
              tmpOrder = ele.orderId;

          }
        );
        proxy.updateSolutionAll(schemeData,

          function (err, result) {
            if (err) {


              console.error(err.message);
              return;
            }
            self.init_Extend(viewModel);
          });
      } else {
        proxy.addSolutionAll(schemeData, function (err, result) {
          if (err) {
            console.error(err.message);
            return;
          }
          self.init_Extend(viewModel);
        });
      }
    }
  },
  searchAction: function (viewModel, args) {
    var condition = {
      commonVOs: this.collectSearchData(viewModel),
      filtersId: viewModel.getParams().filterId,
      solutionId: args.solutionid

    };
    var inputCondition = viewModel.getCache('condition');
    viewModel.clearCache('condition');
    if (inputCondition) {
      if (inputCondition.commonVOs && inputCondition.commonVOs.length) {
        inputCondition.commonVOs.forEach(function (a) {
          var attr = a.itemName;
          if (condition.commonVOs.findIndex(function (item) {
              return item.itemName === attr;
            }) > -1) return;
          condition.commonVOs.push({
            itemName: attr,
            value1: a.value1
          });
        });
      }
      if (inputCondition.simpleVOs && inputCondition.simpleVOs.length) {
        condition.isExtend = true;
        condition.simpleVOs = inputCondition.simpleVOs;
      }
    }
    viewModel.execute('beforeSearch', condition);
    if (args.navFilter) {
      _.each(args.navFilter, function (value, key, obj) {
        if (!condition.isExtend || !condition.simpleVOs) {
          condition.isExtend = true;
          condition.simpleVOs = [];
        }
        condition.simpleVOs.push({ field: key, op: 'eq', value1: value });
      });
      viewModel.execute('filterClick', { condition: condition, showSearch: args.model ? true : false, bFromNav: true });
    }
    else {
      viewModel.execute('filterClick', { condition: condition, showSearch: args.model ? true : false });
    }
  },
  resetAction: function (viewModel, args) {
    viewModel.setCache('reset', true);
    this.init_Extend(viewModel);
  },
  itemChange: function (viewModel, args) {
    var condition = {
      commonVOs: this.collectSearchData(viewModel),
      filtersId: viewModel.getParams().filterId,
      solutionid: args.solutionid
    };
    viewModel.execute('valueChange', { condition: condition });
  },
  collectSearchData: function (viewModel, text) {
    var predicateValue = {};
    var hasPredicate = false;
    var commonVOs = [];
    var val = viewModel.collectData(text ? null : true);
    var isInDesign = viewModel.getParams().isInDesign;
    for (var attr in val) {
      var attrValue = val[attr];
      if (cb.utils.isEmpty(attrValue)) continue;
      if (typeof attrValue === 'object') {
        if (!isInDesign && cb.utils.isEmpty(attrValue.value1) && cb.utils.isEmpty(attrValue.value2)) continue;
        if (attrValue.predicateValue) {
          predicateValue[attr] = attrValue.predicateValue;
          delete attrValue.predicateValue;
          hasPredicate = true;
        }
        attrValue.itemName = attr;
        commonVOs.push(attrValue);
      } else {
        commonVOs.push({ itemName: attr, value1: attrValue });
      }
    }
    viewModel.clearCache('predicateValue');
    if (hasPredicate)
      viewModel.setCache('predicateValue', predicateValue);
    return commonVOs;
  },
  beforeSearch: function (viewModel, args) {
    var condition = {
      commonVOs: this.collectSearchData(viewModel),
      filtersId: viewModel.getParams().filterId,
      solutionid: args.solutionid
    };
    viewModel.execute('okClick', { condition: condition });
  },
  deleteSchemeAction: function (viewModel, args) {
    var self = this;
    var proxy = cb.rest.DynamicProxy.create({
      deleteScheme: {
        url: 'filterDesign/delSolution',
        method: 'POST',
        options: {
          token: true
        }
      }
    });
    proxy.deleteScheme({ solutionId: args }, function (err, data) {
      if (err) {
        console.error(err.message);
        return;
      }
      cb.utils.alert('删除成功', 'success');
      self.init_Extend(viewModel);
    });
  }
};