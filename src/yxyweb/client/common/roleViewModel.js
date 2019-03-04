cb.viewmodels.register('RoleViewModel', function (modelType) {
  var model = function (data) {
    cb.models.ContainerModel.call(this, data);
    this.init();
  };
  model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.init = function () {
    var fields = {
      save: new cb.models.SimpleModel({
        needClear: false
      }),
    };
    let params = this.getParams();
    params.billNo = "sys_rolelist";
    this.setData(fields);
    this.setDirty(false);

    this.get('save').on('click', function (args) {
      FilterViewModel_Extend.saveAction(this.getParent(), args);
    });
    this.initData();
  };

  model.prototype.initData = function () {
    if (typeof FilterViewModel_Extend == 'object')
      FilterViewModel_Extend.doAction("init_Extend", this);
  };

  return model;
});

var FilterViewModel_Extend = {
  doAction: function (name, viewModel) {
    this[name](viewModel);
  },
  init_Extend: function (viewModel) {
    var proxy = cb.rest.DynamicProxy.create({
      getAuthList: { url: '/auth/list', method: 'GET' },
      getFindAuth: { url: '/role/findRoleById', method: 'POST' },
    });
    proxy.getAuthList({}, function (err, data) {
      if (err) {
        cb.utils.alert('获取权限列表失败--' + (err ? err.message : ''), 'error');
        return;
      }
      let sens = [{
        "hasAuth": false,
        "code": "sensdata",
        "level": 1,
        "children": [
          {
            "hasAuth": false, "code": "cost", "parentCode": "sensdata", "level": 2,
            "children": [
              { "hasAuth": false, "code": "purcost", "parentCode": "cost", "level": 3, "name": "采购成本", "id": 3, "pubts": "2018-11-28 13:54:10", "isEnd": true, "isEnable": true },
              { "hasAuth": false, "code": "purcost", "parentCode": "cost", "level": 3, "name": "采购成本1", "id": 6, "pubts": "2018-11-28 13:54:10", "isEnd": true, "isEnable": true },
              { "hasAuth": false, "code": "purcost", "parentCode": "cost", "level": 3, "name": "采购成本2", "id": 7, "pubts": "2018-11-28 13:54:10", "isEnd": true, "isEnable": true }
            ], "name": "成本类", "id": 2, "pubts": "2018-11-28 13:54:10", "isEnd": false, "isEnable": true
          },
          { "hasAuth": false, "code": "cost", "parentCode": "sensdata", "level": 2, "name": "成本类1", "id": 4, "pubts": "2018-11-28 13:54:10", "isEnd": false, "isEnable": true },
          { "hasAuth": false, "code": "cost", "parentCode": "sensdata", "level": 2, "name": "成本类2", "id": 5, "pubts": "2018-11-28 13:54:10", "isEnd": false, "isEnable": true }
        ],
        "name": "敏感数据", "id": 1, "pubts": "2018-11-28 13:54:10", "isEnd": false, "isEnable": true
      }]
      // data.sensDataList = sens;
      viewModel.doPropertyChange('initRole', data);
      var params = viewModel.getParams();
      if (params.mode == 'edit') {
        proxy.getFindAuth({ 'roleId': params.id }, function (err, roleData) {
          if (err) {
            cb.utils.alert('获取角色权限失败--' + (err ? err.message : ''), 'error');
            return;
          }
          viewModel.doPropertyChange('initRoleData', roleData);
        });
      }
    });
  },
  saveAction: function (viewModel, args) {
    var self = this;
    var proxy = cb.rest.DynamicProxy.create({
      saveUserAuth: { url: '/role/save', method: 'POST', options: { token: true } }
    });
    var callback = function () {
      cb.utils.alert('保存成功！', 'success');
      if (args.type == 'saveAndAdd')
        self.init_Extend(viewModel);
      if (args.type == 'save')
        viewModel.doPropertyChange('rollBackClick');
    };
    proxy.saveUserAuth(args.args, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      callback();
    });
  },
};
