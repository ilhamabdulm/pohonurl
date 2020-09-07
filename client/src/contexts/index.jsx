import React, { createContext, useState } from 'react';

export const AppContext = createContext({});

export default function MainContext({ children }) {
  const [userDetails, setUserDetails] = useState({});
  const [linkList, setLinkList] = useState([]);
  const values = { userDetails, setUserDetails, linkList, setLinkList };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
