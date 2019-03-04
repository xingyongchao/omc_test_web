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

var _basic = require('../../basic');

var _groupCondition = require('../../../redux/groupCondition');

var groupConditionRedux = _interopRequireWildcard(_groupCondition);

var _eChartCommon = require('../eChartCommon');

var eChartCommon = _interopRequireWildcard(_eChartCommon);

var _SvgIcon = require('../../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//  import InputFloat from 'yxyweb/common/components/basic/inputfloat';


var Option = _antd.Select.Option;
var RadioGroup = _antd.Radio.Group;
//eChartSetting_getRender

var EChartDesign = function (_React$Component) {
  _inherits(EChartDesign, _React$Component);

  function EChartDesign(props) {
    _classCallCheck(this, EChartDesign);

    var _this = _possibleConstructorReturn(this, (EChartDesign.__proto__ || Object.getPrototypeOf(EChartDesign)).call(this, props));

    _this.eChartSettingOK = function () {
      var _this$props = _this.props,
          groupConditionState = _this$props.groupConditionState,
          groupConditionRedux = _this$props.groupConditionRedux;

      groupConditionRedux.eChartSetting_EChartSettingOK(_this.getBillNum(), _this.state.chartKey);
    };

    _this.eChartSettingCancel = function () {
      var _this$props2 = _this.props,
          groupConditionState = _this$props2.groupConditionState,
          groupConditionRedux = _this$props2.groupConditionRedux;

      groupConditionRedux.eChartSetting_CancelChartConfig(_this.getBillNum(), _this.state.chart_Backup, _this.state.chartKey, _this.state.bAdd);
    };

    _this.state = {
      billnum: props.billnum,
      chartKey: props.chartKey,
      reportFields: props.reportFields,
      bAdd: false,
      chart_Backup: undefined
    };

    _this.bSetTreeModel = false;
    if (props.chartKey) {
      //编辑
      _this.state.bAdd = false;
      var config = eChartCommon.subConfig_Get(props.groupConditionState[props.billnum].eChart, props.chartKey);
      _this.state.chart_Backup = config;
      eChartCommon.upgradeConfig_ForScatter(config);
      if (_.get(config, "yySetting.type") == "scatter") {
        _this.SetTreeModel(config);
      }
    } else {
      //新增
      _this.state.bAdd = true;
      _this.state.chart_Backup = undefined;
      _this.state.chartKey = eChartCommon.getNewSubChartKey();
      _this.chooseChart("bar", "1", true);
    }

    eChartCommon.LogChartInfo("设置界面 EChartDesign初始化  state  ", JSON.stringify(_this.state), 900);
    return _this;
  }

  _createClass(EChartDesign, [{
    key: 'trimRegion',
    value: function trimRegion(data) {
      //删除直辖市下级地区以及地级市下级地区
      var zhixiashi = [110000, 500000, 810000, 910000, 310000, 710000, 120000]; //直辖市ID，下级直接删除
      var delRegionIds = []; //特殊需要删除掉的地区的ID
      var childrens = data[0].children;
      childrens.forEach(function (item) {
        if (zhixiashi.indexOf(item.id) >= 0) {
          item.children = undefined;
        } else {
          var subChildrens = item.children;
          subChildrens.forEach(function (subItem) {
            subItem.children = undefined;
          });
        }
      });
    }
  }, {
    key: 'SetTreeModel',
    value: function SetTreeModel(config) {
      if (this.bSetTreeModel == false) {
        var _props = this.props,
            groupConditionState = _props.groupConditionState,
            _groupConditionRedux = _props.groupConditionRedux;

        this.bSetTreeModel = true;
        this.treeModel = new cb.models.TreeModel({ dataSourceMode: 'a', keyField: 'id', titleField: 'name' });
        this.treeModel.on('beforeSetDataSource', function (data) {
          self.trimRegion(data);
        }, self = this);
        this.treeModel.setDataSource({ url: '/region/getAllregion', method: 'POST' });
        this.treeModel.on('afterSetDataSource', function (data) {
          var regionInfo = _.get(config, "yySetting.regionInfo");
          if (regionInfo && regionInfo.regionArr && regionInfo.regionArr.length > 0) self.treeModel.setValue(regionInfo.regionArr);
        }, self = this);

        this.treeModel.on('afterSelect', function (args) {
          var config = self.getChart();
          var arg = args[args.length - 1];
          var regionInfo = config.regionInfo || {};
          regionInfo.region = arg.id;
          regionInfo.shortName = arg.shortname;
          regionInfo.parent = arg.parent;
          regionInfo.geoName = arg.shortname + arg.id;
          regionInfo.regionArr = self.treeModel.getValue();
          if (regionInfo.parent == "0" || regionInfo.parent == "100000") {
            //中国地图或者省、直辖市地图
          } else {}

          _groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "yySetting.regionInfo", regionInfo);
        }, self = this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var _props2 = this.props,
          groupConditionState = _props2.groupConditionState,
          groupConditionRedux = _props2.groupConditionRedux;

      var leftPanel = this.getChartTypeList();
      var rightPanel = this.getChartSettingPanel();
      return _react2.default.createElement(
        'div',
        { className: 'eChartSetting' },
        _react2.default.createElement(
          _basic.Row,
          { colCount: 12, className: 'eChartSetting_Panel' },
          _react2.default.createElement(
            _basic.Col,
            { className: 'eChartSetting_Left', span: 3 },
            leftPanel
          ),
          _react2.default.createElement(
            _basic.Col,
            { className: 'eChartSetting_Right', span: 9 },
            rightPanel
          )
        ),
        _react2.default.createElement(
          _basic.Row,
          { colCount: 12, className: 'eChartSetting_Button' },
          _react2.default.createElement(
            _antd.Button,
            { type: "default", onClick: function onClick() {
                return self.eChartSettingCancel(false);
              } },
            '\u53D6\u6D88'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: "primary", onClick: function onClick() {
                return self.eChartSettingOK(true);
              } },
            '\u4FDD\u5B58'
          )
        )
      );
    }
  }, {
    key: 'getChartSettingPanel',
    value: function getChartSettingPanel() {
      var _this2 = this;

      var self = this;
      var _self$props = self.props,
          groupConditionState = _self$props.groupConditionState,
          groupConditionRedux = _self$props.groupConditionRedux;


      var config = eChartCommon.subConfig_Get(groupConditionState[this.state.billnum].eChart, this.state.chartKey, this.state.bAdd);
      var errors = groupConditionState[this.state.billnum].eChart.errors ? groupConditionState[this.state.billnum].eChart.errors : {};
      if (config == undefined) return _react2.default.createElement('div', null);

      var yySetting = config.yySetting;
      var reportFields = this.state.reportFields;
      var type = _.get(config, "yySetting.type");
      var subType = _.get(config, "yySetting.subType");

      var dimensionXFields = eChartCommon.getArrayFields(config, "yySetting.dataField.dimensionX", "nameField");
      var dimensionSubFields = eChartCommon.getArrayFields(config, "yySetting.dataField.dimensionSub", "nameField");
      var measureFields = eChartCommon.getArrayFields(config, "yySetting.dataField.measure", "valueField");
      var measure = _.get(config, "yySetting.dataField.measure");
      var dimensionXContent = [];
      var dimensionSubContent = [];
      var measureContent = [];
      var measureContentRankTable = [];
      var measureContent0 = []; //柱折图使用
      var measureContent1 = []; //柱折图使用
      var orderFieldContent = []; //排序指标
      var iLabelOrder = 0;
      var longitudeArr = [];
      var latitudeArr = [];

      reportFields.forEach(function (item) {
        iLabelOrder = iLabelOrder + 1;
        item.iLabelOrder = iLabelOrder;
        if (item.groupType == 0) {
          dimensionXContent.push(_react2.default.createElement(
            _antd.Checkbox,
            {
              checked: dimensionXFields.indexOf(item.fieldname) >= 0 ? true : false,
              disabled: dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false,
              onChange: function onChange(e) {
                return self.dimensionXFieldsChecked(item, e.target.checked, item.iLabelOrder);
              } },
            item.caption
          ));
          if (type == "line" || type == "bar") {
            dimensionSubContent.push(_react2.default.createElement(
              _antd.Checkbox,
              {
                checked: dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false,
                disabled: dimensionXFields.indexOf(item.fieldname) >= 0 ? true : false,
                onChange: function onChange(e) {
                  return self.dimensionSubFieldsChecked(item, e.target.checked, item.iLabelOrder);
                } },
              item.caption
            ));
          }
        } else if (item.groupType == 3) {
          if (type == "ranktable") {
            //  { valueField: "fMoney", caption: "金额", bShowValueNotBar: false, iOrder: 3, bShowValueAfterBar: true },
            var measureEle = _.find(measure, function (o) {
              return o.valueField == item.fieldname;
            });
            var bChecked = measureEle ? true : false;
            var bShowValueNotBar = bChecked && measureEle.bShowValueNotBar ? true : false;
            var bShowValueAfterBar = bChecked && bShowValueNotBar == false && measureEle.bShowValueAfterBar ? true : false;
            measureContentRankTable.push(_react2.default.createElement(
              _basic.Row,
              null,
              _react2.default.createElement(
                _antd.Checkbox,
                {
                  checked: bChecked
                  // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                  , disabled: false,
                  onChange: function onChange(e) {
                    return self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder);
                  } },
                item.caption
              ),
              _react2.default.createElement(
                RadioGroup,
                {
                  onChange: function onChange(e) {
                    return self.measureFieldsValueChanged(type, item.fieldname, "bShowValueNotBar", e.target.value);
                  },
                  value: bShowValueNotBar },
                _react2.default.createElement(
                  _antd.Radio,
                  { value: true },
                  '\u663E\u793A\u6570\u503C'
                ),
                _react2.default.createElement(
                  _antd.Radio,
                  { value: false },
                  '\u663E\u793A\u6761\u5F62'
                )
              ),
              _react2.default.createElement(
                _antd.Checkbox,
                {
                  checked: bShowValueAfterBar
                  // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                  , disabled: !bChecked || bShowValueNotBar,
                  onChange: function onChange(e) {
                    return self.measureFieldsValueChanged(type, item.fieldname, "bShowValueAfterBar", e.target.checked);
                  } },
                '\u6761\u5F62\u672B\u7AEF\u663E\u793A\u6570\u5B57'
              )
            ));
          } else {
            measureContent.push(_react2.default.createElement(
              _antd.Checkbox,
              {
                checked: measureFields.indexOf(item.fieldname) >= 0 ? true : false
                // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                , disabled: false,
                onChange: function onChange(e) {
                  return self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder);
                } },
              item.caption
            ));
          }
          if (type == "barline") {
            measureContent0.push(_react2.default.createElement(
              _antd.Checkbox,
              {
                checked: _.find(measure, function (o) {
                  return o.valueField == item.fieldname && o.yAxisIndex === 0;
                }) ? true : false
                // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                , disabled: _.find(measure, function (o) {
                  return o.valueField == item.fieldname && o.yAxisIndex === 1;
                }) ? true : false,
                onChange: function onChange(e) {
                  return self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder, 0);
                } },
              item.caption
            ));
            measureContent1.push(_react2.default.createElement(
              _antd.Checkbox,
              {
                checked: _.find(measure, function (o) {
                  return o.valueField == item.fieldname && o.yAxisIndex === 1;
                }) ? true : false
                // disabled={item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false}
                , disabled: _.find(measure, function (o) {
                  return o.valueField == item.fieldname && o.yAxisIndex === 0;
                }) ? true : false,
                onChange: function onChange(e) {
                  return self.measureFieldsChecked(type, item, e.target.checked, item.iLabelOrder, 1);
                } },
              item.caption
            ));
          }
          orderFieldContent.push(_react2.default.createElement(
            _antd.Radio,
            {
              checked: item.fieldname == _.get(config, "yySetting.orderInfo.orderField") ? true : false,
              disabled: measureFields.indexOf(item.fieldname) >= 0 ? false : true,
              onChange: function onChange(e) {
                return self.setEChartConfigValue("yySetting.orderInfo.orderField", e.target.checked ? item.fieldname : "");
              } },
            item.caption
          ));
          longitudeArr.push(_react2.default.createElement(
            Option,
            { value: item.fieldname },
            item.caption
          ));
          latitudeArr.push(_react2.default.createElement(
            Option,
            { value: item.fieldname },
            item.caption
          ));
        }
        // {"fieldname":"fOrderQty","groupType":3,"caption":"客单量","sumType":"max"}
      });

      var content = [];
      var textPath = "eChartSetting.title.text";
      if (type == "ranktable") {
        textPath = "yySetting.title.text";
      }
      content.push(_react2.default.createElement(
        _basic.Row,
        { className: 'eChartSetting_Content', colCount: 12 },
        _react2.default.createElement(
          _basic.Col,
          { span: 2, className: 'eChartSetting_ContentCol1' },
          _react2.default.createElement(
            'div',
            { className: 'eChartSetright-title' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            ' \u6807\u9898'
          )
        ),
        _react2.default.createElement(
          _basic.Col,
          { span: 10, className: 'eChartSetting_ContentCol2' },
          _react2.default.createElement(_antd.Input, {
            id: 'id_Title',
            placeholder: '\u8BF7\u8F93\u5165',
            value: _.get(config, textPath),
            onChange: function onChange(e) {
              return self.setEChartConfigValue(textPath, e.target.value);
            }
          })
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { className: 'eChartSetting_Errors' },
        _.isEmpty(errors.title) ? "" : _react2.default.createElement(
          'div',
          null,
          errors.title
        ),
        ' '
      ));
      // if (type != "ranktable") {
      //   content.push(
      //     <Row className="eChartSetting_Content" colCount={12}>
      //       <Col span={2} className="eChartSetting_ContentCol1"  ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 标题</div></Col>
      //       <Col span={10} className="eChartSetting_ContentCol2" >
      //         <Input
      //           id="id_Title"
      //           placeholder="请输入"
      //           value={_.get(config, "eChartSetting.title.text")}
      //           onChange={(e) => self.setEChartConfigValue("eChartSetting.title.text", e.target.value)}
      //         />
      //       </Col>
      //     </Row>);
      //   content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.title) ? "" : <div>{errors.title}</div>} </Row>);
      // }
      // else {
      //   content.push(
      //     <Row className="eChartSetting_Content" colCount={12}>
      //       <Col span={2} className="eChartSetting_ContentCol1"  ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 标题</div></Col>
      //       <Col span={10} className="eChartSetting_ContentCol2" >
      //         <Input
      //           id="id_Title"
      //           placeholder="请输入"
      //           value={_.get(config, "yySetting.title.text")}
      //           onChange={(e) => self.setEChartConfigValue("yySetting.title.text", e.target.value)}
      //         />
      //       </Col>
      //     </Row>);
      //   content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.title) ? "" : <div>{errors.title}</div>} </Row>);
      // }

      if (type == "scatter") {
        var arrArr = eChartCommon.getMapProvinceArr();
        var options = [];
        arrArr.forEach(function (ele) {
          options.push(_react2.default.createElement(
            Option,
            { value: ele.key },
            ele.caption
          ));
        });
        // content.push(
        //   <Row className="eChartSetting_Content" colCount={12}>
        //     <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title"><i className="anticon anticon-star"></i> 地图</div></Col>
        //     <Col span={10} className="eChartSetting_ContentCol2" >
        //       <Select
        //         value={_.get(config, "yySetting.key")}
        //         onSelect={(key) => self.setScatterMapInfo(key)}
        //       >
        //         {options}
        //       </Select>
        //     </Col>
        //   </Row>);

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetright-title' },
              _react2.default.createElement('i', { className: 'anticon anticon-star' }),
              ' \u5730\u56FE'
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(_basic.Cascader, {
              cShowCaption: '',
              ref: 'regionCode',
              changeOnSelect: true,
              model: this.treeModel
            })
          )
        ));

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.map) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.map
          ),
          ' '
        ));

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetright-title' },
              _react2.default.createElement('i', { className: 'anticon anticon-star' }),
              ' \u7ECF\u5EA6'
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              _antd.Select,
              {
                value: _.get(config, "yySetting.dataField.LngAndLat.longitude.longitudeField"),
                onSelect: function onSelect(key) {
                  return _this2.setEChartConfigValue("yySetting.dataField.LngAndLat.longitude.longitudeField", key, false);
                }
              },
              longitudeArr
            )
          )
        ));
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.longitudeField) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.longitudeField
          ),
          ' '
        ));

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetright-title' },
              _react2.default.createElement('i', { className: 'anticon anticon-star' }),
              '\u7EAC\u5EA6'
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              _antd.Select,
              {
                value: _.get(config, "yySetting.dataField.LngAndLat.latitude.latitudeField"),
                onSelect: function onSelect(key) {
                  return _this2.setEChartConfigValue("yySetting.dataField.LngAndLat.latitude.latitudeField", key, false);
                }
              },
              latitudeArr
            )
          )
        ));
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.latitudeField) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.latitudeField
          ),
          ' '
        ));
      }
      if (type == "pie") {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetright-title' },
              '\u5185\u5916\u534A\u5F84'
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSet-mainwnumber' },
              _react2.default.createElement(
                'span',
                { className: 'inner_radius' },
                '\u5185\u534A\u5F84\u767E\u5206\u6BD4'
              ),
              _react2.default.createElement(_antd.Input, {
                placeholder: '\u8BF7\u8F93\u51650-99\u6570\u5B57',
                value: _.get(config, "yySetting.radius.radiusInner"),
                onChange: function onChange(e) {
                  return self.setEChartConfigValue("yySetting.radius.radiusInner", e.target.value, true, true);
                }, className: 'eChartSetinput'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSet-mainwnumber2' },
              _react2.default.createElement(
                'span',
                { className: 'inner_radius' },
                '\u5916\u534A\u5F84\u767E\u5206\u6BD4'
              ),
              _react2.default.createElement(_antd.Input, {
                placeholder: '\u8BF7\u8F93\u51651-100\u6570\u5B57',
                value: _.get(config, "yySetting.radius.radiusOuter"),
                onChange: function onChange(e) {
                  return self.setEChartConfigValue("yySetting.radius.radiusOuter", e.target.value, true, true);
                }, className: 'eChartSetinput'
              })
            )
          )
        ));
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.radiusInner) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.radiusInner
          ),
          ' '
        ));

        // content.push(
        //   <Row className="eChartSetting_Content" colCount={12}>
        //     <Col span={2} className="eChartSetting_ContentCol1" >显示样式</Col>
        //     <Col span={10} className="eChartSetting_ContentCol2" >
        //       <Checkbox checked={yySetting.isSingleValue ? true : false} onChange={(e) => this.setEChartConfigValue("yySetting.isSingleValue", e.target.checked ? true : false)}>单数值百分比图</Checkbox>
        //     </Col>
        //   </Row>);
        // content.push(<Row className="eChartSetting_Errors"  >{_.isEmpty(errors.isSingleValue) ? "" : <div>{errors.isSingleValue}</div>} </Row>);
      }

      if (type == "ranktable") {

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            '\u6392\u540D\u5217'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSet-mainwnumber' },
              _react2.default.createElement(
                _antd.Checkbox,
                {
                  checked: yySetting.indexCol.bAddIndexCol ? true : false,
                  onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.indexCol.bAddIndexCol", e.target.checked ? true : false);
                  } },
                '\u662F\u5426\u589E\u52A0\u6392\u540D\u5217'
              )
            )
          )
        ));

        // content.push(
        //   <Row className="eChartSetting_Content" colCount={12}>
        //     <Col span={2} className="eChartSetting_ContentCol1" ><div className="eChartSetright-title">排名列名称</div></Col>
        //     <Col span={10} className="eChartSetting_ContentCol2" >
        //       <Input
        //         placeholder="请输入"
        //         value={_.get(config, "yySetting.indexCol.caption")}
        //         onChange={(e) => this.setEChartConfigValue("yySetting.indexCol.caption", e.target.value, false, false)}
        //       />
        //     </Col>
        //   </Row>);
        // content.push(
        //   <Row className="eChartSetting_Content" colCount={12}>
        //     <Col span={2} className="eChartSetting_ContentCol1" >排名信息</Col>
        //     <Col span={10} className="eChartSetting_ContentCol2" >
        //       <Checkbox
        //         checked={yySetting.orderInfo.includeSelf ? true : false}
        //         onChange={(e) => this.setEChartConfigValue("yySetting.orderInfo.includeSelf", e.target.checked ? true : false)}>
        //         排名是否包括当前店铺/区域
        //       </Checkbox>

        //     </Col>
        //   </Row>);
      }
      content.push(_react2.default.createElement(
        _basic.Row,
        { className: 'eChartSetting_Content', colCount: 12 },
        _react2.default.createElement(
          _basic.Col,
          { span: 2, className: 'eChartSetting_ContentCol1' },
          _react2.default.createElement('i', { className: 'anticon anticon-star' }),
          ' \u4E3B\u7EF4\u5EA6'
        ),
        _react2.default.createElement(
          _basic.Col,
          { span: 10, className: 'eChartSetting_ContentCol2' },
          _react2.default.createElement(
            'div',
            { className: 'eChartSetting_ContentCol21' },
            '\u6700\u591A',
            _react2.default.createElement(
              'span',
              null,
              '3'
            ),
            '\u9879\uFF0C\u52FE\u9009\u591A\u4E2A\u4E3B\u7EF4\u5EA6\u5C06\u7528"/"\u62FC\u63A5\u663E\u793A'
          ),
          _react2.default.createElement(
            'div',
            { className: 'eChartSetting_ContentCol22' },
            dimensionXContent
          )
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { className: 'eChartSetting_Errors' },
        _.isEmpty(errors.dimensionX) ? "" : _react2.default.createElement(
          'div',
          null,
          errors.dimensionX
        ),
        ' '
      ));

      if (type == "line" || type == "bar" || type == "barline") {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetright-title' },
              '\u663E\u793A\u89D2\u5EA6'
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(_antd.Input, {
              placeholder: '\u8BF7\u8F93\u5165',
              value: _.get(config, "eChartSetting.xAxis.axisLabel.rotate"),
              onChange: function onChange(e) {
                return _this2.setEChartConfigValue("eChartSetting.xAxis.axisLabel.rotate", e.target.value, true, true);
              },
              className: 'eChart-set-radioinput'
            })
          )
        ));
        // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.rotate) ? "" : errors.rotate}</div> </Row>);
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.rotate) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.rotate
          ),
          ' '
        ));
      }
      if (type == "line" || type == "bar") {

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            '\u8F85\u7EF4\u5EA6'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol21' },
              '\u9009\u9879\u4E0E\u4E3B\u7EF4\u5EA6\u4E92\u65A5'
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol22' },
              dimensionSubContent
            )
          )
        ));
        // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.dimensionSub) ? "" : errors.dimensionSub}</div> </Row>);
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.dimensionSub) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.dimensionSub
          ),
          ' '
        ));
      }
      if (type == "pie" || type == "bar" || type == "line") {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            ' \u5C55\u793A\u6307\u6807'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol21' },
              '\u6709\u8F85\u7EF4\u5EA6\u652F\u6301\u5355\u9009\uFF0C\u65E0\u8F85\u7EF4\u5EA6\u652F\u6301\u591A\u9009\uFF0C\u6700\u591A\u9009\u62E9',
              _react2.default.createElement(
                'span',
                null,
                '5'
              ),
              '\u9879'
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol22' },
              measureContent
            )
          )
        ));
        // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.measure) ? "" : errors.measure}</div> </Row>);
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.measure) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.measure
          ),
          ' '
        ));
      } else if (type == "scatter") {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            ' \u5C55\u793A\u6307\u6807'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol21' },
              ' \u8BF7\u9009\u62E9',
              _react2.default.createElement(
                'span',
                null,
                '1'
              ),
              '\u9879'
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol22' },
              measureContent
            )
          )
        ));
        // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.measure) ? "" : errors.measure}</div> </Row>);
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.measure) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.measure
          ),
          ' '
        ));
      } else if (type == "ranktable") {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            ' \u5C55\u793A\u6307\u6807'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol21' },
              '\u652F\u6301\u591A\u9009\uFF0C\u6700\u591A\u9009\u62E9',
              _react2.default.createElement(
                'span',
                null,
                '3'
              ),
              '\u9879'
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol22' },
              measureContentRankTable
            )
          )
        ));
        // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.measure) ? "" : errors.measure}</div> </Row>);
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.measure) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.measure
          ),
          ' '
        ));
      } else if (type == "barline") {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u5DE6\u4FA7Y\u8F74'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol23' },
              _react2.default.createElement(
                _antd.Radio,
                { checked: _.get(config, "yySetting.yAxis.yAxisIndexType0") == "bar" ? true : false, onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.yAxis.yAxisIndexType0", e.target.checked ? "bar" : "line");
                  } },
                '\u67F1\u72B6\u5C55\u73B0'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { checked: _.get(config, "yySetting.yAxis.yAxisIndexType0") == "line" ? true : false, onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.yAxis.yAxisIndexType0", e.target.checked ? "line" : "bar");
                  } },
                '\u6298\u7EBF\u5C55\u73B0'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol21 margintop5' },
              '\u5C55\u793A\u6307\u6807\u652F\u6301\u591A\u9009\uFF0C\u6700\u591A\u5171\u9009\u62E9',
              _react2.default.createElement(
                'span',
                null,
                '10'
              ),
              '\u9879'
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol22' },
              measureContent0
            )
          )
        ));
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.measure0) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.measure0
          ),
          ' '
        ));

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u53F3\u4FA7Y\u8F74'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol23' },
              _react2.default.createElement(
                _antd.Radio,
                { checked: _.get(config, "yySetting.yAxis.yAxisIndexType1") == "bar" ? true : false, onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.yAxis.yAxisIndexType1", e.target.checked ? "bar" : "line");
                  } },
                '\u67F1\u72B6\u5C55\u73B0'
              ),
              _react2.default.createElement(
                _antd.Radio,
                { checked: _.get(config, "yySetting.yAxis.yAxisIndexType1") == "line" ? true : false, onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.yAxis.yAxisIndexType1", e.target.checked ? "line" : "bar");
                  } },
                '\u6298\u7EBF\u5C55\u73B0'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol21 margintop5' },
              '\u5C55\u793A\u6307\u6807\u652F\u6301\u591A\u9009\uFF0C\u6700\u591A\u5171\u9009\u62E9',
              _react2.default.createElement(
                'span',
                null,
                '10'
              ),
              '\u9879'
            ),
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol22' },
              measureContent1
            )
          )
        ));
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.measure1) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.measure1
          ),
          ' '
        ));
      }
      if (!(type == "pie" && yySetting.isSingleValue == true)) {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            '\u6392\u5E8F\u6307\u6807'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            orderFieldContent
          )
        ));
        // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.orderField) ? "" : errors.orderField}</div> </Row>);
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors eChartSetting_Errors_margin' },
          _.isEmpty(errors.orderField) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.orderField
          ),
          ' '
        ));
        var orderBy = _.get(config, "yySetting.orderInfo.orderBy");
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            '\u6392\u5E8F\u65B9\u5F0F'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              _antd.Radio,
              { checked: orderBy == "asc" ? true : false, onChange: function onChange(e) {
                  return _this2.setEChartConfigValue("yySetting.orderInfo.orderBy", e.target.checked ? "asc" : "desc");
                } },
              '\u5347\u5E8F'
            ),
            _react2.default.createElement(
              _antd.Radio,
              { checked: orderBy == "desc" ? true : false, onChange: function onChange(e) {
                  return _this2.setEChartConfigValue("yySetting.orderInfo.orderBy", e.target.checked ? "desc" : "asc");
                } },
              '\u964D\u5E8F'
            )
          )
        ));
        // content.push(<Row className="eChartSetting_Errors"  ><div> {_.isEmpty(errors.orderBy) ? "" : errors.orderBy}</div> </Row>);
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.orderBy) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.orderBy
          ),
          ' '
        ));
      }
      var bUseDimensionXRows = _.get(config, "yySetting.orderInfo.bUseDimensionXRows");
      if (type == "ranktable") {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetright-title' },
              '\u6392\u540D\u884C\u6570'
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSet-mainwnumber' },
              _react2.default.createElement(_antd.Input, {
                disabled: false,
                placeholder: '\u8BF7\u8F93\u51651-999\u6570\u5B57',
                value: _.get(config, "yySetting.orderInfo.topNum"),
                onChange: function onChange(e) {
                  return self.setEChartConfigValue("yySetting.orderInfo.topNum", e.target.value, true, true, 999);
                }, className: 'eChartSetinput'
              })
            )
          )
        ));

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.topNum) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.topNum
          ),
          ' '
        ));
      } else if (!(type == "pie" && yySetting.isSingleValue == true)) {
        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetright-title' },
              '\u6570\u636E\u7B5B\u9009'
            )
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSet-mainwnumber' },
              _react2.default.createElement(
                _antd.Radio,
                { checked: bUseDimensionXRows, onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.orderInfo.bUseDimensionXRows", e.target.checked ? true : false);
                  } },
                '\u4E3B\u7EF4\u5EA6\u884C\u6570'
              ),
              _react2.default.createElement(_antd.Input, {
                disabled: !bUseDimensionXRows,
                placeholder: '\u8BF7\u8F93\u51651-31\u6570\u5B57',
                value: _.get(config, "yySetting.orderInfo.dimensionXRows"),
                onChange: function onChange(e) {
                  return self.setEChartConfigValue("yySetting.orderInfo.dimensionXRows", e.target.value, true, true);
                }, className: 'eChartSetinput'
              })
            ),
            type == "line" ? _react2.default.createElement(
              'div',
              { className: 'eChartSet-mainwnumber2' },
              '  ',
              _react2.default.createElement(
                _antd.Radio,
                { checked: !bUseDimensionXRows, onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.orderInfo.bUseDimensionXRows", e.target.checked ? false : true);
                  } },
                '\u8F85\u7EF4\u5EA6\u884C\u6570'
              ),
              _react2.default.createElement(_antd.Input, {
                placeholder: '\u8BF7\u8F93\u51651-99\u6570\u5B57',
                disabled: bUseDimensionXRows,
                value: _.get(config, "yySetting.orderInfo.dimensionSubRows"),
                onChange: function onChange(e) {
                  return self.setEChartConfigValue("yySetting.orderInfo.dimensionSubRows", e.target.value, true, true);
                }, className: 'eChartSetinput'
              })
            ) : "",
            type == "bar" ? _react2.default.createElement(
              'div',
              { className: 'eChartSet-mainwnumber2' },
              '  ',
              _react2.default.createElement(
                _antd.Radio,
                { checked: !bUseDimensionXRows, onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.orderInfo.bUseDimensionXRows", e.target.checked ? false : true);
                  } },
                '\u8F85\u7EF4\u5EA6\u884C\u6570'
              ),
              _react2.default.createElement(_antd.Input, {
                placeholder: '\u8BF7\u8F93\u51651-5\u6570\u5B57',
                disabled: bUseDimensionXRows,
                value: _.get(config, "yySetting.orderInfo.dimensionSubRows"),
                onChange: function onChange(e) {
                  return self.setEChartConfigValue("yySetting.orderInfo.dimensionSubRows", e.target.value, true, true);
                }, className: 'eChartSetinput'
              })
            ) : ""
          )
        ));

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.dimensionXRows) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.dimensionXRows
          ),
          ' '
        ));
      }
      if (type == "scatter") {
        var symbolConfig = _.get(config, "yySetting.symbolConfig");
        // bShowSymbolBySize: true,//通过圆圈大小显示不同数量
        // symbolCommonSize: 10,//bShowSymbolBySize=false时的圆圈大小
        // symbolMaxSize: 20,
        // symbolMinSize: 2,
        // bShowSymbolByColor: true,//通过颜色不同显示不同数量
        // bShowEffect: true,//是否用带有涟漪特效动画的气泡（气泡）图将某些想要突出的数据进行视觉突出。
        // effectQty: 3//带有涟漪特效动画的气泡个数

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Content', colCount: 12 },
          _react2.default.createElement(
            _basic.Col,
            { span: 2, className: 'eChartSetting_ContentCol1' },
            _react2.default.createElement('i', { className: 'anticon anticon-star' }),
            '\u5730\u56FE\u663E\u793A'
          ),
          _react2.default.createElement(
            _basic.Col,
            { span: 10, className: 'eChartSetting_ContentCol2' },
            _react2.default.createElement(
              'div',
              { className: 'eChartSetting_ContentCol23' },
              _react2.default.createElement(
                _antd.Checkbox,
                {
                  checked: symbolConfig.bShowSymbolBySize
                  // disabled={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
                  , onChange: function onChange(e) {
                    return self.setEChartConfigValue("yySetting.symbolConfig.bShowSymbolBySize", e.target.checked, false);
                  } },
                '\u901A\u8FC7\u6C14\u6CE1\u5927\u5C0F\u663E\u793A\u6570\u91CF\u4FE1\u606F'
              ),
              _react2.default.createElement(
                _antd.Checkbox,
                {
                  checked: symbolConfig.bShowSymbolByColor
                  // disabled={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
                  , onChange: function onChange(e) {
                    return self.setEChartConfigValue("yySetting.symbolConfig.bShowSymbolByColor", e.target.checked, false);
                  } },
                '\u901A\u8FC7\u989C\u8272\u6DF1\u6D45\u663E\u793A\u6570\u91CF\u4FE1\u606F'
              ),
              _react2.default.createElement(
                'div',
                { className: 'lianyi-Special' },
                _react2.default.createElement(
                  _antd.Checkbox,
                  {
                    checked: symbolConfig.bShowEffect
                    // disabled={dimensionSubFields.indexOf(item.fieldname) >= 0 ? true : false}
                    , onChange: function onChange(e) {
                      return self.setEChartConfigValue("yySetting.symbolConfig.bShowEffect", e.target.checked, false);
                    } },
                  '\u524D'
                ),
                _react2.default.createElement(_antd.Input, {
                  placeholder: '\u8BF7\u8F93\u5165\u6D9F\u6F2A\u7279\u6548\u4E2A\u6570',
                  disabled: symbolConfig.bShowEffect == false,
                  value: _.get(config, "yySetting.symbolConfig.effectQty"),
                  onChange: function onChange(e) {
                    return _this2.setEChartConfigValue("yySetting.symbolConfig.effectQty", e.target.value, true, true);
                  }
                }),
                _react2.default.createElement(
                  'span',
                  null,
                  '\u540D\u4F7F\u7528\u6D9F\u6F2A\u7279\u6548'
                )
              )
            )
          )
        ));

        content.push(_react2.default.createElement(
          _basic.Row,
          { className: 'eChartSetting_Errors' },
          _.isEmpty(errors.effectQty) ? "" : _react2.default.createElement(
            'div',
            null,
            errors.effectQty
          ),
          ' '
        ));
      }
      return content;
    }
  }, {
    key: 'setFocus',
    value: function setFocus() {
      setTimeout(function () {
        var input = undefined;
        input = document.getElementById('id_Title');
        if (input) {
          input.focus();
          // input.blur();
        }
      });
    }
  }, {
    key: 'dimensionXFieldsChecked',
    value: function dimensionXFieldsChecked(item, bCheck, iLabelOrder) {
      var _props3 = this.props,
          groupConditionState = _props3.groupConditionState,
          groupConditionRedux = _props3.groupConditionRedux;

      var ele = {};
      ele.codeField = item.fieldname;
      ele.nameField = item.fieldname;
      if (bCheck == true) {
        //item  {"fieldname":"fDiscount","groupType":3,"caption":"折扣额","sumType":"sum"}
        ele.bLabel = true;
        ele.iLabelOrder = iLabelOrder;
        ele.caption = item.caption;
        ele.groupType = item.groupType;
        ele.depends = item.depends;
      }
      groupConditionRedux.eChartSetting_DimensionXFieldsChecked(this.getBillNum(), this.state.chartKey, bCheck, ele);
    }
  }, {
    key: 'dimensionSubFieldsChecked',
    value: function dimensionSubFieldsChecked(item, bCheck, iLabelOrder) {
      var config = this.getChart();
      var type = _.get(config, "yySetting.type");
      var subType = _.get(config, "yySetting.subType");

      var _props4 = this.props,
          groupConditionState = _props4.groupConditionState,
          groupConditionRedux = _props4.groupConditionRedux;

      var ele = {};
      ele.codeField = item.fieldname;
      ele.nameField = item.fieldname;
      if (bCheck == true) {
        //item  {"fieldname":"fDiscount","groupType":3,"caption":"折扣额","sumType":"sum"}
        //ele  codeField: "store_code", nameField: "store_name", caption: "门店", stack: true
        ele.caption = item.caption;
        ele.groupType = item.groupType;
        ele.depends = item.depends;
        if (type == "line" || type == "bar") ele.stack = "";
        if (type == "line") ele.smooth = true;
      }
      groupConditionRedux.eChartSetting_DimensionSubFieldsChecked(this.getBillNum(), this.state.chartKey, bCheck, ele);
    }
  }, {
    key: 'measureFieldsValueChanged',
    value: function measureFieldsValueChanged(type, valueField, fieldname, fieldValue) {
      var _props5 = this.props,
          groupConditionState = _props5.groupConditionState,
          groupConditionRedux = _props5.groupConditionRedux;

      groupConditionRedux.eChartSetting_MeasureFieldsValueChanged(this.getBillNum(), this.state.chartKey, valueField, fieldname, fieldValue);
      // type, item.fieldname,"bShowValueNotBar", e.target.checked
    }
  }, {
    key: 'measureFieldsChecked',
    value: function measureFieldsChecked(type, item, bCheck, iLabelOrder, yAxisIndex) {
      var _props6 = this.props,
          groupConditionState = _props6.groupConditionState,
          groupConditionRedux = _props6.groupConditionRedux;

      var ele = {};
      ele.valueField = item.fieldname;
      ele.groupType = item.groupType;
      ele.depends = item.depends;
      if (type == "ranktable") {
        ele.bShowValueNotBar = true;
        ele.bShowValueAfterBar = false;
      }
      if (type == "barline") {
        if (yAxisIndex === 0 || yAxisIndex === 1) {
          ele.yAxisIndex = yAxisIndex;
        }
      }
      if (bCheck == true) {
        //item  {"fieldname":"fDiscount","groupType":3,"caption":"折扣额","sumType":"sum"}
        //ele  { valueField: "fNetMoney", caption: "销售净额", stack: "累计" },
        ele.caption = item.caption;
        ele.stack = "";
      }
      groupConditionRedux.eChartSetting_MeasureFieldsChecked(this.getBillNum(), this.state.chartKey, bCheck, ele);
    }
  }, {
    key: 'setScatterMapInfo',
    value: function setScatterMapInfo(key) {
      var _props7 = this.props,
          groupConditionState = _props7.groupConditionState,
          groupConditionRedux = _props7.groupConditionRedux;

      var ele = eChartCommon.getMapProvinceArr(key);
      // let importKey
      // geoMapKey
      if (ele) {
        groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "yySetting.key", key);
        groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "yySetting.importKey", ele.importKey);
        groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, "eChartSetting.geo.map", ele.geoMapKey);
      }
    }
  }, {
    key: 'setEChartConfigValue',
    value: function setEChartConfigValue(fieldPath, fieldValue, bCheckNumber, bInterger, maxVal) {
      var _props8 = this.props,
          groupConditionState = _props8.groupConditionState,
          groupConditionRedux = _props8.groupConditionRedux;

      maxVal = maxVal ? maxVal : 100;
      if (bCheckNumber && fieldValue.trim() != "") {
        if (isNaN(fieldValue) == true || Number(fieldValue) < 0 || Number(fieldValue) > maxVal) {
          groupConditionRedux.eChartSetting_ReturnNothing();
          return;
        }
        if (bInterger == true && fieldValue.indexOf(".") >= 0) {
          fieldValue = fieldValue.substring(0, fieldValue.indexOf("."));
          // if (typeof obj === 'number' && obj % 1 === 0)
          // if (fieldValue % 1 !== 0) {
          //   groupConditionRedux.eChartSetting_ReturnNothing();
          //   return;
          // }
        }
      }
      groupConditionRedux.eChartSetting_SetEChartConfigValue(this.getBillNum(), this.state.chartKey, fieldPath, fieldValue);
    }
  }, {
    key: 'getChartTypeList',
    value: function getChartTypeList() {
      var _props9 = this.props,
          groupConditionState = _props9.groupConditionState,
          groupConditionRedux = _props9.groupConditionRedux;

      var self = this;
      var config = this.getChart();
      var type = _.get(config, "yySetting.type");
      var subType = _.get(config, "yySetting.subType");
      var content = [];

      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "bar" && subType == "1" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("bar", "1");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'zhuxingtu', className: "icon-zhuxingtu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u67F1\u5F62\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "bar" && subType == "3" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("bar", "3");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'tiaoxingtu', className: "icon-tiaoxingtu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u6761\u5F62\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "line" && subType == "2" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("line", "2");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'quxiantu', className: "icon-quxiantu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u66F2\u7EBF\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "line" && subType == "1" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("line", "1");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'zhexiantu', className: "icon-zhexiantu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u6298\u7EBF\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "bar" && subType == "2" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("bar", "2");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'duidiezhuxingtu', className: "icon-duidiezhuxingtu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u5806\u53E0\u67F1\u5F62\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "bar" && subType == "4" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("bar", "4");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'duidietiaoxingtu', className: "icon-duidietiaoxingtu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u5806\u53E0\u6761\u5F62\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "pie" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("pie", "");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'bingxingtu', className: "icon-bingxingtu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u997C\u5F62\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "scatter" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("scatter", "");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'sandiantu', className: "icon-sandiantu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u6C14\u6CE1\u56FE'
        )
      ));
      content.push(_react2.default.createElement(
        _basic.Row,
        { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "barline" ? '_Selected' : ''), onClick: function onClick() {
            return self.chooseChart("barline", "");
          } },
        ' ',
        _react2.default.createElement(_SvgIcon2.default, { type: 'zhuzhetu', className: "icon-zhuzhetu" }),
        _react2.default.createElement(
          'div',
          null,
          '\u67F1\u6298\u56FE'
        )
      ));
      if (groupConditionState[this.state.billnum].editCondition.isMobile === false) {
        content.push(_react2.default.createElement(
          _basic.Row,
          { style: { cursor: "pointer" }, className: "eChartSetting_ChartType" + (type == "ranktable" ? '_Selected' : ''), onClick: function onClick() {
              return self.chooseChart("ranktable", "");
            } },
          ' ',
          _react2.default.createElement(_SvgIcon2.default, { type: 'paimingbiao', className: "icon-paimingbiao" }),
          _react2.default.createElement(
            'div',
            null,
            '\u6392\u540D\u8868'
          )
        ));
      }
      return content;
    }
  }, {
    key: 'chooseChart',
    value: function chooseChart(eChartType, eChartSubType, bAddNewToArr) {
      var _props10 = this.props,
          groupConditionState = _props10.groupConditionState,
          groupConditionRedux = _props10.groupConditionRedux;

      var configTemplate = eChartCommon.getEChartConfig_Template(eChartType, eChartSubType, this.state.chartKey);
      if (eChartType == "scatter") {
        this.SetTreeModel(configTemplate);
        var reportFields = this.state.reportFields;
        if (_.find(reportFields, function (o) {
          return o.fieldname == "longitude";
        })) configTemplate.yySetting.dataField.LngAndLat.longitude.longitudeField = "longitude";
        if (_.find(reportFields, function (o) {
          return o.fieldname == "latitude";
        })) configTemplate.yySetting.dataField.LngAndLat.latitude.latitudeField = "latitude";
      }
      groupConditionRedux.eChartSetting_ChooseChart(this.getBillNum(), configTemplate, this.state.chartKey, bAddNewToArr);
      this.setFocus();
    }
  }, {
    key: 'getBillNum',
    value: function getBillNum() {
      return this.state.billnum;
    }
  }, {
    key: 'getChart',
    value: function getChart() {
      var curChartKey = this.state.chartKey;
      var _props11 = this.props,
          groupConditionState = _props11.groupConditionState,
          groupConditionRedux = _props11.groupConditionRedux;

      var config = groupConditionState[this.state.billnum].eChart.eChartConfig;
      if (config && config.subChartConfigArr) {
        var obj = config.subChartConfigArr.find(function (x) {
          return x.chartKey == curChartKey;
        });
        return obj;
      } else {
        return groupConditionState[this.state.billnum].eChart.eChartConfig[curChartKey];
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var preValue = this.props.groupConditionState[this.state.billnum].bShowEChartSetting;
      var nextValue = nextProps.groupConditionState[this.state.billnum].bShowEChartSetting;
      if (nextValue == false) return false;else return true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }]);

  return EChartDesign;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    groupConditionState: state.groupCondition.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    groupConditionRedux: (0, _redux.bindActionCreators)(groupConditionRedux, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EChartDesign);