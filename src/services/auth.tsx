import React from 'react';

interface AuthContextType {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const initialContext = {
  username: '',
  setUsername: () => {}
}

export const AuthContext = React.createContext<AuthContextType>(initialContext);

export const AuthContextProvider: React.FC = ({children}) => {
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
