import React from 'react';
import PropTypes from 'prop-types';

const CompiledTemplateMarkdown = ({ getComponent, editorPreviewMustacheSelectors }) => {
  const compiledTemplate = editorPreviewMustacheSelectors.selectCompiledTemplate();

  const Markdown = getComponent('Markdown', true);

  return (
    <article className="mustache-compiled-template mustache-compiled-template--markdown">
      <Markdown source={compiledTemplate} />
    </article>
  );
};

CompiledTemplateMarkdown.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorPreviewMustacheSelectors: PropTypes.shape({
    selectCompiledTemplate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CompiledTemplateMarkdown;
