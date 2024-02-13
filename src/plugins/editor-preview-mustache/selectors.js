import { createSelector } from 'reselect';

import { initialState, FAILURE_STATUS, PROGRESS_STATUS, SUCCESS_STATUS } from './reducers.js';

const selectState = (state) => state;

export const selectParseSource = (state) => state.get('parseSource');

export const selectParseResult = createSelector(selectState, (state) => {
  const parseResult = state.get('parseResult', initialState.parseResult);

  if (Array.isArray(parseResult)) {
    return null;
  }

  return parseResult;
});

export const selectParseError = createSelector(selectState, (state) => {
  return state.get('parseError', initialState.parseError);
});

export const selectParseStatus = (state) => state.get('parseStatus') || initialState.parseStatus;

export const selectIsParseInProgress = createSelector(
  selectParseStatus,
  selectParseResult,
  selectParseError,
  (parseStatus, parseResult, parseErrors) => {
    return parseStatus === PROGRESS_STATUS && parseResult === null && parseErrors === null;
  }
);

export const selectIsParseSuccess = createSelector(
  selectParseStatus,
  (parseStatus) => parseStatus === SUCCESS_STATUS
);

export const selectIsParseFailure = createSelector(
  selectParseStatus,
  (parseStatus) => parseStatus === FAILURE_STATUS
);

export const selectContext = createSelector(selectState, (state) => {
  return state.get('context', initialState.context);
});

export const selectRenderTemplateStatus = (state) =>
  state.get('renderTemplateStatus') || initialState.renderTemplateStatus;

export const selectIsRenderTemplateSuccess = createSelector(
  selectRenderTemplateStatus,
  (renderTemplateStatus) => renderTemplateStatus === SUCCESS_STATUS
);

export const selectIsRenderTemplateFailure = createSelector(
  selectRenderTemplateStatus,
  (renderTemplateStatus) => renderTemplateStatus === FAILURE_STATUS
);

export const selectRenderTemplateResult = createSelector(selectState, (state) => {
  return state.get('renderTemplateResult', initialState.renderTemplateResult);
});

export const selectRenderTemplateError = createSelector(selectState, (state) => {
  return state.get('renderTemplateError', initialState.renderTemplateError);
});

export const selectIsRenderTemplateInProgress = createSelector(
  selectRenderTemplateStatus,
  selectRenderTemplateResult,
  selectRenderTemplateError,
  (renderTemplateStatus, renderTemplateResult, renderTemplateError) => {
    return (
      renderTemplateStatus === PROGRESS_STATUS &&
      renderTemplateResult === null &&
      renderTemplateError === null
    );
  }
);
