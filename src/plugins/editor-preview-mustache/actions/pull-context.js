import ShortUniqueId from 'short-unique-id';
import { sanitizeUrl } from '@braintree/sanitize-url';

/**
 * Action types.
 */

export const EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_STARTED =
  'editor_preview_mustache_pull_context_started';
export const EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_SUCCESS =
  'editor_preview_mustache_pull_context_success';
export const EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_FAILURE =
  'editor_preview_mustache_pull_context_failure';

/**
 * Action creators.
 */

export const pullContextStarted = ({ url, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_STARTED,
  payload: url,
  meta: {
    requestId,
  },
});

export const pullContextSuccess = ({ context, url, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_SUCCESS,
  payload: context,
  meta: { requestId, url },
});

export const pullContextFailure = ({ error, url, requestId }) => {
  const errorMessage = error.message || 'Unknown error occurred';

  return {
    type: EDITOR_PREVIEW_MUSTACHE_PULL_CONTEXT_FAILURE,
    payload: error,
    error: true,
    meta: { url, errorMessage, requestId },
  };
};

/**
 * Async thunks.
 */
export const pullContext = ({ url }) => {
  const uid = new ShortUniqueId({ length: 10 });

  return async (system) => {
    const { editorPreviewMustacheActions, editorSelectors, fn } = system;
    const requestId = uid();
    const sanitizedUrl = sanitizeUrl(url);

    editorPreviewMustacheActions.pullContextStarted({ url: sanitizedUrl, requestId });

    if (typeof editorSelectors?.selectEditor === 'undefined') {
      return editorPreviewMustacheActions.pullContextFailure({
        error: new Error('No editor plugin available'),
        url: sanitizedUrl,
        requestId,
      });
    }

    if (typeof fn.getApiDOMWorker === 'undefined') {
      return editorPreviewMustacheActions.pullContextFailure({
        error: new Error('ApiDOM worker not available'),
        url: sanitizedUrl,
        requestId,
      });
    }

    if (url !== null && sanitizedUrl === 'about:blank') {
      return editorPreviewMustacheActions.pullContextFailure({
        error: new Error('Invalid url provided'),
        url: sanitizedUrl,
        requestId,
      });
    }

    if (url !== null) {
      try {
        new URL(url); // eslint-disable-line no-new
      } catch (error) {
        return editorPreviewMustacheActions.pullContextFailure({
          error: new Error('Invalid url provided'),
          url: sanitizedUrl,
          requestId,
        });
      }
    }

    try {
      const editor = await editorSelectors.selectEditor();
      const worker = await fn.getApiDOMWorker()(editor.getModel().uri);
      const pulledContext = await worker.refreshContext(sanitizedUrl);

      return editorPreviewMustacheActions.pullContextSuccess({
        context: pulledContext,
        url: sanitizedUrl,
        requestId,
      });
    } catch (error) {
      return editorPreviewMustacheActions.pullContextFailure({
        error,
        url: sanitizedUrl,
        requestId,
      });
    }
  };
};
