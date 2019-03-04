import * as common from './common';
export default function html() {
  return `
     ${common.header()}

            var biz = cb.biz.common.billmaker;

             ${common.eventsListener()}

            //注册
            _this.on('filterClick',function(params){
              biz.do('search',_this,params);
            });

      ${common.footer()}
    `
}
