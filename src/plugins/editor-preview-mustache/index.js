import { setContext, previewMounted, previewUnmounted } from './actions/index.js';
import { parse, parseStarted, parseSuccess, parseFailure } from './actions/parse.js';
import {
  pullContext,
  pullContextStarted,
  pullContextSuccess,
  pullContextFailure,
} from './actions/pull-context.js';
import {
  pushContext,
  pushContextStarted,
  pushContextSuccess,
  pushContextFailure,
} from './actions/push-context.js';
import {
  renderTemplate,
  renderTemplateStarted,
  renderTemplateSuccess,
  renderTemplateFailure,
} from './actions/render-template.js';
import {
  detectContentTypeSuccess as detectContentTypeSuccessWrap,
  previewMounted as previewMountedWrap,
  pullContextSuccess as pullContextSuccessWrap,
  setContext as setContextWrap,
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
  selectRenderTemplateStatus,
  selectRenderTemplateResult,
  selectIsRenderTemplateInProgress,
  selectIsRenderTemplateSuccess,
  selectIsRenderTemplateFailure,
  selectRenderTemplateError,
} from './selectors.js';
import reducers from './reducers.js';
import EditorPreviewMustache from './components/EditorPreviewMustache/EditorPreviewMustache.jsx';
import ParseError from './components/ParseError.jsx';
import Template from './components/Template/Template.jsx';
import Context from './components/Context/Context.jsx';
import RenderTemplateError from './components/RenderedTemplate/RenderTemplateError.jsx';
import RenderedTemplateMarkdown from './components/RenderedTemplate/RenderedTemplateMarkdown.jsx';
import ImportContextMenuItem from './components/ImportContextMenuItem.jsx';
import EditorPreviewWrapper from './wrap-components/EditorPreviewWrapper.jsx';
import FileMenuWrapper from './wrap-components/FileMenuWrapper.jsx';
import TopBarFileMenuImportUrlMenuItemWrapper from './wrap-components/TopBarFileMenuImportUrlMenuItemWrapper.jsx';

const EditorPreviewMustachePlugin = () => {
  return {
    components: {
      EditorPreviewMustache,
      EditorPreviewMustacheParseError: ParseError,
      EditorPreviewMustacheTemplate: Template,
      EditorPreviewMustacheContext: Context,
      EditorPreviewMustacheRenderTemplateError: RenderTemplateError,
      EditorPreviewMustacheRenderedTemplateMarkdown: RenderedTemplateMarkdown,

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

          pullContext,
          pullContextStarted,
          pullContextSuccess,
          pullContextFailure,

          pushContext,
          pushContextStarted,
          pushContextSuccess,
          pushContextFailure,

          renderTemplate,
          renderTemplateStarted,
          renderTemplateSuccess,
          renderTemplateFailure,
        },
        wrapActions: {
          previewMounted: previewMountedWrap,
          pullContextSuccess: pullContextSuccessWrap,
          setContext: setContextWrap,
        },
        selectors: {
          selectParseSource,
          selectParseStatus,
          selectIsParseInProgress,
          selectIsParseSuccess,
          selectIsParseFailure,
          selectParseResult,
          selectParseError,

          selectRenderTemplateStatus,
          selectIsRenderTemplateInProgress,
          selectIsRenderTemplateSuccess,
          selectIsRenderTemplateFailure,
          selectRenderTemplateResult,
          selectRenderTemplateError,

          selectContext,
        },
        reducers,
      },
    },
  };
};

export default EditorPreviewMustachePlugin;
