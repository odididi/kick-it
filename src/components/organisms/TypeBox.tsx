import React from 'react';
import styled from 'styled-components';
import {useUser} from 'hooks';
import {Input} from 'components/atoms';
import SendIcon from '@material-ui/icons/Send';
import {ChatContext} from 'services/chat';

const TypeBoxContainer = styled.div`
  margin-top: auto;
  border-top: 2px solid black;
  display: flex;
  align-items: center;
`;

interface TypeBoxProps {
  channel?: string;
}

const TypeBox: React.FC<TypeBoxProps> = ({channel}) => {
  const {sendJsonMessage} = React.useContext(ChatContext);
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
        noborder="true"
        style={{flex: 1}}
        placeholder={`Shoot it...`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        _color="black"
      />
      <SendIcon
        onClick={() => message.length > 0 && send()}
        style={{
          margin: '0 16px',
          fill: message.length > 0 ? 'black' : 'rgba(0, 0, 0, 0.25)',
          cursor: message.length > 0 ? 'pointer' : 'auto'
        }}
      />
    </TypeBoxContainer>
  )
};

export default TypeBox;
