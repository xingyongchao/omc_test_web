'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../../basic');

var BasicComponents = _interopRequireWildcard(_basic);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = BasicComponents.Row,
    Col = BasicComponents.Col,
    Button = BasicComponents.Button,
    Label = BasicComponents.Label,
    Tag2 = BasicComponents.Tag2;

var BasicComponentsMap = {};
for (var attr in BasicComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
}
var TouchFilter = function (_React$Component) {
  _inherits(TouchFilter, _React$Component);

  function TouchFilter(props) {
    _classCallCheck(this, TouchFilter);

    var _this = _possibleConstructorReturn(this, (TouchFilter.__proto__ || Object.getPrototypeOf(TouchFilter)).call(this, props));

    _this.Tag2Clicked = function () {
      _this.SearchEvent();
    };

    _this.state = {
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
    var params = _this.props.model.getParams();
    _this.vm = cb.loader.initMetaCommonViewModel('FilterViewModel', 'filterViewModel', { filterId: params.filterId, condition: params.condition, cardKey: params.cardKey }, _this.props.model, ['filterClick']);
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
    return _this;
  }

  _createClass(TouchFilter, [{
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
      if (this.controlNode.clientHeight > document.body.clientHeight - 130) {
        if (this.state.className !== 'filter-greater-height') this.setState({ className: 'filter-greater-height' });
      } else {
        if (this.state.className !== 'filter-less-height') this.setState({ className: 'filter-less-height' });
      }
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
        var searchClick = this.props.searchClick;

        if (searchClick) searchClick();
      } else if (type === 'reset') {
        this.vm.get('reset').execute('click');
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
      var _this2 = this;

      this.checkTagAndFilterInfo();
      var control = this.getControls();
      var style = {};
      if (this.props.height) style.height = this.props.height;
      var extraProps = {};
      if (this.state.className) extraProps.className = this.state.className;
      return _react2.default.createElement(
        Row,
        _extends({ colCount: 1, style: style }, extraProps),
        _react2.default.createElement(
          Col,
          { style: this.props.title ? null : { display: 'none' } },
          '\u7B5B\u9009'
        ),
        _react2.default.createElement(
          Col,
          null,
          control
        ),
        _react2.default.createElement(
          Col,
          null,
          _react2.default.createElement(
            Button,
            { className: 'up-search', onClick: function onClick(e) {
                return _this2.buttonClick(e, 'reset');
              } },
            '\u91CD\u7F6E'
          ),
          _react2.default.createElement(
            Button,
            { delay: true, className: 'up-search', onClick: function onClick(e) {
                return _this2.buttonClick(e, 'search');
              } },
            '\u67E5\u8BE2'
          )
        )
      );
    }
  }, {
    key: 'getControls',
    value: function getControls() {
      var _this3 = this;

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
          if (ctrlType === 'tagbutton') {
            if (ele.autoFlt == true) {
              cur_FilterAreaCount = rowNum;
              tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
              if (tmp_FilterAreaCount <= rowNum) {
                cur_Tag2InFirstRow = true;
              }
              filterVMField = this.vm.get(ele.itemName);
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
              _react2.default.createElement(ComName, { model: model, cShowCaption: ele.cShowCaption, isInFilterJSX: true })
            );
          } else {
            cur_FilterAreaCount = 1;
            tmp_FilterAreaCount = tmp_FilterAreaCount + cur_FilterAreaCount;
            filterVMField = this.vm.get(ele.itemName);
            control = this.getControl(ele, filterVMField);
          }
          // if (this.state.showMore) {
          controls.push(_react2.default.createElement(
            Col,
            { key: ele.itemName, span: cur_FilterAreaCount },
            control
          ));
          // }
          // else {
          //   if (tmp_FilterAreaCount <= rowNum) {
          //     controls.push(<Col key={ele.itemName} span={cur_FilterAreaCount}>{control}</Col>);
          //   }
          // }
        }
      }, this);
      this.state.filterAreaCount = tmp_FilterAreaCount;
      this.state.tag2InFirstRow = cur_Tag2InFirstRow;
      return _react2.default.createElement(
        'div',
        { ref: function ref(node) {
            return _this3.controlNode = node;
          } },
        _react2.default.createElement(
          Row,
          { colCount: rowNum },
          controls
        )
      );
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
    value: function getControl(ele, filterVMField) {
      var config = null;
      try {
        config = JSON.parse(ele.extendField);
      } catch (e) {
        config = {};
      }
      delete ele.extendField;
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

  return TouchFilter;
}(_react2.default.Component);

exports.default = TouchFilter;
;