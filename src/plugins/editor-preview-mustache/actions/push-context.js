import ShortUniqueId from 'short-unique-id';

/**
 * Action types.
 */

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

  return async (system) => {
    const { editorPreviewMustacheActions, editorSelectors, fn } = system;
    const requestId = uid();

    editorPreviewMustacheActions.pushContextStarted({ context, requestId });

    if (typeof editorSelectors?.selectEditor === 'undefined') {
      return editorPreviewMustacheActions.pushContextFailure({
        error: new Error('No editor plugin available'),
        context,
        requestId,
      });
    }

    if (typeof fn.getApiDOMWorker === 'undefined') {
      return editorPreviewMustacheActions.pushContextFailure({
        error: new Error('ApiDOM worker not available'),
        context,
        requestId,
      });
    }

    try {
      const editor = await editorSelectors.selectEditor();
      const worker = await fn.getApiDOMWorker()(editor.getModel().uri);
      const parsedContext = fn.parseMustacheContext(context);
      const pushedContext = await worker.refreshContext('editor://context', parsedContext);
      return editorPreviewMustacheActions.pushContextSuccess({
        context: pushedContext,
        requestId,
      });
    } catch (error) {
      return editorPreviewMustacheActions.pushContextFailure({
        error,
        context,
        requestId,
      });
    }
  };
};
