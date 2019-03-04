'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _refer = require('../refer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeReferControl = function (_Component) {
  _inherits(TreeReferControl, _Component);

  function TreeReferControl(props) {
    _classCallCheck(this, TreeReferControl);

    var _this = _possibleConstructorReturn(this, (TreeReferControl.__proto__ || Object.getPrototypeOf(TreeReferControl)).call(this, props));

    _this.close = function () {
      _this.props.referStatus(null, false);
    };

    _this.handClick = function () {
      if (_this.state.disabled) return;
      var model = _this.props.model || _this.model;
      if (!model && _this.props.cRefType) {
        //当不存在时
      }
      if (model) {
        model.browse(true);
      }
    };

    return _this;
  }

  _createClass(TreeReferControl, [{
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
      var control = void 0;
      control = _react2.default.createElement(_refer.TreeReferModel, { height: window.innerHeight, vm: e.vm, model: this.props.model, close: this.close });
      this.props.referStatus(control, true);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) {
        return null;
      }
      var name = '请选择';var className = "";
      if (this.props.model.get('text')) {
        name = this.props.model.get('text');
        className = "uretail_refer";
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          _antdMobile.List,
          null,
          _react2.default.createElement(
            _antdMobile.List.Item,
            { onClick: this.handClick, className: 'store-list', arrow: 'horizontal', extra: name },
            this.props.title
          )
        )
      );
    }
  }]);

  return TreeReferControl;
}(_react.Component);

exports.default = TreeReferControl;