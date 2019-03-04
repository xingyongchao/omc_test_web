'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _refer = require('../refer');

var _refer2 = _interopRequireDefault(_refer);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// const InputGroup = Input.Group;
// const Search = Input.Search;


var ReferControl = function (_React$Component) {
  _inherits(ReferControl, _React$Component);

  function ReferControl(props) {
    _classCallCheck(this, ReferControl);

    var _this = _possibleConstructorReturn(this, (ReferControl.__proto__ || Object.getPrototypeOf(ReferControl)).call(this, props));

    _this.handleInputChange = function (e) {
      if (!e.target.value) {
        var model = _this.getModel();
        if (model) model.setValue(null, true);
      }
      _this.setState({
        value: e.target.value
      });
    };

    _this.emitEmpty = function () {
      var model = _this.getModel();
      if (model) model.setValue(null, true);
      _this.refs.inputSearch.refs.input.focus();
    };

    _this.handleBodyClick = function (e) {
      if (!_this.refs.inputSearch) return;
      if (e.target === _this.refs.inputSearch.refs.input || e.target.classList.contains('anticon-canzhao') || e.target.classList.contains('anticon-close-circle') || cb.dom(e.target).parents('.has-related').length) return;
      document.body.removeEventListener('click', _this.handleBodyClick);
      _this.setState({ focused: false });
      var model = _this.getModel();
      if (model) model.execute('blur');
    };

    _this.handleFocus = function (e) {
      var model = _this.getModel();
      if (!model && _this.props.cRefType) {
        _this.model = new cb.models.ReferModel({ cRefType: _this.props.cRefType, multiple: _this.props.multiple, isList: _this.props.isList ? true : false, value: _this.props.value });
        _this.model.addListener(_this);
        model = _this.getModel();
      }
      if (model) model.browse(false, function (vm) {
        _this.vm = vm;
      });
      _this.setState({ focused: true });
    };

    _this.resetEnterMode = function () {
      _this.isEnterMode = false;
    };

    _this.onMouseEnter = function () {
      _this.setState({ showClear: true });
    };

    _this.onMouseLeave = function () {
      _this.setState({ showClear: false });
    };

    _this.state = {
      touch: _env2.default.INTERACTIVE_MODE === 'touch',
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      focus: false,
      modalVisible: false,
      value: _this.props.value,
      referType: '',
      disabled: _this.props.disabled || false,
      width: 600,
      title: '参照',
      err: '',
      msg: '',
      showClear: false,
      focused: false
    };
    _this.onClick = _this.onClick.bind(_this);
    _this.close = _this.close.bind(_this);
    _this.handleBodyClick = _this.handleBodyClick.bind(_this);
    return _this;
  }

  _createClass(ReferControl, [{
    key: 'getModel',
    value: function getModel() {
      return this.props.model || this.model;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.focus) this.refs.inputSearch.refs.input.focus();
      document.body.addEventListener('click', this.handleBodyClick);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
      // if (this.props.focus)
      //   this.refs.input.refs.input.focus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.model && nextProps.model) nextProps.model.addListener(this);
      if (nextProps.value === this.props.value) return;
      this.setState({ value: nextProps.value });
      if (typeof this.props.valueChange == 'function') this.props.valueChange(nextProps.value);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.handleBodyClick);
      var model = this.getModel();
      if (model) model.removeListener(this);
    }
  }, {
    key: 'open',
    value: function open(e) {
      document.body.removeEventListener('click', this.handleBodyClick);
      this.setState({
        referType: e.referType,
        vm: e.vm,
        modalVisible: true
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({ modalVisible: false, focused: false });
      var model = this.getModel();
      if (model) model.execute('blur');
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      document.body.removeEventListener('click', this.handleBodyClick);
      this.setState({
        modalVisible: false,
        value: value
      });
      if (!this.isEnterMode) return;
      this.isEnterMode = false;
      var model = this.getModel();
      if (model) model.execute('blur');
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var model = this.getModel();
      if (!model && this.props.cRefType) {
        this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
        this.model.addListener(this);
        model = this.getModel();
      }
      if (model) model.browse();
    }
  }, {
    key: 'handleJointQuery',
    value: function handleJointQuery() {
      var model = this.getModel();
      if (!model && this.props.cRefType) {
        this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
        this.model.addListener(this);
      }
      model = this.getModel();
      if (model) model.fireEvent('jointQuery');
    }
  }, {
    key: 'handleOnPressEnter',
    value: function handleOnPressEnter(e) {
      if (this.isEnterMode) return;
      this.isEnterMode = true;
      e.nativeEvent.stopImmediatePropagation();
      e.nativeEvent.stopPropagation();
      var model = this.getModel();
      if (model) {
        model.fireEvent('pressEnter', this.state.value);
        model.setState('text', this.state.value);
      }
      this.vm && this.vm.fireEvent('pressEnter', { value: this.state.value, model: model, callback: this.resetEnterMode });
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur(e) {
      var value = e.target.value === '' ? null : e.target.value;
      if (this.props.model) this.props.model.setState('text', value);
      this.setState({ focused: false });
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(val) {
      this.setState({
        disabled: val
      });
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
    key: 'baseControl',
    value: function baseControl() {
      var _this2 = this;

      var baseControl = void 0;
      if (this.state.readOnly) {
        baseControl = (0, _text2.default)(this.state.value);
      } else {
        var _props = this.props,
            style = _props.style,
            size = _props.size,
            placeholder = _props.placeholder;

        var referTitle = '';
        if (this.props.title) {
          referTitle = _react2.default.createElement(
            _col2.default,
            { span: 6 },
            this.props.title
          );
        }

        var btnCls = (0, _classnames2.default)({
          'ant-search-btn': true
          //'ant-search-btn-noempty': !!this.state.value.trim(),
        });

        var searchCls = (0, _classnames2.default)({
          'ant-search-input': true,
          'ant-search-input-focus': this.state.focus
        });
        //{this.props.cShowCaptionaa ? <Col span={6}>{this.props.cShowCaptionaa}</Col> : null}
        var suffix = void 0;
        if (!this.state.disabled) {
          var suffixItems = [];
          if (this.state.value && (this.state.showClear || this.state.touch || this.state.focused)) suffixItems.push(_react2.default.createElement(_antd.Icon, { type: 'close-circle', onClick: this.emitEmpty }));
          suffixItems.push(_react2.default.createElement(_antd.Icon, { type: 'canzhao', onClick: this.onClick }));
          suffix = _react2.default.createElement(
            'div',
            null,
            suffixItems
          );
        }
        baseControl = _react2.default.createElement(
          _row2.default,
          { className: this.state.err },
          _react2.default.createElement(
            _col2.default,
            { span: 'line' },
            _react2.default.createElement(
              'div',
              { className: 'ant-search-input-wrapper', onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, style: style },
              _react2.default.createElement(_antd.Input, { readOnly: this.state.touch, ref: 'inputSearch', disabled: this.state.disabled, placeholder: placeholder,
                value: this.state.value, onFocus: this.handleFocus, onChange: function onChange(e) {
                  return _this2.handleInputChange(e);
                },
                suffix: suffix, onPressEnter: function onPressEnter(e) {
                  return _this2.handleOnPressEnter(e);
                },
                onBlur: function onBlur(e) {
                  return _this2.handleInputBlur(e);
                }, onClick: this.state.touch ? this.onClick : null
              }),
              _react2.default.createElement(_refer2.default, { visible: this.state.modalVisible, close: this.close, title: this.props.cShowCaption ? this.props.cShowCaption : this.props.title, model: this.state.vm, afterOkClick: this.props.afterOkClick, referType: this.state.referType })
            )
          )
        );
      }
      return baseControl;
    }
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

      var _props2 = this.props,
          bJointQuery = _props2.bJointQuery,
          cShowCaption = _props2.cShowCaption;

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
      var errClass = 'has-feedback ' + this.state.err;
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

  return ReferControl;
}(_react2.default.Component);

exports.default = ReferControl;