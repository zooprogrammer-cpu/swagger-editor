import createSafeActionWrapper from '../../../../utils/create-safe-action-wrapper.js';

// eslint-disable-next-line import/prefer-default-export
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
