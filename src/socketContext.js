import React from 'react';
import axios from 'axios';

export const WebSocketContext = React.createContext({});

export const SocketProvider = ({children}) => {
  const [activeUsername, setActiveUsername] = React.useState(`Nikos_${Math.random().toFixed(4) * 10000}`)
  // const [users, setUsers] = React.useState([]);
  // React.useEffect(() => {
  //   axios.get('http://localhost:8080/users')
  //   .then(res => res.json)
  //   .then(console.log)
  // })
  return (
    <WebSocketContext.Provider value={{activeUsername, setActiveUsername}}>
      {children}
    </WebSocketContext.Provider>
  )
};
