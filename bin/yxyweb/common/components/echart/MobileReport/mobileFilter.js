'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _BasicComponents = require('../../../../mobile/components/BasicComponents');

var BasicComponents = _interopRequireWildcard(_BasicComponents);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../../../../mobile/styles/globalCss/filter.css');
var BasicComponentsMap = {};
for (var attr in BasicComponents) {
  BasicComponentsMap[attr.toLocaleLowerCase()] = BasicComponents[attr];
}var _self = null;

var mobileFilter = function (_Component) {
  _inherits(mobileFilter, _Component);

  function mobileFilter(props) {
    _classCallCheck(this, mobileFilter);

    var _this = _possibleConstructorReturn(this, (mobileFilter.__proto__ || Object.getPrototypeOf(mobileFilter)).call(this, props));

    _this.initFilterFields = function (args) {
      var filterModel = [];
      var CommonModel = args.filterDetail.CommonModel;
      var AllFilterModel = args.filterDetail.AllFilterModel;
      var cacheFilterModel = [];
      AllFilterModel.forEach(function (eleAll) {
        CommonModel.forEach(function (eleCommon) {
          if (eleAll.id && eleCommon.itemId && eleCommon.itemId == eleAll.id) {
            var tmp = {},
                ctrlType = '';
            Object.assign(tmp, eleAll, eleCommon);
            filterModel.push(tmp);
            ctrlType = eleCommon.ctrlType.toLocaleLowerCase();
            if (eleCommon.ctrlType && (ctrlType === 'tagbutton' || ctrlType === 'searchbox')) {
              cacheFilterModel.push(tmp);
            }
          }
        }, this);
      }, _this);
      _this.vm.setCache('filterModel', filterModel.length > 0 ? filterModel[0] : null);
      _this.vm.setCache('cacheFilterModel', cacheFilterModel.length > 0 ? cacheFilterModel : null);
      _this.vm.fireEvent('initFilterViewModel', { filterModel: filterModel });
      _this.setState({
        schemeData: args.schemeData,
        current: args.current,
        schemeName: args.schemeName,
        filterModel: filterModel.sort(function (a, b) {
          return a.orderId - b.orderId;
        })
      });
      if (_this.props.initFilterFields) _this.props.initFilterFields();
    };

    _this.onOk = function () {
      if (_this.vm) {
        _this.vm.fireEvent('searchEvent', { model: _this.props.model, solutionid: _this.state.current });
        _this.vm.get('search').fireEvent('click', { model: _this.props.model, solutionid: _this.state.current });
      }
      if (_this.props.onOk) _this.props.onOk();
      _this.onOpenChange();
    };

    _this.onReset = function () {
      if (_this.vm) _this.vm.get('reset').execute('click');
      // if (this.props.onOk) this.props.onOk();
    };

    _this.getFilterContent = function () {
      var self = _this;
      var _this$state = _this.state,
          referControl = _this$state.referControl,
          isReferOpen = _this$state.isReferOpen,
          isHideFilter = _this$state.isHideFilter;
      var filterModel = _this.state.filterModel;

      var controls1 = [];
      var controls2 = [];
      var controls3 = [];
      // controls.push(
      //   <Flex className="mobileFilter_Footer_Button " style={{ display: (!isHideFilter ? 'flex' : 'none') }}>
      //     <Flex.Item>
      //       <Button onClick={self.onReset}>重置</Button>
      //     </Flex.Item>
      //     <Flex.Item>
      //       <Button onClick={self.onOk}>确定</Button>
      //     </Flex.Item>
      //   </Flex >
      // );
      var titleContent = [];
      filterModel.map(function (item, index) {
        var ctrlType = item.ctrlType.trim().toLocaleLowerCase();
        var control = _this.getControl(ctrlType, item);
        if (ctrlType == "predicatedatepicker" && !self.props.viewid) {
          titleContent.push(_react2.default.createElement(
            'span',
            { className: 'mobileFilter_Span1' },
            _react2.default.createElement(
              'div',
              null,
              control
            )
          ));
        } else {
          if (control) controls1.push(_react2.default.createElement(
            _antdMobile.Flex,
            null,
            _react2.default.createElement(
              _antdMobile.Flex.Item,
              null,
              control
            )
          ));
        }
      });

      controls2.push(_react2.default.createElement(
        _antdMobile.Flex,
        { className: 'mobileFilter_Footer_Button ', style: { display: !isHideFilter ? 'flex' : 'none' } },
        _react2.default.createElement(
          _antdMobile.Flex.Item,
          null,
          _react2.default.createElement(
            _antdMobile.Button,
            { onClick: self.onReset },
            '\u91CD\u7F6E'
          )
        ),
        _react2.default.createElement(
          _antdMobile.Flex.Item,
          null,
          _react2.default.createElement(
            _antdMobile.Button,
            { onClick: self.onOk },
            '\u786E\u5B9A'
          )
        )
      ));
      controls3.push(_react2.default.createElement(
        'div',
        { className: 'mobileFilter_Refer', style: { display: isReferOpen ? 'block' : 'none' } },
        isReferOpen ? referControl : ''
      ));

      if (!!_this.props.otherTitleContent) titleContent.push(_react2.default.createElement(
        'span',
        { className: 'mobileFilter_Span2' },
        _react2.default.createElement(
          'div',
          null,
          _this.props.otherTitleContent
        )
      ));

      titleContent.push(_react2.default.createElement(
        'span',
        { className: 'mobileFilter_Span3', style: { display: _this.props.viewid ? "none" : "" } },
        _react2.default.createElement(
          'div',
          { onClick: function onClick() {
              self.onOpenChange();
            } },
          '\u7B5B\u9009',
          _react2.default.createElement('i', { className: "icon icon-shaixuan1" })
        )
      ));
      var sidebar = _react2.default.createElement(
        'div',
        { className: 'mobileFilter_SideBar' },
        _react2.default.createElement(
          'div',
          { className: 'mobileFilter_Controls' },
          controls1
        ),
        _react2.default.createElement(
          'div',
          { className: 'mobileFilter_OkReset' },
          controls2
        ),
        controls3
      );
      return _react2.default.createElement(
        'div',
        { className: 'mobileFilter' },
        _react2.default.createElement(
          _antdMobile.Drawer,
          { className: 'mobileFilter_Drawer filter-drawer',
            open: self.state.openFilter,
            enableDragHandle: false,
            sidebar: sidebar,
            position: 'right',
            onOpenChange: self.onOpenChange
          },
          self.props.otherContent1,
          _react2.default.createElement(
            'div',
            { className: 'mobileTitleSumData', style: { width: "100%", height: "auto" } },
            _react2.default.createElement(
              'div',
              { className: "mobileTitle mobileTitleCount_" + titleContent.length, style: { display: _this.props.isVertical ? "" : "none" } },
              titleContent
            ),
            self.props.otherContent2
          )
        )
      );
    };

    _this.onOpenChange = function () {
      _this.setState({ openFilter: !_this.state.openFilter });
    };

    _this.getControl = function (ctrlType, item) {
      var model = _this.vm.get(item.itemName);
      if (!model) return;
      var compareLogic = item.compareLogic;
      var fromModel = model.getFromDisplayModel() || model.getFromModel();
      var toModel = model.getToModel();
      var control = null;
      var ComName = BasicComponentsMap[ctrlType];
      if (compareLogic === 'between') {
        var _toModel = model.getFromDisplayModel() || model.getToModel();
        if (ComName) control = _react2.default.createElement(ComName, { setHideFilter: _this.setHideFilter, model: fromModel, toModel: _toModel, title: item.cShowCaption });else control = _react2.default.createElement(
          'span',
          null,
          item.cShowCaption,
          '--',
          ctrlType
        );
      } else if (ctrlType === 'searchbox') {} else {
        if (ComName) {
          if (ctrlType === 'refer' || ctrlType === 'treerefer') {
            control = _react2.default.createElement(ComName, { model: fromModel, title: item.cShowCaption, referStatus: _this.referStatus.bind(_this) });
          } else if (ctrlType === 'tagbutton') {
            // control = <ComName model={fromModel} TagClicked = {this.onOk} title={item.cShowCaption} />;
          } else {
            control = _react2.default.createElement(ComName, { model: fromModel, title: item.cShowCaption });
          }
        } else {
          control = _react2.default.createElement(
            'span',
            null,
            item.cShowCaption,
            '--',
            ctrlType
          );
        }
      }
      return control;
    };

    _this.getFilterControls = function () {
      var filterModel = _this.state.filterModel;

      var controls = [];
      filterModel.map(function (item) {
        var ctrlType = item.ctrlType.trim().toLocaleLowerCase();
        var control = _this.getControl(ctrlType, item);
        if (control) controls.push(_react2.default.createElement(
          _antdMobile.Flex,
          null,
          _react2.default.createElement(
            _antdMobile.Flex.Item,
            null,
            control
          )
        ));
      });
      return _react2.default.createElement(
        'div',
        { className: 'filter-controls' },
        controls
      );
    };

    _this.state = {
      schemeData: [],
      current: '',
      schemeName: '',
      filterModel: [],
      openFilter: false,
      isReferOpen: false,
      referControl: null
    };
    _this.filterType = props.filterType;
    _this.showFields = new Array();
    // var params = this.props.model.getParams();

    return _this;
  }

  _createClass(mobileFilter, [{
    key: 'initVM',
    value: function initVM() {
      var _this2 = this;

      var self = this;
      var params = self.props.model.getParams();
      var filterId = this.props.filterId || params.filterId;
      if (!this.vm && !!filterId) {
        this.vm = cb.loader.initMetaCommonViewModel('FilterViewModel', 'filterViewModel', {
          filterId: filterId,
          condition: params.condition ? params.condition : null,
          cardKey: this.props.cardKey || params.cardKey,
          viewid: this.filterType == "report" ? this.props.viewid || params.viewid : undefined
        }, this.props.model, ['filterClick']);
        this.vm.addListener(this);
        this.props.model.on('updateCondition', function (condition) {
          if (!condition || !condition.commonVOs || !condition.commonVOs.length) return;
          var flag = true;
          _this2.vm.setCache('condition', condition);
          condition.commonVOs.forEach(function (a) {
            var attr = a.itemName;
            var itemModel = _this2.vm.get(attr);
            if (!itemModel) return;
            itemModel.getFromModel().setValue(a.value1);
          });
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _self = this;
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
    // if (this.props.open != nextProps.open || this.state.open != nextProps.open) {
    //   this.setState({ open: nextProps.open })
    // }

    // componentDidUpdate() {
    //   if (this.vm)
    //     this.vm.addListener(this);
    // }

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.vm.removeListener(this);
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'referStatus',
    value: function referStatus(control, isOpen) {
      if (control != null) this.setState({ referControl: control, isReferOpen: isOpen, isHideFilter: isOpen });else this.setState({ isReferOpen: isOpen, isHideFilter: isOpen });
    }
  }, {
    key: 'setHideFilter',
    value: function setHideFilter(bl) {
      _self.setState({ isHideFilter: bl });
    }
  }, {
    key: 'render',
    value: function render() {
      eChartCommon.LogChartInfo("移动报表 MobileFilter Render ", "", 900);

      this.initVM();
      if (this.filterType == "report") {
        var content = this.getFilterContent();
        return _react2.default.createElement(
          'div',
          null,
          content
        );
      } else //"list"
        {
          var _state = this.state,
              referControl = _state.referControl,
              isReferOpen = _state.isReferOpen,
              isHideFilter = _state.isHideFilter;

          var control = this.getFilterControls();
          return _react2.default.createElement(
            'div',
            { className: 'filter-container' },
            control,
            _react2.default.createElement(
              _antdMobile.Flex,
              { className: 'filter-footer-button', style: { display: !isHideFilter ? 'flex' : 'none' } },
              _react2.default.createElement(
                _antdMobile.Flex.Item,
                null,
                _react2.default.createElement(
                  _antdMobile.Button,
                  { onClick: this.onReset },
                  '\u91CD\u7F6E'
                )
              ),
              _react2.default.createElement(
                _antdMobile.Flex.Item,
                null,
                _react2.default.createElement(
                  _antdMobile.Button,
                  { onClick: this.onOk },
                  '\u786E\u5B9A'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'refer_v_drawer', style: { display: isReferOpen ? 'block' : 'none' } },
              isReferOpen ? referControl : ''
            )
          );
        }
    }
  }]);

  return mobileFilter;
}(_react.Component);

exports.default = mobileFilter;