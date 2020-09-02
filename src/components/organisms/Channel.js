import React from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import {palette} from '../../styles/theme';
import {getChannelOldMessages} from '../../services/api';
import {SocketContext} from '../../services/socket';
import useResize from '../../hooks/useResize';
import TypeBox from './TypeBox';
import ChatBox from './ChatBox';

const ChannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${p => p.hasSelected ? '0%' : '100%'});
  transition: transform 0.2s linear;
  width: ${p => p.windowWidth}px;
  height: 100%;
  background: #333;
  @media(min-width: 1024px) {
    transform: none;
    position: unset;
    flex: 1;
  }
`;

const HeaderContainer = styled.div`
  background: ${palette.yellow};
  display: flex;
  align-items: center;
  padding: 2px 24px;
  color: black;
  @media(min-width: 1024px) {
    background: #333;
    border-bottom: 1px solid ${palette.yellow};
    color: ${palette.yellow};
    box-sizing: border-box
  }
`;

const ArrowBack = styled(({...rest}) => (
  <ArrowBackIcon
    classes={{
      root: 'root',
    }}
    {...rest}
  />
))`
  &.root {
    margin-right: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    @media(min-width: 1024px) {
      display: none;
    }
  }
`;

const Channel = ({name, onBack}) => {
  const {lastMessage} = React.useContext(SocketContext);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const resizeTrigger = useResize();
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    if (!name) return;
    getChannelOldMessages({channelName: name})
      .then(res => setMessages(res.data))
  }, [name])
  React.useEffect(() => {
    if (!lastMessage || JSON.parse(lastMessage.data).channel !== name) return;
    setMessages(msgs => [
      ...msgs,
      JSON.parse(lastMessage.data)
    ])
  }, [lastMessage, name])
  React.useEffect(() =>
    setWindowWidth(window.innerWidth)
    , [resizeTrigger]);
  return (
    <ChannelContainer hasSelected={Boolean(name)} windowWidth={windowWidth}>
      <HeaderContainer style={{height: 52}}>
        <ArrowBack
          onClick={onBack}
        />
        <Typography
          variant="h6"
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
