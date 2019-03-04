'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

var _refer = require('../refer');

var _refer2 = _interopRequireDefault(_refer);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _listtag = require('./listtag');

var _listtag2 = _interopRequireDefault(_listtag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               参数	        说明	                                类型	            默认值
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               closable	标签是否可以关闭	                  boolean	            false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               onClose	    关闭时的回调	                        function(event)	        -
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               afterClose	关闭动画完成后的回调                  function(event)	        -
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               color	    标签的色彩：blue green yellow red	    string	                -
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Search = _antd.Input.Search;
var TreeNode = _antd.Tree.TreeNode;
process.env.__CLIENT__ && require('./tag.less');

var TagControl = function (_React$Component) {
  _inherits(TagControl, _React$Component);

  function TagControl(props) {
    _classCallCheck(this, TagControl);

    var _this = _possibleConstructorReturn(this, (TagControl.__proto__ || Object.getPrototypeOf(TagControl)).call(this, props));

    _this.setDataSource = function (dataSource) {
      _this.setState({ dataSource: dataSource });
    };

    _this.onSelect = function (selectedKeys, e) {
      if (_this.treeModel) _this.treeModel.select(selectedKeys);
      _this.setState({ modalVisible: false });
      _this.referViewModel.execute('afterOkClick', _this.treeModel.getSelectedNodes());
    };

    _this.onPopClick = function () {
      var disabled = _this.state.disabled;
      if (disabled) return;
      _this.setState({
        modalVisible: !_this.state.modalVisible
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

    _this.onButtonClick = function (e, type) {
      var _this$state = _this.state,
          checkedKeys = _this$state.checkedKeys,
          checkStrictly = _this$state.checkStrictly,
          keyField = _this$state.keyField;

      var keys = checkedKeys || [];
      if (checkStrictly === false) {
        keys = [];
        var nodes = _this.treeModel.getNodesByKeys(checkedKeys);
        nodes.forEach(function (item) {
          if (item.children) return;
          keys.push(item[keyField]);
        });
      }
      if (type == 'submit') {
        if (_this.treeModel) _this.treeModel.select(keys);
        _this.referViewModel.execute('afterOkClick', _this.treeModel.getSelectedNodes());
      }
      _this.setState({ modalVisible: false });
    };

    _this.onVisibleChange = function (visible) {
      var disabled = _this.state.disabled;
      if (disabled) return;
      _this.setState({ modalVisible: visible });
    };

    _this.onSearchChange = function (e) {
      var value = e.target.value;
      var data = _this.state.dataSource;
      var loop = function loop(data) {
        return data.map(function (item) {
          if (item.name.indexOf(value) > -1) _this.expandedKeys.push(item.code);
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

    _this.onLinkageChange = function (e) {
      _this.setState({
        "bLinkage": e.target.checked
      });
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
        var keys = [];
        checkKeys.map(function (key, index) {
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

    var cStyle = props.cStyle;

    var config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    _this.state = Object.assign({
      bIsNull: props.bIsNull,
      onClose: props.onClose,
      ButtonName: '增加',
      closable: true,
      color: props.color || 'blue',
      refReturn: props.refReturn,
      bCanModify: props.bCanModify,
      readOnly: props.readOnly,
      checkedKeys: [],
      halfCheckedKeys: [],
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      visible: !props.bHidden,
      bLinkage: false /*上级联动下级*/
    }, config);

    _this.buttonClick = _this.buttonClick.bind(_this);
    _this.close = _this.close.bind(_this);
    return _this;
  }

  _createClass(TagControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      if (this.props.focus) this.refs.input.refs.input.focus();
      this.setState({ popWidth: this.input.offsetWidth, popLeft: this.input.offsetLeft });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.model && nextProps.model) nextProps.model.addListener(this);
      if (this.props.model && !nextProps.model) {
        this.props.model.removeListener(this);
      }
      this.setState({
        closable: nextProps.closable,
        color: nextProps.color,
        refReturn: nextProps.refReturn
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
  }, {
    key: 'GetTagList',
    value: function GetTagList() {
      var Tagdata = this.props.tagData || this.state.value || [];
      var TagList = [];
      var _state = this.state,
          readOnly = _state.readOnly,
          disabled = _state.disabled,
          color = _state.color;

      if (readOnly) {
        Tagdata.forEach(function (element) {
          TagList.push(element);
        });
        return TagList.join('; ');
      }
      Tagdata.forEach(function (element, index) {
        var _this2 = this;

        // var val = element[this.state.refReturn];
        TagList.push(_react2.default.createElement(
          _antd.Tag,
          { style: { float: 'left' }, key: index, closable: !disabled, color: color, onClose: function onClose(e) {
              return _this2.onClose(e, index);
            } },
          element
        ));
      }, this);
      return TagList;
    }
  }, {
    key: 'onClose',
    value: function onClose(e, index) {
      if (this.props.model) {
        e.preventDefault();
        this.props.model.deleteItem(index);
        return;
      }
      if (this.props.onClose) {
        e.preventDefault();
        this.props.onClose(index);
        return;
      }
    }
  }, {
    key: 'buttonClick',
    value: function buttonClick() {
      if (this.props.model) this.props.model.browse(this.state.displaymode === 'popover');
      if (this.props.referClikc) this.props.referClikc();
    }
  }, {
    key: 'open',
    value: function open(e) {
      if (e.referType === 'Table' && this.state.displaymode === 'popover') this.referViewModel = e.vm;
      this.setState({
        referType: e.referType,
        vm: e.vm,
        modalVisible: true
      });
      if (e.referType === 'Tree') {
        this.referViewModel = e.vm;
        this.treeModel = e.vm.get('tree');
        this.treeModel.addListener(this);
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
  }, {
    key: 'close',
    value: function close() {
      this.setState({ modalVisible: false });
    }
  }, {
    key: 'setValue',
    value: function setValue(value, propertyName) {
      if (propertyName === 'tree') return;
      this.setState({
        modalVisible: false,
        value: value
      });
    }
    /*pop点击事件*/

    /*搜索改变*/

  }, {
    key: 'validate',
    value: function validate(val) {
      this.setState({
        err: 'has-' + val.type,
        msg: val.message
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var classNames = ['TagList'];
      var addIcon = 'canzhao';
      if (this.state.disabled) {
        classNames.push('tag-disabled');
        addIcon += '-disabled';
      }
      var className = classNames.join(' ');
      var TagList = this.GetTagList();
      var addTag = !this.state.readOnly ? _react2.default.createElement(
        _antd.Button,
        { className: 'tagBtn-add', size: 'small', disabled: this.state.disabled, onClick: this.buttonClick },
        _react2.default.createElement(_antd.Icon, { type: addIcon })
      ) : '';
      var bShowCaption = typeof this.props.cShowCaption == 'undefined' ? false : true;
      var tagSuffix = null;
      var _state2 = this.state,
          popWidth = _state2.popWidth,
          popLeft = _state2.popLeft;

      var extraProps = {};
      extraProps = {
        visible: this.state.modalVisible,
        overlayClassName: "uretail-pop",
        trigger: "click",
        placement: "bottom",
        arrowPointAtCenter: true
      };
      if (popWidth) extraProps.overlayStyle = { width: popWidth };
      var _style = { height: '28px', width: '100%' };
      var _content = _react2.default.createElement(
        'div',
        { className: 'tag-refer-icon-container' },
        addTag
      );
      if (this.state.referType === 'Tree') tagSuffix = _react2.default.createElement(
        _antd.Popover,
        _extends({}, extraProps, {
          content: this.getPopControl(),
          onClick: this.onPopClick,
          onVisibleChange: this.onVisibleChange }),
        _content
      );else if (this.state.referType === 'Table' && this.state.displaymode === 'popover') tagSuffix = _react2.default.createElement(
        _antd.Popover,
        _extends({}, extraProps, {
          content: _react2.default.createElement(_listtag2.default, { viewModel: this.referViewModel, multiple: this.state.multiple, closePop: this.close }),
          onClick: this.onPopClick,
          onVisibleChange: this.onVisibleChange
        }),
        _content
      );else tagSuffix = addTag;
      var style = this.state.visible ? {} : { display: "none" };
      return !bShowCaption ? _react2.default.createElement(
        _row2.default,
        { className: 'tag-refer' },
        _react2.default.createElement(
          'div',
          { className: className },
          TagList
        ),
        _react2.default.createElement(_antd.Icon, { onClick: this.buttonClick, type: 'search' }),
        _react2.default.createElement(_refer2.default, { visible: this.state.modalVisible, close: this.close, title: this.props.cShowCaption, model: this.state.vm, afterOkClick: this.props.afterOkClick, referType: this.state.referType })
      ) : _react2.default.createElement(
        _row2.default,
        { className: 'tag-refer tag-refer-01 ' + this.state.err, style: style },
        _react2.default.createElement(
          'div',
          { className: 'p-v-5', style: { float: 'left' } },
          !this.state.readOnly && this.state.bIsNull === false ? _react2.default.createElement(_antd.Icon, { type: 'star' }) : "",
          this.props.cShowCaption
        ),
        _react2.default.createElement(
          'div',
          { className: className, ref: function ref(node) {
              return _this3.input = node;
            }, role: 'combobox', 'aria-autocomplete': 'list', 'aria-haspopup': 'true', tabindex: '0', 'aria-expanded': 'false' },
          TagList,
          tagSuffix
        ),
        _react2.default.createElement(
          'div',
          { className: 'ant-form-explain' },
          this.state.msg
        ),
        this.state.referType === 'Tree' || this.state.referType === 'Table' && this.state.displaymode === 'popover' ? null : _react2.default.createElement(_refer2.default, { visible: this.state.modalVisible, close: this.close, title: this.props.cShowCaption, model: this.state.vm, afterOkClick: this.props.afterOkClick, referType: this.state.referType })
      );
    }
  }, {
    key: 'getPopControl',
    value: function getPopControl() {
      var dataSource = this.state.dataSource || [];
      var _state3 = this.state,
          titleField = _state3.titleField,
          keyField = _state3.keyField,
          childrenField = _state3.childrenField,
          multiple = _state3.multiple,
          disabled = _state3.disabled,
          value = _state3.value,
          modalVisible = _state3.modalVisible,
          searchValue = _state3.searchValue;

      var loop = function loop(data) {
        return data.map(function (item) {
          var title = item[titleField];
          if (item[childrenField]) {
            if (item.name.indexOf(searchValue) > -1 && searchValue != "") title = _react2.default.createElement(
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
          if (item.name.indexOf(searchValue) > -1 && searchValue != "") title = _react2.default.createElement(
            'span',
            { style: { color: 'red' } },
            title
          );
          return _react2.default.createElement(TreeNode, { data: item, value: item[keyField], title: title, key: item[keyField], isLeaf: item.isLeaf, disabled: item.disabled });
        });
      };
      var treeNodes = loop(dataSource);
      return this.getPopContent(treeNodes, multiple);
    }
  }, {
    key: 'getPopContent',
    value: function getPopContent(treeNodes, multiple) {
      var _this4 = this;

      if (multiple) {
        var _state4 = this.state,
            checkedKeys = _state4.checkedKeys,
            halfCheckedKeys = _state4.halfCheckedKeys,
            expandedKeys = _state4.expandedKeys,
            autoExpandParent = _state4.autoExpandParent,
            searchValue = _state4.searchValue,
            checkStrictly = _state4.checkStrictly,
            bLinkage = _state4.bLinkage;

        var treeProps = {};
        if (checkStrictly === false) {
          treeProps.checkStrictly = false;
          treeProps.checkedKeys = [].concat(checkedKeys);
        } else {
          treeProps.checkStrictly = true;
          var keys = [];
          if (checkedKeys && checkedKeys.length > 0) {
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
                  return _this4.onButtonClick(e, 'submit');
                }, className: 'ant-btn ant-btn-primary ant-btn-sm lf-margin' },
              '\u786E\u5B9A'
            ),
            _react2.default.createElement(
              _antd.Button,
              { onClick: function onClick(e) {
                  return _this4.onButtonClick(e, 'cancel');
                }, className: 'ant-btn ant-btn-default ant-btn-sm' },
              '\u53D6\u6D88'
            )
          )
        );
      } else {
        var _state5 = this.state,
            _expandedKeys = _state5.expandedKeys,
            _autoExpandParent = _state5.autoExpandParent,
            _searchValue = _state5.searchValue;

        return _react2.default.createElement(
          'div',
          { className: 'listRefer' },
          _react2.default.createElement(Search, { onSearch: this.onSearch, onChange: this.onSearchChange, value: _searchValue }),
          _react2.default.createElement(
            _antd.Tree,
            { onSelect: function onSelect(selectedKeys, e) {
                return _this4.onSelect(selectedKeys, e);
              },
              onExpand: this.onExpand, expandedKeys: _expandedKeys, autoExpandParent: _autoExpandParent
            },
            treeNodes
          )
        );
      }
    }
  }]);

  return TagControl;
}(_react2.default.Component);

exports.default = TagControl;