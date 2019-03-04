'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _basic = require('../basic');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _filter = require('../filter');

var _filter2 = _interopRequireDefault(_filter);

var _groupcondition = require('../basic/groupcondition');

var _groupcondition2 = _interopRequireDefault(_groupcondition);

var _eChartDemoData = require('../echart/eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _radio = require('antd/lib/radio');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ReportSelect from './ReportSelect';


var ListHeader = function (_Component) {
  _inherits(ListHeader, _Component);

  function ListHeader(props) {
    _classCallCheck(this, ListHeader);

    var _this = _possibleConstructorReturn(this, (ListHeader.__proto__ || Object.getPrototypeOf(ListHeader)).call(this, props));

    var _props$model$getParam = props.model.getParams(),
        query = _props$model$getParam.query,
        filterId = _props$model$getParam.filterId;

    _this.isStaticReport = query.reportId || query.subscriptionId || !filterId ? true : false;
    _this.viewid = _.get(props.model.getParams(), 'query.viewid');

    _this.bPublished = _this.viewid ? true : false;

    return _this;
  }

  _createClass(ListHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.height = (0, _reactDom.findDOMNode)(this.refs.listHeader).clientHeight;
      this.props.model.execute('listHeaderHeightUpdate', this.height);
      this.props.model.on('filterHeightUpdate', function () {
        var height = (0, _reactDom.findDOMNode)(_this2.refs.listHeader).clientHeight;
        if (_this2.height === height) return;
        _this2.height = height;
        _this2.props.model.execute('listHeaderHeightUpdate', _this2.height);
      });
    }
  }, {
    key: 'setQueryItems',
    value: function setQueryItems(viewModel, item) {
      var queryItems = viewModel.getCache('queryItems') || [];
      if (queryItems.indexOf(item) === -1) queryItems.push(item);
      viewModel.setCache('queryItems', queryItems);
    }
  }, {
    key: 'publishMenu',
    value: function publishMenu(model) {
      model.execute('publishMenu');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          meta = _props.meta,
          model = _props.model,
          hasTree = _props.hasTree;

      var filter = null,
          toolbar = null,
          solution = null;
      meta.containers.map(function (item) {
        switch (item.cControlType.trim().toLocaleLowerCase()) {
          case 'convenientquery':
            if (_this3.isStaticReport) return;
            _this3.setQueryItems(model, 'filter');
            filter = _react2.default.createElement(_filter2.default, { model: model, cols: 3 });
            break;
          case 'toolbar':
            if (_this3.bPublished == true) {
              item.controls = _.filter(item.controls, function (o) {
                return o.cItemName != "btnsumSetting" && o.cItemName != "btnMenupublish";
              });
            }
            var extraProps = {};
            try {
              if (cb.rest.toolbarHotfix) {
                var showCount = item.controls && item.controls.length > 1 && item.controls[0].cItemName !== 'btnAdd' ? 0 : 1;
                if (item.cStyle) {
                  var config = JSON.parse(item.cStyle);
                  if (config.hotfix === false) {
                    showCount = undefined;
                  } else {
                    if (!cb.utils.isEmpty(config.showCount)) showCount = config.showCount;
                    if (showCount === true) showCount = items.controls.length;
                  }
                }
                extraProps.showCount = showCount;
              }
            } catch (e) {}
            toolbar = _react2.default.createElement(_Toolbar2.default, _extends({ align: 'right', controls: item.controls, model: model }, extraProps));
            break;
          case 'reportselect':
            if (_this3.isStaticReport) return;
            _this3.setQueryItems(model, 'schema');
            solution = _react2.default.createElement(_groupcondition2.default, { viewModel: model, viewid: _this3.viewid });
            break;
        }
      });
      var secondCom = solution ? _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          'div',
          { className: 'rpt-toolbar' },
          toolbar
        ),
        _react2.default.createElement(
          'div',
          { className: 'rpt-select' },
          solution
        )
      ) : _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { span: 24 },
          toolbar
        )
      );
      return _react2.default.createElement(
        _basic.Row,
        { ref: 'listHeader', className: 'listheadRow' },
        _react2.default.createElement(
          _basic.Row,
          null,
          _react2.default.createElement(
            _basic.Col,
            { span: 24 },
            filter
          )
        ),
        secondCom
      );
    }
  }]);

  return ListHeader;
}(_react.Component);

exports.default = ListHeader;