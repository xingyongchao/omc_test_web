//voucherlist

console.info('%c AA_aa_positionlist_VM js init', 'color:green');
cb.viewmodels.register('AA_aa_positionlist_VM', function(modelType) {

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
                "key": "40861091",
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
                "key": "40861092",
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
                "key": "40861093",
                "needClear": false
            }),


            'aa_positionlist': new cb.models.GridModel({
                "columns": {
                    "code": {
                        "cFieldName": "code",
                        "cItemName": "code",
                        "cCaption": "编码",
                        "cShowCaption": "编码",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
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
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": true,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
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
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
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
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": true,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 2,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "department": {
                        "cFieldName": "department",
                        "cItemName": "department",
                        "cCaption": "部门Id",
                        "cShowCaption": "部门Id",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 3,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "department_name": {
                        "cFieldName": "department.name",
                        "cItemName": "department_name",
                        "cCaption": "部门名称",
                        "cShowCaption": "部门名称",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
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
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 4,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "pPosition": {
                        "cFieldName": "pPosition",
                        "cItemName": "pPosition",
                        "cCaption": "上级职位Id",
                        "cShowCaption": "上级职位Id",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 5,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "pPosition_name": {
                        "cFieldName": "pPosition.name",
                        "cItemName": "pPosition_name",
                        "cCaption": "上级职位",
                        "cShowCaption": "上级职位",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
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
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 6,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "dutyclass": {
                        "cFieldName": "dutyclass",
                        "cItemName": "dutyclass",
                        "cCaption": "职务类别Id",
                        "cShowCaption": "职务类别Id",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 7,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "dutyclass.name": {
                        "cFieldName": "dutyclass.name",
                        "cItemName": "dutyclass.name",
                        "cCaption": "职务类别",
                        "cShowCaption": "职务类别",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
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
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 8,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "duty": {
                        "cFieldName": "duty",
                        "cItemName": "duty",
                        "cCaption": "职务Id",
                        "cShowCaption": "职务Id",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 9,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "duty.name": {
                        "cFieldName": "duty.name",
                        "cItemName": "duty.name",
                        "cCaption": "职务",
                        "cShowCaption": "职务",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
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
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 10,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "dutyrank": {
                        "cFieldName": "dutyrank",
                        "cItemName": "dutyrank",
                        "cCaption": "职务级别Id",
                        "cShowCaption": "职务级别Id",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 11,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "dutyrank.name": {
                        "cFieldName": "dutyrank.name",
                        "cItemName": "dutyrank.name",
                        "cCaption": "职务级别",
                        "cShowCaption": "职务级别",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
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
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 12,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "maxDutyGrade": {
                        "cFieldName": "maxDutyGrade",
                        "cItemName": "maxDutyGrade",
                        "cCaption": "最高职等Id",
                        "cShowCaption": "最高职等Id",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 13,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "maxDutyGrade.name": {
                        "cFieldName": "maxDutyGrade.name",
                        "cItemName": "maxDutyGrade.name",
                        "cCaption": "最高职等",
                        "cShowCaption": "最高职等",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
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
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 14,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "minDutyGrade": {
                        "cFieldName": "minDutyGrade",
                        "cItemName": "minDutyGrade",
                        "cCaption": "最低职等Id",
                        "cShowCaption": "最低职等Id",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": false,
                        "bHidden": true,
                        "bSplit": false,
                        "bExtend": false,
                        "bCanModify": true,
                        "iMaxShowLen": 255,
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": false,
                        "bFilter": true,
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 15,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "minDutyGrade.name": {
                        "cFieldName": "minDutyGrade.name",
                        "cItemName": "minDutyGrade.name",
                        "cCaption": "最低职等",
                        "cShowCaption": "最低职等",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 255,
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
                        "bIsNull": true,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 16,
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
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
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
                        "iColWidth": 150,
                        "bNeedSum": false,
                        "bShowIt": true,
                        "bFilter": false,
                        "bIsNull": false,
                        "bPrintCaption": true,
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "cOrder": "asc",
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Select",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 17,
                        "isshoprelated": false,
                        "iSystem": 1,
                        "authLevel": 5,
                        "isExport": true
                    },
                    "workDuties": {
                        "cFieldName": "workDuties",
                        "cItemName": "workDuties",
                        "cCaption": "工作职责",
                        "cShowCaption": "工作职责",
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
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
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": true,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 18,
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
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
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
                        "bJointQuery": true,
                        "bPrintUpCase": false,
                        "bSelfDefine": false,
                        "bCheck": true,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 19,
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
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 300,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 150,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "InputNumber",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 20,
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
                        "iBillEntityId": 1214881,
                        "iBillTplGroupId": 5038091,
                        "iTplId": 1212265,
                        "iMaxLength": 300,
                        "iFieldType": 1,
                        "bEnum": false,
                        "bMustSelect": true,
                        "bHidden": true,
                        "bCanModify": false,
                        "iColWidth": 150,
                        "bShowIt": false,
                        "bFilter": false,
                        "bIsNull": false,
                        "cTplGroupName": "Table",
                        "bMain": true,
                        "cDataSourceName": "aa.position.Position",
                        "cControlType": "Input",
                        "bVmExclude": 0,
                        "multiple": false,
                        "iOrder": 21,
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


            'states': [{
                "code": "stopstatus",
                "condition": "data.stop==1 || data.stopstatus==1",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "warehousestop",
                "condition": "data.iUsed=='disable'",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "editonaudit",
                "condition": "data.verifystate == 100 && mode == 'edit'",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "add",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "finalaudit",
                "condition": "data.auditor != null && data.auditor != ''",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
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
                }]
            }, {
                "code": "blank",
                "items": [{
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
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "edit",
                "items": [{
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": false,
                    "bEnable": false,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "browse",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnDelete",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
                    "cGroup": "toolbaritem"
                }, {
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnEdit",
                    "cGroup": "toolbaritem"
                }]
            }, {
                "code": "audit",
                "condition": "data.verifystate == 100",
                "items": [{
                    "bVisible": true,
                    "bEnable": true,
                    "cName": "btnAdd",
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
                }]
            }],


            'params': {
                "billNo": "aa_positionlist",
                "billType": "ArchiveList",
                "filterId": "39951946"
            },

        };
        this.setData(fields);
        this.setDirty(false);



        var biz = cb.biz.common.voucherlist;
        var billType = "";


        //common events start
        //actions

        _this.allActions = [{
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
            "key": "40861092",
            "needClear": false
        }, {
            "cCommand": "cmdList",
            "cAction": "list",
            "cSvcUrl": "/bill/list",
            "cHttpMethod": "POST"
        }, {
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
            "key": "40861091",
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
            "key": "40861093",
            "needClear": false
        }];




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
                "key": "40861092",
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
                "key": "40861091",
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
                "cItemName": "btnDelete",
                "cCaption": "删除",
                "cShowCaption": "删除",
                "cControlType": "button",
                "iStyle": 0,
                "bVmExclude": 0,
                "iOrder": 0,
                "key": "40861093",
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
        // if(cb.biz['AA'] && cb.biz['AA']['AA_aa_positionlist_VM_Extend']){
        //   console.info('%c AA_aa_positionlist_VM_Extend extendjs doAction', 'color:green');
        //   cb.biz['AA']['AA_aa_positionlist_VM_Extend'].doAction("init", this);
        // }else{
        //   console.log('%c no extend js' , 'font-size:22pt;color:red');
        // }
        var self = this;
        var extendFile = 'AA/AA_aa_positionlist_VM.Extend.js';
        cb.require([extendFile], function(extend) {
            console.info('%c AA_aa_positionlist_VM_Extend extendjs doAction', 'color:green');
            extend.doAction("init", self);
            self.execute('extendReady', self);
        }, function(error) {
            console.info('%c 未找到  ' + extendFile, 'font-size:12pt;color:#860786');
            console.info('%c extendVmName-->AA_aa_positionlist_VM_Extend', 'font-size:12pt;color:#860786')
            self.execute('extendReady', self);
        });
    };

    return model;
});