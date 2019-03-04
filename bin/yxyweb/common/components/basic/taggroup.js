'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _fileUpload = require('../file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _picturebook = require('../picturebook');

var _picturebook2 = _interopRequireDefault(_picturebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;

var TagGroup = function (_Component) {
  _inherits(TagGroup, _Component);

  function TagGroup(props) {
    _classCallCheck(this, TagGroup);

    var _this = _possibleConstructorReturn(this, (TagGroup.__proto__ || Object.getPrototypeOf(TagGroup)).call(this, props));

    _this.open = function (e) {
      _this.referViewModel = e.vm;
      _this.gridModel = e.vm.get('table');
      _this.gridModel.addListener(_this);
    };

    _this.onVisibleChange = function (key, visible) {
      _this.popVisible[key] = visible;
      _this.setState({ popVisible: visible });
    };

    _this.onDelete = function (indexes, index) {
      _this.props.model.setFocusedRowIndex(index);
      _this.focusedIndex = index;
      _this.setState({ popVisible: true });
      var childrenField = _this.state.childrenField;

      var model = _this.props.model.getEditRowModel().get(childrenField);
      model.deleteItems(indexes);
    };

    _this.state = {
      searchWord: '',
      popKeyField: 'id',
      popDataSource: [],
      bAllCheck: true // 预设全选
    };
    _this.popVisible = {};
    _this.checkboxValue = {};
    _this.popCheckboxValue = {};
    _this.focusedIndex = null;
    return _this;
  }

  _createClass(TagGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.model.removeListener(this);
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(dataSource) {
      this.setState({ popDataSource: dataSource });
    }
  }, {
    key: 'setListenerState',
    value: function setListenerState(params, propertyName) {
      if (propertyName === 'table') return;
      var keyField = params.keyField,
          checkField = params.checkField,
          childrenField = params.childrenField,
          refer2BillKeyFieldMap = params.refer2BillKeyFieldMap,
          value = params.value;

      delete params.keyField;
      delete params.value;
      this.setState(params);
      this.state.keyField = keyField;
      this.state.checkField = checkField;
      this.state.childrenField = childrenField;
      this.state.billKeyField = refer2BillKeyFieldMap[this.state.popKeyField];
      this.setValue(value || []);
    }
  }, {
    key: 'setValue',
    value: function setValue(data) {
      var _this2 = this;

      if (!data) return;
      var _state = this.state,
          keyField = _state.keyField,
          checkField = _state.checkField,
          billKeyField = _state.billKeyField;

      var value = {};
      this.popCheckboxValue = {};
      data.forEach(function (element, index) {
        element.index = index;
        var key = element[keyField];
        if (!value[key]) value[key] = { children: [] };
        _this2.checkboxValue[key] = element[checkField];
        value[key].children.push(element);
        _this2.popCheckboxValue[element[billKeyField]] = true;
      });
      this.setState({ value: value });
    }
  }, {
    key: 'handleOkClick',
    value: function handleOkClick(key) {
      var _this3 = this;

      var _state2 = this.state,
          popDataSource = _state2.popDataSource,
          checkField = _state2.checkField,
          popKeyField = _state2.popKeyField;

      var rows = [];
      popDataSource.forEach(function (item) {
        if (!_this3.popCheckboxValue[item[popKeyField]]) return;
        var row = {};
        row[checkField] = _this3.checkboxValue[key];
        rows.push(Object.assign(row, item));
      });
      this.props.model.setValue(rows, true);
      this.handleCancelClick(key);
    }
  }, {
    key: 'handleCancelClick',
    value: function handleCancelClick(key) {
      this.popVisible[key] = false;
      this.setState({ popVisible: false });
    }
  }, {
    key: 'handleAddClick',
    value: function handleAddClick(key) {
      var _state3 = this.state,
          keyField = _state3.keyField,
          bill2ReferKeyFieldMap = _state3.bill2ReferKeyFieldMap;

      var referKeyField = bill2ReferKeyFieldMap[keyField];
      this.props.model.setFilter({ isExtend: true, simpleVOs: [{ field: referKeyField, op: 'eq', value1: key }] });
      this.props.model.browse(true);
      this.popVisible[key] = true;
      this.setState({ popVisible: true, searchWord: '' });
    }
  }, {
    key: 'onClose',
    value: function onClose(e, index) {
      e.preventDefault();
      this.props.model.deleteItem(index);
    }
  }, {
    key: 'checkboxChange',
    value: function checkboxChange(key, checked) {
      var _this4 = this;

      var _state4 = this.state,
          checkField = _state4.checkField,
          value = _state4.value;

      var tagValue = value[key];
      if (tagValue) {
        var children = tagValue.children;

        if (children.length) {
          children.forEach(function (item) {
            _this4.props.model.setCellValue(item.index, checkField, checked);
          });
          return;
        }
      }
      this.checkboxValue[key] = checked;
      this.setState({ popVisible: true });
    }
  }, {
    key: 'handlePopCheckbox',
    value: function handlePopCheckbox(key, checked) {
      this.popCheckboxValue[key] = checked;
      this.setState({ popVisible: true });
    }
  }, {
    key: 'setFocused',
    value: function setFocused(index) {
      this.props.model.setFocusedRowIndex(index);
      this.focusedIndex = index;
      this.setState({ popVisible: true });
    }
  }, {
    key: 'clearSearchWord',
    value: function clearSearchWord() {
      this.setState({ searchWord: '' });
    }
  }, {
    key: 'renderImg',
    value: function renderImg(element) {
      var _this5 = this;

      var index = element.index;
      var childrenField = this.state.childrenField;

      var model = this.props.model.getEditRowModel().get(childrenField);
      if (index === this.focusedIndex) {
        return _react2.default.createElement(_picturebook2.default, { modelIndex: index, model: model });
      }
      return _react2.default.createElement(_picturebook2.default, { modelIndex: index, onDelete: function onDelete(indexes) {
          return _this5.onDelete(indexes, index);
        }, readOnly: this.state.readOnly, bill2ReferKeyFieldMap: model.get('bill2ReferKeyFieldMap'), dataSource: element[childrenField], onClick: function onClick() {
          return _this5.setFocused(index);
        } });
    }
  }, {
    key: 'onAllCheckChange',
    value: function onAllCheckChange(checked) {
      var _this6 = this;

      var _state5 = this.state,
          popDataSource = _state5.popDataSource,
          popKeyField = _state5.popKeyField;

      popDataSource.forEach(function (item, index) {
        var popKey = item[popKeyField];
        _this6.handlePopCheckbox(popKey, checked);
      });
    }
  }, {
    key: 'renderTagItem',
    value: function renderTagItem(value, checked) {
      var _this7 = this;

      var textField = this.state.textField;

      if (!value || !value.length) return null;
      var items = [];
      value.forEach(function (element) {
        items.push(_react2.default.createElement(
          'div',
          { className: 'pic-book-list' },
          _react2.default.createElement(
            _antd.Tag,
            { closable: !_this7.state.readOnly, onClose: function onClose(e) {
                return _this7.onClose(e, element.index);
              } },
            element[textField]
          ),
          checked ? _this7.renderImg(element) : null
        ));
      });
      return items;
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(value) {
      this.setState({ searchWord: value });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ searchWord: e.target.value });
    }
  }, {
    key: 'getPopControl',
    value: function getPopControl(key) {
      var _this8 = this;

      var _state6 = this.state,
          popDataSource = _state6.popDataSource,
          popKeyField = _state6.popKeyField,
          bAllCheck = _state6.bAllCheck,
          searchWord = _state6.searchWord;

      if (!popDataSource || !popDataSource.length) return null;
      var items = [];
      var _popDataSource = [];
      if (!searchWord) {
        _popDataSource = popDataSource;
      } else if (searchWord && popDataSource.length) {
        popDataSource.forEach(function (v) {
          if (v.name.indexOf(searchWord) >= 0) {
            _popDataSource.push(v);
          }
        });
      }
      if (_popDataSource.length) {
        _popDataSource.forEach(function (item, index) {
          var popKey = item[popKeyField];
          var checked = _this8.popCheckboxValue[popKey];
          bAllCheck = bAllCheck && checked;
          items.push(_react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _antd.Checkbox,
              { checked: checked, onChange: function onChange(e) {
                  return _this8.handlePopCheckbox(popKey, e.target.checked);
                } },
              item.name
            )
          ));
        });
      } else {
        items.push(_react2.default.createElement(
          'li',
          { className: 'no-item' },
          '\u6CA1\u6709\u89C4\u683C\u503C'
        ));
      }
      return _react2.default.createElement(
        'div',
        { className: 'ant-popover-filter-list' },
        _react2.default.createElement(
          'div',
          { className: 'filter-list-search' },
          _react2.default.createElement(Search, {
            value: searchWord,
            onSearch: function onSearch(value) {
              return _this8.handleSearch(value);
            },
            onChange: function onChange(e) {
              return _this8.handleChange(e);
            },
            onPressEnter: function onPressEnter(e) {
              return _this8.handleChange(e);
            }
          }),
          searchWord.length ? _react2.default.createElement(
            'span',
            { onClick: function onClick() {
                return _this8.clearSearchWord();
              }, className: 'filter-list-search-delete' },
            _react2.default.createElement('i', { className: 'anticon anticon-cross-circle ant-cascader-picker-clear' })
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'filter-list' },
          _react2.default.createElement(
            'ul',
            { className: 'filter-list-content' },
            items
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'filter-btn-1', style: { position: "static" } },
          _react2.default.createElement(
            _antd.Checkbox,
            { checked: bAllCheck, onChange: function onChange(e) {
                return _this8.onAllCheckChange(e.target.checked);
              } },
            '\u5168\u9009'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: 'primary', onClick: function onClick() {
                return _this8.handleOkClick(key);
              } },
            '\u4FDD\u5B58'
          ),
          _react2.default.createElement(
            _antd.Button,
            { type: 'default', onClick: function onClick() {
                return _this8.handleCancelClick(key);
              } },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }, {
    key: 'renderTag',
    value: function renderTag(item) {
      var _this9 = this;

      var value = item.value,
          text = item.text;

      var data = this.state.value[value] || {};
      var checked = this.checkboxValue[value];
      return _react2.default.createElement(
        _antd.Row,
        null,
        _react2.default.createElement(
          _antd.Checkbox,
          { checked: checked, disabled: this.state.readOnly, onChange: function onChange(e) {
              return _this9.checkboxChange(value, e.target.checked);
            } },
          '\u56FE\u7247'
        ),
        _react2.default.createElement(
          'div',
          { className: 'pic-book-title' },
          _react2.default.createElement(
            'span',
            null,
            text
          )
        ),
        this.renderTagItem(data.children, checked),
        this.state.readOnly ? "" : _react2.default.createElement(
          _antd.Popover,
          { arrowPointAtCenter: true, autoAdjustOverflow: true, placement: 'bottom', visible: this.popVisible[value], content: this.getPopControl(value), trigger: 'click', onClick: this.onPopClick, onVisibleChange: function onVisibleChange(visible) {
              return _this9.onVisibleChange(value, visible);
            } },
          _react2.default.createElement(
            _antd.Button,
            { className: 'btn-add', onClick: function onClick() {
                return _this9.handleAddClick(value);
              } },
            _react2.default.createElement(_antd.Icon, { type: 'jia' }),
            '\u6DFB\u52A0\u89C4\u683C\u503C'
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

      var dataSource = this.state.dataSource;

      if (!dataSource || !dataSource.length) return null;
      var items = [];
      dataSource.forEach(function (item) {
        items.push(_this10.renderTag(item));
      });
      return _react2.default.createElement(
        'div',
        { className: 'pic-book' },
        items
      );
    }
  }]);

  return TagGroup;
}(_react.Component);

exports.default = TagGroup;