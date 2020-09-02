import Axios from 'axios';

export const getUserChannels = (user) =>
  Axios.get(`http://${process.env.REACT_APP_API_URL}/users/${user}/channels`);

export const createChannel = ({name, description, creator}) =>
  Axios.post(`http://${process.env.REACT_APP_API_URL}/channels`, JSON.stringify({
    name,
    description,
    creator
  }))

export const getChannelOldMessages = ({channelName, amount = 20}) =>
  Axios.get(`http://${process.env.REACT_APP_API_URL}/channels/${channelName}/lastMessages?amount=${amount}`)

export const subscribeToChannel = ({channelName, user}) =>
  Axios.post(`http://${process.env.REACT_APP_API_URL}/channels/subscription`, JSON.stringify({
    channel: channelName,
    user
  }))