'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basic = require('../basic');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../../helpers/util');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _eChartCommon = require('../echart/eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _TotalContainerOld = require('./TotalContainerOld');

var _TotalContainerOld2 = _interopRequireDefault(_TotalContainerOld);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TotalContainer = function (_Component) {
  _inherits(TotalContainer, _Component);

  //   render() {
  //     const { billnum, viewModel } = this.props;
  //     // const controlModel = viewModel.get(meta.cCode);
  //     return (
  //       <Total billnum={billnum} viewModel={viewModel} />
  //     );
  //   }
  // }

  // class Total extends Component {

  function TotalContainer(props) {
    _classCallCheck(this, TotalContainer);

    var _this = _possibleConstructorReturn(this, (TotalContainer.__proto__ || Object.getPrototypeOf(TotalContainer)).call(this, props));

    var bPublished = _this.props.viewid ? true : false;
    _this.state = {
      billnum: props.billnum ? props.billnum : _this.props.viewModel.getParams().billNo,
      totalFields: {},
      condition: {},
      controls: [],
      bDisplaySumField: true,
      bPublished: bPublished,
      firstQueryDone: false
    };
    return _this;
  }

  _createClass(TotalContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      self.props.viewModel.on('firstQueryDone', function (params) {
        // if (params == true) {
        self.state.firstQueryDone = params;
        // }
      });
      self.props.viewModel.on("filterClick", function (params) {
        self.state.condition = params.condition;
        self.getSum();
      });
      self.props.viewModel.on("saveSumArea", function (params) {
        self.state.bDisplaySumField = true;
        self.getTotalFields(self.state.billnum, true);
      });
      if (self.state.billnum) {
        self.getTotalFields(self.state.billnum);
      }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    // let self = this;
    // const { sumAreaState, sumAreaRedux } = this.props;
    // let refreshNum = _.get(nextProps.sumAreaState, "refreshNum");
    // if (refreshNum && refreshNum == this.state.billnum) {
    //   self.state.bDisplaySumField = true;
    //   this.getTotalFields(this.state.billnum, true);
    //   sumAreaRedux.SetRefreshNum("");
    // }
    // return true;
    // }

  }, {
    key: 'getTotalFields',
    value: function getTotalFields(billnum, bReGet) {
      var self = this;
      if ((bReGet || _lodash2.default.isEmpty(self.state.totalFields)) && !!billnum && self.state.bDisplaySumField) {
        var totalFields = {};
        var param = { billnum: billnum, isOnlySelected: true };
        var callback = function callback(json) {
          if (json.code === 200) {
            if (json.data) {
              var items = json.data.items;
              items.forEach(function (ele) {
                var caption = ele.showCaption ? ele.showCaption : ele.caption;
                if (ele.selected) {
                  var totalField = { caption: caption, value: 0 };
                  totalFields[ele.fieldname] = totalField;
                }
              });
              if (_lodash2.default.isEmpty(totalFields)) {
                self.setState({ bDisplaySumField: false });
                return;
              }
              self.state.totalFields = totalFields;
              self.getSum();
            };
          } else {
            eChartCommon.LogChartInfo("TotalContainer getTotalFields Err  errMsg   ", json.message + " 查询参数 = " + JSON.stringify(param), 999);
          }
        };
        this.actionsProxy('report/getTotalSetting', 'GET', param, callback);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.billnum !== "" && this.state.billnum != nextProps.billnum) {
        this.state.billnum = nextProps.billnum;
        this.getTotalFields(nextProps.billnum);
      }
    }
  }, {
    key: 'getSum',
    value: function getSum() {

      var self = this;
      if (_lodash2.default.isEmpty(self.state.billnum)) return;
      if (_lodash2.default.isEmpty(self.state.condition)) return;
      if (_lodash2.default.isEmpty(self.state.totalFields)) return;

      if (!self.state.firstQueryDone) {
        self.setSum({});
        return;
      }
      var queryParams = {
        billnum: self.state.billnum,
        isOnlyTotal: true,
        condition: self.state.condition
      };

      var callback = function callback(json) {
        if (json.code === 200) {
          var data = json.data.sumRecordList;
          if (data == null || data.length == 1 && data[0] == null) data = [{}];
          var fields = _lodash2.default.get(json.data, "viewmodel.entities[0].fields");
          self.setSum(data, fields);
        } else {
          self.setSum({});
        }
      };

      this.actionsProxy('/report/list', 'POST', queryParams, callback);
    }
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
    value: function setSum(sumData, fields) {
      var self = this;
      if (_lodash2.default.isEmpty(sumData)) sumData = [{}];
      if (!sumData.length) sumData = [{}];
      var controls = [];
      _lodash2.default.forEach(self.state.totalFields, function (item, key) {
        var value = sumData[0][key] || 0;
        value = self.formatData(key, value, fields);
        controls.push({ caption: item.caption, value: value });
      });
      self.setState({ controls: controls });
    }
  }, {
    key: 'render',
    value: function render() {
      var controls = this.state.controls;

      var self = this;
      if (!controls.length || self.state.bDisplaySumField == false) {
        //如果不存在新的汇总区域设置，则使用旧的
        return _react2.default.createElement(_TotalContainerOld2.default, { meta: self.props.meta, viewModel: self.props.viewModel });
      }
      var itemClassName = 'rpt-zhekou-' + (controls.length === 1 ? 'padding' : 'center');
      var children = [];
      var width = 100 / controls.length;
      controls.forEach(function (item) {
        children.push(_react2.default.createElement(
          'div',
          { className: 'rpt-zhekou-list', style: { float: 'left', width: width + '%' } },
          _react2.default.createElement(
            'div',
            { className: 'zhekou-name' },
            _react2.default.createElement(
              'h3',
              { className: itemClassName },
              item.caption
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'zhekou-number' },
            _react2.default.createElement(
              'h4',
              { className: itemClassName },
              item.value
            )
          )
        ));
      });
      return _react2.default.createElement(
        _basic.Row,
        { className: 'rpt-zhekou' },
        children
      );
    }
  }, {
    key: 'actionsProxy',
    value: function actionsProxy(url, method, params, callback) {
      var config = { url: url, method: method, params: params };
      (0, _util.proxy)(config).then(function (json) {
        callback(json);
      });
    }
  }]);

  return TotalContainer;
}(_react.Component);

exports.default = TotalContainer;