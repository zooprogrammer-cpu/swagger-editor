import PropTypes from 'prop-types';

const ParseError = ({ error }) => {
  return (
    <div className="swagger-editor__editor-preview-mustache-parse-errors">
      <div className="swagger-ui">
        <div className="version-pragma">
          <div className="version-pragma__message version-pragma__message--missing">
            <div>
              <h3>Invalid Mustache template.</h3>
              <p>Please fix the error: {error.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ParseError.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }).isRequired,
};

export default ParseError;
