'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReferPagination = function (_React$Component) {
  _inherits(ReferPagination, _React$Component);

  function ReferPagination(props) {
    _classCallCheck(this, ReferPagination);

    var _this = _possibleConstructorReturn(this, (ReferPagination.__proto__ || Object.getPrototypeOf(ReferPagination)).call(this, props));

    _this.setPageInfo = function (paginationlist) {
      var pageinfo = _this.state.pagination;
      pageinfo.total = paginationlist.recordCount;
      pageinfo.current = paginationlist.pageIndex;
      pageinfo.pageSize = paginationlist.pageSize;
      _this.totalPage = Math.ceil(pageinfo.total / pageinfo.pageSize);
      _this.setState({
        pagination: pageinfo
      });
    };

    _this.onPaginationClick = function (e, type) {
      var pageIndex = _this.state.pagination.current;
      if (type == 'first') pageIndex = 1;
      if (type == 'pre') pageIndex = pageIndex - 1;
      if (type == 'next') pageIndex = pageIndex + 1;
      if (type == 'last') pageIndex = _this.totalPage;
      _this.props.model.setPageIndex(pageIndex);
    };

    _this.state = {
      pagination: {
        total: 1,
        current: 1,
        pageSize: 1
      }
    };
    _this.totalPage = 1;
    return _this;
  }

  _createClass(ReferPagination, [{
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    }
    //设置分页

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state$pagination = this.state.pagination,
          current = _state$pagination.current,
          total = _state$pagination.total;

      var preStyle = {},
          nextStyle = {};
      if (total == 0) return null;
      if (current == 1) preStyle.pointerEvents = 'none';
      if (current == this.totalPage) nextStyle.pointerEvents = 'none';
      return _react2.default.createElement(
        'div',
        { className: 'refer-pagination' },
        _react2.default.createElement(
          'span',
          { className: current == 1 ? "first disabled" : "first", style: preStyle,
            onClick: function onClick(e) {
              return _this2.onPaginationClick(e, 'first');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'double-left' })
        ),
        _react2.default.createElement(
          'span',
          { className: current == 1 ? "pre disabled" : "pre", style: preStyle,
            onClick: function onClick(e) {
              return _this2.onPaginationClick(e, 'pre');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'left' })
        ),
        _react2.default.createElement(
          'span',
          { className: 'info' },
          current,
          '/',
          this.totalPage
        ),
        _react2.default.createElement(
          'span',
          { className: current == this.totalPage ? "next disabled" : "next", style: nextStyle,
            onClick: function onClick(e) {
              return _this2.onPaginationClick(e, 'next');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'right' })
        ),
        _react2.default.createElement(
          'span',
          { className: current == this.totalPage ? "last disabled" : "last", style: nextStyle,
            onClick: function onClick(e) {
              return _this2.onPaginationClick(e, 'last');
            } },
          _react2.default.createElement(_antd.Icon, { type: 'double-right' })
        )
      );
    }
  }]);

  return ReferPagination;
}(_react2.default.Component);

exports.default = ReferPagination;