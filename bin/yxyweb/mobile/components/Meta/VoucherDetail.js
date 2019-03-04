'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _Stepper = require('../common/Stepper');

var _Stepper2 = _interopRequireDefault(_Stepper);

var _util = require('../../../common/helpers/util');

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _scan = require('../BasicComponents/scan');

var _scan2 = _interopRequireDefault(_scan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../../../mobile/styles/globalCss/vouchDetail.css');

var VoucherDetail = function (_Component) {
  _inherits(VoucherDetail, _Component);

  function VoucherDetail(props) {
    _classCallCheck(this, VoucherDetail);

    var _this = _possibleConstructorReturn(this, (VoucherDetail.__proto__ || Object.getPrototypeOf(VoucherDetail)).call(this, props));

    _initialiseProps.call(_this);

    var pathList = window.location.pathname.split('/');
    var pathname = pathList[pathList.length - 1];
    if (pathname === 'MYH04') {
      cb.utils.setStatusBarStyle("dark");
    } else {
      cb.utils.setStatusBarStyle("light");
    }
    _this.meta = props.meta;
    _this.vm = props.model;
    var _this$meta = _this.meta,
        cStyle = _this$meta.cStyle,
        containers = _this$meta.containers,
        childrenField = _this$meta.childrenField;

    _this.model = _this.vm.get(childrenField);
    var columns = {};
    if (!cStyle || cStyle == '') {
      cStyle = null;
    } else {
      try {
        _this.cStyle = JSON.parse(cStyle);
        if (containers) {
          containers.map(function (container) {
            if (container.controls) {
              columns[container.cGroupCode] = {};
              container.controls.forEach(function (column) {
                columns[[container.cGroupCode]][column.cItemName] = column;
              });
            }
          });
        }
      } catch (e) {
        cb.utils.alert('格式化字段，预制错误！', 'error');
      }
      _this.state = {
        dataSource: [],
        columns: columns,
        referField: "productsku_cCode",
        hgtNum: 0,
        disabledScan: true
      };
    }
    return _this;
  }

  _createClass(VoucherDetail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.model) this.model.addListener(this);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.model) {
        this.model.removeListener(this);
      }
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var columns = this.state.columns;
      if (params.columnMode === 'local' && columns) {
        for (var attr in columns) {
          Object.assign(columns[attr], params.columns[attr]);
        }params.columns = columns;
      }
      if (params.rows && params.rows.length) this.setDataSource(params.rows);
      this.setState({ columns: params.columns, readOnly: params.readOnly });
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(data) {
      var hgtNum = 0;
      if (data.length > 3) {
        hgtNum = 3;
      } else {
        hgtNum = data.length;
      }
      this.setState({ dataSource: data, hgtNum: hgtNum });
    }
  }, {
    key: 'setReadOnly',
    value: function setReadOnly(readOnly) {
      this.setState({ readOnly: readOnly });
    }
    //单元格数据改变事件

  }, {
    key: 'getTools',
    value: function getTools(hasData) {
      var _this2 = this;

      var tools = [];
      var dataSource = this.state.dataSource;
      var _meta = this.meta,
          cStyle = _meta.cStyle,
          containers = _meta.containers,
          childrenField = _meta.childrenField;

      containers.map(function (item) {
        if (item.cGroupCode === 'DetailToolbar_m') {
          item.controls && item.controls.map(function (citem) {
            tools.push(hasData ? _react2.default.createElement(
              'div',
              { className: 'DetailToolbar_m' },
              _react2.default.createElement(_SvgIcon2.default, { type: citem.icon ? citem.icon : "review", style: { width: '0.42rem', height: '0.42rem' },
                onClick: function onClick() {
                  return _this2.btnAction(citem, dataSource && dataSource.length);
                }
              })
            ) : _react2.default.createElement(
              'div',
              { className: 'DetailToolbar_m title_button' },
              _react2.default.createElement(_SvgIcon2.default, { type: citem.icon ? citem.icon : "review", style: { width: '0.42rem', height: '0.42rem' },
                onClick: function onClick() {
                  return _this2.btnAction(citem, dataSource && dataSource.length);
                }
              }),
              _react2.default.createElement(
                'span',
                null,
                citem.cShowCaption
              )
            ));
          });
        } else {}
      });
      return tools;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var disabledScan = this.state.disabledScan;

      var control = this.getDetailControl();
      var hgtNum = parseInt(this.state.hgtNum);
      var hasData = hgtNum > 0 ? true : false;
      var mode = this.props.model && this.props.model.getParams().mode;
      return _react2.default.createElement(
        'div',
        { className: 'voucher-body-mobile' },
        _react2.default.createElement(
          'div',
          { className: 'VoucherDetail', style: { height: hgtNum * 2.2 + 'rem' } },
          mode !== 'browse' && _react2.default.createElement(
            'div',
            { className: 'voucherDetail-title' },
            hasData ? this.meta.cName : null,
            _react2.default.createElement(
              'div',
              { className: hasData ? 'right-button' : 'center-button' },
              this.getTools(hasData)
            )
          ),
          control
        ),
        _react2.default.createElement(
          'div',
          { className: 'more', style: { display: control.length > 3 ? 'block' : 'none' }, onClick: function onClick() {
              _this3.setState({ hgtNum: hgtNum === control.length ? 3 : control.length });
            } },
          _react2.default.createElement(
            'p',
            null,
            hgtNum === control.length ? _react2.default.createElement(
              'span',
              null,
              '\u6536\u8D77',
              _react2.default.createElement('i', { className: 'icon icon-shouqi' })
            ) : _react2.default.createElement(
              'span',
              null,
              '\u5C55\u5F00\u5269\u4F59',
              control.length - 3,
              '\u4EF6\u5546\u54C1',
              _react2.default.createElement('i', { className: 'icon icon-zhakai' })
            ),
            ' '
          )
        ),
        !disabledScan && _react2.default.createElement(_scan2.default, { vm: this.vm, close: this.onCloseScan })
      );
    }
  }]);

  return VoucherDetail;
}(_react.Component);

VoucherDetail.contextTypes = {
  router: _propTypes2.default.object.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.setCellValue = function (data) {
    var dataSource = _this4.state.dataSource;
    if (dataSource[data.rowIndex]) {
      dataSource[data.rowIndex][data.cellName] = data.value;
      _this4.setState({ dataSource: dataSource });
    }
  };

  this.getBaseControl = function (columns, rowData, showCaption, index) {
    var controls = [];
    for (var key in columns) {
      var _columns$key = columns[key],
          cShowCaption = _columns$key.cShowCaption,
          iAlign = _columns$key.iAlign,
          cStyle = _columns$key.cStyle,
          cItemName = _columns$key.cItemName;

      var className = 'cell',
          colControls = [],
          align = '';
      var itemValue = _this4.getFormatValue(columns[key], rowData[cItemName], rowData, index);

      if (showCaption && !cb.utils.isEmpty(cShowCaption)) {
        colControls.push(_react2.default.createElement(
          'span',
          { className: 'name' },
          cShowCaption
        ));
        colControls.push(_react2.default.createElement(
          'span',
          { className: 'value' },
          itemValue
        ));
      } else {
        colControls.push(_react2.default.createElement(
          'span',
          { className: 'value' },
          itemValue
        ));
      }

      try {
        if (cStyle == null || cStyle == "") {
          cStyle = null;
        } else {
          cStyle = JSON.parse(cStyle);
        }
      } catch (e) {
        cb.utils.alert('格式化字段，预制错误！', 'error');
      }
      if (cStyle) {
        if (cStyle.className) className = className + ' ' + cStyle.className;
      }
      if (iAlign) {
        if (iAlign == 1) align = 'textAlignLeft';
        if (iAlign == 2) align = 'textAlignCenter';
        if (iAlign == 3) align = 'textAlignRight';
      } else {
        align = 'textAlignLeft';
      }
      className = className + ' ' + align;
      controls.push(_react2.default.createElement(
        'div',
        { className: className },
        colControls
      ));
    }
    return controls;
  };

  this.getFormatValue = function (col, value, rowData, rowIndex) {
    var cControlType = col.cControlType && col.cControlType.trim().toLocaleLowerCase();
    var cStyle = col.cStyle;
    try {
      if (!cStyle || cStyle == '') {
        cStyle = {};
      } else {
        cStyle = JSON.parse(cStyle);
      }
    } catch (e) {
      cb.utils.alert('cStyle，预制错误！', 'error');
    }
    var rangeValue = cStyle.rangeValue;
    switch (cControlType) {
      case 'select':
        if (value == null || value == '') return '';
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.text : value;
      case 'inputnumber':
      case 'money':
      case 'price':
      case 'stepper':
        if (cb.utils.isEmpty(value)) return '';
        if (isNaN(value)) return value;

        if (cControlType == 'stepper' && !_this4.state.readOnly) return _react2.default.createElement(_Stepper2.default, { value: parseFloat(value), min: 1, showNumber: true, onChange: function onChange(val) {
            return _this4.onStepChange(val, col.cItemName, rowIndex);
          } });
        /*谓词变量支持系统参数*/
        var cFormatData = col.cFormatData;
        try {
          if (!cFormatData || cFormatData == '') {
            cFormatData = {};
          } else {
            cFormatData = JSON.parse(cFormatData);
          }
        } catch (e) {
          cb.utils.alert('数量/金额/单价，预制错误！', 'error');
        }
        var iNumPoint = col.iNumPoint;
        var decimal = cFormatData.decimal ? (0, _util.getPredicateValue)(cFormatData.decimal) : null;
        if (cControlType === 'money') {
          if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.amountofdecimal;
        } else if (cControlType === 'price') {
          if (decimal) iNumPoint = decimal;else iNumPoint = cb.rest.AppContext.option.monovalentdecimal;
        } else {
          if (decimal) iNumPoint = decimal;else if (iNumPoint == null || iNumPoint == '') iNumPoint = null;
        }

        if (!isNaN(iNumPoint) && iNumPoint != null) {
          value = parseFloat(value);
          value = (0, _util.getRoundValue)(value, iNumPoint);
        }

        if (cFormatData.after) value = value + cFormatData.after;

        if (cFormatData.prefix) {
          if (cControlType === 'price' || cControlType === 'money') value = _react2.default.createElement(
            'div',
            { className: 'moneyText' },
            _react2.default.createElement(
              'span',
              { className: 'prefix' },
              cFormatData.prefix
            ),
            value
          );else value = cFormatData.prefix + value;
        }
        return value;
      case 'composite':
        if (rangeValue) {
          rangeValue = rangeValue.split(',');
          value = "";
          rangeValue.map(function (item) {
            if (!cb.utils.isEmpty(rowData[item])) value = value + " " + rowData[item];
          });
        }
        return value;
      case "icontext":
        // return <div className={cStyle.className}><Icon type={cStyle.icon} />{value}</div>;
        return _react2.default.createElement(
          'div',
          { className: cStyle.className },
          _react2.default.createElement(_SvgIcon2.default, { type: 'ying' }),
          value
        );
      case "picture":
        if (rangeValue) {
          rangeValue = rangeValue.split(',');
          value = "";
          rangeValue.map(function (item) {
            if (!cb.utils.isEmpty(rowData[item])) {
              value = value + rowData[item];
            }
          });
          value = "http://7xr7bp.com1.z0.glb.clouddn.com" + value;
        }
        return value != "http://7xr7bp.com1.z0.glb.clouddn.com" ? _react2.default.createElement('img', { src: value }) : _react2.default.createElement(
          'div',
          { className: 'default-pic' },
          ' ',
          _react2.default.createElement(_antdMobile.Icon, { type: 'icon-morentupiancopy' })
        );
      default:
        return value;
    }
  };

  this.onStepChange = function (val, columnKey, index) {
    _this4.model.setCellValue(index, columnKey, val, true);
  };

  this.loopRow = function (rows, columns, rowData, index) {
    if (!rows) return null;
    var rowControls = [],
        className = "row";
    rows.map(function (row) {
      var control = void 0;
      if (row.cols) control = _this4.loopCol(row.cols, columns, rowData, index);else control = _this4.getBaseControl(columns[row.key], rowData, false, index);
      if (row.className) className = 'row  ' + row.className;else className = 'row  ' + row.key;
      rowControls.push(_react2.default.createElement(
        'div',
        { className: className },
        control
      ));
    });
    return rowControls;
  };

  this.loopCol = function (cols, columns, rowData, index) {
    if (!cols) return null;
    var controls = [];
    cols.map(function (col) {
      var control = void 0,
          className = 'col';
      if (col.rows) {
        control = _this4.loopRow(col.rows, columns, rowData, index);
      } else {
        control = _this4.getBaseControl(columns[col.key], rowData, false, index);
      }
      if (col.className) className = 'col  ' + col.className;else className = 'col  ' + col.key;
      controls.push(_react2.default.createElement(
        'div',
        { className: className },
        control
      ));
    });
    return controls;
  };

  this.getRowTools = function (index) {
    var toolBars = [{
      text: ' ',
      onPress: function onPress() {
        return _this4.onClick(index, 'edit');
      },
      style: { backgroundColor: '#ddd', color: 'white' },
      className: "inrow-action-edit"
    }];
    var _meta2 = _this4.meta,
        cStyle = _meta2.cStyle,
        containers = _meta2.containers,
        childrenField = _meta2.childrenField;

    containers.map(function (item) {
      if (item.cGroupCode === 'DetailRowToolbar_m') {
        item.controls && item.controls.map(function (citem) {
          toolBars.push({
            text: ' ',
            onPress: function onPress() {
              return _this4.btnAction(citem, index);
            },
            style: { backgroundColor: '#ddd', color: 'white' },
            className: "inrow-action-" + (citem.icon || 'delete')
          });
        });
      }
    });
    return toolBars;
  };

  this.btnAction = function (item, index) {
    if (item.cItemName === 'scan') {
      _this4.setState({ disabledScan: false });
      return;
    }
    var params = { index: index, cItemName: item.cItemName };
    if (item.cItemName === 'addProduct') {
      var pathList = window.location.pathname.split('/');
      var pathname = pathList[pathList.length - 1];
      _this4.context.router.history.push('/voucherRefer/' + pathname + '/' + _this4.state.referField + '/' + _this4.meta.childrenField);
      _this4.model.appendRow({});
    } else {
      _this4.props.model.get(item.cItemName).fireEvent('click', params);
    }
  };

  this.scanBarBtn = function (controls) {
    var buttons = [],
        models = [];
    if (_this4.headerToolbar) {
      _this4.headerToolbar.map(function (control) {
        var model = _this4.props.viewModel.get(control.cItemName);
        models.push(model);
        buttons.push({
          icon: _react2.default.createElement(Button, { model: model, icon: _react2.default.createElement(_SvgIcon2.default, { type: control.icon ? control.icon : "review" }), onVisibleChange: function onVisibleChange(visible) {
              return _this4.handleHeaderVisibleChange(control.cItemName, visible);
            } }),
          title: control.cShowCaption // <Button model={model} onVisibleChange={visible => this.handleHeaderVisibleChange(control.cItemName, visible)} />
          // <span className='print_cls' onClick={() => { model.fireEvent('click') }}>{control.cShowCaption}</span>
        });
      });
    }
    ActionSheet.showShareActionSheetWithOptions({
      options: buttons
    }, function (buttonIndex) {
      if (models[buttonIndex]) models[buttonIndex].fireEvent('click');
    });
  };

  this.getRowControl = function (rowData, columns, index) {
    var controls = [];
    var mode = _this4.props.model && _this4.props.model.getParams().mode;
    if (!_this4.cStyle) {
      for (var key in columns) {
        controls.push(_react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'span',
            { className: 'value' },
            rowData[key]
          )
        ));
      }
    } else {
      _this4.cStyle.map(function (row) {
        var rowControl = [];
        if (row.cols) {
          rowControl = _this4.loopCol(row.cols, columns, rowData, index);
        } else {
          rowControl = _this4.getBaseControl(columns[row.key], rowData, true, index);
        }
        controls.push(_react2.default.createElement(
          'div',
          { className: 'row' },
          rowControl
        ));
      });
    }
    return _react2.default.createElement(
      'div',
      { onClick: function onClick() {
          _this4.state.readOnly ? _this4.onClick(index) : '';
        }, className: 'voucherdetail-row', style: { height: "2.2rem" } },
      mode !== 'browse' ? _react2.default.createElement(
        _antdMobile.SwipeAction,
        { style: { backgroundColor: 'gray' },
          autoClose: true,
          right: _this4.getRowTools(index) },
        controls
      ) : controls
    );
  };

  this.onClick = function (index, action, item) {
    if (_this4.props.model.getParams().mode === 'edit' && action !== 'edit') {
      return;
    }
    _this4.model.setFocusedRowIndex(index);
    var pathList = window.location.pathname.split('/');
    var pathname = pathList[pathList.length - 1];
    if (action) {
      _this4.context.router.history.push({ pathname: '/itemInfo/' + index + '/' + pathname, state: { action: action, item: item } });
    } else {
      _this4.context.router.history.push('/itemInfo/' + index + '/' + pathname);
    }
  };

  this.getDetailControl = function () {
    var _state = _this4.state,
        dataSource = _state.dataSource,
        columns = _state.columns;

    var controls = [];
    dataSource.map(function (data, index) {
      var control = _this4.getRowControl(data, columns, index);
      controls.push(control);
    });
    return controls;
  };

  this.onCloseScan = function () {
    _this4.setState({ disabledScan: true });
  };
};

exports.default = VoucherDetail;