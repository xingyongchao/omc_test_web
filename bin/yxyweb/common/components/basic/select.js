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

var _text2 = require('./text');

var _text3 = _interopRequireDefault(_text2);

var _popover = require('../../../../common/components/popover');

var PopoverMap = _interopRequireWildcard(_popover);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;
var OptGroup = _antd.Select.OptGroup;

var SelectControl = function (_React$Component) {
  _inherits(SelectControl, _React$Component);

  function SelectControl(props) {
    _classCallCheck(this, SelectControl);

    var _this = _possibleConstructorReturn(this, (SelectControl.__proto__ || Object.getPrototypeOf(SelectControl)).call(this, props));

    _this.valueField = props.valueField || '';
    _this.textField = props.textField || '';
    _this.state = {
      bIsNull: props.bIsNull,
      focus: props.focus,
      text: '',
      dataSource: [],
      value: undefined, //指定当前选中的条目 String/Array/{key: String, label: React.Node}/Array<{key, label}>
      defaultValue: [], //指定默认选中的条目 String/Array/{key: String, label: React.Node}/Array<{key, label}>
      multiple: false, //支持多选 boolean
      combobox: false, //输入框自动提示模式 boolean
      allowClear: true, //支持清除, 单选模式有效 boolean
      filterOption: true, //是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。  boolean or function(inputValue, option) true
      tags: false, // 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配  boolean
      placeholder: null, //选择框默认文字  string
      notFoundContent: '未找到', //当下拉列表为空时显示的内容 string
      dropdownMatchSelectWidth: true, //下拉菜单和选择器同宽  boolean
      optionFilterProp: 'children', //搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索  string  value
      size: 'default', //输入框大小，可选 large default small
      disabled: false,
      visible: !props.bHidden,
      err: '',
      msg: '',
      className: props.className || '',
      isInFilterJSX: props.isInFilterJSX
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.handleBodyClick = _this.handleBodyClick.bind(_this);
    return _this;
  }

  _createClass(SelectControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var valueField = params.valueField,
          textField = params.textField,
          value = params.value;

      this.valueField = valueField;
      this.textField = textField;
      delete params.valueField;
      delete params.textField;
      delete params.value;
      this.setState(params);
      this.setValue(value);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var valueField = this.valueField;
      var textField = this.textField;
      var states = {};
      var keys = [];
      var texts = [];
      if (cb.utils.isArray(value)) {
        value.forEach(function (item) {
          if (!item) return;
          keys.push(item[valueField] + '');
          texts.push(item[textField] + '');
        });
      } else {
        if (value) {
          if (!cb.utils.isEmpty(value[valueField])) keys.push(value[valueField] + '');
          if (!cb.utils.isEmpty(value[textField])) texts.push(value[textField] + '');
        }
      }
      states['value'] = keys;
      states['text'] = texts.join(',');
      this.setState(states);
    }
  }, {
    key: 'onSelect',
    value: function onSelect(value, option) {}
  }, {
    key: 'onDeselect',
    value: function onDeselect(value) {}
  }, {
    key: 'onSearch',
    value: function onSearch(value) {}
  }, {
    key: 'onChange',
    value: function onChange(value) {
      if (cb.utils.isEmpty(value)) value = null;
      if (this.props.model) {
        this.props.model.select(value);
        // this.props.model.execute('enter');
      }
    }
  }, {
    key: 'handleBodyClick',
    value: function handleBodyClick(e) {
      document.body.removeEventListener('click', this.handleBodyClick);
      this.setState({
        focus: false
      });
      if (this.contains(this.refs.div, e.target)) return;
      if (this.props.model) this.props.model.execute('blur');
    }
  }, {
    key: 'contains',
    value: function contains(elem, target) {
      if (elem === target) return true;
      if (!elem.children.length) return false;
      for (var i = 0, len = elem.children.length; i < len; i++) {
        if (this.contains(elem.children[i], target)) return true;
      }
      return false;
    }
  }, {
    key: 'getOptions',
    value: function getOptions() {
      var valueField = this.valueField;
      var textField = this.textField;
      if (!this.state.dataSource) return;
      var rowStates = this.state.rowStates;

      var options = [];
      this.state.dataSource.forEach(function (item, index) {
        if (item.optGroup) {
          options.push(_react2.default.createElement(
            OptGroup,
            { key: index, label: item.optGroup.label },
            item.optGroup.options.map(function (opt) {
              return _react2.default.createElement(
                Option,
                { key: opt.value, text: opt.text },
                opt.text
              );
            })
          ));
        } else {
          var key = item[valueField];
          var _text = item[textField];
          if (rowStates && rowStates[key] && rowStates[key].visible === false) return;
          options.push(_react2.default.createElement(
            Option,
            { key: key, text: _text },
            _text
          ));
        }
      });
      return options;
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      if (this.props.model) this.props.model.execute('blur');
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var _state = this.state,
          readOnly = _state.readOnly,
          afterPopoverKey = _state.afterPopoverKey;

      var _baseControl = null;
      if (readOnly) {
        _baseControl = (0, _text3.default)(this.state.text);
      } else {
        var cProps = {
          dropdownClassName: cb.rest.interMode === 'touch' ? 'select-touch-container' : null,
          value: this.state.value,
          defaultValue: this.state.defaultValue,
          multiple: this.state.multiple,
          combobox: this.state.combobox,
          allowClear: this.state.allowClear,
          tags: this.state.tags,
          placeholder: this.state.placeholder,
          notFoundContent: this.state.notFoundContent,
          dropdownMatchSelectWidth: this.state.dropdownMatchSelectWidth,
          size: this.state.size,
          onChange: this.onChange,
          onSelect: this.onSelect,
          onDeselect: this.onDeselect,
          onSearch: this.onSearch,
          optionFilterProp: this.state.optionFilterProp,
          optionLabelProp: this.state.optionLabelProp,
          disabled: this.state.disabled
        };
        var options = this.getOptions();
        _baseControl = _react2.default.createElement(
          _antd.Select,
          _extends({}, cProps, { onBlur: function onBlur(e) {
              return _this2.handleBlur(e);
            } }),
          options
        );
      }
      var AfterComName = null;
      if (!afterPopoverKey) {
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
            _react2.default.createElement(AfterComName, null)
          )
        );
      }
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var cShowCaption = this.props.cShowCaption;

      var title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'star' }),
        cShowCaption
      ) : _react2.default.createElement(
        'label',
        null,
        cShowCaption
      );
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: title }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.focus) document.body.addEventListener('click', this.handleBodyClick);
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: "none" };
      var className = this.state.err + ' ' + this.state.className;
      if (this.state.isInFilterJSX) {
        className = className + " isInFilterJSX isInFilterJSX-Select";
      } else {
        // style.height = '100%';
      }
      if (this.state.readOnly) className = className + " readonly";
      return _react2.default.createElement(
        'div',
        { ref: 'div', style: style, className: className },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return SelectControl;
}(_react2.default.Component);

exports.default = SelectControl;