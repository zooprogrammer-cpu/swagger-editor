import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ children }) => {
  const tabs = React.Children.toArray(children).filter(
    (element) => element.type.displayName === 'Tab'
  );
  const tabContents = React.Children.toArray(children).filter(
    (element) => element.type.displayName === 'TabContent'
  );
  const [activeTab, setActiveTab] = useState(tabs[0].props.label);

  const handleTabClick = useCallback((event, tab) => {
    setActiveTab(tab.props.label);
  }, []);

  return (
    <div className="tabs" role="tablist">
      <ul className="tab-buttons">
        {tabs.map((element) => {
          return React.cloneElement(element, {
            active: activeTab === element.props.label,
            onClick: (event) => handleTabClick(event, element),
          });
        })}
      </ul>
      {tabContents.map((element, index) => {
        const tab = tabs[index];

        return React.cloneElement(element, {
          label: tab.props.label,
          active: tab.props.label === activeTab,
        });
      })}
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
};

Tabs.defaultProps = {
  children: null,
};

Tabs.displayName = 'Tabs';

export default Tabs;
