import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import FileMenuContext from '../../../components/FileMenu/FileMenuContext.js';

const ImportUrlMenuItemWrapper = (Original) => {
  const ImportUrlMenuItem = ({ getComponent, onClick, children }) => {
    const { importContextMenuItemHandler } = useContext(FileMenuContext);
    const ImportContextMenuItem = getComponent('TopBarFileMenuImportContextMenuItem', true);

    const handleOnClick = useCallback(
      (event) => {
        importContextMenuItemHandler.current.openModal(event);
      },
      [importContextMenuItemHandler]
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

export default ImportUrlMenuItemWrapper;
