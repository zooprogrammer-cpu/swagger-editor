import { setContext, previewMounted, previewUnmounted } from './actions/index.js';
import { parse, parseStarted, parseSuccess, parseFailure } from './actions/parse.js';
import { parseContext, stringifyContext } from './fn.js';
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
  previewMounted as previewMountedWrap,
  pullContextSuccess as pullContextSuccessWrap,
  setContext as setContextWrap,
} from './wrap-actions.js';
import {
  detectContentTypeSuccess as detectContentTypeSuccessWrap,
  detectContentType as detectContentTypeWrap,
} from './extensions/editor-content-type/wrap-actions.js';
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
import selectMustache from './extensions/editor-content-fixtures/selectors/selectMustache.js';
import reducers from './reducers.js';
import EditorPreviewMustache from './components/EditorPreviewMustache/EditorPreviewMustache.jsx';
import ParseError from './components/ParseError.jsx';
import Context from './components/Context/Context.jsx';
import RenderTemplateError from './components/RenderedTemplate/RenderTemplateError.jsx';
import RenderedTemplateMarkdown from './components/RenderedTemplate/RenderedTemplateMarkdown.jsx';
import ImportContextMenuItem from './extensions/top-bar/components/FileMenu/items/ImportContextMenuItem.jsx';
import MustacheMenuItem from './extensions/top-bar/components/FileMenu/items/LoadExampleNestedMenu/items/MustacheMenuItem.jsx';
import EditorPreviewWrapper from './extensions/editor-preview/wrap-components/EditorPreviewWrapper.jsx';
import FileMenuWrapper from './extensions/top-bar/wrap-components/FileMenu/FileMenuWrapper.jsx';
import ImportUrlMenuItemWrapper from './extensions/top-bar/wrap-components/FileMenu/items/ImportUrlMenuItemWrapper.jsx';
import APIDesignSystemsMenuItemWrapper from './extensions/top-bar/wrap-components/FileMenu/items/LoadExampleNestedMenu/items/APIDesignSystemsMenuItemWrapper.jsx';
import DropdownMenuItemDividerWrapper from './extensions/dropdown-menu/wrap-components/DropdownMenuItemDivider.jsx';

const stubNull = () => null;

const EditorPreviewMustachePlugin = () => {
  return {
    components: {
      EditorPreviewMustache,
      EditorPreviewMustacheParseError: ParseError,
      EditorPreviewMustacheContext: Context,
      EditorPreviewMustacheRenderTemplateError: RenderTemplateError,
      EditorPreviewMustacheRenderedTemplateMarkdown: RenderedTemplateMarkdown,

      TopBarFileMenuImportContextMenuItem: ImportContextMenuItem,
      TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem: MustacheMenuItem,
      TopBarFileMenuLoadExampleNestedMenuOpenAPI31PetstoreMenuItem: stubNull,
      TopBarFileMenuLoadExampleNestedMenuOpenAPI30PetstoreMenuItem: stubNull,
      TopBarFileMenuLoadExampleNestedMenuOpenAPI20PetstoreMenuItem: stubNull,
      TopBarFileMenuLoadExampleNestedMenuAsyncAPI30PetstoreMenuItem: stubNull,
      TopBarFileMenuLoadExampleNestedMenuAsyncAPI26PetstoreMenuItem: stubNull,
      TopBarFileMenuLoadExampleNestedMenuAsyncAPI26StreetlightsMenuItem: stubNull,
      TopBarFileMenuLoadExampleNestedMenuAsyncAPI30StreetlightsMenuItem: stubNull,
    },
    wrapComponents: {
      EditorPreview: EditorPreviewWrapper,

      DropdownMenuItemDivider: DropdownMenuItemDividerWrapper,

      TopBarFileMenu: FileMenuWrapper,
      TopBarFileMenuImportUrlMenuItem: ImportUrlMenuItemWrapper,
      TopBarFileMenuLoadExampleNestedMenuAPIDesignSystemsMenuItem: APIDesignSystemsMenuItemWrapper,
    },
    fn: {
      parseMustacheContext: parseContext,
      stringifyMustacheContext: stringifyContext,
    },
    statePlugins: {
      editor: {
        wrapActions: {
          detectContentType: detectContentTypeWrap,
          detectContentTypeSuccess: detectContentTypeSuccessWrap,
        },
      },
      editorContentFixtures: {
        selectors: {
          selectMustache,
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
