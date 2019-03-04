//archive

console.info('%c PC_pc_producttpl_VM js init', 'color:green');
cb.viewmodels.register('PC_pc_producttpl_VM', function(modelType) {

    var model = function(data) {
        cb.models.ContainerModel.call(this, data);
        this.init();
    };
    model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
    model.prototype.modelType = modelType;

    model.prototype.init = function() {
        var _this = this;
        var fields = {


            'name': new cb.models.SimpleModel({
                "cFieldName": "name",
                "cItemName": "name",
                "cCaption": "模板名称",
                "cShowCaption": "模板名称",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bSplit": false,
                "bExtend": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 1,
                "bNeedSum": false,
                "bShowIt": true,
                "bFilter": true,
                "bIsNull": false,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 1,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'deliveryType': new cb.models.SimpleModel({
                "cFieldName": "deliveryType",
                "cItemName": "deliveryType",
                "cCaption": "商城运费模板id",
                "cShowCaption": "商城运费模板id",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
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
                "bShowIt": false,
                "bFilter": true,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "InputNumber",
                "bVmExclude": 0,
                "iOrder": 2,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'deliveryType_name': new cb.models.ReferModel({
                "cFieldName": "deliveryType.name",
                "cItemName": "deliveryType_name",
                "cCaption": "商城运费模板",
                "cShowCaption": "商城运费模板",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "cRefType": "mall_deliverytype",
                "cRefRetId": "{\"deliveryType\":\"id\",\"deliveryType_name\":\"name\"}",
                "bSplit": false,
                "bExtend": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 1,
                "bNeedSum": false,
                "bShowIt": true,
                "bFilter": true,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "ListRefer",
                "refReturn": "name",
                "bVmExclude": 0,
                "iOrder": 3,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'FreightRule': new cb.models.SimpleModel({
                "cFieldName": "FreightRule",
                "cItemName": "FreightRule",
                "cCaption": "订货运费模板id",
                "cShowCaption": "订货运费模板id",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
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
                "bShowIt": false,
                "bFilter": true,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "InputNumber",
                "bVmExclude": 0,
                "iOrder": 4,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'FreightRule_name': new cb.models.ReferModel({
                "cFieldName": "FreightRule.name",
                "cItemName": "FreightRule_name",
                "cCaption": "订货运费模板",
                "cShowCaption": "订货运费模板",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "cRefType": "uorder_freightrule",
                "cRefRetId": "{\"FreightRule\":\"id\",\"FreightRule_name\":\"name\"}",
                "bSplit": false,
                "bExtend": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 1,
                "bNeedSum": false,
                "bShowIt": true,
                "bFilter": true,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "ListRefer",
                "refReturn": "name",
                "bVmExclude": 0,
                "iOrder": 5,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'enableCyclePurchase': new cb.models.ListModel({
                "cFieldName": "enableCyclePurchase",
                "cItemName": "enableCyclePurchase",
                "cCaption": "是否启用周期购",
                "cShowCaption": "启用周期购",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
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
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 1,
                "bNeedSum": false,
                "bShowIt": true,
                "bFilter": true,
                "cDefaultValue": "false",
                "bIsNull": false,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "Radio",
                "bVmExclude": 0,
                "iOrder": 6,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'enableWeighing': new cb.models.ListModel({
                "cFieldName": "enableWeighing",
                "cItemName": "enableWeighing",
                "cCaption": "是否启用称重",
                "cShowCaption": "启用称重",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
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
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 1,
                "bNeedSum": false,
                "bShowIt": true,
                "bFilter": true,
                "cDefaultValue": "false",
                "bIsNull": false,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "Radio",
                "bVmExclude": 0,
                "iOrder": 7,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'erpCode': new cb.models.SimpleModel({
                "cFieldName": "erpCode",
                "cItemName": "erpCode",
                "cCaption": "商家编码",
                "cShowCaption": "商家编码",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bSplit": false,
                "bExtend": false,
                "bCanModify": true,
                "iMaxShowLen": 255,
                "iColWidth": 1,
                "bNeedSum": false,
                "bShowIt": true,
                "bFilter": true,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 8,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'id': new cb.models.SimpleModel({
                "cFieldName": "id",
                "cItemName": "id",
                "cCaption": "ID",
                "cShowCaption": "ID",
                "iBillEntityId": 1172715,
                "iBillTplGroupId": 4893043,
                "iTplId": 1172609,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bSplit": false,
                "bExtend": false,
                "bCanModify": false,
                "iMaxShowLen": 255,
                "iColWidth": 1,
                "bNeedSum": false,
                "bShowIt": false,
                "bFilter": false,
                "bIsNull": true,
                "bPrintCaption": true,
                "bJointQuery": false,
                "bPrintUpCase": false,
                "bSelfDefine": false,
                "bMain": true,
                "cDataSourceName": "pc.tpl.ProductTpl",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 16,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
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
                "key": "40745458",
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
                "key": "40745459",
                "needClear": false
            }),


            'btnMoveprev': new cb.models.SimpleModel({
                "cItemName": "btnMoveprev",
                "cCaption": "上张",
                "cShowCaption": "上张",
                "cControlType": "button",
                "iStyle": 2,
                "cCommand": "cmdMoveprev",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745460",
                "needClear": false
            }),


            'btnMovenext': new cb.models.SimpleModel({
                "cItemName": "btnMovenext",
                "cCaption": "下张",
                "cShowCaption": "下张",
                "cControlType": "button",
                "iStyle": 2,
                "cCommand": "cmdMovenext",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745461",
                "needClear": false
            }),


            'btnAbandonBrowst': new cb.models.SimpleModel({
                "cItemName": "btnAbandonBrowst",
                "cCaption": "返回",
                "cShowCaption": "返回",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAbandon",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745462",
                "needClear": false
            }),


            'btnSave': new cb.models.SimpleModel({
                "cItemName": "btnSave",
                "cCaption": "保存",
                "cShowCaption": "保存",
                "cControlType": "primarybutton",
                "iStyle": 1,
                "cCommand": "cmdSave",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745463",
                "needClear": false
            }),


            'btnSaveAndAdd': new cb.models.SimpleModel({
                "cItemName": "btnSaveAndAdd",
                "cCaption": "保存并新增",
                "cShowCaption": "保存并新增",
                "cControlType": "primarybutton",
                "iStyle": 1,
                "cCommand": "cmdSaveAndAdd",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745464",
                "needClear": false
            }),


            'btnAbandon': new cb.models.SimpleModel({
                "cItemName": "btnAbandon",
                "cCaption": "取消",
                "cShowCaption": "取消",
                "cControlType": "button",
                "iStyle": 1,
                "cCommand": "cmdAbandon",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745465",
                "needClear": false
            }),


            'btnAddSpec': new cb.models.SimpleModel({
                "cItemName": "btnAddSpec",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAddRow",
                "childrenField": "SpecSums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745466",
                "needClear": false
            }),


            'btnDeleteSpec': new cb.models.SimpleModel({
                "cItemName": "btnDeleteSpec",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdDeleteRow",
                "childrenField": "SpecSums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745467",
                "needClear": false
            }),


            'btnAddParamGroup': new cb.models.SimpleModel({
                "cItemName": "btnAddParamGroup",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAddRow_param",
                "childrenField": "Parameters",
                "cParameter": "group",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745468",
                "needClear": false
            }),


            'btnAddParam': new cb.models.SimpleModel({
                "cItemName": "btnAddParam",
                "cCaption": "新增参数",
                "cShowCaption": "新增参数",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAddRow_param",
                "childrenField": "Parameters",
                "cParameter": "param",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745469",
                "needClear": false
            }),


            'btnDeleteParamGroup': new cb.models.SimpleModel({
                "cItemName": "btnDeleteParamGroup",
                "cCaption": "删除参数组",
                "cShowCaption": "删除参数组",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdDeleteRow_param",
                "childrenField": "Parameters",
                "cParameter": "group",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745470",
                "needClear": false
            }),


            'btnDeleteParam': new cb.models.SimpleModel({
                "cItemName": "btnDeleteParam",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdDeleteRow_param",
                "childrenField": "Parameters",
                "cParameter": "param",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745471",
                "needClear": false
            }),


            'btnAddRow_extend': new cb.models.SimpleModel({
                "cItemName": "btnAddRow_extend",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAddRow_extend",
                "childrenField": "PropertySums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745472",
                "needClear": false
            }),


            'btnDeleteRow_extend': new cb.models.SimpleModel({
                "cItemName": "btnDeleteRow_extend",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdDeleteRow_extend",
                "childrenField": "PropertySums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745473",
                "needClear": false
            }),


            'btnAddRow_sku': new cb.models.SimpleModel({
                "cItemName": "btnAddRow_sku",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAddRow_sku",
                "childrenField": "SKUPropertySums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745474",
                "needClear": false
            }),


            'btnDeleteRow_sku': new cb.models.SimpleModel({
                "cItemName": "btnDeleteRow_sku",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdDeleteRow_sku",
                "childrenField": "SKUPropertySums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745475",
                "needClear": false
            }),


            'btnAddRow_order': new cb.models.SimpleModel({
                "cItemName": "btnAddRow_order",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAddRow_order",
                "childrenField": "OrderPropertySums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745476",
                "needClear": false
            }),


            'btnDeleteRow_order': new cb.models.SimpleModel({
                "cItemName": "btnDeleteRow_order",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdDeleteRow_order",
                "childrenField": "OrderPropertySums",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745477",
                "needClear": false
            }),


            'SpecSums': new cb.models.GridModel({
                "columns": {
                    "template": {
                        "cFieldName": "template",
                        "cItemName": "template",
                        "cCaption": "模板ID",
                        "cShowCaption": "模板ID",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "specification": {
                        "cFieldName": "specification",
                        "cItemName": "specification",
                        "cCaption": "规格项ID",
                        "cShowCaption": "规格项ID",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "specification_showItem": {
                        "cFieldName": "specification.showItem",
                        "cItemName": "specification_showItem",
                        "cCaption": "规格项",
                        "cShowCaption": "规格项",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_userdefclassref",
                        "cRefRetId": "{\"specification\":\"id\",\"specification_showItem\":\"showItem\",\"specification_defineId\":\"defineId\"}·",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "specification_defineId": {
                        "cFieldName": "specification.defineId",
                        "cItemName": "specification_defineId",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "自定义项类型id",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "specification_isShowSpec": {
                        "cFieldName": "specification.isShowSpec",
                        "cItemName": "specification_isShowSpec",
                        "cCaption": "仅前端显示",
                        "cShowCaption": "仅前端显示",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "specitem": {
                        "cFieldName": "specitem",
                        "cItemName": "specitem",
                        "cCaption": "规格值",
                        "cShowCaption": "规格值",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
                        "iMaxLength": 400,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pb_userdefine",
                        "cRefRetId": "{\"specitem\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": false,
                        "iMaxShowLen": 400,
                        "iColWidth": 400,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "specification_erpCode": {
                        "cFieldName": "specification.erpCode",
                        "cItemName": "specification_erpCode",
                        "cCaption": "商家编码",
                        "cShowCaption": "商家编码",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "erpName": {
                        "cFieldName": "erpName",
                        "cItemName": "erpName",
                        "cCaption": "商家值名称",
                        "cShowCaption": "商家值名称",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "order": {
                        "cFieldName": "order",
                        "cItemName": "order",
                        "cCaption": "排序",
                        "cShowCaption": "排序",
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
                        "iMaxLength": 150,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 0,
                        "bCanModify": true,
                        "iMaxShowLen": 150,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 9,
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
                        "iBillEntityId": 1172716,
                        "iBillTplGroupId": 4893046,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品规格表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSpecSum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Column",
                        "bVmExclude": 0,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "showCheckBox": false,
                "bIsNull": true,
                "showRowNo": true,
                "showAggregates": false,
                "pagination": false,
                "cShowCaption": "规格"
            }),


            'Brands': new cb.models.TagModel({
                "cFieldName": "brand.name",
                "cItemName": "brand_name",
                "cCaption": "关联品牌",
                "cShowCaption": "关联品牌",
                "iBillEntityId": 1172721,
                "iBillTplGroupId": 4893056,
                "iTplId": 1172609,
                "iMaxLength": 255,
                "iFieldType": 1,
                "bEnum": false,
                "bHidden": false,
                "cRefType": "pc_brandref",
                "cRefRetId": "{\"brand\":\"id\",\"brand_name\":\"name\"}",
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
                "bMain": false,
                "cDataSourceName": "pc.tpl.ProductTplBrand",
                "cParentDataSource": "pc.tpl.ProductTpl",
                "cControlType": "Tag",
                "refReturn": "name",
                "cStyle": "{\"displaymode\":\"popover\"}",
                "bVmExclude": 0,
                "iOrder": 7,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true,
                "multiple": true
            }),


            'Parameters': new cb.models.GridModel({
                "columns": {
                    "template": {
                        "cFieldName": "template",
                        "cItemName": "template",
                        "cCaption": "模板ID",
                        "cShowCaption": "模板ID",
                        "iBillEntityId": 1172717,
                        "iBillTplGroupId": 4893048,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品参数表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplParameter",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "group": {
                        "cFieldName": "group",
                        "cItemName": "group",
                        "cCaption": "参数组",
                        "cShowCaption": "参数组",
                        "iBillEntityId": 1172717,
                        "iBillTplGroupId": 4893048,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
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
                        "cTplGroupName": "商品参数表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplParameter",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "name": {
                        "cFieldName": "name",
                        "cItemName": "name",
                        "cCaption": "参数名称",
                        "cShowCaption": "参数名称",
                        "iBillEntityId": 1172717,
                        "iBillTplGroupId": 4893048,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
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
                        "cTplGroupName": "商品参数表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplParameter",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isFilter": {
                        "cFieldName": "isFilter",
                        "cItemName": "isFilter",
                        "cCaption": "加入分类查询条件",
                        "cShowCaption": "加入分类查询条件",
                        "iBillEntityId": 1172717,
                        "iBillTplGroupId": 4893048,
                        "iTplId": 1172609,
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
                        "cTplGroupName": "商品参数表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplParameter",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "parent": {
                        "cFieldName": "parent",
                        "cItemName": "parent",
                        "cCaption": "分组ID",
                        "cShowCaption": "分组ID",
                        "iBillEntityId": 1172717,
                        "iBillTplGroupId": 4893048,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品参数表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplParameter",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 5,
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
                        "iBillEntityId": 1172717,
                        "iBillTplGroupId": 4893048,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品参数表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplParameter",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "showCheckBox": false,
                "bIsNull": true,
                "showRowNo": true,
                "showAggregates": false,
                "pagination": false,
                "cShowCaption": "参数"
            }),


            'PropertySums': new cb.models.GridModel({
                "columns": {
                    "template": {
                        "cFieldName": "template",
                        "cItemName": "template",
                        "cCaption": "模板ID",
                        "cShowCaption": "模板ID",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType": {
                        "cFieldName": "propertyType",
                        "cItemName": "propertyType",
                        "cCaption": "自定义项id",
                        "cShowCaption": "自定义项id",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_defineIdOther": {
                        "cFieldName": "propertyType.defineIdOther",
                        "cItemName": "propertyType_defineIdOther",
                        "cCaption": "defineIdOther",
                        "cShowCaption": "defineIdOther",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_defineId": {
                        "cFieldName": "propertyType.defineId",
                        "cItemName": "propertyType_defineId",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "自定义项类型id",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_showItem": {
                        "cFieldName": "propertyType.showItem",
                        "cItemName": "propertyType_showItem",
                        "cCaption": "属性名称",
                        "cShowCaption": "属性名称",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_userdefclassref",
                        "cRefRetId": "{\"propertyType\":\"id\",\"propertyType_defineId\":\"defineId\",\"propertyType_item\":\"item\",\"propertyType_showItem\":\"showItem\",\"propertyType_type\":\"type\"}",
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
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Refer",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "alias": {
                        "cFieldName": "alias",
                        "cItemName": "alias",
                        "cCaption": "属性别名",
                        "cShowCaption": "属性别名",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
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
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType_type": {
                        "cFieldName": "propertyType.type",
                        "cItemName": "propertyType_type",
                        "cCaption": "数据类型",
                        "cShowCaption": "数据类型",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"Double\":\"数值\",\"String\":\"文本\",\"Integer\":\"整型\",\"Date\":\"日期\",\"Time\":\"时间\",\"DateTime\":\"日期时间\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"数值\",\"key\":\"Double\"},{\"nameType\":\"text\",\"value\":\"文本\",\"key\":\"String\"},{\"nameType\":\"text\",\"value\":\"整型\",\"key\":\"Integer\"},{\"nameType\":\"text\",\"value\":\"日期\",\"key\":\"Date\"},{\"nameType\":\"text\",\"value\":\"时间\",\"key\":\"Time\"},{\"nameType\":\"text\",\"value\":\"日期时间\",\"key\":\"DateTime\"}]",
                        "cEnumType": "pc_productprotype",
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
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType_userdefMode": {
                        "cFieldName": "propertyType.userdefMode",
                        "cItemName": "propertyType_userdefMode",
                        "cCaption": "录入方式",
                        "cShowCaption": "录入方式",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"0\":\"输入项\",\"1\":\"选择项\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"输入项\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"选择项\",\"key\":\"1\"}]",
                        "cEnumType": "pc_property_showtype",
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
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isRequired": {
                        "cFieldName": "isRequired",
                        "cItemName": "isRequired",
                        "cCaption": "商品档案必输",
                        "cShowCaption": "商品档案必输",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isShow": {
                        "cFieldName": "isShow",
                        "cItemName": "isShow",
                        "cCaption": "前端显示",
                        "cShowCaption": "前端显示",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "values": {
                        "cFieldName": "values",
                        "cItemName": "values",
                        "cCaption": "属性值",
                        "cShowCaption": "属性值",
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 10,
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
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 0,
                        "bCanModify": true,
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
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 11,
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
                        "iBillEntityId": 1172718,
                        "iBillTplGroupId": 4893050,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品商品属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplExtendPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 12,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "showCheckBox": false,
                "bIsNull": true,
                "showRowNo": true,
                "showAggregates": false,
                "pagination": false,
                "cShowCaption": "属性"
            }),


            'SKUPropertySums': new cb.models.GridModel({
                "columns": {
                    "template": {
                        "cFieldName": "template",
                        "cItemName": "template",
                        "cCaption": "模板ID",
                        "cShowCaption": "模板ID",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType": {
                        "cFieldName": "propertyType",
                        "cItemName": "propertyType",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "属性来源",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_defineId": {
                        "cFieldName": "propertyType.defineId",
                        "cItemName": "propertyType_defineId",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "自定义项类型id",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_defineIdOther": {
                        "cFieldName": "propertyType.defineIdOther",
                        "cItemName": "propertyType_defineIdOther",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "自定义项类型id",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_showItem": {
                        "cFieldName": "propertyType.showItem",
                        "cItemName": "propertyType_showItem",
                        "cCaption": "属性名称",
                        "cShowCaption": "属性名称",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_userdefclassref",
                        "cRefRetId": "{\"propertyType\":\"id\",\"propertyType_defineId\":\"defineId\",\"propertyType_item\":\"item\",\"propertyType_showItem\":\"showItem\",\"propertyType_type\":\"type\"}",
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
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "alias": {
                        "cFieldName": "alias",
                        "cItemName": "alias",
                        "cCaption": "属性别名",
                        "cShowCaption": "属性别名",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
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
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType_type": {
                        "cFieldName": "propertyType.type",
                        "cItemName": "propertyType_type",
                        "cCaption": "数据类型",
                        "cShowCaption": "数据类型",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"Double\":\"数值\",\"String\":\"文本\",\"Integer\":\"整型\",\"Date\":\"日期\",\"Time\":\"时间\",\"DateTime\":\"日期时间\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"数值\",\"key\":\"Double\"},{\"nameType\":\"text\",\"value\":\"文本\",\"key\":\"String\"},{\"nameType\":\"text\",\"value\":\"整型\",\"key\":\"Integer\"},{\"nameType\":\"text\",\"value\":\"日期\",\"key\":\"Date\"},{\"nameType\":\"text\",\"value\":\"时间\",\"key\":\"Time\"},{\"nameType\":\"text\",\"value\":\"日期时间\",\"key\":\"DateTime\"}]",
                        "cEnumType": "pc_productprotype",
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
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType_userdefMode": {
                        "cFieldName": "propertyType.userdefMode",
                        "cItemName": "propertyType_userdefMode",
                        "cCaption": "录入方式",
                        "cShowCaption": "录入方式",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"0\":\"输入项\",\"1\":\"选择项\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"输入项\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"选择项\",\"key\":\"1\"}]",
                        "cEnumType": "pc_property_showtype",
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
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isRequired": {
                        "cFieldName": "isRequired",
                        "cItemName": "isRequired",
                        "cCaption": "商品档案必输",
                        "cShowCaption": "商品档案必输",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "values": {
                        "cFieldName": "values",
                        "cItemName": "values",
                        "cCaption": "属性值",
                        "cShowCaption": "属性值",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 9,
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
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 0,
                        "bCanModify": true,
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
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
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
                        "cCaption": "ID",
                        "cShowCaption": "ID",
                        "iBillEntityId": 1172719,
                        "iBillTplGroupId": 4893052,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品SKU属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplSKUPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 11,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "showCheckBox": false,
                "bIsNull": true,
                "showRowNo": true,
                "showAggregates": false,
                "pagination": false,
                "cShowCaption": "SKU"
            }),


            'OrderPropertySums': new cb.models.GridModel({
                "columns": {
                    "template": {
                        "cFieldName": "template",
                        "cItemName": "template",
                        "cCaption": "模板ID",
                        "cShowCaption": "模板ID",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType": {
                        "cFieldName": "propertyType",
                        "cItemName": "propertyType",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "属性来源",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_defineId": {
                        "cFieldName": "propertyType.defineId",
                        "cItemName": "propertyType_defineId",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "自定义项类型id",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_defineIdOther": {
                        "cFieldName": "propertyType.defineIdOther",
                        "cItemName": "propertyType_defineIdOther",
                        "cCaption": "自定义项类型id",
                        "cShowCaption": "自定义项类型id",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_showItem": {
                        "cFieldName": "propertyType.showItem",
                        "cItemName": "propertyType_showItem",
                        "cCaption": "属性名称",
                        "cShowCaption": "属性名称",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_userdefclassref",
                        "cRefRetId": "{\"propertyType\":\"id\",\"propertyType_defineId\":\"defineId\",\"propertyType_item\":\"item\",\"propertyType_showItem\":\"showItem\",\"propertyType_type\":\"type\"}",
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
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "alias": {
                        "cFieldName": "alias",
                        "cItemName": "alias",
                        "cCaption": "属性别名",
                        "cShowCaption": "属性别名",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
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
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType_type": {
                        "cFieldName": "propertyType.type",
                        "cItemName": "propertyType_type",
                        "cCaption": "数据类型",
                        "cShowCaption": "数据类型",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"Double\":\"数值\",\"String\":\"文本\",\"Integer\":\"整型\",\"Date\":\"日期\",\"Time\":\"时间\",\"DateTime\":\"日期时间\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"数值\",\"key\":\"Double\"},{\"nameType\":\"text\",\"value\":\"文本\",\"key\":\"String\"},{\"nameType\":\"text\",\"value\":\"整型\",\"key\":\"Integer\"},{\"nameType\":\"text\",\"value\":\"日期\",\"key\":\"Date\"},{\"nameType\":\"text\",\"value\":\"时间\",\"key\":\"Time\"},{\"nameType\":\"text\",\"value\":\"日期时间\",\"key\":\"DateTime\"}]",
                        "cEnumType": "pc_productprotype",
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
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType_userdefMode": {
                        "cFieldName": "propertyType.userdefMode",
                        "cItemName": "propertyType_userdefMode",
                        "cCaption": "录入方式",
                        "cShowCaption": "录入方式",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"0\":\"输入项\",\"1\":\"选择项\",\"2\":\"输入+选择\",\"3\":\"提示语\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"输入项\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"选择项\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"输入+选择\",\"key\":\"2\"},{\"nameType\":\"text\",\"value\":\"提示语\",\"key\":\"3\"}]",
                        "cEnumType": "pc_orderproperty_showtype",
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
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isShow": {
                        "cFieldName": "isShow",
                        "cItemName": "isShow",
                        "cCaption": "前端显示",
                        "cShowCaption": "前端显示",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isRequired": {
                        "cFieldName": "isRequired",
                        "cItemName": "isRequired",
                        "cCaption": "商城前端必输",
                        "cShowCaption": "商城前端必输",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "values": {
                        "cFieldName": "values",
                        "cItemName": "values",
                        "cCaption": "属性值",
                        "cShowCaption": "属性值",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
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
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 11,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "limitNum": {
                        "cFieldName": "limitNum",
                        "cItemName": "limitNum",
                        "cCaption": "字数限制",
                        "cShowCaption": "字数限制",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
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
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 12,
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
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 0,
                        "bCanModify": true,
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
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 13,
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
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 14,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType_maxInputLen": {
                        "cFieldName": "propertyType.maxInputLen",
                        "cItemName": "propertyType_maxInputLen",
                        "cCaption": "录入长度",
                        "cShowCaption": "录入长度",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 15,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_decimalDigits": {
                        "cFieldName": "propertyType.decimalDigits",
                        "cItemName": "propertyType_decimalDigits",
                        "cCaption": "小数位",
                        "cShowCaption": "小数位",
                        "iBillEntityId": 1172723,
                        "iBillTplGroupId": 4893060,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "商品订单属性表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplOrderPropertySum",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 16,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    }
                },
                "showCheckBox": false,
                "bIsNull": true,
                "showRowNo": true,
                "showAggregates": false,
                "pagination": false,
                "cShowCaption": "订单"
            }),


            'CycleProperties': new cb.models.GridModel({
                "columns": {
                    "template": {
                        "cFieldName": "template",
                        "cItemName": "template",
                        "cCaption": "模板ID",
                        "cShowCaption": "模板ID",
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 1,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType": {
                        "cFieldName": "propertyType",
                        "cItemName": "propertyType",
                        "cCaption": "属性来源",
                        "cShowCaption": "属性来源",
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "propertyType_name": {
                        "cFieldName": "propertyType.name",
                        "cItemName": "propertyType_name",
                        "cCaption": "属性名称",
                        "cShowCaption": "属性名称",
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
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
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "alias": {
                        "cFieldName": "alias",
                        "cItemName": "alias",
                        "cCaption": "属性别名",
                        "cShowCaption": "属性别名",
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 250,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "dataType": {
                        "cFieldName": "dataType",
                        "cItemName": "dataType",
                        "cCaption": "数据类型",
                        "cShowCaption": "数据类型",
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"0\":\"文本\",\"1\":\"数字\",\"2\":\"日期\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"文本\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"数字\",\"key\":\"1\"},{\"nameType\":\"text\",\"value\":\"日期\",\"key\":\"2\"}]",
                        "cEnumType": "pc_property_datatype",
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
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "showType": {
                        "cFieldName": "showType",
                        "cItemName": "showType",
                        "cCaption": "表现类型",
                        "cShowCaption": "表现类型",
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"0\":\"输入项\",\"1\":\"选择项\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"输入项\",\"key\":\"0\"},{\"nameType\":\"text\",\"value\":\"选择项\",\"key\":\"1\"}]",
                        "cEnumType": "pc_property_showtype",
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 100,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "values": {
                        "cFieldName": "values",
                        "cItemName": "values",
                        "cCaption": "属性值",
                        "cShowCaption": "属性值",
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 200,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 8,
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
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 0,
                        "bCanModify": true,
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
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 9,
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
                        "iBillEntityId": 1172720,
                        "iBillTplGroupId": 4893054,
                        "iTplId": 1172609,
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
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "周期购表格",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplCycleProperty",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "showCheckBox": false,
                "bIsNull": true,
                "showRowNo": true,
                "showAggregates": false,
                "pagination": false,
                "cShowCaption": "周期购"
            }),


            'Units': new cb.models.GridModel({
                "columns": {
                    "unit": {
                        "cFieldName": "unit",
                        "cItemName": "unit",
                        "cCaption": "主计量单位ID",
                        "cShowCaption": "主计量单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
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
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 31,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "unit_Name": {
                        "cFieldName": "unit.name",
                        "cItemName": "unit_Name",
                        "cCaption": "主计量单位",
                        "cShowCaption": "主计量单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"unit\":\"id\",\"unit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 32,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "purchaseUnit": {
                        "cFieldName": "purchaseUnit",
                        "cItemName": "purchaseUnit",
                        "cCaption": "采购单位ID",
                        "cShowCaption": "采购单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 33,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "purchaseUnit_Name": {
                        "cFieldName": "purchaseUnit.name",
                        "cItemName": "purchaseUnit_Name",
                        "cCaption": "采购单位",
                        "cShowCaption": "采购单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"purchaseUnit\":\"id\",\"purchaseUnit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "cStyle": "{\"related\":\"purchaseRate\"}",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 34,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "purchaseRate": {
                        "cFieldName": "purchaseRate",
                        "cItemName": "purchaseRate",
                        "cCaption": "采购单位换算率",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 8,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "cStyle": "{\"placeholder\":\"采购单位换算率\"}",
                        "bVmExclude": 0,
                        "iOrder": 35,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "stockUnit": {
                        "cFieldName": "stockUnit",
                        "cItemName": "stockUnit",
                        "cCaption": "库存单位ID",
                        "cShowCaption": "库存单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 36,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "stockUnit_Name": {
                        "cFieldName": "stockUnit.name",
                        "cItemName": "stockUnit_Name",
                        "cCaption": "库存单位",
                        "cShowCaption": "库存单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"stockUnit\":\"id\",\"stockUnit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "cStyle": "{\"related\":\"stockRate\"}",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 37,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "stockRate": {
                        "cFieldName": "stockRate",
                        "cItemName": "stockRate",
                        "cCaption": "库存单位换算率",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 8,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "cStyle": "{\"placeholder\":\"库存单位换算率\"}",
                        "bVmExclude": 0,
                        "iOrder": 38,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "batchPriceUnit": {
                        "cFieldName": "batchPriceUnit",
                        "cItemName": "batchPriceUnit",
                        "cCaption": "批发报价单位ID",
                        "cShowCaption": "批发报价单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 39,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "batchPriceUnit_Name": {
                        "cFieldName": "batchPriceUnit.name",
                        "cItemName": "batchPriceUnit_Name",
                        "cCaption": "批发报价单位",
                        "cShowCaption": "批发报价单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"batchPriceUnit\":\"id\",\"batchPriceUnit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "cStyle": "{\"related\":\"batchPriceRate\"}",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 40,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "batchPriceRate": {
                        "cFieldName": "batchPriceRate",
                        "cItemName": "batchPriceRate",
                        "cCaption": "批发报价单位换算率",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 8,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "cStyle": "{\"placeholder\":\"批发报价单位换算率\"}",
                        "bVmExclude": 0,
                        "iOrder": 41,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "batchUnit": {
                        "cFieldName": "batchUnit",
                        "cItemName": "batchUnit",
                        "cCaption": "批发销售单位ID",
                        "cShowCaption": "批发销售单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 42,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "batchUnit_Name": {
                        "cFieldName": "batchUnit.name",
                        "cItemName": "batchUnit_Name",
                        "cCaption": "批发销售单位",
                        "cShowCaption": "批发销售单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"batchUnit\":\"id\",\"batchUnit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "cStyle": "{\"related\":\"batchRate\"}",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 43,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "batchRate": {
                        "cFieldName": "batchRate",
                        "cItemName": "batchRate",
                        "cCaption": "批发销售单位换算率",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 8,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "cStyle": "{\"placeholder\":\"批发销售单位换算率\"}",
                        "bVmExclude": 0,
                        "iOrder": 44,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "onlineUnit": {
                        "cFieldName": "onlineUnit",
                        "cItemName": "onlineUnit",
                        "cCaption": "线上零售单位ID",
                        "cShowCaption": "线上零售单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 45,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "onlineUnit_Name": {
                        "cFieldName": "onlineUnit.name",
                        "cItemName": "onlineUnit_Name",
                        "cCaption": "线上零售单位",
                        "cShowCaption": "线上零售单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"onlineUnit\":\"id\",\"onlineUnit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "cStyle": "{\"related\":\"onlineRate\"}",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 46,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "onlineRate": {
                        "cFieldName": "onlineRate",
                        "cItemName": "onlineRate",
                        "cCaption": "线上零售单位换算率",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 8,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "cStyle": "{\"placeholder\":\"线上零售单位换算率\"}",
                        "bVmExclude": 0,
                        "iOrder": 47,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "offlineUnit": {
                        "cFieldName": "offlineUnit",
                        "cItemName": "offlineUnit",
                        "cCaption": "线下零售单位ID",
                        "cShowCaption": "线下零售单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 48,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "offlineUnit_Name": {
                        "cFieldName": "offlineUnit.name",
                        "cItemName": "offlineUnit_Name",
                        "cCaption": "线下零售单位",
                        "cShowCaption": "线下零售单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"offlineUnit\":\"id\",\"offlineUnit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "cStyle": "{\"related\":\"offlineRate\"}",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 49,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "offlineRate": {
                        "cFieldName": "offlineRate",
                        "cItemName": "offlineRate",
                        "cCaption": "线下零售单位换算率",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 8,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "cStyle": "{\"placeholder\":\"线下零售单位换算率\"}",
                        "bVmExclude": 0,
                        "iOrder": 50,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "template": {
                        "cFieldName": "template",
                        "cItemName": "template",
                        "cCaption": "商品模板id",
                        "cShowCaption": "商品模板id",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 51,
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
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 52,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "requireUnit": {
                        "cFieldName": "requireUnit",
                        "cItemName": "requireUnit",
                        "cCaption": "要货单位ID",
                        "cShowCaption": "要货单位ID",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 2,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 53,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "requireUnit_Name": {
                        "cFieldName": "requireUnit.name",
                        "cItemName": "requireUnit_Name",
                        "cCaption": "要货单位",
                        "cShowCaption": "要货单位",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "pc_unitref",
                        "cRefRetId": "{\"requireUnit\":\"id\",\"requireUnit_Name\":\"name\"}",
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "ListRefer",
                        "refReturn": "name",
                        "cStyle": "{\"related\":\"requireRate\"}",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 54,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "requireRate": {
                        "cFieldName": "requireRate",
                        "cItemName": "requireRate",
                        "cCaption": "要货单位换算率",
                        "iBillEntityId": 1172722,
                        "iBillTplGroupId": 4893058,
                        "iTplId": 1172609,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bSplit": false,
                        "bExtend": false,
                        "iNumPoint": 8,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 1,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": false,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": false,
                        "cTplGroupName": "计量单位",
                        "bMain": false,
                        "cDataSourceName": "pc.tpl.ProductTplUnit",
                        "cParentDataSource": "pc.tpl.ProductTpl",
                        "cControlType": "InputNumber",
                        "cStyle": "{\"placeholder\":\"要货单位换算率\"}",
                        "bVmExclude": 0,
                        "iOrder": 55,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    }
                },
                "showCheckBox": false,
                "bIsNull": true,
                "showRowNo": true,
                "showAggregates": false,
                "pagination": false,
                "cShowCaption": "单位"
            }),


            'states': [{
                "code": "edit",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "stopstatus",
                "condition": "data.stop==1 || data.stopstatus==1",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_order",
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
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "finalaudit",
                "condition": "data.auditor != null && data.auditor != ''",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "browse",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "add",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "editonaudit",
                "condition": "data.verifystate == 100 && mode == 'edit'",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "blank",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnMovenext",
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
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "warehousestop",
                "condition": "data.iUsed=='disable'",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "audit",
                "condition": "data.verifystate == 100",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandon",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddParamGroup",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMoveprev",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAbandonBrowst",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_order",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnMovenext",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSave",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnSaveAndAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_extend",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteSpec",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParam",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAddRow_sku",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDeleteParamGroup",
                    "cGroup": "toolbaritem"
                }]
            }],


            'params': {},

        };
        this.setData(fields);
        this.setDirty(false);



        var billType = "archive";
        var biz;
        if (billType == 'option' || billType == 'freeview') {
            biz = cb.biz.common.archive
        } else {
            biz = cb.biz.common.voucher
        }


        //common events start
        //actions

        _this.allActions = [{
            "cCommand": "cmdDeleteRow",
            "cAction": "deleteRow",
            "cSvcUrl": "/bill/deleteRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_data_edit1",
            "childrenField": "SpecSums",
            "cItemName": "btnDeleteSpec",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745467",
            "needClear": false
        }, {
            "cCommand": "cmdSaveAndAdd",
            "cAction": "saveandadd",
            "cSvcUrl": "/bill/save",
            "cHttpMethod": "POST",
            "cTarget": "footertoolbar",
            "cItemName": "btnSaveAndAdd",
            "cCaption": "保存并新增",
            "cShowCaption": "保存并新增",
            "cControlType": "primarybutton",
            "iStyle": 1,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745464",
            "needClear": false
        }, {
            "cCommand": "cmdMoveprev",
            "cAction": "moveprev",
            "cSvcUrl": "/bill/moveprev",
            "cHttpMethod": "GET",
            "cTarget": "Browstoolbar",
            "cItemName": "btnMoveprev",
            "cCaption": "上张",
            "cShowCaption": "上张",
            "cControlType": "button",
            "iStyle": 2,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745460",
            "needClear": false
        }, {
            "cCommand": "cmdAddRow",
            "cAction": "addRow",
            "cSvcUrl": "/bill/addRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_edit1",
            "childrenField": "SpecSums",
            "cItemName": "btnAddSpec",
            "cCaption": "增行",
            "cShowCaption": "增行",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745466",
            "needClear": false
        }, {
            "cCommand": "cmdAddRow_param",
            "cAction": "addRow",
            "cSvcUrl": "/bill/addRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_param",
            "childrenField": "Parameters",
            "cItemName": "btnAddParam",
            "cCaption": "新增参数",
            "cShowCaption": "新增参数",
            "cControlType": "button",
            "iStyle": 0,
            "cParameter": "param",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745469",
            "needClear": false,
            "cmdParameter": "group"
        }, {
            "cCommand": "cmdAbandon",
            "cAction": "abandon",
            "cSvcUrl": "/bill/abandon",
            "cHttpMethod": "GET",
            "cTarget": "footertoolbar",
            "cItemName": "btnAbandon",
            "cCaption": "取消",
            "cShowCaption": "取消",
            "cControlType": "button",
            "iStyle": 1,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745465",
            "needClear": false
        }, {
            "cCommand": "cmdAddRow_sku",
            "cAction": "addRow",
            "cSvcUrl": "/bill/addRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_sku",
            "childrenField": "SKUPropertySums",
            "cItemName": "btnAddRow_sku",
            "cCaption": "增行",
            "cShowCaption": "增行",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745474",
            "needClear": false
        }, {
            "cCommand": "cmdDeleteRow_extend",
            "cAction": "deleteRow",
            "cSvcUrl": "/bill/deleteRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_data_extend",
            "childrenField": "PropertySums",
            "cItemName": "btnDeleteRow_extend",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745473",
            "needClear": false
        }, {
            "cCommand": "cmdDeleteRow_order",
            "cAction": "deleteRow",
            "cSvcUrl": "/bill/deleteRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_data_order",
            "childrenField": "OrderPropertySums",
            "cItemName": "btnDeleteRow_order",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745477",
            "needClear": false
        }, {
            "cCommand": "cmdEdit",
            "cAction": "edit",
            "cSvcUrl": "/bill/edit",
            "cHttpMethod": "GET",
            "cTarget": "Browstoolbar",
            "cItemName": "btnEdit",
            "cCaption": "编辑",
            "cShowCaption": "编辑",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745458",
            "needClear": false
        }, {
            "cCommand": "cmdDeleteRow_param",
            "cAction": "deleteParameter",
            "cSvcUrl": "/bill/deleteRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_data_param",
            "childrenField": "Parameters",
            "cItemName": "btnDeleteParam",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "cParameter": "param",
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745471",
            "needClear": false,
            "cmdParameter": "group"
        }, {
            "cCommand": "cmdAddRow_order",
            "cAction": "addRow",
            "cSvcUrl": "/bill/addRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_order",
            "childrenField": "OrderPropertySums",
            "cItemName": "btnAddRow_order",
            "cCaption": "增行",
            "cShowCaption": "增行",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745476",
            "needClear": false
        }, {
            "cCommand": "cmdSave",
            "cAction": "save",
            "cSvcUrl": "/bill/save",
            "cHttpMethod": "POST",
            "cTarget": "footertoolbar",
            "cItemName": "btnSave",
            "cCaption": "保存",
            "cShowCaption": "保存",
            "cControlType": "primarybutton",
            "iStyle": 1,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745463",
            "needClear": false
        }, {
            "cCommand": "cmdMovenext",
            "cAction": "movenext",
            "cSvcUrl": "/bill/movenext",
            "cHttpMethod": "GET",
            "cTarget": "Browstoolbar",
            "cItemName": "btnMovenext",
            "cCaption": "下张",
            "cShowCaption": "下张",
            "cControlType": "button",
            "iStyle": 2,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745461",
            "needClear": false
        }, {
            "cCommand": "cmdDeleteRow_sku",
            "cAction": "deleteRow",
            "cSvcUrl": "/bill/deleteRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_data_sku",
            "childrenField": "SKUPropertySums",
            "cItemName": "btnDeleteRow_sku",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745475",
            "needClear": false
        }, {
            "cCommand": "cmdAddRow_extend",
            "cAction": "addRow",
            "cSvcUrl": "/bill/addRow",
            "cHttpMethod": "GET",
            "cTarget": "pc_producttpl_toolbar_extend",
            "childrenField": "PropertySums",
            "cItemName": "btnAddRow_extend",
            "cCaption": "增行",
            "cShowCaption": "增行",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745472",
            "needClear": false
        }, {
            "cCommand": "cmdDelete",
            "cAction": "delete",
            "cSvcUrl": "/bill/delete",
            "cHttpMethod": "POST",
            "cTarget": "Browstoolbar",
            "cItemName": "btnDelete",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "40745459",
            "needClear": false
        }];




        _this.get('btnDeleteSpec').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDeleteRow",
                "cAction": "deleteRow",
                "cSvcUrl": "/bill/deleteRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_data_edit1",
                "childrenField": "SpecSums",
                "cItemName": "btnDeleteSpec",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745467",
                "needClear": false
            }, {
                key: 'btnDeleteSpec'
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

            biz.do('deleteRow', _this, args)
        });


        _this.get('btnSaveAndAdd').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdSaveAndAdd",
                "cAction": "saveandadd",
                "cSvcUrl": "/bill/save",
                "cHttpMethod": "POST",
                "cTarget": "footertoolbar",
                "cItemName": "btnSaveAndAdd",
                "cCaption": "保存并新增",
                "cShowCaption": "保存并新增",
                "cControlType": "primarybutton",
                "iStyle": 1,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745464",
                "needClear": false
            }, {
                key: 'btnSaveAndAdd'
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

            biz.do('saveandadd', _this, args)
        });


        _this.get('btnMoveprev').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdMoveprev",
                "cAction": "moveprev",
                "cSvcUrl": "/bill/moveprev",
                "cHttpMethod": "GET",
                "cTarget": "Browstoolbar",
                "cItemName": "btnMoveprev",
                "cCaption": "上张",
                "cShowCaption": "上张",
                "cControlType": "button",
                "iStyle": 2,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745460",
                "needClear": false
            }, {
                key: 'btnMoveprev'
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

            biz.do('moveprev', _this, args)
        });


        _this.get('btnAddSpec').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAddRow",
                "cAction": "addRow",
                "cSvcUrl": "/bill/addRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_edit1",
                "childrenField": "SpecSums",
                "cItemName": "btnAddSpec",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745466",
                "needClear": false
            }, {
                key: 'btnAddSpec'
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

            biz.do('addRow', _this, args)
        });


        _this.get('btnAddParamGroup').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAddRow_param",
                "cAction": "addRow",
                "cSvcUrl": "/bill/addRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_param",
                "childrenField": "Parameters",
                "cItemName": "btnAddParamGroup",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "cParameter": "group",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745468",
                "needClear": false
            }, {
                key: 'btnAddParamGroup'
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

            biz.do('addRow', _this, args)
        });


        _this.get('btnAddParam').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAddRow_param",
                "cAction": "addRow",
                "cSvcUrl": "/bill/addRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_param",
                "childrenField": "Parameters",
                "cItemName": "btnAddParam",
                "cCaption": "新增参数",
                "cShowCaption": "新增参数",
                "cControlType": "button",
                "iStyle": 0,
                "cParameter": "param",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745469",
                "needClear": false,
                "cmdParameter": "group"
            }, {
                key: 'btnAddParam'
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

            biz.do('addRow', _this, args)
        });


        _this.get('btnAbandonBrowst').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAbandon",
                "cAction": "abandon",
                "cSvcUrl": "/bill/abandon",
                "cHttpMethod": "GET",
                "cTarget": "footertoolbar",
                "cItemName": "btnAbandonBrowst",
                "cCaption": "返回",
                "cShowCaption": "返回",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745462",
                "needClear": false
            }, {
                key: 'btnAbandonBrowst'
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


        _this.get('btnAbandon').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAbandon",
                "cAction": "abandon",
                "cSvcUrl": "/bill/abandon",
                "cHttpMethod": "GET",
                "cTarget": "footertoolbar",
                "cItemName": "btnAbandon",
                "cCaption": "取消",
                "cShowCaption": "取消",
                "cControlType": "button",
                "iStyle": 1,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745465",
                "needClear": false
            }, {
                key: 'btnAbandon'
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


        _this.get('btnAddRow_sku').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAddRow_sku",
                "cAction": "addRow",
                "cSvcUrl": "/bill/addRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_sku",
                "childrenField": "SKUPropertySums",
                "cItemName": "btnAddRow_sku",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745474",
                "needClear": false
            }, {
                key: 'btnAddRow_sku'
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

            biz.do('addRow', _this, args)
        });


        _this.get('btnDeleteRow_extend').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDeleteRow_extend",
                "cAction": "deleteRow",
                "cSvcUrl": "/bill/deleteRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_data_extend",
                "childrenField": "PropertySums",
                "cItemName": "btnDeleteRow_extend",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745473",
                "needClear": false
            }, {
                key: 'btnDeleteRow_extend'
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

            biz.do('deleteRow', _this, args)
        });


        _this.get('btnDeleteRow_order').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDeleteRow_order",
                "cAction": "deleteRow",
                "cSvcUrl": "/bill/deleteRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_data_order",
                "childrenField": "OrderPropertySums",
                "cItemName": "btnDeleteRow_order",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745477",
                "needClear": false
            }, {
                key: 'btnDeleteRow_order'
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

            biz.do('deleteRow', _this, args)
        });


        _this.get('btnEdit').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdEdit",
                "cAction": "edit",
                "cSvcUrl": "/bill/edit",
                "cHttpMethod": "GET",
                "cTarget": "Browstoolbar",
                "cItemName": "btnEdit",
                "cCaption": "编辑",
                "cShowCaption": "编辑",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745458",
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


        _this.get('btnDeleteParamGroup').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDeleteRow_param",
                "cAction": "deleteParameter",
                "cSvcUrl": "/bill/deleteRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_data_param",
                "childrenField": "Parameters",
                "cItemName": "btnDeleteParamGroup",
                "cCaption": "删除参数组",
                "cShowCaption": "删除参数组",
                "cControlType": "button",
                "iStyle": 0,
                "cParameter": "group",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745470",
                "needClear": false
            }, {
                key: 'btnDeleteParamGroup'
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

            biz.do('deleteParameter', _this, args)
        });


        _this.get('btnDeleteParam').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDeleteRow_param",
                "cAction": "deleteParameter",
                "cSvcUrl": "/bill/deleteRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_data_param",
                "childrenField": "Parameters",
                "cItemName": "btnDeleteParam",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "cParameter": "param",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745471",
                "needClear": false,
                "cmdParameter": "group"
            }, {
                key: 'btnDeleteParam'
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

            biz.do('deleteParameter', _this, args)
        });


        _this.get('btnAddRow_order').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAddRow_order",
                "cAction": "addRow",
                "cSvcUrl": "/bill/addRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_order",
                "childrenField": "OrderPropertySums",
                "cItemName": "btnAddRow_order",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745476",
                "needClear": false
            }, {
                key: 'btnAddRow_order'
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

            biz.do('addRow', _this, args)
        });


        _this.get('btnSave').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdSave",
                "cAction": "save",
                "cSvcUrl": "/bill/save",
                "cHttpMethod": "POST",
                "cTarget": "footertoolbar",
                "cItemName": "btnSave",
                "cCaption": "保存",
                "cShowCaption": "保存",
                "cControlType": "primarybutton",
                "iStyle": 1,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745463",
                "needClear": false
            }, {
                key: 'btnSave'
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


        _this.get('btnMovenext').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdMovenext",
                "cAction": "movenext",
                "cSvcUrl": "/bill/movenext",
                "cHttpMethod": "GET",
                "cTarget": "Browstoolbar",
                "cItemName": "btnMovenext",
                "cCaption": "下张",
                "cShowCaption": "下张",
                "cControlType": "button",
                "iStyle": 2,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745461",
                "needClear": false
            }, {
                key: 'btnMovenext'
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

            biz.do('movenext', _this, args)
        });


        _this.get('btnDeleteRow_sku').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDeleteRow_sku",
                "cAction": "deleteRow",
                "cSvcUrl": "/bill/deleteRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_data_sku",
                "childrenField": "SKUPropertySums",
                "cItemName": "btnDeleteRow_sku",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745475",
                "needClear": false
            }, {
                key: 'btnDeleteRow_sku'
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

            biz.do('deleteRow', _this, args)
        });


        _this.get('btnAddRow_extend').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAddRow_extend",
                "cAction": "addRow",
                "cSvcUrl": "/bill/addRow",
                "cHttpMethod": "GET",
                "cTarget": "pc_producttpl_toolbar_extend",
                "childrenField": "PropertySums",
                "cItemName": "btnAddRow_extend",
                "cCaption": "增行",
                "cShowCaption": "增行",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745472",
                "needClear": false
            }, {
                key: 'btnAddRow_extend'
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

            biz.do('addRow', _this, args)
        });


        _this.get('btnDelete').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDelete",
                "cAction": "delete",
                "cSvcUrl": "/bill/delete",
                "cHttpMethod": "POST",
                "cTarget": "Browstoolbar",
                "cItemName": "btnDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40745459",
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

            biz.do('delete', _this, args)
        });



        //check



        _this.on('columnSetting', function(params) {
            biz.do('columnSetting', _this, params);
        });
        //common events end


        var girdModelKeys = ["SpecSums", "Parameters", "PropertySums", "SKUPropertySums", "OrderPropertySums", "CycleProperties", "Units"]
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
        // if(cb.biz['PC'] && cb.biz['PC']['PC_pc_producttpl_VM_Extend']){
        //   console.info('%c PC_pc_producttpl_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['PC']['PC_pc_producttpl_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'PC/PC_pc_producttpl_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c PC_pc_producttpl_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->PC_pc_producttpl_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});