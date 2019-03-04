'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

var _SvgIcon = require('../common/SvgIcon.js');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBox = _antd.Input.Search;

var GridFilterModel = function (_React$Component) {
  _inherits(GridFilterModel, _React$Component);

  function GridFilterModel(props) {
    _classCallCheck(this, GridFilterModel);

    var _this = _possibleConstructorReturn(this, (GridFilterModel.__proto__ || Object.getPrototypeOf(GridFilterModel)).call(this, props));

    _this.getStringLength = function (str) {
      if (!str) str = '';
      var realLength = 0,
          len = str.length,
          charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
          realLength += 1;
        } else {
          realLength += 2;
        }
      }
      return realLength;
    };

    _this.onChange = function (e) {
      _this.setState({ "lookUpValue": e.target.value });
    };

    _this.onSearch = function (value, type) {
      var _this$props = _this.props,
          data = _this$props.data,
          attr = _this$props.attr,
          lookUpRow = _this$props.lookUpRow;

      if (cb.utils.isEmpty(value)) value = null;
      var indexes = [];
      if (!data || data.length == 0) return;
      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var val = row[attr];
        var text = val;
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == 'object') {
          text = val.text;
        }
        if (!cb.utils.isEmpty(text)) {
          if (text.toString().indexOf(value) != -1) {
            indexes.push(i);
          }
        }
      }
      if (indexes.length == 0) {
        _this.props.moveLookUpRow([], -1, '');
        cb.utils.alert('未搜索到匹配的行！', 'error');
        return;
      }
      var index = indexes.indexOf(lookUpRow);
      if (index == -1) {
        lookUpRow = indexes[0];
        index = 0;
      }
      if (type == 'up' && index != 0) lookUpRow = indexes[index - 1];
      if (type == 'down' && index != indexes.length - 1) lookUpRow = indexes[index + 1];
      var cItemName = _this.props.Column.cItemName;
      _this.props.moveLookUpRow(indexes, lookUpRow, cItemName);
    };

    _this.onVisibleChange = function (visible) {
      var obj = { "lookUp_visible": visible };
      if (!visible) {
        obj.showSort = false;
        if (cb.utils.isEmpty(_this.state.lookUpValue)) {
          _this.props.moveLookUpRow([], -1);
          obj.showLookUp = false;
        }
      }
      _this.setState(obj);
    };

    _this.getLookUpControl = function () {
      var content = _react2.default.createElement(
        'div',
        { className: 'grid-header-' },
        _react2.default.createElement(SearchBox, { value: _this.state.lookUpValue, onChange: _this.onChange, placeholder: '\u8BF7\u8F93\u5165\u5B9A\u4F4D\u5185\u5BB9', onSearch: _this.onSearch }),
        _react2.default.createElement(_SvgIcon2.default, { type: 'shangyitiao-copy', onClick: function onClick() {
            return _this.onSearch(_this.state.lookUpValue, 'up');
          } }),
        _react2.default.createElement(_SvgIcon2.default, { type: 'xiayitiao-copy', onClick: function onClick() {
            return _this.onSearch(_this.state.lookUpValue, 'down');
          } }),
        _react2.default.createElement(_SvgIcon2.default, { type: 'guanbi1', onClick: function onClick() {
            return _this.onVisibleChange(false);
          } })
      );
      return _react2.default.createElement(
        _antd.Popover,
        { overlayClassName: 'lookup-pop', onVisibleChange: _this.onVisibleChange, trigger: 'click',
          visible: _this.state.lookUp_visible, content: content, placement: 'top', arrowPointAtCenter: true },
        _react2.default.createElement(_SvgIcon2.default, { type: _this.state.bLookUp ? "shaixuan1-copy" : "shaixuan1" })
      );
    };

    _this.state = {
      showSort: false,
      lookUp_visible: false,
      showLookUp: false,
      lookUpValue: "",
      bSort: false,
      bLookUp: false
    };
    _this.sorttext = '';
    return _this;
  }

  _createClass(GridFilterModel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var Column = nextProps.Column,
          sortColumn = nextProps.sortColumn,
          lookUpKey = nextProps.lookUpKey;

      var bSort = sortColumn == Column.cItemName ? true : false;
      var bLookUp = lookUpKey == Column.cItemName ? true : false;
      this.setState({ bSort: bSort, bLookUp: bLookUp });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(e) {
      var fixedtableState = this.props.fixedtable ? this.props.fixedtable.state : null;
      if (fixedtableState && fixedtableState.isColumnResizing) return;
      this.setState({
        showSort: true, showLookUp: true
      });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave(e) {
      var fixedtableState = this.props.fixedtable ? this.props.fixedtable.state : null;
      if (fixedtableState && fixedtableState.isColumnResizing) return;
      var obj = { showSort: this.state.showSort, showLookUp: this.state.showLookUp };
      if (!this.state.bSort) obj.showSort = false;
      if (!this.state.bLookUp && !this.state.lookUp_visible) obj.showLookUp = false;
      this.setState(obj);
    }
    //表头排序点击事件

  }, {
    key: 'filterClick',
    value: function filterClick(key) {
      if (!this.props.readOnly) return;
      var filterdata = { sort: '', key: key, search: '', filter: [] };
      var cItemName = this.props.Column.cItemName;
      if (key === 'ASC') {
        this.sorttext = 'DESC';
        filterdata.sort = 'DESC';
      } else if (key == 'DESC') {
        this.sorttext = 'ASC';
        filterdata.sort = 'ASC';
      } else {
        if (this.sorttext == 'DESC') {
          this.sorttext = 'ASC';
          filterdata.sort = 'ASC';
        } else if (this.sorttext == '' || this.sorttext == 'init') {
          this.sorttext = 'DESC';
          filterdata.sort = 'DESC';
        } else {
          /*恢复*/
          this.sorttext = 'init';
          filterdata.sort = 'init';
          cItemName = "";
        }
      }
      this.props.onSortChange(cItemName);
      // this.setState({
      //   showSort: false
      // });
      this.props.model.setFilter(this.props.attr, this.props.Column, filterdata);
    }
    //表头 升序 降序 无序 组织

  }, {
    key: 'Sort',
    value: function Sort() {
      var _this2 = this;

      if (!this.props.readOnly) return null;
      var upClass = '',
          downClass = '';
      if (this.sorttext == 'DESC') {
        upClass = 'ant-btn-icon-active';
      }
      if (this.sorttext == 'ASC') {
        downClass = 'ant-btn-icon-active';
      }
      if (this.state.bSort || this.state.showSort) return _react2.default.createElement(
        'div',
        { className: 'btn-caret' },
        _react2.default.createElement(_basic.Button, { className: upClass, style: { borderWidth: 0 }, type: 'ghost', icon: 'caret-up', onClick: function onClick() {
            return _this2.filterClick('ASC');
          } }),
        _react2.default.createElement(_basic.Button, { className: downClass, style: { borderWidth: 0 }, type: 'ghost', icon: 'caret-down', onClick: function onClick() {
            return _this2.filterClick('DESC');
          } })
      );else return _react2.default.createElement('div', { className: 'btn-caret' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var control = void 0,
          Column = this.props.Column;
      var Sort = this.props.multiSort && this.props.tableClass != 'rptTable' ? this.Sort() : null;
      var lookUpControl = this.state.showLookUp ? this.getLookUpControl() : null;
      var bIsNull = Column.bIsNull;
      var id = Column.index;
      var textColWidth = this.props.width - 25;
      var nameLen = this.getStringLength(this.props.name);
      if (textColWidth > nameLen * 6.5) {
        textColWidth = nameLen * 6.5;
        if (bIsNull == false && !this.props.readOnly) textColWidth += 9;
      }
      var headerName = this.props.name;
      if (!bIsNull && this.props.readOnly != true) {
        headerName = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: 'headerNameTips' },
            '* '
          ),
          this.props.name
        );
      }
      control = _react2.default.createElement(
        'div',
        { style: { textAlign: 'left', width: this.props.width, display: "flex" }, onMouseEnter: function onMouseEnter(e) {
            return _this3.onMouseEnter(e);
          }, onMouseLeave: function onMouseLeave(e) {
            return _this3.onMouseLeave(e);
          }, id: id },
        _react2.default.createElement(
          'span',
          { onClick: function onClick() {
              return _this3.filterClick('');
            }, className: 'textCol table-header-name sort-header' },
          headerName
        ),
        Sort,
        lookUpControl
      );
      return control;
    }
  }]);

  return GridFilterModel;
}(_react2.default.Component);

exports.default = GridFilterModel;