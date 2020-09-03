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
  Axios.get(`http://${process.env.REACT_APP_API_URL}/users/${user}/channels`);

export const createChannel = ({name, description, creator}: CreateChannel): Promise<any> =>
  Axios.post(`http://${process.env.REACT_APP_API_URL}/channels`, JSON.stringify({
    name,
    description,
    creator
  }))

export const getChannelHistory = ({channel, amount = 20}: GetChannelHistory): Promise<any> =>
  Axios.get(`http://${process.env.REACT_APP_API_URL}/channels/${channel}/lastMessages?amount=${amount}`)

export const subscribeToChannel = ({channel, user}: SubscribeToChannel): Promise<any> =>
  Axios.post(`http://${process.env.REACT_APP_API_URL}/channels/subscription`, JSON.stringify({
    channel,
    user
  }))