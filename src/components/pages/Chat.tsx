import React from 'react';
import styled from 'styled-components';
import {Page} from 'components/atoms';
import {Channel, ChannelList} from 'components/organisms';

const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Chat: React.FC = () => (
  <Page>
    <ChatContainer>
      <ChannelList/>
      <Channel />
    </ChatContainer>
  </Page>
);

export default Chat;

