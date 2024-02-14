import React, { useState, useImperativeHandle, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

const ImportContextMenuItemHandler = forwardRef(
  ({ getComponent, editorPreviewMustacheActions }, ref) => {
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const alertDialogMessage = useRef('');
    const [url, setUrl] = useState('');
    const ConfirmDialog = getComponent('ConfirmDialog', true);
    const AlertDialog = getComponent('AlertDialog', true);

    const handleConfirmDialogClose = async (result) => {
      if (result) {
        const fsa = await editorPreviewMustacheActions.pullContext({ url });

        if (fsa.error) {
          alertDialogMessage.current = fsa.meta.errorMessage;
          setIsConfirmDialogOpen(false);
          setIsAlertDialogOpen(true);
        } else {
          setUrl('');
          alertDialogMessage.current = '';
          setIsConfirmDialogOpen(false);
        }
      } else {
        alertDialogMessage.current = '';
        setIsConfirmDialogOpen(false);
      }
    };

    const handleAlertDialogClose = () => {
      setIsAlertDialogOpen(false);
    };

    const handleUrlFieldChange = (event) => {
      setUrl(event.target.value);
    };

    useImperativeHandle(ref, () => ({
      openModal() {
        setIsConfirmDialogOpen(true);
      },
    }));

    return (
      <>
        <AlertDialog
          isOpen={isAlertDialogOpen}
          title="Uh oh, an error has occurred"
          onClose={handleAlertDialogClose}
        >
          {alertDialogMessage.current}
        </AlertDialog>
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          title="Import Context"
          onClose={handleConfirmDialogClose}
        >
          <div className="input-group">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="input-import-url" aria-labelledby="input-import-url">
              Enter the URL to import from
            </label>
            <input
              id="input-import-context"
              type="text"
              className="form-control"
              placeholder="type url here"
              value={url}
              onChange={handleUrlFieldChange}
            />
          </div>
        </ConfirmDialog>
      </>
    );
  }
);

ImportContextMenuItemHandler.propTypes = {
  getComponent: PropTypes.func.isRequired,
  editorPreviewMustacheActions: PropTypes.shape({
    pullContext: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImportContextMenuItemHandler;
