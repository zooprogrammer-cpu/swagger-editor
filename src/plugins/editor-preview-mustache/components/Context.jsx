import React from 'react';
import PropTypes from 'prop-types';

const Context = ({ context, getComponent }) => {
  const HighlightCode = getComponent('highlightCode');

  return (
    <article className="mustache-context">
      <HighlightCode value={context} language="json" />
    </article>
  );
};

Context.propTypes = {
  context: PropTypes.string.isRequired,
  getComponent: PropTypes.func.isRequired,
};

export default Context;
