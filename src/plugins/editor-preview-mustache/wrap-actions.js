import createSafeActionWrapper from '../../utils/create-safe-action-wrapper.js';

// eslint-disable-next-line import/prefer-default-export
export const detectContentTypeSuccess = createSafeActionWrapper(
  (oriAction, system) =>
    ({ content }) => {
      const { editorSelectors, editorPreviewMustacheActions } = system;

      if (editorSelectors.selectIsContentTypeMustache()) {
        const contentType = editorSelectors.selectContentType();
        const parserOptions = {};

        editorPreviewMustacheActions.parse({ content, contentType, parserOptions });
      }
    }
);
