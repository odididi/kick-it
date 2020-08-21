import React from 'react';
import axios from 'axios';

export const WebSocketContext = React.createContext({});

export const SocketProvider = ({children}) => {
  const [activeUsername, setActiveUsername] = React.useState('')
  // const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://localhost:8080/users')
    .then(res => console.log(res.data))
  })
  return (
    <WebSocketContext.Provider value={{activeUsername, setActiveUsername}}>
      {children}
    </WebSocketContext.Provider>
  )
};
