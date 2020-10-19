declare module "kickit" {
  export interface ClientChatMessage {
    command: number;
    content: string;
    user: string;
    channel: string;
  }

  export interface ServerChatMessage extends ClientChatMessage {
    timestamp: string;
  }
  
  export interface StreamInfo {
    is_live: boolean;
    listen_url: string;
    streamer_name: string;
    song_artist: string;
    song_title: string;
    song_history: {
      song_artist: string;
      song_title: string;
    }[];
  }

}
