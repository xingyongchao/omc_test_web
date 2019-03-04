import * as common from './common';
export default function html() {
  return `
      //voucherlist
      ${common.header()}

          var biz = cb.biz.common.voucherlist;
          var billType = "<%=cBillType%>";

          ${common.eventsListener()}


          _this.on('toggle',function(params){
            biz.do('toggle',_this,params);
          });
          //注册
          _this.on('filterClick',function(params){
            biz.do('search',_this,params);
          });

       ${common.footer()}
    `
}
