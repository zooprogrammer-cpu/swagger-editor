import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const APIDesignSystemsMenuItemWrapper = () => {
  const MustacheMenuItem = ({ getComponent, editorPreviewMustacheActions }) => {
    const TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem = getComponent(
      'TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem',
      true
    );

    const handleOnClick = useCallback(() => {
      editorPreviewMustacheActions.loadExample();
    }, [editorPreviewMustacheActions]);

    return <TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem onClick={handleOnClick} />;
  };

  MustacheMenuItem.propTypes = {
    getComponent: PropTypes.func.isRequired,
    editorPreviewMustacheActions: PropTypes.shape({
      loadExample: PropTypes.func.isRequired,
    }).isRequired,
    editorActions: PropTypes.shape({
      setContent: PropTypes.func.isRequired,
    }).isRequired,
  };

  return MustacheMenuItem;
};

export default APIDesignSystemsMenuItemWrapper;
