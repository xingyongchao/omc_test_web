//voucherlist

console.info('%c AA_aa_dutyclasslist_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_dutyclasslist_VM', function(modelType) {

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
                "key": "40793546",
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
                "key": "40793547",
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
                "key": "40793548",
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
                "key": "40793549",
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
                "key": "40793550",
                "needClear": false
            }),


            'aa_dutyclasslist': new cb.models.GridModel({
                "columns": {
                    "code": {
                        "cFieldName": "code",
                        "cItemName": "code",
                        "cCaption": "编码",
                        "cShowCaption": "编码",
                        "iBillEntityId": 1183431,
                        "iBillTplGroupId": 4924224,
                        "iTplId": 1181539,
                        "iMaxLength": 20,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 150,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.DutyClass",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "name": {
                        "cFieldName": "name",
                        "cItemName": "name",
                        "cCaption": "名称",
                        "cShowCaption": "名称",
                        "iBillEntityId": 1183431,
                        "iBillTplGroupId": 4924224,
                        "iTplId": 1181539,
                        "iMaxLength": 20,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.DutyClass",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 2,
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
                        "iBillEntityId": 1183431,
                        "iBillTplGroupId": 4924224,
                        "iTplId": 1181539,
                        "iMaxLength": 6,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"false\":\"启用\",\"true\":\"停用\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"启用\",\"key\":\"false\"},{\"nameType\":\"text\",\"value\":\"停用\",\"key\":\"true\"}]",
                        "cEnumType": "aa_stopstatus",
                        "bMustSelect": false,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "cDefaultValue": "False",
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cOrder": "asc",
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.DutyClass",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "desc": {
                        "cFieldName": "desc",
                        "cItemName": "desc",
                        "cCaption": "描述",
                        "cShowCaption": "描述",
                        "iBillEntityId": 1183431,
                        "iBillTplGroupId": 4924224,
                        "iTplId": 1181539,
                        "iMaxLength": 6,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cOrder": "asc",
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.DutyClass",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 4,
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
                        "iBillEntityId": 1183431,
                        "iBillTplGroupId": 4924224,
                        "iTplId": 1181539,
                        "iMaxLength": 300,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.DutyClass",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 5,
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
                        "iBillEntityId": 1183431,
                        "iBillTplGroupId": 4924224,
                        "iTplId": 1181539,
                        "iMaxLength": 300,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.DutyClass",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 6,
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


            'params': {
                "billNo": "aa_dutyclasslist",
                "billType": "ArchiveList",
                "filterId": "39951936"
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [{
            "cCommand": "cmdAdd",
            "cAction": "add",
            "cSvcUrl": "/bill/add",
            "cHttpMethod": "GET",
            "cItemName": "btnAdd",
            "cCaption": "新增",
            "cShowCaption": "新增",
            "cControlType": "primarybutton",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40793546",
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
            "key": "40793549",
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
            "key": "40793547",
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
            "key": "40793550",
            "needClear": false
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
            "key": "40793548",
            "needClear": false
        }, {
            "cCommand": "cmdList",
            "cAction": "list",
            "cSvcUrl": "/bill/list",
            "cHttpMethod": "POST"
        }];




        _this.get('btnAdd').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAdd",
                "cAction": "add",
                "cSvcUrl": "/bill/add",
                "cHttpMethod": "GET",
                "cItemName": "btnAdd",
                "cCaption": "新增",
                "cShowCaption": "新增",
                "cControlType": "primarybutton",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40793546",
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
                "key": "40793549",
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
                "key": "40793547",
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
                "key": "40793550",
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
                "cItemName": "btnDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40793548",
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
        // if(cb.biz['AA'] && cb.biz['AA']['AA_aa_dutyclasslist_VM_Extend']){
        //   console.info('%c AA_aa_dutyclasslist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_aa_dutyclasslist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_aa_dutyclasslist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_aa_dutyclasslist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_aa_dutyclasslist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});