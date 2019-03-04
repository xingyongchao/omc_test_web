'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.url = undefined;
exports.doProxy_Options = doProxy_Options;
exports.doProxy = doProxy;
exports.doProxy1 = doProxy1;
exports.submitProxy = submitProxy;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = exports.url = {
  saveTotalSchema: "report/saveTotalSchema", //保存报表的汇总设置信息
  getTotalSetting: 'report/getTotalSetting', //获取报表的汇总设置 isOnlyTotal 进行设置  isOnlySelected  显示
  menuExists: '/menu/exists', //发布菜单
  publishMenu: '/report/publishMenu', //发布菜单
  saveGroupSchema: 'report/saveGroupSchema', //保存报表分组方案
  deleteGroupSchema: 'report/deleteGroupSchema', //删除报表分组方案
  getGroupSchema: 'report/getGroupSchema', //获取报表的所有分组方案列表，可以加上参数viewid
  checkGroupAuth: '/user/operation/batchcheck/groupschemaAdd,groupschemaSave,groupschemaDelete', //检查权限
  getGroupItems: 'report/getGroupItems', //获取报表分组方案的详细设置进行设置
  columnDefine: 'report/columnDefine', //自定义项
  getGroupSetting: '/report/getGroupSetting', //获取报表分组方案的详细设置进行显示
  reportList: '/report/list', //获取数据
  getReportList: '/report/getReportList', //报表列表
  getReportView: '/report/getReportView', //大屏/看板方案
  getReportViews: '/report/getReportViews', //大屏/看板方案
  // getReportViewList: '/report/getReportViewList',
  saveReportView: "/report/saveReportView", //保存大屏/看板方案
  getLayoutByUserId: "/layout/getLayoutByUserId", //获取有权限的大屏看板方案
  getAllregion: "/region/getAllregion" //获取所有地区
};

function doProxy_Options(url, method, params, callback, options) {
  var config = { url: url, method: method, params: params };
  if (options) {
    config.options = options;
  }
  (0, _util.proxy)(config).then(function (json) {
    callback(json);
  });
}

function doProxy(url, method, params, callback, noUniform) {
  var config = { url: url, method: method, params: params };
  if (noUniform) {
    config.options = { uniform: false };
  }
  (0, _util.proxy)(config).then(function (json) {
    callback(json);
  });
}

var mergeProxy = void 0;

function doProxy1(url, method, params, callback, noUniform) {
  if (!mergeProxy) mergeProxy = cb.rest.MergeProxy.create();
  mergeProxy.add({ url: url, method: method, options: { baseurl: false, uniform: false } }, params, callback);
  if (mergeProxy.count() === 8) submitProxy();
}

function submitProxy() {
  mergeProxy.submit();
  mergeProxy = cb.rest.MergeProxy.create();
}