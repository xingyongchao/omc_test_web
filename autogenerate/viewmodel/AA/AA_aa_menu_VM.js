//voucherlist

console.info('%c AA_aa_menu_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_menu_VM', function(modelType) {

    var model = function(data) {
        cb.models.ContainerModel.call(this, data);
        this.init();
    };
    model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
    model.prototype.modelType = modelType;

    model.prototype.init = function() {
        var _this = this;
        var fields = {


            'code': new cb.models.SimpleModel({
                "cFieldName": "code",
                "cItemName": "code",
                "cCaption": "编码",
                "cShowCaption": "菜单编码",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": false,
                "bCheck": false,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 2,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'name': new cb.models.SimpleModel({
                "cFieldName": "langs.name",
                "cItemName": "name",
                "cCaption": "名称",
                "cShowCaption": "菜单名称",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": false,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 3,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'parentCode': new cb.models.SimpleModel({
                "cFieldName": "parentCode",
                "cItemName": "parentCode",
                "cCaption": "上级菜单Code",
                "cShowCaption": "上级菜单Code",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": false,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 6,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'parent_name': new cb.models.ReferModel({
                "cFieldName": "parentCode.langs.name",
                "cItemName": "parent_name",
                "cCaption": "上级菜单名称",
                "cShowCaption": "上级菜单名称",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "cRefType": "aa_menu",
                "cRefId": "{\"parent\":\"code\"}",
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "TreeRefer",
                "refReturn": "name",
                "cStyle": "{\"refresh\":true}",
                "bVmExclude": 0,
                "iOrder": 7,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'subId': new cb.models.SimpleModel({
                "cFieldName": "subId",
                "cItemName": "subId",
                "cCaption": "模块",
                "cShowCaption": "模块",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": false,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 8,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'level': new cb.models.SimpleModel({
                "cFieldName": "level",
                "cItemName": "level",
                "cCaption": "层级",
                "cShowCaption": "层级",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": false,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "InputNumber",
                "bVmExclude": 0,
                "iOrder": 9,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'orderNum': new cb.models.SimpleModel({
                "cFieldName": "orderNum",
                "cItemName": "orderNum",
                "cCaption": "排序号",
                "cShowCaption": "排序号",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": false,
                "cOrder": "asc",
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "InputNumber",
                "bVmExclude": 0,
                "iOrder": 10,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'viewType': new cb.models.ListModel({
                "cFieldName": "viewType",
                "cItemName": "viewType",
                "cCaption": "界面类型",
                "cShowCaption": "视图类型",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": true,
                "cEnumString": "{\"meta\":\"元数据菜单\",\"platform\":\"系统组件菜单\",\"external\":\"外部地址调用\",\"ajax\":\"内部应用请求\"}",
                "enumArray": "[{\"nameType\":\"text\",\"value\":\"元数据菜单\",\"key\":\"meta\"},{\"nameType\":\"text\",\"value\":\"系统组件菜单\",\"key\":\"platform\"},{\"nameType\":\"text\",\"value\":\"外部地址调用\",\"key\":\"external\"},{\"nameType\":\"text\",\"value\":\"内部应用请求\",\"key\":\"ajax\"}]",
                "cEnumType": "menuViewType",
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Select",
                "bVmExclude": 0,
                "iOrder": 11,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'menuUrl': new cb.models.SimpleModel({
                "cFieldName": "menuUrl",
                "cItemName": "menuUrl",
                "cCaption": "菜单地址",
                "cShowCaption": "菜单地址",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 12,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'metaType': new cb.models.ListModel({
                "cFieldName": "metaType",
                "cItemName": "metaType",
                "cCaption": "元数据类型",
                "cShowCaption": "菜单类型",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": true,
                "cEnumString": "{\"voucherlist\":\"单据列表\",\"ArchiveList\":\"档案列表\",\"treeArchive\":\"树卡\",\"{\\\"type\\\":\\\"window\\\"}\":\"内部链接打开\",\"{\\\"type\\\":\\\"window\\\", \\\"mode\\\":\\\"fullscreen\\\"}\":\"自定义弹出\",\"{\\\"type\\\":\\\"iframe\\\"}\":\"自定义嵌入\"}",
                "enumArray": "[{\"nameType\":\"text\",\"value\":\"单据列表\",\"key\":\"voucherlist\"},{\"nameType\":\"text\",\"value\":\"档案列表\",\"key\":\"ArchiveList\"},{\"nameType\":\"text\",\"value\":\"树卡\",\"key\":\"treeArchive\"},{\"nameType\":\"text\",\"value\":\"内部链接打开\",\"key\":\"{\\\"type\\\":\\\"window\\\"}\"},{\"nameType\":\"text\",\"value\":\"自定义弹出\",\"key\":\"{\\\"type\\\":\\\"window\\\", \\\"mode\\\":\\\"fullscreen\\\"}\"},{\"nameType\":\"text\",\"value\":\"自定义嵌入\",\"key\":\"{\\\"type\\\":\\\"iframe\\\"}\"}]",
                "cEnumType": "menuMetaType",
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Select",
                "bVmExclude": 0,
                "iOrder": 13,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'metaKey': new cb.models.SimpleModel({
                "cFieldName": "metaKey",
                "cItemName": "metaKey",
                "cCaption": "元数据主键",
                "cShowCaption": "元数据主键",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": false,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 14,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'isEnd': new cb.models.SimpleModel({
                "cFieldName": "isEnd",
                "cItemName": "isEnd",
                "cCaption": "是否末级",
                "cShowCaption": "是否末级",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Switch",
                "bVmExclude": 0,
                "iOrder": 15,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'icon': new cb.models.SimpleModel({
                "cFieldName": "icon",
                "cItemName": "icon",
                "cCaption": "图标",
                "cShowCaption": "图标",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "avatar",
                "cStyle": "{\"displaymode\":\"logo\"}",
                "bVmExclude": 0,
                "iOrder": 16,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'isShopRelated': new cb.models.SimpleModel({
                "cFieldName": "isShopRelated",
                "cItemName": "isShopRelated",
                "cCaption": "是否门店相关",
                "cShowCaption": "是否门店相关",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "cDefaultValue": "false",
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Switch",
                "bVmExclude": 0,
                "iOrder": 17,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'propertyType': new cb.models.SimpleModel({
                "cFieldName": "propertyType",
                "cItemName": "propertyType",
                "cCaption": "行业属性",
                "cShowCaption": "行业属性",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": true,
                "cDefaultValue": "0",
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "InputNumber",
                "bVmExclude": 0,
                "iOrder": 18,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'terminalType': new cb.models.ListModel({
                "cFieldName": "terminalType",
                "cItemName": "terminalType",
                "cCaption": "终端类型",
                "cShowCaption": "终端类型",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": true,
                "cEnumString": "{\"1\":\"电脑\",\"2\":\"触屏\",\"3\":\"移动\",\"4\":\"机器人\"}",
                "enumArray": "[{\"nameType\":\"svgtext\",\"icon\":\"diannao\",\"value\":\"电脑\",\"key\":\"1\"},{\"nameType\":\"svgtext\",\"icon\":\"zhinengPOS\",\"value\":\"触屏\",\"key\":\"2\"},{\"nameType\":\"svgtext\",\"icon\":\"shouji\",\"value\":\"移动\",\"key\":\"3\"},{\"nameType\":\"svgtext\",\"icon\":\"jiqiren\",\"value\":\"机器人\",\"key\":\"4\"}]",
                "cEnumType": "terminalType",
                "bMustSelect": true,
                "bHidden": false,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": false,
                "cDefaultValue": "1",
                "bIsNull": false,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Select",
                "bVmExclude": 0,
                "iOrder": 19,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": true
            }),


            'isSystem': new cb.models.SimpleModel({
                "cFieldName": "isSystem",
                "cItemName": "isSystem",
                "cCaption": "是否是系统菜单",
                "cShowCaption": "是否是系统菜单",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": false,
                "iColWidth": 100,
                "bShowIt": true,
                "cDefaultValue": "false",
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Switch",
                "bVmExclude": 0,
                "iOrder": 20,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'authCode': new cb.models.SimpleModel({
                "cFieldName": "authCode",
                "cItemName": "authCode",
                "cCaption": "权限编码",
                "cShowCaption": "权限编码",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": false,
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "Input",
                "bVmExclude": 0,
                "iOrder": 21,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'authLevel': new cb.models.SimpleModel({
                "cFieldName": "authLevel",
                "cItemName": "authLevel",
                "cCaption": "权限级别",
                "cShowCaption": "权限级别",
                "iBillEntityId": 956754,
                "iBillTplGroupId": 3868527,
                "iTplId": 956194,
                "iFieldType": 1,
                "bEnum": false,
                "bMustSelect": true,
                "bHidden": true,
                "bCanModify": true,
                "iColWidth": 100,
                "bShowIt": false,
                "cDefaultValue": "3",
                "bIsNull": true,
                "cTplGroupName": "Menu",
                "bMain": true,
                "cDataSourceName": "sys.menu.Menu",
                "cControlType": "InputNumber",
                "bVmExclude": 0,
                "iOrder": 22,
                "isshoprelated": false,
                "iSystem": 1,
                "authLevel": 5,
                "isExport": false
            }),


            'btnAdd': new cb.models.SimpleModel({
                "cItemName": "btnAdd",
                "cCaption": "新增",
                "cShowCaption": "新增",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAdd",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35923223",
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
                "key": "35923224",
                "needClear": false
            }),


            'btnSave': new cb.models.SimpleModel({
                "cItemName": "btnSave",
                "cCaption": "保存",
                "cShowCaption": "保存",
                "cControlType": "primarybutton",
                "iStyle": 0,
                "cCommand": "cmdSave",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35923225",
                "needClear": false
            }),


            'btnAbandon': new cb.models.SimpleModel({
                "cItemName": "btnAbandon",
                "cCaption": "取消",
                "cShowCaption": "取消",
                "cControlType": "button",
                "iStyle": 0,
                "cCommand": "cmdAbandon",
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35923226",
                "needClear": false
            }),


            'aa_menu': new cb.models.TreeModel({
                "columns": {
                    "code": {
                        "cFieldName": "code",
                        "cItemName": "code",
                        "cCaption": "编码",
                        "cShowCaption": "菜单编码",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": false,
                        "bCheck": false,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "name": {
                        "cFieldName": "langs.name",
                        "cItemName": "name",
                        "cCaption": "名称",
                        "cShowCaption": "菜单名称",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": false,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "parentCode": {
                        "cFieldName": "parentCode",
                        "cItemName": "parentCode",
                        "cCaption": "上级菜单Code",
                        "cShowCaption": "上级菜单Code",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "parent_name": {
                        "cFieldName": "parentCode.langs.name",
                        "cItemName": "parent_name",
                        "cCaption": "上级菜单名称",
                        "cShowCaption": "上级菜单名称",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "cRefType": "aa_menu",
                        "cRefId": "{\"parent\":\"code\"}",
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "TreeRefer",
                        "refReturn": "name",
                        "cStyle": "{\"refresh\":true}",
                        "bVmExclude": 0,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "subId": {
                        "cFieldName": "subId",
                        "cItemName": "subId",
                        "cCaption": "模块",
                        "cShowCaption": "模块",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "level": {
                        "cFieldName": "level",
                        "cItemName": "level",
                        "cCaption": "层级",
                        "cShowCaption": "层级",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "orderNum": {
                        "cFieldName": "orderNum",
                        "cItemName": "orderNum",
                        "cCaption": "排序号",
                        "cShowCaption": "排序号",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": false,
                        "cOrder": "asc",
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "viewType": {
                        "cFieldName": "viewType",
                        "cItemName": "viewType",
                        "cCaption": "界面类型",
                        "cShowCaption": "视图类型",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"meta\":\"元数据菜单\",\"platform\":\"系统组件菜单\",\"external\":\"外部地址调用\",\"ajax\":\"内部应用请求\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"元数据菜单\",\"key\":\"meta\"},{\"nameType\":\"text\",\"value\":\"系统组件菜单\",\"key\":\"platform\"},{\"nameType\":\"text\",\"value\":\"外部地址调用\",\"key\":\"external\"},{\"nameType\":\"text\",\"value\":\"内部应用请求\",\"key\":\"ajax\"}]",
                        "cEnumType": "menuViewType",
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 11,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "menuUrl": {
                        "cFieldName": "menuUrl",
                        "cItemName": "menuUrl",
                        "cCaption": "菜单地址",
                        "cShowCaption": "菜单地址",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 12,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "metaType": {
                        "cFieldName": "metaType",
                        "cItemName": "metaType",
                        "cCaption": "元数据类型",
                        "cShowCaption": "菜单类型",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"voucherlist\":\"单据列表\",\"ArchiveList\":\"档案列表\",\"treeArchive\":\"树卡\",\"{\\\"type\\\":\\\"window\\\"}\":\"内部链接打开\",\"{\\\"type\\\":\\\"window\\\", \\\"mode\\\":\\\"fullscreen\\\"}\":\"自定义弹出\",\"{\\\"type\\\":\\\"iframe\\\"}\":\"自定义嵌入\"}",
                        "enumArray": "[{\"nameType\":\"text\",\"value\":\"单据列表\",\"key\":\"voucherlist\"},{\"nameType\":\"text\",\"value\":\"档案列表\",\"key\":\"ArchiveList\"},{\"nameType\":\"text\",\"value\":\"树卡\",\"key\":\"treeArchive\"},{\"nameType\":\"text\",\"value\":\"内部链接打开\",\"key\":\"{\\\"type\\\":\\\"window\\\"}\"},{\"nameType\":\"text\",\"value\":\"自定义弹出\",\"key\":\"{\\\"type\\\":\\\"window\\\", \\\"mode\\\":\\\"fullscreen\\\"}\"},{\"nameType\":\"text\",\"value\":\"自定义嵌入\",\"key\":\"{\\\"type\\\":\\\"iframe\\\"}\"}]",
                        "cEnumType": "menuMetaType",
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 13,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "metaKey": {
                        "cFieldName": "metaKey",
                        "cItemName": "metaKey",
                        "cCaption": "元数据主键",
                        "cShowCaption": "元数据主键",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 14,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "isEnd": {
                        "cFieldName": "isEnd",
                        "cItemName": "isEnd",
                        "cCaption": "是否末级",
                        "cShowCaption": "是否末级",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 15,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "icon": {
                        "cFieldName": "icon",
                        "cItemName": "icon",
                        "cCaption": "图标",
                        "cShowCaption": "图标",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "avatar",
                        "cStyle": "{\"displaymode\":\"logo\"}",
                        "bVmExclude": 0,
                        "iOrder": 16,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isShopRelated": {
                        "cFieldName": "isShopRelated",
                        "cItemName": "isShopRelated",
                        "cCaption": "是否门店相关",
                        "cShowCaption": "是否门店相关",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 17,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "propertyType": {
                        "cFieldName": "propertyType",
                        "cItemName": "propertyType",
                        "cCaption": "行业属性",
                        "cShowCaption": "行业属性",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "cDefaultValue": "0",
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 18,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "terminalType": {
                        "cFieldName": "terminalType",
                        "cItemName": "terminalType",
                        "cCaption": "终端类型",
                        "cShowCaption": "终端类型",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": true,
                        "cEnumString": "{\"1\":\"电脑\",\"2\":\"触屏\",\"3\":\"移动\",\"4\":\"机器人\"}",
                        "enumArray": "[{\"nameType\":\"svgtext\",\"icon\":\"diannao\",\"value\":\"电脑\",\"key\":\"1\"},{\"nameType\":\"svgtext\",\"icon\":\"zhinengPOS\",\"value\":\"触屏\",\"key\":\"2\"},{\"nameType\":\"svgtext\",\"icon\":\"shouji\",\"value\":\"移动\",\"key\":\"3\"},{\"nameType\":\"svgtext\",\"icon\":\"jiqiren\",\"value\":\"机器人\",\"key\":\"4\"}]",
                        "cEnumType": "terminalType",
                        "bMustSelect": true,
                        "bHidden": false,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "cDefaultValue": "1",
                        "bIsNull": false,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "iOrder": 19,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "isSystem": {
                        "cFieldName": "isSystem",
                        "cItemName": "isSystem",
                        "cCaption": "是否是系统菜单",
                        "cShowCaption": "是否是系统菜单",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 100,
                        "bShowIt": true,
                        "cDefaultValue": "false",
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Switch",
                        "bVmExclude": 0,
                        "iOrder": 20,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "authCode": {
                        "cFieldName": "authCode",
                        "cItemName": "authCode",
                        "cCaption": "权限编码",
                        "cShowCaption": "权限编码",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "iOrder": 21,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    },
                    "authLevel": {
                        "cFieldName": "authLevel",
                        "cItemName": "authLevel",
                        "cCaption": "权限级别",
                        "cShowCaption": "权限级别",
                        "iBillEntityId": 956754,
                        "iBillTplGroupId": 3868527,
                        "iTplId": 956194,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": true,
                        "iColWidth": 100,
                        "bShowIt": false,
                        "cDefaultValue": "3",
                        "bIsNull": true,
                        "cTplGroupName": "Menu",
                        "bMain": true,
                        "cDataSourceName": "sys.menu.Menu",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "iOrder": 22,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": false
                    }
                },
                "dataSourceMode": "remote",
                "keyField": "code",
                "parentField": "parentCode",
                "needClear": false,
                "titleField": "name"
            }),


            'params': {
                "billNo": "aa_menu",
                "billType": "TreeArchive",
                "treeName": "sys.menu.Menu",
                "hasChildren": true
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [{
            "cCommand": "cmdDetail",
            "cAction": "detail",
            "cSvcUrl": "/bill/detail.do",
            "cHttpMethod": "GET"
        }, {
            "cCommand": "cmdCheck_code",
            "cAction": "check",
            "cSvcUrl": "/bill/check",
            "cHttpMethod": "POST"
        }, {
            "cCommand": "cmdDelete",
            "cAction": "delete",
            "cSvcUrl": "/bill/delete",
            "cHttpMethod": "POST",
            "cItemName": "btnDelete",
            "cCaption": "删除",
            "cShowCaption": "删除",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35923224",
            "needClear": false
        }, {
            "cCommand": "cmdAdd",
            "cAction": "add",
            "cSvcUrl": "/bill/add",
            "cHttpMethod": "POST",
            "cItemName": "btnAdd",
            "cCaption": "新增",
            "cShowCaption": "新增",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35923223",
            "needClear": false
        }, {
            "cCommand": "cmdQueryTree",
            "cAction": "querytree",
            "cSvcUrl": "/bill/querytree",
            "cHttpMethod": "POST"
        }, {
            "cCommand": "cmdAbandon",
            "cAction": "abandon",
            "cSvcUrl": "/bill/abandon",
            "cHttpMethod": "GET",
            "cItemName": "btnAbandon",
            "cCaption": "取消",
            "cShowCaption": "取消",
            "cControlType": "button",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35923226",
            "needClear": false
        }, {
            "cCommand": "cmdGetRefData",
            "cAction": "getRefData",
            "cSvcUrl": "/bill/getrefdata",
            "cHttpMethod": "POST"
        }, {
            "cCommand": "cmdSave",
            "cAction": "save",
            "cSvcUrl": "/bill/save",
            "cHttpMethod": "POST",
            "cItemName": "btnSave",
            "cCaption": "保存",
            "cShowCaption": "保存",
            "cControlType": "primarybutton",
            "iStyle": 0,
            "bVmExclude": 0,
            "iOrder": 0,
            "key": "35923225",
            "needClear": false
        }, {
            "cCommand": "cmdCheck_name",
            "cAction": "check",
            "cSvcUrl": "/bill/check",
            "cHttpMethod": "POST"
        }];




        _this.get('btnDelete').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdDelete",
                "cAction": "delete",
                "cSvcUrl": "/bill/delete",
                "cHttpMethod": "POST",
                "cItemName": "btnDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35923224",
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


        _this.get('btnAdd').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAdd",
                "cAction": "add",
                "cSvcUrl": "/bill/add",
                "cHttpMethod": "POST",
                "cItemName": "btnAdd",
                "cCaption": "新增",
                "cShowCaption": "新增",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35923223",
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


        _this.get('btnAbandon').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdAbandon",
                "cAction": "abandon",
                "cSvcUrl": "/bill/abandon",
                "cHttpMethod": "GET",
                "cItemName": "btnAbandon",
                "cCaption": "取消",
                "cShowCaption": "取消",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35923226",
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


        _this.get('btnSave').on('click', function(params) {
            var args = cb.utils.extend(true, {}, {
                "cCommand": "cmdSave",
                "cAction": "save",
                "cSvcUrl": "/bill/save",
                "cHttpMethod": "POST",
                "cItemName": "btnSave",
                "cCaption": "保存",
                "cShowCaption": "保存",
                "cControlType": "primarybutton",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "35923225",
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
        // if(cb.biz['AA'] && cb.biz['AA']['AA_aa_menu_VM_Extend']){
        //   console.info('%c AA_aa_menu_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_aa_menu_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_aa_menu_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_aa_menu_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_aa_menu_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});