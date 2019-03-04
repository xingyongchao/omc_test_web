'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _row = require('./row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./col');

var _col2 = _interopRequireDefault(_col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { Row, Col } from 'antd';


var LabelControl = function (_React$Component) {
  _inherits(LabelControl, _React$Component);

  function LabelControl(props) {
    _classCallCheck(this, LabelControl);

    var _this = _possibleConstructorReturn(this, (LabelControl.__proto__ || Object.getPrototypeOf(LabelControl)).call(this, props));

    _this.state = {
      title: _this.props.title,
      value: _this.props.value,
      control: _this.props.control,
      visible: !props.bHidden,
      style: _this.props.style,
      hideControl: _this.props.hideControl,
      isInFilterJSX: _this.props.isInFilterJSX
    };
    _this.getBaseControl = _this.getBaseControl.bind(_this);
    return _this;
  }

  _createClass(LabelControl, [{
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        title: nextProps.title,
        control: nextProps.control,
        style: nextProps.style
      });
    }
  }, {
    key: 'getBaseControl',
    value: function getBaseControl() {
      return _react2.default.createElement(
        'div',
        { style: this.state.style },
        this.state.value
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var title = this.state.title;
      var control = this.state.control ? this.state.control : this.getBaseControl();
      var selfStyle = this.state.visible ? {} : { display: "none" };
      var m = void 0;

      if (this.state.hideControl == true) {
        m = _react2.default.createElement(
          _row2.default,
          { style: selfStyle, colCount: 3 },
          title && _react2.default.createElement(
            _col2.default,
            { className: 'label-control', span: 3 },
            title
          )
        );
      } else if (this.state.isInFilterJSX == true) {
        m = _react2.default.createElement(
          _row2.default,
          { colCount: 24 },
          title && _react2.default.createElement(
            _col2.default,
            { className: 'label-control' },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: 'input-control' },
            control
          )
        );

        /*m = (<div className='input-control' >
          {
            title && <Col className='label-control' style={{ width: '88px' }}>{title}</Col>
          }
          <div className='input-control'>{control}</div>
        </div>);*/

        /*m = (<Row colCount={24}>
          {
            title && <Col className='label-control' style={{ width: '88px' }}>{title}</Col>
          }
          <div className='input-control'>{control}</div>
        </Row>);*/
        /*m = (<Row colCount={24}>
          {
            title && <Col className='label-control' span={12}>{title}</Col>
          }
          <Col className='input-control' span={12}>{control}</Col>
        </Row>);*/
      } else {
        var titleClassName = this.props.titleClassName ? this.props.titleClassName : '';
        m = _react2.default.createElement(
          _row2.default,
          { style: selfStyle, colCount: 10 },
          title && _react2.default.createElement(
            _col2.default,
            { className: 'label-control ' + titleClassName, span: 4 },
            title
          ),
          _react2.default.createElement(
            _col2.default,
            { className: 'input-control control-width', span: 6 },
            control
          )
        );
      }
      return m;
    }
  }]);

  return LabelControl;
}(_react2.default.Component);

exports.default = LabelControl;