import React, { createContext, useState } from 'react';
export const NavTabSelectContext = createContext();

export const TabIdProvider = ({children}) => {
    const [tabId, setTabId] = useState(0);
  
    return (
      <NavTabSelectContext.Provider value={{ tabId, setTabId }}>
        {children}
      </NavTabSelectContext.Provider>
    );
  };

  export default TabIdProvider;
