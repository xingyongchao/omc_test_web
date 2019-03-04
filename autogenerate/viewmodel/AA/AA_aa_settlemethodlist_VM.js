//voucherlist

console.info('%c AA_aa_settlemethodlist_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_settlemethodlist_VM', function(modelType) {

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
                "key": "41316581",
                "needClear": false
            }),


            'btnBatchOpt': new cb.models.SimpleModel({
                "cItemName": "btnBatchOpt",
                "cCaption": "批量操作",
                "cShowCaption": "批量操作",
                "cControlType": "dropdownbutton",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316589",
                "needClear": false
            }),


            'btnTempexport': new cb.models.SimpleModel({
                "cItemName": "btnTempexport",
                "cCaption": "导出模板",
                "cShowCaption": "导出模板",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "41316589",
                "cCommand": "cmdTempexport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316590",
                "needClear": false
            }),


            'btnImport': new cb.models.SimpleModel({
                "cItemName": "btnImport",
                "cCaption": "导入",
                "cShowCaption": "导入",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "41316589",
                "cCommand": "cmdImport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316591",
                "needClear": false
            }),


            'btnPdfexport': new cb.models.SimpleModel({
                "cItemName": "btnPdfexport",
                "cCaption": "PDF导出",
                "cShowCaption": "PDF导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "41316589",
                "cCommand": "cmdPdfexport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316592",
                "needClear": false
            }),


            'btnExport': new cb.models.SimpleModel({
                "cItemName": "btnExport",
                "cCaption": "Excel导出",
                "cShowCaption": "Excel导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "41316589",
                "cCommand": "cmdExport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316593",
                "needClear": false
            }),


            'btnAddChild': new cb.models.SimpleModel({
                "cItemName": "btnAddChild",
                "cCaption": "新增子类",
                "cShowCaption": "新增子类",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAdd",
                "cParameter": "child",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316582",
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
                "key": "41316583",
                "needClear": false
            }),


            'btnMoveUp': new cb.models.SimpleModel({
                "cItemName": "btnMoveUp",
                "cCaption": "上移",
                "cShowCaption": "上移",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdMoveUp",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316584",
                "needClear": false
            }),


            'btnMoveDown': new cb.models.SimpleModel({
                "cItemName": "btnMoveDown",
                "cCaption": "下移",
                "cShowCaption": "下移",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdMoveDown",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316585",
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
                "key": "41316586",
                "needClear": false
            }),


            'btnClose': new cb.models.SimpleModel({
                "cItemName": "btnClose",
                "cCaption": "停用",
                "cShowCaption": "停用",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdClose",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316587",
                "needClear": false
            }),


            'btnOpen': new cb.models.SimpleModel({
                "cItemName": "btnOpen",
                "cCaption": "启用",
                "cShowCaption": "启用",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdOpen",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316588",
                "needClear": false
            }),


            'aa_settlemethodlist': new cb.models.TreeModel({
                "columns": {
                    "name": {
                        "cFieldName": "name",
                        "cItemName": "name",
                        "cCaption": "名称",
                        "cShowCaption": "结算方式",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": false,
                        "iColWidth": 200,
                        "bShowIt": true,
                        "bIsNull": false,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "code": {
                        "cFieldName": "code",
                        "cItemName": "code",
                        "cCaption": "编码",
                        "cShowCaption": "编码",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": false,
                        "iColWidth": 150,
                        "bShowIt": true,
                        "bIsNull": false,
                        "bCheck": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "serviceAttr": {
                        "cFieldName": "serviceAttr",
                        "cItemName": "serviceAttr",
                        "cCaption": "业务属性",
                        "cShowCaption": "业务属性",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"0\":\"银行业务\",\"1\":\"现金业务\",\"2\":\"票据业务\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"银行业务\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"现金业务\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"票据业务\",\"key\":\"2\"}]",
                        "cEnumType": "aa_serviceattrofsettlemethod",
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": false,
                        "iColWidth": 150,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "erpCode": {
                        "cFieldName": "erpCode",
                        "cItemName": "erpCode",
                        "cCaption": "ERP编码",
                        "cShowCaption": "ERP编码",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": false,
                        "iColWidth": 150,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "parent": {
                        "cFieldName": "parent",
                        "cItemName": "parent",
                        "cCaption": "上级结算方式id",
                        "cShowCaption": "上级结算方式id",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "parent_name": {
                        "cFieldName": "parent.name",
                        "cItemName": "parent_name",
                        "cCaption": "上级结算方式",
                        "cShowCaption": "上级结算方式",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "cRefType": "aa_settlemethodref",
                        "cRefRetId": "{\"parent\":\"id\"}",
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "TreeRefer",
                        "refReturn": "name",
                        "bVmExclude": 0,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isEnabled": {
                        "cFieldName": "isEnabled",
                        "cItemName": "isEnabled",
                        "cCaption": "是否启用",
                        "cShowCaption": "是否启用",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"true\":\"是\",\"false\":\"否\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]",
                        "cEnumType": "aa_boolean",
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 12,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "sourcetype": {
                        "cFieldName": "sourcetype",
                        "cItemName": "sourcetype",
                        "cCaption": "数据来源",
                        "cShowCaption": "数据来源",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"false\":\"自定义项\",\"true\":\"系统预置\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"自定义项\",\"key\":\"false\"},{\"nameType\":\"text\",\"value\":\"系统预置\",\"key\":\"true\"}]",
                        "cEnumType": "pc_sourcetype",
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": false,
                        "iColWidth": 150,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 13,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "order": {
                        "cFieldName": "order",
                        "cItemName": "order",
                        "cCaption": "排序",
                        "cShowCaption": "排序",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "iNumPoint": 0,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cOrder": "asc",
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 14,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "level": {
                        "cFieldName": "level",
                        "cItemName": "level",
                        "cCaption": "层级",
                        "cShowCaption": "层级",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 15,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "path": {
                        "cFieldName": "path",
                        "cItemName": "path",
                        "cCaption": "路径",
                        "cShowCaption": "路径",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 16,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isEnd": {
                        "cFieldName": "isEnd",
                        "cItemName": "isEnd",
                        "cCaption": "是否末级",
                        "cShowCaption": "是否末级",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 17,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "id": {
                        "cFieldName": "id",
                        "cItemName": "id",
                        "cCaption": "ID",
                        "cShowCaption": "ID",
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
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
                        "iBillEntityId": 1374889,
                        "iBillTplGroupId": 5719703,
                        "iTplId": 1373042,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "结算方式列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.settlemethod.SettleMethod",
                        "cControlType": "datepicker",
                        "bVmExclude": 0,
                        "iOrder": 20,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "dataSourceMode": "remote",
                "showCheckBox": true,
                "showAggregates": false,
                "keyField": "id",
                "needClear": false,
                "titleField": "name"
            }),


            'params': {
                "billNo": "aa_settlemethodlist",
                "treeEntityName": "结算方式列表",
                "treeName": "aa.settlemethod.SettleMethod",
                "billType": "TreeList"
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [{
            "cCommand": "cmdExport",
            "cAction": "batchoutput",
            "cSvcUrl": "/bill/tree/export",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnExport",
            "cCaption": "Excel导出",
            "cShowCaption": "Excel导出",
            "cControlType": "button",
            "iStyle": 0,
            "cParent": "41316589",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316593",
            "needClear": false
        }, {
            "cCommand": "cmdAdd",
            "cAction": "add",
            "cSvcUrl": "/bill/add",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnAddChild",
            "cCaption": "新增子类",
            "cShowCaption": "新增子类",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316582",
            "needClear": false,
            "cParameter": "child"
        }, {
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
            "cParent": "41316589",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316591",
            "needClear": false
        }, {
            "cCommand": "cmdMoveDown",
            "cAction": "movedown",
            "cSvcUrl": "/bill/exec/move",
            "cHttpMethod": "POST",
            "cTarget": "ListBody",
            "cItemName": "btnMoveDown",
            "cCaption": "下移",
            "cShowCaption": "下移",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316585",
            "needClear": false
        }, {
            "cCommand": "cmdOpen",
            "cAction": "opensettlemethod",
            "cHttpMethod": "POST",
            "cTarget": "ListBody",
            "cItemName": "btnOpen",
            "cCaption": "启用",
            "cShowCaption": "启用",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316588",
            "needClear": false
        }, {
            "cCommand": "cmdEdit",
            "cAction": "edit",
            "cSvcUrl": "/bill/edit",
            "cHttpMethod": "GET",
            "cTarget": "ListBody",
            "cItemName": "btnEdit",
            "cCaption": "编辑",
            "cShowCaption": "编辑",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316583",
            "needClear": false
        }, {
            "cCommand": "cmdClose",
            "cAction": "closesettlemethod",
            "cHttpMethod": "POST",
            "cTarget": "ListBody",
            "cItemName": "btnClose",
            "cCaption": "停用",
            "cShowCaption": "停用",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316587",
            "needClear": false
        }, {
            "cCommand": "cmdDelete",
            "cAction": "batchdelete",
            "cSvcUrl": "/bill/batchdelete",
            "cHttpMethod": "POST",
            "cTarget": "ListBody",
            "cItemName": "btnDelete",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316586",
            "needClear": false
        }, {
            "cCommand": "cmdMoveUp",
            "cAction": "moveup",
            "cSvcUrl": "/bill/exec/move",
            "cHttpMethod": "POST",
            "cTarget": "ListBody",
            "cItemName": "btnMoveUp",
            "cCaption": "上移",
            "cShowCaption": "上移",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316584",
            "needClear": false
        }, {
            "cCommand": "cmdTempexport",
            "cAction": "tempexport",
            "cSvcUrl": "/billtemp/export",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnTempexport",
            "cCaption": "导出模板",
            "cShowCaption": "导出模板",
            "cControlType": "button",
            "iStyle": 0,
            "cParent": "41316589",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316590",
            "needClear": false
        }, {
            "cCommand": "cmdPdfexport",
            "cAction": "batchoutput",
            "cSvcUrl": "/bill/pdfexport",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnPdfexport",
            "cCaption": "PDF导出",
            "cShowCaption": "PDF导出",
            "cControlType": "button",
            "iStyle": 0,
            "cParent": "41316589",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41316592",
            "needClear": false
        }, {
            "cCommand": "cmdList",
            "cAction": "list",
            "cSvcUrl": "/bill/list",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader"
        }];




        _this.get('btnExport').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdExport",
                "cAction": "batchoutput",
                "cSvcUrl": "/bill/tree/export",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnExport",
                "cCaption": "Excel导出",
                "cShowCaption": "Excel导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "41316589",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316593",
                "needClear": false
            }, {
                key: 'btnExport'
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

            biz.do('batchoutput', _this, args)
        });


        _this.get('btnAdd').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAdd",
                "cAction": "add",
                "cSvcUrl": "/bill/add",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnAdd",
                "cCaption": "新增",
                "cShowCaption": "新增",
                "cControlType": "primarybutton",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316581",
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


        _this.get('btnAddChild').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAdd",
                "cAction": "add",
                "cSvcUrl": "/bill/add",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnAddChild",
                "cCaption": "新增子类",
                "cShowCaption": "新增子类",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316582",
                "needClear": false,
                "cParameter": "child"
            }, {
                key: 'btnAddChild'
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
                "cParent": "41316589",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316591",
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


        _this.get('btnMoveDown').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdMoveDown",
                "cAction": "movedown",
                "cSvcUrl": "/bill/exec/move",
                "cHttpMethod": "POST",
                "cTarget": "ListBody",
                "cItemName": "btnMoveDown",
                "cCaption": "下移",
                "cShowCaption": "下移",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316585",
                "needClear": false
            }, {
                key: 'btnMoveDown'
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

            biz.do('movedown', _this, args)
        });


        _this.get('btnOpen').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdOpen",
                "cAction": "opensettlemethod",
                "cHttpMethod": "POST",
                "cTarget": "ListBody",
                "cItemName": "btnOpen",
                "cCaption": "启用",
                "cShowCaption": "启用",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316588",
                "needClear": false
            }, {
                key: 'btnOpen'
            }, {
                params: params
            });

            biz.do('opensettlemethod', _this, args)
        });


        _this.get('btnEdit').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdEdit",
                "cAction": "edit",
                "cSvcUrl": "/bill/edit",
                "cHttpMethod": "GET",
                "cTarget": "ListBody",
                "cItemName": "btnEdit",
                "cCaption": "编辑",
                "cShowCaption": "编辑",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316583",
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


        _this.get('btnClose').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdClose",
                "cAction": "closesettlemethod",
                "cHttpMethod": "POST",
                "cTarget": "ListBody",
                "cItemName": "btnClose",
                "cCaption": "停用",
                "cShowCaption": "停用",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316587",
                "needClear": false
            }, {
                key: 'btnClose'
            }, {
                params: params
            });

            biz.do('closesettlemethod', _this, args)
        });


        _this.get('btnDelete').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDelete",
                "cAction": "batchdelete",
                "cSvcUrl": "/bill/batchdelete",
                "cHttpMethod": "POST",
                "cTarget": "ListBody",
                "cItemName": "btnDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316586",
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


        _this.get('btnMoveUp').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdMoveUp",
                "cAction": "moveup",
                "cSvcUrl": "/bill/exec/move",
                "cHttpMethod": "POST",
                "cTarget": "ListBody",
                "cItemName": "btnMoveUp",
                "cCaption": "上移",
                "cShowCaption": "上移",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316584",
                "needClear": false
            }, {
                key: 'btnMoveUp'
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

            biz.do('moveup', _this, args)
        });


        _this.get('btnTempexport').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdTempexport",
                "cAction": "tempexport",
                "cSvcUrl": "/billtemp/export",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnTempexport",
                "cCaption": "导出模板",
                "cShowCaption": "导出模板",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "41316589",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316590",
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


        _this.get('btnPdfexport').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdPdfexport",
                "cAction": "batchoutput",
                "cSvcUrl": "/bill/pdfexport",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnPdfexport",
                "cCaption": "PDF导出",
                "cShowCaption": "PDF导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "41316589",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41316592",
                "needClear": false
            }, {
                key: 'btnPdfexport'
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

            biz.do('batchoutput', _this, args)
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
        // if(cb.biz['AA'] && cb.biz['AA']['AA_aa_settlemethodlist_VM_Extend']){
        //   console.info('%c AA_aa_settlemethodlist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_aa_settlemethodlist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_aa_settlemethodlist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_aa_settlemethodlist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_aa_settlemethodlist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});