import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light';
import handlebars from 'react-syntax-highlighter/dist/esm/languages/hljs/handlebars.js';
import agate from 'react-syntax-highlighter/dist/esm/styles/hljs/agate';

SyntaxHighlighter.registerLanguage('handlebars', handlebars);

const Template = ({ editorPreviewMustacheSelectors }) => {
  const parseSource = editorPreviewMustacheSelectors.selectParseSource();

  return (
    <SyntaxHighlighter className="mustache-template" language="handlebars" style={agate}>
      {parseSource}
    </SyntaxHighlighter>
  );
};

Template.propTypes = {
  editorPreviewMustacheSelectors: PropTypes.shape({
    selectParseSource: PropTypes.func.isRequired,
  }).isRequired,
};

export default Template;
