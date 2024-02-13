import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import FileMenuContext from '../components/FileMenuContext.js';

const TopBarFileMenuImportUrlMenuItemWrapper = (Original) => {
  const ImportUrlMenuItem = ({ getComponent, onClick, children }) => {
    const importUrlContextMenuItemHandler = useContext(FileMenuContext);
    const ImportContextMenuItem = getComponent('TopBarFileMenuImportContextMenuItem', true);

    const handleOnClick = useCallback(
      (event) => {
        // eslint-disable-next-line react/destructuring-assignment
        importUrlContextMenuItemHandler.current.openModal(event);
      },
      [importUrlContextMenuItemHandler]
    );

    return (
      <>
        <Original getComponent={getComponent} onClick={onClick}>
          {children}
        </Original>
        <ImportContextMenuItem onClick={handleOnClick} />
      </>
    );
  };

  ImportUrlMenuItem.propTypes = {
    getComponent: PropTypes.func.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
  };

  ImportUrlMenuItem.defaultProps = {
    children: null,
  };

  return ImportUrlMenuItem;
};

export default TopBarFileMenuImportUrlMenuItemWrapper;
