import Immutable from 'immutable';
import { genAction } from '../helpers/util';

const $$initialState = Immutable.fromJS({
  showModal: false
})

export default ($$state = $$initialState, action) => {
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
}

export function openModal(key, data) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_MODAL_OPEN', { key, data }));
  }
}

export function closeModal() {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_MODAL_CLOSE'));
  }
}

export function openMetaModal(groupCode, viewModel) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_MODAL_OPEN', { groupCode, viewModel }));
  }
}

export function openMetaRunnerModal(title, content) {
  return function (dispatch) {
    dispatch(genAction('PLATFORM_UI_META_RUNNER_MODAL_OPEN', { title, content }));
  }
}
