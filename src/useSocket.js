import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {WebSocketContext} from './socketContext'

const useSocket = () => {
  const client = React.useRef(null);
  const [messages, setMessages] = React.useState([]);
  const {activeUsername} = React.useContext(WebSocketContext);
  React.useEffect(() => {
    client.current = new W3CWebSocket(`ws://127.0.0.1:8080/chat?username=${activeUsername}`)
    client.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.current.onmessage = (message) => {
      const _msg = JSON.parse(message.data);
      setMessages([...messages, _msg])
    };
    return () => client.current.close()
  }, [activeUsername, messages]);

  return {
    client: client.current,
    messages
  };
}

export default useSocket;
