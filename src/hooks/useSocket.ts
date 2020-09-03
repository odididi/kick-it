import React from 'react';
import useWebSocket from 'react-use-websocket';
import {AuthContext} from '../services/auth';

const useSocket = () => {
  const {username} = React.useContext(AuthContext);
  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(
    `ws://${process.env.REACT_APP_API_URL}/chat?username=${username}`,
    {share: true}
  );

  React.useEffect(() => () => getWebSocket().close(), [getWebSocket])
  
  return {
    sendJsonMessage,
    lastJsonMessage,
    connectionStatus: readyState
  };
}

export default useSocket;
