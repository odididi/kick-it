import React from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import {palette} from '../theme';
import {getChannelOldMessages} from '../api';
import {Avatar} from '@material-ui/core';
import {SocketContext} from '../services/socket';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${p => p.hasSelected ? '0%' : '100%'});
  transition: transform 0.2s linear;
  width: ${window.innerWidth}px;
  height: 100%;
  background: #333;
`;

const HeaderContainer = styled.div`
  background: ${palette.yellow};
  display: flex;
  align-items: center;
  padding: 2px;
`;

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${palette.black};
  padding: 12px 16px 0;
  max-height: ${window.innerHeight - 60 - 52}px;
  overflow-y: auto;
`;

const TypeBoxContainer = styled.div`
  height: 60px;
  background: #333;
  margin-top: auto;
  border-top: 1px solid yellow;
  padding: 8px 8px 0;
`;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const Sender = styled(({...rest}) => (
  <Typography
    classes={{
      root: 'root',
    }}
    {...rest}
  />
))`
  &.root {
    font-weight: bold;
  }
`;

const ChatBox = ({messages = []}) => {
  const chatBoxRef = React.useRef();
  const groupedMessages = messages.reduce((acc, value) => {
    // compare the current value with the last item in the collected array
    if (acc.length && acc[acc.length - 1][0].user === value.user) {
      // append the current value to it if it is matching
      acc[acc.length - 1].push(value);
    } else {
      // append the new value at the end of the collected array
      acc.push([value]);
    }
    return acc;
  }, []);
  React.useEffect(() => {
    if (!chatBoxRef) return;
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages])
  return (
    <ChatBoxContainer ref={chatBoxRef}>
      {groupedMessages.map(msgGroup => {
        const {user} = msgGroup[0];
        return (
          <MessageContainer key={msgGroup[0].content}>
            <Avatar style={{background: '#888'}}>
              {user.substring(0,2)}
            </Avatar>
            <div style={{marginLeft: 16}}>
              <Sender>
                {user}
              </Sender>
              {msgGroup.map(msg => 
                <Typography variant="subtitle2" style={{marginBottom: 8}} key={msg.content}>
                  {msg.content}
                </Typography>
              )}
            </div>
          </MessageContainer>
      )})}
    </ChatBoxContainer>
  )
};

const TypeBox = ({channel, onSend}) => {
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

const Channel = ({name, onBack}) => {
  const {lastMessage} = React.useContext(SocketContext);
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    if (!name) return;
    getChannelOldMessages({channelName: name})
      .then(res => setMessages(res.data))
  }, [name])
  React.useEffect(() => {
    if (!lastMessage || JSON.parse(lastMessage.data).channel !== 'name') return;
    setMessages(msgs => [
      ...msgs,
      JSON.parse(lastMessage.data)
    ])
  }, [lastMessage])
  return (
    <ChannelContainer hasSelected={Boolean(name)}>
      <HeaderContainer style={{height: 48}}>
          <ArrowBackIcon
            onClick={onBack}
            style={{
              margin: '0 16px 0 8px',
              width: 24,
              height: 24,
              cursor: 'pointer',
            }}
          />
          <Typography
            variant="h6"
            color="secondary"
          >
            # {name}
          </Typography>
        </HeaderContainer>
        <ChatBox messages={messages.filter(msg => msg.channel === name)} />
        <TypeBox
          channel={name}
        />
    </ChannelContainer>
  )
}

export default Channel;
