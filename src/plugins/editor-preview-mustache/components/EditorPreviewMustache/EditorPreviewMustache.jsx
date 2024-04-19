import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Tabs from '../Tabs/Tabs.jsx';
import Tab from '../Tabs/Tab.jsx';
import TabContent from '../Tabs/TabContent.jsx';

const EditorPreviewMustache = ({
  getComponent,
  editorPreviewMustacheActions,
  editorPreviewMustacheSelectors,
}) => {
  const context = editorPreviewMustacheSelectors.selectContext();

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
      <Tabs>
        <Tab label="Compiled Template" />
        <Tab label="Context" />
        <TabContent>
          <RenderedTemplate />
        </TabContent>
        <TabContent>
          <Context context={context} />
        </TabContent>
      </Tabs>
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
    selectContext: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditorPreviewMustache;
