//voucherlist

console.info('%c PC_pc_producttpllist_VM js init', 'color:green');
cb.viewmodels.register('PC_pc_producttpllist_VM', function(modelType) {

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
                "key": "35863016",
                "needClear": false
            }),


            'btnTempexport': new cb.models.SimpleModel({
                "cItemName": "btnTempexport",
                "cCaption": "导出模板",
                "cShowCaption": "导出模板",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35863020",
                "cCommand": "cmdTempexport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863021",
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
                "key": "35863020",
                "needClear": false
            }),


            'btnImport': new cb.models.SimpleModel({
                "cItemName": "btnImport",
                "cCaption": "导入",
                "cShowCaption": "导入",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35863020",
                "cCommand": "cmdImport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863022",
                "needClear": false
            }),


            'btnPdfexport': new cb.models.SimpleModel({
                "cItemName": "btnPdfexport",
                "cCaption": "PDF导出",
                "cShowCaption": "PDF导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35863020",
                "cCommand": "cmdPdfexport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863023",
                "needClear": false
            }),


            'btnExport': new cb.models.SimpleModel({
                "cItemName": "btnExport",
                "cCaption": "Excel导出",
                "cShowCaption": "Excel导出",
                "cControlType": "button",
                "iStyle": 0,
                "cParent": "35863020",
                "cCommand": "cmdExport",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863024",
                "needClear": false
            }),


            'btnCopy': new cb.models.SimpleModel({
                "cItemName": "btnCopy",
                "cCaption": "复制",
                "cShowCaption": "复制",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAdd",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863017",
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
                "key": "35863018",
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
                "key": "35863019",
                "needClear": false
            }),


            'pc_producttpllist': new cb.models.GridModel({
                "columns": {
                    "id": {
                        "cFieldName": "id",
                        "cItemName": "id",
                        "cCaption": "ID",
                        "cShowCaption": "ID",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
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
                        "cCaption": "模板名称",
                        "cShowCaption": "模板名称",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
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
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 1,
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
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
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
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "enableCyclePurchase": {
                        "cFieldName": "enableCyclePurchase",
                        "cItemName": "enableCyclePurchase",
                        "cCaption": "周期购",
                        "cShowCaption": "启用周期购",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
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
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "enableWeighing": {
                        "cFieldName": "enableWeighing",
                        "cItemName": "enableWeighing",
                        "cCaption": "称重",
                        "cShowCaption": "启用称重",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
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
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "ListItem_brandName": {
                        "cFieldName": "ListItem.brandName",
                        "cItemName": "ListItem_brandName",
                        "cCaption": "关联品牌",
                        "cShowCaption": "品牌关联",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
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
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "deliveryType_name": {
                        "cFieldName": "deliveryType.name",
                        "cItemName": "deliveryType_name",
                        "cCaption": "商城运费模板",
                        "cShowCaption": "商城运费模板",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
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
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "FreightRule_name": {
                        "cFieldName": "FreightRule.name",
                        "cItemName": "FreightRule_name",
                        "cCaption": "订货运费模板",
                        "cShowCaption": "订货运费模板",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
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
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
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
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "createTime": {
                        "cFieldName": "createTime",
                        "cItemName": "createTime",
                        "cCaption": "创建时间",
                        "cShowCaption": "创建时间",
                        "iBillEntityId": 948247,
                        "iBillTplGroupId": 3824825,
                        "iTplId": 948182,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cOrder": "desc",
                        "cTplGroupName": "商品模板列表区域",
                        "bMain": true,
                        "cDataSourceName": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    }
                },
                "dataSourceMode": "remote",
                "showCheckBox": true,
                "showAggregates": false
            }),


            'params': {
                "billNo": "pc_producttpllist",
                "billType": "ArchiveList",
                "filterId": "5333382"
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
            "cParent": "35863020",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35863022",
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
            "cParent": "35863020",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35863021",
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
            "key": "35863018",
            "needClear": false
        }, {
            "cCommand": "cmdList",
            "cAction": "list",
            "cSvcUrl": "/bill/list",
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
            "key": "35863019",
            "needClear": false
        }, {
            "cCommand": "cmdAdd",
            "cAction": "add",
            "cSvcUrl": "/bill/add",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader",
            "cItemName": "btnCopy",
            "cCaption": "复制",
            "cShowCaption": "复制",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35863017",
            "needClear": false
        }, {
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
            "cParent": "35863020",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35863024",
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
            "cParent": "35863020",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35863023",
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
                "cParent": "35863020",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863022",
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
                "cParent": "35863020",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863021",
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
                "key": "35863018",
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
                "key": "35863019",
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
                "key": "35863016",
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


        _this.get('btnCopy').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAdd",
                "cAction": "add",
                "cSvcUrl": "/bill/add",
                "cHttpMethod": "POST",
                "cTarget": "ListHeader",
                "cItemName": "btnCopy",
                "cCaption": "复制",
                "cShowCaption": "复制",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863017",
                "needClear": false
            }, {
                key: 'btnCopy'
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
                "cParent": "35863020",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863024",
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
                "cParent": "35863020",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35863023",
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
        // if(cb.biz['PC'] && cb.biz['PC']['PC_pc_producttpllist_VM_Extend']){
        //   console.info('%c PC_pc_producttpllist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['PC']['PC_pc_producttpllist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'PC/PC_pc_producttpllist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c PC_pc_producttpllist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->PC_pc_producttpllist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});