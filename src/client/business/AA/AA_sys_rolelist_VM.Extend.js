cb.define(function () {
  var AA_sys_rolelist_VM_Extend = {
    doAction: function (name, viewmodel) {
      if (this[name])
        this[name](viewmodel);
    },
    init: function (viewmodel) {
      viewmodel.on('beforeAdd', function (args) {
        // args.params.mode = args.data.mode;
        args.parentViewModel = viewmodel;
        viewmodel.communication({
          payload: {
            title: '新增角色',
            type: 'platform',
            url: 'role',
            checkReturn: true,
            data: args
          }
        });
        return false;
      });
      viewmodel.on('beforeEdit', function (args) {
        var gridData = viewmodel.getGridModel().getData();
        var id = gridData[args.params.params.index].id;
        var data = { params: { mode: "edit", dataSource: args, id: id, parentViewModel: viewmodel }, parentViewModel: viewmodel };
        viewmodel.communication({
          payload: {
            title: '编辑角色',
            type: 'platform',
            url: 'role',
            checkReturn: true,
            data: data
          }
        });
        return false;
      });
      viewmodel.on('beforeBatchdelete', function (args) {
        console.log(args);
        //alert(111);
        //return false;
      });
    }
  };

  try {
    module.exports = AA_sys_rolelist_VM_Extend;
  } catch (error) {

  }
  return AA_sys_rolelist_VM_Extend;
});
