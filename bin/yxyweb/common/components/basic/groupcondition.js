'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _groupCondition = require('../../redux/groupCondition');

var groupConditionRedux = _interopRequireWildcard(_groupCondition);

var _InputSearch = require('../common/InputSearch');

var _InputSearch2 = _interopRequireDefault(_InputSearch);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _eChartDesign = require('../echart/echart/eChartDesign');

var _eChartDesign2 = _interopRequireDefault(_eChartDesign);

var _eChartCommon = require('../echart/eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartDemoData = require('../echart/eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { findDOMNode } from 'react-dom';

// import EChartPanelList from '../echart/panel/eChartPanelList';


var RadioGroup = _antd.Radio.Group;

var GroupCondition = function (_React$Component) {
  _inherits(GroupCondition, _React$Component);

  function GroupCondition(props) {
    _classCallCheck(this, GroupCondition);

    var _this = _possibleConstructorReturn(this, (GroupCondition.__proto__ || Object.getPrototypeOf(GroupCondition)).call(this, props));

    _initialiseProps.call(_this);

    var viewModel = props.viewModel;

    var _viewModel$getParams = viewModel.getParams(),
        billNo = _viewModel$getParams.billNo;

    var _this$props = _this.props,
        groupConditionState = _this$props.groupConditionState,
        groupConditionRedux = _this$props.groupConditionRedux;

    var viewid = _this.props.viewid ? _this.props.viewid : "";
    var bPublished = viewid ? true : false;
    groupConditionRedux.initConditionListValue(billNo, { billnum: billNo, bShowList: false, bShowCard: false, viewid: viewid }, viewModel);
    _this.state = {
      billnum: billNo,
      // bCancelSetting: false,
      bIgnoreAuth: false,
      viewid: viewid,
      bPublished: bPublished,
      name: viewModel.getParams().name ? viewModel.getParams().name : "",
      bUseZhiBiao: false
    };

    _this.groupSchemasMeta = {
      cControlType: 'Select',
      modelType: 'ListModel',
      cItemName: 'groupSchemas',
      valueField: 'id',
      textField: 'name'
    };
    viewModel.addProperty(_this.groupSchemasMeta.cItemName, new cb.models[_this.groupSchemasMeta.modelType](_this.groupSchemasMeta));
    _this.noGroupAndAuth = false;
    return _this;
  }

  _createClass(GroupCondition, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}

    // 监听外部props的变化, 如果变化了需要更新组件的state

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'switchGroupSchema',
    value: function switchGroupSchema(id, name) {
      var viewModel = this.props.viewModel;


      var tmp = [];
      if (id) tmp.push({ id: id, name: name });
      viewModel.get('groupSchemas').setDataSource(tmp);
      viewModel.get('groupSchemas').setValue(id);
      viewModel.biz.do("switchGroupSchema", viewModel, { groupSchemaId: id, groupSchemaName: name });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var _self$props = self.props,
          groupConditionState = _self$props.groupConditionState,
          groupConditionRedux = _self$props.groupConditionRedux;

      if (groupConditionState[this.getBillNum()] == undefined) return _react2.default.createElement('div', null);
      // let type = groupConditionState[this.getBillNum()].textMouseEnterId == 4 && groupConditionState[this.getBillNum()].currentName != "" ? "close" : (groupConditionState[self.getBillNum()].bShowList ? "up" : "down");

      // let button = <div>
      //   <Icon
      //     //onClick={() => self.ShowList()}
      //     onClick={type == "close" ? () => self.chooseCondition() : () => self.ShowList()}
      //     type={type}
      //     onMouseEnter={() => this.onTextMouseEnter(true, 4)}
      //     onMouseLeave={() => this.onTextMouseEnter(false, 4)}
      //   />
      // </div>;
      eChartCommon.LogChartInfo("设置界面 render ", JSON.stringify(groupConditionState[this.state.billnum].eChart), 900);

      var bNeedClose = groupConditionState[this.getBillNum()].textMouseEnterId == 4 && groupConditionState[this.getBillNum()].currentName != "" ? true : false;
      var type = groupConditionState[self.getBillNum()].bShowList ? "up" : "down";

      var button = _react2.default.createElement(
        'div',
        null,
        bNeedClose ? _react2.default.createElement(_antd.Icon, {
          onClick: function onClick() {
            return self.chooseCondition();
          },
          type: "close-circle",
          onMouseEnter: function onMouseEnter() {
            return _this2.onTextMouseEnter(true, 4);
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.onTextMouseEnter(false, 4);
          }
        }) : null,
        _react2.default.createElement(_antd.Icon, {
          onClick: function onClick() {
            return self.ShowList();
          },
          type: type,
          onMouseEnter: function onMouseEnter() {
            return _this2.onTextMouseEnter(true, 4);
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.onTextMouseEnter(false, 4);
          }
        })
      );

      var conditionList = null;
      conditionList = this.getConditionListRender();
      var conditionPop = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'Grouping-condition-left' },
          groupConditionState[this.getBillNum()].cShowCaption,
          ':'
        ),
        _react2.default.createElement(
          _antd.Popover,
          {
            overlayStyle: { width: "236px" },
            content: conditionList, trigger: "click",
            visible: groupConditionState[this.getBillNum()].bShowList },
          _react2.default.createElement(
            'div',
            { className: 'Grouping-condition' },
            _react2.default.createElement(
              'div',
              { className: 'Grouping-condition-input' },
              _react2.default.createElement(
                'span',
                { className: 'Grouping-condition-span',
                  onMouseEnter: function onMouseEnter() {
                    return _this2.onTextMouseEnter(true, 4);
                  },
                  onMouseLeave: function onMouseLeave() {
                    return _this2.onTextMouseEnter(false, 4);
                  },
                  style: { cursor: "pointer" },
                  onClick: function onClick() {
                    return _this2.ShowList();
                  },
                  overlayStyle: { width: "100px" } },
                groupConditionState[this.getBillNum()].currentName
              ),
              button
            )
          )
        )
      );
      var conditionCard = this.getConditionCardRender();
      var eChartSetting = this.eChartSetting_getRender();
      var style = {};
      if (this.state.bPublished) {
        style = { display: "none" };
      }
      return _react2.default.createElement(
        'div',
        { className: 'groupCondition', style: style },
        conditionPop,
        conditionCard,
        eChartSetting
      );
    }
  }, {
    key: 'getConditionListRender',
    value: function getConditionListRender() {
      var _this4 = this;

      var self = this;
      var _props = this.props,
          groupConditionState = _props.groupConditionState,
          groupConditionRedux = _props.groupConditionRedux;

      var conditionList = groupConditionState[this.getBillNum()].conditionList;
      var currentId = groupConditionState[this.getBillNum()].currentId;
      var renderList = [];
      var bAuthAdd = groupConditionState[this.getBillNum()].bAuthAdd;
      var bAuthEdit = groupConditionState[this.getBillNum()].bAuthEdit;
      var bAuthDel = groupConditionState[this.getBillNum()].bAuthDel;
      if (self.state.bIgnoreAuth === true) {
        bAuthAdd = true;
        bAuthEdit = true;
        bAuthDel = true;
      }

      if (conditionList && conditionList.length > 0) {
        // if (conditionList.length == 1) {
        //   // conditionList[0].isDefault = true;
        //   currentId = conditionList[0].id;
        // }
        conditionList.forEach(function (element, index) {
          var _this3 = this;

          var item = void 0;
          var isChecked = element.id == currentId ? true : false;
          var itemChecked = isChecked ? _react2.default.createElement(
            'span',
            { className: 'groupCondition-Checked' },
            _react2.default.createElement('i', { className: 'anticon icon-xuanzhong1', checked: isChecked }),
            '  '
          ) : _react2.default.createElement(
            'span',
            { className: 'groupCondition-Checked' },
            '  '
          );
          var isDefault = element.isDefault ? element.isDefault : false;
          var itemDefault = isDefault ? _react2.default.createElement(
            'span',
            { className: 'groupCondition-Default' },
            ' ',
            _react2.default.createElement(
              'span',
              { className: 'crossdefault-btn' },
              '\u9ED8\u8BA4'
            ),
            '  '
          ) : _react2.default.createElement(
            'span',
            { className: 'groupCondition-Default' },
            '  '
          );
          var isMouseEnter = element.isMouseEnter ? element.isMouseEnter : false;
          var itemEnter = isMouseEnter ? _react2.default.createElement(
            'span',
            { className: "groupCondition-MouseEnter" + (groupConditionState[this.getBillNum()].textMouseEnterId > 0 && groupConditionState[this.getBillNum()].textMouseEnterId <= 3 ? groupConditionState[this.getBillNum()].textMouseEnterId : "") },
            isDefault ? null : _react2.default.createElement(
              'span',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onTextMouseEnter(true, 1);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onTextMouseEnter(false, 1);
                },
                onClick: function onClick() {
                  return _this3.setDefaultCondition(element.id);
                } },
              '\u8BBE\u4E3A\u9ED8\u8BA4'
            ),
            _react2.default.createElement(
              'span',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onTextMouseEnter(true, 2);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onTextMouseEnter(false, 2);
                },
                onClick: function onClick() {
                  return _this3.editConditionInfo(element.id);
                },
                style: { display: bAuthEdit == true ? "" : 'none' }
              },
              '\u8BBE\u7F6E'
            ),
            _react2.default.createElement(
              'span',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onTextMouseEnter(true, 3);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onTextMouseEnter(false, 3);
                },
                onClick: function onClick() {
                  return _this3.deleteCondition(element.id);
                },
                style: { display: bAuthDel == true ? "" : 'none' }
              },
              '\u5220\u9664'
            )
          ) : _react2.default.createElement(
            'span',
            { className: 'groupCondition-MouseEnter' },
            ' '
          );

          item = _react2.default.createElement(
            _row2.default,
            { style: { minHeight: "25px" },
              onMouseEnter: function onMouseEnter(e) {
                return _this3.onMouseEnter(true, e, element.id);
              },
              onMouseLeave: function onMouseLeave(e) {
                return _this3.onMouseEnter(false, e, element.id);
              } },
            itemChecked,
            _react2.default.createElement(
              'span',
              { style: { cursor: "pointer" }, onClick: function onClick() {
                  return _this3.chooseCondition(element.id, element.name);
                } },
              ' ',
              element.name ? element.name : element.id,
              '  '
            ),
            itemDefault,
            itemEnter
          );
          renderList.push(item);
        }, this);
      }
      if (renderList.length < 1 && bAuthAdd == false) this.noGroupAndAuth = true;else this.noGroupAndAuth = false;

      return _react2.default.createElement(
        'div',
        { className: "group-add-grouping-count " + (bAuthAdd == false ? "group-add-grouping-count-noauth" : "") },
        _react2.default.createElement(
          'div',
          { style: { overflow: "auto", maxHeight: "258px", paddingBottom: "2px" } },
          renderList
        ),
        _react2.default.createElement(
          'div',
          { className: 'group-add-grouping' },
          _react2.default.createElement(
            'div',
            {
              onClick: function onClick() {
                return _this4.addConditionInfo();
              },
              style: { display: bAuthAdd == true ? "" : 'none' }
            },
            _react2.default.createElement(_SvgIcon2.default, { type: 'plus' }),
            '\u65B0\u589E\u5206\u7EC4'
          )
        )
      );
      // return (
      //   <div className="group-add-grouping-count ">
      //     <div style={{ overflow: "auto", maxHeight: "258px", paddingBottom: "2px" }} >{renderList}</div>
      //     {groupConditionState[this.getBillNum()].bAuthAdd == true ? <div className="group-add-grouping">
      //       <div
      //         onClick={() => this.addConditionInfo()}
      //       ><SvgIcon type="plus" />新增分组</div>
      //     </div> : ""}
      //   </div>
      // );
    }
  }, {
    key: 'addConditionInfo',
    value: function addConditionInfo() {
      var groupConditionRedux = this.props.groupConditionRedux;

      groupConditionRedux.editConditionInfo(this.getBillNum(), "");
    }
  }, {
    key: 'editConditionInfo',
    value: function editConditionInfo(id) {
      var groupConditionRedux = this.props.groupConditionRedux;

      groupConditionRedux.editConditionInfo(this.getBillNum(), id);
    }
  }, {
    key: 'setDefaultCondition',
    value: function setDefaultCondition(id) {
      var _props2 = this.props,
          groupConditionRedux = _props2.groupConditionRedux,
          viewModel = _props2.viewModel;

      groupConditionRedux.setDefaultCondition(this.getBillNum(), id, viewModel);
    }
  }, {
    key: 'getBillNum',
    value: function getBillNum() {

      return this.state.billnum;
      // let reduxBillNum = this.state.billnum;
      // if (!!this.state.viewid)
      //   reduxBillNum = reduxBillNum + "_" + this.state.viewid;
      // return reduxBillNum;
    }
  }, {
    key: 'deleteCondition',
    value: function deleteCondition(id) {
      var _props3 = this.props,
          viewModel = _props3.viewModel,
          groupConditionRedux = _props3.groupConditionRedux;

      groupConditionRedux.deleteCondition(this.getBillNum(), id, viewModel);
    }
  }, {
    key: 'chooseCondition',
    value: function chooseCondition(id, name) {
      var _props4 = this.props,
          groupConditionState = _props4.groupConditionState,
          groupConditionRedux = _props4.groupConditionRedux;

      if (groupConditionState[this.getBillNum()].currentName || name) {
        this.switchGroupSchema(id ? id : null, name);
        groupConditionRedux.chooseCondition(this.getBillNum(), id);
      }
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(bEnter, e, id) {
      var groupConditionRedux = this.props.groupConditionRedux;

      groupConditionRedux.conditiOnMouseEnter(this.getBillNum(), id, bEnter);
    }
  }, {
    key: 'onTextMouseEnter',
    value: function onTextMouseEnter(bEnter, id) {
      var groupConditionRedux = this.props.groupConditionRedux;

      groupConditionRedux.conditiOnTextMouseEnter(this.getBillNum(), id, bEnter);
    }
  }, {
    key: 'getConditionCardRender',
    value: function getConditionCardRender() {
      var _this5 = this;

      var _props5 = this.props,
          groupConditionState = _props5.groupConditionState,
          groupConditionRedux = _props5.groupConditionRedux;

      var editCondition = groupConditionState[this.getBillNum()].editCondition;
      eChartCommon.LogChartInfo(" groupcondition getConditionCardRender  editCondition  ", JSON.stringify(editCondition), 900);
      var bEdit = editCondition.bEdit;
      var content = void 0;
      if (groupConditionState[this.getBillNum()].bShowCard == true) {
        var card = void 0;
        if (editCondition.isCrossTable) card = this.getCrossCardRender();else card = this.getGroupCardRender();

        content = _react2.default.createElement(
          _antd.Modal,
          { className: 'crossGroupingModal',
            title: bEdit ? "编辑" : "新增",
            onOk: function onOk(e) {
              return _this5.handleOk(e);
            },
            onCancel: function onCancel(e) {
              return _this5.handleCancel(e);
            },
            visible: true
          },
          card
        );
      }
      return content;
    }
  }, {
    key: 'getGroupCardRender',

    // filterOption = (inputValue, option) => {
    //   return option.title.indexOf(inputValue) > -1;
    // }

    value: function getGroupCardRender() {
      var _this6 = this;

      var self = this;
      var _props6 = this.props,
          groupConditionState = _props6.groupConditionState,
          groupConditionRedux = _props6.groupConditionRedux;

      var bEdit = groupConditionState[this.getBillNum()].editCondition.bEdit;
      var editCondition = groupConditionState[this.getBillNum()].editCondition;
      var leftContentCheckBoxs = [];
      var rightContentCheckBoxs_0 = [];
      var rightContentCheckBoxs_3 = [];
      var leftDisabledKeys = [];
      var bToRightEnable = false;
      var bToLeftEnable = false;
      editCondition.dataSource_Selected.forEach(function (ele, index) {
        var button = self.getColumnDefine(editCondition.columnDefineInfo, ele);
        if (ele.groupType == 0) {
          rightContentCheckBoxs_0.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: ele.bSelected ? ele.bSelected : false,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true);
                } },
              ele.caption
            ),
            button
          ));
        } else if (ele.groupType == 3) {
          rightContentCheckBoxs_3.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: ele.bSelected ? ele.bSelected : false,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true);
                } },
              ele.caption
            ),
            button
          ));
        }
        leftDisabledKeys.push(ele.fieldname);
        if (ele.groupType == editCondition.focusedGroupType) //&& ele.bSelected
          bToLeftEnable = true;
      });

      editCondition.dataSource_UnSelected.forEach(function (ele, index) {
        if (ele.caption.indexOf(editCondition.keyWord) > -1) {
          var bDisabled = leftDisabledKeys.indexOf(ele.fieldname) > -1 ? true : false;
          var bChecked = bDisabled || ele.bSelected ? true : false;

          leftContentCheckBoxs.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: bChecked,
                disabled: bDisabled,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, false);
                } },
              ele.caption
            )
          ));
          if (bDisabled == false) // && (ele.bSelected ? ele.bSelected : false) == false
            bToRightEnable = true;
        }
      });
      var RadioControl = [];
      RadioControl.push(_react2.default.createElement(
        'span',
        { className: 'crosstypeName' },
        _react2.default.createElement('i', { className: 'anticon anticon-star' }),
        '\u7C7B\u578B'
      ));
      if (bEdit == false || !editCondition.isCrossTable) {
        RadioControl.push(_react2.default.createElement(
          'span',
          { className: 'crosstypeNameList' },
          _react2.default.createElement(_antd.Radio, { checked: !editCondition.isCrossTable, onChange: function onChange(e) {
              return _this6.editCondition_SetIsCrossTable("isCrossTable", !e.target.checked);
            } })
        ));
        RadioControl.push(_react2.default.createElement(
          'span',
          { style: { cursor: "pointer" }, onClick: function onClick() {
              return _this6.editCondition_SetIsCrossTable("isCrossTable", false);
            } },
          '\u5206\u7EC4'
        ));
      }
      if (bEdit == false || editCondition.isCrossTable) {
        RadioControl.push(_react2.default.createElement(
          'span',
          { className: 'crosstypeNameList' },
          _react2.default.createElement(_antd.Radio, { checked: editCondition.isCrossTable, onChange: function onChange(e) {
              return _this6.editCondition_SetIsCrossTable("isCrossTable", e.target.checked);
            } })
        ));
        RadioControl.push(_react2.default.createElement(
          'span',
          { style: { cursor: "pointer" }, onClick: function onClick() {
              return _this6.editCondition_SetIsCrossTable("isCrossTable", true);
            } },
          '\u4EA4\u53C9'
        ));
      }

      var eChart = groupConditionState[this.getBillNum()].eChart;
      var isCanShowInMobile = this.canShowInMobile();
      var chartTags = this.getChartTags();
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _row2.default,
          { className: 'crosstype' },
          RadioControl
        ),
        _react2.default.createElement(
          _row2.default,
          { colCount: 12, className: 'crosstype' },
          _react2.default.createElement(
            _col2.default,
            { span: 1, className: 'crosstypeName crosstypeline' },
            _react2.default.createElement('i', { className: 'anticon anticon-star nametitlemarginstar' }),
            '\u540D\u79F0'
          ),
          _react2.default.createElement(_col2.default, { span: 1 }),
          _react2.default.createElement(
            _col2.default,
            { span: 4, className: 'crosstypeNameList crossinput' },
            _react2.default.createElement(_antd.Input, { defaultValue: editCondition.name, onChange: function onChange(e) {
                return _this6.editCondition_SetValue("name", e.target.value);
              } }),
            ' '
          ),
          _react2.default.createElement(_col2.default, { span: 1 }),
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'crosscheckbox' },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: editCondition.isDefault, onChange: function onChange(e) {
                  return _this6.editCondition_SetValue("isDefault", e.target.checked);
                } },
              '\u8BBE\u4E3A\u9ED8\u8BA4'
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'crosstype' },
          _react2.default.createElement(
            'span',
            { className: 'eChart-displayTitle' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u5E03\u5C40'
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChart-global' },
            _react2.default.createElement(
              'span',
              { className: 'eChart_DisplayType' },
              _react2.default.createElement(_antd.Radio, { checked: eChart.displayType == 3 ? true : false, onChange: function onChange(e) {
                  return _this6.eChartSetting_SetDisplayType(3);
                } })
            ),
            _react2.default.createElement(
              'span',
              { className: '', style: { cursor: "pointer" }, onClick: function onClick() {
                  return _this6.eChartSetting_SetDisplayType(3);
                } },
              '\u56FE+\u8868'
            ),
            _react2.default.createElement(
              'span',
              { className: 'eChart_DisplayType' },
              _react2.default.createElement(_antd.Radio, { checked: eChart.displayType == 2 ? true : false, onChange: function onChange(e) {
                  return _this6.eChartSetting_SetDisplayType(2);
                } })
            ),
            _react2.default.createElement(
              'span',
              { className: '', style: { cursor: "pointer" }, onClick: function onClick() {
                  return _this6.eChartSetting_SetDisplayType(2);
                } },
              '\u56FE'
            ),
            _react2.default.createElement(
              'span',
              { className: 'eChart_DisplayType' },
              _react2.default.createElement(_antd.Radio, { checked: eChart.displayType == 2 || eChart.displayType == 3 ? false : true, onChange: function onChange(e) {
                  return _this6.eChartSetting_SetDisplayType(1);
                } })
            ),
            _react2.default.createElement(
              'span',
              { className: '', style: { cursor: "pointer" }, onClick: function onClick() {
                  return _this6.eChartSetting_SetDisplayType(1);
                } },
              '\u8868'
            ),
            _react2.default.createElement(
              'span',
              { className: 'eChart_Setting' },
              _react2.default.createElement(
                _antd.Button,
                { disabled: eChart.displayType == 2 || eChart.displayType == 3 ? false : true, onClick: function onClick() {
                    return _this6.showEChartSetting(true, "");
                  } },
                '\u589E\u52A0\u56FE\u5F62\u62A5\u8868'
              )
            ),
            eChart.displayType > 1 ? _react2.default.createElement(
              'span',
              { className: 'Charts-columns' },
              '\u56FE\u8868\u5217\u6570'
            ) : "",
            eChart.displayType > 1 ? _react2.default.createElement(
              'span',
              { className: 'Charts-columns-input' },
              _react2.default.createElement(_antd.Input, {
                placeholder: '\u8BF7\u8F93\u5165',
                value: eChart.eChartConfig.subChartColNum,
                onChange: function onChange(e) {
                  return _this6.eChartSetting_SetSubChartColNum(e.target.value);
                }
              })
            ) : "",
            eChart.displayType > 1 ? _react2.default.createElement(
              'span',
              { className: 'Charts-columns-input-hint' },
              '\u8BF7\u8F93\u5165',
              _react2.default.createElement(
                'span',
                null,
                '1-3'
              ),
              '\u7684\u6574\u6570'
            ) : ""
          )
        ),
        eChart.displayType > 1 ? _react2.default.createElement(
          _row2.default,
          { className: 'crosstype' },
          _react2.default.createElement(
            'span',
            { className: 'crosstypeName crosstypeline' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u5C55\u793A'
          ),
          chartTags
        ) : "",
        _react2.default.createElement(
          _row2.default,
          { className: 'crosstype' },
          _react2.default.createElement(
            'span',
            { className: 'eChart-ApplyAt' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u5C55\u73B0'
          ),
          _react2.default.createElement(
            'span',
            { className: 'eChart-ApplyAtPc', style: { cursor: "pointer" } },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: editCondition.isPc, onChange: function onChange(e) {
                  return _this6.editCondition_SetValue("isPc", e.target.checked);
                } },
              'PC\u7AEF\u5C55\u73B0'
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'eChart-ApplyAtMobile', style: { cursor: "pointer" } },
            _react2.default.createElement(
              _antd.Checkbox,
              { disabled: !isCanShowInMobile, checked: editCondition.isMobile, onChange: function onChange(e) {
                  return _this6.editCondition_SetValue("isMobile", e.target.checked);
                } },
              '\u79FB\u52A8\u7AEF\u5C55\u73B0'
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { colCount: 12 },
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'crossadddata' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _row2.default,
                { className: 'crossaddnamemargin' },
                '\u6DFB\u52A0\u6570\u636E\u9879'
              ),
              _react2.default.createElement(
                'div',
                { className: 'crossselectborder' },
                _react2.default.createElement(_InputSearch2.default, { placeholder: '\u8BF7\u8F93\u5165\u5173\u952E\u5B57',
                  value: editCondition.keyWord,
                  onChange: function onChange(value) {
                    return _this6.editCondition_SetValue("keyWord", value.currentTarget.value);
                  }
                  /*onPressEnter={this.InputKeyWord}
                  onSearch={this.InputKeyWord}*/
                  , onDelete: function onDelete() {
                    return _this6.editCondition_SetValue("keyWord", "");
                  }
                }),
                _react2.default.createElement(
                  _row2.default,
                  { className: 'crossadddatalist' },
                  leftContentCheckBoxs
                )
              )
            )
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 2, className: 'crossbtncount' },
            _react2.default.createElement(_antd.Button, { disabled: !bToRightEnable, onClick: function onClick() {
                return _this6.moveItems(true);
              }, className: bToRightEnable ? "icon-right-enabled" : "icon-right-disabled" }),
            _react2.default.createElement(_antd.Button, { disabled: !bToLeftEnable, onClick: function onClick() {
                return _this6.moveItems(false);
              }, className: bToLeftEnable ? "icon-left-enabled" : "icon-left-disabled" })
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'selecteddata' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _row2.default,
                { className: 'crossaddnamemargin' },
                '\u5DF2\u9009\u6570\u636E\u9879'
              ),
              _react2.default.createElement(
                'div',
                { className: 'groupCondition-SelectedItem' },
                _react2.default.createElement(
                  'div',
                  { onClick: function onClick() {
                      return _this6.editCondition_SetValue("focusedGroupType", 0);
                    }, className: 'groupCondition-SelectedItem-Row2' },
                  _react2.default.createElement(
                    'div',
                    { className: "titlemore  titlemore-none" + (editCondition.focusedGroupType == 0 ? " groupCondition-SelectedItem-Selected" : "") },
                    _react2.default.createElement(
                      'span',
                      null,
                      '\u7EF4\u5EA6'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'titlename-list3' },
                    rightContentCheckBoxs_0
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { onClick: function onClick() {
                      return _this6.editCondition_SetValue("focusedGroupType", 3);
                    }, className: 'groupCondition-SelectedItem-Row2' },
                  _react2.default.createElement(
                    'div',
                    { className: "titlemore" + (editCondition.focusedGroupType == 3 ? " groupCondition-SelectedItem-Selected" : "") },
                    _react2.default.createElement(
                      'span',
                      null,
                      '\u6307\u6807'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'groupCondition-HideAllZeroRow', style: { display: '' } },
                      _react2.default.createElement(
                        _antd.Checkbox,
                        { checked: !editCondition.isDisplayZero,
                          onChange: function onChange(e) {
                            return _this6.editCondition_SetValue("isDisplayZero", !e.target.checked);
                          } },
                        '\u4E0D\u663E\u793A\u6307\u6807\u5168\u4E3A\u96F6\u7684\u6570\u636E\u884C'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'titlename-list3' },
                    rightContentCheckBoxs_3
                  )
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getChartTags',
    value: function getChartTags() {
      var self = this;
      var groupConditionState = this.props.groupConditionState;

      var eChart = groupConditionState[this.getBillNum()].eChart;
      var subChartConfigArr = _.get(eChart, "eChartConfig.subChartConfigArr");
      var bShowEChartSetting = groupConditionState[this.getBillNum()].bShowEChartSetting;
      var bShowEChartSetting_Add = groupConditionState[this.getBillNum()].bShowEChartSetting_Add;
      var tags = [];
      if (subChartConfigArr) {
        subChartConfigArr.forEach(function (ele, index) {
          var bAddAndLastOne = index == subChartConfigArr.length - 1 && bShowEChartSetting && bShowEChartSetting_Add;
          if (bAddAndLastOne == false) {
            var textPath = "eChartSetting.title.text";
            if (_.get(ele, "yySetting.type") == "ranktable") {
              textPath = "yySetting.title.text";
            }
            var name = _.get(ele, textPath) || "图形";
            tags.push(_react2.default.createElement(
              'div',
              { className: 'eChart-SubChartTag' },
              _react2.default.createElement(
                'span',
                { className: 'eChart-SubChartTag-Name', onClick: function onClick() {
                    return self.showEChartSetting(true, ele.chartKey);
                  } },
                name
              ),
              _react2.default.createElement(
                'span',
                { className: 'eChart-SubChartTag-Icon' },
                _react2.default.createElement(_antd.Icon, {
                  onClick: function onClick() {
                    return self.removeConfig(ele.chartKey);
                  },
                  type: "guanbi1"
                })
              )
            ));
          }
        });
      }
      return _react2.default.createElement(
        'div',
        { className: 'eChart-global2' },
        tags
      );
    }
  }, {
    key: 'canShowInMobile',
    value: function canShowInMobile() {
      var groupConditionState = this.props.groupConditionState;

      var isCanShowInMobile = true;
      var subChartConfigArr = _.get(groupConditionState[this.getBillNum()], 'eChart.eChartConfig.subChartConfigArr');
      if (subChartConfigArr) {
        if (_.findIndex(subChartConfigArr, function (o) {
          return o.yySetting.type == "ranktable";
        }) >= 0) {
          isCanShowInMobile = false;
        }
      }
      return isCanShowInMobile;
    }
  }, {
    key: 'setColumnDefineValue',

    // cancelSetting() {
    //   this.setState({ bCancelSetting: true });
    // }
    value: function setColumnDefineValue(groupType, fieldname, defineName, value) {
      var _props7 = this.props,
          groupConditionState = _props7.groupConditionState,
          groupConditionRedux = _props7.groupConditionRedux;

      groupConditionRedux.setColumnDefineValue(this.getBillNum(), groupType, fieldname, defineName, value);
    }

    /*getColumnDefineRender(itemEle, defineData) {
      // "data": [
      //         {
      //             "controltype": "select",
      //             "name": "function",
      //             "caption": "函数",
      //             "enumArray": "[{\"value\":\"日期\",\"key\":\"fn_formatdateyyyymmdd\"},{\"value\":\"年\",\"key\":\"year\"},{\"value\":\"月\",\"key\":\"month\"}]",
      //             "value": "fn_formatdateyyyymmdd"
      //         },
      //     ]
      const {groupConditionState, groupConditionRedux } = this.props;
      let self = this;
      let renderList = [];
      if (defineData && defineData.length > 0) {
            defineData.forEach(function (ele, index) {
              let item;
              if (ele.controltype == "select") {
                let options = new Array();
                if (ele.enumArray && ele.enumArray.length) {
                  let arr = JSON.parse(ele.enumArray);
                  arr.forEach(function (ele2) {
                    options.push(<Option value={ele2.key}>{ele2.value}</Option>);
                  });
                }
                item =
                  <div>
                    <span>{ele.caption} </span>
                    <Select value={ele.value}
                      notFoundContent="无法找到"
                      onChange={e => this.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e)}>
                      {options}
                    </Select>
                  </div>;
               }
              else if (ele.controltype == "checkbox") {
                item = <Checkbox
                  checked={ele.value == "true" ? true : false}
                  onChange={(e) => self.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e.target.checked.toString())}>
                  {ele.caption}
                </Checkbox>;
              }
              if (item)
                renderList.push(<div  >{item}</div>);
            }, this);
          }
       return (
        <div className="group-add-grouping-count">
            <div  >{renderList}</div>
            <div >
              <Button type={"primary"} onClick={() => self.SaveColumnDefine(true)}>保存</Button>
              <Button type={"default"} onClick={() => self.SaveColumnDefine(false)}>取消</Button>
            </div>
          </div>
          );
    }*/

  }, {
    key: 'getColumnDefineRender',
    value: function getColumnDefineRender(itemEle, defineData) {
      // "data": [
      //         {
      //             "controltype": "select",
      //             "name": "function",
      //             "caption": "函数",
      //             "enumArray": "[{\"value\":\"日期\",\"key\":\"fn_formatdateyyyymmdd\"},{\"value\":\"年\",\"key\":\"year\"},{\"value\":\"月\",\"key\":\"month\"}]",
      //             "value": "fn_formatdateyyyymmdd"
      //         },
      //     ]
      {/*<RadioGroup onChange={this.onChange} value={this.state.value}>
           <Radio value={1}>A</Radio>
           <Radio value={2}>B</Radio>
           <Radio value={3}>C</Radio>
           <Radio value={4}>D</Radio>
         </RadioGroup>*/}
      var _props8 = this.props,
          groupConditionState = _props8.groupConditionState,
          groupConditionRedux = _props8.groupConditionRedux;

      var self = this;
      var renderList = [];
      if (defineData && defineData.length > 0) {
        defineData.forEach(function (ele, index) {
          var _this7 = this;

          var item = void 0;
          if (ele.controltype == "select") {
            var options = new Array();
            if (ele.enumArray && ele.enumArray.length) {
              var arr = JSON.parse(ele.enumArray);
              arr.forEach(function (ele2) {
                options.push(_react2.default.createElement(
                  _antd.Radio,
                  { value: ele2.key },
                  ele2.value
                ));
              });
            }
            item = _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                null,
                ele.caption,
                ' '
              ),
              _react2.default.createElement(
                RadioGroup,
                {
                  value: ele.value,
                  onChange: function onChange(e) {
                    return _this7.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e.target.value);
                  } },
                options
              )
            );
          } else if (ele.controltype == "checkbox") {
            item = _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: ele.value == "true" ? true : false,
                onChange: function onChange(e) {
                  return self.setColumnDefineValue(itemEle.groupType, itemEle.fieldname, ele.name, e.target.checked.toString());
                } },
              ele.caption
            );
          }
          if (item) renderList.push(_react2.default.createElement(
            'div',
            null,
            item
          ));
        }, this);
      }

      return _react2.default.createElement(
        'div',
        { className: 'group-add-grouping-count' },
        _react2.default.createElement(
          'div',
          null,
          renderList
        ),
        _react2.default.createElement(
          'div',
          { className: 'footer-btn' },
          _react2.default.createElement(
            _antd.Button,
            { type: "primary", onClick: function onClick() {
                return self.SaveColumnDefine(true);
              } },
            '\u4FDD\u5B58'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: "default", onClick: function onClick() {
                return self.SaveColumnDefine(false);
              } },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }, {
    key: 'SaveColumnDefine',
    value: function SaveColumnDefine(bSave) {
      var _props9 = this.props,
          groupConditionState = _props9.groupConditionState,
          groupConditionRedux = _props9.groupConditionRedux;

      groupConditionRedux.editCondition_SaveColumnDefine(this.getBillNum(), bSave);
    }
  }, {
    key: 'getColumnDefine',
    value: function getColumnDefine(columnDefineInfo, itemEle) {
      var _this8 = this;

      var showIt = columnDefineInfo.bShowDefine && (columnDefineInfo.itemEle ? columnDefineInfo.itemEle.groupType : -1) == itemEle.groupType && (columnDefineInfo.itemEle ? columnDefineInfo.itemEle.fieldname : "") == itemEle.fieldname;

      if (itemEle.canSet || itemEle.groupType == 1) {
        var columnDefineRender = undefined;
        // if (showIt) {
        columnDefineRender = this.getColumnDefineRender(itemEle, columnDefineInfo.defineData);
        // }
        var conditionPop = _react2.default.createElement(
          _antd.Popover,
          {
            overlayClassName: 'groupCondition-ColumnDefine',
            content: columnDefineRender,
            trigger: "click",
            visible: showIt },
          _react2.default.createElement(
            'div',
            { className: 'groupCondition-ColumnDefine-Design' },
            _react2.default.createElement(
              'span',
              {
                style: { cursor: "pointer" },
                onClick: function onClick() {
                  return _this8.showColumnDefine(!columnDefineInfo.bShowDefine, itemEle);
                }
              },
              '\u8BBE\u7F6E'
            )
          )
        );
        var cMemo = itemEle.cColumnDefineMemo;
        if (cMemo == undefined && itemEle.settings && itemEle.settings.length > 0) {
          cMemo = _.join(itemEle.settings, '/');
        }
        var cColumnDefineMemo = void 0;
        if (_.isEmpty(cMemo) == false) cColumnDefineMemo = _react2.default.createElement(
          'div',
          { className: 'columnDeinfe_Memo-count' },
          _react2.default.createElement(
            'span',
            null,
            '('
          ),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'columnDeinfe_Memo', title: cMemo },
            cMemo
          ),
          ' ',
          _react2.default.createElement(
            'span',
            null,
            ')'
          )
        );
        return _react2.default.createElement(
          'div',
          null,
          cColumnDefineMemo,
          ' ',
          conditionPop
        );
      } else {
        return undefined;
      }
    }
  }, {
    key: 'showColumnDefine',
    value: function showColumnDefine(bShowDefine, itemEle) {
      var _props10 = this.props,
          groupConditionState = _props10.groupConditionState,
          groupConditionRedux = _props10.groupConditionRedux;

      groupConditionRedux.editCondition_ShowColumnDefine(this.getBillNum(), bShowDefine, itemEle);
    }
  }, {
    key: 'getCrossCardRender',
    value: function getCrossCardRender() {
      var _this9 = this;

      var self = this;
      var _props11 = this.props,
          groupConditionState = _props11.groupConditionState,
          groupConditionRedux = _props11.groupConditionRedux;

      var bEdit = groupConditionState[this.getBillNum()].editCondition.bEdit;
      var editCondition = groupConditionState[this.getBillNum()].editCondition;
      var leftContentCheckBoxs = [];
      var rightContentCheckBoxs_0 = [];
      var rightContentCheckBoxs_1 = [];
      var rightContentCheckBoxs_2 = [];
      var rightContentCheckBoxs_3 = [];
      var leftDisabledKeys = [];
      var bToRightEnable = false;
      var bToLeftEnable = false;

      // groupType 值
      // 分组  0 分组项  3  统计项
      // 交叉  0 行标题  1 列标题  2 交叉点
      editCondition.dataSource_Selected.forEach(function (ele, index) {
        var button = self.getColumnDefine(editCondition.columnDefineInfo, ele);
        if (ele.groupType == 0) {
          rightContentCheckBoxs_0.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: ele.bSelected ? ele.bSelected : false,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true);
                } },
              ele.caption
            ),
            button
          ));
          if (editCondition.focusedGroupType == 0 || editCondition.focusedGroupType == 2) leftDisabledKeys.push(ele.fieldname);
        }
        if (ele.groupType == 1) {
          rightContentCheckBoxs_1.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: ele.bSelected ? ele.bSelected : false,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true);
                } },
              ele.caption
            ),
            button
          ));
          if (editCondition.focusedGroupType == 1 || editCondition.focusedGroupType == 2) leftDisabledKeys.push(ele.fieldname);
        }
        if (ele.groupType == 2) {
          rightContentCheckBoxs_2.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: ele.bSelected ? ele.bSelected : false,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true);
                } },
              ele.caption
            ),
            button
          ));
          leftDisabledKeys.push(ele.fieldname);
        }
        if (ele.groupType == 3) {
          rightContentCheckBoxs_3.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: ele.bSelected ? ele.bSelected : false,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, true);
                } },
              ele.caption
            ),
            button
          ));
          leftDisabledKeys.push(ele.fieldname);
        }
        if (ele.groupType == editCondition.focusedGroupType) //&& ele.bSelected
          bToLeftEnable = true;
      });

      editCondition.dataSource_UnSelected.forEach(function (ele, index) {
        if (ele.caption.indexOf(editCondition.keyWord) > -1) {
          var bDisabled = leftDisabledKeys.indexOf(ele.fieldname) > -1 ? true : false;
          var bChecked = bDisabled || ele.bSelected ? true : false;

          leftContentCheckBoxs.push(_react2.default.createElement(
            _row2.default,
            { title: ele.tooltip || ele.caption },
            _react2.default.createElement(
              _antd.Checkbox,
              {
                checked: bChecked,
                disabled: bDisabled,
                onChange: function onChange(e) {
                  return self.selectItems(ele.groupType, ele.fieldname, e.target.checked, false);
                } },
              ele.caption
            )
          ));
          if (bDisabled == false) //&& (ele.bSelected ? ele.bSelected : false) == false
            bToRightEnable = true;
        }
      });

      var RadioControl = [];
      RadioControl.push(_react2.default.createElement(
        'span',
        { className: 'crosstypeName' },
        _react2.default.createElement('i', { className: 'anticon anticon-star' }),
        ' \u7C7B\u578B'
      ));
      if (bEdit == false || !editCondition.isCrossTable) {
        RadioControl.push(_react2.default.createElement(
          'span',
          { className: 'crosstypeNameList' },
          _react2.default.createElement(_antd.Radio, { checked: !editCondition.isCrossTable, onChange: function onChange(e) {
              return _this9.editCondition_SetIsCrossTable("isCrossTable", !e.target.checked);
            } })
        ));
        RadioControl.push(_react2.default.createElement(
          'span',
          { style: { cursor: "pointer" }, onClick: function onClick() {
              return _this9.editCondition_SetIsCrossTable("isCrossTable", false);
            } },
          '\u5206\u7EC4'
        ));
      }
      if (bEdit == false || editCondition.isCrossTable) {
        RadioControl.push(_react2.default.createElement(
          'span',
          { className: 'crosstypeNameList' },
          _react2.default.createElement(_antd.Radio, { checked: editCondition.isCrossTable, onChange: function onChange(e) {
              return _this9.editCondition_SetIsCrossTable("isCrossTable", e.target.checked);
            } })
        ));
        RadioControl.push(_react2.default.createElement(
          'span',
          { style: { cursor: "pointer" }, onClick: function onClick() {
              return _this9.editCondition_SetIsCrossTable("isCrossTable", true);
            } },
          '\u4EA4\u53C9'
        ));
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _row2.default,
          { className: 'crosstype' },
          RadioControl
        ),
        _react2.default.createElement(
          _row2.default,
          { colCount: 12, className: 'crosstype' },
          _react2.default.createElement(
            _col2.default,
            { span: 1, className: 'crosstypeName crosstypeline' },
            _react2.default.createElement('i', { className: 'anticon anticon-star nametitlemarginstar' }),
            ' \u540D\u79F0'
          ),
          _react2.default.createElement(_col2.default, { span: 1 }),
          _react2.default.createElement(
            _col2.default,
            { span: 4, className: 'crosstypeNameList crossinput' },
            _react2.default.createElement(_antd.Input, { defaultValue: editCondition.name, onChange: function onChange(e) {
                return _this9.editCondition_SetValue("name", e.target.value);
              } }),
            ' '
          ),
          _react2.default.createElement(_col2.default, { span: 1 })
        ),
        _react2.default.createElement(
          _row2.default,
          { colCount: 12, className: 'crosstype' },
          _react2.default.createElement(
            'span',
            { className: 'eChart-ApplyAt' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u5C55\u73B0'
          ),
          _react2.default.createElement(
            'span',
            { className: 'eChart-ApplyAtPc', style: { cursor: "pointer" } },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: editCondition.isPc, onChange: function onChange(e) {
                  return _this9.editCondition_SetValue("isPc", e.target.checked);
                } },
              'PC\u7AEF\u5C55\u73B0'
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'eChart-ApplyAtMobile', style: { cursor: "pointer" } },
            _react2.default.createElement(
              _antd.Checkbox,
              { disabled: true, checked: editCondition.isMobile, onChange: function onChange(e) {
                  return _this9.editCondition_SetValue("isMobile", e.target.checked);
                } },
              '\u79FB\u52A8\u7AEF\u5C55\u73B0'
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { colCount: 12 },
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'crossadddata' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _row2.default,
                { className: 'crossaddnamemargin' },
                '\u6DFB\u52A0\u6570\u636E\u9879'
              ),
              _react2.default.createElement(
                'div',
                { className: 'crossselectborder crossselectborder2' },
                _react2.default.createElement(_InputSearch2.default, { placeholder: '\u8BF7\u8F93\u5165\u5173\u952E\u5B57',
                  value: editCondition.keyWord,
                  onChange: function onChange(value) {
                    return _this9.editCondition_SetValue("keyWord", value.currentTarget.value);
                  }
                  /*onPressEnter={this.InputKeyWord}
                  onSearch={this.InputKeyWord}*/
                  , onDelete: function onDelete() {
                    return _this9.editCondition_SetValue("keyWord", "");
                  }
                }),
                _react2.default.createElement(
                  _row2.default,
                  { className: 'crossadddatalist' },
                  leftContentCheckBoxs
                )
              )
            )
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 2, className: 'crossbtncount' },
            _react2.default.createElement(_antd.Button, { disabled: !bToRightEnable, onClick: function onClick() {
                return _this9.moveItems(true);
              }, className: bToRightEnable ? "icon-right-enabled" : "icon-right-disabled" }),
            _react2.default.createElement(_antd.Button, { disabled: !bToLeftEnable, onClick: function onClick() {
                return _this9.moveItems(false);
              }, className: bToLeftEnable ? "icon-left-enabled" : "icon-left-disabled" })
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'selecteddata' },
            _react2.default.createElement(
              'div',
              { className: 'groupCondition-Selected' },
              _react2.default.createElement(
                _row2.default,
                { className: 'crossaddnamemargin' },
                '\u5DF2\u9009\u6570\u636E\u9879'
              ),
              _react2.default.createElement(
                'div',
                { className: 'groupCondition-SelectedItem groupCondition-SelectedItem2' },
                _react2.default.createElement(
                  'div',
                  { onClick: function onClick() {
                      return _this9.editCondition_SetValue("focusedGroupType", 0);
                    }, className: "groupCondition-SelectedItem-Row groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3") },
                  _react2.default.createElement(
                    'div',
                    { className: "titlemore  titlemore-none" + (editCondition.focusedGroupType == 0 ? " groupCondition-SelectedItem-Selected" : "") },
                    _react2.default.createElement(
                      'span',
                      null,
                      '\u884C\u6807\u9898'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'titlename-list' },
                    rightContentCheckBoxs_0
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { onClick: function onClick() {
                      return _this9.editCondition_SetValue("focusedGroupType", 1);
                    }, className: "groupCondition-SelectedItem-Row groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3") },
                  _react2.default.createElement(
                    'div',
                    { className: "titlemore" + (editCondition.focusedGroupType == 1 ? " groupCondition-SelectedItem-Selected" : "") },
                    _react2.default.createElement(
                      'span',
                      null,
                      '\u5217\u6807\u9898'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'titlename-list' },
                    rightContentCheckBoxs_1
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { onClick: function onClick() {
                      return _this9.editCondition_SetValue("focusedGroupType", 2);
                    }, className: "groupCondition-SelectedItem-Row groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3") },
                  _react2.default.createElement(
                    'div',
                    { className: "titlemore" + (editCondition.focusedGroupType == 2 ? " groupCondition-SelectedItem-Selected" : "") },
                    _react2.default.createElement(
                      'span',
                      null,
                      '\u4EA4\u53C9\u70B9'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'groupCondition-HideAllZeroRow', style: { display: 'none' } },
                      _react2.default.createElement(
                        _antd.Checkbox,
                        { checked: !editCondition.isDisplayZero,
                          onChange: function onChange(e) {
                            return _this9.editCondition_SetValue("isDisplayZero", !e.target.checked);
                          } },
                        '\u4E0D\u663E\u793A\u6307\u6807\u5168\u4E3A\u96F6\u7684\u6570\u636E\u884C'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'titlename-list' },
                    rightContentCheckBoxs_2
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { style: { display: "" }, className: "groupCondition-SelectedItem-zhibiao groupCondition-SelectedItemNum" + (this.state.bUseZhiBiao ? "_4" : "_3") },
                  _react2.default.createElement(
                    'div',
                    {
                      onClick: function onClick() {
                        return _this9.zhiBiaoClicked();
                      }, className: "titlemore" + (editCondition.focusedGroupType == 3 ? " groupCondition-SelectedItem-Selected" : "") },
                    _react2.default.createElement(
                      'span',
                      null,
                      '\u6307\u6807'
                    ),
                    _react2.default.createElement(_antd.Icon, { type: this.state.bUseZhiBiao ? "up" : "down" })
                  ),
                  _react2.default.createElement(
                    'div',
                    { onClick: function onClick() {
                        return _this9.editCondition_SetValue("focusedGroupType", 3);
                      }, className: 'titlename-list' },
                    rightContentCheckBoxs_3
                  )
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'zhiBiaoClicked',
    value: function zhiBiaoClicked() {

      this.state.bUseZhiBiao = !this.state.bUseZhiBiao;
      if (this.state.bUseZhiBiao) {
        this.editCondition_SetValue("focusedGroupType", 3);
      } else {
        this.editCondition_SetValue("focusedGroupType", 0);
      }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //   if (nextProps.groupConditionState === this.props.groupConditionState)
    //     return false;
    //   return true;
    // }

  }]);

  return GroupCondition;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this10 = this;

  this.handleBodyClick = function (e) {
    var _props12 = _this10.props,
        groupConditionState = _props12.groupConditionState,
        groupConditionRedux = _props12.groupConditionRedux;
    // if (this.contains(this.refs.input_search, e.target)) return;

    if (e.target && cb.dom(e.target).parents('div.ant-popover').length) return;
    if (e.target.parentElement.className == "ant-input-group-addon") return;
    if (e.target.parentElement.className == "ant-popover-open") return;
    if (e.target.tagName == "CANVAS") return;
    if (e.target.parentElement.parentElement.className == "ant-popover-open") return;
    if (e.target.parentElement.className == "ant-input-wrapper ant-input-group") return;
    if (groupConditionState[_this10.getBillNum()].bShowCard == true) {
      if (groupConditionState[_this10.getBillNum()].editCondition.columnDefineInfo.bShowDefine == true) {
        _this10.showColumnDefine(false, {});
      }
      return;
    }
    document.body.removeEventListener('click', _this10.handleBodyClick);
    groupConditionRedux.setValue(_this10.getBillNum(), { bShowList: false });
  };

  this.ShowList = function () {
    if (_this10.noGroupAndAuth == true) {
      cb.utils.alert("没有任何分组信息。");
      return;
    }
    document.body.addEventListener('click', _this10.handleBodyClick);
    var _props13 = _this10.props,
        groupConditionState = _props13.groupConditionState,
        groupConditionRedux = _props13.groupConditionRedux;

    groupConditionRedux.showList(_this10.getBillNum(), !groupConditionState[_this10.getBillNum()].bShowList);
  };

  this.handleOk = function (e) {
    var _props14 = _this10.props,
        groupConditionState = _props14.groupConditionState,
        groupConditionRedux = _props14.groupConditionRedux;


    var condition = groupConditionState[_this10.getBillNum()].editCondition;
    var eChart = groupConditionState[_this10.getBillNum()].eChart;

    if (eChart && (eChart.displayType == 2 || eChart.displayType == 3) && (_.isEmpty(eChart.eChartConfig) == true || _.isEmpty(eChart.eChartConfig.subChartConfigArr) == true)) {
      cb.utils.alert("请设置图形报表信息。");
    } else if (condition.name == undefined || condition.name.trim() == "") {
      cb.utils.alert("名称不可为空。");
    } else if (_.isNull(eChart.eChartConfig.subChartColNum) || eChart.eChartConfig.subChartColNum.toString().trim() == "") {
      cb.utils.alert("图表列数请输入1-3的整数。");
    } else if (isNaN(eChart.eChartConfig.subChartColNum) == true || Number(eChart.eChartConfig.subChartColNum) < 1 || Number(eChart.eChartConfig.subChartColNum) > 3) {
      cb.utils.alert("图表列数请输入1-3的整数。");
    } else if (condition.dataSource_Selected.length == 0) {
      cb.utils.alert("没有选择列信息。");
    } else if (condition.isPc == false && condition.isMobile == false) {
      cb.utils.alert("请选择适用于PC/移动。");
    } else {
      var viewModel = _this10.props.viewModel;

      groupConditionRedux.saveCondition(_this10.getBillNum(), viewModel);
    }
  };

  this.handleCancel = function (e) {
    var _props15 = _this10.props,
        groupConditionState = _props15.groupConditionState,
        groupConditionRedux = _props15.groupConditionRedux;

    groupConditionRedux.cancelEdit(_this10.getBillNum());
  };

  this.editCondition_SetValue = function (fieldName, fieldValue) {
    var _props16 = _this10.props,
        groupConditionState = _props16.groupConditionState,
        groupConditionRedux = _props16.groupConditionRedux;

    groupConditionRedux.editCondition_SetValue(_this10.getBillNum(), fieldName, fieldValue);
  };

  this.editCondition_SetIsCrossTable = function (fieldName, fieldValue) {
    var _props17 = _this10.props,
        groupConditionState = _props17.groupConditionState,
        groupConditionRedux = _props17.groupConditionRedux;

    groupConditionRedux.editCondition_SetIsCrossTable(_this10.getBillNum(), fieldName, fieldValue);
  };

  this.handleScroll = function (direction, e) {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  this.moveItems = function (bToRight) {
    var _props18 = _this10.props,
        groupConditionState = _props18.groupConditionState,
        groupConditionRedux = _props18.groupConditionRedux;

    groupConditionRedux.editCondition_MoveItems(_this10.getBillNum(), bToRight);
  };

  this.selectItems = function (groupType, selectedKey, bSelected, bSelectedItems) {
    var _props19 = _this10.props,
        groupConditionState = _props19.groupConditionState,
        groupConditionRedux = _props19.groupConditionRedux;

    groupConditionRedux.editCondition_SelectedKey(_this10.getBillNum(), groupType, selectedKey, bSelected, bSelectedItems);
  };

  this.eChartSetting_SetSubChartColNum = function (fieldValue) {
    var _props20 = _this10.props,
        groupConditionState = _props20.groupConditionState,
        groupConditionRedux = _props20.groupConditionRedux;

    if (fieldValue != "" && (isNaN(fieldValue) == true || Number(fieldValue) < 1 || Number(fieldValue) > 3)) {
      groupConditionRedux.eChartSetting_ReturnNothing();
      return;
    } else {
      if (fieldValue.indexOf(".") >= 0) {
        fieldValue = fieldValue.substring(0, fieldValue.indexOf("."));
      }
      groupConditionRedux.eChartSetting_SetSubChartColNum(_this10.getBillNum(), fieldValue);
    }
  };

  this.eChartSetting_SetDisplayType = function (value) {
    var _props21 = _this10.props,
        groupConditionState = _props21.groupConditionState,
        groupConditionRedux = _props21.groupConditionRedux;

    groupConditionRedux.eChartSetting_SetDisplayType(_this10.getBillNum(), value);
  };

  this.removeConfig = function (chartKey) {
    // bShow 是否显示  true false
    // chartKey 为空则为新增，不为空则为编辑
    var _props22 = _this10.props,
        groupConditionState = _props22.groupConditionState,
        groupConditionRedux = _props22.groupConditionRedux;
    // this.state.bCancelSetting = false;

    groupConditionRedux.eChartSetting_RemoveConfig(_this10.getBillNum(), chartKey);
  };

  this.showEChartSetting = function (bShow, chartKey) {
    // bShow 是否显示  true false
    // chartKey 为空则为新增，不为空则为编辑
    var _props23 = _this10.props,
        groupConditionState = _props23.groupConditionState,
        groupConditionRedux = _props23.groupConditionRedux;
    // this.state.bCancelSetting = false;

    if (bShow) {
      if (!!chartKey) {
        var config = eChartCommon.subConfig_Get(groupConditionState[_this10.getBillNum()].eChart, chartKey);
        _this10.chart_Backup = config;
        _this10.chartKey_Backup = chartKey;
      } else {
        _this10.chart_Backup = undefined;
        _this10.chartKey_Backup = "";
      }
      groupConditionRedux.eChartSetting_Show(_this10.getBillNum(), bShow, chartKey);
    } else {
      groupConditionRedux.eChartSetting_CancelChartConfig(_this10.getBillNum(), _this10.chart_Backup, _this10.chartKey_Backup, !_this10.chartKey_Backup);
    }
  };

  this.eChartSetting_getRender = function () {
    var _props24 = _this10.props,
        groupConditionState = _props24.groupConditionState,
        groupConditionRedux = _props24.groupConditionRedux;

    var content = null;

    if (groupConditionState[_this10.getBillNum()].bShowEChartSetting == true) {
      content = _react2.default.createElement(
        _antd.Modal,
        {
          className: 'eChartSetting_Modal',
          title: '\u8BBE\u7F6E\u56FE\u5F62\u62A5\u8868',
          visible: true,
          footer: null,
          onCancel: function onCancel() {
            return _this10.showEChartSetting(false, "");
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'eChartSetting_Control' },
          _react2.default.createElement(_eChartDesign2.default, {
            billnum: _this10.getBillNum(),
            chartKey: groupConditionState[_this10.getBillNum()].showEChartKey,
            reportFields: groupConditionState[_this10.getBillNum()].editCondition.dataSource_Selected
            // bCancelSetting={this.state.bCancelSetting}
          })
        )
      );
    }
    return content;
  };
};

function mapStateToProps(state) {
  return {
    groupConditionState: state.groupCondition.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    groupConditionRedux: (0, _redux.bindActionCreators)(groupConditionRedux, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GroupCondition);