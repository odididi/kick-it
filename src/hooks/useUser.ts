import React from 'react';
import {AuthContext} from 'services/auth';
import {getUserChannels} from 'services/api';
import useSocket from './useSocket';
import {ReadyState} from 'react-use-websocket';

const useUser = () => {
  const [channels, setChannels] = React.useState<string[]>([]);
  const {connectionStatus} = useSocket();
  const {username} = React.useContext(AuthContext);
  React.useEffect(() => {
    if (!username || connectionStatus !== ReadyState.OPEN) return;
    getUserChannels(username).then(res => setChannels(res.data))
  }, [username, connectionStatus])
  return {
    username: username || '',
    channels,
    setChannels
  };
}

export default useUser;
