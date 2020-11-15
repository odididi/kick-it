import React from 'react';
import styled from 'styled-components';
import {Page} from 'components/atoms';
import {Typography} from '@material-ui/core';
import {AuthContext} from 'services/auth';
import {StreamContext} from 'services/stream';
import Player from 'components/organisms/Player';
import {withRouter} from 'react-router';
import Chat from 'components/organisms/Chat';
import {useResize} from 'hooks';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(p: {windowheight: number}) => p.windowheight}px;
  flex: 1;
`;

const show = '"Related"';

const TopSectionContainer = styled.div`
  background: white;
  height: 140px;
  display: flex;
  justify-content: center;
  @media(min-width: 960px) {
    height: 180px;
  }
  @media(min-width: 1440px) {
    height: 300px;
  }
  `;

const PlayerOuterContainer = styled.div`
  width: calc(100% - 32px);
  display: flex;
  box-sizing: border-box;
  @media(min-width: 680px) {
    margin-left: 300px;
    width: calc(100% - 300px);
    padding-right: 16px;
  }
  @media(min-width: 960px) {
    margin-left: auto;
    width: 65%;
    justify-content: center;
    padding: 36px 36px 0;
  }
  `;

const PlayerInnerContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media(min-width: 960px) {
    width: 77%;
  }
  @media(min-width: 1440px) {
    width: 70%;
  }
`;

const CurrentPlayingContainer = styled.div`
  padding: 8px 16px;
  background: #DECF17;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
`;

const BottomSectionContainer = styled.div`
  background: black;
  flex: 1;
  display: flex;
  ${(p: {windowheight: number}) => `
    max-height: ${p.windowheight - 140}px;
    @media(min-width: 960px) {
      max-height: ${p.windowheight - 180}px;
    }
    @media(min-width: 1440px) {
      max-height: ${p.windowheight - 300}px;
    }
  `}

`;

const LeftBottomContainer = styled.div`
  display: none;
  @media(min-width: 960px) {
    display: block;
    min-width: 35%;
    padding: 36px 64px;
    box-sizing: border-box;
    position: relative;
  }
`;

const K = styled.div`
  /* width: calc(70vh - 300px); */
  height: 100%;
  background: url('/assets/radio_outline.svg');
  background-position-x: right;
  background-size: contain;
  background-repeat: no-repeat;
`;

const KYellow = styled.div`
  height: 130px;
  display: none;
  @media(min-width: 680px) {
    display: block;
    width: 170px;
    height: 120px;
    margin-bottom: 12px;
  }
  @media(min-width: 960px) {
    display: block;
    width: 170px;
    height: 220px;
    margin-bottom: 12px;
  }
  @media(min-width: 1440px) {
    width: 270px;
    height: 350px;
    margin-bottom: 16px;
  }
  background: url('/assets/radio_design.svg');
  background-position-x: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const RightBottomContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  @media(min-width: 960px) {
    padding: 36px;
  }
`;

const KYellowContainer = styled.div`
  display: none;
  @media(min-width: 680px) {
    display: flex;
    align-items: flex-start;
    position: absolute;
    margin: 0;
    left: 0;
    top: -132px;
  }
  @media(min-width: 960px) {
    display: block;
    position: absolute;
    margin: 0;
    left: -130px;
    top: -160px;
  }
  @media(min-width: 1440px) {
    position: absolute;
    margin: 0;
    left: -200px;
    top: -270px;
  }
`;

const UsernameContainer = styled.div`
  padding: 4px 12px;
  margin-top: 4px;
  background: white;
  width: 100px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  @media(min-width: 680px) {
    background: black;
    color: rgb(222, 207, 23);
    width: 122px;
    margin-left: -70px;
    margin-top: 30px;
  }
  @media(min-width: 960px) {
    background: white;
    color: black;
    margin-left: 0;
    margin-top: 4px;
    box-shadow: 4px 4px rgba(222, 207, 23, 0.55);
    color: black;
    width: 122px;
  }
  @media(min-width: 1440px) {
    width: 210px;
  }
  `;

const NowPlaying = () => {
  const {streamerName} = React.useContext(StreamContext);
  return (
    <Typography style={{fontWeight: 'bold'}} variant="h6" color="secondary">
      {`${streamerName === '' ? 'Playlist' : `Live: ${show}`}`}
    </Typography>
  )
}
const Home: React.FC = () => {
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  const resizeTrigger = useResize();
  React.useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, [resizeTrigger])
  const {username} = React.useContext(AuthContext);
  return (
    <Page>
      <ChatContainer windowheight={windowHeight}>
        <TopSectionContainer>
          <PlayerOuterContainer>
            <PlayerInnerContainer>
              <Player />
              <CurrentPlayingContainer>
                <NowPlaying />
              </CurrentPlayingContainer>
            </PlayerInnerContainer>
          </PlayerOuterContainer>
        </TopSectionContainer>
        <BottomSectionContainer windowheight={windowHeight}>
          <LeftBottomContainer>
            <K />
          </LeftBottomContainer>
          <RightBottomContainer>
            <KYellowContainer>
              <KYellow />
              {
                username && <UsernameContainer>
                  <Typography style={{fontWeight: 'bold'}} variant="body2">{`Kick it, ${username}!`}</Typography>
                </UsernameContainer>
              }
            </KYellowContainer>
            <Chat/>
          </RightBottomContainer>
        </BottomSectionContainer>
      </ChatContainer>
    </Page>
  );
}

export default withRouter(Home);
