'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

var BasicComponents = _interopRequireWildcard(_basic);

var _FilterScheme = require('./FilterScheme');

var _FilterScheme2 = _interopRequireDefault(_FilterScheme);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Row, Col, Button, Input, Label, DatePicker, Refer, TreeRefer, Tag2 } from '../basic';


// 过滤控件
var Row = BasicComponents.Row,
    Col = BasicComponents.Col,
    Button = BasicComponents.Button,
    Label = BasicComponents.Label,
    Tag2 = BasicComponents.Tag2;

var BasicComponentsMap = {};
for (var attr in BasicComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
}
var ConvenientQuery = function (_React$Component) {
  _inherits(ConvenientQuery, _React$Component);

  function ConvenientQuery(props) {
    _classCallCheck(this, ConvenientQuery);

    var _this = _possibleConstructorReturn(this, (ConvenientQuery.__proto__ || Object.getPrototypeOf(ConvenientQuery)).call(this, props));

    _this.Tag2Clicked = function () {
      _this.SearchEvent();
    };

    _this.handleSchemeChange = function (solutionId) {
      _this.vm.fireEvent('loadScheme', solutionId);
    };

    _this.handleSchemeListChange = function (solutionList) {
      _this.vm.setCache('schemeList', solutionList);
    };

    var params = props.model.getParams();
    var filterId = props.config && props.config.filterid || params.filterId;
    var cardKey = params.cardKey;
    var Id = props.model.id;
    console.log(filterId);
    _this.state = {
      filterId: filterId,
      cardKey: cardKey,
      modelId: Id,
      schemeData: [],
      current: '',
      schemeName: '',
      showMore: false,
      popFlag: false,
      filterModel: [],
      tag2FilterCount: 0,
      commonFilterCount: 0,
      filterAreaCount: 0,
      tag2InFirstRow: false
    };
    _this.showFields = new Array();
    _this.filterModel_Tmp = [];

    _this.state.isInPanel = params.isInPanel ? params.isInPanel : false;
    _this.state.isInDesign = params.isInDesign ? params.isInDesign : false;
    _this.state.panelType = params.panelType || 0;
    // debugger;
    _this.vm = cb.loader.initMetaCommonViewModel('FilterViewModel', 'filterViewModel', {
      filterId: filterId,
      condition: params.condition,
      cardKey: cardKey,
      isInPanel: _this.state.isInPanel,
      isInDesign: _this.state.isInDesign,
      solutionId: params.solutionId,
      viewid: _lodash2.default.get(props.model.getParams(), 'query.viewid'),
      bHasNullDate: props.model.getParams().bHasNullDate || false
    }, _this.props.model, ['filterClick']);
    _this._DocumentMouseDown = _this._DocumentMouseDown.bind(_this);
    _this.props.model.on('updateCondition', function (condition) {
      if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
      var flag = true;
      _this.vm.setCache('condition', condition);
      condition.commonVOs.forEach(function (a) {
        var attr = a.itemName;
        var itemModel = _this.vm.get(attr);
        if (!itemModel) return;
        itemModel.getFromModel().setValue(a.value1);
        var ctrlType = itemModel.getState('ctrlType');
        if (ctrlType && ctrlType.trim().toLocaleLowerCase() === 'tagbutton') flag = false;
      });
      if (flag) _this.SearchEvent();
    });

    _this.props.model.on('eChartPanel_GetCondition', function () {
      _this.SearchEvent();
    });
    return _this;
  }

  _createClass(ConvenientQuery, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.vm) {
        this.vm.addListener(this);
      }
      this.mousedownHandler = (0, _addEventListener2.default)(document, 'mousedown', this._DocumentMouseDown);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.model.execute('filterHeightUpdate');
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.vm.removeListener(this);
      this.mousedownHandler.remove();
      this.mousedownHandler = null;
    }
    //鼠标点击事件

  }, {
    key: '_DocumentMouseDown',
    value: function _DocumentMouseDown(e) {
      var p1 = cb.dom(event.target).parents('.filterSetting');
      var p2 = cb.dom(event.target).parents('.ant-popover');
      if (p1.length == 0 && p2.length == 0 && this.state.popFlag) {
        this.setState({
          popFlag: false
        });
      }
    }
  }, {
    key: 'initFilterFields',
    value: function initFilterFields(args) {
      var self = this;
      var filterModel = [];
      var CommonModel = args.filterDetail.CommonModel;
      var AllFilterModel = args.filterDetail.AllFilterModel;
      AllFilterModel.forEach(function (eleAll) {
        CommonModel.forEach(function (eleCommon) {

          if (eleAll.id && eleCommon.itemId && eleCommon.itemId == eleAll.id) {
            var tmp = {};
            // tmp.itemName = eleCommon.itemName;
            // tmp.orderId = eleCommon.orderId;
            // tmp.isCommon = eleCommon.isCommon;
            // tmp.multSelect = eleCommon.multSelect;
            // tmp.cShowCaption = eleCommon.cShowCaption;
            // tmp.ctrlType = eleCommon.ctrlType;
            // tmp.value1 = eleCommon.value1 ? eleCommon.value1 : '';
            // tmp.value2 = eleCommon.value2 ? eleCommon.value2 : '';
            // tmp.autoFlt = eleAll.autoFlt;
            // tmp.enumString = eleAll.enumString;
            // tmp.compareLogic = eleAll.compareLogic;
            // tmp.bShowUpDown = false;
            Object.assign(tmp, eleAll, eleCommon);
            filterModel.push(tmp);
          }
        }, this);
      }, this);
      this.vm.fireEvent('initFilterViewModel', { filterModel: filterModel });
      this.setState({
        schemeData: args.schemeData,
        current: args.current,
        schemeName: args.schemeName,
        filterModel: filterModel.sort(function (a, b) {
          return a.orderId - b.orderId;
        })
      });
    }
  }, {
    key: 'SaveSchemeEvent',
    value: function SaveSchemeEvent(e) {
      this.state.popFlag = false;
      // this.state.filterModel = this.filterModel_Tmp;
      if (this.vm) {
        var args = {};
        args.schemeId = this.state.current;
        args.filterModel = this.filterModel_Tmp;
        args.filterId = this.vm.getParams().filterId;
        args.isDefault = 0;
        args.isPublic = 0;
        args.solutionName = this.state.schemeName;
        this.vm.get('save').fireEvent('click', args);
      }
    }
  }, {
    key: 'SearchEvent',
    value: function SearchEvent() {
      if (this.vm) {
        this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
        this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
      }
    }
  }, {
    key: 'buttonClick',
    value: function buttonClick(e, type) {
      if (type == 'search') {
        this.SearchEvent();
      } else {
        //
        var showMore = false;
        if (type == 'more') showMore = true;
        this.setState({
          showMore: showMore
        });
      }
    }
  }, {
    key: 'showPopClick',
    value: function showPopClick() {

      this.filterModel_Tmp = _lodash2.default.cloneDeep(this.state.filterModel);
      this.setState({
        popFlag: !this.state.popFlag
      });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(e, index) {

      this.filterModel_Tmp[index].bShowUpDown = true;
      this.setState({
        popFlag: this.state.popFlag
      });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave(e, index) {
      this.filterModel_Tmp.forEach(function (ele) {
        ele.bShowUpDown = false;
      });
      this.setState({
        popFlag: this.state.popFlag
      });
    }
  }, {
    key: 'onChecked',
    value: function onChecked(e, element, index) {
      var checked = e.target.checked;
      var num = 0;
      if (checked == false) {
        this.filterModel_Tmp.forEach(function (element, index) {
          if (element.isCommon == true) {
            num = num + 1;
          }
        });
        if (num > 1) this.filterModel_Tmp[index].isCommon = checked;
      } else {
        this.filterModel_Tmp[index].isCommon = checked;
      }
    }
  }, {
    key: 'sortClick',
    value: function sortClick(type, index) {
      var maxLen = this.filterModel_Tmp.length - 1;
      var pre = cb.utils.extend(true, {}, this.filterModel_Tmp[index - 1]);
      var next = cb.utils.extend(true, {}, this.filterModel_Tmp[index + 1]);
      var now = cb.utils.extend(true, {}, this.filterModel_Tmp[index]);
      if (type == 'up') {
        if (index != 0) {
          var orderId = pre.orderId;
          pre.orderId = now.orderId;
          now.orderId = orderId;
          this.filterModel_Tmp[index] = pre;
          this.filterModel_Tmp[index - 1] = now;
        }
      } else {
        if (index < maxLen) {
          var _orderId = next.orderId;
          next.orderId = now.orderId;
          now.orderId = _orderId;
          this.filterModel_Tmp[index] = next;
          this.filterModel_Tmp[index + 1] = now;
        }
      }
      this.setState();
    }
  }, {
    key: 'cancelClick',
    value: function cancelClick(type) {
      this.setState({
        popFlag: false
      });
    }
  }, {
    key: 'getFilterContent',
    value: function getFilterContent() {
      var _this3 = this;

      var filterContent = [];
      this.filterModel_Tmp.forEach(function (element, index) {
        var _this2 = this;

        var item = void 0;
        var bShowUpDown = element.bShowUpDown ? element.bShowUpDown : false;
        var isCommon = element.isCommon;
        item = bShowUpDown ? _react2.default.createElement(
          Row,
          { style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
              return _this2.onMouseEnter(e, index);
            }, onMouseLeave: function onMouseLeave(e) {
              return _this2.onMouseLeave(e, index);
            } },
          _react2.default.createElement(
            'div',
            { className: 'pull-left', title: element.cShowCaption },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: isCommon, onChange: function onChange(e) {
                  return _this2.onChecked(e, element, index);
                } },
              element.cShowCaption
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'pull-right' },
            _react2.default.createElement(Button, { style: { borderWidth: 0 }, icon: 'arrow-up', onClick: function onClick() {
                return _this2.sortClick('up', index);
              } }),
            _react2.default.createElement(Button, { style: { borderWidth: 0 }, icon: 'arrow-down', onClick: function onClick() {
                return _this2.sortClick('down', index);
              } })
          )
        ) : _react2.default.createElement(
          Row,
          { style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
              return _this2.onMouseEnter(e, index);
            }, onMouseLeave: function onMouseLeave(e) {
              return _this2.onMouseLeave(e, index);
            } },
          _react2.default.createElement(
            'div',
            { className: 'pull-left', title: element.cShowCaption },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: isCommon, onChange: function onChange(e) {
                  return _this2.onChecked(e, element, index);
                } },
              element.cShowCaption
            )
          ),
          _react2.default.createElement('div', { className: 'pull-right' })
        );
        filterContent.push(item);
      }, this);
      var buttonClass = 'filter-btn-fixed';
      return _react2.default.createElement(
        'div',
        { className: buttonClass, style: { overflow: "auto", height: "250px" } },
        _react2.default.createElement(
          'div',
          { className: 'filter-txt' },
          filterContent
        ),
        _react2.default.createElement(
          'div',
          { className: 'filter-btn-1' },
          _react2.default.createElement(
            Button,
            { type: "primary", onClick: function onClick() {
                return _this3.SaveSchemeEvent('save');
              } },
            '\u4FDD\u5B58'
          ),
          _react2.default.createElement(
            Button,
            { type: "default", onClick: function onClick() {
                return _this3.cancelClick('cancel');
              } },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }, {
    key: 'checkTagAndFilterInfo',
    value: function checkTagAndFilterInfo() {
      this.state.tag2FilterCount = 0;
      this.state.commonFilterCount = 0;
      this.state.filterModel.forEach(function (ele, index) {
        if (ele.isCommon == 1 || ele.isCommon == true) {
          if (ele.ctrlType.toLocaleLowerCase() == "tagbutton" && ele.autoFlt == true) {
            this.state.tag2FilterCount = this.state.tag2FilterCount + 1;
          } else {
            this.state.commonFilterCount = this.state.commonFilterCount + 1;
          }
        }
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      this.checkTagAndFilterInfo();
      var tag2FilterCount = this.state.tag2FilterCount;
      var commonFilterCount = this.state.commonFilterCount;
      var tags = void 0;
      var controls = [];
      var content = null;
      var showMore = this.state.showMore;

      if (commonFilterCount > 0 || tag2FilterCount > 0) {
        var tmpShowMoreStr = showMore ? _react2.default.createElement(
          Button,
          { style: { borderWidth: 0 }, className: 'showMore', type: 'ghost', size: 'small', onClick: function onClick(e) {
              return _this4.buttonClick(e, '');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'up-circle' })
        ) : _react2.default.createElement(
          Button,
          { style: { borderWidth: 0 }, className: 'showMore', type: 'ghost', size: 'small', onClick: function onClick(e) {
              return _this4.buttonClick(e, 'more');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'down-circle' })
        );
        controls = this.getControls(tmpShowMoreStr);
      }
      if (this.filterModel_Tmp && this.filterModel_Tmp.length > 0) {
        content = this.getFilterContent();
      }
      var filterAreaCount = this.state.filterAreaCount;
      var showMoreStr = void 0;
      var rowNum = this.props.cols ? this.props.cols : 3;

      if (filterAreaCount > rowNum && !this.props.autoExpand) {
        //&& this.state.isInPanel == false
        showMoreStr = showMore ? _react2.default.createElement(
          Button,
          { style: { borderWidth: 0 }, className: 'showMore', type: 'ghost', size: 'small', onClick: function onClick(e) {
              return _this4.buttonClick(e, '');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'up-circle' })
        ) : _react2.default.createElement(
          Button,
          { style: { borderWidth: 0 }, className: 'showMore', type: 'ghost', size: 'small', onClick: function onClick(e) {
              return _this4.buttonClick(e, 'more');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'down-circle' })
        );
      } else {
        showMoreStr = _react2.default.createElement('span', { style: { paddingLeft: 5 } });
      }
      // if (this.state.panelType == 3) {
      //   controls.push(showMoreStr);
      // }
      var showSearchStr = void 0;
      if (this.state.tag2InFirstRow == false || commonFilterCount > 0 && showMore || this.props.autoExpand) {
        if (this.state.isInDesign == false) {
          showSearchStr = _react2.default.createElement(
            Button,
            { delay: true, type: 'ghost', style: { float: "right" }, className: 'up-search', onClick: function onClick(e) {
                return _this4.buttonClick(e, 'search');
              } },
            '\u641C\u7D22'
          );
        }
      } else {
        showSearchStr = _react2.default.createElement('span', { style: { paddingLeft: 5 } });
      }
      var showFilterSetting = void 0;

      if (this.state.filterModel.length > rowNum && !this.props.autoExpand && this.state.isInPanel == false && this.state.isInDesign == false) {

        showFilterSetting = _react2.default.createElement(
          _antd.Popover,
          { overlayStyle: { width: "200px" }, placement: "bottomRight", content: content, trigger: "click", visible: this.state.popFlag },
          _react2.default.createElement(
            'div',
            { className: 'ant-popover-open-count' },
            _react2.default.createElement(
              Button,
              { className: 'filterSetting', style: { borderWidth: 1 }, onClick: function onClick() {
                  return _this4.showPopClick();
                }, type: "ghost", size: 'small' },
              '\u8BBE\u7F6E'
            )
          )
        );
      } else {
        showFilterSetting = _react2.default.createElement('span', { style: { paddingLeft: 5 } });
      }
      return _react2.default.createElement(
        Row,
        { className: (this.props.config && this.props.config.classname) + ' ' + (this.props.autoExpand === false && 'voucher-filter') },
        _react2.default.createElement(_FilterScheme2.default, { filterId: this.state.filterId, Id: this.state.modelId, cardKey: this.state.cardKey, schemeChange: this.handleSchemeChange, schemeListChange: this.handleSchemeListChange, model: this.props.model }),
        _react2.default.createElement(
          Col,
          { className: 'filter-controls' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              Row,
              { colCount: rowNum },
              controls
            )
          )
        ),
        _react2.default.createElement(
          Col,
          { className: 'up-show' },
          this.state.panelType == 3 ? "" : showMoreStr,
          showFilterSetting,
          showSearchStr
        )
      );
    }
    // handleSolutionChange=(solutionId)=>{
    //   this.vm.fireEvent();
    // solutionChange={this.handleSolutionChange}
    // }

  }, {
    key: 'getControls',
    value: function getControls(tmpShowMoreStr) {
      var controls = [];
      var control = void 0,
          filterVMField = void 0;
      var tmp_FilterAreaCount = 0;
      var cur_FilterAreaCount = 0;
      var cur_Tag2InFirstRow = false;
      var rowNum = this.props.cols ? this.props.cols : 3;
      this.state.filterModel.forEach(function (ele, index) {
        var ctrlType = ele.ctrlType.trim().toLocaleLowerCase();
        if (ele.isCommon == 1 || ele.isCommon == true) {
          control = undefined;
          var config = null;
          try {
            config = JSON.parse(ele.extendField);
          } catch (e) {
            config = {};
          }
          // delete ele.extendField;
          if (ctrlType === 'tagbutton') {
            if (ele.autoFlt == true) {
              cur_FilterAreaCount = config.cols || rowNum;
              tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
              if (tmp_FilterAreaCount === rowNum) {
                cur_Tag2InFirstRow = true;
              }
              // let filterVMField;
              // if (!this.vm.get(ele.itemName)) {
              //   let initData = cb.utils.extend(true, {}, ele);
              //   initData.value1 = ele.value1;
              //   filterVMField = new cb.models.FilterModel(initData);
              //   this.vm.addProperty(initData.itemName, filterVMField);
              // }
              // else {
              filterVMField = this.vm.get(ele.itemName);
              // }
              var fromModel = filterVMField.getFromModel();
              control = _react2.default.createElement(
                Row,
                { key: ele.itemName },
                _react2.default.createElement(
                  Col,
                  null,
                  _react2.default.createElement(Tag2, {
                    TagTitle: ele.cShowCaption,
                    TagData: ele.enumString,
                    TagCanMultSel: ele.multSelect == 0 ? false : true,
                    TagClicked: this.Tag2Clicked,
                    model: fromModel })
                )
              );
            }
          } else if (ctrlType === 'predicatedatepicker') {
            cur_FilterAreaCount = rowNum;
            tmp_FilterAreaCount += cur_FilterAreaCount;
            var ComName = BasicComponentsMap[ctrlType];
            var model = this.vm.get(ele.itemName).getFromModel();
            control = _react2.default.createElement(
              Row,
              { key: ele.itemName },
              _react2.default.createElement(ComName, {
                model: model,
                isInPanel: this.state.isInPanel,
                panelType: this.state.panelType,
                cShowCaption: ele.cShowCaption,
                isInFilterJSX: true
              })
            );
          } else {
            cur_FilterAreaCount = 1;
            tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
            // if (!this.vm.get(ele.itemName)) {
            //   let initData = cb.utils.extend(true, {}, ele);
            //   initData.value1 = ele.value1;
            //   initData.value2 = ele.value2;
            //   filterVMField = new cb.models.FilterModel(initData);
            //   this.vm.addProperty(initData.itemName, filterVMField);
            // }
            // else {
            filterVMField = this.vm.get(ele.itemName);
            // }
            if (!!filterVMField) control = this.getControl(ele, filterVMField, config);
          }
          if (control) {

            var tmpClassName = "";
            var tmp = void 0;
            if (this.state.panelType == 3 && controls.length == 0) {
              tmpClassName = "UpDown_Location";
              tmp = tmpShowMoreStr;
            }

            if (this.state.showMore || this.props.autoExpand) {
              controls.push(_react2.default.createElement(
                Col,
                { key: ele.itemName, span: cur_FilterAreaCount, className: tmpClassName },
                control,
                tmp
              ));
            } else {
              if (tmp_FilterAreaCount <= rowNum) {
                controls.push(_react2.default.createElement(
                  Col,
                  { key: ele.itemName, span: cur_FilterAreaCount, className: tmpClassName },
                  control,
                  tmp
                ));
              }
            }
          }
        }
      }, this);
      this.state.filterAreaCount = tmp_FilterAreaCount;
      this.state.tag2InFirstRow = cur_Tag2InFirstRow;
      return controls;
      // return (<div  ><Row colCount={rowNum}>{controls}</Row></div>);
      // return (<div  ><Row colCount={tmp_FilterAreaCount < 3 ? 3 : 3}>{controls}</Row></div>);
      // return (<div  ><Row colCount={tmp_FilterAreaCount < 3 ? tmp_FilterAreaCount : 3}>{controls}</Row></div>);
    }
  }, {
    key: 'getComponent',
    value: function getComponent(ComName, model, config, ctrlType, cShowCaption) {
      return ComName ? _react2.default.createElement(ComName, _extends({ model: model, title: cShowCaption, isInFilterJSX: true }, config)) : _react2.default.createElement(
        'h1',
        null,
        ctrlType
      );
    }
  }, {
    key: 'getControl',
    value: function getControl(ele, filterVMField, config) {
      var compareLogic = ele.compareLogic;
      var fromModel = filterVMField.getFromDisplayModel() || filterVMField.getFromModel();
      var toModel = filterVMField.getToModel();
      var ctrlType = void 0;
      if (ele.ctrlType) ctrlType = ele.ctrlType.trim().toLocaleLowerCase();else ctrlType = "input";
      var ComName = BasicComponentsMap[ctrlType];
      var control = void 0;
      if (compareLogic === 'between') {
        control = _react2.default.createElement(
          'div',
          { className: 'Test-time-two' },
          _react2.default.createElement(
            Col,
            { span: 11 },
            this.getComponent(ComName, fromModel, config, ctrlType)
          ),
          _react2.default.createElement(
            Col,
            { span: 2, className: 'sp-range-txt' },
            _react2.default.createElement(
              'span',
              null,
              '\u81F3'
            )
          ),
          _react2.default.createElement(
            Col,
            { span: 11 },
            this.getComponent(ComName, toModel, config, ctrlType)
          )
        );
      } else {
        control = this.getComponent(ComName, fromModel, config, ctrlType, ele.cShowCaption);
      }
      return _react2.default.createElement(
        'div',
        { className: 'filter-hide' },
        _react2.default.createElement(Label, { isInFilterJSX: true, control: control, title: ele.cShowCaption })
      );
    }
  }]);

  return ConvenientQuery;
}(_react2.default.Component);

exports.default = ConvenientQuery;
;