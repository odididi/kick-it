import React from 'react';
import styled from 'styled-components';

import PlayRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import {palette} from 'styles/theme';
import {Button, Typography} from '@material-ui/core';
import {StreamContext} from 'services/stream';

const PlayerContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  width: 100%;
`;

const PlayPauseButton = styled(({...rest}) => (
  <Button classes={{root: 'root'}} {...rest} />
))`
  &.root {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: black;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 24px;
    box-shadow: 4px 4px rgba(222, 207, 23, 0.55);
    @media(min-width: 960px) {
      width: 70px;
      height: 70px;
    }
    @media(min-width: 1440px) {
      width: 100px;
      height: 100px;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }
  `;
  
const PlayIcon = styled(PlayRoundedIcon)`
  color: ${palette.yellow};
  font-size: 48px !important;
  @media(min-width: 960px) {
    font-size: 64px !important;
  }
  @media(min-width: 1440px) {
    font-size: 90px !important;
  }
`;

const PauseIcon = styled(PauseRoundedIcon)`
  color: ${palette.yellow};
  font-size: 44px !important;
  @media(min-width: 960px) {
    font-size: 58px !important;
  }
  @media(min-width: 1440px) {
    font-size: 72px !important;
  }
`;

const CurrentSongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Player: React.FC = () => {
  const {currentSong: {songArtist, songTitle}} = React.useContext(StreamContext);
  const playerRef = React.useRef(document.createElement('audio'));
  const [paused, setPaused] = React.useState<boolean>(true);
  React.useEffect(() => {
    setPaused(true);
    playerRef.current.pause();
  }, [])
  return (
    <PlayerContainer>
      <PlayPauseButton
        onClick={() => {
          setPaused(!paused);
          paused
            ? playerRef.current.play()
            : playerRef.current.pause()
        }}
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </PlayPauseButton>
      <CurrentSongInfo>
        <Typography variant="h6" style={{fontWeight: 'bold'}}>{songTitle}</Typography>
        <Typography variant="body1" >{songArtist}</Typography>
      </CurrentSongInfo>
      <audio
        ref={playerRef}
        src='https://radio-admin.kickit.gr/radio/8000/radio.mp3'
      />
    </PlayerContainer>
  )
}
export default Player;
