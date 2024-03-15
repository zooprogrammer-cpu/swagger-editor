import ShortUniqueId from 'short-unique-id';
import * as YAML from 'js-yaml';

/**
 * Action types.
 */

export const jsonRegExp =
  // eslint-disable-next-line no-control-regex
  /(?<true>^\s*true\s*$)|(?<false>^\s*false\s*$)|(?<null>^\s*null\s*$)|(?<number>^\s*\d+\s*$)|(?<object>^\s*{\s*)|(?<array>^\s*\[\s*)|(?<string>^\s*"(((?=\\)\\(["\\/bfnrt]|u[0-9a-fA-F]{4}))|[^"\\\x00-\x1F\x7F])*"\s*$)/;

export const EDITOR_PREVIEW_MUSTACHE_PUSH_CONTEXT_STARTED =
  'editor_preview_mustache_push_context_started';
export const EDITOR_PREVIEW_MUSTACHE_PUSH_CONTEXT_SUCCESS =
  'editor_preview_mustache_push_context_success';
export const EDITOR_PREVIEW_MUSTACHE_PUSH_CONTEXT_FAILURE =
  'editor_preview_mustache_push_context_failure';

/**
 * Action creators.
 */

export const pushContextStarted = ({ context, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_PUSH_CONTEXT_STARTED,
  payload: context,
  meta: {
    requestId,
  },
});

export const pushContextSuccess = ({ context, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_PUSH_CONTEXT_SUCCESS,
  payload: context,
  meta: { requestId },
});

export const pushContextFailure = ({ error, context, requestId }) => {
  const errorMessage = error.message || 'Unknown error occurred';

  return {
    type: EDITOR_PREVIEW_MUSTACHE_PUSH_CONTEXT_FAILURE,
    payload: error,
    error: true,
    meta: { errorMessage, context, requestId },
  };
};

/**
 * Async thunks.
 */
export const pushContext = ({ context }) => {
  const uid = new ShortUniqueId({ length: 10 });
  console.log('pushContext - context:', context?.length, uid);
  return async (system) => {
    const { editorPreviewMustacheActions, editorSelectors, fn } = system;
    const requestId = uid();

    editorPreviewMustacheActions.pushContextStarted({ context, requestId });

    if (typeof editorSelectors?.selectEditor === 'undefined') {
      console.error('pushContext - No editor plugin available');
      return editorPreviewMustacheActions.pushContextFailure({
        error: new Error('No editor plugin available'),
        context,
        requestId,
      });
    }

    if (typeof fn.getApiDOMWorker === 'undefined') {
      console.error('pushContext - ApiDOM worker not available');
      return editorPreviewMustacheActions.pushContextFailure({
        error: new Error('ApiDOM worker not available'),
        context,
        requestId,
      });
    }

    try {
      const editor = await editorSelectors.selectEditor();
      const worker = await fn.getApiDOMWorker()(editor.getModel().uri);
      let jsonContext = {};
      if (!jsonRegExp.test(context)) {
        // assume yaml
        jsonContext = YAML.load(context);
      } else {
        jsonContext = JSON.parse(context);
      }
      const pushedContext = await worker.refreshContext('editor://context', jsonContext);
      console.log('pushContext - pushedContext:', requestId);
      return editorPreviewMustacheActions.pushContextSuccess({
        context: pushedContext,
        requestId,
      });
    } catch (error) {
      console.error('Error pushing context', error, requestId);
      return editorPreviewMustacheActions.pushContextFailure({
        error,
        context,
        requestId,
      });
    }
  };
};
