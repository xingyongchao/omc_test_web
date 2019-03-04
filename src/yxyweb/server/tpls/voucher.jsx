import * as common from './common';
export default function html() {
  return `
      //<%=cBillType%>
      ${common.header()}

            var billType = "<%=cBillType%>";
            var biz ;
            if(billType == 'option' || billType == 'freeview'){
              biz= cb.biz.common.<%=cBillType%>
            }else{
              biz= cb.biz.common.voucher
            }

            ${common.eventsListener()}

            var girdModelKeys = <%=helper_filterModelKeys('GridModel',fields);%>
            if(girdModelKeys){
              girdModelKeys.forEach(function(key){
                var gridModel = _this.get(key);
                if(gridModel){
                  gridModel.on('afterCellValueChange',function(params){
                    if(params) params.childrenField = key;
                    biz.do('cellCheck',_this, params);
                  })
                }
              })
            }

      ${common.footer()}
    `
}
