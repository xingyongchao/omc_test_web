'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _antd = require('antd');

var _basic = require('../basic');

var _print = require('../../redux/print');

var printactions = _interopRequireWildcard(_print);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrintBody = function (_Component) {
  _inherits(PrintBody, _Component);

  function PrintBody(props) {
    _classCallCheck(this, PrintBody);

    var _this = _possibleConstructorReturn(this, (PrintBody.__proto__ || Object.getPrototypeOf(PrintBody)).call(this, props));

    _this.closeWindow = function () {
      if (_this.winObj.closed && _this.timer != null) {
        _this.actions.loadTemplate();
        window.clearInterval(_this.timer);
        window.clearInterval(_this.winObj);
        _this.timer = null;
      }
    };

    _this.setDefault = function (template, bo) {
      var params = { "templateCode": template.templatecode, "pkBo": bo.pk_bo };
      _this.actions.setDefaultTemplate(params, template.pk_print_template);
    };

    _this.getBillName = function (billno) {
      var templateData = _this.props.print.templateData;

      var name = '';
      templateData.forEach(function (element) {
        if (element.bo_code == billno) {
          name = element.bo_name;
        }
      });
      return name;
    };

    _this.onClick = function (e, type, data, billno) {
      switch (type) {
        case 'modify':
          _this.actions.modifyTemplate(data.templatecode);
          break;
        case 'copy':
          _this.pk_print_template = data.pk_print_template;
          _this.billno = _this.getBillName(billno);
          _this.actions.setData({ showCopyModal: true });
          break;
        case 'delete':
          if (data.isdefault == true) {
            cb.utils.alert('默认模板不允许删除！', 'error');
            return;
          }
          cb.utils.confirm('\u786E\u5B9A\u8981\u5220\u9664' + data.templatename + '\uFF1F', function () {
            _this.actions.deleteTemplate(data.pk_print_template);
          });
          break;
      }
    };

    _this.onOk = function (e) {
      var _this$props$print = _this.props.print,
          selectType = _this$props$print.selectType,
          templatecode = _this$props$print.templatecode,
          templatename = _this$props$print.templatename;

      var renderData = { templatecode: templatecode, templatename: templatename, pk_template: _this.pk_print_template };
      if (!templatecode || templatecode == '' || templatename == '' || !templatename) {
        cb.utils.alert('模板编码/模板名称必输！', 'error');
        return;
      }
      var bSbccase = false;
      bSbccase = _this.isSbccase(templatecode);
      if (!bSbccase) bSbccase = _this.isSbccase(templatename);
      if (bSbccase) {
        cb.utils.alert('模板编码/模板名称不支持全角！', 'error');
        return;
      }
      if (escape(templatecode).indexOf("%u") >= 0) {
        cb.utils.alert('编码不允许存在中文！', 'error');
        return;
      }
      _this.actions.copyTemplate(renderData);
      _this.actions.setData({ showCopyModal: false, templatecode: '', templatename: '' });
    };

    _this.isSbccase = function (str) {
      // for (var i = 0; i < str.length; i++) {
      //   if (str.charCodeAt(i) > 128) {
      //     return true;
      //     break;
      //   }
      // }
      var sbccase = str.match(/[\uff00-\uffff]/g);
      if (sbccase && sbccase.length > 0) return true;else return false;
    };

    _this.onCancel = function (e) {
      _this.actions.setData({ showCopyModal: false });
    };

    _this.onChange = function (val, type) {
      if (type == 'code') {
        _this.actions.setData({ templatecode: val.target.value });
      } else {
        _this.actions.setData({ templatename: val.target.value });
      }
    };

    _this.getTemplates = function (bo) {
      var data = bo.templates,
          billno = bo.billno;
      var templates = [];
      data.forEach(function (ele) {
        var _this2 = this;

        var defaultControl = this.getDefault(ele, bo);
        var precutControl = ele.isPrecut ? _react2.default.createElement('div', { className: 'print-card-btn-precut' }) : _react2.default.createElement('div', null);
        // let buttonControl = this.getButton(ele);
        templates.push(_react2.default.createElement(
          _basic.Col,
          { span: 1 },
          _react2.default.createElement(
            'div',
            { className: 'print-card' },
            _react2.default.createElement(
              'div',
              { className: 'print-card-header' },
              precutControl,
              defaultControl
            ),
            _react2.default.createElement(
              'div',
              { className: 'print-card-title' },
              ele.templatename
            ),
            _react2.default.createElement(
              'div',
              { className: 'print-card-operation' },
              _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                    return _this2.onClick(e, 'modify', ele);
                  } },
                '\u8BBE\u8BA1'
              ),
              '|',
              _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                    return _this2.onClick(e, 'copy', ele, billno);
                  } },
                '\u590D\u5236'
              ),
              '|',
              _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                    return _this2.onClick(e, 'delete', ele);
                  } },
                '\u5220\u9664'
              )
            )
          )
        ));
      }, _this);
      return _react2.default.createElement(
        _basic.Row,
        { colCount: 4 },
        templates
      );
    };

    _this.getControl = function (data) {
      if (!data) return '';
      var controls = [];
      data.forEach(function (element) {
        var templates = this.getTemplates(element);
        controls.push(
        // <div id={element.bo_code} className='uretail-print-list'><h3>{element.bo_name}</h3>{templates}</div>
        _react2.default.createElement(
          'div',
          { className: 'uretail-print-list ' + element.bo_code },
          _react2.default.createElement(
            'h3',
            null,
            element.bo_name
          ),
          templates
        ));
      }, _this);
      return controls;
    };

    _this.actions = props.printactions;
    return _this;
  }

  _createClass(PrintBody, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.actions.loadTemplate();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var oldProps = this.props.print;
      var newProps = nextProps.print;
      if (newProps.openNewWindow && oldProps.openNewWindow != newProps.openNewWindow) {
        this.winObj = window.open(newProps.url);
        this.timer = window.setInterval(this.closeWindow, 500);
        this.actions.setData({ openNewWindow: false });
      }
      if (oldProps.selectType != newProps.selectType) {
        var printBody = cb.dom((0, _reactDom.findDOMNode)(this.refs.printBody));
        if (printBody && printBody[0]) {
          var offsetTop = 200;
          var selectDom = window.document.getElementsByClassName(newProps.selectType);
          if (selectDom && selectDom[0]) {
            offsetTop = selectDom[0].offsetTop - 150;
          }
          printBody[0].scrollTo(0, offsetTop);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.clearInterval(this.winObj);
      this.actions.setData({
        selectType: '', templateData: [],
        url: null, showModal: false, showCopyModal: false,
        templatecode: '', templatename: '', openNewWindwo: false
      });
    }
    /*设为默认模板*/

    /*判断全角函数*/

    /*关闭modal*/

    /*编码/名称改变*/

  }, {
    key: 'getDefault',

    /**/
    value: function getDefault(ele, bo) {
      var _this3 = this;

      if (ele.isdefault) {
        return _react2.default.createElement(
          'div',
          { className: 'print-card-btn-default' },
          _react2.default.createElement(
            _antd.Button,
            { size: 'small' },
            '\u9ED8\u8BA4\u6A21\u677F'
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'print-card-btn-setDefault' },
          _react2.default.createElement(
            _antd.Button,
            { size: 'small', onClick: function onClick() {
                return _this3.setDefault(ele, bo);
              } },
            '\u8BBE\u4E3A\u9ED8\u8BA4'
          )
        );
      }
    }
    // getButton(ele) {
    //     if (ele.isPrecut) {
    //         return (
    //             <div className="print-card-operation">
    //                 <a onClick={(e) => this.onClick(e, 'copy', ele, billno)}>复制</a>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div className="print-card-operation">
    //                 <a onClick={(e) => this.onClick(e, 'modify', ele)}>设计</a>|<a onClick={(e) => this.onClick(e, 'copy', ele, billno)}>复制</a>|<a onClick={(e) => this.onClick(e, 'delete', ele)}>删除</a>
    //             </div>
    //         )
    //     }
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props$print = this.props.print,
          templateData = _props$print.templateData,
          showCopyModal = _props$print.showCopyModal,
          templatecode = _props$print.templatecode,
          templatename = _props$print.templatename;

      var control = this.getControl(templateData);
      var style = { "height": this.props.height };
      return _react2.default.createElement(
        'div',
        { ref: 'printBody', className: 'uretail-print-body', style: style },
        control,
        _react2.default.createElement(
          _antd.Modal,
          { title: '\u590D\u5236\u6A21\u677F', width: 846, visible: showCopyModal,
            onOk: this.onOk, onCancel: this.onCancel, okText: '\u786E\u8BA4', cancelText: '\u53D6\u6D88', maskClosable: false
          },
          _react2.default.createElement(
            _basic.Row,
            null,
            _react2.default.createElement(_basic.Label, { title: '*\u6A21\u677F\u7F16\u7801:', control: _react2.default.createElement(_antd.Input, { value: templatecode, onChange: function onChange(val) {
                  return _this4.onChange(val, 'code');
                }, placeholder: '\u8BF7\u8F93\u5165\u6A21\u677F\u7F16\u7801' }) }),
            _react2.default.createElement(_basic.Label, { title: '*\u6A21\u677F\u540D\u79F0:', control: _react2.default.createElement(_antd.Input, { value: templatename, onChange: function onChange(val) {
                  return _this4.onChange(val, 'name');
                }, placeholder: '\u8BF7\u8F93\u5165\u6A21\u677F\u540D\u79F0' }) })
          )
        )
      );
    }
  }]);

  return PrintBody;
}(_react.Component);

function mapStateToProps(state) {
  return {
    print: state.print.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    printactions: (0, _redux.bindActionCreators)(printactions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PrintBody);