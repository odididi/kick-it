import React from 'react';
import {useSocket} from 'hooks';
import {getChannelHistory} from 'services/api';
import {ServerChatMessage} from 'kickit-websocket';

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
const useChannelMessages = (channel: string) => {
  const {lastJsonMessage} = useSocket();
  const [allMessages, dispatch] = React.useReducer(reducer, {})
  React.useEffect(() => {
    if (!channel || Boolean(allMessages[channel])) return;
    getChannelHistory({channel})
      .then(res => dispatch({
        type: 'setChannelHistory',
        channel,
        history: res.data as ServerChatMessage[]
      }))
  }, [channel, allMessages])
  React.useEffect(() => {
    if (!lastJsonMessage) return;
    dispatch({
      type: 'setChannelIncomingMessage',
      channel: lastJsonMessage.channel,
      message: lastJsonMessage as ServerChatMessage
    })
  }, [lastJsonMessage])

  return allMessages[channel] || [];
}

export default useChannelMessages;
