import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EditIcon from './EditIcon.jsx';

const Context = ({ context, getComponent, editorPreviewMustacheActions }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContext, setEditedContext] = useState(context);
  const isEditingRef = useRef(isEditing);
  const editedContextRef = useRef(editedContext);

  const HighlightCode = getComponent('highlightCode');

  const handleEditModeOn = useCallback(() => {
    setIsEditing(true);
    isEditingRef.current = true;
  }, []);
  const handleContextChange = useCallback((event) => {
    setEditedContext(event.target.value);
    editedContextRef.current = event.target.value;
  }, []);

  useEffect(() => {
    return () => {
      if (isEditingRef.current) {
        editorPreviewMustacheActions.setContext({
          context: editedContextRef.current,
          origin: 'editor',
        });
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <article className={classNames('mustache-context', { 'mustache-context--editing': isEditing })}>
      {isEditing && (
        <textarea
          className="mustache-context__textarea"
          value={editedContext}
          onChange={handleContextChange}
        />
      )}

      {!isEditing && (
        <>
          <button type="button" className="mustache-context__edit-icon" onClick={handleEditModeOn}>
            <EditIcon />
          </button>
          <HighlightCode value={context} language="json" />
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
