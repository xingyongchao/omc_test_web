//voucherlist

console.info('%c PC_pc_speprolist_VM js init', 'color:green');
cb.viewmodels.register('PC_pc_speprolist_VM', function(modelType) {

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
                "key": "40883100",
                "needClear": false
            }),


            'btnTempexport': new cb.models.SimpleModel({
                "cItemName": "btnTempexport",
                "cCaption": "导出模板",
                "cShowCaption": "导出模板",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "40883103",
                "cCommand": "cmdTempexport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883104",
                "needClear": false
            }),


            'btnBatchOptions': new cb.models.SimpleModel({
                "cItemName": "btnBatchOptions",
                "cCaption": "批量操作",
                "cShowCaption": "批量操作",
                "cControlType": "dropdownbutton",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883103",
                "needClear": false
            }),


            'btnImport': new cb.models.SimpleModel({
                "cItemName": "btnImport",
                "cCaption": "导入",
                "cShowCaption": "导入",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "40883103",
                "cCommand": "cmdImport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883105",
                "needClear": false
            }),


            'btnPdfexport': new cb.models.SimpleModel({
                "cItemName": "btnPdfexport",
                "cCaption": "PDF导出",
                "cShowCaption": "PDF导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "40883103",
                "cCommand": "cmdPdfexport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883106",
                "needClear": false
            }),


            'btnExport': new cb.models.SimpleModel({
                "cItemName": "btnExport",
                "cCaption": "Excel导出",
                "cShowCaption": "Excel导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "40883103",
                "cCommand": "cmdExport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883107",
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
                "key": "40883101",
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
                "key": "40883102",
                "needClear": false
            }),


            'pc_speprolist': new cb.models.GridModel({
                "columns": {
                    "showItem": {
                        "cFieldName": "showItem",
                        "cItemName": "showItem",
                        "cCaption": "规格名称",
                        "cShowCaption": "规格名称",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 280,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "userDefSpecViews!names": {
                        "cFieldName": "userDefSpecViews.names",
                        "cItemName": "userDefSpecViews!names",
                        "cCaption": "规格值",
                        "cShowCaption": "规格值",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 500,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "iorder": {
                        "cFieldName": "iorder",
                        "cItemName": "iorder",
                        "cCaption": "系统排序",
                        "cShowCaption": "系统排序",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 280,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cOrder": "desc",
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "erpCode": {
                        "cFieldName": "erpCode",
                        "cItemName": "erpCode",
                        "cCaption": "商家编码",
                        "cShowCaption": "商家编码",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 280,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isShowSpec": {
                        "cFieldName": "isShowSpec",
                        "cItemName": "isShowSpec",
                        "cCaption": "单独显示",
                        "cShowCaption": "单独显示",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 280,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"true\":\"是\",\"false\":\"否\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]",
                        "cEnumType": "aa_boolean",
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 7,
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
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 280,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "userdefDesc": {
                        "cFieldName": "userdefDesc",
                        "cItemName": "userdefDesc",
                        "cCaption": "规格备注",
                        "cShowCaption": "规格备注",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 280,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "orderNum": {
                        "cFieldName": "orderNum",
                        "cItemName": "orderNum",
                        "cCaption": "排序",
                        "cShowCaption": "排序",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "defineId": {
                        "cFieldName": "defineId",
                        "cItemName": "defineId",
                        "cCaption": "编码",
                        "cShowCaption": "编码",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "id": {
                        "cFieldName": "id",
                        "cItemName": "id",
                        "cCaption": "主表ID",
                        "cShowCaption": "主表ID",
                        "iBillEntityId": 1219217,
                        "iBillTplGroupId": 5049851,
                        "iTplId": 1216345,
                        "iMaxLength": 280,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 54,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "dataSourceMode": "remote",
                "showCheckBox": true,
                "showAggregates": false
            }),


            'params': {
                "billNo": "pc_speprolist",
                "billType": "ArchiveList",
                "filterId": "39951947"
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
            "cSvcUrl": "/bill/export",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnExport",
            "cCaption": "Excel导出",
            "cShowCaption": "Excel导出",
            "cControlType": "button",
            "iStyle": 0,
            "cParent": "40883103",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40883107",
            "needClear": false
        }, {
            "cCommand": "cmdSubmit",
            "cAction": "batchaudit",
            "cSvcUrl": "/bill/batchaudit",
            "cHttpMethod": "POST",
            "cTarget": "ListBody"
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
            "key": "40883101",
            "needClear": false
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
            "cParent": "40883103",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40883105",
            "needClear": false
        }, {
            "cCommand": "cmdList",
            "cAction": "list",
            "cSvcUrl": "/bill/list",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader"
        }, {
            "cCommand": "cmdAudit",
            "cAction": "batchaudit",
            "cSvcUrl": "/bill/batchaudit",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader"
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
            "key": "40883102",
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
            "cParent": "40883103",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40883106",
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
            "cParent": "40883103",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40883104",
            "needClear": false
        }, {
            "cCommand": "cmdAdd",
            "cAction": "add",
            "cSvcUrl": "/bill/add",
            "cHttpMethod": "GET",
            "cTarget": "ListHeader",
            "cItemName": "btnAdd",
            "cCaption": "新增",
            "cShowCaption": "新增",
            "cControlType": "primarybutton",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40883100",
            "needClear": false
        }];




        _this.get('btnExport').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdExport",
                "cAction": "batchoutput",
                "cSvcUrl": "/bill/export",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnExport",
                "cCaption": "Excel导出",
                "cShowCaption": "Excel导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "40883103",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883107",
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
                "key": "40883101",
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
                "cParent": "40883103",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883105",
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
                "key": "40883102",
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
                "cParent": "40883103",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883106",
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
                "cParent": "40883103",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883104",
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
                "cHttpMethod": "GET",
                "cTarget": "ListHeader",
                "cItemName": "btnAdd",
                "cCaption": "新增",
                "cShowCaption": "新增",
                "cControlType": "primarybutton",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40883100",
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
        // if(cb.biz['PC'] && cb.biz['PC']['PC_pc_speprolist_VM_Extend']){
        //   console.info('%c PC_pc_speprolist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['PC']['PC_pc_speprolist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'PC/PC_pc_speprolist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c PC_pc_speprolist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->PC_pc_speprolist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});