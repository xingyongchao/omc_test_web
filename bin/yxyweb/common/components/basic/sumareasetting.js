'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _eChartCommon = require('../echart/eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../echart/eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Row from './row';
// import Col from './col';


var RadioGroup = _antd.Radio.Group;

var SumAreaSetting = function (_React$Component) {
  _inherits(SumAreaSetting, _React$Component);

  function SumAreaSetting(props) {
    _classCallCheck(this, SumAreaSetting);

    var _this = _possibleConstructorReturn(this, (SumAreaSetting.__proto__ || Object.getPrototypeOf(SumAreaSetting)).call(this, props));

    _this.ShowList = function () {

      var self = _this;
      var bShowList = !self.state.bShowList;
      if (bShowList == true) {
        self.setState({ bShowList: bShowList, sumConfig: {}, showCardFieldName: "", bOnlyShowSelected: true });
        self.getConfig();
      } else {
        // self.setState({ bShowList, showCardFieldName: "", bOnlyShowSelected: true });
      }
    };

    _this.handleOk = function () {
      var self = _this;
      var sumConfig = self.state.sumConfig;
      var params = {};
      params.billnum = self.state.billnum;
      params.id = sumConfig.id;
      params.name = sumConfig.name;
      params.items = _.filter(sumConfig.items, function (o) {
        return o.selected == 1;
      });
      params.items.forEach(function (ele) {
        if (!ele.value) ele.value = "sum";
      });
      params.isOnlyTotal = true;
      var callback = function callback(json) {
        if (json.code === 200) {
          self.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
          self.props.viewModel.execute('saveSumArea');
        }
        if (json.code !== 200) {
          console.log("保存汇总区设置失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString());
          // self.setState({ bShowList: false });
        }
      };
      eChartProxy.doProxy(eChartProxy.url.saveTotalSchema, 'POST', params, callback);
    };

    _this.handleCancel = function () {
      _this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
    };

    var viewModel = props.viewModel;

    var _viewModel$getParams = viewModel.getParams(),
        billNo = _viewModel$getParams.billNo;

    _this.state = {
      billnum: billNo,
      bShowList: false,
      showCardFieldName: "",
      showCardEle: {},
      bOnlyShowSelected: true,
      inMouseField: "",
      sumConfig: {}
    };
    return _this;
  }

  _createClass(SumAreaSetting, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var type = self.state.bShowList ? "up" : "down";
      var listContent2 = this.getListContent();
      var className = this.props.className;
      var conditionPop = _react2.default.createElement(
        'div',
        { style: { float: 'left' }, className: className },
        _react2.default.createElement(
          _antd.Popover,
          {
            placement: 'bottom',
            overlayClassName: 'sumareasetting_list'
            // overlayStyle={{ width: "600px" }}
            , content: listContent2,
            trigger: "click",
            visible: self.state.bShowList && _.isEmpty(listContent2) == false,
            onVisibleChange: function onVisibleChange(visible) {
              return self.onVisibleChange(visible, self);
            }
          },
          _react2.default.createElement(
            _antd.Button,
            { onClick: function onClick() {
                return self.ShowList();
              }, type: type },
            _react2.default.createElement(_SvgIcon2.default, { type: 'huizongshezhi', className: "icon-huizongshezhi" }),
            _react2.default.createElement(
              'span',
              null,
              self.props.name ? self.props.name : "汇总设置"
            )
          )
        )
      );
      return conditionPop;
    }
  }, {
    key: 'onVisibleChange',
    value: function onVisibleChange(visible, self) {

      if (visible == false && self.state.showCardFieldName == "") {
        self.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
      }
    }
  }, {
    key: 'sortClick',
    value: function sortClick(type, fieldname) {
      var sumConfig = this.state.sumConfig;
      var curIndex = _.findIndex(sumConfig.items, function (o) {
        return o.fieldname == fieldname;
      });
      var index2 = -1;
      if (type == "up") {
        index2 = _.findLastIndex(sumConfig.items, function (o, index) {
          return o.selected == 1 && index < curIndex;
        });
      } else {
        index2 = _.findIndex(sumConfig.items, function (o, index) {
          return o.selected == 1 && index > curIndex;
        });
      }
      if (index2 >= 0 && index2 < sumConfig.items.length) {
        var tmp = sumConfig.items[curIndex];
        sumConfig.items[curIndex] = sumConfig.items[index2];
        sumConfig.items[index2] = tmp;
      }
      this.setState({ sumConfig: sumConfig });
    }
  }, {
    key: 'ShowCard',
    value: function ShowCard(ele) {
      var showCardEle = _.cloneDeep(ele);
      this.setState({ showCardEle: showCardEle, showCardFieldName: ele.fieldname });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(bFlag, fieldname, index) {
      if (bFlag) {
        this.setState({ inMouseField: fieldname });
      } else {
        this.setState({ inMouseField: "" });
      }
    }
  }, {
    key: 'onChecked',
    value: function onChecked(e, element, index) {
      var checked = e.target.checked;
      var sumConfig = this.state.sumConfig;
      if (checked && _.filter(sumConfig.items, function (o) {
        return o.selected == 1;
      }).length >= 8) {
        cb.utils.alert("最多选择8个汇总项。");
        this.setState({});
      } else {
        sumConfig.items[index].selected = checked ? 1 : 0;
        this.setState({ sumConfig: sumConfig });
      }
    }
  }, {
    key: 'setShowCaption',
    value: function setShowCaption(value) {
      // let sumConfig = this.state.sumConfig;
      // let items = sumConfig.items;
      // let tmp = _.find(items, function (o) { return o.fieldname == fieldname });
      // if (tmp)
      //   tmp.showCaption = value;
      // this.setState({ sumConfig });
      var self = this;
      var showCardEle = self.state.showCardEle;
      showCardEle.showCaption = value;
      this.setState({ showCardEle: showCardEle });
    }
  }, {
    key: 'handleRadioChange',
    value: function handleRadioChange(value) {
      var self = this;
      var showCardEle = self.state.showCardEle;
      showCardEle.value = value;
      this.setState({ showCardEle: showCardEle });
    }
  }, {
    key: 'handleCardOk',
    value: function handleCardOk() {
      var self = this;
      var showCardEle = self.state.showCardEle;
      var sumConfig = this.state.sumConfig;
      var tmp = _.find(sumConfig.items, function (o) {
        return o.fieldname == self.state.showCardFieldName;
      });
      tmp.value = showCardEle.value;
      tmp.showCaption = showCardEle.showCaption;
      this.setState({ sumConfig: sumConfig, showCardFieldName: "" });
    }
  }, {
    key: 'handleCardCancel',
    value: function handleCardCancel() {
      this.setState({ showCardFieldName: "" });
    }
  }, {
    key: 'getCardContent',
    value: function getCardContent() {
      var _this2 = this;

      var self = this;
      var cardContent = void 0;
      var ele = self.state.showCardEle;
      // let items = self.state.sumConfig.items
      // let ele = _.find(items, function (o) { return o.fieldname == self.state.showCardFieldName });
      if (ele) {
        cardContent = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'sumareasetting_disname' },
            _react2.default.createElement(
              'span',
              null,
              '\u663E\u793A\u540D\u79F0:'
            ),
            _react2.default.createElement(_antd.Input, {
              placeholder: '\u663E\u793A\u540D\u79F0',
              value: ele.showCaption ? ele.showCaption : "",
              onChange: function onChange(e) {
                return self.setShowCaption(e.target.value);
              }
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              RadioGroup,
              {
                onChange: function onChange(e) {
                  return self.handleRadioChange(e.target.value);
                },
                value: ele.value ? ele.value : "sum" },
              _react2.default.createElement(
                _antd.Radio,
                { value: "sum" },
                '\u6C47\u603B'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: "count" },
                '\u8BA1\u6570'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: "avg" },
                '\u5E73\u5747'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: "min" },
                '\u6700\u5C0F'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: "max" },
                '\u6700\u5927'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { value: "count_distinct" },
                '\u53BB\u91CD\u8BA1\u6570'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'footer-btn' },
            _react2.default.createElement(
              _antd.Button,
              { type: "primary", onClick: function onClick() {
                  return _this2.handleCardOk();
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: "default", onClick: function onClick() {
                  return _this2.handleCardCancel();
                } },
              '\u53D6\u6D88'
            )
          )
        );
      }

      return cardContent;
    }
  }, {
    key: 'onCardVisibleChange',
    value: function onCardVisibleChange(visible, self) {

      if (visible == false) {
        self.setState({ showCardFieldName: "" });
      }
    }
  }, {
    key: 'getListContent',
    value: function getListContent() {
      var _this3 = this;

      var self = this;
      if (_.isEmpty(self.state.sumConfig)) {
        //|| self.state.bShowList == false
        return null;
      } else {
        var listContent = [];
        var listContentInner = [];
        var bOnlyShowSelected = self.state.bOnlyShowSelected ? true : false;
        listContent.push(_react2.default.createElement(
          'div',
          { className: 'sumarea_list_caption' },
          _react2.default.createElement(
            'span',
            { className: 'sumareaset-left' },
            '\u6C47\u603B\u8BBE\u7F6E'
          ),
          _react2.default.createElement(
            _antd.Checkbox,
            {
              title: "只显示已选",
              checked: bOnlyShowSelected,
              onChange: function onChange(e) {
                self.setState({ bOnlyShowSelected: !bOnlyShowSelected });
              } },
            "只显示已选"
          )
        ));
        var cardContent = void 0; //= this.getCardContent()
        var items = self.state.sumConfig.items;
        var methordObj = { "sum": "汇总", "count": "计数", "avg": "平均", "min": "最小", "max": "最大", "count_distinct": "去重计数" };
        items.forEach(function (ele, index) {
          var item = void 0;
          var selected = ele.selected == 1 ? 1 : 0;
          cardContent = null;
          if (self.state.showCardEle.fieldname == ele.fieldname) {
            cardContent = self.getCardContent();
          }
          var showCurrent = self.state.showCardFieldName == ele.fieldname ? true : false;
          if (selected || bOnlyShowSelected == false) {
            var bShowUpDown = selected && ele.fieldname == self.state.inMouseField ? true : false;
            var updown = bShowUpDown ? _react2.default.createElement(
              'span',
              { className: 'sumarea_list_updown' },
              _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-up', onClick: function onClick() {
                  return self.sortClick('up', ele.fieldname);
                } }),
              _react2.default.createElement(_antd.Button, { style: { borderWidth: 0 }, icon: 'arrow-down', onClick: function onClick() {
                  return self.sortClick('down', ele.fieldname);
                } })
            ) : _react2.default.createElement('span', null);
            item = _react2.default.createElement(
              'div',
              { className: 'sumarea_list_item',
                onMouseEnter: function onMouseEnter(e) {
                  return self.onMouseEnter(true, ele.fieldname, index);
                },
                onMouseLeave: function onMouseLeave(e) {
                  return self.onMouseEnter(false, ele.fieldname, index);
                } },
              _react2.default.createElement(
                'div',
                { className: 'sumarea_list_item_1' },
                _react2.default.createElement(
                  _antd.Checkbox,
                  { title: ele.caption, checked: selected == 1 ? true : false, onChange: function onChange(e) {
                      return self.onChecked(e, ele, index);
                    } },
                  ele.caption
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'sumarea_showcaption_all' },
                  ele.showCaption ? _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'sumarea_showcaption_1' },
                      '('
                    ),
                    ' ',
                    _react2.default.createElement(
                      'span',
                      { className: 'sumarea_showcaption_2' },
                      ' ',
                      ele.showCaption
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'sumarea_showcaption_3' },
                      ')'
                    ),
                    ' '
                  ) : ""
                )
              ),
              _react2.default.createElement(
                _antd.Popover,
                {
                  placement: 'bottom',
                  overlayClassName: 'sumareasetting_card'
                  // overlayStyle={{ width: "600px" }}
                  , content: cardContent,
                  trigger: "click",
                  visible: showCurrent,
                  onVisibleChange: function onVisibleChange(visible) {
                    return self.onCardVisibleChange(visible, self);
                  }
                },
                _react2.default.createElement(
                  'div',
                  { className: 'summary_select_all' },
                  _react2.default.createElement(
                    _antd.Button,
                    {
                      className: "sumarea_list_itemarrow_" + (showCurrent ? "1" : "0"),
                      disabled: !selected,
                      onClick: function onClick() {
                        return self.ShowCard(ele);
                      }
                    },
                    methordObj[ele.value ? ele.value : "sum"]
                  ),
                  _react2.default.createElement(_antd.Icon, {
                    type: showCurrent ? "up" : "down"
                  })
                )
              ),
              updown
            );

            listContentInner.push(item);
          }
        }, this);
        listContent.push(_react2.default.createElement(
          'div',
          { className: 'sumarea_list_items' },
          listContentInner
        ));
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            listContent
          ),
          _react2.default.createElement(
            'div',
            { className: 'footer-btn' },
            _react2.default.createElement(
              _antd.Button,
              { type: "primary", onClick: function onClick() {
                  return _this3.handleOk();
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: "default", onClick: function onClick() {
                  return _this3.handleCancel();
                } },
              '\u53D6\u6D88'
            ),
            _react2.default.createElement(
              'div',
              { className: 'sumarea_list_8' },
              _react2.default.createElement(
                'span',
                { className: 'sumarea_list_8_1' },
                '\u6700\u591A\u9009\u62E9'
              ),
              _react2.default.createElement(
                'span',
                { className: 'sumarea_list_8_2' },
                '8'
              ),
              _react2.default.createElement(
                'span',
                { className: 'sumarea_list_8_3' },
                '\u4E2A\u6C47\u603B\u9879'
              )
            )
          )
        );
      }
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {

      var self = this;
      var param = { billnum: self.state.billnum, isOnlyTotal: true };
      var callback = function callback(json) {
        if (json.code === 200) {
          if (json.data) {
            eChartCommon.LogChartInfo("设置汇总区  eChartConfig", json.data.chartConfig, 7);
            self.setState({ sumConfig: json.data });
            return;
          }
        }
        eChartCommon.LogChartInfo("设置汇总区_配置信息读取失败或者交叉表不支持 查询参数 =" + JSON.stringify(param) + "  json.message", json.message, 999);
      };
      eChartProxy.doProxy(eChartProxy.url.getTotalSetting, 'GET', param, callback);
    }
  }]);

  return SumAreaSetting;
}(_react2.default.Component);

exports.default = SumAreaSetting;