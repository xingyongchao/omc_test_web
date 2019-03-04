import Immutable from 'immutable';
import { proxy, genAction } from '../helpers/util';
import moment from 'moment'


let name = '', conditionDesc = '', day = [], user = [], receivers = [], userId = [], menucode = '', report = null, startTime = null, endTime = null, interval = 0, timepoint = ['0'], stopstatus = 1, frequency = 1, context = '', subscriptionCondition = '', billNo = null, gridModel = null, menuCode = null, searchCondition = null, groupSchemaId = null, entityName = null, treeData = null, key2Data = null, selectedKey2Title = null, title2ResultKey = null, listData = [], selectionStart = 0, subscribeId = [], dataSource = [], data = [], checkState = false, editId = null;

const $$initialState = Immutable.fromJS({
  visible: false,
  name,
  conditionDesc,
  stopstatus,
  frequency,
  subscriptionCondition,
  errorInfo: '',
  checkPass: true,
  context,
  day,
  timepoint,
  interval,
  receivers,
  userId,
  user,
  startTime,
  endTime,
  listData,
  subscribeId,
  dataSource,
  gridModel,
  data,
  caption: '新增订阅方案',
  checkState,
  editId,
  solutionList: [],
  solutionId: '',
});

export default ($$state = $$initialState, action) => {
  switch (action.type) {
    case 'PLATFORM_UI_ADD_INIT_DATA':
      return $$state.merge(action.payload);
    case 'PLATFORM_UI_ADD_UPDATE_EXPRESSION':
      return $$state.set('conditionDesc', conditionDesc);
    default:
      return $$state;
  }
}

// export function getListData(){
//     return async function (dispatch) {
//       const config = {
//         url: '/report/getReportSubscriptionList',
//         method: 'GET',
//       };
//       proxy(config).then(json => {
//         if (json.code !== 200) {
//           cb.uitls.alert(json.message, 'error');
//           return
//         }
//         let dataSource = json.data;
//         let listData=[];
//            dataSource.forEach(
//            (item,index,arr)=> {
//             listData.push(item)
//           }
//         )
//         dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', {listData}))
//       })
//   }
//   }
export function getListData(gridmodel) {
  // gridModel = gridmodel;
  return function (dispatch) {
    const config = {
      url: '/report/getReportSubscriptionList',
      method: 'GET',
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('请求数据失败！' + json.message, 'error');
          return;
        }
        let modalData = json.data;
        let dataSource = [];
        let subscribeId = [];
        let data = [];
        modalData.map(ele => {
          let interval;
          interval = ele.startTime ? moment(ele.startTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') + '至' + moment(ele.endTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') : '';

          dataSource.push({ name: ele.name, cycle: interval, isStart: !ele.stopstatus });
          subscribeId.push(ele.id);
          data.push(ele);
        });
        gridmodel.setDataSource(dataSource);
        dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { gridModel: gridmodel, data: data, dataSource: dataSource, subscribeId: subscribeId }));
      });
  }
}

export function deleteRow(id, gridModel) {
  return function (dispatch) {
    const config = {
      url: '/report/deleteReportSubscription',
      method: 'GET',
      params: {
        id,
      }
    }
    proxy(config).then(json => {
      if (json.code !== 200) {
        cb.utils.alert('操作失败!' + json.message, 'error');
        return;
      }
      cb.utils.alert("操作成功！");
      dispatch(getListData(gridModel));
    }
    )
  }
}

export function select(key) {
  return function (dispatch) {
    const leftExp = conditionDesc.substr(0, selectionStart);
    const rightExp = conditionDesc.substr(selectionStart);
    conditionDesc = leftExp + selectedKey2Title[key] + rightExp;
    selectionStart = conditionDesc.length;
    dispatch(genAction('PLATFORM_UI_ADD_UPDATE_EXPRESSION'));
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { checkState: true }));
  }
}

export function selectOperator(key) {
  return function (dispatch) {
    const leftExp = conditionDesc.substr(0, selectionStart);
    const rightExp = conditionDesc.substr(selectionStart);
    conditionDesc = leftExp + key + rightExp;
    selectionStart = conditionDesc.length;
    dispatch(genAction('PLATFORM_UI_ADD_UPDATE_EXPRESSION'));
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { checkState: true }));
  }
}

export function changeName(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { name: value });
}

export function changeStopstatus(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { stopstatus: value });
}

export function changeContext(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { context: value });
}

export function changeFrequency(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { frequency: value, interval: 0, day: [] });
}

export function changeTimepoint(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { timepoint: value });
}

export function changeInterval(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { interval: value });
}

export function changeWeekOrMonth(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { day: value });

}

export function changeReceivers(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { userId: value });
}

export function changeCycle(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { startTime: value[0], endTime: value[1] });
}

export function changeSolution(value) {
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { solutionId: value });
}

export function modifyCellValue(value, index) {
  if (value) {
    return async function (dispatch, getState) {
      const { data, gridModel } = getState().addMessage.toJS()
      const config = {
        url: 'report/updateStatus',
        method: 'POST',
        params: [{
          id: data[index].id,
          stopstatus: 1,
        }]
      };
      const json = await proxy(config);
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'error');
        return;
      }
      cb.utils.alert("修改成功！", 'success');
      dispatch(getListData(gridModel));
    }
  }
  return async function (dispatch, getState) {
    const { data, gridModel } = getState().addMessage.toJS()
    const config = {
      url: 'report/updateStatus',
      method: 'POST',
      params: [{
        id: data[index].id,
        stopstatus: 0,
      }]
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      return;
    }
    cb.utils.alert("修改成功！", 'success');
    dispatch(getListData(gridModel));
  }
}
//   return async function (dispatch, getState) {
//     const { data,gridModel } = getState().addMessage.toJS();
//     const config = {
//       url: 'report/subscribe',
//       method: 'POST',
//       params: [{
//         name:data[index].name,
//         subscriptionCondition:data[index].subscribeCondition,
//         conditionDesc:data[index].conditionDesc,
//         context:data[index].context,
//         billnum: data[index].billnum&&data[index].billnum,
//         stopstatus:0,
//         frequency:data[index].frequency,
//         day: data[index].day,
//         timepoint: data[index].timepoint,
//         interval:data[index].interval,
//         menucode: data[index].menucode,
//         report:data[index].report && data[index].report,
//         // report: {
//         //   billnum: billNo,
//         //   condition: searchCondition && JSON.stringify(searchCondition.condition),
//         //   groupSchemaId: groupSchemaId
//         // },
//         receivers:data[index].receivers&&data[index].receivers,
//         startTime: data[index].startTime && data[index].startTime,
//         endTime: data[index].endTime && data[index].endTime,
//         id:data[index].id,

//       }]
//     };
//     const json = await proxy(config);
//     if (json.code !== 200) {
//       cb.utils.alert(json.message, 'error');
//       return;
//     }
//     cb.utils.alert("修改成功！", 'success');
//     dispatch(getListData(gridModel));
//   }
// }

export function editRow(index) {
  return async function (dispatch, getState) {
    const { data, gridModel } = getState().addMessage.toJS();
    const config = {
      url: 'report/getReportSubscription',
      method: 'GET',
      params: {
        id: data[index].id,
      }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      return;
    }
    dispatch(getReceivers());
    const editData = json.data;
    const stopstatus = editData.stopstatus ? 1 : 0;
    const startTime = editData.startTime && moment(editData.startTime, 'YYYY-MM-DD HH:mm:ss');
    const endTime = editData.endTime && moment(editData.endTime, 'YYYY-MM-DD HH:mm:ss');
    const day = editData.day.split(",");
    const timepoint = editData.timepoint.split(",");
    const checkState = editData.conditionDesc ? true : false;
    const userid = [];
    const solutionId = editData.solutionId;
    editData.receivers.forEach(
      (ele) => {
        userid.push(ele.user)
      }
    )
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { editId: data[index].id, checkState: checkState, caption: '编辑订阅方案', userId: userid, subcriptionCondition: editData.subcriptionCondition, visible: true, name: editData.name, stopstatus: stopstatus, conditionDesc: editData.conditionDesc, context: editData.context, day: day, frequency: editData.frequency, interval: editData.interval, timepoint: timepoint, startTime: startTime, endTime: endTime, solutionId: solutionId }))
    //     cb.utils.alert("修改成功！", 'success');
    // dispatch(getListData(gridModel));
    //   }
  }
}

export function onOk() {
  conditionDesc = '';
  return async function (dispatch, getState) {
    const { editId, name, receivers, gridModel, solutionId, subscriptionCondition, user, conditionDesc, context, stopstatus, day, timepoint, frequency, interval, startTime, endTime } = getState().addMessage.toJS();
    const { userId } = getState().addMessage.toJS();
    for (let i = 1; i < userId.length + 1; i++) {
      user.push({ 'user': userId[i - 1] })
    }
    const format = "YYYY-MM-DD"
    const config = {
      url: 'report/subscribe',
      method: 'POST',
      params: [{
        name,
        subscriptionCondition,
        conditionDesc: conditionDesc && conditionDesc,
        context,
        billnum: billNo,
        stopstatus,
        frequency,
        day: day.join(),
        timepoint: timepoint.join(),
        interval,
        menucode: menuCode,
        report: {
          billnum: billNo,
          condition: searchCondition && JSON.stringify(searchCondition.condition),
          groupSchemaId: groupSchemaId
        },
        receivers: user,
        startTime: startTime && moment(startTime).format(format) + ' ' + '00:00:00',
        endTime: endTime && moment(endTime).format(format) + ' ' + '23:59:59',
        id: editId && editId,
        solutionId: solutionId?solutionId:null,
      }]
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      return;
    }
    cb.utils.alert('保存成功', 'success');
    dispatch(getListData(gridModel));
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', {
      visible: false,
      caption: '新增订阅方案',
      name: '',
      stopstatus: 1,
      conditionDesc: '',
      subscriptionCondition: '',
      context: '',
      errorInfo: '',
      checkPass: true,
      frequency: 1,
      timepoint: ['0'],
      interval: 0,
      day: [],
      userId: [],
      startTime: null,
      endTime: null,
      user: [],
      checkState: false,
      editId: null,
      solutionId:'',
    }))
  };
}

export function change(value, start) {
  let checkState = value ? true : false;
  conditionDesc = value;
  selectionStart = start;
  return genAction('PLATFORM_UI_ADD_INIT_DATA', { conditionDesc: conditionDesc, checkPass: !checkState, checkState: checkState });
}

export function focus(value) {
  return function (dispatch) {
    selectionStart = value;
  }
}

export function check() {
  return async function (dispatch, getState) {
    const { conditionDesc } = getState().addMessage.toJS();
    // let result = null;
    // var exp = /{.*?}/g;
    // var items = expression.match(exp);
    // if (items) {
    //   result = expression.replace(exp, title => {
    //     return title2ResultKey[title] || title;
    //   });
    // } else {
    //   result = expression;
    // }
    const config = {
      url: 'report/checkCondition',
      method: 'POST',
      params: {
        conditionDesc: conditionDesc,
        billnum: billNo,
      }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { errorInfo: json.message, checkPass: false }));
      return;
    }
    cb.utils.alert('校验成功', 'success');
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { subscriptionCondition: json.data, errorInfo: '', checkPass: true }));
  }
}

export function initOperator() {
  return async function (dispatch) {
    const config = {
      url: 'enum/getEnumStrFetch',
      method: 'GET',
      params: {
        enumtype: 'conditionType'
      }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      return;
    }
    const operatorData = JSON.parse(json.data);
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { operatorData }));
  }
}

export function getReceivers() {
  return function (dispatch, getState) {
    let store = getState().user.toJS().storeId;
    const config = {
      url: 'bill/ref/getRefData',
      method: 'POST',
      params: {
        refCode: "aa_user",
        dataType: "grid",
        page: { pageSize: 200, pageIndex: 1 },
        // "condition": {
        //   "isExtend": true, "simpleVOs": [
        //     { "field": "operatorStore.iStoreId", "op": "eq", "value1": store },
        //     { "field": "iStatus", "op": "eq", "value1": 1 },
        //   ]
        // },
      }
    }
    proxy(config).then(json => {
      if (json.code !== 200) {
        cb.uitls.alert(json.message, 'error');
        return
      }
      let receivers = []
      let dataSource = json.data.recordList;
      dataSource.forEach(
        (item, index, arr) => {
          if (item.code) receivers.push({ name: item.name, account: '(' + item.code + ')', value: item.id, lable: item.code.split("@")[0] })
        }
      )
      dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { receivers }))
    })
  }
}

export function getSolutionList(filterId) {
  return function (dispatch, getState) {
    const config = {
      url: 'filterDesign/getSolutionList',
      method: 'POST',
      params: {
        filterId: filterId
      }
    }
    proxy(config).then(json => {
      if (json.code !== 200) {
        cb.uitls.alert(json.message, 'error');
        return
      }
      let arr = json.data.filter(item => item.isDefault == 1)
      dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { solutionList: json.data, solutionId: arr[0].id }))
    })
  }
}

export function getSolutionEdit(filterId) {
  return function (dispatch, getState) {
    const config = {
      url: 'filterDesign/getSolutionList',
      method: 'POST',
      params: {
        filterId: filterId
      }
    }
    proxy(config).then(json => {
      if (json.code !== 200) {
        cb.uitls.alert(json.message, 'error');
        return
      }
      let arr = json.data.filter(item => item.isDefault == 1)
      dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { solutionList: json.data}))
    })
  }
}

export function initData(billno, menucode, filterId, searchcondition, groupschemaid, data, entityname, gridmodel) {
  return async function (dispatch) {
    if (billno !== billNo) {
      billNo = billno;
      gridModel = gridmodel;
      menuCode = menucode;
      searchCondition = searchcondition;
      groupSchemaId = groupschemaid;
      entityName = entityname;
      const config = {
        url: 'report/getEntityInfoByBillNo.do',
        method: 'GET',
        params: {
          billno: billNo,
          iBillEntityId: entityName
        }
      };
      const json = await proxy(config);
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'error');
        return;
      }
      treeData = json.data;
      key2Data = {};
      selectedKey2Title = {};
      title2ResultKey = {};
      rebuildTreeData(treeData);
    }
    if (data) {
      conditionDesc = data.conditionDesc || '';
      selectionStart = conditionDesc && conditionDesc.length || 0;
    }
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', Object.assign({ billNo, treeData, visible: true, }, data)));
  }
}

export function close() {
  conditionDesc = '';
  return genAction('PLATFORM_UI_ADD_INIT_DATA', {
    caption: '新增订阅方案',
    visible: false,
    name: '',
    stopstatus: 1,
    conditionDesc: '',
    subscriptionCondition: '',
    context: '',
    errorInfo: '',
    checkPass: true,
    frequency: 1,
    timepoint: ['0'],
    interval: 0,
    day: [],
    userId: [],
    startTime: null,
    endTime: null,
    user: [],
    checkState: false,
    editId: null,
  });
}

export function getEntityInfo(key) {
  return async function (dispatch) {
    const expandData = key2Data[key];
    const { entityName } = expandData;
    const config = {
      url: 'report/getEntityInfoByName.do',
      method: 'GET',
      params: { entityName }
    };
    const json = await proxy(config);
    if (json.code !== 200) {
      cb.utils.alert(json.message, 'error');
      return;
    }
    expandData.children = json.data;
    key2Data = {};
    selectedKey2Title = {};
    title2ResultKey = {};
    rebuildTreeData(treeData);
    dispatch(genAction('PLATFORM_UI_ADD_INIT_DATA', { treeData }));
  }
}

function rebuildTreeData(data, mergeCode, mergeName) {
  data.forEach(item => {
    const codes = [], names = [];
    if (mergeCode)
      codes.push(mergeCode);
    codes.push(item.name);
    if (mergeName)
      names.push(mergeName);
    names.push(item.title);
    item.mergeCode = codes.join('.');
    key2Data[item.mergeCode] = item;
    item.mergeName = names.join('.');
    const mergeTitle = `[${item.mergeName}]`;
    selectedKey2Title[item.mergeCode] = mergeTitle;
    title2ResultKey[mergeTitle] = item.mergeCode;
    if (!item.children) return;
    rebuildTreeData(item.children, item.mergeCode, item.mergeName);
  });
}
