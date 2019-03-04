'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _refer = require('../refer');

var _antdMobile = require('antd-mobile');

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _SvgIcon = require('../../../common/components/common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReferModel = function (_Component) {
  _inherits(ReferModel, _Component);

  function ReferModel(props) {
    _classCallCheck(this, ReferModel);

    var _this = _possibleConstructorReturn(this, (ReferModel.__proto__ || Object.getPrototypeOf(ReferModel)).call(this, props));

    _this.onLeftClick = function () {
      if (_this.state.showTree) {
        _this.setState({ 'showTree': false });
        return;
      }
      if (_this.props.close) {
        _this.props.close();
      } else {
        //设置状态栏字体白色
        cb.utils.setStatusBarStyle("light");
        _this.context.router.history.goBack();
      }
    };

    _this.state = {
      showTree: false
    };
    cb.utils.setStatusBarStyle("dark");
    _this.referType = 'Table';
    return _this;
  }

  _createClass(ReferModel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.vm) {
        this.searchBoxModel = this.props.vm.get('searchBox');
        this.referType = this.props.vm.getCache('referType');
      }
      this.searchBoxModel.addListener(this);
      this.tableHeight = document.documentElement.offsetHeight - (window.__fontUnit * 1.28 + 44);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
      this.searchBoxModel.removeListener(this);
    }
  }, {
    key: 'onSearch',
    value: function onSearch() {
      this.searchBoxModel.execute('search', this.state.searTxt);
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.setState({ searTxt: value });
    }
  }, {
    key: 'onCancel',
    value: function onCancel(type) {
      this.setState({ searTxt: '' });
      if (type === 'cancel') {
        this.searchBoxModel.execute('search', '');
      }
    }
  }, {
    key: 'getRightContent',
    value: function getRightContent() {
      var _this2 = this;

      if (this.referType != 'TreeTable' || this.state.showTree == true) return null;
      return _react2.default.createElement(
        'div',
        { onClick: function onClick() {
            _this2.setState({ "showTree": true });
          } },
        _react2.default.createElement(_SvgIcon2.default, { type: 'shaixuan', style: { width: '0.42rem', height: '0.42rem', marginTop: '0.08rem' } })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) {
        return null;
      }
      var _state = this.state,
          searTxt = _state.searTxt,
          showTree = _state.showTree;

      var rightContent = this.getRightContent();
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_NavBar2.default, { title: this.state.itemTitle || this.state.cShowCaption + '参照', onLeftClick: this.onLeftClick,
          rightContent: rightContent }),
        showTree ? null : _react2.default.createElement(_antdMobile.SearchBar, { value: searTxt, placeholder: this.state.placeholder, onSubmit: this.onSearch.bind(this), onChange: this.onChange.bind(this), onClear: this.onCancel.bind(this, 'clear'), onCancel: this.onCancel.bind(this, 'cancel') }),
        _react2.default.createElement(
          'div',
          { style: { 'display': showTree ? 'none' : 'block' } },
          _react2.default.createElement(_refer.ReferList, { okClick: this.props.okClick, model: this.props.vm.get('table'), cRefType: this.state.cRefType, height: this.tableHeight })
        ),
        _react2.default.createElement(
          'div',
          { style: { 'display': showTree ? 'block' : 'none' } },
          _react2.default.createElement(_refer.ReferTree, { model: this.props.vm.get('tree'), cRefType: this.state.cRefType, goBack: this.onLeftClick })
        )
      );
    }
  }]);

  return ReferModel;
}(_react.Component);

ReferModel.contextTypes = {
  router: _propTypes2.default.object.isRequired
};
exports.default = ReferModel;