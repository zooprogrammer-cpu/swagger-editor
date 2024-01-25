import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light';
import markdown from 'react-syntax-highlighter/dist/esm/languages/hljs/markdown';
import ReactMarkdown from 'react-markdown';
// import agate from 'react-syntax-highlighter/dist/esm/styles/hljs/agate';
import * as hb from 'handlebars';

import { context } from './context.js';
/* eslint-enable */

SyntaxHighlighter.registerLanguage('markdown', markdown);

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

  const axiosData = {
    lang: 'java',
    type: 'CLIENT',
    codegenVersion: 'V3',
    specURL: 'https://petstore3.swagger.io/api/v3/openapi.json',
  };
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  let rendered = mustacheTemplate;
  try {
    rendered = hb.compile(mustacheTemplate)(context);
  } catch (err) {
    console.log(err);
  }

  useEffect(() => {
    return async () => {
      editorPreviewMustacheActions.previewUnmounted();
      try {
        axios.post('http://localhost:8081/api/model', axiosData, axiosConfig).then((res) => {
          console.log(res);
          rendered = hb.compile(mustacheTemplate)(context);
          // isParseSuccess = true;
        });
      } catch (err) {
        console.log(err);
        // isParseFailure = true;
      }
    };
  }, [editorPreviewMustacheActions]);

  return (
    <section className="swagger-editor__editor-preview-mustache">
      {isParseInProgress && <Parsing />}

      {isParseSuccess && <ReactMarkdown>{rendered}</ReactMarkdown>}

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
