import React from 'react';
import styled from 'styled-components';
import {TypeBox, ChatBox} from 'components/organisms';
import {useResize} from 'hooks';
import {ChatContext} from 'services/chat';

// interface ChannelContainerProps {
//   hasSelected: boolean;
//   windowWidth: number;
// }

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 16px;
  background: white;
  border-radius: 8px;
  @media(min-width: 960px) {
    margin: 0;
    width: 77%;
  }
  @media(min-width: 1440px) {
    width: 70%;
  }
  box-shadow: 5px 5px rgba(222, 207, 23, 0.55);
`;

const Channel: React.FC = () => {
  const {channelMessages, selectedChannel} = React.useContext(ChatContext);
  return (
    <ChannelContainer>
      <ChatBox messages={channelMessages} />
      <TypeBox channel={selectedChannel}/>
    </ChannelContainer>
  )
}

export default Channel;
