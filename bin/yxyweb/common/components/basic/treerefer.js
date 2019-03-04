'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _reactDom = require('react-dom');

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = _antd.Tree.TreeNode;
var Search = _antd.Input.Search;

var TreeRefer = function (_Component) {
  _inherits(TreeRefer, _Component);

  function TreeRefer(props) {
    _classCallCheck(this, TreeRefer);

    var _this = _possibleConstructorReturn(this, (TreeRefer.__proto__ || Object.getPrototypeOf(TreeRefer)).call(this, props));

    _this.open = function (e) {
      _this.referViewModel = e.vm;
      _this.treeModel = e.vm.get('tree');
      _this.treeModel.addListener(_this);
      if (typeof _this.props.afterOkClick === 'function') _this.referViewModel.on('afterOkClick', _this.props.afterOkClick);
    };

    _this.setValue = function (value) {
      if (cb.utils.isArray(value)) return;
      _this.setState({ value: value });
    };

    _this.setDataSource = function (dataSource) {
      _this.setState({ dataSource: dataSource });
    };

    _this.getModel = function () {
      return _this.props.model || _this.model;
    };

    _this.handleClick = function () {
      if (_this.state.disabled) return;
      if (!_this.refresh) {
        if (_this.hasClicked) return;
        _this.hasClicked = true;
      }
      _this.onClick();
    };

    _this.onClick = function () {
      var model = _this.getModel();
      if (!model && _this.props.cRefType) {
        _this.model = new cb.models.ReferModel({ cRefType: _this.props.cRefType, multiple: _this.props.multiple, isList: _this.props.isList ? true : false, value: _this.props.value });
        _this.model.addListener(_this);
      }
      model = _this.getModel();
      if (model) model.browse();
    };

    _this.handleJointQuery = function () {
      var model = _this.getModel();
      if (!model && _this.props.cRefType) {
        _this.model = new cb.models.ReferModel({ cRefType: _this.props.cRefType, multiple: _this.props.multiple, isList: _this.props.isList ? true : false, value: _this.props.value });
        _this.model.addListener(_this);
      }
      model = _this.getModel();
      if (model) model.fireEvent('jointQuery');
    };

    _this.onSelect = function (selectedKeys, e) {
      if (_this.props.onSelect) _this.props.onSelect(selectedKeys, e);
      if (_this.treeModel) _this.treeModel.select(selectedKeys);
      _this.setState({ showPop: false });
      _this.referViewModel.execute('afterOkClick', _this.treeModel.getSelectedNodes());
    };

    _this.onPopClick = function () {
      var disabled = _this.state.disabled;
      if (disabled) return;
      _this.setState({
        showPop: !_this.state.showPop
      });
    };

    _this.onCheck = function (checkedKeys, e) {
      var bLinkage = _this.state.bLinkage;
      var checkKeys = void 0,
          halfCheckKeys = void 0;
      if (checkedKeys.checked) {
        checkKeys = checkedKeys.checked;
        halfCheckKeys = checkedKeys.halfChecked;
      } else {
        checkKeys = checkedKeys;
        halfCheckKeys = e.halfCheckedKeys;
      }
      if (bLinkage) _this.changeLinkage(checkKeys, halfCheckKeys, e);else _this.setState({ checkedKeys: checkKeys, halfCheckedKeys: halfCheckKeys });
    };

    _this.changeLinkage = function (checkKeys, halfCheckKeys, e) {
      var key = e.node.props.eventKey;
      if (!_this.keyMap) _this.keyMap = _this.treeModel.get('keyMap');
      var node = _this.keyMap[key];
      if (e.checked) checkKeys.pop();
      checkKeys = _this.loopTreeNodes(node, checkKeys, e.checked);
      _this.setState({ checkedKeys: checkKeys, halfCheckedKeys: halfCheckKeys });
    };

    _this.loopTreeNodes = function (node, checkKeys, bChecked) {
      if (bChecked) {
        checkKeys.push(node[_this.state.keyField]);
      } else {
        // let keys = cb.utils.extend(true, [], checkKeys);
        var keys = [];
        checkKeys.map(function (key, index) {
          // if (key == node[this.state.keyField])
          // keys.splice(index, 1);
          if (key != node[_this.state.keyField]) keys.push(key);
        });
        checkKeys = keys;
      }
      if (node.children) {
        node.children.map(function (n) {
          checkKeys = _this.loopTreeNodes(n, checkKeys, bChecked);
        });
      }
      return checkKeys;
    };

    _this.onButtonClick = function (e, type) {
      var model = _this.getModel();
      model.execute('blur');
      var keys = _this.state.checkedKeys;
      if (type == 'submit') {
        if (_this.props.onSelect) _this.props.onSelect(keys, e);
        if (_this.treeModel) _this.treeModel.select(keys);
        _this.referViewModel.execute('afterOkClick', _this.treeModel.getSelectedNodes());
      }
      _this.setState({ showPop: false });
    };

    _this.onClear = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (_this.props.onSelect) _this.props.onSelect([], e);
      if (_this.treeModel) _this.treeModel.select([]);
      _this.setState({ checkedKeys: [], showPop: false });
      var model = _this.getModel();
      model.setValue(null, true);
      model.execute('blur');
    };

    _this.onVisibleChange = function (visible) {
      var disabled = _this.state.disabled;
      if (disabled) return;
      _this.setState({ showPop: visible });
      if (!visible) {
        var model = _this.getModel();
        model.execute('blur');
      }
    };

    _this.onSearchChange = function (e) {
      var value = e.target.value;
      var data = _this.state.dataSource;
      var _this$state = _this.state,
          titleField = _this$state.titleField,
          keyField = _this$state.keyField;

      var loop = function loop(data) {
        return data.map(function (item) {
          if (item[titleField] && item[titleField].indexOf(value) > -1) _this.expandedKeys.push(item[keyField]);
          if (item.children) {
            loop(item.children);
          }
        });
      };
      if (value != '') loop(data);

      _this.setState({
        expandedKeys: _this.expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
      _this.expandedKeys = [];
    };

    _this.onExpand = function (expandedKeys, node) {
      _this.setState({
        expandedKeys: expandedKeys,
        autoExpandParent: false
      });
    };

    _this.filterTreeNode = function (node) {
      // return ['2'];
    };

    _this.handleBodyClick = function (e) {
      document.body.removeEventListener('click', _this.handleBodyClick);
      if (_this.contains(_this.refs.treerefer, e.target)) return;
      // ant-popover-inner-content
      if (e.target && cb.dom((0, _reactDom.findDOMNode)(e.target)).parents('div.ant-popover-inner-content').length) return;
      var model = _this.getModel();
      model.execute('blur');
    };

    _this.onLinkageChange = function (e) {
      _this.setState({
        "bLinkage": e.target.checked
      });
    };

    _this.getTreeRefer = function () {
      var _this$state2 = _this.state,
          multiple = _this$state2.multiple,
          disabled = _this$state2.disabled,
          value = _this$state2.value,
          showPop = _this$state2.showPop;

      var contentClass = "",
          showClear = false,
          selectionControl = null;
      if (value && value != "") {
        selectionControl = _react2.default.createElement(
          'span',
          { className: 'ant-select-selection-selected-value' },
          value
        );
        showClear = true;
      } else {
        selectionControl = _react2.default.createElement('span', { className: 'ant-select-selection__placeholder' });
      }
      if (disabled) {
        contentClass = "ant-select ant-select-disabled  ant-select-allow-clear";
      } else {
        contentClass = "ant-select ant-select-enabled ant-select-allow-clear";
      }
      if (showPop) contentClass = contentClass + '  ant-select-open ant-select-focused';

      var clearControl = showClear ? _react2.default.createElement('span', { onClick: _this.onClear, className: 'ant-select-selection__clear' }) : _react2.default.createElement('span', null);
      return _react2.default.createElement(
        'span',
        { ref: function ref(node) {
            return _this.input = node;
          }, onClick: _this.onClick, className: contentClass },
        _react2.default.createElement(
          'span',
          { className: 'uretail-treerefer-selection ant-select-selection ant-select-selection--single', role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'true', tabIndex: '0', 'aria-expanded': 'false' },
          _react2.default.createElement(
            'span',
            { className: 'ant-select-selection__rendered' },
            selectionControl
          ),
          clearControl,
          _react2.default.createElement(
            'span',
            { className: 'ant-select-arrow', style: { outline: 'none' } },
            _react2.default.createElement('b', null)
          )
        )
      );
    };

    var cStyle = _this.props.cStyle;

    if (cStyle) {
      var config = null;
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
      _this.refresh = config.refresh;
    }
    _this.state = {
      bIsNull: props.bIsNull,
      showPop: false,
      checkedKeys: [],
      halfCheckedKeys: [],
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      visible: !props.bHidden,
      bLinkage: false /*上级联动下级*/
    };
    _this.expandedKeys = [];
    return _this;
  }

  _createClass(TreeRefer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.model) {
        this.props.model.addListener(this);
        var parent = this.props.model.getParent();
        if (parent) parent.on('updateTreeRefer', function () {
          return _this2.onClick();
        });
      }
      if (this.props.focus) this.refs.input.refs.input.focus();
      // this.onClick();
      this.setState({ popWidth: this.input.clientWidth });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
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
      if (nextProps.value !== this.props.value) this.setState({ value: nextProps.value });
      if (nextProps.model) {
        if (!this.props.model) {
          nextProps.model.addListener(this);
        } else {
          return;
        }
      } else {
        if (this.props.model) {
          this.props.model.removeListener(this);
        }
      }
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
    /*pop点击事件*/

    /*搜索改变*/

  }, {
    key: 'onSearch',
    value: function onSearch(val) {
      debugger;
    }
  }, {
    key: 'onPressEnter',
    value: function onPressEnter() {
      debugger;
    }
  }, {
    key: 'contains',
    value: function contains(elem, target) {
      if (elem === target) return true;
      if (!elem || !elem.children || !elem.children.length) return false;
      for (var i = 0, len = elem.children.length; i < len; i++) {
        if (this.contains(elem.children[i], target)) return true;
      }
      return false;
    }
  }, {
    key: 'getPopContent',
    value: function getPopContent(treeNodes, multiple) {
      var _this3 = this;

      if (multiple) {
        var _state = this.state,
            checkedKeys = _state.checkedKeys,
            halfCheckedKeys = _state.halfCheckedKeys,
            expandedKeys = _state.expandedKeys,
            autoExpandParent = _state.autoExpandParent,
            searchValue = _state.searchValue,
            checkStrictly = _state.checkStrictly,
            bLinkage = _state.bLinkage;

        var treeProps = {};
        if (checkStrictly === false) {
          treeProps.checkStrictly = false;
          treeProps.checkedKeys = [].concat(checkedKeys);
        } else {
          treeProps.checkStrictly = true;
          var keys = [];
          if (checkedKeys.length > 0) {
            keys = { checked: checkedKeys, halfChecked: halfCheckedKeys };
          }
          treeProps.checkedKeys = keys;
        }
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(Search, { onSearch: this.onSearch, onPressEnter: this.onPressEnter, value: searchValue, onChange: this.onSearchChange }),
          _react2.default.createElement(
            _antd.Tree,
            _extends({ checkable: true, onCheck: this.onCheck }, treeProps, { filterTreeNode: this.filterTreeNode,
              onExpand: this.onExpand, expandedKeys: expandedKeys, autoExpandParent: autoExpandParent
            }),
            treeNodes
          ),
          _react2.default.createElement(
            'div',
            { className: 'filter-btn-1' },
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: bLinkage, onChange: this.onLinkageChange },
              '\u8054\u52A8\u4E0B\u7EA7'
            ),
            _react2.default.createElement(
              _antd.Button,
              { onClick: function onClick(e) {
                  return _this3.onButtonClick(e, 'submit');
                }, className: 'ant-btn ant-btn-primary ant-btn-sm lf-margin' },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { onClick: function onClick(e) {
                  return _this3.onButtonClick(e, 'cancel');
                }, className: 'ant-btn ant-btn-default ant-btn-sm' },
              '\u53D6\u6D88'
            )
          )
        );
      } else {
        var _state2 = this.state,
            _expandedKeys = _state2.expandedKeys,
            _autoExpandParent = _state2.autoExpandParent,
            _searchValue = _state2.searchValue;

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(Search, { onSearch: this.onSearch, onChange: this.onSearchChange, value: _searchValue }),
          _react2.default.createElement(
            _antd.Tree,
            { className: 'tree-refer-radio', onSelect: function onSelect(selectedKeys, e) {
                return _this3.onSelect(selectedKeys, e);
              },
              onExpand: this.onExpand, expandedKeys: _expandedKeys, autoExpandParent: _autoExpandParent
            },
            treeNodes
          )
        );
      }
    }
  }, {
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var baseControl = null;
      if (this.state.readOnly) {
        baseControl = (0, _text2.default)(this.state.value);
      } else {
        var dataSource = this.state.dataSource || [];
        var _state3 = this.state,
            titleField = _state3.titleField,
            keyField = _state3.keyField,
            childrenField = _state3.childrenField,
            multiple = _state3.multiple,
            disabled = _state3.disabled,
            value = _state3.value,
            showPop = _state3.showPop,
            searchValue = _state3.searchValue,
            popWidth = _state3.popWidth;


        var loop = function loop(data) {
          return data.map(function (item) {
            var title = item[titleField];

            if (item[childrenField]) {
              if (item[titleField] && item[titleField].indexOf(searchValue) > -1 && searchValue != "") title = _react2.default.createElement(
                'span',
                { style: { color: 'red' } },
                title
              );
              return _react2.default.createElement(
                TreeNode,
                { data: item, value: item[keyField], title: title, key: item[keyField] },
                loop(item[childrenField])
              );
            }
            if (item[titleField] && item[titleField].indexOf(searchValue) > -1 && searchValue != "") title = _react2.default.createElement(
              'span',
              { style: { color: 'red' } },
              title
            );
            return _react2.default.createElement(TreeNode, { data: item, value: item[keyField], title: title, key: item[keyField], isLeaf: item.isLeaf, disabled: item.disabled });
          });
        };
        var treeNodes = loop(dataSource);
        var control = this.getTreeRefer();
        var popContent = this.getPopContent(treeNodes, multiple);
        var extraProps = {};
        if (popWidth) extraProps.overlayStyle = { width: popWidth };
        baseControl = _react2.default.createElement(
          _antd.Popover,
          _extends({}, extraProps, { visible: showPop, overlayClassName: 'uretail-pop', content: popContent, trigger: 'click', placement: 'bottom', onClick: this.onPopClick, onVisibleChange: this.onVisibleChange }),
          control
        );
      }
      return baseControl;
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _this4 = this;

      var _props = this.props,
          bJointQuery = _props.bJointQuery,
          cShowCaption = _props.cShowCaption;

      var title = bJointQuery ? _react2.default.createElement(
        'a',
        { onClick: function onClick(e) {
            return _this4.handleJointQuery(e);
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
      document.body.addEventListener('click', this.handleBodyClick);
      var control = this.getControl();
      var errClass = this.state.err;
      var style = this.state.visible ? {} : { display: "none" };
      return _react2.default.createElement(
        'div',
        { style: style, className: errClass ? errClass + ' has-feedback' : 'has-feedback', ref: 'treerefer' },
        control,
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        )
      );
    }
  }]);

  return TreeRefer;
}(_react.Component);

exports.default = TreeRefer;