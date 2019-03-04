'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _filterscheme = require('../../redux/filterscheme');

var filterredux = _interopRequireWildcard(_filterscheme);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _basic = require('../basic');

var BasicComponents = _interopRequireWildcard(_basic);

var _filterDefined = require('./filterDefined');

var _filterDefined2 = _interopRequireDefault(_filterDefined);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BasicComponentsMap = {},
    Solutionitem = {},
    commonVOs = [],
    commonitem = {},
    commonNewitem = {},
    id = null,
    isCheck = void 0;
for (var attr in BasicComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
}
var FilterScheme = function (_Component) {
  _inherits(FilterScheme, _Component);

  function FilterScheme(props) {
    _classCallCheck(this, FilterScheme);

    var _this = _possibleConstructorReturn(this, (FilterScheme.__proto__ || Object.getPrototypeOf(FilterScheme)).call(this, props));

    _this.handleBodyClick = function (e) {
      if (e.target.className == "query-item-button add-query-criteria") {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
      }
      document.body.removeEventListener('click', _this.handleBodyClick);
    };

    _this.openQuerylist = function (e) {
      var schemeList = _this.props.filterscheme[_this.state.modelId].schemeList;
      var queryList = _this.props.filterscheme[_this.state.modelId].queryList;
      // this.props.filterredux.getCompareLogic(this.state.modelId,schemeList,queryList);
      document.body.addEventListener('click', _this.handleBodyClick);
      if (_this.props.filterscheme[_this.state.modelId].queryVisible == false) {
        _this.props.filterredux.openQuerylist(!_this.props.filterscheme[_this.state.modelId].queryVisible, _this.state.modelId);
      }
    };

    _this.visibleChange = function () {
      _this.props.filterredux.openQuerylist(false, _this.state.modelId);
    };

    _this.AddDataOk = function () {
      console.log('ValueList', _this.state.ValueList);
      _this.props.filterredux.openQuerylist(false, _this.state.modelId);
      var ValueList = [];
      commonVOs = [];
      var queryList = _this.props.filterscheme[_this.state.modelId].queryList;
      var _this$state = _this.state,
          checkedValue = _this$state.checkedValue,
          checkedValue2 = _this$state.checkedValue2,
          queryCheckValue = _this$state.queryCheckValue;

      checkedValue = [].concat(checkedValue2);
      ValueList = checkedValue.map(function (value) {
        var _queryList = queryList.find(function (v) {
          return v.id === value;
        });
        return _queryList || [];
      });
      ValueList = ValueList.map(function (value) {
        var _queryCheckValue = queryCheckValue.find(function (v) {
          return v.itemId === value.id;
        });
        return _queryCheckValue || value;
      });
      console.log('ValueList', ValueList);
      ValueList.forEach(function (element) {
        // let _index =  _.findIndex(AllFilterModel, (obj) => {
        //   return obj.id === element.itemId
        // })
        // element.displayname = AllFilterModel[_index].displayname;
        //  element.enumArray = AllFilterModel[_index].enumArray;
        var itemName = element.itemName,
            compareLogic = element.compareLogic,
            itemType = element.itemType,
            ctrlType = element.ctrlType,
            cRefType = element.cRefType,
            value1 = element.value1,
            value2 = element.value2,
            displayname = element.displayname,
            multSelect = element.multSelect,
            refReturn = element.refReturn,
            referCode = element.referCode,
            enumArray = element.enumArray;

        var filterVMField = new cb.models.FilterModel({
          compareLogic: compareLogic,
          ctrlType: itemType || ctrlType,
          value1: value1,
          value2: value2,
          displayname: displayname,
          multSelect: multSelect,
          refReturn: refReturn,
          cRefType: referCode || cRefType,
          enumArray: enumArray
        });
        _this.viewModel.addProperty(itemName, filterVMField);
        var eleType = itemType || ctrlType;
        var lowerCtrlType = itemType || ctrlType && eleType.trim().toLocaleLowerCase();
        if (lowerCtrlType === 'refer' || lowerCtrlType === 'treerefer' || lowerCtrlType === 'listrefer') {
          _this.triggerReferBrowse(filterVMField.getFromModel());
          _this.triggerReferBrowse(filterVMField.getToModel());
        }
      });
      _this.setState({ ValueList: ValueList, checkedValue: checkedValue });
    };

    var User = cb.rest.AppContext.user.authCodes || [];
    _this.viewModel = new cb.models.ContainerModel({ params: { cardKey: props.cardKey } });
    _this.state = {
      mention: false,
      definedVisible: false,
      inMouseitemName: "",
      checked: [],
      IsdefaultValue: 0,
      inpValue: '',
      NewList: "",
      sort: "",
      filterId: _this.props.filterId,
      modelId: _this.props.Id,
      ValueList: [],
      InputValue: "",
      visible: false,
      id: null,
      NewaddChecked: [],
      checkedValue: [],
      copy_checkedValue: [],
      showDele: true,
      checkedValue2: [],
      queryCheckValue: [],
      User: User
    };
    return _this;
  }

  _createClass(FilterScheme, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.filterredux.getSchemeListData(this.state.modelId, this.state.filterId);
      this.props.filterredux.getQueryItem(this.state.modelId, this.state.filterId);
      this.props.filterredux.getCompareLogic(this.state.modelId);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.filterscheme[this.state.modelId] == undefined) return null;
      var type = this.state.visible ? "up" : "down";
      var button = _react2.default.createElement(
        'div',
        { style: { width: "20px", height: "30px" } },
        ' ',
        _react2.default.createElement(_antd.Icon, { type: type }),
        ' '
      );
      var schemeList = this.getSchemeListRender();
      var addScheme = this.AddSchemeRender();
      var schemePop = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { marginLeft: 0, clear: 'both', whiteSpace: 'nowrap' }, className: 'scheme-popover' },
          _react2.default.createElement(
            _antd.Popover,
            { placement: 'bottomLeft', overlayStyle: { width: "236px" }, content: schemeList, trigger: "click", visible: this.state.visible, onVisibleChange: this.handleVisibleChange.bind(this) },
            _react2.default.createElement(
              'div',
              { className: 'filter-scheme Grouping-condition' },
              _react2.default.createElement(
                'div',
                { className: 'filter-scheme-input Grouping-condition-input' },
                _react2.default.createElement(
                  'span',
                  { className: 'filter-scheme-span ', style: { cursor: "pointer" } },
                  this.props.filterscheme[this.state.modelId].currentName
                ),
                button
              )
            )
          )
        )
      );
      return _react2.default.createElement(
        'div',
        { className: 'scheme-list' },
        schemePop,
        addScheme
      );
    }
  }, {
    key: 'handleVisibleChange',
    value: function handleVisibleChange() {
      commonVOs = [];
      this.setState({ visible: !this.state.visible, definedVisible: false, checkedValue2: [], checkedValue: [] });
    }
  }, {
    key: 'getSchemeListRender',
    value: function getSchemeListRender() {
      var _this3 = this;

      var schemeList = this.props.filterscheme[this.state.modelId].schemeList;
      var currentId = this.props.filterscheme[this.state.modelId].currentId;
      var showDele = this.state.showDele;
      var User = this.state.User;

      var renderList = [];
      var filteradd = null;
      if (schemeList && schemeList.length > 0) {
        schemeList.forEach(function (element, index) {
          var _this2 = this;

          var item = void 0;
          var isChecked = element.id == currentId ? true : false;
          var itemChecked = isChecked ? _react2.default.createElement(
            'span',
            { className: 'groupCondition-Checked' },
            _react2.default.createElement('i', { className: 'anticon icon-xuanzhong1', checked: isChecked }),
            '  '
          ) : _react2.default.createElement('span', { className: 'groupCondition-Checked' });
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
          ) : _react2.default.createElement('span', { className: 'groupCondition-Default' });
          var isMouseEnter = element.isMouseEnter ? element.isMouseEnter : false;
          var itemEnter = isMouseEnter ? _react2.default.createElement(
            'span',
            { className: 'groupCondition-MouseEnter' },
            isDefault ? null : _react2.default.createElement(
              'span',
              { className: 'stopclose', onClick: function onClick(e) {
                  return _this2.setDefaultScheme(element.id, e);
                } },
              '\u8BBE\u4E3A\u9ED8\u8BA4'
            ),
            _react2.default.createElement(
              'span',
              { onClick: function onClick() {
                  return _this2.editSchemeInfo(element.id);
                } },
              '\u8BBE\u7F6E'
            ),
            _react2.default.createElement(
              'span',
              { className: 'Noclose', onClick: function onClick() {
                  return _this2.deleteScheme(element.id, _this2.state.filterId);
                }, style: { display: showDele == true ? 'inline' : 'none' } },
              '\u5220\u9664'
            )
          ) : _react2.default.createElement('span', { className: 'groupCondition-MouseEnter' });
          item = _react2.default.createElement(
            _antd.Row,
            { key: index, style: { minHeight: "25px" }, onMouseEnter: function onMouseEnter(e) {
                return _this2.IsEnterSchemeitem(true, e, element.id);
              }, onMouseLeave: function onMouseLeave(e) {
                return _this2.IsEnterSchemeitem(false, e, element.id);
              } },
            itemChecked,
            _react2.default.createElement(
              'span',
              { style: { cursor: "pointer" }, onClick: function onClick() {
                  return _this2.chooseScheme(element.id);
                } },
              ' ',
              element.solutionName ? element.solutionName : element.id
            ),
            itemDefault,
            itemEnter
          );
          renderList.push(item);
        }, this);
      }
      if (User.indexOf("userdef_filter") > -1) {
        filteradd = _react2.default.createElement(
          'div',
          { className: 'defined_button', onClick: function onClick() {
              return _this3.openDefined();
            } },
          '\u81EA\u5B9A\u4E49\u8FC7\u6EE4\u6761\u4EF6'
        );
      } else {
        filteradd = null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'scheme-List group-add-grouping-count defined-filterItem', style: { paddingBottom: 60 } },
        _react2.default.createElement(
          'div',
          { className: 'scheme-List-content', style: { overflow: "auto", maxHeight: "258px", paddingBottom: "2px" } },
          renderList
        ),
        _react2.default.createElement(
          'div',
          { className: 'add-scheme group-add-grouping', style: { height: 76 } },
          _react2.default.createElement(
            'div',
            { className: 'add-scheme-button', onClick: function onClick() {
                return _this3.AddScheme();
              }, style: { cursor: "pointer" } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'plus' }),
            '\u65B0\u589E\u65B9\u6848'
          ),
          filteradd
        )
      );
    }
  }, {
    key: 'openDefined',
    value: function openDefined() {
      this.handleVisibleChange();
      this.setState({ definedVisible: true });
    }
  }, {
    key: 'IsEnterSchemeitem',
    value: function IsEnterSchemeitem(bEnter, e, id) {
      var self = this;
      this.props.filterredux.IsEnterSchemeitem(bEnter, id, this.state.modelId);
      var schemeList = this.props.filterscheme[this.state.modelId].schemeList;
      if (schemeList && schemeList.length > 0) {
        schemeList.forEach(function (ele, index) {
          var isDefault = ele.isDefault;
          if (id == ele.id) {
            if (isDefault) {
              self.setState({ showDele: false });
            } else {
              self.setState({ showDele: true });
            }
          }
        });
      }
    }
  }, {
    key: 'setDefaultScheme',
    value: function setDefaultScheme(defaultid, e) {
      e.nativeEvent.stopImmediatePropagation();
      e.nativeEvent.stopPropagation();
      this.props.filterredux.setDefaultScheme(defaultid, this.state.filterId, this.state.modelId, this.props.schemeListChange);
    }
  }, {
    key: 'triggerReferBrowse',
    value: function triggerReferBrowse(referModel) {
      if (!referModel) return;
      var referValue = referModel.getValue();
      if (!referValue) return;
      referModel.browse(false, function (vm) {
        vm.on('getRefMetaReady', function () {
          var condition = {
            'isExtend': true,
            simpleVOs: [{ field: 'id', op: 'in', value1: referValue.split(',') }]
          };
          vm.execute('pressEnter', { model: referModel, condition: condition, browse: false });
        });
      });
    }
  }, {
    key: 'editSchemeInfo',
    value: function editSchemeInfo(id) {
      var _this4 = this;

      commonVOs = [];
      this.setState({ visible: !this.state.visible, mention: false });
      this.props.filterredux.AddScheme(!this.props.filterscheme[this.state.modelId].bAddscheme, this.state.modelId);
      if (!this.props.filterscheme[this.state.modelId].bEdit) {
        this.props.filterredux.Isedit(!this.props.filterscheme[this.state.modelId].bEdit, this.state.modelId);
      }
      if (this.props.filterscheme[this.state.modelId].isdefault) {
        this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault, this.state.modelId);
      }
      if (this.props.filterscheme[this.state.modelId].queryVisible) {
        this.props.filterredux.openQuerylist(false, this.state.modelId);
      }
      this.props.filterredux.editSchemeInfo(id, function (editSchemeitem) {
        var AllFilterModel = editSchemeitem.AllFilterModel;
        var queryCheckValue = editSchemeitem.CommonModel;
        var InputValue = editSchemeitem.solutionName;
        var IsdefaultValue = editSchemeitem.isDefault;
        var ID = editSchemeitem.id;
        if (IsdefaultValue) {
          _this4.props.filterredux.IsDefault(true, _this4.state.modelId);
        }
        queryCheckValue.forEach(function (element) {
          var _index = _lodash2.default.findIndex(AllFilterModel, function (obj) {
            return obj.id === element.itemId;
          });
          element.displayname = AllFilterModel[_index].displayname || null;
          element.enumArray = AllFilterModel[_index].enumArray || null;
          var itemName = element.itemName,
              compareLogic = element.compareLogic,
              itemId = element.itemId,
              ctrlType = element.ctrlType,
              value1 = element.value1,
              value2 = element.value2,
              displayname = element.displayname,
              multSelect = element.multSelect,
              refReturn = element.refReturn,
              cRefType = element.cRefType,
              enumArray = element.enumArray;

          var filterVMField = new cb.models.FilterModel({
            compareLogic: compareLogic,
            ctrlType: ctrlType,
            value1: value1,
            value2: value2,
            displayname: displayname,
            multSelect: multSelect,
            refReturn: refReturn,
            cRefType: cRefType,
            enumArray: enumArray
          });
          _this4.viewModel.addProperty(itemName, filterVMField);
          var lowerCtrlType = ctrlType && ctrlType.trim().toLocaleLowerCase();
          if (lowerCtrlType === 'refer' || lowerCtrlType === 'treerefer' || lowerCtrlType === 'listrefer') {
            _this4.triggerReferBrowse(filterVMField.getFromModel());
            _this4.triggerReferBrowse(filterVMField.getToModel());
          }
        });
        var checkedValue = [];
        for (var j = 0; j < queryCheckValue.length; j++) {
          var Id = queryCheckValue[j].itemId;
          checkedValue.push(Id);
        }
        var checkedValue2 = [].concat(checkedValue);
        var copy_queryCheckValue = [].concat(queryCheckValue);
        _this4.setState({ queryCheckValue: copy_queryCheckValue, ValueList: queryCheckValue, InputValue: InputValue, id: ID, checkedValue: checkedValue, checkedValue2: checkedValue2, inMouseitemName: "", IsdefaultValue: IsdefaultValue });
      }, this.state.modelId);
    }
  }, {
    key: 'deleteScheme',
    value: function deleteScheme(id, filtersId) {
      var self = this;
      this.props.filterredux.deleteScheme(id, filtersId, this.props.schemeListChange, this.state.modelId);
      var currentId = this.props.filterscheme[this.state.modelId].currentId;
      var schemeList = this.props.filterscheme[this.state.modelId].schemeList;
      if (currentId == id) {
        schemeList.forEach(function (ele, index) {
          if (ele.isDefault == 1) {
            self.props.filterredux.chooseScheme(ele.id, self.state.modelId);
            self.props.schemeChange(ele.id);
          }
        });
      }
    }
  }, {
    key: 'chooseScheme',
    value: function chooseScheme(id) {
      this.props.filterredux.chooseScheme(id, this.state.modelId);
      this.props.schemeChange(id);
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'AddqueryItems',
    value: function AddqueryItems() {
      var _this5 = this;

      return _react2.default.createElement(
        'div',
        { className: 'query-button' },
        _react2.default.createElement(
          'div',
          { className: 'query-item-button add-query-criteria', onClick: function onClick(e) {
              return _this5.openQuerylist(e);
            } },
          _react2.default.createElement(_SvgIcon2.default, { type: 'plus' }),
          '\u6DFB\u52A0\u67E5\u8BE2\u6761\u4EF6'
        ),
        _react2.default.createElement(
          _antd.Button,
          { type: "default", className: 'cancelScheme', onClick: function onClick() {
              return _this5.CloseAddScheme();
            } },
          '\u53D6\u6D88'
        ),
        _react2.default.createElement(
          _antd.Button,
          { type: "primary", className: 'confirmScheme', onClick: function onClick() {
              return _this5.SaveSolution();
            } },
          '\u786E\u8BA4'
        )
      );
    }
  }, {
    key: 'SaveSolution',
    value: function SaveSolution() {
      var Data = this.viewModel.collectData(true);
      var DataValue = {};
      var rangeInput = void 0;
      this.setState({ visible: false });
      if (this.props.filterscheme[this.state.modelId].isdefault) {
        isCheck = 1;
      } else {
        isCheck = 0;
      }
      var commonList = [];

      var _loop = function _loop(i) {
        var name = commonVOs[i].itemName;
        if (name in Data) {
          DataValue = Data[name];
          var dataLength = Object.keys(DataValue);
          if (dataLength.length > 1) {
            rangeInput = 1;
          } else {
            rangeInput = 0;
          }
          if (DataValue.value1 instanceof Array || DataValue.value2 instanceof Array) {
            (DataValue.value1 = DataValue.value1.join(",")) || (DataValue.value2 = DataValue.value2.join(","));
          }
          var itemId = commonVOs[i].itemId;
          var orderId = commonVOs[i].orderId;
          var _id = commonVOs[i].id;
          var compareLogic = commonVOs[i].compareLogic;
          commonNewitem = {
            "itemId": itemId,
            "orderId": orderId,
            "id": _id,
            "compareLogic": compareLogic,
            "rangeInput": rangeInput
          };
          Object.assign(commonNewitem, DataValue);
        }
        commonList.push(commonNewitem);
        var hash = {};
        commonList = commonList.reduce(function (item, next) {
          hash[next.itemId] ? '' : hash[next.itemId] = true && item.push(next);
          return item;
        }, []);
      };

      for (var i = 0; i < commonVOs.length; i++) {
        _loop(i);
      }
      Solutionitem = {
        "solutionName": this.state.InputValue,
        "isDefault": isCheck,
        "filtersId": this.state.filterId,
        "id": this.state.id,
        "commonVOs": commonList
      };
      var filtersId = this.state.filterId;
      if (this.state.InputValue) {
        this.props.filterredux.ToSolution(Solutionitem, filtersId, this.props.schemeListChange, this.state.modelId);
      } else {
        this.setState({ mention: true });
      }
    }
  }, {
    key: 'QueryItem',
    value: function QueryItem() {
      this.props.filterredux.openQuerylist(false, this.state.modelId);
      var _checkedValue = [],
          query_checkedValue = [];
      var _state = this.state,
          checkedValue = _state.checkedValue,
          checkedValue2 = _state.checkedValue2,
          ValueList = _state.ValueList,
          queryCheckValue = _state.queryCheckValue;

      ValueList.forEach(function (ele, index) {
        query_checkedValue.push(ele.id || ele.itemId);
        queryCheckValue.forEach(function (element, index) {
          if (element.itemId == (ele.id || ele.itemId)) {
            _checkedValue.push(queryCheckValue[index]);
          }
          if (query_checkedValue.includes(element.itemId)) {
            query_checkedValue.splice(query_checkedValue.indexOf(element.itemId), 1);
          }
        });
      });
      var copy_checkedValue = [];
      if (_checkedValue != []) {
        _checkedValue.forEach(function (ele, index) {
          copy_checkedValue.push(ele.itemId);
        });
      } else {
        copy_checkedValue = [].concat(_checkedValue);
      }
      checkedValue2 = [].concat(copy_checkedValue).concat(query_checkedValue);
      commonVOs.splice(0, commonVOs.length);
      this.setState({ checkedValue2: checkedValue2, visible: false });
    }
  }, {
    key: 'QueryItemRender',
    value: function QueryItemRender() {
      var _this6 = this;

      var queryList = this.props.filterscheme[this.state.modelId].queryList;
      var a = this.props.filterscheme[this.state.modelId].queryVisible;
      console.log('a', a);
      console.log('queryList', queryList);
      var noData = 'filter_scheme_popoverdown';
      if (!queryList) return;
      if (queryList.length > 0) {
        noData = 'filter_scheme_popover';
      }
      var queryContent = _react2.default.createElement(_antd.Popover, {
        overlayClassName: noData,
        content: this.getQueryContent(),
        trigger: "click",
        visible: this.props.filterscheme[this.state.modelId].queryVisible,
        onVisibleChange: function onVisibleChange() {
          return _this6.visibleChange();
        },
        placement: 'topLeft'
      });
      return _react2.default.createElement(
        'div',
        { className: 'ant-popover-left' },
        queryContent
      );
    }
  }, {
    key: 'getQueryContent',
    value: function getQueryContent() {
      var _this7 = this;

      var ContentCheckBoxs = [];
      var queryList = this.props.filterscheme[this.state.modelId].queryList;
      var _state2 = this.state,
          checkedValue = _state2.checkedValue,
          checkedValue2 = _state2.checkedValue2;

      queryList.forEach(function (ele, index) {
        var id = ele.id.toString();
        var itemTitle = ele.itemTitle;
        var checkedgroup = void 0;
        checkedgroup = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _antd.Checkbox,
            { key: index, onChange: this.onChangeCheck.bind(this), value: id, checked: checkedValue.includes(Number(id)) || checkedValue2.includes(Number(id)) },
            itemTitle
          )
        );
        ContentCheckBoxs.push(checkedgroup);
      }, this);
      return _react2.default.createElement(
        'div',
        { className: 'query-criteria-select', style: { overflow: "auto", paddingLeft: "10px" } },
        _react2.default.createElement(
          'div',
          { className: 'ant-checkbox-group' },
          ContentCheckBoxs
        ),
        _react2.default.createElement(
          'div',
          { className: 'Checked-confirm-btn' },
          _react2.default.createElement(
            _antd.Button,
            { type: "primary", size: 'small', className: 'confirmChecked', onClick: function onClick() {
                return _this7.AddDataOk();
              } },
            '\u786E\u8BA4'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: "default", size: 'small', className: 'cancelChecked', onClick: function onClick() {
                return _this7.QueryItem();
              } },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }, {
    key: 'onChangeCheck',
    value: function onChangeCheck(e) {
      var _state3 = this.state,
          checkedValue = _state3.checkedValue,
          checkedValue2 = _state3.checkedValue2;

      var _num = Number(e.target.value);
      if (checkedValue2.includes(_num)) {
        checkedValue2.splice(checkedValue2.indexOf(_num), 1);
      } else {
        checkedValue2.push(_num);
      }
      if (checkedValue.includes(_num)) {
        checkedValue.splice(checkedValue.indexOf(_num), 1);
      }
      this.setState({ checkedValue2: checkedValue2, checkedValue: checkedValue });
    }
  }, {
    key: 'getComponent',
    value: function getComponent(ComName, model, config, ctrlType, cShowCaption, enumArray, multSelect) {
      if (ComName == "tagbutton") {
        ComName = BasicComponents.Tag2;
        return _react2.default.createElement(ComName, _extends({ model: model, TagData: enumArray, TagCanMultSel: multSelect }, config));
      }
      return ComName ? _react2.default.createElement(ComName, _extends({ model: model, title: cShowCaption, isInFilterJSX: true }, config)) : _react2.default.createElement(
        'h1',
        null,
        ctrlType
      );
    }
  }, {
    key: 'onMouseIsenter',
    value: function onMouseIsenter(Isenter, itemName) {
      if (Isenter) {
        this.setState({ inMouseitemName: itemName });
      } else {
        this.setState({ inMouseitemName: "" });
      }
    }
  }, {
    key: 'AddData',
    value: function AddData() {
      var self = this;
      var ValueList = this.state.ValueList;

      console.log('ValueList', ValueList);
      var controlRender = [];
      ValueList.forEach(function (element, index) {
        var _this8 = this;

        var ele = element;
        var itemName = ele.itemName,
            itemTitle = ele.itemTitle,
            compareLogic = ele.compareLogic,
            enumArray = ele.enumArray,
            multSelect = ele.multSelect;

        var itemType = ele.itemType || ele.ctrlType;
        var filterVMField = this.viewModel.get(itemName);
        var fromModel = filterVMField.getFromDisplayModel() || filterVMField.getFromModel();
        var toModel = filterVMField.getToModel();
        var ctrlType = void 0;
        if (itemType) {
          ctrlType = itemType.trim().toLocaleLowerCase();
        } else {
          ctrlType = "input";
        }
        var options = [];
        var Option = _antd.Select.Option;
        var compareLogicData = this.props.filterscheme[this.state.modelId].compareLogicList;
        if (multSelect) compareLogicData = { in: compareLogicData.in, nin: compareLogicData.nin };
        for (var keyvalue in compareLogicData) {
          var compareLogicItem = _react2.default.createElement(
            Option,
            { key: keyvalue, style: { width: 60 } },
            compareLogicData[keyvalue]
          );
          options.push(compareLogicItem);
        }
        var config = {};
        var ComName = "";
        if (ctrlType == "tagbutton") {
          ComName = "tagbutton";
        } else {
          ComName = BasicComponentsMap[ctrlType];
        }
        var control = void 0;
        commonitem = {
          "itemId": ele.id || ele.itemId,
          "orderId": index,
          "itemName": ele.itemName,
          "id": id,
          "compareLogic": compareLogic
        };
        if (commonVOs.length > 0) {
          var _index = _lodash2.default.findIndex(commonVOs, function (obj) {
            return obj.itemName === ele.itemName && obj.itemId === (ele.id || ele.itemId);
          });
          if (_index < 0) commonVOs.push(commonitem);
        } else {
          commonVOs.push(commonitem);
        }
        var bshowupdown = ele.itemName == self.state.inMouseitemName ? true : false;
        var updown = bshowupdown ? _react2.default.createElement(
          'span',
          { className: 'sumarea_list_updown' },
          _react2.default.createElement(
            _antd.Button,
            { style: { borderWidth: 0 }, className: 'action-shanchucopy2', onClick: function onClick() {
                return _this8.sortClick('up', index);
              } },
            _react2.default.createElement(_antd.Icon, { type: 'shanchucopy2' })
          ),
          _react2.default.createElement(
            _antd.Button,
            { style: { borderWidth: 0 }, className: 'action-shanchucopy1', onClick: function onClick() {
                return _this8.sortClick('down', index);
              } },
            _react2.default.createElement(_antd.Icon, { type: 'shanchucopy1' })
          ),
          _react2.default.createElement(
            _antd.Button,
            { style: { borderWidth: 0 }, className: 'action-guanbi1', onClick: function onClick() {
                return _this8.sortClick('delete', index);
              } },
            _react2.default.createElement(_antd.Icon, { type: 'guanbi1' })
          )
        ) : _react2.default.createElement('span', null);
        if (compareLogic === 'between') {
          if (ctrlType == "predicatedatepicker") {
            control = _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'Test-time-two sumarea_list_item',
                  onMouseEnter: function onMouseEnter(e) {
                    return _this8.onMouseIsenter(true, ele.itemName, index);
                  },
                  onMouseLeave: function onMouseLeave(e) {
                    return _this8.onMouseIsenter(false, ele.itemName, index);
                  } },
                _react2.default.createElement(
                  _antd.Col,
                  { className: 'query-content-title' },
                  itemTitle
                ),
                _react2.default.createElement(
                  _antd.Col,
                  null,
                  _react2.default.createElement(
                    _antd.Select,
                    { className: 'compareLogic', value: compareLogicData[compareLogic], onChange: function onChange(value) {
                        return _this8.handleChange(value, ele.id || ele.itemId);
                      } },
                    options
                  ),
                  ' '
                ),
                _react2.default.createElement(
                  _antd.Col,
                  { className: 'query-component-1' },
                  this.getComponent(ComName, fromModel, config, ctrlType)
                ),
                updown
              )
            );
          } else {
            control = _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'Test-time-two sumarea_list_item',
                  onMouseEnter: function onMouseEnter(e) {
                    return _this8.onMouseIsenter(true, ele.itemName, index);
                  },
                  onMouseLeave: function onMouseLeave(e) {
                    return _this8.onMouseIsenter(false, ele.itemName, index);
                  } },
                _react2.default.createElement(
                  _antd.Col,
                  { className: 'query-content-title' },
                  itemTitle
                ),
                _react2.default.createElement(
                  _antd.Col,
                  null,
                  _react2.default.createElement(
                    _antd.Select,
                    { className: 'compareLogic', value: compareLogicData[compareLogic], onChange: function onChange(value) {
                        return _this8.handleChange(value, ele.id || ele.itemId);
                      } },
                    options
                  ),
                  ' '
                ),
                _react2.default.createElement(
                  _antd.Col,
                  { className: 'query-component-1' },
                  this.getComponent(ComName, fromModel, config, ctrlType)
                ),
                _react2.default.createElement(
                  _antd.Col,
                  { className: 'query-component-2' },
                  _react2.default.createElement(
                    'span',
                    null,
                    '\u81F3'
                  )
                ),
                _react2.default.createElement(
                  _antd.Col,
                  { className: 'query-component-3' },
                  this.getComponent(ComName, toModel, config, ctrlType)
                ),
                updown
              )
            );
          }
        } else {
          control = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'query-content-list sumarea_list_item',
                onMouseEnter: function onMouseEnter(e) {
                  return _this8.onMouseIsenter(true, ele.itemName);
                },
                onMouseLeave: function onMouseLeave(e) {
                  return _this8.onMouseIsenter(false, ele.itemName);
                } },
              _react2.default.createElement(
                _antd.Col,
                { className: 'query-content-title' },
                itemTitle
              ),
              _react2.default.createElement(
                _antd.Col,
                null,
                _react2.default.createElement(
                  _antd.Select,
                  { className: 'compareLogic', value: compareLogicData[compareLogic], style: { width: 60 }, onChange: function onChange(value) {
                      return _this8.handleChange(value, ele.id || ele.itemId);
                    } },
                  options
                )
              ),
              _react2.default.createElement(
                _antd.Col,
                { className: 'query-component-3' },
                this.getComponent(ComName, fromModel, config, ctrlType, itemTitle, enumArray, multSelect)
              ),
              updown
            )
          );
        }
        controlRender.push(control);
      }, this);
      return _react2.default.createElement(
        'div',
        { className: 'query-content-ranking' },
        controlRender
      );
    }
  }, {
    key: 'handleChange',
    value: function handleChange(value, id) {
      var ValueList = this.state.ValueList;

      commonVOs.forEach(function (ele, index) {
        if (ele.itemId == id) {
          if (ele.compareLogic != value) {
            ele.compareLogic = value;
          }
        }
      });
      var _index = _lodash2.default.findIndex(ValueList, function (obj) {
        return obj.id == id || obj.itemId == id;
      });
      if (_index > -1) {
        ValueList[_index].compareLogic = value;
      }
      this.setState({ ValueList: ValueList });
    }
  }, {
    key: 'sortClick',
    value: function sortClick(type, index) {
      var _state4 = this.state,
          ValueList = _state4.ValueList,
          checkedValue = _state4.checkedValue,
          checkedValue2 = _state4.checkedValue2,
          queryCheckValue = _state4.queryCheckValue;

      var ValueListSort = [].concat(ValueList);
      if (type == "up" && index == 0) return;
      if (type == "down" && index == ValueListSort.length - 1) return;
      var pre = cb.utils.extend(true, {}, ValueListSort[index - 1]);
      var next = cb.utils.extend(true, {}, ValueListSort[index + 1]);
      var now = cb.utils.extend(true, {}, ValueListSort[index]);
      var commonvosPre = cb.utils.extend(true, {}, commonVOs[index - 1]);
      var commonvosNext = cb.utils.extend(true, {}, commonVOs[index + 1]);
      var commonvosNow = cb.utils.extend(true, {}, commonVOs[index]);
      if (type == 'up') {
        ValueListSort[index] = pre;
        ValueListSort[index - 1] = now;
        commonVOs[index] = commonvosPre;
        commonVOs[index - 1] = commonvosNow;
      }
      if (type == 'down') {
        ValueListSort[index] = next;
        ValueListSort[index + 1] = now;
        commonVOs[index] = commonvosNext;
        commonVOs[index + 1] = commonvosNow;
      }
      if (type == 'delete') {
        var ID = ValueListSort[index].id || ValueListSort[index].itemId;
        ValueListSort.splice(index, 1);
        if (checkedValue2.includes(ID)) {
          checkedValue2.splice(checkedValue2.indexOf(ID), 1);
        }
        queryCheckValue.forEach(function (ele, index) {
          if (ID == ele.itemId) {
            queryCheckValue.splice(index, 1);
          }
        });
        commonVOs.forEach(function (element, index) {
          if (ID == element.itemId) {
            commonVOs.splice(index, 1);
          }
        });
        checkedValue = [].concat(checkedValue2);
      }
      commonVOs.forEach(function (ele, index) {
        ele.orderId = index;
      });
      this.setState({ ValueList: ValueListSort, checkedValue2: checkedValue2, checkedValue: checkedValue, queryCheckValue: queryCheckValue });
    }
  }, {
    key: 'AddScheme',
    value: function AddScheme() {
      var schemeList = this.props.filterscheme[this.state.modelId].schemeList;
      // this.props.filterredux.getQueryItem(this.state.modelId, this.state.filterId,schemeList);
      this.props.filterredux.AddScheme(!this.props.filterscheme[this.state.modelId].bAddscheme, this.state.modelId);
      if (this.props.filterscheme[this.state.modelId].bEdit) {
        this.props.filterredux.Isedit(!this.props.filterscheme[this.state.modelId].bEdit, this.state.modelId);
      }
      if (this.props.filterscheme[this.state.modelId].isdefault) {
        this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault, this.state.modelId);
      }
      if (this.props.filterscheme[this.state.modelId].queryVisible) {
        this.props.filterredux.openQuerylist(false, this.state.modelId);
      }
      this.setState({ visible: false, ValueList: [], InputValue: "", checkedValue: [], queryCheckValue: [], inMouseitemName: "", checkedValue2: [], mention: false, id: null });
    }
  }, {
    key: 'CloseAddScheme',
    value: function CloseAddScheme() {
      this.props.filterredux.AddScheme(false, this.state.modelId);
      this.setState({ visible: false, ValueList: [] });
    }
  }, {
    key: 'AddSchemeContent',
    value: function AddSchemeContent() {
      var _this9 = this;

      var mention = this.state.mention;

      var schemeContent = this.AddData();
      var nameMention = '';
      var input_schemename = "";
      if (mention) {
        nameMention = _react2.default.createElement(
          'span',
          { className: 'scheme-name-mention' },
          '\u4E0D\u80FD\u4E3A\u7A7A'
        );
        input_schemename = "input_schemename";
      }
      var nameContent = _react2.default.createElement(
        'div',
        { className: 'add-scheme' },
        _react2.default.createElement(
          _antd.Row,
          { className: 'add-scheme-content' },
          _react2.default.createElement(
            _antd.Col,
            { span: 1, className: 'scheme-name' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u540D\u79F0'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'scheme-name-content' },
            _react2.default.createElement(_antd.Input, { type: 'text', value: this.state.InputValue, onChange: this.InputValue.bind(this), className: input_schemename }),
            ' '
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 5, className: 'scheme-set' },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: this.props.filterscheme[this.state.modelId].isdefault, onClick: function onClick() {
                  return _this9.IsDefault();
                } },
              '\u8BBE\u4E3A\u9ED8\u8BA4'
            )
          )
        ),
        nameMention,
        _react2.default.createElement(
          'div',
          null,
          schemeContent
        )
      );
      return nameContent;
    }
  }, {
    key: 'IsDefault',
    value: function IsDefault() {
      var IsdefaultValue = this.state.IsdefaultValue;

      if (this.props.filterscheme[this.state.modelId].bEdit) {
        if (IsdefaultValue) {
          if (!this.props.filterscheme[this.state.modelId].isdefault) {
            this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault, this.state.modelId);
          }
        } else {
          this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault, this.state.modelId);
        }
      } else {
        this.props.filterredux.IsDefault(!this.props.filterscheme[this.state.modelId].isdefault, this.state.modelId);
      }
    }
  }, {
    key: 'InputValue',
    value: function InputValue(e) {
      var solutionName = "";
      solutionName = e.target.value;
      this.setState({ InputValue: solutionName });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.CloseAddScheme();
      this.setState({ visible: false, ValueList: [] });
    }
  }, {
    key: 'AddSchemeRender',
    value: function AddSchemeRender() {
      var _this10 = this;

      var bAddscheme = this.props.filterscheme[this.state.modelId].bAddscheme;
      var bEdit = this.props.filterscheme[this.state.modelId].bEdit;
      var addqueryItems = this.AddqueryItems();
      var queryItemRender = this.QueryItemRender();
      var addSchemeContent = this.AddSchemeContent();
      var definedVisible = this.state.definedVisible;

      var content = void 0;
      content = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Modal,
          { className: 'scheme-content', title: bEdit ? "编辑" : "新增", visible: true, onOk: function onOk(e) {
              return _this10.handleok(e);
            },
            onCancel: function onCancel(e) {
              return _this10.handleCancel(e);
            }, maskClosable: false, style: { height: 400 }, footer: null },
          _react2.default.createElement(
            'div',
            { className: 'Scheme-Content-body' },
            addSchemeContent
          ),
          _react2.default.createElement(
            'div',
            { className: 'query-state' },
            ' ',
            queryItemRender
          ),
          _react2.default.createElement(
            'div',
            { className: 'ant-modal-footer' },
            addqueryItems
          )
        )
      );
      if (bAddscheme) {
        return content;
      } else {
        if (definedVisible) {
          return _react2.default.createElement(_filterDefined2.default, { visible: this.state.definedVisible, model: this.props.model, filterId: this.state.filterId });
        } else return content = "";
      }
    }
  }]);

  return FilterScheme;
}(_react.Component);

function mapStateToProps(state) {
  return { filterscheme: state.filterscheme.toJS() };
}
function mapDispatchToProps(dispatch) {
  return { filterredux: (0, _redux.bindActionCreators)(filterredux, dispatch) };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FilterScheme);