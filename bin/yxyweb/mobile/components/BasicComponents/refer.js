'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antdMobile = require('antd-mobile');

var _refer = require('../refer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReferControl = function (_Component) {
  _inherits(ReferControl, _Component);

  function ReferControl(props) {
    _classCallCheck(this, ReferControl);

    var _this = _possibleConstructorReturn(this, (ReferControl.__proto__ || Object.getPrototypeOf(ReferControl)).call(this, props));

    _this.setValue = function (value) {
      _this.setState({ value: value });
    };

    _this.okClick = function () {
      _this.state.vm.okClick();
      _this.close();
    };

    return _this;
  }

  _createClass(ReferControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) {
        this.props.model.addListener(this);
      }
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
    key: 'open',
    value: function open(e) {
      this.setState({ vm: e.vm });
      e.vm.get('table')._set_data('override', false);
      var control = void 0;
      control = _react2.default.createElement(_refer.ReferModel, { vm: e.vm, model: this.props.model, okClick: this.okClick, close: this.close.bind(this) });
      this.props.referStatus(control, true);
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.props.referStatus) this.props.referStatus(null, false);else this.context.router.history.goBack();
    }
  }, {
    key: 'handClick',
    value: function handClick() {
      if (this.state.disabled) return;
      var model = this.props.model || this.model;
      if (!model && this.props.cRefType) {
        //当不存在时
      }
      var _props = this.props,
          rowItem = _props.rowItem,
          rowModel = _props.rowModel;

      if (!this.props.referStatus) {
        var pathList = window.location.pathname.split('/');
        var pathname = pathList[pathList.length - 1];
        if (rowModel) {
          this.context.router.history.push('/voucherRefer/' + pathname + '/' + this.state.cItemName + '/' + rowItem.childrenField);
        } else {
          this.context.router.history.push('/voucherRefer/' + pathname + '/' + this.state.cItemName);
        }
        return;
      }
      if (model) {
        model.browse(true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) {
        return null;
      }
      var name = '请选择';var className = "";
      if (this.state && this.state.value && !cb.utils.isEmpty(this.state.value)) {
        className = "uretail_refer";
        name = this.state.value;
      }
      if (this.state.readOnly) return _react2.default.createElement(
        _antdMobile.List,
        null,
        _react2.default.createElement(
          _antdMobile.InputItem,
          { className: className, disabled: true, value: this.state.value },
          this.state.cShowCaption
        )
      );
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          _antdMobile.List,
          null,
          _react2.default.createElement(
            _antdMobile.List.Item,
            { onClick: this.handClick.bind(this), className: 'store-list', arrow: 'horizontal', extra: name },
            this.props.title || this.state.cShowCaption
          )
        )
      );
    }
  }]);

  return ReferControl;
}(_react.Component);

ReferControl.contextTypes = {
  router: _propTypes2.default.object.isRequired
};
exports.default = ReferControl;