import React from 'react';
import '../App.css';
import useSocket from '../hooks/useSocket';
import {Redirect, useParams} from 'react-router';
import {SocketContext} from '../services/socket';

const Chat = () => {
  const {client, messages} = React.useContext(SocketContext);
  const params = useParams();
  console.log(params)
  const [message, setMessage] = React.useState('');
  const username = localStorage.getItem('kickit_username');
  const onSend = () => {
    setMessage('');
    client.send(JSON.stringify({
      command: 2,
      channel: 'general',
      content: message,
      user: username
    }))
  }
  return username.length === 0 ? <Redirect to="/" /> : (
    <div className="App">
      <div
        style={{width: 200, display: 'flex', margin: '140px 0'}}
        onKeyPress={e =>
          e.key === "Enter" &&
          message.length > 0 &&
          onSend()}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={onSend}>
          Send
        </button>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', width: 400}}>
        {messages.map(msg => (
          <div key={msg.content} style={{display: 'flex', flex: 1}}>
            <div style={{fontWeight: 'bold', width: 100, marginRight: '40px'}}>
              {msg.user}:
            </div>
            <div>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
