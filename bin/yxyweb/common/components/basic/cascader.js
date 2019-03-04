'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //级联选择控件


var CascaderControl = function (_React$Component) {
  _inherits(CascaderControl, _React$Component);

  function CascaderControl(props) {
    _classCallCheck(this, CascaderControl);

    var _this = _possibleConstructorReturn(this, (CascaderControl.__proto__ || Object.getPrototypeOf(CascaderControl)).call(this, props));

    _this.handleBodyClick = function (e) {
      document.body.removeEventListener('click', _this.handleBodyClick);
      if (_this.contains(_this.refs.div, e.target)) return;
      if (e.target && cb.dom((0, _reactDom.findDOMNode)(e.target)).parents('.ant-cascader-menus').length) return;
      _this.props.model.execute('blur');
    };

    _this.keyField = props.keyField || '';
    _this.titleField = props.titleField || '';
    _this.state = {
      bIsNull: props.bIsNull,
      options: props.options, //数据源
      defaultValue: props.defaultValue, //默认选择数据
      value: props.value, //选择数据值
      style: props.style || {}, //样式
      className: props.className || '', //class名称
      popupClassName: props.popupClassName || '', //自定义浮层类名
      popupPlacement: props.popupPlacement || 'bottomLeft', //浮层预设位置：bottomLeft bottomRight topLeft topRight
      placeholder: props.placeholder || '', //输入框占位文本
      size: props.size || 'default', //输入框大小，可选 large default small
      disabled: props.disabled || false,
      allowClear: props.allowClear || true, //是否支持清除
      expandTrigger: props.expandTrigger || 'hover', //菜单展开方式
      changeOnSelect: props.changeOnSelect || false, //是否点选每级菜单选项值都会发生变化
      showSearch: props.showSearch || false, //在选择框中显示搜索框
      notFoundContent: props.notFoundContent || '暂无数据！', //当下拉列表为空时显示的内容
      dataSource: props.dataSource || []
    };
    _this.CascaderOnChange = _this.CascaderOnChange.bind(_this); //选择完成后的回调
    _this.displayRender = _this.displayRender.bind(_this); //选择后展示的渲染函数
    return _this;
  }

  _createClass(CascaderControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var keyField = params.keyField,
          titleField = params.titleField,
          value = params.value;

      this.keyField = keyField;
      this.titleField = titleField;
      delete params.keyField;
      delete params.titleField;
      delete params.value;
      this.setState(params);
      if (value) this.setValue(value);
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
    // 监听外部props的变化, 如果变化了需要更新组件的state

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model) {
        if (!this.props.model) {
          nextProps.model.addListener(this);
        }
      } else {
        if (this.props.model) {
          this.props.model.removeListener(this);
        } else {
          /*不绑定model*/
          this.keyField = nextProps.keyField;
          this.titleField = nextProps.titleField;
          this.setState({
            value: nextProps.value,
            dataSource: nextProps.dataSource
          });
        }
      }
    }
    //选择完成后的回调

  }, {
    key: 'CascaderOnChange',
    value: function CascaderOnChange(value, selectedOptions) {
      if (this.props.model) this.props.model.select(value);
      if (this.props.onSelect) this.props.onSelect(value, selectedOptions);
      // this.setState({
      //   value
      // });
    }
    //选择后展示的渲染函数

  }, {
    key: 'displayRender',
    value: function displayRender(label, selectedOptions) {
      return label.join('/');
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var keyField = this.keyField;
      var titleField = this.titleField;
      var states = {};
      var keys = [];
      var texts = [];
      value.forEach(function (item) {
        if (!item) return;
        keys.push(item[keyField]);
        texts.push(item[titleField]);
      });
      states['value'] = keys;
      states['text'] = texts.join('/');
      this.setState(states);
    }
  }, {
    key: 'contains',
    value: function contains(elem, target) {
      if (elem === target) return true;
      if (!elem || !elem.children || !elem.children.length) return false;
      for (var i = 0, len = elem.children.length; i < len; i++) {
        if (this.contains(elem.children[i], target)) return true;
      }
      return false;
    }
  }, {
    key: 'recursive',
    value: function recursive(dataSource, options, keyField, titleField) {
      var _this2 = this;

      dataSource.forEach(function (item) {
        var option = { value: item[keyField], label: item[titleField] };
        if (item.children) {
          option.children = [];
          _this2.recursive(item.children, option.children, keyField, titleField);
        }
        options.push(option);
      });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this3 = this;

      if (this.state.readOnly) return (0, _text2.default)(this.state.text);
      var options = [];
      var dataSource = this.state.dataSource;
      if (dataSource && dataSource.length) this.recursive(dataSource, options, this.keyField, this.titleField);
      return _react2.default.createElement(_antd.Cascader, {
        options: options, defaultValue: this.state.defaultValue, value: this.state.value,
        style: this.state.style, className: this.state.className, popupClassName: this.state.popupClassName,
        popupPlacement: this.state.popupPlacement, placeholder: this.state.placeholder,
        size: this.state.size, disabled: this.state.disabled, allowClear: this.state.allowClear,
        expandTrigger: this.state.expandTrigger, changeOnSelect: this.state.changeOnSelect,
        showSearch: this.state.showSearch, notFoundContent: this.state.notFoundContent,
        onChange: function onChange(value, selectedOptions) {
          return _this3.CascaderOnChange(value, selectedOptions);
        },
        displayRender: function displayRender(label, selectedOptions) {
          return _this3.displayRender(label, selectedOptions);
        }
      });
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
      document.body.addEventListener('click', this.handleBodyClick);
      var control = this.getControl();
      return _react2.default.createElement(
        'div',
        { ref: 'div', className: this.state.err },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return CascaderControl;
}(_react2.default.Component);

exports.default = CascaderControl;