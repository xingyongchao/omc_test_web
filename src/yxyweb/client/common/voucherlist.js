import * as common from './common'
import env from '../../common/helpers/env'

const voucherlist = function () {
  const _render = (viewmodel, data, dirty) => {
    common.setRenderReadOnly(viewmodel)
    common.setState(viewmodel)
    if (dirty) {
      viewmodel.setDirty(true)
      viewmodel.loadDirtyData(data)
    } else {
      viewmodel.loadData(data)
      if (data) {
        viewmodel.execute('afterLoadData', data);
        viewmodel.validate(true);
      }
    }
  }
  const _getTreeSelectNode = (viewmodel) => {
    let selectNode,
      node
    let treeModel = viewmodel.getTreeModel()
    if (treeModel) {
      selectNode = treeModel.getSelectedNodes()
    }
    if (selectNode && selectNode.length && selectNode[0]) {
      node = selectNode[0]
    }
    return node
  }
  const singleDo = (billNo, viewModel, params, beforeAct, afterAct) => {
    const rowIndex = params && params.params && params.params.index;
    if (rowIndex == null) return;
    const gridModel = viewModel.getGridModel();
    if (!gridModel) return;
    const currentRow = gridModel.getRow(rowIndex);
    if (!currentRow) return;
    const postData = {
      billnum: billNo,
      data: JSON.stringify(currentRow)
    };
    const beforeActData = {
      params: params,
      data: postData
    };
    beforeAct(beforeActData, function () {
      const callback = function (err, res) {
        if (!err) {
          cb.utils.alert('操作成功', 'success');
          viewModel.execute('refresh');
        }
        const afterActData = { err, res };
        afterAct(afterActData, common.afterAct);
      };
      common.doProxy(params, callback, postData);
    });
  };
  const _doService = (billNo, viewmodel, params, beforeAct, afterAct) => {
    if (!viewmodel.getCache('lastMode')) {
      singleDo(billNo, viewmodel, params, beforeAct, afterAct);
      return;
    }
    let node = _getTreeSelectNode(viewmodel)
    if (!node) {
      cb.utils.alert('请选择有效数据', 'warning');
      return;
    }
    common.doService(billNo, viewmodel, params, beforeAct, afterAct, function (viewmodel, postData, params) {
      let callback = function (err, res) {
        if (!err) {
          cb.utils.alert('操作成功', 'success')
          let oldData = viewmodel.collectData(true)
          let newData = common.billMerge(oldData, res)
          common.setMode(viewmodel, env.VOUCHER_STATE_EDIT)
          _render(viewmodel, newData)
          viewmodel.getTreeModel().updateNode(newData);
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
  // 启用
  const open = (billNo, viewModel, params, beforeAct, afterAct) => {
    params = params || {};
    if (!params.cAction) {
      const configParams = viewModel.allActions && viewModel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'open';
      });
      Object.assign(params, configParams);
    }
    _doService(billNo, viewModel, params, beforeAct, afterAct);
  };
  // 停用
  const close = (billNo, viewModel, params, beforeAct, afterAct) => {
    params = params || {};
    if (!params.cAction) {
      const configParams = viewModel.allActions && viewModel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'close';
      });
      Object.assign(params, configParams);
    }
    _doService(billNo, viewModel, params, beforeAct, afterAct);
  };
  //树卡
  const _addCard = (billNo, viewmodel, params, beforeAct, afterAct) => {
    const maxLevel = viewmodel.getTreeModel().getState('maxLevel');
    const level = maxLevel === false ? 65536 : (maxLevel || 3);
    let selectedNode = _getTreeSelectNode(viewmodel)
    if (selectedNode && selectedNode.level > level) {
      cb.utils.alert(`分类最多${level + 1}级`, 'error');
      return;
    }
    let postData = {
      "billnum": billNo
    }
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      common.emptyBill(postData, params, function (err, suc) {
        if (suc) {
          // viewmodel.clear()
          common.setMode(viewmodel, env.VOUCHER_STATE_ADD)
          let dirty = false;
          const treeModel = viewmodel.getTreeModel();
          const parentField = treeModel.getState('parentField');
          if (suc[parentField] == null) {
            if (selectedNode) {
              suc[parentField] = selectedNode[treeModel.getState('keyField')];
              suc.parent_name = selectedNode.name;
              dirty = true;
            }
          }
          _render(viewmodel, suc, true)
        }
        let afterActData = {
          err: err,
          res: suc
        }
        afterAct(afterActData, common.afterAct)
      })
    })

  }

  //树表添加要跳页
  const _addVoucher = (billNo, viewmodel, params, beforeAct, afterAct) => {
    if (cb.rest.interMode === 'touch') {
      const gridModel = viewmodel.getGridModel();
      if (gridModel)
        gridModel.clearCache('backData');
    }
    let cardKey = common.getVmParams(viewmodel, 'cardKey')
    if (!cardKey) {
      cb.utils.alert('元数据未配置cCardKey', 'warning')
      return
    }
    let parentId
    let node = _getTreeSelectNode(viewmodel)
    if (node) {
      parentId = node[viewmodel.getTreeModel().getState('keyField')]
    }
    const postData = {
      params: params,
      mode: env.VOUCHER_STATE_ADD,
      action: 'add',
      carryParams: {},
      parentId: parentId,
      parent: node
    };
    const beforeActData = { params: postData };
    beforeAct(beforeActData, function (args) {
      if (args)
        postData.carryParams.externalData = args;
      cb.loader.runCommandLine('bill', {
        billtype: 'voucher',
        billno: cardKey,
        params: postData
      }, viewmodel);
      afterAct();
    })

  }

  const _loadGrid = (viewmodel, params, afterAct) => {
    const queryItems = viewmodel.getCache('queryItems') || [];
    if (queryItems.length) {
      let flag = false;
      queryItems.forEach(item => {
        const field = item.replace(/(\w)/, function (v) {
          return v.toUpperCase()
        }) //首字母大写
        if (viewmodel.getCache(`exec${field}`)) return;
        flag = true;
      });
      if (flag) return;
    }
    const billType = common.getVmParams(viewmodel, 'billType');
    if (billType === 'Report') {
      const firstQuery = viewmodel.getCache('firstQuery');
      if (!firstQuery) {
        viewmodel.setCache('firstQuery', true);
        viewmodel.execute('firstQueryDone', false);
        return;
      }
      viewmodel.execute('firstQueryDone', true);
    }
    const { reportId } = viewmodel.getParams().query;
    let gridModel = viewmodel.getGridModel()
    if (reportId && !params.reportId)
      gridModel.setColumns(gridModel.getState('columns'));
    Object.assign(params, viewmodel.getParams().query);
    if (gridModel) {
      gridModel.setState('showSearch', params.showSearch);
      delete params.showSearch;
      if (!gridModel.execute('beforeLoad', params)) return true
      const configParams = viewmodel.allActions && viewmodel.allActions.find(x => {
        return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === 'cmdlist'
      });
      const proxyParams = configParams && configParams.cSvcUrl ? {
        url: configParams.cSvcUrl,
        method: configParams.cHttpMethod || 'POST',
        options: { mask: true }
      } : {
          url: 'bill/list',
          method: 'POST',
          options: { mask: true }
        };
      gridModel.setDataSource(proxyParams, params, function (result) {
        const columns = getColumnsData(result);
        if (!columns) return;
        this.setColumns(columns);
      });
      gridModel.setCache('afterAct', afterAct);
      viewmodel.getCache('cardViewModel') && gridModel.execute('dblClick', {});
    }
  }

  const getColumnsData = function (result) {
    if (!result.viewmodel) return;
    var columns = {};
    var columnArray = result.viewmodel.entities.filter(function (item) {
      return item.bMain && item.cType === 'Bill';
    })[0].fields;
    for (var i = 0; i < columnArray.length; i++) {
      var item = columnArray[i];
      columns[item.cItemName] = item;
    }
    return columns;
  };

  const switchGroupSchema = (billNo, viewModel, paramss, beforeAct, afterAct) => {
    let groupSchemaId = paramss ? paramss.groupSchemaId : undefined;
    let groupSchemaName = paramss ? paramss.groupSchemaName : undefined;

    viewModel.execute('refreshEChartConfig', { billnum: billNo, groupSchemaId, groupSchemaName });
    viewModel.setCache('execSchema', true);
    viewModel.setCache('groupSchemaId', groupSchemaId);
    viewModel.getGridModel().setState('showColumnSetting', groupSchemaId ? false : true);
    const params = Object.assign({
      billnum: billNo,
      groupSchemaId,
      isIncludeMeta: true
    }, viewModel.getCache('lastSearchCondition'));
    Object.assign(params, viewModel.getParams().query);
    _loadGrid(viewModel, params, afterAct);
  }

  const _bindUpdateCondition = (viewModel, billNo) => {
    viewModel.on('updateCondition', function (args) {
      _loadGrid(viewModel, {
        billnum: billNo,
        condition: args
      });
    });
  }

  const _bindGridDblClick = (viewmodel, billNo) => {
    let gridModel = viewmodel.getGridModel()
    if (!gridModel) return
    let dblClickItemName = null;
    const columns = gridModel.getColumns();
    for (var attr in columns) {
      if (columns[attr].bJointQuery) {
        dblClickItemName = attr;
        break;
      }
    }
    gridModel.on('cellJointQuery', function (args) {
      const rowData = gridModel.getRow(args.rowIndex);
      if (args.cellName === dblClickItemName) {
        gridModel.execute('dblClick', rowData, args);
        gridModel.setCache('backData', { rowIndex: args.rowIndex, id: rowData.id });
      } else {
        gridModel.execute('jointQuery', Object.assign(args, { rowData }));
      }
    });
    gridModel.on('dblClick', function (args, cellInfo) {
      let parent = this.getParent()
      let params = {
        mode: env.VOUCHER_STATE_EDIT,
        readOnly: viewmodel.getParams().doubleEdit ? false : true,
        id: args.id,
        rowData: args,
        cellInfo,
        carryParams: {},
        cardViewModel: parent.getCache('cardViewModel')
      }
      if (!gridModel.execute('beforeDblClick', params)) return true
      let dt = {
        billtype: 'voucher',
        billno: common.getVmParams(parent, 'cardKey'),
        params: params
      }
      cb.loader.runCommandLine('bill', dt, parent)
    })

    gridModel.on('afterSetDataSource', () => {
      const afterAct = gridModel.getCache('afterAct');
      if (afterAct)
        afterAct();
      common.setGridActionStates(gridModel, viewmodel);
    });
  }

  const _prepareParams = (gridmodel, params) => {
    gridmodel.execute('beforeLoadTree', params)
    return params
  }

  const _loadTree = (viewmodel, params, afterAct) => {
    const configParams = viewmodel.allActions && viewmodel.allActions.find(x => {
      return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === 'cmdquerytree'
    });
    const proxyParams = configParams && configParams.cSvcUrl ? {
      url: configParams.cSvcUrl,
      method: configParams.cHttpMethod || 'POST'
    } : {
        url: 'bill/querytree',
        method: 'POST'
      };
    let treeModel = viewmodel.getTreeModel()
    if (treeModel) {
      treeModel.promiseExecute('beforeLoad', params, function () {
        treeModel.setDataSource(proxyParams, params)
        if (afterAct) treeModel.setCache('afterAct', afterAct)
      })
    }

  }

  const _renderTreeArchiveData = (billNo, viewmodel, params) => {
    const hasChildren = viewmodel.getParams().hasChildren;
    if (hasChildren) {
      const data = {
        billnum: billNo,
        id: params[viewmodel.getTreeModel().getState('keyField')]
      }
      const callback = function (err, data) {
        if (!err)
          _render(viewmodel, data);
      }
      const configParams = viewmodel.allActions && viewmodel.allActions.find(x => {
        return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === 'cmddetail';
      });
      const options = configParams && configParams.cSvcUrl ? {
        cSvcUrl: configParams.cSvcUrl,
        cHttpMethod: configParams.cHttpMethod || 'GET'
      } : {
          cSvcUrl: 'bill/detail',
          cHttpMethod: 'GET'
        };
      common.doProxy(options, callback, data)
    } else {
      _render(viewmodel, params);
    }
  }

  const _bindTreeSelect = (viewmodel, billNo) => {
    let treeModel = viewmodel.getTreeModel()
    if (!treeModel) return
    let gridModel = viewmodel.getGridModel()
    treeModel.on('select', function (args) {
      viewmodel.promiseExecute('beforeTreeSelect', args, function () {
        if (gridModel) { //树表
          // if (!args.length) return;
          viewmodel.setCache('execTree', true);
          const condition = { billnum: billNo };
          if (args.length) {
            const { path, id } = args[0];
            if (path)
              condition.path = path;
            else if (id)
              condition.ids = id.toString();
          }
          Object.assign(condition, viewmodel.getCache('lastSearchCondition'));
          _loadGrid(viewmodel, condition);
        } else { //树卡
          if (args.length) {
            common.setMode(viewmodel, env.VOUCHER_STATE_EDIT);
            // _render(viewmodel, args[0]);
            _renderTreeArchiveData(billNo, viewmodel, args[0]);
            viewmodel.setCache('lastMode', env.VOUCHER_STATE_EDIT);
          } else {
            common.setMode(viewmodel, env.VOUCHER_STATE_ADD);
            // _render(viewmodel);
            viewmodel.biz.do('add', viewmodel);
            viewmodel.setCache('lastMode', env.VOUCHER_STATE_ADD);
          }
        }
        // common.setState(viewmodel)
      })
    })

    treeModel.on('afterSetDataSource', () => {
      if (!gridModel) {
        const afterAct = treeModel.getCache('afterAct');
        if (afterAct)
          afterAct();
        return;
      }
      const afterAct = gridModel.getCache('afterAct');
      if (afterAct)
        afterAct();
    });
  }
  const _bindTreeDblClick = (viewmodel, billNo) => {
    let treeModel = viewmodel.getTreeModel()
    if (!treeModel) return

    treeModel.on('cellJointQuery', function (args) {
      const rowData = args.rowData;
      treeModel.execute('dblClick', rowData);
      // gridModel.setCache('backData', { rowIndex: args.rowIndex, id: rowData.id });
    });
    treeModel.on('dblClick', function (args) {
      let parent = this.getParent()
      let params = {
        mode: env.VOUCHER_STATE_EDIT,
        readOnly: true,
        id: args.id,
        cardViewModel: parent.getCache('cardViewModel')
      }
      if (!treeModel.execute('beforeDblClick', params)) return true
      let dt = {
        billtype: 'voucher',
        billno: common.getVmParams(parent, 'cardKey'),
        params: params
      }
      cb.loader.runCommandLine('bill', dt, parent)
    })
  }
  const _bindCompareTreeSelect = (viewmodel, billNo) => {
    let treeModel = viewmodel.getTreeModel()
    if (!treeModel) return
    treeModel.on('select', function (args) {
      let gridModel = viewmodel.getGridModel()
      if (gridModel && args.length) {
        let parameter = common.getVmParams(viewmodel, 'foreignKey')
        if (parameter) {
          let args = parameter.split(".")
          if (args && args.length > 1) {
            parameter = args[1]
          }
        }
        let postData = {
          billnum: billNo,
          path: args[0][parameter],
          "operator": "eq"
        }
        _loadGrid(viewmodel, postData)
      }
      let data = args[0]
      common.setMode(viewmodel, env.VOUCHER_STATE_EDIT)
      _render(viewmodel, data)
    })
  }

  const _treeDetailSelect = (viewmodel, billNo, id) => {
    let treeModel = viewmodel.getTreeModel()
    if (treeModel) {
      treeModel.on('afterSetDataSource', function (dataSource) {
        treeModel.select(id)
      })
    }
  }

  const _setQueryItems = (viewModel, item) => {
    const queryItems = viewModel.getCache('queryItems') || [];
    if (queryItems.indexOf(item) === -1)
      queryItems.push(item);
    viewModel.setCache('queryItems', queryItems);
  }

  const _initPage = (viewmodel, billNo) => {
    let billType = common.getVmParams(viewmodel, 'billType')
    let filterId = common.getVmParams(viewmodel, 'filterId')
    let condition = common.getVmParams(viewmodel, 'condition');
    const autoLoad = common.getVmParams(viewmodel, 'autoLoad');
    let id = common.getVmParams(viewmodel, 'detailId')
    // common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE)
    // _render(viewmodel)

    switch (billType) {
      case 'Report':
        let viewid = _.get(viewmodel.getParams(), 'query.viewid');
        if (condition || !filterId || !!viewid) {
          viewmodel.setCache('firstQuery', true);
          _loadGrid(viewmodel, { billnum: billNo, condition: condition });
        }
        _bindGridDblClick(viewmodel, billNo);
        break;
      case ('VoucherList'):
      case ('ArchiveList'):
        if (!filterId && autoLoad !== false) {
          _loadGrid(viewmodel, {
            billnum: billNo,
            condition: condition
          })
        }
        if (!filterId)
          _bindUpdateCondition(viewmodel, billNo);
        _bindGridDblClick(viewmodel, billNo)
        break
      case ('TreeList'):
        const treeModel = viewmodel.getTreeModel();
        if (treeModel && treeModel.getState('defaultSelectedKeys'))
          _setQueryItems(viewmodel, 'tree');
        _loadTree(viewmodel, {
          billnum: billNo,
          treename: common.getVmParams(viewmodel, 'treeName')
        })
        _bindTreeSelect(viewmodel, billNo)
        _bindTreeDblClick(viewmodel, billNo)
        _bindGridDblClick(viewmodel, billNo)
        break
      case ('TreeArchive'):
        // common.setMode(viewmodel, env.VOUCHER_STATE_ADD)
        _loadTree(viewmodel, {
          billnum: billNo,
          treename: common.getVmParams(viewmodel, 'treeName')
        })
        _bindTreeSelect(viewmodel, billNo)
        // _render(viewmodel)
        viewmodel.biz.do('add', viewmodel);
        viewmodel.setCache('lastMode', env.VOUCHER_STATE_ADD);
        break
      case ('Compare'):
        common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE)
        _loadTree(viewmodel, {
          billnum: billNo,
          treename: common.getVmParams(viewmodel, 'treeName'),
          "isDistinct": true
        })
        _bindCompareTreeSelect(viewmodel, billNo)
        _bindGridDblClick(viewmodel, billNo)
        _render(viewmodel)
        break
    }
    // common.setState(viewmodel)
    if (id) {
      _treeDetailSelect(viewmodel, billNo, id)
    }
  }

  const _getSelectRowIds = (gridModel, para, distinct = true) => { //默认去重
    if (!gridModel) return
    let selectDatas = para && para.params && para.params.index != null ?
      [gridModel.getRow(para.params.index)] :
      gridModel.getSelectedRows();
    let ids = []
    if (selectDatas && selectDatas.length > 0) {
      selectDatas.map(function (row) {
        if (row.id) {
          ids.push(row.id)
        }
      })
    }
    return distinct ? [...new Set(ids)] : ids
  }

  const check4List = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let node = _getTreeSelectNode(viewmodel)
    if (node) {
      const treeModel = viewmodel.getTreeModel();
      params[treeModel.getState('parentField')] = node[treeModel.getState('keyField')];
    }
    let beforeActData = {
      params: params,
    }
    beforeAct(beforeActData, function () {

      common.check(billNo, viewmodel, params, beforeAct, afterAct)
    })

  }

  const abandon = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let mode = common.getMode(viewmodel)
    const lastMode = viewmodel.getCache('lastMode');
    let resetOrginalData = (viewmodel) => {
      // common.setMode(viewmodel, env.VOUCHER_STATE_BROWSE)
      common.setMode(viewmodel, lastMode);
      _render(viewmodel, viewmodel.getOriginalData())
      let afterActData = {
        res: viewmodel.getOriginalData()
      }
      afterAct(afterActData, common.afterAct)
    }
    let beforeActData = {
      params: params
    }
    beforeAct(beforeActData, function () {
      cb.utils.confirm("确定要放弃么", function () {
        resetOrginalData(viewmodel)
      });
    })

  }
  const _hasList = (billType) => {
    return (billType.indexOf('ist') > -1 || billType.toLowerCase() == 'compare') //ArchiveList,TreeList,VoucherList,compare
  }
  const add = (billNo, viewmodel, params, beforeAct, afterAct) => {
    params = params || {};
    if (!params.cAction) {
      const configParams = viewmodel.allActions && viewmodel.allActions.find(item => {
        return item.cAction.trim().toLocaleLowerCase() === 'add';
      });
      Object.assign(params, configParams);
    }
    let billType = viewmodel.getParams() && viewmodel.getParams().billType
    if (billType) {
      if (_hasList(billType)) { //ArchiveList,TreeList,VoucherList,compare
        _addVoucher(billNo, viewmodel, params, beforeAct, afterAct)
      } else {
        _addCard(billNo, viewmodel, params, beforeAct, afterAct)
      }
    } else {
      console.error('未获得billType')
    }
  }

  const save = (billNo, viewmodel, params, beforeAct, afterAct) => {
    const invalidMsg = viewmodel.validate();
    if (invalidMsg) {
      cb.utils.alert('以下数据项校验失败：' + invalidMsg.join(','), 'error');
      return;
    }
    let data = viewmodel.collectData()
    if (!data) return
    let mode = common.getMode(viewmodel)
    let selectNode,
      node
    if (mode != env.VOUCHER_STATE_ADD) {
      data["_status"] = cb.models.DataStates.Update
    } else {
      data['_status'] = cb.models.DataStates.Insert
      const treeModel = viewmodel.getTreeModel();
      const parentData = data[treeModel.getState('parentField')];
      if (parentData) {
        if (treeModel) {
          const parentNode = treeModel.getNodesByKeys(parentData);
          if (parentNode && parentNode.length)
            data.level = parentNode[0].level + 1;
        }
      } else {
        data.level = 1;
      }
      // let node = _getTreeSelectNode(viewmodel)
      // if (node) {
      //   data.parent = node.id
      //   let level = !node.level || 1
      //   data.level = parseInt(level) + 1
      //   data.path = node.path
      // }
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
      let callback = function (err, res) {
        if (!err) {
          // let necessaryData = viewmodel.getNecessaryData()
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
          let newData = common.billMerge(oldData, res, condition)
          common.setMode(viewmodel, env.VOUCHER_STATE_EDIT)
          _render(viewmodel, newData)
          viewmodel.execute('updateTreeRefer')
          const treeModel = viewmodel.getTreeModel();
          if (viewmodel.getParams().saveRefresh) {
            _loadTree(viewmodel, {
              billnum: billNo,
              treename: common.getVmParams(viewmodel, 'treeName')
            }, function () {
              const key = newData[treeModel.getState('keyField')];
              if (key)
                treeModel.select(key.toString());
            });
          } else {
            // if (necessaryData[treeModel.getState('keyField')]) {
            if (mode !== env.VOUCHER_STATE_ADD) {
              treeModel.updateNode(newData)
            } else {
              // let selectKey = treeModel.getSelectedKeys()
              // let parentKey
              // if (selectKey && selectKey.length && selectKey[0] != undefined) {
              //   parentKey = selectKey[0]
              // }
              // treeModel.addNode(newData, parentKey)
              treeModel.addNode(newData, true)
            }
          }
          cb.utils.alert('保存成功', 'success')
        }
        let afterActData = {
          err: err,
          res: res
        }
        afterAct(afterActData, common.afterAct)
      }
      params.options = { mask: true };
      common.doProxy(params, callback, postData)
    })

  }

  const batchDelete = (billNo, viewModel, params, beforeAct, afterAct) => {
    batchDo(billNo, viewModel, params, beforeAct, afterAct, true);
  }

  const batchDo = (billNo, viewmodel, params, beforeAct, afterAct, confirm) => {
    let gridModel = viewmodel.getGridModel()
    let selectDatas;
    if (gridModel) {
      selectDatas = params && params.params && params.params.index != null ?
        [gridModel.getRow(params.params.index)] :
        gridModel.getSelectedRows();
    } else {
      const treeModel = viewmodel.getTreeModel();
      if (treeModel)
        selectDatas = treeModel.getSelectedNodes();
    }
    if (!selectDatas || selectDatas.length == 0) {
      cb.utils.alert('请选择', 'warning')
      return
    } else {
      let data = new Array()
      selectDatas.forEach(function (row) {
        if (row.id && row.pubts) {
          data.push({
            id: row.id,
            pubts: row.pubts
          })
        }
      }, this)
      let postData = {
        billnum: billNo,
        data: JSON.stringify(data)
      }
      let beforeActData = {
        params: params,
        data: postData
      }
      beforeAct(beforeActData, function () {
        if (confirm) {
          const text = viewmodel.getParams().caption;
          cb.utils.confirm(`是否确认删除此${text}`, function () {
            _batchDo(viewmodel, params, afterAct, selectDatas, postData);
          });
        } else {
          _batchDo(viewmodel, params, afterAct, selectDatas, postData);
        }
      })
    }
  }

  const _batchDo = (viewmodel, params, afterAct, selectDatas, postData) => {
    let callback = function (err, res) {
      if (!err) {
        if (selectDatas.length === 1) {
          const actionText = params.cShowCaption;
          if (res.failCount) {
            cb.utils.alert(`${actionText}失败：${res.messages[0]}`, 'error');
          } else {
            cb.utils.alert(`${actionText}成功`, 'success');
          }
        } else {
          cb.utils.alert(`共${res.count}条, 成功${res.sucessCount}条,失败${res.failCount}条`)
          if (res.failCount > 0) {
            console.log('fail message↓↓↓↓↓↓↓↓')
            console.dir(res.messages)
          }
        }
        viewmodel.execute('back');
      }
      let afterActData = {
        err: err,
        res: res
      }
      afterAct(afterActData, common.afterAct)
    }
    common.doProxy(params, callback, postData)
  }

  const dblClick = (billNo, viewmodel, para, beforeAct, afterAct) => {
    let gridModel = viewmodel.getGridModel()
    let id, rowData;
    if (gridModel) {
      const rowIndex = para && para.params && para.params.index;
      const selectDatas = rowIndex != null ? [gridModel.getRow(para.params.index)] : gridModel.getSelectedRows();
      if (!selectDatas || selectDatas.length !== 1) {
        cb.utils.alert('请选择一条数据', 'warning');
        return;
      }
      id = selectDatas[0].id;
      rowData = selectDatas[0];
      gridModel.setCache('backData', { rowIndex, id });
    } else {
      const node = _getTreeSelectNode(viewmodel);
      if (!node) {
        cb.utils.alert('请选择一条数据', 'warning');
        return;
      }
      id = node.id;
      rowData = node;
    }
    let params = {
      mode: env.VOUCHER_STATE_EDIT,
      copy: para.copy,
      id,
      rowData,
      carryParams: {}
    }
    beforeAct({
      params: para,
      carry: params
    }, function () {
      let dt = {
        billtype: 'voucher',
        billno: common.getVmParams(viewmodel, 'cardKey'),
        params: params
      }
      cb.loader.runCommandLine('bill', dt, viewmodel)
      afterAct()
    })

  }
  const edit = (billNo, viewmodel, para, beforeAct, afterAct) => {
    let billType = viewmodel.getParams() && viewmodel.getParams().billType
    if (billType) {
      if (_hasList(billType)) { //ArchiveList,TreeList,VoucherList,compare
        dblClick(billNo, viewmodel, para, beforeAct, afterAct)
      } else {
        common.edit(billNo, viewmodel, para, beforeAct, afterAct)
      }
    }
  }

  const copy1 = (billNo, viewModel, para, beforeAct, afterAct) => {
    const billType = viewModel.getParams() && viewModel.getParams().billType;
    if (!billType) return;
    if (_hasList(billType)) {
      para.copy = true;
      dblClick(billNo, viewModel, para, beforeAct, afterAct);
    } else {

    }
  };

  const refresh = (billNo, viewmodel, para, beforeAct, afterAct) => {
    let params = viewmodel.getCache('lastSearchCondition');
    let treeModel = viewmodel.getTreeModel()
    const gridModel = viewmodel.getGridModel();
    if (!gridModel) {
      queryTree(billNo, viewmodel);
      return;
    }
    let obj = Object.assign({
      billnum: billNo
    }, para);
    let isSum = viewmodel.getCache('isSum')
    if (isSum != null)
      obj.isSum = isSum
    Object.assign(obj, viewmodel.getParams().query);
    const groupSchemaId = viewmodel.getCache('groupSchemaId');
    if (groupSchemaId)
      obj.groupSchemaId = groupSchemaId;
    if (treeModel) {
      let node = _getTreeSelectNode(viewmodel)
      if (node) {
        const { path, id } = node;
        if (path)
          obj.path = path;
        else if (id)
          obj.ids = id.toString();
      }
    }
    let data = cb.utils.extend(true, obj, params)
    let beforeActData = {
      params: params,
      data: data
    }
    if (beforeAct) {
      beforeAct(beforeActData, function () {
        _loadGrid(viewmodel, data, afterAct)
      })
    } else {
      _loadGrid(viewmodel, data, afterAct)
    }
  }

  const search = (billNo, viewmodel, params, beforeAct, afterAct) => {
    viewmodel.setCache('execFilter', true);
    viewmodel.setCache('lastSearchCondition', params);
    let beforeActData = {
      params: params,
      data: params
    }
    beforeAct(beforeActData, function () {
      refresh(billNo, viewmodel, params, beforeAct, afterAct)
    })
  }

  const queryTree = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let data = {
      billnum: billNo,
      treename: common.getVmParams(viewmodel, 'treeName')
    }
    if (params && params instanceof Object) {
      data = Object.assign(data, params)
    }
    let beforeActData = {
      params: params,
      data: data
    }
    if (beforeAct) {
      beforeAct(beforeActData, function () {
        _loadTree(viewmodel, data, afterAct)
      })
    } else {
      _loadTree(viewmodel, data, afterAct)
    }
  }

  const editTree = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let treeModel = viewmodel.getTreeModel()
    if (!treeModel || !params) return
    if (!params.cTarget) {
      console.log('未配置tree 的billnumber ,在commend表的target中设置')
      return
    }
    let treeName = common.getVmParams(viewmodel, 'treeName')
    let node = _getTreeSelectNode(viewmodel)
    if (node) {
      let para = {}
      para.detailId = node[treeModel.getState('keyField')];
      let postData = cb.utils.extend(true, para, {
        mode: env.VOUCHER_STATE_EDIT
      })
      let beforeActData = {
        params: params,
        data: postData
      }
      beforeAct(beforeActData, function () {
        let dt = {
          billtype: 'voucherlist',
          billno: params.cTarget,
          params: postData
        }
        cb.loader.runCommandLine('bill', dt, viewmodel)
        afterAct()
      })


    }
  }

  const moveUp = (billNo, viewModel, params, beforeAct, afterAct) => {
    const treeModel = viewModel.getTreeModel();
    if (!treeModel) return;
    const selectedNodes = treeModel.getSelectedNodes();
    if (!selectedNodes.length) {
      cb.utils.alert('请选择一条数据', 'warning');
      return;
    }
    const selectNode = selectedNodes[0];
    if (treeModel.isFirst(selectNode)) {
      cb.utils.alert('分类已是同级次的第一个', 'warning');
      return;
    }
    const keyField = treeModel.getState('keyField');
    const data = {
      billnum: billNo,
      action: params.cAction,
      id: selectNode[keyField]
    };
    const beforeActData = {
      params,
      data
    };
    beforeAct(beforeActData, function () {
      const callback = function (err, res) {
        if (!err) {
          cb.utils.alert(`${params.cShowCaption}成功`, 'success');
          viewModel.execute('back');
        }
        const afterActData = {
          err,
          res
        };
        afterAct(afterActData, common.afterAct);
      };
      common.doProxy(params, callback, data);
    });
  }

  const moveDown = (billNo, viewModel, params, beforeAct, afterAct) => {
    const treeModel = viewModel.getTreeModel();
    if (!treeModel) return;
    const selectedNodes = treeModel.getSelectedNodes();
    if (!selectedNodes.length) {
      cb.utils.alert('请选择一条数据', 'warning');
      return;
    }
    const selectNode = selectedNodes[0];
    if (treeModel.isLast(selectNode)) {
      cb.utils.alert('分类已是同级次的最后一个', 'warning');
      return;
    }
    const keyField = treeModel.getState('keyField');
    const data = {
      billnum: billNo,
      action: params.cAction,
      id: selectNode[keyField]
    };
    const beforeActData = {
      params,
      data
    };
    beforeAct(beforeActData, function () {
      const callback = function (err, res) {
        if (!err) {
          cb.utils.alert(`${params.cShowCaption}成功`, 'success');
          viewModel.execute('back');
        }
        const afterActData = {
          err,
          res
        };
        afterAct(afterActData, common.afterAct);
      };
      common.doProxy(params, callback, data);
    });
  }

  const singlePush = (billNo, viewModel, params, beforeAct, afterAct) => {
    if (!params) return;
    const rowIndex = params.params && params.params.index;
    if (rowIndex == null) return;
    const gridModel = viewModel.getGridModel();
    if (!gridModel) return;
    const currentRow = gridModel.getRow(rowIndex);
    if (!currentRow) return;
    common.push(viewModel, params, currentRow, beforeAct, afterAct);
  };

  const copy = (billNo, viewModel, params, beforeAct, afterAct) => {
    if (!params) return;
    const rowIndex = params.params && params.params.index;
    if (rowIndex == null) return;
    const gridModel = viewModel.getGridModel();
    if (!gridModel) return;
    const currentRow = gridModel.getRow(rowIndex);
    if (!currentRow) return;
    common.copy(viewModel, params, currentRow.id, beforeAct, afterAct);
  };

  //推单
  const push = (billNo, viewmodel, params, beforeAct, afterAct) => {
    var queryString = new cb.utils.queryString(params.cSvcUrl)
    let targetCode = queryString.get('code')
    let gridModel = viewmodel.getGridModel()
    let ids = _getSelectRowIds(gridModel)
    if (!ids || ids.length == 0) {
      cb.utils.alert('请选择有效数据', 'warning')
      return
    }
    if (targetCode) {
      let queryData = {
        code: targetCode,
        isMainSelect: 1,
        childIds: ids
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
        let callback = function (err, res) {
          if (!err) {

          }
          let afterActData = {
            err: err,
            res: res
          }
          afterAct(afterActData, common.afterAct)
        }
        common.doProxy(par, callback, queryData)
      })

    }
  }

  const output = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let gridModel = viewmodel.getGridModel()
    let queryString = new cb.utils.queryString("/files" + params.cSvcUrl)
    let format = queryString.has('type') ? queryString.get('type') : 'pdf'
    let inputParams = {
      format: format,
      type: "voucherlist",
      bill: {
        page: {
          pageSize: gridModel.getPageSize(),
          pageIndex: gridModel.getPageIndex()
        },
        billnum: billNo
      }
    }

    const url = env.HTTP_OUTPUT_BILL.format(cb.rest.AppContext.token)
    let beforeActData = {
      params: params,
      data: inputParams
    }
    beforeAct(beforeActData, function () {
      common.createDownloadForm(url, inputParams)
      afterAct()
    })

  }

  const importVoucher = (billNo, viewModel, params, beforeAct, afterAct) => {
    const url = `${params.cSvcUrl}?token=${cb.rest.AppContext.token}&billnum=${common.getVmParams(viewModel, 'cardKey')}`;
    const eleInput = document.createElement('input');
    eleInput.type = 'file';
    eleInput.style.display = 'none';
    eleInput.onchange = function (e) {
      const formData = new FormData();
      formData['enctype'] = 'multipart/form-data';
      formData.append('file', e.target.files[0]);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.send(formData);
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {
          var ajaxResult = JSON.parse(xhr.responseText);
          if (ajaxResult.code === 200) {
            const res = ajaxResult.data;
            cb.utils.alert(`共导入${res.count}条, 成功${res.sucessCount}条, ${res.sucessCount ? '模板内容显示到列表页, ' : ''}失败${res.failCount}条${res.failCount ? `, 失败原因是: ${res.messages.join(',')}` : ''}`, res.failCount ? 'error' : 'success');
            if (res.sucessCount)
              viewModel.execute('refresh');
          } else {
            cb.utils.alert(`${ajaxResult.message}，模板内容导入失败`, 'error');
          }
        }
      };
      document.body.removeChild(eleInput);
    }
    document.body.appendChild(eleInput);
    eleInput.click();
  }

  const exportVoucherTemplate = (billNo, viewModel, params, beforeAct, afterAct) => {
    const queryString = new cb.utils.queryString('/files' + params.cSvcUrl);
    queryString.set('token', cb.rest.AppContext.token || '');
    const url = queryString.pathname + queryString.toStr();
    const postData = {
      billnum: common.getVmParams(viewModel, 'cardKey')
    };
    const beforeActData = {
      params: params,
      data: postData
    };
    beforeAct(beforeActData, function () {
      common.createDownloadForm(url, postData);
      afterAct();
    });
  }

  const exportStaticVoucherTemplate = (billNo, viewModel, params, beforeAct, afterAct) => {
    const openUrl = params && params.cSvcUrl;
    if (!openUrl) {
      cb.utils.alert('导出模板的地址为空', 'error');
      return;
    }
    const beforeActData = { params };
    beforeAct(beforeActData, function () {
      window.open(openUrl);
      afterAct();
    });
  }

  const exportReport = (billNo, viewModel, params, beforeAct, afterAct) => {
    const queryString = new cb.utils.queryString('/files' + params.cSvcUrl);
    queryString.set('token', cb.rest.AppContext.token || '');
    const url = queryString.pathname + queryString.toStr();
    const postData = Object.assign({
      billnum: billNo || common.getVmParams(viewModel, 'cardKey'),
      groupSchemaId: viewModel.getCache('groupSchemaId')
    }, viewModel.getParams().query, viewModel.getCache('lastSearchCondition'));
    delete postData.showSearch;
    const beforeActData = {
      params: params,
      data: postData
    };
    beforeAct(beforeActData, function () {
      common.createDownloadForm(url, postData);
      afterAct();
    });
  }

  const subscribeMessage = (billNo, viewModel, params, beforeAct, afterAct) => {
    viewModel.communication({
      type: 'modal',
      payload: {
        key: 'MessageSubscribe',
        data: {
          model: viewModel
        }
      }
    });
  }

  const batchOutputVoucher = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let printID = viewmodel.get(env.VOUCHER_PRINT_KEY) && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue() && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue().toString()
    let gridModel = viewmodel.getGridModel()
    // if (!gridModel) return
    // let queryString = new cb.utils.queryString("/files" + params.cSvcUrl)
    // let format = queryString.has('type') ? queryString.get('type') : 'pdf'
    // let ids = _getSelectRowIds(gridModel)
    // if (!ids || ids.length == 0) {
    //   cb.utils.alert('请选择有效数据', 'warning')
    //   return
    // }
    // let postData = {
    //   bill: {
    //     billnum: common.getVmParams(viewmodel, 'cardKey'),
    //     ids: ids,
    //     tplid: printID
    //   },
    //   format: format,
    //   type: 'voucher'
    // }
    const postData = { billnum: billNo };
    if (gridModel) {
      let selectDatas = params && params.params && params.params.index != null ?
        [gridModel.getRow(params.params.index)] :
        gridModel.getSelectedRows();
      if (!selectDatas || selectDatas.length == 0) {
        cb.utils.alert('请选择', 'warning')
        return
      }
      let data = new Array()
      selectDatas.forEach(function (row) {
        if (row.id && row.pubts) {
          data.push(row.id)
        }
      }, this)
      postData.ids = data.join();
    }
    const queryString = new cb.utils.queryString("/files" + params.cSvcUrl);
    queryString.set('token', cb.rest.AppContext.token || '')
    let url = queryString && queryString.pathname + queryString.toStr()
    let beforeActData = {
      params: params,
      data: postData
    }
    beforeAct(beforeActData, function () {
      common.createDownloadForm(url, postData)
      afterAct()
    })

  }

  const print = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let gridModel = viewmodel.getGridModel()
    if (!gridModel) {
      return
    }
    let pageSize = gridModel.getPageSize()
    let pageIndex = gridModel.getPageIndex()
    let postData = {
      json: {
        bill: {
          page: {
            pageSize: pageSize,
            pageIndex: pageIndex
          },
          billnum: billNo
        },
        type: "voucherlist",
        token: true
      }
    }
    let beforeActData = {
      params: params,
      data: postData
    }
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
  const preview = (billNo, viewmodel, params, beforeAct, afterAct) => {
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
      const condition = viewmodel.getCache('lastSearchCondition') ? JSON.stringify(viewmodel.getCache('lastSearchCondition').condition) : null;
      proxy.preview({
        route: params.cSvcUrl || '/bill',
        billno: billNo,
        template: template,
        condition: condition
      }, function (err, result) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }
        newTab.location.href = result;
      });
    });
  }
  const batchPrintVoucher = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let printID = viewmodel.get(env.VOUCHER_PRINT_KEY) && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue() && viewmodel.get(env.VOUCHER_PRINT_KEY).getValue().toString()
    let gridModel = viewmodel.getGridModel()
    let ids = _getSelectRowIds(gridModel)
    if (!ids || ids.length == 0) {
      cb.utils.alert('请选择有效数据', 'warning')
      return
    }
    let postData = {
      json: {
        bill: {
          billnum: common.getVmParams(viewmodel, 'cardKey'),
          ids: ids,
          tplid: printID
        },
        type: 'voucher'
      }
    }
    let beforeActData = {
      params: params,
      data: postData
    }
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
  const doDelete = (billNo, viewmodel, params, beforeAct, afterAct) => {
    let node = _getTreeSelectNode(viewmodel)
    if (!node) {
      cb.utils.alert('请选择有效数据', 'warning');
      return;
    }
    if (node && node.children && node.children.length > 0) {
      cb.utils.alert('有下级，不能删除', 'warning')
      return
    }
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
      cb.utils.confirm('确定要删除么', function () {
        common.doProxy(params, function (err, suc) {
          if (!err) {
            let treeModel = viewmodel.getTreeModel()
            if (treeModel) {
              let key = treeModel.getSelectedKeys()
              if (key && key.length == 1) {
                treeModel.deleteNode(key)
                // viewmodel.clear()
                common.setMode(viewmodel, env.VOUCHER_STATE_ADD);
                // _render(viewmodel);
                viewmodel.biz.do('add', viewmodel);
              }
            }
            cb.utils.alert('操作成功', 'success')
          }
          let afterActData = {
            err: err,
            res: suc
          }
          afterAct(afterActData, common.afterAct)
        }, postData)
      })
    })
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

  const localPrint = function (billNo, viewModel, params, beforeAct, afterAct) {
    if (viewModel.getParams().billType === 'Report') {
      localPrintReport(billNo, viewModel, params, beforeAct, afterAct);
      return;
    }
    const id = viewModel.get('id').getValue();
    if (cb.utils.isEmpty(id)) {
      cb.utils.alert('未找到具体单据', 'error');
      return;
    }
    const cardKey = common.getVmParams(viewModel, 'cardKey');
    if (cb.utils.isEmpty(cardKey)) {
      cb.utils.alert('元数据未配置cCardKey', 'error');
      return;
    }
    const proxy = cb.rest.DynamicProxy.create({
      getTemplate: { url: 'print/getTemplateByBo', method: 'GET', options: { mask: true } },
      print: { url: 'bill/getTemplateStructure', method: 'POST', options: { mask: true } }
    });
    proxy.getTemplate({ billno: cardKey }, function (err, data) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      const templateCode = data.length === 1 ? data[0] : data.find(item => {
        return item.isdefault;
      });
      if (cb.utils.isEmpty(templateCode)) {
        cb.utils.alert('没有设置打印模板，请检查', 'error');
        return;
      }
      const params = { billno: cardKey, templateCode: templateCode.templatecode, ids: [id] };
      proxy.print(params, function (err, result) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }
        beforeAct(result, function () {
          cb.utils.localPrint(result);
        });
      });
    });
  }

  const localPrintReport = function (billNo, viewModel, params, beforeAct, afterAct) {
    const proxy = cb.rest.DynamicProxy.create({
      getTemplate: { url: 'print/getTemplateByBo', method: 'GET', options: { mask: true } },
      print: { url: 'report/getTemplateStructure', method: 'POST', options: { mask: true } }
    });
    proxy.getTemplate({ billno: billNo }, function (err, data) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      const templateCode = data.length === 1 ? data[0] : data.find(item => {
        return item.isdefault;
      });
      if (cb.utils.isEmpty(templateCode)) {
        cb.utils.alert('没有设置打印模板，请检查', 'error');
        return;
      }
      const lastSearchCondition = viewModel.getCache('lastSearchCondition');
      const condition = lastSearchCondition ? JSON.stringify(lastSearchCondition.condition) : null;
      const params = { billno: billNo, templateCode: templateCode.templatecode, condition, route: '/report/bill' };
      proxy.print(params, function (err, result) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }
        beforeAct(result, function () {
          cb.utils.localPrint(result);
        });
      });
    });
  }

  return {
    init: function (billNo, params, viewCallback) {
      let self = this
      let initCallback = (err, result) => {
        const vmAndview = common.initVM(err, result, billNo, params, function (vm, view) {
          const isSum = params && params.query && Boolean(params.query.isSum);
          if (isSum)
            vm.setCache('isSum', isSum);
          let reportId = params && params.reportId;
          if (reportId)
            params.query.reportId = reportId;
          let data = {
            vm,
            view
          }
          vm.promiseExecute('afterLoadMeta', data, function () {
            const parentModel = vm.get('parent_name');
            if (parentModel instanceof cb.models.ReferModel) {
              const maxLevel = parentModel.getState('maxLevel');
              const level = maxLevel === false ? 65536 : (maxLevel || 3);
              parentModel.setState('maxLevel', level);
            }
            viewCallback(vm, view, view.cBillName)
            _initPage(vm, billNo)
          })

        })
        if (vmAndview) {
          let { vm, view } = vmAndview
          vm.initData()
          vm.on('refresh', function () {
            refresh(billNo, vm);
          });
          vm.on('back', function (args) {
            const gridModel = vm.getGridModel();
            if (!gridModel) {
              queryTree(billNo, vm, null, null, function () {
                if (!args) return;
                vm.getTreeModel().doPropertyChange('setExpandRow', { rowKey: args, isExpand: true });
              });
              return;
            }
            if (cb.rest.interMode === 'touch') {
              const backData = gridModel.getCache('backData');
              if (!backData) {
                refresh(billNo, vm);
                return;
              }
              gridModel.clearCache('backData');
              const configParams = vm.allActions && vm.allActions.find(x => {
                return x.cCommand && x.cCommand.trim().toLocaleLowerCase() === 'cmdlist'
              });
              const proxyParams = configParams && configParams.cSvcUrl ? {
                url: configParams.cSvcUrl,
                method: configParams.cHttpMethod || 'POST',
                options: { mask: true }
              } : {
                  url: 'bill/list',
                  method: 'POST',
                  options: { mask: true }
                };
              var proxy = cb.rest.DynamicProxy.create({ queryData: proxyParams });
              var params = {
                billnum: billNo,
                page: { pageSize: gridModel.getPageSize(), pageIndex: 1 },
                condition: {
                  isExtend: true,
                  simpleVOs: [
                    { field: 'id', op: 'eq', value1: backData.id }
                  ]
                }
              };
              proxy.queryData(params, function (err, result) {
                if (result && result.recordList && result.recordList.length) {
                  gridModel.updateRow(backData.rowIndex, result.recordList[0]);
                  common.setGridActionStates(gridModel, vm);
                }
              });
            } else {
              gridModel.setPageIndex(gridModel.getPageIndex());
            }
          });
          const returnPromise = new cb.promise();
          vm.on('return', function (caption) {
            if (common.getMode(vm) === env.VOUCHER_STATE_BROWSE || !vm.getDirtyData(false))
              return true;
            // returnSave(billNo, vm, function () {
            //   returnPromise.resolve();
            // });
            // return returnPromise;
            cb.utils.confirm(`确定要${caption}么`, function () {
              returnPromise.resolve();
            }, function () {
              returnPromise.reject();
            });
            return returnPromise;
          });
        }
      }
      common.fetchMeta(billNo, params, initCallback)
    },
    do: function (act, viewmodel, params) {
      common.todo(this, act, viewmodel, params)
    },
    action: function () {
      return {
        doservice: _doService,
        copy: copy,
        open: open,
        close: close,
        save: save,
        add: add,
        push: push,
        singlepush: singlePush,
        edit: edit,
        dblclick: dblClick,
        abandon: abandon,
        delete: doDelete,
        batchdelete: batchDelete,
        batchaudit: batchDo,
        batchunaudit: batchDo,
        search: search,
        refresh: refresh,
        output: output,
        batchoutput: batchOutputVoucher,
        batchimport: importVoucher,
        tempexport: exportVoucherTemplate,
        statictempexport: exportStaticVoucherTemplate,
        reportexport: exportReport,
        messagesubscribe: subscribeMessage,
        print: print,
        batchprint: batchPrintVoucher,
        check: check4List,
        columnsetting: common.columnsetting,
        edittree: editTree,
        querytree: queryTree,
        moveup: moveUp,
        movedown: moveDown,
        commandLine: common.commandLine,
        switchgroupschema: switchGroupSchema,
        savebo: savebo,
        preview: preview,
        localprint: localPrint
      }
    }
  }
}()

cb.namespace('biz.common')
cb.biz.common.voucherlist = voucherlist

export default voucherlist
