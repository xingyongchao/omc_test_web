//voucherlist

console.info('%c AA_aa_deliverycorplist_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_deliverycorplist_VM', function(modelType) {

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
                "key": "41057595",
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
                "key": "41057600",
                "needClear": false
            }),


            'btnBatchDelete': new cb.models.SimpleModel({
                "cItemName": "btnBatchDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "menuitem",
                "iStyle": 0,
                "cParent": "41057600",
                "cCommand": "cmdBatchDelete",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41057601",
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
                "key": "41057596",
                "needClear": false
            }),


            'btnUnstop': new cb.models.SimpleModel({
                "cItemName": "btnUnstop",
                "cCaption": "启用",
                "cShowCaption": "启用",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdUnstop",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41057599",
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
                "key": "41057598",
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
                "key": "41057597",
                "needClear": false
            }),


            'aa_deliverycorplist': new cb.models.GridModel({
                "columns": {
                    "id": {
                        "cFieldName": "id",
                        "cItemName": "id",
                        "cCaption": "ID",
                        "cShowCaption": "ID",
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
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
                        "cCaption": "物流公司",
                        "cShowCaption": "物流公司",
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "corp_code": {
                        "cFieldName": "corp_code",
                        "cItemName": "corp_code",
                        "cCaption": "物流公司代码",
                        "cShowCaption": "物流公司代码",
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "website": {
                        "cFieldName": "website",
                        "cItemName": "website",
                        "cCaption": "物流公司网址",
                        "cShowCaption": "物流公司网址",
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 260,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "request_url": {
                        "cFieldName": "request_url",
                        "cItemName": "request_url",
                        "cCaption": "查询接口网址",
                        "cShowCaption": "查询接口网址",
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 260,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
                        "cControlType": "Column",
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
                        "cCaption": "启用状态",
                        "cShowCaption": "启用状态",
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"false\":\"启用\",\"true\":\"停用\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"启用\",\"key\":\"false\"},{\"nameType\":\"text\",\"value\":\"停用\",\"key\":\"true\"}]",
                        "cEnumType": "aa_stopstatus",
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "cDefaultValue": "False",
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "ordernum": {
                        "cFieldName": "ordernum",
                        "cItemName": "ordernum",
                        "cCaption": "排序",
                        "cShowCaption": "排序",
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cOrder": "asc",
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 6,
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
                        "iBillEntityId": 1286432,
                        "iBillTplGroupId": 5270542,
                        "iTplId": 1284307,
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
                        "cTplGroupName": "物流公司列表区域",
                        "bMain": true,
                        "cDataSourceName": "aa.deliverycorp.Deliverycorp",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 8,
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
                "billNo": "aa_deliverycorplist",
                "billType": "ArchiveList",
                "filterId": "43186600"
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [{
            "cCommand": "cmdBatchDelete",
            "cAction": "batchdelete",
            "cSvcUrl": "/bill/batchdelete",
            "cHttpMethod": "POST",
            "cTarget": "ListBody",
            "cItemName": "btnBatchDelete",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "menuitem",
            "iStyle": 0,
            "cParent": "41057600",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41057601",
            "needClear": false
        }, {
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
            "key": "41057595",
            "needClear": false
        }, {
            "cCommand": "cmdUnstop",
            "cAction": "open",
            "cSvcUrl": "/bill/unstop",
            "cHttpMethod": "POST",
            "cItemName": "btnUnstop",
            "cCaption": "启用",
            "cShowCaption": "启用",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41057599",
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
            "key": "41057597",
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
            "key": "41057596",
            "needClear": false
        }, {
            "cCommand": "cmdStop",
            "cAction": "close",
            "cSvcUrl": "/bill/stop",
            "cHttpMethod": "POST",
            "cItemName": "btnStop",
            "cCaption": "停用",
            "cShowCaption": "停用",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "41057598",
            "needClear": false
        }];




        _this.get('btnBatchDelete').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdBatchDelete",
                "cAction": "batchdelete",
                "cSvcUrl": "/bill/batchdelete",
                "cHttpMethod": "POST",
                "cTarget": "ListBody",
                "cItemName": "btnBatchDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "menuitem",
                "iStyle": 0,
                "cParent": "41057600",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41057601",
                "needClear": false
            }, {
                key: 'btnBatchDelete'
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
                "key": "41057595",
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


        _this.get('btnUnstop').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdUnstop",
                "cAction": "open",
                "cSvcUrl": "/bill/unstop",
                "cHttpMethod": "POST",
                "cItemName": "btnUnstop",
                "cCaption": "启用",
                "cShowCaption": "启用",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41057599",
                "needClear": false
            }, {
                key: 'btnUnstop'
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

            biz.do('open', _this, args)
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
                "key": "41057597",
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
                "key": "41057596",
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


        _this.get('btnStop').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdStop",
                "cAction": "close",
                "cSvcUrl": "/bill/stop",
                "cHttpMethod": "POST",
                "cItemName": "btnStop",
                "cCaption": "停用",
                "cShowCaption": "停用",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "41057598",
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

            biz.do('close', _this, args)
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
        // if(cb.biz['AA'] && cb.biz['AA']['AA_aa_deliverycorplist_VM_Extend']){
        //   console.info('%c AA_aa_deliverycorplist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_aa_deliverycorplist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_aa_deliverycorplist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_aa_deliverycorplist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_aa_deliverycorplist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});