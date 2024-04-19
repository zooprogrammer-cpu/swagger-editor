import classNames from 'classnames';
import PropTypes from 'prop-types';

const DropdownMenuItemDivider = ({ className }) => (
  <li className={classNames(className)} role="separator" />
);

DropdownMenuItemDivider.propTypes = {
  className: PropTypes.string,
};

DropdownMenuItemDivider.defaultProps = {
  className: null,
};

export default DropdownMenuItemDivider;
