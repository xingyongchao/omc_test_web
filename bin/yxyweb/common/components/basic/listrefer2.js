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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;

var ListRefer = function (_Component) {
  _inherits(ListRefer, _Component);

  function ListRefer(props) {
    _classCallCheck(this, ListRefer);

    var _this = _possibleConstructorReturn(this, (ListRefer.__proto__ || Object.getPrototypeOf(ListRefer)).call(this, props));

    _this.state = {
      bIsNull: props.bIsNull
    };
    return _this;
  }

  _createClass(ListRefer, [{
    key: 'getModel',
    value: function getModel() {
      return this.props.model || this.model;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.focus) this.refs.input.refs.input.focus();
      // this.onClick();
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (this.hasClicked) return;
      this.hasClicked = true;
      this.onClick();
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
      if (this.props.model) return;
      if (nextProps.value != this.state.value) this.setState({ value: nextProps.value });
    }
  }, {
    key: 'open',
    value: function open(e) {
      this.referViewModel = e.vm;
      this.gridModel = e.vm.get('table');
      this.gridModel.addListener(this);
      if (typeof this.props.afterOkClick === 'function') this.referViewModel.on('afterOkClick', this.props.afterOkClick);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.setState({ value: value });
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var model = this.getModel();
      if (!model && this.props.cRefType) {
        this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
        this.model.addListener(this);
      }
      model = this.getModel();
      if (model && model.browse) model.browse(true);
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
    key: 'onChange',
    value: function onChange(value) {
      var referValue = void 0;
      if (value == null) {
        referValue = value;
      } else {
        this.gridModel.select([value]);
        referValue = this.gridModel.getSelectedRows();
      }
      this.referViewModel.execute('afterOkClick', referValue);
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

      var baseControl = null;
      if (this.state.readOnly) {
        baseControl = (0, _text2.default)(this.state.value);
      } else {
        // if (!this.state.dataSource || !this.state.dataSource.length)
        //   return baseControl;
        var dataSource = this.state.dataSource || [];
        var titleField = this.state.textField || 'name';
        var keyField = this.state.keyField || 'code';
        var value = dataSource.findIndex(function (item) {
          return item[titleField] === _this2.state.value;
        });
        if (value === -1) {
          value = this.state.value;
        } else {
          value = value.toString();
        }
        var loop = function loop(data) {
          return data.map(function (item, index) {
            return _react2.default.createElement(
              Option,
              { value: index.toString() },
              item[titleField]
            );
          });
        };
        var optionNodes = loop(dataSource);
        baseControl = _react2.default.createElement(
          _antd.Select,
          {
            onFocus: function onFocus() {
              return _this2.handleClick();
            },
            value: value,
            allowClear: true,
            onChange: function onChange(value) {
              return _this2.onChange(value);
            }
          },
          optionNodes
        );
      }
      return baseControl;
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _this3 = this;

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
      var control = cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: title }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return control;
    }
  }]);

  return ListRefer;
}(_react.Component);

exports.default = ListRefer;