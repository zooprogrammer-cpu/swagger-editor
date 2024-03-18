import createSafeActionWrapper from '../../utils/create-safe-action-wrapper.js';

export const previewMounted = createSafeActionWrapper((oriAction, system) => async () => {
  const { editorSelectors, fn } = system;

  await fn.waitUntil(() => !!editorSelectors.selectEditor());
  await system.editorPreviewMustacheActions.pullContext({ url: null });
});

export const pullContextSuccess = createSafeActionWrapper((oriAction, system) => (payload) => {
  let { context } = payload;
  if (typeof context !== 'string') {
    context = JSON.stringify(payload.context, null, 2);
  }
  system.editorPreviewMustacheActions.setContext({ context, origin: 'monaco-language-apidom' });
});

export const setContext = createSafeActionWrapper((oriAction, system) => async (payload) => {
  const template = await system.editorPreviewMustacheSelectors.selectParseSource();
  const { context, origin } = payload;

  if (origin === 'editor') {
    await system.editorPreviewMustacheActions.pushContext({ context });
  }

  await system.editorPreviewMustacheActions.renderTemplate({ template, context });
});
