import * as tpls from '../tpls'

export const getVmTpl = (meta) => {
  let data = {};
  let billType = !!meta && meta.code == 200 && meta.data.viewApplication.cBillType;
  if (billType) {
    billType = billType.replace(/(\w)/, function (v) { return v.toUpperCase() })
  } else {
    data.msg = 'billType 未录入';
  }
  // console.log(billType);
  const billTypes = new Set(['VoucherList', 'EditableVoucherList', 'ArchiveList', 'TreeList', 'TreeArchive', 'Archive', 'Voucher', 'Option', 'Compare', 'BillMaker', 'FreeView'])
  switch (billType) {
    case 'VoucherList'://单据列表
    case 'ArchiveList'://档案列表
    case 'TreeList'://树表
    case 'Report'://报表
      billType = 'VoucherList';
      break;
    case 'TreeArchive'://左树右卡
      billType = 'TreeArchive';
      break;
    case 'Archive'://卡片
    case 'Voucher'://单据
    case 'EditableVoucherList'://可编辑列表
      billType = 'Voucher';
      break;
    case 'Option':   //选项卡
      billType = 'Option';
      break;
    case 'Compare'://对照 树卡表
      billType = 'Compare';
      break;
    case 'BillMaker':
      billType = 'BillMaker';
      break;
    case 'FreeView':
      billType = 'FreeView';
      break;
  }
  if (billTypes.has(billType)) {
    data.tpl = tpls[billType]();
  } else {
    data.msg = billType + '不存在, cBillType 只允许是' + Array.from(billTypes).toString();
  }
  return data
}
export const doFetch = (url, options) => {
  return fetch(url, options)
    .then(function (response) {
      if (response.status >= 400) {
        return {
          code: response.status,
          message: response.url + response.statusText,
          response: response
        };
      }
      return response.json()
    })
    .then(function (data) {
      if (data.code != 200) {
        return {
          code: data.code,
          message: data.message
        }
      }
      else {
        return data;
      }
    })
    .catch(function (ex) {
      return { code: 404, message: JSON.stringify(ex) };
    });
}
export const isEmptyObject = (e) => {
  var t;
  for (t in e)
    return !1;
  return !0
}
