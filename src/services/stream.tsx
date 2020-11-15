import {StreamInfo} from 'kickit';
import React from 'react';
import {getActiveUsers, getStreamInfo} from './api';

type Song = {
  songArtist: string | null;
  songTitle: string | null;
}

interface StreamContextType {
  isLive: boolean;
  streamerName: string | null;
  currentSong: Song;
  songHistory: Song[];
  activeUsers: any[];
}

const initialContext: StreamContextType = {
  isLive: false,
  streamerName: 'unknown',
  currentSong: {songArtist: 'unknown', songTitle: 'unknown'},
  songHistory: [],
  activeUsers: [],
}

export const StreamContext = React.createContext<StreamContextType>(initialContext);

export const StreamContextProvider: React.FC = ({children}) => {
  const [isLive, setIsLive] = React.useState<boolean>(false);
  const [streamerName, setStreamerName] = React.useState<string>('');
  const [currentSong, setCurrentSong] = React.useState<Song>({songArtist: '', songTitle: ''});
  const [songHistory, setSongHistory] = React.useState<Song[]>([]);
  const [activeUsers, setActiveUsers] = React.useState([]);
  React.useEffect(() => {
    getActiveUsers().then(({data}) => setActiveUsers(data))
  }, [])
  const setStreamInfo = async () => {
    const {data} = await getStreamInfo() as {data: StreamInfo};
    setIsLive(data.is_live);
    setStreamerName(data.streamer_name);
    setCurrentSong({songArtist: data.song_artist, songTitle: data.song_title});
    setSongHistory(data.song_history.map(s => ({
      songArtist: s.song_artist,
      songTitle: s.song_title,
    })));
  }
  React.useEffect(() => {
    setStreamInfo();
  }, [])
  React.useEffect(() => {
    const updateInfo = setInterval(() => setStreamInfo(), 10000);
    return () => clearInterval(updateInfo);
  }, []);
  return (
    <StreamContext.Provider
      value={{
        isLive,
        streamerName,
        currentSong,
        songHistory,
        activeUsers
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};
