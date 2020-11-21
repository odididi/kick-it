/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import styled from 'styled-components';
import {Avatar, Typography} from '@material-ui/core';
import {groupConsecutiveByProp} from 'utils';
import {ServerChatMessage} from 'kickit';
import config from 'kickit-config.js';
import {AuthContext} from 'services/auth';
import Linkify from 'react-linkify';

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 12px 0;
  max-height: ${window.innerHeight - 140 - 32 - 53}px;
  & > div:last-child {
    margin-bottom: 0;
  }
  overflow-y: auto;
  @media(min-width: 960px) {
    max-height: ${window.innerHeight - 180 - 72 - 53}px;
  }
  @media(min-width: 1440px) {
    max-height: ${window.innerHeight - 300 - 72 - 53}px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
  padding: 0 16px;
  flex-shrink: 0;
`;

const Sender = styled(({...rest}) => (
  <Typography
    classes={{
      root: 'root',
    }}
    {...rest}
  />
))`&.root { font-weight: bold; }`;

const BotMessageContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  background: #DECF17;
  margin-bottom: 12px;
  padding: 0;
  text-align: center;
`;

const BotMessage = styled.div`
  margin: 0 auto;
  text-align: center;
`;

interface ChatBoxProps {
  messages: ServerChatMessage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({messages = []}) => {
  const chatBoxRef = React.useRef(document.createElement('div'));
  const [initialize, setInitialize] = React.useState(true);
  const {username} = React.useContext(AuthContext);
  const groupedMessages = groupConsecutiveByProp(messages, "user");
  const recentMinuteTimestamp = React.useMemo(() => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage?.timestamp;
  }, [messages])

  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const secondToLastMessage = messages[messages.length - 2];
    const previousUser = secondToLastMessage && secondToLastMessage.user;
    
    // all the heights of chatBoxRef are calculated without taking into account the height of the last message,
    // so we need to add it manually
    // there is a different height when the lastMessage.user is different from before 
    const lastMessageHeight = lastMessage && (lastMessage.user === config.BOT_NAME || lastMessage.user === previousUser) ? 10 : 43;
    
    // when scrollHeight equals sum: the chat is scrolled to the bottom
    const sum = chatBoxRef.current.scrollTop + chatBoxRef.current.clientHeight + chatBoxRef.current.offsetTop + lastMessageHeight;
    const scrollHeight = chatBoxRef.current.scrollHeight;

    // the chat needs to scroll down for every new message when:
    // 1. initialized
    // 2. the chat is scrolled to the bottom
    // 3. the user himself sends a message
    if (initialize || scrollHeight-sum === 0 || (lastMessage && (lastMessage.user === username)) ){
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      setInitialize(false);
    }
  }, [recentMinuteTimestamp])
  
  return (
    <ChatBoxContainer ref={chatBoxRef}>
      {groupedMessages.map(msgGroup => {
        const {user, user_color} = msgGroup[0];
        return user === config.BOT_NAME
          ?<BotMessageContainer key={msgGroup[0].timestamp}>
            <BotMessage>
              {msgGroup.map(msg =>
                <Typography variant="body2" style={{marginBottom: 8, marginTop: 8}} key={msg.timestamp}>
                  <Linkify>{msg.content}</Linkify>
                </Typography>
              )}
            </BotMessage>
          </BotMessageContainer>
          
          :<MessageContainer key={msgGroup[0].timestamp}>
            <Avatar style={{background: user_color}}>
              {user.substring(0, 2)}
            </Avatar>
            <div style={{marginLeft: 16}}>
              <Sender variant="body1">
                {user}
              </Sender>
              {msgGroup.map(msg =>
                <Typography variant="body2" style={{marginBottom: 8}} key={msg.timestamp}>
                  <Linkify>{msg.content}</Linkify>
                </Typography>
              )}
            </div>
          </MessageContainer>
      })}
    </ChatBoxContainer>
  )
};

export default ChatBox;
