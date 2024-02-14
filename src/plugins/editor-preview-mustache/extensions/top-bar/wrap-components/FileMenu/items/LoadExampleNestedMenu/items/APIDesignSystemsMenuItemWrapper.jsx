import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const APIDesignSystemsMenuItemWrapper = (Original) => {
  const APIDesignSystemsMenuItem = ({
    getComponent,
    editorContentFixturesSelectors,
    editorActions,
    onClick,
    children,
  }) => {
    const DropdownMenuItemDivider = getComponent('DropdownMenuItemDivider');
    const MustacheMenuItem = getComponent(
      'TopBarFileMenuLoadExampleNestedMenuMustacheMenuItem',
      true
    );

    const handleOnClick = useCallback(() => {
      const content = editorContentFixturesSelectors.selectMustache();
      editorActions.setContent(content, 'fixture-load');
    }, [editorContentFixturesSelectors, editorActions]);

    return (
      <>
        <Original getComponent={getComponent} onClick={onClick}>
          {children}
        </Original>
        <DropdownMenuItemDivider />
        <MustacheMenuItem onClick={handleOnClick} />
      </>
    );
  };

  APIDesignSystemsMenuItem.propTypes = {
    getComponent: PropTypes.func.isRequired,
    editorActions: PropTypes.shape({
      setContent: PropTypes.func.isRequired,
    }).isRequired,
    editorContentFixturesSelectors: PropTypes.shape({
      selectMustache: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
  };

  APIDesignSystemsMenuItem.defaultProps = {
    children: null,
  };

  return APIDesignSystemsMenuItem;
};

export default APIDesignSystemsMenuItemWrapper;
