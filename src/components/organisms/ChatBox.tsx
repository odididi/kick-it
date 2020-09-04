import React from 'react';
import styled from 'styled-components';
import {Avatar, Typography} from '@material-ui/core';
import {groupConsecutiveByProp} from 'utils';
import {ServerChatMessage} from 'kickit-websocket';

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #333;
  padding: 12px 16px 0;
  max-height: ${window.innerHeight - 60 - 52}px;
  overflow-y: auto;
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

interface ChatBoxProps {
  messages: ServerChatMessage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({messages = []}) => {
  const chatBoxRef = React.useRef(document.createElement('div'));
  const groupedMessages = groupConsecutiveByProp(messages, "user");
  React.useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages])
  return (
    <ChatBoxContainer ref={chatBoxRef}>
      {groupedMessages.map(msgGroup => {
        const {user} = msgGroup[0];
        return (
          <MessageContainer key={msgGroup[0].content}>
            <Avatar style={{background: '#888'}}>
              {user.substring(0, 2)}
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
        )
      })}
    </ChatBoxContainer>
  )
};

export default ChatBox;
