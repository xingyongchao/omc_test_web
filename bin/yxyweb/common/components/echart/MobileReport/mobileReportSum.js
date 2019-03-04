'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../../../helpers/util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _antdMobile = require('antd-mobile');

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// let ConvenientQuery = null;
//panelsum eChartSum
var mobileReportSum = function (_Component) {
  _inherits(mobileReportSum, _Component);

  function mobileReportSum(props) {
    _classCallCheck(this, mobileReportSum);

    var _this = _possibleConstructorReturn(this, (mobileReportSum.__proto__ || Object.getPrototypeOf(mobileReportSum)).call(this, props));

    _this.state = {
      billnum: props.billnum ? props.billnum : "rm_saleanalysis",
      condition: null,
      totalFields: {},
      controls: [],
      bDisplaySumField: true,
      sumDisplayIndex: 0,
      sumData: [{}],
      firstQueryDone: false
    };
    _this.sumCount = 4;
    return _this;
  }

  _createClass(mobileReportSum, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      if (this.props.viewModel) {
        this.props.viewModel.on("filterClick", function (params) {
          eChartCommon.LogChartInfo("移动报表 MobileReportSum filterClick   ", "", 900);
          self.state.condition = params.condition;
          self.getSumData();
        });
        this.props.viewModel.on('firstQueryDone', function (params) {
          eChartCommon.LogChartInfo("移动报表 MobileReportSum firstQueryDone params =  ", params, 900);
          _this2.state.firstQueryDone = params;
          // self.getSumData();
        });
      }
      if (self.state.billnum) {
        self.getTotalFields(self.state.billnum);
      }
    }
  }, {
    key: 'getTotalFields',
    value: function getTotalFields(billnum) {
      var _this3 = this;

      var self = this;
      if (_lodash2.default.isEmpty(self.state.totalFields) && !!billnum && self.state.bDisplaySumField) {
        var totalFields = {};
        var sumFieldsCount = 0;
        var param = { billnum: billnum, isOnlySelected: true };
        var callback = function callback(json) {
          if (json.code === 200) {
            if (json.data) {
              var items = json.data.items;
              items.forEach(function (ele) {
                var caption = ele.showCaption ? ele.showCaption : ele.caption;
                if (ele.selected) {
                  var totalField = { caption: caption, value: 0 };
                  if (!totalFields[ele.fieldname]) {
                    totalFields[ele.fieldname] = totalField;
                    sumFieldsCount = sumFieldsCount + 1;
                  }
                }
              });
              if (_lodash2.default.isEmpty(totalFields)) {
                self.setState({ bDisplaySumField: false });
                return;
              } else {
                if (_this3.props.setSumFieldsCount) _this3.props.setSumFieldsCount(sumFieldsCount);
                self.state.totalFields = totalFields;
                self.setSum();
              }
            };
          } else {
            self.setState({ bDisplaySumField: false });
          }
        };
        this.actionsProxy('report/getTotalSetting', 'GET', param, callback);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'formatData',
    value: function formatData(fieldName, fieldValue, fields) {
      if (isNaN(fieldValue)) return fieldValue;
      var fieldEle = _lodash2.default.find(fields, function (o) {
        return o.cItemName == fieldName;
      });
      /*谓词变量支持系统参数*/
      if (!fieldEle) {
        return fieldValue;
      }
      var cFormatData = fieldEle.cFormatData;
      try {
        if (!cFormatData || cFormatData == '') {
          cFormatData = {};
        } else {
          cFormatData = JSON.parse(cFormatData);
        }
      } catch (e) {
        // cb.utils.alert('数量/金额/单价，预制错误！', 'error');
        return fieldValue;
      }
      var iNumPoint = fieldEle.iNumPoint;
      var decimal = cFormatData.decimal ? (0, _util.getPredicateValue)(cFormatData.decimal) : null;
      var controlType = fieldEle.cControlType;
      if (controlType === 'money') {
        if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.amountofdecimal;
      } else if (controlType === 'price') {
        if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
      } else {
        if (decimal) iNumPoint = decimal;else if (cb.utils.isEmpty(iNumPoint)) iNumPoint = null;
      }
      if (!isNaN(iNumPoint) && iNumPoint != null) {
        fieldValue = parseFloat(fieldValue);
        fieldValue = (0, _util.getRoundValue)(fieldValue, iNumPoint);
      }
      if (cFormatData.after) fieldValue = fieldValue + cFormatData.after;
      return fieldValue;
    }
  }, {
    key: 'setSum',
    value: function setSum(sumData) {
      var self = this;
      var fields = self.state.entitiesFields;
      sumData = sumData || self.state.sumData;
      if (_lodash2.default.isEmpty(sumData) || !sumData.length) sumData = [{}];
      var controls = [];
      _lodash2.default.forEach(self.state.totalFields, function (item, key) {
        var value = sumData[0][key] || 0;
        if (fields) {
          value = self.formatData(key, value, fields);
        }
        controls.push({ caption: item.caption, value: value });
      });
      self.setState({ sumData: sumData, controls: controls });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // if (this.state.condition != nextProps.condition) {
      //   this.state.condition = nextProps.condition;
      //   this.getSumData();
      // }
    }
  }, {
    key: 'getSumData',
    value: function getSumData() {
      var self = this;
      if (!self.state.condition || self.state.bDisplaySumField == false || self.state.firstQueryDone == false) {
        self.setSum([{}]);
      } else {
        var queryParams = {
          billnum: self.state.billnum,
          isOnlyTotal: true,
          condition: self.state.condition
        };

        var callback = function callback(json) {
          var data = [{}];
          if (json.code === 200) {
            data = json.data.sumRecordList;
            if (data == null || data.length == 1 && data[0] == null) data = [{}];
            var fields = _lodash2.default.get(json.data, "viewmodel.entities[0].fields");
            self.state.entitiesFields = fields;
            self.setSum(data);
          } else {
            self.setState({ sumData: data, entitiesFields: {} });
          }
        };

        this.actionsProxy('/report/list', 'POST', queryParams, callback);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var controls = this.state.controls;

      var self = this;
      eChartCommon.LogChartInfo("移动报表 MobileReportSum Render ", "", 900);
      // const children = [];
      // controls.forEach((item, index) => {
      //   if (index >= self.state.sumDisplayIndex * this.sumCount && children.length < this.sumCount) {
      //     children.push(<div style={{ float: 'left', width: '50%' }}>
      //       <div><h4>{item.value}</h4></div>
      //       <div><h3>{item.caption}</h3></div>
      //     </div>)
      //   }
      // });
      // return (
      //   <div
      //     style={{ float: 'left', width: '100%' }}
      //     className="MobileSum"
      //     onClick={() => { this.sumPageNext() }}
      //   >
      //     {children}
      //   </div>
      // );
      if (!controls || controls.length == 0 || this.state.bDisplaySumField == false) return _react2.default.createElement('div', null);
      var children = [];
      var allTabs = [];
      var tabs = [];
      controls.forEach(function (item, index) {
        if (children.length < _this4.sumCount) {
          children.push(_react2.default.createElement(
            'div',
            { className: 'MobileSumItem' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                null,
                item.caption
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { fontSize: '25px' } },
              ' ',
              item.value,
              ' '
            )
          ));
        }
        if (children.length == _this4.sumCount || index == controls.length - 1) {
          allTabs.push(_react2.default.createElement(
            'div',
            { className: 'MobileSumTab' },
            children
          ));
          tabs.push({ title: ' ', sumFieldsCount: children.length });
          children = [];
        }
      });

      var content = void 0;
      if (allTabs.length == 1) {
        content = allTabs;
      } else {
        content = _react2.default.createElement(
          _antdMobile.Tabs,
          {
            tabs: tabs,
            tabBarPosition: "bottom",
            onChange: function onChange(tab, index) {
              return _this4.handleTabChange(tab, index);
            }
          },
          allTabs
        );
      }
      return _react2.default.createElement(
        'div',
        {
          style: { float: 'left', width: '100%' },
          className: "MobileSum MobileSumControlCount_" + (controls.length < 5 ? controls.length.toString() : "5")
        },
        _react2.default.createElement('div', { className: "MobileSumTabSpliter_" + (controls.length < 5 ? controls.length.toString() : "5") }),
        content
      );
    }
  }, {
    key: 'handleTabChange',
    value: function handleTabChange(tab, index) {}
    // let sumFieldsCount = tab.sumFieldsCount;
    // if (this.props.setSumFieldsCount)
    //   this.props.setSumFieldsCount(sumFieldsCount);

    // sumPageNext() {
    //   let num = this.state.sumDisplayIndex;
    //   num = num + 1;
    //   if (num * this.sumCount >= this.state.controls.length)
    //     num = 0;
    //   this.setState({ sumDisplayIndex: num });
    // }

  }, {
    key: 'actionsProxy',
    value: function actionsProxy(url, method, params, callback) {
      var config = { url: url, method: method, params: params };
      (0, _util.proxy)(config).then(function (json) {
        callback(json);
      });
    }
  }]);

  return mobileReportSum;
}(_react.Component);

exports.default = mobileReportSum;