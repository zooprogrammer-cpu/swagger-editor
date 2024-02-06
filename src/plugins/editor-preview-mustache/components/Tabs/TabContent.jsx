import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TabContent = ({ label, active, className, children }) => {
  return (
    <div
      id={`${label}-content`}
      className={classNames('tabcontent', className, { active })}
      role="tabpanel"
      aria-labelledby={`${label}-content`}
    >
      {active && children}
    </div>
  );
};

TabContent.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

TabContent.defaultProps = {
  label: '',
  active: false,
  className: '',
  children: null,
};

TabContent.displayName = 'TabContent';

export default TabContent;
