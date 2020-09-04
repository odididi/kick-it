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
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${(p: ChannelContainerProps) => p.hasSelected ? '0%' : '100%'});
  transition: transform 0.2s linear;
  width: ${(p: ChannelContainerProps) => p.windowWidth}px;
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

const Channel: React.FC = () => {
  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const resizeTrigger = useResize();
  const {channelMessages, selectedChannel} = React.useContext(ChatContext);
  const history = useHistory();
  React.useEffect(() =>
    setWindowWidth(window.innerWidth)
  , [resizeTrigger]);
  return (
    <ChannelContainer hasSelected={Boolean(selectedChannel)} windowWidth={windowWidth}>
      <HeaderContainer style={{height: 52}}>
        <ArrowBack
          onClick={() => {
            history.push('/chat');
          }}
        />
        <Typography
          variant="h6"
        >
          # {selectedChannel}
        </Typography>
      </HeaderContainer>
      <ChatBox messages={channelMessages} />
      <TypeBox channel={selectedChannel}/>
    </ChannelContainer>
  )
}

export default Channel;
