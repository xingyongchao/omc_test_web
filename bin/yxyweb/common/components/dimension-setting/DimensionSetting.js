'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _input = require('../basic/input');

var _input2 = _interopRequireDefault(_input);

var _InputSearch = require('../common/InputSearch');

var _InputSearch2 = _interopRequireDefault(_InputSearch);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _util = require('../../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = _antd.Radio.Group;

var DimensionSetting = function (_Component) {
  _inherits(DimensionSetting, _Component);

  function DimensionSetting(props) {
    _classCallCheck(this, DimensionSetting);

    var _this = _possibleConstructorReturn(this, (DimensionSetting.__proto__ || Object.getPrototypeOf(DimensionSetting)).call(this, props));

    _this.ShowList = function () {
      _this.setState({ bShowList: !_this.state.bShowList });
    };

    _this.handleCancel = function (e) {
      _this.setState({ bShowCard: false });
    };

    _this.editDimension_SetValue = function (fieldName, fieldValue) {
      var editDimension = _this.state.editDimension;

      editDimension[fieldName] = fieldValue;
      _this.setState({ editDimension: editDimension });
    };

    var viewModel = props.viewModel;

    var _viewModel$getParams = viewModel.getParams(),
        billNo = _viewModel$getParams.billNo;

    _this.initDimensionListValue(billNo);
    _this.state = {
      billnum: billNo,
      bShowCard: false,
      bShowList: false,
      textMouseEnterId: -1,
      currentName: '',
      currentId: '',
      dimensionList: [{ name: "方案001", id: 132, isDefault: true }, { name: "方案002", id: 323 }, { name: "方案003", id: 545 }, { name: "方案004", id: 676 }],
      editDimension: {
        bEdit: false,
        name: "",
        isDefault: false
      }
    };
    return _this;
  }

  _createClass(DimensionSetting, [{
    key: 'initDimensionListValue',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(billNo) {
        var config, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = {
                  url: 'report/getDimensions',
                  method: 'GET',
                  params: {
                    billnum: billNo
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

                cb.utils.alert('获取维度列表失败！' + json.message, 'error');
                return _context.abrupt('return');

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initDimensionListValue(_x) {
        return _ref.apply(this, arguments);
      }

      return initDimensionListValue;
    }()
  }, {
    key: 'getDimensionCardRender',
    value: function getDimensionCardRender() {
      var _this2 = this;

      var editDimension = this.state.editDimension;
      var bEdit = editDimension.bEdit;
      var content = void 0;
      if (this.state.bShowCard == true) {
        var card = void 0;
        card = this.getInnerRender();
        content = _react2.default.createElement(
          _antd.Modal,
          { className: 'crossGroupingModal',
            title: bEdit ? "编辑" : "新增维度导航方案",
            onOk: function onOk(e) {
              return _this2.handleOk(e);
            },
            onCancel: function onCancel(e) {
              return _this2.handleCancel(e);
            },
            visible: true
          },
          card
        );
      }
      return content;
    }
  }, {
    key: 'onTextMouseEnter',
    value: function onTextMouseEnter(bEnter, id) {}
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(bEnter, e, id) {
      var dimensionList = this.state.dimensionList;
      if (dimensionList && dimensionList.length > 0) {
        dimensionList.forEach(function (ele, index) {
          if (ele.id == id) ele.isMouseEnter = bEnter;
        });
      }
      this.setState({ dimensionList: dimensionList });
    }
  }, {
    key: 'getInnerRender',
    value: function getInnerRender() {
      var _this3 = this;

      var editDimension = this.state.editDimension;

      var leftContentCheckBoxs = [];
      leftContentCheckBoxs.push(_react2.default.createElement(
        _row2.default,
        null,
        _react2.default.createElement(
          _antd.Checkbox
          // disabled={bDisabled}
          ,
          null,
          'test1'
        )
      ), _react2.default.createElement(
        _row2.default,
        null,
        _react2.default.createElement(
          _antd.Checkbox
          // disabled={bDisabled}
          ,
          null,
          'test2'
        )
      ));
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _row2.default,
          { colCount: 12, className: 'crosstype' },
          _react2.default.createElement(
            _col2.default,
            { span: 1, className: 'crosstypeName crosstypeline' },
            _react2.default.createElement('i', { className: 'anticon anticon-star nametitlemarginstar' }),
            '\u540D\u79F0'
          ),
          _react2.default.createElement(_col2.default, { span: 1 }),
          _react2.default.createElement(
            _col2.default,
            { span: 4, className: 'crosstypeNameList crossinput' },
            _react2.default.createElement(_antd.Input, { defaultValue: editDimension.name, onChange: function onChange(e) {
                return _this3.editDimension_SetValue("name", e.target.value);
              } }),
            ' '
          ),
          _react2.default.createElement(_col2.default, { span: 1 }),
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'crosscheckbox' },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: editDimension.isDefault, onChange: function onChange(e) {
                  return _this3.editDimension_SetValue("isDefault", e.target.checked);
                } },
              '\u8BBE\u4E3A\u9ED8\u8BA4'
            )
          )
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _row2.default,
          { colCount: 12 },
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'crossadddata' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _row2.default,
                { className: 'crossaddnamemargin' },
                '\u6DFB\u52A0\u6570\u636E\u9879'
              ),
              _react2.default.createElement(
                'div',
                { className: 'crossselectborder' },
                _react2.default.createElement(_InputSearch2.default, { placeholder: '\u8BF7\u8F93\u5165\u5173\u952E\u5B57'
                }),
                _react2.default.createElement(
                  _row2.default,
                  { className: 'crossadddatalist' },
                  leftContentCheckBoxs
                )
              )
            )
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 2, className: 'crossbtncount' },
            _react2.default.createElement(_antd.Button, { className: "icon-right-enabled" }),
            _react2.default.createElement(_antd.Button, { className: "icon-left-enabled" })
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 5, className: 'selecteddata' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _row2.default,
                { className: 'crossaddnamemargin' },
                '\u5DF2\u9009\u6570\u636E\u9879'
              ),
              _react2.default.createElement(
                'div',
                { className: 'groupCondition-SelectedItem' },
                _react2.default.createElement('div', { className: 'groupCondition-SelectedItem-Row2' })
              )
            )
          )
        )
      );
    }
  }, {
    key: 'setDefaultDimension',
    value: function setDefaultDimension(id) {
      var dimensionList = this.state.dimensionList;

      dimensionList.forEach(function (element, index) {});
    }
  }, {
    key: 'getDimensionListRender',
    value: function getDimensionListRender() {
      var _this5 = this;

      var dimensionList = this.state.dimensionList;
      var currentId = this.state.currentId;
      var renderList = [];
      var bAuthAdd = this.state.bAuthAdd;
      var bAuthEdit = this.state.bAuthEdit;
      var bAuthDel = this.state.bAuthDel;
      if (this.state.bIgnoreAuth === true) {
        bAuthAdd = true;
        bAuthEdit = true;
        bAuthDel = true;
      }

      if (dimensionList && dimensionList.length > 0) {
        dimensionList.forEach(function (element, index) {
          var _this4 = this;

          var item = void 0;
          var isChecked = element.id == currentId ? true : false;
          var itemChecked = isChecked ? _react2.default.createElement(
            'span',
            { className: 'groupCondition-Checked' },
            _react2.default.createElement('i', { className: 'anticon icon-xuanzhong1', checked: isChecked }),
            '  '
          ) : _react2.default.createElement(
            'span',
            { className: 'groupCondition-Checked' },
            '  '
          );
          var isDefault = element.isDefault ? element.isDefault : false;
          var itemDefault = isDefault ? _react2.default.createElement(
            'span',
            { className: 'groupCondition-Default' },
            ' ',
            _react2.default.createElement(
              'span',
              { className: 'crossdefault-btn' },
              '\u9ED8\u8BA4'
            ),
            '  '
          ) : _react2.default.createElement(
            'span',
            { className: 'groupCondition-Default' },
            '  '
          );
          var isMouseEnter = element.isMouseEnter ? element.isMouseEnter : false;
          var itemEnter = isMouseEnter ? _react2.default.createElement(
            'span',
            { className: 'groupCondition-MouseEnter' },
            isDefault ? null : _react2.default.createElement(
              'span',
              {
                // onMouseEnter={() => this.onTextMouseEnter(true, 1)}
                // onMouseLeave={() => this.onTextMouseEnter(false, 1)}
                onClick: function onClick() {
                  return _this4.setDefaultDimension(element.id);
                } },
              '\u8BBE\u4E3A\u9ED8\u8BA4'
            ),
            _react2.default.createElement(
              'span',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this4.onTextMouseEnter(true, 2);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this4.onTextMouseEnter(false, 2);
                },
                onClick: function onClick() {
                  return _this4.editConditionInfo(element.id);
                }
                // style={{ display: bAuthEdit == true ? "" : 'none' }}
              },
              '\u8BBE\u7F6E'
            ),
            _react2.default.createElement(
              'span',
              {
                onMouseEnter: function onMouseEnter() {
                  return _this4.onTextMouseEnter(true, 3);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this4.onTextMouseEnter(false, 3);
                },
                onClick: function onClick() {
                  return _this4.deleteCondition(element.id);
                }
                // style={{ display: bAuthDel == true ? "" : 'none' }}
              },
              '\u5220\u9664'
            )
          ) : _react2.default.createElement(
            'span',
            { className: 'groupCondition-MouseEnter' },
            ' '
          );

          item = _react2.default.createElement(
            _row2.default,
            { style: { minHeight: "25px" },
              onMouseEnter: function onMouseEnter(e) {
                return _this4.onMouseEnter(true, e, element.id);
              },
              onMouseLeave: function onMouseLeave(e) {
                return _this4.onMouseEnter(false, e, element.id);
              }
            },
            itemChecked,
            _react2.default.createElement(
              'span',
              { style: { cursor: "pointer" }, onClick: function onClick() {
                  return _this4.chooseDimension(element.id, element.name);
                } },
              ' ',
              element.name
            ),
            itemDefault,
            itemEnter
          );
          renderList.push(item);
        }, this);
      }
      if (renderList.length < 1 && bAuthAdd == false) this.noGroupAndAuth = true;else this.noGroupAndAuth = false;

      return _react2.default.createElement(
        'div',
        { className: "group-add-grouping-count " + (bAuthAdd == false ? "group-add-grouping-count-noauth" : "") },
        _react2.default.createElement(
          'div',
          { style: { overflow: "auto", maxHeight: "258px", paddingBottom: "2px" } },
          renderList
        ),
        _react2.default.createElement(
          'div',
          { className: 'group-add-grouping' },
          _react2.default.createElement(
            'div',
            {
              onClick: function onClick() {
                return _this5.addDimensionInfo();
              }
            },
            _react2.default.createElement(_SvgIcon2.default, { type: 'plus' }),
            '\u65B0\u589E\u7EF4\u5EA6\u5BFC\u822A\u65B9\u6848'
          )
        )
      );
    }
  }, {
    key: 'addDimensionInfo',
    value: function addDimensionInfo() {
      this.setState({ bShowCard: true, bShowList: false });
    }
  }, {
    key: 'chooseDimension',
    value: function chooseDimension(id, name) {
      this.setState({ currentName: name, currentId: id });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var bNeedClose = this.state.textMouseEnterId == 4 && this.state.currentName != "" ? true : false;
      var type = this.state.bShowList ? "up" : "down";
      var button = _react2.default.createElement(
        'div',
        null,
        bNeedClose ? _react2.default.createElement(_antd.Icon
        // onClick={() => this.chooseCondition()}
        , { type: "close-circle"
          // onMouseEnter={() => this.onTextMouseEnter(true, 4)}
          // onMouseLeave={() => this.onTextMouseEnter(false, 4)}
        }) : null,
        _react2.default.createElement(_antd.Icon
        // onClick={() => this.ShowList()}
        , { type: type
          // onMouseEnter={() => this.onTextMouseEnter(true, 4)}
          // onMouseLeave={() => this.onTextMouseEnter(false, 4)}
        })
      );
      var dimensionList = null;
      dimensionList = this.getDimensionListRender();
      var dimensionPop = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'Grouping-condition-left' },
          '\u7EF4\u5EA6\u5BFC\u822A\u65B9\u6848'
        ),
        _react2.default.createElement(
          _antd.Popover,
          {
            overlayStyle: { width: "236px" },
            content: dimensionList,
            trigger: "click",
            visible: this.state.bShowList },
          _react2.default.createElement(
            'div',
            { className: 'Grouping-condition' },
            _react2.default.createElement(
              'div',
              { className: 'Grouping-condition-input' },
              _react2.default.createElement(
                'span',
                { className: 'Grouping-condition-span'
                  // onMouseEnter={() => this.onTextMouseEnter(true, 4)}
                  // onMouseLeave={() => this.onTextMouseEnter(false, 4)}
                  , style: { cursor: "pointer" },
                  onClick: function onClick() {
                    return _this6.ShowList();
                  },
                  overlayStyle: { width: "100px" } },
                this.state.currentName
              ),
              button
            )
          )
        )
      );
      var dimensionCard = this.getDimensionCardRender();

      return _react2.default.createElement(
        'div',
        { className: 'groupCondition' },
        dimensionPop,
        dimensionCard
      );
    }
  }]);

  return DimensionSetting;
}(_react.Component);

exports.default = DimensionSetting;