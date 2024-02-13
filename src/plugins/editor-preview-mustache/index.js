import { setContext, previewMounted, previewUnmounted } from './actions/index.js';
import { parse, parseStarted, parseSuccess, parseFailure } from './actions/parse.js';
import {
  importContext,
  importContextStarted,
  importContextSuccess,
  importContextFailure,
} from './actions/import-context.js';
import {
  detectContentTypeSuccess as detectContentTypeSuccessWrap,
  previewMounted as previewMountedWrap,
  importContextSuccess as importContextSuccessWrap,
} from './wrap-actions.js';
import {
  selectParseSource,
  selectParseStatus,
  selectContext,
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
import Context from './components/Context/Context.jsx';
import CompiledTemplateMarkdown from './components/CompiledTemplate/CompiledTemplateMarkdown.jsx';
import ImportContextMenuItem from './components/ImportContextMenuItem.jsx';
import EditorPreviewWrapper from './wrap-components/EditorPreviewWrapper.jsx';
import FileMenuWrapper from './wrap-components/FileMenuWrapper.jsx';
import TopBarFileMenuImportUrlMenuItemWrapper from './wrap-components/TopBarFileMenuImportUrlMenuItemWrapper.jsx';

const EditorPreviewMustachePlugin = () => {
  return {
    components: {
      EditorPreviewMustache,
      EditorPreviewMustacheParseErrors: ParseErrors,
      EditorPreviewMustacheTemplate: Template,
      EditorPreviewMustacheContext: Context,
      EditorPreviewMustacheCompiledTemplateMarkdown: CompiledTemplateMarkdown,

      TopBarFileMenuImportContextMenuItem: ImportContextMenuItem,
    },
    wrapComponents: {
      EditorPreview: EditorPreviewWrapper,

      TopBarFileMenu: FileMenuWrapper,
      TopBarFileMenuImportUrlMenuItem: TopBarFileMenuImportUrlMenuItemWrapper,
    },
    statePlugins: {
      editor: {
        wrapActions: {
          detectContentTypeSuccess: detectContentTypeSuccessWrap,
        },
      },
      editorPreviewMustache: {
        actions: {
          previewMounted,
          previewUnmounted,
          setContext,

          parse,
          parseStarted,
          parseSuccess,
          parseFailure,

          importContext,
          importContextStarted,
          importContextSuccess,
          importContextFailure,
        },
        wrapActions: {
          previewMounted: previewMountedWrap,
          importContextSuccess: importContextSuccessWrap,
        },
        selectors: {
          selectParseSource,
          selectParseStatus,
          selectContext,
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
