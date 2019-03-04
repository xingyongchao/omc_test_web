'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _en_US = require('antd-mobile/lib/calendar/locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

var _zh_CN = require('antd-mobile/lib/calendar/locale/zh_CN');

var _zh_CN2 = _interopRequireDefault(_zh_CN);

var _formatDate = require('../../../common/helpers/formatDate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var now = new Date();

var DatePickerControl = function (_Component) {
  _inherits(DatePickerControl, _Component);

  function DatePickerControl(props) {
    _classCallCheck(this, DatePickerControl);

    var _this = _possibleConstructorReturn(this, (DatePickerControl.__proto__ || Object.getPrototypeOf(DatePickerControl)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(DatePickerControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ config: {} });
      if (this.props.model) {
        this.props.model.addListener(this);
        if (this.props.toModel) {
          this.props.toModel.addListener(this);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) {
        this.props.model.removeListener(this);
        if (this.props.toModel) {
          this.props.toModel.removeListener(this);
        }
      }
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      if (this.props.setHideFilter) this.props.setHideFilter(false);
      this.setState({ show: false });
      this.autoFocus();
    }
  }, {
    key: 'autoFocus',
    value: function autoFocus() {
      if (this.state.focusTag === 'end') {
        this.endref.inputRef.inputRef.focus();
      } else {
        this.startref.inputRef.inputRef.focus();
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus(focusTag) {
      this.setState({ focusTag: focusTag });
    }
  }, {
    key: 'onConfirm',
    value: function onConfirm(start, end) {
      start = (0, _formatDate.dateFormat)(start, 'yyyy-MM-dd');
      end = end && (0, _formatDate.dateFormat)(end, 'yyyy-MM-dd');
      if (end) this.setState({ show: false, startDate: start, endDate: end, defaultValue: [start, end] });else this.setState({ show: false, startDate: start, defaultValue: [start] });
      if (this.props.setHideFilter) this.props.setHideFilter(false);
      this.autoFocus();
      if (this.props.model) {
        this.props.model.setValue(start, true);
      }
      if (this.props.toModel && end) {
        this.props.toModel && this.props.toModel.setValue(end, true);
      }
    }

    /**onConfirm(start,end) {
        let {focusTag,startDate,endDate,defaultValue} = this.state;
        if(!defaultValue){
            defaultValue=[null,null];
        }
        let end = undefined;
        if(focusTag==='end'){
            end = start;
            end = dateFormat(end, 'yyyy-MM-dd');
            defaultValue[1]=end;
            this.setState({ show: false, endDate: end, defaultValue:defaultValue });
        }else if(focusTag==='start'){
            start = dateFormat(start, 'yyyy-MM-dd');
            defaultValue[0]=start;
            this.setState({ show: false, startDate: start, defaultValue:defaultValue });
        }else{
         }
        // start = dateFormat(start, 'yyyy-MM-dd');
        // end = dateFormat(end, 'yyyy-MM-dd');
        this.autoFocus();
        if (this.props.model){
            if(focusTag==='start'){
                this.props.model.setValue(start, true);
            }
            if(focusTag==='end'){
                this.props.toModel && this.props.toModel.setValue(end, true);
            }
        }
    }**/

  }, {
    key: 'onClear',
    value: function onClear() {
      this.setState({ startDate: '', endDate: '', defaultValue: [] });
      if (this.props.model) {
        this.props.model.setValue('', true);
        if (this.props.toModel) {
          this.props.toModel && this.props.toModel.setValue('', true);
        }
      }
    }
  }, {
    key: 'onSelect',
    value: function onSelect(start, vals) {
      var tempDefaultValue = [];
      if (this.state.defaultValue) {
        tempDefaultValue = this.state.defaultValue;
      }

      if (tempDefaultValue.length == 2) {
        var tempstart = (0, _formatDate.dateFormat)(start, 'yyyy-MM-dd');
        if (this.state.focusTag === 'end') {
          tempDefaultValue[1] = tempstart;
        } else {
          tempDefaultValue[0] = tempstart;
        }
      } else {
        if (start) {
          tempDefaultValue.push((0, _formatDate.dateFormat)(start, 'yyyy-MM-dd'));
        }
        if (vals.length && vals[0]) {
          tempDefaultValue.push((0, _formatDate.dateFormat)(vals[0], 'yyyy-MM-dd'));
        }
      }
      if (tempDefaultValue.length == 2) {
        this.setState({ defaultValue: tempDefaultValue });
      }
    }
  }, {
    key: 'handClick',
    value: function handClick() {
      var _state = this.state,
          bCanModify = _state.bCanModify,
          readOnly = _state.readOnly,
          disabled = _state.disabled;

      if (bCanModify === false || disabled === true || readOnly === true) {
        return;
      }
      if (this.props.setHideFilter) this.props.setHideFilter(true);
      if (!this.state.show) {
        this.onFocus.bind(this, 'start');
        this.setState({ show: true });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(type, value) {
      if (type === 'start') {
        this.setState({ startDate: value });
      } else {
        this.setState({ endDate: value });
      }
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      if (!this.state) {
        return '';
      }
      var defaultValue = this.state.defaultValue;

      var tempDefaultValue = [],
          start = void 0,
          end = void 0;
      if (defaultValue && defaultValue.length == 2) {
        tempDefaultValue = [new Date(defaultValue[0]), new Date(defaultValue[1])];
      }
      if (this.props.model) {
        start = this.props.model.getValue();
        if (start) {
          tempDefaultValue.push(new Date(start));
        }
      }
      if (this.props.toModel) {
        end = this.props.toModel.getValue();
        if (end) {
          tempDefaultValue.push(new Date(end));
        }
      }
      if (!start && !end) {
        tempDefaultValue = [];
      }
      return _react2.default.createElement(_antdMobile.Calendar, {
        visible: this.state.show,
        onCancel: this.onCancel.bind(this),
        onConfirm: this.onConfirm.bind(this),
        defaultValue: tempDefaultValue,
        type: this.props.toModel ? "range" : 'one',
        onClear: this.onClear.bind(this)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var start = '';
      var end = '';
      var cShowCaption = '';
      if (!cb.utils.isEmpty(this.state)) {
        start = this.state.startDate;
        end = this.state.endDate;
        cShowCaption = this.state.cShowCaption;
      }
      if (this.props.model) {
        start = this.props.model.getValue() || "";
      }
      if (this.props.toModel) {
        end = this.props.toModel.getValue() || "";
      }
      if (this.state.readOnly || this.state.bCanModify === false) {
        var value = start;
        if (this.props.toModel && !cb.utils.isEmpty(end) && !cb.utils.isEmpty(value)) value = value + '~' + end;
        return _react2.default.createElement(
          _antdMobile.List,
          null,
          _react2.default.createElement(
            _antdMobile.InputItem,
            { disabled: true, value: value },
            cShowCaption
          )
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'uretail_date' },
        _react2.default.createElement(
          _antdMobile.List,
          null,
          _react2.default.createElement(
            _antdMobile.WingBlank,
            { size: 'lg' },
            _react2.default.createElement(
              'span',
              { style: { float: 'left', margin: '0.15rem 0.3rem 0 0' } },
              this.props.title || cShowCaption
            ),
            this.props.toModel ? _react2.default.createElement(
              _antdMobile.Flex,
              { onClick: this.handClick.bind(this) },
              _react2.default.createElement(
                _antdMobile.Flex.Item,
                null,
                _react2.default.createElement(_antdMobile.InputItem, { placeholder: '\u5F00\u59CB\u65E5\u671F', disabled: true, clear: true, onChange: this.onChange.bind(this, 'start'), onFocus: this.onFocus.bind(this, 'start'), ref: function ref(startref) {
                    _this2.startref = startref;
                  }, value: start })
              ),
              ' - ',
              _react2.default.createElement(
                _antdMobile.Flex.Item,
                null,
                _react2.default.createElement(_antdMobile.InputItem, { placeholder: '\u7ED3\u675F\u65E5\u671F', disabled: true, clear: true, onChange: this.onChange.bind(this, 'end'), onFocus: this.onFocus.bind(this, 'end'), ref: function ref(endref) {
                    _this2.endref = endref;
                  }, value: end })
              )
            ) : _react2.default.createElement(
              _antdMobile.List,
              { onClick: this.handClick.bind(this) },
              _react2.default.createElement(_antdMobile.InputItem, { placeholder: '\u9009\u62E9\u65E5\u671F', disabled: true, clear: true, onChange: this.onChange.bind(this, 'start'), onFocus: this.onFocus.bind(this, 'start'), ref: function ref(startref) {
                  _this2.startref = startref;
                }, value: start })
            )
          )
        ),
        this.getControl()
      );
    }
  }]);

  return DatePickerControl;
}(_react.Component);

exports.default = DatePickerControl;