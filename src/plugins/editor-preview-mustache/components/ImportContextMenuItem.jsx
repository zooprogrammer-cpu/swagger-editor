import PropTypes from 'prop-types';

const ImportContextMenuItem = ({ getComponent, onClick, children }) => {
  const DropdownMenuItem = getComponent('DropdownMenuItem');

  return <DropdownMenuItem onClick={onClick}>{children || 'Import Context'}</DropdownMenuItem>;
};

ImportContextMenuItem.propTypes = {
  getComponent: PropTypes.func.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

ImportContextMenuItem.defaultProps = {
  children: null,
};

export default ImportContextMenuItem;
