import React, { useRef, useMemo } from 'react';

import FileMenuContext from '../../components/FileMenu/FileMenuContext.js';
import ImportContextMenuItemHandler from '../../components/FileMenu/items/ImportContextMenuItemHandler.jsx';

const FileMenuWrapper = (Original, system) => {
  const FileMenu = (props) => {
    const importContextMenuItemHandler = useRef(null);
    const providerValue = useMemo(
      () => ({ importContextMenuItemHandler }),
      [importContextMenuItemHandler]
    );

    return (
      <FileMenuContext.Provider value={providerValue}>
        <ImportContextMenuItemHandler
          getComponent={system.getComponent}
          ref={importContextMenuItemHandler}
          editorPreviewMustacheActions={system.editorPreviewMustacheActions}
        />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Original {...props} />
      </FileMenuContext.Provider>
    );
  };

  return FileMenu;
};

export default FileMenuWrapper;
