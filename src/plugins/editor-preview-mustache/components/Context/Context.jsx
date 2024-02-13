import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EditIcon from './EditIcon.jsx';

const Context = ({ context, getComponent, editorPreviewMustacheActions }) => {
  const [isEditing, setIsEditing] = useState(false);

  const HighlightCode = getComponent('highlightCode');

  const handleEditModeOn = useCallback(() => {
    setIsEditing(true);
  }, []);
  const handleContextChange = useCallback(
    (event) => {
      editorPreviewMustacheActions.setContext({ context: event.target.value });
    },
    [editorPreviewMustacheActions]
  );

  return (
    <article className={classNames('mustache-context', { 'mustache-context--editing': isEditing })}>
      {isEditing && (
        <textarea
          className="mustache-context__textarea"
          value={context}
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
