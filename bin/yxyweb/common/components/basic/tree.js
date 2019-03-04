'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeControl = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = _antd.Tree.TreeNode;

var TreeControl = exports.TreeControl = function (_React$Component) {
  _inherits(TreeControl, _React$Component);

  function TreeControl(props) {
    _classCallCheck(this, TreeControl);

    var _this = _possibleConstructorReturn(this, (TreeControl.__proto__ || Object.getPrototypeOf(TreeControl)).call(this, props));

    _this.state = {
      multiple: _this.props.multiple || false,
      checkable: _this.props.checkable || false,
      expandAll: _this.props.expandAll || false,
      keyField: _this.props.keyField || 'key',
      titleField: _this.props.titleField || 'title',
      childrenField: _this.props.childrenField || 'children',
      visible: !props.bHidden,
      dataSource: [],
      renderFlag: true
    };
    return _this;
  }

  _createClass(TreeControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var childrenField = this.state.childrenField;
      if (!nextProps.dataSource || this.props.id === nextProps.id) return;
      var states = { dataSource: nextProps.dataSource };
      if (this.state.expandAll) {
        var keyField = this.state.keyField;
        var expandedKeys = [];
        var loop = function loop(data) {
          return data.map(function (item) {
            expandedKeys.push(item[keyField]);
            if (item[childrenField]) loop(item[childrenField]);
          });
        };
        loop(nextProps.dataSource);
        states.expandedKeys = expandedKeys;
      }
      this.setState(states);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'onSelect',
    value: function onSelect(selectedKeys, e) {
      if (this.props.onSelect) this.props.onSelect(selectedKeys, e);
      if (this.props.model) this.props.model.select(selectedKeys);
    }
  }, {
    key: 'onExpand',
    value: function onExpand(expandedKeys, e) {
      this.setState({ expandedKeys: expandedKeys });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var titleField = this.state.titleField;
      var keyField = this.state.keyField;
      var childrenField = this.state.childrenField;

      var loop = function loop(data) {
        return data.map(function (item) {
          if (item[childrenField]) {
            return _react2.default.createElement(
              TreeNode,
              { data: item, title: item[titleField], key: item[keyField] },
              loop(item[childrenField])
            );
          }
          return _react2.default.createElement(TreeNode, { data: item, title: item[titleField], key: item[keyField], isLeaf: item.isLeaf, disabled: item.disabled }); //onClick={}
        });
      };
      var treeNodes = loop(this.state.dataSource);
      var treeProps = {
        autoExpandParent: false,
        multiple: this.state.multiple,
        checkable: this.state.checkable,
        expandedKeys: this.state.expandedKeys
      };
      var style = this.state.visible ? {} : { display: "none" };
      return _react2.default.createElement(
        _antd.Tree,
        _extends({ style: style, onExpand: function onExpand(expandedKeys, e) {
            return _this2.onExpand(expandedKeys, e);
          }, onSelect: function onSelect(selectedKeys, e) {
            return _this2.onSelect(selectedKeys, e);
          } }, treeProps),
        treeNodes
      );
    }
  }]);

  return TreeControl;
}(_react2.default.Component);

;
exports.default = TreeControl;