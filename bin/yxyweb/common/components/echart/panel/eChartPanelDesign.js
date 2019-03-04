'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _row8 = require('../../basic/row');

var _row9 = _interopRequireDefault(_row8);

var _col = require('../../basic/col');

var _col2 = _interopRequireDefault(_col);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _eChartProxy = require('../eChartProxy');

var eChartProxy = _interopRequireWildcard(_eChartProxy);

var _formatDate = require('../../../helpers/formatDate');

var _eChartPanelSplit = require('./eChartPanelSplit');

var _eChartPanelSplit2 = _interopRequireDefault(_eChartPanelSplit);

var _eChartPanelSetImageText = require('./eChartPanelSetImageText');

var _eChartPanelSetImageText2 = _interopRequireDefault(_eChartPanelSetImageText);

var _eChartPanelSetChart = require('./eChartPanelSetChart');

var _eChartPanelSetChart2 = _interopRequireDefault(_eChartPanelSetChart);

var _eChartPanelSetSum = require('./eChartPanelSetSum');

var _eChartPanelSetSum2 = _interopRequireDefault(_eChartPanelSetSum);

var _eChartPanelSetDateTime = require('./eChartPanelSetDateTime');

var _eChartPanelSetDateTime2 = _interopRequireDefault(_eChartPanelSetDateTime);

var _eChartPanelDisplay = require('./eChartPanelDisplay2');

var _eChartPanelDisplay2 = _interopRequireDefault(_eChartPanelDisplay);

var _eChartPanelDisplay3_Design = require('./eChartPanelDisplay3_Design');

var _eChartPanelDisplay3_Design2 = _interopRequireDefault(_eChartPanelDisplay3_Design);

var _eChartDemoData = require('../eChartDemoData');

var eChartDemoData = _interopRequireWildcard(_eChartDemoData);

var _portal = require('../../../redux/portal');

var portalactions = _interopRequireWildcard(_portal);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _fileUpload = require('../../file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eChartPanelDesign = function (_React$Component) {
  _inherits(eChartPanelDesign, _React$Component);

  function eChartPanelDesign(props) {
    _classCallCheck(this, eChartPanelDesign);

    var _this = _possibleConstructorReturn(this, (eChartPanelDesign.__proto__ || Object.getPrototypeOf(eChartPanelDesign)).call(this, props));

    _this.setEditPanel = function (e, template) {
      var self = _this;
      e.preventDefault();
      e.stopPropagation();
      cb.utils.confirm('重新选择模板将覆盖当前的模板信息，是否继续?', function () {
        var template2 = _.cloneDeep(template);
        template2.id = self.state.editPanel ? self.state.editPanel.id : -1;
        if (self.state.panelType == 3) {
          if (self.state.editPanel.name != self.state.editPanel.nameTmp) {
            template2.name = self.state.editPanel.name;
          }
        } else {
          template2.name = self.state.editPanel.name;
        }
        var curState = { editPanel: template2 };
        curState.selectedColKey = "";
        curState.curOperateType = "";
        self.stateCache = [];
        self.setState(curState);
      });
    };

    eChartCommon.LogChartInfo("eChartPanelDesign constructor ", "", 900);
    var params = props.data.params; //editType: "add", id: -1, name: "", type: 1
    _this.parentViewModel = props.data.parentViewModel;
    _this.stateCache = [];
    var panelType = params.type ? params.type : 1;
    var leftPanelIndex = 1;
    if (panelType == 2 || panelType == 3) leftPanelIndex = 3;
    _this.state = {
      panelType: panelType,
      editType: params.editType,
      curOperateType: "",
      // "" 主界面 // "selectTemplate" 选择模板 //"splitCol" 拆分行列 // "selectColType" 设置内容类型 //"setImageText" 标题 //"setChart" 图表 //"setSum" 汇总区
      leftPanelIndex: leftPanelIndex,
      selectedColKey: "",
      templateList: [],
      editPanel: {},
      backStyleArr: eChartCommon.getBackStyleArr(),
      focusedKey: "",
      hideSettingPanel: -1
    };
    _this.skinConfig = "";
    return _this;
  }

  _createClass(eChartPanelDesign, [{
    key: 'pushState',
    value: function pushState() {
      var tmp = _.cloneDeep(this.state);
      this.stateCache.push(tmp);
    }
  }, {
    key: 'popState',
    value: function popState() {
      var self = this;
      if (self.stateCache.length > 0) {
        cb.utils.confirm('当前操作将撤销上次所做的拆分操作，是否继续?', function () {
          var state = self.stateCache.pop();
          state.curOperateType = "";
          self.setState(state);
        });
      } else {
        cb.utils.alert("已经回退到最初拆分前的状态。");
      }
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
      eChartCommon.LogChartInfo("eChartPanelDesign shouldComponentUpdate return ", bFlag, 900);
      return bFlag;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      eChartCommon.LogChartInfo("eChartPanelDesign componentWillReceiveProps", "", 900);
      if (!nextProps.callback || nextProps.callback === this.props.callback) return;
      cb.utils.confirm('\u786E\u5B9A\u8981' + nextProps.caption + '\u4E48', function () {
        nextProps.callback();
      });
    }
  }, {
    key: 'setCurrentSkin',
    value: function setCurrentSkin() {
      var skinKey = this.state.editPanel.skinKey_BackStyle || this.state.editPanel.skinKey_BackColor;
      if (skinKey) {
        this.skinConfig = eChartCommon.getSkinArr(skinKey);
      } else {
        this.skinConfig = "";
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      this.setCurrentSkin();
      var curOperateModal = void 0;
      var settingPanel = void 0;
      var previewContent = null;
      eChartCommon.LogChartInfo("eChartPanelDesign render", "", 900);
      if (self.state.panelType == 1 || self.state.panelType == 2) {
        if (self.state.curOperateType == "setImageText") {
          curOperateModal = self.getDesignColType_Title();
        } else if (self.state.curOperateType == "setChart") {
          curOperateModal = self.getDesignColType_Chart(undefined, true);
        } else if (self.state.curOperateType == "setSum") {
          curOperateModal = self.getDesignColType_Sum(undefined, true);
        } else if (self.state.curOperateType == "setComponent_DateTime") {
          curOperateModal = self.getDesignColType_DateTime();
        }
      } else {
        settingPanel = self.getSettingPanel();
      }

      var leftPanel = self.getLeftPanel();
      var rightPanel = void 0;
      if (_.isEmpty(self.state.editPanel)) {
        var style = self.getStyle_Edit("all", "", {});
        rightPanel = _react2.default.createElement(
          'div',
          { style: style },
          '\u7F16\u8F91\u754C\u9762'
        );
      } else {
        if (self.state.panelType == 1 || self.state.panelType == 2) rightPanel = self.getEditPanel();else if (self.state.panelType == 3) rightPanel = self.getEditPanel_Mobile();
      }
      if (self.state.curOperateType == "preView") {
        previewContent = self.getPreView();
      }
      var curDisplay = self.state.curOperateType == "preView" ? "none" : "";
      var tmp = _react2.default.createElement(
        'div',
        { className: "ele_Panel_Outer ele_Panel_Outer_Type" + self.state.panelType, style: { height: "100%", width: "100%" } },
        _react2.default.createElement(
          'div',
          { className: 'ele_Panel', style: { height: "100%", width: "100%", display: curDisplay } },
          _react2.default.createElement(
            'div',
            { className: "eChartPanelDesign_LeftPanel" + (self.state.panelType == 33333 ? "3" : ""), style: { height: "100%", float: "left" } },
            leftPanel
          ),
          _react2.default.createElement(
            'div',
            { className: "eChartPanelDesign_EditPanel" + (self.state.panelType == 3 ? "3" : ""), style: { height: "100%", float: "left" } },
            rightPanel
          ),
          settingPanel
        ),
        _react2.default.createElement(
          'div',
          { style: { width: "100%", height: "100%", backgroundColor: eChartCommon.panelDefaultValue.panel2AllBackgroundColor, display: !!previewContent ? "" : "none" } },
          previewContent
        ),
        curOperateModal
      );
      return tmp;
    }
  }, {
    key: 'getPanelSaveItems',
    value: function getPanelSaveItems(rows) {
      var self = this;
      var itemArr = [];
      rows.forEach(function (rowEle) {
        rowEle.cols.forEach(function (colEle) {
          var item = {};
          if (colEle.widgetType == "rows") {
            var subItemArr = self.getPanelSaveItems(colEle.widgetValue);
            itemArr = _.concat(itemArr, subItemArr);
          } else if (colEle.widgetType == "chart") {
            item.billnum = colEle.panelChartConfig.billnum;
            item.groupSchemaId = colEle.panelChartConfig.groupSchemaId;
            item.itemKey = colEle.panelChartConfig.chartKey;
            item.condition = JSON.stringify(colEle.panelChartConfig.condition);
            colEle.panelChartConfig.condition = undefined;
            itemArr.push(item);
          } else if (colEle.widgetType == "sum") {
            item.billnum = colEle.sumConfig.billnum;
            item.groupSchemaId = colEle.sumConfig.groupSchemaId;
            item.itemKey = colEle.sumConfig.chartKey;
            item.condition = JSON.stringify(colEle.sumConfig.condition);
            colEle.sumConfig.condition = undefined;
            itemArr.push(item);
          }
        });
      });
      return itemArr;
    }
  }, {
    key: 'savePanel',
    value: function savePanel(bOK, bSaveOther) {
      var self = this;
      if (bOK) {
        var editPanel = _.cloneDeep(self.state.editPanel);
        if (!editPanel.name) {
          cb.utils.alert("名称不可为空。");
          return;
        }
        editPanel.name = eChartCommon.checkTempName(editPanel.name);
        eChartCommon.LogChartInfo("大屏方案 Save editPanel ", JSON.stringify(editPanel), 900);
        var panelLayOutConfig = editPanel.panelLayOutConfig;
        var params = {};
        if (bSaveOther) {
          self.state.editType = "add";
        }
        params.type = self.state.panelType;
        if (self.state.editType == "edit") {
          params.id = editPanel.id;
        }
        params.name = editPanel.name;
        var items = self.getPanelSaveItems(panelLayOutConfig.rows);
        if (items.length > 0) params.items = items;else params.items = [{}];
        params.pageLayout = JSON.stringify(editPanel);
        eChartCommon.LogChartInfo("大屏方案 Save params ", JSON.stringify(params), 7);
        var callback = function callback(json) {
          if (json.code === 200) {
            cb.utils.alert(self.state.panelType == 1 ? "大屏看板已保存。" : "桌面看板已保存。");
            if (self.state.editType == "add") {
              var _editPanel = _.cloneDeep(self.state.editPanel);
              _editPanel.id = json.data;
              self.setState({ editPanel: _editPanel, editType: "edit" });
            }
          } else {
            eChartCommon.LogChartInfo("大屏方案保存失败。err ", json.message, 999);
          }
        };
        eChartProxy.doProxy(eChartProxy.url.saveReportView, 'POST', params, callback);
      } else {
        self.cancelOpereate();
      }
    }
  }, {
    key: 'getLeftPanel',
    value: function getLeftPanel() {
      var _this2 = this;

      var self = this;
      var leftPanelIndex = self.state.leftPanelIndex;
      var editPanel = self.state.editPanel || {};
      var content = [];
      content.push(_react2.default.createElement(
        _row9.default,
        { className: 'tab' },
        self.state.panelType == 1 ? _react2.default.createElement(
          _antd.Button,
          { type: leftPanelIndex == 1 ? "primary" : "default", onClick: function onClick() {
              return self.setState({ leftPanelIndex: 1 });
            } },
          '\u6837\u5F0F'
        ) : _react2.default.createElement(
          _antd.Button,
          { type: leftPanelIndex == 3 ? "primary" : "default", onClick: function onClick() {
              return self.setState({ leftPanelIndex: 3 });
            } },
          '\u6837\u5F0F'
        ),
        _react2.default.createElement(
          _antd.Button,
          { type: leftPanelIndex == 2 ? "primary" : "default", onClick: function onClick() {
              return self.setState({ leftPanelIndex: 2 });
            } },
          '\u90E8\u4EF6'
        )
      ));

      if (leftPanelIndex == 1) {
        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'title' },
          '\u5E03\u5C40'
        ));
        var templateContent = self.getTemplates();
        if (templateContent) content.push(templateContent);

        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'title' },
          '\u663E\u793A\u6BD4\u4F8B'
        ));
        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'proportion' },
          _react2.default.createElement(
            _antd.Button,
            { type: editPanel.panelWidthScale == 16 && editPanel.panelHeightScale == 9 ? "primary" : "default", onClick: function onClick() {
                return self.setPanelConfigValueArr([{ name: "panelWidthScale", value: 16 }, { name: "panelHeightScale", value: 9 }]);
              } },
            '16:9',
            _react2.default.createElement(
              'i',
              null,
              ' (\u63A8\u8350)'
            )
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: editPanel.panelWidthScale == 4 && editPanel.panelHeightScale == 3 ? "primary" : "default", onClick: function onClick() {
                return self.setPanelConfigValueArr([{ name: "panelWidthScale", value: 4 }, { name: "panelHeightScale", value: 3 }]);
              } },
            '4:3'
          )
        ));
        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'wide-high' },
          _react2.default.createElement(
            _col2.default,
            { className: 'little-title' },
            '\u5BBD\u5EA6/\u9AD8\u5EA6'
          ),
          _react2.default.createElement(
            _col2.default,
            { className: 'nums' },
            _react2.default.createElement(_antd.Input, {
              value: editPanel.panelWidthScale,
              onChange: function onChange(e) {
                return self.setPanelConfigValue("panelWidthScale", e.target.value);
              }
            })
          ),
          _react2.default.createElement(
            _col2.default,
            { className: 'bi' },
            ':'
          ),
          _react2.default.createElement(
            _col2.default,
            { className: 'nums' },
            _react2.default.createElement(_antd.Input, {
              value: editPanel.panelHeightScale,
              onChange: function onChange(e) {
                return self.setPanelConfigValue("panelHeightScale", e.target.value);
              }
            })
          )
        ));

        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'title' },
          '\u80CC\u666F\u8272'
        ));
        // let colorArr = ["#dbd4d3", "green", "blue", "yellow"];
        var colorArr = eChartCommon.getBackColorArr();
        var tmpContent = [];
        colorArr.forEach(function (ele, index) {
          return tmpContent.push(_react2.default.createElement(
            _antd.Button,
            {
              className: "backgroundcolor" + index + " " + (editPanel.backgroundColor == ele.color ? "backgroundcolorselected" : ""),
              style: { backgroundColor: ele.color },
              onClick: function onClick() {
                return self.setBackGroundColor(ele);
              },
              onMouseEnter: function onMouseEnter() {
                return _this2.onMouseEnter(ele.color);
              },
              onMouseLeave: function onMouseLeave() {
                return _this2.onMouseLeave();
              }
            },
            editPanel.backgroundColor == ele.color || self.state.focusedKey == ele.color ? _react2.default.createElement(_antd.Icon, { type: 'xuanzhong1-copy' }) : ""
          ));
        });
        tmpContent.push(_react2.default.createElement(
          'div',
          { onClick: function onClick() {
              return self.setBackGroundColor("");
            } },
          _react2.default.createElement(_SvgIcon2.default, { type: 'qingchubeijingse' })
        ));
        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'background-color' },
          tmpContent
        ));

        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'bg-style' },
          _react2.default.createElement(
            'span',
            null,
            '\u80CC\u666F\u98CE\u683C'
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
              _antd.Button,
              { onClick: function onClick() {
                  return self.setBackStyle();
                } },
              '\u6E05\u9664'
            )
          )
        ));

        tmpContent = [];
        self.state.backStyleArr.forEach(function (ele) {
          var isSelected = editPanel.backStyleKey && editPanel.backStyleKey == ele.backStyleKey;
          var isFocused = self.state.focusedKey == ele.backStyleKey ? true : false;
          var className = "eChartPanelDesign_" + ele.backStyleKey;
          className = className + " " + (isSelected ? "eChartPanelDesign_BackStyle_Selected" : "eChartPanelDesign_BackStyle_UnSelected");
          tmpContent.push(_react2.default.createElement(
            _col2.default,
            {
              onClick: function onClick() {
                return self.setBackStyle(ele);
              },
              onMouseEnter: function onMouseEnter() {
                return _this2.onMouseEnter(ele.backStyleKey);
              },
              onMouseLeave: function onMouseLeave() {
                return _this2.onMouseLeave();
              }
            },
            _react2.default.createElement(
              'div',
              { className: className },
              _react2.default.createElement('img', { src: ele.icon }),
              isSelected || isFocused ? _react2.default.createElement(_SvgIcon2.default, { type: 'xuanzhong1-copy' }) : ""
            ),
            _react2.default.createElement(
              'div',
              null,
              ele.name
            )
          ));
        });
        content.push(_react2.default.createElement(
          _row9.default,
          { colCount: 12, className: 'bg-style-list' },
          tmpContent
        ));
      } else if (leftPanelIndex == 2) {
        if (self.state.panelType == 1) {
          content.push(_react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return self.setColType("setImageText");
              }, className: 'chart-img clearfix' },
            _react2.default.createElement(_SvgIcon2.default, { type: 'tuwen' }),
            _react2.default.createElement(
              'div',
              null,
              '\u56FE\u6587'
            ),
            _react2.default.createElement(
              'div',
              { className: 'icon-jia' },
              _react2.default.createElement(_antd.Icon, { type: 'jia' })
            )
          ));
        }
        content.push(_react2.default.createElement(
          'div',
          { onClick: function onClick() {
              return self.setColType("setChart");
            }, className: 'chart-img clearfix' },
          _react2.default.createElement(_SvgIcon2.default, { type: 'tubiao' }),
          _react2.default.createElement(
            'div',
            null,
            '\u56FE\u8868'
          ),
          _react2.default.createElement(
            'div',
            { className: 'icon-jia' },
            _react2.default.createElement(_antd.Icon, { type: 'jia' })
          )
        ));
        content.push(_react2.default.createElement(
          'div',
          { onClick: function onClick() {
              return self.setColType("setSum");
            }, className: 'chart-img clearfix' },
          _react2.default.createElement(_SvgIcon2.default, { type: 'huizong' }),
          _react2.default.createElement(
            'div',
            null,
            '\u6C47\u603B'
          ),
          _react2.default.createElement(
            'div',
            { className: 'icon-jia' },
            _react2.default.createElement(_antd.Icon, { type: 'jia' })
          )
        ));
        if (self.state.panelType == 2) {
          content.push(_react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return self.setComponent(eChartCommon.components.commonFunc);
              }, className: 'chart-img clearfix' },
            _react2.default.createElement(_SvgIcon2.default, { type: 'tianqi' }),
            _react2.default.createElement(
              'div',
              null,
              '\u5E38\u7528\u529F\u80FD'
            ),
            _react2.default.createElement(
              'div',
              { className: 'icon-jia' },
              _react2.default.createElement(_antd.Icon, { type: 'jia' })
            )
          ));
        }
        if (self.state.panelType == 1) {
          content.push(_react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return self.setComponent(eChartCommon.components.weather);
              }, className: 'chart-img clearfix' },
            _react2.default.createElement(_SvgIcon2.default, { type: 'tianqi' }),
            _react2.default.createElement(
              'div',
              null,
              '\u5929\u6C14'
            ),
            _react2.default.createElement(
              'div',
              { className: 'icon-jia' },
              _react2.default.createElement(_antd.Icon, { type: 'jia' })
            )
          ));

          content.push(_react2.default.createElement(
            'div',
            { onClick: function onClick() {
                return self.setComponent(eChartCommon.components.datetime);
              }, className: 'chart-img clearfix' },
            _react2.default.createElement(_SvgIcon2.default, { type: 'riqishijian' }),
            _react2.default.createElement(
              'div',
              null,
              '\u65E5\u671F\u65F6\u95F4'
            ),
            _react2.default.createElement(
              'div',
              { className: 'icon-jia' },
              _react2.default.createElement(_antd.Icon, { type: 'jia' })
            )
          ));
        }
      } else if (leftPanelIndex == 3) {
        if (self.state.panelType == 2) {
          content.push(_react2.default.createElement(
            _row9.default,
            { className: 'title' },
            '\u5E03\u5C40'
          ));
          var _templateContent = self.getTemplates();
          if (_templateContent) {
            content.push(_templateContent);
          }
        }
        content.push(_react2.default.createElement(
          _row9.default,
          { className: 'title' },
          '\u57FA\u7840\u884C\u64CD\u4F5C'
        ));
        content.push(_react2.default.createElement(
          _row9.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelDesign_RowOperate', onClick: function onClick() {
                return self.handleTemplate2Row(1);
              } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'dingbucharuhang' }),
            _react2.default.createElement(
              'div',
              null,
              '\u9876\u90E8\u63D2\u5165\u884C'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelDesign_RowOperate', onClick: function onClick() {
                return self.handleTemplate2Row(3);
              } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'dibucharuhang' }),
            _react2.default.createElement(
              'div',
              null,
              '\u5E95\u90E8\u63D2\u5165\u884C'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelDesign_RowOperate', onClick: function onClick() {
                return self.handleTemplate2Row(2);
              } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'ciqiancharuhang' }),
            _react2.default.createElement(
              'div',
              null,
              '\u6B64\u524D\u63D2\u5165\u884C'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelDesign_RowOperate', onClick: function onClick() {
                return self.handleTemplate2Row(4);
              } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'shangyidangqianhang' }),
            _react2.default.createElement(
              'div',
              null,
              '\u4E0A\u79FB\u5F53\u524D\u884C'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelDesign_RowOperate', onClick: function onClick() {
                return self.handleTemplate2Row(5);
              } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'xiayidangqianhang' }),
            _react2.default.createElement(
              'div',
              null,
              '\u4E0B\u79FB\u5F53\u524D\u884C'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelDesign_RowOperate', onClick: function onClick() {
                return self.handleTemplate2Row(0);
              } },
            _react2.default.createElement(_SvgIcon2.default, { type: 'shanchudangqianhang' }),
            _react2.default.createElement(
              'div',
              null,
              '\u5220\u9664\u5F53\u524D\u884C'
            )
          )
        ));
      }
      return content;
    }
  }, {
    key: 'handleTemplate2Row',
    value: function handleTemplate2Row(type) {
      var self = this;
      var editPanel = _.cloneDeep(self.state.editPanel);
      var rows = editPanel.panelLayOutConfig.rows;
      var selectedColKey = void 0;
      var selectedBaseRows = void 0;
      var selectedBaseIndex = 0;

      selectedColKey = self.state.selectedColKey;
      if (type == 0 || type == 2 || type == 4 || type == 5 || type == 6) {
        if (!selectedColKey) {
          cb.utils.alert('请选择行', 'error');
          return;
        }
      }
      if (selectedColKey) {
        rows.forEach(function (rowEle) {
          var cols = rowEle.cols;
          cols.forEach(function (colEle) {
            if ((colEle.bBaseCol == true || colEle.bBaseRows == true) && colEle.widgetType == "rows") {
              var innerRows = colEle.widgetValue;
              innerRows.forEach(function (innerRowEle, innerIndex) {
                var colsInfo = self.getColParentInfo([innerRowEle], selectedColKey);
                if (_.isEmpty(colsInfo) == false) {
                  selectedBaseIndex = innerIndex;
                  selectedBaseRows = innerRows;
                }
              });
            }
          });
        });
      }
      if (type == 0 && selectedBaseRows.length <= 1) {
        cb.utils.alert('至少保留一行。', 'error');
        return;
      }
      if ((type == 1 || type == 3) && !selectedBaseRows) //没有选择当前行而且选择插入顶部底部，则自动选择第一个
        {
          rows.forEach(function (rowEle) {
            var cols = rowEle.cols;
            cols.forEach(function (colEle) {
              if ((colEle.bBaseCol == true || colEle.bBaseRows == true) && colEle.widgetType == "rows") {
                var innerRows = colEle.widgetValue;
                selectedBaseIndex = 0;
                selectedBaseRows = innerRows;
              }
            });
          });
        }
      if (!selectedBaseRows) {
        cb.utils.alert('没有查找到处理行需要的信息。', 'error');
        return;
      }

      eChartCommon.LogChartInfo("当前选择的行的Index ", selectedBaseIndex, 900);
      self.pushState();
      if (type == 0) {
        selectedBaseRows.splice(selectedBaseIndex, 1);
      } else if (type == 1) {
        var row = eChartCommon.getPanelLayOutTemplateRow2();
        selectedBaseRows.splice(0, 0, row);
      } else if (type == 2) {
        var _row = eChartCommon.getPanelLayOutTemplateRow2();
        selectedBaseRows.splice(selectedBaseIndex, 0, _row);
      } else if (type == 6) {
        var _row2 = eChartCommon.getPanelLayOutTemplateRow2();
        if (selectedBaseIndex == selectedBaseRows.length - 1) selectedBaseRows.push(_row2);else selectedBaseRows.splice(selectedBaseIndex + 1, 0, _row2);
      } else if (type == 3) {
        var _row3 = eChartCommon.getPanelLayOutTemplateRow2();
        selectedBaseRows.push(_row3);
      } else if (type == 4) {
        if (selectedBaseIndex > 0) {
          var tmp = selectedBaseRows.splice(selectedBaseIndex, 1);
          selectedBaseRows.splice(selectedBaseIndex - 1, 0, tmp[0]);
        }
      } else if (type == 5) {
        if (selectedBaseIndex < selectedBaseRows.length - 1) {
          var _tmp = selectedBaseRows.splice(selectedBaseIndex + 1, 1);
          selectedBaseRows.splice(selectedBaseIndex, 0, _tmp[0]);
        }
      }

      eChartCommon.reCalcTemplate2Height2AndRowsHeight(editPanel);
      self.setState({ editPanel: editPanel });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(focusedKey) {
      this.setState({ focusedKey: focusedKey });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.setState({ focusedKey: "" });
    }
  }, {
    key: 'setComponent',
    value: function setComponent(component) {
      var self = this;
      var colEle = self.getSelectedCol();
      if (_.isEmpty(colEle)) {
        cb.utils.alert("请选择区域。");
      } else if (colEle.widgetType == "none") {
        colEle.widgetType = component.widgetType;
        colEle.componentConfig = component.componentConfig;
        if (component.componentConfig.subType == "datetime") this.setState({ curOperateType: "setComponent_DateTime" });else this.setState({});
      } else {
        cb.utils.alert("当前区域已经有控件，请先清除。");
      }
    }
  }, {
    key: 'setColType',
    value: function setColType(operateType) {
      var self = this;
      var colEle = self.getSelectedCol();
      if (_.isEmpty(colEle)) {
        cb.utils.alert("请选择区域。");
      } else if (colEle.widgetType == "none") {
        if (!!this.state.selectedColKey) this.setState({ curOperateType: operateType, hideSettingPanel: 0 });
      } else if (self.state.panelType == 3 && self.state.hideSettingPanel != 0) {
        this.setState({ hideSettingPanel: 0 });
      } else {
        cb.utils.alert("当前区域已经有控件，请先清除。");
      }
    }
  }, {
    key: 'setBackGroundColor',
    value: function setBackGroundColor(ele) {
      var editPanel = this.state.editPanel;
      if (this.state.editPanel.backgroundColor == ele.color) {
        editPanel.backColorKey = "";
        editPanel.backgroundColor = "";
        editPanel.skinKey_BackColor = "";
      } else {
        editPanel.backColorKey = ele.backColorKey;
        editPanel.backgroundColor = ele.color;
        editPanel.skinKey_BackColor = ele.skinKey;
      }
      this.setState();
    }
  }, {
    key: 'getSettingPanel',
    value: function getSettingPanel() {

      var obj1 = void 0;
      var obj2 = void 0;
      var self = this;
      var curCol = self.getSelectedCol();
      var curOperateType = self.state.curOperateType;
      if (self.state.hideSettingPanel == 0) {
        if (curOperateType == "setChart" || curCol.widgetType == "chart") {
          obj1 = self.getDesignColType_Chart(curCol, true);
          obj2 = self.getDesignColType_Sum(undefined, false);
        } else if (curOperateType == "setSum" || curCol.widgetType == "sum") {
          obj1 = self.getDesignColType_Chart(undefined, false);
          obj2 = self.getDesignColType_Sum(curCol, true);
        }
      }
      var bHide = _.isEmpty(obj1) && _.isEmpty(obj2);
      return _react2.default.createElement(
        'div',
        {
          className: "eChartPanelDesign_SettingPanel3 eChartPanelDesign_SettingPanel_" + (bHide ? "Hide" : "Show"),
          style: { height: "100%", float: "left" }
        },
        _react2.default.createElement(
          'div',
          { className: "eChartPanelDesign_SettingPanel_Outer eChartPanelDesign_SettingPanel_" + (bHide ? "Hide2" : "Show2"),
            style: { display: self.state.hideSettingPanel == -1 ? "none" : "" }
          },
          _react2.default.createElement(
            'div',
            { className: 'eChartPanelDesign_SettingPanelTitle' },
            '\u4FE1\u606F\u8BBE\u7F6E'
          ),
          _react2.default.createElement(
            'div',
            { className: 'icon-guanbi1', onClick: function onClick() {
                return self.hideSettingPanel();
              } },
            _react2.default.createElement(_antd.Icon, { type: 'guanbi1' })
          ),
          obj1,
          obj2
        )
      );
    }
  }, {
    key: 'selectCol',
    value: function selectCol(selectedColKey, widgetType) {
      // this.state.selectedColKey = selectedColKey;
      if (this.state.selectedColKey != selectedColKey) {
        var hideSettingPanel = this.state.hideSettingPanel;
        if (hideSettingPanel == -1 && widgetType != "none") {
          hideSettingPanel = 0;
        }
        this.setState({ selectedColKey: selectedColKey, curOperateType: "", hideSettingPanel: hideSettingPanel });
      }
    }
  }, {
    key: 'getEditPanel_Mobile',
    value: function getEditPanel_Mobile() {
      var self = this;
      var panelConfig = _.cloneDeep(self.state.editPanel);
      var content = _react2.default.createElement(_eChartPanelDisplay3_Design2.default, {
        isInDesign: true,
        panelId: undefined,
        panelConfig: panelConfig,
        selectCol: function selectCol(selectedColKey, widgetType) {
          return self.selectCol(selectedColKey, widgetType);
        },
        doSplit: function doSplit(bOK, info, selectedColKey) {
          return self.doSplit(bOK, info, selectedColKey);
        },
        clearColTypeInner: function clearColTypeInner(colEle) {
          return self.clearColTypeInner(colEle);
        }
      });
      return _react2.default.createElement(
        'div',
        { style: { height: "100%", width: "100%" } },
        _react2.default.createElement(
          'div',
          { className: 'template3-name', style: { width: "100%", height: "auto" } },
          _react2.default.createElement(
            'span',
            null,
            '\u540D\u79F0:'
          ),
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_antd.Input, {
              value: self.state.editPanel.name, placeholder: '\u8BF7\u8F93\u5165',
              onChange: function onChange(e) {
                return self.setPanelConfigValue("name", e.target.value);
              }
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'template3-content_outer ' },
          _react2.default.createElement(
            'div',
            { className: 'template3-content panelLayer3-all' },
            content
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'btn-toolbar-bottom btn-group-bottom bottom-toolbar eChartPanelDesign_EditPanel_bottom' },
          _react2.default.createElement(
            _antd.Button,
            { className: 'ant-btn ant-btn-primary', onClick: function onClick() {
                return self.savePanel(true);
              } },
            '\u786E\u5B9A'
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'ant-btn', onClick: function onClick() {
                return self.cancelSplit();
              } },
            '\u64A4\u9500\u62C6\u5206'
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'ant-btn', onClick: function onClick() {
                return self.savePanel(false);
              } },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }, {
    key: 'getEditPanel',
    value: function getEditPanel() {
      var self = this;
      var editPanel = self.state.editPanel;
      var content = void 0;
      var style = self.getStyle_Edit("all", "", editPanel);
      var innerStyle = self.getInnerStyle_Edit("all", "", editPanel);

      content = self.getDisplay_Edit(editPanel.panelLayOutConfig.rows);
      return _react2.default.createElement(
        'div',
        { style: { height: "100%", width: "100%" } },
        _react2.default.createElement(
          'div',
          { className: 'template-name' },
          _react2.default.createElement(
            'span',
            { style: { float: "left" } },
            '\u540D\u79F0:'
          ),
          _react2.default.createElement(
            'span',
            { style: { float: "left" } },
            _react2.default.createElement(_antd.Input, {
              value: editPanel.name, placeholder: '\u8BF7\u8F93\u5165',
              onChange: function onChange(e) {
                return self.setPanelConfigValue("name", e.target.value);
              }
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'template-content panelLayer-all' },
          _react2.default.createElement(
            'div',
            { className: 'panelLayer-all-outer', style: style },
            _react2.default.createElement(
              'div',
              { className: 'panelLayer-all-inner', style: innerStyle },
              content
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'btn-toolbar-bottom btn-group-bottom bottom-toolbar eChartPanelDesign_EditPanel_bottom' },
          _react2.default.createElement(
            _antd.Button,
            { className: 'ant-btn ant-btn-primary', onClick: function onClick() {
                return self.savePanel(true);
              } },
            '\u786E\u5B9A'
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'ant-btn ant-btn-primary', onClick: function onClick() {
                return self.preView(true);
              } },
            '\u9884\u89C8'
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'ant-btn', onClick: function onClick() {
                return self.cancelSplit();
              } },
            '\u64A4\u9500\u62C6\u5206'
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'ant-btn', onClick: function onClick() {
                return self.savePanel(false);
              } },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }, {
    key: 'setBackStyle',
    value: function setBackStyle(ele) {
      var editPanel = this.state.editPanel;
      if (ele) {
        editPanel.backStyleKey = ele.backStyleKey;
        editPanel.skinKey_BackStyle = ele.skinKey;
        editPanel.backgroundImage = ele.backgroundImage;
      } else {
        editPanel.backStyleKey = "";
        editPanel.skinKey_BackStyle = "";
        editPanel.backgroundImage = "";
      }
      this.setState({ editPanel: editPanel });
    }
  }, {
    key: 'setPanelConfigValue',
    value: function setPanelConfigValue(name, value) {
      var editPanel = _.cloneDeep(this.state.editPanel);
      editPanel[name] = value;
      this.setState({ editPanel: editPanel });
    }
  }, {
    key: 'setPanelConfigValueArr',
    value: function setPanelConfigValueArr(arr) {
      var editPanel = _.cloneDeep(this.state.editPanel);
      arr.forEach(function (ele) {
        editPanel[ele.name] = ele.value;
      });
      this.setState({ editPanel: editPanel });
    }
  }, {
    key: 'getRemainWidth',
    value: function getRemainWidth() {
      var scale = {};
      var editPanel = this.state.editPanel;
      if (process.env.__CLIENT__ === true) {
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.body.clientHeight;
        scale.width = Number(clientWidth) - (1366 - 920);
        scale.height = Number(clientHeight) - (637 - 450);
        if (Number(scale.width) < 920) scale.width = 920;
        if (Number(scale.height) < 450) scale.height = 450;
        eChartCommon.LogChartInfo("", "clientWidth = " + clientWidth + " clientHeight = " + clientHeight + " scale = " + JSON.stringify(scale), 12);
        if (editPanel.type == "2" && editPanel.height2) {
          scale.height = scale.height * editPanel.height2;
        }
      }
      return scale;
    }
  }, {
    key: 'calcPanelWidth',
    value: function calcPanelWidth(style, maxWidth, maxHeight, postFix) {
      var editPanel = this.state.editPanel;
      var panelWidthScale = editPanel.panelWidthScale;
      var panelHeightScale = editPanel.panelHeightScale;
      if (panelWidthScale && panelHeightScale) {
        if (panelWidthScale / panelHeightScale > maxWidth / maxHeight) {
          style.width = maxWidth;
          style.height = Math.floor(maxWidth * panelHeightScale / panelWidthScale);
        } else {
          style.height = maxHeight;
          style.width = Math.floor(maxHeight * panelWidthScale / panelHeightScale);
        }
      } else {
        style.width = maxWidth;
        style.height = maxHeight;
      }
      style.width = style.width + postFix;
      style.height = style.height + postFix;
    }
  }, {
    key: 'getStyle_Edit',
    value: function getStyle_Edit(eleType, innerType, ele) {

      var style = {};
      if (eleType == "row") {
        style.width = '100%';
        style.height = ele.height;
      } else if (eleType == "col") {
        style.height = '100%';
        style.width = ele.width;
        style.float = 'left';
      } else if (eleType == "all") {
        var scale = this.getRemainWidth();
        this.calcPanelWidth(style, scale.width, scale.height, "px");
      }
      style.border = "0px";
      if (eChartDemoData.demoConfig.isShowAllMargin == true || eleType == "all" || eleType == "col" && innerType == "control" || ele.bOuterMargin) {
        if (ele.hasOwnProperty("margin")) style.padding = ele.margin;
      }
      return style;
    }
  }, {
    key: 'getInnerStyle_Edit',
    value: function getInnerStyle_Edit(eleType, innerType, ele) {

      var style = {};
      style.width = '100%';
      style.height = '100%';
      style.padding = 0;
      style.margin = 0;
      if (eChartDemoData.demoConfig.isShowAllMargin == true || eleType == "all" || eleType == "col" && innerType == "control" || ele.bOuterBorder) {

        var borderType = "";
        var borderWidth = "";
        var borderColor = "";

        if (ele.borderWidth == "0px") {
          borderType = "solid";
          borderWidth = eChartCommon.panelDefaultValue.borderWidth;
          borderColor = "transparent";
        } else {
          borderType = "dashed";
          borderWidth = ele.borderWidth ? ele.borderWidth : eChartCommon.panelDefaultValue.borderWidth;
          borderColor = eChartCommon.panelDefaultValue.borderColor;
        }

        if (eleType == "col" && innerType == "control" && (this.getSelectedColKey() == ele.colKey || this.state.focusedKey == ele.colKey)) {
          //选中状态
          borderType = "solid";
          borderWidth = eChartCommon.panelDefaultValue.borderWidth;
          borderColor = "#cccccc";
          borderColor = "#969BA4";
        }
        // borderColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        style.border = borderWidth + " " + borderType + " " + borderColor;
      } else {
        style.border = "0px";
      }

      if (ele.hasOwnProperty("backgroundColor")) style.backgroundColor = ele.backgroundColor;
      if (ele.hasOwnProperty("backgroundImage") && _.isEmpty(ele.backgroundImage) == false) {
        style.backgroundImage = 'url(' + ele.backgroundImage + ')';
      }

      if (!!style.backgroundImage) {
        style.backgroundSize = '100% 100%';
        style.backgroundRepeat = 'no-repeat';
        style.backgroundPosition = 'center';
      }
      return style;
    }
  }, {
    key: 'getDesignToolBar',
    value: function getDesignToolBar(colEle) {
      var tools = [];
      var self = this;
      var widgetType = colEle.widgetType;
      var bNeedDel = false;
      if (widgetType == "none") {
        tools.push(_react2.default.createElement(_eChartPanelSplit2.default, {
          colEle: colEle,
          doFunc: function doFunc(bOK, info) {
            return self.doSplit(bOK, info);
          },
          showContent: function showContent(bOK, colKey) {
            return self.showSplitCard(bOK, colKey);
          },
          selectedColKey: self.state.selectedColKey,
          curOperateType: self.state.curOperateType,
          skinConfig: self.skinConfig,
          panelType: self.state.panelType
        }));
      } else {
        if (colEle.widgetType != "component" || colEle.componentConfig.subType == "datetime") {
          tools.push(_react2.default.createElement(
            'div',
            { title: '\u7F16\u8F91', style: { cursor: "pointer", color: self.skinConfig ? self.skinConfig.designSkin.textColor : undefined, zIndex: "999" }, className: 'qingchu-btn edit-btn', onClick: function onClick() {
                return self.modifyCol(colEle);
              } },
            _react2.default.createElement(
              'div',
              { className: 'qingchu-btn-bg' },
              _react2.default.createElement(_SvgIcon2.default, { type: 'edit' })
            )
          ) //编辑
          );
        }
        bNeedDel = true;
      }
      if (!!colEle.backgroundImage) {
        tools.push(_react2.default.createElement(
          'div',
          { title: '\u6E05\u9664\u80CC\u666F\u56FE', style: { cursor: "pointer", color: self.skinConfig ? self.skinConfig.designSkin.textColor : undefined, zIndex: "999" }, className: 'qingchu-btn', onClick: function onClick() {
              return self.doUpload(colEle, "");
            } },
          '\u6E05\u9664\u80CC\u666F\u56FE'
        ));
      } else if (self.state.panelType == 1) {
        tools.push(_react2.default.createElement(_fileUpload2.default, {
          doUpload: function doUpload(fileList) {
            return self.doUpload(colEle, fileList);
          },
          showUploadList: false,
          multiple: false,
          bShowName: true,
          showName: "" //上传背景图
          , showNameColor: self.skinConfig ? self.skinConfig.designSkin.textColor : undefined,
          showSVG: "export",
          fileType: "pic",
          hideDesc: true,
          showTitle: '\u4E0A\u4F20\u80CC\u666F\u56FE'
        }));
      }
      if (bNeedDel) tools.push(_react2.default.createElement(
        'div',
        { title: '\u6E05\u9664',
          style: { cursor: "pointer", color: self.skinConfig ? self.skinConfig.designSkin.textColor : undefined, zIndex: "999" },
          className: 'qingchu-btn del-btn', onClick: function onClick() {
            return self.clearColType(colEle);
          } },
        _react2.default.createElement(
          'div',
          { className: 'qingchu-btn-bg' },
          ' ',
          _react2.default.createElement(_SvgIcon2.default, { type: 'delete' })
        )
      ) //清除
      );
      tools.push(_react2.default.createElement(
        'div',
        { style: { display: "none" } },
        ' ',
        colEle.colKey,
        ' '
      ));
      var isSelected = this.getSelectedColKey() == colEle.colKey ? true : false;
      var isFocused = this.state.focusedKey == colEle.colKey ? true : false;
      return _react2.default.createElement(
        'div',
        {
          className: colEle.backgroundImage ? "panelLayer-col-hasbackgroundimage" : "panelLayer-col-nobackgroundimage",
          style: { display: isFocused ? "" : "none" }
        },
        tools.reverse()
      );
    }
  }, {
    key: 'modifyCol',
    value: function modifyCol(colEle) {
      var selectedColKey = colEle.colKey;
      var curOperateType = "";
      switch (colEle.widgetType) {
        case "imagetext":
          curOperateType = "setImageText";
          break;
        case "chart":
          curOperateType = "setChart";
          break;
        case "sum":
          curOperateType = "setSum";
          break;
        case "component":
          if (colEle.componentConfig.subType == "datetime") curOperateType = "setComponent_DateTime";
          break;
        default:
      }
      this.setState({ selectedColKey: selectedColKey, curOperateType: curOperateType });
    }
  }, {
    key: 'getDisplay_Edit',
    value: function getDisplay_Edit(rows) {
      var _this3 = this;

      var self = this;
      var rowArr = [];
      rows.forEach(function (rowEle) {
        var colArr = [];
        var rowStyle = self.getStyle_Edit("row", "", rowEle);
        var rowInnerStyle = self.getInnerStyle_Edit("row", "", rowEle);
        rowEle.cols.forEach(function (colEle) {
          var colStyle = void 0;var colInnerStyle = void 0;var curCol = void 0;var content = void 0;var onClickFunc = void 0;
          var toolbar = self.getDesignToolBar(colEle);
          if (colEle.widgetType == "none" || colEle.widgetType == "component" || colEle.widgetType == "sum" || colEle.widgetType == "chart" || colEle.widgetType == "imagetext") {
            onClickFunc = function onClickFunc() {
              return self.setState({ selectedColKey: colEle.colKey });
            };
          }
          if (colEle.widgetType == "rows") {
            colStyle = self.getStyle_Edit("col", "rows", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "rows", colEle);
            content = self.getDisplay_Edit(colEle.widgetValue);
            curCol = _react2.default.createElement(
              'div',
              { className: 'panelLayer-col-inner', style: colInnerStyle },
              content,
              ' '
            );
          } else if (colEle.widgetType == "none") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            content = _react2.default.createElement(
              'div',
              { style: { display: "none" } },
              '\u65E0\u63A7\u4EF6'
            );
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: 'panelLayer-col-inner panelLayer-col-final',
                onClick: onClickFunc,
                style: colInnerStyle
              },
              toolbar,
              content
            );
          } else if (colEle.widgetType == "imagetext") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            content = self.getImageText(colEle.panelImageTextConfig);
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: 'panelLayer-col-inner panelLayer-col-final',
                onClick: onClickFunc,
                style: colInnerStyle
              },
              toolbar,
              content
            );
          } else if (colEle.widgetType == "chart") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            content = self.getChart(colEle.panelChartConfig);
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: 'panelLayer-col-inner panelLayer-col-final',
                onClick: onClickFunc,
                style: colInnerStyle
              },
              toolbar,
              content
            );
          } else if (colEle.widgetType == "sum") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            content = self.getSum(colEle.sumConfig);
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: 'panelLayer-col-inner panelLayer-col-final ',
                onClick: onClickFunc,
                style: colInnerStyle
              },
              toolbar,
              content
            );
          } else if (colEle.widgetType == "datetime") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            content = self.getDateTime(colEle.dateTimeConfig);
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: 'panelLayer-col-inner panelLayer-col-final ',
                onClick: onClickFunc,
                style: colInnerStyle
              },
              toolbar,
              content
            );
          } else if (colEle.widgetType == "component") {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            content = self.getComponent(colEle.componentConfig);
            curCol = _react2.default.createElement(
              'div',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this3.onMouseEnter(colEle.colKey);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this3.onMouseLeave();
                },
                className: 'panelLayer-col-inner panelLayer-col-final',
                onClick: onClickFunc,
                style: colInnerStyle
              },
              toolbar,
              content
            );
          } else {
            colStyle = self.getStyle_Edit("col", "control", colEle);
            colInnerStyle = self.getInnerStyle_Edit("col", "control", colEle);
            curCol = _react2.default.createElement(
              'div',
              { className: 'panelLayer-col-inner panelLayer-col-final', style: colInnerStyle },
              '\u672A\u77E5\u63A7\u4EF6'
            );
          }
          colArr.push(_react2.default.createElement(
            _col2.default,
            { className: 'panelLayer-col-outer', style: colStyle },
            curCol
          ));
        });
        rowArr.push(_react2.default.createElement(
          _row9.default,
          { className: 'panelLayer-row-outer', style: rowStyle },
          _react2.default.createElement(
            'div',
            { className: 'panelLayer-row-inner', style: rowInnerStyle },
            colArr
          ),
          ' '
        ));
      });
      return rowArr;
    }
  }, {
    key: 'getComponent',
    value: function getComponent(config) {
      return _react2.default.createElement(
        'div',
        { className: 'eChartPanelDesign_HasValue' },
        _react2.default.createElement(_SvgIcon2.default, { type: config.icon }),
        _react2.default.createElement(
          'span',
          null,
          config.title
        )
      );
    }
  }, {
    key: 'getSum',
    value: function getSum(config) {
      return _react2.default.createElement(
        'div',
        { className: 'eChartPanelDesign_HasValue' },
        _react2.default.createElement(_SvgIcon2.default, { type: 'huizongcopy' }),
        _react2.default.createElement(
          'span',
          null,
          '\u6C47\u603B'
        )
      );
      var content = JSON.stringify(config);
      return _react2.default.createElement(
        'div',
        null,
        '\u663E\u793A\u6C47\u603B\u4FE1\u606F:',
        content
      );
    }
  }, {
    key: 'getDateTime',
    value: function getDateTime(config) {
      return _react2.default.createElement(
        'div',
        { className: 'eChartPanelDesign_HasValue' },
        _react2.default.createElement(_SvgIcon2.default, { type: 'riqidefuben' }),
        _react2.default.createElement(
          'span',
          null,
          '\u65E5\u671F\u65F6\u95F4'
        )
      );
    }
  }, {
    key: 'getChart',
    value: function getChart(config) {
      return _react2.default.createElement(
        'div',
        { className: 'eChartPanelDesign_HasValue' },
        _react2.default.createElement(_SvgIcon2.default, { type: 'tubiaocopy' }),
        _react2.default.createElement(
          'span',
          null,
          '\u56FE\u8868'
        )
      );
      var content = JSON.stringify(config);
      return _react2.default.createElement(
        'div',
        null,
        '\u663E\u793A\u56FE\u8868\u4FE1\u606F:',
        content
      );
    }
  }, {
    key: 'getImageText',
    value: function getImageText(config) {
      return _react2.default.createElement(
        'div',
        { className: 'eChartPanelDesign_HasValue' },
        _react2.default.createElement(_SvgIcon2.default, { type: 'tuwencopy' }),
        _react2.default.createElement(
          'span',
          null,
          '\u56FE\u6587'
        )
      );
      var style = {};
      if (config.hasOwnProperty("fontSize")) style.fontSize = config.fontSize;
      if (config.hasOwnProperty("height")) style.height = config.height;
      if (config.hasOwnProperty("width")) style.width = config.width;
      if (config.hasOwnProperty("color")) style.color = config.color;
      if (config.hasOwnProperty("fontFamily")) style.fontFamily = config.fontFamily;
      if (config.hasOwnProperty("display")) style.display = config.display;
      return config.title ? _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', width: '100%', overflow: 'hidden' } },
          config.subType == "title" ? config.title : config.subType
        )
      ) : undefined;
    }
  }, {
    key: 'doUpload',
    value: function doUpload(colEle, fileList) {
      colEle.backgroundImage = fileList ? fileList[0].address : '';
      this.setState({});
    }
  }, {
    key: 'clearColTypeInner',
    value: function clearColTypeInner(colKey) {
      var colEle = this.getSelectedCol(colKey);
      this.clearColType(colEle);
    }
  }, {
    key: 'clearColType',
    value: function clearColType(colEle) {
      if (_.isEmpty(colEle)) {
        colEle = this.getSelectedCol();
      }
      if (_.isEmpty(colEle)) {
        cb.utils.alert("请选择区域。");
        return;
      }
      switch (colEle.widgetType) {
        case "chart":
          colEle.panelChartConfig = undefined;
          break;
        case "imagetext":
          colEle.panelImageTextConfig = undefined;
          break;
        case "sum":
          colEle.sumConfig = undefined;
          break;
        case "datetime":
          colEle.dateTimeConfig = undefined;
          break;
        case "rows":
          colEle.widgetValue = undefined;
          break;
        case "component":
          colEle.componentConfig = undefined;
          break;
        default:
      }
      colEle.widgetType = "none";
      colEle.backgroundColor = "";
      colEle.backgroundImage = "";
      this.forceUpdate();
    }
  }, {
    key: 'doSetImageText',
    value: function doSetImageText(bOK, info) {
      eChartCommon.LogChartInfo("大屏方案 设计 doSetImageText info ", JSON.stringify(info), 10);
      var self = this;
      var colEle = self.getSelectedCol();
      if (bOK) {
        colEle.widgetType = "imagetext";
        colEle.panelImageTextConfig = info;
        this.setState({ curOperateType: "" });
      } else {
        this.setState({ curOperateType: "" });
      }
    }
  }, {
    key: 'doSetDateTime',
    value: function doSetDateTime(bOK, info) {
      var self = this;
      var colEle = self.getSelectedCol();
      if (bOK) {
        var componentConfig = colEle.componentConfig;
        componentConfig.dateTimeConfig = info;
        this.setState({ curOperateType: "" });
      } else {
        var dateTimeConfig = colEle.componentConfig.dateTimeConfig;
        if (_.isEmpty(dateTimeConfig)) {
          colEle.widgetType = "none";
          colEle.componentConfig = undefined;
        }
        this.setState({ curOperateType: "" });
      }
    }
  }, {
    key: 'doSetSum',
    value: function doSetSum(bOK, info) {
      var self = this;
      var colEle = self.getSelectedCol();
      if (bOK) {
        colEle.widgetType = "sum";
        colEle.sumConfig = info;
      }
      this.state.curOperateType = "";
      this.forceUpdate();
    }
  }, {
    key: 'doSetChart',
    value: function doSetChart(bOK, info) {
      eChartCommon.LogChartInfo("大屏方案 设计 doSetChart info ", JSON.stringify(info), 10);
      var self = this;
      var colEle = self.getSelectedCol();
      if (bOK) {
        colEle.widgetType = "chart";
        colEle.panelChartConfig = info;
      }
      this.state.curOperateType = "";
      this.forceUpdate();
    }
  }, {
    key: 'cancelSplit',
    value: function cancelSplit() {
      this.popState();
    }
  }, {
    key: 'doSplit',
    value: function doSplit(bOK, info, selectedColKey) {
      var self = this;
      selectedColKey = selectedColKey || self.getSelectedColKey();
      var editPanel = _.cloneDeep(self.state.editPanel);
      eChartCommon.LogChartInfo("大屏方案 设计 info ", JSON.stringify(info), 10);

      if (bOK) {
        self.pushState();
        var colsInfo = self.getColParentInfo(editPanel.panelLayOutConfig.rows, selectedColKey);
        if (_.isEmpty(colsInfo) == false) {
          var curRows = colsInfo.rows;
          var curRowIndex = colsInfo.rowIndex;
          var curRow = curRows[curRowIndex];
          var curCols = colsInfo.cols;
          var curColIndex = colsInfo.colIndex;
          var curCol = curCols[curColIndex];
          if (info.bOuterMargin) {
            curCol.bOuterMargin = info.bOuterMargin;
          }
          if (info.bOuterBorder) {
            curCol.bOuterBorder = info.bOuterBorder;
          }
          if (info.splitType == "col") {
            //左右
            var width = "100";
            width = Number(width.replace("%", ""));
            var width1 = 0;
            var width2 = 0;
            var width3 = 0;
            if (info.count == 2) {
              width1 = parseInt(width * info.num1 / (Number(info.num1) + Number(info.num2)));
              width2 = width - width1;
            } else if (info.count == 3) {
              width1 = parseInt(width * info.num1 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
              width2 = parseInt(width * info.num2 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
              width3 = width - width1 - width2;
            }
            var col1 = eChartCommon.getNewCol();
            col1.isTitleArea = curCol.isTitleArea;
            col1.width = width1 + "%";
            col1.borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
            if (!info.bInnerMargin) col1.margin = "0px";
            selectedColKey = col1.colKey;

            var col2 = eChartCommon.getNewCol();
            col2.isTitleArea = curCol.isTitleArea;
            col2.width = width2 + "%";
            col2.borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
            if (!info.bInnerMargin) col2.margin = "0px";

            var col3 = eChartCommon.getNewCol();
            col3.isTitleArea = curCol.isTitleArea;
            col3.width = width3 + "%";
            col3.borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
            if (!info.bInnerMargin) col3.margin = "0px";

            var row1 = eChartCommon.getNewRow(curRow);
            row1.isTitleArea = curCol.isTitleArea;
            if (info.count == 2) {
              row1.cols.push(col1);
              row1.cols.push(col2);
            } else if (info.count == 3) {
              row1.cols.push(col1);
              row1.cols.push(col2);
              row1.cols.push(col3);
            }
            curCol.widgetType = "rows";
            curCol.widgetValue = [];
            curCol.widgetValue.push(row1);
          } else if (info.splitType == "row") {
            //上下
            if (curCols.length == -999) {
              //当前行只有一个列，还拆行，就在当前行上进行拆行,不再使用
              var height = curRow.height;
              height = Number(height.replace("%", ""));
              var height1 = 0;
              var height2 = 0;
              var height3 = 0;
              if (info.count == 2) {
                height1 = parseInt(height * info.num1 / (Number(info.num1) + Number(info.num2)));
                height2 = height - height1;
              } else if (info.count == 3) {
                height1 = parseInt(height * info.num1 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
                height2 = parseInt(height * info.num2 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
                height3 = height - height1 - height2;
              }
              var _row4 = _.cloneDeep(curRow);
              _row4.rowKey = eChartCommon.getNewRowKey();
              _row4.cols[0].colKey = eChartCommon.getNewColKey();;
              _row4.height = height1 + "%";
              _row4.cols[0].borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
              if (!info.bInnerMargin) _row4.cols[0].margin = "0px";
              selectedColKey = _row4.cols[0].colKey;
              var row2 = _.cloneDeep(curRow);
              row2.rowKey = eChartCommon.getNewRowKey();
              row2.cols[0].colKey = eChartCommon.getNewColKey();;
              row2.height = height2 + "%";
              row2.cols[0].borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
              if (!info.bInnerMargin) row2.cols[0].margin = "0px";
              var row3 = _.cloneDeep(curRow);
              row3.rowKey = eChartCommon.getNewRowKey();
              row3.cols[0].colKey = eChartCommon.getNewColKey();;
              row3.height = height3 + "%";
              row3.cols[0].borderWidth = info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px";
              if (!info.bInnerMargin) row3.cols[0].margin = "0px";
              if (info.count == 2) {
                curRows.splice(curRowIndex, 1, _row4);
                curRows.splice(curRowIndex + 1, 0, row2);
              } else if (info.count == 3) {
                curRows.splice(curRowIndex, 1, _row4);
                curRows.splice(curRowIndex + 1, 0, row2);
                curRows.splice(curRowIndex + 2, 0, row3);
              }
            } else {
              //当前行有多个列，还拆行，就在当前列上进行拆行
              var _height = 0;
              var _height2 = 0;
              var _height3 = 0;
              if (info.count == 2) {
                _height = parseInt(100 * info.num1 / (Number(info.num1) + Number(info.num2)));
                _height2 = 100 - _height;
              } else if (info.count == 3) {
                _height = parseInt(100 * info.num1 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
                _height2 = parseInt(100 * info.num2 / (Number(info.num1) + Number(info.num2) + Number(info.num3)));
                _height3 = 100 - _height - _height2;
              }
              var firstRowFlag = curCol.isTitleArea;
              if (_height <= 20 && editPanel.splitCounter == 0) firstRowFlag = true;
              var _row5 = {
                rowKey: eChartCommon.getNewRowKey(),
                isTitleArea: firstRowFlag,
                height: _height + '%',
                padding: eChartCommon.panelDefaultValue.padding,
                margin: eChartCommon.panelDefaultValue.margin,
                cols: [{
                  colKey: eChartCommon.getNewColKey(),
                  isTitleArea: firstRowFlag,
                  width: '100%',
                  padding: eChartCommon.panelDefaultValue.padding,
                  margin: info.bInnerMargin ? eChartCommon.panelDefaultValue.margin : "0px",
                  widgetType: "none",
                  borderWidth: info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px",
                  borderColor: curCol.borderColor,
                  backgroundColor: curCol.backgroundColor
                }]
              };
              selectedColKey = _row5.cols[0].colKey;
              var _row6 = {
                rowKey: eChartCommon.getNewRowKey(),
                isTitleArea: curCol.isTitleArea,
                height: _height2 + '%',
                padding: eChartCommon.panelDefaultValue.padding,
                margin: eChartCommon.panelDefaultValue.margin,
                cols: [{
                  colKey: eChartCommon.getNewColKey(),
                  isTitleArea: curCol.isTitleArea,
                  width: '100%',
                  padding: eChartCommon.panelDefaultValue.padding,
                  margin: info.bInnerMargin ? eChartCommon.panelDefaultValue.margin : "0px",
                  widgetType: "none",
                  borderWidth: info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px",
                  borderColor: curCol.borderColor,
                  backgroundColor: curCol.backgroundColor
                }]
              };
              var _row7 = {
                rowKey: eChartCommon.getNewRowKey(),
                isTitleArea: curCol.isTitleArea,
                height: _height3 + '%',
                padding: eChartCommon.panelDefaultValue.padding,
                margin: eChartCommon.panelDefaultValue.margin,
                cols: [{
                  colKey: eChartCommon.getNewColKey(),
                  isTitleArea: curCol.isTitleArea,
                  width: '100%',
                  padding: eChartCommon.panelDefaultValue.padding,
                  margin: info.bInnerMargin ? eChartCommon.panelDefaultValue.margin : "0px",
                  widgetType: "none",
                  borderWidth: info.bInnerBorder ? eChartCommon.panelDefaultValue.borderWidth : "0px",
                  borderColor: curCol.borderColor,
                  backgroundColor: curCol.backgroundColor
                }]
              };
              curCol.widgetType = "rows";
              curCol.widgetValue = [];
              if (info.count == 2) {
                curCol.widgetValue.push(_row5);
                curCol.widgetValue.push(_row6);
              } else if (info.count == 3) {
                curCol.widgetValue.push(_row5);
                curCol.widgetValue.push(_row6);
                curCol.widgetValue.push(_row7);
              }
            }
          }
        }
        editPanel.splitCounter = (editPanel.splitCounter || 0) + 1;
        if (this.state.panelType == 3) this.setState({ curOperateType: "", editPanel: editPanel, selectedColKey: "" });else this.setState({ curOperateType: "", editPanel: editPanel, selectedColKey: selectedColKey });
      } else {
        this.setState({ curOperateType: "" });
      }
    }
  }, {
    key: 'getColParentInfo',
    value: function getColParentInfo(rows, colKey) {
      var self = this;
      var obj = {};
      rows.forEach(function (rowEle, rowIndex) {
        var curRow = [];
        rowEle.cols.forEach(function (colEle, colIndex) {
          if (colEle.colKey === colKey) {
            obj.rows = rows;
            obj.rowIndex = rowIndex;
            obj.cols = rowEle.cols;
            obj.colIndex = colIndex;
          } else if (colEle.widgetType == "rows") {
            var obj2 = self.getColParentInfo(colEle.widgetValue, colKey);
            obj = _.isEmpty(obj2) ? obj : obj2;
          }
        });
      });
      return obj;
    }
  }, {
    key: 'showSplitCard',
    value: function showSplitCard(bOK, colKey) {
      if (bOK) {
        this.setState({ curOperateType: "splitCol", selectedColKey: colKey });
      } else {
        this.setState({ curOperateType: "" });
      }
    }
  }, {
    key: 'getDesignColType_Title',
    value: function getDesignColType_Title() {
      var self = this;
      var curCol = self.getSelectedCol();
      eChartCommon.LogChartInfo("大屏方案 设计 getDesignColType_Title curCol ", JSON.stringify(curCol), 10);
      return _react2.default.createElement(_eChartPanelSetImageText2.default, {
        colEle: curCol,
        doFunc: function doFunc(bOK, info) {
          return self.doSetImageText(bOK, info);
        }
      });
    }
  }, {
    key: 'getDesignColType_Chart',
    value: function getDesignColType_Chart(curCol, bVisible) {
      var self = this;
      if (bVisible) {
        curCol = curCol || self.getSelectedCol();
      }
      eChartCommon.LogChartInfo("大屏方案 设计 getDesignColType_Chart curCol ", JSON.stringify(curCol), 10);
      return _react2.default.createElement(_eChartPanelSetChart2.default, {
        bVisible: bVisible,
        colEle: curCol,
        doFunc: function doFunc(bOK, info) {
          return self.doSetChart(bOK, info);
        },
        panelType: self.state.panelType
      });
    }
  }, {
    key: 'hideSettingPanel',
    value: function hideSettingPanel() {
      this.setState({ curOperateType: "", hideSettingPanel: 1 });
    }
  }, {
    key: 'getDesignColType_Sum',
    value: function getDesignColType_Sum(curCol, bVisible) {
      var self = this;
      if (bVisible) {
        curCol = curCol || self.getSelectedCol();
      }
      eChartCommon.LogChartInfo("大屏方案 设计 getDesignColType_Sum curCol ", JSON.stringify(curCol), 10);
      return _react2.default.createElement(_eChartPanelSetSum2.default, {
        bVisible: bVisible,
        panelType: self.state.panelType,
        colEle: curCol,
        doFunc: function doFunc(bOK, info) {
          return self.doSetSum(bOK, info);
        }
      });
    }
  }, {
    key: 'getDesignColType_DateTime',
    value: function getDesignColType_DateTime() {
      var self = this;
      var curCol = self.getSelectedCol();
      return _react2.default.createElement(_eChartPanelSetDateTime2.default, { colEle: curCol, doFunc: function doFunc(bOK, info) {
          return self.doSetDateTime(bOK, info);
        } });
    }
  }, {
    key: 'getSelectedColKey',
    value: function getSelectedColKey() {
      return this.state.selectedColKey;
    }
  }, {
    key: 'getSelectedCol',
    value: function getSelectedCol(colKey) {
      var self = this;
      if (!self.state.editPanel.panelLayOutConfig) return {};
      var rows = self.state.editPanel.panelLayOutConfig.rows;
      colKey = colKey || self.state.selectedColKey;
      var colsInfo = self.getColParentInfo(rows, colKey);
      var cols = colsInfo.cols;
      var colIndex = colsInfo.colIndex;
      if (cols && colIndex != undefined) return cols[colIndex];else return {};
    }
  }, {
    key: 'getTemplates',
    value: function getTemplates() {
      var self = this;
      var templateList = self.state.templateList;
      var templateContents = [];
      templateList.forEach(function (template) {
        var tmp = self.getTemplate(template);
        var isSelected = self.state.editPanel && self.state.editPanel.templateKey == template.templateKey;
        var tmpClsName = self.state.panelType == 1 ? "eChartPanelDesign" : "eChartPanelDesign2";
        tmpClsName = tmpClsName + (isSelected ? "_Template_Selected" : "_Template_UnSelected");
        templateContents.push(_react2.default.createElement(
          'div',
          {
            onClick: function onClick(e) {
              return self.setEditPanel(e, template);
            },
            className: tmpClsName },
          _react2.default.createElement(
            'div',
            { className: 'icon' },
            _react2.default.createElement(_SvgIcon2.default, { type: template.icon })
          ),
          _react2.default.createElement(
            'div',
            { className: 'explain', style: { display: "" } },
            template.templateName
          )
        ));
      });
      return templateContents.length != 0 ? _react2.default.createElement(
        'div',
        { className: "eChartPanelDesign_TemplateLayOut clearfix " + (self.state.panelType == 2 ? "eChartPanelDesign2_TemplateLayOut" : "") },
        templateContents
      ) : undefined;
    }
  }, {
    key: 'getTemplate',
    value: function getTemplate(template) {
      var content = void 0;
      var style = this.getStyle_Simple("all", "", template);
      content = this.getDisplay_Simple(template.panelLayOutConfig.rows);
      return _react2.default.createElement(
        'div',
        { className: 'eChartPanelDesign_template', style: style },
        content
      );
    }
  }, {
    key: 'getStyle_Simple',
    value: function getStyle_Simple(eleType, innerType, ele) {
      var style = {};
      if (eleType == "row") {
        style.width = '100%';
        style.height = ele.height;
      } else if (eleType == "col") {
        var widgetType = ele.widgetType;
        style.height = '100%';
        style.width = ele.width;
        style.float = 'left';
      } else if (eleType == "all") {
        style.width = '40px';
        style.height = '30px';
      }
      if (eleType == "all" || eleType == "col" && innerType == "control") {
        style.border = eChartCommon.panelDefaultValue.borderWidth + " solid #ddd3d2";
      }
      return style;
    }
  }, {
    key: 'getDisplay_Simple',
    value: function getDisplay_Simple(rows) {
      var self = this;
      var rowArr = [];
      rows.forEach(function (rowEle) {
        var colArr = [];
        var rowStyle = self.getStyle_Simple("row", "", rowEle);
        rowEle.cols.forEach(function (colEle) {
          var colStyle = void 0;
          var curCol = void 0;
          if (colEle.widgetType == "rows") {
            colStyle = self.getStyle_Simple("col", "rows", colEle);
            curCol = self.getDisplay_Simple(colEle.widgetValue);
          } else {
            colStyle = self.getStyle_Simple("col", "control", colEle);
            curCol = "";
          }
          colArr.push(_react2.default.createElement(
            _col2.default,
            { style: colStyle },
            curCol
          ));
        });
        rowArr.push(_react2.default.createElement(
          _row9.default,
          { style: rowStyle },
          colArr,
          ' '
        ));
      });
      return rowArr;
    }
  }, {
    key: 'cancelOpereate',
    value: function cancelOpereate() {
      eChartCommon.LogChartInfo("eChartPanelDesign cancelOpereate 设计模板取消操作", "", 900);
      var _props = this.props,
          portalactions = _props.portalactions,
          index = _props.index;

      portalactions.delItem(index);
      this.parentViewModel.execute('back');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var reportViewId = self.props.data.params.id;
      var editType = this.state.editType;
      var templateList = void 0;
      if (self.state.panelType == 1) {
        templateList = eChartCommon.getPanelLayOutTemplate1();
      } else if (self.state.panelType == 2) {
        templateList = eChartCommon.getPanelLayOutTemplate2();
      } else if (self.state.panelType == 3) {
        templateList = eChartCommon.getPanelLayOutTemplate3();
      }
      if (!reportViewId || reportViewId < 1) {
        //增加
        var curPanel = void 0;
        curPanel = _.cloneDeep(templateList[0]);
        curPanel.createTime = (0, _formatDate.Format)(new Date(), 'yyyy-MM-dd hh:mm:ss');
        self.setState({ templateList: templateList, editPanel: curPanel });
      } else {
        //编辑
        var param = { reportViewId: reportViewId };
        var callback = function callback(json) {
          if (json.code === 200) {
            var data = json.data;
            if (data) {
              var editPanel = eChartCommon.restoreEditPanel(data.pageLayout, data.items, self.state.editType, reportViewId);
              self.setState({ templateList: templateList, editPanel: editPanel });
            }
          }
        };
        eChartProxy.doProxy(eChartProxy.url.getReportView, 'GET', param, callback);
      }
      cb.events.on('getPreviewPanel', function () {
        cb.events.execute("setPreviewPanel", { "template": self.state.editPanel });
      });
    }
  }, {
    key: 'preView',
    value: function preView(bOK) {
      var self = this;
      if (self.state.panelType == 1) {
        var currentWindow = window.open("/echartcarousel?isInDesign=1", "预览", "fullscreen=yes");
        currentWindow.resizeTo(screen.availWidth, screen.availHeight);
      } else {
        self.setState({ curOperateType: "preView" });
      }
    }
  }, {
    key: 'getPreView',
    value: function getPreView() {
      var self = this;
      var panelConfig = _.cloneDeep(this.state.editPanel);
      var curCol = self.getSelectedCol() || {};
      eChartCommon.LogChartInfo("大屏方案 设计 eChartPanelDesigngetPreView Begin", "", 900);
      var tmp = _react2.default.createElement(_eChartPanelDisplay2.default, { panelConfig: panelConfig, colEle: curCol, isInDesign: true, doFunc: function doFunc() {
          return self.setState({ curOperateType: "" });
        } });
      eChartCommon.LogChartInfo("大屏方案 设计 eChartPanelDesigngetPreView End", "", 900);
      return tmp;
    }
  }]);

  return eChartPanelDesign;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(eChartPanelDesign);