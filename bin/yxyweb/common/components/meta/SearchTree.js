'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchTreeControl = undefined;

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
var Option = _antd.Select.Option;

var SearchTreeControl = exports.SearchTreeControl = function (_React$Component) {
  _inherits(SearchTreeControl, _React$Component);

  function SearchTreeControl(props) {
    _classCallCheck(this, SearchTreeControl);

    var _this = _possibleConstructorReturn(this, (SearchTreeControl.__proto__ || Object.getPrototypeOf(SearchTreeControl)).call(this, props));

    _this.onCheck = function (checkedKeys) {
      if (_this.props.model) _this.props.model.check(checkedKeys);
    };

    _this.handleSearchClick = function (e) {
      _this.flag = true;
    };

    _this.handleTreeClick = function (e) {
      _this.flag = true;
    };

    _this.handleClick = function (e) {
      if (_this.flag) {
        _this.flag = false;
        return;
      }
      _this.onSelect([]);
    };

    var filterProps = ['name'];
    var placeholder = null;
    if (props.config) {
      var config = null;
      try {
        config = JSON.parse(_this.props.config);
      } catch (e) {
        config = {};
      }
      if (cb.utils.isArray(config.filters)) filterProps = config.filters;
      if (config.placeholder) placeholder = config.placeholder;
    }
    _this.state = {
      multiple: _this.props.multiple || false,
      checkable: _this.props.checkable || false,
      expandAll: _this.props.expandAll || false,
      keyField: _this.props.keyField || 'key',
      titleField: _this.props.titleField || 'title',
      childrenField: _this.props.childrenField || 'children',
      expandedKeys: _this.props.expandedKeys || [],
      visible: !props.bHidden,
      autoExpandParent: false,
      selectedKeys: [],
      checkedKeys: [],
      dataSource: [],
      optionData: [],
      renderFlag: true,
      searchValue: '', //搜索框的value
      selectKey: '', //搜索框下拉选中值
      filterProps: filterProps,
      placeholder: placeholder
    };
    _this.selectDataSource = []; //拍平的datasource
    return _this;
  }

  _createClass(SearchTreeControl, [{
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
      var states = { dataSource: nextProps.dataSource, optionData: nextProps.dataSource };
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
      if (e) {
        //通过点击＋或者-触发
        this.setState({ expandedKeys: expandedKeys, autoExpandParent: false });
      } else {
        //通过搜索触发
        this.setState({ expandedKeys: expandedKeys, autoExpandParent: true });
      }
    }
  }, {
    key: 'searchSelect',
    value: function searchSelect(value, option) {
      var _state = this.state,
          selectData = _state.selectData,
          expandedKeys = _state.expandedKeys;

      var currentData = selectData.find(function (item) {
        return item.id == value;
      });
      var newExpandedKeys = [].concat(expandedKeys);
      if (currentData && currentData.parent) {
        var expandedKey = currentData.parent.toString();
        if (newExpandedKeys.indexOf(expandedKey) === -1) newExpandedKeys.push(expandedKey);
      }
      this.onExpand(newExpandedKeys);
      this.onSelect([value]);
    }
  }, {
    key: 'fetch',
    value: function fetch(value, callback) {
      var dataSource = this.selectDataSource;
      var filterProps = this.state.filterProps;

      var data = [];
      dataSource.forEach(function (ele) {
        filterProps.forEach(function (field) {
          if (ele[field].indexOf(value) < 0) return;
          data.push(ele);
        });
      });
      callback(data);
    }
  }, {
    key: 'getSelectData',
    value: function getSelectData(data, parent) {
      var childrenField = this.props.childrenField;

      data.forEach(function (ele) {
        var item = { parent: parent };
        for (var attr in ele) {
          if (attr === childrenField) continue;
          item[attr] = ele[attr];
        }
        this.selectDataSource.push(item);
        if (ele.children) {
          this.getSelectData(ele.children, ele.id);
        }
      }, this);
    }
  }, {
    key: 'onSearch',
    value: function onSearch(value) {
      var _this2 = this;

      this.setState({ searchValue: value });
      this.fetch(value, function (selectData) {
        return _this2.setState({ selectData: selectData });
      });
    }
  }, {
    key: 'getSearchOptions',
    value: function getSearchOptions() {
      var searchValue = this.state.searchValue;
      if (searchValue == '') return;
      var selectData = this.state.selectData;
      var options = [];
      selectData.forEach(function (ele) {
        options.push(_react2.default.createElement(
          Option,
          { key: ele[this.state.keyField] },
          ele[this.state.titleField]
        ));
      }, this);
      return options;
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      this.selectDataSource = [];
      this.getSelectData(dataSource);
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

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
        multiple: this.state.multiple,
        checkable: this.state.checkable,
        expandedKeys: this.state.expandedKeys,
        selectedKeys: this.state.selectedKeys,
        checkedKeys: this.state.checkedKeys,
        autoExpandParent: this.state.autoExpandParent
      };
      var style = this.state.visible ? {} : { display: "none" };
      var options = this.getSearchOptions();
      return _react2.default.createElement(
        'div',
        { onClick: this.handleClick, className: 'bg-white border-r', style: { width: '240px', height: this.props.height } },
        _react2.default.createElement(
          'div',
          { onClick: this.handleSearchClick, className: 'search-tree-2' },
          _react2.default.createElement(_antd.Button, { icon: 'search' }),
          _react2.default.createElement(
            _antd.Select,
            { placeholder: this.state.placeholder, mode: 'combobox', value: this.state.searchValue, notFoundContent: '\u554A\u54E6\uFF01\u6CA1\u6B64\u8282\u70B9\u54E6\uFF01',
              onSelect: function onSelect(value, option) {
                return _this3.searchSelect(value, option);
              }, onSearch: function onSearch(value) {
                return _this3.onSearch(value);
              },
              defaultActiveFirstOption: false, showArrow: false, filterOption: false, onChange: this.handleChange, dropdownMatchSelectWidth: false },
            options
          )
        ),
        _react2.default.createElement(
          'div',
          { onClick: this.handleTreeClick, className: 'search-tree-3' },
          _react2.default.createElement(
            _antd.Tree,
            _extends({ key: treeNodes.length, style: style, onExpand: function onExpand(expandedKeys, e) {
                return _this3.onExpand(expandedKeys, e);
              }, onSelect: function onSelect(selectedKeys, e) {
                return _this3.onSelect(selectedKeys, e);
              }, onCheck: this.onCheck }, treeProps),
            treeNodes
          )
        )
      );
    }
  }]);

  return SearchTreeControl;
}(_react2.default.Component);

;
exports.default = SearchTreeControl;