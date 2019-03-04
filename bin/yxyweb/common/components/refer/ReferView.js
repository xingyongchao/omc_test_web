'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _antd = require('antd');

var _ReferToolbar = require('./ReferToolbar');

var _ReferToolbar2 = _interopRequireDefault(_ReferToolbar);

var _basic = require('../basic');

var _SearchTree = require('../meta/SearchTree');

var _SearchTree2 = _interopRequireDefault(_SearchTree);

var _ReferTable = require('./ReferTable');

var _ReferTable2 = _interopRequireDefault(_ReferTable);

var _ReferPagination = require('./ReferPagination');

var _ReferPagination2 = _interopRequireDefault(_ReferPagination);

var _env = require('../../helpers/env');

var _env2 = _interopRequireDefault(_env);

var _filter = require('../filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReferView = function (_Component) {
  _inherits(ReferView, _Component);

  function ReferView(props) {
    _classCallCheck(this, ReferView);

    var _this = _possibleConstructorReturn(this, (ReferView.__proto__ || Object.getPrototypeOf(ReferView)).call(this, props));

    _this.state = {
      className: _env2.default.INTERACTIVE_MODE === 'touch' ? ' refer-modal-touch' : '',
      referType: _this.props.referType,
      bodyHeight: 0,
      tableHeight: 0
    };
    _this.__isElectronic = false;
    return _this;
  }

  _createClass(ReferView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (window.__isElectronic) this.__isElectronic = true;
      var referType = this.props.referType;

      var bodyHeight = 495,
          tHeight = void 0;
      switch (referType) {
        case 'Table':
          bodyHeight = 495;
          if (this.__isElectronic) {
            bodyHeight = 395;
            tHeight = bodyHeight - 52;
          } else {
            tHeight = bodyHeight - 93;
          }
          break;
        case 'TreeTable':
          bodyHeight = 515;
          if (this.__isElectronic) bodyHeight = 415;
          tHeight = bodyHeight - 60;
          break;
      }
      this.setState({ bodyHeight: bodyHeight, tableHeight: tHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var referType = this.state.referType;
      var model = this.props.model;

      var key = model && model.getParams().refCode;
      var treeContent = '';
      var cardContent = '';
      var className = 'referModal ' + referType + this.state.className;
      if (referType == 'Tree') {
        treeContent = _react2.default.createElement(
          _basic.Col,
          { span: 24, className: 'leftPanel' },
          _react2.default.createElement(
            _basic.Row,
            { colCount: 2 },
            _react2.default.createElement(
              _basic.Col,
              { span: 1 },
              _react2.default.createElement(_SearchTree2.default, { model: model.get('tree') })
            )
          )
        );
      } else if (referType == 'TreeTable') {
        treeContent = _react2.default.createElement(
          'div',
          { className: 'leftPanel' },
          _react2.default.createElement(_SearchTree2.default, { text: this.props.title + '\u5206\u7C7B', model: model.get('tree') })
        );
        var filterId = model.getParams().filterId;
        var width = 800;
        if (_env2.default.INTERACTIVE_MODE === 'touch') {
          if (this.__isElectronic) {
            width = 690;
          } else {
            width = 790;
          }
        }
        cardContent = _react2.default.createElement(
          'div',
          { className: 'rightPanel' },
          _react2.default.createElement(
            _basic.Row,
            { ref: 'ReferToolbar' },
            filterId ? _react2.default.createElement(_filter2.default, { model: model, cols: 2 }) : null,
            _react2.default.createElement(_ReferToolbar2.default, { model: model, filterId: filterId })
          ),
          _react2.default.createElement(
            _basic.Row,
            null,
            _react2.default.createElement(_ReferTable2.default, { model: model.get('table'), width: width, maxRowCount: 10, height: this.state.tableHeight })
          )
        );
      } else if (referType == 'Table') {
        var _filterId = model.getParams().filterId;
        cardContent = _react2.default.createElement(
          _basic.Col,
          { span: 24, className: 'rightPanel' },
          _react2.default.createElement(
            _basic.Row,
            { ref: 'ReferToolbar' },
            _filterId ? _react2.default.createElement(_filter2.default, { model: model, cols: 2 }) : null,
            _react2.default.createElement(_ReferToolbar2.default, { model: model, filterId: _filterId })
          ),
          _react2.default.createElement(
            _basic.Row,
            null,
            _react2.default.createElement(_ReferTable2.default, { model: model.get('table'), width: this.__isElectronic ? 900 : 1000, maxRowCount: 10, height: this.state.tableHeight })
          )
        );
      } else if (referType === 'TreeList') {
        var _filterId2 = model.getParams().filterId;
        cardContent = _react2.default.createElement(
          _basic.Col,
          { span: 24, className: 'rightPanel' },
          _react2.default.createElement(
            _basic.Row,
            { ref: 'ReferToolbar' },
            _filterId2 ? _react2.default.createElement(_filter2.default, { model: model, cols: 2 }) : null,
            _react2.default.createElement(_ReferToolbar2.default, { model: model, filterId: _filterId2 })
          ),
          _react2.default.createElement(
            _basic.Row,
            null,
            _react2.default.createElement(_basic.TreeTable, { model: model.get('tree'), width: this.__isElectronic ? 900 : 1000, maxRowCount: 10, height: this.state.tableHeight, actionMeta: { controls: [] } })
          )
        );
      }
      return _react2.default.createElement(
        _basic.Row,
        { colCount: 24, id: key },
        treeContent,
        cardContent
      );
    }
  }]);

  return ReferView;
}(_react.Component);

exports.default = ReferView;