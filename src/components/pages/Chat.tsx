import React from 'react';
import styled from 'styled-components';
import {useHistory, useLocation} from 'react-router';
import {Page} from 'components/atoms';
import {Channel, ChannelList} from 'components/organisms';

const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Chat: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const _selectedChannel = new URLSearchParams(location.search).get("channel") || '';
  const [selectedChannel, setSelectedChannel] = React.useState<string>(_selectedChannel);
  return (
    <Page>
      <ChatContainer>
        <ChannelList
          onChannelSelect={setSelectedChannel}
        />
        <Channel
          name={selectedChannel}
          onBack={() => {
            history.push('/chat')
            setSelectedChannel('')
          }}
        />
      </ChatContainer>
    </Page>
  )
}

export default Chat;

