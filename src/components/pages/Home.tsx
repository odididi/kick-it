import React from 'react';
import styled from 'styled-components';
import {Page} from 'components/atoms';
import {Typography} from '@material-ui/core';
import {AuthContext} from 'services/auth';
import {StreamContext} from 'services/stream';
import Player from 'components/organisms/Player';
import {withRouter} from 'react-router';
import Chat from 'components/organisms/Chat';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 1;
`;

const show = '"Related"';

const TopSectionContainer = styled.div`
  background: white;
  height: 160px;
  display: flex;
  @media(min-width: 960px) {
    height: 180px;
  }
  @media(min-width: 1440px) {
    height: 300px;
  }
  `;

const PlayerOuterContainer = styled.div`
  width: 55%;
  margin-left: auto;
  display: flex;
  box-sizing: border-box;
  padding-right: 30px;
  justify-content: right;
  @media(min-width: 680px) {
    width: 65%;
    padding-right: 12px;
  }
  @media(min-width: 960px) {
    width: 65%;
    justify-content: center;
    padding: 36px 36px 0;
  }
  `;

const PlayerInnerContainer = styled.div`
  width: 85%;
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

const PlayerContainer = styled.div`
  background: green;
  height: 120px;
  margin-bottom: 24px;
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
  max-height: calc(100vh - 160px);
  @media(min-width: 960px) {
    max-height: calc(100vh - 180px);
  }
  @media(min-width: 1440px) {
    max-height: calc(100vh - 300px);
  }
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
  @media(min-width: 960px) {
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
  padding: 36px;
  justify-content: center;
  position: relative;
`;

const KYellowContainer = styled.div`
  margin-top: -185px;
  margin-right: -125px;
  @media(min-width: 960px) {
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
  box-shadow: 4px 4px rgba(222, 207, 23, 0.55);
  @media(min-width: 960px) {
    width: 122px;
  }
  @media(min-width: 1440px) {
    width: 210px;
  }
  `;

const Home: React.FC = () => {
  const {streamerName} = React.useContext(StreamContext);
  const {username} = React.useContext(AuthContext);
  const {currentSong: {songArtist, songTitle}} = React.useContext(StreamContext);
  const playerRef = React.useRef(document.createElement('audio'));
  const [paused, setPaused] = React.useState<boolean>(true);
  React.useEffect(() => {
    setPaused(false);
    playerRef.current.play();
  }, [])
  return (
    <Page>
      <ChatContainer>
        <TopSectionContainer>
          <PlayerOuterContainer>
            <PlayerInnerContainer>
              <Player />
              <CurrentPlayingContainer>
                <Typography style={{fontWeight: 'bold'}} variant="h6" color="secondary">{`${streamerName === '' ? 'Playlist' : `Live: ${show}`}`}</Typography>
              </CurrentPlayingContainer>
            </PlayerInnerContainer>
          </PlayerOuterContainer>
        </TopSectionContainer>
        <BottomSectionContainer>
          <LeftBottomContainer>
            <K />
          </LeftBottomContainer>
          <RightBottomContainer>
            <KYellowContainer>
              <KYellow />
              {
                username && <UsernameContainer>
                  <Typography style={{fontWeight: 'bold'}} variant="body2" color="secondary">{`Kick it, ${username}!`}</Typography>
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
