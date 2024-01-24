import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies */
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light';
import handlebars from 'react-syntax-highlighter/dist/esm/languages/hljs/handlebars';
import agate from 'react-syntax-highlighter/dist/esm/styles/hljs/agate';
/* eslint-enable */

SyntaxHighlighter.registerLanguage('handlebars', handlebars);

const Parsing = () => <div>Parsing...</div>;

const EditorPreviewMustache = ({
  getComponent,
  editorSelectors,
  editorPreviewMustacheActions,
  editorPreviewMustacheSelectors,
}) => {
  const ParseErrors = getComponent('EditorPreviewMustacheParseErrors', true);
  const isParseInProgress = editorPreviewMustacheSelectors.selectIsParseInProgress();
  const isParseSuccess = editorPreviewMustacheSelectors.selectIsParseSuccess();
  const isParseFailure = editorPreviewMustacheSelectors.selectIsParseFailure();
  const mustacheTemplate = editorSelectors.selectContent();
  const parseError = editorPreviewMustacheSelectors.selectParseError();

  useEffect(() => {
    return () => {
      editorPreviewMustacheActions.previewUnmounted();
    };
  }, [editorPreviewMustacheActions]);

  return (
    <section className="swagger-editor__editor-preview-mustache">
      {isParseInProgress && <Parsing />}

      {isParseSuccess && (
        <SyntaxHighlighter className="code-container" language="handlebards" style={agate}>
          {mustacheTemplate}
        </SyntaxHighlighter>
      )}

      {isParseFailure && <ParseErrors error={parseError} />}
    </section>
  );
};

EditorPreviewMustache.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorSelectors: PropTypes.shape({
    selectContent: PropTypes.func.isRequired,
  }).isRequired,
  editorPreviewMustacheActions: PropTypes.shape({
    previewUnmounted: PropTypes.func.isRequired,
  }).isRequired,
  editorPreviewMustacheSelectors: PropTypes.shape({
    selectIsParseInProgress: PropTypes.func.isRequired,
    selectIsParseSuccess: PropTypes.func.isRequired,
    selectIsParseFailure: PropTypes.func.isRequired,
    selectParseResult: PropTypes.func.isRequired,
    selectParseError: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditorPreviewMustache;
