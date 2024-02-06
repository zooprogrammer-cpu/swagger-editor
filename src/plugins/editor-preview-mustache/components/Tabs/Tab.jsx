import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tab = ({ label, active, onClick }) => (
  <li className="tab" role="presentation">
    <button
      type="button"
      className={classNames('tablink', { active })}
      role="tab"
      aria-controls={`${label}-content`}
      aria-selected={active}
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  active: false,
  onClick: () => {},
};

Tab.displayName = 'Tab';

export default Tab;
