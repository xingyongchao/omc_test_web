//voucherlist

console.info('%c PC_attrextlist_VM js init', 'color:green');
cb.viewmodels.register('PC_attrextlist_VM', function(modelType) {

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
                "key": "40947565",
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
                "key": "40947566",
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
                "key": "40947567",
                "needClear": false
            }),


            'attrextlist': new cb.models.GridModel({
                "columns": {
                    "name": {
                        "cFieldName": "name",
                        "cItemName": "name",
                        "cCaption": "名称",
                        "cShowCaption": "名称",
                        "iBillEntityId": 1254239,
                        "iBillTplGroupId": 5167561,
                        "iTplId": 1250668,
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
                        "cTplGroupName": "自定义项项列表区域",
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
                    "type": {
                        "cFieldName": "type",
                        "cItemName": "type",
                        "cCaption": "类型",
                        "cShowCaption": "类型",
                        "iBillEntityId": 1254239,
                        "iBillTplGroupId": 5167561,
                        "iTplId": 1250668,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"Double\":\"数值\",\"String\":\"文本\",\"Integer\":\"整型\",\"Date\":\"日期\",\"Time\":\"时间\",\"DateTime\":\"日期时间\",\"CommonRefer\":\"公共参照\",\"ExtRefer\":\"扩展参照\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"数值\",\"key\":\"Double\"},{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"文本\",\"key\":\"String\"},{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"整型\",\"key\":\"Integer\"},{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"日期\",\"key\":\"Date\"},{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"时间\",\"key\":\"Time\"},{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"日期时间\",\"key\":\"DateTime\"},{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"公共参照\",\"key\":\"CommonRefer\"},{\"nameType\":\"text\",\"icon\":\"\",\"value\":\"扩展参照\",\"key\":\"ExtRefer\"}]",
                        "cEnumType": "pc_attrexttype",
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
                        "cTplGroupName": "自定义项项列表区域",
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
                        "iBillEntityId": 1254239,
                        "iBillTplGroupId": 5167561,
                        "iTplId": 1250668,
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
                        "cTplGroupName": "自定义项项列表区域",
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
                    "length": {
                        "cFieldName": "length",
                        "cItemName": "length",
                        "cCaption": "长度",
                        "cShowCaption": "长度",
                        "iBillEntityId": 1254239,
                        "iBillTplGroupId": 5167561,
                        "iTplId": 1250668,
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
                        "cTplGroupName": "自定义项项列表区域",
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
                        "iBillEntityId": 1254239,
                        "iBillTplGroupId": 5167561,
                        "iTplId": 1250668,
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
                        "cTplGroupName": "自定义项项列表区域",
                        "bMain": true,
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "decimaldigits": {
                        "cFieldName": "decimaldigits",
                        "cItemName": "decimaldigits",
                        "cCaption": "小数位",
                        "cShowCaption": "小数位",
                        "iBillEntityId": 1254239,
                        "iBillTplGroupId": 5167561,
                        "iTplId": 1250668,
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
                        "cTplGroupName": "自定义项项列表区域",
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
                    "pubts": {
                        "cFieldName": "pubts",
                        "cItemName": "pubts",
                        "cCaption": "时间戳",
                        "cShowCaption": "时间戳",
                        "iBillEntityId": 1254239,
                        "iBillTplGroupId": 5167561,
                        "iTplId": 1250668,
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
                        "cTplGroupName": "自定义项项列表区域",
                        "bMain": true,
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 12,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "dataSourceMode": "remote",
                "showCheckBox": false,
                "showAggregates": false
            }),


            'params': {
                "billNo": "attrextlist",
                "billType": "ArchiveList",
                "filterId": "39951958"
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [{
            "cCommand": "cmdPdfexport",
            "cAction": "batchoutput",
            "cSvcUrl": "/bill/pdfexport",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader"
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
            "key": "40947565",
            "needClear": false
        }, {
            "cCommand": "cmdImport",
            "cAction": "batchimport",
            "cSvcUrl": "/bill/billImport",
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
            "key": "40947567",
            "needClear": false
        }, {
            "cCommand": "cmdSubmit",
            "cAction": "batchaudit",
            "cSvcUrl": "/bill/batchaudit",
            "cHttpMethod": "POST",
            "cTarget": "ListBody"
        }, {
            "cCommand": "cmdList",
            "cAction": "list",
            "cSvcUrl": "/bill/list",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader"
        }, {
            "cCommand": "cmdTempexport",
            "cAction": "tempexport",
            "cSvcUrl": "/billtemp/export",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader"
        }, {
            "cCommand": "cmdExport",
            "cAction": "batchoutput",
            "cSvcUrl": "/bill/export",
            "cHttpMethod": "POST",
            "cTarget": "ListHeader"
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
            "key": "40947566",
            "needClear": false
        }];




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
                "key": "40947565",
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
                "key": "40947567",
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
                "key": "40947566",
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
        // if(cb.biz['PC'] && cb.biz['PC']['PC_attrextlist_VM_Extend']){
        //   console.info('%c PC_attrextlist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['PC']['PC_attrextlist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'PC/PC_attrextlist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c PC_attrextlist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->PC_attrextlist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});