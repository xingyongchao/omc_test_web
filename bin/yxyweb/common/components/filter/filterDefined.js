'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _util = require('../../helpers/util');

var _addDefineditem = require('./addDefineditem');

var _addDefineditem2 = _interopRequireDefault(_addDefineditem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = null;

var FilterDefined = function (_React$Component) {
  _inherits(FilterDefined, _React$Component);

  function FilterDefined(props) {
    _classCallCheck(this, FilterDefined);

    // let {filterId} = this.props;
    var _this = _possibleConstructorReturn(this, (FilterDefined.__proto__ || Object.getPrototypeOf(FilterDefined)).call(this, props));

    _this.onCancel = function (e) {
      _this.setState({ visible: !_this.state.visible });
    };

    Table = require('../basic/table').default;
    _this.viewmodel = _this.props.model;
    _this.state = {
      visible: true,
      addVisible: false,
      gridModel: null,
      dataSource: []
      // this.getSourceData(filterId)  
      // console.log('dataSource',this.state.dataSource)
    };return _this;
  }
  // async getSourceData(filterId){
  //   const config = {
  //     url: 'filterDesign/getCustMetaFilterItems',
  //     method: 'GET',
  //     params: {
  //       filtersId: filterId
  //     }
  //   };
  //   const json = await proxy(config);
  //   if(json.code!==200) return 
  //   json.data && this.setState({dataSource:json.data})
  // }


  _createClass(FilterDefined, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var filterId = this.props.filterId;

      this.showGridmodel(filterId);
    }
  }, {
    key: 'showGridmodel',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filterId) {
        var dataSource, config, json, columns, gridModel;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dataSource = this.state.dataSource;

                console.log('dataSource', dataSource);
                config = {
                  url: 'filterDesign/getCustMetaFilterItems',
                  method: 'GET',
                  params: {
                    filtersId: filterId
                  }
                };
                _context.next = 5;
                return (0, _util.proxy)(config);

              case 5:
                json = _context.sent;

                if (!(json.code !== 200)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return');

              case 8:
                // json.data && this.setState({dataSource:json.data})
                columns = {
                  cCaption: { cItemName: 'name', cShowCaption: '过滤项名称', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
                  cCycle: { cItemName: 'cycle', cShowCaption: '比较符', iColWidth: 200, bHidden: false, bShowIt: true, bCanModify: false, cControlType: 'Input', bMustSelect: true },
                  cStart: { cItemName: 'isStart', cShowCaption: '过滤类型', iColWidth: 150, bHidden: false, bShowIt: true, bCanModify: true, cControlType: 'CheckRadio', bMustSelect: true }
                };
                gridModel = new cb.models.GridModel({
                  columns: columns,
                  independent: true,
                  readOnly: false,
                  showRowNo: true,
                  showCheckBox: false,
                  showAggregates: false,
                  // pagination: true,
                  isDirty: true,
                  showColumnSetting: false

                });

                json.data && this.setState({ dataSource: json.data, gridModel: gridModel });
                console.log('dataSource', json.data);
                gridModel.setDataSource([{ 'name': '123', 'cycle': '12', 'isStart': 1 }]);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function showGridmodel(_x) {
        return _ref.apply(this, arguments);
      }

      return showGridmodel;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var addFilteritem = this.addFilteritem();
      var addVisible = this.state.addVisible;

      var addFilterdefined = addVisible ? _react2.default.createElement(_addDefineditem2.default, { model: this.props.model }) : '';
      return _react2.default.createElement(
        'div',
        { className: 'defined_modal' },
        _react2.default.createElement(
          _antd.Modal,
          { title: '\u81EA\u5B9A\u4E49\u8FC7\u6EE4\u6761\u4EF6\u5217\u8868', visible: this.state.visible, width: '820px', className: 'filter_defined_list',
            onOk: function onOk() {
              return _this2.onCancel();
            }, onCancel: function onCancel() {
              return _this2.onCancel();
            }, okText: '\u786E\u5B9A', cancelText: '\u53D6\u6D88', maskClosable: false
          },
          _react2.default.createElement(
            'div',
            null,
            addFilteritem
          ),
          addFilterdefined
        )
      );
    }
  }, {
    key: 'addFilteritem',
    value: function addFilteritem() {
      var _this3 = this;

      console.log('aaaa');
      var action = {
        "cControlType": "Toolbar",
        "cStyle": "{\"fixedwidth\":150}",
        "controls": [{
          "cItemName": "btnEditRow", "cCaption": "编辑", "iOrder": 34, "cShowCaption": "编辑", "iStyle": 0,
          "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
        }, {
          "cItemName": "btnDeleteRow", "cCaption": "删除", "iOrder": 34, "cShowCaption": "删除", "iStyle": 0,
          "cControlType": "button", "icon": "shanchu1", "childrenField": "purInRecords", "key": "3876626"
        }]
      };
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'filterdefined_addbutton', style: { width: 50, marginLeft: 720, marginTop: -50 } },
          _react2.default.createElement(
            'div',
            { className: 'add_button' },
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', onClick: function onClick() {
                  return _this3.definedItem();
                } },
              '\u65B0\u589E'
            )
          )
        ),
        _react2.default.createElement(Table, { action: action, noViewModel: true, width: 800, height: 441, model: this.state.gridModel })
      );
    }
  }, {
    key: 'definedItem',
    value: function definedItem() {
      this.setState({ addVisible: true, visible: false });
    }
  }]);

  return FilterDefined;
}(_react2.default.Component);

exports.default = FilterDefined;