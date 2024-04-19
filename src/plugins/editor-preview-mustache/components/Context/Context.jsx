import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Context = ({ context, getComponent, editorPreviewMustacheActions }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContext, setEditedContext] = useState(context);

  const HighlightCode = getComponent('highlightCode');

  const handleEditModeOn = useCallback(() => {
    setIsEditing(true);
  }, []);
  const handleContextChange = useCallback((event) => {
    setEditedContext(event.target.value);
  }, []);
  const handleSave = useCallback(() => {
    setIsEditing(false);
    editorPreviewMustacheActions.setContext({
      context: editedContext,
      origin: 'editor',
    });
  }, [editedContext, editorPreviewMustacheActions]);

  return (
    <article className={classNames('mustache-context', { 'mustache-context--editing': isEditing })}>
      {isEditing && (
        <>
          <button type="button" className="mustache-context__save" onClick={handleSave}>
            Save
          </button>
          <textarea
            className="mustache-context__textarea"
            value={editedContext}
            onChange={handleContextChange}
          />
        </>
      )}

      {!isEditing && (
        <>
          <button type="button" className="mustache-context__edit" onClick={handleEditModeOn}>
            Edit
          </button>
          <HighlightCode value={context} language="yaml" />
        </>
      )}
    </article>
  );
};

Context.propTypes = {
  context: PropTypes.string.isRequired,
  getComponent: PropTypes.func.isRequired,
  editorPreviewMustacheActions: PropTypes.shape({
    setContext: PropTypes.func.isRequired,
  }).isRequired,
};

export default Context;
