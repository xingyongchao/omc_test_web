'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openModal = openModal;
exports.closeModal = closeModal;
exports.openMetaModal = openMetaModal;
exports.openMetaRunnerModal = openMetaRunnerModal;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _util = require('../helpers/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $$initialState = _immutable2.default.fromJS({
  showModal: false
});

exports.default = function () {
  var $$state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'PLATFORM_UI_MODAL_OPEN':
      return $$state.merge({
        showModal: true,
        key: action.payload.key,
        data: action.payload.data
      });
    case 'PLATFORM_UI_MODAL_CLOSE':
      return $$state.merge({
        showModal: false,
        key: null,
        data: null,
        groupCode: null,
        viewModel: null,
        title: null,
        content: null
      });
    case 'PLATFORM_UI_META_MODAL_OPEN':
      return $$state.merge({
        showModal: true,
        groupCode: action.payload.groupCode,
        viewModel: action.payload.viewModel
      });
    case 'PLATFORM_UI_META_RUNNER_MODAL_OPEN':
      return $$state.merge({
        showModal: true,
        title: action.payload.title,
        content: action.payload.content
      });
    default:
      return $$state;
  }
};

function openModal(key, data) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_MODAL_OPEN', { key: key, data: data }));
  };
}

function closeModal() {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_MODAL_CLOSE'));
  };
}

function openMetaModal(groupCode, viewModel) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_MODAL_OPEN', { groupCode: groupCode, viewModel: viewModel }));
  };
}

function openMetaRunnerModal(title, content) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_META_RUNNER_MODAL_OPEN', { title: title, content: content }));
  };
}