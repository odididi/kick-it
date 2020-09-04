import React from 'react';
import styled from 'styled-components';
import {useUser, useSocket} from 'hooks';
import {Input} from 'components/atoms';
import SendIcon from '@material-ui/icons/Send';
import {palette} from 'styles/theme';

const TypeBoxContainer = styled.div`
  height: 60px;
  background: #333;
  margin-top: auto;
  border-top: 1px solid yellow;
  padding: 4px;
  display: flex;
  align-items: center;
`;

interface TypeBoxProps {
  channel?: string;
}

const TypeBox: React.FC<TypeBoxProps> = ({channel}) => {
  const {sendJsonMessage} = useSocket();
  const {username} = useUser();
  const [message, setMessage] = React.useState('');
  const send = () => {
    const msg = {
      command: 2,
      channel,
      content: message,
      user: username
    }
    setMessage('');
    sendJsonMessage(msg)
  }
  return (
    <TypeBoxContainer
      onKeyPress={e =>
        e.key === "Enter" &&
        message.length > 0 &&
        send()
      }
    >
      <Input
        noBorder
        style={{flex: 1}}
        placeholder={`Message #${channel}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendIcon
        onClick={() => message.length > 0 && send()}
        style={{
          margin: '0 16px',
          fill: message.length > 0 ? palette.yellow : 'rgba(255, 237, 0, 0.25)',
          cursor: message.length > 0 ? 'pointer' : 'auto'
        }}
      />
    </TypeBoxContainer>
  )
};

export default TypeBox;
