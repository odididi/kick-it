import React from 'react';
import styled from 'styled-components';
import Page from '../atoms/Page';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Typography} from '@material-ui/core';
import {palette} from '../theme';
import {Logo} from '../atoms/Logo';
import useSocket from '../hooks/useSocket';
import Input from '../atoms/Input';
import {withRouter, useLocation, Redirect} from 'react-router';
import {SocketContext} from '../services/socket';
import {createChannel} from '../api';
import SearchChannels from '../organisms/SearchChannel';
import useResize from '../hooks/useResize';
import Channel from '../organisms/Channel';

// const Greeting = styled.div`
//   display: flex;
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Greeting = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
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
  padding: 2px;
`;

const Row = styled.div`
  padding: 14px;
  cursor: pointer;
`;

const NewChannelContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  transition: height 0.2s ease;
`;

const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: top 0.2s ease;
  width: 100%;
`;

const Chat = ({history}) => {
  const location = useLocation();
  const _selectedChannel = new URLSearchParams(location.search).get("channel")
  const {client, userChannels, fetchUserChannels, activeUsername}= React.useContext(SocketContext);
  const [newChannelName, setNewChannelName] = React.useState('');
  const [newChannelDescription, setNewChannelDescription] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const [addingChannel, setAddingChannel] = React.useState(false);
  const inputRef = React.useRef();
  const [selectedChannel, setSelectedChannel] = React.useState(_selectedChannel);
  const [sidebarTitle, setSideBarTitle] = React.useState('');
  const resizeTrigger = useResize();
  React.useEffect(() => {
    if(!inputRef || !addingChannel) return;
    inputRef.current.focus();
  }, [addingChannel, inputRef]);
  React.useEffect(() => 
    setSideBarTitle(window.innerWidth > 1024 ? 'Kick it!!' : 'Channels')
  , [resizeTrigger])
  const handleCheckClick = () => {
    if (newChannelName === '') {
      setShowError(true);
      inputRef.current.focus();
      return;
    }
    setNewChannelName('');
    setNewChannelDescription('');
    setShowError(false);
    setAddingChannel(false);
    client.send(JSON.stringify({
      command: 0,
      channel: newChannelName
    }))
    createChannel({
      name: newChannelName,
      description: newChannelDescription,
      creator: activeUsername
    })
    .then(fetchUserChannels)
    .catch(console.error)
  }
  return (
    <Page style={{position: 'relative'}}>
      <Sidebar>
        <HeaderContainer>
          <Logo
            style={{
              width: 48,
              height: 48,
              marginRight: 12
            }}/>
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
            onClick={() => setAddingChannel(!addingChannel)}
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
        <NewChannelContainer style={{height: addingChannel ? 190 : 0}}>
          <div
            style={{
              width: '100%',
              background: addingChannel ? palette.black : 'transparent',
              transitionProperty: 'transform',
              transitionDuration: '0.2s',
              transitionTimingFunction: 'ease',
              position: 'absolute',
              top: 0,
              left: 0,
              height: 190,
              transform: `scaleY(${addingChannel ? 0 : 1})`,
              transformOrigin: 'bottom'
            }}
          />
          {addingChannel && (
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Input
                inputRef={inputRef}
                id="outlined-basic"
                label="Channel"
                placeholder="Enter channel name..."
                variant="outlined"
                color="primary"
                error={showError && newChannelName === ''}
                value={newChannelName}
                onChange={e => setNewChannelName(e.target.value)}
                style={{margin: '16px 0 0'}}
              />
              <Input
                id="outlined-basic"
                label="Description"
                placeholder="Enter channel description..."
                variant="outlined"
                color="primary"
                multiline
                rows={3}
                rowsMax={3}
                value={newChannelDescription}
                onChange={e => setNewChannelDescription(e.target.value)}
                style={{margin: '16px 0 8px'}}
              />
            </div>
          )}
        </NewChannelContainer>
        <ChannelsContainer style={{top: addingChannel ? 242 : 52}}>
        {userChannels.map(c => (
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
      </Sidebar>
      <Channel
        name={selectedChannel}
        onBack={() => {
          history.push('/chat')
          setSelectedChannel(null)
        }}
      />
    </Page>
  )
}

export default withRouter(Chat);

