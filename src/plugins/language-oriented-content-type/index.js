import { detectContentTypeSuccess as detectContentTypeSuccessWrap } from './wrap-actions.js';

const LanguageOrientedExamplePlugin = () => ({
  statePlugins: {
    editor: {
      wrapActions: {
        detectContentTypeSuccess: detectContentTypeSuccessWrap,
      },
    },
  },
});

export default LanguageOrientedExamplePlugin;
