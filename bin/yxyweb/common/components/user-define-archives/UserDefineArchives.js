'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _basic = require('../basic');

var _UserDefineSetting = require('./UserDefineSetting');

var _UserDefineSetting2 = _interopRequireDefault(_UserDefineSetting);

var _userDefineArchives = require('../../redux/userDefineArchives');

var _ActionStatus = require('../../constants/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (process.env.__CLIENT__ === true) {
  require('./UserDefineArchives.less');
}

var UserDefineArchives = function (_Component) {
  _inherits(UserDefineArchives, _Component);

  function UserDefineArchives(props) {
    _classCallCheck(this, UserDefineArchives);

    // this.handleTableRowDoubleClick = this.handleTableRowDoubleClick.bind(this)
    var _this = _possibleConstructorReturn(this, (UserDefineArchives.__proto__ || Object.getPrototypeOf(UserDefineArchives)).call(this, props));

    _this.handleClassClick = _this.handleClassClick.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.pageSize = 10;
    _this.setModel();
    return _this;
  }
  // handleTableRowDoubleClick(params) {
  //   const defineId = encodeURI(params.defineId);
  //   this.context.router.push(`/userDefines/${defineId}`)
  // }

  _createClass(UserDefineArchives, [{
    key: 'handleClassClick',
    value: function handleClassClick(code) {
      this.props.fetchUserDefineListPageByClass(code, this.pageSize, 1);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(type) {
      if (type === 'refresh') {
        this.props.fetchUserDefineList("", this.pageSize, 1);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$userDefineArch = this.props.userDefineArchives,
          userDefList_Class = _props$userDefineArch.userDefList_Class,
          userDefList_CurrentClassId = _props$userDefineArch.userDefList_CurrentClassId,
          userDefSetting_DefineId = _props$userDefineArch.userDefSetting_DefineId;

      var userDefList_ClassButton = [];
      var bHeader = false;
      for (var prop in userDefList_Class) {
        if (userDefList_Class.hasOwnProperty(prop)) {
          (function () {
            var value = userDefList_Class[prop];
            var key = prop;
            //在遍历或者循环输出去渲染子组件的时候，key必不可少
            var cname = "no-border button-margin button-selected-" + (userDefList_CurrentClassId == key);
            if (key == "billHead") {
              userDefList_ClassButton.splice(0, 0, _react2.default.createElement(
                _basic.Button,
                { type: 'ghost', key: key, className: cname, onClick: function onClick(e) {
                    return _this2.handleClassClick(key);
                  } },
                value
              ));
              bHeader = true;
            } else if (key == "billBody") {
              if (bHeader) userDefList_ClassButton.splice(1, 0, _react2.default.createElement(
                _basic.Button,
                { type: 'ghost', key: key, className: cname, onClick: function onClick(e) {
                    return _this2.handleClassClick(key);
                  } },
                value
              ));else userDefList_ClassButton.splice(0, 0, _react2.default.createElement(
                _basic.Button,
                { type: 'ghost', key: key, className: cname, onClick: function onClick(e) {
                    return _this2.handleClassClick(key);
                  } },
                value
              ));
            } else {
              userDefList_ClassButton.push(_react2.default.createElement(
                _basic.Button,
                { type: 'ghost', key: key, className: cname, onClick: function onClick(e) {
                    return _this2.handleClassClick(key);
                  } },
                value
              ));
            }
          })();
        }
      }
      var archForm = _react2.default.createElement(
        'div',
        { className: 'userDefinedArchives' },
        _react2.default.createElement(
          _basic.Row,
          { colCount: 12, className: 'itemType' },
          _react2.default.createElement(
            _basic.Col,
            { span: 12 },
            userDefList_ClassButton
          )
        ),
        _react2.default.createElement(
          _basic.Row,
          null,
          _react2.default.createElement(
            _basic.Col,
            { span: 'all' },
            this.renderTable()
          )
        )
      );
      var modal = null;
      if (userDefSetting_DefineId) {
        var params = { classId: userDefList_CurrentClassId, defineId: userDefSetting_DefineId };
        modal = _react2.default.createElement(_UserDefineSetting2.default, { params: params });
      }
      return _react2.default.createElement(
        'div',
        null,
        archForm,
        modal
      );
    }
  }, {
    key: 'renderTable',
    value: function renderTable() {
      var _props$userDefineArch2 = this.props.userDefineArchives,
          userDefList_DisplayData = _props$userDefineArch2.userDefList_DisplayData,
          userDefList_GetUserDefStatus = _props$userDefineArch2.userDefList_GetUserDefStatus,
          userDefList_CurrentClassId = _props$userDefineArch2.userDefList_CurrentClassId;

      if (userDefList_GetUserDefStatus === _ActionStatus2.default.ING) {
        return _react2.default.createElement(
          'div',
          null,
          '\u6B63\u5728\u52A0\u8F7D..'
        );
      } else if (userDefList_GetUserDefStatus === _ActionStatus2.default.FAILURE) {
        return _react2.default.createElement(
          'div',
          null,
          '\u52A0\u8F7D\u5931\u8D25'
        );
      } else if (userDefList_GetUserDefStatus === _ActionStatus2.default.SUCCEED && userDefList_DisplayData.length === 0) {
        return _react2.default.createElement(
          'div',
          null,
          '\u6CA1\u6709\u6570\u636E'
        );
      }
      var action = {};
      action.cAlign = "left";
      action.cControlType = "Toolbar";
      action.cDataSourceName = "Toolbar";
      this.actionControls = action.controls = [];
      action.controls.push({ cCaption: "设置", cControlType: "button", cItemName: "btnEdit", cShowCaption: "设置", iOrder: 1, iStyle: 0, icon: "edit", key: "ABC231625" });
      // if (userDefList_CurrentClassId == "productSpec") {
      //   console.log(" renderTable noaction  userDefList_CurrentClassId = " + userDefList_CurrentClassId);
      //   return (<Table width={this.props.width} model={this.gridModel} action={{}} />);
      // } else {
      console.log(" renderTable  userDefList_CurrentClassId = " + userDefList_CurrentClassId);
      return _react2.default.createElement(_basic.Table, { width: this.props.width, height: 600, listHeaderHeight: 1, model: this.gridModel, action: action });
      // }
    }
  }, {
    key: 'setModel',
    value: function setModel() {
      var _this3 = this;

      this.gridModel = new cb.models.GridModel({
        columns: {
          tenantId: { cItemName: 'tenantId', cShowCaption: 'tenantId', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
          pubts: { cItemName: 'pubts', cShowCaption: 'pubts', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
          id: { cItemName: 'id', cShowCaption: 'id', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
          classId: { cItemName: 'classId', cShowCaption: 'classId', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
          className: { cItemName: 'className', cShowCaption: '分类', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
          defineId: { bJointQuery: false, cItemName: 'defineId', cShowCaption: 'defineId', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: true, cControlType: 'Input' }, //bJointQuery: true,
          item: { bJointQuery: false, cItemName: 'item', cShowCaption: '项目号', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' }, //bJointQuery: true,
          // item: { cItemName: 'item', cShowCaption: '系统项目名称', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'Input' },
          type: { cItemName: 'type', cShowCaption: '数据类型', iColWidth: 120, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          showItem: { cItemName: 'showItem', cShowCaption: '项目名称', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          // length: { cItemName: 'length', cShowCaption: '长度', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          maxInputLen: { cItemName: 'maxInputLen', cShowCaption: '控制录入长度', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          decimalDigits: { cItemName: 'decimalDigits', cShowCaption: '小数位数', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          isEnabled: { cItemName: 'isEnabled', cShowCaption: '启用', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
          isInput: { cItemName: 'isInput', cShowCaption: '必输', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
          isDeleted: { cItemName: 'isDeleted', cShowCaption: 'isDeleted', iColWidth: 0, bHidden: true, bShowIt: false, bCanModify: false, cControlType: 'switch' }
          // isMultiSel: { cItemName: 'isMultiSel', cShowCaption: '复选', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
          // dataSource: { cItemName: 'dataSource', cShowCaption: '数据来源', iColWidth: 80, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          // refArchive: { cItemName: 'refArchive', cShowCaption: '对应档案', iColWidth: 100, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'Input' },
          // isUserDefAttachFile: { cItemName: 'isUserDefAttachFile', cShowCaption: '附件', iColWidth: 50, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
          // isUserDefPic: { cItemName: 'isUserDefPic', cShowCaption: '图片', iColWidth: 50, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'switch' },
        },
        independent: true,
        readOnly: true,
        showCheckBox: false,
        showAggregates: false,
        pagination: true,
        showColumnSetting: false,
        showRowNo: true
      });
      var fields = {
        grid: this.gridModel,
        btnEdit: new cb.models.SimpleModel()
      };
      this.viewModel = new cb.models.ContainerModel();
      this.viewModel.setData(fields);
      this.gridModel.on('pageInfoChange', function (params) {
        console.log("pageInfoChange params=" + JSON.stringify(params));
        var userDefList_CurrentClassId = _this3.props.userDefineArchives.userDefList_CurrentClassId;

        _this3.gridModel.unselectAll();
        if (_this3.pageSize != params.pageSize) _this3.pageSize = params.pageSize;
        _this3.props.fetchUserDefineListPageByClass(userDefList_CurrentClassId, params.pageSize, params.pageIndex);
        console.log("pageInfoChange params=" + JSON.stringify(params));
        // this.gridModel.setPageInfo(params);
        // this.gridModel.on('dblClick', (params) => {
        //   //  const defineId=encodeURI(params.defineId);
        //   //  this.context.router.push(`/userDefines/${defineId}`)
        //   this.props.showSetting(params.defineId);
        // });
        //  const defineId=encodeURI(params.defineId);
        //  this.context.router.push(`/userDefines/${defineId}`)
        // this.props.showSetting(params.defineId);
        // this.gridModel.setDataSource([]);
      });
      this.viewModel.get("btnEdit").on('click', function (params) {
        var rowData = _this3.gridModel.getRow(params.index);
        _this3.props.showSetting(rowData.defineId);
        _this3.gridModel.select(params.index);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchUserDefineList("", this.pageSize, 1);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props$userDefineArch3 = this.props.userDefineArchives,
          userDefList_DisplayData = _props$userDefineArch3.userDefList_DisplayData,
          userDefList_GetUserDefStatus = _props$userDefineArch3.userDefList_GetUserDefStatus,
          userDefList_CurrentClassId = _props$userDefineArch3.userDefList_CurrentClassId;


      var list = nextProps.userDefineArchives.userDefList_DisplayData;
      if (list && this.gridModel) {
        console.log(" componentWillReceiveProps  userDefList_CurrentClassId = " + userDefList_CurrentClassId);
        this.gridModel.setDataSource(cb.utils.changeUserDefineTypeEnumValue(list, true));

        var rows = this.gridModel.getRows();
        var actions = this.actionControls;
        var actionsStates = [];
        // const visible = nextProps.userDefineArchives.userDefList_CurrentClassId == "productSpec" ? false : true;
        var visible = true;
        rows.forEach(function (data) {
          var actionState = {};
          actions.forEach(function (action) {
            actionState[action.cItemName] = { visible: visible };
          });
          actionsStates.push(actionState);
        });
        this.gridModel.setActionsState(actionsStates);

        var pageSize = this.pageSize;
        var recordCount = nextProps.userDefineArchives.userDefList_DisplayRecordCount;
        var pageCount = nextProps.userDefineArchives.userDefList_DisplayPageCount;
        var pageIndex = nextProps.userDefineArchives.userDefList_DisplayPageIndex;
        this.gridModel.setPageInfo({ pageSize: pageSize, pageIndex: pageIndex, pageCount: pageCount, recordCount: recordCount });
        this.gridModel.setDirty(false);
        console.log("componentWillReceiveProps userDefList_DisplayData.length = " + list.length + " pageinfo=" + JSON.stringify({ pageSize: pageSize, pageIndex: 1, pageCount: pageCount, recordCount: recordCount }));
      }
    }
  }]);

  return UserDefineArchives;
}(_react.Component);

UserDefineArchives.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    userDefineArchives: state.userDefineArchives.toJS()
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  var methods = { fetchUserDefineList: _userDefineArchives.fetchUserDefineList, fetchUserDefineListPageByClass: _userDefineArchives.fetchUserDefineListPageByClass, showSetting: _userDefineArchives.showSetting };
  return _extends({ dispatch: dispatch }, (0, _redux.bindActionCreators)(methods, dispatch));
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserDefineArchives);