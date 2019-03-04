'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _basic = require('../basic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 每个node表示一个进程节点
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *title:节点标题
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *order：顺序，返回的集合已排序，可直接按集合顺序显示
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *value：节点完成百分比，0-100整数，用于绘制圆圈
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *statusStyle：节点圆圈内部的显示样式，image=显示图片，text=显示文字，percent=显示百分比（文字和百分比类型前端可不处理，直接显示status值即可，）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *status：节点圆圈内部的显示内容，statusStyle=image时，status=图片资源名称，statusStyle=text时，status=文本内容，statusStyle=percent时，status=value+’%'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *actionStyle：节点动作的显示样式，button=按钮（可执行操作），text=显示文字（不执行操作）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *actionText：节点动作的按钮文本或静态文本
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *command：仅当actionStyle=button时有效，指定button的命令名称
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *summary：摘要信息，显示为节点浮动提示。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ProcessGroup = function (_Component) {
  _inherits(ProcessGroup, _Component);

  function ProcessGroup(props) {
    _classCallCheck(this, ProcessGroup);

    var _this = _possibleConstructorReturn(this, (ProcessGroup.__proto__ || Object.getPrototypeOf(ProcessGroup)).call(this, props));

    _this.state = {
      value: []
    };
    return _this;
  }

  _createClass(ProcessGroup, [{
    key: 'getData',
    value: function getData() {
      var _this2 = this;

      var _props$viewModel$getP = this.props.viewModel.getParams(),
          billNo = _props$viewModel$getP.billNo,
          id = _props$viewModel$getP.id;

      if (!id) return;
      var proxy = cb.rest.DynamicProxy.create({
        getData: {
          url: '/process/' + billNo + '/' + id,
          method: 'GET',
          options: {
            uniform: false
          }
        }
      });
      proxy.getData(function (err, data) {
        if (err) {
          cb.utils.alert(err.message, 'error');
          return;
        }
        if (data && data.nodes && data.nodes.length) _this2.bindcontrol(data.nodes);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.props.viewModel.on('afterLoadData', function (data) {
        _this3.getData();
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.value === this.state.value) return;
      this.props.viewModel.execute('afterRenderComponent');
    }
  }, {
    key: 'bindcontrol',
    value: function bindcontrol(nodes) {
      nodes.map(function (node, index) {
        if (node.actionStyle == 'button') {
          var key = node.nodeKey;
          if (!viewmodel.get(key)) {
            node.needClear = false;
            var model = new cb.models.SimpleModel(node);
            viewmodel.addProperty(key, model);
          }
        }
      });
      this.setState({
        value: nodes
      });
    }
  }, {
    key: 'format',
    value: function format(option) {
      if (option.statusStyle == 'image') {
        // 暂时先用actionText，后面应该用value
        // const suffix = option.actionText ? '_hover' : '';
        var suffix = option.value && option.value !== '0' ? '_hover' : '';
        var href = '#icon-' + option.status + suffix;
        return _react2.default.createElement(
          'svg',
          { className: 'icon', 'aria-hidden': 'true' },
          _react2.default.createElement('use', { href: href })
        );
      } else {
        return option.status;
      }
    }
  }, {
    key: 'getCircle',
    value: function getCircle(option, content) {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'process-icon' },
        this.format(option)
      );
      var circle = _react2.default.createElement(_antd.Progress, { type: 'circle', percent: option.value, format: function format() {
          return _this4.format(option);
        }, width: 60, status: 'active' });
      if (content) {
        return _react2.default.createElement(
          _antd.Popover,
          { content: content, placement: 'right', trigger: 'hover' },
          circle
        );
      } else {
        return circle;
      }
    }
  }, {
    key: 'getText',
    value: function getText(option) {
      var text = void 0,
          self = this;
      if (option.actionStyle == 'button') {
        var _viewmodel = this.props.model;
        var key = option.nodeKey;
        var model = _viewmodel.get(key);
        var callback = function callback(params) {
          var action = _viewmodel.allActions.find(function (x) {
            return x.cCommand == option.command;
          });
          if (action) {
            var args = cb.utils.extend(true, {}, action, {
              key: key
            });
            _viewmodel.biz.do(action.cAction, _viewmodel, args);
          }
        };
        text = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_basic.Button, { onClick: callback, type: 'ghost', size: 'small', model: model, className: 'manageButton', value: option.actionText })
        );
      } else {
        var actionText = option.actionText ? new Date(option.actionText).format('yyyy-MM-dd hh:mm') : null;
        text = _react2.default.createElement(
          'div',
          null,
          actionText
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'process-tipContent' },
        _react2.default.createElement(
          'div',
          { className: 'title' },
          option.title
        ),
        text
      );
    }
  }, {
    key: 'getIcon',
    value: function getIcon(index, length) {
      if (index + 1 < length) {
        return _react2.default.createElement(_antd.Icon, { type: 'right', className: 'process-rightIcon' });
      }
    }
  }, {
    key: 'getContent',
    value: function getContent(option) {
      if (option.summary) {
        return _react2.default.createElement(
          'div',
          null,
          option.summary
        );
      }
    }
  }, {
    key: 'getControl',
    value: function getControl() {
      var _this5 = this;

      var options = this.state.value;
      return options.map(function (option, index) {
        var content = _this5.getContent(option);
        var circle = _this5.getCircle(option, content);
        var text = _this5.getText(option);
        var nextIcon = _this5.getIcon(index, options.length);
        return _react2.default.createElement(
          'div',
          { key: option.id, className: 'm-t-10' },
          circle,
          text,
          nextIcon
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var control = this.getControl();
      return _react2.default.createElement(
        _basic.Row,
        null,
        _react2.default.createElement(
          _basic.Col,
          { span: 'all', className: 'processContent' },
          control
        )
      );
    }
  }]);

  return ProcessGroup;
}(_react.Component);

exports.default = ProcessGroup;