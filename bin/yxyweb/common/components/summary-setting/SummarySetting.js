'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _util = require('../../helpers/util');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = _antd.Radio.Group;
var RadioButton = _antd.Radio.Button;

var SummarySetting = function (_Component) {
  _inherits(SummarySetting, _Component);

  function SummarySetting(props) {
    _classCallCheck(this, SummarySetting);

    var _this = _possibleConstructorReturn(this, (SummarySetting.__proto__ || Object.getPrototypeOf(SummarySetting)).call(this, props));

    _this.handleRadioChange = function (value) {
      var showCardEle = _this.state.showCardEle;

      var popData = _this.state.popData;
      showCardEle.cSumType = value;
      var tmp = _.find(popData, function (o) {
        return o.cFieldName == _this.state.showCardFieldName;
      });
      tmp.cSumType = showCardEle.cSumType;
      tmp.cShowCaption = showCardEle.cShowCaption;
      _this.setState({ popData: popData, showCardFieldName: "" });
    };

    _this.getCardContent = function () {
      var radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      };
      var cardContent = void 0;
      var cardContentInner = [];
      var ele = _this.state.showCardEle;
      _this.enumArr.forEach(function (ele, index) {
        cardContentInner.push(_react2.default.createElement(
          _antd.Radio,
          { style: radioStyle, value: ele.key },
          ele.value
        ));
      });
      if (ele) {
        cardContent = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              RadioGroup,
              { value: ele.cSumType ? ele.cSumType : "sum", onChange: function onChange(e) {
                  return _this.handleRadioChange(e.target.value);
                } },
              cardContentInner
            )
          )
        );
        return cardContent;
      }
    };

    _this.getListContent = function () {
      if (_.isEmpty(_this.state.popData)) {
        return null;
      } else {
        var listContent = [];
        var listContentInner = [];
        var bOnlyShowSelected = _this.state.bOnlyShowSelected ? true : false;
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
                _this.setState({ bOnlyShowSelected: !bOnlyShowSelected });
              } },
            "只显示已选"
          )
        ));
        var cardContent = void 0;
        var summaryItems = _this.state.popData;
        summaryItems.forEach(function (ele, index) {
          var _this2 = this;

          var item = void 0;
          var selected = ele.selected == 1 ? 1 : 0;
          cardContent = null;
          if (this.state.showCardEle.cFieldName == ele.cFieldName) {
            cardContent = this.getCardContent();
          }
          var showCurrent = this.state.showCardFieldName == ele.cFieldName ? true : false;
          if (selected || bOnlyShowSelected == false) {
            item = _react2.default.createElement(
              'div',
              { className: 'sumarea_list_item' },
              _react2.default.createElement(
                'div',
                { className: 'sumarea_list_item_1' },
                _react2.default.createElement(
                  _antd.Checkbox,
                  { title: ele.cShowCaption, checked: selected == 1 ? true : false, onChange: function onChange(e) {
                      return _this2.onChecked(e, ele, index);
                    } },
                  ele.cShowCaption ? ele.cShowCaption : ele.cCaption
                )
              ),
              _react2.default.createElement(
                _antd.Popover,
                {
                  placement: 'bottom',
                  overlayClassName: 'sumareasetting_card',
                  content: cardContent,
                  trigger: "click",
                  visible: showCurrent,
                  onVisibleChange: function onVisibleChange(visible) {
                    return _this2.onCardVisibleChange(visible);
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
                        return _this2.showCard(ele);
                      }
                    },
                    this.cEnumString[ele.cSumType ? ele.cSumType : "sum"]
                  ),
                  _react2.default.createElement(_antd.Icon, {
                    type: showCurrent ? "up" : "down"
                  })
                )
              )
            );
            listContentInner.push(item);
          }
        }, _this);
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
                  return _this.handleOk();
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: "default", onClick: function onClick() {
                  return _this.handleCancel();
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
                '5'
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
    };

    _this.handleCancel = function () {
      _this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
    };

    _this.onVisibleChange = function (visible) {
      if (visible == false && _this.state.showCardFieldName == "") {
        _this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
      }
    };

    _this.showList = function () {
      var bShowList = !_this.state.bShowList;

      var _this$props$viewModel = _this.props.viewModel.getParams(),
          billNo = _this$props$viewModel.billNo,
          tplid = _this$props$viewModel.tplid;

      var childrenField = _this.props.meta.childrenField;

      var groupCode = _this.props.viewModel.get(childrenField).getCache('groupCode');
      if (bShowList == true) {
        _this.setState({ bShowList: bShowList, popData: [], showCardFieldName: "", bOnlyShowSelected: true });
        _this.getPopData(billNo, tplid, groupCode);
      }
    };

    _this.handleOk = function () {
      var _this$props$viewModel2 = _this.props.viewModel.getParams(),
          billNo = _this$props$viewModel2.billNo;

      var childrenField = _this.props.meta.childrenField;

      var popData = _this.state.popData;
      var selectList = _.filter(popData, function (o) {
        return o.selected == 1;
      });
      var params = { "billno": billNo, "childrenField": childrenField, "items": [] };
      selectList.forEach(function (ele) {
        if (!ele.cSumType) {
          ele.cSumType = "sum";
        }
        params["items"].push({ iBillId: ele.iBillId, iBillEntityid: ele.iBillEntityId, cSumType: ele.cSumType, cShowCaption: ele.cShowCaption, cName: ele.cName, cCaption: ele.cCaption });
      });
      _this.onSave(params);
    };

    _this.handleSwitch = function () {
      var mode = _this.state.mode;

      var switchMode = mode == "明细" ? "汇总" : "明细";
      _this.setState({ mode: switchMode });
      var bool = void 0;
      bool = switchMode == "明细" ? false : true;
      _this.props.viewModel.biz.do('refresh', _this.props.viewModel, { isSum: bool });
    };

    _this.enumArr = [];
    _this.cEnumString = {};
    _this.getEnum();
    _this.state = {
      mode: "明细",
      showCardFieldName: "",
      bOnlyShowSelected: true,
      bShowList: false,
      showCardEle: {},
      popData: []
    };
    return _this;
  }

  _createClass(SummarySetting, [{
    key: 'getEnum',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var config, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  url: 'enum/getEnumStrFetch',
                  method: 'GET',
                  params: {
                    enumtype: 'pb_sumType'
                  }
                };
                _context.next = 3;
                return (0, _util.proxy)(config);

              case 3:
                json = _context.sent;

                if (!(json.code !== 200)) {
                  _context.next = 7;
                  break;
                }

                cb.utils.alert('获取枚举失败' + json.message, 'error');
                return _context.abrupt('return');

              case 7:
                this.enumArr = JSON.parse(json.data);
                this.enumArr && this.enumArr.map(function (item) {
                  _this3.cEnumString[item.key] = item.value;
                });

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getEnum() {
        return _ref.apply(this, arguments);
      }

      return getEnum;
    }()
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'getPopData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(billNo, tplid, groupCode) {
        var config, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                config = {
                  url: 'billmeta/getSummarySet',
                  method: 'GET',
                  params: {
                    billno: billNo,
                    tplid: tplid,
                    groupcode: groupCode
                  }
                };
                _context2.next = 3;
                return (0, _util.proxy)(config);

              case 3:
                json = _context2.sent;

                if (!(json.code !== 200)) {
                  _context2.next = 7;
                  break;
                }

                cb.utils.alert('获取数据失败！' + json.message, 'error');
                return _context2.abrupt('return');

              case 7:
                this.setState({ popData: json.data });

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPopData(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return getPopData;
    }()
  }, {
    key: 'onCardVisibleChange',
    value: function onCardVisibleChange(visible) {
      if (visible == false) {
        this.setState({ showCardFieldName: "" });
      }
    }
  }, {
    key: 'onChecked',
    value: function onChecked(e, element, index) {
      var checked = e.target.checked;
      var popData = this.state.popData;
      if (checked && _.filter(popData, function (o) {
        return o.selected == 1;
      }).length >= 5) {
        cb.utils.alert("最多选择5个汇总项。");
        this.setState({});
      } else {
        popData[index].selected = checked ? 1 : 0;
        this.setState({ popData: popData });
      }
    }
  }, {
    key: 'showCard',
    value: function showCard(ele) {
      var showCardEle = _.cloneDeep(ele);
      this.setState({ showCardEle: showCardEle, showCardFieldName: ele.cFieldName });
    }
  }, {
    key: 'onSave',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
        var config, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                config = {
                  url: 'billmeta/updateSummarySet',
                  method: 'POST',
                  params: params
                };
                _context3.next = 3;
                return (0, _util.proxy)(config);

              case 3:
                json = _context3.sent;

                if (json.code === 200) {
                  cb.utils.alert('设置成功！', 'success');
                  this.setState({ bShowList: false, showCardFieldName: "", bOnlyShowSelected: true });
                }
                if (json.code !== 200) {
                  cb.utils.alert("保存汇总区设置失败。信息 : " + (json.message ? json.message : JSON.stringify(json)).toString(), 'error');
                  // this.setState({ bShowList: false });
                }

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onSave(_x4) {
        return _ref3.apply(this, arguments);
      }

      return onSave;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var type = this.state.bShowList ? "up" : "down";
      var listContent2 = this.getListContent();
      var className = "m-l-10";
      var IconType = this.state.mode == "明细" ? 'mingxi' : 'huizong1';
      return _react2.default.createElement(
        'div',
        { style: { float: 'left' }, className: className },
        _react2.default.createElement(
          _antd.Button,
          { className: 'switch_button', onClick: this.handleSwitch },
          _react2.default.createElement(_SvgIcon2.default, { type: IconType }),
          this.state.mode
        ),
        _react2.default.createElement(
          _antd.Popover,
          {
            placement: 'bottomRight',
            overlayClassName: 'sumareasetting_list summarysetting',
            content: listContent2,
            trigger: "click",
            visible: this.state.bShowList && _.isEmpty(listContent2) == false,
            onVisibleChange: function onVisibleChange(visible) {
              return _this4.onVisibleChange(visible);
            }
          },
          _react2.default.createElement(
            _antd.Button,
            { onClick: function onClick() {
                return _this4.showList();
              }, type: type, className: 'm-l-10' },
            _react2.default.createElement(
              'span',
              null,
              '\u6C47\u603B\u8BBE\u7F6E'
            )
          )
        )
      );
    }
  }]);

  return SummarySetting;
}(_react.Component);

exports.default = SummarySetting;