//voucherlist

console.info('%c AA_aa_customerprolist_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_customerprolist_VM', function(modelType) {

    var model = function(data) {
        cb.models.ContainerModel.call(this, data);
        this.init();
    };
    model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
    model.prototype.modelType = modelType;

    model.prototype.init = function() {
        var _this = this;
        var fields = {


            'aa_customerprolist': new cb.models.GridModel({
                "columns": {
                    "showItem": {
                        "cFieldName": "showItem",
                        "cItemName": "showItem",
                        "cCaption": "属性名称",
                        "cShowCaption": "属性名称",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "item": {
                        "cFieldName": "item",
                        "cItemName": "item",
                        "cCaption": "项目号",
                        "cShowCaption": "项目号",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "sourcetype": {
                        "cFieldName": "sourcetype",
                        "cItemName": "sourcetype",
                        "cCaption": "属性来源",
                        "cShowCaption": "属性来源",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"false\":\"自定义项\",\"true\":\"系统预置\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"自定义项\",\"key\":\"false\"},{\"nameType\":\"text\",\"value\":\"系统预置\",\"key\":\"true\"}]",
                        "cEnumType": "pc_sourcetype",
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "userdefAlias": {
                        "cFieldName": "userdefAlias",
                        "cItemName": "userdefAlias",
                        "cCaption": "属性别名",
                        "cShowCaption": "属性别名",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "type": {
                        "cFieldName": "type",
                        "cItemName": "type",
                        "cCaption": "属性类型",
                        "cShowCaption": "属性类型",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"Double\":\"数值\",\"String\":\"文本\",\"Integer\":\"整型\",\"Date\":\"日期\",\"Time\":\"时间\",\"DateTime\":\"日期时间\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"数值\",\"key\":\"Double\"},{\"nameType\":\"text\",\"value\":\"文本\",\"key\":\"String\"},{\"nameType\":\"text\",\"value\":\"整型\",\"key\":\"Integer\"},{\"nameType\":\"text\",\"value\":\"日期\",\"key\":\"Date\"},{\"nameType\":\"text\",\"value\":\"时间\",\"key\":\"Time\"},{\"nameType\":\"text\",\"value\":\"日期时间\",\"key\":\"DateTime\"}]",
                        "cEnumType": "pc_productprotype",
                        "bHidden": false,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 5,
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
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "maxInputLen": {
                        "cFieldName": "maxInputLen",
                        "cItemName": "maxInputLen",
                        "cCaption": "录入长度",
                        "cShowCaption": "录入长度",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bHidden": false,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 6,
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
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"true\":\"是\",\"false\":\"否\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]",
                        "cEnumType": "aa_boolean",
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "decimalDigits": {
                        "cFieldName": "decimalDigits",
                        "cItemName": "decimalDigits",
                        "cCaption": "小数位",
                        "cShowCaption": "小数位",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bHidden": false,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isWebShow": {
                        "cFieldName": "isWebShow",
                        "cItemName": "isWebShow",
                        "cCaption": "前端显示",
                        "cShowCaption": "前端显示",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"true\":\"是\",\"false\":\"否\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]",
                        "cEnumType": "aa_boolean",
                        "bHidden": true,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "iorder": {
                        "cFieldName": "iorder",
                        "cItemName": "iorder",
                        "cCaption": "系统顺序",
                        "cShowCaption": "系统顺序",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
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
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cOrder": "desc",
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "orderNum": {
                        "cFieldName": "orderNum",
                        "cItemName": "orderNum",
                        "cCaption": "排序",
                        "cShowCaption": "排序",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bHidden": false,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isSerInput": {
                        "cFieldName": "isSerInput",
                        "cItemName": "isSerInput",
                        "cCaption": "客商档案必输",
                        "cShowCaption": "客商档案必输",
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"true\":\"是\",\"false\":\"否\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]",
                        "cEnumType": "aa_boolean",
                        "bHidden": false,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 11,
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
                        "iBillEntityId": 953834,
                        "iBillTplGroupId": 3852663,
                        "iTplId": 953386,
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
                        "cTplGroupName": "客户自定义项列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 12,
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
                "code": "audit",
                "condition": "data.verifystate == 100"
            }, {
                "code": "browse"
            }, {
                "code": "blank"
            }, {
                "code": "edit"
            }, {
                "code": "warehousestop",
                "condition": "data.iUsed=='disable'"
            }, {
                "code": "add"
            }, {
                "code": "finalaudit",
                "condition": "data.auditor != null && data.auditor != ''"
            }, {
                "code": "stopstatus",
                "condition": "data.stop==1 || data.stopstatus==1"
            }, {
                "code": "editonaudit",
                "condition": "data.verifystate == 100 && mode == 'edit'"
            }],


            'params': {
                "billNo": "aa_customerprolist",
                "billType": "ArchiveList",
                "filterId": "5333430"
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [];





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
        // if(cb.biz['AA'] && cb.biz['AA']['AA_aa_customerprolist_VM_Extend']){
        //   console.info('%c AA_aa_customerprolist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_aa_customerprolist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_aa_customerprolist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_aa_customerprolist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_aa_customerprolist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});