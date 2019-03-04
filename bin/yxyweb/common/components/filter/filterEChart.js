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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var FilterEChart = function (_React$Component) {
  _inherits(FilterEChart, _React$Component);

  function FilterEChart(props) {
    _classCallCheck(this, FilterEChart);

    var _this = _possibleConstructorReturn(this, (FilterEChart.__proto__ || Object.getPrototypeOf(FilterEChart)).call(this, props));

    _this.Tag2Clicked = function () {
      _this.SearchEvent();
    };

    _this.showModal = function () {
      _this.setState({ visible: true });
    };

    _this.handleCancel = function () {
      _this.setState({ visible: false });
    };

    var params = props.model.getParams();
    var filterId = props.config && props.config.filterid || props.config.filterId || params.filterId;
    var cardKey = params.cardKey;
    _this.state = {
      filterId: filterId,
      cardKey: cardKey,
      current: '',
      visible: false,
      filterModel: [],
      isInPanel: params.isInPanel || false,
      isInDesign: params.isInDesign || false
    };
    _this.vm = cb.loader.initMetaCommonViewModel('FilterViewModel', 'filterViewModel', {
      filterId: filterId, condition: params.condition, cardKey: cardKey, isInPanel: _this.state.isInPanel,
      isInDesign: _this.state.isInDesign, solutionId: params.solutionId, viewid: _lodash2.default.get(props.model.getParams(), 'query.viewid'),
      bHasNullDate: props.model.getParams().bHasNullDate || false
    }, _this.props.model, ['filterClick']);
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
        if (ctrlType && ctrlType.trim().toLocaleLowerCase() === 'tagbutton') {
          flag = false;
        }
      });
      if (flag) {
        _this.SearchEvent();
      }
    });
    _this.props.model.on('eChartPanel_GetCondition', function () {
      _this.SearchEvent();
    });
    return _this;
  }

  _createClass(FilterEChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.vm) {
        this.vm.addListener(this);
      }
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
    }
  }, {
    key: 'initFilterFields',
    value: function initFilterFields(args) {
      var filterModel = [];
      var _args$filterDetail = args.filterDetail,
          CommonModel = _args$filterDetail.CommonModel,
          AllFilterModel = _args$filterDetail.AllFilterModel;

      AllFilterModel.forEach(function (eleAll) {
        CommonModel.forEach(function (eleCommon) {
          if (eleAll.id && eleCommon.itemId && eleCommon.itemId == eleAll.id) {
            filterModel.push(Object.assign({}, eleAll, eleCommon));
          }
        });
      });
      this.vm.fireEvent('initFilterViewModel', { filterModel: filterModel });
      filterModel = filterModel.sort(function (a, b) {
        return a.orderId - b.orderId;
      });
      this.setState({ current: args.current, filterModel: filterModel });
    }
  }, {
    key: 'SearchEvent',
    value: function SearchEvent() {
      if (this.vm) {
        this.vm.fireEvent('searchEvent', { model: this.props.model, solutionid: this.state.current });
        this.vm.get('search').fireEvent('click', { model: this.props.model, solutionid: this.state.current });
      }
      this.setState({ visible: false });
    }
  }, {
    key: 'getControls',
    value: function getControls(ele, isShowCaption) {
      var control = null;var filterVMField = null;
      var ctrlType = ele.ctrlType.trim().toLocaleLowerCase();
      if (ele.isCommon == 1 || ele.isCommon == true) {
        var ComName = BasicComponentsMap[ctrlType];
        switch (ctrlType) {
          case "tagbutton":
            if (ele.autoFlt == true) {
              filterVMField = this.vm.get(ele.itemName);
              var fromModel = filterVMField.getFromModel();
              control = _react2.default.createElement(
                Col,
                { key: ele.itemName, span: 24 },
                _react2.default.createElement(
                  Tag2,
                  { TagTitle: !isShowCaption && ele.cShowCaption, TagData: ele.enumString, TagCanMultSel: ele.multSelect != 0, TagClicked: this.Tag2Clicked, model: fromModel },
                  ' '
                )
              );
            }
            break;
          case "predicatedatepicker":
            var model = this.vm.get(ele.itemName).getFromModel();
            control = _react2.default.createElement(ComName, { model: model, key: ele.itemName, cShowCaption: !isShowCaption && ele.cShowCaption, isInPanel: this.state.isInPanel });
            break;
          default:
            var config = null;
            try {
              config = JSON.parse(ele.extendField);
            } catch (e) {
              config = {};
            }
            filterVMField = this.vm.get(ele.itemName);
            if (!!filterVMField) {
              var compareLogic = ele.compareLogic;
              var _fromModel = filterVMField.getFromDisplayModel() || filterVMField.getFromModel();
              var toModel = filterVMField.getToModel();
              var _ctrlType = ele.ctrlType ? ele.ctrlType.trim().toLocaleLowerCase() : 'input';
              control = compareLogic === 'between' ? _react2.default.createElement(
                'div',
                { className: 'Test-time-two', key: ele.itemName },
                _react2.default.createElement(
                  Col,
                  { span: 11 },
                  this.getComponent(ComName, _fromModel, config, _ctrlType, ele, isShowCaption)
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
                  this.getComponent(ComName, toModel, config, _ctrlType, ele, isShowCaption)
                )
              ) : this.getComponent(ComName, _fromModel, config, _ctrlType, ele, isShowCaption);
            }
        }
      }
      return control;
    }
  }, {
    key: 'getComponent',
    value: function getComponent(ComName, model, config, ctrlType, ele, isShowCaption) {
      return ComName ? _react2.default.createElement(ComName, _extends({ model: model, key: ele.itemName, placeholder: isShowCaption && '请选择' + ele.cShowCaption, cShowCaption: !isShowCaption && ele.cShowCaption }, config)) : _react2.default.createElement(
        'h1',
        { key: ele.itemName },
        ctrlType
      );
    }
  }, {
    key: 'footerContent',
    value: function footerContent() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'popover-filter-footer' },
        _react2.default.createElement(
          Button,
          { type: 'default', onClick: this.handleCancel },
          '\u53D6\u6D88'
        ),
        !this.props.autoExpand ? _react2.default.createElement(
          Button,
          { type: 'primary', onClick: function onClick(e) {
              return _this2.SearchEvent();
            } },
          '\u641C\u7D22'
        ) : null
      );
    }
  }, {
    key: 'getContent',
    value: function getContent(controls, filterModel) {
      var modelFooter = this.footerContent();
      return _react2.default.createElement(
        'div',
        { className: 'col-float', style: { width: "100%" } },
        _react2.default.createElement(
          'div',
          { className: 'popover-filter-list' },
          controls.length ? controls.map(function (val, index) {
            var ctrlType = filterModel[index].ctrlType.trim().toLocaleLowerCase();
            return ctrlType == "predicatedatepicker" ? _react2.default.createElement(
              'div',
              { className: 'viewCell width-percent-100' },
              val
            ) : _react2.default.createElement(
              'div',
              { className: 'viewCell width-percent-50' },
              val
            );
          }) : null
        ),
        modelFooter
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          filterModel = _state.filterModel,
          visible = _state.visible;

      var controls = filterModel.length ? filterModel.map(function (ele) {
        return _this3.getControls(ele);
      }) : [];
      var _filterModel = _lodash2.default.cloneDeep(filterModel);
      _filterModel = _filterModel.slice(0, 2);
      var showControls = _filterModel.length ? _filterModel.map(function (ele) {
        return _this3.getControls(ele, true);
      }) : null;
      var content = this.getContent(controls, filterModel);
      return _react2.default.createElement(
        'div',
        { className: 'filter-inDesktop' },
        showControls,
        _react2.default.createElement(
          _antd.Popover,
          { content: content, trigger: 'click', onCancel: this.handleCancel, visible: visible, overlayClassName: 'filter-container-inDesktop' },
          _react2.default.createElement(
            Button,
            { type: 'ghost', onClick: this.showModal },
            '\xB7\xB7\xB7'
          )
        )
      );
    }
  }]);

  return FilterEChart;
}(_react2.default.Component);

exports.default = FilterEChart;
;