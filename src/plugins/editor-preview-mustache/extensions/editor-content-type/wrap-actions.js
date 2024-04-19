import ShortUniqueId from 'short-unique-id';

import createSafeActionWrapper from '../../../../utils/create-safe-action-wrapper.js';

export const detectContentType = (oriAction, system) => {
  const uid = new ShortUniqueId({ length: 10 });

  return (payload) => {
    const { editorActions } = system;
    const requestId = uid();

    editorActions.detectContentTypeStarted({ content: payload, requestId });
    editorActions.detectContentTypeSuccess({
      content: payload,
      requestId,
      contentType: 'application/vnd.aai.handlebars;version=1.0',
    });
  };
};

export const detectContentTypeSuccess = createSafeActionWrapper(
  (oriAction, system) =>
    async ({ content }) => {
      const { editorSelectors, editorPreviewMustacheActions } = system;

      if (editorSelectors.selectIsContentTypeMustache()) {
        const contentType = editorSelectors.selectContentType();
        const parserOptions = {};
        const context = system.editorPreviewMustacheSelectors.selectContext();

        await editorPreviewMustacheActions.parse({ content, contentType, parserOptions });
        await system.editorPreviewMustacheActions.renderTemplate({ template: content, context });
      }
    }
);
