'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavBar = require('../../../../mobile/components/NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _util = require('../../../helpers/util');

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _mobileReportSum = require('./mobileReportSum');

var _mobileReportSum2 = _interopRequireDefault(_mobileReportSum);

var _mobileData = require('./mobileData');

var _mobileData2 = _interopRequireDefault(_mobileData);

var _mobileTest = require('./mobileTest');

var _mobileTest2 = _interopRequireDefault(_mobileTest);

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _antdMobile = require('antd-mobile');

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _mobileFilter = require('./mobileFilter');

var _mobileFilter2 = _interopRequireDefault(_mobileFilter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Switch,


require('../../../../../mobile/styles/globalCss/reportForm.css');

var Item = _antdMobile.Popover.Item;

var mobileReport = function (_Component) {
  _inherits(mobileReport, _Component);

  function mobileReport(props) {
    _classCallCheck(this, mobileReport);

    var _this = _possibleConstructorReturn(this, (mobileReport.__proto__ || Object.getPrototypeOf(mobileReport)).call(this, props));

    _this.onSelect = function (opt) {
      // this.setState({
      //   bShowGroupList: false,

      // });
      _this.getGroupSetting(opt.key, opt.props.value);
    };

    _this.handleVisibleChange = function (visible) {
      _this.setState({
        bShowGroupList: visible
      });
    };

    _this.isTest = false;

    // cb.utils.setStatusBarStyle("dark");
    var params = props.viewModel.getParams();
    var viewid = _.get(params, 'query.viewid');
    _this.state = {
      billnum: params.billNo ? params.billNo : "rm_saleanalysis",
      filterId: params.filterId ? params.filterId : 14414907,
      titleName: params.caption ? params.caption : '移动报表',
      groupSchemaId: null,
      groupSchemaName: null,
      groupInfo: {},
      solutionId: 0,
      dateRefIndex: 0,
      bSwitchChartTable: true,
      bSwitchTables: true,
      bShowGroupList: false,
      condition: null,
      firstQueryDone: false,
      sumFieldsCount: 0,
      viewid: viewid ? viewid : 0
    };
    _this.innerWidth = window ? window.innerWidth : 375;
    _this.innerHeight = window ? window.innerHeight : 667;
    _this.GroupSchemaArr = [];
    _this.urlConfig = {
      getGroupSchemaList: { url: 'report/getGroupSchema', method: 'GET' },
      getGroupSetting: { url: 'report/getGroupSetting', method: 'GET' },
      getSolutionList: { url: 'filterDesign/getSolutionList', method: 'POST' }
    };
    return _this;
  }

  _createClass(mobileReport, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.webViewEventHand.cancelEvent(null);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.billnum != nextState.billnum || this.state.filterId != nextState.filterId || this.state.groupSchemaId != nextState.groupSchemaId || this.state.groupInfo != nextState.groupInfo || this.state.solutionId != nextState.solutionId || this.state.dateRefIndex != nextState.dateRefIndex || this.state.bSwitchChartTable != nextState.bSwitchChartTable || this.state.bSwitchTables != nextState.bSwitchTables || this.state.bShowGroupList != nextState.bShowGroupList) return true;else return false;
    }
  }, {
    key: 'getDisplayType',
    value: function getDisplayType() {
      return this.state.groupInfo.displayType;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.viewModel) {
        this.props.viewModel.on('firstQueryDone', function (params) {
          _this2.state.firstQueryDone = params;
        });

        this.props.viewModel.on("filterClick", function (params) {
          _this2.state.condition = params.condition;
        });

        this.groupSchemasMeta = {
          cControlType: 'Select',
          modelType: 'ListModel',
          cItemName: 'groupSchemas',
          valueField: 'id',
          textField: 'name'
        };
        this.props.viewModel.addProperty(this.groupSchemasMeta.cItemName, new cb.models[this.groupSchemasMeta.modelType](this.groupSchemasMeta));
      }
      var self = this;
      this.getGroupSchemaList();
      this.getSolutionList();
      /*add by jinzh1  监听返回键*/
      window.webViewEventHand.addEvent('SettleDetailBack', function (callback) {
        self.setScreenOrientation(true);
        self.setState({ bSwitchChartTable: true, bSwitchTables: true });
      }.bind(this));
    }
    // tmpFunc() {
    //   let self = this;
    //   self.setScreenOrientation(true);
    //   self.state.bSwitchChartTable = true;
    //   self.state.bSwitchTables = true;
    //   self.forceUpdate();
    // }

  }, {
    key: 'getSwitch',
    value: function getSwitch() {
      var self = this;
      var tmpSwitch = void 0;
      if (this.getDisplayType() == 1) //表横竖
        {
          tmpSwitch = _react2.default.createElement(
            'div',
            { className: "mobileReport_SwitchButton mobileReport_SwitchButton1 mobileReport_SwitchButton_" + (self.getIsVertical() == true ? "Vertical" : "Horizontal") },
            _react2.default.createElement(
              _antdMobile.Button,
              {
                disabled: this.state.bSwitchTables,
                onClick: function onClick() {
                  return self.onTablesSwitchChange();
                },
                className: this.state.bSwitchTables == true ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'
              },
              '\u7AD6'
            ),
            _react2.default.createElement(
              _antdMobile.Button,
              {
                disabled: !this.state.bSwitchTables,
                onClick: function onClick() {
                  return self.onTablesSwitchChange();
                },
                className: this.state.bSwitchTables === false ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'
              },
              '\u6A2A'
            )
          );
        } else if (this.getDisplayType() == 3) //表和图
        {
          tmpSwitch = _react2.default.createElement(
            'div',
            { className: "mobileReport_SwitchButton mobileReport_SwitchButton3  mobileReport_SwitchButton_" + (self.getIsVertical() == true ? "Vertical" : "Horizontal") },
            _react2.default.createElement(
              _antdMobile.Button,
              {
                disabled: this.state.bSwitchChartTable,
                onClick: function onClick() {
                  return self.onChartTableSwitchChange();
                },
                className: this.state.bSwitchChartTable === true ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'
              },
              '\u56FE'
            ),
            _react2.default.createElement(
              _antdMobile.Button,
              {
                disabled: !this.state.bSwitchChartTable,
                onClick: function onClick() {
                  return self.onChartTableSwitchChange();
                },
                className: this.state.bSwitchChartTable === false ? 'mobileReport_ButtonSelected ' : 'mobileReport_ButtonUnSelected'
              },
              '\u8868'
            )
          );
        }
      return tmpSwitch;
    }
  }, {
    key: 'onChartTableSwitchChange',
    value: function onChartTableSwitchChange() {

      if (window.plus && window.plus.screen && window.plus.screen.lockOrientation) {
        if (this.state.bSwitchChartTable === true) {
          this.setScreenOrientation(false);
        } else {
          this.setScreenOrientation(true);
        }
      }
      this.setState({ bSwitchChartTable: !this.state.bSwitchChartTable });
      // this.state.bSwitchChartTable = !this.state.bSwitchChartTable;
      // this.forceUpdate();
      // cb.utils.Toast('onChartTableSwitchChange ', 'fail');
    }
    // Screen.lockOrientation() 方法接受屏幕的方向字符串或字符串数组为参数，可选参数为：
    // portrait-primary
    // Portrait模式, Home键在下边
    // portrait-secondary
    // Portrait模式, Home键在上边
    // landscape-primary
    // Landscape模式, Home键在右边
    // landscape-secondary
    // Landscap模式, Home键在左边

  }, {
    key: 'setScreenOrientation',
    value: function setScreenOrientation(bVertical) {
      //需要判断安卓IOS
      if (cb.utils.isIos() == true) {
        if (bVertical) {
          window.plus.screen.lockOrientation("portrait-primary"); //仅支持竖屏显示
          cb.events.execute('lockOrientation', false);
          cb.utils.setStatusBarStyle("light");
        } else {
          window.plus.screen.lockOrientation("landscape-secondary"); //仅支持横屏显示
          cb.events.execute('lockOrientation', true);
          cb.utils.setStatusBarStyle("dark");
        }
      } else {
        if (bVertical) {
          window.plus.screen.lockOrientation("portrait-primary"); //仅支持竖屏显示
          cb.events.execute('lockOrientation', false);
          cb.utils.setStatusBarStyle("light");
        } else {
          window.plus.screen.lockOrientation("landscape-primary"); //仅支持横屏显示
          cb.events.execute('lockOrientation', true);
          cb.utils.setStatusBarStyle("dark");
        }
      }
    }
  }, {
    key: 'onTablesSwitchChange',
    value: function onTablesSwitchChange() {
      if (window.plus && window.plus.screen && window.plus.screen.lockOrientation) {
        if (this.state.bSwitchTables === true) {
          this.setScreenOrientation(false);
        } else {
          this.setScreenOrientation(true);
        }
      }
      this.setState({ bSwitchTables: !this.state.bSwitchTables });
      // this.state.bSwitchTables = !this.state.bSwitchTables;
      // this.forceUpdate();
      // cb.utils.Toast('onTablesSwitchChange ', 'fail');
    }
  }, {
    key: 'getGroupSchemaList',
    value: function getGroupSchemaList() {
      var _this3 = this;

      var self = this;
      if (self.GroupSchemaArr.length > 0) return null;
      var billnum = this.state.billnum;

      var proxyParams = { billnum: billnum };
      if (self.state.viewid) proxyParams.viewid = self.state.viewid;
      var callback = function callback(json) {
        var bFlag = false;
        if (json.code === 200 && json.data && json.data.length > 0) {
          var conditionList = _.filter(json.data, function (o) {
            return o.isMobile == true || !!proxyParams.viewid;
          });

          // if (self.state.viewid)
          //   conditionList = _.filter(conditionList, function (o) { return o.id == self.state.viewid });


          // let conditionList = json.data;
          if (conditionList && conditionList.length > 0) {
            bFlag = true;
            var groupSchemaId = 0;
            var groupSchemaName = "";
            self.props.viewModel.setCache('queryItems', ['filter', 'schema']);
            self.GroupSchemaArr = conditionList;
            var def = _.find(conditionList, function (o) {
              return o.isDefault == true;
            }) || conditionList[0];
            var userId = cb.rest.AppContext.user.id;
            try {
              var localData = JSON.parse(localStorage.getItem(billnum + '_' + userId));
              var localDefaultId = localData && localData.groupSchemaId;
              if (localDefaultId) {
                var localDefaultGroupSchema = conditionList.find(function (item) {
                  return item.id == localDefaultId;
                });
                if (localDefaultGroupSchema) def = localDefaultGroupSchema;
              }
            } catch (e) {}
            groupSchemaId = def && def.id;
            groupSchemaName = def && def.name;
            self.getGroupSetting(groupSchemaId, groupSchemaName);
          }
        }
        if (bFlag == false) {
          var groupState = { groupSchemaId: "", groupSchemaName: "", groupInfo: { displayType: 1 }, bShowGroupList: false };
          _this3.setState(groupState);
          self.props.viewModel.setCache('queryItems', ['filter']);

          // console.log("移动报表 获取分组条件失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
        }
      };
      self.doProxy(this.urlConfig.getGroupSchemaList, proxyParams, callback);
    }
  }, {
    key: 'switchGroupSchema',
    value: function switchGroupSchema(id, name) {
      var viewModel = this.props.viewModel;


      var tmp = [];
      if (id) {
        tmp.push({ id: id, name: name });
        var obj = viewModel.get('groupSchemas');
        if (obj) {
          obj.setDataSource(tmp);
          obj.setValue(id);
          viewModel.biz.do("switchGroupSchema", viewModel, { groupSchemaId: id, groupSchemaName: name });
          var billnum = this.state.billnum;

          var userId = cb.rest.AppContext.user.id;
          var localDataKey = billnum + '_' + userId;
          var localData = void 0;
          try {
            localData = JSON.parse(localStorage.getItem(localDataKey));
          } catch (e) {}
          if (!localData) localData = {};
          localData.groupSchemaId = id;
          localStorage.setItem(localDataKey, JSON.stringify(localData));
        }
      }
    }
  }, {
    key: 'getGroupSetting',
    value: function getGroupSetting(groupSchemaId, groupSchemaName) {
      this.switchGroupSchema(groupSchemaId, groupSchemaName);
      var self = this;
      groupSchemaId = groupSchemaId || self.state.groupSchemaId;

      var obj = _.find(self.GroupSchemaArr, function (o) {
        return o.id == groupSchemaId;
      });
      var groupState = { groupSchemaId: groupSchemaId, groupSchemaName: groupSchemaName, groupInfo: { displayType: 1 }, bShowGroupList: false };
      if (obj) {
        // console.log("移动报表 获取分组信息 : " + JSON.stringify(obj));
        groupState.groupInfo.isCrossTable = obj.isCrossTable;
        if (groupState.groupInfo.isCrossTable == false) {
          if (obj.displayStyle) {
            groupState.groupInfo.displayType = obj.displayStyle;
            groupState.groupInfo.layOutConfig = obj.pageLayout ? JSON.parse(obj.pageLayout) : {};
            groupState.groupInfo.eChartConfig = obj.chartConfig ? JSON.parse(obj.chartConfig) : {};
            groupState.groupInfo.isPc = obj.hasOwnProperty("isPc") ? obj.isPc : true;
            groupState.groupInfo.isMobile = obj.hasOwnProperty("isMobile") ? obj.isMobile : true;
          }
        }
      }
      this.setState(groupState);
    }

    // getGroupSetting(groupSchemaId, groupSchemaName) {
    //   this.switchGroupSchema(groupSchemaId, groupSchemaName);
    //   let self = this;
    //   groupSchemaId = groupSchemaId || self.state.groupSchemaId;
    //   let proxyParams = { billnum: self.state.billnum, groupSchemaId: groupSchemaId };
    //   let callback = (json) => {
    //     let groupState = { groupSchemaId, groupSchemaName, groupInfo: { displayType: 1 } };
    //     if (json.code === 200) {
    //       if (json.data) {
    //         // console.log("移动报表 获取分组信息 : " + JSON.stringify(json.data));
    //         groupState.groupInfo.isCrossTable = json.data.isCrossTable;
    //         if (groupState.groupInfo.isCrossTable == false) {
    //           if (json.data.displayStyle) {
    //             groupState.groupInfo.displayType = json.data.displayStyle;
    //             groupState.groupInfo.layOutConfig = json.data.pageLayout ? JSON.parse(json.data.pageLayout) : {};
    //             groupState.groupInfo.eChartConfig = json.data.chartConfig ? JSON.parse(json.data.chartConfig) : {};
    //           }
    //         }
    //       }
    //     }
    //     this.setState(groupState);
    //   }
    //   self.doProxy(this.urlConfig.getGroupSetting, proxyParams, callback);
    // }

  }, {
    key: 'getSolutionList',
    value: function getSolutionList() {
      var _this4 = this;

      var self = this;
      var filterId = self.state.filterId;
      var proxyParams = { filterId: self.state.filterId };
      var callback = function callback(json) {
        if (json.code === 200 && json.data && json.data.length > 0) {
          var solutionId = json.data[0].id;
          self.setState({ solutionId: solutionId });
        } else {
          eChartCommon.LogChartInfo("移动报表 getSolutionList Err ", "根据filterId没有获取到任何过滤方案", 999);
          var filterViewModel = _this4.props.viewModel.getCache('FilterViewModel');
          if (filterViewModel) filterViewModel.get('search').fireEvent('click', { solutionid: 0 });
        }
      };
      self.doProxy(this.urlConfig.getSolutionList, proxyParams, callback);
    }
  }, {
    key: 'doProxy',
    value: function doProxy(tmp, params, callback, noUniform) {
      var config = { url: tmp.url, method: tmp.method, params: params };
      if (noUniform) {
        config.options = { uniform: false };
      }
      (0, _util.proxy)(config).then(function (json) {
        callback(json);
      });
    }
  }, {
    key: 'getReportContent',
    value: function getReportContent() {
      var self = this;
      var groupInfo = self.state.groupInfo;
      return _react2.default.createElement(_mobileData2.default, {
        billnum: self.state.billnum,
        groupSchemaId: self.state.groupSchemaId,
        displayType: groupInfo.displayType,
        layOutConfig: groupInfo.layOutConfig,
        eChartConfig: groupInfo.eChartConfig,
        isPc: groupInfo.isPc,
        isMobile: groupInfo.isMobile,
        viewModel: self.props.viewModel,
        mobileDataScale: self.getMobileDataScale(),
        displayContent: self.getDisplayContent(),
        meta: self.props.meta,
        condition: this.state.condition,
        firstQueryDone: this.state.firstQueryDone
      });
    }
  }, {
    key: 'getIsVertical',
    value: function getIsVertical() {
      var displayType = this.getDisplayType();
      var isVertical = true;
      if (displayType == 1 && this.state.bSwitchTables == false) isVertical = false;else if (displayType == 3 && this.state.bSwitchChartTable == false) isVertical = false;
      return isVertical;
    }
  }, {
    key: 'getDisplayContent',
    value: function getDisplayContent() {
      // table chart
      var displayType = this.getDisplayType(); // 1 单表 2 单图 3 多图+表
      var content = "";
      if (displayType == 1) {
        content = "table";
      }
      if (displayType == 2) {
        content = "chart";
      } else if (displayType == 3) {
        if (this.state.bSwitchChartTable == true) content = "chart";else content = "table";
      }
      return content;
    }
  }, {
    key: 'getGroupSchemaContent',
    value: function getGroupSchemaContent() {

      var self = this;
      if (self.GroupSchemaArr.length > 0) {
        var arr = [];
        self.GroupSchemaArr.forEach(function (ele) {
          arr.push(_react2.default.createElement(
            Item,
            { key: ele.id, value: ele.name },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                null,
                ele.name
              ),
              _react2.default.createElement(
                'div',
                null,
                ' ',
                ele.id == self.state.groupSchemaId ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1' }) : _react2.default.createElement('div', null),
                ' '
              )
            )
          ));
        });
        return _react2.default.createElement(
          _antdMobile.Popover,
          {
            overlay: arr,
            visible: self.state.bShowGroupList,
            onVisibleChange: this.handleVisibleChange,
            onSelect: this.onSelect,
            overlayClassName: 'mobileReport_Popover',
            mask: true,
            getTooltipContainer: function getTooltipContainer() {
              return document.getElementById('popup-container') || document.body;
            }
          },
          _react2.default.createElement(
            'div',
            { className: 'mobileReport_Group',
              style: { cursor: "pointer" }
            },
            _react2.default.createElement(
              'span',
              { className: 'mobileReport_max' },
              self.state.groupSchemaName
            ),
            _react2.default.createElement('i', { className: self.state.bShowGroupList === true ? "icon icon-shouqi" : "icon icon-zhakai" })
          )
        );
      } else {
        return undefined;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // cb.utils.setStatusBarStyle("light");
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      eChartCommon.LogChartInfo("移动报表 MobileReport Render ", "", 900);
      // self.props.viewModel.setCache('queryItems', ['filter', 'schema']);
      var isVertical = this.getIsVertical();
      if (this.isTest == true) {
        return _react2.default.createElement(_mobileTest2.default, null);
      } else {
        var totalContent = _react2.default.createElement(_mobileReportSum2.default, {
          billnum: this.state.billnum,
          viewModel: self.props.viewModel,
          setSumFieldsCount: this.setSumFieldsCount.bind(this)
        });
        var reportContent = this.getReportContent();
        var groupSchemaContent = self.getGroupSchemaContent();
        // let dataScale = self.getMobileDataScale();
        var rightContent = _react2.default.createElement(
          'div',
          { className: 'mobileReport_NavSwitch' + this.getDisplayType(), style: { display: isVertical ? "none" : "" } },
          this.getSwitch()
        );
        var otherContent1 = _react2.default.createElement(
          'div',
          {
            className: 'mobileReport_NavBar',
            style: { width: this.getScreenWidth(), height: "auto", float: "left" } },
          _react2.default.createElement(_NavBar2.default, {
            title: this.state.titleName,
            onLeftClick: this.onLeftClick.bind(this),
            rightContent: rightContent
          })
        );
        var otherContent2 = _react2.default.createElement(
          'div',
          {
            className: 'mobileReport_TotalAndData',
            style: { width: this.getScreenWidth(), height: "auto", float: "left" } },
          _react2.default.createElement(
            'div',
            {
              className: 'mobileReport_Total',
              style: { width: this.getScreenWidth(), height: "auto", float: "left", display: isVertical ? "" : "none" } },
            totalContent
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'mobileReport_SwitchAndData',
              style: {
                // width: dataScale.width,
                // height: dataScale.height,
                overflow: 'auto'
              }
            },
            _react2.default.createElement(
              'div',
              {
                className: 'mobileReport_Switch' + this.getDisplayType(),
                style: { width: this.getScreenWidth(), height: "auto", float: "left", display: isVertical ? "" : "none" } },
              this.getSwitch()
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'mobileReport_Data',
                style: { width: this.getScreenWidth(), height: "auto", float: "left" } },
              reportContent
            )
          )
        );

        eChartCommon.LogChartInfo("移动报表 MobileReport Render sumFieldsCount", self.state.sumFieldsCount, 900);
        return _react2.default.createElement(
          'div',
          {
            className: 'mobileReport_Outer mobileReport_Outer_' + (isVertical ? "Vertical" : "Horizontal") + ' mobileReport_Outer_SumCount_' + self.state.sumFieldsCount,
            style: { height: this.getScreenHeight(), width: this.getScreenWidth() } },
          _react2.default.createElement(_mobileFilter2.default, {
            filterId: this.state.filterId,
            viewid: this.state.viewid,
            viewModel: self.props.viewModel,
            cardKey: this.state.billnum,
            model: self.props.viewModel,
            otherTitleContent: groupSchemaContent,
            otherContent1: otherContent1,
            otherContent2: otherContent2,
            isVertical: isVertical,
            filterType: "report"
          })
        );
      }
    }
  }, {
    key: 'setSumFieldsCount',
    value: function setSumFieldsCount(sumFieldsCount) {
      eChartCommon.LogChartInfo("移动报表 MobileReport setSumFieldsCount sumFieldsCount", sumFieldsCount, 900);
      // this.setState({ sumFieldsCount });
      this.state.sumFieldsCount = sumFieldsCount;
      this.forceUpdate();
      // this.state.sumFieldsCount = sumFieldsCount;
      // this.setState(prevState => {
      //   console.log(prevState)
      //   return { sumFieldsCount }
      // })
    }
  }, {
    key: 'getMobileDataScale',
    value: function getMobileDataScale() {
      var isVertical = this.getIsVertical();
      var width = this.getScreenWidth();
      var height = "auto";
      // if (this.getDisplayType() == 1)//单表
      height = this.getHeight();
      // let height = this.getScreenHeight();
      // if (isVertical == true) {
      //   // height = height - 20 - 249;
      //   height = this.getHeight();
      // }
      // else {
      //   height = height - 70;
      // }
      eChartCommon.LogChartInfo("移动报表  isVertical = " + isVertical + " this.getScreenWidth() = " + this.getScreenWidth() + "  this.getScreenHeight() = " + this.getScreenHeight() + " 数据显示区域 width = " + width + " height = " + height, "", 900);
      return { width: width, height: height };
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var isVertical = this.getIsVertical();
      var height = this.getScreenHeight();
      var fontUnit = window ? window.__fontUnit : 50;
      var sumFieldsCount = this.state.sumFieldsCount;
      var content = this.getDisplayContent();

      if (isVertical) {
        if (sumFieldsCount >= 5) {
          // height = height - (
          //   1.28 // mobileTitleSumData padding-top
          //   + 0.76 //.mobileTitle
          //   + 0.3//.MobileSum padding-bottom
          //   + 0.3 * 2//MobileSumItem  margin-top 2层汇总
          //   + 0.3//.mobileReport_Switch1 margin-top
          //   + 0.5//  mobileReport_SwitchButton_Vertical
          //   + 0.3//.mobileReport_Switch1 margin-bottom
          // ) * fontUnit
          //   - (15 + 28) * 2 //汇总数字文本，2层汇总 MobileSumItem 2
          //   - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
          //   ;

          if (content == "table") {
            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 3 //.MobileSumControlCount_5 height
            + 0.3 //.mobileReport_Switch1 margin-top
            + 0.5 //  mobileReport_SwitchButton_Vertical
            + 0.3 //.mobileReport_Switch1 margin-bottom
            ) * fontUnit;
          } else {
            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 3 //.MobileSumControlCount_5 height
            + 0.4 //chart margin-top

            ) * fontUnit;
          }
        } else if (sumFieldsCount == 3 || sumFieldsCount == 4) {
          // height = height - (
          //   1.28 // mobileTitleSumData padding-top
          //   + 0.76 //.mobileTitle
          //   + 0.3//.MobileSum padding-bottom
          //   + 0.3 * 2//MobileSumItem  margin-top 2层汇总
          //   + 0.3//.mobileReport_Switch1 margin-top
          //   + 0.5//  mobileReport_SwitchButton_Vertical
          //   + 0.3//.mobileReport_Switch1 margin-bottom
          // ) * fontUnit
          //   - (15 + 28) * 2 //汇总数字文本，2层汇总 MobileSumItem 2
          //   // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
          //   ;
          if (content == "table") {
            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 2.55 //.MobileSumControlCount_3 height
            + 0.3 //.mobileReport_Switch1 margin-top
            + 0.5 //  mobileReport_SwitchButton_Vertical
            + 0.3 //.mobileReport_Switch1 margin-bottom
            ) * fontUnit;
          } else {
            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 2.55 //.MobileSumControlCount_3 height
            + 0.4 //chart margin-top

            ) * fontUnit;
          }
        } else if (sumFieldsCount == 1 || sumFieldsCount == 2) {
          // height = height - (
          //   1.28 // mobileTitleSumData padding-top
          //   + 0.76 //.mobileTitle
          //   + 0.3//.MobileSum padding-bottom
          //   + 0.3 * 1//MobileSumItem  margin-top 2层汇总
          //   + 0.3//.mobileReport_Switch1 margin-top
          //   + 0.5//  mobileReport_SwitchButton_Vertical
          //   + 0.3//.mobileReport_Switch1 margin-bottom
          // ) * fontUnit
          //   - (15 + 28) * 1 //汇总数字文本，2层汇总 MobileSumItem 2
          //   // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
          //   ;
          if (content == "table") {
            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 1.45 //.MobileSumControlCount_2 height
            + 0.3 //.mobileReport_Switch1 margin-top
            + 0.5 //  mobileReport_SwitchButton_Vertical
            + 0.3 //.mobileReport_Switch1 margin-bottom
            ) * fontUnit;
          } else {
            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            + 1.45 //.MobileSumControlCount_2 height
            + 0.4 //chart margin-top

            ) * fontUnit;
          }
        } else if (sumFieldsCount == 0) {
          if (content == "table") {
            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            // + 0.3//.MobileSum padding-bottom
            // + 0.3 * 1//MobileSumItem  margin-top 2层汇总
            + 0.3 //.mobileReport_Switch1 margin-top
            + 0.5 //  mobileReport_SwitchButton_Vertical
            + 0.3 //.mobileReport_Switch1 margin-bottom
            ) * fontUnit
            // - (15 + 28) * 1 //汇总数字文本，2层汇总 MobileSumItem 2
            // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
            ;
          } else {

            height = height - (1.28 // mobileTitleSumData padding-top
            + 0.76 //.mobileTitle
            // + 0.3//.MobileSum padding-bottom
            // + 0.3 * 1//MobileSumItem  margin-top 2层汇总
            + 0.4 //chart margin-top

            ) * fontUnit
            // - (15 + 28) * 1 //汇总数字文本，2层汇总 MobileSumItem 2
            // - 8 * 2 //多个tab时显示的指示条上下padding高度 am-tabs-default-bar-tab-active
            ;
          }
        }
      } else {
        //横向展现
        height = height - 1.28 * fontUnit;
      }
      if (height > 0) return height;else return undefined;
    }
  }, {
    key: 'getScreenWidth',
    value: function getScreenWidth() {
      //显示屏幕的高度宽度
      if (this.getIsVertical() == true) {
        // return document.documentElement.clientWidth;
        return this.innerWidth;
      } else {
        // return document.documentElement.clientHeight;
        return this.innerHeight;
      }
    }
  }, {
    key: 'getScreenHeight',
    value: function getScreenHeight() {
      //显示屏幕的高度宽度
      if (this.getIsVertical() == true) {
        return this.innerHeight;
      } else {
        return this.innerWidth;
      }
    }
  }, {
    key: 'onLeftClick',
    value: function onLeftClick() {
      if (this.getIsVertical() == true) {
        // cb.utils.setStatusBarStyle("light");
        this.props.returnCallback();
      } else {
        if (this.getDisplayType() == 1) {
          this.onTablesSwitchChange();
        }
        if (this.getDisplayType() == 3) {
          this.onChartTableSwitchChange();
        }
      }
    }
  }]);

  return mobileReport;
}(_react.Component);

exports.default = mobileReport;