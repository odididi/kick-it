import React from 'react';
import styled from 'styled-components';
import {Typography} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useHistory} from 'react-router';
import {Logo} from 'components/atoms';
import {AddChannel} from 'components/molecules';
import {useResize, useUser} from 'hooks';
import {createChannel} from 'services/api';
import {palette} from 'styles/theme';
import {ChatContext} from 'services/chat';

const ChannelListContainer = styled.div`
  display: flex;
  flex-direction: column;
  transition: left 0.5s ease;
  width: 100%;
  height: 100%;
  @media(min-width: 1024px) {
    width: 320px;
    background: ${palette.black};
    box-shadow: 0px 0px 4px 0px ${palette.yellow};
  }
`;

const HeaderContainer = styled.div`
  background: ${palette.yellow};
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px;
`;

const Row = styled.div`
  padding: 14px;
  cursor: pointer;
`;

const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: top 0.2s ease;
  width: 100%;
`;

const ChannelList: React.FC = () => {
  const {channels: userChannels, setChannels, username} = useUser();
  const history = useHistory();
  const [newChannelName, setNewChannelName] = React.useState('');
  const {setSelectedChannel} = React.useContext(ChatContext);
  const [newChannelDescription, setNewChannelDescription] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const [addingChannel, setAddingChannel] = React.useState(false);
  const [sidebarTitle, setSideBarTitle] = React.useState('');
  const resizeTrigger = useResize();
  React.useEffect(() =>
    setSideBarTitle(window.innerWidth > 1024 ? `Kick it, ${username}!` : 'Channels')
  , [resizeTrigger, username])
  const handleCheckClick = () => {
    if (newChannelName === '') {
      setShowError(true);
      return;
    }
    setNewChannelName('');
    setNewChannelDescription('');
    setShowError(false);
    setAddingChannel(false);
    
    createChannel({
      name: newChannelName,
      description: newChannelDescription,
      creator: username
    })
      .then(() => setChannels(_channels => [
        ..._channels,
        newChannelName
      ]))
  }
  return (
    <ChannelListContainer>
      <HeaderContainer>
        <Logo
          style={{
            width: 48,
            height: 48,
            marginRight: 12
          }} />
        <Typography
          variant="h6"
          color="secondary"
        >
          {sidebarTitle}
        </Typography>
        <CheckCircleIcon
          onClick={handleCheckClick}
          style={{
            margin: '0 16px 0 auto',
            width: 32,
            height: 32,
            cursor: 'pointer',
            opacity: addingChannel ? 1 : 0,
            position: 'absolute',
            right: addingChannel ? 48 : 16,
            fill: '#4caf50',
            transitionProperty: 'opacity, right',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'ease',
          }}
        />
        <AddCircleIcon
          onClick={() => {setAddingChannel(!addingChannel); setShowError(false)}}
          style={{
            margin: '0 16px 0 auto',
            width: 32,
            height: 32,
            cursor: 'pointer',
            transform: `rotate(${addingChannel ? 45 : 0}deg)`,
            transitionProperty: 'transform, fill',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'ease',
            fill: addingChannel ? 'rgb(244, 67, 54)' : 'rgb(12,17,19)'
          }}
        />
      </HeaderContainer>
      <AddChannel
        expanded={addingChannel}
        channelName={newChannelName}
        onChannelNameUpdate={setNewChannelName}
        channelDescription={newChannelDescription}
        onChannelDescriptionUpdate={setNewChannelDescription}
        error={showError}
      />
      <ChannelsContainer style={{top: addingChannel ? 242 : 52}}>
        {(userChannels as string[]).map(c => (
          <Row key={c} onClick={() => {
            setAddingChannel(false);
            setSelectedChannel(c);
            history.push(`/chat?channel=${c}`)
          }}>
            <Typography variant="h5">
              # {c}
            </Typography>
          </Row>
        ))}
      </ChannelsContainer>
    </ChannelListContainer>
  )
}

export default ChannelList;
