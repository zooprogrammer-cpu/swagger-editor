import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const APIDesignSystemsMenuItemWrapper = () => {
  const MustacheMenuItem = ({ getComponent, editorContentFixturesSelectors, editorActions }) => {
    const TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem = getComponent(
      'TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem',
      true
    );

    const handleOnClick = useCallback(() => {
      const content = editorContentFixturesSelectors.selectMustache();
      editorActions.setContent(content, 'fixture-load');
    }, [editorContentFixturesSelectors, editorActions]);

    return <TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem onClick={handleOnClick} />;
  };

  MustacheMenuItem.propTypes = {
    getComponent: PropTypes.func.isRequired,
    editorActions: PropTypes.shape({
      setContent: PropTypes.func.isRequired,
    }).isRequired,
    editorContentFixturesSelectors: PropTypes.shape({
      selectMustache: PropTypes.func.isRequired,
    }).isRequired,
  };

  return MustacheMenuItem;
};

export default APIDesignSystemsMenuItemWrapper;
