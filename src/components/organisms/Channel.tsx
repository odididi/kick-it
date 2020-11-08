import React from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import {palette} from 'styles/theme';
import {TypeBox, ChatBox} from 'components/organisms';
import {useResize} from 'hooks';
import {useHistory} from 'react-router';
import {ChatContext} from 'services/chat';

interface ChannelContainerProps {
  hasSelected: boolean;
  windowWidth: number;
}

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
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const resizeTrigger = useResize();
  const {channelMessages, selectedChannel} = React.useContext(ChatContext);
  const history = useHistory();
  React.useEffect(() =>
    setWindowWidth(window.innerWidth)
  , [resizeTrigger]);
  return (
    <ChannelContainer>
      <ChatBox messages={channelMessages} />
      <TypeBox channel={selectedChannel}/>
    </ChannelContainer>
  )
}

export default Channel;
