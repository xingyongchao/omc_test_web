'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _label = require('../basic/label');

var _label2 = _interopRequireDefault(_label);

var _formula = require('../../redux/formula');

var formulaActions = _interopRequireWildcard(_formula);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = _antd.Input.TextArea;

var Operator = function (_Component) {
  _inherits(Operator, _Component);

  function Operator() {
    _classCallCheck(this, Operator);

    return _possibleConstructorReturn(this, (Operator.__proto__ || Object.getPrototypeOf(Operator)).apply(this, arguments));
  }

  _createClass(Operator, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var dataSource = this.props.dataSource;

      if (!dataSource || !dataSource.length) return null;
      var items = [];
      dataSource.forEach(function (item) {
        var key = item.key,
            value = item.value;

        items.push(_react2.default.createElement(
          _antd.Tag,
          { key: key, onClick: function onClick() {
              return _this2.props.onClick(key);
            } },
          value
        ));
      });
      return _react2.default.createElement(
        'div',
        null,
        items
      );
    }
  }]);

  return Operator;
}(_react.Component);

var RightContent = function (_Component2) {
  _inherits(RightContent, _Component2);

  function RightContent() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, RightContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = RightContent.__proto__ || Object.getPrototypeOf(RightContent)).call.apply(_ref, [this].concat(args))), _this3), _this3.onCaptionChange = function (e) {
      _this3.props.formulaActions.changeCaption(e.target.value);
    }, _this3.onChange = function (e) {
      _this3.props.formulaActions.change(e.target.value, e.target.selectionStart);
    }, _this3.onFocus = function () {
      setTimeout(function () {
        var input = (0, _reactDom.findDOMNode)(_this3.input);
        _this3.props.formulaActions.focus(input.selectionStart);
      }, 0);
    }, _this3.handleOperatorSelect = function (key) {
      _this3.props.formulaActions.selectOperator(key);
    }, _this3.getFormatControl = function () {
      var _this3$props$formula = _this3.props.formula,
          cControlType = _this3$props$formula.cControlType,
          cFormatData = _this3$props$formula.cFormatData;

      var controlType = cControlType && cControlType.trim().toLocaleLowerCase();
      if (controlType == 'input') return null;
      if (controlType == 'datepicker') {
        return _react2.default.createElement(_antd.Input, { placeholder: '\u4F8B\uFF1AYYYY-MM-DD HH:mm:ss', value: cFormatData, onChange: _this3.onFormatChange });
      }
      if (controlType == 'inputnumber') {
        var monovalentdecimal = {},
            amountofdecimal = {},
            quantitydecimal = {};
        monovalentdecimal.decimal = "<%option.monovalentdecimal%>";
        amountofdecimal.decimal = "<%option.amountofdecimal%>";
        quantitydecimal.decimal = "<%option.quantitydecimal%>";
        return _react2.default.createElement(
          _antd.Select,
          { value: cFormatData, onChange: _this3.onFormatChange },
          _react2.default.createElement(
            _antd.Select.Option,
            { value: JSON.stringify(monovalentdecimal) },
            '\u5355\u4EF7\u7CBE\u5EA6'
          ),
          _react2.default.createElement(
            _antd.Select.Option,
            { value: JSON.stringify(amountofdecimal) },
            '\u91D1\u989D\u7CBE\u5EA6'
          ),
          _react2.default.createElement(
            _antd.Select.Option,
            { value: JSON.stringify(quantitydecimal) },
            '\u6570\u91CF\u7CBE\u5EA6'
          )
        );
      }
      return null;
    }, _this3.onFormatChange = function (e) {
      _this3.props.formulaActions.setCommonData({ 'cFormatData': e.target ? e.target.value : e });
    }, _this3.onFieldTypeChange = function (value) {
      _this3.props.formulaActions.setCommonData({ 'cControlType': value, 'cFormatData': null, 'iNumPoint': 0 });
    }, _this3.onNumPointChange = function (value) {
      _this3.props.formulaActions.setCommonData({ 'iNumPoint': value });
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(RightContent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.formulaActions.initOperator();
    }
  }, {
    key: 'getControl',
    value: function getControl(control, caption, required) {
      var title = required ? _react2.default.createElement(
        'label',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'star' }),
        caption
      ) : _react2.default.createElement(
        'label',
        null,
        caption
      );
      return _react2.default.createElement(_label2.default, { control: control, title: title });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props$formula = this.props.formula,
          operatorData = _props$formula.operatorData,
          caption = _props$formula.caption,
          expression = _props$formula.expression,
          errorInfo = _props$formula.errorInfo,
          cControlType = _props$formula.cControlType,
          iNumPoint = _props$formula.iNumPoint,
          cFormatData = _props$formula.cFormatData;

      var columnNameCom = _react2.default.createElement(_antd.Input, { value: caption, onChange: this.onCaptionChange });
      var operatorCom = _react2.default.createElement(Operator, { dataSource: operatorData, onClick: this.handleOperatorSelect });
      var expressionCom = _react2.default.createElement(TextArea, { ref: function ref(node) {
          return _this4.input = node;
        }, onFocus: this.onFocus, value: expression, onChange: this.onChange });
      var controlType = cControlType && cControlType.trim().toLocaleLowerCase();
      var fieldTyepControl = _react2.default.createElement(
        _antd.Select,
        { value: controlType, onChange: this.onFieldTypeChange },
        _react2.default.createElement(
          _antd.Select.Option,
          { value: 'input' },
          '\u6587\u672C'
        ),
        _react2.default.createElement(
          _antd.Select.Option,
          { value: 'inputnumber' },
          '\u6570\u503C'
        ),
        _react2.default.createElement(
          _antd.Select.Option,
          { value: 'datepicker' },
          '\u65E5\u671F'
        )
      );
      var formatControl = this.getFormatControl();
      var numPointControl = _react2.default.createElement(_antd.InputNumber, { value: iNumPoint, onChange: this.onNumPointChange });
      return _react2.default.createElement(
        'div',
        null,
        this.getControl(columnNameCom, '栏目名称', true),
        this.getControl(operatorCom, '运算符'),
        _react2.default.createElement(
          'div',
          { className: 'formula-editing' },
          this.getControl(expressionCom, '编辑区', true),
          _react2.default.createElement(
            'label',
            { className: 'error' },
            errorInfo
          )
        ),
        this.getControl(fieldTyepControl, '数据类型', true),
        formatControl ? this.getControl(formatControl, '格式化', false) : null,
        controlType == 'inputnumber' ? this.getControl(numPointControl, '精度', false) : null
      );
    }
  }]);

  return RightContent;
}(_react.Component);

function mapStateToProps(state) {
  return {
    formula: state.formula.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    formulaActions: (0, _redux.bindActionCreators)(formulaActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RightContent);