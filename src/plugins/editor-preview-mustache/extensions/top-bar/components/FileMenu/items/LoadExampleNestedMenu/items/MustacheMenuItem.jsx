import PropTypes from 'prop-types';

const MustacheSystemsMenuItem = ({ getComponent, onClick, children }) => {
  const DropdownMenuItem = getComponent('DropdownMenuItem');

  return <DropdownMenuItem onClick={onClick}>{children}</DropdownMenuItem>;
};

MustacheSystemsMenuItem.propTypes = {
  getComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

MustacheSystemsMenuItem.defaultProps = {
  children: 'Mustache',
};

export default MustacheSystemsMenuItem;
