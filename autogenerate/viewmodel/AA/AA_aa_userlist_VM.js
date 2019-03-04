//voucherlist

console.info('%c AA_aa_userlist_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_userlist_VM', function(modelType) {

    var model = function(data) {
        cb.models.ContainerModel.call(this, data);
        this.init();
    };
    model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
    model.prototype.modelType = modelType;

    model.prototype.init = function() {
        var _this = this;
        var fields = {


            'btnAdd': new cb.models.SimpleModel({
                "cItemName": "btnAdd",
                "cCaption": "新增",
                "cShowCaption": "新增",
                "cControlType": "primarybutton",
                "iStyle": 0,
                "cCommand": "cmdAdd",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35886997",
                "needClear": false
            }),


            'btnImport': new cb.models.SimpleModel({
                "cItemName": "btnImport",
                "cCaption": "导入",
                "cShowCaption": "导入",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35887004",
                "cCommand": "cmdImport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887002",
                "needClear": false
            }),


            'btnBatchOp': new cb.models.SimpleModel({
                "cItemName": "btnBatchOp",
                "cCaption": "批量操作",
                "cShowCaption": "批量操作",
                "cControlType": "dropdownbutton",
                "iStyle": 0,
                "cCommand": "cmdBatchOp",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887004",
                "needClear": false
            }),


            'btnTempexport': new cb.models.SimpleModel({
                "cItemName": "btnTempexport",
                "cCaption": "模板导出",
                "cShowCaption": "模板导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35887004",
                "cCommand": "cmdTempexport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887003",
                "needClear": false
            }),


            'btnEdit': new cb.models.SimpleModel({
                "cItemName": "btnEdit",
                "cCaption": "编辑",
                "cShowCaption": "编辑",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdEdit",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35886998",
                "needClear": false
            }),


            'btnDelete': new cb.models.SimpleModel({
                "cItemName": "btnDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdDelete",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35886999",
                "needClear": false
            }),


            'btnUnStop': new cb.models.SimpleModel({
                "cItemName": "btnUnStop",
                "cCaption": "启用",
                "cShowCaption": "启用",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdUnStop",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887000",
                "needClear": false
            }),


            'btnStop': new cb.models.SimpleModel({
                "cItemName": "btnStop",
                "cCaption": "停用",
                "cShowCaption": "停用",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdStop",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887001",
                "needClear": false
            }),


            'aa_userlist_entity': new cb.models.GridModel({
                "columns": {
                    "code": {
                        "cFieldName": "code",
                        "cItemName": "code",
                        "cCaption": "编码",
                        "cShowCaption": "账号",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 150,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 0,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "name": {
                        "cFieldName": "name",
                        "cItemName": "name",
                        "cCaption": "名称",
                        "cShowCaption": "姓名",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bJointQuery": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "nickName": {
                        "cFieldName": "nickName",
                        "cItemName": "nickName",
                        "cCaption": "昵称",
                        "cShowCaption": "昵称",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 101,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "email": {
                        "cFieldName": "email",
                        "cItemName": "email",
                        "cCaption": "邮箱",
                        "cShowCaption": "邮箱",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 150,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "mobile": {
                        "cFieldName": "mobile",
                        "cItemName": "mobile",
                        "cCaption": "移动电话",
                        "cShowCaption": "手机号",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 150,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "stopstatus": {
                        "cFieldName": "stopstatus",
                        "cItemName": "stopstatus",
                        "cCaption": "状态",
                        "cShowCaption": "状态",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"false\":\"启用\",\"true\":\"停用\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"启用\",\"key\":\"false\"},{\"nameType\":\"text\",\"value\":\"停用\",\"key\":\"true\"}]",
                        "cEnumType": "aa_stopstatus",
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "select",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "registersource": {
                        "cFieldName": "registersource",
                        "cItemName": "registersource",
                        "cCaption": "注册来源",
                        "cShowCaption": "注册来源",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"0\":\"基础服务\",\"1\":\"商城\",\"2\":\"U会员\",\"3\":\"U订货\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"基础服务\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"商城\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"U会员\",\"key\":\"2\"},{\"nameType\":\"text\",\"value\":\"U订货\",\"key\":\"3\"}]",
                        "cEnumType": "aa_registersource",
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "select",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "defaultorg": {
                        "cFieldName": "defaultorg",
                        "cItemName": "defaultorg",
                        "cCaption": "默认组织id",
                        "cShowCaption": "默认组织id",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 101,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "defaultorg_name": {
                        "cFieldName": "defaultorg.name",
                        "cItemName": "defaultorg_name",
                        "cCaption": "默认组织",
                        "cShowCaption": "默认组织",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 101,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "defaultstore": {
                        "cFieldName": "defaultstore",
                        "cItemName": "defaultstore",
                        "cCaption": "默认门店id",
                        "cShowCaption": "默认门店id",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 101,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "defaultstore_name": {
                        "cFieldName": "defaultstore.name",
                        "cItemName": "defaultstore_name",
                        "cCaption": "默认门店",
                        "cShowCaption": "默认门店",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 101,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "stoptime": {
                        "cFieldName": "stoptime",
                        "cItemName": "stoptime",
                        "cCaption": "停用时间",
                        "cShowCaption": "停用时间",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "datepicker",
                        "bVmExclude": 0,
                        "iOrder": 11,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "gender": {
                        "cFieldName": "gender",
                        "cItemName": "gender",
                        "cCaption": "性别",
                        "cShowCaption": "性别",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 101,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": false,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 12,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "tel": {
                        "cFieldName": "tel",
                        "cItemName": "tel",
                        "cCaption": "座机",
                        "cShowCaption": "座机",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 13,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "birthday": {
                        "cFieldName": "birthday",
                        "cItemName": "birthday",
                        "cCaption": "出生日期",
                        "cShowCaption": "出生日期",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "datepicker",
                        "bVmExclude": 0,
                        "iOrder": 14,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "wechat": {
                        "cFieldName": "wechat",
                        "cItemName": "wechat",
                        "cCaption": "wechat",
                        "cShowCaption": "wechat",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 15,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "qq": {
                        "cFieldName": "qq",
                        "cItemName": "qq",
                        "cCaption": "qq",
                        "cShowCaption": "qq",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 16,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "userType": {
                        "cFieldName": "userType",
                        "cItemName": "userType",
                        "cCaption": "操作员类型",
                        "cShowCaption": "操作员类型",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 106,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 17,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "id": {
                        "cFieldName": "id",
                        "cItemName": "id",
                        "cCaption": "ID",
                        "cShowCaption": "ID",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 106,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 18,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "pubts": {
                        "cFieldName": "pubts",
                        "cItemName": "pubts",
                        "cCaption": "时间戳",
                        "cShowCaption": "时间戳",
                        "iBillEntityId": 949287,
                        "iBillTplGroupId": 3829303,
                        "iTplId": 949217,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 107,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "cOrder": "desc",
                        "cTplGroupName": "操作员数据",
                        "bMain": true,
                        "cDataSourceName": "base.user.User",
                        "cControlType": "datepicker",
                        "bVmExclude": 0,
                        "iOrder": 19,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    }
                },
                "dataSourceMode": "remote",
                "showCheckBox": false,
                "showAggregates": false
            }),


            'states': [{
                "code": "add",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "audit",
                "condition": "data.verifystate == 100",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "browse",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "blank",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "stopstatus",
                "condition": "data.stop==1 || data.stopstatus==1",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "editonaudit",
                "condition": "data.verifystate == 100 && mode == 'edit'",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "warehousestop",
                "condition": "data.iUsed=='disable'",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "edit",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "finalaudit",
                "condition": "data.auditor != null && data.auditor != ''",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnUnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnStop",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnImport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnTempexport",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnBatchOp",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }]
            }],


            'params': {
                "billNo": "aa_userlist",
                "billType": "VoucherList",
                "filterId": "2005623"
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [{
            "cCommand": "cmdImport",
            "cAction": "batchimport",
            "cSvcUrl": "/bill/billImport",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnImport",
            "cCaption": "导入",
            "cShowCaption": "导入",
            "cControlType": "button",
            "iStyle": 0,
            "cParent": "35887004",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35887002",
            "needClear": false
        }, {
            "cCommand": "cmdEdit",
            "cAction": "edit",
            "cSvcUrl": "/bill/edit",
            "cHttpMethod": "GET",
            "cItemName": "btnEdit",
            "cCaption": "编辑",
            "cShowCaption": "编辑",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35886998",
            "needClear": false
        }, {
            "cCommand": "cmdTempexport",
            "cAction": "tempexport",
            "cSvcUrl": "/billtemp/export",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnTempexport",
            "cCaption": "模板导出",
            "cShowCaption": "模板导出",
            "cControlType": "button",
            "iStyle": 0,
            "cParent": "35887004",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35887003",
            "needClear": false
        }, {
            "cCommand": "cmdAdd",
            "cAction": "add",
            "cSvcUrl": "/bill/add",
            "cHttpMethod": "POST",
            "cItemName": "btnAdd",
            "cCaption": "新增",
            "cShowCaption": "新增",
            "cControlType": "primarybutton",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35886997",
            "needClear": false
        }, {
            "cCommand": "cmdStop",
            "cAction": "doService",
            "cSvcUrl": "/bill/stop",
            "cHttpMethod": "POST",
            "cItemName": "btnStop",
            "cCaption": "停用",
            "cShowCaption": "停用",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35887001",
            "needClear": false
        }, {
            "cCommand": "cmdUnStop",
            "cAction": "doService",
            "cSvcUrl": "/bill/unstop",
            "cHttpMethod": "POST",
            "cItemName": "btnUnStop",
            "cCaption": "启用",
            "cShowCaption": "启用",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35887000",
            "needClear": false
        }, {
            "cCommand": "cmdList",
            "cAction": "list",
            "cSvcUrl": "/bill/list",
            "cHttpMethod": "POST"
        }, {
            "cCommand": "cmdDelete",
            "cAction": "batchdelete",
            "cSvcUrl": "/bill/batchdelete",
            "cHttpMethod": "POST",
            "cItemName": "btnDelete",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35886999",
            "needClear": false
        }];




        _this.get('btnImport').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdImport",
                "cAction": "batchimport",
                "cSvcUrl": "/bill/billImport",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnImport",
                "cCaption": "导入",
                "cShowCaption": "导入",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35887004",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887002",
                "needClear": false
            }, {
                key: 'btnImport'
            }, {
                params: params
            });

            var self = this;
            args.disabledCallback = function() {
                self.setDisabled(true);
            }
            args.enabledCallback = function() {
                self.setDisabled(false);
            }

            biz.do('batchimport', _this, args)
        });


        _this.get('btnEdit').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdEdit",
                "cAction": "edit",
                "cSvcUrl": "/bill/edit",
                "cHttpMethod": "GET",
                "cItemName": "btnEdit",
                "cCaption": "编辑",
                "cShowCaption": "编辑",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35886998",
                "needClear": false
            }, {
                key: 'btnEdit'
            }, {
                params: params
            });

            var self = this;
            args.disabledCallback = function() {
                self.setDisabled(true);
            }
            args.enabledCallback = function() {
                self.setDisabled(false);
            }

            biz.do('edit', _this, args)
        });


        _this.get('btnTempexport').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdTempexport",
                "cAction": "tempexport",
                "cSvcUrl": "/billtemp/export",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnTempexport",
                "cCaption": "模板导出",
                "cShowCaption": "模板导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35887004",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887003",
                "needClear": false
            }, {
                key: 'btnTempexport'
            }, {
                params: params
            });

            var self = this;
            args.disabledCallback = function() {
                self.setDisabled(true);
            }
            args.enabledCallback = function() {
                self.setDisabled(false);
            }

            biz.do('tempexport', _this, args)
        });


        _this.get('btnAdd').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAdd",
                "cAction": "add",
                "cSvcUrl": "/bill/add",
                "cHttpMethod": "POST",
                "cItemName": "btnAdd",
                "cCaption": "新增",
                "cShowCaption": "新增",
                "cControlType": "primarybutton",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35886997",
                "needClear": false
            }, {
                key: 'btnAdd'
            }, {
                params: params
            });

            var self = this;
            args.disabledCallback = function() {
                self.setDisabled(true);
            }
            args.enabledCallback = function() {
                self.setDisabled(false);
            }

            biz.do('add', _this, args)
        });


        _this.get('btnStop').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdStop",
                "cAction": "doService",
                "cSvcUrl": "/bill/stop",
                "cHttpMethod": "POST",
                "cItemName": "btnStop",
                "cCaption": "停用",
                "cShowCaption": "停用",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887001",
                "needClear": false
            }, {
                key: 'btnStop'
            }, {
                params: params
            });

            var self = this;
            args.disabledCallback = function() {
                self.setDisabled(true);
            }
            args.enabledCallback = function() {
                self.setDisabled(false);
            }

            biz.do('doService', _this, args)
        });


        _this.get('btnUnStop').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdUnStop",
                "cAction": "doService",
                "cSvcUrl": "/bill/unstop",
                "cHttpMethod": "POST",
                "cItemName": "btnUnStop",
                "cCaption": "启用",
                "cShowCaption": "启用",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35887000",
                "needClear": false
            }, {
                key: 'btnUnStop'
            }, {
                params: params
            });

            var self = this;
            args.disabledCallback = function() {
                self.setDisabled(true);
            }
            args.enabledCallback = function() {
                self.setDisabled(false);
            }

            biz.do('doService', _this, args)
        });


        _this.get('btnDelete').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDelete",
                "cAction": "batchdelete",
                "cSvcUrl": "/bill/batchdelete",
                "cHttpMethod": "POST",
                "cItemName": "btnDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35886999",
                "needClear": false
            }, {
                key: 'btnDelete'
            }, {
                params: params
            });

            var self = this;
            args.disabledCallback = function() {
                self.setDisabled(true);
            }
            args.enabledCallback = function() {
                self.setDisabled(false);
            }

            biz.do('batchdelete', _this, args)
        });



        //check



        _this.on('columnSetting', function(params) {
            biz.do('columnSetting', _this, params);
        });
        //common events end



        _this.on('toggle', function(params) {
            biz.do('toggle', _this, params);
        });
        //注册
        _this.on('filterClick', function(params) {
            biz.do('search', _this, params);
        });



        this.biz = biz;
        // this.initData();
    };
    model.prototype.initData = function() {
        // if(cb.biz['AA'] && cb.biz['AA']['AA_aa_userlist_VM_Extend']){
        //   console.info('%c AA_aa_userlist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_aa_userlist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_aa_userlist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_aa_userlist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_aa_userlist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});