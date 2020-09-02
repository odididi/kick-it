import React from 'react';
import styled from 'styled-components';
import {SocketContext} from '../../services/socket';

const TypeBoxContainer = styled.div`
  height: 60px;
  background: #333;
  margin-top: auto;
  border-top: 1px solid yellow;
  padding: 8px 8px 0;
`;

const TypeBox = ({channel}) => {
  const {activeUsername, sendMessage} = React.useContext(SocketContext);
  const [message, setMessage] = React.useState('');
  const send = () => {
    const msg = {
      command: 2,
      channel,
      content: message,
      user: activeUsername
    }
    setMessage('');
    sendMessage(JSON.stringify(msg))
  }
  return (
    <TypeBoxContainer>
      <div
        style={{width: 200, display: 'flex', margin: '0'}}
        onKeyPress={e =>
          e.key === "Enter" &&
          message.length > 0 &&
          send()}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={send}>
          Send
        </button>
      </div>
    </TypeBoxContainer>
  )
};

export default TypeBox;
