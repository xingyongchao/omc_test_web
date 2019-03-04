'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _refer = require('../refer');

var _antdMobile = require('antd-mobile');

var _NavBar = require('../NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeReferModel = function (_Component) {
  _inherits(TreeReferModel, _Component);

  function TreeReferModel(props) {
    _classCallCheck(this, TreeReferModel);

    var _this = _possibleConstructorReturn(this, (TreeReferModel.__proto__ || Object.getPrototypeOf(TreeReferModel)).call(this, props));

    _this.onOkClick = function (e, referViewModel) {
      var treeModel = referViewModel.get('tree');
      referViewModel.execute('afterOkClick', treeModel.getSelectedNodes());
      _this.props.close();
    };

    return _this;
  }

  _createClass(TreeReferModel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      this.searchBoxModel = this.props.vm.get('searchBox');
      this.searchBoxModel.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
      this.searchBoxModel = this.props.vm.get('searchBox');
      this.searchBoxModel.removeListener(this);
    }
  }, {
    key: 'onLeftClick',
    value: function onLeftClick() {
      this.props.close();
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
    key: 'getHeight',
    value: function getHeight() {
      if (window) {
        var height = this.props.height - window.__fontUnit * (1.4 + 1.28);
        if (height > 0) return height;
      }
      return undefined;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.state) {
        return null;
      }
      var searTxt = this.state.searTxt;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_NavBar2.default, { title: this.state.itemTitle + '参照', onLeftClick: this.onLeftClick.bind(this) }),
        _react2.default.createElement(
          'div',
          { style: { height: this.getHeight(), overflow: 'scroll' } },
          _react2.default.createElement(_refer.ReferTree, { model: this.props.vm.get('tree'), cRefType: this.state.cRefType })
        ),
        _react2.default.createElement(
          _antdMobile.Flex,
          { className: 'tree-refer-button' },
          _react2.default.createElement(
            _antdMobile.Flex.Item,
            null,
            _react2.default.createElement(
              _antdMobile.Button,
              { onClick: function onClick(e) {
                  return _this2.onOkClick(e, _this2.props.vm);
                } },
              '\u786E\u5B9A'
            )
          )
        )
      );
    }
  }]);

  return TreeReferModel;
}(_react.Component);

exports.default = TreeReferModel;