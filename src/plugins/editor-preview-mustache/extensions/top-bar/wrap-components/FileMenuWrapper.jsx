import React, { useRef } from 'react';

import FileMenuContext from '../components/FileMenuContext.js';
import ImportContextMenuItemHandler from '../components/ImportContextMenuItemHandler.jsx';

const FileMenuWrapper = (Original, system) => {
  const FileMenu = (props) => {
    const importUrlContextMenuItemHandler = useRef(null);

    return (
      <FileMenuContext.Provider value={importUrlContextMenuItemHandler}>
        <ImportContextMenuItemHandler
          getComponent={system.getComponent}
          ref={importUrlContextMenuItemHandler}
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
