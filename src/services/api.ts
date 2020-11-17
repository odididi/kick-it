/* eslint-disable  @typescript-eslint/no-explicit-any */
import Axios from 'axios';

type CreateChannel = {
  name: string;
  description: string;
  creator: string;
};

type GetChannelHistory = {
  channel: string;
  amount?: number;
};

type SubscribeToChannel = {
  channel: string;
  user: string;
}

export const getUserChannels = (user: string) =>
  Axios.get(`https://${process.env.REACT_APP_API_URL}/users/${user}/channels`);

export const createChannel = ({name, description, creator}: CreateChannel): Promise<any> =>
  Axios.post(`https://${process.env.REACT_APP_API_URL}/channels`, JSON.stringify({
    name,
    description,
    creator
  }))

export const getChannelHistory = ({channel, amount = 20}: GetChannelHistory): Promise<any> =>
  Axios.get(`https://${process.env.REACT_APP_API_URL}/channels/${channel}/lastMessages?amount=${amount}`)
  
export const subscribeToChannel = ({channel, user}: SubscribeToChannel): Promise<any> =>
  Axios.post(`https://${process.env.REACT_APP_API_URL}/channels/subscription`, JSON.stringify({
    channel,
    user
  }))

export const getStreamInfo = (): Promise<any> =>
  Axios.get(`https://${process.env.REACT_APP_API_URL}/info`)

export const getActiveUsers = (): Promise<any> =>
  Axios.get(`https://${process.env.REACT_APP_API_URL}/users`)

export const logoutUser = (username: string) =>
  Axios.delete(`https://${process.env.REACT_APP_API_URL}/users/${username}`)