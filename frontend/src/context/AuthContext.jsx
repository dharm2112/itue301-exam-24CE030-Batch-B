import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(null);

  const login = (customerData, tokenData) => {
    setCustomer(customerData);
    setToken(tokenData);
  };

  const logout = () => {
    setCustomer(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ customer, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
