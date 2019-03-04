'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _formatDate = require('../../../helpers/formatDate');

var _row = require('../../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;
var RadioGroup = _antd.Radio.Group;
var ConvenientQuery = null;

var eChartPanelSetDateTime = function (_React$Component) {
  _inherits(eChartPanelSetDateTime, _React$Component);

  function eChartPanelSetDateTime(props) {
    _classCallCheck(this, eChartPanelSetDateTime);

    var _this = _possibleConstructorReturn(this, (eChartPanelSetDateTime.__proto__ || Object.getPrototypeOf(eChartPanelSetDateTime)).call(this, props));

    _initialiseProps.call(_this);

    var self = _this;
    var config = self.props.colEle.componentConfig.dateTimeConfig || {};
    self.state = {
      bShow_Date: config.hasOwnProperty("fontFamily") ? config.bShow_Date : true,
      bShow_HourMinute: config.hasOwnProperty("fontFamily") ? config.bShow_HourMinute : true,
      bShow_Second: config.hasOwnProperty("fontFamily") ? config.bShow_Second : true,
      bShow_Week: config.hasOwnProperty("fontFamily") ? config.bShow_Week : true,
      dateSplit: config.hasOwnProperty("fontFamily") ? config.dateSplit : "-", //默认或者为空年月日  空格  .   -
      timeSplit: config.hasOwnProperty("fontFamily") ? config.timeSplit : ":",
      fontSize: config.hasOwnProperty("fontFamily") ? config.fontSize : 20,
      fontFamily: config.hasOwnProperty("fontFamily") ? config.fontFamily : "STKaiti"
    };

    return _this;
  }

  _createClass(eChartPanelSetDateTime, [{
    key: 'render',
    value: function render() {
      var self = this;
      var content = self.getCardContent();

      return _react2.default.createElement(
        _antd.Modal,
        {
          className: 'eChartPanelSetDateTime_SetChart eChartPanelSetDateTime_SetDateTime',
          title: '\u6DFB\u52A0\u65E5\u671F\u65F6\u95F4',
          onOk: function onOk(e) {
            return self.doFunc(true);
          },
          onCancel: function onCancel(e) {
            return self.doFunc(false);
          },
          visible: true
        },
        content
      );
    }
  }, {
    key: 'getCardContent',
    value: function getCardContent() {
      var _this2 = this;

      var self = this;
      var content = _react2.default.createElement(
        'div',
        { className: 'hz' },
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            null,
            '\u663E\u793A\u65E5\u671F'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              RadioGroup,
              { onChange: function onChange(e) {
                  return _this2.setState({ "bShow_Date": e.target.value });
                }, value: self.state.bShow_Date },
              _react2.default.createElement(
                _antd.Radio,
                { value: true },
                '\u662F'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: false },
                '\u5426'
              )
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            null,
            '\u663E\u793A\u65F6\u5206'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              RadioGroup,
              { onChange: function onChange(e) {
                  return _this2.setState({ "bShow_HourMinute": e.target.value });
                }, value: self.state.bShow_HourMinute },
              _react2.default.createElement(
                _antd.Radio,
                { value: true },
                '\u662F'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: false },
                '\u5426'
              )
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            null,
            '\u663E\u793A\u79D2'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              RadioGroup,
              {
                onChange: function onChange(e) {
                  return _this2.setState({ "bShow_Second": e.target.value });
                },
                value: self.state.bShow_Second,
                disabled: !self.state.bShow_HourMinute },
              _react2.default.createElement(
                _antd.Radio,
                { value: true },
                '\u662F'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: false },
                '\u5426'
              )
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            null,
            '\u663E\u793A\u5468'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              RadioGroup,
              { onChange: function onChange(e) {
                  return _this2.setState({ "bShow_Week": e.target.value });
                }, value: self.state.bShow_Week },
              _react2.default.createElement(
                _antd.Radio,
                { value: true },
                '\u662F'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: false },
                '\u5426'
              )
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl' },
          _react2.default.createElement(
            _col2.default,
            null,
            '\u65E5\u671F\u5206\u9694\u7B26'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              'div',
              { className: 'eChartPanelSetDateTime_dateSplit' },
              _react2.default.createElement(
                _col2.default,
                {
                  className: self.state.dateSplit == "-" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected",
                  onClick: function onClick() {
                    return self.setState({ "dateSplit": "-" });
                  }
                },
                '-'
              ),
              _react2.default.createElement(
                _col2.default,
                { style: { lineHeight: '20px' },
                  className: self.state.dateSplit == "·" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected",
                  onClick: function onClick() {
                    return self.setState({ "dateSplit": "·" });
                  }
                },
                '.'
              ),
              _react2.default.createElement(
                _col2.default,
                {
                  className: self.state.dateSplit == "/" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected",
                  onClick: function onClick() {
                    return self.setState({ "dateSplit": "/" });
                  }
                },
                '/'
              ),
              _react2.default.createElement(
                _col2.default,
                {
                  className: self.state.dateSplit == "年月日" ? "eChartPanelSetDateTime_selected" : "eChartPanelSetDateTime_unselected",
                  onClick: function onClick() {
                    return self.setState({ "dateSplit": "年月日" });
                  }
                },
                '\u5E74\u6708\u65E5'
              )
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl', style: { display: 'none' } },
          _react2.default.createElement(
            _col2.default,
            null,
            '\u65F6\u95F4\u5206\u9694\u7B26'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.timeSplit, onChange: function onChange(e) {
                return _this2.setState({ "timeSplit": e.target.value });
              } })
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl' },
          _react2.default.createElement(
            _col2.default,
            null,
            '\u5B57\u4F53\u5927\u5C0F'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.fontSize, onChange: function onChange(e) {
                return _this2.setState({ "fontSize": e.target.value });
              } })
          )
        )
      );
      return content;
    }
  }, {
    key: 'displayStyleChange',
    value: function displayStyleChange(value) {
      this.setState({ subType: value });
    }
  }, {
    key: 'setEditFieldName',
    value: function setEditFieldName(e, fieldName) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ "editFieldName": fieldName });
    }
  }, {
    key: 'setShowCaption',
    value: function setShowCaption(key, value) {
      var sumFields = this.state.sumFields;
      var ele = _.find(sumFields, function (ele) {
        return ele.key == key;
      });
      if (value) ele.showCaption = value;else ele.showCaption = ele.caption;

      this.setState({ sumFields: sumFields });
    }
  }, {
    key: 'checkInteger',
    value: function checkInteger(fieldValue, bCanZero, bCanSmallThanZero, bCanNumPoint) {

      if (fieldValue.toString().trim() == "") {
        return false;
      } else if (isNaN(fieldValue) == true) {
        return false;
      } else if (bCanZero == false && Number(fieldValue) == 0) {
        return false;
      } else if (bCanSmallThanZero == false && Number(fieldValue) < 0) {
        return false;
      } else if (bCanNumPoint == false && fieldValue.toString().indexOf(".") >= 0) {
        return false;
      }
      return true;
    }
  }, {
    key: 'doFunc',
    value: function doFunc(bOK) {

      if (bOK) {
        var info = {};
        info.chartKey = eChartCommon.getNewChartKey();
        info.bShow_Date = this.state.bShow_Date;
        info.bShow_HourMinute = this.state.bShow_HourMinute;
        info.bShow_Second = this.state.bShow_Second;
        info.bShow_Week = this.state.bShow_Week;
        info.dateSplit = this.state.dateSplit;
        info.timeSplit = this.state.timeSplit;
        info.fontFamily = this.state.fontFamily;

        if (this.checkInteger(this.state.fontSize, false, false, false) == false) {
          cb.utils.alert('字体大小设置不正确', 'error');
        } else if (info.bShow_Date == false && info.bShow_HourMinute == false && info.bShow_Week == false) {
          cb.utils.alert('请设置显示内容', 'error');
        } else {
          info.fontSize = Number(this.state.fontSize);
          this.props.doFunc(bOK, info);
        }
      } else {
        this.props.doFunc(bOK);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }]);

  return eChartPanelSetDateTime;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChecked = function (checked, key) {
    var self = _this3;

    var sumFields = self.state.sumFields;
    var ele = _.find(sumFields, function (o) {
      return o.key == key;
    });
    if (checked) {
      var tmpOrder = 1;
      _.forEach(sumFields, function (eleTmp) {
        if (eleTmp.iOrder > tmpOrder && eleTmp.iOrder != 9999) tmpOrder = eleTmp.iOrder;
      });
      ele.bSelected = true;
      ele.iOrder = tmpOrder;
    } else {
      ele.bSelected = false;
      ele.iOrder = 9999;
    }
    self.setState({ sumFields: sumFields });
  };
};

exports.default = eChartPanelSetDateTime;