import React from 'react';
import {useSocket} from 'hooks';
import {useLocation} from 'react-router';
import {ServerChatMessage} from 'kickit';
import {getActiveUsers, getChannelHistory} from 'services/api';
import {isNil, uniqBy} from 'ramda';

type SET_CHANNEL_HISTORY = 'setChannelHistory';
type SET_CHANNEL_INCOMING_MESSAGE = 'setChannelIncomingMessage';
type SET_SELECTED_CHANNEL = 'setSelectedChannel';
type ADD_UNREAD_CHANNEL = 'addUnreadChannel';
type REMOVE_UNREAD_CHANNEL = 'removeUnreadChannel';

type ChatState = {
  selectedChannel: string;
  messages: Record<string, ServerChatMessage[]>;
  unreadChannels: string[];
};

type ChatAction =
  | {type: SET_SELECTED_CHANNEL; channel: string}
  | {type: SET_CHANNEL_HISTORY; channel: string; history: ServerChatMessage[]}
  | {type: SET_CHANNEL_INCOMING_MESSAGE; channel: string; message: ServerChatMessage}
  | {type: ADD_UNREAD_CHANNEL; channel: string}
  | {type: REMOVE_UNREAD_CHANNEL; channel: string};

interface ChatContextType {
  selectedChannel: string;
  channelMessages: ServerChatMessage[];
  unreadChannels: string[];
  activeUsers: any[];
  sendJsonMessage: any;
  connectionStatus: any;
}

const initialContext = {
  selectedChannel: '',
  channelMessages: [],
  unreadChannels: [],
  activeUsers: [],
  sendJsonMessage: () => {},
  connectionStatus: ''
}

const chatInitialState: ChatState = {
  selectedChannel: '',
  messages: {},
  unreadChannels: []
}

const reducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'setChannelHistory':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.channel]: action.history
        }
      };
    case 'setChannelIncomingMessage':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.channel]: [
            ...(state.messages[action.channel]
              ? state.messages[action.channel]
              : []
            ),
            action.message
          ]
        }
      };
    case 'setSelectedChannel':
      return {
        ...state,
        selectedChannel: action.channel
      }
    case 'addUnreadChannel':
      return {
        ...state,
        unreadChannels: (
          !state.unreadChannels.includes(action.channel) &&
          (action.channel !== state.selectedChannel)
        )
          ? [...state.unreadChannels, action.channel]
          : state.unreadChannels
      }
    case 'removeUnreadChannel':
      return {
        ...state,
        unreadChannels: state.unreadChannels.filter(u => u !== action.channel)
      }
    default:
      throw new Error();
  }
}

export const ChatContext = React.createContext<ChatContextType>(initialContext);

export const ChatContextProvider: React.FC = ({children}) => {
  const {lastJsonMessage, sendJsonMessage, connectionStatus} = useSocket();
  const messageHistory = React.useRef([]);
  const [activeUsers, setActiveUsers] = React.useState([]);
  messageHistory.current = React.useMemo(() => {
    if (isNil(lastJsonMessage)) return messageHistory.current;
    // TODO: remove lastJsonMessage duplicates on id or timestamp
    const uniqueByTimestamp = uniqBy(
      m => `
        ${(m as ServerChatMessage).timestamp}
        ${(m as ServerChatMessage).channel}
        ${(m as ServerChatMessage).content}
      `,
      messageHistory.current.concat(lastJsonMessage)
    );
    return uniqueByTimestamp;
  }
  , [lastJsonMessage]);
  const [chatState, dispatch] = React.useReducer(reducer, chatInitialState);
  const {
    messages,
    selectedChannel,
    unreadChannels
  } = chatState;
  const location = useLocation();
  React.useEffect(() => {
    getActiveUsers().then(({data}) => setActiveUsers(data))
  }, [])
  React.useEffect(() => {
    dispatch({
      type: 'setSelectedChannel',
      channel: new URLSearchParams(location.search).get("channel") || 'general'
    })
  }, [location.search])
  React.useEffect(() => {
    if (!selectedChannel) return;
    dispatch({
      type: 'removeUnreadChannel',
      channel: selectedChannel
    })
    if (messages[selectedChannel]) return;
    getChannelHistory({channel: selectedChannel})
      .then(res => dispatch({
        type: 'setChannelHistory',
        channel: selectedChannel,
        history: res.data as ServerChatMessage[]
      }))
  }, [selectedChannel, messages])
  React.useEffect(() => {
    if (!lastJsonMessage) return;
    dispatch({
      type: 'addUnreadChannel',
      channel: lastJsonMessage.channel
    })
  }, [lastJsonMessage])

  const selectedChannelSocketHistory = messageHistory.current.filter(
    (msg: ServerChatMessage) => msg.channel === selectedChannel
  )
  return (
    <ChatContext.Provider
      value={{
        selectedChannel,
        channelMessages: messages[selectedChannel]
          ? [...messages[selectedChannel], ...selectedChannelSocketHistory]
          : selectedChannelSocketHistory,
        unreadChannels,
        activeUsers,
        sendJsonMessage,
        connectionStatus
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
