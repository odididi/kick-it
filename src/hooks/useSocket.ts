import React from 'react';
import useWebSocket from 'react-use-websocket';
import {AuthContext} from 'services/auth';

const useSocket = () => {
  const {username} = React.useContext(AuthContext);
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
    share: true,
    onError: (error) => {
      console.log('socket error' + error.type)
      getWebSocket().close()
    },
    onClose: (msg) => console.log('socket closed. Message: ' + msg.reason + ' Code: ' + msg.code )
  }
  );

  React.useEffect(() => () => getWebSocket().close(), [getWebSocket])
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
