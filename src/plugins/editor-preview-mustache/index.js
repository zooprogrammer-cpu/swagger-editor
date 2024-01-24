import { previewUnmounted, parse, parseStarted, parseSuccess, parseFailure } from './actions.js';
import { detectContentTypeSuccess as detectContentTypeSuccessWrap } from './wrap-actions.js';
import {
  selectParseStatus,
  selectIsParseInProgress,
  selectIsParseFailure,
  selectIsParseSuccess,
  selectParseResult,
  selectParseError,
} from './selectors.js';
import reducers from './reducers.js';
import EditorPreviewMustache from './components/EditorPreviewMustache.jsx';
import ParseErrors from './components/ParseErrors.jsx';
import EditorPreviewWrapper from './wrap-components/EditorPreviewWrapper.jsx';

const EditorPreviewMustachePlugin = () => {
  return {
    components: {
      EditorPreviewMustache,
      EditorPreviewMustacheParseErrors: ParseErrors,
    },
    wrapComponents: {
      EditorPreview: EditorPreviewWrapper,
    },
    statePlugins: {
      editor: {
        wrapActions: {
          detectContentTypeSuccess: detectContentTypeSuccessWrap,
        },
      },
      editorPreviewMustache: {
        actions: {
          previewUnmounted,

          parse,
          parseStarted,
          parseSuccess,
          parseFailure,
        },
        selectors: {
          selectParseStatus,
          selectIsParseInProgress,
          selectIsParseSuccess,
          selectIsParseFailure,
          selectParseResult,
          selectParseError,
        },
        reducers,
      },
    },
  };
};

export default EditorPreviewMustachePlugin;
