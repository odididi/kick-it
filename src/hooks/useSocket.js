import React from 'react';
import useWebSocket from 'react-use-websocket';
import {getUserChannels} from '../services/api';
import {AuthContext} from '../services/auth';

const useSocket = () => {
  const client = React.useRef(null);
  const [userChannels, setUserChannels] = React.useState([]);
  const {username} = React.useContext(AuthContext);
  const {
    sendMessage,
    lastMessage,
    getWebSocket
  } = useWebSocket(`ws://${process.env.REACT_APP_API_URL}/chat?username=${username}`);

  React.useEffect(() => () => getWebSocket.close(), [getWebSocket])

  const fetchUserChannels = React.useCallback(() => {
    getUserChannels(username).then(res => setUserChannels(res.data))
  }, [username])
  React.useEffect(() => {
    getUserChannels(username).then(res => setUserChannels(res.data))
  }, [username, fetchUserChannels])

  return {
    client: client.current,
    sendMessage,
    lastMessage,
    userChannels,
    fetchUserChannels,
    activeUsername: username
  };
}

export default useSocket;
