//option

console.info('%c AA_sys_option_VM js init', 'color:green');
cb.viewmodels.register('AA_sys_option_VM', function(modelType) {

    var model = function(data) {
        cb.models.ContainerModel.call(this, data);
        this.init();
    };
    model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
    model.prototype.modelType = modelType;

    model.prototype.init = function() {
        var _this = this;
        var fields = {


            'params': {},


            'shopProIfCheck': new cb.models.ListModel({
                "id": 3013,
                "cShowCaption": "商家商品是否需要审核后才能上架",
                "groupcode": "so0101",
                "ordernum": 546,
                "maxlength": 2,
                "fieldtype": "String",
                "bEnum": true,
                "cEnumString": "{\"0\":\"不需要\",\"1\":\"新建和修改时需要\",\"2\":\"新建时需要，修改时不需要\"}",
                "enumArray": "[{\"nameType\":\"text\",\"value\":\"不需要\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"新建和修改时需要\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"新建时需要，修改时不需要\",\"key\":\"2\"}]",
                "bmustselect": false,
                "bhidden": false,
                "bcheck": false,
                "cControlType": "radio",
                "cEnumType": "aa_shopProIfCheck",
                "pubts": "2018-12-17 13:46:50",
                "ideleted": 0,
                "cAlign": "right",
                "cItemName": "shopProIfCheck",
                "optionId": "sys_option",
                "isStoreAdjust": false,
                "bCanModify": true
            }),


            'enterCustCreditCode': new cb.models.ListModel({
                "id": 3017,
                "cShowCaption": "企业客户统一社会信用代码必输",
                "groupcode": "so0101",
                "ordernum": 546,
                "maxlength": 2,
                "fieldtype": "Boolean",
                "bEnum": true,
                "cEnumString": "{\"true\":\"是\",\"false\":\"否\"}",
                "enumArray": "[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]",
                "bmustselect": false,
                "bhidden": false,
                "bcheck": false,
                "cControlType": "radio",
                "cEnumType": "aa_boolean",
                "pubts": "2019-02-20 16:30:03",
                "ideleted": 0,
                "cAlign": "right",
                "cItemName": "enterCustCreditCode",
                "optionId": "sys_option",
                "isStoreAdjust": false,
                "bCanModify": true
            }),


            'personalCustId': new cb.models.ListModel({
                "id": 3018,
                "cShowCaption": "个人客户身份证必输",
                "groupcode": "so0101",
                "ordernum": 546,
                "maxlength": 2,
                "fieldtype": "Boolean",
                "bEnum": true,
                "cEnumString": "{\"true\":\"是\",\"false\":\"否\"}",
                "enumArray": "[{\"nameType\":\"text\",\"value\":\"是\",\"key\":\"true\"},{\"nameType\":\"text\",\"value\":\"否\",\"key\":\"false\"}]",
                "bmustselect": false,
                "bhidden": false,
                "bcheck": false,
                "cControlType": "radio",
                "cEnumType": "aa_boolean",
                "pubts": "2019-02-20 16:30:03",
                "ideleted": 0,
                "cAlign": "right",
                "cItemName": "personalCustId",
                "optionId": "sys_option",
                "isStoreAdjust": false,
                "bCanModify": true
            }),


            'autoTagDailyTime': new cb.models.ListModel({
                "id": 1165,
                "cShowCaption": "商品自动设置标签时点",
                "groupcode": "so0101",
                "ordernum": 600,
                "maxlength": 255,
                "fieldtype": "String",
                "bEnum": true,
                "cEnumString": "{\"0\":\"0\",\"1\":\"1\",\"2\":\"2\",\"3\":\"3\",\"4\":\"4\",\"5\":\"5\",\"6\":\"6\",\"7\":\"7\",\"8\":\"8\",\"9\":\"9\",\"10\":\"10\",\"11\":\"11\",\"12\":\"12\",\"13\":\"13\",\"14\":\"14\",\"15\":\"15\",\"16\":\"16\",\"17\":\"17\",\"18\":\"18\",\"19\":\"19\",\"20\":\"20\",\"21\":\"21\",\"22\":\"22\",\"23\":\"23\"}",
                "enumArray": "[{\"nameType\":\"text\",\"value\":\"0\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"1\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"2\",\"key\":\"2\"},{\"nameType\":\"text\",\"value\":\"3\",\"key\":\"3\"},{\"nameType\":\"text\",\"value\":\"4\",\"key\":\"4\"},{\"nameType\":\"text\",\"value\":\"5\",\"key\":\"5\"},{\"nameType\":\"text\",\"value\":\"6\",\"key\":\"6\"},{\"nameType\":\"text\",\"value\":\"7\",\"key\":\"7\"},{\"nameType\":\"text\",\"value\":\"8\",\"key\":\"8\"},{\"nameType\":\"text\",\"value\":\"9\",\"key\":\"9\"},{\"nameType\":\"text\",\"value\":\"10\",\"key\":\"10\"},{\"nameType\":\"text\",\"value\":\"11\",\"key\":\"11\"},{\"nameType\":\"text\",\"value\":\"12\",\"key\":\"12\"},{\"nameType\":\"text\",\"value\":\"13\",\"key\":\"13\"},{\"nameType\":\"text\",\"value\":\"14\",\"key\":\"14\"},{\"nameType\":\"text\",\"value\":\"15\",\"key\":\"15\"},{\"nameType\":\"text\",\"value\":\"16\",\"key\":\"16\"},{\"nameType\":\"text\",\"value\":\"17\",\"key\":\"17\"},{\"nameType\":\"text\",\"value\":\"18\",\"key\":\"18\"},{\"nameType\":\"text\",\"value\":\"19\",\"key\":\"19\"},{\"nameType\":\"text\",\"value\":\"20\",\"key\":\"20\"},{\"nameType\":\"text\",\"value\":\"21\",\"key\":\"21\"},{\"nameType\":\"text\",\"value\":\"22\",\"key\":\"22\"},{\"nameType\":\"text\",\"value\":\"23\",\"key\":\"23\"}]",
                "bmustselect": false,
                "bhidden": false,
                "bcheck": false,
                "cControlType": "select",
                "cEnumType": "aa_daytimepoint",
                "pubts": "2018-11-30 13:41:12",
                "ideleted": 0,
                "cAlign": "right",
                "cItemName": "autoTagDailyTime",
                "optionId": "sys_option",
                "isStoreAdjust": false,
                "bCanModify": true
            }),


            'bthSave': new cb.models.SimpleModel({
                "tenant_id": 616973480136960,
                "sysid": 35835386,
                "auth_level": 5,
                "cShowCaption": "确定",
                "command": "cmdSave",
                "subid": "AA",
                "toolbar": "footertoolbar",
                "bMerge": false,
                "system": 0,
                "cControlType": "primarybutton",
                "billnumber": "sys_option",
                "authcontrol": true,
                "id": 35863143,
                "pubts": "2018-12-05 22:45:57",
                "cItemName": "bthSave",
                "iStyle": 0,
                "order": 1,
                "cCaption": "确定",
                "needClear": false
            }),


            'btnCancel': new cb.models.SimpleModel({
                "tenant_id": 616973480136960,
                "sysid": 35835390,
                "auth_level": 5,
                "cShowCaption": "取消",
                "command": "cmdAbandon",
                "subid": "AA",
                "toolbar": "footertoolbar",
                "bMerge": false,
                "system": 0,
                "cControlType": "button",
                "billnumber": "sys_option",
                "authcontrol": true,
                "id": 35863144,
                "pubts": "2018-12-05 22:45:57",
                "cItemName": "btnCancel",
                "iStyle": 0,
                "order": 2,
                "cCaption": "取消",
                "needClear": false
            }),

        };
        this.setData(fields);
        this.setDirty(false);



        var billType = "option";
        var biz;
        if (billType == 'option' || billType == 'freeview') {
            biz = cb.biz.common.option
        } else {
            biz = cb.biz.common.voucher
        }


        //common events start
        //actions

        _this.allActions = [{
            "subid": "AA",
            "tenant_id": 616973480136960,
            "system": 0,
            "cAction": "save",
            "cHttpMethod": "POST",
            "billnumber": "sys_option",
            "cCommand": "cmdSave",
            "cSvcUrl": "/option/updateOption",
            "id": 35863143,
            "pubts": "2018-12-05 22:45:57",
            "sysid": 35835386,
            "auth_level": 5,
            "cShowCaption": "确定",
            "command": "cmdSave",
            "toolbar": "footertoolbar",
            "bMerge": false,
            "cControlType": "primarybutton",
            "authcontrol": true,
            "cItemName": "bthSave",
            "iStyle": 0,
            "order": 1,
            "cCaption": "确定",
            "needClear": false
        }, {
            "subid": "AA",
            "tenant_id": 616973480136960,
            "system": 0,
            "cAction": "abandon",
            "cHttpMethod": "GET",
            "billnumber": "sys_option",
            "cCommand": "cmdAbandon",
            "cSvcUrl": "/option/cancel",
            "id": 35863144,
            "pubts": "2018-12-05 22:45:57",
            "sysid": 35835390,
            "auth_level": 5,
            "cShowCaption": "取消",
            "command": "cmdAbandon",
            "toolbar": "footertoolbar",
            "bMerge": false,
            "cControlType": "button",
            "authcontrol": true,
            "cItemName": "btnCancel",
            "iStyle": 0,
            "order": 2,
            "cCaption": "取消",
            "needClear": false
        }];




        _this.get('bthSave').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "subid": "AA",
                "tenant_id": 616973480136960,
                "system": 0,
                "cAction": "save",
                "cHttpMethod": "POST",
                "billnumber": "sys_option",
                "cCommand": "cmdSave",
                "cSvcUrl": "/option/updateOption",
                "id": 35863143,
                "pubts": "2018-12-05 22:45:57",
                "sysid": 35835386,
                "auth_level": 5,
                "cShowCaption": "确定",
                "command": "cmdSave",
                "toolbar": "footertoolbar",
                "bMerge": false,
                "cControlType": "primarybutton",
                "authcontrol": true,
                "cItemName": "bthSave",
                "iStyle": 0,
                "order": 1,
                "cCaption": "确定",
                "needClear": false
            }, {
                key: 'bthSave'
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

            biz.do('save', _this, args)
        });


        _this.get('btnCancel').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "subid": "AA",
                "tenant_id": 616973480136960,
                "system": 0,
                "cAction": "abandon",
                "cHttpMethod": "GET",
                "billnumber": "sys_option",
                "cCommand": "cmdAbandon",
                "cSvcUrl": "/option/cancel",
                "id": 35863144,
                "pubts": "2018-12-05 22:45:57",
                "sysid": 35835390,
                "auth_level": 5,
                "cShowCaption": "取消",
                "command": "cmdAbandon",
                "toolbar": "footertoolbar",
                "bMerge": false,
                "cControlType": "button",
                "authcontrol": true,
                "cItemName": "btnCancel",
                "iStyle": 0,
                "order": 2,
                "cCaption": "取消",
                "needClear": false
            }, {
                key: 'btnCancel'
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

            biz.do('abandon', _this, args)
        });



        //check



        _this.on('columnSetting', function(params) {
            biz.do('columnSetting', _this, params);
        });
        //common events end


        var girdModelKeys = []
        if (girdModelKeys) {
            girdModelKeys.forEach(function(key) {
                var gridModel = _this.get(key);
                if (gridModel) {
                    gridModel.on('afterCellValueChange', function(params) {
                        if (params) params.childrenField = key;
                        biz.do('cellCheck', _this, params);
                    })
                }
            })
        }



        this.biz = biz;
        // this.initData();
    };
    model.prototype.initData = function() {
        // if(cb.biz['AA'] && cb.biz['AA']['AA_sys_option_VM_Extend']){
        //   console.info('%c AA_sys_option_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_sys_option_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_sys_option_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_sys_option_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_sys_option_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});