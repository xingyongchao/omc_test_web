import Immutable from 'immutable';
import { proxy, genAction } from '../helpers/util';
import moment from 'moment'
const idObj = {
    isdefault:false,
    queryVisible:false,
    schemeList:[],
    queryList:[],
    compareLogicList:[],
    ToSolution:[],
    textMouseEnterId: -1,
    bAddscheme:false,
    bqueryItem:false,
    currentName: "",
    currentId: -1,
    filterId:"",
    checked:false,
    deleteId:"",
    editSchemeitem: [],
    bEdit: false
};
const $$initialState = Immutable.fromJS({
});
export const url ={
  ReSchemeList:'filterDesign/getSolutionList',
  ToSolution:'filterDesign/saveSolution',
}
export function doProxy(url, method, params, callback, noUniform) {
  const config = { url: url, method: method, params: params };
  if (noUniform) {
    config.options = { uniform: false };
  }
  proxy(config)
    .then(json => {
      callback(json);
    });
}
export default ($$state = $$initialState, action) => {
  if(!action || !action.payload|| !action.payload.modelId) return $$state
  switch (action.type) {
      case'PLATFORM_UI_FilterScheme_Isedit':
      {
        if(action.payload.IsEdit === true)
        {
          let bEdit = action.payload.IsEdit;
          let modelId = action.payload.modelId
          $$state = $$state.mergeIn([modelId],{},{bEdit})
          return $$state;
        }
        else{
          let bEdit = action.payload.IsEdit;
          let modelId = action.payload.modelId
          $$state =$$state.mergeIn([modelId],{},{bEdit})
          return $$state;
        }
      }
      case'PLATFORM_UI_FilterScheme_queryVisible':
      {
        if(action.payload.queryVisible === true)
        {
          let queryVisible = action.payload.queryVisible;
          let modelId = action.payload.modelId
          $$state = $$state.mergeIn([modelId],{},{queryVisible})
        }
        else{
          let queryVisible = action.payload.queryVisible;
          let modelId = action.payload.modelId
          $$state = $$state.mergeIn([modelId],{},{queryVisible})
        }
        return $$state;
      }
      case 'PLATFORM_UI_FilterScheme_AddScheme':
      {
        if (action.payload.bAddscheme === true)
        {
         let bAddscheme = action.payload.bAddscheme;
         let modelId = action.payload.modelId
          $$state = $$state.mergeIn([modelId],{},{bAddscheme})
        }
         else{
          let bAddscheme = action.payload.bAddscheme;
          let modelId = action.payload.modelId
        $$state = $$state.mergeIn([modelId],{},{bAddscheme})
         } 
         return $$state;
      }
      case 'PLATFORM_UI_FilterScheme_IsDefault':
      {
        if (action.payload.isdefault === true)
        {
          let isdefault = action.payload.isdefault;
          let modelId = action.payload.modelId
          $$state = $$state.mergeIn([modelId],{},{isdefault})
        return $$state;
        }
         else{
          let isdefault = action.payload.isdefault;
          let modelId = action.payload.modelId
         $$state = $$state.mergeIn([modelId],{},{isdefault})
          return $$state;
         } 
      }
      case'PLATFORM_UI_FilterScheme_IsEnterSchemeitem':
      {
        let modelId = action.payload.modelId
        let schemeList = $$state.toJS()[modelId].schemeList;
        if(schemeList && schemeList.length > 0){
          schemeList.forEach(function(ele,index){
            if(ele.id == action.payload.id)
             ele.isMouseEnter = action.payload.bEnter;
            $$state = $$state.mergeIn([modelId],{},{schemeList})
          });
        }
          return $$state;
      }
      case 'PLATFORM_UI_FilterScheme_chooseCondition':
      {
        let modelId = action.payload.modelId
        let schemeList = $$state.toJS()[modelId].schemeList;
        if (schemeList && schemeList.length > 0) {
          schemeList.forEach(function (element, index) {
            if (element.id == action.payload.id) {
             $$state = $$state.mergeIn([modelId],{},{'currentId' : element.id})
             $$state = $$state.mergeIn([modelId],{},{'currentName' : element.solutionName})
            }
          });
        }
        return $$state;
      }
      case'PLATFORM_UI_FilterScheme_schemeData':
      { 
         let modelId = action.payload.modelId;
         let schemeList = action.payload.schemeList;
         $$state = $$state.set(modelId,Immutable.fromJS(idObj));
         let currentId = -1;
         let currentName = "";
         if( schemeList && schemeList.length > 0){
           schemeList.forEach(function(ele,index){
            if(currentId == -1 || ele.isDefault){
              currentId = ele.id;
              currentName = ele.solutionName;
              if(!ele.solutionName){
                currentName = ele.id;
              }
            }
             ele.isMouseEnter = false;
          })
        }
        currentName = currentName ? currentName : undefined;
        $$state = $$state.mergeIn([modelId],{},{currentId,currentName,schemeList});
         return $$state;
      }
      case'PLATFORM_UI_FilterScheme_reSetValue':
      {
         let modelId = action.payload.modelId
        $$state = $$state.mergeIn([modelId],{},{'schemeList' :action.payload.params.schemeList})
        return $$state;
      }
      case'PLATFORM_UI_FilterScheme_queryData':
      {
        let modelId = action.payload.modelId
         $$state=$$state.mergeIn([modelId],{},{'queryList':action.payload.queryList})
        return $$state;
      }
      case'PLATFORM_UI_FilterScheme_compareLogicData':
      {
        let modelId = action.payload.modelId
        $$state=$$state.mergeIn([modelId],{},{'compareLogicList':action.payload.compareLogicList})
        return $$state;
      }
      case'PLATFORM_UI_FilterScheme_toSolutionresult':
      {
        let bAddscheme = false;
        let modelId = action.payload.modelId
        $$state = $$state.mergeIn([modelId],{},{bAddscheme})
        return $$state;
      }
      case'PLATFORM_UI_FilterScheme_editschemeInfo':
      {
        let editSchemeitem = action.payload.editSchemeitem;
        let modelId = action.payload.modelId
        // let compareLogicList = action.payload.reCompareLogic
        $$state = $$state.mergeIn([modelId],{},{editSchemeitem})
        return $$state;
      }
    default:
      return $$state;
  }
}
export function IsEnterSchemeitem(bEnter,id,modelId){
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_FilterScheme_IsEnterSchemeitem',{ bEnter,id,modelId} ));
  }
}
export function AddScheme(bAddscheme,modelId){
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_FilterScheme_AddScheme', { bAddscheme,modelId }));
  }
}
export function IsDefault(isdefault,modelId){
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_FilterScheme_IsDefault', { isdefault,modelId }));
  }
}
export function Isedit(IsEdit,modelId){
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_FilterScheme_Isedit', {IsEdit,modelId}));
  }
}
export function openQuerylist(queryVisible,modelId){
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_FilterScheme_queryVisible', {queryVisible, modelId}));
  }
}
export function chooseScheme(id,modelId) {
  return function (dispatch, getState) {
    dispatch(genAction('PLATFORM_UI_FilterScheme_chooseCondition', { id,modelId }));
  }
}
export function getQueryItem(modelId,filterId){
  return function(dispatch){
    const config = {
      url: 'filterDesign/getFiltersInfo',
      method :'GET',
      params : {
        filtersId : filterId
      }
    }
    proxy(config)
    .then(json =>{
      if(json.code !== 200){
        cb.utils.alert('请求数据失败！' + json.message, 'error');
        return;
      }
      let queryList = json.data;
      dispatch(genAction('PLATFORM_UI_FilterScheme_queryData',{modelId,queryList}));
    })
  }
}
export function getSchemeListData(modelId, filterId){
  return function (dispatch,getState){
    const config = {
      url: 'filterDesign/getSolutionList',
      method : 'POST',
      params : {
        filterId : filterId
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('请求数据失败！' + json.message, 'error');
          return;
        }
       let schemeList = json.data;
       dispatch(genAction('PLATFORM_UI_FilterScheme_schemeData',{modelId, schemeList}));
      });
  }
}
export function refreshConditionListValue(filterId, schemeListChange,modelId) {
  return function (dispatch, getState) {
    let params = {filterId : filterId};
    let callback = (json) => {
      if (json.code === 200) {
        let params = {};
        let schemeList = json.data;
        params.schemeList = schemeList;
        dispatch(genAction('PLATFORM_UI_FilterScheme_reSetValue', {params,modelId}));
        schemeListChange(schemeList);
      }
      if (json.code !== 200) {
        cb.utils.alert('刷新失败');
      }
    }
    doProxy(url.ReSchemeList, 'POST', params, callback);
  }
}
export function getCompareLogic(modelId){
  return function (dispatch,getState){
    const config = {
      url: 'enum/getEnumMap',
      method : 'GET',
      params : {
        enumtype:'compareLogic'
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('请求数据失败！' + json.message, 'error');
          return;
        }
       let compareLogicList = json.data;
       dispatch(genAction('PLATFORM_UI_FilterScheme_compareLogicData',{modelId,compareLogicList}));
      });
  }
}
export function ToSolution(Solutionitem,filtersId, schemeListChange,modelId){
  return function (dispatch,getState){
      let params = {};
      params = Solutionitem;
      let callback = (json)=>{
        if(json.code === 200){
          dispatch(genAction('PLATFORM_UI_FilterScheme_toSolutionresult',{modelId}));
          dispatch(refreshConditionListValue(filtersId, schemeListChange,modelId));
          cb.utils.alert('操作成功', 'success');
        }
        if(json.code !== 200){
          cb.utils.alert('请求数据失败！' + json.message, 'error');
          return;
        }
      }
      doProxy(url.ToSolution,'POST',params,callback)
  }
}
export function setDefaultScheme(id,filtersId,modelId,schemeListChange){
  return function (dispatch,getState){
    const config = {
      url: 'filterDesign/setDefaultFilter',
      method : 'GET',
      params : {
        solutionId : id
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('请求数据失败！' + json.message, 'error');
          return;
        }
        dispatch(refreshConditionListValue(filtersId,schemeListChange,modelId));
      });
  }
}
export function editSchemeInfo(id,callback,modelId,reCompareLogic){
  return function (dispatch,getState){
    const config = {
      url: 'filter/'+id+'/solutionFilters',
      method : 'GET',
      params : {
        solutionid : id
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('请求数据失败！' + json.message, 'error');
          return;
        }
        let editSchemeitem = json.data;
        callback(editSchemeitem);
        dispatch(genAction('PLATFORM_UI_FilterScheme_editschemeInfo',{editSchemeitem,modelId}));
      });
  }
}
export function deleteScheme(id,filtersId,schemeListChange,modelId){
  return function (dispatch,getState){
    const config = {
      url: 'filterDesign/delSolution',
      method : 'GET',
      params : {
        solutionId : id
      }
    }
    proxy(config)
      .then(json => {
        if (json.code !== 200) {
          cb.utils.alert('请求数据失败！' + json.message, 'error');
          return;
        }
        dispatch(refreshConditionListValue(filtersId,schemeListChange,modelId));
      });
  }
}