import React from 'react';
import useSocket from '../hooks/useSocket';

export const SocketContext = React.createContext();

export const SocketContextProvider = ({children}) => {
  const {
    client,
    userChannels,
    fetchUserChannels,
    activeUsername,
    messages,
    dispatch
  } = useSocket();

  return (
    <SocketContext.Provider
      value={{
        client,
        userChannels,
        fetchUserChannels,
        activeUsername,
        messages,
        dispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};