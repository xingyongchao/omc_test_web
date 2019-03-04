'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _popover = require('../../../../common/components/popover');

var PopoverMap = _interopRequireWildcard(_popover);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;
var Search = _antd.Input.Search;

var ListRefer = function (_Component) {
  _inherits(ListRefer, _Component);

  function ListRefer(props) {
    _classCallCheck(this, ListRefer);

    var _this = _possibleConstructorReturn(this, (ListRefer.__proto__ || Object.getPrototypeOf(ListRefer)).call(this, props));

    _this.getModel = function () {
      return _this.props.model || _this.model;
    };

    _this.open = function (e) {
      _this.referViewModel = e.vm;
      _this.gridModel = e.vm.get('table');
      _this.gridModel.addListener(_this);
      if (typeof _this.props.afterOkClick === 'function') _this.referViewModel.on('afterOkClick', _this.props.afterOkClick);
    };

    _this.setValue = function (value) {
      _this.setState({ value: value });
    };

    _this.setDataSource = function (dataSource) {
      _this.setState({ dataSource: dataSource });
      var _this$state = _this.state,
          multiple = _this$state.multiple,
          dataStatus = _this$state.dataStatus,
          textField = _this$state.textField;

      if (multiple) {
        if (!dataStatus || dataStatus == {}) {
          dataSource.map(function (ele, index) {
            dataStatus[ele.id] = { name: ele[textField], checked: false, index: index };
          });
        } else {
          dataSource.map(function (ele, index) {
            if (!dataStatus[ele.id]) {
              dataStatus[ele.id] = { name: ele[textField], checked: false, index: index };
            }
          });
        }
        _this.setState({ dataStatus: dataStatus });
      }
    };

    _this.handleClick = function () {
      if (_this.hasClicked) return;
      _this.hasClicked = true;
      _this.onClick();
    };

    _this.onClick = function () {
      var model = _this.getModel();
      if (!model && _this.props.cRefType) {
        _this.model = new cb.models.ReferModel({ cRefType: _this.props.cRefType, multiple: _this.props.multiple, isList: _this.props.isList ? true : false, value: _this.props.value });
        _this.model.addListener(_this);
      }
      model = _this.getModel();
      if (model && model.browse) model.browse(true);
    };

    _this.handleJointQuery = function () {
      var model = _this.getModel();
      if (!model && _this.props.cRefType) {
        _this.model = new cb.models.ReferModel({ cRefType: _this.props.cRefType, multiple: _this.props.multiple, isList: _this.props.isList ? true : false, value: _this.props.value });
        _this.model.addListener(_this);
      }
      model = _this.getModel();
      if (model) model.fireEvent('jointQuery');
    };

    _this.onChange = function (e, value) {
      var textField = _this.state.textField;

      var index = _this.state.dataSource.findIndex(function (item) {
        return item[textField] === value;
      });
      var referValue = void 0;
      if (value == null) {
        referValue = value;
      } else {
        _this.gridModel.select([index]);
        referValue = _this.gridModel.getSelectedRows();
      }
      _this.referViewModel.execute('afterOkClick', referValue);
      _this.setState({ showPop: false });
    };

    _this.onButtonClick = function (e, type) {
      var _this$state2 = _this.state,
          checkedKeys = _this$state2.checkedKeys,
          dataSource = _this$state2.dataSource;

      var rows = [];
      if (type == 'submit') {
        checkedKeys.map(function (ele) {
          rows.push(dataSource[ele]);
        }, _this);
        _this.referViewModel.execute('afterOkClick', rows);
      }
      _this.setState({ showPop: false });
      var model = _this.getModel();
      model.execute('blur');
    };

    _this.onChecked = function (e, id) {
      var _this$state3 = _this.state,
          dataStatus = _this$state3.dataStatus,
          checkedKeys = _this$state3.checkedKeys;

      var checked = e.target.checked;
      dataStatus[id].checked = checked;
      if (checked) {
        checkedKeys.push(dataStatus[id].index);
      } else {
        checkedKeys = [];
        for (var key in dataStatus) {
          if (dataStatus[key].checked) {
            checkedKeys.push(dataStatus[key].index);
          }
        }
      }
      _this.setState({ dataStatus: dataStatus, checkedKeys: checkedKeys });
    };

    _this.onPopClick = function () {
      var disabled = _this.state.disabled;
      if (disabled) return;
      _this.setState({ showPop: !_this.state.showPop });
    };

    _this.onClear = function (e) {
      e.preventDefault();
      e.stopPropagation();
      // this.referViewModel.execute('afterOkClick', []);
      _this.getModel().setValue(null, true);
    };

    _this.onVisibleChange = function (visible) {
      var disabled = _this.state.disabled;
      if (disabled) return;
      _this.setState({ showPop: visible });
      if (!visible) {
        var model = _this.getModel();
        model.execute('blur');
      }
    };

    _this.onSearchChange = function (e) {
      var value = e.target.value;
      _this.setState({ searchValue: value });
    };

    _this.getPopContent = function (data) {
      var _this$state4 = _this.state,
          multiple = _this$state4.multiple,
          disabled = _this$state4.disabled,
          value = _this$state4.value,
          showPop = _this$state4.showPop,
          dataStatus = _this$state4.dataStatus,
          searchValue = _this$state4.searchValue,
          checkedKeys = _this$state4.checkedKeys,
          textField = _this$state4.textField;

      var controls = [];
      var loopData = data;
      if (searchValue != '') {
        loopData = [];
        data.map(function (ele) {
          var elementText = ele[textField];
          if (cb.utils.isEmpty(elementText)) return;
          if (typeof elementText !== 'string') elementText = elementText.toString();
          if (elementText.indexOf(searchValue) > -1) {
            loopData.push(ele);
          }
        });
      }
      if (loopData.length <= 0) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(Search, { value: searchValue, onChange: _this.onSearchChange }),
          _react2.default.createElement(
            'span',
            null,
            '\u554A\u54E6~\u6CA1\u6709\u641C\u7D22\u5230~'
          )
        );
      }
      loopData.map(function (ele) {
        var _this2 = this;

        if (!multiple) {
          controls.push(_react2.default.createElement(
            'li',
            { onClick: function onClick(e) {
                return _this2.onChange(e, ele[textField]);
              } },
            ele[textField]
          ));
        } else {
          var checked = dataStatus[ele.id] ? dataStatus[ele.id].checked : false;
          controls.push(_react2.default.createElement(
            _antd.Checkbox,
            { checked: checked, key: ele.id, onChange: function onChange(e) {
                return _this2.onChecked(e, ele.id);
              } },
            ele[textField]
          ));
        }
      }, _this);
      if (!multiple) {
        return _react2.default.createElement(
          'div',
          { className: 'listRefer-list-container' },
          _react2.default.createElement(Search, { value: searchValue, onChange: _this.onSearchChange }),
          _react2.default.createElement(
            'ul',
            { className: 'defaut-list listRefer-list' },
            controls
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'listRefer' },
          _react2.default.createElement(Search, { value: searchValue, onChange: _this.onSearchChange }),
          controls,
          _react2.default.createElement(
            'div',
            { className: 'filter-btn-1' },
            _react2.default.createElement(
              _antd.Button,
              { className: 'ant-btn-sm', type: 'primary', onClick: function onClick(e) {
                  return _this.onButtonClick(e, 'submit');
                } },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { className: 'ant-btn-sm', type: 'default', onClick: function onClick(e) {
                  return _this.onButtonClick(e, 'cancel');
                } },
              '\u53D6\u6D88'
            )
          )
        );
      }
    };

    _this.getListRefer = function () {
      var _this$state5 = _this.state,
          multiple = _this$state5.multiple,
          disabled = _this$state5.disabled,
          value = _this$state5.value,
          showPop = _this$state5.showPop;

      var contentClass = "",
          showClear = false,
          selectionControl = null;
      if (value && value != "") {
        selectionControl = _react2.default.createElement(
          'span',
          { className: 'ant-select-selection-selected-value' },
          value
        );
        showClear = true;
      } else {
        selectionControl = _react2.default.createElement('span', { className: 'ant-select-selection__placeholder' });
      }
      if (disabled) {
        contentClass = "ant-select ant-select-disabled  ant-select-allow-clear";
      } else {
        contentClass = "ant-select ant-select-enabled ant-select-allow-clear";
      }
      if (showPop) contentClass = contentClass + '  ant-select-open ant-select-focused';

      var clearControl = showClear ? _react2.default.createElement('span', { onClick: _this.onClear, className: 'ant-select-selection__clear' }) : _react2.default.createElement('span', null);
      return _react2.default.createElement(
        'span',
        { ref: function ref(node) {
            return _this.input = node;
          }, onClick: _this.onClick, className: contentClass },
        _react2.default.createElement(
          'span',
          { className: 'uretail-treerefer-selection ant-select-selection ant-select-selection--single', role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'true', tabindex: '0', 'aria-expanded': 'false' },
          _react2.default.createElement(
            'span',
            { className: 'ant-select-selection__rendered' },
            selectionControl
          ),
          clearControl,
          _react2.default.createElement(
            'span',
            { className: 'ant-select-arrow', style: { outline: 'none' } },
            _react2.default.createElement('b', null)
          )
        )
      );
    };

    _this.baseControl = function () {
      var _baseControl = null;
      var _this$state6 = _this.state,
          after = _this$state6.after,
          bottom = _this$state6.bottom,
          afterPopoverKey = _this$state6.afterPopoverKey,
          readOnly = _this$state6.readOnly;

      if (readOnly) {
        _baseControl = (0, _text2.default)(_this.state.value);
      } else {
        var dataSource = _this.state.dataSource || [];
        var _this$state7 = _this.state,
            textField = _this$state7.textField,
            keyField = _this$state7.keyField,
            multiple = _this$state7.multiple,
            disabled = _this$state7.disabled,
            showPop = _this$state7.showPop,
            popWidth = _this$state7.popWidth;

        var index = dataSource.findIndex(function (item) {
          return item[textField] === _this.state.value;
        });
        var popContent = _this.getPopContent(dataSource);
        var control = _this.getListRefer();
        var extraProps = {};
        if (popWidth) extraProps.overlayStyle = { width: popWidth };
        _baseControl = _react2.default.createElement(
          _antd.Popover,
          _extends({}, extraProps, { visible: showPop, overlayClassName: 'uretail-pop ' + (cb.rest.interMode === 'touch' ? 'listrefer-touch-container' : ''), content: popContent,
            trigger: 'click', placement: 'bottom',
            onClick: _this.onPopClick, onVisibleChange: _this.onVisibleChange }),
          control
        );
      }
      var AfterComName = void 0;
      if (!afterPopoverKey && !after && !bottom) {
        return _baseControl;
      } else {
        AfterComName = PopoverMap[afterPopoverKey];
        return _react2.default.createElement(
          'div',
          { className: 'input-bottom' },
          _react2.default.createElement(
            'div',
            { className: 'control-flex' },
            _baseControl,
            afterPopoverKey ? _react2.default.createElement(AfterComName, null) : after && _react2.default.createElement(
              'span',
              null,
              after
            )
          ),
          !readOnly && bottom && _react2.default.createElement(
            'div',
            { className: 'input-bottom-text', title: bottom },
            bottom
          )
        );
      }
    };

    var cStyle = props.cStyle;

    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {}
    }
    _this.state = Object.assign({
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      showPop: false,
      dataStatus: {},
      checkedKeys: [],
      searchValue: ''
    }, config);
    return _this;
  }

  _createClass(ListRefer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.focus) this.refs.input.refs.input.focus();
      this.setState({ popWidth: this.input.clientWidth });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var model = this.getModel();
      if (model) model.removeListener(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model) {
        if (!this.props.model) {
          nextProps.model.addListener(this);
        } else {
          return;
        }
      } else {
        if (this.props.model) {
          this.props.model.removeListener(this);
        }
      }
    }
    /*multiple下选中事件*/

    /*pop点击事件*/

    /*pop状态改变*/

    /*搜索框改变*/

  }, {
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    }
    /*组织pop数据*/

  }, {
    key: 'relatedControl',
    value: function relatedControl() {
      var control = this.baseControl();
      var relatedControl = this.props.relatedControl;

      if (!relatedControl) return control;
      return _react2.default.createElement(
        'div',
        { className: 'has-related' },
        _react2.default.createElement(
          'div',
          { className: 'viewCell' },
          control
        ),
        relatedControl
      );
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _this3 = this;

      if (!this.state.visible) return null;
      var _props = this.props,
          bJointQuery = _props.bJointQuery,
          cShowCaption = _props.cShowCaption;

      var title = bJointQuery ? _react2.default.createElement(
        'a',
        { onClick: function onClick(e) {
            return _this3.handleJointQuery(e);
          } },
        cShowCaption
      ) : cShowCaption;
      title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'star' }),
        title
      ) : _react2.default.createElement(
        'label',
        null,
        title
      );
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.relatedControl(), title: title }) : this.relatedControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var errClass = 'basic-list-refer has-feedback ' + (this.state.classname || '') + ' ' + this.state.err;
      return _react2.default.createElement(
        'div',
        { style: style, className: errClass },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return ListRefer;
}(_react.Component);

exports.default = ListRefer;