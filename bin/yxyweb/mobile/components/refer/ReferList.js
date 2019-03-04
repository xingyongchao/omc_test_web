'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listview = require('../BasicComponents/listview');

var _listview2 = _interopRequireDefault(_listview);

var _antdMobile = require('antd-mobile');

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReferList = function (_Component) {
  _inherits(ReferList, _Component);

  function ReferList(props) {
    _classCallCheck(this, ReferList);

    var _this = _possibleConstructorReturn(this, (ReferList.__proto__ || Object.getPrototypeOf(ReferList)).call(this, props));

    _this.onOkClick = function () {
      _this.props.okClick();
    };

    _this.SelectChange = function (rowId) {
      var selectIndexes = _this.state.selectIndexes;
      var checked = true;
      selectIndexes && selectIndexes.map(function (index) {
        if (rowId == index) checked = false;
      });
      var all = false;
      if (!_this.state.multiple) all = true;
      if (checked) {
        if (all) {
          _this.props.model.select([rowId], all);
        } else {
          _this.props.model.select(rowId, all);
        }
      } else {
        _this.props.model.unselect(rowId);
      }
    };

    _this.loadMore = function () {
      var _this$state$pageInfo = _this.state.pageInfo,
          pageCount = _this$state$pageInfo.pageCount,
          pageIndex = _this$state$pageInfo.pageIndex;

      if (pageCount == pageIndex) return;
      _this.setState({ isLoading: true });
      _this.props.model.setPageIndex(pageIndex + 1);
    };

    _this.refreshList = function () {
      _this.setState({ refreshing: true });
      _this.props.model.execute('refresh');
    };

    _this.state = {
      selectIndexes: []
    };
    return _this;
  }

  _createClass(ReferList, [{
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
      var _this2 = this;

      var fields = [];
      _.forEach(params.columns, function (item, attr) {
        if (!_this2.dblClickItemName && item.bJointQuery) _this2.dblClickItemName = attr;
        fields.push(attr);
      });
      this.setState({ "columns": params.columns, "fields": fields, "multiple": params.multiple });
    }
  }, {
    key: 'setDataSource',
    value: function setDataSource(data) {
      this.setState({ dataSource: data, isLoading: false, refreshing: false });
    }
  }, {
    key: 'select',
    value: function select(selectIndexes) {
      this.setState({ selectIndexes: selectIndexes });
    }
  }, {
    key: 'unselect',
    value: function unselect(indexes) {
      var unSelectIndex = indexes[0];
      var selectIndexes = this.state.selectIndexes;
      selectIndexes && selectIndexes.map(function (selectIndex, index) {
        if (unSelectIndex == selectIndex) selectIndexes.splice(index, 1);
      });
      this.setState({ selectIndexes: selectIndexes });
    }
  }, {
    key: 'setPageInfo',
    value: function setPageInfo(pageInfo) {
      this.setState({ pageInfo: pageInfo });
    }
  }, {
    key: 'handleRowClick',
    value: function handleRowClick(e, rowId) {
      this.SelectChange(rowId);
      if (!this.state.multiple) this.props.okClick();
    }
    //监听选择

  }, {
    key: 'render',
    value: function render() {
      if (!this.state) {
        return null;
      }
      var _state = this.state,
          fields = _state.fields,
          columns = _state.columns,
          isLoading = _state.isLoading,
          refreshing = _state.refreshing,
          dataSource = _state.dataSource;

      var className = "billing-cz";
      if (columns && columns.code && columns.code.cDataSourceName) {
        className = columns.code.cDataSourceName.replace(/\.+/g, '_') + " " + className;
      }
      var height = this.props.height;
      if (this.state.multiple) height = height - 60;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(_listview2.default, { key: 'referListView', selectIndexes: this.state.selectIndexes, height: height, pageSize: 20, fields: fields, listType: 'refer', cRefType: this.props.cRefType,
          onRowClick: this.handleRowClick.bind(this), refreshList: this.refreshList,
          columns: columns, loadMore: this.loadMore.bind(this), isLoading: isLoading,
          refreshing: refreshing, dataSource: dataSource, pageInfo: this.state.pageInfo }),
        _react2.default.createElement(
          'div',
          { className: 'button-fixed-bottom' },
          this.state.multiple ? _react2.default.createElement(
            _antdMobile.Button,
            { type: 'primary', onClick: this.onOkClick },
            '\u786E\u5B9A'
          ) : null
        )
      );
    }
  }]);

  return ReferList;
}(_react.Component);

exports.default = ReferList;