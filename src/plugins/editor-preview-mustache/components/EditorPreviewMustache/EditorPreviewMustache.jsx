import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Tabs from '../Tabs/Tabs.jsx';
import Tab from '../Tabs/Tab.jsx';
import TabContent from '../Tabs/TabContent.jsx';

const Parsing = () => <div>Parsing...</div>;

const EditorPreviewMustache = ({
  getComponent,
  editorPreviewMustacheActions,
  editorPreviewMustacheSelectors,
}) => {
  const isParseInProgress = editorPreviewMustacheSelectors.selectIsParseInProgress();
  const isParseSuccess = editorPreviewMustacheSelectors.selectIsParseSuccess();
  const isParseFailure = editorPreviewMustacheSelectors.selectIsParseFailure();
  const parseError = editorPreviewMustacheSelectors.selectParseError();
  const context = editorPreviewMustacheSelectors.selectContext();

  const ParseError = getComponent('EditorPreviewMustacheParseError', true);
  const Template = getComponent('EditorPreviewMustacheTemplate', true);
  const Context = getComponent('EditorPreviewMustacheContext', true);
  const RenderedTemplate = getComponent('EditorPreviewMustacheRenderedTemplateMarkdown', true);

  useEffect(() => {
    editorPreviewMustacheActions.previewMounted();

    return () => {
      editorPreviewMustacheActions.previewUnmounted();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="swagger-editor__editor-preview-mustache">
      {isParseInProgress && <Parsing />}
      {isParseSuccess && (
        <Tabs>
          <Tab label="Template" />
          <Tab label="Context" />
          <Tab label="Compiled Template" />
          <TabContent>
            <Template />
          </TabContent>
          <TabContent>
            <Context context={context} />
          </TabContent>
          <TabContent>
            <RenderedTemplate />
          </TabContent>
        </Tabs>
      )}
      {isParseFailure && <ParseError error={parseError} />}
    </section>
  );
};

EditorPreviewMustache.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorPreviewMustacheActions: PropTypes.shape({
    previewMounted: PropTypes.func.isRequired,
    previewUnmounted: PropTypes.func.isRequired,
  }).isRequired,
  editorPreviewMustacheSelectors: PropTypes.shape({
    selectIsParseInProgress: PropTypes.func.isRequired,
    selectIsParseSuccess: PropTypes.func.isRequired,
    selectIsParseFailure: PropTypes.func.isRequired,
    selectParseResult: PropTypes.func.isRequired,
    selectParseError: PropTypes.func.isRequired,
    selectContext: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditorPreviewMustache;
