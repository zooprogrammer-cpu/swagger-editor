import {
  EDITOR_PREVIEW_MUSTACHE_PREVIEW_UNMOUNTED,
  EDITOR_PREVIEW_MUSTACHE_SET_CONTEXT,
} from './actions/index.js';
import {
  EDITOR_PREVIEW_MUSTACHE_PARSE_STARTED,
  EDITOR_PREVIEW_MUSTACHE_PARSE_SUCCESS,
  EDITOR_PREVIEW_MUSTACHE_PARSE_FAILURE,
} from './actions/parse.js';
import {
  EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_STARTED,
  EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_SUCCESS,
  EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_FAILURE,
} from './actions/pull-context.js';
import {
  EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_STARTED,
  EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_SUCCESS,
  EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_FAILURE,
} from './actions/render-template.js';

export const IDLE_STATUS = 'idle';
export const PROGRESS_STATUS = 'in-progress';
export const SUCCESS_STATUS = 'success';
export const FAILURE_STATUS = 'failure';

export const initialState = {
  parseStatus: IDLE_STATUS,
  parseRequestId: null,
  parseSource: null,
  parseResult: null,
  parseError: null,

  pullStatus: IDLE_STATUS,
  pullRequestId: null,
  pullError: null,

  renderTemplateStatus: IDLE_STATUS,
  renderTemplateRequestId: null,
  renderTemplateResult: null,
  renderTemplateError: null,

  context: '{}',
};

/**
 * Case reducers modeled as finite state machine.
 */

const previewUnmountedReducer = (state) => {
  const { parseStatus, parseRequestId, parseResult, parseErrors } = initialState;

  return state.merge({
    parseStatus,
    parseRequestId,
    parseResult,
    parseErrors,
  });
};

const parseStartedReducer = (state, action) => {
  return state.merge({
    parseStatus: PROGRESS_STATUS,
    parseRequestId: action.meta.requestId,
    parseSource: action.payload,
  });
};

const parseSuccessReducer = (state, action) => {
  const status = state.get('parseStatus') || IDLE_STATUS;
  const requestId = state.get('parseRequestId');

  if (status === PROGRESS_STATUS && requestId === action.meta.requestId) {
    return state.merge({
      parseStatus: SUCCESS_STATUS,
      parseRequestId: null,
      parseResult: action.payload,
      parseErrors: null,
    });
  }

  return state;
};

const parseFailureReducer = (state, action) => {
  const status = state.get('parseStatus') || IDLE_STATUS;
  const requestId = state.get('parseRequestId');

  if (status === PROGRESS_STATUS && requestId === action.meta.requestId) {
    return state.merge({
      parseStatus: FAILURE_STATUS,
      parseRequestId: null,
      parseResult: null,
      parseError: action.payload,
    });
  }

  return state;
};

const pullStartedReducer = (state, action) => {
  return state.merge({
    pullStatus: PROGRESS_STATUS,
    pullRequestId: action.meta.requestId,
  });
};

const pullSuccessReducer = (state, action) => {
  const status = state.get('pullStatus') || IDLE_STATUS;
  const requestId = state.get('pullRequestId');

  if (status === PROGRESS_STATUS && requestId === action.meta.requestId) {
    return state.merge({
      pullStatus: SUCCESS_STATUS,
      pullRequestId: null,
      parseErrors: null,
    });
  }

  return state;
};

const pullFailureReducer = (state, action) => {
  const status = state.get('pullStatus') || IDLE_STATUS;
  const requestId = state.get('pullRequestId');

  if (status === PROGRESS_STATUS && requestId === action.meta.requestId) {
    return state.merge({
      pullStatus: FAILURE_STATUS,
      pullRequestId: null,
      pullError: action.payload,
    });
  }

  return state;
};

const renderTemplateStartedReducer = (state, action) => {
  return state.merge({
    renderTemplateStatus: PROGRESS_STATUS,
    renderTemplateRequestId: action.meta.requestId,
  });
};

const renderTemplateSuccessReducer = (state, action) => {
  const status = state.get('renderTemplateStatus') || IDLE_STATUS;
  const requestId = state.get('renderTemplateRequestId');

  if (status === PROGRESS_STATUS && requestId === action.meta.requestId) {
    return state.merge({
      renderTemplateStatus: SUCCESS_STATUS,
      renderTemplateRequestId: null,
      renderTemplateResult: action.payload,
      renderTemplateErrors: null,
    });
  }

  return state;
};

const renderTemplateFailureReducer = (state, action) => {
  const status = state.get('renderTemplateStatus') || IDLE_STATUS;
  const requestId = state.get('renderTemplateRequestId');

  if (status === PROGRESS_STATUS && requestId === action.meta.requestId) {
    return state.merge({
      renderTemplateStatus: FAILURE_STATUS,
      renderTemplateRequestId: null,
      renderTemplateResult: null,
      renderTemplateError: action.payload,
    });
  }

  return state;
};

const setContextReducer = (state, action) => {
  return state.merge({ context: action.payload });
};

/**
 * Root reducer for this plugin.
 */

const reducers = {
  [EDITOR_PREVIEW_MUSTACHE_PREVIEW_UNMOUNTED]: previewUnmountedReducer,

  [EDITOR_PREVIEW_MUSTACHE_PARSE_STARTED]: parseStartedReducer,
  [EDITOR_PREVIEW_MUSTACHE_PARSE_SUCCESS]: parseSuccessReducer,
  [EDITOR_PREVIEW_MUSTACHE_PARSE_FAILURE]: parseFailureReducer,

  [EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_STARTED]: pullStartedReducer,
  [EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_SUCCESS]: pullSuccessReducer,
  [EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_FAILURE]: pullFailureReducer,

  [EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_STARTED]: renderTemplateStartedReducer,
  [EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_SUCCESS]: renderTemplateSuccessReducer,
  [EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_FAILURE]: renderTemplateFailureReducer,

  [EDITOR_PREVIEW_MUSTACHE_SET_CONTEXT]: setContextReducer,
};

export default reducers;
