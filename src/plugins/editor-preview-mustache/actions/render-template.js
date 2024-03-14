import ShortUniqueId from 'short-unique-id';
import Mustache from 'mustache';

/**
 * Action types.
 */

export const EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_STARTED =
  'editor_preview_mustache_render_template_started';
export const EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_SUCCESS =
  'editor_preview_mustache_render_template_success';
export const EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_FAILURE =
  'editor_preview_mustache_render_template_failure';

/**
 * Action creators.
 */

export const renderTemplateStarted = ({ template, context, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_STARTED,
  payload: template,
  meta: {
    context,
    requestId,
  },
});

export const renderTemplateSuccess = ({ renderedTemplate, template, context, requestId }) => ({
  type: EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_SUCCESS,
  payload: renderedTemplate,
  meta: {
    template,
    context,
    requestId,
  },
});

export const renderTemplateFailure = ({ error, template, context, requestId }) => {
  const errorMessage = error.message || 'Unknown error occurred';

  return {
    type: EDITOR_PREVIEW_MUSTACHE_RENDER_TEMPLATE_FAILURE,
    payload: error,
    error: true,
    meta: {
      template,
      context,
      errorMessage,
      requestId,
    },
  };
};

/**
 * Async thunks.
 */
export const renderTemplate = ({ template, context }) => {
  const uid = new ShortUniqueId({ length: 10 });

  return async (system) => {
    const { editorPreviewMustacheActions, editorSelectors, fn } = system;
    const requestId = uid();

    editorPreviewMustacheActions.renderTemplateStarted({ template, context, requestId });

    try {
      let renderedTemplate = '';

      if (
        typeof editorSelectors?.selectEditor !== 'undefined' &&
        typeof fn.getApiDOMWorker !== 'undefined'
      ) {
        const editor = await editorSelectors.selectEditor();
        const worker = await fn.getApiDOMWorker()(editor.getModel().uri);
        renderedTemplate = await worker.renderTemplate(template);
      } else {
        console.warn('renderTemplate - rendering locally');
        renderedTemplate = Mustache.render(template, JSON.parse(context));
      }

      return editorPreviewMustacheActions.renderTemplateSuccess({
        renderedTemplate,
        template,
        context,
        requestId,
      });
    } catch (error) {
      console.error('Error rendering Mustache template', error, requestId);
      return editorPreviewMustacheActions.renderTemplateFailure({
        error,
        template,
        context,
        requestId,
      });
    }
  };
};
