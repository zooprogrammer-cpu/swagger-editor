import React from 'react';
import PropTypes from 'prop-types';

const Rendering = () => <div>Rendering...</div>;

const RenderedTemplateMarkdown = ({ getComponent, editorPreviewMustacheSelectors }) => {
  const isRenderInProgress = editorPreviewMustacheSelectors.selectIsRenderTemplateInProgress();
  const isRenderSuccess = editorPreviewMustacheSelectors.selectIsRenderTemplateSuccess();
  const isRenderFailure = editorPreviewMustacheSelectors.selectIsRenderTemplateFailure();
  const renderedTemplate = editorPreviewMustacheSelectors.selectRenderTemplateResult();
  const renderTemplateError = editorPreviewMustacheSelectors.selectRenderTemplateError();

  const Markdown = getComponent('Markdown', true);
  const RenderTemplateError = getComponent('EditorPreviewMustacheRenderTemplateError');

  return (
    <article className="mustache-rendered-template mustache-rendered-template--markdown">
      {isRenderInProgress && <Rendering />}
      {isRenderSuccess && <Markdown source={renderedTemplate} />}
      {isRenderFailure && <RenderTemplateError error={renderTemplateError} />}
    </article>
  );
};

RenderedTemplateMarkdown.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorPreviewMustacheSelectors: PropTypes.shape({
    selectIsRenderTemplateInProgress: PropTypes.func.isRequired,
    selectIsRenderTemplateSuccess: PropTypes.func.isRequired,
    selectIsRenderTemplateFailure: PropTypes.func.isRequired,
    selectRenderTemplateResult: PropTypes.func.isRequired,
    selectRenderTemplateError: PropTypes.func.isRequired,
  }).isRequired,
};

export default RenderedTemplateMarkdown;
