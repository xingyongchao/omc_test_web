cb.viewmodels.register('PlatformManagementViewModel', function (modelType) {
  var model = function (data) {
    cb.models.ContainerModel.call(this, data);
    this.init();
  };
  model.prototype = cb.utils.getPrototype(cb.models.ContainerModel.prototype);
  model.prototype.modelType = modelType;

  model.prototype.init = function () {
    var fields = {
      cacheType: new cb.models.ListModel({ enumArray: "[{\"nameType\":\"text\",\"value\":\"菜单\",\"key\":\"menu\"},{\"nameType\":\"text\",\"value\":\"权限\",\"key\":\"auth\"},{\"nameType\":\"text\",\"value\":\"按钮权限\",\"key\":\"actionAuth\"},{\"nameType\":\"text\",\"value\":\"规则\",\"key\":\"rule\"},{\"nameType\":\"text\",\"value\":\"选项\",\"key\":\"option\"},{\"nameType\":\"text\",\"value\":\"枚举\",\"key\":\"enum\"},{\"nameType\":\"text\",\"value\":\"ViewModel\",\"key\":\"viewmodel\"}]" }),
      refreshCache: new cb.models.SimpleModel(),
      upgradeUserDef: new cb.models.SimpleModel()
    };
    this.setData(fields);
    this.setDirty(false);

    this.get('refreshCache').on('click', function (args) {
      PlatformManagementViewModel_Extend.refreshCache(this.getParent(), args);
    });
    this.get('upgradeUserDef').on('click', function (args) {
      PlatformManagementViewModel_Extend.upgradeUserDef(this.getParent(), args);
    });
    this.initData();
  };

  model.prototype.initData = function () {
    if (typeof PlatformManagementViewModel_Extend == 'object')
      PlatformManagementViewModel_Extend.doAction('init_Extend', this);
  };

  return model;
});

var PlatformManagementViewModel_Extend = {
  doAction: function (name, viewModel) {
    this[name](viewModel);
  },
  init_Extend: function (viewModel) {
    var proxyConfig = cb.rest.DynamicProxy.create({
      refreshCache: { url: 'cache/refreshCache', method: 'GET' },
      upgradeUserDef: { url: 'aa/userDef/upgradeBillUserDef', method: 'GET' }
    });
    viewModel.setProxy(proxyConfig);
  },
  refreshCache: function (viewModel, args) {
    var types = viewModel.get('cacheType').getValue();
    viewModel.getProxy().refreshCache({ types: types.join(',') }, function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      cb.utils.alert('刷新缓存成功', 'success');
    });
  },
  upgradeUserDef: function (viewModel, args) {
    viewModel.getProxy().upgradeUserDef(function (err, result) {
      if (err) {
        cb.utils.alert(err.message, 'error');
        return;
      }
      cb.utils.alert('表单自定义项升级成功', 'success');
    });
  }
};
