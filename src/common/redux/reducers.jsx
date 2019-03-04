import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import portal from 'yxyweb/common/redux/portal'
import user from './modules/user'
import register from './modules/register'
import wechat from './modules/wechat';
import { tree } from 'yxyweb/common/redux/tree'
import { tabs } from 'yxyweb/common/redux/tabs'
import userDefineArchives from 'yxyweb/common/redux/userDefineArchives'
import dynamicModal from 'yxyweb/common/redux/dynamicModal'
import forget from './modules/forget'
import print from 'yxyweb/common/redux/print'
import billDesign from 'yxyweb/common/redux/billDesign'
import home from './modules/home'
import systemSetting from 'yxyweb/common/redux/systemSetting'
import loading from 'yxyweb/common/redux/loading'
import groupCondition from 'yxyweb/common/redux/groupCondition'
import formula from 'yxyweb/common/redux/formula';
import addMessage from 'yxyweb/common/redux/addMessage';
import filterscheme from 'yxyweb/common/redux/filterscheme'

export default combineReducers({
  portal,
  user,
  register,
  wechat,
  forget,
  tree,
  tabs,
  userDefineArchives,
  dynamicModal,
  print,
  billDesign,
  home,
  systemSetting,
  routing,
  loading,
  groupCondition,
  formula,
  addMessage,
  filterscheme,
})
