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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { SearchTree } from '../meta';


var ConvenientQuery = null;

var ReferModal = function (_React$Component) {
  _inherits(ReferModal, _React$Component);

  function ReferModal(props) {
    _classCallCheck(this, ReferModal);

    var _this = _possibleConstructorReturn(this, (ReferModal.__proto__ || Object.getPrototypeOf(ReferModal)).call(this, props));

    ConvenientQuery = require('../filter').default;
    _this.state = {
      className: _env2.default.INTERACTIVE_MODE === 'touch' ? ' refer-modal-touch' : '',
      title: (_this.props.title || '') + '参照',
      visible: _this.props.visible,
      referType: _this.props.referType,
      bodyHeight: 0,
      tableHeight: 0
    };
    _this.__isElectronic = false;
    return _this;
  }

  _createClass(ReferModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (window.__isElectronic) {
        this.__isElectronic = true;
      }
    }
  }, {
    key: 'getModel',
    value: function getModel() {
      return this.props.model || this.model;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.setState({ visible: nextProps.visible });
      var model = nextProps.model;
      if (model) {
        var referType = nextProps.referType;

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
        this.setState({ referType: referType, bodyHeight: bodyHeight, tableHeight: tHeight });
        if (!this.props.model) {
          model.un('filterHeightUpdate');
          model.on('filterHeightUpdate', function () {
            var toolbarHeight = (0, _reactDom.findDOMNode)(_this2.refs.ReferToolbar).clientHeight;
            var tableHeight = _this2.state.bodyHeight - toolbarHeight;
            _this2.props.model.get('table').execute('toolbarHeightUpdate', tableHeight);
          });
          if (typeof this.props.afterOkClick === 'function') model.on('afterOkClick', this.props.afterOkClick);
        }
      } else {
        if (this.props.cRefType) {
          model = this.getModel();
          if (!model) {
            var self = this;
            this.model = cb.loader.initRefer(this.props.cRefType, this.props.multiple || false, null, function (data) {
              self.setState({ referType: data.cTplType });
            }, this.props.afterOkClick);
          }
        }
      }
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.setState({
        visible: false
      });
      if (this.props.close) this.props.close();
    }
  }, {
    key: 'handleOk',
    value: function handleOk() {
      this.handleCancel();
      var model = this.getModel();
      if (model) model.okClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var referType = this.state.referType;
      var model = this.getModel();
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
            filterId ? _react2.default.createElement(ConvenientQuery, { model: model, cols: 2 }) : null,
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
            _filterId ? _react2.default.createElement(ConvenientQuery, { model: model, cols: 2 }) : null,
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
            _filterId2 ? _react2.default.createElement(ConvenientQuery, { model: model, cols: 2 }) : null,
            _react2.default.createElement(_ReferToolbar2.default, { model: model, filterId: _filterId2 })
          ),
          _react2.default.createElement(
            _basic.Row,
            null,
            _react2.default.createElement(_basic.TreeTable, { model: model.get('tree'), width: this.__isElectronic ? 900 : 1000, maxRowCount: 10, height: this.state.tableHeight, actionMeta: { controls: [] } })
          )
        );
      }
      var modalContent = null;
      // if (this.__isElectronic && ((referType == 'TreeTable' || referType == 'Table'))) {
      //   let footerControl = (
      //     <div class="ant-modal-footer">
      //       <ReferPagination model={model.get('table')} />
      //       <Button onClick={e => this.handleCancel()} className="ant-btn-lg">取 消</Button>
      //       <Button onClick={e => this.handleOk()} type="primary" className="ant-btn-lg">确 定</Button>
      //     </div>
      //   )
      //   modalContent = (
      //     <Modal maskClosable={false} width={846} title={this.state.title} visible={this.state.visible}
      //       footer={footerControl}
      //       onOk={e => this.handleOk()} onCancel={e => this.handleCancel()} okText="确定" cancelText="取消"
      //       className={className}>
      //       <Row colCount={24}>
      //         {treeContent}
      //         {cardContent}
      //       </Row>
      //     </Modal>
      //   );
      // } else {
      modalContent = _react2.default.createElement(
        _antd.Modal,
        { key: key, maskClosable: false, width: 846, title: this.state.title, visible: this.state.visible, onOk: function onOk(e) {
            return _this3.handleOk();
          }, onCancel: function onCancel(e) {
            return _this3.handleCancel();
          }, okText: '\u786E\u5B9A', cancelText: '\u53D6\u6D88', className: className },
        _react2.default.createElement(
          _basic.Row,
          { colCount: 24, id: key },
          treeContent,
          cardContent
        )
      );
      // }
      return modalContent;
    }
  }]);

  return ReferModal;
}(_react2.default.Component);

exports.default = ReferModal;