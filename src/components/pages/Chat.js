import React from 'react';
import styled from 'styled-components';
import Page from '../atoms/Page';
import {withRouter, useLocation} from 'react-router';
import Channel from '../organisms/Channel';
import ChannelList from '../organisms/ChannelList';

const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Chat = ({history}) => {
  const location = useLocation();
  const _selectedChannel = new URLSearchParams(location.search).get("channel");
  const [selectedChannel, setSelectedChannel] = React.useState(_selectedChannel);
  return (
    <Page style={{position: 'relative'}}>
      <ChatContainer>
        <ChannelList
          onChannelSelect={setSelectedChannel}
        />
        <Channel
          name={selectedChannel}
          onBack={() => {
            history.push('/chat')
            setSelectedChannel(null)
          }}
        />
      </ChatContainer>
    </Page>
  )
}

export default withRouter(Chat);
