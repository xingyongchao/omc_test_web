'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _refer = require('../refer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoucherRefer = function (_Component) {
  _inherits(VoucherRefer, _Component);

  function VoucherRefer(props) {
    _classCallCheck(this, VoucherRefer);

    var _this = _possibleConstructorReturn(this, (VoucherRefer.__proto__ || Object.getPrototypeOf(VoucherRefer)).call(this, props));

    _this.okClick = function () {
      _this.state.vm.okClick();
      _this.context.router.history.goBack();
    };

    var params = props.match.params;
    _this.state = {
      itemName: params.itemName,
      menuId: params.menuId,
      parentItem: params.parentItem
    };
    return _this;
  }

  _createClass(VoucherRefer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var location = this.props.location;
      var _state = this.state,
          menuId = _state.menuId,
          itemName = _state.itemName,
          parentItem = _state.parentItem;

      var panes = this.props.portal.tabs[menuId].panes;
      if (panes && panes.length > 0) {
        if (parentItem) this.model = panes[panes.length - 1].content.vm.get(parentItem).getEditRowModel().get(itemName);else this.model = panes[panes.length - 1].content.vm.get(itemName);
        if (this.model) {
          this.model.addListener(this);
          this.model.browse(true);
        }
      }
    }
  }, {
    key: 'open',
    value: function open(e) {
      this.setState({ vm: e.vm });
      e.vm.get('table')._set_data('override', false);
      // this.props.referStatus(control, true);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.model) this.model.removeListener(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var vm = this.state.vm;

      if (!vm || !this.model) return null;
      return _react2.default.createElement(
        'div',
        { className: 'Return-reference' },
        _react2.default.createElement(_refer.ReferModel, { vm: vm, model: this.model, okClick: this.okClick })
      );
    }
  }]);

  return VoucherRefer;
}(_react.Component);

VoucherRefer.contextTypes = {
  router: _propTypes2.default.object.isRequired
};


function mapToPropsState(state) {
  return {
    portal: state.portal.toJS()
  };
}

// function mapToPropsDispatch(dispatch){
//   return {
//   }
// }

exports.default = (0, _reactRedux.connect)(mapToPropsState)(VoucherRefer);