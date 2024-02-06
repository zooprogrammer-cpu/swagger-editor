import { createSelector } from 'reselect';

import { initialState, FAILURE_STATUS, PARSING_STATUS, SUCCESS_STATUS } from './reducers.js';
import { context } from './context.js';

const selectState = (state) => state;

export const selectParseSource = (state) => state.get('source');

export const selectParseResult = createSelector(selectState, (state) => {
  const parseResult = state.get('parseResult', initialState.parseResult);

  if (Array.isArray(parseResult)) {
    return null;
  }

  return parseResult;
});

export const selectParseError = createSelector(selectState, (state) => {
  return state.get('parseError', initialState.parseResult);
});

export const selectParseStatus = (state) => state.get('parseStatus') || initialState.parseStatus;

export const selectIsParseInProgress = createSelector(
  selectParseStatus,
  selectParseResult,
  selectParseError,
  (parseStatus, parseResult, parseErrors) => {
    return parseStatus === PARSING_STATUS && parseResult === null && parseErrors === null;
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

export const selectCompiledTemplate = createSelector(
  selectParseSource,
  selectParseResult,
  selectIsParseSuccess,
  (parseSource, parseResult, isParseSuccess) => {
    if (!isParseSuccess) return parseSource;

    return parseResult(context);
  }
);
