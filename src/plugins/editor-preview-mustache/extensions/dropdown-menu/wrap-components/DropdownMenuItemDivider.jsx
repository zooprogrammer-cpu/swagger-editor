import PropTypes from 'prop-types';

const DropdownMenuItemDividerWrapper = (Original) => {
  const DropdownMenuItemDivider = ({ className, ...props }) => {
    if (typeof className === 'string' && className.includes('divider--load-example')) {
      return null;
    }
    return <Original {...props} />; // eslint-disable-line react/jsx-props-no-spreading
  };

  DropdownMenuItemDivider.propTypes = {
    className: PropTypes.string,
  };
  DropdownMenuItemDivider.defaultProps = {
    className: null,
  };

  return DropdownMenuItemDivider;
};
export default DropdownMenuItemDividerWrapper;
