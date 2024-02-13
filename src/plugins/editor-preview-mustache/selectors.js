import { createSelector } from 'reselect';
import Mustache from 'mustache';

import { initialState, FAILURE_STATUS, PARSING_STATUS, SUCCESS_STATUS } from './reducers.js';

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
  return state.get('parseError', initialState.parseError);
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

export const selectContext = createSelector(selectState, (state) => {
  return state.get('context', initialState.context);
});

export const selectCompiledTemplate = createSelector(
  selectParseSource,
  selectContext,
  selectIsParseSuccess,
  (parseSource, context, isParseSuccess) => {
    if (!isParseSuccess) return parseSource;

    try {
      return Mustache.render(parseSource, JSON.parse(context));
    } catch {
      return null;
    }
  }
);
