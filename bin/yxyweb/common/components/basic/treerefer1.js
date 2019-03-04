'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = _antd.TreeSelect.TreeNode;

var TreeRefer = function (_Component) {
  _inherits(TreeRefer, _Component);

  function TreeRefer(props) {
    _classCallCheck(this, TreeRefer);

    var _this = _possibleConstructorReturn(this, (TreeRefer.__proto__ || Object.getPrototypeOf(TreeRefer)).call(this, props));

    _this.onChange = function (value) {
      if (value == null) _this.referViewModel.execute('afterOkClick', value);
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
      bIsNull: props.bIsNull
    };
    return _this;
  }

  _createClass(TreeRefer, [{
    key: 'getModel',
    value: function getModel() {
      return this.props.model || this.model;
    }
  }, {
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
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (this.state.disabled) return;
      if (!this.refresh) {
        if (this.hasClicked) return;
        this.hasClicked = true;
      }
      this.onClick();
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
      if (this.props.model) return;
      if (nextProps.value != this.state.value) this.setState({ value: nextProps.value });
    }
  }, {
    key: 'open',
    value: function open(e) {
      this.referViewModel = e.vm;
      this.treeModel = e.vm.get('tree');
      this.treeModel.addListener(this);
      if (typeof this.props.afterOkClick === 'function') this.referViewModel.on('afterOkClick', this.props.afterOkClick);
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (cb.utils.isArray(value)) return;
      this.setState({ value: value });
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      var model = this.getModel();
      if (!model && this.props.cRefType) {
        this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
        this.model.addListener(this);
      }
      model = this.getModel();
      if (model) model.browse();
    }
  }, {
    key: 'handleJointQuery',
    value: function handleJointQuery() {
      var model = this.getModel();
      if (!model && this.props.cRefType) {
        this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
        this.model.addListener(this);
      }
      model = this.getModel();
      if (model) model.fireEvent('jointQuery');
    }
  }, {
    key: 'onSelect',
    value: function onSelect(selectedKeys, e) {
      if (this.props.onSelect) this.props.onSelect(selectedKeys, e);
      if (this.treeModel) this.treeModel.select(selectedKeys);
      this.referViewModel.execute('afterOkClick', this.treeModel.getSelectedNodes());
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      this.setState({ dataSource: dataSource });
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var _this3 = this;

      var baseControl = null;
      if (this.state.readOnly) {
        baseControl = (0, _text2.default)(this.state.value);
      } else {
        // if (!this.state.dataSource || !this.state.dataSource.length)
        //   return baseControl;
        var dataSource = this.state.dataSource || [];
        var titleField = this.state.titleField;
        var keyField = this.state.keyField;
        var childrenField = this.state.childrenField;

        var loop = function loop(data) {
          return data.map(function (item) {
            if (item[childrenField]) {
              return _react2.default.createElement(
                TreeNode,
                { data: item, value: item[keyField], title: item[titleField], key: item[keyField] },
                loop(item[childrenField])
              );
            }
            return _react2.default.createElement(TreeNode, { data: item, value: item[keyField], title: item[titleField], key: item[keyField], isLeaf: item.isLeaf, disabled: item.disabled });
          });
        };
        var treeNodes = loop(dataSource);
        baseControl = _react2.default.createElement(
          _antd.TreeSelect,
          {
            disabled: this.state.disabled,
            treeNodeFilterProp: 'title',
            onClick: function onClick() {
              return _this3.handleClick();
            },
            showSearch: true,
            value: this.state.value,
            dropdownStyle: { maxHeight: 400, overflow: 'auto' }
            //placeholder="Please select"
            , allowClear: true
            //treeDefaultExpandAll
            , onSelect: function onSelect(selectedKeys, e) {
              return _this3.onSelect(selectedKeys, e);
            },
            onChange: this.onChange
          },
          treeNodes
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
      var control = this.getControl();
      return control;
    }
  }]);

  return TreeRefer;
}(_react.Component);

exports.default = TreeRefer;