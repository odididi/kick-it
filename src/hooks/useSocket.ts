import React from 'react';
import useWebSocket from 'react-use-websocket';
import {AuthContext} from 'services/auth';
import {logoutUser} from 'services/api';

const useSocket = () => {
  const {username} = React.useContext(AuthContext);
  const {setUsername} = React.useContext(AuthContext)
  const pingMessage = {
    command: 3,
    channel: 'general',
    content: 'ping',
    user: username
  }
  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(`wss://${process.env.REACT_APP_API_URL}/chat?username=${username}`, {
    onError: (error) => {
      // console.log(`FAILED. Socket error ${error.type}. Username: ${username}`)
      username && logoutUser(username)
      setUsername(null)
    },
    onClose: (msg) => {
      // console.log(`CLOSED. Socket closed. Message: ${msg.reason}. Code: ${msg.code}. Username: ${username}`)
      username && logoutUser(username)
      setUsername(null)
    }
  });

  React.useEffect(() => {
    const keepAlive = setInterval(() => sendJsonMessage(pingMessage), 50000);
    return () => clearInterval(keepAlive);
  }, []);

  return {
    sendJsonMessage,
    lastJsonMessage,
    connectionStatus: readyState
  };
}

export default useSocket;
