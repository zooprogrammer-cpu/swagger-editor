import { previewUnmounted, parse, parseStarted, parseSuccess, parseFailure } from './actions.js';
import { detectContentTypeSuccess as detectContentTypeSuccessWrap } from './wrap-actions.js';
import {
  selectParseSource,
  selectParseStatus,
  selectIsParseInProgress,
  selectIsParseFailure,
  selectIsParseSuccess,
  selectParseResult,
  selectParseError,
  selectCompiledTemplate,
} from './selectors.js';
import reducers from './reducers.js';
import EditorPreviewMustache from './components/EditorPreviewMustache/EditorPreviewMustache.jsx';
import ParseErrors from './components/ParseErrors.jsx';
import Template from './components/Template/Template.jsx';
import Context from './components/Context.jsx';
import CompiledTemplateMarkdown from './components/CompiledTemplate/CompiledTemplateMarkdown.jsx';
import EditorPreviewWrapper from './wrap-components/EditorPreviewWrapper.jsx';

const EditorPreviewMustachePlugin = () => {
  return {
    components: {
      EditorPreviewMustache,
      EditorPreviewMustacheParseErrors: ParseErrors,
      EditorPreviewMustacheTemplate: Template,
      EditorPreviewMustacheContext: Context,
      EditorPreviewMustacheCompiledTemplateMarkdown: CompiledTemplateMarkdown,
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
          selectParseSource,
          selectParseStatus,
          selectIsParseInProgress,
          selectIsParseSuccess,
          selectIsParseFailure,
          selectParseResult,
          selectParseError,
          selectCompiledTemplate,
        },
        reducers,
      },
    },
  };
};

export default EditorPreviewMustachePlugin;
