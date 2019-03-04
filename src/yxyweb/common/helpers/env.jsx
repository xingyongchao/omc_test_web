const env = {
  INTERACTIVE_MODE: process.env.__TOUCH__ ? 'touch' : 'pc',
  ControlTypesByChildrenField: ['tag', 'attachment', 'checkboxgroup', 'taggroup'],
  ControlType2ModelType: {
    refer: 'ReferModel',
    treerefer: 'ReferModel',
    listrefer: 'ReferModel',
    select: 'ListModel',
    radio: 'ListModel',
    dropdown: 'ListModel',
    checkboxenum: 'ListModel',
    predicatedatepicker: 'ListModel'
  },
  HTTP_CONTENT_TYPE: {
    JSON: 'application/json',
    PDF: 'application/pdf',
    XLS: 'application/vnd.ms-excel',
    FORM: 'multipart/form-data',
  },
  //单据通用
  VOUCHER_TPL_KEY: 'tplid',
  VOUCHER_PRINT_KEY: 'printid',
  VOUCHER_STATE_BROWSE: 'browse',
  VOUCHER_STATE_ADD: 'add',
  VOUCHER_STATE_EDIT: 'edit',

  // 关于用户的ajax接口
  HTTP_USER_LOGIN: '/user/authorize',
  HTTP_USER_REG_CORP: '/user/registercorp',
  HTTP_FETCH_TREEDATA: '/getMenuTree?terminaltype=PC&token={0}',

  HTTP_OUTPUT_BILL: '/files/bill/print/outputBill?token={0}',

  //用户自定义档案
  HTTP_FETCH_USERDEF_USERDEFLIST: gen('/aa/userDef/getUserDefs?terminaltype=PC&token={0}'),
  HTTP_FETCH_USERDEF_USERDEFARCHIVEBYDEFINEID: gen('/aa/userDef/getUserDefineByDefineId?terminaltype=PC&token={0}'),
  HTTP_USERDEF_GETREFFIELDS: gen('/aa/userDef/getAAFields?terminaltype=PC&token={0}'),
  HTTP_USERDEF_UPDATEUSERDEF: gen('/aa/userDef/updateUserDef?terminaltype=PC&token={0}'),
  HTTP_USERDEF_GETSCOPETREEDATA: gen('/aa/userDef/getScopesByClassId?terminaltype=PC&token={0}'),
}

export default env

export function combine(baseurl, pathname) {
  const separator = (/\/$/.test(baseurl) === false && /^\//.test(pathname) === false) ? '/' : ''
  return Array.prototype.slice.call(arguments, 0).join(separator)
}

function gen(url) {
  return combine('/uniform', url)
}
