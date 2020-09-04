import React from 'react';
import {useSocket} from 'hooks';
import {useLocation} from 'react-router';
import {ServerChatMessage} from 'kickit-websocket';
import {getChannelHistory} from 'services/api';

interface ChatContextType {
  selectedChannel: string;
  setSelectedChannel: React.Dispatch<React.SetStateAction<string>>;
  channelMessages: ServerChatMessage[];
}

const initialContext = {
  selectedChannel: '',
  setSelectedChannel: () => {},
  channelMessages: []
}

type SET_CHANNEL_HISTORY = 'setChannelHistory';
type SET_CHANNEL_INCOMING_MESSAGE = 'setChannelIncomingMessage';

type ChannelState = Record<string, ServerChatMessage[]>;

type ChannelAction =
  | {type: SET_CHANNEL_HISTORY; channel: string; history: ServerChatMessage[]}
  | {type: SET_CHANNEL_INCOMING_MESSAGE; channel: string; message: ServerChatMessage};

const reducer = (state: ChannelState, action: ChannelAction) => {
  switch (action.type) {
    case 'setChannelHistory':
      return {
        ...state,
        [action.channel]: action.history
      };
    case 'setChannelIncomingMessage':
      return {
        ...state,
        [action.channel]: [
          ...state[action.channel],
          action.message
        ]
      };
    default:
      throw new Error();
  }
}

export const ChatContext = React.createContext<ChatContextType>(initialContext);

export const ChatContextProvider: React.FC = ({children}) => {
  const {lastJsonMessage} = useSocket();
  const [allMessages, dispatch] = React.useReducer(reducer, {})
  const location = useLocation();
  const _selectedChannel = new URLSearchParams(location.search).get("channel") || '';
  const [selectedChannel, setSelectedChannel] = React.useState<string>(_selectedChannel);
  React.useEffect(() => {
    if (!selectedChannel || Boolean(allMessages[selectedChannel])) return;
    getChannelHistory({channel: selectedChannel})
      .then(res => dispatch({
        type: 'setChannelHistory',
        channel: selectedChannel,
        history: res.data as ServerChatMessage[]
      }))
  }, [selectedChannel, allMessages])
  React.useEffect(() => {
    if (!lastJsonMessage) return;
    dispatch({
      type: 'setChannelIncomingMessage',
      channel: lastJsonMessage.channel,
      message: lastJsonMessage as ServerChatMessage
    })
  }, [lastJsonMessage])

  return (
    <ChatContext.Provider
      value={{
        selectedChannel,
        setSelectedChannel,
        channelMessages: allMessages[selectedChannel] || []
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
