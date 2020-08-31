import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {getUserChannels} from '../api';

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'addMessages':
      return {
        ...state,
        [action.payload.channel]: [
          ...(state[action.payload.channel] ? [state[action.payload.channel]] : []),
          ...action.payload.messages
        ]
      };
    case 'newMessage':
      return {
        ...state,
        [action.payload.channel]: [
          ...(state[action.payload.channel]
            ? [...state[action.payload.channel], action.payload.message]
            : [action.payload.message]
          ),
        ]
      };
    default:
      throw new Error();
  }
}

const useSocket = () => {
  const client = React.useRef(null);
  const [userChannels, setUserChannels] = React.useState([]);
  const activeUsername = localStorage.getItem('kickit_username');
  const [messages, dispatch] = React.useReducer(messageReducer, {});
  React.useEffect(() => {
    console.log('rerender');
    if (client.current) {return};
    client.current = new W3CWebSocket(`ws://${process.env.REACT_APP_API_URL}/chat?username=${activeUsername}`)
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.current.onmessage = (message) => {
      const _msg = JSON.parse(message.data);
      if (_msg.err) return;
      dispatch({
        type: 'newMessage',
        payload: {
          channel: _msg.channel,
          message: _msg
        }
      })
    };
    // return () => {
    //   console.log('unmounting');
    //   client.current.close()
    // }
  }, [activeUsername, messages]);

  const fetchUserChannels = React.useCallback(() => {
    getUserChannels(activeUsername).then(res => setUserChannels(res.data))
  }, [activeUsername])
  console.log(messages);
  React.useEffect(() => {
    getUserChannels(activeUsername).then(res => setUserChannels(res.data))
  }, [activeUsername,  fetchUserChannels])
  
  // console.log('cosket', messages);
  return {
    client: client.current,
    userChannels,
    fetchUserChannels,
    activeUsername,
    messages,
    dispatch
  };
}

export default useSocket;
