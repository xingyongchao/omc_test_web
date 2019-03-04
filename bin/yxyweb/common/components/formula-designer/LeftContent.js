'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _formula = require('../../redux/formula');

var formulaActions = _interopRequireWildcard(_formula);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = _antd.Tree.TreeNode;

var LeftContent = function (_Component) {
  _inherits(LeftContent, _Component);

  function LeftContent(props) {
    _classCallCheck(this, LeftContent);

    var _this = _possibleConstructorReturn(this, (LeftContent.__proto__ || Object.getPrototypeOf(LeftContent)).call(this, props));

    _this.onSelect = function (selectedKeys) {
      if (!selectedKeys.length) selectedKeys = _this.state.selectedKeys;
      _this.setState({ selectedKeys: selectedKeys });
      _this.props.formulaActions.select(selectedKeys[0]);
    };

    _this.onLoadData = function (treeNode) {
      _this.props.formulaActions.getEntityInfo(treeNode.props.eventKey);
    };

    _this.state = {
      selectedKeys: []
    };
    return _this;
  }

  _createClass(LeftContent, [{
    key: 'renderTreeNodes',
    value: function renderTreeNodes(treeData) {
      var _this2 = this;

      return treeData.map(function (item) {
        var mergeCode = item.mergeCode,
            title = item.title,
            isExpand = item.isExpand,
            children = item.children;

        if (isExpand) return _react2.default.createElement(
          TreeNode,
          { title: title, key: mergeCode },
          _this2.renderTreeNodes(children || [])
        );
        return _react2.default.createElement(TreeNode, { title: title, key: mergeCode, isLeaf: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$formula = this.props.formula,
          treeData = _props$formula.treeData,
          billNo = _props$formula.billNo;

      if (!treeData || !treeData.length) return null;
      var treeNodes = this.renderTreeNodes(treeData);
      return _react2.default.createElement(
        _antd.Tree,
        { key: billNo, selectedKeys: this.state.selectedKeys, onSelect: this.onSelect, loadData: this.onLoadData },
        treeNodes
      );
    }
  }]);

  return LeftContent;
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LeftContent);