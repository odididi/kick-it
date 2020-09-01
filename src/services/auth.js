import React from 'react';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
  const [username, setUsername] = React.useState(localStorage.getItem('kickit_username'));
  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};




