'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../../../yxyweb/common/components/basic');

var _HomeTitle = require('./HomeTitle');

var _HomeTitle2 = _interopRequireDefault(_HomeTitle);

var _SaleRank = require('./SaleRank');

var _SaleRank2 = _interopRequireDefault(_SaleRank);

var _MyToDo = require('./MyToDo');

var _MyToDo2 = _interopRequireDefault(_MyToDo);

var _SaleTrend = require('./SaleTrend');

var _SaleTrend2 = _interopRequireDefault(_SaleTrend);

var _TaskList = require('./TaskList');

var _TaskList2 = _interopRequireDefault(_TaskList);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _CommonFunctions = require('./CommonFunctions');

var _CommonFunctions2 = _interopRequireDefault(_CommonFunctions);

var _home = require('../../redux/modules/home');

var homeActions = _interopRequireWildcard(_home);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _antd = require('antd');

var _eChartPanelDisplay = require('../../../yxyweb/common/components/echart/panel/eChartPanelDisplay2');

var _eChartPanelDisplay2 = _interopRequireDefault(_eChartPanelDisplay);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _antd.Tabs.TabPane;

var HomeControl = function (_React$Component) {
  _inherits(HomeControl, _React$Component);

  function HomeControl(props) {
    _classCallCheck(this, HomeControl);

    var _this = _possibleConstructorReturn(this, (HomeControl.__proto__ || Object.getPrototypeOf(HomeControl)).call(this, props));

    _this.rowKey = 0;
    _this.colKey = 0;
    return _this;
  }

  _createClass(HomeControl, [{
    key: 'getControlByType',
    value: function getControlByType(ele) {
      var cControlType = ele.cControlType;
      var control = void 0;
      switch (cControlType) {
        case 'SaleRank':
          control = _react2.default.createElement(_SaleRank2.default, { title: ele.title, type: ele.type });
          break;
        case 'MyToDo':
          control = _react2.default.createElement(_MyToDo2.default, null);
          break;
        case 'SaleTrend':
          var clientWidth = document.documentElement.clientWidth;
          var width = (clientWidth - 150 - 20) * (2 / 3) * 0.5;
          width = width - 40;
          control = _react2.default.createElement(_SaleTrend2.default, { width: width });
          break;
        case 'TaskList':
          control = _react2.default.createElement(_TaskList2.default, null);
          break;
        case 'Card':
          control = _react2.default.createElement(_Card2.default, { title: ele.title, type: ele.type });
          break;
        case 'CommonFunctions':
          control = _react2.default.createElement(_CommonFunctions2.default, { title: ele.title });
          break;
        // case 'DistributionMap':
        //     control = (<DistributionMap title={ele.title} />);
        //     break;
      }
      return control;
    }
  }, {
    key: 'getRowControl',
    value: function getRowControl(row) {
      var rowControl = [];
      row.forEach(function (ele) {
        var colControl = this.getColControl(ele.col);
        rowControl.push(_react2.default.createElement(
          _basic.Row,
          { colCount: 12 },
          colControl
        ));
      }, this);
      return rowControl;
    }
  }, {
    key: 'getColControl',
    value: function getColControl(col) {
      var colControl = [];
      col.forEach(function (ele) {
        var colKey = 'col' + this.colKey++;
        if (ele.row) {
          var row = this.getRowControl(ele.row);
          colControl.push(_react2.default.createElement(
            _basic.Col,
            { span: ele.span },
            row
          ));
        } else {
          var control = this.getControlByType(ele);
          colControl.push(_react2.default.createElement(
            _basic.Col,
            { span: ele.span },
            control
          ));
        }
      }, this);
      return colControl;
    }
  }, {
    key: 'getControlByLayout',
    value: function getControlByLayout(layoutJson) {
      var row = layoutJson.row;
      var rowControl = this.getRowControl(row);
      return rowControl;
    }
  }, {
    key: 'renderLayout',
    value: function renderLayout(layout) {
      var control = this.getControlByLayout(layout);
      return _react2.default.createElement(
        'div',
        { className: 'home-1' },
        control
      );
    }
  }, {
    key: 'renderKanbans',
    value: function renderKanbans(kanbans) {
      return kanbans.map(function (item) {
        return _react2.default.createElement(_eChartPanelDisplay2.default, { previewId: item.id });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$home = this.props.home,
          layOut = _props$home.layOut,
          kanbans = _props$home.kanbans;

      var items = [];
      if (layOut) items.push(this.renderLayout(layOut));
      if (kanbans.length) items = items.concat(this.renderKanbans(kanbans));
      if (!items.length) return null;
      if (items.length === 1) return items[0];else {
        var panes = [];
        items.forEach(function (item, index) {
          panes.push(_react2.default.createElement(
            TabPane,
            { tab: index + 1, key: index + 1 },
            item
          ));
        });
        return _react2.default.createElement(
          _antd.Tabs,
          { tabPosition: 'bottom', animated: false },
          panes
        );
      }
    }
  }]);

  return HomeControl;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    home: state.home.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: (0, _redux.bindActionCreators)(homeActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HomeControl);