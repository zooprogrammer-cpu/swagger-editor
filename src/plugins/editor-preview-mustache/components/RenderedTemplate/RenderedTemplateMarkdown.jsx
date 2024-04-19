import React from 'react';
import PropTypes from 'prop-types';

const RenderedTemplateMarkdown = ({ getComponent, editorPreviewMustacheSelectors }) => {
  const isRenderFailure = editorPreviewMustacheSelectors.selectIsRenderTemplateFailure();
  const renderedTemplate = editorPreviewMustacheSelectors.selectRenderTemplateResult();
  const renderTemplateError = editorPreviewMustacheSelectors.selectRenderTemplateError();

  const Markdown = getComponent('Markdown', true);
  const RenderTemplateError = getComponent('EditorPreviewMustacheRenderTemplateError');

  return (
    <article className="mustache-rendered-template mustache-rendered-template--markdown">
      {!isRenderFailure && <Markdown source={renderedTemplate} />}
      {isRenderFailure && <RenderTemplateError error={renderTemplateError} />}
    </article>
  );
};

RenderedTemplateMarkdown.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorPreviewMustacheSelectors: PropTypes.shape({
    selectIsRenderTemplateFailure: PropTypes.func.isRequired,
    selectRenderTemplateResult: PropTypes.func.isRequired,
    selectRenderTemplateError: PropTypes.func.isRequired,
  }).isRequired,
};

export default RenderedTemplateMarkdown;
