import React from 'react';
import logo from './logo.svg';
import './App.css';
import {WebSocketContext} from './socketContext';
import useSocket from './useSocket';

function App() {
  const {client, messages} = useSocket();
  const {activeUsername, setActiveUsername} = React.useContext(WebSocketContext);
  const [username, setUsername] = React.useState(activeUsername);
  const [message, setMessage] = React.useState('');
  const onUsernameChange = () => setActiveUsername(username);
  const onSend = () => {
    setMessage('');
    client.send(JSON.stringify({
      command: 2,
      channel: 'general',
      content: message
    }))
  }
  return (
    <div className="App">
      <div style={{width: 200, display: 'flex', margin: '140px 0'}}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={onUsernameChange}>
          username
        </button>
      </div>
      <div style={{width: 200, display: 'flex', margin: '140px 0'}}>
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

export default App;
