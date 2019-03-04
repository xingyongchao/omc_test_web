'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               参数	                      说明	               类型	默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               defaultValue	默认选中的选项	array		[]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               value	              指定选中的选项	array		[]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               options	              指定可选项	    array		[]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               onChange	       变化时回调函数	Function(checkedValue)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var CheckGroup = _antd.Checkbox.Group;

var CheckboxGroup = function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this.handleChange = function (checkedValues) {
      if (!_this.props.model) return;
      var _this$state = _this.state,
          refCode = _this$state.refCode,
          dataSource = _this$state.dataSource;

      if (refCode) {
        _this.gridModel.select(checkedValues);
        _this.referViewModel.execute('afterOkClick', _this.gridModel.getSelectedRows());
      } else {
        var values = [];
        checkedValues.forEach(function (index) {
          values.push(dataSource[index]);
        });
        _this.props.model.setValue(values, true);
      }
    };

    _this.state = {
      refCode: props.cRefType ? true : false,
      visible: !props.bHidden,
      bIsNull: props.bIsNull,
      readOnly: false,
      disabled: false
    };
    return _this;
  }

  _createClass(CheckboxGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      this.onClick();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var value = params.value;

      delete params.valueField;
      delete params.textField;
      delete params.value;
      this.setState(params);
      this.setValue(value);
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var model = this.props.model;
      if (model && model.browse) model.browse();
    }
  }, {
    key: 'open',
    value: function open(e) {
      this.referViewModel = e.vm;
      this.gridModel = e.vm.get('table');
      this.gridModel.addListener(this);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.setState({ value: value });
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var dataSource = this.state.dataSource || [];
      var titleField = this.state.titleField || 'name';
      var options = [];
      var value = [];
      var readOnly = this.state.readOnly;

      var labels = [];
      dataSource.forEach(function (item, index) {
        var title = item[titleField];
        var key = index.toString();
        options.push({ label: title, value: key, disabled: _this2.state.disabled || item.disabled });
        if (!_this2.state.value || _this2.state.value.indexOf(title) === -1) return;
        value.push(key);
        labels.push(title);
      });
      if (readOnly) return (0, _text2.default)(labels.join('; '));
      return _react2.default.createElement(CheckGroup, { value: value, options: options, disabled: this.state.disabled, onChange: this.handleChange });
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var cShowCaption = this.props.cShowCaption;

      var title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(Icon, { type: 'star' }),
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
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: 'none' };
      return _react2.default.createElement(
        'div',
        { style: style },
        control
      );
    }
  }]);

  return CheckboxGroup;
}(_react.Component);

exports.default = CheckboxGroup;