import createSafeActionWrapper from '../../utils/create-safe-action-wrapper.js';

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

export const previewMounted = createSafeActionWrapper((oriAction, system) => async (payload) => {
  oriAction(payload);

  const { editorSelectors, fn } = system;

  await fn.waitUntil(() => !!editorSelectors.selectEditor());
  await system.editorPreviewMustacheActions.importContext(null);
});

export const importContextSuccess = createSafeActionWrapper((oriAction, system) => (payload) => {
  oriAction(payload);

  const context = JSON.stringify(payload.context, null, 2);
  system.editorPreviewMustacheActions.setContext({ context });
});
