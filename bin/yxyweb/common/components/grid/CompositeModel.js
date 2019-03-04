'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _input = require('../basic/input');

var _input2 = _interopRequireDefault(_input);

var _inputnumber = require('../basic/inputnumber');

var _inputnumber2 = _interopRequireDefault(_inputnumber);

var _datepicker = require('../basic/datepicker');

var _datepicker2 = _interopRequireDefault(_datepicker);

var _select = require('../basic/select');

var _select2 = _interopRequireDefault(_select);

var _refer = require('../basic/refer');

var _refer2 = _interopRequireDefault(_refer);

var _switch = require('../basic/switch');

var _switch2 = _interopRequireDefault(_switch);

var _labelswitch = require('../basic/labelswitch');

var _labelswitch2 = _interopRequireDefault(_labelswitch);

var _button = require('../basic/button');

var _button2 = _interopRequireDefault(_button);

var _checkbox = require('../basic/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tag = require('../basic/tag');

var _tag2 = _interopRequireDefault(_tag);

var _col = require('../basic/col');

var _col2 = _interopRequireDefault(_col);

var _row = require('../basic/row');

var _row2 = _interopRequireDefault(_row);

var _addEventListener = require('rc-util/lib/Dom/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Meta from '../viewmeta/main';


var CompositeModel = function (_React$Component) {
  _inherits(CompositeModel, _React$Component);

  function CompositeModel(props) {
    _classCallCheck(this, CompositeModel);

    var _this = _possibleConstructorReturn(this, (CompositeModel.__proto__ || Object.getPrototypeOf(CompositeModel)).call(this, props));

    _this.state = {
      isVisible: props.visible,
      width: props.width,
      height: props.height,
      compositeControl: props.compositeControl,
      rowModel: props.rowModel
    };

    _this._isVisible = false;
    _this.onDocumentClick = _this.onDocumentClick.bind(_this);
    return _this;
  }

  _createClass(CompositeModel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.compositeControl) this.setState({
        width: nextProps.width,
        height: nextProps.height,
        compositeControl: nextProps.compositeControl,
        rowModel: nextProps.rowModel
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.isVisible) {
        if (!this.clickOutsideHandler) this.clickOutsideHandler = (0, _addEventListener2.default)(document, 'mousedown', this.onDocumentClick);
        return;
      }
      this.removeEventListener();
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
    }
  }, {
    key: 'onDocumentClick',
    value: function onDocumentClick(event) {
      if (this._isVisible !== false) return;
      var parent = cb.dom(event.target).parents('div[data-reactroot]');
      if (parent.hasClass('ant-row') || parent.children('.bill-maker-modal').length) {
        this.setState({ isVisible: this._isVisible });
        if (!this._isVisible) this.props.setCellBlur();
      }
    }

    /*弹出pop点击事件*/

  }, {
    key: 'showPopClick',
    value: function showPopClick() {
      this.setState({
        isVisible: true
      });
    }
    //是否显示状态改变事件

  }, {
    key: 'onVisibleChange',
    value: function onVisibleChange(e) {
      this._isVisible = e;
    }
    //动态生成pop事件

  }, {
    key: 'getPopoverContent',
    value: function getPopoverContent() {
      var self = this;
      var rowModel = this.state.rowModel;
      var controls = this.state.compositeControl.controls;
      var ret = [];
      controls.map(function (item) {
        var model = rowModel.get(item.cItemName);
        var control = self.getComponents(item, model);
        ret.push(_react2.default.createElement(
          _row2.default,
          null,
          _react2.default.createElement(
            _col2.default,
            { span: 8 },
            item.cShowCaption + ':'
          ),
          _react2.default.createElement(
            _col2.default,
            { span: 16 },
            control
          )
        ));
      });
      return ret;
    }
  }, {
    key: 'getComponents',
    value: function getComponents(col, model) {
      switch (col.cControlType && col.cControlType.trim().toLocaleLowerCase()) {
        case 'input':
          return _react2.default.createElement(_input2.default, { model: model });
        case 'inputnumber':
          var NumPoint = 1;
          /*转换iNumPoint为inputNumber控件识别的小数位*/
          if (col.iNumPoint && col.iNumPoint > 1) {
            NumPoint = 0.1;
            NumPoint = Math.pow(NumPoint, col.iNumPoint).toFixed(col.iNumPoint);
          }
          return _react2.default.createElement(_inputnumber2.default, { model: model, iNumPoint: NumPoint });
        case 'datepicker':
          return _react2.default.createElement(_datepicker2.default, { model: model });
        case 'select':
          return _react2.default.createElement(_select2.default, { model: model });
        case 'refer':
          return _react2.default.createElement(_refer2.default, { model: model });
        case 'switch':
          return _react2.default.createElement(_switch2.default, { model: model, checkedChildren: '\u662F', unCheckedChildren: '\u5426' });
        case 'scheckbox':
          return _react2.default.createElement(_checkbox2.default, { model: model });
        case 'tag':
          return _react2.default.createElement(_tag2.default, { model: model, disabled: false, color: 'blue', closable: true, cRefType: col.cRefType, refReturn: col.refReturn, cRefRetId: col.cRefRetId });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var content = this.getPopoverContent();
      return _react2.default.createElement(
        _antd.Popover,
        { placement: 'bottom', overlayStyle: { width: this.state.width }, content: content, trigger: 'click', visible: this.state.isVisible, onVisibleChange: function onVisibleChange(e) {
            return _this2.onVisibleChange(e);
          } },
        _react2.default.createElement(_button2.default, { style: { borderWidth: 0, width: '100%', height: '100%' }, type: 'ghost', icon: '', onClick: function onClick() {
            return _this2.showPopClick();
          } })
      );
    }
  }]);

  return CompositeModel;
}(_react2.default.Component);

exports.default = CompositeModel;