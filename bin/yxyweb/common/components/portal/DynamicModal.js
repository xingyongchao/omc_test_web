'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _antd = require('antd');

var _Container = require('../meta/Container');

var _Container2 = _interopRequireDefault(_Container);

var _TitleTips = require('../meta/TitleTips');

var _TitleTips2 = _interopRequireDefault(_TitleTips);

var _Toolbar = require('../meta/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _modal = require('../modal');

var ModalIndex = _interopRequireWildcard(_modal);

var _modal2 = require('../../../../common/components/modal');

var ExternalModal = _interopRequireWildcard(_modal2);

var _dynamicModal = require('../../redux/dynamicModal');

var dynamicModalActions = _interopRequireWildcard(_dynamicModal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalMap = {};
Object.assign(ModalMap, ModalIndex);
Object.assign(ModalMap, ExternalModal);

var DynamicModal = function (_Component) {
  _inherits(DynamicModal, _Component);

  function DynamicModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DynamicModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DynamicModal.__proto__ || Object.getPrototypeOf(DynamicModal)).call.apply(_ref, [this].concat(args))), _this), _this.handleSave = function () {
      var _this$props = _this.props,
          dynamicModal = _this$props.dynamicModal,
          dynamicModalActions = _this$props.dynamicModalActions;

      var viewModel = dynamicModal.content.vm;
      var beforeSave = function beforeSave(beforeActData, callback) {
        beforeActData.close = function () {
          dynamicModalActions.closeModal();
        };
        viewModel.promiseExecute('beforeSave', beforeActData, callback);
      };
      var afterSave = function afterSave(afterActData, callback) {
        viewModel.promiseExecute('afterSave', afterActData, function () {
          callback && callback(afterActData);
        });
      };
      viewModel.biz.action().save(viewModel.getParams().billNo, viewModel, null, beforeSave, function (afterSaveData) {
        afterSave(afterSaveData, function () {
          if (afterSaveData.err) {
            cb.utils.alert(afterSaveData.err.message, 'error');
            return;
          }
          dynamicModalActions.closeModal();
          var parentViewModel = viewModel.getCache('parentViewModel');
          if (parentViewModel) parentViewModel.execute('back');
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DynamicModal, [{
    key: 'close',
    value: function close() {
      var dynamicModalActions = this.props.dynamicModalActions;

      dynamicModalActions.closeModal();
    }
  }, {
    key: 'handleOk',
    value: function handleOk(viewModel, groupCode) {
      var _this2 = this;

      viewModel.promiseExecute('afterOkClick', { key: groupCode }, function () {
        _this2.close();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var dynamicModal = this.props.dynamicModal;

      if (!dynamicModal.showModal) return null;
      var groupCode = dynamicModal.groupCode,
          viewModel = dynamicModal.viewModel,
          title = dynamicModal.title,
          content = dynamicModal.content;

      if (groupCode) {
        var meta = viewModel.getViewMeta(groupCode);
        var containerType = meta.cControlType && meta.cControlType.trim().toLocaleLowerCase();
        if (containerType === 'modal') {
          var _React$createElement;

          var container = Object.assign({}, meta, { cControlType: 'div' });
          var width = 800;
          return _react2.default.createElement(
            _antd.Modal,
            (_React$createElement = { className: 'Table', visible: true, title: meta.cName, width: 846, onOk: function onOk() {
                return _this3.handleOk(viewModel, groupCode);
              }, onCancel: function onCancel() {
                return _this3.close();
              } }, _defineProperty(_React$createElement, 'width', width), _defineProperty(_React$createElement, 'maskClosable', false), _React$createElement),
            _react2.default.createElement(_Container2.default, { className: 'modal-container', meta: container, viewModel: viewModel, width: width, parents: 'Modal' })
          );
        }
        return null;
      }
      if (content) {
        var _content$metaData$vie = content.metaData.view,
            iWidth = _content$metaData$vie.iWidth,
            containers = _content$metaData$vie.containers;

        var toolbarIndex = containers.findIndex(function (item) {
          return item.cControlType && item.cControlType.trim().toLocaleLowerCase() === 'toolbar';
        });
        var cStyle = containers[0].cStyle;
        var config = [];
        var modelclassname = void 0;
        if (cStyle) {
          try {
            cStyle = JSON.parse(cStyle);
            config = cStyle.config || [];
            modelclassname = cStyle.modelclassname;
          } catch (e) {
            config = [];
          }
        }
        var extraConfig = {
          visible: true,
          maskClosable: false,
          width: iWidth
        };
        if (modelclassname) {
          extraConfig.className = modelclassname;
        }
        if (toolbarIndex > -1) {
          extraConfig.footer = _react2.default.createElement(_Toolbar2.default, { controls: containers[toolbarIndex].controls, model: content.vm });
          containers.splice(toolbarIndex, 1);
        } else {
          extraConfig.onOk = this.handleSave;
        }
        return _react2.default.createElement(
          _antd.Modal,
          _extends({}, extraConfig, { title: _react2.default.createElement(
              'div',
              null,
              title,
              config.length ? _react2.default.createElement(_TitleTips2.default, { config: config }) : null
            ), onCancel: function onCancel() {
              return _this3.close();
            } }),
          _react2.default.createElement(_Container2.default, { meta: content.metaData.view, viewModel: content.vm, width: iWidth, parents: 'Modal' })
        );
      }
      var ComName = ModalMap[dynamicModal.key];
      if (!ComName) return null;
      return _react2.default.createElement(ComName, _extends({}, dynamicModal.data, { close: function close() {
          return _this3.close();
        } }));
    }
  }]);

  return DynamicModal;
}(_react.Component);

function mapStateToProps(state) {
  return {
    dynamicModal: state.dynamicModal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dynamicModalActions: (0, _redux.bindActionCreators)(dynamicModalActions, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DynamicModal);