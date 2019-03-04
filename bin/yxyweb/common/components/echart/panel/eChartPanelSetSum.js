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

var eChartPanelSetSum = function (_React$Component) {
  _inherits(eChartPanelSetSum, _React$Component);

  function eChartPanelSetSum(props) {
    _classCallCheck(this, eChartPanelSetSum);

    var _this = _possibleConstructorReturn(this, (eChartPanelSetSum.__proto__ || Object.getPrototypeOf(eChartPanelSetSum)).call(this, props));

    _this.onChecked = function (checked, key) {
      var self = _this;
      var sumFields = _.cloneDeep(self.state.sumFields);
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

    _this.handleBodyClick = function (e) {
      if (_this.state.editFieldName != "" && e.target.id != _this.state.editFieldName) _this.setState({ editFieldName: "" });
    };

    eChartCommon.LogChartInfo("eChartPanelSetSum constructor ", "", 900);
    ConvenientQuery = require('../../filter').default;
    _this.bVisible = !!props.bVisible;
    _this.state = { panelType: props.panelType || 1 };
    if (_this.bVisible) {
      _this.colEle = props.colEle;
      _this.initState(true, props.colEle.sumConfig, props.panelType);
      _this.initModelForFilter();
    }
    return _this;
  }

  _createClass(eChartPanelSetSum, [{
    key: 'initState',
    value: function initState(bFirst, sumConfig, panelType) {
      var self = this;
      sumConfig = sumConfig || {};
      self.state = {
        reportArray: _.isEmpty(self.state.reportArray) ? [] : self.state.reportArray,
        subType: sumConfig.subType || "sum", //"sum" "count"
        bUseQianSplit: sumConfig.hasOwnProperty("bUseQianSplit") ? sumConfig.bUseQianSplit : true,
        title: sumConfig.title,
        chartKey: sumConfig.chartKey,
        billnum: sumConfig.billnum,
        billName: sumConfig.billName,
        filterId: sumConfig.filterId,
        solutionId: sumConfig.solutionId,
        condition: sumConfig.condition,
        // sumFieldsArray: [],
        sumFields: sumConfig.sumFields || [],
        fontSize: sumConfig.fontSize || 12,
        fontFamily: 'STKaiti', // STSong = 华文宋体 // LiSu = 隶书 // YouYuan = 幼圆 // STXihei = 华文细黑 // STKaiti = 华文楷体 // STZhongsong = 华文中宋 // STFangsong = 华文仿宋 // FZShuTi = 方正舒体 // FZYaoti = 方正姚体 // STCaiyun = 华文彩云 // STHupo = 华文琥珀 // STLiti = 华文隶书 // STXingkai = 华文行楷 // STXinwei = 华文新魏
        valueFontSize: sumConfig.valueFontSize || 24,
        refreshInterval: sumConfig.hasOwnProperty("refreshInterval") ? sumConfig.refreshInterval : panelType == 3 ? 0 : 3600,
        editFieldName: "",
        panelType: self.state.panelType || panelType || 1
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var bFlag = void 0;
      if (this.state.panelType == 3) {
        if (_.isEqual(nextState, this.state) == false) {
          bFlag = true;
        } else {
          bFlag = false;
        }
      } else {
        bFlag = true;
      }
      eChartCommon.LogChartInfo("eChartPanelSetSum shouldComponentUpdate return ", bFlag, 900);
      return bFlag;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      eChartCommon.LogChartInfo("eChartPanelSetSum componentWillReceiveProps ", "", 900);
      if (this.state.panelType == 3) {
        var preVisible = this.bVisible;
        this.bVisible = !!nextProps.bVisible;
        if (preVisible == true && this.bVisible == false) {
          this.forceUpdate();
        } else if (this.bVisible && (_.isEmpty(this.props.colEle) || _.isEqual(nextProps.colEle.sumConfig, this.props.colEle.sumConfig) == false)) {
          this.colEle = nextProps.colEle;
          this.initState(false, nextProps.colEle.sumConfig, nextProps.panelType);
          this.initModelForFilter();
          if (this.state.billnum) {
            this.getSumFieldsArray(this.state.billnum);
          } else {
            this.forceUpdate();
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      eChartCommon.LogChartInfo("eChartPanelSetSum render ", "", 900);
      var self = this;
      if (!self.bVisible) {
        return _react2.default.createElement('div', { className: 'eChartPanelDesign_SetSum3_NoData' });
      }
      var content = self.getCardContent();
      if (this.state.panelType == 3) {
        return _react2.default.createElement(
          'div',
          {
            className: 'eChartPanelDesign_SetSum3',
            key: "setSumKey_" + self.colEle.colKey
          },
          content,
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelSplit_bottom3' },
            _react2.default.createElement(
              _antd.Button,
              { type: "primary", onClick: function onClick() {
                  return self.doFunc(true);
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: "default", onClick: function onClick() {
                  return self.doFunc(false);
                } },
              '\u53D6\u6D88'
            )
          )
        );
      } else {
        return _react2.default.createElement(
          _antd.Modal,
          {
            className: 'eChartPanelDesign_SetSum',
            title: '\u6DFB\u52A0\u6C47\u603B',
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
    }
  }, {
    key: 'getCardContent',
    value: function getCardContent() {
      var _this2 = this;

      var self = this;
      var options1 = self.getReportListContent();
      var options2 = self.getSumContent();
      var filter = undefined;
      if (self.state.filterId) {
        filter = _react2.default.createElement(
          'div',
          {
            key: self.state.filterId,
            className: "eChartPanelDesign" + self.state.panelType == 3 ? "_3" : "",
            style: { display: '' }
          },
          _react2.default.createElement(ConvenientQuery, {
            model: self.model,
            cols: self.state.panelType == 3 ? 1 : 2
          })
        );
      }
      var content = _react2.default.createElement(
        'div',
        { className: 'hz' },
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_1' },
            '\u6C47\u603B'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              _antd.Select,
              {
                value: self.state.billnum,
                onSelect: function onSelect(billnum) {
                  return self.setReportInfo(billnum);
                }
              },
              options1
            )
          )
        ),
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less eChartPanelSetSum_2_Outer', style: { display: self.state.billnum ? "" : "none" } },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_2' },
            '\u6570\u636E\u9879'
          ),
          options2 && options2.length > 0 ? _react2.default.createElement(
            _col2.default,
            { className: 'ckeck' },
            _react2.default.createElement(
              'div',
              null,
              options2
            )
          ) : _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              'div',
              { style: { color: "#ccc" } },
              '\u62A5\u8868\u6CA1\u6709\u8BBE\u7F6E\u6C47\u603B\u5B57\u6BB5\uFF0C\u8BF7\u68C0\u67E5\u3002'
            )
          ),
          ' '
        ),
        self.state.panelType == 1 ? _react2.default.createElement(
          _row2.default,
          { className: 'width-less' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_3' },
            '\u663E\u793A\u6837\u5F0F'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              RadioGroup,
              {
                onChange: function onChange(e) {
                  return self.displayStyleChange(e.target.value);
                },
                value: self.state.subType ? self.state.subType : "sum"
              },
              _react2.default.createElement(
                _antd.Radio,
                { value: "sum" },
                '\u666E\u901A\u6C47\u603B\u663E\u793A'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: "count" },
                '\u6EDA\u52A8\u8BA1\u6570\u663E\u793A'
              )
            )
          )
        ) : null,
        _react2.default.createElement(
          _row2.default,
          { className: 'width-less', style: { display: self.state.subType == "count" ? "" : "none" } },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_4' },
            '\u663E\u793A\u5343\u5206\u4F4D'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(
              RadioGroup,
              {
                onChange: function onChange(e) {
                  return _this2.setState({ "bUseQianSplit": e.target.value });
                },
                value: self.state.bUseQianSplit
              },
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
        self.state.panelType != 3 ? _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_5' },
            '\u6570\u503C\u5B57\u4F53\u5927\u5C0F'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.valueFontSize, onChange: function onChange(e) {
                return _this2.setState({ "valueFontSize": e.target.value });
              } })
          )
        ) : null,
        self.state.panelType != 3 ? _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_6' },
            '\u6807\u9898\u5B57\u4F53\u5927\u5C0F'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.fontSize, onChange: function onChange(e) {
                return _this2.setState({ "fontSize": e.target.value });
              } })
          )
        ) : null,
        self.state.panelType != 3 ? _react2.default.createElement(
          _row2.default,
          { className: 'width-less-pl' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_7' },
            '\u5237\u65B0\u9891\u7387'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            _react2.default.createElement(_antd.Input, { defaultValue: self.state.refreshInterval, onChange: function onChange(e) {
                return self.setState({ "refreshInterval": e.target.value });
              } })
          ),
          _react2.default.createElement(
            _col2.default,
            { className: 'tips' },
            ' \u79D2',
            _react2.default.createElement(
              'span',
              null,
              '(\u63D0\u793A:\u5237\u65B0\u592A\u9891\u7E41\u4F1A\u9020\u6210\u670D\u52A1\u5668\u538B\u529B\u8FC7\u5927)'
            )
          )
        ) : null,
        _react2.default.createElement(
          _row2.default,
          { className: 'gltj' },
          _react2.default.createElement(
            _col2.default,
            { className: 'eChartPanelSetSum_8' },
            '\u8FC7\u6EE4\u6761\u4EF6'
          ),
          _react2.default.createElement(
            _col2.default,
            null,
            filter
          )
        )
      );
      return content;
    }
  }, {
    key: 'initModelForFilter',
    value: function initModelForFilter() {
      var self = this;
      this.model = new cb.models.SimpleModel({});
      this.model.getParams = function () {
        var tmp = {
          filterId: self.state.filterId,
          condition: self.state.condition,
          isInDesign: true,
          solutionId: self.state.solutionId,
          bHasNullDate: true,
          panelType: self.state.panelType
        };
        return tmp;
      };
      this.model.on('filterClick', function (args) {
        eChartCommon.LogChartInfo("监控视图汇总设置 触发事件 filterClick", JSON.stringify(args.condition), 7);
        self.state.condition = args.condition;
      });
      this.model.setName("监控视图汇总设置");
    }
  }, {
    key: 'getSumContent',
    value: function getSumContent() {
      var self = this;
      var arr = [];
      if (self.state.sumFields) self.state.sumFields.forEach(function (ele) {
        arr.push(_react2.default.createElement(
          'div',
          { className: 'eChartPanelSetSum-Field' },
          _react2.default.createElement(
            _antd.Checkbox,
            {
              checked: ele.bSelected,
              key: "sumCBK_" + ele.key,
              onChange: function onChange(e) {
                return self.onChecked(e.target.checked, ele.key);
              } },
            _react2.default.createElement(_antd.Input, { id: ele.key, defaultValue: ele.showCaption, onChange: function onChange(e) {
                return self.setShowCaption(ele.key, e.target.value);
              },
              readOnly: self.state.editFieldName != ele.key,
              className: self.state.editFieldName == ele.key ? "eChartPanelSetSum_CanEdit" : "eChartPanelSetSum_CanNotEdit"
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelSetSum-FieldEdit', onClick: function onClick(e) {
                return self.setEditFieldName(e, ele.key);
              } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'edit' })
          )
        ));
      });
      return arr;
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
    key: 'getReportListContent',
    value: function getReportListContent() {
      var arrArr = this.state.reportArray;
      arrArr.sort(function (a, b) {
        return a.name.length - b.name.length;
      });
      var arr = [];
      var billNumArr = [];
      arrArr.forEach(function (ele) {
        if (billNumArr.indexOf(ele.billnum) < 0) {
          billNumArr.push(ele.billnum);
          arr.push(_react2.default.createElement(
            Option,
            { value: ele.billnum },
            ele.name
          ));
        }
      });
      return arr;
    }
  }, {
    key: 'setReportInfo',
    value: function setReportInfo(billnum) {
      var self = this;
      var ele = _.find(self.state.reportArray, function (o) {
        return o.billnum == billnum;
      });
      if (ele) {
        var state = {};
        state.billnum = billnum;
        state.billName = ele.name;
        state.filterId = ele.filterId;
        state.solutionId = ele.solutionId;
        state.condition = undefined;
        self.setState(state);
        self.getSumFieldsArray(billnum);
      }
    }
  }, {
    key: 'getReportList',
    value: function getReportList() {
      var self = this;
      var param = {};
      var callback = function callback(json) {
        if (json.code === 200 && json.data) {
          self.setState({ reportArray: json.data });
        }
      };
      eChartProxy.doProxy(eChartProxy.url.getReportList, 'GET', param, callback);
    }
  }, {
    key: 'getSumFieldsArray',
    value: function getSumFieldsArray(billnum) {
      var self = this;
      if (billnum) {
        var param = { billnum: billnum, isOnlySelected: true };
        var callback = function callback(json) {
          if (json.code === 200 && json.data) {
            var sumFieldsArray = json.data.items || [];
            var title = json.data.name;
            var sumFields = self.state.sumFields;
            _.remove(sumFields, function (o) {
              var tmp = _.filter(sumFieldsArray, function (o2) {
                return o.key == o2.fieldname;
              });
              return tmp.length < 1 ? true : false;
            });
            _.forEach(sumFieldsArray, function (ele) {
              var tmp = _.find(sumFields, function (ele2) {
                return ele2.key == ele.fieldname;
              });
              if (tmp) {
                tmp.caption = ele.caption;
              } else {
                sumFields.push({ key: ele.fieldname, caption: ele.caption, showCaption: ele.caption, bSelected: false, iOrder: 9999, postfix: "" });
              }
            });
            self.setState({ sumFields: sumFields, title: title });
          } else {
            self.setState({ sumFields: [] });
          }
        };
        eChartProxy.doProxy(eChartProxy.url.getTotalSetting, 'GET', param, callback);
      } else {
        self.setState();
      }
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
      this.model.execute('eChartPanel_GetCondition');
      if (bOK) {
        var info = {};
        info.subType = this.state.subType;
        info.bUseQianSplit = this.state.bUseQianSplit;
        info.chartKey = this.state.chartKey || eChartCommon.getNewChartKey();
        info.title = this.state.title;
        info.billnum = this.state.billnum || "";
        info.billName = this.state.billName || "";
        info.filterId = this.state.filterId || "";
        info.solutionId = this.state.solutionId || "";
        info.condition = this.state.condition;
        info.refreshInterval = this.state.refreshInterval;
        info.sumFields = this.state.sumFields;
        info.sumFields.forEach(function (ele, index) {
          if (ele.bSelected) ele.iOrder = index + 1;else ele.iOrder = 9999;
        });
        info.fontSize = this.state.fontSize;
        info.valueFontSize = this.state.valueFontSize;

        info.fontFamily = this.state.fontFamily;
        var selNum = _.filter(info.sumFields, function (ele) {
          return ele.bSelected == true;
        }).length;
        if (info.refreshInterval == "") {
          info.refreshInterval = 0;
        }
        if (info.billnum == "") {
          cb.utils.alert('请设置报表', 'error');
        } else if (info.filterId == "") {
          cb.utils.alert('请设置filterId', 'error');
        } else if (info.solutionId == "") {
          cb.utils.alert('请设置solutionId', 'error');
        } else if (_.isEmpty(info.condition)) {
          cb.utils.alert('请设置condition', 'error');
        } else if (_.isEmpty(info.sumFields) || selNum < 1) {
          cb.utils.alert('请设置汇总字段', 'error');
        } else if (info.subType == "count" && selNum > 1) {
          cb.utils.alert('滚动计数显示方式只能显示一个字段', 'error');
        } else if (this.checkInteger(info.fontSize, false, false, false) == false) {
          cb.utils.alert('标题字体大小设置不正确', 'error');
        } else if (this.checkInteger(info.valueFontSize, false, false, false) == false) {
          cb.utils.alert('数值字体大小设置不正确', 'error');
        } else if (this.checkInteger(info.refreshInterval, true, false, false) == false) {
          cb.utils.alert('刷新频率设置不正确', 'error');
        } else {
          this.props.doFunc(bOK, info);
        }
      } else {
        this.props.doFunc(bOK);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getReportList();
      if (this.state.billnum) {
        this.getSumFieldsArray(this.state.billnum);
      }
      document.body.addEventListener('click', this.handleBodyClick);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }]);

  return eChartPanelSetSum;
}(_react2.default.Component);

exports.default = eChartPanelSetSum;