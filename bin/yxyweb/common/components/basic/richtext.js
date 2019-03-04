'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichText = function (_Component) {
  _inherits(RichText, _Component);

  function RichText(props) {
    _classCallCheck(this, RichText);

    var _this = _possibleConstructorReturn(this, (RichText.__proto__ || Object.getPrototypeOf(RichText)).call(this, props));

    _this.state = {
      visible: true,
      id: 'ueditor' + new Date().getTime()
    };
    return _this;
  }

  _createClass(RichText, [{
    key: 'showEditor',
    value: function showEditor() {
      UE.dom.domUtils.setStyle(document.getElementById(this.state.id), 'display', '');
    }
  }, {
    key: 'hideEditor',
    value: function hideEditor() {
      UE.dom.domUtils.setStyle(document.getElementById(this.state.id), 'display', 'none');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.model) this.props.model.addListener(this);
      window.UEDITOR_HOME_URL = '/ueditor/';
      cb.requireInner(['/ueditor/ueditor.config.js', '/ueditor/ueditor.all.js', '/ueditor/ueditor.parse.min.js'], function () {
        _this2.editor = UE.getEditor(_this2.state.id, { initialFrameHeight: 275 });
        _this2.editor.ready(function () {
          if (_this2.content) _this2.editor.setContent(_this2.content);
          _this2.editor.addListener('contentChange selectionchange', function () {
            var content = _this2.editor.getContent();
            _this2.content = content;
          }, _this2);
          _this2.editor.addListener('blur', function () {
            var content = _this2.editor.getContent();
            _this2.content = content;
            if (_this2.props.setContent) _this2.props.setContent(_this2.content);
            if (_this2.props.model) _this2.props.model.setValue(_this2.content, true);
          });
          _this2.state.readOnly ? _this2.hideEditor() : _this2.showEditor();
        }, _this2);
      }, this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.editor && this.editor.body) {
        var content = this.editor.getContent();
        if (content != this.content) this.editor.setContent(this.content);
        this.state.readOnly ? this.hideEditor() : this.showEditor();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.content = nextProps.content;
    }
  }, {
    key: 'baseControl',
    value: function baseControl() {
      var children = [];
      children.push(_react2.default.createElement('script', { key: 'script', id: this.state.id, type: 'text/plain' }));
      if (this.state.readOnly) children.push((0, _text2.default)(_react2.default.createElement('div', { key: 'div', dangerouslySetInnerHTML: { __html: this.content } })));
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)({ browse: this.state.readOnly }) },
        children
      );
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var control = this.props.cShowCaption ? _react2.default.createElement(_label2.default, { control: this.baseControl(), title: this.props.cShowCaption }) : this.baseControl();
      return control;
    }
  }, {
    key: 'render',
    value: function render() {
      this.content = this.state.value;
      if (cb.utils.isEmpty(this.content)) this.content = '';
      var control = this.getControl();
      var style = this.state.visible ? {} : { display: 'none' };
      var classname = this.state.readOnly ? 'basic-input-editor basic-input-editor-readonly' : 'basic-input-editor';
      return _react2.default.createElement(
        'div',
        { className: classname, style: style },
        control
      );
    }
  }]);

  return RichText;
}(_react.Component);

exports.default = RichText;