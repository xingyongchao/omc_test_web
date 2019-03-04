'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antdMobile = require('antd-mobile');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReferTree = function (_Component) {
  _inherits(ReferTree, _Component);

  function ReferTree(props) {
    _classCallCheck(this, ReferTree);

    var _this = _possibleConstructorReturn(this, (ReferTree.__proto__ || Object.getPrototypeOf(ReferTree)).call(this, props));

    _this.setValue = function (value) {
      if (cb.utils.isArray(value)) return;
      _this.setState({ value: value });
    };

    _this.onCheckedChange = function (e, ele) {
      var _this$state = _this.state,
          keyField = _this$state.keyField,
          selectedKeys = _this$state.selectedKeys,
          multiple = _this$state.multiple;

      var checked = e.target.checked;
      var keys = [];
      if (!multiple) {
        _this.props.model.select(ele[keyField]);
        if (_this.props.goBack) _this.props.goBack();
        return;
      }
      if (checked) {
        selectedKeys.push(ele[keyField]);
        keys = selectedKeys;
      } else {
        selectedKeys.map(function (key) {
          if (key != ele[keyField]) keys.push(key);
        });
      }
      _this.props.model.select(keys);
    };

    _this.onListItemClick = function (e, node) {
      if (e.target.type == 'checkbox') return;
      var _this$state2 = _this.state,
          keyField = _this$state2.keyField,
          expandKeys = _this$state2.expandKeys;

      var keys = [];
      if (_lodash2.default.indexOf(expandKeys, node[keyField]) == -1) {
        expandKeys.push(node[keyField]);
        keys = expandKeys;
      } else {
        expandKeys.map(function (key) {
          if (key != node[keyField]) keys.push(key);
        });
      }
      _this.setState({ "expandKeys": keys });
    };

    _this.state = {
      selectedKeys: [],
      expandKeys: [],
      keyMap: {}
    };
    return _this;
  }

  _createClass(ReferTree, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params) {
      var value = params.value,
          keyField = params.keyField;

      delete params.value;
      var select = this.state.select;

      if (select && select.length) {
        var checkedKeys = [];
        select.forEach(function (item) {
          checkedKeys.push(item[keyField]);
        });
        params.checkedKeys = checkedKeys;
      }
      this.setState(params);
      if (value) this.setValue(value);
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(data) {
      this.setState({ dataSource: data, isLoading: false, refreshing: false });
    }
  }, {
    key: 'loopTreeNodes',
    value: function loopTreeNodes(nodes) {
      var _this2 = this;

      if (!nodes || nodes.length == 0) return null;
      var _state = this.state,
          keyField = _state.keyField,
          selectedKeys = _state.selectedKeys,
          expandKeys = _state.expandKeys;

      var controls = [];
      nodes.map(function (node) {
        var checked = void 0,
            expanded = void 0,
            level = void 0;
        if (_lodash2.default.indexOf(selectedKeys, node[keyField]) != -1) checked = true;
        if (_lodash2.default.indexOf(expandKeys, node[keyField]) != -1) expanded = true;
        level = node.path.split('|').length - 1;
        /*add by jinzh1  特殊处理商品类别参照 path不规范*/
        if (node.path[0] == '|') level -= 1;

        if (node.children) {
          controls.push(_react2.default.createElement(
            _antdMobile.List.Item,
            { className: "refer-row-level" + level, key: node.name, onClick: function onClick(e) {
                return _this2.onListItemClick(e, node);
              }, arrow: expanded ? "up" : "down",
              thumb: _react2.default.createElement(_antdMobile.Checkbox, { checked: checked, onChange: function onChange(e) {
                  return _this2.onCheckedChange(e, node);
                } }) },
            node.name
          ));
          if (expanded) {
            var newControl = _this2.loopTreeNodes(node.children);
            controls = controls.concat(newControl);
          }
        } else {
          controls.push(_react2.default.createElement(
            _antdMobile.List.Item,
            { className: "refer-row-level" + level, key: node.name, thumb: _react2.default.createElement(_antdMobile.Checkbox, { checked: checked,
                onChange: function onChange(e) {
                  return _this2.onCheckedChange(e, node);
                } }) },
            node.name
          ));
        }
      });
      return controls;
    }
  }, {
    key: 'loopFirst',
    value: function loopFirst(dataSource) {
      var _this4 = this;

      if (!dataSource || dataSource.length == 0) return null;
      var _state2 = this.state,
          keyField = _state2.keyField,
          selectedKeys = _state2.selectedKeys;

      var secondArr = [];
      dataSource.forEach(function (element) {
        var _this3 = this;

        var ele = void 0,
            checked = void 0;
        if (_lodash2.default.indexOf(selectedKeys, element[keyField]) != -1) checked = true;
        if (element.children) {
          var secondData = this.loopSecond(element.children);
          ele = _react2.default.createElement(
            _antdMobile.Accordion.Panel,
            { key: element.name,
              header: _react2.default.createElement(
                _antdMobile.Checkbox,
                { checked: checked, onChange: function onChange(e) {
                    return _this3.onCheckedChange(e, element);
                  } },
                element.name
              ) },
            secondData
          );
        } else {
          ele = _react2.default.createElement(
            _antdMobile.List.Item,
            { key: element.name, onClick: this.onListItemClick, thumb: _react2.default.createElement(_antdMobile.Checkbox, { checked: checked,
                extra: _react2.default.createElement(_antdMobile.Icon, { type: 'down' }), onChange: function onChange(e) {
                  return _this3.onCheckedChange(e, element);
                } }) },
            element.name
          );
        }
        secondArr.push(ele);
      }, this);
      var finalEle = _react2.default.createElement(
        _antdMobile.Accordion,
        { activeKey: this.state.secondKey, accordion: true, onChange: function onChange(key) {
            return _this4.handleTabChange(key, 'second');
          } },
        secondArr
      );
      return finalEle;
    }
  }, {
    key: 'loopSecond',
    value: function loopSecond(dataSource) {
      var _state3 = this.state,
          keyField = _state3.keyField,
          selectedKeys = _state3.selectedKeys;

      var thirdArr = [];
      dataSource.forEach(function (element) {
        var _this5 = this;

        var ele = _react2.default.createElement(
          _antdMobile.List.Item,
          { key: element.name, thumb: _react2.default.createElement(_antdMobile.Checkbox, { checked: _lodash2.default.indexOf(selectedKeys, element[keyField]) != -1,
              onChange: function onChange(e) {
                return _this5.onCheckedChange(e, element);
              } }) },
          element.name
        );
        thirdArr.push(ele);
      }, this);
      return thirdArr;
    }
  }, {
    key: 'handleTabChange',
    value: function handleTabChange(key, flag) {
      if (flag == 'first') this.setState({ firstKey: key, secondKey: null });
      if (flag == 'second') this.setState({ secondKey: key });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state) {
        return null;
      }
      var control = this.loopTreeNodes(this.state.dataSource);
      return _react2.default.createElement(
        _antdMobile.List,
        { className: 'billing-cz' },
        control
      );
    }
  }]);

  return ReferTree;
}(_react.Component);

exports.default = ReferTree;