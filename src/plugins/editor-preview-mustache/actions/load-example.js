import ShortUniqueId from 'short-unique-id';

/**
 * Action types.
 */

export const EDITOR_PREVIEW_MUSTACHE_LOAD_EXAMPLE_STARTED =
  'editor_preview_mustache_load_example_started';
export const EDITOR_PREVIEW_MUSTACHE_LOAD_EXAMPLE_SUCCESS =
  'editor_preview_mustache_load_example_success';
export const EDITOR_PREVIEW_MUSTACHE_LOAD_EXAMPLE_FAILURE =
  'editor_preview_mustache_load_example_failure';

/**
 * Action creators.
 */

export const loadExampleStarted = ({ example, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_LOAD_EXAMPLE_STARTED,
  payload: example,
  meta: {
    requestId,
  },
});

export const loadExampleSuccess = ({ example, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_LOAD_EXAMPLE_SUCCESS,
  payload: example,
  meta: { requestId },
});

export const loadExampleFailure = ({ error, example, requestId }) => {
  const errorMessage = error.message || 'Unknown error occurred';

  return {
    type: EDITOR_PREVIEW_MUSTACHE_LOAD_EXAMPLE_FAILURE,
    payload: error,
    error: true,
    meta: { errorMessage, example, requestId },
  };
};

/**
 * Async thunks.
 */
export const loadExample = ({ example: customExample } = {}) => {
  const uid = new ShortUniqueId({ length: 10 });

  return async (system) => {
    const { editorActions, editorPreviewMustacheActions, editorContentFixturesSelectors } = system;
    const requestId = uid();
    const example = customExample ?? editorContentFixturesSelectors.selectMustache();

    editorPreviewMustacheActions.loadExampleStarted({ example, requestId });

    try {
      editorActions.setContent(example, 'fixture-load');
      const fsa = await editorPreviewMustacheActions.pullContext({
        url: 'https://petstore3.swagger.io/api/v3/openapi.json',
      });

      if (fsa.error) {
        throw fsa.error;
      }

      return editorPreviewMustacheActions.loadExampleSuccess({
        example,
        requestId,
      });
    } catch (error) {
      return editorPreviewMustacheActions.loadExampleFailure({
        error,
        example,
        requestId,
      });
    }
  };
};
